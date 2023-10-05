import type {GatsbyNode} from "gatsby"
import fs from "fs";
import path from "path";
import {createFilePath} from "gatsby-source-filesystem";

interface MDFile {
  extension?: string;
  dir: string;
  name: string;
  absolutePath: string;
}

export const createPages: GatsbyNode["createPages"] = async ({graphql, actions, getNode, reporter}) => {
  const {createPage, createRedirect} = actions;

  const redirectsFile = {
    redirects: []
  };

  const files = await graphql(
    `
      {
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
    `
  );

  const slugs = await graphql(
    `{
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              title
              redirect {
                from
                to
              }
              menu_order
              menu_title
              section_title
              nodeId
            }
            fileAbsolutePath
          }
        }
      }
    }`
  );

  if (files.errors || slugs.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const docsPageTemplate = path.resolve('src/templates/docs/index.tsx');

  // @ts-ignore
  files.data.allFile.edges.forEach(({node}: { node: MDFile }) => {
    const {absolutePath, dir, name} = node;

    const dirStart = dir.split('content/rsk-devportal')[1];

    const pageSlug = `${dirStart.startsWith('/_') ? dirStart.substring(2) : dirStart }/${name === 'index' ? '' : `${name}/`}`;

    let slug = null;
    let title = null;
    let redirect: { from: string, to: string } | null = null;
    let menu_order = null;
    let menu_title = null;
    let section_title = null;
    let external = null;
    let nodeId = null;

    // @ts-ignore
    slugs.data.allMarkdownRemark.edges.forEach(({node}) => {
      if (node.fields && node.fileAbsolutePath === absolutePath) {
        slug = node.fields.slug;
        title = node.fields.title;
        redirect = node.fields.redirect;
        menu_order = node.fields.menu_order;
        menu_title = node.fields.menu_title;
        section_title = node.fields.section_title;
        external = node.fields.external;
        nodeId = node.fields.nodeId;
        if (redirect) {
          // @ts-ignore
          redirectsFile.redirects.push({
            source: redirect.from || pageSlug,
            destination: redirect.to,
            permanent: true,
          });
          // @ts-ignore
          redirectsFile.redirects.push({
            source: (redirect.from || pageSlug).slice(0, -1),
            destination: redirect.to,
            permanent: true,
          });
        }
      }
    });

    if (!slug) return;

    if (redirect) {
      // @ts-ignore
      createRedirect({ fromPath: redirect.from || pageSlug, toPath: redirect.to, isPermanent: true });
    }

    if (pageSlug.startsWith('/webinars/')) {
      createPage({
        path: pageSlug,
        component: path.resolve('src/templates/webinars/single.tsx'),
        // In your blog post template's graphql query, you can use pagePath
        // as a GraphQL variable to query for data from the markdown file.
        context: {
          slug,
          title,
          nodeId,
        },
      });
    } else {
      createPage({
        path: pageSlug,
        component: docsPageTemplate,
        // In your blog post template's graphql query, you can use pagePath
        // as a GraphQL variable to query for data from the markdown file.
        context: {
          slug,
          title,
          menu_order,
          menu_title,
          section_title,
          external,
          nodeId
        },
      });
    }
  });

  // @ts-ignore
  redirectsFile.redirects.push({
    source: '/grants/',
    destination: '/',
    permanent: true,
  });

  // @ts-ignore
  redirectsFile.redirects.push({
    source: '/grants',
    destination: '/',
    permanent: true,
  });

  // @ts-ignore
  redirectsFile.redirects.push({
    source: '/slack',
    destination: 'https://open-rsk-dev.slack.com/',
    permanent: true,
  });

  // @ts-ignore
  redirectsFile.redirects.push({
    source: '/discord',
    destination: 'https://discord.gg/fPerbqcWGE/',
    permanent: true,
  });

  fs.writeFileSync(path.join(__dirname, '/vercel.json'), JSON.stringify(redirectsFile));
}

export const onCreateNode: GatsbyNode["onCreateNode"] = ({node, getNode, actions}) => {
  const {createNodeField} = actions;

  const basePath = "/content/rsk-devportal/";

  if (node.internal.type === "MarkdownRemark") {
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: `.${basePath}`,
    });

    // @ts-ignore
    //if (relativeFilePath === '/' && !node.fileAbsolutePath.includes(`${basePath}index.md`)) return;

    // // @ts-ignore
    // const dirStart = node.fileAbsolutePath.split('content/rsk-devportal')[1];
    //
    // // @ts-ignore
    // const pageSlug = `${dirStart.startsWith('/_') ? dirStart.substring(2) : dirStart }`.split('/').slice(0, -1).join('/');
    //
    // // @ts-ignore
    // const fileName = node.fileAbsolutePath.split(pageSlug)[1];
    //
    // // @ts-ignore
    // const slug = node.frontmatter.redirect ? node.id : `${pageSlug}${fileName === '/index.md' ? '' : fileName.split('.md')[0]}/`;

    // @ts-ignore
    const slug = node.frontmatter.redirect ? node.id : relativeFilePath;

    createNodeField({
      node,
      name: "title",
      // @ts-ignore
      value: node.frontmatter.title,
    });

    createNodeField({
      node,
      name: "slug",
      // @ts-ignore
      value: slug,
    });

    createNodeField({
      node,
      name: "menu_title",
      // @ts-ignore
      value: node.frontmatter.menu_title,
    });

    createNodeField({
      node,
      name: "section_title",
      // @ts-ignore
      value: node.frontmatter.section_title,
    });

    createNodeField({
      node,
      name: "menu_order",
      // @ts-ignore
      value: node.frontmatter.menu_order,
    });

    createNodeField({
      node,
      name: "external",
      // @ts-ignore
      value: node.frontmatter.external,
    });

    createNodeField({
      node,
      name: "nodeId",
      // @ts-ignore
      value: node.id,
    });

    // @ts-ignore
    if (node.frontmatter.layout === 'redirect') {
      createNodeField({
        node,
        name: "redirect",
        value: {
          // @ts-ignore
          from: node.frontmatter.permalink,
          // @ts-ignore
          to: node.frontmatter.redirect
        },
      });
    }
  }
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({actions}) => {
  const {createTypes} = actions;

  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      description: String
      layout: String
      redirect: String
      permalink: String
      menu_order: Int
      menu_title: String
      section_title: String
      external: String
    }
  `;

  createTypes(typeDefs);
}

export const onPostBuild: GatsbyNode['onPostBuild'] = () => {
  fs.cpSync(path.join(__dirname, '/content/rsk-devportal/dist/images'), path.join(__dirname, '/public/dist/images'), {recursive: true})
  fs.cpSync(path.join(__dirname, '/content/rsk-devportal/assets'), path.join(__dirname, '/public/assets'), {recursive: true})
  fs.cpSync(path.join(__dirname, '/content/rsk-devportal/assets/img'), path.join(__dirname, '/public/assets/img'), {recursive: true})

  fs.cpSync(path.join(__dirname, '/content/rsk-devportal/grants'), path.join(__dirname, '/public/grants'), {recursive: true})

  fs.cpSync(path.join(__dirname, '/content/rsk-devportal/webinars/img'), path.join(__dirname, '/public/assets/webinars/img'), {recursive: true})

  fs.cpSync(path.join(__dirname, '/content/rsk-devportal/libraries'), path.join(__dirname, '/public/libraries'), {recursive: true})

  fs.cpSync(path.join(__dirname, '/content/rsk-devportal/rif'), path.join(__dirname, '/public/rif'), {recursive: true})
  fs.cpSync(path.join(__dirname, '/content/rsk-devportal/tutorials'), path.join(__dirname, '/public/tutorials'), {recursive: true})
  fs.cpSync(path.join(__dirname, '/content/rsk-devportal/webinars'), path.join(__dirname, '/public/webinars'), {recursive: true})
}


