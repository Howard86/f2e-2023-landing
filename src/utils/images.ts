import { getImage } from 'astro:assets';
import type { GetImageResult, ImageMetadata } from 'astro';
import type { OpenGraph } from '@astrolib/seo';

const load = async () => {
  let images: Record<string, () => Promise<unknown>> | undefined;
  try {
    images = import.meta.glob('~/assets/images/**/*.{jpeg,jpg,png,tiff,webp,gif,svg,JPEG,JPG,PNG,TIFF,WEBP,GIF,SVG}');
  } catch (e) {
    // continue regardless of error
  }
  return images;
};

let storeImages: Record<string, () => Promise<unknown>> | undefined;

/** */
export const fetchLocalImages = async () => {
  storeImages = storeImages || (await load());
  return storeImages;
};

/** */
export const findImage = async (
  imagePath?: string | ImageMetadata | null
): Promise<string | ImageMetadata | undefined | null> => {
  // Not string
  if (typeof imagePath !== 'string') {
    return imagePath;
  }

  // Absolute paths
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('/')) {
    return imagePath;
  }

  // Relative paths or not "~/assets/"
  if (!imagePath.startsWith('~/assets/images')) {
    return imagePath;
  }

  const images = await fetchLocalImages();
  const key = imagePath.replace('~/', '/src/');

  return images && typeof images[key] === 'function'
    ? ((await images[key]()) as { default: ImageMetadata }).default
    : null;
};

/** */
export const adaptOpenGraphImages = async (
  openGraph: OpenGraph = {},
  astroSite: URL | undefined = new URL('')
): Promise<OpenGraph> => {
  if (!openGraph?.images?.length) {
    return openGraph;
  }

  const { images } = openGraph;
  const defaultWidth = 1200;
  const defaultHeight = 626;

  const adaptedImages = await Promise.all(
    images.map(async (image) => {
      if (image?.url) {
        const resolvedImage = (await findImage(image.url)) as ImageMetadata | undefined;
        if (!resolvedImage) {
          return {
            url: '',
          };
        }

        const baseImage = (await getImage({
          src: resolvedImage,
          alt: 'Placeholder alt',
          width: image?.width || defaultWidth,
          height: image?.height || defaultHeight,
        })) as GetImageResult & { width?: number; height?: number };

        if (typeof baseImage === 'object') {
          return {
            url: typeof baseImage.src === 'string' ? String(new URL(baseImage.src, astroSite)) : 'pepe',
            width: typeof baseImage.width === 'number' ? baseImage.width : undefined,
            height: typeof baseImage.height === 'number' ? baseImage.height : undefined,
          };
        }
        return {
          url: '',
        };
      }

      return {
        url: '',
      };
    })
  );

  return { ...openGraph, ...(adaptedImages ? { images: adaptedImages } : {}) };
};
