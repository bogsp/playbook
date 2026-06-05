# Maintenance
# File: .playbook/maintenance.md

> Lean files stay useful. Heavy files get ignored.

---

## When to Do This

Run maintenance at natural breaks — end of a phase, start of a new milestone, or whenever any file starts feeling too long to be useful.

---

## Session Files

**Rule:** Active files hold what is current. Archives hold the history.

| File | Move to archive when... |
|---|---|
| `.kit/02-exploration.md` | A settled decision is no longer needed to make any current choice |
| `.kit/04-progress.md` | Entries are from a finished phase |
| `.kit/05-kanban.md` | Completed tickets are no longer referenced by anything active |

**How to archive:**
1. Move the content to `.kit/_archives/[exploration | progress | kanban]/`
2. Add a header to the archived file:
   ```
   # Archive: [title]
   Date Range: YYYY-MM-DD to YYYY-MM-DD
   Phase: [phase name]
   Archived: YYYY-MM-DD
   Reason: [one line]
   ```
3. Nothing is deleted — only moved.

---

## Planning Documents

**Rule:** Planning documents reflect the current state of work. A document that no longer matches what was built is wrong.

Check planning documents when:
- A piece changes significantly
- A new outside tool or dependency is added
- A piece is retired or merged into another

**How to check:**
1. Compare the planning document to the current work
2. Update any fields that have changed
3. Update the folder map in `_index.md` if anything was added or removed
4. Mark retired pieces `status: deprecated` — do not delete the document

---

## Path and Rules Documents

Paths and rules are locked once agreed on. They only change when:
- The actual behaviour of the project changes
- A gap or error is found during work

When a path changes:
1. Update the path document first
2. Update the matching rules document
3. Update any planning documents that reference the changed behaviour
4. Log the change in `.kit/04-progress.md`

---

## Milestone Summaries

Milestone summaries are generated — never written by hand.

If a summary needs to be corrected:
1. Correct the source planning documents
2. Regenerate the summary
3. Replace the old file

---

## Domain Vocabulary Folders

Vocabulary folders grow as the domain becomes better understood. When updating:
1. Update `README.md` with any new concepts or changed language
2. Update `AI-INSTRUCTIONS.md` with any new rules
3. Note the date at the top of the file
4. If anything breaks with how things worked before, say so clearly

---

## Signs It Is Time to Maintain

- Session files take more than one scroll to read
- AI starts suggesting things already decided and closed
- Planning documents reference files that no longer exist
- Folder maps are out of date
- The progress log spans more than one phase

---

## Quick Checklist

- [ ] Session files are current — archive what is no longer active
- [ ] Planning documents reflect the current state of work
- [ ] Folder maps are accurate
- [ ] Paths and rules match current behaviour
- [ ] No `draft` documents are in active work paths
- [ ] A milestone summary exists for the most recent milestone
