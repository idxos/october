/* = = = = = = = snowman::main::concat::2015-04-29T15:33:08 = = = = = = = */
//
// scripts/help.js
//
/*jslint white:false */
/*globals document, jQuery, window,
    Help:true,
    $JssorArrowNavigator$, $JssorBulletNavigator$, $JssorCaptionSlider$,
 */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W, C, Help;

W = W || window;
C = C || W.console;
Help = {
    getParameterByName: Function,
    defaults: {},
    makeOptions: Function,
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// EXTEND jquery
jQuery.fn.randId = function () {
    this.each(function (i, e) {
        e.id = 'Random_' + (Math.random() * 1e9 | 0); // force an ID on it
    });
    return this;
};

jQuery.fn.stikit = function (x, y) {
    var me = $(this);
    var middle = Help.middleOf(me[0].offsetParent);
    var offset = Help.middleOf(me);
    var width = me.width();

    me.css({
        opacity: 0,
        width: width * 10,
    }).animate({
        left: (middle.left - offset.left) * (x || 1),
        opacity: 1,
        position: 'absolute',
        top: (middle.top - offset.top) * (y || 1),
        width: width,
    }, 999);
};

jQuery.fn.centerdot = function () {
    var me = $(this);
    var cite = $('<cite class="dot">');

    cite.insertAfter(me);
    cite.css(Help.middleOf(me));

    return this;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// Project Independant

Help.middleOf = function (ele) {
    var obj, span;

    ele = $(ele)[0];
    obj = {
        left: 0,
        top: 0,
    };

    span = ele.offsetWidth;
    obj.left = (span / 2);
    span = ele.offsetHeight;
    obj.top = (span / 2);

    return obj;
};

Help.getParameterByName = function (name) {
    var regex, results;

    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    regex = new RegExp('[+\\#]' + name + '([^+&#]*)'); // hash tokens
    results = regex.exec(W.location.hash);

    return (results === null) ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// Project Specific

Help.defaults = {
    $StartIndex: 0,
    $FillMode: 0,                                                   //  [Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
    $AutoPlay: false,                                               //  [Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
    $DragOrientation: 1,                                            //  [Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0),

    $CaptionSliderOptions: {                                        //  [Optional] Options which specifies how to animate caption
        $Class: $JssorCaptionSlider$,                               //  [Required] Class to create instance to animate caption
        $CaptionTransitions: [],                                    //  [Required] An array of caption transitions to play caption, see caption transition section at jssor slideshow transition builder
        $PlayInMode: 1,                                             //  [Optional] 0 None (no play), 1 Chain (goes after main slide), 3 Chain Flatten (goes after main slide and flatten all caption animations), default value is 1
        $PlayOutMode: 3                                             //  [Optional] 0 None (no play), 1 Chain (goes before main slide), 3 Chain Flatten (goes before main slide and flatten all caption animations), default value is 1
    },
    $BulletNavigatorOptions: {                                      //  [Optional] Options to specify and enable navigator or not
        $Class: $JssorBulletNavigator$,                             //  [Required] Class to create navigator instance
        $ChanceToShow: 0,                                           //  [Required] 0 Never, 1 Mouse Over, 2 Always
        $AutoCenter: 1,                                             //  [Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
        $Steps: 1,                                                  //  [Optional] Steps to go for each navigation request, default value is 1
        $Lanes: 1,                                                  //  [Optional] Specify lanes to arrange items, default value is 1
        $SpacingX: 8,                                               //  [Optional] Horizontal space between each item in pixel, default value is 0
        $SpacingY: 8,                                               //  [Optional] Vertical space between each item in pixel, default value is 0
        $Orientation: 1                                             //  [Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
    },
    $ArrowNavigatorOptions: {                                       //  [Optional] Options to specify and enable arrow navigator or not
        $Class: $JssorArrowNavigator$,                              //  [Requried] Class to create arrow navigator instance
        $ChanceToShow: 2,                                           //  [Required] 0 Never, 1 Mouse Over, 2 Always
        $AutoCenter: 2,                                             //  [Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
        $Steps: 1                                                   //  [Optional] Steps to go for each navigation request, default value is 1
    },
};

Help.makeOptions = function (x) {
    return jQuery.extend(Help.defaults, x || {});
};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* = = = = = = = = = = */
//
// scripts/page.js
//
/*jslint white:false */
/*globals document, jQuery, window,
    Help, Page:true,
    $JssorEasing$, $JssorSlider$,
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W, C, Page;

W = W || window;
C = C || W.console;
Page = {
    getMode: Function,
    reset: Function,
    reSource: Function,
};

Page.getMode = function () {
    return parseInt(Help.getParameterByName('m') || '-1', 10);
};

Page.reset = function (cb) {
    $('body').animate({
        'scrollTop': 0,
    }, 333);

    W.setTimeout(function () {
        if (cb) {
            cb();
        }
        W.scrollTo(0, 0);
        W.scrollTo(0, 1);
    }, 999);
};

Page.reSource = function (eles) {
    //C.debug(eles);
    $(eles).each(function (i, e) {
        var me = $(e);
        me.attr('src', me.data('src'));
    });
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* = = = = = = = = = = */
//
// scripts/slides.js
//
/*jslint white:false */
/*globals document, jQuery, window,
    Help, Page, Slide:true,
    $JssorEasing$, $JssorSlider$,
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W, C, Slides;

W = W || window;
C = C || W.console;
Slides = {
    $: '.slider',
    A: null,
    B: null,
    C: null,
    div: '.snowmen',
    preview: '#Preview',
    closePreview: Function,
    openPreview: Function,
    scramble: Function,
    makeLink: Function,
};

Slides.init = function ($) {
    var self = this, mode, preview$;

    mode = Page.getMode() > 0 ? 1 : 0;
    preview$ = $(self.preview);

    self.div = $(self.div).eq(0);

    preview$.on('mousedown', function (evt) {
        //C.debug(evt);
        if (evt.target === preview$[0]) {
            evt.stopImmediatePropagation();
            self.closePreview();
        }
    });

    self.$ = $(self.$).randId();
    self.ia = parseInt(Help.getParameterByName('a') || '0', 10);
    self.ib = parseInt(Help.getParameterByName('b') || '0', 10);
    self.ic = parseInt(Help.getParameterByName('c') || '0', 10);

    $.extend(Help.defaults, {
        $DragOrientation: mode,
    });

    self.A = new $JssorSlider$(self.$[0].id, Help.makeOptions({
        $StartIndex: self.ia,
    }));
    self.B = new $JssorSlider$(self.$[1].id, Help.makeOptions({
        $StartIndex: self.ib,
    }));
    self.C = new $JssorSlider$(self.$[2].id, Help.makeOptions({
        $StartIndex: self.ic,
    }));

    // Reference http://www.jssor.com/development/tip-make-responsive-slider.html
    //  you can remove responsive code if you don't want the slider scales while window resizes

    //  responsive code begin

   /* 
   function scaleSlider() {
        //C.debug('scale');
        var paddingWidth, minReserveWidth, parentElement, parentWidth, availableWidth, sliderWidth;

        paddingWidth = 0; //                                                    reserve blank width for margin+padding: margin+padding-left (10) + margin+padding-right (10)
        minReserveWidth = 0; //                                                 minimum width should reserve for text
        parentElement = self.B.$Elmt.parentNode;
        parentWidth = parentElement.clientWidth; //                             evaluate parent container width

        if (parentWidth) {
            availableWidth = parentWidth - paddingWidth; //                     exclude blank width
            sliderWidth = availableWidth * 1; //                                calculate slider width as 100% of available width
            sliderWidth = Math.min(sliderWidth, 600); //                        slider width is maximum 600
            sliderWidth = Math.max(sliderWidth, 600); //                        slider width is minimum 200

            if (availableWidth - sliderWidth < minReserveWidth) { //            evaluate free width for text, if the width is less than minReserveWidth then fill parent container
                sliderWidth = availableWidth; //                                set slider width to available width
                sliderWidth = Math.max(sliderWidth, 200); //                    slider width is minimum 200
            }

            self.A.$ScaleWidth(sliderWidth);
            self.B.$ScaleWidth(sliderWidth);
            self.C.$ScaleWidth(sliderWidth);
        } else {
            W.setTimeout(scaleSlider, 30);
        }
    }

    scaleSlider();

    if (!W.navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
        $(W).on('resize orientationchange', scaleSlider);
    } */
    /* responsive code end */

    function disableBtnForSecs(sel, sec) {
        var btn, url, slug = 'javascript';

        btn = $(sel);
        url = btn.attr('href');

        btn.fadeTo(sec * 99, 0.5);
        btn.attr('href', slug + ':');

        _.delay(function () {
            btn.attr('href', url);
            btn.fadeTo(sec * 9, 1);
        }, sec * 999);
    }

    self.scramble = function () {
        var i;
        Page.reset();

        function rando() {
            return (Math.random() * 9 + 1) | 0;
        }

        for (i = 0; i < rando(); i++) {
            W.setTimeout($.fn.click.bind(self.$.eq(0).find('.right')), i * 99);
        }
        for (i = 0; i < rando(); i++) {
            W.setTimeout($.fn.click.bind(self.$.eq(1).find('.left')), i * 99);
        }
        for (i = 0; i < rando(); i++) {
            W.setTimeout($.fn.click.bind(self.$.eq(2).find('.right')), i * 99);
        }
        disableBtnForSecs('.button.preview', 1);
        disableBtnForSecs('.button.scramble', 1);
    };

    function readIndexes() {
        self.ia = self.A.$CurrentIndex();
        self.ib = self.B.$CurrentIndex();
        self.ic = self.C.$CurrentIndex();
    }

    self.makeLink = function (mode, msg) {
        msg = 'share_via_' + (msg || 'load');
        var currentIndexes = []; // generate link based of current slides positions
        var href = W.location.href.replace(/\#.*/, ''); // clear query
        var stub = '';
        var toke = '+';

        readIndexes();
        currentIndexes.push('#a' + self.ia);
        currentIndexes.push('b' + self.ib);
        currentIndexes.push('c' + self.ic);
        stub = currentIndexes.join(toke);

        href += stub;
        $('#OG_url').attr('content', href);

        if (mode === false) {
            if (W.ga) W.ga('send', 'event', 'SNOWMAN', msg + stub, {
                'nonInteraction': true
            });
            C.warn('send', 'event', 'SNOWMAN', msg + stub);
            return href;
        } else if (mode === true) {
            mode = Page.getMode();
        }
        W.location.hash = stub + (mode ? toke + 'm' + mode : '');

        return href;
    };

    function makeClone() {
        var clone = $('#Clone');

        if (!clone.length) {
            clone = self.div.clone(); // duplicate snowman

            clone.attr('id', 'Clone') //
            .find('[id]').randId().end() //
            .css({ // hack to match container
                height: self.$.height(),
                width: self.$.width(),
            }).append($(' .splash').clone()) //
            ;

            clone.find('.splash') //
            .css('position', 'absolute') //
            .attr('title', 'Drag to position / Click to fade') //
            .draggable({ containment: '#Preview' }) //
            .click(function () {
                $(this).animate({
                    opacity: '-=0.2'
                });//remove();
            });
        }
        preview$.append(clone);
    }

    self.openPreview = function () {
        $('html, body').addClass('freeze');
        self.makeLink(true);

        preview$.fadeIn();
        _.delay(function () {
            makeClone();
            $('#Preview .splash').stikit(1.11, 2.3);
        }, 333);
    };

    self.closePreview = function () {
        $('html, body').removeClass('freeze');
        $('#Clone, #Preview .splash').remove();
        preview$.fadeOut();
    };
    //self.scale = scaleSlider;
};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/* = = = = = = = = = = */
//
// scripts/_main.js
//
/*jslint white:false */
/*globals document, jQuery, window,
    Help, Page, Slides
    $JssorEasing$, $JssorSlider$,
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W, C;

W = W || window;
C = C || W.console;

jQuery(function () {
    var mode = Page.getMode();

    FastClick.attach(W.document.body);
    Page.reset(function () {
        Page.reSource($('[data-src]'));
        $('.loader').fadeOut(999);
        Slides.init(W.jQuery);
        //Slides.makeLink(false); <--- needed?
    });

    /// EVENTS

    $('a.closeLink').first().click(function (e) {
        Slides.closePreview();
        e.preventDefault();
    });
    $('body').on('keydown', function (evt) {
        //C.debug('keydown', evt.keyCode);
        if (evt.keyCode === 27) {
            Slides.closePreview();
        }
    });

    /// MODES

    mode = mode > 0 ? mode : 0;
    $('body').addClass('mode' + mode);
    $('.greeting').show();

    if (mode > 0) {
        
        $('.create').show();

        switch (mode) {
            case 0:
                break;
            case 2:
                $('.charity').show();
                break;
            case 3:
                //$('body').toggleClass('wells wystar');
        }
    } else {
        $('.shared').show();
        $('.create, .arrow').remove();
    }
});
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


//# sourceMappingURL=main.js.map