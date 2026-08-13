# V1.0 QA Test Cases

## Scope
城市 → 科室 → 医生；当前阶段为能力建设，不包含 KPI/A-B 实验，不要求院区选择。

| ID | Module | Scenario | Expected | Priority |
|---|---|---|---|---|
| QA-001 | City | Default city | Shenzhen is displayed by default | P0 |
| QA-002 | City | Switch city | Selected city and page context update correctly | P0 |
| QA-003 | Department | Department list | All configured departments are visible | P0 |
| QA-004 | Department | Switch department | Doctor list changes to selected department | P0 |
| QA-005 | Doctor | Doctor list | Doctor ID, name, title, specialty, status and action are shown | P0 |
| QA-006 | Doctor | Search by name | Matching doctors are returned | P1 |
| QA-007 | Doctor | Search by specialty/title | Matching doctors are returned | P1 |
| QA-008 | Doctor | No search result | Empty state is shown without layout break | P1 |
| QA-009 | Doctor | Department has no doctors | Empty state is shown with add-doctor guidance | P1 |
| QA-010 | Doctor | Add doctor entry | Add doctor action is visible and clickable | P0 |
| QA-011 | Interaction | Active department | Selected department has clear active state | P1 |
| QA-012 | Interaction | City selector | Selector opens and selected value is retained | P1 |
| QA-013 | Visual | Desktop layout | No overlap, clipping or horizontal overflow at supported desktop width | P1 |
| QA-014 | Visual | Typography/spacing | Text hierarchy and spacing remain consistent | P2 |
| QA-015 | Regression | Refresh page | Page loads without runtime error | P0 |
