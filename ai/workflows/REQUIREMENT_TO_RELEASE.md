# Requirement → Release AI Native Workflow

本流程把 GitHub Issue 作为 AI Native 产品需求的唯一入口，并通过项目资产保持全过程可追溯。

## 0. Requirement Intake

**输入：** 用户问题 / 业务目标 / 数据异常 / 用户反馈

**AI：** 帮助澄清问题、补齐背景、识别缺失信息。

**人：** 确认问题是否值得进入产品流程。

**输出：** GitHub Issue（使用 AI Native Requirement 模板）。

---

## 1. Research

AI 收集和整理相关事实：用户反馈、行为数据、竞品、行业资料、历史方案。

**输出：** Research Note。

**原则：** 区分事实、解释、假设，避免把 AI 推断当成事实。

---

## 2. Opportunity

AI 将研究结果转化为：

- 用户问题
- 业务问题
- 机会点
- 待验证假设
- 成功指标

**人：** 确认问题定义和机会是否成立。

---

## 3. Product / PRD

AI 协助形成：

- User Story
- 使用场景
- 业务规则
- 功能范围
- 非目标范围
- 异常情况
- 验收标准

**人：** 最终确认产品方案和取舍。

**输出：** `product/prd/`。

---

## 4. Design

AI 协助形成信息架构、交互和视觉方案。

**输出：** `design/` 下的设计资产或原型。

**验收：** 设计必须与已确认产品规则一致。

---

## 5. Planning

AI 将确认后的需求拆成可执行任务，并明确：

- Task
- 依赖
- 影响范围
- 验收标准
- 测试范围

**输出：** GitHub Project 中可执行的任务。

---

## 6. Engineering

AI 在现有代码基础上实现需求。

要求：

1. 修改前先读取相关规则和现有实现。
2. 优先增量修改。
3. 不擅自改变已确认产品逻辑。
4. 涉及高影响数据结构或架构变化时先说明。

**输出：** Branch / Commit / Pull Request。

---

## 7. QA

AI 根据验收标准执行或辅助生成测试：

- 正常流程
- 边界条件
- 异常流程
- 回归影响
- 前后台联动

**输出：** 测试结果。

**人：** 进行产品体验验收。

---

## 8. Release

发布前确认：

- 需求已确认
- PR 已 Review
- 测试通过
- 发布范围明确
- 回滚方案可用

**输出：** Release Note / Version。

---

## 9. Analytics

上线后观察：

- 核心指标
- 用户行为
- 用户反馈
- 异常
- 实验结果

AI 输出应区分事实、解释、假设和建议。

---

## 10. Iteration

数据和反馈回到新的 Requirement / Research，形成闭环：

```text
Requirement
    ↓
Research
    ↓
Opportunity
    ↓
Product
    ↓
Design
    ↓
Planning
    ↓
Engineering
    ↓
QA
    ↓
Release
    ↓
Analytics
    ↓
Iteration ─────→ Requirement
```
