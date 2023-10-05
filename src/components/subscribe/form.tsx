import React, {useRef} from "react";
// @ts-ignore
import HubspotForm from 'react-hubspot-form';

const SubscribeForm = () => {
  const hubspotFormRef = useRef(null);

  return (
    <HubspotForm
      ref={hubspotFormRef}
      onReady={() => {
        // @ts-ignore
        hubspotFormRef.current.el.querySelector('.hs-input').placeholder = "Enter your email";
      }}
      portalId='2784460'
      formId='308d2c7c-d0f7-425f-a1ba-d704d0c19405'
      cssClass="position-relative subscribe-form"
      submitButtonClass="btn btn-white position-absolute subscribe-form__btn"
      loading={<div>Loading...</div>}
    />
  )
}

export default SubscribeForm;
