#!/usr/bin/env node

const fs = require('fs');

const icalGenerator = require('ical-generator');

const webinarsJson = require('../_data/webinars.json');

const organiserEmail = 'developers@iovlabs.org';

const events = webinarsJson.events.map(processEvent);

const icalData = {
  domain: 'developers.rsk.co/',
  prodId: '//developers.rsk.co//events-calendar//EN',
  name: 'RSK and RIF Webinars',
  timezone: 'Etc/UTC',
  scale: 'gregorian',
  ttl: 3600,
  organizer: 'RSK',
  url: 'https://developers.rsk.co/webinars/calendar.ical',
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
    case 'event/2':
      return processEventV2(event);
    default:
      throw new Error(`Unsupported type: ${event.type}`);
  }
}

function processEventV2(event) {
  const processedEventV1 = processEventV1(event);

  const {
    title,
    url,
    location,
    presenter,
    presenterDescription,
    presenterContact,
    videoStreamUrl,
  } = event;

  const firstPresenter = getFirstLineOf(presenter);
  const firstPresenterDescription = getFirstLineOf(presenterDescription);
  const firstPresenterContact = getFirstLineOf(presenterContact);
  const organizer = {
    name: `${firstPresenter}, ${firstPresenterDescription}, ${firstPresenterContact}`,
    email: organiserEmail,
  };

  const descriptionItems = [
    ['', title],
    ['', location],
    ['RSVP', `${url}`],
    ['Video stream', `${videoStreamUrl}`],
  ];

  const description =
    descriptionItems.map((item) => {
      const heading = (!item[0]) ?
        '' :
        `${item[0]}: `;
      return heading + item[1];
    }).join('\n\n') + '\n';

  let htmlDescriptionBody = descriptionItems.map((item) => {
    const heading = (!item[0]) ?
      '' :
      `<b>${item[0]} &nbsp;</b>`;
    const value = anchorLinkIfUrl(item[1]);
    return `<div>${heading}<span>${value}</span></div>`;
  }).join('\n');
  const htmlDescription =
    `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2//EN">\n<HTML>\n<HEAD>\n<TITLE></TITLE>\n</HEAD>\n<BODY>${
      htmlDescriptionBody
    }\n</BODY>\n</HTML>`;

  const alarms = [
    {
      type: 'display',
      trigger: 600,
    },
  ];

  return {
    ...processedEventV1,
    organizer,
    description,
    htmlDescription,
    alarms,
  };
}

function processEventV1(event) {
  const {
    id,
    timestamp,
    url,
    location,
    locationCategory,
    category,
    language,
    title,
    subtitle,
    lastModified,
  } = event;
  const timestampDate = new Date(timestamp);
  const lastModifiedDate = new Date(lastModified);

  const renderedLocation = (locationCategory === 'online') ?
    undefined :
    location;

  return {
    uid: id,
    start: timestampDate,
    timestamp: timestampDate,
    lastModified: lastModifiedDate,
    url,
    summary: ([title, subtitle].join(' ')),
    location: renderedLocation,
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

function getFirstLineOf(multilineStr) {
  return multilineStr.split(/\s*\n+\s*/)[0];
}

function anchorLinkIfUrl(str) {
  const result = str.match(/(^https?\:\/\/)(.*)/);
  if (!result) {
    return str;
  }
  return `<a href="${str}">${result[2]}</a>`;
}
