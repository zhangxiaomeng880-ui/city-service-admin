# Retrospective — Project Execution 2026-08-20

## Why We Entered This Phase
项目立项阶段已经完成 Project Input → Completeness/Confidence → Project Plan → Stage/Milestone → Plan Baseline。下一步自然进入执行，因此本轮不再重复讨论 Stage/Milestone 的制定，而是固化 Baseline 后如何自动驱动执行。

## Key Decisions
1. Stage 在立项阶段制定，执行阶段不重新规划。
2. Stage 与 Agent 建立默认映射，但不强绑定；Orchestrator 根据 Stage / Dependency / Gate 调用 Agent。
3. Stage 状态复用 Agent Execution State，避免建立第二套状态体系。
4. Stage Input 复用 Agent Input Schema，并自动带入已有项目上下文，只询问缺失必要信息。
5. Agent 执行必须产生数据资产沉淀，不允许只在对话中完成。
6. Execution Log 与 Change Record 分离：一个记录执行事实，一个记录变更事实。
7. Stage Change 根据 Impact Analysis 决定是否升级为 Milestone Change 或 Project Change。
8. Stage / Milestone 必须记录模型、Token、Cost、Fallback/Escalation 等 AI 使用情况。
9. Stage Report、Milestone Report、Project Report 均从数据资产聚合生成，不重新创造事实。
10. 正常阶段采用低 Token、默认模型、单 Orchestrator；只有复杂度或质量规则触发时才升级模型/能力。

## Why This Improves Efficiency
传统执行需要人工整理输入、执行、记录、汇总、写报告和推动下一节点；AI Native 流程由 Orchestrator 自动读取上下文、调用 Agent、沉淀数据、生成报告并判断下一节点，用户主要参与必要输入、确认、异常和变更决策。

因此效率提升同时衡量任务执行效率与项目管理效率，不能只看模型执行速度。

## Data Asset Value
Stage Data → Stage Report → Milestone Aggregation → Milestone Report → Project Aggregation → Project Report，形成统一的数据血缘。Model Usage 作为正式项目资产，使项目报告能够解释 AI 使用量、Token、Cost 和模型升级情况。

## Change Management Value
统一的 Stage / Milestone / Project Change Record 与时间、人员、操作节点记录，使项目可以还原“谁在何时因为什么改变了什么、产生什么影响、谁确认、最终结果如何”。

## Final Value
本轮把项目从“阶段按流程执行”升级为“计划驱动、Agent 自动调用、数据自动沉淀、报告自动聚合、变更可追溯、AI 消耗可量化”的执行闭环，同时保持用户关键决策权和低 Token 原则。