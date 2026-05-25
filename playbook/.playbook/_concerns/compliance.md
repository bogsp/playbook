# Compliance Concern
# File: .playbook/_concerns/compliance.md
# Status: active

Compliance is a cross-cutting concern. It is not a module — it touches every
layer and every flow that involves user data, money movement, or user-generated
content. This document defines what compliance means in the Raket codebase,
which interfaces enforce it, and when each must be referenced.

---

## Why This Exists

Raket operates under Philippine law and handles payments, personal data, and
user-generated content. The platform does not control what users post. This
creates obligations that must be systematically enforced — not left to
individual developer judgment on a feature-by-feature basis.

The compliance concern ensures that no flow is approved without explicitly
addressing its compliance obligations.

---

## Compliance Interfaces

These live in infrastructure/ and are implemented by service adapters.
Every flow that triggers a compliance obligation must reference the relevant
interface in its flow doc and contract.

### IAuditLog — infrastructure/audit/
Immutable, append-only event log. Never deleted, never modified.

```typescript
interface IAuditLog {
  log(event: AuditEvent): Promise<Result<void, AuditError>>
}
```

**Required when:** any state change to user data, financial records, content
moderation decisions, configuration changes, or access to protected resources.

---

### IPrivacyService — infrastructure/privacy/
Data subject rights and consent management per RA 10173 (DPA).

```typescript
interface IPrivacyService {
  logConsent(userId: string, version: string, timestamp: Date): Promise<Result<void, PrivacyError>>
  anonymize(userId: string): Promise<Result<void, PrivacyError>>
  exportSubjectData(userId: string): Promise<Result<SubjectDataExport, PrivacyError>>
}
```

**Required when:** user registration or ToS acceptance (logConsent), account
deletion requests (anonymize), data access requests (exportSubjectData).

---

### ITaxEngine — infrastructure/tax/
VAT computation, withholding tax, and BIR audit record generation per RA 8424.

```typescript
interface ITaxEngine {
  computeVAT(amount: Money): Result<TaxBreakdown, TaxError>
  computeWithholding(amount: Money, raketeerId: string): Result<TaxBreakdown, TaxError>
  generateAuditRecord(transaction: Transaction): Promise<Result<TaxRecord, TaxError>>
}
```

**Required when:** any transaction involving platform fees, payouts, or
financial records. Every transaction must record gross amount, VAT amount,
withholding amount, and net amount.

---

### ILegalDocumentStore — infrastructure/legal/
Immutable storage for legal documents — receipts, certificates, preserved
evidence. Documents are write-once; no updates, no deletes.

```typescript
interface ILegalDocumentStore {
  storeReceipt(transaction: Transaction): Promise<Result<Receipt, LegalError>>
  storeCertificate(certificate: TaxCertificate): Promise<Result<void, LegalError>>
  preserveEvidence(accountId: string, reason: string): Promise<Result<EvidencePackage, LegalError>>
}
```

**Required when:** transaction completion (receipt), payout processing
(BIR Form 2307 certificate), IP takedown or law enforcement request
(evidence preservation).

---

## Compliance Gates

### Content Moderation Gate
**Applies to:** every listing submission flow

Checks required before a listing enters the moderation queue:
- Product type declared (`ORIGINAL_WORK`, `RESELL_RIGHTS`, `EXTERNAL_LINK`, `LICENSE_KEY`)
- If `RESELL_RIGHTS` or `LICENSE_KEY`: license document uploaded and logged
- If `EXTERNAL_LINK`: URL resolves to content the Raketeer controls
- AI screening for third-party brand references
- AuditLog entry: submission received, declared type, document hash if applicable

---

### Transaction Gate
**Applies to:** every payment flow

Required on every transaction:
- Tax breakdown computed via ITaxEngine before payment is initiated
- TaxRecord created and stored via ILegalDocumentStore on payment confirmation
- Receipt generated and stored
- AuditLog entry: transaction created, payment status, amounts

---

### Consent Gate
**Applies to:** user registration, ToS acceptance, any new consent requirement

Required:
- IPrivacyService.logConsent() called with ToS version and timestamp
- AuditLog entry: consent recorded, version, user

---

### Data Access Gate
**Applies to:** any endpoint returning personal data

Required:
- Requester identity verified (auth context)
- Access reason logged via IAuditLog
- For data subject requests: IPrivacyService.exportSubjectData() used

---

### File Access Gate
**Applies to:** every digital product download

Required:
- Order verified: exists, paid, buyer identity matches
- Signed URL generated (15–60 min expiry) — never direct R2 URL
- Download event logged: timestamp, IP, user agent, order ID
- R2 bucket never publicly accessible

---

### IP Takedown Gate
**Applies to:** rights holder takedown submissions

Required:
- Submission logged with timestamp via IAuditLog
- Response SLA clock started
- Raketeer notified within defined window
- Evidence preserved via ILegalDocumentStore
- Resolution logged

---

## Phase Completion Checklist Addition

Add these questions to the Phase Completion Checklist for every flow and
every component doc submitted for review:

```
Compliance check (answer each):

□ Does this flow create or modify user data?
  → IPrivacyService referenced in flow doc and contract

□ Does this flow involve money movement?
  → ITaxEngine and ILegalDocumentStore referenced
  → Tax breakdown computed before payment initiated
  → Receipt and audit record generated on completion

□ Does this flow involve user-generated content?
  → Content moderation gate referenced
  → IP verification step documented if applicable

□ Does this flow involve file access?
  → Signed URL delivery documented
  → Download logging referenced
  → Direct R2 access confirmed as prohibited

□ Does this flow require user consent?
  → IPrivacyService.logConsent() referenced
  → Consent version and timestamp documented

□ Does this flow involve any state change?
  → IAuditLog.log() referenced
  → AuditEvent type defined in domain/compliance/
```

No flow is approved without all applicable boxes checked.

---

## Philippine Legal References

| Law | Scope | Key obligations |
|---|---|---|
| RA 8424 — Tax Code | All transactions | VAT on platform fees, withholding tax, BIR records |
| RA 10173 — DPA | All personal data | Consent, data subject rights, breach notification (72hr) |
| RA 8293 — IP Code | User-generated content | Takedown process, rights verification, safe harbor |
| RA 10175 — Cybercrime Prevention | Platform operations | Evidence preservation, law enforcement cooperation |
| RA 8792 — E-Commerce Act | All transactions | Electronic receipts, immutable transaction records, ToS |
| BSP Circular 649 | Wallet / money movement | EMI licensing review, KYC thresholds |

---

## Related

- domain/compliance/ — TaxRecord, ConsentRecord, AuditEvent, LegalDocument
- infrastructure/audit/ — IAuditLog interface
- infrastructure/privacy/ — IPrivacyService interface
- infrastructure/tax/ — ITaxEngine interface
- infrastructure/legal/ — ILegalDocumentStore interface
- prd/compliance/prd.md — compliance module PRD
- docs/code-standards.md — Error handling, Result type, layer rules
