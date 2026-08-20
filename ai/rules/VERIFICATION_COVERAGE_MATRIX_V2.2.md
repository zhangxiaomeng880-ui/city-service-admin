# Verification Coverage Matrix V2.2

## Purpose
本文件不是新增阶段或新增 Agent，而是定义“前置输入 → 阶段 Verification → 下游 Required Input → Testing / Compliance / Audit”的覆盖关系，防止后置验证时才发现前置输入缺失。

## Core Principle
> 能在前置阶段确定的验证输入，必须在前置阶段通过人机交互收集；能自动从 Project Context / Repository / Environment / Evidence / User Context 获取的信息，不重复询问用户。

> Testing 验证产品行为；Compliance 验证规则/约束符合性；Audit 验证流程、Evidence、Gate 和结论真实性与完整性。

## User Responsibility Coverage
User & Responsibility Data Layer 是所有阶段的共享基础输入，不是新的验证阶段。Project 创建者默认 Project Owner，可变更；每个实际执行阶段都必须可解析 Stage Owner，必要时补充 Task Assignee、Reviewer、Approver、Decision Owner。已有责任直接复用，缺失时由 Agent 以 Project Owner 作为默认候选进行最小对话确认。角色/权限变更必须经过权限检查；历史责任和权限以 Snapshot 保留供 Audit 追溯。

## Coverage Matrix

| Stage | Required Input 增补 | User / Responsibility Input | Stage Verification | Downstream Consumer | Verification Owner |
|---|---|---|---|---|---|
| Project | 项目负责人/责任角色、目标环境、仓库/分支、版本、KPI/竞品适用性、风险级别、需人工处理事项 | Project Owner、Decision Owner、项目成员、基础角色/权限 | Context / Infrastructure / Git Freshness | Product / Planning / Release / Analytics | Project + Audit |
| Product | 用户目标、Scope/Out of Scope、业务规则、Acceptance Criteria、成功指标、风险、关键决策人 | Product Owner / Stage Owner、Decision Owner、相关 Reviewer | Requirement completeness / rule consistency / acceptance verifiability | Design / Planning / Testing / Compliance | Product + Audit |
| Design | 设计范围、平台、组件规范、页面状态、异常/空/加载、可用性约束、Design→Code mapping | Design Owner / Stage Owner、Reviewer、设计成员 | Design completeness / state coverage / implementation feasibility | Engineering / Testing | Design + Audit |
| Planning | Architecture、Data/API、Dependencies、Security/Performance/Compliance applicability、Migration、Rollback、Test Strategy、Release Preconditions | Planning Owner / Stage Owner、Engineering Owner、Reviewer/Decision Owner | Assumption / architecture / dependency / risk verification | Engineering / Testing / Compliance / Release | Planning + Audit |
| Engineering | Implementation scope、commit/version、build、test baseline、migration result、runtime config status | Engineering Owner / Stage Owner、Task Assignee、Reviewer、有效代码权限 | Build / implementation / unit-level checks | Testing / Release | Engineering + Testing + Audit |
| Testing | Acceptance Criteria、test environment/build、test data、test scope、risk-based regression scope | Testing/QA Owner、Task Assignee、Reviewer、有效测试/环境权限 | Functional / API / integration / regression / automation | Release / Audit | Testing + Audit |
| Compliance | Applicable Rules、Rule IDs、Evidence、approved exceptions/waivers | Compliance Reviewer / Stage Owner、Decision Owner、Approver、有效合规权限 | Rule→Evidence→Result | Release / Audit | Compliance + Audit |
| Release | Verified build、version、environment、release preconditions、rollback、approval | Release Owner / Stage Owner、Release Approver、Executor、有效发布权限 | Deployment / smoke / health / rollback readiness | Maintenance / Analytics / Audit | Release + Audit |
| Analytics | KPI definition、target、direction、period、source、owner、data completeness | Analytics/Data Owner、Reviewer、有效数据权限 | Source / metric / target comparison | Project / Product / Retrospective | Analytics + Audit |
| Research | Competitor scope、dimensions、source policy、period | Research/Competitor Owner、Reviewer/Decision Owner、有效研究配置权限 | Source validity / change classification | Product / Design / Retrospective | Research + Audit |
| Maintenance | Current version、incident/change scope、impact、environment、monitoring evidence | Maintenance Owner / Stage Owner、Incident Assignee、Decision Owner、有效维护/生产权限 | Runtime behavior / fix verification | Product / Testing / Audit | Maintenance + Audit |

## Human Interaction Requirement
每个 Stage 的 Required Input 都必须支持对话式收集：
1. Agent 先读取 Project Context / Handoff / 可用外部事实 / User Context。
2. 自动补齐已知字段。
3. 仅提示缺失且影响当前阶段决策的最小字段。
4. 用户可以一次回答多个字段，也可以分批回答。
5. Agent 判断回答是否满足 Required Input。
6. 满足 → 执行下一步；不满足 → 只追问缺失项。
7. 需要责任人判断、批准、授权或业务取舍 → Human Gate。

## Verification Boundary
### Testing
验证“实现是否按需求工作”：Acceptance Criteria、功能、接口、集成、回归、自动化、适用的实现一致性检查。

### Compliance
验证“是否符合适用规则”：业务规则、权限/数据规则、平台/组织规范、安全/隐私/法规等适用约束。

### Audit
验证“前面的过程和结论是否可信”：Agent Contract、Input、Output、Evidence、Gate、Handoff、独立性、用户责任/权限 Snapshot、文档同步、Mandatory Audit 和旧 PASS 失效规则。

## Missing Input Handling
后置 Agent 发现 Required Input 缺失时，不自行创造关键事实：

```text
发现缺失
↓
标记 PARTIAL / BLOCKED
↓
定位输入所属前置阶段
↓
回到责任 Agent
↓
对用户进行最小必要提问
↓
更新 Handoff
↓
重新执行当前验证
```

## No Extra Verification Stage
本矩阵明确：不存在一个笼统的“其他验证阶段”。Verification 是各专业 Agent 的职责，由 Iteration Router 根据风险和变更范围动态选择，不为了流程完整而重复运行全部验证。

## Audit Trigger
本文件更新本身属于 Mandatory Audit Trigger。