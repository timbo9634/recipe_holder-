import Image from "next/image";
import { Recipe } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const cover = recipe.images[0];

  return (
    <Card className="overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] bg-muted">
        <Image src={cover} alt={recipe.title} fill className="object-cover" priority={recipe.id === "1"} />
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
  );
}
