"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PhotoUpload } from "@/components/photo-upload";

export default function NewRecipePage() {
  const [title, setTitle] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [myNotes, setMyNotes] = useState("");
  const [tags, setTags] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      title,
      sourceText,
      myNotes,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      photos: photos.map((file) => ({ name: file.name, size: file.size, type: file.type })),
    };

    console.log("submit recipe:", payload);
    alert("Mock 保存成功：请打开浏览器 Console 查看提交数据。后续可以接 Prisma + Postgres。 ");
  }

  return (
    <main className="min-h-screen bg-muted/30 px-5 py-8 sm:px-8">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8 rounded-2xl border bg-background p-6 shadow-sm">
        <div className="space-y-4">
          <Button asChild variant="ghost" className="-ml-3">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>

          <div>
            <h1 className="text-2xl font-bold">添加菜谱</h1>
            <p className="mt-2 text-sm text-muted-foreground">粘贴别人的原菜谱，写下你的改良，再上传自己的成品照片。</p>
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
          <PhotoUpload files={photos} onChange={setPhotos} />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" asChild>
            <Link href="/">取消</Link>
          </Button>
          <Button type="submit">保存菜谱</Button>
        </div>
      </form>
    </main>
  );
}
