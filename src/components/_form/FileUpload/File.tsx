import { CloudUpload } from "lucide-react";
import * as React from "react";
import Dropzone, { type FileRejection } from "react-dropzone";
import { toast } from "sonner";

import { ScrollArea } from "@/components/ScrollArea";
import { useControllableState } from "@/hooks/useControlllableState";
import { cn, formatBytes } from "@/lib/utils";

import { Card } from "../../Card/Card";

import { FileCard, isFileWithPreview } from "./FileCard";
import { FileUploaderProps } from "./type";

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    onUpload,
    progresses,
    accept = {
      "image/*": [],
      "application/pdf": ["PDF"],
      "application/msword": ["DOC"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        ["DOCX"],
      "application/vnd.ms-powerpoint": ["PPT"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        ["PPTX"],
      "application/vnd.ms-excel": ["XLS"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        "XLSX",
      ],
      "video/mp4": ["MP4"],
      "audio/mpeg": ["MP3"],
      "audio/wav": ["WAV"],
      "audio/ogg": ["OGG"],
      "text/plain": ["TXT"],
      "application/zip": ["ZIP"],
    },
    maxSize = 1024 * 1024 * 2,
    maxFileCount = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange,
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFileCount === 1 && acceptedFiles.length > 1) {
        toast.error("Cannot upload more than 1 file at a time");
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFileCount) {
        toast.error(`Cannot upload more than ${maxFileCount} files`);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;

      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file }) => {
          toast.error(`File ${file.name} was rejected`);
        });
      }
    },

    [files, maxFileCount, multiple, onUpload, setFiles],
  );

  function onRemove(index: number) {
    if (!files) return;
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  }

  React.useEffect(() => {
    return () => {
      if (!files) return;
      files.forEach((file) => {
        if (isFileWithPreview(file)) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFileCount;

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFileCount}
        multiple={maxFileCount > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-border-secondary px-5 py-2.5 text-center transition",
              "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isDragActive && "border-tertiary-color-fg",
              isDisabled &&
                "bg-bg-disabled-subtletext-text-tertiary pointer-events-none border-border-secondary opacity-60",
              className,
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed bg-transparent p-3">
                  <CloudUpload
                    className="size-7 text-fg-secondary"
                    aria-hidden="true"
                  />
                </div>
                <p className="font-medium text-text-secondary">
                  Drop the files here
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <Card className="rounded-full border bg-transparent p-3">
                  <CloudUpload
                    className="size-7 text-fg-secondary"
                    aria-hidden="true"
                  />
                </Card>
                <div className="flex flex-col gap-px">
                  <p className="font-medium text-text-secondary">
                    <span className="text-primary">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-sm text-text-secondary">
                    You can upload
                    {maxFileCount > 1
                      ? ` ${maxFileCount === Infinity ? "multiple" : maxFileCount}
                      files (up to ${formatBytes(maxSize)} each)`
                      : ` a file with ${formatBytes(maxSize)}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {files?.length ? (
        <ScrollArea className="h-fit w-full px-3">
          <div className="flex max-h-48 flex-col gap-4">
            {files?.map((file, index) => (
              <FileCard
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                file={file}
                onRemove={() => onRemove(index)}
                progress={progresses?.[file.name]}
              />
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
}
