# T-10 Planning: Budget Checker & Shared Core

## Objective
Implement K-55 (budget checker utility) and K-56 (shared core consolidation) to ensure scaffolded template sizes remain within optimal limits and eliminate code duplication between packages.

## Scope
1. **K-55**: A script/utility that scans generated templates and assets for size/token budgets, failing the build if limits are exceeded.
2. **K-56**: Extract common file system and template processing helpers into a shared core module.
