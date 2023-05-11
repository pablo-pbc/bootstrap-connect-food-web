(function () {
    //===== Prealoder
    window.onload = function () {
        window.setTimeout(fadeout, 500);
    }

    function fadeout() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.display = 'none';
    }

    /*=====================================
    Nav bar function Sticky
    ======================================= */
    window.onscroll = function () {
        const header_navbar = document.querySelector(".navbar-area");
        const logo = document.querySelector('.navbar-brand img')
        let sticky = header_navbar.offsetTop;        

        if (window.pageYOffset > sticky) {
          header_navbar.classList.add("sticky");
          logo.src = 'assets/images/logo/logo.svg';
        } else {
          header_navbar.classList.remove("sticky");
          logo.src = 'assets/images/logo/white-logo.svg';
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
		const sections = document.querySelectorAll('.page-scroll');
		let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (let i = 0; i < sections.length; i++) {
			let currLink = sections[i];
			let val = currLink.getAttribute('href');
			let refElement = document.querySelector(val);
			let scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

    window.document.addEventListener('scroll', onScroll);
    
    // for menu scroll 
    const pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });

    // WOW active
    new WOW().init();

    //===== mobile-menu-btn
    const navbarToggler = document.querySelector(".mobile-menu-btn");
    navbarToggler.addEventListener('click', function () {
        navbarToggler.classList.toggle("active");
    });

    //Form name validation
    const formName = document.getElementById('formNome')
    const spanFormNome = document.getElementById('spanFormNome')
    formName.addEventListener('input', () => {
        if (formName.value.length < 3) {
            spanFormNome.style.opacity = '1'
        } else {
            spanFormNome.removeAttribute('style')
        }
    })

    //Form email validation
    const formEmail = document.getElementById('formEmail');
    const spanFormEmail = document.getElementById('spanFormEmail')

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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/
        return regex.test(email)
    }      

    formEmail.addEventListener('input', () => {
        const email = formEmail.value.trim();
        if (email !== '' && !validarEmail(email)) {
            spanFormEmail.style.opacity = '1'
        } else {
            spanFormEmail.removeAttribute('style')
        }
    })

    //Form message validation
    const formMessage = document.getElementById('formMessage')
    const spanFormMessage = document.getElementById('spanFormMessage')
    formMessage.addEventListener('input', () => {
        if (formMessage.value.length < 3) {
            spanFormMessage.style.opacity = '1'
        } else {
            spanFormMessage.removeAttribute('style')
        }
    })

})();