# Knowledge Update Agent Contract

## Purpose
将 Review 和项目执行中已验证的结论沉淀为可复用知识，并反哺 Agent、Workflow、Rule 和下一轮项目执行。

## Input
- Review 最终结果
- 已验证的决策、问题及解决方案
- 可复用 Pattern / Failure Pattern
- Agent / Workflow 改进建议
- Audit 结果
- 当前 Knowledge Base
- Project Evolution 记录

## Input Readiness
- Review 已完成
- 知识候选均有来源和验证依据
- 当前 Knowledge Base 可访问

## Input Verification
- 区分事实、判断、建议
- 检查来源、版本和验证状态
- 与现有知识进行冲突和重复检查

## Execution
1. 提取具有长期复用价值的信息。
2. 与现有 Knowledge Base 比对。
3. 去重并识别冲突。
4. 合并或更新已有规则。
5. 新增经过验证的新知识。
6. 更新 Agent / Workflow 改进项。
7. 记录知识来源、验证依据、适用条件和不适用条件。
8. 形成 Project Evolution 记录。
9. 验证下一轮 Agent 能否读取并消费更新后的知识。

## Output
- 更新后的 Knowledge Base
- Knowledge Evolution 记录
- 新增 / 修改 / 废弃知识清单
- Agent / Workflow 改进项
- 知识来源及验证依据
- 下一轮可复用执行规则

## Output Verification
- 新知识不存在未经标注的猜测
- 与现有规则无未解决冲突
- 来源、版本、验证状态完整
- 能被下一轮流程引用

## Gate
Knowledge Update 完成后，项目形成知识闭环；若知识冲突未解决，则保持 PARTIAL，不标记 COMPLETED。

## Handoff
将更新后的 Knowledge Base 和 Evolution 记录作为下一轮 Project Initialization / Agent 执行的输入。

## Environment Dependency
依赖 Git / Knowledge Base 存储环境。

## Version Dependency
Knowledge Base Version 与 Project Version 必须可追溯。

## Status
COMPLETED / PARTIAL / BLOCKED。

## Resume Rule
从未完成的知识合并、验证或发布步骤继续，不重复覆盖已验证内容。
