# Retrospective — Project Plan / Milestone / Report 2026-08-20

## Why We Added Project Input Categories
此前项目执行记录能够记录实际发生什么，但计划生成缺少结构化输入依据。因此将基础、规模、技术、依赖、风险、资源、预算、时间、质量、合规、自定义信息分层，减少遗漏并支持最小询问。

## Why We Added Completeness & Confidence
计划不能由模型主观判断可靠程度。通过信息完善度评分划分 Confidence Level / Plan Confidence Range，并允许项目调整策略，使计划不确定性显式化。

## Why We Added Project Plan Baseline
只有 Execution Record 无法比较计划与实际。Plan Baseline 提供固定基线，计划变更保留版本，使延期、提前、资源和质量偏差可以客观复盘。

## Why We Separated Stage / Milestone / Project Goal
Stage 表示工作过程；Milestone 表示关键结果验证；Project Goal 表示最终目标。分离后避免把工作完成误认为结果达成，也避免为所有项目强制制造审批节点。

## Why Milestones Are Optional
Milestone 是标准能力但不要求所有项目启用。系统根据项目规模和风险建议，用户可以确认、调整或跳过，保持流程轻量。

## Why We Added Layered Reports
Stage Report 回答阶段是否完成；Milestone Report 回答关键结果是否达成；Project Completion Report 回答项目目标是否达成。三层报告避免信息混杂。

## Why Quality Check Is Embedded
项目报告如果只有总结，没有数据质量和验证结果，结论无法作为可信项目资产。因此每份报告增加 Quality Check、Finding、Evidence、Audit Status。

## Final Value
本轮将 Project Input → Completeness/Confidence → Draft Plan → Baseline → Stage Execution → Stage Output → Milestone Validation → Quality Check → Reports → Plan vs Actual → Retrospective 串成闭环，使项目管理从“记录执行”升级为“有计划、有依据、有验证、有复盘”的可追溯系统。