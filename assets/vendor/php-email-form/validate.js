/**
* PHP Email Form Validation - v3.2
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );
      var mail = "https://api.elasticemail.com/v2/email/send?apikey=E93E1187262EE419CD9DBDA4C2146D0CF400DDF2CC22C2F4F1084C81EC4FC77772DA53FEDC3BC514B9E106FF53B5A2B3&subject="+ formdata[2].value +"&from=rsathishkumar4@outlook.com&to=rsathishkumar4@gmail.com&bodyHtml=%3Chtml%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbody%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3ENAME%20:%20"+ formdata[0].value +"%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3EEMAIL:%20"+ formdata[1].value +"%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3ESUBJECT:%20"+ formdata[2].value +"%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3EMESSAGE:%20"+ formdata[3].value +"%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/body%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/html%3E";
      debugger

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error)
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        return response.text()
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
