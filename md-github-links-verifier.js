#!/usr/bin/env node
/**
 * Run "./md-github-links-verifier.js" to scan all MD files in all
 * subdirectories, find broken GitHub links and write a report
 * to "broken-links.json"
 */
const { readdirSync, statSync, readFileSync, writeFileSync } = require('fs');
const { join, extname } = require('path');
const axios = require('axios');
const markdownLinkExtractor = require('markdown-link-extractor');

const excludes = ['node_modules'];
const brokenLinksFile = 'broken-links.json';

function getAllMdFiles(dirPath = './', arrayOfFiles = []) {
  let files = [...arrayOfFiles];
  readdirSync(dirPath).forEach((file) => {
    if (
      statSync(`${dirPath}/${file}`).isDirectory() &&
      !excludes.includes(file)
    ) {
      files = getAllMdFiles(`${dirPath}/${file}`, files);
    } else if (extname(file) === '.md') {
      files.push(join(dirPath, '/', file));
    }
  });
  return files;
}

function getGitHubLinks(dirPath = './') {
  const mdFiles = getAllMdFiles(dirPath);
  const githubLinks = [];
  mdFiles.forEach((mdFile) => {
    const md = readFileSync(mdFile, 'utf8');
    const urls = markdownLinkExtractor(md);
    urls.forEach((url) => {
      if (
        url.startsWith('https://github.com/') &&
        // unless the item is already in the array
        !githubLinks.some((item) => item.mdFile === mdFile && item.url === url)
      ) {
        githubLinks.push({ mdFile, url });
      }
    });
  });
  return githubLinks;
}

const delay = (ms = 1000) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

const deleteObject = (array = [], object = { url: '', mdFile: '' }) => {
  const index = array.findIndex(
    (element) => element.url === object.url && element.mdFile === object.mdFile,
  );
  if (index !== -1) array.splice(index, 1);
};

async function getBrokenLinksConcurrently(
  items = [],
  concurrency = 3,
  pauseTime = 10000,
) {
  const itemsCopy = [...items];
  let brokenLinks = [];
  const fetchInChunks = async () => {
    if (itemsCopy.length > 0) {
      const chunk = itemsCopy.slice(0, concurrency);
      const promises = chunk.map((item) => axios.get(item.url, { item }));
      const results = await Promise.allSettled(promises);
      let tooManyRequests = false;
      for (let result of results) {
        let item;
        if (result.status === 'rejected') {
          const errorStatus = result?.reason?.response?.status;
          if (errorStatus === 429) {
            console.log(`Too many requests. Waiting ${pauseTime} ms.`);
            tooManyRequests = true;
            break;
          } else {
            item = result.reason.config.item;
            console.log(item.url);
            console.log('Broken');
            item.status = errorStatus;
            brokenLinks.push(item);
          }
        } else {
          item = result.value.config.item;
          console.log(item.url);
          console.log('OK');
        }
        deleteObject(itemsCopy, item);
      }
      if (tooManyRequests) {
        await delay(pauseTime);
      }
      await fetchInChunks();
    }
  };
  await fetchInChunks();
  return brokenLinks;
}

async function findBrokenLinks() {
  try {
    const githubLinks = getGitHubLinks();
    console.log(githubLinks.length);
    const brokenLinks = await getBrokenLinksConcurrently(githubLinks);
    console.log(`Writing broken links to ${brokenLinksFile}`);
    writeFileSync(
      join(__dirname, brokenLinksFile),
      JSON.stringify(brokenLinks),
      'utf8',
    );
  } catch (error) {
    console.error('Error', error);
  }
}

findBrokenLinks();
