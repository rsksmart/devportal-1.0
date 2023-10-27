import React from "react";
import SubscribeForm from "./form";
import './styles.scss';

const Subscribe = () => {
  return (
    <section className="home-subscribe pt-11">
      <div className="container">
        <div className="py-lg-7 px-lg-6 p-md-5 px-4 py-6 border border-1 rounded-5">
          <div className="row align-items-xl-center align-items-md-end">
            <div className="col-xl-6 col-lg-6 col-md-7 d-xl-flex">
              <h2 className="h3 mb-5 mb-md-6 mt-3 my-lg-0 letter-spacing-4 mt-lg-4 mt-xl-0">Receive updates</h2>
            </div>
            <div className="col-lg-6 col-md-4">
              <p className="fs-7 mb-xl-0 mb-lg-4 mb-5">Get the latest updates from the Rootstock ecosystem</p>
            </div>
            <div className="col-lg-6 offset-lg-6">
              <SubscribeForm/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Subscribe;
