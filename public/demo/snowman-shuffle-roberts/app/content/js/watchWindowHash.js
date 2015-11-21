$(function() {

    //set up hash detection 
    $(window).bind('hashchange', function(e) {
        var hash = '';
        var hashlenght = 0;
        hashwith = '';
        
        if (location.hash == '') {
            location.hash = '';
            document.title = 'Snowman Scramble';
            
                showStartScreen();

        } else {
            location.hash = window.location.hash.substring(1);
            document.title = 'View my snowman';
            
                hideStartScreen();
        }

    });

    $(window).trigger('hashchange');

});