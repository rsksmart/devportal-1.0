import React, {useContext} from "react";
import {NavDropdown} from "react-bootstrap";
import Breadcrumbs from "../breadcrumbs";
import {PageContext} from "../../layouts/main";

interface Props {
  title: string;
  timeToRead: number;
  fileAbsolutePath: string;
}

const Meta = ({title, fileAbsolutePath, timeToRead}: Props) => {
  const edit = `https://github.com/rsksmart/devportal/edit/master/${fileAbsolutePath.split('/rsk-devportal/')[1]}`;
  
  const { href } = useContext(PageContext);

  return (
    <div className="meta d-flex justify-content-between">
      <Breadcrumbs title={title} />
      <div className="meta__actions">
        <div className="meta__action">{timeToRead}' to read</div>
        <a href={edit} target="_blank" rel="noopener noreferrer" className="meta__action">Edit</a>
        <div className="meta__action share">
          <NavDropdown title="Share" id="share-dropdown" menuVariant="dark" renderMenuOnMount={true}>
            <a className="nav-link share-twitter" data-bi-name="twitter"
               href={`https://twitter.com/intent/tweet?original_referer=${href}&amp;text=${title}&amp;tw_p=tweetbutton&amp;url=${href}`}
               target="_blank" rel="noopener noreferrer">Twitter</a>
            <a className="nav-link share-linkedin" data-bi-name="linkedin"
               href={`https://www.linkedin.com/cws/share?url=${href}`}
               target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="nav-link share-facebook" data-bi-name="facebook"
               href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}
               target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="nav-link share-email" data-bi-name="email"
               href={`mailto:?subject=${title}&amp;body=${title}%0A%0A${href}`}
               target="_blank" rel="noopener noreferrer">Email</a>
            <a
              className="nav-link share-link"
              data-bi-name="link"
              href="#"
              onClick={(event) => {
                event.preventDefault();
                navigator.clipboard.writeText(href);
              }}
            >Copy link</a>
          </NavDropdown>
        </div>
      </div>
    </div>
  );
}

export default Meta;
