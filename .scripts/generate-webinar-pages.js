#!/usr/bin/env node

const fs = require('fs');

const webinarsJson = require('../_data/webinars.json');

function writeEventFiles() {
  return webinarsJson.events
    .filter(
      (event) => (
        event.description &&
        (event.rsvpEmbedUrl || event._isPast) &&
        event.status === 'confirmed'
      ),
    )
    .map((event) => {
      const eventPresentersYaml =
        (!Array.isArray(event.presenters) || event.presenters.length < 1) ?
          '' :
          ('event_presenters:\n' +
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
          ('event_resources:\n' +
          event.resources
          .map((resource) => {
            return `  - label: "${resource.label}"
    url: "${resource.url}"`;
          })
          .join('\n'));

      const markdown = `---
layout: event_page
permalink: "/webinars/${event.id}/"
event_id: "${event.id}"
event_timestamp: "${event.timestamp}"
event_title: "${event.title}"
event_description: "${event.description}"
event_rsvpEmbedUrl: "${event.rsvpEmbedUrl}"
event_category: "${event.category}"
event_locationCategory: "${event.locationCategory}"
event_location: "${event.location}"
event_language: "${event.language}"
event_audiences: "${event.audiences}"
${eventPresentersYaml}
event_videoStreamUrl: "${event.videoStreamUrl}"
event_tags: "${event.tags}"
event_image: "${event.image}"
${eventResourcesYaml}
event_recordedVideoUrl: "${event.recordedVideoUrl}"
event_isPast: ${event._isPast}
---
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
