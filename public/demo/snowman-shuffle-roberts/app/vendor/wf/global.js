var WF = {};

$.each("address|article|aside|audio|canvas|command|datalist|details|dialog|figure|figcaption|footer|header|hgroup|keygen|mark|meter|menu|nav|progress|ruby|section|time".split("|"), function (idx, val) {
    document.createElement(val);
});
$("html").removeClass("no-js");
if ($("html").attr("class") == "") {
    $("html").removeAttr("class");
}
WF.Browser = {};

WF.Component = {};

WF.Strings = {
    "Components": {
        "SocialShare": {
            "Share": {
                "en": "Share",
                "es": "Comparta"
            },
            "Disclosure": { // drt
                "en": '<span class="hide" tabindex="0">Begin popup</span><h2>Share this page</h2>' //
                + '<ul><li><a href="#facebook" class="c52fb">Facebook</a></li>' //
                + '<li><a href="#twitter" class="c52twitter">Twitter</a></li>' //
                + '<li><a href="#linkedin" class="c52linkedin">LinkedIn</a></li>' //
                + '<li><a href="#googleplus" class="c52googleplus">Google+</a></li>' //
                + '<li><a href="#email" class="c52email">Email</a></li></ul>' //
                + "<p>Choose a link above.  We provide these links to external websites for your convenience. " //
                + 'Wells Fargo does not endorse and is not responsible for their content, links, privacy policies, or security policies.</p><span class="hide">End popup</span>',
                "es": '<span class="hide" tabindex="0" lang="en">Begin popup</span><h2>Comparta esta p&aacute;gina</h2>' //
                + '<ul><li><a href="#facebook" class="c52fb">Facebook</a></li>' //
                + '<li><a href="#twitter" class="c52twitter">Twitter</a></li>' //
                + '<li><a href="#linkedin" class="c52linkedin">LinkedIn</a></li>' //
                + '<li><a href="#googleplus" class="c52googleplus">Google+</a></li></ul>' //
                + "<p>Seleccione uno de los enlaces electr&oacute;nicos arriba. Para su conveniencia, le proporcionamos estos enlaces electr&oacute;nicos a sitios de Internet externos." //
                + "Wells Fargo no avala ni se hace responsable por el contenido, los enlaces electr&oacute;nicos, las pol&iacute;ticas de privacidad o las pol&iacute;ticas de seguridad de esos " //
                + 'sitios de Internet.</p><span class="hide" lang="en">End popup</span>'
            },
            "EmailInsert": { // drt
                "en": "",
            }
        }
    },
};
(function ($) {
    $.fn.touchwipe = function (settings) {
        var config = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function (e) {},
            wipeRight: function (e) {},
            wipeUp: function (e) {},
            wipeDown: function (e) {},
            preventDefaultEvents: false
        };

        if (settings) {
            $.extend(config, settings);
        }
        this.each(function () {
            var startX;
            var startY;
            var isMoving = false;

            function cancelTouch() {
                this.removeEventListener("touchmove", onTouchMove);
                startX = null;
                isMoving = false;
            }

            function onTouchMove(e) {
                if (config.preventDefaultEvents) {
                    e.preventDefault();
                }
                if (isMoving) {
                    var x = e.touches[0].pageX;
                    var y = e.touches[0].pageY;
                    var dx = startX - x;
                    var dy = startY - y;
                    if (Math.abs(dx) >= config.min_move_x) {
                        cancelTouch();
                        if (dx > 0) {
                            config.wipeLeft(e);
                        } else {
                            config.wipeRight(e);
                        }
                    } else {
                        if (Math.abs(dy) >= config.min_move_y) {
                            cancelTouch();
                            if (dy > 0) {
                                config.wipeUp(e);
                            } else {
                                config.wipeDown(e);
                            }
                        }
                    }
                }
            }

            function onTouchStart(e) {
                if (e.touches.length == 1) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    isMoving = true;
                    this.addEventListener("touchmove", onTouchMove, false);
                }
            }
            if ("ontouchstart" in document.documentElement) {
                this.addEventListener("touchstart", onTouchStart, false);
            }
        });
        return this;
    };

})(jQuery);
WF.Utils = {
    addUrlParam: function (baseUrl, name, val) {
        var add = name +"=" + val;
        if (baseUrl.indexOf("#") == - 1) {
            if (baseUrl.indexOf("?") == - 1) {
                return baseUrl + "?" + add;
            } else {
                return baseUrl + "&" + add;
            }
        } else {
            if (baseUrl.indexOf("?") == - 1) {
                return baseUrl.replace("#", "?" + add + "#");
            } else {
                return baseUrl.replace("#", "&" + add + "#");
            }
        }
    },
    ajaxLog: function (err) {
        var url = "/as/common/jslog";
        if (location.href.search("isg-neo") != - 1) {
            url = "jslog.php";
        }
        var query = {
            "errorString": err.message,
            "pageUrl": window.location.href
        };

        if (err.fileName) {
            query.jsFileUrl = err.fileName;
        } else {
            if (err.sourceURL) {
                query.jsFileUrl = err.sourceURL;
            }
        }
        if (err.stack) {
            var stack = WF.Utils.parseErrorStack(err.stack);
            if (stack[0]) {
                if (stack[0].name) {
                    query.errorFunctionName = stack[0].name;
                }
                if (stack[0].line) {
                    query.errorLineNumber = stack[0].line;
                }
                if (!query.jsFileUrl) {
                    query.jsFileUrl = stack[0].url;
                }
                if (stack[0].args) {
                    query.additionalInfo = "arguments: " + stack[0].args;
                }
            }
            if (stack[1] && stack[1].name) {
                query.callingFunctionName = stack[1].name;
            }
        } else {
            query.errorFunctionName = WF.Utils.getNameFromCallee(arguments.callee.caller);
            query.callingFunctionName = WF.Utils.getNameFromCallee(arguments.callee.caller.caller);
        }
        if (err.line) {
            query.errorLineNumber = err.line;
        }
        $.get(url, query);
    },
    childWindow: function (theLink) {
        var options = {};

        var defaults = {
            "directories": "no",
            "location": "no",
            "menubar": "no",
            "resizable": "yes",
            "scrollbars": "yes",
            "status": "no",
            "titlebar": "yes",
            "toolbar": "no"
        };

        var largeDefaults = {
            "directories": "yes",
            "location": "yes",
            "menubar": "yes",
            "resizable": "yes",
            "scrollbars": "yes",
            "status": "yes",
            "titlebar": "yes",
            "toolbar": "yes"
        };

        var smallSize = {
            "width": 200,
            "height": 300
        };

        var mediumSize = {
            "width": 350,
            "height": 500
        };

        var largeSize = {
            "width": 400,
            "height": 700
        };

        var pdfSize = {
            "width": 860,
            "height": 700
        };

        var linkOptions;
        if ((typeof theLink !== "undefined") && (theLink.tagName === "A")) {
            linkOptions = $(theLink).attr("data-win-options");
            switch (linkOptions) {
                case "small":
                    $.extend(options, defaults, smallSize);
                    break;
                case "large":
                    $.extend(options, largeDefaults, largeSize);
                    break;
                case "medium":
                case "":
                    $.extend(options, defaults, mediumSize);
                    break;
                case "pdf":
                    $.extend(options, largeDefaults, pdfSize);
                    break;
                default:
                    var customOptions = {};

                    try {
                        customOptions = $.parseJSON(linkOptions);
                    } catch (e) {
                        customOptions = mediumSize;
                        throw new Error("There was an error parsing the window options. Error reported: " + e.message);
                    }
                    $.extend(options, defaults, customOptions);
                    break;
            }
            var win = window.open(theLink.href, "child", WF.Utils.objectToString(options));
            if (!win) {
                var lang = WF.Page.lang || "en";
                window.alert(WF.Strings.Shared.popupBlocker[lang]);
            }
            return win;
        } else {
            throw new Error("WF.Utils.childWindow() requires a reference to a link.");
        }
        return null;
    },
    generateUniqueId: function (elem) {
        var id = "";
        while (elem.tagName != "BODY") {
            id = ($(elem).prevAll().length + 1) + "_" + id;
            if (!elem.parentNode) {
                var arr = "0123456789abcdef".split("");
                for (var i = 0; i < 16; i++) {
                    id += arr[Math.floor(Math.random() * arr.length)];
                }
                break;
            }
            elem = elem.parentNode;
        }
        return "NID" + id.substr(0, id.length - 1);
    },
    getBrowserSupport: function () {
        ret = {};

        var input = $('<input id="WFtemp" />').get(0);
        ret.placeholder = ("placeholder" in input);
        $("#WFtemp").remove();
        ret.tel = false;
        var userAgent = navigator.userAgent;
        var mobileStrings = ["iPhone", "Android", "BlackBerry", "Mobile"];
        $.each(mobileStrings, function (idx, val) {
            if (new RegExp(val, "i").test(userAgent)) {
                ret.tel = true;
                return true;
            }
        });
        ret.touch = !! ("ontouchstart" in window);
        ret.IE7mode = false;
        if ($("html").hasClass("ie7")) {
            ret.IE7mode = true;
        }
        if (document.documentMode != undefined && document.documentMode < 8) {
            ret.IE7mode = true;
        }
        ret.isIE = (userAgent.indexOf("MSIE") != - 1);
        return ret;
    },
    getClist: function (elem) {
        if (elem.tagName.toUpperCase() == "BODY") {
            return "";
        }
        var clist = $(elem).data("cid") + "~" + $(elem).data("ctid");
        if (clist.search("undef") != - 1) {
            return WF.Utils.getClist(elem.parentNode);
        }
        return clist;
    },
    getDimensions: function (elem) {
        return {
            "width": $(elem).width(),
            "height": $(elem).height()
        };

    },
    getNameFromCallee: function (callee) {
        var hope = callee.toString().match(/^function (\w*)\(/);
        if (hope && hope[1]) {
            return hope[1];
        }
        if (callee.toString().search(/^function ?\(/) != - 1) {
            return "[anonymous function]";
        }
        return false;
    },
    getViewportSize: function () {
        return {
            "width": $(window).width(),
            "height": $(window).height()
        };

    },
    objectToString: function (jsonObj, keyValSeparator, fieldSeparator) {
        var theString = "";
        var strArray = [];
        if (typeof keyValSeparator === "undefined") {
            keyValSeparator = "=";
        }
        if (typeof fieldSeparator === "undefined") {
            fieldSeparator = ",";
        }
        if ((typeof jsonObj !== "undefined") || jsonObj !== {}) {
            for (var key in jsonObj) {
                if (jsonObj.hasOwnProperty(key) && typeof jsonObj[key] !== "function") {
                    strArray.push(key + keyValSeparator + jsonObj[key]);
                }
            }
            theString = strArray.join(fieldSeparator);
        } else {
            theString = null;
        }
        return theString;
    },
    parseErrorStack: function (stack, errName) {
        var isChrome = (stack.search(/\n +at/) != - 1);
        stack = stack.replace(/(\d+):\d+\)\n/g, "$1\n");
        var lines = stack.split(/\n(?: +at )?/);
        if (isChrome) {
            lines.shift();
        }
        var ret = [];
        for (var i = 0; i < lines.length; i++) {
            var item = {};

            if (isChrome) {
                var funcname = lines[i].split(/ /).shift();
            } else {
                var funcname = lines[i].split(/\@/).shift();
            }
            var match = funcname.match(/\((.*)\)$/);
            if (match) {
                item.args = match[1];
                funcname = funcname.substr(0, funcname.indexOf("("));
            }
            item.name = funcname;
            item.line = lines[i].split(/:/).pop();
            lines[i] = lines[i].replace(/:\d+$/, "");
            item.url = lines[i].split(/[\(@]/).pop();
            ret.push(item);
        }
        return ret;
    },
    removeHtmlTags: function (content) {
        if (content.indexOf("<") != - 1) {
            content = content.slice(0, content.indexOf("<")) + content.slice(content.indexOf(">") + 1);
            content = arguments.callee(content);
        }
        return content;
    },
    serialize: function (obj) {
        switch (typeof obj) {
            case "string":
            case "number":
                return obj;
                break;
            case "boolean":
                return new Boolean(obj).toString();
                break;
            case "function":
                return "function";
                break;
            case "undefined":
                return "undefined";
                break;
            default:
                if (obj == null) {
                    return "null";
                }
                var ret = [];
                for (var key in obj) {
                    var val;
                    if (obj.hasOwnProperty(key)) {
                        val = encodeURIComponent(obj[key]);
                        ret.push(key + "=" + val);
                    }
                }
                return ret.join("&");
        }
    },
    setDelayedScrollTo: function (elem) {
        elem = $(elem).get(0);
        if (elem === undefined) {
            return;
        }
        setTimeout(function () {
            elem.scrollIntoView(true);
        }, 500);
    },
    stripTcm: function (str) {
        return str.replace(/(^|\~)tcm:/g, "$1");
    },
    ucfirst: function (str) {
        var first = str.substr(0, 1);
        var rest = str.substr(1);
        return first.toUpperCase() + rest.toLowerCase();
    },
};
WF.OnLoads = {
    doAll: function (root) {
        if (typeof root == "undefined") {
            root = $("body");
        }
        $.each(WF.OnLoads, function (name, code) {
            if (name != "doAll" && typeof WF.OnLoads[name] == "function") {
                try {
                    WF.OnLoads[name](root);
                } catch (e) {
                    //WF.Utils.ajaxLog(e);
                }
            }
        });
    },
    customEvents: function () {
        $(document).on("resizePage", function () {});
    },
    placeholderPolyfill: function (root) {
        if (typeof root == "undefined") {
            root = $("body");
        }
        if (!WF.Browser.supports.placeholder) {
            $(root).find("input[placeholder]").each(function () {
                if (!this.value) {
                    this.value = $(this).attr("placeholder");
                }
                $(this).focus(function () {
                    if (this.value == $(this).attr("placeholder")) {
                        this.value = "";
                    }
                }).blur(function () {
                    if (this.value.length < 1) {
                        this.value = $(this).attr("placeholder");
                    }
                });
            });
        }
    },
    setupBackLink: function (root) {
        $("a.backLink").click(function (e) {
            history.go(-1);
            e.preventDefault();
        });
    },
    setupPrintLink: function (root) {
        $("a.printLink").click(function (e) {
            window.print();
            e.preventDefault();
        });
    },
};

$(document).ready(function () {
    WF.Browser.supports = WF.Utils.getBrowserSupport();
    WF.OnLoads.doAll();
});
WF.Page = {
    "lang": $("html").attr("lang") || "en",
    "Components": {
        getByType: function (type) {
            switch (type) {
                case "c29":
                case "BalloonHelp":
                    return this.BalloonHelps;
                    break;
                case "CTA":
                    return this.CTAs;
                    break;
                case "c58":
                case "FAQ":
                    return this.FAQs;
                    break;
                case "c28a":
                case "LightBox":
                    return this.LightBoxes;
                    break;
                case "c28b":
                case "Overlay":
                    return this.Overlays;
                    break;
                case "c16":
                case "ShowHide":
                    return this.ShowHides;
                    break;
                case "c26":
                case "Tip":
                    return this.Tips;
                    break;
                default:
                    return [];
            }
        },
        "BalloonHelps": [],
        "Carousels": [],
        "CTAs": [],
        "FAQs": [],
        "FatNav": false,
        "Footnotes": {
            "last": 0
        },
        "LightBoxes": [],
        "Overlays": [],
        "RibbonCarousels": [],
        "ShowHides": [],
        "Tips": []
    }
};

WF.Component.SocialShare = function () {
    var _this = this,
    firstTime = true,
    pageHeader = $("h1"),
    pageTitle = $("title"),
    header = "";
    this.container = null;
    this.sharelinks = null;
    this.shareLinkClicked = null;
    this.title = null;
    this.opener = null;
    if (pageHeader.length != 0) {
        header = WF.Utils.removeHtmlTags(pageHeader[0].innerHTML);
    } else {
        if (pageTitle.length != 0) {
            header = pageTitle[0].innerHTML;
        }
    }
    this.show = function (opener) {
        var noOfLinks = 0,
        i = 0,
        linkPos = null,
        syllabus = 0;
        this.opener = opener;
        this.container = $(this.opener).closest("div.sideUtility").find("div.c52")[0];
        this.title = $(this.container).find("h2");
        $(opener).addClass("active");
        $(this.container).removeClass("hide");
        if ($(".t5 .c42 .c49").length != 0) {
            syllabus = $(".t5 .c42 .c49").outerHeight(true);
        }
        this.position();
        $(this.container).attr("aria-hidden", "false");
        initSocialShare();
        $(this.container).find("span.hide").focus();
    };

    this.hide = function () {
        $(this.opener).removeClass("active");
        $(this.container).addClass("hide");
        $(this.container).attr("aria-hidden", "true");
        this.opener.focus();
    };

    this.getShareLinks = function () {
        if (this.container != null) {
            this.sharelinks = $(this.container).find("a");
            noOfLinks = this.sharelinks.length;
        }
    };

    this.position = function () {
        var linkPos = $(this.opener).offset();
        if ($(this.opener).closest("div.sideUtility").hasClass("top")) {
            $(this.container).css("left", linkPos.left - $(this.container).outerWidth() + $(this.opener).outerWidth() + "px");
            $(this.container).css("top", (linkPos.top + $(this.opener).outerHeight() - 2) + "px");
        } else {
            $(this.container).css("left", linkPos.left + "px");
            $(this.container).css("top", (linkPos.top - $(this.container).outerHeight() + 1) + "px");
        }
    };

    this.share = function (e) { // drt
        var shareSite = this.shareLinkClicked.href.slice(this.shareLinkClicked.href.indexOf("#") + 1),
        shareUrl = "",
        docUrl = location.href,
        evt = e || window.event;
        if (docUrl.indexOf("?") != - 1) {
            docUrl = docUrl.slice(0, docUrl.indexOf("?"));
        }
        if (docUrl.indexOf("#") != - 1) {
            docUrl = docUrl.slice(0, docUrl.indexOf("#"));
        }
        switch (shareSite) {
            case "facebook":
                shareUrl = "http://www.facebook.com/sharer.php?u=";
                break;
            case "linkedin":
                shareUrl = "http://www.linkedin.com/shareArticle?mini=true&ro=false&url=";
                break;
            case "googleplus":
                shareUrl = "https://plus.google.com/share?url=";
                break;
            case "twitter":
                shareUrl = "http://twitter.com/share?url=";
                break;
            default:
        }
        window.location.href = shareUrl + encodeURIComponent(Slides.makeLink(false, shareSite)); // HAAAACCK!
        this.hide();
    };

    function initSocialShare() {
        var i = 0,
        j = 0,
        docUrl, pageHeader, descript, emailBody, emailSubject;
        if (firstTime) {
            firstTime = false;
        } else {
            return;
        }
        if (_this.container != null) {
            _this.getShareLinks();
            for (i = 0; i < _this.sharelinks.length; i++) {
                $(_this.sharelinks[i]).bind("click keypress", function (evt) {
                    if (evt.type == "keypress" && evt.keyCode != 13) {
                        return;
                    }
                    if (this.href.indexOf("#email") != - 1 || this.href.indexOf("mailto") != - 1) {
                        try {
                            _this.hide();

                            //descript = $("meta[name=description]").attr("content");
                            if (W.isWystar) {
                                descript = 'I just made a snowman. Check out my snowman and create your own with the WySTAR Global Retirement Solutions holiday Snowman Scramble.'; //<Link to play the card>
                            } else {
                                descript = 'I just made a snowman. Check out my snowman and create your own with Wells Fargo\'s holiday Snowman Scramble.'; //<Link to play the card>
                            }

                            docUrl = location.href;
                            if (docUrl.indexOf("?") != - 1) {
                                docUrl = docUrl.slice(0, docUrl.indexOf("?"));
                            }
                            if (docUrl.indexOf("#") != - 1) {
                                docUrl = docUrl.slice(0, docUrl.indexOf("#"));
                            }
                            //pageHeader = $("h1:first").clone();
                            //pageHeader.find("span").remove();
                            //pageHeader = WF.Utils.removeHtmlTags(pageHeader.html()).replace(/[^\x20-\x7f-]/g, "").replace(/\s*-\s*$/, "");
                            if (W.isWystar) {
                                pageHeader = 'Happy Holidays from WySTAR Global Retirement Solutions: Play the Snowman Scramble';
                            } else {
                                pageHeader = 'Happy Holidays from Wells Fargo: Play the Snowman Scramble';
                            }
                            if (WF.Browser.supports.isIE) {
                                emailBody = descript + " " + Slides.makeLink(false, 'email'); // drt
                            } else {
                                emailBody = descript + " " + Slides.makeLink(false, 'email'); // drt
                            }
                            if (!W.isWystar) {
                                emailBody += '\n\nWatch Wells Fargo\'s "Stagecoach and Snowmen" commercial for more holiday cheer. http://stories.wellsfargobank.com/holiday-warmth-snowmen-come-to-life/';
                            }

                            emailSubject = "" + encodeURIComponent(pageHeader);
                            window.location.href = "mailto:?body=" + encodeURIComponent(emailBody) + "&subject=" + emailSubject;
                            if (evt.type == "keypress") {}
                            evt.preventDefault();
                        } catch (e) {
                            //WF.Utils.ajaxLog(e);
                        }
                    } else {
                        _this.shareLinkClicked = this;
                        _this.share(evt);
                        return false;
                    }
                });
            }
        }
        $(_this.container).bind("keypress", function (evt) {
            if (evt.keyCode == 27) {
                _this.hide();
            }
        });
    }
    $(document).bind("resizePage", function () {
        if ($(_this.opener).hasClass("active") == true) {
            _this.position();
        }
    });
};

WF.OnLoads.setupSocialShare = function (root) { // drt
    var disclosure = WF.Strings.Components.SocialShare.Disclosure[WF.Page.lang],
    shareText = WF.Strings.Components.SocialShare.Share[WF.Page.lang],
        share, menu, link;
    if (typeof root == "undefined") {
        root = $("body");
    }
    $(root).find(".sideUtility ul li a.printLink").parent() //
    .after('<li><span>&nbsp;</span><a href="#" class="c52Link" aria-haspopup="true">' + shareText + "</a></li>");
    $(root).find(".sideUtility ul li.noPrintLink") //
    .append('<li><a href="#" class="c52Link" aria-haspopup="true">' + shareText + "</a></li>");
    menu = $(root).find(".c52");

    if (!menu.length > 0) return;
    menu.append(disclosure);
    share = new WF.Component.SocialShare();
    link = $(root).find('.c52Link');

    link.bind("click keypress", function (evt) {
        if (evt.type == "keypress" && evt.keyCode != 13) {
            return false;
        }
        if (WF.Browser.supports.IE7mode) {
            var curScroll = $(document).scrollTop(),
            expireTime = new Date().getTime() + 1000;
            var interval = setInterval(function () {
                if ($(document).scrollTop() < curScroll) {
                    $(document).scrollTop(curScroll);
                    clearInterval(interval);
                } else {
                    if (new Date().getTime() >= expireTime) {
                        clearInterval(interval);
                    }
                }
            }, 1);
        }
        evt.preventDefault();
        if (!$(this).hasClass("active")) {
            link.each(function () {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(share.container).addClass("hide");
                }
            });
            share.show(this);
        } else {
            share.hide();
        }
        return false;
    });
    if (menu.is('.emailOnly')) {
        share.show(link); // force an update for emailOnly
        menu.find('a').last().addClass('emailOnly') //
        .insertBefore(link.hide());
        share.hide();
    }
};


$(document).ready(function () {
    if (typeof window.WFonDocReady == "function") {
        window.WFonDocReady();
    }
    if ($("html").hasClass("lt-ie9")) {
        $("body").addClass("not_a_real_class").removeClass("not_a_real_class");
    }
    if (WF.Browser.supports.IE7mode) {
        $("a[href$=#]:not(.c16header a, .c58question a, .c65 li.wf-tab a, .c66filterTabs li.wf-tab a)").click(function () {
            window.location.href = this.href;
        });
    }
    if (window.location.hash && window.location.hash.length > 1) {
        //WF.Utils.setDelayedScrollTo(window.location.hash); // drt
    }
});
