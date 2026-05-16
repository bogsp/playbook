# AI-Assisted Development Without Code
## A Journey and Reference Guide

> How to build complex software with AI as your thinking partner —
> without needing to write a single line of code yourself.

*By Bogs — documented in real time as the project was built*

---

## Preface

This document records the actual process used to design and build a
complex AI orchestration stack from scratch. No code was written during
this phase. Everything here happened before a single file was touched.

The goal is not to teach programming. It is to show that the hardest
part of building software — thinking clearly about what you are building
and why — does not require technical skill. It requires structured
thinking, good questions, and a disciplined process.

This is that process, written down as it happened.

---

# Part 1 — The Mindset

## Chapter 1: Why Most People Use AI Wrong

The most common mistake: treating AI as a code generator.

You describe what you want. AI writes code. You paste it in. Something
breaks. You ask AI to fix it. Something else breaks. An hour later you
have code that technically runs but you do not understand, cannot
maintain, and are afraid to change.

This is not AI-assisted development. This is AI-assisted guessing.

The problem is not the AI. The problem is the order of operations.

Code is the last thing you should produce, not the first. Before code
exists there are decisions — hundreds of them. What does this thing
actually do? How does it connect to everything else? What happens when
it fails? Who is allowed to use it? These decisions do not write
themselves. If you skip them and go straight to code, the code makes
the decisions for you — badly, invisibly, and in ways that are
expensive to change later.

AI is extraordinarily good at helping you make decisions — if you ask
the right questions in the right order. It is a thinking partner, not
a typing assistant.

## Chapter 2: The Role of Structure

Structure is not bureaucracy. Structure is how you stop the same
conversation from happening twice.

Without structure, every AI session starts from zero. You re-explain
the project. AI re-suggests things you already rejected. You re-make
decisions you made last week. Progress is slow not because AI is
slow but because context is lost.

With structure, every session starts from where you left off. AI knows
what has been decided. It knows what is still open. It knows what you
are focused on right now. You spend the session thinking, not
re-explaining.

The tools in this guide — Context Kit, Playbook, flows, contracts, DDA
— exist to provide that structure. They are not overhead. They are the
reason the work compounds instead of resets.

## Chapter 3: Thinking With AI vs Delegating To AI

There is a difference between:

  "Build me an authentication system"

and:

  "I need users to log in securely. We are using WorkOS.
   Auth should be enforced at the database boundary, not
   in application code. What does that flow look like?"

The first is delegation. You get back code you do not understand.

The second is thinking together. You get back a flow you can reason
about, approve, and then ask AI to implement against a clear contract.

The discipline is asking questions before asking for output. Every
decision made in conversation is a decision that does not get made
badly inside the code.

---

# Part 2 — The Process

## Chapter 4: Start With Decisions, Not Code

The sequence that works:

```
1. What problem are we solving?           (PRD)
2. How do the parts communicate?          (flows)
3. What rules must every part follow?     (contracts)
4. What does each part consist of?        (DDA structure)
5. How does each part behave?             (DDA components)
6. How is it built?                       (code standards)
7. Build it                               (code)
8. Verify it                              (QA)
```

Most people start at step 7. By the time problems appear, steps 1–6
are implicit, inconsistent, and impossible to change without
rewriting everything.

Starting at step 1 feels slow. It is not. The time spent on decisions
is paid back immediately when implementation begins, because every
question the code would have forced you to answer has already been
answered.

## Chapter 5: The Context Kit — Keeping AI on Track

AI has no memory between sessions. Every new chat starts from zero.
The Context Kit solves this by externalising project memory into files
that are uploaded at the start of every session.

```
01-process.md      How we work + where we are right now
02-exploration.md  Open questions + closed decisions
03-execution.md    Guidelines + plan + tasks
04-progress.md     Append-only log of everything done
05-kanban.md       Ticketed work breakdown (optional)
06-qa.md           Test cases and sign-off (optional)
```

The discipline: update the files at the end of every session. Two
minutes of filing prevents an hour of re-explanation next time.

Key rules learned in practice:
- Closed decisions stay closed unless explicitly reopened
- Progress log is append-only — never edit past entries
- Current State must always be specific, never vague
- Files are kept lean — one responsibility per file

## Chapter 6: The Updated Playbook Pipeline

The full pipeline:

```
Context Kit → PRD → Flows + Contracts → DDA → Code → Rollout
```

**Flows** map every major runtime path before any component is defined.
They answer: what happens when X occurs? What happens when it fails?

**Contracts** define the rules every component must honour.
They answer: what constraints apply to every implementation decision?

These two stages sit between the PRD and the DDA. They are not
optional. Components designed without flows are guesses. Components
coded without contracts are inconsistent.

The flows and contracts stage was the biggest lesson from this project.
Every hour spent here prevented days of rework during implementation.

## Chapter 7: Flows and Sequences Before Components

One of the most important lessons:

*Map the flows before you define the components.*

A component without a flow is a black box. You know what it does
in isolation but not how it behaves in the system. Bugs live in
the connections between components, not inside them.

The process:
1. Define the major runtime paths
2. Walk each path step by step, including failure paths
3. Find gaps, race conditions, and unresolved questions
4. Separate flow files — one per flow, kept small
5. Companion contracts file — rules extracted from flows
6. Only then define the components

This project produced eleven flows before a single DDA doc was written.
Each flow was reviewed, corrected, and approved. Several required
multiple passes. Every correction in a flow file prevented a bug
in production code.

## Chapter 8: The No God-Component Rule

Applies to everything — not just code:

```
One responsibility per:
  component (code)
  file (code)
  DDA doc
  flow file
  contract file
  kit file section
  PRD section
```

A god-component is anything that does more than one thing.
The moment something does two things, it becomes hard to test,
hard to change, and hard to understand. Split it. Always.

Max ~150 lines per file. If a file grows beyond that, it is a signal
that it is doing too much.

## Chapter 9: Context Is a Resource

AI models have limited context windows. The more you put in, the less
headroom for the actual work. Every piece of context competes with
every other piece.

Lessons learned:
- Break large files into small, focused files
- Use index files to navigate — not to contain everything
- Pass excerpts to agents, not full documents
- Agent context packages: 100-500 tokens per role
- Keep kit files lean — archive when they grow
- One flow per file, one contract per flow

This applies to the project documentation, the AI context packages,
and the kit files. Small, focused, purposeful.

## Chapter 10: The Foundation Takes Longer Than the Code

Expect to spend more time on structure than on implementation.

In this project:
- Multiple full sessions on flows and sequences
- Architecture decisions revisited and corrected multiple times
- The PRD reviewed before a single DDA doc was written
- Flows reviewed, corrected, re-reviewed before DDA began
- Resource constraints, port ranges, Docker setup all defined
  before any code was considered

This is not inefficiency. This is the work. The implementation,
once the foundation is solid, goes quickly.

---

# Part 3 — The Tools

## Chapter 11: DDA — Documenting What You Are Building

Every component has a document before it has code.

Document types:
```
structure    Project or module manifest with living folder tree
sequencer    Runtime flow coordinator (replaces "orchestrator" type)
             Always includes Flow section + sequence diagram
component    Single unit of logic — one responsibility
concern      Cross-cutting capability (logging, auth, errors)
integration  Third-party service contract
```

Key rules:
- No code without a DDA doc
- No DDA doc without an approved flow
- DDA doc updated before code changes — always
- Components are small — god-components forbidden
- Max ~150 lines per component file

## Chapter 12: Flows + Contracts Structure

```
docs/
  flows/
    _index.md           ← start here
    flow-0-boot.md
    flow-1-task.md
    ... one file per flow
  contracts/
    _index.md           ← start here
    global.md           ← read first, every time
    flow-1-task.md
    ... one file per flow
```

Each flow file answers: what happens?
Each contract file answers: what rules apply?
Together they feed the DDA docs.

---

# Part 4 — The Journey

## Session 1 — Starting Point (2026-05-10)

**Where we started:**
An existing orchestrator project tightly coupled to raket-screening.
The immediate instinct was to refactor. We resisted it.

**The shift:**
Instead of fixing the immediate problem, we asked: what should this
become? That question changed everything.

**What we did:**
- Reviewed existing kit files and PRD
- Decided to design the full architecture before touching code
- Established monorepo structure, naming conventions
- Defined agent role catalog
- Chose Convex (self-hosted, Postgres-backed) as DB
- Chose Docker Compose for process orchestration
- Mapped boot sequence across 6 phases

**Key decisions:**
- Orchestrator app name unchanged; DDA type renamed to `sequencer`
- Ralph loop fixed at 3 attempts
- Role selection is pure TypeScript — no model needed
- 3-tier streaming model (buffer, debounce, single write)
- vision role is orchestrator-level, not project-specific
- discovery and models-api as independent apps
- WorkOS Free tier for auth, JWT at Convex boundary

**Key insight:**
Naming matters more than it seems. "Orchestrator" meant four different
things. Renaming early prevents confusion that compounds.

## Session 2 — Flows and Sequences (2026-05-10, continued)

**What we did:**
- Mapped all eleven flows in detail
- Discovered and corrected several design issues:
  - SSE race condition (fixed by project-level connection)
  - Agent timeout had no escalation path (added)
  - Ralph loop had a race condition (atomic claiming added)
  - Superseded tasks could keep running (Models API subscription added)
  - Degraded tasks had no retry trigger (model-ready subscription added)
  - Concurrent template proposals created duplicates (dedup added)
  - Discovery concurrent kit writes could conflict (write queue added)
- Consolidated kit assistant and emergency console into one Console
- Established resource constraints from actual PC specs
- Defined graduated throttling (5 levels, self-managing)
- Added hardware profile detection

**Key insight:**
Flows catch bugs before they become code. Every issue found in the
flow mapping phase is a bug that would have appeared in production.
The question "what happens when X fails?" finds more issues than
any amount of unit testing.

**Key insight:**
Keep files small. The instinct was to write one large flows.md.
The right answer was one file per flow, an index, and a companion
contracts folder. Models need to read only what is relevant — not
everything at once.

**Key insight:**
Consolidation is not just about code. The kit assistant and emergency
console were two separate designs solving the same problem. Merging
them simplified both the architecture and the user experience.

**Files produced this session:**
- docs/flows/ (11 flow files + index)
- docs/contracts/ (11 contract files + index + global)
- All six kit files updated
- journey.md updated

---

# Part 5 — Replication Guide

## How to Start Your Own Project This Way

### Step 1: Resist the urge to build anything

The first session should produce no code. It should produce clarity.

Describe the project in two sentences. Then ask:
"What decisions do we need to make before we can design this?"

Work through those decisions. Document them in kit files.

### Step 2: Set up your Context Kit

Four files. Ten minutes. Pays back in every future session.

### Step 3: Write the PRD with AI

Draft from closed decisions. Review carefully. Approve only when
accurate. The PRD is the contract between you and the project.

### Step 4: Map the flows

Before any component is defined, walk through every major runtime path.
One flow per file. Include failure paths. Find the gaps.

Ask for every flow: "What happens when this fails? What happens when
the connection drops? What happens when it restarts?"

### Step 5: Write the contracts

Extract the rules from the flows into a companion contracts folder.
One file per flow. Always a global.md read first.

### Step 6: Define the structure

Apps, packages, folder tree. Names consistent throughout.
Port ranges. Docker groups. Dependencies explicit.

### Step 7: Write DDA docs top-down

Structure → sequencer → component. Never component first.
Read the relevant flow and contract files before each doc.

### Step 8: Build

AI implements against DDA docs. Review output. Run checks.
If code diverges from doc, update the doc first.

### Common Mistakes to Avoid

**Skipping the flows stage.**
This is the most common shortcut. It creates the most rework.
Every hour in flows prevents four hours in debugging.

**One large file instead of many small ones.**
AI models have limited context. Small focused files are more
useful than large comprehensive ones.

**Letting the AI decide the architecture.**
AI proposes. You decide. Approve explicitly. Every decision.

**Not updating kit files at session end.**
Two minutes now prevents twenty minutes of re-explanation next time.

**Building before the foundation is solid.**
Momentum is not progress. Rework is expensive.
One hour of design prevents four hours of refactoring.

---

## Closing Note

This guide will grow as the project progresses. Each session adds
to Part 4. Each lesson updates Part 5.

The goal is an honest record of how a complex project was built,
decision by decision, with AI as a thinking partner.

If you can read this and replicate the process, it has done its job.
