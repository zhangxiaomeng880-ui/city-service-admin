# Environment Matrix V2.0

## 目标
统一记录项目版本、分支、环境和验证状态，避免“代码存在”被误判为“环境就绪”。

## Matrix

| Environment | Branch | Version | Commit | Status | Last Verified | Evidence |
|---|---|---|---|---|---|---|
| Local | ... | ... | ... | ... | ... | ... |
| Preview | ... | ... | ... | ... | ... | ... |
| Test | ... | ... | ... | ... | ... | ... |
| Production | ... | ... | ... | ... | ... | ... |

仅记录实际存在的环境。

## Gate

每个环境独立验证。Preview 未验证不得标记 Preview PASS；Production 状态不得由 Local/Test 状态推导。

## Project Start / Resume

Project Agent 在新项目创建和已有项目恢复时都检查 Environment Matrix，并识别当前版本、最新版本、分支和 Commit。
