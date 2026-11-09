const base = import.meta.env.BASE_URL;

/**
 * Builds a `srcset` for the generated `-800` variant plus the original file.
 * Keeps mobile devices from downloading full-width photos.
 */
export const buildSrcSet = (file: string, width: number, variantWidth = 800): string => {
  const variant = `${file.replace(/\.jpg$/, "")}-${variantWidth}.jpg`;
  return `${base}${variant} ${variantWidth}w, ${base}${file} ${width}w`;
};

export const imageUrl = (file: string): string => `${base}${file}`;
