import test from 'node:test';
import assert from 'node:assert/strict';
import { locations, appointmentNgos, outreach } from '../src/locations.mjs';
import { localTopic } from '../src/knowledge.mjs';

test('only sourced testing buildings have map coordinates; outreach has no invented venues', () => {
  assert.equal(new Set(locations.map(x => x.id)).size, locations.length);
  for (const loc of locations) {
    assert.ok(['govt', 'ngo'].includes(loc.type));
    assert.ok(loc.lat > 22.1 && loc.lat < 22.6 && loc.lng > 113.8 && loc.lng < 114.5);
    assert.match(loc.coordinateSource, /^https:\/\/www.openstreetmap.org\/way\/\d+$/);
    assert.equal(loc.checkedAt, '2026-11-18');
    for (const lang of ['en', 'zh']) for (const field of ['name','address','hours','note']) assert.ok(loc[field][lang]);
  }
  for (const item of [...appointmentNgos, ...outreach]) {
    assert.equal(item.lat, undefined); assert.equal(item.lng, undefined);
    assert.match(item.url, /^https:\/\//);
  }
});

test('map requests route correctly without capturing unrelated where/near questions', () => {
  for (const q of ['HIV testing map', 'testing centre address', 'nearest testing point', '檢測地圖', '附近檢測', '检测地址']) assert.equal(localTopic(q), 'location', q);
  for (const q of ['Where is the library?', 'a map of restaurants', 'email address']) assert.equal(localTopic(q), 'unknown', q);
  assert.equal(localTopic('Where will it rain?'), 'weather');
  assert.equal(localTopic('I was exposed yesterday, nearest testing point?'), 'urgent');
  assert.equal(localTopic('My test is reactive, testing map?'), 'reactive');
  assert.equal(localTopic('Where is my private data stored?'), 'privacy');
});
