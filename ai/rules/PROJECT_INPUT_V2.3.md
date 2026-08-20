# Project Input V2.3

## Categories
基础信息、规模信息、技术信息、依赖信息、风险信息、资源信息、预算信息、时间信息、质量信息、合规信息、自定义信息。

## Completeness
字段按 Required / Recommended / Optional 管理。Required 缺失时必须提示，但允许用户 Skip；系统根据实际获得的信息重新计算完整度。

## Conversation
一次只询问当前最必要的缺失项；用户可补充、使用默认规则或跳过。已有数据直接复用。Skip 不阻塞后续流程，除非该字段属于当前操作不可缺少的硬性输入；此时必须明确告知原因。

## Traceability
所有输入、修改、Skip、Default 选择记录 actor、timestamp、field、old/new value、source 和 rule_id（如适用）。

## Value
将项目计划输入从单一项目描述升级为结构化上下文，使计划、风险、资源、预算、质量和合规判断拥有明确的数据依据。