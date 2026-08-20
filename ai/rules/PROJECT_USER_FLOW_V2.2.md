# Project User Flow V2.2

## Project Creation
1. Creator creates project.
2. Creator is automatically Project Owner.
3. User may change Project Owner through the user data layer.
4. Project records members, role assignments and responsibility snapshot.

## Stage Entry
At each stage, Orchestrator reads Stage Owner from Project Context. If present and valid, continue without asking. If absent, use Project Owner as default candidate and ask the minimum confirmation question. A user may select another project member.

## Stage Handoff
Stage Owner is included in Handoff together with required role/permission context and decision ownership when applicable.

## Task Assignment
Agents may propose task assignment based on project roles, but assignment changes are persisted through the user data layer and must respect permissions.

## Human Gate
If an action requires human judgment, approval, authorization or a role/permission change, route to the responsible user through Human Gate. Record decision, actor, timestamp and resulting state.

## Reassignment
Users with sufficient project permission can reassign Project Owner, Stage Owner, Assignee, Reviewer or Approver. Reassignment is recorded and creates a new responsibility snapshot.

## Personal Assets
User-created roles, permission bundles and responsibility templates are personal assets unless explicitly shared or promoted by the platform's future sharing mechanism. System presets remain unchanged.

## Audit
Every responsibility and permission change relevant to project execution must be auditable. Historical snapshots are immutable for audit purposes.

## Boundary
This is a data and interaction flow, not a User Agent. Business decisions remain with Product/other responsible Agents; compliance remains with Compliance; independent process verification remains with Audit.