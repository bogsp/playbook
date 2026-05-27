# llama.cpp
# File: packages/playbook-library/_integrations/llama-cpp.md
# Version: 1.0.0

---
id: llama-cpp
type: integration
kind: external-service
status: active
used-by: []
config: [LLAMA_CPP_BIN_PATH, LLAMA_CPP_MODELS_PATH]
docs: https://github.com/ggerganov/llama.cpp
---

## What It Does

Local inference runtime for model loading, text generation, and streaming token
output. The runtime is managed by a dedicated model service; application code
never starts or calls llama.cpp directly.

## Interface

- **Load Model** -- start a model process with declared resources
- **Unload Model** -- stop idle or replaced model process
- **Inference Request** -- submit prompt/context to loaded model
- **Stream Output** -- receive incremental generation events
- **Health Check** -- report process and model state

## Behavior

**Runtime ownership:**
- One service owns process lifecycle
- Each model process has a declared port and resource budget
- Model load/unload is serialized per resource pool
- Streaming output is relayed through the owning service, not directly to clients

**Resource rules:**
- CPU threads, context size, RAM budget, and GPU offload are configuration
- Resource availability is checked before loading a model
- Model files are read-only at runtime
- Port allocation is explicit and released on process exit

**Failure rules:**
- Stalled generation has a timeout and recovery path
- Crashed processes are removed from the registry
- Partial output is checkpointed only when the caller can resume safely

## Failure Modes

- Model process starts but never becomes ready
- Port remains reserved after process crash
- Output stream stalls without process exit
- Resource estimate undercounts memory and destabilizes the host

## Constraints

- Only a model-runtime adapter may call llama.cpp
- Application layers call a model service port instead of process APIs
- All process events are logged with model ID, port, and trace ID
- No model path or prompt content containing secrets is logged
