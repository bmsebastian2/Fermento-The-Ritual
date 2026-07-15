import type { MetadataRoute } from "next";

// Sitio one-page: los anchors (#fermento, #the-ritual, #contacto) viven en la
// raíz, así que el sitemap lleva solo la URL principal.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://fermentotheritual.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
