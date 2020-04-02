#!/usr/bin/env node

const fs = require('fs');

const csvToJson = require('csvtojson');

const jsonPath = './_data/webinars.json';

const csvConverter = csvToJson({
  flatKeys: true,
  checkColumn: true,
  colParser: {
    timestamp: timestampColumnParser,
    lastModified: timestampColumnParser,
    title: stringColumnParser,
    location: stringColumnParser,
    presenter: stringColumnParser,
    presenterDescription: stringColumnParser,
    presenterContact: stringColumnParser,
    url: stringColumnParser,
    videoStreamUrl: stringColumnParser,
  },
});

csvConverter
  .fromFile('./_data/rsk-published-events.csv')
  .subscribe((item, itemIndex) => {
    item.type = 'event/2';
    item.tags = 'online online-workshop general non-developers';
    if (!item.image) {
      // rotate between the 6 available generic images
      const imageIndex = itemIndex % 6 + 1;
      item.image = `img/events/event${imageIndex}.jpg`;
    }
  })
  .on('error', (error) => {
    if (error) {
      console.error(error);
    }
  })
  .then((list) => {
    const json = { events: list };
    const jsonStr = JSON.stringify(json, undefined, 2);
    fs.writeFile(jsonPath, jsonStr, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`JSON output successfully: ${jsonPath}`);
      }
    });
  });

function timestampColumnParser(item) {
  const date = new Date(item);
  const iso8601 = date.toISOString();
  return iso8601;
}

function stringColumnParser(item) {
  return item.replace(/\r?\n/g, '\n').trim();
}
