# PROJECT_STAGE_INPUT_OUTPUT_MATRIX_V1.0

> 状态：V1.0 第一版骨架已确认，持续细化中  
> 目的：把 AI Native 项目各阶段标准化为可执行、可检查、可复用的 Input / Process / Output 链路。  
> 原则：本文件是阶段 Workflow 设计资产；核心运行规则仍以 `AI_NATIVE_PROJECT_OS_V1.0.md` 为准。

## 1. 统一 Stage Schema

每个阶段统一描述：

1. Input：进入阶段所需输入
2. Context Readiness：输入是否完整、是否允许开始
3. Process：阶段内部执行过程
4. Output：阶段必须产生的结果/资产
5. Evidence：结论或产出的依据
6. Gate：进入下一阶段的准入条件
7. Owner：负责人
8. AI Role：AI 的参与/自动化等级
9. Time：开始、结束、计划耗时、实际工作耗时、等待耗时、自然周期
10. Output Location：产出资产的 Git/Figma/其他可定位地址
11. Validation：产出是否经过验证及验证结果
12. Downstream：输出给下一阶段的内容

## 2. 第一版阶段链路

**Project → Product → Design → Engineering → QA → Release → Data / Analytics → Knowledge**

### 2.1 Project

**Input**
- 项目背景
- 项目发起原因
- 当前问题/机会
- 业务目标
- 已知约束
- 历史知识
- 竞品/数据/KPI 信号（如有）

**Output**
- Project Brief
- Project Goal
- Scope
- Out of Scope
- Success Criteria
- Project Context
- Initial Constraints
- Project ID

**Gate：Project Ready**
- 能明确说明为什么做、做什么、不做什么、成功标准是什么
- Product 可以直接消费 Project Output 开始工作

**Downstream**：Product

### 2.2 Product

**Input**
- Project Output
- 用户问题/场景
- 竞品信息
- 数据/KPI
- 用户反馈（如有）
- Knowledge Base
- 业务约束

**Output**
- PRD
- Business Rules
- User Flow
- Acceptance Criteria
- Product Decision
- 需求/事项 ID

**Gate：Product Ready**
- 问题、目标、范围、业务规则、用户流程和验收标准明确
- Design 所需关键上下文完整

**Downstream**：Design

### 2.3 Design

**Input**
- PRD
- Business Rules
- User Flow
- Acceptance Criteria
- Design System / 历史设计资产
- 设计约束

**Output**
- Figma
- Interaction Specification
- Visual Specification
- Design Decision
- Design Asset Link

**Gate：Design Ready**
- 核心页面、状态、交互和视觉要求明确
- Engineering 可以依据设计开始实现

**Downstream**：Engineering

### 2.4 Engineering

**Input**
- PRD
- Business Rules
- Design
- Interaction / Visual Specification
- 技术约束
- 工程现状

**Output**
- Code
- Technical Design
- Implementation Result
- Engineering Decision
- Commit / PR

**Gate：Engineering Ready for QA**
- 实现符合 Product 与 Design
- 可构建、可运行
- 关键变更有可定位版本

**Downstream**：QA

### 2.5 QA

**Input**
- PRD
- Acceptance Criteria
- Design
- Code / Build
- 测试环境与测试数据

**Output**
- Test Cases
- Test Report
- Defect List
- Quality Conclusion
- Release Recommendation

**Gate：QA Passed**
- 验收标准通过
- 高风险缺陷关闭或有明确决策
- Release 所需质量条件满足

**Downstream**：Release

### 2.6 Release

**Input**
- QA Passed
- Release Recommendation
- Release Package / Version
- 发布配置
- 回滚方案

**Output**
- Release Version
- Release Record
- Rollback Record / Plan
- Actual Release Result

**Gate：Released**
- 版本完成发布
- 发布结果可验证
- 重大风险有处理方案

**Downstream**：Data / Analytics

### 2.7 Data / Analytics

**Input**
- Release Version
- KPI Definition
- Baseline / Comparison Period
- Analytics Data
- 业务目标

**Output**
- Measurement Result
- KPI Result
- Diagnostic Analysis
- Opportunity / Problem
- Decision Evidence

**Gate：Validated Result**
- 数据口径明确
- 结果可追溯
- 能判断目标是否达成及是否需要下一轮动作

**Downstream**：Knowledge / Product

### 2.8 Knowledge

**Input**
- Product / Design / Engineering / QA / Release 产出
- Data / KPI 结果
- Decision Log
- Project Evolution
- 成功/失败经验

**Output**
- Knowledge Update
- Best Practice
- Failure Case
- Decision / Change Record
- Reusable Workflow / Agent / Template / Rule
- 复用条件与不适用条件

**Gate：Knowledge Updated**
- 已确认经验被沉淀
- 关键产出可定位
- 可复用资产与适用条件明确

**Downstream**：下一项目 / 下一轮 Product

## 3. 阶段之间的 Input / Output 关系

```text
Project Output
      ↓
Product Input → Product Output
      ↓
Design Input → Design Output
      ↓
Engineering Input → Engineering Output
      ↓
QA Input → QA Output
      ↓
Release Input → Release Output
      ↓
Analytics Input → Analytics Output
      ↓
Knowledge Input → Knowledge Output
      ↓
Next Iteration / Reuse
```

## 4. 当前优化范围

本轮只优化现有阶段的 Input / Output，不新增新的业务阶段。下一步逐阶段细化字段、必填项、Gate 条件和 AI 自动化规则。

## 5. 后续待细化

- 每个阶段 Input 的必需/可选字段
- Output Schema 与验收标准
- Context Readiness 自动检查规则
- Evidence 与 Source 映射
- Gate 自动检查规则
- Owner / AI Role / 自动化等级
- 时间与耗时记录方式
- Output 与 Git/Figma/其他资产的标准关联
- 阶段失败、退回、重试和回滚路径
- Stage Output → Next Stage Input 的机器可读映射
