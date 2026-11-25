---
file: "docs/standards/ruby-on-rails.md"
responsibility: "Ruby on Rails and Ruby standards: conventions, ActiveRecord and controller boundaries, error handling, code hygiene, naming, time handling, static analysis, and testing."
ai_instructions: "Load for Ruby on Rails and Ruby work when this standard applies to the project. Enforce explicit boundaries, safe database/query practices, static linting/security checks, and test verification."
archive_rule: "Living document. Update revision notes for any modifications."
project: "Playbook"
project-type: software
---

# Ruby on Rails & Ruby Standards

Scope: Ruby and Ruby on Rails application code, models, controllers, background jobs, migrations, and test suites in projects using this standard.

---

## 1. Tooling & Static Analysis

- **Framework & Language:** Follow the project's pinned Ruby and Rails versions and official Rails Guides (`guides.rubyonrails.org`).
- **Style & Linting:** Use RuboCop (`docs.rubocop.org` / `rubystyle.guide`), including relevant extensions such as `rubocop-rails`, `rubocop-performance`, and `rubocop-rspec` or `rubocop-minitest` where applicable.
- **Autocorrection:** Separate safe autocorrect (`rubocop -a` / `rubocop --autocorrect`) from unsafe autocorrect (`rubocop -A` / `rubocop --autocorrect-all`); inspect unsafe changes before committing.
- **Security Scanning:** Run static security analysis (such as Brakeman) and keep dependencies/credentials free of committed secrets.

---

## 2. Ruby Style & Code Hygiene

- **Layout:** Use UTF-8 encoding, 2-space soft tabs (no hard tabs), no trailing whitespace, and a trailing newline at end of file (`rubystyle.guide`).
- **Control Flow & Methods:** Prefer guard clauses over deep nesting; keep methods focused and concise; prefer keyword arguments when passing multiple options or booleans to clarify call sites.
- **Naming:** `snake_case` for methods, variables, symbols, files, and directories; `CamelCase` for classes and modules (one primary class/module per file matching path conventions); `SCREAMING_SNAKE_CASE` for constants.
- **Predicate & Bang Methods:** Name boolean queries with `?` (`valid_token?`) and mutating/raising counterparts with `!` (`save!`) with clear behavioral semantics.
- **Hygiene:** No dead/commented-out code, no debug statements in committed code, and no un-ticketed `TODO` / `FIXME` / `HACK` comments.

---

## 3. Rails Architecture & Boundaries

- **Routing & Controllers:** Keep controllers thin; enforce strong parameters (`params.expect` / `require` + `permit`) and explicit authorization/ownership checks on every action.
- **ActiveRecord Models & Queries:** Keep persistence rules, validations, associations, and scoped queries coherent; avoid N+1 queries and unvalidated mass assignment or raw SQL string interpolation.
- **Migrations:** Write reversible, targeted schema migrations; never edit already-applied migrations in shared environments—add a new migration instead.
- **Background Jobs & Mailers:** Keep Active Job payloads serializable and idempotent where retries can occur.

---

## 4. Error Handling & Date/Time

- **Explicit Failure Handling:** Never swallow exceptions silently or use blanket `rescue Exception` blocks; rescue specific expected error classes and handle or surface errors explicitly.
- **No Silent Workarounds:** Fix root causes rather than masking mismatches with dummy inputs, silent fallbacks, or unverified stubs.
- **Date & Time:** Store and compute timestamps in UTC (`Time.current` / `DateTime.current` / ActiveSupport time zones); avoid naive local-time assumptions or string date comparisons.

---

## 5. Testing

- **Test Suite:** Maintain automated tests using the project's test runner (Minitest or RSpec) covering models, requests/controllers, jobs, and key failure/edge paths.
- **Verification:** Run the test suite and static checks after changes and confirm passing results before closing tasks.

---

## 6. Phase Gates

Run before closing any phase touching Ruby on Rails code:

- [ ] Linter (`rubocop`) passes with no new offenses
- [ ] Security check (such as `brakeman`, when configured) reports no new high-severity issues
- [ ] Automated test suite (Minitest or RSpec) passes
- [ ] Migrations (if any) run and roll back cleanly in test/dev
- [ ] No secrets, debug statements, dead code, or un-ticketed `TODO`s

---

## Revision Notes

- **2026-11-26** — Initial Ruby on Rails & Ruby standards document based on official Rails Guides, Ruby Style Guide, and RuboCop conventions.
