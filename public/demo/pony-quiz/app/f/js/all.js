! function(t, o) {
    var a = function(t, o, a) {
        var e;
        return function() {
            function i() {
                a || t.apply(s, n), e = null
            }
            var s = this,
                n = arguments;
            e ? clearTimeout(e) : a && t.apply(s, n), e = setTimeout(i, o || 100)
        }
    };
    jQuery.fn[o] = function(t) {
        return t ? this.bind("resize", a(t)) : this.trigger(o)
    }
}(jQuery, "smartresize"), $(document).ready(function(t) {
    function o() {
        $(window).scrollTop() >= r ? ($(".fixed-top").addClass("sticky"), $("body").hasClass("home") ? $(".hero-slider").addClass("menu-padding") : $(".site-main").addClass("menu-padding")) : ($(".fixed-top").removeClass("sticky"), $("body").hasClass("home") ? $(".hero-slider").removeClass("menu-padding") : $(".site-main").removeClass("menu-padding"))
    }

    function a() {
        var t = $(".carousel-inner").height();
        $(window).scrollTop() >= c - l ? ($(".city-stats .controls").addClass("statssticky"), $(".city-stats .controls").next(".carousel-inner").find(".container").addClass("menu-padding-stats")) : ($(".city-stats .controls").removeClass("statssticky"), $(".city-stats .controls").next(".carousel-inner").find(".container").removeClass("menu-padding-stats")), $(window).scrollTop() >= c + t - l && ($(".city-stats .controls").removeClass("statssticky"), $(".city-stats .controls").next(".carousel-inner").find(".container").removeClass("menu-padding-stats"))
    }

    function e() {
        var t = 800,
            o = $("#main").height(),
            a = $(window).height(),
            e = o - a + 80;
        $(window).scrollTop() >= t ? $("a.back-to-top").fadeIn("slow") : $("a.back-to-top").fadeOut("slow"), $(window).width() <= 991 ? $(window).scrollTop() > e + 80 ? ($("a.back-to-top").appendTo("footer.article-footer .content-share"), $("a.back-to-top").css({
            position: "absolute",
            bottom: "auto",
            right: "5px",
            top: "-10px",
            "float": "right"
        })) : $(window).scrollTop() < e + 80 && ($("a.back-to-top").prependTo("#main.site-main"), $("a.back-to-top").css({
            position: "fixed",
            bottom: "20px",
            right: "20px",
            top: "auto",
            "float": "none"
        })) : ($("footer.article-footer .content-share a.back-to-top").length && $("a.back-to-top").prependTo("#main.site-main"), $("a.back-to-top").css($(window).scrollTop() >= e ? {
            position: "absolute",
            bottom: "auto",
            top: o
        } : {
            position: "fixed",
            bottom: "20px",
            top: "auto"
        }))
    }

    function i() {
        var t = $(window).width();
        if (d === !1 && t >= 767) var o = $(".packery-grid").imagesLoaded(function() {
            o.packery({
                itemSelector: ".item",
                gutter: 15,
                percentPosition: !0
            }).addClass("packed"), d = !0
        });
        else if (d === !0 && 768 > t) {
            var o = $(".packery-grid").imagesLoaded(function() {
                o.packery("destroy").addClass("packed")
            });
            d = !1
        }
    }
    $("a").not(".ab-item").each(function() {
        this.protocol.search(/http/i) > -1 && -1 == this.host.search(/(twitter|facebook|linkedin|plus\.google|wellsfargo|cloudfront)/i) && location.host !== this.host && $(this).addClass("offsite")
    }), $("a").click(function(t) {
        if (location.protocol + location.host + location.pathname == this.protocol + this.host + this.pathname) {
            var o = $(this.hash);
            if (o.length && -1 == this.hash.search("stats_tab_")) {
                var a = 64,
                    e = $("header.navbar");
                e.length && (a = e.height()), $("html,body").animate({
                    scrollTop: o.offset().top - a
                }, 1e3), t.preventDefault()
            }
        }
    }), $("#tabSlider").on("slide.bs.carousel", function(t) {
        $("#tabSlider .controls li.active").removeClass("active"), $("#tabSlider .controls li:eq(" + $(t.relatedTarget).index() + ")").addClass("active")
    }), $(".carousel-nav-wrapper li").click(function() {
        var t = $(this).data("slide-to"),
            o = $("#tabSlider2").find(".item");
        $("#tabSlider2 .item").removeClass("active"), o.each(function() {
            var o = $(this).data("mobile-slide-to");
            o == t && $(this).addClass("active")
        })
    });
    var s = $(".fixed-top"),
        n = $(".city-stats .controls");
    if (s.length) var r = s.offset().top;
    if (n.length) var c = n.offset().top,
        l = s.height();
    $("a.back-to-top").click(function() {
        return $("body, html").animate({
            scrollTop: 0
        }, 700), !1
    }), window.onscroll = function(t) {
        a(), o(), e()
    }, window.onresize = function(t) {
        e()
    };
    var d = !1;
    i(), $(window).smartresize(function() {
        i()
    }), $("a.load-more").click(function(t) {
        t.preventDefault();
        var o = $(".packery-grid"),
            a = $("a.load-more");
        a.hide(), o.hasClass("loading") || (o.addClass("loading"), $.ajax({
            url: this.href,
            dataType: "html",
            success: function(t) {
                var t = $(t),
                    e = t.find(".packery-grid div.item");
                if (o.append(e), d) {
                    o.packery("appended", e); {
                        $(window).width()
                    }
                    o.imagesLoaded(function() {
                        o.packery()
                    })
                }
                var i = t.find("a.load-more");
                i.length && (a.attr("href", i.attr("href")), a.show()), o.removeClass("loading")
            }
        }))
    }), $(".search-btn").click(function() {
        setTimeout(function() {
            $(".search-field").focus()
        }, 200)
    });
    var p = $(window).width();
    p >= 998 && jQuery(function() {
        var t = parseInt(jQuery(".tab-stats").height());
        setTimeout(function() {
            jQuery(".tab-stats .stat").css("height", t / 2 - 5)
        }, 200)
    })
});
