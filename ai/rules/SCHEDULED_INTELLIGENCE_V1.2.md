# Scheduled Project Intelligence V1.2

## 目标
把 KPI 周报和竞品周报从一次性任务升级为项目维度的周期性自动能力。

## Project Configuration

每个项目分别保存：

- KPI Definitions
- KPI Targets
- KPI Sources
- KPI Reporting Schedule
- Competitor List
- Competitor Focus Dimensions
- Competitor Sources
- Competitor Reporting Schedule

## KPI Weekly Job

执行链：

`Project → KPI Config → User Data → Source Validation → Aggregation → Target Comparison → Report`

数据必须来源明细化：每个值都应关联来源、时间范围、口径、采集时间及证据/批次（适用时）。

如果数据由用户填写，必须标记 `User Provided`，并记录填写时间；不得伪装成系统自动采集数据。

## Competitor Weekly Job

执行链：

`Project → Competitor Config → Source Collection → Dedup → Weekly Delta → Analysis → Report`

每条关键事件保留原始来源和时间信息，并区分事实与分析判断。

## Report Assets

每周报告按 Project 独立保存，并支持按周追溯：

- KPI Weekly Report
- KPI Source Detail
- Competitor Weekly Report
- Competitor Source Detail

## Failure Policy

缺失数据、来源失效、抓取失败、口径冲突时：

- 不猜测
- 不补造
- 标记异常
- 记录 Evidence
- 必要时提示用户

## Token Policy

定时任务优先处理新增/变化数据；历史数据按需加载用于对比。用户端报告输出摘要，详细来源写入资产。
