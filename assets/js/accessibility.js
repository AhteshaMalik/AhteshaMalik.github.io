jQuery(document).ready(function() {
    // accessible menu
    jQuery('.tto__menu--desktop .menu-item-has-children > a').on('keydown', function(e) {
        if(e.shiftKey && e.key == 'Tab') {
            removeMenuFocus();
        }
    });
    // tab out of menu
    jQuery(document).on('keydown', '.tto__menu--desktop .menu-item-has-children.open + .menu-item, .open-search-modal', function(e) {
        if(!e.shiftKey && e.key == 'Tab') {
            removeMenuFocus();
        }
    });
    // tab back into menu
    jQuery('.tto__menu--desktop .menu-item-has-children .menu-item:last-child > a').on('keyup', function(e) {
        if(e.shiftKey && e.key == 'Tab') {
            toggleMenuFocus(jQuery(this).closest('.menu-item-has-children').find('> a'));
        }
    });
    // tab into next menu
    jQuery('.tto__menu--desktop .menu-item-has-children .menu-item:last-child > a').on('keydown', function(e) {
        if(!e.shiftKey && e.key == 'Tab') {
            removeMenuFocus();
        }
    });
    // toggle menus
    jQuery('.tto__menu--desktop .menu-item-has-children > a').on('keyup', function(e) {
        if(!e.shiftKey && e.key == 'Tab') {
            toggleMenuFocus(jQuery(this));
        }
    });
});

function removeMenuFocus() {
    jQuery('.menu-item-has-children > a').removeClass('open');
    jQuery('.menu-item-has-children').removeClass('open');
    jQuery('.menu-item-has-children > a').closest('li').find('.sub-menu').css({'display':''});
    jQuery('.menu-item-has-children > a').closest('li').find('.sub-menu').css({'opacity':''});
    jQuery('.menu-item-has-children > a').closest('li').find('.sub-menu').css({'pointer-events':''});
}

function toggleMenuFocus(me) {
    if(me.hasClass('open')) {
        me.removeClass('open');
        me.closest('.menu-item-has-children').removeClass('open');
        me.closest('.menu-item-has-children').find('.sub-menu').css({'display':''});
        me.closest('.menu-item-has-children').find('.sub-menu').css({'opacity':''});
        me.closest('.menu-item-has-children').find('.sub-menu').css({'pointer-events':''});
    } else {
        //console.log('got here');
        me.addClass('open');
        me.closest('.menu-item-has-children').addClass('open');
        me.closest('.menu-item-has-children').find('.sub-menu').css({'display':'block'});
        me.closest('.menu-item-has-children').find('.sub-menu').css({'opacity':'100%'});
        me.closest('.menu-item-has-children').find('.sub-menu').css({'pointer-events':'all'});
    }
}