/*
 * Application
 */



$(document).ready(function(){

    // scroll-to-top
    $('body').append('<div id="toTop" class="btn btn-primary"><span class="glyphicon glyphicon-chevron-up"></span></div>');
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    $('#toTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    $(window).trigger('resize').trigger('scroll');
    
    $(document).ready(function(){
        $('#loginForm').ajaxForm({
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    alert('You are now logged in. You can add additional actions in the js script.');
                } else {
                    alert('Failed with the following errors: '+data.errors.login);
                }
            }
        });
    });

    //cart flyout, keeps the cart flyout open when you click inside it
    $(document).on('click', '.dropdown-menu', function (e) {
        e.stopPropagation(); // This replace if conditional.
    });

    //cart flyout, closes the cart flyout
    $(document).on('click', '.fa-times', function (e) {
        $(this).parents('.dropdown').removeClass('open');
    });


    $(document).on('click', '.next-div', function (e) {
        e.preventDefault();
        // var target = $(this).data('collapsenumber').attr('divNumber');

        var divNumber = $(this).closest('.collapseNumber');

        divNumber = divNumber.attr('divnumber');

        if (!divNumber) {
            divNumber = $(this).attr('divnumber');

            if (divNumber == 0) {

                $('#mobile-login')
                    .removeClass('visible-xs')
                    .css('display', 'none');

                $('html,body').animate({scrollTop: $('#collapse1').offset().top}, 'slow');

            } else {

                divNumber++;

                $('#collapse' + divNumber).collapse('hide');
            }

        } else {
            var divNumberId = '#collapse' + divNumber;


            $(divNumberId).addClass('collapse');


            $.when($(divNumberId).collapse('hide')).then($('html,body').animate({scrollTop: $('#collapse' + divNumber).offset().top}, 'slow'));

            divNumber++;


            var differentShipping = $('#different-shipping').prop('checked');

            if (differentShipping == false && divNumber < 3)
            {
                divNumber++;
            }

            $('#collapse' + divNumber).collapse('show');
        }


    });



    (function() {
        [].slice.call( document.querySelectorAll( '.checkout' ) ).forEach( function( el ) {
            var openCtrl = el.querySelector( '.checkout__button' ),
                closeCtrls = el.querySelectorAll( '.checkout__cancel' );

            openCtrl.addEventListener( 'click', function(ev) {
                ev.preventDefault();
                classie.add( el, 'checkout--active' );
            } );

            [].slice.call( closeCtrls ).forEach( function( ctrl ) {
                ctrl.addEventListener( 'click', function() {
                    classie.remove( el, 'checkout--active' );
                } );
            } );
        } );
    })();




});
