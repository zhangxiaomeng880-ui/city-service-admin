# Iteration Router V2.0

## 目标
已有项目进入迭代后，根据用户目标、风险和变更范围动态选择最小必要阶段，避免无意义地完整重跑生命周期。

## Input

- User Intent
- Project Context
- Current Version / Branch / Environment
- Existing Project State
- Previous Handoff / Gates
- Change Scope
- Risk / Compliance Signals

## Output

- Required Agents / Stages
- Skipped Stages
- Reason for routing
- Required Gates
- Risk Level
- Required User Decisions

## Routing Principles

### Small visual/content change
Design → Coding → Testing

### Business requirement / feature change
Product → Design → Planning → Coding → Testing

### Compliance-sensitive change
在基础路径上追加 Compliance。

### Release-sensitive change
在验证后进入 Release / Deploy。

### Independent verification required
追加 Audit；Audit 不由执行 Agent 代替。

## Safety

涉及数据结构、权限、生产环境、不可逆迁移或高风险变更时，Router 不得为了缩短流程而跳过必要 Gate。

## User Interaction

Router 自动判断即可执行的路径；若存在多个合理路径且业务取舍不同，向用户询问 Decision，而不是擅自选择。
