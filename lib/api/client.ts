/**
 * Generic API request utility for Strapi.
 * Handles the response envelope and optional normalization to a UI-ready type.
 */

export async function apiRequest<T>(
  requestFn: () => Promise<any>,
  normalizer?: (data: any) => T
): Promise<T | null> {
  try {
    const response = await requestFn();

    // Strapi SDK responses usually wrap the result in a 'data' property.
    // If the response itself is the data (or null), we use it directly.
    const rawData = response?.data ?? response;

    if (!rawData) return null;

    return normalizer ? normalizer(rawData) : (rawData as T);
  } catch (error) {
    console.error("[API_ERROR]:", error);
    return null;
  }
}
