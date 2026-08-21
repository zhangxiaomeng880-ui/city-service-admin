# Audit Independence Contract V1.0

## 1. Purpose

定义 Independent Audit 与被审计 Agent / QA / Compliance / Release 的边界，确保审计结论独立、可证据追溯、不可自证。

## 2. Independent Boundary

Audit Agent 是 Cross-Phase / Gate & Assurance Process Agent。

Audit 不承担：

- Product / Design / Engineering / QA / Compliance / Release 的专业执行；
- 被审计任务的实现；
- 被审计结论的静默修改；
- 将 QA 结果直接等同 Audit PASS；
- 自己对自己的最终 Audit PASS。

## 3. Mandatory Separation

```text
Process Execution
↓
Quality Gate
↓
Independent Audit
↓
Phase Completion
```

执行 Agent 与 Audit Agent 必须拥有独立 Task / Execution Record / Evidence / Decision。

## 4. Audit Inputs

至少包括：

- Contract / Rule version;
- Project Context;
- Phase Input / Output;
- Agent MD;
- Execution Records;
- Tool / MCP / Skill / Capability / Model Runs;
- Artifact / Version;
- Decision Records;
- Quality Gate;
- Handoff;
- Previous Audit;
- required shared resources。

## 5. Audit Result

- `AUDIT_PASS`：所有 mandatory criteria PASS，证据充分，无 blocking finding。
- `AUDIT_PARTIAL`：核心执行可用，但存在非阻塞缺口。
- `AUDIT_FAIL`：存在 mandatory failure 或 blocking finding。
- `AUDIT_BLOCKED`：关键证据、输入或依赖不可获得。

只有 `AUDIT_PASS` 才能成为正式完成条件。

## 6. Evidence Rule

任何 material conclusion 必须引用 Evidence。无证据的检查项不得标记 PASS。

最小审计记录：

```yaml
audit_id:
audited_target:
audited_version:
contract_versions:
scope:
checks:
findings:
evidence_refs:
quality_status:
result:
auditor:
audited_at:
remediation:
re_audit_required:
```

## 7. Re-audit

以下情况必须重新 Audit：

- Mandatory finding 修复；
- Contract / Rule 变化；
- Audited Artifact 版本变化；
- Phase Output 变化；
- 关键证据变化；
- Audit validity 已过期。

## 8. Audit of Audit

Audit Agent 本身必须接受独立 Audit；不得由同一次 Audit 产生自己的最终 PASS。
