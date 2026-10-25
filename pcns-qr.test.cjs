const test = require('node:test');
const assert = require('node:assert/strict');
const PCNSQR = require('../frontend/public/pcns-qr.js');

const gates = [
  { label: 'E1 Main Gate, Amity University, Noida', lat: 28.543380, lng: 77.331890, floor: 0 },
  { label: 'E2 Main Gate, Amity University, Noida', lat: 28.543020, lng: 77.332310, floor: 0 },
  { label: 'E3 Main Gate, Amity University, Noida', lat: 28.542810, lng: 77.331920, floor: 0 },
];

for (const gate of gates) {
  test(`round-trips QR link for ${gate.label}`, () => {
    const url = PCNSQR.buildUrl(gate, 'https://example.org/pcns/');
    assert.deepEqual(PCNSQR.parsePayload(url), gate);
  });
}

test('accepts a JSON anchor QR payload', () => {
  const payload = JSON.stringify({ type: 'pcns-anchor', name: gates[0].label, lat: gates[0].lat, lng: gates[0].lng, floor: 0 });
  assert.deepEqual(PCNSQR.parsePayload(payload), gates[0]);
});

test('rejects invalid coordinates and unknown payloads', () => {
  assert.equal(PCNSQR.parsePayload('{"type":"pcns-anchor","name":"Bad","lat":91,"lng":0,"floor":0}'), null);
  assert.equal(PCNSQR.parsePayload('plain text'), null);
});
