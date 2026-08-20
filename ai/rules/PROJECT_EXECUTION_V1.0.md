# Project Execution V1.0

## 1. Purpose
Project Execution 负责在 Project Plan Baseline 确认后，按照已制定的 Stage / Milestone 计划驱动项目执行。Stage 不重新规划；Stage 是项目计划实体，Agent 是提供执行能力的能力实体。

## 2. Stage ↔ Agent
默认映射：Product → Product Agent；Design → Design Agent；Planning → Planning Agent；Engineering → Engineering Agent；Testing → Testing Agent；Compliance → Compliance Agent（适用时）；Release → Release Agent；Maintenance → Maintenance Agent。Audit Agent 独立，不作为普通 Stage。

Stage 与 Agent 不强绑定：Orchestrator 根据 Stage、依赖和当前上下文调用对应 Agent，允许未来一个 Stage 调用多个能力，也允许一个 Agent 被多个场景复用。

## 3. Stage Start
Project Initiation 完成且 Plan Baseline 生效后，Orchestrator 检查第一个 Stage 的启动条件，并向用户提示是否开始。用户确认后自动调用对应 Agent。后续 Stage 同样依据 Dependency、Gate 和 Plan 状态自动判断 Ready 条件，并在需要用户确认的节点提示。

## 4. Stage Input
Stage 直接复用对应 Agent Input Schema。已有 Project Input、Plan、前置 Stage Output 和其他项目数据自动带入，只询问当前 Agent 缺失且必要的信息。用户可以补充、采用默认规则或 Skip；Skip 及其原因记录为 Interaction Record。不得重复询问已有事实。

## 5. Stage State
Stage 复用 Agent Execution State 规则，不建立第二套状态体系：Not Started / Ready / Running / Blocked / Completed / Skipped（适用时）。Stage 状态代表项目计划层执行状态，Agent 状态代表实际能力执行状态，二者通过 Execution Record 关联。

## 6. Stage Execution
Orchestrator 必须自动调用对应 Agent，不允许仅记录“阶段已启动”而没有实际能力执行记录。Agent 执行产生 Stage Data Asset、Execution Log、Stage Output、Issue / Evidence、Model Usage Record 等项目数据。

## 7. Stage Data Asset
阶段产生的数据必须沉淀为结构化项目数据资产，而非仅存在对话上下文或报告文本中。核心数据包括：Stage Input、Execution Record、Stage Output、Task、Issue、Evidence、KPI/Metric、Model Usage、Token、Cost、User Operation、Gate Result。

## 8. Execution Log vs Change Record
Execution Log 记录发生了什么、时间、执行人、执行节点和结果；Change Record 记录什么发生变化、为什么、From/To、影响、确认人和最终结果。两者均为项目数据资产，不互相替代。

统一记录字段原则：Who / What / When / Why / From / To / Impact / Result，并保留创建时间、更新时间、操作时间及相关节点时间。

## 9. Model Usage Record
每个 Stage / Milestone 均记录 AI 模型使用情况：Project、Stage/Milestone、Agent、Model、Task、Invocation Time、Input Tokens、Output Tokens、Total Tokens、Cost、Invocation Count、Fallback/Escalation、Result/Status。该数据同时作为 Project Report 的正式数据来源。

## 10. Stage Output
Stage Output 是阶段完成的结构化结果，必须引用实际执行数据和 Evidence。Stage Report 从 Stage Input / Execution / Output / Model Usage 等数据聚合生成，不重新创造事实。

## 11. Stage Gate
Stage 完成前进行 Gate 检查。Gate 使用项目计划中的完成条件、Acceptance Criteria、质量/测试/合规条件（适用时）和实际 Evidence。Gate 不通过时 Stage 不得自动进入下一阶段，进入 Blocked 或待用户决策状态。

## 12. Stage Report
每个 Stage 完成后自动生成 Stage Report。报告使用结构化模板定义字段，数据来自项目数据资产。用户不需要重新填写已经存在的数据，仅在发现缺失口径、异常或需要决策时交互。

## 13. Change Impact Chain
Stage Change 发生后执行 Impact Analysis：
- 无上层影响 → 仅记录 Stage Change；
- 影响 Milestone → 产生 Milestone Change；
- 影响 Project Plan / Goal / 核心范围等 → 产生 Project Change，并形成新的 Plan Version。

并非所有 Stage Change 都必须升级到 Milestone 或 Project 层。

## 14. Milestone
Milestone 在 Project Initiation / Plan Baseline 阶段制定。执行阶段只负责验证已定义的 Deliverable、Acceptance Criteria 和 Evidence，不重新制定 Milestone。Milestone 达成后自动聚合相关 Stage Data 与 Change Records，生成 Milestone Report。

## 15. Project Report
Project Report 汇总 Project Input、Plan Baseline、全部 Stage Data / Reports、Milestone Data / Reports、KPI、Quality、Risk、Change Records、Model Usage、Testing、Compliance（适用时）、Release 和 Audit 数据。报告是数据聚合视图，不是事实源。

## 16. Data Lineage
Project Report → Milestone Report → Stage Report → Stage Data Asset → Execution / Model Usage / Evidence。所有报告结论必须可以追溯至实际项目数据。

## 17. Human-AI Interaction
AI 自动完成数据读取、上下文复用、阶段启动、Agent 调用、执行记录、数据沉淀、报告生成和下一节点判断。用户主要负责必要输入、关键确认、异常处理、变更决策和 Gate 决策。

## 18. Model / Token Strategy
正常 Stage 优先使用默认模型和最小上下文；不进行无必要的多 Agent 并行或模型选型。仅在任务复杂度、风险、上下文规模或质量要求触发升级规则时进行 Model Escalation / Fallback。所有调用进入 Model Usage Record。

## 19. Traditional vs AI Native
传统：领取任务 → 人工整理输入 → 执行 → 手工记录 → 汇总 → 写报告 → 人工通知下一环节。

AI Native：Stage Ready → 自动读取上下文 → 最小必要询问 → 自动调用 Agent → 自动沉淀数据 → Stage Output → 自动生成报告 → Gate → 自动提示下一阶段。

## 20. Efficiency / Quality Metrics
效率：任务准备时间、执行时间、人工操作次数、重复输入次数、阶段启动耗时、阶段记录耗时、报告生成耗时、阶段流转耗时、人工跟进次数、Token、Model Cost。

质量：输入遗漏率、Stage Gate 通过率、计划偏差、阶段延期率、返工率、缺陷率、报告错误率、数据可追溯率、Audit Finding。

效率目标与实际结果必须分离记录，不能把设计阶段估算写成实际收益。

## 21. Core Principle
Project Plan 定义做什么；Stage 定义当前执行单元；Agent 提供执行能力；Stage Data 记录实际发生什么；Stage Report 呈现阶段结果；Milestone 验证关键结果；Project Report 汇总全项目。用户负责输入与关键决策，系统负责执行编排、记录、统计和报告。