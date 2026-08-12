import { supabase } from "@/integrations/supabase/client";

/**
 * Uploads a file straight to private storage using a short-lived signed upload
 * URL created on the server. Works for large files (MP4 recordings, big PDFs)
 * because the bytes never pass through a server function.
 */
export async function uploadToSignedPath(
  bucket: string,
  path: string,
  token: string,
  file: File,
): Promise<void> {
  const { error } = await supabase.storage
    .from(bucket)
    .uploadToSignedUrl(path, token, file, { contentType: file.type || "application/octet-stream" });
  if (error) throw new Error(error.message);
}
