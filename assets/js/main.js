//===== Prealoder
window.onload = function () {
  window.setTimeout(fadeout, 500);
};

function fadeout() {
  document.querySelector(".preloader").style.opacity = "0";
  document.querySelector(".preloader").style.display = "none";
}

/*=====================================
Nav bar function Sticky
======================================= */
window.onscroll = function () {
  const header_navbar = document.querySelector(".navbar-area");
  const logo = document.querySelector(".navbar-brand img");
  let sticky = header_navbar.offsetTop;

  if (window.pageYOffset > sticky) {
    header_navbar.classList.add("sticky");
    logo.src = "assets/images/logo/logo.svg";
  } else {
    header_navbar.classList.remove("sticky");
    logo.src = "assets/images/logo/white-logo.svg";
  }

  // show or hide the back-top-top button
  const backToTo = document.querySelector(".scroll-top");
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    backToTo.style.display = "flex";
  } else {
    backToTo.style.display = "none";
  }
};

// section menu active
function onScroll(event) {
  const sections = document.querySelectorAll(".page-scroll");
  let scrollPos =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;

  for (let i = 0; i < sections.length; i++) {
    let currLink = sections[i];
    let val = currLink.getAttribute("href");
    let refElement = document.querySelector(val);
    let scrollTopMinus = scrollPos + 73;
    if (
      refElement.offsetTop <= scrollTopMinus &&
      refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
    ) {
      document.querySelector(".page-scroll").classList.remove("active");
      currLink.classList.add("active");
    } else {
      currLink.classList.remove("active");
    }
  }
}

window.document.addEventListener("scroll", onScroll);

// for menu scroll
const pageLink = document.querySelectorAll(".page-scroll");
pageLink.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(elem.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      offsetTop: 1 - 60,
    });
  });
});

// WOW active
new WOW().init();

//===== mobile-menu-btn
const navbarToggler = document.querySelector(".mobile-menu-btn");
navbarToggler.addEventListener("click", function () {
  navbarToggler.classList.toggle("active");
});

//Form name validation
const formName = document.getElementById("formNome");
const spanFormNome = document.getElementById("spanFormNome");
formName.addEventListener("input", () => {
  if (formName.value.length < 3) {
    spanFormNome.style.opacity = "1";
  } else {
    spanFormNome.removeAttribute("style");
    conditionalNome = 1;
  }
});

//Form email validation
const formEmail = document.getElementById("formEmail");
const spanFormEmail = document.getElementById("spanFormEmail");
//Regex for e-mail validation
/**
    ^ indica o início da string
    [^\s@]+ -> captura um ou mais caracteres que não sejam espaço em branco ou @
    @ -> captura o caractere @
    [^\s@]+ -> captura um ou mais caracteres que não sejam espaço em branco ou @
    \. -> captura o caractere ponto (.) como um caractere literal
    [^\s@]{2,} -> captura dois ou mais caracteres que não sejam espaço em branco ou @, após o último ponto
    $ -> indica o final da string
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return regex.test(email);
}

formEmail.addEventListener("input", () => {
  const email = formEmail.value.trim();
  if (email !== "" && !validarEmail(email)) {
    spanFormEmail.style.opacity = "1";
  } else {
    spanFormEmail.removeAttribute("style");
    conditionalEmail = 1;
  }
});

//Form message validation
const formMessage = document.getElementById("formMessage");
const spanFormMessage = document.getElementById("spanFormMessage");
formMessage.addEventListener("input", () => {
  if (formMessage.value.length < 10) {
    spanFormMessage.innerText =
      "Preencha sua mensagem com pelo menos dez caracteres!";
    spanFormMessage.style.opacity = "1";
  } else {
    spanFormMessage.removeAttribute("style");
    conditionalMessage = 1;
  }
});

const subjectValue = document.querySelector("input[name=subject]");
const myForm = document.getElementById("formConnectFood");
const submitButton = document.getElementById("submitBtn");
let emptyBoolean = false;
let hiddenBoolean = false;
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  //Varibles to verify if the fields is hidden or not
  const hiddenSpanMessage = spanFormMessage.style.opacity;
  const hiddenSpanEmail = spanFormEmail.style.opacity;
  const hiddenSpanNome = spanFormNome.style.opacity;

  // Varibles to build the subject
  const data = new Date();
  const currentDate = data.toLocaleDateString();
  const currentTime = data.toLocaleTimeString();
  const lastSubject = `${currentDate} | ${currentTime}`;
  const initialSubject = formName.value;
  //Build and setting the email's subject
  subjectValue.setAttribute(
    "value",
    `Connect Food site: ${initialSubject} | ${lastSubject}`
  );

  //All field is not empty
  if (
    formEmail.value != "" &&
    formMessage.value != "" &&
    formName.value != ""
  ) {
    emptyBoolean = true;
  } else {
    emptyBoolean = false;
    spanFormMessage.innerText = "Preencha todos os campos!";
    spanFormMessage.style.opacity = "1";
    setTimeout(() => {
      spanFormMessage.style.opacity = "0";
    }, 1000);
  }

  //All error field message is hidden (opacity = 0)
  if (hiddenSpanMessage == 0 && hiddenSpanEmail == 0 && hiddenSpanNome == 0) {
    hiddenBoolean = true;
  } else {
    hiddenBoolean = false;
    spanFormMessage.innerText = "Preencha todos os campos corretamente!";
    spanFormMessage.style.opacity = "1";
    setTimeout(() => {
      spanFormMessage.style.opacity = "0";
    }, 1000);
  }

  //Formating fields after submit
  if (emptyBoolean && hiddenBoolean) {
    submitButton.innerText = "Mensagem enviada!";
    submitButton.style.width = "50%";

    myForm.submit();

    setTimeout(() => {
      formMessage.value = "";
      formName.value = "";
      formEmail.value = "";
      submitButton.removeAttribute("style");
      submitButton.innerText = "Enviar";
    }, 2000);

    hiddenBoolean = false;
    emptyBoolean = false;
  }
});

//Span field to update
const doadores = document.getElementById('doadores')
const instituicoes = document.getElementById('instituicoes')
const doacoes = document.getElementById('doacoes')

// Params for REST API
const urlParamsAPI = ['doacao', 'user']

// REST API for DDI endpoint
let prefixAPI = `https://connect-food-back.onrender.com/`;
// Function to fetch the informations from dataBase
function  fetchingDonationsAPI() {
    fetch(`${prefixAPI}${urlParamsAPI[0]}`)
        .then((response) => response.json())
        .then((data) => {
            let donations = data.length;
            
            doacoes.innerText = donations
    });
}
 fetchingDonationsAPI();

 function  fetchingUsersTypeAPI() {
  fetch(`${prefixAPI}${urlParamsAPI[1]}`)
      .then((response) => response.json())
      .then((data) => {
        let typeDonor = 0;
        let typeReceiver = 0;

        for (let index = 0; index < data.length; index++) {          
          if (data[index].type === 'DONOR') {            
            typeDonor++;
          } else if (data[index].type === 'RECEIVER') {
            typeReceiver++;
          }        
        };

        typeDonor = 0;
        typeReceiver = 0;

        doadores.innerText = typeDonor;
        instituicoes.innerText = typeReceiver;
  });
}
fetchingUsersTypeAPI();



// Requesting API for the past 5 minutes.
setInterval(fetchingDonationsAPI, 5 * 60 * 1000);
setInterval(fetchingUsersTypeAPI, 5 * 60 * 1000);
