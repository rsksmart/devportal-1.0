import type {GatsbyConfig} from "gatsby";

require("dotenv").config({
  path: `.env`,
});

export const repo = `https://github.com/rsksmart/devportal.git`;
const siteUrl = process.env.URL || `https://dev.rootstock.io`


const config: GatsbyConfig = {
  siteMetadata: {
    title: `Rootstock Developers Portal`,
    siteUrl,
    description: 'Rootstock is the first open source Smart Contract platform secured by the Bitcoin Network. Rootstock adds value and expand functionality to the Bitcoin ecosystem by providing smart contracts and greater scalability.'
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-transformer-json`,
    `gatsby-plugin-netlify`,
    //`gatsby-plugin-no-index`,
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://dev.rootstock.io',
        sitemap: 'https://dev.rootstock.io/sitemap.xml',
        policy: [{userAgent: '*', allow: '/', disallow: '/rif/identity'}]
      }
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://dev.rootstock.io`,
      },
    },
    {
      // gatsby-plugin-sitemap version is 3.0.0 because of https://stackoverflow.com/questions/69452298/problem-with-sitemap-generation-in-gatsby-js
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            edges {
              node {
                path
                pageContext
              }
            }
          }
        }`,
        resolveSiteUrl: () => siteUrl,
        serialize: ({ site, allSitePage }: any) =>
          allSitePage.edges.map((edge: any) => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              lastmod: (edge.node.pageContext.lastMod) ? edge.node.pageContext.lastMod.substring(0,10) : null
            }
          }),
      }
    },
    `gatsby-plugin-git-lastmod`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Rootstock Developers Portal",
        short_name: "Rootstock Devportal",
        description: 'Rootstock is the first open source Smart Contract platform secured by the Bitcoin Network. Rootstock adds value and expand functionality to the Bitcoin ecosystem by providing smart contracts and greater scalability.',
        start_url: "/",
        background_color: "#000000",
        theme_color: "#000000",
        display: "browser",
        icon: "static/favicon.png",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `home`,
        path: `${__dirname}/content/rsk-devportal/index.md`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `the-stack`,
        path: `${__dirname}/content/rsk-devportal/the-stack`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `rsk`,
        path: `${__dirname}/content/rsk-devportal/rsk`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `kb`,
        path: `${__dirname}/content/rsk-devportal/kb`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `rif`,
        path: `${__dirname}/content/rsk-devportal/rif`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `guides`,
        path: `${__dirname}/content/rsk-devportal/guides`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `courses`,
        path: `${__dirname}/content/rsk-devportal/courses`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `solutions`,
        path: `${__dirname}/content/rsk-devportal/solutions`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `develop`,
        path: `${__dirname}/content/rsk-devportal/develop`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tools`,
        path: `${__dirname}/content/rsk-devportal/tools`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `community-calls`,
        path: `${__dirname}/content/rsk-devportal/community-calls`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contribute`,
        path: `${__dirname}/content/rsk-devportal/contribute`
      },
    },
    // not used in the navigation
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `quick-start`,
        path: `${__dirname}/content/rsk-devportal/_quick-start`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `defi`,
        path: `${__dirname}/content/rsk-devportal/defi`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `ethereum-dapp-to-rsk`,
        path: `${__dirname}/content/rsk-devportal/ethereum-dapp-to-rsk`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `libraries`,
        path: `${__dirname}/content/rsk-devportal/libraries`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `newsletter`,
        path: `${__dirname}/content/rsk-devportal/newsletter`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `open-finance`,
        path: `${__dirname}/content/rsk-devportal/open-finance`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `discord`,
        path: `${__dirname}/content/rsk-devportal/discord`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `roadmap`,
        path: `${__dirname}/content/rsk-devportal/roadmap`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tutorials`,
        path: `${__dirname}/content/rsk-devportal/tutorials`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `wallet`,
        path: `${__dirname}/content/rsk-devportal/wallet`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `webinars`,
        path: `${__dirname}/content/rsk-devportal/webinars`
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `webinars-json`,
        path: `${__dirname}/content/rsk-devportal/_data/webinars.json`
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              // languageExtensions: [
              //   {
              //     language: "superscript",
              //     extend: "javascript",
              //     definition: {
              //       superscript_types: /(SuperType)/,
              //     },
              //     insertBefore: {
              //       function: {
              //         superscript_keywords: /(superif|superelse)/,
              //       },
              //     },
              //   },
              // ],
              // Customize the prompt used in shell output
              // Values below are default
              // prompt: {
              //   user: "root",
              //   host: "localhost",
              //   global: false,
              // },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              // escapeEntities: {},
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-vercel',
      options: {
        debug: false,
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'pages',
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',
        // Note: Only the flexsearch engine supports options.
        engineOptions: 'speed',
        query: `
          {
            allMarkdownRemark(filter: {frontmatter: {redirect: {eq: null}}}) {
              nodes {
                id
                frontmatter {
                  title
                }
                rawMarkdownBody
                fileAbsolutePath
              }
            }
            allFile {
              edges {
                node {
                  absolutePath
                  dir
                  name
                }
              }
            }
          }
        `,
        ref: 'id',
        index: ['title'],
        store: ['id', 'title', 'pageSlug'],
        normalizer: ({data}: any) =>
          data.allMarkdownRemark.nodes.map((node: any) => {
            const file = data.allFile.edges.find((n: any) => n.node.absolutePath === node.fileAbsolutePath);

            const {dir, name} = file.node;

            const dirStart = dir.split('content/rsk-devportal')[1];

            const pageSlug = `${dirStart.startsWith('/_') ? dirStart.substring(2) : dirStart}/${name === 'index' ? '' : `${name}/`}`;

            const slugs = pageSlug.split('/').filter(t => t);

            return {
              id: node.id,
              title: pageSlug === '/' ? 'Home' : node.frontmatter.title ? node.frontmatter.title : slugs[slugs.length - 1],
              body: node.rawMarkdownBody,
              pageSlug
            };
          }),
      },
    },
    `gatsby-plugin-sass`
  ]
};

export default config;
