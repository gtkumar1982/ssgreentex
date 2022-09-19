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
      
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      var mail = "https://api.elasticemail.com/v2/email/send?apikey=781C884F153D2B613FA8BF1A6C2C2F295332D01EF741BD81482FC6CD21AB6BC2EFDCE124596FD9900D88BC6B0CFE1A8F&subject="+ thisForm[0].value +" - SsGreenTex Website Inquiry&from=gtkumar1982@gmail.com&to=ssgreentex@gmail.com&msgBcc=ssgreentex@gmail.com&msgCC="+ thisForm[2].value + "&bodyHtml=%3Chtml%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cbody%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3ENAME%20:%20"+ thisForm[0].value +"%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3EMobile:%20"+ thisForm[1].value +"%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3EEMAIL:%20"+ thisForm[2].value +"%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3ESUBJECT:%20"+ thisForm[3].value +"%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3EMESSAGE:%20"+ thisForm[4].value +"%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/body%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/html%3E";
      // 9E01689184A0AA718F516CC4922A25927C9F9033EFD8686FA68DE40C97B0D9259FA4455AF6C58438ECD11FDBC9462315
      // 781C884F153D2B613FA8BF1A6C2C2F295332D01EF741BD81482FC6CD21AB6BC2EFDCE124596FD9900D88BC6B0CFE1A8F
      console.log(mail);
      php_email_form_submit(mail, thisForm);

    });
  });

  function php_email_form_submit(mail, thisForm) {
    fetch(mail, {
      method: 'GET',
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
      if (JSON.parse(data).success) {
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
    console.log("<<============= API ERROR ================>>");
    console.log(error);
    console.log("<<========================================>>");
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = "Server error please contact us directly with this link. <a style='' href='https://goo.gl/maps/AgUzyvPUvpvLtJhE8' target='_blank'> Contact us !!!</a>";
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
