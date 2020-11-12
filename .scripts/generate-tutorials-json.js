#!/usr/bin/env node

const fs = require('fs');

const csvToJson = require('csvtojson');

const csvInputPath = './_data/rsk-tutorials.csv';
const jsonPathAll = './_data/tutorialslist.json';

generateTutorials();

async function generateTutorials() {
  const csvConverter = csvToJson({
    flatKeys: true,
    checkColumn: true,
    quote: '"',
    colParser: {
      id: stringColumnParserLower,
      timestamp: timestampColumnParser,
      status: stringColumnParserLower,
      url: stringColumnParser,
      title: stringColumnParser,
      description: stringColumnParser,
      category: stringColumnParser,
      audiences: stringColumnParser,
      duration: stringColumnParser,
      presenterName: stringColumnParser,
      presenterImage: stringColumnParser,
      tags: stringColumnParserLower,
      bannerImage: stringColumnParser,
    },
  });

  await csvConverter
    .fromFile(csvInputPath)
    .subscribe((item, itemIndex) => {
      /*
      item.audiences = (
        item.audiences || 'beginner expert'
      )
        .toLowerCase()
        .split(/\s+/);
      */
      item.tags = ((item.tags || '').split(/\s+/)).map(t => { return { name: t} });
    })
    .on('error', (error) => {
      if (error) {
        console.error(error);
      }
    })
    .then(async (list) => {
      const json = { tutorials: list};
      const jsonStr = JSON.stringify(json, undefined, 2) + '\n';
      console.log(jsonStr);
      await fs.promises.writeFile(jsonPathAll, jsonStr);
      console.log(`JSON output successfully: ${jsonPathAll}`);
      return list;
    });
}


function timestampColumnParser(item, field, line) {
  let iso8601;
  try {
    const date = new Date(item);
    iso8601 = date.toISOString();
  } catch (ex) {
    throw new Error(`Cannot process timestamp '${item}' from field '${field}' in '${JSON.stringify(line)}'`);
  }
  return iso8601;
}

const newLineRegexGlobal = /\r?\n/g;
const newLineRegex = /\r?\n/;

function stringColumnParser(item) {
  return item.replace(newLineRegexGlobal, '\n').trim();
}

function stringColumnParserLower(item) {
  return stringColumnParser(item).toLowerCase();
}