# Execution Evidence Contract V1.0

## 1. Purpose

统一执行记录、业务 Artifact、Decision、Gate、Audit 与 Handoff 的证据关联，确保所有自动结论可追溯。

## 2. Evidence Chain

```text
Project
→ Phase
→ Task
→ Step
→ Tool / MCP / Skill / Capability / Model Run
→ Execution Record
→ Output Artifact
→ Decision
→ Quality Gate
→ Audit
→ Phase Output
→ Handoff
```

## 3. Evidence Fields

Material execution must retain where applicable:

- evidence_id;
- source_type;
- source_uri / repository path / artifact location;
- source_version / commit / timestamp;
- related_project / phase / task / step;
- original evidence summary;
- evaluation method;
- result;
- confidence when applicable;
- related decision / issue / gate;
- next action.

## 4. Fact Classification

每个重要结论区分：

- Fact：来源直接可验证的事实；
- Finding：基于证据得出的发现；
- Hypothesis：尚未验证的假设；
- Recommendation：建议动作；
- Decision：已确认的决策。

不得把 Hypothesis / Recommendation 当作 Fact。

## 5. Artifact Boundary

Execution Record 记录“怎么做”；Output Artifact 记录“交付什么”。

Execution log 不得替代 PRD、Design Specification、Technical Plan、Test Report、Release Record 等业务 Artifact。

## 6. PASS Rule

任何 Gate / Audit 的 PASS 必须满足：

`criterion passed + evidence exists + evidence version identifiable + evidence linked to target`

## 7. Persistence

执行结束时必须持久化：Input、Decision、Execution、Output、Verification、State、Evidence、Handoff。

## 8. Source of Truth

规则优先级：

`System Rule > Project Rule > Current Task > User Decision > Validated Output > Historical Knowledge > Inference`

发生冲突时不得 silently overwrite；必须形成 Change / Decision Record。
