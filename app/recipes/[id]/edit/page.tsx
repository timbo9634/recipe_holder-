"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhotoUpload } from "@/components/photo-upload";
import { Recipe } from "@/lib/types";
import { deleteRecipe, getRecipe, updateRecipe } from "@/lib/recipe-storage";

export default function EditRecipePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [myNotes, setMyNotes] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const savedRecipe = getRecipe(params.id) ?? null;
    setRecipe(savedRecipe);
    setLoaded(true);

    if (savedRecipe) {
      setTitle(savedRecipe.title);
      setSourceText(savedRecipe.sourceText);
      setMyNotes(savedRecipe.myNotes);
      setTags(savedRecipe.tags.join(", "));
      setImages(savedRecipe.images);
    }
  }, [params.id]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!recipe) return;

    const updatedRecipe = {
      ...recipe,
      title,
      sourceText,
      myNotes,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      images,
    };

    updateRecipe(updatedRecipe);
    router.push(`/recipes/${recipe.id}`);
  }

  function handleDelete() {
    if (!recipe || !confirm("确定要删除这个菜谱吗？")) return;
    deleteRecipe(recipe.id);
    router.push("/");
  }

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

  return (
    <main className="min-h-screen bg-muted/30 px-5 py-8 sm:px-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8 rounded-2xl border bg-background p-6 shadow-sm">
        <div className="space-y-4">
          <Button asChild variant="ghost" className="-ml-3">
            <Link href={`/recipes/${recipe.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回菜谱
            </Link>
          </Button>

          <div>
            <h1 className="text-2xl font-bold">编辑菜谱</h1>
            <p className="mt-2 text-sm text-muted-foreground">更新原菜谱、我的改良、标签和成品照片。</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">菜名</Label>
          <Input id="title" placeholder="例如：番茄牛腩" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sourceText">原菜谱文本</Label>
          <Textarea
            id="sourceText"
            placeholder="把你复制来的菜谱步骤粘贴到这里..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            className="min-h-48"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="myNotes">我的改良</Label>
          <Textarea
            id="myNotes"
            placeholder="例如：我多加了一点番茄膏，最后收汁更浓..."
            value={myNotes}
            onChange={(e) => setMyNotes(e.target.value)}
            className="min-h-28"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">标签</Label>
          <Input id="tags" placeholder="用逗号分隔，例如：牛肉, 下饭, 炖菜" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>成品照片</Label>
          <PhotoUpload images={images} onChange={setImages} />
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            删除菜谱
          </Button>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" asChild>
              <Link href={`/recipes/${recipe.id}`}>取消</Link>
            </Button>
            <Button type="submit">保存修改</Button>
          </div>
        </div>
      </form>
    </main>
  );
}
