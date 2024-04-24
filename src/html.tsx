import React from "react"
import PropTypes from "prop-types"

export default function HTML(props: { pageContext: { site: { siteMetadata: { siteUrl: any; }; }; }; path: any; htmlAttributes: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLHtmlElement> & React.HtmlHTMLAttributes<HTMLHtmlElement>; headComponents: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; bodyAttributes: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLBodyElement> & React.HTMLAttributes<HTMLBodyElement>; preBodyComponents: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; body: any; postBodyComponents: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) {
  const { siteUrl } = props.pageContext.site.siteMetadata; // Access siteUrl from page context

  // Construct self-referencing hreflang URL
  const selfHreflangUrl = `${siteUrl}${props.path}`;
  return (
    <html {...props.htmlAttributes} lang="en">
    <head>
      <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WTWVB2C');`}} />
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <link rel="alternate" hrefLang="en" href={selfHreflangUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      {props.headComponents}
    </head>
    <body {...props.bodyAttributes}>
    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WTWVB2C" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} />
    </noscript>
    {props.preBodyComponents}
    <div
      key={`body`}
      id="___gatsby"
      dangerouslySetInnerHTML={{ __html: props.body }}
    />
    {props.postBodyComponents}

    <script src="/assets/vendor/jquery/jquery.min.js" />
    <script src="/assets/vendor/carousel/owl.carousel.min.js" />
    <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" />
    <script src="/app.js" />

    </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
