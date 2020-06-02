#!/usr/bin/env node

const fs = require('fs');

const webinarsJson = require('../_data/webinars.json');

function writeEventFiles() {
  return webinarsJson.events
    .filter(
      (event) => (
        event.description &&
        event.rsvpEmbedUrl &&
        event.status === 'confirmed'
      ),
    )
    .map((event) => {
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
event_presenter: "${event.presenter}"
event_presenterDescription: "${event.presenterDescription}"
event_presenterContact: "${event.presenterContact}"
event_videoStreamUrl: "${event.videoStreamUrl}"
event_tags: "${event.tags}"
event_image: "${event.image}"
event_resources: "${event.resources}"
event_recordedVideoUrl: "${event.recordedVideoUrl}"
event_isPast: "${event._isPast}"
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
