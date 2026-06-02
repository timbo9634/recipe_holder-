"use client";

import { mockRecipes } from "@/lib/mock-recipes";
import { Recipe } from "@/lib/types";

const STORAGE_KEY = "recipe-memory-palace-recipes";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getRecipes(): Recipe[] {
  if (!isBrowser()) return mockRecipes;

  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRecipes));
    return mockRecipes;
  }

  try {
    return JSON.parse(saved) as Recipe[];
  } catch {
    return mockRecipes;
  }
}

export function saveRecipes(recipes: Recipe[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export function getRecipe(id: string) {
  return getRecipes().find((recipe) => recipe.id === id);
}

export function addRecipe(recipe: Recipe) {
  const recipes = [recipe, ...getRecipes()];
  saveRecipes(recipes);
}

export function updateRecipe(updatedRecipe: Recipe) {
  const recipes = getRecipes().map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe));
  saveRecipes(recipes);
}

export function deleteRecipe(id: string) {
  saveRecipes(getRecipes().filter((recipe) => recipe.id !== id));
}
