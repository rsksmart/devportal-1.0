import * as React from "react"
import { Link, HeadFC } from "gatsby"
import Seo from "../components/seo";
import Footer from "../components/footer";
import Header from "../components/header";

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main className="pt-md-21 pb-lg-21 pb-md-11 pt-16 pb-11">
        <div className="container">
          <h1 className="mb-lg-5 mb-md-7 mb-6 d-inline-flex flex-wrap align-items-start ">
            <span className="zg-text-bg bg-purple mb-2 me-2 d-none d-md-block">Page not found.</span>
            <span className="zg-text-bg bg-purple mb-2 me-2 d-md-none">Page not</span>
            <span className="zg-text-bg bg-purple mb-2 me-2 d-md-none">found.</span>
            <span className="zg-label bg-purple mb-2">404</span>
            <span className="zg-text-bg bg-green d-none d-md-block">Get back on track.</span>
            <span className="zg-text-bg bg-green mb-2 d-md-none">Get back</span>
            <span className="zg-text-bg bg-green d-md-none">on track.</span>
          </h1>
          <div className="row">
            <div className="col-12 col-md-6 offset-md-6 d-flex d-md-block flex-column align-items-stretch">
              <Link
                to='/'
                className="btn-lg btn btn-outline-white"
              >Back to Home page</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => (<Seo/>);
