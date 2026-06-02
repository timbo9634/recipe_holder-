"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/lib/types";
import { getRecipe } from "@/lib/recipe-storage";

export default function RecipeDetailPage() {
  const params = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRecipe(getRecipe(params.id) ?? null);
    setLoaded(true);
  }, [params.id]);

  if (!loaded) {
    return <main className="min-h-screen bg-muted/30 px-5 py-8 sm:px-8" />;
  }

  if (!recipe) {
    return (
      <main className="min-h-screen bg-muted/30 px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-3xl space-y-6 rounded-2xl border bg-background p-6 shadow-sm">
          <Button asChild variant="ghost" className="-ml-3">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
          <p className="text-muted-foreground">没有找到这个菜谱。</p>
        </div>
      </main>
    );
  }

  const heroImage = recipe.images[0];

  return (
    <main className="min-h-screen bg-muted/30 px-5 py-8 sm:px-8">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="relative aspect-[16/9] bg-muted">
          {heroImage ? (
            <img src={heroImage} alt={recipe.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">暂无照片</div>
          )}
        </div>

        <div className="space-y-8 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <Button asChild variant="ghost" className="-ml-3">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回首页
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{recipe.title}</h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Button asChild variant="outline">
              <Link href={`/recipes/${recipe.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                编辑
              </Link>
            </Button>
          </div>

          <details className="rounded-xl border p-5">
            <summary className="cursor-pointer text-lg font-semibold">原菜谱文本</summary>
            <p className="mt-4 whitespace-pre-wrap leading-7 text-muted-foreground">{recipe.sourceText}</p>
          </details>

          <section className="rounded-xl border bg-muted/40 p-5">
            <h2 className="text-lg font-semibold">我的改良</h2>
            <p className="mt-3 whitespace-pre-wrap leading-7 text-foreground">{recipe.myNotes || "暂无改良记录"}</p>
          </section>
        </div>
      </article>
    </main>
  );
}
