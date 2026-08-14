# EVOLUTION-003 — Project Stage Input / Output 深度优化

## 1. 背景

在完成 V1.0 项目阶段 Input / Output Matrix 骨架后，进入逐阶段深度优化。本节点首先优化 Project 阶段，因为 Project 是整个 Product → Design → Engineering → QA → Release → Analytics → Knowledge 链路的上游输入源。

## 2. 原始问题

已有流程能够描述阶段顺序，但仅有阶段级 Input / Output 骨架不足以直接驱动 AI 执行。需要进一步明确：进入阶段需要什么、如何判断上下文是否完整、阶段具体做什么、必须产生什么、证据如何追溯、什么条件允许进入下一阶段。

## 3. 思考与判断

本次优化没有新增业务阶段，而是在既有流程上增加统一的 Stage Schema：

Input → Context Readiness → Process → Output → Evidence → Gate → Next Stage

并继续保留 Owner、AI Role、时间、耗时、产出地址、验证结果等执行元数据。

## 4. 决策

优先从 Project 阶段开始深挖，原因是 Project Output 将直接成为 Product Input。如果源头阶段定义不清，后续阶段会不断重复收集背景、目标和约束，无法形成稳定的 AI 执行链。

## 5. 本次执行

建立 Project 阶段详细规范，明确：

- Input
- Context Readiness
- Process
- Output
- Output Quality
- Evidence
- Project Ready Gate
- Downstream
- Execution Metadata
- Reuse

## 6. 本次产出

- `ai/knowledge-base/v1.0/workflows/PROJECT_STAGE_PROJECT_DETAIL_V1.0.md`
- Project Output → Product Input 的明确接口定义

## 7. 验证方式

检查 Project 阶段输出是否能够让 Product 阶段直接理解：

1. 为什么做
2. 做什么
3. 不做什么
4. 已知约束是什么
5. 已有证据在哪里
6. 什么条件下算 Project Ready

## 8. 当前结果

Project 阶段已经从“流程节点”升级为具有明确输入、处理、输出、证据和 Gate 的可执行 Stage Schema。

## 9. 下一步

继续按照相同方法优化 Product 阶段，并验证 Product Input 是否能够完整消费 Project Output；如果出现缺口，记录为新的 Decision / Evolution，而不是直接隐式补充。
