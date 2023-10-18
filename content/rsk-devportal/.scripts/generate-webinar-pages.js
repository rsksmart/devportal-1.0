#!/usr/bin/env node

const fs = require('fs');

const webinarsJson = require('../_data/webinars.json');

const MAX_DESCRIPTION_LENGTH = 140;

function writeEventFiles() {
  return webinarsJson.events
    .filter(
      (event) => (event._permalink),
    )
    .map((event) => {
      let descriptionSummary = event.description
      .replace(/[^A-Za-z0-9\,\.\-\_]/g, ' ')
      .replace(/\s+/g, ' ');
    if (descriptionSummary.length > MAX_DESCRIPTION_LENGTH) {
      descriptionSummary = descriptionSummary
        .substring(0, MAX_DESCRIPTION_LENGTH -1) + '…';
    }

      const eventPresentersYaml =
        (!Array.isArray(event.presenters) || event.presenters.length < 1) ?
          '' :
          ('  presenters:\n' +
          event.presenters
            .map((presenter) => {
              return `  - name: "${presenter.name}"
    description: "${presenter.description}"
    contact: "${presenter.contact}"`;
            })
            .join('\n'));

      const eventResourcesYaml =
        (!Array.isArray(event.resources) || event.resources.length < 1) ?
          '' :
          ('  resources:\n' +
          event.resources
          .map((resource) => {
            return `  - label: "${resource.label}"
    url: "${resource.url}"`;
          })
          .join('\n'));

      const bannerImageYaml = event.bannerImage ?
        `  bannerImage: "${event.bannerImage}"\n` :
        '';

      const twitterSiteYaml = event.twitterSite ?
        `  twitterSite: "${event.twitterSite}"\n` :
        '';

      const markdown = `---
layout: event_page
permalink: "${event._permalink}"
event:
  id: "${event.id}"
  timestamp: "${event.timestamp}"
  title: "${event.title}"
  descriptionSummary: "${descriptionSummary}"
  rsvpEmbedUrl: "${event.rsvpEmbedUrl}"
  category: "${event.category}"
  locationCategory: "${event.locationCategory}"
  location: "${event.location}"
  language: "${event.language}"
  audiences: "${event.audiences}"
${eventPresentersYaml}
  videoStreamUrl: "${event.videoStreamUrl}"
  tags: "${event.tags}"
  image: "${event.image}"
${bannerImageYaml}${twitterSiteYaml}${eventResourcesYaml}
  recordedVideoUrl: "${event.recordedVideoUrl || ''}"
  youtubeVideoId: "${event.youtubeVideoId || ''}"
  isPast: ${event._isPast}
---


${event.description}

`;
      return {
        ...event,
        markdown,
      };
    })
    .map(
      (event) => (fs.promises.writeFile(`./webinars/${event.id}.md`, event.markdown)),
    );
}

async function generatePages() {
  const eventFileWritePromises = writeEventFiles();
  await Promise.all(eventFileWritePromises);
}

generatePages();
