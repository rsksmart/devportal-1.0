#!/bin/bash

COMMIT_HASH_MASTER=$( git merge-base origin/master HEAD )
git show "${COMMIT_HASH_MASTER}":Gemfile.lock > Gemfile.master.lock
diff -u Gemfile.master.lock Gemfile.lock > Gemfile.lock.diff
LOCKFILE_DIFF_SIZE=$( wc -l < Gemfile.lock.diff )
echo "COMMIT_HASH_MASTER=${COMMIT_HASH_MASTER}"
echo "LOCKFILE_DIFF_SIZE=${LOCKFILE_DIFF_SIZE}"
echo "CIRCLE_BRANCH=${CIRCLE_BRANCH}"
if [ "${CIRCLE_BRANCH#proj/}" != "${CIRCLE_BRANCH}" -o "${CIRCLE_BRANCH#dependabot/}" != "${CIRCLE_BRANCH}" -o "${LOCKFILE_DIFF_SIZE}" -eq 0 ] ; then
  rm Gemfile.master.lock Gemfile.lock.diff
  echo "Gemfile.lock OK"
else
  cat Gemfile.lock.diff
  rm Gemfile.master.lock Gemfile.lock.diff
  echo "Gemfile.lock has changed, and is not allowed except when branch name starts with proj/"
  echo "Changes to dependencies are a separate concern, and should be included in their own PR"
  exit 1
fi
