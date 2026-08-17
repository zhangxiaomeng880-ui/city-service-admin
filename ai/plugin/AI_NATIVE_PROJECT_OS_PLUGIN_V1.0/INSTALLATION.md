# AI Native Project OS Plugin V1.0 — Installation Guide

## 1. 目标

本插件提供通用的 AI Native 项目执行能力，不绑定任何具体业务项目。

插件采用 **Core + Optional Capabilities** 模式：安装核心能力后，根据实际执行阶段按需连接外部工具。

## 2. Core Requirements

安装及运行插件至少需要：

- Agent Runtime：能够读取并执行 Markdown Agent Contract
- Workspace / File Access：能够读取、创建、更新项目文件
- Persistent State：能够保存 Stage Status、Resume Point、Gate、Handoff 和 Execution Record
- Knowledge Storage：能够读取和更新 Knowledge / Evolution
- Git-capable Workspace：能够读取项目 Repository、Branch、Version 信息

## 3. Recommended Capabilities

以下能力不是插件安装的强制条件，但建议用于完整项目执行：

- GitHub / Git provider：Repository、Issue、PR、代码协作及版本追溯
- Figma：Design 阶段的设计资产、组件、页面和交互验证
- Build / Deploy / Preview Runtime：Engineering 后的可验证版本生成

## 4. Optional Capabilities

仅在对应项目或阶段需要时启用：

- Data / Analytics Platform
- Experiment / A/B Platform
- CI/CD Platform
- Deployment Platform
- Project Management / Issue Tracking
- Other domain-specific tools

## 5. Capability Binding Rule

外部能力不是全局强制依赖。Stage 启动时根据该 Agent MD 的 Environment / Capability Dependency 进行检查。

示例：

`启动 Design`

→ 检查 Figma Capability

`启动 Coding`

→ 检查 Repository / Runtime Capability

`启动 Preview`

→ 检查 Build / Deploy / Preview Capability

`启动 Data`

→ 检查 Data / Experiment Capability

缺失能力只阻塞依赖该能力的阶段，不影响插件核心能力和其他不依赖该能力的阶段。

## 6. Installation Gate

安装完成后必须执行 Plugin Self Check：

1. Plugin Manifest 可读取
2. Agent Registry 可读取
3. Stage Contract 可读取
4. Command Protocol 可读取
5. 12 个标准 Stage Agent 定义可解析
6. Stage Status / Resume 状态可持久化
7. Knowledge / Evolution 可读取和写入
8. 当前 Workspace 可识别
9. Git Repository / Branch / Version 可识别（如项目使用 Git）
10. Optional Capability 按实际配置检查

## 7. Self Check Result

- PASS：核心依赖全部满足，可启动项目
- PASS WITH WARNING：核心依赖满足，但部分可选能力缺失；仅影响相关阶段
- BLOCKED：核心运行能力缺失，不允许进入项目执行

## 8. 不允许的安装行为

- 不要求安装所有 Optional Capability
- 不因当前项目跳过 Data / Experiment 而删除该 Agent
- 不因当前项目不使用 Figma 而删除 Design Agent
- 不将具体项目账号、业务数据、Figma 地址、Repository 地址写入通用插件包
- 不把当前项目的环境配置当成插件全局依赖

## 9. 安装后第一步

安装成功后执行：

`Plugin Self Check`

通过后使用：

`启动 Project`

进入项目生命周期。
