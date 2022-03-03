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
      if (url.startsWith('https://github.com/')) {
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

async function getBrokenLinks(
  items = [], // { mdFile, url }
  pauseTime = 20000, // ms
) {
  const itemsCopy = [...items];
  const brokenLinks = [];
  let counter = 1;
  const fetchSequentially = async () => {
    if (itemsCopy.length > 0) {
      const [item] = itemsCopy.slice(0, 1);
      console.log(`${counter} of ${items.length}. Checking ${item.url} `);
      try {
        await axios.get(item.url);
        console.log('OK');
      } catch (error) {
        const errorCode = error?.response?.status;
        if (errorCode === 429) {
          console.log(`Too many requests. Waiting ${pauseTime} ms.`);
          await delay(pauseTime);
          await fetchSequentially();
        } else {
          console.log('Broken');
          item.status = errorCode;
          brokenLinks.push(item);
        }
      }
      counter += 1;
      itemsCopy.splice(0, 1);
      await fetchSequentially();
    }
  };
  await fetchSequentially();
  return brokenLinks;
}

async function findBrokenLinks() {
  try {
    const githubLinks = getGitHubLinks();
    const brokenLinks = await getBrokenLinks(githubLinks);
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
