# RSK + RIF Developer Portal

This repo contains the RSK + RIF Developer Portal: [https://developers.rsk.co](https://developers.rsk.co)

## Requirements

### Windows

To install, see the [Installation Guide](https://github.com/rsksmart/rsksmart.github.io/blob/master/WindowsInstall.md)

 &nbsp;

- ***Ruby*** version 2.6.3, including all development headers
  (ruby version can be checked by running `ruby -v`)
  - [RVM](https://rvm.io/) is recommended to install and
    switch between multiple Ruby versions.
- ***RubyGems*** (which you can check by running `gem -v`)
- ***GCC and Make*** (in case your system doesn’t have them installed,
  which you can check by running `gcc -v`,`g++ -v` and
  `make -v` in your system’s command line interface)

## Set up

Clone this repository, and run the following commands in its directory:

```shell
sudo gem install bundler
bundle update
bundle install
```

Verify your installation:

```shell
ruby -v
bundler -v
bundle exec jekyll -v
```

None of these three commands should error,
and they should all print out their version numbers.

## Usage

### Production build

```bash
rake prod
```

You will now find a site ready for production in `./_site`.

### Development mode

```bash
rake dev
```

You will now find a site located in `./_site`,
and this will be served at [`http://localhost:4000/`](http://localhost:4000/).
Each time you save a file, the site will get regenerated.

For incremental builds, run:

```bash
rake devi
```

### Test build outputs

To run tests that check whether there are any errors in the site:

```bash
rake test
```

This run tests that check whether there are any errors in the site.
Currently runs the following basic checks:

- Detect broken links
- Validate generated JSON file used by search

## Contributing

### Gemfile

The `Gemfile.lock` file in the root may change whenever you run bundler commands.
However, do not commit this unless you explicitly want to update the dependencies.

If you do wish to update the dependencies,
do so in a **separate branch** whose name starts with `proj/`.
This is to enforce separation of concerns,
e.g. a documentation PR does not contain dependency changes.

### Writing original documentation

Steps:

1. Create a markdown file in the appropriate folder.
1. Add `title`, `tags`, `description`, and `collection_order` attributes
   to the front matter as appropriate - see below for more details.
1. If the new page is within a collection, and it is named `index.md`,
   ensure that you set a `permalink` attribute in the front matter,
   with a trailing `/`.

### Replicating existing documentation

This applies for you have documentation in other git repositories
which need to be replicated here.
This is expected to be used sparingly, only for libraries with existing documentation.

Steps:

1. Create a markdown file which contains **only** front matter.
1. Edit `/.git-cached-copy.config.json` to specify the details
   of files from other git repositories that should be copied.

Tips:

- Test the build output to ensure that the following common errors are fixed
  - Hyperlinks to anchors by ID attribute are correct
  - Referenced image files are also copied

### Moving existing documentation

This applies when you have documentation already published on the devportal,
but wish to move or rename it.

1. Do **not** use `git mv` to move/ rename the file
1. Instead create a new file in the target location/ file path,
   and leave the previous one there.
1. In the new file, copy all the contents from the previous file.
1. In the previous file, delete all contents,
   and replace the front matter with redirection instructions.
   Note that both URLs should be absolute and end with `/`.
   For example:

```yaml
---
layout: redirect
permalink: /develop/apps/tools/stats/
redirect: /tools/
---
```

**Why**: This is done because when a page is published at a certain URL,
that URL may be linked to externally.
By renaming/ moving a page, the URL changes, and any external links
may get a "404 Page Not Found" error.
In this scenario, a redirect is preferred as it is
much more user friendly, and search engine friendly.

### Links

1. When adding links, prefer absolute links - e.g. links beginning with `/`,
   over relative links - e.g. links beginning with `./` or `../`
1. Run `rake test_html_proofer` to identify any broken links -
   this includes both links to other pages within devportal,
   and links to anchor references within devportal pages,
   however does not include links to external pages (not within devportal).

### Findability

When you add new documentation, you should check that a visitor
is able to find it through *both* the navigation bar,
and the search functionality.

#### Navigation menu

- Edit the navigation menu component: `/_includes/nav-page-menu.html`
- Ensure that every new page that you have added has a link in here
- If your new pages are within a collection
  - The reader may use "previous" and "next" links to go through the pages in a sequence
  - Ensure that all pages within the collection have a **unique** value for `collection_order`
    in their front matter - use positive whole numbers only
  - Ensure that the sequence is in a correct order -
    it starts from lowest `collection_order` and ends at highest `collection_order`
  - Look at `_quick-start/*.md` for a good example of this

#### Search results

- A reader may find your new pages through the search feature available at `/search/index.html`
- To maximise the quality of the search results,
  ensure that you add all of the following to the front matter for each new page
  - `title`:
    This is the title of the page which is also displayed to the reader.
    Avoid using special characters, unicode characters, or emoji,
    as readers are less likely to use these in search.
  - `tags`:
    Use this to set the categories, labels, or other keywords which
    you think a reader would search for when looking for this page.
  - `description`:
    If this is not present, it defaults to the first 200 words in the content.
    It is a good idea to set this to include any words or phrases which
    you think a reader would search for when looking for this page.

### New version

When a new version of RSKj is released:

- Update the version numbers list in the public nodes page:
  - `_rsk/public-nodes.md`
- Update the version numbers and checksums in the installation instructions pages:
  - `_rsk/node/install/java.md`
  - `_rsk/node/contribute/linux.md`
  - `_rsk/node/contribute/macos.md`
  - `_rsk/node/install/ubuntu.md`
- Update the version numbers and checksums in the reproducible builds page:
  - `_rsk/node/reproducible.md`
- Update to add/ remove/ update any RPC methods, if relevant, in the RPC page
  - `_rsk/node/architecture/json-rpc.md`

### Webinars

Run `npm install` to obtain the NodeJs dependencies required.
This is **not** necessary for the development of the main site.

1. Edit the CSV file containing all of the event data:
   `_data/rsk-published-events.csv`
1. Run the JSON and iCal generation scripts
  - `npm run generate-webinar`
  - Example output:
    ```shell
    > rsk-devportal@0.0.0 generate-webinar /home/bguiz/code/rsk/rootstock.github.io
    > npm run generate-webinar-json && npm run generate-webinar-ical

    > rsk-devportal@0.0.0 generate-webinar-json /home/bguiz/code/rsk/rootstock.github.io
    > node .scripts/generate-webinar-json.js

    JSON output successfully: ./_data/webinars.json

    > rsk-devportal@0.0.0 generate-webinar-ical /home/bguiz/code/rsk/rootstock.github.io
    > node .scripts/generate-webinar-ical.js

    iCal output successfully: ./webinars/calendar.ical

    ```
  - If the generation script crashes,
    then investigate if the cause is corrupted or unprocessable data
    - e.g. non-ISO8601 datetime values
1. Check the diffs to verify that there was no data corruption from the spreadsheet
  - `git diff ./_data/webinars.json`
  - `git diff ./webinars/calendar.ical`
  - Data corruption is usually most obvious when looking the JSON file
  - Common things to look out for:
    - When the fields in an existing event are updated,
      but `version` and `lastModified` are not
    - When `id` for a field has changed
    - Off-by-one alignment -
      when events seem to have "jumped" from one row to the next
1. Check that the webinars page looks OK in the webpage locally
  - `rake dev` (if you already don't have it running)
  - Visit `http://localhost:4000/webinars/` and verify that
    there aren't any missing events, or time zone issues.

### Issues

We encourage you to
[report issues](https://github.com/rsksmart/rsksmart.github.io/issues).
When you open an issue, you should be given the option to choose a category.
Choose the most appropriate one.

Next, the description should be automatically populated from a template.
Fill it in accordingly.
Note that **What** and **Why** sections are compulsory,
and the **Refs** section is optional.

### Pull Requests

You can also contribute to the Developer's portal by sending a
[PR](https://github.com/rsksmart/rsksmart.github.io/pulls).

When you open a pull request,
the description should be automatically populated from a template.
Fill it in accordingly.
Note that **What** and **Why** sections are compulsory,
and the **Refs** section is optional.

Please run `rake test` to test the build output of your branch prior to
creating a new pull request, or pushing more commits to an existing one.
Don't introduce any regressions!
