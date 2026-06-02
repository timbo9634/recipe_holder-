"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { mockRecipes } from "@/lib/mock-recipes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "@/components/recipe-card";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return mockRecipes;

    return mockRecipes.filter((recipe) =>
      [recipe.title, recipe.sourceText, recipe.myNotes, recipe.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-muted/30 px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-primary">Recipe Library</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">我的菜谱</h1>
            <p className="mt-2 text-muted-foreground">记录原菜谱、我的改良和每次做出来的成品照片。</p>
          </div>

          <Button asChild>
            <Link href="/recipes/new">
              <Plus className="mr-2 h-4 w-4" />
              添加菜谱
            </Link>
          </Button>
        </header>

        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索菜名、食材、标签或我的改良..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 pl-9"
          />
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="rounded-xl border bg-background p-10 text-center text-muted-foreground">没有找到相关菜谱</div>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
