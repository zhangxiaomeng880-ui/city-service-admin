# Stage Contract V1.3

## 1. Project First

所有新项目必须先经过 Project AGENT。Project 阶段负责 Project Context 初始化和基础设施 Readiness，不替代后续业务阶段。

## 2. Common Input

Project Context → Previous Stage Output → Knowledge Base → User Message。

仅在缺失 Required Input 时向用户提问。

## 3. Common Execution

每个阶段执行：

1. Context Resolution
2. Required Input Check
3. Execution
4. Verification
5. Gate
6. Output
7. Evidence
8. Handoff
9. Human Gate

## 4. Stage Completion Human Gate

阶段完成后必须向用户展示精简结果，并询问是否进入下一阶段。未经用户确认不得静默跨阶段。

## 5. Project Contract

Project AGENT 额外负责：

- 创建项目上下文
- 收集最小必要项目信息
- 检查仓库和分支最新状态
- 检查工作树、依赖、运行时、环境配置
- 检查 Build/Test/Preview
- 检查版本和设计资源
- 自动修复安全可自动修复项
- 提示必须人工执行项

Project Gate：PASS / PARTIAL / BLOCKED。

## 6. Quality Contracts

Testing：功能正确性。

Compliance：规则与约束符合性。

Audit：流程、证据、结论和 Gate 的独立性与可追溯性。

三者独立。

## 7. Evidence Contract

关键结论必须具备 Evidence Reference。定时 KPI/竞品任务同样适用。

## 8. Scheduled Intelligence Contract

KPI Weekly 和 Competitor Weekly 必须绑定 Project，保存配置、来源、执行时间、状态、结果和生成报告。

数据缺失或来源异常必须显式标记，不得猜测。

## 9. Token Contract

采用 Context Reuse、Summary First、Progressive Retrieval、Delta First、Evidence on Demand、Compressed Output。不得牺牲准确性和质量换取 Token 节省。

## 10. Handoff

Handoff 必须携带当前 Output、Gate、Evidence、Warnings/Blockers、Next Stage Required Input 和用户确认状态。
