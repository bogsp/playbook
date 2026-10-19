# T-10 Flow

```text
[Source Templates] 
       │
       ▼
[Shared Core Module (K-56)] ──> [File Processing & Copying]
       │
       ▼
[Budget Checker Utility (K-55)] ──> {Size/Token Within Limit?}
                                         ├── Yes ──> [Build Success]
                                         └── No  ──> [Build Failure / Warning]
```
