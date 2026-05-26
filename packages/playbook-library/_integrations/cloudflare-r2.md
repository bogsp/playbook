# Cloudflare R2
# File: packages/playbook-library/_integrations/cloudflare-r2.md
# Version: 1.0.0

---
id: cloudflare-r2
type: integration
kind: external-service
status: active
used-by: []
config: [R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL]
docs: https://developers.cloudflare.com/r2/
---

## What It Does

Object storage for user-uploaded files, generated assets, and static content.
S3-compatible API. No egress fees for data served via Cloudflare CDN.
Files are never served directly from the R2 bucket URL -- always via signed URLs
or a public CDN domain.

## Interface

What this integration exposes to the system:

- **Upload** -- store a file at a given key; returns the storage key on success
- **Download (signed URL)** -- generate a time-limited URL for private file access
- **Delete** -- remove a file by key
- **Exists** -- check whether a key exists without downloading the file

## Behavior

**Upload:**
- Files are always stored with an explicit content type -- never inferred
- Storage keys follow a defined pattern: `[entity-type]/[entity-id]/[filename]`
- Duplicate keys overwrite the existing file -- callers must ensure key uniqueness
- Maximum file size is enforced before upload begins -- never after

**Signed URLs:**
- Expiry must always be declared explicitly -- never use a default
- Minimum expiry: 15 minutes
- Maximum expiry: 60 minutes for user-facing downloads
- Signed URLs are single-use where the use case allows
- The raw R2 bucket URL is never exposed to clients under any circumstances

**Delete:**
- Deleting a non-existent key is not an error -- it is a no-op
- Deletion is permanent -- no recycle bin, no soft delete via this integration
- Soft delete must be handled at the application layer before calling delete

**Rules:**
- The R2 bucket must never be publicly accessible
- Access credentials must never appear in logs, errors, or responses
- All operations are wrapped in the Result pattern -- never throw
- Failed uploads must clean up any partial state before returning an error
- File size validation happens before the upload is initiated -- never after

## Constraints

- Used-by must be declared in every component doc that calls this integration
- No component calls R2 directly -- always via a dedicated storage adapter
- The storage adapter is the only place R2 credentials are accessed
- Signed URL generation is the only permitted method for client file access
- Content-type must always be set explicitly on upload
