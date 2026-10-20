---
file: 'docs/terminal-protocol.md'
responsibility: 'Comprehensive guide on Human-in-the-Loop CLI and terminal-driven execution workflows for Playbook.'
ai_instructions: 'Load when executing terminal loops or configuring cross-platform LLM terminal execution.'
archive_rule: 'N/A — reference guide.'
owner: project
---

# Terminal Execution Protocol (CLI Loop)

Playbook supports a high-efficiency **Terminal-Driven Execution Loop** where the AI acts as the architect and diagnostician, and the user acts as the secure execution engine in their local terminal.

## Why Use Terminal Loops?
* **Zero Background Scraping Overhead:** Avoids heavy automated repo crawling that wastes rate limits and token windows.
* **Surgical Precision:** The AI requests exact command outputs (`git status`, test tracebacks, build stdout) only when needed.
* **Human-in-the-Loop Safety:** Prevents runaway agentic mistakes by keeping human review between command proposal and execution.

## The Standardized Loop
1. **Command Proposal:** The AI prescribes a single, deterministic bash command along with expectations on what output to look for.
2. **Execution:** The user runs the command locally in their terminal.
3. **Feedback Ingestion:** The user pastes back the exact stdout/stderr payload.
4. **Diagnosis & Iteration:** The AI parses the response and prescribes the next step or fix.

## Cross-Platform Optimization & Token Economy
Different LLM apps handle context differently. Use these strategies per platform:
* **Gemini:** Highly forgiving of long conversational threads and multi-file contexts. Well-suited for fluid back-and-forth terminal debugging.
* **Claude:** Ideal for structured projects. Set up a permanent "Playbook Project" containing `rules.md` as project knowledge to minimize repeat prompts.
* **ChatGPT / Grok:** Strict context limits. Rely heavily on concise terminal feedback loops rather than uploading entire codebases.
