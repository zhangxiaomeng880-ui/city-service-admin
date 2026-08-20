# Project Stage Document V2.4

## Positioning
本文件统一描述项目阶段的输入、执行、输出、数据资产、模型调用边界、报告产出与流转规则。Agent 负责阶段执行；项目数据资产负责事实沉淀；Orchestrator 负责对话与流转。

## Stage Lifecycle
每个阶段统一遵循：
1. Input Check
2. Human-AI Conversation
3. Execute
4. Stage Output
5. Stage Metrics
6. Quality/Gate Check
7. Stage Completion Report
8. User Confirmation for Next Stage

用户在阶段启动和必要决策点参与信息输入、确认、异常处理；系统自动复用已有信息，不重复询问。

## Project Initiation / Planning
立项阶段采用最小输入模式：用户以自然语言提供项目上下文，Orchestrator 结构化为 Basic / Scale / Technical / Dependency / Risk / Resource / Budget / Time / Quality / Compliance / Custom 信息。

系统检查信息完整度，仅对缺失且有价值的字段进行最小必要追问；每项支持补充、默认规则或 Skip。Skip 必须记录。

完整度评分映射 Plan Confidence Level / Plan Confidence Range。AI 基于实际输入与标准结构生成 Draft Plan；用户确认后形成 Plan Baseline。正常项目采用单 Orchestrator + 按需能力调用，不进行多 Agent 并行，也不在立项阶段执行复杂模型选型。

## Project Plan Output
当前阶段先结构化计划，不要求用户配置模板。计划结构包括目标、范围、Stage、Dependency、Owner、Schedule、Risk/Buffer、Milestone（可选）、Gate、Confidence。Project Plan Template 属于后续 Template Management 阶段的基础资产。

## Project Report Output
项目报告采用结构化报告模型；报告模板不在本阶段要求用户输入，统一由后续 Template Management 管理。报告是项目数据资产的聚合视图，不是新的事实来源。

报告数据链路可跨项目全生命周期读取：Project Input、Plan、Execution Record、Stage Output、Milestone、Testing、Compliance、Release、KPI/Analytics、Model Usage、Evidence、Audit。报告只引用来源数据并生成必要摘要。

## Report Types
- Initiation Report：项目准备怎么做、输入完整度、计划与置信范围。
- Stage Completion Report：阶段工作、实际产出、耗时、质量、问题、Gate、Plan vs Actual。
- Milestone Report（启用时）：关键结果、Deliverable、Acceptance Criteria、Evidence、验证结果。
- Project Completion Report：项目目标、阶段、里程碑、质量、KPI、风险、资源、模型消耗、最终结果与复盘。

## Model Usage Principle
立项阶段优先规则与结构化数据处理，模型仅用于自然语言结构化、Draft Plan、必要摘要等少量任务。数据读取、完整度规则、时间计算、报告聚合等优先使用确定性逻辑。默认采用轻量模型，复杂/高风险项目才按需升级。记录 Model Usage Record、Token 与成本。

## Stage Data Output
各阶段实际产生的数据均进入 Project Data Layer，不为了报告而重复生成事实。阶段指标按照实际产生情况统计；没有事实不得虚构。

## Capability Measurement
阶段能力提升独立记录在 Stage Capability Improvement 中，区分 Target 与 Actual，并同时衡量效率、自动化、质量和用户体验。

## Value
本阶段模型使“输入、计划、数据产出、报告、模型消耗”边界清晰：用户主要负责信息输入与关键确认，系统负责结构化、计划生成、数据聚合和报告生成；模板能力后置到 Template Management，避免立项阶段复杂化。