import assert from 'node:assert/strict';

const base = process.env.BACKEND_URL || 'http://127.0.0.1:3000';
const get = async path => { const r = await fetch(`${base}${path}`); assert.equal(r.ok, true, `${path} returned ${r.status}`); return r.json(); };

const health = await get('/health');
assert.equal(health.status, 'ok');
const cities = await get('/api/cities');
assert.ok(cities.data.length > 0);
const hospitals = await get(`/api/hospitals?cityId=${cities.data[0].id}`);
assert.ok(hospitals.data.length > 0);
const campuses = await get(`/api/campuses?hospitalId=${hospitals.data[0].id}`);
assert.ok(campuses.data.length > 0);
const departments = await get(`/api/departments?campusId=${campuses.data[0].id}`);
assert.ok(departments.data.length > 0);
const doctors = await get(`/api/doctors?departmentId=${departments.data[0].id}`);
assert.ok(doctors.data.length > 0);
console.log('FRONTEND_BACKEND_INTEGRATION_PASS');
