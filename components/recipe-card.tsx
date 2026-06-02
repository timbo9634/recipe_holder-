import Link from "next/link";
import { Recipe } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const cover = recipe.images[0];

  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative aspect-[4/3] bg-muted">
          {cover ? (
            <img src={cover} alt={recipe.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-sm text-muted-foreground">暂无照片</div>
          )}
        </div>

        <CardContent className="space-y-3 p-4">
          <div>
            <h2 className="text-lg font-semibold">{recipe.title}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{recipe.myNotes}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
