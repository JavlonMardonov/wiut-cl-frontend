export default function normalizeFileUrl(fileUrl: string): string {
  return fileUrl.includes("https://")
    ? fileUrl
    : `${import.meta.env.VITE_BASE_URL}${fileUrl}`;
}
