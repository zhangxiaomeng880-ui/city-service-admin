# Audit Trigger Rule V2.1

## Purpose

Audit Agent 是独立持续监督机制。任何影响 AI Native OS 行为、项目状态或质量结论的变更，都必须触发 Audit。

## Mandatory Triggers

1. Agent MD / Agent Contract 更新
2. Rule / Contract 更新
3. Knowledge Base 更新
4. Retrospective 更新
5. Project Context Schema 更新
6. Stage / Lifecycle 规则更新
7. Gate / Quality Rule 更新
8. Handoff Schema 更新
9. Environment / Release Rule 更新
10. 阶段完成或 Gate 生成/变更
11. Release 前
12. 用户主动要求 Audit

## Audit Cycle

```text
Change
↓
Verification
↓
Independent Audit
↓
Gate
↓
Human Gate（需要时）
```

## Remediation Cycle

```text
Audit Finding
↓
Owner Agent / User Remediation
↓
Changed Evidence
↓
Re-Audit
↓
New Audit Cycle
```

旧 Audit PASS 不得覆盖新的变更，也不得被修复后的状态直接继承。

## Scope Minimization

Audit 必须覆盖受影响范围，但不要求重复读取整个项目。优先使用 Change Set / Diff / Contract / Evidence / Handoff / Gate。

## Gate

- PASS：范围内规则、Evidence、Gate、Handoff 和结论满足要求。
- PARTIAL：存在非阻塞问题，需记录并持续跟踪。
- BLOCKED：存在关键缺陷或 Evidence 缺失，禁止继续依赖该结论。
- NOT_RUN：未执行审计。

任何被 Mandatory Trigger 触发但尚未执行的 Audit，状态必须为 NOT_RUN，不得显示为 PASS。