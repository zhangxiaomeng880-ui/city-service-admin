import fs from 'node:fs';
import path from 'node:path';

const required = [
  'backend/package.json',
  'backend/MIGRATION_MANIFEST.md',
  'backend/validation/backend-validation.mjs'
];

for (const file of required) {
  if (!fs.existsSync(path.resolve(process.cwd(), file))) {
    throw new Error(`Missing backend validation artifact: ${file}`);
  }
}

const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'backend/package.json'), 'utf8'));
if (pkg.name !== 'city-service-admin-backend') throw new Error('Unexpected backend package name');

const manifest = fs.readFileSync(path.resolve(process.cwd(), 'backend/MIGRATION_MANIFEST.md'), 'utf8');
if (!manifest.includes('source_repository:')) throw new Error('Migration manifest missing source_repository');
if (!manifest.includes('migration_status:')) throw new Error('Migration manifest missing migration_status');

console.log('Backend validation structure: PASS');
console.log(`migration_status=${manifest.match(/migration_status:\s*(\S+)/)?.[1] ?? 'UNKNOWN'}`);
