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
    recordedVideoUrl: stringColumnParser,
    resources: multilineLabelledUrlColumnParser,
  },
});

csvConverter
  .fromFile('./_data/rsk-published-events.csv')
  .subscribe((item, itemIndex) => {
    item.type = 'event/2';
    item.audiences =
      (item.audiences || 'general developers enterprise startups')
      .toLowerCase()
      .split(/\s+/);
    item.tags =
      (item.tags || '') +
      ` idioma-${item.language.toLowerCase()} ` +
      item.audiences
        .map((audience) => (`audiencia-${audience}`))
        .join(' ');
    if (!item.image) {
      // rotate between the 12  available generic images
      const imageIndex = itemIndex % 12 + 1;
      item.image = `img/events/event${imageIndex}.jpg`;
    }
  })
  .on('error', (error) => {
    if (error) {
      console.error(error);
    }
  })
  .then((list) => {
    const sortedList = list
      .sort((eventA, eventB) => {
        // Order by lexical order of primary key, and a fallback on date time.
        // Fallback should, under normal circumstances, never be needed,
        // as primary key is unique, however is included in case of bad data.
        if (eventA.id < eventB.id) {
          return -1;
        } else if (eventA.id > eventB.id) {
          return 1;
        } else if (eventA.timestamp < eventB.timestamp) {
          return -1;
        } else if (eventA.timestamp > eventB.timestamp) {
          return 1;
        } else {
          return 0;
        }
      })
      .map((event) => {
        // Stabilise object key order (where implementation allows for it).
        const {
          type,
          id,
          version,
          timestamp,
          lastModified,
          status,
          url,
          title,
          category,
          locationCategory,
          location,
          language,
          audiences,
          presenter,
          presenterDescription,
          presenterContact,
          videoStreamUrl,
          tags,
          image,
          resources,
          recordedVideoUrl,
          ...rest
        } = event;
        return {
          type,
          id,
          version,
          timestamp,
          lastModified,
          status,
          url,
          title,
          category,
          locationCategory,
          location,
          language,
          audiences,
          presenter,
          presenterDescription,
          presenterContact,
          videoStreamUrl,
          tags,
          image,
          resources,
          recordedVideoUrl,
          ...rest,
        };
      });
    const json = { events: sortedList };
    const jsonStr = JSON.stringify(json, undefined, 2) + '\n';
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

const newLineRegexGlobal = /\r?\n/g;
const newLineRegex = /\r?\n/;

function stringColumnParser(item) {
  return item.replace(newLineRegexGlobal, '\n').trim();
}

const labelledUrlRegex = /([^:]+):\ (.+)/;

function multilineLabelledUrlColumnParser(item) {
  const result = [];
  if (!item) {
    return result;
  }
  const lines = item.trim().split(newLineRegex);
  if (lines.length < 1) {
    return result;
  }
  lines.forEach((line) => {
    const lineResult = line.match(labelledUrlRegex);
    if (lineResult && lineResult.length === 3) {
      result.push({
        label: lineResult[1],
        url: lineResult[2],
      });
    } else {
      console.log({
        line,
        lineResult,
      });
    }
  });
  return result;
}
