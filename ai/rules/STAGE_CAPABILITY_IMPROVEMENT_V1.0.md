# Stage Capability Improvement V1.0

## 1. Purpose
本文件独立记录 AI Native 流程相较传统项目执行方式的能力提升、效率目标、质量目标和自动化等级。它不是 Agent，也不是项目事实数据源；它是项目级能力演进基线。

## 2. Why This Layer Exists
已有 Agent MD 解决“如何执行”，Data Asset 解决“实际产生什么”，Knowledge Base 解决“沉淀什么知识”，Retrospective 解决“为什么这样设计”。但仍缺少一个独立层回答：每次流程优化后，具体哪个阶段获得了什么能力提升、效率提升和质量提升。

## 3. Capability Comparison
每个阶段至少比较：
- Traditional Workflow：原有人工方式
- AI Native Workflow：当前流程
- Capability Improvement：能力变化
- Efficiency Target：效率目标
- Quality Target：质量目标
- Automation Level：自动化等级
- Actual Result：上线后实际结果
- Next Improvement：下一轮优化

## 4. Automation Levels
- L0 Manual：人工执行
- L1 Assisted：系统辅助
- L2 AI Assisted：AI 辅助，人主导
- L3 AI Automated：AI 自动执行，人处理异常
- L4 Autonomous with Human Gate：AI 自动执行，关键节点由人确认

当前项目立项/计划生成流程目标等级：L4。

## 5. Project Initiation Capability Baseline
### Traditional
人工填写项目资料 → 人工整理 → 人工检查完整性 → 人工制定计划 → 人工拆阶段 → 人工安排时间/负责人 → 人工维护记录。

### AI Native
用户自然语言输入 → Agent 结构化识别 → Completeness Check → 最小必要追问 → 用户可补充/默认/Skip → AI 生成 Draft Plan → 用户确认 → Plan Baseline。

### Expected Improvement
- 项目信息收集：目标减少人工整理与重复确认 50%–70%
- 项目计划制定：目标减少人工计划编排 60%–80%
- 风险/依赖整理：目标减少人工梳理 40%–70%
- 里程碑规划：目标减少人工规划 50%–70%
- 立项阶段综合人工投入：目标减少 60%–80%

以上为产品设计目标区间，不是已验证的实际结果。

## 6. Lifecycle Automation Baseline
在工程、测试、发布等阶段数据源实现自动接入后，项目管理生命周期整体人工管理工作量目标减少 60%–80%。实际结果必须通过真实项目数据验证。

## 7. Efficiency Metrics
- Manual Operation Reduction Rate
- Automation Coverage Rate
- Project Manager Active Time
- Input Interaction Count
- Plan Generation Time
- Stage Report Generation Time
- Milestone Report Generation Time
- Project Report Generation Time
- Token Consumption
- Model Cost

## 8. Quality Metrics
效率不能作为唯一目标，同时追踪：
- Information Missing Rate
- Plan Change Rate
- Schedule Variance
- Stage Delay Rate
- Requirement Omission Rate
- Report Error Rate
- Data Traceability Coverage
- Rework Rate
- Audit Finding Rate
- Defect / Quality Gate Metrics

## 9. Core Product Principle
自动化的目标不是减少所有人工参与，而是减少“录入、整理、计算、汇总、重复询问”等低价值工作，让用户主要参与：信息输入、关键确认、异常处理、风险决策和最终结果判断。

## 10. Measurement Rule
Target 与 Actual 必须严格区分。上线前只能记录目标区间；上线后由 Project Execution Record、Stage Output、Model Usage、Report 和用户交互数据计算 Actual。不得把设计阶段估算写成实际收益。

## 11. One Input, Multi-use
项目一次输入应被 Project Context、Project Plan、Risk、Resource、Milestone、KPI、Reports、Retrospective 复用。Agent 不得重复询问已有事实。

## 12. Evolution Baseline
每轮优化产生一个 Capability Improvement Record，记录：问题、原因、补充、变更前能力、变更后能力、目标、实际、价值、Audit 状态和下一步优化方向。

## 13. Value
该文档使项目工具可以持续回答：为什么优化、优化了什么、提升多少、是否真的提升、质量是否同步提升，以及下一轮应该优化什么。