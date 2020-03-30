#!/usr/bin/env node

const fs = require('fs');

const icalGenerator = require('ical-generator');

const webinarsJson = require('../_data/webinars.json');

const events = webinarsJson.events.map(processEvent);

const icalData = {
  domain: 'developers.rsk.co/',
  prodId: '//developers.rsk.co//events-calendar//EN',
  name: 'RSK and RIF Webinars',
  timezone: 'Etc/UTC',
  scale: 'gregorian',
  ttl: 3600,
  organizer: 'RSK',
  events,
};

const ical = icalGenerator(icalData);

const icalPrefix = '---\npermalink: /webinars/calendar.ical\n---\n';
const icalSuffix = '\n';
const icalPath = './webinars/calendar.ical';

fs.writeFile(
  icalPath,
  icalPrefix + ical.toString() + icalSuffix,
  function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`iCal output successfully: ${icalPath}`);
    }
  },
);

function processEvent(event) {
  switch (event.type) {
    case 'event/1':
      return processEventV1(event);
    default:
      throw new Error(`Unsupported type: ${event.type}`);
  }
}

function processEventV1(event) {
  const {
    id,
    timestamp,
    url,
    location,
    category,
    language,
    title,
    subtitle,
    lastModified,
  } = event;
  const timestampDate = new Date(timestamp);
  const lastModifiedDate = new Date(lastModified);
  return {
    uid: id,
    start: timestampDate,
    timestamp: timestampDate,
    lastModified: lastModifiedDate,
    url,
    summary: ([title, subtitle].join(' ')),
    location,
    categories: [
      {
        name: category,
      },
    ],
    // NOTE that X-attributes are not yet able to be specified in this manner
    // REF: https://github.com/sebbo2002/ical-generator/pull/185
    x: {
      'X-LANGUAGE': language,
    },
    status: 'confirmed',
  };
}
