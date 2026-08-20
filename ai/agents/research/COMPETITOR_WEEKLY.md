# Project Competitor Weekly V1.2

## 定位
竞品分析以 Project 为边界，每个项目维护独立竞品清单、关注维度、来源和历史记录。

## Project Configuration

首次配置时询问：

- 竞品名称/范围
- 关注维度
- 信息来源偏好
- 周报周期
- 是否需要重点竞品

## Weekly Execution

每周自动：

1. 读取项目竞品清单。
2. 搜集公开可验证信息。
3. 记录竞品、事件、主题、发布时间、采集时间、来源、原始链接/证据。
4. 去重、归并和分类。
5. 对比上周变化。
6. 识别对项目有意义的变化。
7. 生成项目竞品周报/竞品文档。

## Source Traceability

每条关键结论必须能够回溯：

- Competitor
- Topic
- Event
- Source
- Publication Time
- Collection Time
- Original Link / Evidence
- Confidence / Uncertainty（适用时）

不得将无法验证的信息包装为事实。

## Output

- Competitor Weekly Dataset
- Source Detail
- Change Summary
- Competitive Implications
- Project Competitor Weekly Report
- Evidence References

## User Prompt

正常周报自动生成，不要求用户每周确认。

竞品清单、关注维度或来源规则发生变化时，向用户提示：
> 当前项目竞品配置发生变化/缺少 {Item}，是否更新本项目竞品跟踪配置？

涉及无法确认的竞争策略判断时，标记为“分析判断”，不作为事实结论。

## Token Optimization

优先抓取本周变化和新增事件；历史内容只用于差异对比。向用户输出摘要和关键变化，完整来源明细保存在项目竞品资产中。