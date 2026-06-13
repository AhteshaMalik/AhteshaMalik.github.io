var $ = jQuery;

$(window).on("load", function () {

  // FacetWP Reinit SR

  document.addEventListener('facetwp-loaded', function () {
    //console.log('got here');
    window.initScrollReveal();
  });

  if(!jQuery('body').hasClass('disable-default-accordion')) {
    jQuery('.accordion-heading').on('click', function(e) {
      if(jQuery(this).hasClass('open')) {
        jQuery(this).removeClass('open');
        jQuery(this).next('.accordion-body').slideToggle();
        jQuery(this).next('.accordion-body').removeClass('open');
        if(jQuery(this).find('.accordion-arrow.rotating').length) {
          jQuery(this).find('.accordion-arrow.rotating').removeClass('rotate-[90deg]');
        } else if(jQuery(this).find('.accordion-arrow.toggle')) {
          jQuery(this).find('.accordion-arrow.toggle .closed').removeClass('hidden');
          jQuery(this).find('.accordion-arrow.toggle .open').addClass('hidden');
        }
      } else {
        jQuery(this).addClass('open');
        if(jQuery(this).find('.accordion-arrow.rotating').length) {
          jQuery(this).find('.accordion-arrow.rotating').addClass('rotate-[90deg]');
        } else if(jQuery(this).find('.accordion-arrow.toggle')) {
          jQuery(this).find('.accordion-arrow.toggle .closed').addClass('hidden');
          jQuery(this).find('.accordion-arrow.toggle .open').removeClass('hidden');
        }
        jQuery(this).next('.accordion-body').slideToggle();
        jQuery(this).next('.accordion-body').addClass('open');
      }
    });

    function openCloseAccordions(me, init = false) {
      if(init) {
        if(me.hasClass('open')) {
          me.find('.minus').removeClass('hidden');
          me.find('.plus').addClass('hidden');
    
          me.next('.accordion-content').slideToggle();
          me.next('.accordion-content').addClass('open');
        } else {
          me.find('.minus').addClass('hidden');
          me.find('.plus').removeClass('hidden');
        }
      } else {
        if(me.hasClass('open')) {
          me.removeClass('open');
          me.next('.accordion-content').slideToggle();
          me.next('.accordion-content').removeClass('open');
          me.find('.minus').addClass('hidden');
          me.find('.plus').removeClass('hidden');
        } else {
          jQuery('.accordion-main.open').find('.minus').addClass('hidden');
          jQuery('.accordion-main.open').find('.plus').removeClass('hidden');
          jQuery('.accordion-main.open').next('.accordion-content').slideToggle();
          jQuery('.accordion-main.open').next('.accordion-content').removeClass('open');
          jQuery('.accordion-main.open').removeClass('open');
          me.addClass('open');
          me.find('.minus').removeClass('hidden');
          me.find('.plus').addClass('hidden');
    
          me.next('.accordion-content').slideToggle();
          me.next('.accordion-content').addClass('open');
        }
      }
    }

    /** Top Level accordion */
    jQuery('.accordion-main').on('click', function(e) {
      openCloseAccordions(jQuery(this));
    });

    // init
    jQuery('.accordion-main').each(function() {
      openCloseAccordions(jQuery(this), true);
    });

    /** Sub accordion */
    jQuery('.sub-acc-head').on('click', function(e) {

      jQuery('.sub-acc-arrow').removeClass('rotate-[180deg]');

      if(!$(e.target).is(".tooltip-inner a")) {
        if(jQuery(this).hasClass('open')) {
          jQuery(this).removeClass('open');
          jQuery(this).next('.sub-acc-content').slideToggle();
          jQuery(this).next('.sub-acc-content').removeClass('open');
          jQuery(this).find('.sub-acc-arrow').removeClass('rotate-[180deg]');
          if(jQuery(this).next('.sub-acc-content').hasClass('select-wrap')) {
            jQuery(this).next('.sub-acc-content').find('.fs-dropdown').addClass('fs-hidden');
          }
        } else {
          jQuery('.sub-acc-head.open').find('.minus').removeClass('rotate-[180deg]');
          jQuery('.sub-acc-head.open').next('.sub-acc-content').slideToggle();
          jQuery('.sub-acc-head.open').next('.sub-acc-content').removeClass('open');
          jQuery('.sub-acc-head.open').next('.sub-acc-content').find('.fs-dropdown').addClass('fs-hidden');
          jQuery('.sub-acc-head.open').removeClass('open');
          jQuery(this).addClass('open');
          jQuery(this).find('.sub-acc-arrow').addClass('rotate-[180deg]');
          jQuery(this).next('.sub-acc-content').find('.fs-dropdown').removeClass('fs-hidden');
    
          jQuery(this).next('.sub-acc-content').slideToggle();
          jQuery(this).next('.sub-acc-content').addClass('open');
        }
      }
    });
  }

  jQuery(window).on('resize', function() {
    jQuery('.accordion-body.open').each(function() {
      jQuery(this).css('height', 'auto');
      var height = jQuery(this).height();
      jQuery(this).css('height', height + 'px');
    });
    if(jQuery(window).innerWidth() >= 1024) {
      jQuery('.accordion-body--mobile:not(.open)').each(function() {
        jQuery(this).css('height', 'auto');
        var height = jQuery(this).height();
        jQuery(this).css('height', height + 'px');
      });
    } else {
      jQuery('.accordion-content--mobile:not(.open)').each(function() {
        jQuery(this).css('height', 0);
      });
    }
  });

});

$(document).ready(function () {

  // Scroll to anchor tags (deeplinks)
  $('a').on('click', function (e) {
    if ($(e.currentTarget).attr('href').length > 1 && $(e.currentTarget).attr('href').includes('#') && (e.currentTarget.pathname.split('#')[0].replace(/\/+$/, '') == window.location.pathname.replace(/\/+$/, '') || $(e.currentTarget).attr('href').substring(0, 1) == '#')) {
      e.preventDefault();

      scrollFunction(e.currentTarget.hash, e.currentTarget);
    } else if ($(e.currentTarget).attr('href').length > 1 && $(e.currentTarget).attr('href').includes('gsap')) {
      e.preventDefault();

      var params = getParams($(e.currentTarget).attr('href'));

      innerScrollFunction(params);
    }

  });

  var sortfacet = 'post_sort';
  var sort = 'latest_posts';
 
  $(document).on('click', '.sort-radio', function() {
    var val = $(this).attr('data-value');
    FWP.facets[sortfacet] = [val];
    FWP.toggleOverlay('on');
    FWP.fetchData();
    FWP.setHash();
  });

  $(document).on('facetwp-loaded', function() {
    if ('undefined' !== typeof FWP.facets[sortfacet]) {
      $('.sort-radio').filter('[data-value="' + FWP.facets[sortfacet][0] + '"]').addClass('checked');
      sort = FWP.facets[sortfacet][0];
    }
    if ( FWP.loaded ) { // Run only after the initial page load
      $('html, body').animate({
        scrollTop: $('.facetwp-results').offset().top - 160 // Scroll to the top of the element with class "facetp-template"
      }, 500);
    }
  });

  $(document).on('facetwp-refresh', function() {
    FWP.facets[sortfacet] = [sort];
    sort = FWP.facets[sortfacet][0];
  });

});

function scrollFunction(scrollTarget,) {
  // Set the default offset and duration values
  let offset = 162;
  let duration = 0.8;

  // Get the scrollTarget element and check if it has a 'data-sr-id' attribute and the 'revealed' class
  const $scrollTarget = $(scrollTarget);
  const attr = $scrollTarget.attr('data-sr-id');
  const hasScrollReveal = typeof attr !== 'undefined' && attr !== false && !$scrollTarget.hasClass('revealed');

  // If the element has a 'data-sr-id' attribute and does not have the 'revealed' class, increase the offset
  if (hasScrollReveal) {
    offset += 70;
  }

  // If the distance between the top of the window and the top of the scrollTarget element is greater than 3000 pixels, increase the duration
  if (Math.abs($(window).scrollTop() - $scrollTarget.offset().top) > 3000) {
    duration = 2;
  }

  // Animate the window scroll to the scrollTarget element with the specified offset and duration
  gsap.to(window, {
    duration,
    scrollTo: { y: scrollTarget, offsetY: offset, autoKill: true },
    ease: Power2.easeInOut, duration:0.8
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar-nav");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav-link"); // Adjust selector as needed
  const sections = Array.from(sidebarLinks).map(link => document.querySelector(link.hash));
  
  function highlightLink() {
      
      // Calculate the vertical center of the sidebar
      const sidebarRect = sidebar.getBoundingClientRect();
      const sidebarCenter = sidebarRect.top + sidebarRect.height / 2;

      let activeLink = null;

      // Loop through each section to check if the sidebar center is within its bounds
      sections.forEach((section, index) => {
      const sectionRect = section.getBoundingClientRect();

      if (sidebarCenter >= sectionRect.top && sidebarCenter <= sectionRect.bottom) {
          activeLink = sidebarLinks[index];
      }
      });

      // Remove active class from all links, then add it to the correct one
      sidebarLinks.forEach(link => link.classList.remove("active"));
      if (activeLink) activeLink.classList.add("active");
  }

  if(sidebar) {

    // Initial highlight and listen for scroll events
    highlightLink();
    window.addEventListener("scroll", highlightLink);
    window.addEventListener("resize", highlightLink);

  }
});

jQuery(document).ready(function() {

  jQuery('.menu-item-has-children').on('click', function (e) {
    if(jQuery(window).width() < 1024) {

        // if clicked element is not an a tag in .sub-menu
        if (!(jQuery(e.target).is('a') && jQuery(e.target).closest('.sub-menu').length > 0)) {
            e.preventDefault();
            jQuery(this).find('.sub-menu').slideToggle();
        }

    }

  });

  jQuery(window).resize(function() {
      if(jQuery(window).width() >= 1024) {
          jQuery('.sub-menu').each(function() {
              jQuery(this).slideDown();
              jQuery(this).slideDown();
          });
      }
  });

  const toggleMenuBtn = document.querySelector('.toggle-mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  if(toggleMenuBtn) {
    toggleMenuBtn.addEventListener('click', () => {
        toggleMenuBtn.classList.toggle('open');

        if (navMenu.classList.contains('hidden')) {
            navMenu.classList.remove('hidden');
            navMenu.classList.add('flex')
        } else {
            navMenu.classList.add('hidden');
            navMenu.classList.remove('flex')
        }
    })
  }
  
});
