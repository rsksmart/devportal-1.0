## Requirements

- ***Windows computers*** Requirements and install instructions: [click here](https://github.com/rsksmart/rsksmart.github.io/blob/master/WindowsInstall.md)

 &nbsp;

- ***Ruby*** version 2.6.3, including all development headers (ruby version can be checked by running `ruby -v`)
  - [RVM](https://rvm.io/) is recommended to install and switch between multiple Ruby versions.
- ***RubyGems*** (which you can check by running `gem -v`)
- ***GCC and Make*** (in case your system doesn’t have them installed, which you can check by running `gcc -v`,`g++ -v` and `make -v` in your system’s command line interface)


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
and this will be served at [`https://localhost:4000/`](https://localhost:4000/).
Each time you save a file, the site will get regenerated.

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

### Writing original documentation

Steps:

1. Create a markdown file in the appropriate folder.

Tips:

- Add `title`, `tags`, `description`, and `collection_order` attributes
  to the front matter as appropriate - see below for more details.
- If the new page is within a collection, and it is named `index.md`,
  ensure that you set a `permalink` attribute in the front matter,
  with a trailing `/`.

### Replicating existing documentation

This applies for you have documentation in other git repositories
which need to be replicated here.
This is expected to be used sparingly, only for libraries with existing documentation.

Steps:

1. Create a markdown file which contains **only** front matter.
2. Edit `/.git-cached-copy.config.json` to specify the details of files from other git repositories should be copied.

Tips:

- Test the build output to ensure that the following common errors are fixed
  - Hyperlinks to anchors by ID attribute are correct
  - Referenced image files are also copied

### Findability

When you add new documentation, you should check that a visitor
is able to find it through *both* the navigation bar,
and the search functionality.

#### Navigation menu

- Edit the navigation menu component: `/_includes/nav-page-menu.html`
- Ensure that every new page that you have added has a link in here
- If your new pages are within a collection
 - The reader may use "previous" and "next" links to go through the pages in a sequence
  - Ensure that all pages within the collection have a **unique** value for `collection_order` in their front matter - use positive whole numbers only
  - Ensure that the sequence is in a correct order - it starts from lowest `collection_order` and ends at highest `collection_order`
  - Look at `_quick-start/*.md` for a good example of this

#### Search results

- A reader may find your new pages through the search feature available at `/search/index.html`
- To maximise the quality of the search results, ensure that you add all of the following to the front matter for each new page
  - `title`:
    This is the title of the page which is also displayed to the reader.
    Avoid using special characters, unicode characters, or emoji,
    as readers are less likely to use these in search.
  - `tags`:
    Use this to set the categories, labels, or other keywords which you think a reader would search for when looking for this page.
  - `description`:
    If this is not present, it defaults to the first 200 words in the content.
    It is a good idea to set this to include any words or phrases which you think a reader would search for when looking for this page.

### Issues

When you open an issue, you should be given the option to choose a category.
Choose the most appropriate one.

Next, the description should be automatically populated from a template.
Fill it in accordingly. Note that **What** and **Why** sections are compulsory, and the **Refs** section is optional.

### Pull Requests

When you open a pull request, the description should be automatically populated
from a template. Fill it in accordingly. Note that **What** and **Why** sections are compulsory, and the **Refs** section is optional.

Please run `rake test` to test the build output of your branch prior to
creating a new pull request, or pushing more commits to an existing one.
Don't introduce any regressions!
