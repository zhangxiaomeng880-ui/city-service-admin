# PROJECT_STAGE_INPUT_OUTPUT_MATRIX_V1.0

> 状态：V1.1 结构修订  
> 目的：把 AI Native 项目各阶段标准化为可执行、可检查、可复用的 Input / Execution / Output 链路。  
> 原则：条件阶段可以 SKIPPED，但不得因为当前项目不执行而删除 Agent 或生命周期节点。

## 1. 统一 Stage Contract Schema

每个 Agent / Stage 统一描述：

1. Purpose / Mission
2. Version
3. Input
4. Input Readiness
5. Input Verification
6. Execution
7. Output
8. Output Verification
9. Gate
10. Handoff / Downstream
11. Environment Dependency
12. Version Dependency
13. Status
14. Resume Rule
15. Evidence / Source
16. Output Location

## 2. 状态定义

- `COMPLETED`：输入、执行、输出、验证、Gate、Handoff 均满足要求
- `PARTIAL`：已执行但仍有明确缺口
- `BLOCKED`：存在阻断问题，不能继续
- `SKIPPED`：经条件规则判断当前项目不适用，必须记录依据、影响和 Resume 条件

> `SKIPPED` 不是“没有 Agent”，而是 Agent 存在但本次执行状态为 SKIPPED。

## 3. 标准生命周期

标准生命周期保持完整，不因项目当前是否执行某阶段而删除节点：

**Project Initialization → Feasibility（条件）→ Product → Design → Engineering / Coding → Build / Deploy / Preview → Acceptance → QA → Release → Data / Experiment（条件）→ Review → Knowledge Update**

## 4. Stage Input / Execution / Output

### 4.1 Project Initialization

**Input**
- 项目背景、目标、范围、约束
- Repository / Branch / 权限
- Runtime / Build / Deploy / Preview 环境
- 项目版本基线
- Knowledge Base / Manifest

**Execution**
- 初始化项目上下文
- 确认环境、分支、版本和权限
- 建立 Manifest / Execution Identity
- 判断后续阶段是否 Ready

**Output**
- Project Context
- Environment Manifest
- Version Manifest
- Branch / Repository 基线
- Project Ready Gate

### 4.2 Feasibility（条件）

**Input**
- Project Context
- Product / 技术初始信息
- 约束和依赖

**Execution**
- 判断是否需要可行性验证
- 技术 / 资源 / 依赖可行性分析
- 不适用时记录 SKIPPED

**Output**
- Feasibility Result
- Constraints / Risks
- SKIPPED Evidence（如适用）

### 4.3 Product

**Input**
- Project Output
- 用户问题 / 场景
- 竞品、数据、KPI、反馈（如有）
- Knowledge Base
- 业务约束

**Execution**
- 问题定义
- 目标与范围确认
- 业务模型 / 规则
- User Flow
- 功能方案
- Acceptance Criteria
- Product Decision

**Output**
- PRD
- Business Rules
- User Flow
- Acceptance Criteria
- Product Decision
- 需求 / 事项 ID

### 4.4 Design

**Input**
- Product 最终产物
- PRD / Business Rules / User Flow / Acceptance Criteria
- Design System / 历史设计资产
- 设计约束

**Execution**
- 信息架构
- 页面结构
- 交互设计
- 视觉设计
- **组件设计与组件规范建立**
- Design System / Token
- 组件状态 / Variants
- 页面 → 组件映射
- Figma 设计
- Design Acceptance 检查

**Output**
- Figma
- Interaction Specification
- Visual Specification
- **Component Specification**
- Design System / Token
- 页面 → 组件映射
- Design Decision
- Design Acceptance Matrix

### 4.5 Engineering / Coding

**Input**
- Product 最终产物
- Design 最终产物 / Figma
- **Design 输出的 Component Specification / Design System / Token / 页面 → 组件映射**
- Interaction / State Specification
- Project Initialization 已确认的技术环境、Branch、Version
- 现有代码

**Execution**
- 理解 Product / Design
- 检查现有代码及复用能力
- Gap 检查
- 复用 / 实现 Design 已定义组件
- 实现页面、交互、状态和数据
- 保持 Product 业务逻辑一致
- Code 自检
- 记录实现差异与遗留问题

**Output**
- Code
- Technical Design
- Implementation Result
- 页面 → Code 映射
- Component Implementation Result
- Design → Code 差异说明
- Commit / PR

### 4.6 Build / Deploy / Preview

**Input**
- Coding Output
- Project Initialization 的 Environment / Version Manifest
- Build / Deploy 配置

**Execution**
- 锁定 Branch / Commit / Version
- Build
- Deploy
- Preview 可访问性检查
- Preview 版本追溯检查
- 基础可用性检查

**Output**
- Build Result
- Deploy Result
- Preview URL
- Preview Version / Commit / Branch 映射
- Preview 基础检查结果

**Gate**：提供 Acceptance 可消费的 Preview 版本。

### 4.7 Acceptance

**Input**
- Product
- Design
- Design Acceptance Matrix
- Component Specification
- Preview
- Coding Result
- Build / Deploy / Preview Result

**Execution**
- Product Acceptance Criteria 逐项验证
- Design Acceptance Matrix 逐项验证
- 核心业务流程验证
- 页面、交互、组件、状态验证
- 记录 Issue
- 修复后复验

**Output**
- Acceptance Result
- Acceptance Issue List
- Fix / Retest Record
- 是否允许进入 QA

### 4.8 QA

**Input**
- Product / Acceptance Criteria
- Design / Component Specification
- Preview / Build
- Coding Result
- 测试环境 / 数据

**Execution**
- 功能测试
- 交互测试
- 状态 / 异常 / 边界测试
- 视觉一致性检查
- 适配检查（如适用）
- Issue / Retest / Regression
- 形成质量结论

**Output**
- Test Cases
- Test Report
- Defect List
- Retest Result
- Quality Conclusion
- Release Recommendation

### 4.9 Release

**Input**
- QA Passed
- Release Recommendation
- Release Package / Version
- 发布配置
- 回滚方案

**Execution**
- 发布前检查
- Human Gate
- 正式发布
- 发布结果验证
- Post-Release 检查
- 记录版本与发布结果

**Output**
- Release Version
- Release Record
- Actual Release Result
- Rollback Record / Plan
- Post-Release Result

### 4.10 Data / Experiment（条件）

**Input**
- Release / 可验证版本
- 实验目标与假设（如有）
- KPI / 指标口径
- 分组 / 流量
- 埋点 / 数据源

**Execution**
- 判断是否触发 Data / Experiment
- 不适用时记录 SKIPPED
- 适用时执行实验 / 数据采集 / 数据质量检查 / 分析
- 形成结果与决策建议

**Output**
- Experiment Configuration
- Data Quality Result
- Measurement / Experiment Result
- Decision Evidence
- SKIPPED Evidence（如适用）

### 4.11 Review

**Input**
- 全流程阶段产物
- Agent MD
- Issue / Fix / Retest
- 决策及变更记录
- 最终版本

**Execution**
- 目标 vs 实际
- 阶段偏差
- 返工 / 阻塞 / 等待分析
- 根因分析
- Pattern / Failure Pattern
- Agent / Workflow 改进建议

**Output**
- Review Result
- Root Cause
- Process Improvements
- Agent / Workflow Improvements
- Knowledge Update Input

### 4.12 Knowledge Update

**Input**
- Review Result
- Audit Result
- 已验证 Decision / Pattern / Failure Pattern
- 当前 Knowledge Base
- Project Evolution

**Execution**
- 知识候选提取
- 去重 / 冲突检查
- 合并 / 更新 / 新增
- 更新 Agent / Workflow / Rule
- 形成 Evolution
- 验证下一轮可消费性

**Output**
- Updated Knowledge Base
- Knowledge Evolution
- Agent / Workflow Improvement Items
- Reusable Rules / Patterns
- 下一轮执行输入

## 5. Handoff 规则

每个阶段必须明确：

**上一阶段 Output → 下一阶段 Input**

阶段不能仅因为“执行过”就标记 COMPLETED；必须满足：

**Input Ready + Input Verification + Execution + Output + Output Verification + Gate + Handoff**。

## 6. 当前确认的职责边界

- Project Initialization：确认基础环境、Branch、Version、Repository 等基线。
- Design：负责设计及组件规范，不由 Coding 重新定义。
- Coding：实现已确认的 Product + Design，不自行修改上游定义。
- Build / Deploy / Preview：产生可追溯、可验证的 Preview 版本。
- Acceptance：验证 Product / Design 是否正确实现。
- QA：验证质量、边界、异常及问题闭环。
- Release：完成正式发布及发布后验证。
- Data / Experiment：条件执行，但 Agent 永远存在，当前不适用时为 SKIPPED。
- Review：复盘真实执行及流程质量。
- Knowledge Update：将已验证结论沉淀并反哺下一轮。
