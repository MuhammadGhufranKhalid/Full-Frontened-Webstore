// src/utils/mealHelpers.js
// TheMealDB stores ingredients/measures as 20 separate flat fields
// (strIngredient1..20, strMeasure1..20) instead of an array. This helper
// turns that into a clean, usable list — every component that needs
// ingredients calls this instead of repeating the parsing logic.

export function getIngredientList(meal) {
  if (!meal) return [];
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        id: i,
        name: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return ingredients;
}

// Splits the instructions blob into clean numbered steps. TheMealDB
// instructions sometimes use \r\n, sometimes numbered "1. " prefixes,
// sometimes just paragraphs — this handles the common cases.
export function getInstructionSteps(instructions = "") {
  const cleaned = instructions
    .replace(/\r\n/g, "\n")
    .split(/\n+/)
    .map((line) => line.replace(/^\d+[\.\)]\s*/, "").trim())
    .filter(Boolean);

  return cleaned.length > 0 ? cleaned : [instructions];
}

export function getYoutubeEmbedUrl(youtubeUrl) {
  if (!youtubeUrl) return null;
  const match = youtubeUrl.match(/[?&]v=([^&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function getIngredientThumb(ingredientName) {
  return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(
    ingredientName
  )}-small.png`;
}
