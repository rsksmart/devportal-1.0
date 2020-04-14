#!/bin/bash

git show $( git rev-parse master ):Gemfile.lock > Gemfile.master.lock
CURRENT_LOCKFILE_HASH=$( sha256sum Gemfile.lock | cut -c "1-32" )
PREVIOUS_LOCKFILE_HASH=$( sha256sum Gemfile.master.lock | cut -c "1-32" )
if [ "${CIRCLE_BRANCH#proj/}" != "${CIRCLE_BRANCH}" -o "${CURRENT_LOCKFILE_HASH}" == "${PREVIOUS_LOCKFILE_HASH}" ] ; then
  echo "Gemfile.lock OK"
else
  echo "CURRENT_LOCKFILE_HASH=${CURRENT_LOCKFILE_HASH}"
  echo "PREVIOUS_LOCKFILE_HASH=${PREVIOUS_LOCKFILE_HASH}"
  echo "CIRCLE_BRANCH=${CIRCLE_BRANCH}"
  echo "Gemfile.lock has changed, and is not allowed except when branch name starts with proj/"
  echo "Changes to dependencies are a separate concern, and should be included in their own PR"
  exit 1
fi
