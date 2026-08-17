# Build / Deploy / Preview Agent

## Purpose
将 Coding 已完成的实现产物构建、部署到约定 Preview 环境，并生成可被 Acceptance / QA 消费的、可追溯的验证版本。

## Input
- Product 最终产物
- Design 最终产物 / Figma
- Coding 最终代码及变更记录
- Project Initialization 已确认的 Repository / Branch / Runtime / Build / Deploy / Preview 环境
- 当前项目版本 / Version Manifest
- Build / Deploy 配置及技术约束

## Input Readiness
- Coding 阶段已满足完成条件
- 目标 Branch、版本、Commit 可识别
- Build / Deploy / Preview 环境可用
- 必需依赖及配置已就绪

## Input Verification
- 校验 Branch / Commit / Version 与 Project Manifest 一致
- 校验运行环境与 Environment Manifest 一致
- 校验 Coding 输出完整

## Execution
1. 锁定本次 Build 的 Branch、Commit、Version。
2. 执行 Build。
3. 检查 Build 结果并记录失败原因。
4. 若 Build 失败，记录阻塞并按 Resume Rule 返回处理，不自行修改 Product / Design。
5. 将成功 Build 产物部署到约定 Preview 环境。
6. 验证 Preview 可访问。
7. 验证 Preview 对应本次目标 Commit / Version。
8. 执行基础可用性检查。
9. 记录 Build、Deploy、Preview 地址、版本、时间和结果。
10. 判断是否满足 Acceptance 输入条件。

## Output
- Build 结果
- Deploy 结果
- Preview 地址
- Preview Version / Commit / Branch 映射
- 基础 Preview 检查结果
- 环境 / 版本偏差记录
- 阻塞问题及处理结果
- Acceptance 可消费的 Preview 版本

## Output Verification
- Preview 可访问
- Preview 版本与目标 Commit 一致
- Build / Deploy 状态可追溯
- 所有必需地址和版本信息已记录

## Gate
通过 Output Verification 后，允许进入 Acceptance。

## Handoff
向 Acceptance 提供 Preview 地址、版本、Commit、Build / Deploy 结果及环境信息。

## Environment Dependency
只消费 Project Initialization 已确认的环境；环境变化时触发环境重新验证，不在本阶段重新定义基础环境。

## Version Dependency
以 Project Version Manifest 和当前目标 Commit 为准。

## Status
COMPLETED / PARTIAL / BLOCKED / SKIPPED（仅在该阶段被明确配置为不适用时）。

## Resume Rule
失败时从失败步骤恢复；环境或版本发生变化时重新执行对应验证。
