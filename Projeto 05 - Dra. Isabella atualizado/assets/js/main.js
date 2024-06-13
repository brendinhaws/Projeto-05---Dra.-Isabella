/**
* Project: Dra. Isabella Ferreira
* Updated: May 29 2024 with Bootstrap v5.3.3
* Author: Grupo Alpha
*/

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {

      if (!navbarlink.hash) return;

      let section = document.querySelector(navbarlink.hash);
      if (!section) return;

      let position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 3 slides at once in desktop view
   */
  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

/**
 * Chatbot
 */

document.addEventListener('DOMContentLoaded', function() {
  const inputField = document.getElementById("message-input");
  const history = document.getElementById("history");
  let userName = "";
  let waitingForOption = false;
  let continueConversation = false;

  function sendMessage() {
    const userInput = inputField.value.trim();
    if (userInput) {
      addMessageToChat("Você", userInput);
      generateResponse(userInput);
      inputField.value = "";
    }
  }

  function addMessageToChat(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    history.appendChild(messageElement);
    history.scrollTop = history.scrollHeight;
  }

  function generateResponse(userInput) {
    let response = "Desculpe, não entendi sua pergunta. Pode reformular?";

    if (!userName) {
      userName = userInput;
      response = `Muito prazer, ${userName}! Como posso ajudá-lo(a) hoje? Aqui estão algumas opções:\n1. Informações sobre autismo\n2. Nossos serviços\n3. Marcar uma consulta\n4. Horário de funcionamento`;
      waitingForOption = true;
    } else if (waitingForOption) {
      switch (userInput) {
        case "1":
          response = "Existem outras CID’s que podem ser confundidas com o autismo, o ideal é procurar um especialista para diagnóstico preciso.";
          break;
        case "2":
          response = "Oferecemos consultoria para cuidadores e educadores, planejamento de atividades e rotinas, e orientação sobre crises comportamentais.";
          break;
        case "3":
          response = "Para marcar uma consulta, por favor entre em contato pelo e-mail info@exemplo.com ou pelo telefone (00) 0 0000-0000.";
          break;
        case "4":
          response = "Nosso horário de funcionamento é de segunda a sexta, das 09h00 às 18h00.";
          break;
        default:
          response = `Desculpe, ${userName}, não entendi sua escolha. Por favor, selecione uma opção válida:\n1. Informações sobre autismo\n2. Nossos serviços\n3. Marcar uma consulta\n4. Horário de funcionamento`;
      }
      waitingForOption = false;
      continueConversation = true; // Set continueConversation to true after providing the option
    } else if (continueConversation) {
      if (userInput.toLowerCase().includes("continuar")) {
        response = "Ótimo! Como mais posso te ajudar?";
        continueConversation = false;
      } else if (userInput.toLowerCase().includes("sair")) {
        response = "Obrigado por usar nossos serviços. Tenha um ótimo dia!";
        userName = ""; // Reset userName and other states to start a new conversation
        waitingForOption = false;
        continueConversation = false;
      } else {
        response = "Por favor, responda 'continuar' se precisar de mais ajuda ou 'sair' para finalizar.";
      }
    } else {
      const responses = {
        "olá": `Olá, ${userName}! Como posso ajudá-lo(a) hoje?`,
        "como saber se é autista": "Existem outras CID’s que podem ser confundidas com o autismo, o ideal é procurar um neuropediatra para não ter dúvidas.",
        "o autismo é uma doença": "A resposta é não. Ele não é uma doença, é transtorno. Um transtorno de base genética com influência do meio.",
        "quais são os sinais do autismo": "Dificuldades sociais e comportamentais, comportamentos interferentes e inadequados conforme a sociedade avalia.",
        "quais serviços você oferece": "Oferecemos consultoria para cuidadores e educadores, planejamento de atividades e rotinas, e orientação sobre crises, estereotipias e seletividades.",
        "como posso marcar uma consulta": "Para marcar uma consulta, por favor entre em contato pelo e-mail info@exemplo.com ou pelo telefone (00) 0 0000-0000.",
        "qual é o horário de funcionamento": "Nosso horário de funcionamento é de segunda a sexta, das 09h00 às 18h00."
      };

      for (const key in responses) {
        if (userInput.toLowerCase().includes(key)) {
          response = responses[key];
          break;
        }
      }
    }

    setTimeout(() => {
      addMessageToChat("Chatbot", response);
    }, 500);
  }

  document.getElementById("btn-submit").addEventListener("click", sendMessage);
  inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  // Iniciar conversa
  setTimeout(() => {
    addMessageToChat("Chatbot", "Olá, sou o Chatbot! Para iniciar seu atendimento, poderia me informar seu nome?");
  }, 500);
});
