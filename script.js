//aos
  AOS.init();
  // responsive
  $(document).ready(function(){
    var sizeWindow = $( window ).width();
   if ( sizeWindow < 700 ){
      $('.imgMethod').css('width', '100vw');
      $('.method').css('width', '100vw');
      $('#backgroundImgMethod').css('width', '100vw');
      $('#presentation').removeClass('.method');
      $('.rowSectionMethod').css('height', '200vh');
      $('.sizing').css('width','100vw');
      $('#secondImageConsulting').css('margin-left', '0px');
      $('#logo').css('margin-left', '40vw');
      $('#end').css('padding-left', '40vw');
    }else{
      $('.imgMethod').css('width', '50vw');
      $('#backgroundImgMethod').css('width', '50vw');
      $('#presentation').addClass('.method');
      $('.method').removeClass('.rowSectionMethod');
      $('.sizing').css('width','50vw');
      $('#secondImageConsulting').css('margin-left', '-15px');
      $('#logo').css('margin-left', '46.5vw');
      $('#end').css('padding-left', '46.5vw');
    }
  });
// navigation
$('.open-overlay').click(function() {
  $('.open-overlay').css('pointer-events', 'none');
  var overlay_navigation = $('.overlay-navigation'),
    top_bar = $('.bar-top'),
    middle_bar = $('.bar-middle'),
    bottom_bar = $('.bar-bottom');

  overlay_navigation.toggleClass('overlay-active');
  if (overlay_navigation.hasClass('overlay-active')) {

    top_bar.removeClass('animate-out-top-bar').addClass('animate-top-bar');
    middle_bar.removeClass('animate-out-middle-bar').addClass('animate-middle-bar');
    bottom_bar.removeClass('animate-out-bottom-bar').addClass('animate-bottom-bar');
    overlay_navigation.removeClass('overlay-slide-up').addClass('overlay-slide-down')
    overlay_navigation.velocity('transition.slideLeftIn', {
      duration: 300,
      delay: 0,
      begin: function() {
        $('nav ul li').velocity('transition.perspectiveLeftIn', {
          stagger: 150,
          delay: 0,
          complete: function() {
            $('nav ul li a').velocity({
              opacity: [1, 0],
            }, {
              delay: 10,
              duration: 140
            });
            $('.open-overlay').css('pointer-events', 'auto');
          }
        })
      }
    })

  } else {
    $('.open-overlay').css('pointer-events', 'none');
    top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
    middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
    bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
    overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
    $('nav ul li').velocity('transition.perspectiveRightOut', {
      stagger: 150,
      delay: 0,
      complete: function() {
        overlay_navigation.velocity('transition.fadeOut', {
          delay: 0,
          duration: 300,
          complete: function() {
            $('nav ul li a').velocity({
              opacity: [0, 1],
            }, {
              delay: 0,
              duration: 50
            });
            $('.open-overlay').css('pointer-events', 'auto');
          }
        });
      }
    })
  }
})
$('.link').click(function() {
  $('.open-overlay').css('pointer-events', 'none');
  var overlay_navigation = $('.overlay-navigation'),
    top_bar = $('.bar-top'),
    middle_bar = $('.bar-middle'),
    bottom_bar = $('.bar-bottom');
    $('.open-overlay').css('pointer-events', 'none');
    top_bar.removeClass('animate-top-bar').addClass('animate-out-top-bar');
    middle_bar.removeClass('animate-middle-bar').addClass('animate-out-middle-bar');
    bottom_bar.removeClass('animate-bottom-bar').addClass('animate-out-bottom-bar');
    overlay_navigation.removeClass('overlay-slide-down').addClass('overlay-slide-up')
    $('nav ul li').velocity('transition.perspectiveRightOut', {
      stagger: 150,
      delay: 0,
      complete: function() {
        overlay_navigation.velocity('transition.fadeOut', {
          delay: 0,
          duration: 300,
          complete: function() {
            $('nav ul li a').velocity({
              opacity: [0, 1],
            }, {
              delay: 0,
              duration: 50
            });
            $('.open-overlay').css('pointer-events', 'auto');
          }
        });
      }
    })
  document.addEventListener('DOMContentLoaded', function() {
  const openOverlay = document.querySelector('.open-overlay');
  const overlayNav = document.querySelector('.overlay-navigation');

  if (openOverlay && overlayNav) {
    openOverlay.addEventListener('click', function() {
      // Toggle pour les animations du burger et l'affichage du menu
      openOverlay.classList.toggle('animate-out-top-bar');
      openOverlay.classList.toggle('animate-out-bottom-bar');
      openOverlay.classList.toggle('animate-out-middle-bar');
      
      overlayNav.style.display = 'flex';
      
      // Utilisation d'un délai pour l'animation d'opacité
      setTimeout(() => {
        overlayNav.style.opacity = '1';
      }, 10);
      
    });
  }
});

// Pour la fermeture du menu si on clique sur un lien
const navLinks = document.querySelectorAll('.link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const openOverlay = document.querySelector('.open-overlay');
    const overlayNav = document.querySelector('.overlay-navigation');
    
    // Fermeture du menu et réinitialisation des classes
    openOverlay.classList.remove('animate-out-top-bar', 'animate-out-bottom-bar', 'animate-out-middle-bar');
    overlayNav.style.opacity = '0';
    
    setTimeout(() => {
      overlayNav.style.display = 'none';
    }, 500); // Doit correspondre à la transition CSS
  });
});

  });
