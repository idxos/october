// Smarter window resize event firing
                (function($, sr) {

                    // debouncing function from John Hann
                    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
                    var debounce = function(func, threshold, execAsap) {
                        var timeout;

                        return function debounced() {
                            var obj = this, args = arguments;
                            function delayed() {
                                if (!execAsap)
                                    func.apply(obj, args);
                                timeout = null;
                            }

                            if (timeout)
                                clearTimeout(timeout);
                            else if (execAsap)
                                func.apply(obj, args);

                            timeout = setTimeout(delayed, threshold || 100);
                        };
                    }
                    // smartresize
                    jQuery.fn[sr] = function(fn) {
                        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
                    };

                })(jQuery, 'smartresize');

                // Set close gradient classes on form panels
                function updatePanelClasses() {
                    var panels = $('.panel');
                    var newIndex = $('.panel-collapse').index($('.panel-collapse.in'));

                    //drop old close-classes
                    panels.removeClass('active');
                    panels.removeClass(function(idx, css) {
                        return (css.match(/(^|\s)close-\d+/g) || []).join(' ');
                    });

                    //add active to current panel
                    panels.eq(newIndex).addClass('active');
                    // add close-# classes to control gradient fade
                    panels.each(function(panelIndex) {
                        $(this).addClass("close-" + Math.abs(panelIndex - newIndex));
                    });
                }

                // Set active indicator on progress indicator
                function updateProgressButtons() {
                    var panels = $('.panel');
                    var buttons = $(".progress-button");
                    //set answered flags on nav buttons
                    panels.each(function(idx) {
                        if ($(this).find('input:checked').length)
                        {
                            buttons.eq(idx).addClass('answered');
                        }
                        else
                        {
                            buttons.eq(idx).removeClass('answered');
                        }
                    });

                    var newIndex = $('.panel-collapse').index($('.panel-collapse.in'));
                    buttons.removeClass("active");
                    buttons.eq(newIndex).addClass("active");
                }

                function advancePanel() {
                    var current = $('.panel-collapse.in');
                    current.find('.quiz-next').trigger('click');
                }

                function retractPanel() {
                    var current = $('.panel-collapse.in');
                    current.find('.quiz-prev').trigger('click');
                }

                function focusPanel() {
                    var current = $('.panel-collapse.in h2');
                    current.attr("tabIndex", -1).focus();
console.log(current);
                }

                $(document).ready(function() {
                    var progressHeight = 20;

                    function quizInit() {
                        var panels = $('.panel');
                        var vwidth = $(window).width();
                        if (vwidth < 768) {
                            var panelheight = 5;
                            var vheight = window.innerHeight;
                        } else {
                            var panelheight = 10;
                            var vheight = $(window).height();
                        }
                        var bodyheight = vheight - (panels.length * panelheight) + panelheight;
                        var progressCenter = (panels.length) / 2 * progressHeight;

                        // Set the height of the panel to fil the screen, assuming a 10 pixel ribbon
                        $('.panel-body').height(bodyheight);

                        // Center the indicators
                        $('.progress-indicators').css("margin-top", "-" + progressCenter + "px");
                    }

                    quizInit();
                    updatePanelClasses();

                    $(window).smartresize(function() {
                        quizInit();
                    });

                    //update certain display setting whenever collapse events occur
                    $('#quiz-group').on('shown.bs.collapse', function() {
                        updateProgressButtons();
                        updatePanelClasses();
                    })

                    jQuery('#QuizWelliFa input').change(function() {
                        //advance to next Question
                        advancePanel();
                        focusPanel();

                        //Tally the points
                        var tally = {};
                        var tally_total = 0;
                        jQuery('#QuizWelliFa input:selected,#QuizWelliFa input:checked').each(function() {
                            //break up the form value into persona_weight
                            var tuples = jQuery(this).first().val().split(':');
                            var arrayLength = tuples.length;
                            for (var i = 0; i < arrayLength; i++) {
                                tuple = tuples[i].split('_');

                                var persona = tuple[0];
                                var weight = Number(tuple[1]);

                                if (weight === 0)
                                {
                                    continue;
                                }

                                //make the bucket if it's not there already
                                if (typeof tally[persona] == 'undefined')
                                {
                                    tally[persona] = 0;
                                }

                                //add the value
                                tally[persona] += weight;
                                tally_total += Math.abs(weight);
                            }
                        })

                        //figure out winner
                        var winners = [];
                        for (var persona in tally)
                            winners.push(persona);

                        winners.sort(function(a, b) {
                            return tally[b] - tally[a]
                        });

                        //set action based on winner
                        var result_page = '/quiz/' + winners[0];
                        //set kicker
                        if (typeof winners[1] !== 'undefined')
                            result_page = result_page + '?secondary=' + winners[1];
                        $('#QuizWelliFa').attr('action', result_page);

                        //keep at bottom - let exceptions get lost for Safari
                        localStorage.setItem('quiz_tally', JSON.stringify(tally));
                        localStorage.setItem('quiz_type', JSON.stringify(winners));
                    })

jQuery('.filler').click(function(){
  var target = $(this).parent().find('input');
  target.prop('checked', true);
  target.change();
});

                    var hammertime = new Hammer(document.body, {preventDefault: true});

                    hammertime.get('swipe').set({direction: Hammer.DIRECTION_VERTICAL});

                    // listen to events...
                    hammertime.on("swipeup", function(ev) {
                        advancePanel();
                    });

                    hammertime.on("swipedown", function(ev) {
                        retractPanel()
                    });
                })