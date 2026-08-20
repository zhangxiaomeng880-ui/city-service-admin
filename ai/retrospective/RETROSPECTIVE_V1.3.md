# AI Native Retrospective V1.3

## 1. 本轮问题

V1.2 已完善新项目创建，但已有项目再次进入时仍缺少统一的快速恢复机制。用户不应重复填写项目基础信息，也不应被迫重新执行完整初始化。

## 2. 发现的根因

- Project 只定义了 New Project 入口。
- 缺少 Existing Project / Resume 生命周期入口。
- 缺少项目快速筛选机制。
- 缺少当前版本与最新版本的主动提示。
- 缺少已有项目的 Git Freshness 与上次迭代状态恢复。
- Iteration 与 Project Resume 的关系未明确。

## 3. 本轮改进

### Project Agent

升级到 V1.3，增加：

- New Project
- Existing Project / Resume
- 项目快速筛选
- 当前/最新版本检查
- Git Freshness
- Infrastructure Readiness
- 上次迭代/Blocker 恢复
- Resume Gate
- 按变更范围推荐最小 Iteration 路径

### Knowledge Base

新增 Project OS V1.3，明确 Project = New Project + Existing Project Resume。

### Conversation

已有项目恢复时优先恢复上下文，而不是重新提问；只在多项目匹配、版本冲突、权限、高风险操作或任务判断时打断用户。

## 4. 形成的新原则

> 新项目需要初始化；已有项目需要恢复。

> Resume 不等于重新初始化。

> Iteration 不等于完整重跑生命周期。

> 项目状态恢复应优先于任务执行。

> 版本和 Git Freshness 是已有项目进入迭代前的基础 Gate。

## 5. Token 优化经验

已有项目优先读取：

1. 项目索引/摘要
2. 当前版本
3. Git 状态/差异
4. 最近一次迭代状态
5. Blocker

只有发现异常或当前任务确实需要时，才深入读取完整历史和具体文件。

## 6. 下一轮观察

重点观察：

- 项目筛选准确率
- Resume 是否减少重复输入
- 最新版本提示是否准确
- Git Freshness 检查是否完整
- 自动同步是否引发误操作
- Iteration 路径选择是否过度/不足
- 用户确认次数是否合理
- Token 消耗是否下降且质量不下降

## 7. 结论

V1.3 补齐了从“项目创建”到“已有项目持续迭代”的生命周期入口。后续项目管理不再是单次初始化，而是 Project Context 持续存在、项目可随时 Resume、Iteration 按变更范围动态路由的持续生命周期。