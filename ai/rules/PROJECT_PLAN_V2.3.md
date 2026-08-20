# Project Plan V2.3

## Positioning
Project Plan 是项目计划数据资产与 Orchestrator 的规划能力，不是独立 Agent。它形成 Plan Baseline，供后续 Execution、Stage/Milestone、Report、Retrospective 对照。

## Project Input Categories
Basic / Scale / Technical / Dependency / Risk / Resource / Budget / Time / Quality / Compliance / Custom。

## Interaction
Project Input 采用 Conversation Orchestration：仅询问缺失信息；已有信息不重复询问；每个输入步骤均支持补充、采用默认规则或 Skip。Skip 必须记录 Input Interaction Record。缺失信息不得被模型伪造为事实。

## Completeness & Confidence
平台提供默认 Input Completeness Policy。按字段重要性计算完整度评分，并映射 Confidence Level 与 Plan Confidence Range。项目可配置自己的 policy 覆盖平台默认规则，必须记录 rule_id、version、修改人和时间。Confidence 是计划可信范围，不等同于统计学置信区间。

## Draft Plan
AI 根据实际可用输入生成 Draft Plan，包括阶段、顺序、依赖、Owner、计划时间、Risk/Buffer、Gate 和建议 Milestones。Draft Plan 不等于 Baseline。

## Baseline
用户确认后生成 Plan Baseline。Baseline 版本不可覆盖历史版本；计划变更生成新版本并记录原因、影响、变更人和时间。

## Stage
Stage 表示工作过程，包含输入、执行、输出、Owner、Schedule、Dependency、Gate。

## Milestone
Milestone 是标准能力，但项目不强制启用。它表示关键结果验证点，不是 Stage，也不是 Project Goal。项目计划生成时可由 AI 根据规模/风险建议，由用户确认、调整或跳过。

## Milestone Deliverable
每个启用的 Milestone 必须定义可验证 Deliverable 和 Acceptance Criteria，并引用相关 Stage Output / Evidence。Milestone 验证的是跨阶段关键结果是否达成。

## Project Goal
Project Goal 表示最终项目目标，与 Stage、Milestone 独立。

## Plan vs Actual
计划与 Project Execution Record、Stage Output、Model Usage Record 对比，形成时间、产出、质量、资源、Token/成本和风险偏差。

## Token Strategy
生成计划优先读取已有结构化项目输入、历史数据和模板，不重复读取全文；缺失字段只进行最小必要询问。

## Value
Project Plan 使项目从“记录实际执行”升级为“计划—执行—偏差—复盘”的闭环，并为阶段、里程碑和项目报告提供统一基线。