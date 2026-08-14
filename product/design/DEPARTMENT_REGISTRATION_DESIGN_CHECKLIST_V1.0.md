# 科室挂号 Design Checklist V1.0

## 项目实例
- Template: `ai/knowledge-base/v1.0/workflows/DESIGN_STAGE_CHECKLIST_V1.0.md`
- Upstream: Product / PRD
- Downstream: Engineering
- Status: Input Validation In Progress

## Checklist

| ID | Name | Required | Validation | Evidence | Blocker | Status | Owner | Checked By | Checked At |
|---|---|---|---|---|---|---|---|---|---|
| DSN-IN-001 | PRD | Yes | 当前 PRD 可定位；范围、目标、核心链路明确 | PRD | Yes | Pass | Design | Design Agent | 2026-08-14 |
| DSN-IN-002 | Business Rules | Yes | 核心业务规则可理解且无关键冲突 | PRD §7 | Yes | Pass | Design | Design Agent | 2026-08-14 |
| DSN-IN-003 | User Flow | Yes | 核心路径已定义，可作为交互设计输入 | PRD §6 | Yes | Pass | Design | Design Agent | 2026-08-14 |
| DSN-IN-004 | Acceptance Criteria | Yes | 核心目标可验证 | PRD §9 | Yes | Pass | Design | Design Agent | 2026-08-14 |
| DSN-IN-005 | Product Decision Log | Yes | 关键产品决策可追溯 | Product Decision Log | No | Warning | Design | Design Agent | 2026-08-14 |
| DSN-IN-006 | Open Questions / Warnings | Yes | 未决项已识别并能传递给 Design | PRD §11 | No | Warning | Design | Design Agent | 2026-08-14 |

## Gate Result

**Input Gate: Pass with Warning**

### Warnings
1. Product Decision Log / Evidence Registry 需要在后续设计判断中保持可追溯；当前 PRD 已提供核心上下文，但不是所有具体判断均已形成独立证据条目。
2. Engineering 前的数据接口与字段契约尚未冻结，Design 应避免自行定义未经 Product/Engineering 确认的数据细节。

## Design Execution Rule

当前可以进入 Design 探索与正式设计，但不得将未确认的数据契约当作既定事实。

## Next Outputs
- Information Architecture
- User / Interaction Flow
- Interaction States
- Visual Design
- Component / Asset Mapping
- Handoff Notes
- Design Decision Log
- Evidence Registry
- Open Questions / Warnings
