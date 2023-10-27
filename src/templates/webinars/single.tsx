import {graphql, HeadFC, PageProps} from "gatsby";
import React, {useEffect} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Seo from "../../components/seo";

const SingleWebinar = ({data}: PageProps<any>) => {
  const {markdownRemark: {html, frontmatter: {event}}} = data;

  useEffect(() => {
    document.body.classList.add('light');
    document.body.classList.add('single-webinars');
    document.body.classList.add('webinars');

    return () => {
      document.body.classList.remove('light');
      document.body.classList.remove('single-webinars');
      document.body.classList.remove('webinars');
    };
  }, []);

  if (!event) return;

  return (
    <>
      <Header className="header--light"/>


      {event && (
        <section id="home">
          <div className="container-fluid h-100">
            <div className="row h-100">
              <div className="container h-100">
                <div className="row h-100">
                  <div id="home-text" className="col-lg-12 my-auto">
                    <h1 className="mb-4">
                      <span className="bold rsk_green">{event.title} - RSK + RIF Webinars</span>
                    </h1>
                    {!!event.youtubeVideoId && (
                      <>
                        <div className="video-container">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${event.youtubeVideoId}?cc_load_policy=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                          </iframe>
                        </div>
                        <p className="mb-5" dangerouslySetInnerHTML={{__html: html}}/>
                      </>
                    )}
                    {!event.youtubeVideoId && (
                      <>
                        <p className="mb-5" dangerouslySetInnerHTML={{__html: html}}/>
                        <p className="mb-5">
                          <div
                            className="image-group image-group-banner"
                            style={{backgroundImage: `url(/assets${event.image})`}}
                          >
                            <div className="event-type">{event.category}</div>
                          </div>
                        </p>
                      </>
                    )}
                    <div
                      className="tiempo mb-5"
                      data-timestamp={event.timestamp}
                    >
                      <p className="event-date">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                        <span
                          className="text display-date">{new Date(event.timestamp).toLocaleDateString(undefined,
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}</span>
                      </p>
                      <p className="event-time">
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
                      </p>
                      <p className="event-language">
                            <span>
                                <i className="fa fa-language" aria-hidden="true"></i>
                                <span className="text display-language">{event.language}</span>
                            </span>
                      </p>
                      <div className="event-presenters">
                        <i className="fa fa-chalkboard-teacher" aria-hidden="true"></i>
                        <ul>
                          {event.presenters.map((presenter: any) => (
                            <li className="presenter" key={presenter.name}>
                              <span className="presenter-name">{presenter.name}</span>
                              {presenter.description && (
                                <>
                                  ,
                                  <span className="presenter-description">{presenter.description}</span>
                                </>
                              )}
                              {presenter.contact && (
                                <>
                                  - <span className="presenter-contact">{presenter.contact}</span>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {event.resources && !!event.resources.length && (
                        <div className="event-resources">
                            <span>
                                <i className="fa fa-link" aria-hidden="true"></i>
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
                        </div>
                      )}
                      <div className="event-recording">
                        {event.isPast && (
                          <span>
                            <i className="fa fa-video" aria-hidden="true"></i>
                            <span className="text display-recorded-video-url">
                              {!!event.recordedVideoUrl && (
                                <a href={event.recordedVideoUrl}
                                   rel="noreferrer noopener"
                                   target="_blank">
                                  View Recording
                                </a>
                              )}
                              {!event.recordedVideoUrl && (
                                <span>
                                  Recording not available
                                </span>
                              )}
                            </span>
                        </span>
                        )}
                        {!event.isPast && (
                          <span>RSVP now!</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {!event && (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )}

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
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        event {
          id
          timestamp
          title
          descriptionSummary
          rsvpEmbedUrl
          category
          locationCategory
          location
          language
          audiences
          presenters {
            name
            description
            contact
          }
          videoStreamUrl
          tags
          image
          resources {
            label
            url
          }
          recordedVideoUrl
          youtubeVideoId
          isPast
        }
      }
      html
    }
  }
`;

export default SingleWebinar;

export const Head: HeadFC = () => (
  <Seo>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.css" rel="stylesheet"/>
  </Seo>
);
