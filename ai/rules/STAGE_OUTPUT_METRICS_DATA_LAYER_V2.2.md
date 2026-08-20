# Stage Output & Metrics Data Layer V2.2

## 1. Positioning
Stage Output & Metrics 是项目数据资产，不是 Agent。它记录各阶段实际产生的业务、交付、质量和执行统计，并由 Analytics 消费。

## 2. Core Rule
所有指标默认以项目实际产生的原始事实为准，由系统自动统计。不得由 Agent 或用户主观填写结果数据。只有在项目明确另行指定 Auto-Fill Rule 时，才允许按该规则自动补齐，并必须记录规则来源。

## 3. Data Lineage
Stage Execution → Raw Stage Data → Derived Metrics → KPI / Report。每个指标必须能回溯到对应原始记录、事件、Evidence 或外部数据来源。

## 4. Product Stage
记录需求、功能项、User Story、Acceptance Criteria、需求变更、已确认需求、Blocked 需求等实际数量及状态；可派生需求完成率、变更率等指标。

## 5. Design Stage
记录页面、流程、组件、状态、设计问题、Review、Design→Code Mapping 等实际产出；可派生状态覆盖率、映射完成率、问题解决率等指标。

## 6. Planning Stage
记录技术任务、API、数据模型、风险、Blocker、Migration、Rollback Plan、Test Strategy 等实际项及状态；派生规划完成率、风险关闭率等指标。

## 7. Engineering Stage
记录实际 Commit、PR、Changed Files、Added/Deleted Lines、Feature/Task、Code Review、Build、Defect、Rework 等。代码行数仅作为辅助指标；可派生缺陷密度、Build Success Rate、Rework Rate 等。

## 8. Testing Stage
记录 Test Case 总数、Planned、Executed、Passed、Failed、Blocked、Not Run、Defect、Severity、Open/Resolved/Reopened、Regression 等实际数据；派生执行率、Pass Rate、Defect Resolution Rate、Reopen Rate、Regression Pass Rate 等。

## 9. Compliance Stage
记录 Applicable Rules、Checks、Passed、Failed、Exception、Waiver、Open/Resolved Compliance Issue 等实际数据；派生合规通过率、问题关闭率等。

## 10. Release Stage
记录 Release Candidate、Deployment、Release、Rollback、Failure、Smoke Test、Gate、发布时间等实际事件；派生 Release Success Rate、Rollback Rate、Release Duration 等。

## 11. Analytics Stage
记录 KPI 定义、目标、实际值、数据来源、上报周期、Data Owner 和报告生成状态。KPI Actual 必须来自可追溯数据源。

## 12. Maintenance Stage
记录 Incident、Bug、Change Request、Hotfix、Recovery、Rollback、MTTR、Reopen 等实际事件；派生 MTTR、Reopen Rate、Recovery Success Rate 等。

## 13. Audit Stage
Audit 不产生业务指标，但可记录 Audit Check、Finding、Severity、Remediation、Re-Audit 和 Gate 结果，并引用其他阶段数据作为 Evidence。

## 14. Counting Semantics
数量指标必须明确统计对象、去重规则、时间范围、状态口径和数据来源。禁止在不同阶段使用同名不同口径的指标。派生指标保存计算公式和输入数据引用。

## 15. Missing Data
项目实际没有产生的数据记录为 0、N/A 或 Not Applicable 时，必须根据指标语义区分；不得为了填满报表而虚构数据。缺失且无法判断时保持 Missing，并通过 Conversation 询问是否需要补充规则。

## 16. Auto-Fill Rule
只有项目明确配置 Auto-Fill Rule 后，系统才可以自动补齐缺失字段。自动补齐必须记录 rule_id、rule_version、执行时间、原始输入和计算结果。

## 17. Conversation
数据统计由系统自动维护。用户只在指标口径、统计范围、Auto-Fill Rule 或异常数据需要决策时参与；不重复询问系统已经能够从实际执行记录得到的数据。

## 18. Token Strategy
优先从 Stage Output、Execution Record、Evidence、Test Result、Code/PR 等结构化数据直接计算；Agent 不重复读取全文或重新总结已存在的统计结果。

## 19. Auditability
每个阶段指标必须满足：Definition → Source → Raw Record → Calculation → Result → Evidence。Audit 可抽查原始记录并验证指标是否与实际产生的数据一致。