import * as React from "react"
import type {HeadFC} from "gatsby"
import {graphql, PageProps} from "gatsby";
import {QueryResult} from "../graphql/types";
import MainLayout from "../layouts/main";
import BeforeContent from "../components/before-content";
import Seo from "../components/seo";

const IndexPage = ({data}: PageProps<QueryResult>) => {
  const {markdownRemark} = data;
  const {frontmatter, html} = markdownRemark;

  return (
    <MainLayout pathname={typeof location !== 'undefined' ? location.pathname : '/'} href={typeof location !== 'undefined' ? location.href : '/'}>
      <BeforeContent/>
      <h1>{frontmatter.title}</h1>
      <div className="page-content__markdown" dangerouslySetInnerHTML={{__html: html}}/>
    </MainLayout>
  )
}

export default IndexPage;

export const pageQuery = graphql`
  query {
    markdownRemark(fields: { slug: { eq: "/" } }) {
      ...PageInfo
    }
  }
`;

export const Head: HeadFC = () => (<Seo/>);
