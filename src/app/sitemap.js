import { PRESET_RECIPES } from "@/lib/constants/recipes";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-domain.com";

  const mainRoute = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  };

  const recipeRoutes = Object.keys(PRESET_RECIPES).map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [mainRoute, ...recipeRoutes];
}
