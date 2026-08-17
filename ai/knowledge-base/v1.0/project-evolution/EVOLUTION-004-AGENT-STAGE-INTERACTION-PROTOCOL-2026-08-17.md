# EVOLUTION-004 — Agent Stage Interaction Protocol

## 1. Background

本轮在完成 Agent MD 全量核对、阶段职责确认和条件 Agent 补齐后，进一步明确了一个执行层问题：阶段 Agent 不能只定义 Input / Execution / Output，还必须定义用户如何启动阶段、Agent 如何自动读取输入、何时执行、何时暂停以及如何输出结果。

## 2. Confirmed Decisions

1. 用户使用 `启动 [Stage]` 作为标准启动关键词。
2. Agent 自动读取 Stage Contract、Project Manifest、Version / Environment Context、上游 Output、Handoff 与 Knowledge。
3. Agent 自动执行 Input Readiness → Input Verification → Gate，不要求用户重复输入已有信息。
4. Input PASS 后自动进入 Execution；PASS WITH WARNING 在非 blocker 情况下继续；BLOCKED 才向用户索取信息或决策。
5. Execution 开始前输出简洁执行计划；用户无需再次输入“执行”。
6. Execution 完成后必须执行 Output Verification、Gate、Handoff，不能只宣布完成。
7. Conditional Agent 永久存在；本项目不适用时使用 SKIPPED，并保留判断依据，不删除 Agent。
8. `继续 [Stage]` 使用 Resume Rule 恢复，不重复已验证工作。

## 3. Standard Commands

- 启动 [Stage]
- 继续 [Stage]
- 检查 [Stage]
- 复盘 [Stage]
- 全量执行项目
- 检查全部 Agent MD
- 更新 Knowledge

## 4. Evidence

本轮新增：

`ai/knowledge-base/v1.0/workflows/AGENT_STAGE_INTERACTION_PROTOCOL_V1.0.md`

该文件定义统一 Stage Start / Input / Execution / Output / Gate / Handoff / Resume / Human Intervention 协议。

## 5. Impact

所有 Agent MD 后续修订必须引用并遵循该协议。阶段执行记录应能够还原：谁/什么命令启动 → 输入如何验证 → 执行了什么 → 产生什么 → 如何验证 → 为什么允许下一阶段。

## 6. Review Conclusion

本轮沉淀的核心原则：

> 用户负责发起阶段意图；Agent 负责读取规则、验证上下文、执行、记录、交接和沉淀。只有 Required Input 缺失、冲突决策、Human Gate 或高风险不可逆操作才打断用户。
