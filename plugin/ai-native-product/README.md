# AI Native Product Plugin v0.1

A reusable product-development workflow for Product, Data/KPI, AB Strategy, UX, UI, Figma, Coding, QA, Release, Analytics, Experiment Analysis, Optimization, and Review.

## Workflow

1. Product
2. Data & KPI
3. AB Strategy
4. UX
5. UI
6. Figma High-Fidelity (optional)
7. Coding
8. QA
9. Visual QA
10. Release Gate
11. Data Analysis
12. AB Analysis
13. Optimization Gate
14. Project Review

## Execution rule

Each stage executes first and then stops for user confirmation before entering the next stage. QA and Visual QA may auto-loop on failures. Release and optimization decisions always require explicit confirmation.

## Commands

- `新建项目：<项目名>`
- `继续执行`
- `重新执行本阶段`
- `跳到 <阶段>`
- `查看项目状态`

## First pilot

The first validation project is the Department Registration migration in `city-service-admin`.

## Apps/MCP extension points

- Figma: high-fidelity design and design context
- GitHub/Codex: implementation and repository changes
- Data: KPI and product analytics
- AB platform: experiment lifecycle
- Browser/Playwright: functional and visual QA

This repository contains the workflow definition and MCP app scaffold. External service credentials remain user-specific.