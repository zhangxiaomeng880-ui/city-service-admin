# Retrospective — Project Stage Model 2026-08-20

## This Round
本轮确认项目立项输入已简化，计划与报告先结构化，模板能力后置到 Template Management；同时进一步明确项目报告的数据链路跨越整个项目生命周期，以及立项阶段的模型调用边界。

## Why We Simplified Initiation Input
如果立项阶段要求用户逐项填写完整表单，会抵消 AI Native 对话交互的价值。因此采用自然语言输入 + 结构化识别 + 最小必要追问 + Skip，使用户主要负责提供信息和做关键确认。

## Why Plan and Report Are Structured First
计划与报告首先需要稳定的数据结构、来源和生命周期边界；模板是呈现与配置层能力，可以后置建设。这样避免在立项阶段同时引入模板配置，降低用户交互复杂度。

## Why Reports Read Across the Lifecycle
项目报告是数据资产的聚合视图，而非独立事实源。项目完成报告需要同时引用 Stage Output、Testing、Compliance、Release、KPI、Model Usage、Evidence、Audit 等数据，因此报告数据链路必须覆盖项目全生命周期。

## Why Initiation Uses Low-Token Single Orchestrator
立项任务主要是信息结构化、完整度判断、Draft Plan 和摘要，不需要多 Agent 并行。规则、数据读取、计算和聚合优先使用确定性逻辑；正常项目采用轻量模型，复杂/高风险项目才按需升级。这样可以降低 Token、协调和上下文成本。

## Why Template Management Is Separate
Project Plan Template 与各类 Report Template 是项目基础资产，需要独立的版本、继承、项目级扩展与管理能力；本阶段只确定模板消费接口和结构，不要求立项用户配置模板。

## Value
本轮完成后，立项阶段形成“少输入、自动计划、自动数据聚合、自动报告、低模型消耗”的清晰边界，同时保证后续模板管理有稳定的数据契约。