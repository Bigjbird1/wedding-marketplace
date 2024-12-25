// Types for Unsplash API responses
export type UnsplashImage = {
  id: string;
  url: string;
  thumbnailUrl: string;
  description: string | null;
  authorName: string;
  authorUsername: string;
};

type UnsplashResponse = {
  id: string;
  urls: {
    regular: string;
    thumb: string;
  };
  description: string | null;
  alt_description: string | null;
  user: {
    name: string;
    username: string;
  };
};

async function fetchFromUnsplash(query: string, count: number = 1): Promise<UnsplashResponse[]> {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.error('Unsplash access key is missing');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${query}&count=${count}&orientation=${count === 1 ? 'portrait' : 'landscape'}`,
      {
        headers: {
          'Authorization': `Client-ID ${accessKey}`
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Failed to fetch from Unsplash:', error);
    return [];
  }
}

// Convert Unsplash response to our simplified type
function mapResponseToImage(photo: UnsplashResponse): UnsplashImage {
  return {
    id: photo.id,
    url: photo.urls.regular,
    thumbnailUrl: photo.urls.thumb,
    description: photo.description || photo.alt_description,
    authorName: photo.user.name,
    authorUsername: photo.user.username,
  };
}

// Fetch wedding dress images
export async function getRandomWeddingDressImage(): Promise<UnsplashImage | null> {
  const photos = await fetchFromUnsplash('wedding dress');
  return photos.length > 0 ? mapResponseToImage(photos[0]) : null;
}

// Fetch venue images
export async function getRandomVenueImage(): Promise<UnsplashImage | null> {
  const photos = await fetchFromUnsplash('wedding venue');
  return photos.length > 0 ? mapResponseToImage(photos[0]) : null;
}

// Fetch multiple wedding-related images
export async function getWeddingImages(count: number = 10): Promise<UnsplashImage[]> {
  const photos = await fetchFromUnsplash('wedding', count);
  return photos.map(mapResponseToImage);
}

// Create a cache to store preloaded images
const imageCache = new Map<string, UnsplashImage>();

// Preload and cache images
export async function preloadImages(type: 'dress' | 'venue', count: number = 5): Promise<void> {
  const fetchFunction = type === 'dress' ? getRandomWeddingDressImage : getRandomVenueImage;

  try {
    const promises = Array.from({ length: count }, () => fetchFunction());
    const images = await Promise.all(promises);

    images.forEach(image => {
      if (image) {
        imageCache.set(image.id, image);
        // Preload the actual image
        new Image().src = image.url;
      }
    });
  } catch (error) {
    console.error(`Failed to preload ${type} images:`, error);
  }
}

// Get a cached image if available, otherwise fetch a new one
export async function getCachedOrFetchImage(type: 'dress' | 'venue'): Promise<UnsplashImage | null> {
  const cachedImages = Array.from(imageCache.values());

  if (cachedImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * cachedImages.length);
    const image = cachedImages[randomIndex];
    imageCache.delete(image.id); // Remove used image from cache
    return image;
  }

  return type === 'dress' ? getRandomWeddingDressImage() : getRandomVenueImage();
}