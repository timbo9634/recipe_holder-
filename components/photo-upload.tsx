"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function PhotoUpload({
  files,
  onChange,
}: {
  files: File[];
  onChange: (files: File[]) => void;
}) {
  const previews = useMemo(
    () => files.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [files]
  );

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    onChange([...files, ...selected]);
    e.target.value = "";
  }

  function removeFile(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center transition hover:bg-muted/50">
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
        <Upload className="mb-3 h-6 w-6 text-muted-foreground" />
        <span className="text-sm font-medium">点击上传成品照片</span>
        <span className="mt-1 text-xs text-muted-foreground">支持多张图片，本地预览，后续可接 S3/R2</span>
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {previews.map((preview, index) => (
            <div key={preview.url} className="space-y-2">
              <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
                <Image src={preview.url} alt="菜谱照片预览" fill className="object-cover" />
              </div>
              <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => removeFile(index)}>
                移除
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
