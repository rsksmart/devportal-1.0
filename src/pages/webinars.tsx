import * as React from "react"
import type {HeadFC} from "gatsby"
import {graphql, PageProps} from "gatsby";
import Header from "../components/header";
import Footer from "../components/footer";
import {useEffect} from "react";
import classnames from "classnames";
import Seo from "../components/seo";
import {Field, Form, Formik} from "formik";

interface Props {
  dataJson: {
    events: {
      _isPast: boolean
    }[]
  }
}

interface Filters {
  language: string;
  recency: string;
  audience: string;
}

const WebinarsPage = ({data}: PageProps<Props>) => {
  useEffect(() => {
    document.body.classList.add('light');
    document.body.classList.add('webinars');

    return () => {
      document.body.classList.remove('light');
      document.body.classList.remove('webinars');
    };
  }, []);

  const events = data.dataJson.events.filter((e: any) => e.status !== 'cancelled');
  const pastEvents = events.filter((e: any) => e._isPast);
  const futureEvents = events.filter((e: any) => !e._isPast);

  const initialValues: Filters = {
    language: 'all',
    recency: 'recent',
    audience: 'all'
  }

  return (
    <>
      <Header className="header--light"/>

      <section id="home" className="mb-4">
        <div className="container h-100">
          <div className="row h-100">
            <div id="home-text" className="col-lg-12 my-auto">
              <h1><span className="bold rsk_green">Webinars</span>
              </h1>
              <p className="mb-5"><span className="bold">Welcome to RSK & RIF Webinars!</span> Now you can watch and
                learn more about Blockchain! Check the latest news, information, tools, tutorials and workshops
                around <span className="bold">RSK, RIF, Blockchain, Bitcoin and the Internet of Value</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="calendar">
        <img className="circle-blue" src="/assets/webinars/img/circles/circle-blue.png"/>
        <div className="container">
          <div className="row mb-3">
            <div className="col-lg-6">
              <h2><span className="bold rsk_green">Calendar</span></h2>
            </div>
          </div>
          <div className="row">
            <div className="grid-nofilters">
              <div className="row">
                {futureEvents.map((event: any) => (
                  <div
                    key={event.id}
                    id={`event-id-${event.id}`}
                    className={classnames('col-lg-4 eventos tiempo', event.tags)}
                    data-timestamp={event.timestamp}
                  >
                    {event._permalink && (
                      <a href={event._permalink} className="event-inner">
                        <div className="image-group" style={{backgroundImage: `url(/assets${event.image})`}}>
                          <div className="event-type">{event.category}</div>
                        </div>
                        <div className="info-group">
                          <div className="title-group">
                            {event.title}
                            <br/>
                            {event.subtitle}
                          </div>
                          <div className="desc-group">
                              <span className="bold">
                                {event.locationCategory === 'online' && 'ONLINE EVENT'}
                                {event.locationCategory === 'physical' && 'IN-PERSON EVENT'}
                                {event.locationCategory === 'onlineAndPhysical' && <>ONLINE &amp; IN-PERSON EVENT</>}
                              </span>
                            <span>
                                 <i className="fa fa-language" aria-hidden="true"></i>
                                 <span className="text display-language">{event.language}</span>
                              </span>
                            <span>
                                 <i className="fa fa-calendar" aria-hidden="true"></i>
                                 <span
                                   className="text display-date">{new Date(event.timestamp).toLocaleDateString(undefined,
                                   {
                                     weekday: 'long',
                                     year: 'numeric',
                                     month: 'long',
                                     day: 'numeric',
                                   })}</span>
                              </span>
                            <span>
                                 <i className="fa fa-clock" aria-hidden="true"></i>
                                 <span className="text display-time">
                                   {new Date(event.timestamp).toLocaleTimeString(undefined,
                                     {
                                       hour: 'numeric',
                                       minute: 'numeric'
                                     })
                                   }
                                 </span>
                                 <span
                                   className="text display-tz">{new Date(event.timestamp).toTimeString().slice(9)}</span>
                              </span>
                            <span>
                                 <i className="fa fa-map-marker" aria-hidden="true"></i>
                                 <span className="text display-space">{event.location}</span>
                              </span>
                          </div>
                        </div>
                        <div className="button-group">More info +</div>
                      </a>
                    )}
                    {!event._permalink && (
                      <a
                        href={event.videoStreamUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="event-inner"
                      >
                        <div className="image-group" style={{backgroundImage: `url(/assets${event.image})`}}>
                          <div className="event-type">{event.category}</div>
                        </div>
                        <div className="info-group">
                          <div className="title-group">
                            {event.title}
                            <br/>
                            {event.subtitle}
                          </div>
                          <div className="desc-group">
                              <span className="bold">
                                {event.locationCategory === 'online' && 'ONLINE EVENT'}
                                {event.locationCategory === 'physical' && 'IN-PERSON EVENT'}
                                {event.locationCategory === 'onlineAndPhysical' && <>ONLINE &amp; IN-PERSON EVENT</>}
                              </span>
                            <span>
                                 <i className="fa fa-language" aria-hidden="true"></i>
                                 <span className="text display-language">{event.language}</span>
                              </span>
                            <span>
                                 <i className="fa fa-calendar" aria-hidden="true"></i>
                                 <span className="text display-date"></span>
                              </span>
                            <span>
                                 <i className="fa fa-clock" aria-hidden="true"></i>
                                 <span className="text display-time"></span>
                                 <span className="text display-tz"></span>
                              </span>
                            <span>
                                 <i className="fa fa-map-marker" aria-hidden="true"></i>
                                 <span className="text display-space">{event.location}</span>
                              </span>
                          </div>
                        </div>
                        <div className="button-group">More info +</div>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="add-calendar">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 my-auto text-center">
              <a
                href="/webinars/calendar.ical"
                target="_blank"
                rel="noreferrer noopener">
                <img src="/assets/webinars/img/calendar-image.png" className="calendar-image"/>
                <h4>
                  <span className="rsk_black">Add to your</span>
                  <span className="rsk_green bold">Calendar</span>
                </h4>
              </a>
            </div>
          </div>
        </div>
        <img className="circle-blue" src="/assets/webinars/img/circles/circle-blue.png"/>
      </section>

      <section id="youtube">
        <img className="circle-green" src="/assets/webinars/img/circles/circle-green.png"/>
        <img className="semi-circle-right" src="/assets/webinars/img/circles/semi-circle-right.png"/>
        <img className="semi-circle-left" src="/assets/webinars/img/circles/semi-circle-left.png"/>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 my-auto text-center">
              <a
                href="https://www.youtube.com/rsksmart"
                target="_blank"
                rel="noreferrer noopener">
                <h4>
                  <span className="rsk_black">Access all our past Webinars</span>
                  <br/>
                  <span className="rsk_black">on</span>
                  <span className="rsk_green bold">YouTube</span>
                </h4>
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="calendar-past">
        <img className="circle-blue" src="/assets/webinars/img/circles/circle-blue.png"/>
        <Formik
          initialValues={initialValues}
          onSubmit={() => {
          }}
        >
          {({values}) => (
            <Form className="container">
              <div className="row mb-3">
                <div className="col-lg-6">
                  <h2><span className="bold rsk_green">Past events</span></h2>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col">
                  <div className="filters">
                    <div className="ui-group">
                      <h3 className="title-sm">Recent</h3>
                      <Field as="select" name="recency" className="filter-select">
                        <option value="all">All</option>
                        <option value="recent">Most recent only</option>
                      </Field>
                    </div>
                    <div className="ui-group">
                      <h3 className="title-sm">Language</h3>
                      <Field as="select" name="language" className="filter-select">
                        <option value="all">All</option>
                        <option value="english">English</option>
                        <option value="spanish">Español</option>
                        <option value="portuguese">Português</option>
                      </Field>
                    </div>
                    <div className="ui-group">
                      <h3 className="title-sm">Audience</h3>
                      <Field as="select" name="audience" className="filter-select">
                        <option value="all">All</option>
                        <option value="general">General</option>
                        <option value="developers">Developers</option>
                        <option value="enterprise">Enterprise</option>
                        <option value="startups">Startups &amp; Entrepreneurs</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="grid">
                  <div className="row">
                    {pastEvents.filter((event: any) => {
                      if (values.recency === 'recent') {
                        return event.tags.includes(' recent');
                      }
                      return true;
                    }).filter((event: any) => {
                      if (values.language !== 'all') {
                        return event.tags.includes(` idioma-${values.language}`);
                      }
                      return true;
                    })
                      .filter((event: any) => {
                        if (values.audience !== 'all') {
                          return event.tags.includes(` audiencia-${values.audience}`);
                        }
                        return true;
                      })
                      .map((event: any) => (
                        <div
                          key={event.id}
                          id={`event-id-${event.id}`}
                          className={classnames('col-lg-4 eventos eventos-past tiempo', event.tags)}
                          data-timestamp={event.timestamp}
                        >
                          <div className="event-inner">
                            <div className="image-group" style={{backgroundImage: `url(/assets${event.image})`}}>
                              <div className="event-type">{event.category}</div>
                            </div>
                            <div className="info-group">
                              <div className="title-group">
                                {event.title}
                                <br/>
                                {event.subtitle}
                              </div>
                              <div className="desc-group">
                            <span className="bold">
                            </span>
                                <span>
                               <i className="fa fa-video" aria-hidden="true"></i>
                               <span className="text display-recorded-video-url">
                                 {event.recordedVideoUrl !== '' && (
                                   <a href={event.recordedVideoUrl}
                                      rel="noreferrer noopener"
                                      target="_blank">
                                     View Recording
                                   </a>
                                 )}
                                 {event.recordedVideoUrl === '' && (
                                   <span>
                                     Recording not available
                                  </span>
                                 )}
                               </span>
                            </span>
                                <span>
                               <i className="fa fa-language" aria-hidden="true"></i>
                               <span className="text display-language">{event.language}</span>
                            </span>
                                <span>
                               <i className="fa fa-calendar" aria-hidden="true"></i>
                               <span
                                 className="text display-date">{new Date(event.timestamp).toLocaleDateString(undefined,
                                 {
                                   weekday: 'long',
                                   year: 'numeric',
                                   month: 'long',
                                   day: 'numeric',
                                 })}
                               </span>
                            </span>
                                {event.resources && !!event.resources.length && (
                                  <>
                                <span>
                                  <i className="fa fa-link" aria-hidden="true"></i>
                                 <span className="text">Resources</span>
                                </span>
                                    <ul className="text display-resource">
                                      {event.resources.map((resource: any) => (
                                        <li key={resource.url}>
                                          <a href={resource.url}
                                             rel="noreferrer noopener"
                                             target="_blank">
                                            {resource.label}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </>
                                )}
                              </div>
                            </div>
                            <div
                              className="button-group"
                              data-event-id={event.id}
                            >
                              {event._permalink && (
                                <a href={event._permalink}>
                                  More info +
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      <section id="brands">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 my-auto text-center">
              <img src="/assets/webinars/img/rsk-rif-iov.png" className="img-fluid three-brands"/>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </>
  )
}

export default WebinarsPage;

export const pageQuery = graphql`
                query {
                dataJson {
                events {
                _isPast
                _permalink
                audiences
                bannerImage
                category
                description
                id
                image
                language
                lastModified
                location
                locationCategory
                presenters {
                contact
                description
                name
              }
                recordedVideoUrl
                resources {
                label
                url
              }
                rsvpEmbedUrl
                status
                tags
                timestamp
                title
                twitterSite
                type
                url
                version
                videoStreamUrl
                youtubeVideoId
              }
              }
              }
                `;

export const Head: HeadFC = () => (
  <Seo>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css" rel="stylesheet"/>
  </Seo>
);
