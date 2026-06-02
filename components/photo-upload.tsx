"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function PhotoUpload({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    const dataUrls = await Promise.all(selected.map(readFileAsDataUrl));
    onChange([...images, ...dataUrls]);
    e.target.value = "";
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition hover:bg-muted/50">
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
        <Upload className="mb-3 h-6 w-6 text-muted-foreground" />
        <span className="text-sm font-medium">点击上传成品照片</span>
        <span className="mt-1 text-xs text-muted-foreground">支持多张图片，本地预览，后续可接 S3/R2</span>
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image, index) => (
            <div key={image} className="space-y-2">
              <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                <img src={image} alt="菜谱照片预览" className="h-full w-full object-cover" />
              </div>
              <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => removeImage(index)}>
                移除
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
