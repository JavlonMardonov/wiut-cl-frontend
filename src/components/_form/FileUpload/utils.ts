// Define more types here
const FORMAT_PDF = ["pdf"];
const FORMAT_TEXT = ["txt"];
const FORMAT_PHOTOSHOP = ["psd"];
const FORMAT_WORD = ["doc", "docx"];
const FORMAT_EXCEL = ["xls", "xlsx"];
const FORMAT_ZIP = ["zip", "rar", "iso"];
const FORMAT_ILLUSTRATOR = ["ai", "esp"];
const FORMAT_POWERPOINT = ["ppt", "pptx"];
const FORMAT_AUDIO = ["wav", "aif", "mp3", "aac"];
const FORMAT_IMG = ["jpg", "jpeg", "gif", "bmp", "png", "svg", "webp"];
const FORMAT_VIDEO = ["m4v", "avi", "mpg", "mp4", "webm"];

const iconUrl = (icon: string) => `assets/icons/files/${icon}.svg`;

// ----------------------------------------------------------------------

export function fileTypeByUrl(fileUrl: string) {
  return (fileUrl && fileUrl.split(".").pop()) || "";
}

// ----------------------------------------------------------------------

export function fileNameByUrl(fileUrl: string) {
  return fileUrl.split("/").pop();
}

// ----------------------------------------------------------------------

export function fileFormat(fileUrl: string) {
  const formatMapping: { [key: string]: string[] } = {
    txt: FORMAT_TEXT,
    zip: FORMAT_ZIP,
    audio: FORMAT_AUDIO,
    image: FORMAT_IMG,
    video: FORMAT_VIDEO,
    word: FORMAT_WORD,
    excel: FORMAT_EXCEL,
    powerpoint: FORMAT_POWERPOINT,
    pdf: FORMAT_PDF,
    photoshop: FORMAT_PHOTOSHOP,
    illustrator: FORMAT_ILLUSTRATOR,
  };

  const fileByUrl = fileTypeByUrl(fileUrl);

  const format = Object.keys(formatMapping).find((key) =>
    formatMapping[key].includes(fileByUrl),
  );

  return format || fileByUrl;
}

// ----------------------------------------------------------------------
export function fileThumb(fileUrl: string) {
  const formatToIcon: Record<string, string> = {
    folder: "ic_folder",
    txt: "ic_txt",
    zip: "ic_zip",
    audio: "ic_audio",
    video: "ic_video",
    word: "ic_word",
    excel: "ic_excel",
    powerpoint: "ic_power_point",
    pdf: "ic_pdf",
    photoshop: "ic_pts",
    illustrator: "ic_ai",
    image: "ic_img",
  };

  const format = fileFormat(fileUrl);
  const iconName = formatToIcon[format] || "ic_file";

  return iconUrl(iconName);
}
