import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { db } from '../services/db';

/**
 * Resizes and compresses an image file using browser Canvas.
 * Protects against massive camera uploads from mobile phones crashing memory/localStorage.
 */
export async function compressImage(file: File, maxWidth = 1280, maxHeight = 800, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('ইমেজ লোড করতে ব্যর্থ হয়েছে'));
      img.src = event.target?.result as string;
    };
    reader.onerror = () => reject(new Error('ফাইল পড়তে ব্যর্থ হয়েছে'));
    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image file:
 * 1. Tries Supabase Storage bucket 'news-images' if configured.
 * 2. If not configured or if error, seamlessly saves the compressed web-optimized image as Data URL.
 * 3. Records entry in Media Library.
 */
export async function uploadImageFile(file: File, title = 'সংবাদের ফিচার্ড ছবি'): Promise<{ url: string; error?: string }> {
  try {
    // Basic file validation
    if (!file.type.startsWith('image/')) {
      return { url: '', error: 'অনুগ্রহ করে শুধুমাত্র ছবি ফাইল (JPG, PNG, WebP) নির্বাচন করুন।' };
    }

    // Process & compress client-side
    const compressedDataUrl = await compressImage(file);

    let finalUrl = compressedDataUrl;

    // If Supabase is connected, attempt uploading to Supabase Storage bucket
    if (isSupabaseConfigured() && supabase) {
      try {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
        const fileName = `${Date.now()}_${cleanName}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
          .from('news-images')
          .upload(`articles/${fileName}`, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (!uploadError && data) {
          const { data: publicUrlData } = supabase.storage
            .from('news-images')
            .getPublicUrl(data.path);

          if (publicUrlData?.publicUrl) {
            finalUrl = publicUrlData.publicUrl;
          }
        }
      } catch (storageErr) {
        console.warn('Supabase storage upload fallback to local storage', storageErr);
        // gracefully continues with compressedDataUrl
      }
    }

    // Track in local media library
    try {
      await db.addMedia({
        title: title || file.name,
        url: finalUrl,
        alt_text: file.name,
        file_size: `${Math.round(file.size / 1024)} KB`,
      });
    } catch (e) {
      console.warn('Media tracking warning', e);
    }

    return { url: finalUrl };
  } catch (err: any) {
    return { url: '', error: err.message || 'ছবি আপলোডে সমস্যা হয়েছে।' };
  }
}
