#!/usr/bin/env node

const jsonPathAll = '../_data/webinars.json';
const noDupesTimestamp = '2020-09-01T00:00:00.000Z';
const noDupesMs = +(new Date(noDupesTimestamp));

const events = require(jsonPathAll).events;

// De-duplication strategy is based on similar titles
// but to avoid O(n^2) we optimise by bucketing based on 1st presenter
// making it O((n*logn) + (m^2)) where m is amortised number of
// events per speaker
const speakerToEvents = new Map();

events.forEach((event) => {
  if (event.status !== 'confirmed' ||
    +(new Date(event.timestamp) < noDupesMs)) {
    return;
  }
  const speaker = event.presenters[0].name;
  if (!speakerToEvents.has(speaker)) {
    speakerToEvents.set(speaker, []);
  }
  const speakerEvents = speakerToEvents.get(speaker);
  speakerEvents.push(event);
});

const exactMatchDisallowedFields = [
  'id',
  'videoStreamUrl',
  'timestamp',
];

[...speakerToEvents.entries()].forEach(([speaker, speakerEvents]) => {
  exactMatchDisallowedFields.forEach((field) => {
    const fieldToEvent = new Map();
    speakerEvents.forEach((event) => {
      const fieldValue = event[field];
      if (!fieldValue) {
        return;
      }
      const existingEvent = fieldToEvent.get(fieldValue);
      if (!existingEvent) {
        fieldToEvent.set(fieldValue, event);
      } else {
        console.error('Duplicated events detected:', event.id, existingEvent.id);
        throw new Error(`duplicate event detected based on matching "${field}"`);
      }
    });
  });
});

console.log('Event de-duplication detected no errors');
