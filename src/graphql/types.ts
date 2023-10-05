import {graphql} from "gatsby";

export interface QueryResult {
  markdownRemark: {
    frontmatter: {
      title: string;
      description: string;
      render_features?: string;
    };
    html: string;
    timeToRead: number;
    fileAbsolutePath: string;
  }
}

export interface Page {
  path: string;
  pageContext: {
    title: string;
    menu_title: string;
    menu_order: number;
    section_title: string;
    external: string;
    redirect: any;
  }
}

export const pageFragment = graphql`
  fragment PageInfo on MarkdownRemark {
    html
    frontmatter {
      title
      description
      render_features
    }
    timeToRead
    fileAbsolutePath
  }
`;
