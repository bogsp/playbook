# Signed URL Delivery
# File: packages/playbook-library/_solutions/signed-url-delivery.md
# Version: 1.0.0

---
id: signed-url-delivery
type: solution
status: active
applies-to: [file-download, digital-product-delivery, private-asset-access]
integrations: [cloudflare-r2]
---

## What It Solves

Delivering private files to authenticated users without exposing storage
credentials, bucket URLs, or permanent access links. The file is never
publicly accessible. Access is granted per-request, per-user, for a
limited time window.

## Behavior

**The delivery sequence:**
1. Caller presents a verified identity and a resource identifier
2. System verifies the caller has permission to access the resource
3. System verifies the resource exists
4. System generates a signed URL with an explicit expiry
5. System returns the signed URL to the caller
6. Caller uses the URL directly -- the system is not in the download path

**Expiry rules:**
- Expiry must always be declared explicitly -- never a default
- Standard window: 15 minutes for immediate downloads
- Extended window: 60 minutes maximum for slower connections or large files
- Expiry starts from the moment the URL is generated -- not from when it is used

**Access verification:**
- Identity must be verified before URL generation begins
- Permission must be confirmed before URL generation begins
- Resource existence must be confirmed before URL generation begins
- All three checks must pass -- partial passes are not permitted

**Logging requirements:**
- Every URL generation must be logged: timestamp, caller identity, resource key, expiry
- Every download event must be logged if the storage provider supports delivery callbacks
- Failed access attempts must be logged: timestamp, caller identity, resource key, failure reason

**Rules:**
- The raw storage URL is never returned to the caller under any circumstances
- Signed URLs are never stored -- they are generated on demand
- A signed URL must never be reused across different callers
- Expiry is always enforced by the storage provider -- never by the application
- If URL generation fails, the error is returned -- never a fallback to direct access

## Constraints

- This solution requires a storage integration that supports signed URL generation
- The delivery endpoint must be authenticated -- never public
- Signed URL generation is always the last step -- never before permission checks
- Failed deliveries must not reveal whether the resource exists to unauthorized callers
