# Figma implementation

This implementation intentionally starts from the current Figma Make sketch as the visual baseline. Before writing or replacing any repository document, check whether the target path already exists, read its contents, compare for duplicated or overlapping information, and then update/replace only when appropriate. If the existing document cannot safely be updated, create a new non-conflicting document instead.

## Current baseline
- React + Vite + Tailwind
- City service administration context
- Use existing UI components where available
- Preserve current product structure and terminology
- Use the current Figma Make sketch as the temporary visual baseline

## Implementation order
1. Check existing documents/files before creating same-name files.
2. Match page structure from Figma sketch.
3. Match typography, spacing, borders, radius, and interaction states.
4. Validate the page at mobile viewport sizes.
5. Compare against Figma and refine visual differences.
6. Continue to the next stage without requesting confirmation unless execution is genuinely blocked.
