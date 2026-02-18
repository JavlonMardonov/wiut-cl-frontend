import { X } from "lucide-react";

import { IconButton } from "@/components/Button/IconButton";

import { formatBytes } from "../../../lib/utils";
import { Card } from "../../Card/Card";
import { Progress } from "../../Progress/Progress";

import { fileThumb } from "./utils";

interface FileCardProps {
  file: File;
  onRemove: () => void;
  progress?: number;
}

interface FilePreviewProps {
  file: File & { preview: string } & { relativePath: string };
}
export function isFileWithPreview(
  file: File,
): file is File & { preview: string } & { relativePath: string } {
  return "preview" in file && typeof file.preview === "string";
}

export function FilePreview({ file }: FilePreviewProps) {
  if (file.type.startsWith("image/")) {
    return (
      <img
        src={file.preview}
        alt={file.name}
        width={48}
        height={48}
        loading="lazy"
        className="aspect-square shrink-0 rounded-md object-cover"
      />
    );
  }

  return (
    <img
      src={fileThumb(file.relativePath)}
      alt={file.type}
      width={48}
      height={48}
      loading="lazy"
    />
  );
}

export function FileCard({ file, progress, onRemove }: FileCardProps) {
  return (
    <Card className="relative flex w-full items-center gap-2.5 p-2">
      <div className="flex flex-1 gap-2.5">
        {isFileWithPreview(file) ? <FilePreview file={file} /> : null}
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-px">
            <p className="line-clamp-1 text-sm font-medium text-text-secondary">
              {file.name}
            </p>
            <p className="text-xs text-text-secondary">
              {formatBytes(file.size)}
            </p>
          </div>
          {progress ? <Progress value={progress} /> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <IconButton
          type="button"
          variant="outline"
          className="size-7"
          onClick={onRemove}
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </IconButton>
      </div>
    </Card>
  );
}
