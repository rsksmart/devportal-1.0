#!/usr/bin/env node

const fs = require('fs');

const webinarsJson = require('../_data/webinars.json');

function writeEventFiles() {
  return webinarsJson.events
    .filter(
      (event) => (event._permalink),
    )
    .map((event) => {
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

      const markdown = `---
layout: event_page
permalink: "${event._permalink}"
event:
  id: "${event.id}"
  timestamp: "${event.timestamp}"
  title: "${event.title}"
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
${eventResourcesYaml}
  recordedVideoUrl: "${event.recordedVideoUrl}"
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
