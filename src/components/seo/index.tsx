import * as React from "react";
import {graphql, useStaticQuery} from "gatsby";
import {PropsWithChildren} from "react";

const Seo = ({title, description, children}: PropsWithChildren<{ title?: string, description?: string }>) => {
  const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
				}
			}
		}
	`);

  return (
    <>
      <title>
        {title || data.site.siteMetadata.title}
      </title>
      <meta name="description" content={description || data.site.siteMetadata.description} />
      <meta property="og:image" content={"/og.png"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:width" content="630" />
      {children}
    </>
  );
};

export default Seo;
