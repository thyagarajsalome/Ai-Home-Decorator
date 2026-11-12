import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || "aecd4a2eaf3342cb721dfd1717a810a2";
const accessKeyId = process.env.R2_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || "";
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "ai-homedecorator-store";

/**
 * Cloudflare R2 S3 Client
 */
export function getR2Client(): S3Client {
  if (!accessKeyId || !secretAccessKey) {
    console.warn("⚠️ R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY is not set in environment.");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

/**
 * Generate a temporary signed download URL (default: 15 minutes)
 */
export async function getSignedDownloadUrl(fileKey: string, expiresInSeconds = 900): Promise<string> {
  const client = getR2Client();
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileKey,
  });
  return await getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

/**
 * Upload a file buffer directly to Cloudflare R2
 */
export async function uploadToR2(
  fileKey: string,
  buffer: Buffer,
  contentType: string = "application/pdf"
): Promise<{ key: string; bucket: string; size: number }> {
  const client = getR2Client();
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: fileKey,
    Body: buffer,
    ContentType: contentType,
  });

  await client.send(command);

  return {
    key: fileKey,
    bucket: R2_BUCKET_NAME,
    size: buffer.length,
  };
}
