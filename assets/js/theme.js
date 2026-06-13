jQuery(document).ready(function() {
    jQuery('.accordion-item').on('click', function(e) {
      if(jQuery(this).find('.accordion-heading').hasClass('open')) {
        closeAccordion(jQuery(this).find('.accordion-heading'));
      } else {
        jQuery('.accordion-heading.open').each(function() {
            closeAccordion(jQuery(this));
        })
        openAccordion(jQuery(this).find('.accordion-heading'));
      }
    });

    function openAccordion(me) {
        me.addClass('open');
        if(me.find('.accordion-arrow.rotating').length) {
          me.find('.accordion-arrow.rotating').addClass('rotate-[90deg]');
        } else if(me.find('.accordion-arrow.toggle')) {
          // me.find('.accordion-arrow.toggle .closed').addClass('hidden');
          // me.find('.accordion-arrow.toggle .open').removeClass('hidden');
          gsap.to(me.find('.accordion-arrow.toggle .closed'), { opacity: 0, rotate: -90, ease:'none', duration: 0.17 });
          gsap.fromTo(me.find('.accordion-arrow.toggle .open'), { opacity: 0, rotate: 90 }, { opacity: 1, rotate: 0, ease:'none', duration: 0.17 });
        }
        me.next('.accordion-body').slideToggle(200);
        me.next('.accordion-body').addClass('open');
    }

    function closeAccordion(me) {
        me.removeClass('open');
        me.next('.accordion-body').slideToggle(200);
        me.next('.accordion-body').removeClass('open');
        if(me.find('.accordion-arrow.rotating').length) {
          me.find('.accordion-arrow.rotating').removeClass('rotate-[90deg]');
        } else if(me.find('.accordion-arrow.toggle')) {
          // me.find('.accordion-arrow.toggle .closed').removeClass('hidden');
          // me.find('.accordion-arrow.toggle .open').addClass('hidden');
          gsap.to(me.find('.accordion-arrow.toggle .closed'), { opacity: 1, rotate: 0, ease:'none', duration: 0.17 });
          gsap.fromTo(me.find('.accordion-arrow.toggle .open'), { opacity: 1, rotate: 0 }, { opacity: 0, rotate: 90, ease:'none', duration: 0.17 });
        }
    }

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
});