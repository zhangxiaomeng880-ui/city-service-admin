# Backend Migration Manifest

project: city-service-admin
source_repository: NOT_IDENTIFIED
source_branch: NOT_IDENTIFIED
migration_target_branch: fix/ai-native-2.0-backend-validation
migration_status: BLOCKED_SOURCE_NOT_IDENTIFIED

## Rule

This branch establishes the backend repository/branch validation boundary without inventing or fabricating business backend code.

Backend migration may be marked COMPLETE only after the authoritative source repository and source commit are identified, the code is migrated to this branch, and the migrated code passes build, unit/integration, API contract, and runtime validation.

## Required Evidence

- source repository URL/name
- source branch
- source commit SHA
- target commit SHA
- migration diff
- build result
- test result
- runtime result
- API contract result
- frontend/backend integration result
- independent audit result
