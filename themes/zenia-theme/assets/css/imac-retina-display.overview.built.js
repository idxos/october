require = (function e(b, g, d) {
    function c(k, i) {
        if (!g[k]) {
            if (!b[k]) {
                var h = typeof require == "function" && require;
                if (!i && h) {
                    return h(k, !0)
                }
                if (a) {
                    return a(k, !0)
                }
                throw new Error("Cannot find module '" + k + "'")
            }
            var j = g[k] = {
                exports: {}
            };
            b[k][0].call(j.exports, function(l) {
                var m = b[k][1][l];
                return c(m ? m : l)
            }, j, j.exports, e, b, g, d)
        }
        return g[k].exports
    }
    var a = typeof require == "function" && require;
    for (var f = 0; f < d.length; f++) {
        c(d[f])
    }
    return c
})({
    1: [
        function(b, c, a) {
            c.exports.InlineStyleRenderer = b("./ac-style-renderer/InlineStyleRenderer");
            c.exports.LogRenderer = b("./ac-style-renderer/LogRenderer")
        }, {
            "./ac-style-renderer/InlineStyleRenderer": 2,
            "./ac-style-renderer/LogRenderer": 3
        }
    ],
    2: [
        function(d, f, c) {
            var a = (function() {
                var h, g;
                if (a) {
                    return
                }
                g = document.createElement("div");
                h = ["transform", "webkitTransform", "MozTransform", "msTransform", "oTransform"];
                h.some(function(i) {
                    if (i in g.style) {
                        a = i;
                        return true
                    }
                });
                return a
            })();
            var b = {
                transformFunctions: ["none", "matrix", "translate", "translateX", "translateY", "scale", "scaleX", "scaleY", "rotate", "skewX", "skewY", "matrix3d", "translate3d", "translateZ", "scale3d", "scaleZ", "rotate3d", "rotateX", "rotateY", "rotateZ", "perspective"],
                render: function(i, g) {
                    var h = this._parseProps(g);
                    h.forEach(function(j) {
                        i.style[j.prop] = j.value
                    })
                },
                _mergeTransformProps: function(g) {
                    var h = g.reduce(this._partialPropValue.bind(this), "");
                    return {
                        prop: a,
                        value: h
                    }
                },
                _partialPropValue: function(h, i) {
                    var j = this._parseTransformFunction(i.prop);
                    var g = [h, " ", j, "(", i.value, ")"].join("");
                    return g
                },
                _parseTransformFunction: function(g) {
                    return g.replace("transform-", "")
                },
                _isTransformFunction: function(g) {
                    return this.transformFunctions.indexOf(g) !== -1
                },
                _parseProps: function(l) {
                    var k = [];
                    var j = [];
                    var n;
                    var m;
                    var o;
                    for (var h = 0, g = l.length; h < g; h++) {
                        o = l[h];
                        n = this._isTransformFunction(o.prop);
                        [].push.call(n ? j : k, o)
                    }
                    if (j.length) {
                        m = this._mergeTransformProps(j);
                        k.push(m)
                    }
                    return k
                }
            };
            f.exports = b
        }, {}
    ],
    3: [
        function(b, c, a) {
            c.exports = {
                render: function(g, f) {
                    var d = (arguments.length < 2) ? g : f;
                    console.log(d)
                }
            }
        }, {}
    ],
    4: [
        function(b, c, a) {
            a.Clock = b("./ac-animation-sequencer/Clock");
            a.PlayerMonitor = b("./ac-animation-sequencer/PlayerMonitor");
            a.Timeline = b("./ac-animation-sequencer/Timeline");
            a.Tween = b("./ac-animation-sequencer/Tween");
            a.BasicPlayer = b("./ac-animation-sequencer/player/BasicPlayer");
            a.MediaPlayer = b("./ac-animation-sequencer/player/MediaPlayer");
            a.Pause = b("./ac-animation-sequencer/controllers/Pause");
            a.MediaGroup = b("./ac-animation-sequencer/controllers/MediaGroup");
            a.BaseClip = b("./ac-animation-sequencer/clip/BaseClip");
            a.CompositeClip = b("./ac-animation-sequencer/clip/CompositeClip");
            a.TimedClip = b("./ac-animation-sequencer/clip/TimedClip");
            a.TweenClip = b("./ac-animation-sequencer/clip/TweenClip");
            a.ElementClip = b("./ac-animation-sequencer/clip/ElementClip");
            a.VideoClip = b("./ac-animation-sequencer/clip/VideoClip");
            a.ReversibleVideo = b("./ac-animation-sequencer/adapters/ReversibleVideo")
        }, {
            "./ac-animation-sequencer/Clock": 5,
            "./ac-animation-sequencer/PlayerMonitor": 6,
            "./ac-animation-sequencer/Timeline": 7,
            "./ac-animation-sequencer/Tween": 8,
            "./ac-animation-sequencer/adapters/ReversibleVideo": 11,
            "./ac-animation-sequencer/clip/BaseClip": 12,
            "./ac-animation-sequencer/clip/CompositeClip": 13,
            "./ac-animation-sequencer/clip/ElementClip": 14,
            "./ac-animation-sequencer/clip/TimedClip": 15,
            "./ac-animation-sequencer/clip/TweenClip": 16,
            "./ac-animation-sequencer/clip/VideoClip": 17,
            "./ac-animation-sequencer/controllers/MediaGroup": 18,
            "./ac-animation-sequencer/controllers/Pause": 19,
            "./ac-animation-sequencer/player/BasicPlayer": 20,
            "./ac-animation-sequencer/player/MediaPlayer": 21
        }
    ],
    5: [
        function(b, c, a) {
            function f() {
                this._currentTimeMS = 0;
                this._playbackRate = 1;
                this._paused = true;
                this._resetStartTime()
            }
            var d = f.prototype;
            d._updateCurrentTime = function() {
                var h, g = Date.now();
                if (this._paused) {
                    h = 0
                } else {
                    h = (g - this._startTime)
                }
                this._currentTimeMS += (h * this._playbackRate);
                this._startTime = g
            };
            d._resetStartTime = function() {
                this._startTime = Date.now()
            };
            d.play = function() {
                this._resetStartTime();
                this._paused = false;
                return this
            };
            d.pause = function() {
                this._updateCurrentTime();
                this._paused = true;
                return this
            };
            d.isPaused = function() {
                return this._paused
            };
            d.getCurrentTime = function() {
                this._updateCurrentTime();
                return this._currentTimeMS / 1000
            };
            d.setCurrentTime = function(g) {
                if (isNaN(g)) {
                    return
                }
                this._resetStartTime();
                this._currentTimeMS = g * 1000
            };
            d.getPlaybackRate = function() {
                return this._playbackRate
            };
            d.setPlaybackRate = function(g) {
                if (isNaN(g)) {
                    return
                }
                this._playbackRate = g
            };
            c.exports = f
        }, {}
    ],
    6: [
        function(c, f, a) {
            var h = c("ac-event-emitter").EventEmitter;
            var b = c("./vendor/utils");

            function d(j, k, i) {
                i = (Array.isArray(k) ? i : k) || {};
                k = (Array.isArray(k) ? k : []);
                this._player = j;
                this._isMonitoring = true;
                this._times = [0];
                this._previous = 0;
                this._currentTimeIndex = 0;
                this._options = b.defaults({
                    active: true,
                    readyEvent: "canplaythrough",
                    autoInit: false
                }, i);
                if (this._options.autoInit) {
                    this.addPlayerListener(this._options.readyEvent, this._init.bind(this, k))
                }
            }
            var g = d.prototype = new h();
            g.addPlayerListener = function(j, i) {
                if (typeof this._player.addEventListener === "function") {
                    this._player.addEventListener(j, i)
                } else {
                    if (typeof this._player.on === "function") {
                        this._player.on(j, i)
                    }
                }
            };
            g._init = function(i) {
                if (this._initialized) {
                    return
                }
                this.addTime(this._player.duration);
                if (i && i.length) {
                    i.forEach(this.addTime.bind(this))
                }
                this._resetNextTimes();
                this._attachEvents();
                if (this._options.active) {
                    this._listen()
                }
                this.trigger("ready");
                this._initialized = true
            };
            g._attachEvents = function() {
                this.addPlayerListener("play", this._handlePlay.bind(this));
                if (!this._options.active) {
                    this.addPlayerListener("timeupdate", this._listen.bind(this))
                }
                this.addPlayerListener("seeking", this._handleSeek.bind(this));
                this.addPlayerListener("ratechange", this._handleRateChange.bind(this))
            };
            g.addTime = function(i, j) {
                i = parseFloat(i);
                if (isNaN(i)) {
                    throw new TypeError('Invalid time "' + i + '", expected Number"')
                }
                if (this._times.indexOf(i) === -1) {
                    this._times.push(i);
                    this._times.sort(function(l, k) {
                        return l - k
                    })
                }
                if (typeof j === "function") {
                    this.on("time:" + i, j)
                }
                this._resetNextTimes()
            };
            g._handleSeek = function() {
                var j = this._player.currentTime;
                var i = this._times.indexOf(j);
                this._currentTimeIndex = (i !== -1) ? i : this._calcCurrentTimeIndex(j);
                this._resetNextTimes()
            };
            g._handlePlay = function() {
                this._resetNextTimes();
                this._listen()
            };
            g._handleRateChange = function() {
                var j = this._player.currentTime;
                var k = j === this._player.duration;
                var i = this._times.indexOf(j) !== -1;
                this._currentTimeIndex = (k || i) ? this._currentTimeIndex : this._calcCurrentTimeIndex(j);
                this._resetNextTimes()
            };
            g._resetNextTimes = function() {
                var i = this._calcNextTimeIndex(this._currentTimeIndex);
                if (b.isNum(i)) {
                    this._nextTimeIndex = i;
                    this._nextTimePoint = this._times[i]
                }
            };
            g._calcCurrentTimeIndex = function(m) {
                var j, l, k, i;
                k = this._calcTimeIndices(m);
                l = k[0];
                j = k[1];
                i = (this._forwards()) ? l : j;
                return (this._validTimeIndex(i)) ? i : null
            };
            g._validTimeIndex = function(i) {
                return (0 <= i && i <= this._times.length - 1)
            };
            g._calcNextTimeIndex = function(i) {
                var j = i + ((this._forwards()) ? 1 : -1);
                return (this._validTimeIndex(j)) ? j : null
            };
            g._calcTimeIndices = function(j) {
                var i = this._times.reduce(function(l, m, k) {
                    return (j >= this._times[l + 1]) ? k : l
                }.bind(this), 0);
                return [i, i + 1]
            };
            g._reachedNextTime = function(m) {
                var l = this._forwards();
                var j = this._nextTimePoint;
                var k = !this._player.paused || m === 0 || m === this._player.duration;
                var n = l && m >= j;
                var i = !l && m <= j;
                return k && (n || i)
            };
            g._forwards = function() {
                return this._player.playbackRate > 0
            };
            g._listen = function() {
                var j = this._player.currentTime;
                var i = this._previous;
                var k = this._reachedNextTime(j);
                if (k) {
                    this._enterTimePoint(i)
                }
                this._previous = j;
                if (this._options.active && !this._player.paused) {
                    window.requestAnimationFrame(this._listen.bind(this))
                }
            };
            g._enterTimePoint = function(j) {
                var i = this._calcNextTimeIndex(this._currentTimeIndex);
                if (!b.isNum(i)) {
                    return
                }
                var k = this._times[i];
                this.trigger("time:" + k, {
                    previous: j,
                    next: this._player.currentTime,
                    requested: k
                });
                this._currentTimeIndex = i;
                this._resetNextTimes()
            };
            f.exports = d
        }, {
            "./vendor/utils": 24,
            "ac-event-emitter": false
        }
    ],
    7: [
        function(b, c, a) {
            var i = b("./clip/CompositeClip");
            var h = b("./clip/TimedClip");
            var g = "Invalid duration for the following clip; must be number greater than or equal to zero (0)";
            var f = 'Invalid clip type: "';
            var d = {
                clipTypes: {
                    Tween: b("./clip/TweenClip"),
                    Element: b("./clip/ElementClip")
                },
                create: function(j) {
                    if (this.validTimeline(j)) {
                        return this._buildTimeline(j)
                    }
                    if (this.debug && console && typeof console.warn === "function") {
                        console.warn("Timeline: invalid timeline data:", j)
                    }
                    return null
                },
                validTimeline: function(j) {
                    return Array.isArray(j) && j.every(this._validClip.bind(this))
                },
                _getClipType: function(j) {
                    if (typeof j === "string" && this.clipTypes[j]) {
                        j = this.clipTypes[j]
                    }
                    if (this._isValidClipType(j)) {
                        return j
                    }
                    return false
                },
                _isValidClipType: function(j) {
                    return (j && j.create)
                },
                _validate: function() {
                    return true
                },
                _buildTimeline: function(k) {
                    var j = k.map(this._createTimedClip.bind(this));
                    return new i(j)
                },
                _createTimedClip: function(k) {
                    var j = this._getClipType(k.clip);
                    return new h(j.create(k), k)
                },
                _validClip: function(m) {
                    var l;
                    var j = this._getClipType(m.clip);
                    var k = this._validDuration(m);
                    if (!j) {
                        throw new TypeError(f + m.clip + '"\n\n' + JSON.stringify(m))
                    }
                    l = j.validate || this._validate;
                    return k && l(m)
                },
                _validDuration: function(k) {
                    var l = k.duration;
                    var j = typeof l === "number" && l > 0;
                    if (!j) {
                        throw new TypeError(g + "\n\n" + JSON.stringify(k))
                    }
                    return j
                }
            };
            c.exports = d
        }, {
            "./clip/CompositeClip": 13,
            "./clip/ElementClip": 14,
            "./clip/TimedClip": 15,
            "./clip/TweenClip": 16
        }
    ],
    8: [
        function(b, a, d) {
            var i = b("./vendor/KeySpline");
            var g = b("./vendor/EasingFunctions");
            var k = "Easing option must be one of: String, Array[Number:4], or Function. Given: ";
            var c = "KeySpline easing expected an array of exactly four (4) numbers, given: ";
            var j = b("./vendor/utils");

            function h(l) {
                l = l || {};
                j.defaultProps(this, h.defaults, l);
                this._easingFunction = this._createEasing(this.easing)
            }
            h.defaults = {
                from: 0,
                to: 1,
                duration: 1,
                easing: "linear"
            };
            var f = h.prototype;
            f._createEasing = function(l) {
                var m;
                if (typeof l === "string") {
                    m = this._createPredefinedEasing(l)
                } else {
                    if (Array.isArray(l)) {
                        m = this._createBezierEasing(l)
                    } else {
                        if (typeof l === "function") {
                            m = l
                        } else {
                            throw new TypeError(k + l)
                        }
                    }
                }
                return m
            };
            f._createBezierEasing = function(l) {
                var n;
                var o = l;
                var m = l.every(function(p) {
                    return (typeof p === "number")
                });
                if (l.length !== 4 || !m) {
                    throw new TypeError(c + l)
                }
                n = new i(o[0], o[1], o[2], o[3]);
                return function(p, s, r, q) {
                    return s + n.get(p / q) * r
                }
            };
            f._createPredefinedEasing = function(n) {
                var m = g[n];
                var l = "";
                if (!m) {
                    l += 'Easing function "' + m;
                    l += '" not recognized among the following: ';
                    l += Object.keys(g).join(", ");
                    throw new Error(l)
                }
                return m
            };
            f._getInterpolatedValue = function(l, o, n, m) {
                return this._easingFunction(l, o, n, m)
            };
            f.valueAtLocation = function(m) {
                if (m < 0 || m > 1) {
                    return null
                }
                var l = this.duration * m;
                return this.valueAtTime(l)
            };
            f.valueAtPercent = function(l) {
                if (l < 0 || l > 100) {
                    return null
                }
                return this.valueAtLocation(l / 100)
            };
            f.valueAtTime = function(l) {
                if (l < 0 || l > this.duration) {
                    return null
                }
                return this._getInterpolatedValue(l, this.from, this.to - this.from, this.duration)
            };
            a.exports = h
        }, {
            "./vendor/EasingFunctions": 22,
            "./vendor/KeySpline": 23,
            "./vendor/utils": 24
        }
    ],
    9: [
        function(c, d, b) {
            function a(g) {
                this._media = g
            }
            var f = a.prototype;
            f.on = function() {
                this._media.addEventListener.apply(this._media, arguments)
            };
            f.off = function() {
                this._media.removeEventListener.apply(this._media, arguments)
            };
            f.getCurrentTime = function() {
                return this._media.currentTime
            };
            f.setCurrentTime = function(g) {
                this._media.currentTime = g
            };
            f.getDuration = function() {
                return this._media.duration
            };
            f.getPlaybackRate = function() {
                return this._media.playbackRate
            };
            f.setPlaybackRate = function(g) {
                this._media.playbackRate = g
            };
            d.exports = a
        }, {}
    ],
    10: [
        function(c, d, a) {
            if (typeof Object.defineProperties !== "function") {
                return
            }
            var g = c("ac-event-emitter").EventEmitter;

            function b(h) {
                this._player = h
            }
            var f = b.prototype = new g();
            f.addEventListener = function() {
                this._player.on.apply(this._player, arguments)
            };
            f.removeEventListener = function() {
                this._player.on.apply(this._player, arguments)
            };
            f.play = function() {
                this._player.play.apply(this._player, arguments)
            };
            f.pause = function() {
                this._player.pause.apply(this._player, arguments)
            };
            Object.defineProperties(b.prototype, {
                paused: {
                    get: function() {
                        return this._player.isPaused()
                    },
                    set: function(h) {
                        this._player.setPaused(h)
                    }
                },
                currentTime: {
                    get: function() {
                        return this._player.getCurrentTime()
                    },
                    set: function(h) {
                        this._player.setCurrentTime(h)
                    }
                },
                duration: {
                    get: function() {
                        return this._player.getDuration()
                    }
                },
                playbackRate: {
                    get: function() {
                        return this._player.getPlaybackRate()
                    },
                    set: function(h) {
                        this.trigger("ratechange", {
                            rate: h
                        });
                        this._player.setPlaybackRate(h)
                    }
                }
            });
            d.exports = b
        }, {
            "ac-event-emitter": false
        }
    ],
    11: [
        function(b, c, a) {
            if (typeof Object.defineProperties !== "function") {
                return
            }
            var f = b("ac-event-emitter").EventEmitter;

            function g(h) {
                this._media = h;
                this._lastTime = null;
                g.passThroughEvents.forEach(this.passThroughEvent.bind(this));
                g.interceptedEvents.forEach(this.interceptEvent.bind(this))
            }
            g.interceptedEvents = ["seeking", "play"];
            g.passThroughEvents = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "mozaudioavailable", "pause", "playing", "progress", "ratechange", "seeked", "suspend", "timeupdate", "volumechange", "waiting"];
            var d = g.prototype = new f();
            d.addEventListener = function(h) {
                var i = g.passThroughEvents;
                if (i.indexOf(h) > -1) {
                    this._media.addEventListener.apply(this._media, arguments)
                } else {
                    this.on.apply(this, arguments)
                }
            };
            d.removeEventListener = function(h) {
                var i = g.passThroughEvents;
                if (i.indexOf(h) > -1) {
                    this._media.removeEventListener.apply(this._media, arguments)
                } else {
                    this.off.apply(this, arguments)
                }
            };
            d.passThroughEvent = function(h) {
                this._media.addEventListener(h, this._passThrough.bind(this))
            };
            d.interceptEvent = function(h) {
                var i = this["_on" + h];
                if (typeof i !== "undefined") {
                    this._media.addEventListener(h, i.bind(this))
                }
            };
            d._passThrough = function(h) {
                this.trigger(h.type, h)
            };
            d._onseeking = function() {
                if (!this._playing) {
                    this.trigger("seeking")
                }
            };
            d._onplay = function() {
                this.trigger("play")
            };
            d.play = function() {
                if (this.playbackRate < 0) {
                    this._playing = true;
                    this._lastTime = null;
                    window.requestAnimationFrame(this._update.bind(this));
                    this.trigger("play")
                } else {
                    this._media.play()
                }
            };
            d.load = function() {
                this._media.load()
            };
            d._stop = function(h) {
                h.preventDefault();
                h.stopPropagation()
            };
            d._update = function(i) {
                var j = i - (this._lastTime || i);
                var h = this._media.currentTime + ((j * this.playbackRate) / 1000);
                if (h <= 0) {
                    this._media.currentTime = 0;
                    this._playing = false;
                    this.trigger("returned", {
                        type: "returned"
                    })
                } else {
                    this._media.currentTime = h;
                    this.trigger("timeupdate", {
                        type: "timeupdate"
                    })
                }
                this._lastTime = i;
                if (this._playing) {
                    window.requestAnimationFrame(this._update.bind(this))
                }
            };
            d.pause = function() {
                this._playing = false;
                this._media.pause()
            };
            Object.defineProperties(g.prototype, {
                currentTime: {
                    get: function() {
                        return this._media.currentTime
                    },
                    set: function(h) {
                        this._media.currentTime = h
                    }
                },
                duration: {
                    get: function() {
                        return this._media.duration
                    }
                },
                buffered: {
                    get: function() {
                        return this._media.buffered
                    }
                },
                playbackRate: {
                    get: function() {
                        return this._media.playbackRate
                    },
                    set: function(h) {
                        this._media.playbackRate = h
                    }
                },
                paused: {
                    get: function() {
                        return !this._playing && this._media.paused
                    },
                    set: function(h) {
                        this._media.paused = h
                    }
                }
            });
            c.exports = g
        }, {
            "ac-event-emitter": false
        }
    ],
    12: [
        function(b, a, d) {
            var h = b("../vendor/KeySpline");
            var i = b("ac-style-renderer").LogRenderer;
            var g = b("../vendor/EasingFunctions");
            var l = "Easing option must be one of: String, Array[Number:4], or Function. Given: ";
            var c = "KeySpline easing expected an array of exactly four (4) numbers, given: ";
            var k = b("ac-event-emitter").EventEmitter;

            function j(n, m) {
                this.options = m || {};
                this._renderer = this.options.renderer || i;
                this._duration = n;
                this._currentTime = 0;
                this._easingFunction = this._createEasing(this.options.easing || j.DEFAULT_EASING)
            }
            j.DEFAULT_EASING = "linear";
            var f = j.prototype = new k();
            f._createEasing = function(m) {
                var n;
                if (typeof m === "string") {
                    n = this._createPredefinedEasing(m)
                } else {
                    if (Array.isArray(m)) {
                        n = this._createBezierEasing(m)
                    } else {
                        if (typeof m === "function") {
                            n = m
                        } else {
                            throw new TypeError(l + m)
                        }
                    }
                }
                return n
            };
            f._createBezierEasing = function(m) {
                var o;
                var p = m;
                var n = m.every(function(q) {
                    return (typeof q === "number")
                });
                if (m.length !== 4 || !n) {
                    throw new TypeError(c + m)
                }
                o = new h(p[0], p[1], p[2], p[3]);
                return function(q, t, s, r) {
                    return o.get(q / r) * s
                }
            };
            f._createPredefinedEasing = function(o) {
                var n = g[o];
                var m = "";
                if (!n) {
                    m += 'Easing function "' + n;
                    m += '" not recognized among the following: ';
                    m += Object.keys(g).join(", ");
                    throw new Error(m)
                }
                return n
            };
            f._getInterpolatedValue = function(m, p, o, n) {
                return this._easingFunction(m, p, o, n)
            };
            f.getDuration = function() {
                return this._duration
            };
            f.getCurrentTime = function() {
                return this._currentTime
            };
            f.setCurrentTime = function(m) {
                this._currentTime = m;
                this.update()
            };
            f.getPlaybackRate = function() {
                return this._playbackRate
            };
            f.setPlaybackRate = function(m) {
                this._playbackRate = m
            };
            f.update = function() {};
            a.exports = j
        }, {
            "../vendor/EasingFunctions": 22,
            "../vendor/KeySpline": 23,
            "ac-event-emitter": false,
            "ac-style-renderer": 1
        }
    ],
    13: [
        function(b, c, a) {
            var g = b("./TimedClip");

            function f(h) {
                if (h && h.length) {
                    this._clips = h.map(this._ensureTimedClip);
                    this._duration = this._calcDuration()
                }
            }
            var d = f.prototype;
            d._calcDuration = function(h) {
                h = h || this._clips;
                var i = h.reduce(function(k, l) {
                    var j = l.getStartDelay() + l.getDuration();
                    return (j > k) ? j : k
                }, 0);
                return i
            };
            d._ensureTimedClip = function(h) {
                if (!(h instanceof g)) {
                    h = new g(h)
                }
                return h
            };
            d._getLocalTime = function(h, i) {
                return i - h.getStartDelay()
            };
            d._getEligibleClips = function() {
                return this._clips
            };
            d.addClip = function(h) {
                h = this._ensureTimedClip(h);
                this._clips.push(h);
                this._duration = this._calcDuration()
            };
            d.on = function() {
                var h = arguments;
                this._clips.forEach(function(i) {
                    i.on.apply(i, h)
                })
            };
            d.off = function() {
                var h = arguments;
                this._clips.forEach(function(i) {
                    i.off.apply(i, h)
                })
            };
            d.trigger = function() {
                var h = arguments;
                this._clips.forEach(function(i) {
                    i.trigger.apply(i, h)
                })
            };
            d.setEasingDirection = function(h) {
                this._clips.forEach(function(i) {
                    i.setEasingDirection(h)
                })
            };
            d.getDuration = function() {
                return this._duration
            };
            d.getCurrentTime = function() {
                return this._currentTime
            };
            d.setCurrentTime = function(j, i) {
                var h = this._getEligibleClips();
                if (!h || !h.length) {
                    return
                }
                h.forEach(function(k) {
                    var l = this._getLocalTime(k, j);
                    k.setCurrentTime(l, i)
                }.bind(this))
            };
            d.getPlaybackRate = function() {
                return this._playbackRate
            };
            d.setPlaybackRate = function(h) {
                if (isNaN(h)) {
                    return
                }
                this._playbackRate = h
            };
            c.exports = f
        }, {
            "./TimedClip": 15
        }
    ],
    14: [
        function(c, a, d) {
            var j = c("../vendor/utils");
            var h = c("../Tween");
            var k = c("./BaseClip");
            var i = c("ac-style-renderer").InlineStyleRenderer;
            var b = "Invalid element or selector: ";

            function g(l) {
                l = j.defaults(g.DEFAULTS, l);
                this.props = l.props || [];
                if (l.selector || typeof l.element === "string") {
                    this.el = document.querySelector(l.selector || l.element)
                } else {
                    this.el = l.element
                } if (!this.el || !this.el.nodeType || this.el.nodeType !== 1) {
                    throw new TypeError(b + l.element)
                }
                if (!l.renderer) {
                    this.renderer = i
                }
                k.call(this, l.duration, l);
                this._initProps()
            }
            g.DEFAULTS = {
                props: [],
                selector: null,
                element: ".default_selector",
                renderer: i,
                duration: 1
            };
            g.create = function(l) {
                return new g(l)
            };
            g.validate = function(m) {
                var l = "selector" in m || "element" in m;
                return l
            };
            var f = g.prototype = new k();
            f._initProps = function() {
                this.props.forEach(function(l) {
                    l.tween = this._createTween({
                        easing: l.easing || k.DEFAULT_EASING,
                        from: l.from,
                        to: l.to,
                        duration: this.getDuration()
                    })
                }.bind(this))
            };
            f._createTween = function(l) {
                return new h(l)
            };
            f.update = function(m) {
                if (this.props.length < 1) {
                    return
                }
                var l = this.props.map(function(q) {
                    var o = q.tween;
                    var n = q.units;
                    var p = o.valueAtTime(m);
                    p = (n ? (p + n) : p);
                    return {
                        prop: q.property,
                        value: p
                    }
                });
                this._renderer.render(this.el, l);
                this.trigger("tween_update", {
                    el: this.el,
                    context: l
                })
            };
            f.getCurrentTime = function() {
                return this._currentTime
            };
            f.setCurrentTime = function(l) {
                if (l < 0 || l > this.getDuration()) {
                    return
                }
                this._currentTime = l;
                this.update(this._currentTime)
            };
            a.exports = g
        }, {
            "../Tween": 8,
            "../vendor/utils": 24,
            "./BaseClip": 12,
            "ac-style-renderer": 1
        }
    ],
    15: [
        function(c, d, a) {
            var b = c("../vendor/utils");

            function g(i, h) {
                h = b.defaults(g.DEFAULTS, (h || {}));
                this._clip = i;
                this._startDelay = h.startDelay || 0;
                this._loop = h.loop || false;
                this._fill = h.fill || "none"
            }
            g.DEFAULTS = {
                fill: "none",
                loop: false,
                startDelay: 0
            };
            g.FILL_MODES = ["none", "forwards", "backwards", "both"];
            var f = g.prototype;
            f._show = function() {
                if (this._isHidden) {
                    this._isHidden = false;
                    this._clip.show()
                }
            };
            f._applyFill = function(n) {
                if (this.getFill() === "none") {
                    return
                }
                var m = this.getDuration();
                var k = n > m;
                var j = this.getFill();
                var i = k && j === "forwards";
                var h = !k && j === "backwards";
                var l = j === "both" || i || h;
                if (l) {
                    this._clip.setCurrentTime((k) ? m : 0)
                }
            };
            f._hide = function() {
                if (!this._isHidden) {
                    this._isHidden = true;
                    this._clip.hide()
                }
            };
            f.setEasingDirection = function(h) {
                return this._clip.setEasingDirection(h)
            };
            f.on = function() {
                this._clip.on.apply(this._clip, arguments)
            };
            f.off = function() {
                this._clip.off.apply(this._clip, arguments)
            };
            f.trigger = function() {
                this._clip.trigger.apply(this._clip, arguments)
            };
            f.getCurrentTime = function() {
                return this._currentTime
            };
            f.setCurrentTime = function(i, h) {
                if (i < 0 || i > this.getDuration()) {
                    this._clip.inEffect = false;
                    this._applyFill(i)
                } else {
                    this._clip.inEffect = true;
                    this._clip.setCurrentTime(i, h)
                }
            };
            f.getDuration = function() {
                return this._clip.getDuration()
            };
            f.getStartDelay = function() {
                return this._startDelay
            };
            f.setStartDelay = function(h) {
                if (b.isNum(h)) {
                    this._startDelay = h
                }
            };
            f.getLoop = function() {
                return this._loop
            };
            f.setLoop = function(h) {
                this._loop = !! h
            };
            f.getFill = function() {
                return this._fill
            };
            f.setFill = function(i) {
                var h = g.FILL_MODES;
                if (h.indexOf(i.toLowerCase()) !== -1) {
                    this._fill = i
                }
            };
            d.exports = g
        }, {
            "../vendor/utils": 24
        }
    ],
    16: [
        function(c, d, b) {
            var g = c("./BaseClip");

            function a(j, i, h) {
                if (typeof j === "object") {
                    h = j;
                    j = h.duration;
                    i = h.props
                }
                g.call(this, j, h);
                this.props = i || [];
                this._initializePropEasing();
                this._lastComputedTime = 0;
                this._easingDirection = 1
            }
            a.create = function(h) {
                return new a(h.duration, h.props)
            };
            a.validate = function(h) {
                return (Array.isArray(h.props) && h.props.length > 0)
            };
            a.DEFAULT_EASING = "linear";
            var f = a.prototype = new g();
            f._initializePropEasing = function() {
                this.props.forEach(function(h) {
                    h.easing = this._createEasing(h.easing || g.DEFAULT_EASING)
                }.bind(this))
            };
            f.setEasingDirection = function(h) {
                this._easingDirection = h
            };
            f.update = function(k) {
                var i = (this._easingDirection === -1);
                if (this.options.reverseEase !== true) {
                    i = false
                }
                var j = this.getDuration(),
                    h = {};
                if (this.props.length < 1) {
                    return
                }
                this.props.forEach(function(n) {
                    var m;
                    var l = n.property;
                    if (i) {
                        m = n.easing(this.getDuration() - k, n.to, -(n.to - n.from), j)
                    } else {
                        m = n.easing(k, n.from, (n.to - n.from), j)
                    }
                    h[l] = m
                }.bind(this));
                this.trigger("tween_update", h)
            };
            f.getCurrentTime = function() {
                return this._currentTime
            };
            f.setCurrentTime = function(h) {
                if (h < 0) {
                    h = 0
                }
                if (h > this.getDuration()) {
                    h = this.getDuration()
                }
                if (h < 0 || h > this.getDuration()) {
                    return
                }
                this._currentTime = h;
                this.update(this._currentTime)
            };
            d.exports = a
        }, {
            "./BaseClip": 12
        }
    ],
    17: [
        function(c, d, b) {
            var a = c("../adapters/MediaAsClip");

            function f(h, g) {
                if (console) {
                    console.warn("VideoClip deprecated, please use adapters/MediaAsClip.")
                }
                return new a(h, g)
            }
            d.exports = f
        }, {
            "../adapters/MediaAsClip": 9
        }
    ],
    18: [
        function(c, d, a) {
            if (typeof Object.defineProperties !== "function") {
                return
            }
            var h = c("ac-event-emitter").EventEmitter;
            var i = c("../Clock");
            var b = c("../vendor/utils");

            function g() {
                var j = [].slice.call(arguments);
                this._mediaElements = j.filter(this._validateMediaElements);
                this._clock = new i()
            }
            var f = g.prototype = new h();
            f.addEventListener = f.on;
            f.removeEventListener = f.off;
            f._validateMediaElements = function(j) {
                return (typeof j.play === "function") && (typeof j.pause === "function")
            };
            f._updateCurrentTime = function(j) {
                this._lastTime = this._clock.currentTime;
                this._mediaElements.forEach(function(k) {
                    k.currentTime = j
                })
            };
            f._isValidTime = function(j) {
                return (0 <= j) && (j <= this.duration)
            };
            f.play = function() {
                this.paused = false;
                this._clock.play();
                b.invoke(this._mediaElements, "play");
                this.trigger("play")
            };
            f.pause = function() {
                this.paused = true;
                this._clock.pause();
                b.invoke(this._mediaElements, "pause");
                this.trigger("pause")
            };
            Object.defineProperties(g.prototype, {
                paused: {
                    get: function() {
                        return this._paused
                    },
                    set: function(j) {
                        this._paused = !! j
                    }
                },
                currentTime: {
                    get: function() {
                        return this._clock.getCurrentTime()
                    },
                    set: function(j) {
                        if (this._isValidTime(j)) {
                            this.trigger("seeking", {
                                time: j
                            });
                            this._updateCurrentTime(j);
                            this.trigger("seeked", {
                                time: j
                            })
                        }
                    }
                },
                playbackRate: {
                    get: function() {
                        return this._clock.getPlaybackRate()
                    },
                    set: function(j) {
                        if (!b.isNum(j)) {
                            return
                        }
                        this._clock.setPlaybackRate(j);
                        this._mediaElements.forEach(function(k) {
                            k.playbackRate = j
                        });
                        this.trigger("ratechange", {
                            rate: j
                        })
                    }
                },
                duration: {
                    get: function() {
                        return this._duration
                    },
                    set: function(j) {
                        this._duration = j
                    }
                }
            });
            d.exports = g
        }, {
            "../Clock": 5,
            "../vendor/utils": 24,
            "ac-event-emitter": false
        }
    ],
    19: [
        function(b, d, a) {
            var h = b("ac-event-emitter").EventEmitter;
            var c = b("../PlayerMonitor");

            function f(k, i, j) {
                j = j || {};
                this._player = k;
                this._monitor = new c(this._player, j);
                this._monitor.on("ready", this._initPauses.bind(this, i));
                this._previousPauseIndex = 0;
                this._player.addEventListener("play", this._exitPause.bind(this), false)
            }
            var g = f.prototype = new h();
            g._initPauses = function(i) {
                this._pauses = this._processPauses(i);
                this._attachPauses(this._pauses)
            };
            g._processPauses = function(i) {
                i = i.filter(function(j) {
                    return (0 < j) && (j < this._player.duration)
                }.bind(this));
                i = i.sort(function(k, j) {
                    return k - j
                });
                if (i[0] !== 0) {
                    i.unshift(0)
                }
                if (i[i.length - 1] !== this._player.duration) {
                    i.push(this._player.duration)
                }
                return i
            };
            g._attachPauses = function(i) {
                i.forEach(function(j) {
                    this._monitor.addTime(j, this._enterPause.bind(this))
                }.bind(this))
            };
            g._enterPause = function(l) {
                var j = l.requested;
                var i = this._previousPauseIndex;
                var k = this._pauses.indexOf(j);
                if (i === k) {
                    return
                }
                this._atPausePoint = true;
                this._player.pause();
                this._player.currentTime = j;
                this.trigger("pauseenter", {
                    from: i,
                    to: k
                });
                this._previousPauseIndex = k
            };
            g._exitPause = function() {
                var k = this._player.currentTime;
                var j = this._forwards();
                var l = j && k === this._player.duration;
                var i = !j && k === 0;
                if (this._atPausePoint && !(l || i)) {
                    this._atPausePoint = false;
                    this.trigger("pauseexit", {
                        from: this._previousPauseIndex,
                        to: this._calcNextPauseIndex()
                    })
                }
            };
            g._forwards = function() {
                return this._player.playbackRate > 0
            };
            g._calcNextPauseIndex = function() {
                var i = this._previousPauseIndex;
                var j = this._forwards();
                return i + ((j) ? 1 : -1)
            };
            d.exports = f
        }, {
            "../PlayerMonitor": 6,
            "ac-event-emitter": false
        }
    ],
    20: [
        function(d, f, b) {
            var h = d("ac-event-emitter").EventEmitter;
            var i = d("../Clock");
            var c = d("../adapters/PlayerAsMedia");

            function a(k, j) {
                j = j || {};
                if (!k) {
                    throw new TypeError("BasicPlayer: Invalid clip provided", k)
                }
                this._clip = k;
                this._paused = true;
                this.setClock(j.clock || new i());
                window.setTimeout(this._triggerStart.bind(this), 0)
            }
            var g = a.prototype = new h();
            g.addEventListener = g.on;
            g.removeEventListener = g.off;
            g.play = function() {
                this._paused = false;
                this._clock.play();
                this._update();
                this.trigger("play")
            };
            g.pause = function() {
                this.setPaused(true);
                this._clock.pause();
                this.trigger("pause")
            };
            g._triggerStart = function() {
                this.trigger("canplay");
                this.trigger("canplaythrough")
            };
            g._updateCurrentTime = function(j) {
                this._clock.setCurrentTime(j);
                this._lastTime = this._clip.setCurrentTime(j)
            };
            g._update = function() {
                var m = this._clock.getCurrentTime();
                var n = this.getDuration();
                var l = this._clock.getPlaybackRate();
                var k = l > 0;
                var o = k && m >= n;
                var j = !k && m <= 0;
                if (o || j) {
                    m = (o) ? n : 0;
                    this.pause();
                    this._updateCurrentTime(m)
                }
                this.trigger("timeupdate", {
                    previous: this._lastTime,
                    time: m
                });
                if (o) {
                    this.trigger("ended")
                }
                if (j) {
                    this.trigger("returned")
                }
                if (!this.isPaused()) {
                    this._updateCurrentTime(m);
                    window.requestAnimationFrame(this._update.bind(this))
                }
            };
            g._isValidTime = function(j) {
                return (0 <= j) && (j <= this.getDuration())
            };
            g.asMedia = function() {
                return new c(this)
            };
            g.isPaused = function() {
                return this._paused
            };
            g.setPaused = function(j) {
                this._paused = !! j
            };
            g.getCurrentTime = function() {
                return this._clock.getCurrentTime()
            };
            g.setCurrentTime = function(j) {
                if (this._isValidTime(j)) {
                    this.trigger("seeking", {
                        time: j
                    });
                    this._updateCurrentTime(j);
                    this.trigger("seeked", {
                        time: j
                    })
                }
            };
            g.getPlaybackRate = function() {
                return this._clock.getPlaybackRate()
            };
            g.setPlaybackRate = function(j) {
                this._clock.setPlaybackRate(j);
                this.trigger("ratechange", {
                    rate: j
                })
            };
            g.getDuration = function() {
                return this._clip.getDuration()
            };
            g.setClock = function(j) {
                this._clock = j
            };
            g.getClock = function() {
                return this._clock
            };
            f.exports = a
        }, {
            "../Clock": 5,
            "../adapters/PlayerAsMedia": 10,
            "ac-event-emitter": false
        }
    ],
    21: [
        function(d, f, c) {
            var b = d("./BasicPlayer");

            function a(h, g) {
                var i = new b(h, g);
                if (console) {
                    console.warn("MediaPlayer module deprecated, please use adapters/PlayerAsMedia or #toMedia method on instances of BasicPlayer")
                }
                return i.asMedia()
            }
            f.exports = a
        }, {
            "./BasicPlayer": 20
        }
    ],
    22: [
        function(q, d, J) {
            var w = {
                linear: function E(N, L, M, K) {
                    return M * N / K + L
                },
                easeInQuad: function n(N, L, M, K) {
                    return M * (N /= K) * N + L
                },
                easeOutQuad: function b(N, L, M, K) {
                    return -M * (N /= K) * (N - 2) + L
                },
                easeInOutQuad: function x(N, L, M, K) {
                    if ((N /= K / 2) < 1) {
                        return M / 2 * N * N + L
                    }
                    return -M / 2 * ((--N) * (N - 2) - 1) + L
                },
                easeInCubic: function t(N, L, M, K) {
                    return M * (N /= K) * N * N + L
                },
                easeOutCubic: function i(N, L, M, K) {
                    return M * ((N = N / K - 1) * N * N + 1) + L
                },
                easeInOutCubic: function h(N, L, M, K) {
                    if ((N /= K / 2) < 1) {
                        return M / 2 * N * N * N + L
                    }
                    return M / 2 * ((N -= 2) * N * N + 2) + L
                },
                easeInQuart: function j(N, L, M, K) {
                    return M * (N /= K) * N * N * N + L
                },
                easeOutQuart: function I(N, L, M, K) {
                    return -M * ((N = N / K - 1) * N * N * N - 1) + L
                },
                easeInOutQuart: function G(N, L, M, K) {
                    if ((N /= K / 2) < 1) {
                        return M / 2 * N * N * N * N + L
                    }
                    return -M / 2 * ((N -= 2) * N * N * N - 2) + L
                },
                easeInQuint: function m(N, L, M, K) {
                    return M * (N /= K) * N * N * N * N + L
                },
                easeOutQuint: function a(N, L, M, K) {
                    return M * ((N = N / K - 1) * N * N * N * N + 1) + L
                },
                easeInOutQuint: function H(N, L, M, K) {
                    if ((N /= K / 2) < 1) {
                        return M / 2 * N * N * N * N * N + L
                    }
                    return M / 2 * ((N -= 2) * N * N * N * N + 2) + L
                },
                easeInSine: function r(N, L, M, K) {
                    return -M * Math.cos(N / K * (Math.PI / 2)) + M + L
                },
                easeOutSine: function f(N, L, M, K) {
                    return M * Math.sin(N / K * (Math.PI / 2)) + L
                },
                easeInOutSine: function A(N, L, M, K) {
                    return -M / 2 * (Math.cos(Math.PI * N / K) - 1) + L
                },
                easeInExpo: function c(N, L, M, K) {
                    return (N === 0) ? L : M * Math.pow(2, 10 * (N / K - 1)) + L
                },
                easeOutExpo: function D(N, L, M, K) {
                    return (N === K) ? L + M : M * (-Math.pow(2, -10 * N / K) + 1) + L
                },
                easeInOutExpo: function p(N, L, M, K) {
                    if (N === 0) {
                        return L
                    }
                    if (N === K) {
                        return L + M
                    }
                    if ((N /= K / 2) < 1) {
                        return M / 2 * Math.pow(2, 10 * (N - 1)) + L
                    }
                    return M / 2 * (-Math.pow(2, -10 * --N) + 2) + L
                },
                easeInCirc: function s(N, L, M, K) {
                    return -M * (Math.sqrt(1 - (N /= K) * N) - 1) + L
                },
                easeOutCirc: function g(N, L, M, K) {
                    return M * Math.sqrt(1 - (N = N / K - 1) * N) + L
                },
                easeInOutCirc: function B(N, L, M, K) {
                    if ((N /= K / 2) < 1) {
                        return -M / 2 * (Math.sqrt(1 - N * N) - 1) + L
                    }
                    return M / 2 * (Math.sqrt(1 - (N -= 2) * N) + 1) + L
                },
                easeInElastic: function z(O, Q, M, P) {
                    var L = 1.70158;
                    var N = 0;
                    var K = M;
                    if (O === 0) {
                        return Q
                    }
                    if ((O /= P) === 1) {
                        return Q + M
                    }
                    if (!N) {
                        N = P * 0.3
                    }
                    if (K < Math.abs(M)) {
                        K = M;
                        L = N / 4
                    } else {
                        L = N / (2 * Math.PI) * Math.asin(M / K)
                    }
                    return -(K * Math.pow(2, 10 * (O -= 1)) * Math.sin((O * P - L) * (2 * Math.PI) / N)) + Q
                },
                easeOutElastic: function y(O, Q, M, P) {
                    var L = 1.70158;
                    var N = 0;
                    var K = M;
                    if (O === 0) {
                        return Q
                    }
                    if ((O /= P) === 1) {
                        return Q + M
                    }
                    if (!N) {
                        N = P * 0.3
                    }
                    if (K < Math.abs(M)) {
                        K = M;
                        L = N / 4
                    } else {
                        L = N / (2 * Math.PI) * Math.asin(M / K)
                    }
                    return K * Math.pow(2, -10 * O) * Math.sin((O * P - L) * (2 * Math.PI) / N) + M + Q
                },
                easeInOutElastic: function C(O, Q, M, P) {
                    var L = 1.70158;
                    var N = 0;
                    var K = M;
                    if (O === 0) {
                        return Q
                    }
                    if ((O /= P / 2) === 2) {
                        return Q + M
                    }
                    if (!N) {
                        N = P * (0.3 * 1.5)
                    }
                    if (K < Math.abs(M)) {
                        K = M;
                        L = N / 4
                    } else {
                        L = N / (2 * Math.PI) * Math.asin(M / K)
                    } if (O < 1) {
                        return -0.5 * (K * Math.pow(2, 10 * (O -= 1)) * Math.sin((O * P - L) * (2 * Math.PI) / N)) + Q
                    }
                    return K * Math.pow(2, -10 * (O -= 1)) * Math.sin((O * P - L) * (2 * Math.PI) / N) * 0.5 + M + Q
                },
                easeInBack: function v(N, K, M, O, L) {
                    if (L === undefined) {
                        L = 1.70158
                    }
                    return M * (N /= O) * N * ((L + 1) * N - L) + K
                },
                easeOutBack: function l(N, K, M, O, L) {
                    if (L === undefined) {
                        L = 1.70158
                    }
                    return M * ((N = N / O - 1) * N * ((L + 1) * N + L) + 1) + K
                },
                easeInOutBack: function F(N, K, M, O, L) {
                    if (L === undefined) {
                        L = 1.70158
                    }
                    if ((N /= O / 2) < 1) {
                        return M / 2 * (N * N * (((L *= (1.525)) + 1) * N - L)) + K
                    }
                    return M / 2 * ((N -= 2) * N * (((L *= (1.525)) + 1) * N + L) + 2) + K
                },
                easeInBounce: function u(N, L, M, K) {
                    return M - w.easeOutBounce(K - N, 0, M, K) + L
                },
                easeOutBounce: function k(N, L, M, K) {
                    if ((N /= K) < (1 / 2.75)) {
                        return M * (7.5625 * N * N) + L
                    } else {
                        if (N < (2 / 2.75)) {
                            return M * (7.5625 * (N -= (1.5 / 2.75)) * N + 0.75) + L
                        } else {
                            if (N < (2.5 / 2.75)) {
                                return M * (7.5625 * (N -= (2.25 / 2.75)) * N + 0.9375) + L
                            } else {
                                return M * (7.5625 * (N -= (2.625 / 2.75)) * N + 0.984375) + L
                            }
                        }
                    }
                },
                easeInOutBounce: function o(N, L, M, K) {
                    if (N < K / 2) {
                        return w.easeInBounce(N * 2, 0, M, K) * 0.5 + L
                    }
                    return w.easeOutBounce(N * 2 - K, 0, M, K) * 0.5 + M * 0.5 + L
                }
            };
            d.exports = w
        }, {}
    ],
    23: [
        function(b, c, a) {
            /*! MIT License
             *
             * KeySpline - use bezier curve for transition easing function
             * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
             *
             * Permission is hereby granted, free of charge, to any person obtaining a
             * copy of this software and associated documentation files (the "Software"),
             * to deal in the Software without restriction, including without limitation
             * the rights to use, copy, modify, merge, publish, distribute, sublicense,
             * and/or sell copies of the Software, and to permit persons to whom the
             * Software is furnished to do so, subject to the following conditions:
             *
             * The above copyright notice and this permission notice shall be included in
             * all copies or substantial portions of the Software.
             *
             * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
             * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
             * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
             * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
             * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
             * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
             * DEALINGS IN THE SOFTWARE.
             */
            ;

            function d(o, l, n, j) {
                this.get = function(p) {
                    if (o === l && n === j) {
                        return p
                    }
                    return g(k(p), l, j)
                };

                function i(p, q) {
                    return 1 - 3 * q + 3 * p
                }

                function h(p, q) {
                    return 3 * q - 6 * p
                }

                function f(p) {
                    return 3 * p
                }

                function g(r, p, q) {
                    return ((i(p, q) * r + h(p, q)) * r + f(p)) * r
                }

                function m(r, p, q) {
                    return 3 * i(p, q) * r * r + 2 * h(p, q) * r + f(p)
                }

                function k(s) {
                    var q = s;
                    for (var r = 0; r < 4; ++r) {
                        var t = m(q, o, n);
                        if (t === 0) {
                            return q
                        }
                        var p = g(q, o, n) - s;
                        q -= p / t
                    }
                    return q
                }
            }
            c.exports = d
        }, {}
    ],
    24: [
        function(b, c, a) {
            c.exports = {
                isNum: function(d) {
                    return typeof d === "number"
                },
                isArray: function(f) {
                    var d = Object.prototype.toString;
                    return d.call(f) === "[object Array]"
                },
                addClass: function(d, f) {
                    d.classList.add(f)
                },
                removeClass: function(d, f) {
                    d.classList.remove(f)
                },
                hasClass: function(d, f) {
                    return d.contains(f)
                },
                defaults: function(g, f) {
                    var d = {};
                    f = f || {};
                    for (var h in g) {
                        if (g.hasOwnProperty(h)) {
                            d[h] = (f[h] != null) ? f[h] : g[h]
                        }
                    }
                    return d
                },
                defaultProps: function(h, g, d) {
                    var f = this.defaults(g, d);
                    for (var i in f) {
                        if (f.hasOwnProperty(i)) {
                            h[i] = f[i]
                        }
                    }
                },
                invoke: function(g, d) {
                    var f = [].slice.call(arguments, 2);
                    if (!Array.isArray(g)) {
                        throw new Error("List is not an array")
                    }
                    g.forEach(function(h) {
                        var i = h[d];
                        if (i && typeof i === "function") {
                            i.apply(h, f)
                        }
                    })
                }
            }
        }, {}
    ],
    25: [
        function(b, c, a) {
            c.exports.AssetLoader = b("./ac-asset-loader/AssetLoader")
        }, {
            "./ac-asset-loader/AssetLoader": 26
        }
    ],
    26: [
        function(d, f, a) {
            var h, c = d("ac-deferred").Deferred,
                g = d("ac-event-emitter").EventEmitter;

            function b(j, i) {
                this._assetsToLoad = [].concat(j);
                this._type = i || "img"
            }
            h = b.prototype = new g();
            b.prototype.constructor = b;
            h.load = function() {
                this._assetsLoaded = [];
                this._assetsCountLoaded = 0;
                this._defer = new c();
                this._failure = false;
                this._assetsToLoad.forEach(this._loadAsset.bind(this));
                return this._defer.promise()
            };
            h._progress = function(j, i) {
                this._assetsLoaded[j] = i;
                this.trigger("progress", i);
                this._assetsCountLoaded += 1;
                if (this._assetsCountLoaded === this._assetsToLoad.length) {
                    this._defer.resolve(this._assetsLoaded)
                }
            };
            h._error = function(i) {
                this._failure = true;
                this._defer.reject(i.target)
            };
            h._loadAsset = function(j, k) {
                var i;
                if (!this._failure) {
                    i = document.createElement(this._type);
                    i.onload = this._progress.bind(this, k, i);
                    i.onerror = this._error.bind(this);
                    i.src = j
                }
            };
            f.exports = b
        }, {
            "ac-event-emitter": false
        }
    ],
    27: [
        function(c, d, b) {
            var g = c("./ac-clock/Clock"),
                f = c("./ac-clock/ThrottledClock"),
                a = c("./ac-clock/sharedClockInstance");
            a.Clock = g;
            a.ThrottledClock = f;
            d.exports = a
        }, {
            "./ac-clock/Clock": 28,
            "./ac-clock/ThrottledClock": 29,
            "./ac-clock/sharedClockInstance": 30
        }
    ],
    28: [
        function(c, d, b) {
            var g;
            var f = c("ac-event-emitter").EventEmitter;
            var a = new Date().getTime();

            function h() {
                f.call(this);
                this.lastFrameTime = null;
                this._animationFrame = null;
                this._active = false;
                this._startTime = null;
                this._boundOnAnimationFrame = this._onAnimationFrame.bind(this);
                this._getTime = Date.now || function() {
                    return new Date().getTime()
                }
            }
            g = h.prototype = new f(null);
            g.start = function() {
                if (this._active) {
                    return
                }
                this._tick()
            };
            g.stop = function() {
                if (this._active) {
                    window.cancelAnimationFrame(this._animationFrame)
                }
                this._animationFrame = null;
                this.lastFrameTime = null;
                this._active = false
            };
            g.destroy = function() {
                this.stop();
                this.off();
                var j;
                for (j in this) {
                    if (this.hasOwnProperty(j)) {
                        this[j] = null
                    }
                }
            };
            g.isRunning = function() {
                return this._active
            };
            g._tick = function() {
                if (!this._active) {
                    this._active = true
                }
                this._animationFrame = window.requestAnimationFrame(this._boundOnAnimationFrame)
            };
            g._onAnimationFrame = function(l) {
                var m = 0;
                var i = this._getTime();
                if (this.lastFrameTime === null) {
                    this.lastFrameTime = i - a
                } else {
                    m = l - this.lastFrameTime
                }
                var k = 0,
                    j;
                if (m !== 0) {
                    k = 1000 / m
                }
                j = {
                    time: l,
                    delta: m,
                    fps: k,
                    naturalFps: k,
                    timeNow: i
                };
                this.trigger("update", j);
                this.trigger("draw", j);
                this._animationFrame = null;
                this.lastFrameTime = l;
                if (this._active !== false) {
                    this._tick()
                } else {
                    this.lastFrameTime = null
                }
            };
            d.exports = h
        }, {
            "ac-event-emitter": false
        }
    ],
    29: [
        function(c, d, b) {
            var g;
            var a = c("./sharedClockInstance"),
                f = c("ac-event-emitter").EventEmitter;

            function h(j, i) {
                if (j === null) {
                    return
                }
                f.call(this);
                i = i || {};
                this._fps = j || null;
                this._clock = i.clock || a;
                this._lastThrottledTime = null;
                this._clockEvent = null;
                this._clock.on("update", this._onClockUpdate, this)
            }
            g = h.prototype = new f(null);
            g.setFps = function(i) {
                this._fps = i;
                return this
            };
            g.getFps = function() {
                return this._fps
            };
            g.start = function() {
                this._clock.start();
                return this
            };
            g.stop = function() {
                this._clock.stop();
                return this
            };
            g.isRunning = function() {
                return this._clock.isRunning()
            };
            g.destroy = function() {
                this._clock.off("update", this._onClockUpdate, this);
                this._clock.destroy.call(this)
            };
            g._onClockUpdate = function(i) {
                if (this._lastThrottledTime === null) {
                    this._lastThrottledTime = this._clock.lastFrameTime
                }
                var j = i.time - this._lastThrottledTime;
                if (!this._fps) {
                    throw new TypeError("FPS is not defined.")
                }
                if (j < (1000 / this._fps)) {
                    return
                }
                this._clockEvent = i;
                this._clockEvent.delta = j;
                this._clockEvent.fps = 1000 / j;
                this._lastThrottledTime = this._clockEvent.time;
                this._clock.once("draw", this._onClockDraw, this);
                this.trigger("update", this._clockEvent)
            };
            g._onClockDraw = function() {
                this.trigger("draw", this._clockEvent)
            };
            d.exports = h
        }, {
            "./sharedClockInstance": 30,
            "ac-event-emitter": false
        }
    ],
    30: [
        function(b, c, a) {
            var d = b("./Clock");
            c.exports = new d()
        }, {
            "./Clock": 28
        }
    ],
    31: [
        function(b, c, a) {
            c.exports.DOMEmitter = b("./ac-dom-emitter/DOMEmitter")
        }, {
            "./ac-dom-emitter/DOMEmitter": 32
        }
    ],
    32: [
        function(b, c, a) {
            var g;
            var f = b("ac-event-emitter").EventEmitter;
            var d = "dom-emitter";

            function h(i) {
                if (i === null) {
                    return
                }
                this.el = i;
                this._bindings = {};
                this._eventEmitter = new f()
            }
            g = h.prototype;
            g._parseEventNames = function(i) {
                if (!i) {
                    return [i]
                }
                return i.split(" ")
            };
            g._onListenerEvent = function(j, i) {
                this.trigger(j, i, false)
            };
            g._setListener = function(i) {
                this._bindings[i] = this._onListenerEvent.bind(this, i);
                this._addEventListener(i, this._bindings[i])
            };
            g._removeListener = function(i) {
                this._removeEventListener(i, this._bindings[i]);
                delete this._bindings[i]
            };
            g._addEventListener = function(j, k, i) {
                if (this.el.addEventListener) {
                    this.el.addEventListener(j, k, i)
                } else {
                    if (this.el.attachEvent) {
                        this.el.attachEvent("on" + j, k)
                    } else {
                        target["on" + j] = k
                    }
                }
                return this
            };
            g._removeEventListener = function(j, k, i) {
                if (this.el.removeEventListener) {
                    this.el.removeEventListener(j, k, i)
                } else {
                    this.el.detachEvent("on" + j, k)
                }
                return this
            };
            g._triggerInternalEvent = function(i, j) {
                this.trigger(d + ":" + i, j)
            };
            g.on = function(i, k, j) {
                i = this._parseEventNames(i);
                i.forEach(function(n, m, l) {
                    if (!this.has(l)) {
                        this._setListener(l)
                    }
                    this._triggerInternalEvent("willon", {
                        evt: l,
                        callback: n,
                        context: m
                    });
                    this._eventEmitter.on(l, n, m);
                    this._triggerInternalEvent("didon", {
                        evt: l,
                        callback: n,
                        context: m
                    })
                }.bind(this, k, j));
                return this
            };
            g.off = function(i, l, k) {
                var j = Array.prototype.slice.call(arguments, 0);
                i = this._parseEventNames(i);
                i.forEach(function(q, p, n, m) {
                    if (n.length === 0) {
                        this._eventEmitter.off();
                        var o;
                        for (o in this._bindings) {
                            if (this._bindings.hasOwnProperty(o)) {
                                this._removeListener(o)
                            }
                        }
                        return
                    }
                    this._triggerInternalEvent("willoff", {
                        evt: m,
                        callback: q,
                        context: p
                    });
                    this._eventEmitter.off(m, q, p);
                    this._triggerInternalEvent("didoff", {
                        evt: m,
                        callback: q,
                        context: p
                    });
                    if (!this.has(m)) {
                        this._removeListener(m)
                    }
                }.bind(this, l, k, j));
                return this
            };
            g.once = function(i, k, j) {
                i = this._parseEventNames(i);
                i.forEach(function(n, m, l) {
                    if (!this.has(l)) {
                        this._setListener(l)
                    }
                    this._triggerInternalEvent("willonce", {
                        evt: l,
                        callback: n,
                        context: m
                    });
                    this._eventEmitter.once.call(this, l, n, m);
                    this._triggerInternalEvent("didonce", {
                        evt: l,
                        callback: n,
                        context: m
                    })
                }.bind(this, k, j));
                return this
            };
            g.has = function(i, k, j) {
                if (this._eventEmitter && this._eventEmitter.has.apply(this._eventEmitter, arguments)) {
                    return true
                }
                return false
            };
            g.trigger = function(i, j, k) {
                i = this._parseEventNames(i);
                i.forEach(function(m, n, l) {
                    this._eventEmitter.trigger(l, m, n)
                }.bind(this, j, k));
                return this
            };
            g.destroy = function() {
                this._triggerInternalEvent("willdestroy");
                this.off();
                this.el = this._eventEmitter = this._bindings = null
            };
            c.exports = h
        }, {
            "ac-event-emitter": false
        }
    ],
    33: [
        function(b, d, a) {
            var c = {};
            c.addEventListener = function(j, h, i, g) {
                if (j.addEventListener) {
                    j.addEventListener(h, i, g)
                } else {
                    if (j.attachEvent) {
                        j.attachEvent("on" + h, i)
                    } else {
                        j["on" + h] = i
                    }
                }
                return j
            };
            c.dispatchEvent = function(h, g) {
                if (document.createEvent) {
                    h.dispatchEvent(new CustomEvent(g))
                } else {
                    h.fireEvent("on" + g, document.createEventObject())
                }
                return h
            };
            c.removeEventListener = function(j, h, i, g) {
                if (j.removeEventListener) {
                    j.removeEventListener(h, i, g)
                } else {
                    j.detachEvent("on" + h, i)
                }
                return j
            };
            var f = /^(webkit|moz|ms|o)/i;
            c.addVendorPrefixEventListener = function(j, h, i, g) {
                if (f.test(h)) {
                    h = h.replace(f, "")
                } else {
                    h = h.charAt(0).toUpperCase() + h.slice(1)
                } if (/WebKit/i.test(window.navigator.userAgent)) {
                    return c.addEventListener(j, "webkit" + h, i, g)
                } else {
                    if (/Opera/i.test(window.navigator.userAgent)) {
                        return c.addEventListener(j, "O" + h, i, g)
                    } else {
                        if (/Gecko/i.test(window.navigator.userAgent)) {
                            return c.addEventListener(j, h.toLowerCase(), i, g)
                        } else {
                            h = h.charAt(0).toLowerCase() + h.slice(1);
                            return c.addEventListener(j, h, i, g)
                        }
                    }
                }
            };
            c.removeVendorPrefixEventListener = function(j, h, i, g) {
                if (f.test(h)) {
                    h = h.replace(f, "")
                } else {
                    h = h.charAt(0).toUpperCase() + h.slice(1)
                }
                c.removeEventListener(j, "webkit" + h, i, g);
                c.removeEventListener(j, "O" + h, i, g);
                c.removeEventListener(j, h.toLowerCase(), i, g);
                h = h.charAt(0).toLowerCase() + h.slice(1);
                return c.removeEventListener(j, h, i, g)
            };
            c.stop = function(g) {
                if (!g) {
                    g = window.event
                }
                if (g.stopPropagation) {
                    g.stopPropagation()
                } else {
                    g.cancelBubble = true
                } if (g.preventDefault) {
                    g.preventDefault()
                }
                g.stopped = true;
                g.returnValue = false
            };
            c.target = function(g) {
                return (typeof g.target !== "undefined") ? g.target : g.srcElement
            };
            d.exports = c
        }, {}
    ],
    34: [
        function(b, c, a) {
            c.exports.Easing = b("./ac-easing/Easing");
            c.exports.Tween = b("./ac-easing/Tween")
        }, {
            "./ac-easing/Easing": 35,
            "./ac-easing/Tween": 36
        }
    ],
    35: [
        function(b, a, c) {
            var i = b("./vendor/KeySpline");
            var h = b("./vendor/EasingFunctions");
            var f = 'Easing function "%TYPE%" not recognized among the following: ' + Object.keys(h).join(", ");
            var k = "Bezier curve expects exactly four (4) numbers. Given: ";
            var j = "Step function expects a numeric value greater than zero. Given: ";
            var d = 'Step function direction must be either "start" or "end" (default). Given: ';
            var g = {
                createPredefined: function(l) {
                    var m;
                    if (l === "step-start") {
                        m = g.createStep(1, "start")
                    } else {
                        if (l === "step-end") {
                            m = g.createStep(1, "end")
                        } else {
                            m = h[l]
                        }
                    } if (!m) {
                        throw new Error(f.replace("%TYPE%", l))
                    }
                    return m
                },
                createBezier: function(m, o, l, n) {
                    var r = Array.prototype.slice.call(arguments);
                    var q;
                    var p;
                    p = r.every(function(s) {
                        return (typeof s === "number")
                    });
                    if (r.length !== 4 || !p) {
                        throw new TypeError(k + r)
                    }
                    q = new i(m, o, l, n);
                    return function(u, s, v, t) {
                        return q.get(u / t) * v + s
                    }
                },
                createStep: function(l, m) {
                    m = m || "end";
                    if (typeof l !== "number" || l < 1) {
                        throw new TypeError(j + l)
                    }
                    if (m !== "start" && m !== "end") {
                        throw new TypeError(d + m)
                    }
                    return function(r, n, s, q) {
                        var p = s / l;
                        var o = Math[(m === "start") ? "floor" : "ceil"](r / q * l);
                        return n + p * o
                    }
                }
            };
            a.exports = g
        }, {
            "./vendor/EasingFunctions": 37,
            "./vendor/KeySpline": 38
        }
    ],
    36: [
        function(c, d, b) {
            var g = c("./Easing");
            var a = "Easing option must be one of: String, Array[Number:4], { steps: Number }, or Function. Given: ";
            var h = function(i) {
                this._defaultProps(i);
                this.setEasing(this.easing)
            };
            h.defaults = {
                from: 0,
                to: 1,
                duration: 1,
                easing: "linear"
            };
            var f = h.prototype;
            f._defaultProps = function(i) {
                var j = h.defaults;
                i = i || {};
                for (var k in j) {
                    this[k] = (i[k] != null) ? i[k] : j[k]
                }
            };
            f.setEasing = function() {
                var i = Array.prototype.slice.call(arguments);
                var j = typeof i[0];
                var k;
                if (j === "string") {
                    k = g.createPredefined(i[0])
                } else {
                    if (Array.isArray(i[0])) {
                        k = g.createBezier(i[0])
                    } else {
                        if (i.length === 4) {
                            k = g.createBezier.apply(g, i)
                        } else {
                            if (j === "object" && i[0].steps) {
                                k = g.createStep(i[0].steps, i[0].direction)
                            } else {
                                if (j === "number" && i.length <= 2) {
                                    k = g.createStep.apply(g, i)
                                } else {
                                    if (j === "function") {
                                        k = i[0]
                                    } else {
                                        throw new TypeError(a + i)
                                    }
                                }
                            }
                        }
                    }
                }
                return this._easingFunction = k
            };
            f.valueAtLocation = function(j) {
                if (j < 0 || j > 1) {
                    return null
                }
                var i = this.duration * j;
                return this.valueAtTime(i)
            };
            f.valueAtPercent = function(i) {
                if (i < 0 || i > 100) {
                    return null
                }
                return this.valueAtLocation(i / 100)
            };
            f.valueAtTime = function(i) {
                if (i < 0 || i > this.duration) {
                    return null
                }
                return this._easingFunction(i, this.from, this.to - this.from, this.duration)
            };
            d.exports = h
        }, {
            "./Easing": 35
        }
    ],
    37: [
        function(c, f, b) {
            var g = {
                linear: function(j, h, k, i) {
                    return k * j / i + h
                },
                easeInQuad: function(j, h, k, i) {
                    return k * (j /= i) * j + h
                },
                easeOutQuad: function(j, h, k, i) {
                    return -k * (j /= i) * (j - 2) + h
                },
                easeInOutQuad: function(j, h, k, i) {
                    if ((j /= i / 2) < 1) {
                        return k / 2 * j * j + h
                    }
                    return -k / 2 * ((--j) * (j - 2) - 1) + h
                },
                easeInCubic: function(j, h, k, i) {
                    return k * (j /= i) * j * j + h
                },
                easeOutCubic: function(j, h, k, i) {
                    return k * ((j = j / i - 1) * j * j + 1) + h
                },
                easeInOutCubic: function(j, h, k, i) {
                    if ((j /= i / 2) < 1) {
                        return k / 2 * j * j * j + h
                    }
                    return k / 2 * ((j -= 2) * j * j + 2) + h
                },
                easeInQuart: function(j, h, k, i) {
                    return k * (j /= i) * j * j * j + h
                },
                easeOutQuart: function(j, h, k, i) {
                    return -k * ((j = j / i - 1) * j * j * j - 1) + h
                },
                easeInOutQuart: function(j, h, k, i) {
                    if ((j /= i / 2) < 1) {
                        return k / 2 * j * j * j * j + h
                    }
                    return -k / 2 * ((j -= 2) * j * j * j - 2) + h
                },
                easeInQuint: function(j, h, k, i) {
                    return k * (j /= i) * j * j * j * j + h
                },
                easeOutQuint: function(j, h, k, i) {
                    return k * ((j = j / i - 1) * j * j * j * j + 1) + h
                },
                easeInOutQuint: function(j, h, k, i) {
                    if ((j /= i / 2) < 1) {
                        return k / 2 * j * j * j * j * j + h
                    }
                    return k / 2 * ((j -= 2) * j * j * j * j + 2) + h
                },
                easeInSine: function(j, h, k, i) {
                    return -k * Math.cos(j / i * (Math.PI / 2)) + k + h
                },
                easeOutSine: function(j, h, k, i) {
                    return k * Math.sin(j / i * (Math.PI / 2)) + h
                },
                easeInOutSine: function(j, h, k, i) {
                    return -k / 2 * (Math.cos(Math.PI * j / i) - 1) + h
                },
                easeInExpo: function(j, h, k, i) {
                    return (j == 0) ? h : k * Math.pow(2, 10 * (j / i - 1)) + h
                },
                easeOutExpo: function(j, h, k, i) {
                    return (j == i) ? h + k : k * (-Math.pow(2, -10 * j / i) + 1) + h
                },
                easeInOutExpo: function(j, h, k, i) {
                    if (j == 0) {
                        return h
                    }
                    if (j == i) {
                        return h + k
                    }
                    if ((j /= i / 2) < 1) {
                        return k / 2 * Math.pow(2, 10 * (j - 1)) + h
                    }
                    return k / 2 * (-Math.pow(2, -10 * --j) + 2) + h
                },
                easeInCirc: function(j, h, k, i) {
                    return -k * (Math.sqrt(1 - (j /= i) * j) - 1) + h
                },
                easeOutCirc: function(j, h, k, i) {
                    return k * Math.sqrt(1 - (j = j / i - 1) * j) + h
                },
                easeInOutCirc: function(j, h, k, i) {
                    if ((j /= i / 2) < 1) {
                        return -k / 2 * (Math.sqrt(1 - j * j) - 1) + h
                    }
                    return k / 2 * (Math.sqrt(1 - (j -= 2) * j) + 1) + h
                },
                easeInElastic: function(l, j, n, k) {
                    var h = 1.70158;
                    var m = 0;
                    var i = n;
                    if (l == 0) {
                        return j
                    }
                    if ((l /= k) == 1) {
                        return j + n
                    }
                    if (!m) {
                        m = k * 0.3
                    }
                    if (i < Math.abs(n)) {
                        i = n;
                        h = m / 4
                    } else {
                        h = m / (2 * Math.PI) * Math.asin(n / i)
                    }
                    return -(i * Math.pow(2, 10 * (l -= 1)) * Math.sin((l * k - h) * (2 * Math.PI) / m)) + j
                },
                easeOutElastic: function(l, j, n, k) {
                    var h = 1.70158;
                    var m = 0;
                    var i = n;
                    if (l == 0) {
                        return j
                    }
                    if ((l /= k) == 1) {
                        return j + n
                    }
                    if (!m) {
                        m = k * 0.3
                    }
                    if (i < Math.abs(n)) {
                        i = n;
                        h = m / 4
                    } else {
                        h = m / (2 * Math.PI) * Math.asin(n / i)
                    }
                    return i * Math.pow(2, -10 * l) * Math.sin((l * k - h) * (2 * Math.PI) / m) + n + j
                },
                easeInOutElastic: function(l, j, n, k) {
                    var h = 1.70158;
                    var m = 0;
                    var i = n;
                    if (l == 0) {
                        return j
                    }
                    if ((l /= k / 2) == 2) {
                        return j + n
                    }
                    if (!m) {
                        m = k * (0.3 * 1.5)
                    }
                    if (i < Math.abs(n)) {
                        i = n;
                        h = m / 4
                    } else {
                        h = m / (2 * Math.PI) * Math.asin(n / i)
                    } if (l < 1) {
                        return -0.5 * (i * Math.pow(2, 10 * (l -= 1)) * Math.sin((l * k - h) * (2 * Math.PI) / m)) + j
                    }
                    return i * Math.pow(2, -10 * (l -= 1)) * Math.sin((l * k - h) * (2 * Math.PI) / m) * 0.5 + n + j
                },
                easeInBack: function(k, i, l, j, h) {
                    if (h == undefined) {
                        h = 1.70158
                    }
                    return l * (k /= j) * k * ((h + 1) * k - h) + i
                },
                easeOutBack: function(k, i, l, j, h) {
                    if (h == undefined) {
                        h = 1.70158
                    }
                    return l * ((k = k / j - 1) * k * ((h + 1) * k + h) + 1) + i
                },
                easeInOutBack: function(k, i, l, j, h) {
                    if (h == undefined) {
                        h = 1.70158
                    }
                    if ((k /= j / 2) < 1) {
                        return l / 2 * (k * k * (((h *= (1.525)) + 1) * k - h)) + i
                    }
                    return l / 2 * ((k -= 2) * k * (((h *= (1.525)) + 1) * k + h) + 2) + i
                },
                easeInBounce: function(j, h, k, i) {
                    return k - g.easeOutBounce(i - j, 0, k, i) + h
                },
                easeOutBounce: function(j, h, k, i) {
                    if ((j /= i) < (1 / 2.75)) {
                        return k * (7.5625 * j * j) + h
                    } else {
                        if (j < (2 / 2.75)) {
                            return k * (7.5625 * (j -= (1.5 / 2.75)) * j + 0.75) + h
                        } else {
                            if (j < (2.5 / 2.75)) {
                                return k * (7.5625 * (j -= (2.25 / 2.75)) * j + 0.9375) + h
                            } else {
                                return k * (7.5625 * (j -= (2.625 / 2.75)) * j + 0.984375) + h
                            }
                        }
                    }
                },
                easeInOutBounce: function(j, h, k, i) {
                    if (j < i / 2) {
                        return g.easeInBounce(j * 2, 0, k, i) * 0.5 + h
                    }
                    return g.easeOutBounce(j * 2 - i, 0, k, i) * 0.5 + k * 0.5 + h
                }
            };
            var d;
            var a = {
                ease: "easeInOutSine",
                "ease-in": "easeInCubic",
                "ease-out": "easeOutCubic",
                "ease-in-out": "easeInOutCubic"
            };
            for (d in a) {
                g[d] = g[a[d]]
            }
            f.exports = g
        }, {}
    ],
    38: [
        function(b, c, a) {
            c.exports = b(23)
        }, {}
    ],
    39: [
        function(b, c, a) {
            c.exports.WindowDelegate = b("./window-delegate/WindowDelegate");
            c.exports.windowEmitter = b("./window-delegate/windowEmitter")
        }, {
            "./window-delegate/WindowDelegate": 40,
            "./window-delegate/windowEmitter": 41
        }
    ],
    40: [
        function(c, f, a) {
            var g;
            var b = c("./windowEmitter");

            function d() {
                this._emitter = b;
                this._setWindowDimensionValues();
                this._setScrollValues();
                this.on("resize", this._setWindowDimensionValues.bind(this));
                this.on("scroll", this._setScrollValues.bind(this));
                this.on("touchstart", this._touchScrollStart.bind(this));
                this.on("touchend", this._setZoomValues.bind(this))
            }
            g = d.prototype;
            g.on = function() {
                this._emitter.on.apply(this._emitter, arguments);
                return this
            };
            g.once = function() {
                this._emitter.once.apply(this._emitter, arguments);
                return this
            };
            g.off = function() {
                this._emitter.off.apply(this._emitter, arguments);
                return this
            };
            g.has = function() {
                return this._emitter.has.apply(this._emitter, arguments)
            };
            g.trigger = function() {
                this._emitter.trigger.apply(this._emitter, arguments);
                return this
            };
            g.propagateTo = function() {
                this._emitter.propagateTo.apply(this._emitter, arguments);
                return this
            };
            g.stopPropagatingTo = function() {
                this._emitter.stopPropagatingTo.apply(this._emitter, arguments);
                return this
            };
            g.isZoomed = function() {
                return this.clientWidth > this.innerWidth
            };
            g._setWindowDimensionValues = function() {
                this.clientWidth = document.documentElement.clientWidth;
                this.clientHeight = document.documentElement.clientHeight;
                this.innerWidth = window.innerWidth || this.clientWidth;
                this.innerHeight = window.innerHeight || this.clientHeight
            };
            g._setZoomValues = function() {
                var h = this.innerWidth;
                this.innerWidth = window.innerWidth;
                if (h !== this.innerWidth) {
                    this.innerHeight = window.innerHeight;
                    this.trigger("zoom");
                    if (h < this.innerWidth) {
                        this.trigger("zoomIn")
                    } else {
                        this.trigger("zoomOut")
                    }
                } else {
                    setTimeout(this._setZoomValues.bind(this), 500)
                }
            };
            g._updateScrollX = function() {
                this.scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
                this.maxScrollX = document.body.scrollWidth - this.innerWidth;
                return this.scrollX
            };
            g._updateScrollY = function() {
                this.scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                this.maxScrollY = document.body.scrollHeight - this.innerHeight;
                return this.scrollY
            };
            g._setScrollValues = function() {
                var i = this.scrollX,
                    h = this.scrollY;
                this._updateScrollX();
                this._updateScrollY();
                if (this.scrollX !== i) {
                    this.trigger("scrollX")
                }
                if (this.scrollY !== h) {
                    this.trigger("scrollY")
                }
                this._scrollStop()
            };
            g._scrollStop = function() {
                if (typeof window.ontouchstart === "undefined") {
                    if (this._scrollStopTimer) {
                        clearTimeout(this._scrollStopTimer)
                    }
                    this._scrollStopTimer = setTimeout(function() {
                        clearTimeout(this._scrollStopTimer);
                        this.trigger("scrollStop")
                    }.bind(this), 300)
                }
            };
            g._touchScrollStart = function() {
                this._updateScrollX();
                this._updateScrollY();
                this.once("touchend", this._touchScrollStop.bind(this, this.scrollX, this.scrollY))
            };
            g._touchScrollStop = function(i, h, j) {
                this._updateScrollX();
                this._updateScrollY();
                if (i !== this.scrollX || h !== this.scrollY) {
                    setTimeout(this._touchScrollStop.bind(this, this.scrollX, this.scrollY, true), 300)
                } else {
                    if (j) {
                        this.trigger("scrollStop")
                    }
                }
            };
            f.exports = new d()
        }, {
            "./windowEmitter": 41
        }
    ],
    41: [
        function(b, c, a) {
            var d = b("ac-dom-emitter").DOMEmitter;
            c.exports = new d(window)
        }, {
            "ac-dom-emitter": 31
        }
    ],
    42: [
        function(b, c, a) {
            var d = b("./ac-element-tracker/ElementTracker");
            c.exports = new d();
            c.exports.ElementTracker = d
        }, {
            "./ac-element-tracker/ElementTracker": 43
        }
    ],
    43: [
        function(c, b, g) {
            var h;
            var f = c("ac-object");
            var i = c("ac-base").Element;
            var k = c("ac-base").Array;
            var m = c("window-delegate").WindowDelegate;
            var j = c("./TrackedElement");
            var n = c("ac-event-emitter").EventEmitter;
            var d = {
                autoStart: false
            };

            function a(p, o) {
                this.options = f.clone(d);
                this.options = typeof o === "object" ? f.extend(this.options, o) : this.options;
                this.windowDelegate = m;
                this.tracking = false;
                this.elements = [];
                if (p && (Array.isArray(p) || this._isNodeList(p) || i.isElement(p))) {
                    this.addElements(p)
                }
                if (this.options.autoStart) {
                    this.start()
                }
            }
            h = a.prototype = new n();
            var l = /^\[object (HTMLCollection|NodeList|Object)\]$/;
            h._isNodeList = function(o) {
                if (!o) {
                    return false
                }
                if (typeof o.length !== "number") {
                    return false
                }
                if (typeof o[0] === "object" && (!o[0] || !o[0].nodeType)) {
                    return false
                }
                return l.test(Object.prototype.toString.call(o))
            };
            h._registerElements = function(o) {
                o = [].concat(o);
                o.forEach(function(q) {
                    if (this._elementInDOM(q)) {
                        var p = new j(q);
                        p.offsetTop = p.element.offsetTop;
                        this.elements.push(p)
                    }
                }, this)
            };
            h._registerTrackedElements = function(o) {
                var p = [].concat(o);
                p.forEach(function(q) {
                    if (this._elementInDOM(q.element)) {
                        q.offsetTop = q.element.offsetTop;
                        this.elements.push(q)
                    }
                }, this)
            };
            h._elementInDOM = function(q) {
                var p = false;
                var o = document.getElementsByTagName("body")[0];
                if (i.isElement(q) && o.contains(q)) {
                    p = true
                }
                return p
            };
            h._onVPChange = function() {
                this.elements.forEach(function(o) {
                    this.refreshElementState(o)
                }, this)
            };
            h._elementPercentInView = function(o) {
                return o.pixelsInView / o.height
            };
            h._elementPixelsInView = function(p) {
                var s = 0;
                var r = p.top;
                var q = p.bottom;
                var o = this.windowDelegate.innerHeight;
                if (r <= 0 && q >= o) {
                    s = o
                } else {
                    if (r >= 0 && r < o && q > o) {
                        s = o - r
                    } else {
                        if (r < 0 && (q < o && q >= 0)) {
                            s = p.bottom
                        } else {
                            if (r >= 0 && q <= o) {
                                s = p.height
                            }
                        }
                    }
                }
                return s
            };
            h._ifInView = function(o, p) {
                if (!p) {
                    o.trigger("enterview", o)
                }
            };
            h._ifAlreadyInView = function(o) {
                if (!o.inView) {
                    o.trigger("exitview", o)
                }
            };
            h.addElements = function(o) {
                o = this._isNodeList(o) ? k.toArray(o) : [].concat(o);
                o.forEach(function(p) {
                    this.addElement(p)
                }, this)
            };
            h.addElement = function(p) {
                var o;
                if (i.isElement(p)) {
                    o = new j(p);
                    this._registerTrackedElements(o)
                }
                return o
            };
            h.removeElement = function(q) {
                var p = [];
                var o;
                this.elements.forEach(function(r, s) {
                    if (r === q || r.element === q) {
                        p.push(s)
                    }
                });
                o = this.elements.filter(function(s, r) {
                    return p.indexOf(r) < 0 ? true : false
                });
                this.elements = o
            };
            h.stop = function() {
                if (this.tracking === true) {
                    this.tracking = false;
                    this.windowDelegate.off("scroll resize orientationchange", this._onVPChange)
                }
            };
            h.start = function() {
                if (this.tracking === false) {
                    this.tracking = true;
                    this.windowDelegate.on("scroll resize orientationchange", this._onVPChange, this);
                    this.refreshAllElementStates()
                }
            };
            h.refreshAllElementStates = function() {
                this.elements.forEach(function(o) {
                    this.refreshElementState(o)
                }, this)
            };
            h.refreshElementState = function(o) {
                var p = i.getBoundingBox(o.element);
                var q = o.inView;
                o = f.extend(o, p);
                o.pixelsInView = this._elementPixelsInView(o);
                o.percentInView = this._elementPercentInView(o);
                o.inView = o.pixelsInView > 0;
                if (o.inView) {
                    this._ifInView(o, q)
                }
                if (q) {
                    this._ifAlreadyInView(o)
                }
                return o
            };
            b.exports = a
        }, {
            "./TrackedElement": 44,
            "ac-base": false,
            "ac-event-emitter": false,
            "ac-object": 153,
            "window-delegate": 39
        }
    ],
    44: [
        function(b, c, a) {
            var d;
            var g = b("ac-dom-emitter").DOMEmitter;

            function f(h) {
                if (h.nodeType && h.nodeType > 0) {
                    this.element = h
                } else {
                    throw new TypeError("TrackedElement: " + h + " is not a valid DOM element")
                }
                this.inView = false;
                this.percentInView = 0;
                this.pixelsInView = 0;
                this.offsetTop = 0;
                this.top = 0;
                this.right = 0;
                this.bottom = 0;
                this.left = 0;
                this.width = 0;
                this.height = 0;
                g.call(this, h)
            }
            d = f.prototype = new g(null);
            c.exports = f
        }, {
            "ac-dom-emitter": 31
        }
    ],
    45: [
        function(b, d, a) {
            var c = b("./ac-element-engagement/ElementEngagement");
            d.exports = new c();
            d.exports.ElementEngagement = c
        }, {
            "./ac-element-engagement/ElementEngagement": 46
        }
    ],
    46: [
        function(c, b, f) {
            var g;
            var d = c("ac-object");
            var h = c("ac-base").Element;
            var i = c("ac-element-tracker").ElementTracker;
            var k = {
                timeToEngage: 500,
                inViewThreshold: 0.75,
                stopOnEngaged: true
            };
            var j = {
                thresholdEnterTime: 0,
                thresholdExitTime: 0,
                inThreshold: false,
                engaged: false,
                tracking: true
            };
            var a = function() {
                i.call(this)
            };
            g = a.prototype = new i();
            g._decorateTrackedElement = function(m, l) {
                var n;
                n = d.defaults(k, l || {});
                d.extend(m, n);
                d.extend(m, j)
            };
            g._attachElementListeners = function(l) {
                l.on("thresholdenter", this._thresholdEnter, this);
                l.on("thresholdexit", this._thresholdExit, this);
                l.on("enterview", this._enterView, this);
                l.on("exitview", this._exitView, this)
            };
            g._removeElementListeners = function(l) {
                l.off("thresholdenter", this._thresholdEnter);
                l.off("thresholdexit", this._thresholdExit);
                l.off("enterview", this._enterView);
                l.off("exitview", this._exitView)
            };
            g._attachAllElementListeners = function() {
                this.elements.forEach(function(l) {
                    if (!l.stopOnEngaged) {
                        this._attachElementListeners(l)
                    } else {
                        if (!l.engaged) {
                            this._attachElementListeners(l)
                        }
                    }
                }, this)
            };
            g._removeAllElementListeners = function() {
                this.elements.forEach(function(l) {
                    this._removeElementListeners(l)
                }, this)
            };
            g._elementInViewPastThreshold = function(n) {
                var l = this.windowDelegate.innerHeight;
                var m = false;
                if (n.pixelsInView === l) {
                    m = true
                } else {
                    m = (n.percentInView > n.inViewThreshold)
                }
                return m
            };
            g._ifInView = function(l, n) {
                var m = l.inThreshold;
                i.prototype._ifInView.apply(this, arguments);
                if (!m && this._elementInViewPastThreshold(l)) {
                    l.inThreshold = true;
                    l.trigger("thresholdenter", l);
                    if (typeof l.timeToEngage === "number" && l.timeToEngage >= 0) {
                        l.engagedTimeout = window.setTimeout(this._engaged.bind(this, l), l.timeToEngage)
                    }
                }
            };
            g._ifAlreadyInView = function(l) {
                var m = l.inThreshold;
                i.prototype._ifAlreadyInView.apply(this, arguments);
                if (m && !this._elementInViewPastThreshold(l)) {
                    l.inThreshold = false;
                    l.trigger("thresholdexit", l);
                    if (l.engagedTimeout) {
                        window.clearTimeout(l.engagedTimeout);
                        l.engagedTimeout = null
                    }
                }
            };
            g._engaged = function(l) {
                l.engagedTimeout = null;
                this._elementEngaged(l);
                l.trigger("engaged", l);
                this.trigger("engaged", l)
            };
            g._thresholdEnter = function(l) {
                l.thresholdEnterTime = Date.now();
                l.thresholdExitTime = 0;
                this.trigger("thresholdenter", l)
            };
            g._thresholdExit = function(l) {
                l.thresholdExitTime = Date.now();
                this.trigger("thresholdexit", l)
            };
            g._enterView = function(l) {
                this.trigger("enterview", l)
            };
            g._exitView = function(l) {
                this.trigger("exitview", l)
            };
            g._elementEngaged = function(l) {
                l.engaged = true;
                if (l.stopOnEngaged) {
                    this.stop(l)
                }
            };
            g.stop = function(l) {
                if (this.tracking && !l) {
                    this._removeAllElementListeners();
                    i.prototype.stop.call(this)
                }
                if (l && l.tracking) {
                    l.tracking = false;
                    this._removeElementListeners(l)
                }
            };
            g.start = function(l) {
                if (!l) {
                    this._attachAllElementListeners();
                    i.prototype.start.call(this)
                }
                if (l && !l.tracking) {
                    if (!l.stopOnEngaged) {
                        l.tracking = true;
                        this._attachElementListeners(l)
                    } else {
                        if (!l.engaged) {
                            l.tracking = true;
                            this._attachElementListeners(l)
                        }
                    }
                }
            };
            g.addElement = function(n, l) {
                var m = i.prototype.addElement.call(this, n);
                this._decorateTrackedElement(m, l);
                return m
            };
            g.addElements = function(m, l) {
                [].forEach.call(m, function(n) {
                    this.addElement(n, l)
                }, this)
            };
            b.exports = a
        }, {
            "ac-base": false,
            "ac-element-tracker": 42,
            "ac-object": 153
        }
    ],
    47: [
        function(b, c, a) {
            c.exports = {
                LocalnavSticky: b("./ac-localnav-sticky/Localnav-sticky")
            }
        }, {
            "./ac-localnav-sticky/Localnav-sticky": 48
        }
    ],
    48: [
        function(c, b, f) {
            var i = c("ac-base").Element;
            var g = c("ac-base").Environment;
            var m = c("ac-dom-emitter").DOMEmitter;
            var n = c("ac-event-emitter").EventEmitter;
            var d = new m(window);
            var l;
            try {
                l = c("ac-analytics")
            } catch (j) {}
            var a = {
                visible: "visible",
                hidden: "hidden"
            };

            function k(o) {
                this._globalHeader = i.select("#globalheader");
                this._localNav = i.select(".localnav-wrapper");
                this._visible = false;
                if (this._globalHeader && this._localNav && !this._isOldIE()) {
                    d.on("scroll", this._scrollUpdate.bind(this))
                }
            }
            var h = k.prototype = new n(null);
            h._getThreshold = function() {
                if (!this._threshold) {
                    this._threshold = i.cumulativeOffset(this._localNav).top
                }
                return this._threshold
            };
            h._isOldIE = function() {
                return (g.Browser.name === "IE" && g.Browser.version < 9)
            };
            h._stickyAvailable = function() {
                var p = document.createElement("div"),
                    o = ["sticky", "-webkit-sticky"];
                return o.some(function(q) {
                    try {
                        p.style.position = q;
                        if (p.getAttribute("style")) {
                            return true
                        }
                    } catch (r) {
                        return false
                    }
                })
            };
            h._scrollUpdate = function() {
                var o = this._getThreshold();
                var p = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                if (o && p >= o) {
                    this._showStickyNav()
                } else {
                    this._hideStickyNav()
                }
            };
            h._showStickyNav = function() {
                if (!this._visible) {
                    i.addClassName(this._localNav, "localnav-sticky");
                    if (!this._stickyAvailable()) {
                        i.setStyle(this._globalHeader, {
                            marginBottom: i.getBoundingBox(this._localNav).height + "px"
                        })
                    }
                    this._localNav.setAttribute("data-analytics-region", "product nav locked");
                    if (typeof l === "object") {
                        l.regions.refreshRegion(this._localNav)
                    }
                    this._visible = true;
                    this.trigger(a.visible)
                }
            };
            h._hideStickyNav = function() {
                if (this._visible) {
                    i.removeClassName(this._localNav, "localnav-sticky");
                    if (!this._stickyAvailable()) {
                        i.setStyle(this._globalHeader, {
                            marginBottom: "0"
                        })
                    }
                    this._localNav.setAttribute("data-analytics-region", "product nav");
                    if (typeof l === "object") {
                        l.regions.refreshRegion(this._localNav)
                    }
                    this._visible = false;
                    this.trigger(a.hidden)
                }
            };
            b.exports = k
        }, {
            "ac-base": false,
            "ac-dom-emitter": 31,
            "ac-event-emitter": false
        }
    ],
    49: [
        function(b, c, a) {
            arguments[4][31][0].apply(a, arguments)
        }, {
            "./ac-dom-emitter/DOMEmitter": 50
        }
    ],
    50: [
        function(b, c, a) {
            var f;
            var d = b("ac-event-emitter").EventEmitter;

            function g(h) {
                if (h === null) {
                    return
                }
                this.el = h;
                this._bindings = {};
                this._eventEmitter = new d()
            }
            f = g.prototype;
            f._parseEventNames = function(h) {
                if (!h) {
                    return [h]
                }
                return h.split(" ")
            };
            f._onListenerEvent = function(i, h) {
                this.trigger(i, h, false)
            };
            f._setListener = function(h) {
                this._bindings[h] = this._onListenerEvent.bind(this, h);
                this._addEventListener(h, this._bindings[h])
            };
            f._removeListener = function(h) {
                this._removeEventListener(h, this._bindings[h]);
                delete this._bindings[h]
            };
            f._addEventListener = function(i, j, h) {
                if (this.el.addEventListener) {
                    this.el.addEventListener(i, j, h)
                } else {
                    if (this.el.attachEvent) {
                        this.el.attachEvent("on" + i, j)
                    } else {
                        target["on" + i] = j
                    }
                }
                return this
            };
            f._removeEventListener = function(i, j, h) {
                if (this.el.removeEventListener) {
                    this.el.removeEventListener(i, j, h)
                } else {
                    this.el.detachEvent("on" + i, j)
                }
                return this
            };
            f.on = function(h, j, i) {
                h = this._parseEventNames(h);
                h.forEach(function(m, l, k) {
                    if (!this.has(k)) {
                        this._setListener(k)
                    }
                    this._eventEmitter.on(k, m, l)
                }.bind(this, j, i));
                return this
            };
            f.off = function(h, k, j) {
                var i = Array.prototype.slice.call(arguments, 0);
                h = this._parseEventNames(h);
                h.forEach(function(p, o, m, l) {
                    if (m.length === 0) {
                        this._eventEmitter.off();
                        var n;
                        for (n in this._bindings) {
                            if (this._bindings.hasOwnProperty(n)) {
                                this._removeListener(n)
                            }
                        }
                        return
                    }
                    this._eventEmitter.off(l, p, o);
                    if (!this.has(l)) {
                        this._removeListener(l)
                    }
                }.bind(this, k, j, i));
                return this
            };
            f.once = function(h, j, i) {
                h = this._parseEventNames(h);
                h.forEach(function(m, l, k) {
                    if (!this.has(k)) {
                        this._setListener(k)
                    }
                    this._eventEmitter.once.call(this, k, m, l)
                }.bind(this, j, i));
                return this
            };
            f.has = function(h) {
                if (this._eventEmitter && this._eventEmitter.has(h)) {
                    return true
                }
                return false
            };
            f.trigger = function(h, i, j) {
                h = this._parseEventNames(h);
                h.forEach(function(l, m, k) {
                    this._eventEmitter.trigger(k, l, m)
                }.bind(this, i, j));
                return this
            };
            f.destroy = function() {
                this.off();
                this.el = this._eventEmitter = this._bindings = null
            };
            c.exports = g
        }, {
            "ac-event-emitter": false
        }
    ],
    51: [
        function(b, c, a) {
            c.exports = {
                Modal: b("./ac-modal/Modal")
            }
        }, {
            "./ac-modal/Modal": 52
        }
    ],
    52: [
        function(c, d, b) {
            var h = c("ac-base").Element;
            var g = c("ac-event-emitter").EventEmitter;
            var i = document.documentElement;
            var f;

            function a(j) {
                this.contentElement = h.getElementById(j);
                h.addClassName(this.contentElement, "modal-content");
                this.opened = false;
                this.closeButton = null;
                this.modalEl = null;
                this._boundClose = this.close.bind(this);
                this._boundOnKeyup = this._onKeyup.bind(this);
                this._generateElements();
                this.modalEl.appendChild(this.contentElement)
            }
            var f = a.prototype = new g();
            f.open = function() {
                this._scrollX = window.scrollX;
                this._scrollY = window.scrollY;
                if (!this.opened) {
                    this._scrollToTop();
                    this._attachEvents();
                    this.trigger("willopen");
                    h.addClassName(i, "modal-open");
                    h.setStyle(this.modalEl, {
                        visibility: "visible",
                        zIndex: "9999"
                    });
                    this.opened = true;
                    this.trigger("open")
                }
            };
            f.close = function() {
                this.trigger("willclose");
                this._removeEvents();
                h.removeClassName(i, "modal-open");
                h.setStyle(this.modalEl, {
                    visibility: "",
                    zIndex: ""
                });
                this._returnToScrollPosition();
                this.opened = false;
                this.trigger("close")
            };
            f.destroy = function() {};
            f._removeEvents = function() {
                h.removeEventListener(this.closeButton, "click", this._boundClose);
                h.removeEventListener(document, "keyup", this._boundOnKeyup)
            };
            f._attachEvents = function() {
                h.addEventListener(this.closeButton, "click", this._boundClose);
                h.addEventListener(document, "keyup", this._boundOnKeyup)
            };
            f._onKeyup = function(j) {
                if (j.keyCode === 27) {
                    this.close()
                }
            };
            f._generateCloseButton = function() {
                var j = document.createElement("button");
                h.addClassName(j, "modal-close");
                j.textContent = "";
                return j
            };
            f._generateModalEl = function() {
                var j = document.createElement("div");
                h.addClassName(j, "modal");
                return j
            };
            f._generateElements = function() {
                this.closeButton = this._closeButton || this._generateCloseButton();
                this.modalEl = this._modalEl || this._generateModalEl();
                this.modalEl.appendChild(this.closeButton);
                document.body.appendChild(this.modalEl)
            };
            f._scrollToTop = function() {
                window.scrollTo(0, 0)
            };
            f._returnToScrollPosition = function() {
                window.scrollTo(this._scrollX || 0, this._scrollY || 0)
            };
            d.exports = a
        }, {
            "ac-base": false,
            "ac-event-emitter": false
        }
    ],
    53: [
        function(b, c, a) {
            c.exports = b(33)
        }, {}
    ],
    54: [
        function(c, f, b) {
            var d = {
                cssPropertyAvailable: c("./ac-feature/cssPropertyAvailable"),
                localStorageAvailable: c("./ac-feature/localStorageAvailable")
            };
            var a = Object.prototype.hasOwnProperty;
            d.threeDTransformsAvailable = function() {
                if (typeof this._threeDTransformsAvailable !== "undefined") {
                    return this._threeDTransformsAvailable
                }
                var i, g;
                try {
                    this._threeDTransformsAvailable = false;
                    if (a.call(window, "styleMedia")) {
                        this._threeDTransformsAvailable = window.styleMedia.matchMedium("(-webkit-transform-3d)")
                    } else {
                        if (a.call(window, "media")) {
                            this._threeDTransformsAvailable = window.media.matchMedium("(-webkit-transform-3d)")
                        }
                    } if (!this._threeDTransformsAvailable) {
                        if (!(g = document.getElementById("supportsThreeDStyle"))) {
                            g = document.createElement("style");
                            g.id = "supportsThreeDStyle";
                            g.textContent = "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
                            document.querySelector("head").appendChild(g)
                        }
                        if (!(i = document.querySelector("#supportsThreeD"))) {
                            i = document.createElement("div");
                            i.id = "supportsThreeD";
                            document.body.appendChild(i)
                        }
                        this._threeDTransformsAvailable = (i.offsetHeight === 3) || g.style.MozTransform !== undefined || g.style.WebkitTransform !== undefined
                    }
                    return this._threeDTransformsAvailable
                } catch (h) {
                    return false
                }
            };
            d.canvasAvailable = function() {
                if (typeof this._canvasAvailable !== "undefined") {
                    return this._canvasAvailable
                }
                var g = document.createElement("canvas");
                this._canvasAvailable = !! (typeof g.getContext === "function" && g.getContext("2d"));
                return this._canvasAvailable
            };
            d.sessionStorageAvailable = function() {
                if (typeof this._sessionStorageAvailable !== "undefined") {
                    return this._sessionStorageAvailable
                }
                try {
                    if (typeof window.sessionStorage !== "undefined" && typeof window.sessionStorage.setItem === "function") {
                        window.sessionStorage.setItem("ac_browser_detect", "test");
                        this._sessionStorageAvailable = true;
                        window.sessionStorage.removeItem("ac_browser_detect", "test")
                    } else {
                        this._sessionStorageAvailable = false
                    }
                } catch (g) {
                    this._sessionStorageAvailable = false
                }
                return this._sessionStorageAvailable
            };
            d.cookiesAvailable = function() {
                if (typeof this._cookiesAvailable !== "undefined") {
                    return this._cookiesAvailable
                }
                this._cookiesAvailable = (a.call(document, "cookie") && !! navigator.cookieEnabled) ? true : false;
                return this._cookiesAvailable
            };
            d.__normalizedScreenWidth = function() {
                if (typeof window.orientation === "undefined") {
                    return window.screen.width
                }
                return window.screen.width < window.screen.height ? window.screen.width : window.screen.height
            };
            d.touchAvailable = function() {
                return !!(("ontouchstart" in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
            };
            d.isDesktop = function() {
                if (!this.touchAvailable() && !window.orientation) {
                    return true
                }
                return false
            };
            d.isHandheld = function() {
                return !this.isDesktop() && !this.isTablet()
            };
            d.isTablet = function() {
                return !this.isDesktop() && this.__normalizedScreenWidth() > 480
            };
            d.isRetina = function() {
                var g = ["min-device-pixel-ratio:1.5", "-webkit-min-device-pixel-ratio:1.5", "min-resolution:1.5dppx", "min-resolution:144dpi", "min--moz-device-pixel-ratio:1.5"];
                var h;
                if (window.devicePixelRatio !== undefined) {
                    if (window.devicePixelRatio >= 1.5) {
                        return true
                    }
                } else {
                    for (h = 0; h < g.length; h += 1) {
                        if (window.matchMedia("(" + g[h] + ")").matches === true) {
                            return true
                        }
                    }
                }
                return false
            };
            d.svgAvailable = function() {
                return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
            };
            f.exports = d
        }, {
            "./ac-feature/cssPropertyAvailable": 55,
            "./ac-feature/localStorageAvailable": 56
        }
    ],
    55: [
        function(c, f, b) {
            var g = null;
            var h = null;
            var a = null;
            var d = null;
            f.exports = function(s) {
                if (g === null) {
                    g = document.createElement("browserdetect").style
                }
                if (h === null) {
                    h = ["-webkit-", "-moz-", "-o-", "-ms-", "-khtml-", ""]
                }
                if (a === null) {
                    a = ["Webkit", "Moz", "O", "ms", "Khtml", ""]
                }
                if (d === null) {
                    d = {}
                }
                s = s.replace(/([A-Z]+)([A-Z][a-z])/g, "$1\\-$2").replace(/([a-z\d])([A-Z])/g, "$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/, "").toLowerCase();
                switch (s) {
                    case "gradient":
                        if (d.gradient !== undefined) {
                            return d.gradient
                        }
                        s = "background-image:";
                        var q = "gradient(linear,left top,right bottom,from(#9f9),to(white));";
                        var p = "linear-gradient(left top,#9f9, white);";
                        g.cssText = (s + h.join(q + s) + h.join(p + s)).slice(0, -s.length);
                        d.gradient = (g.backgroundImage.indexOf("gradient") !== -1);
                        return d.gradient;
                    case "inset-box-shadow":
                        if (d["inset-box-shadow"] !== undefined) {
                            return d["inset-box-shadow"]
                        }
                        s = "box-shadow:";
                        var r = "#fff 0 1px 1px inset;";
                        g.cssText = h.join(s + r);
                        d["inset-box-shadow"] = (g.cssText.indexOf("inset") !== -1);
                        return d["inset-box-shadow"];
                    default:
                        var o = s.split("-");
                        var k = o.length;
                        var n;
                        var m;
                        var l;
                        if (o.length > 0) {
                            s = o[0];
                            for (m = 1; m < k; m += 1) {
                                s += o[m].substr(0, 1).toUpperCase() + o[m].substr(1)
                            }
                        }
                        n = s.substr(0, 1).toUpperCase() + s.substr(1);
                        if (d[s] !== undefined) {
                            return d[s]
                        }
                        for (l = a.length - 1; l >= 0; l -= 1) {
                            if (g[a[l] + s] !== undefined || g[a[l] + n] !== undefined) {
                                d[s] = true;
                                return true
                            }
                        }
                        return false
                }
            }
        }, {}
    ],
    56: [
        function(d, f, b) {
            var a = null;
            f.exports = function c() {
                if (a === null) {
                    a = !! (window.localStorage && window.localStorage.non_existent !== null)
                }
                return a
            }
        }, {}
    ],
    57: [
        function(b, c, a) {
            c.exports = function() {
                var d = b("dust-runtime");
                (function() {
                    d.register("emptyTemplate", f);

                    function f(h, g) {
                        return h.write("<div><!-- having less than two templates in ./src/templates causes problems --></div>")
                    }
                    return f
                })();
                (function() {
                    d.register("rangeSlider", f);

                    function f(h, g) {
                        return h.write('<div class="ac-rangeslider ac-rangeslider-').reference(g.get("orientation"), g, "h").write(" ac-rangeslider-skin-").reference(g.get("skin"), g, "h").write('" data-rangesliderrangeslider-min="').reference(g.get("min"), g, "h").write('" data-rangeslider-max="').reference(g.get("max"), g, "h").write('" data-rangeslider-step="').reference(g.get("step"), g, "h").write('" data-rangeslider-value="').reference(g.get("value"), g, "h").write('" data-rangeslider-orientation="').reference(g.get("orientation"), g, "h").write('" ><div class="ac-rangeslider-back"></div><div class="ac-rangeslider-grip"><div class="ac-rangeslider-rail"></div><div class="ac-rangeslider-foot"></div><div class="ac-rangeslider-head"></div><div class="ac-rangeslider-jewel"></div></div><input type="range" class="ac-rangeslider-eventsurface" tabindex="').reference(g.get("tabindex"), g, "h").write('" role="slider" aria-label="').reference(g.get("label"), g, "h").write('" aria-valuemin="').reference(g.get("min"), g, "h").write('" aria-valuenow="').reference(g.get("value"), g, "h").write('" aria-valuemax="').reference(g.get("max"), g, "h").write('" ></div>')
                    }
                    return f
                })();
                return d
            }
        }, {
            "dust-runtime": "EVc30+"
        }
    ],
    58: [
        function(c, d, b) {
            var a = c("./ac-keyboard/Keyboard");
            d.exports = new a();
            d.exports.Keyboard = a;
            d.exports.keys = c("./ac-keyboard/keymap")
        }, {
            "./ac-keyboard/Keyboard": 60,
            "./ac-keyboard/keymap": 61
        }
    ],
    59: [
        function(d, f, b) {
            var c = d("ac-base").Object;
            var a = ["keyLocation"];

            function g(h) {
                this.originalEvent = h;
                for (var i in h) {
                    if (typeof h[i] !== "function" && a.indexOf(i) === -1) {
                        this[i] = h[i]
                    }
                }
                this.location = (this.originalEvent.keyLocation === undefined) ? this.originalEvent.location : this.originalEvent.keyLocation
            }
            g.prototype = {
                preventDefault: function() {
                    if (typeof this.originalEvent.preventDefault !== "function") {
                        this.originalEvent.returnValue = false;
                        return
                    }
                    return this.originalEvent.preventDefault()
                },
                stopPropagation: function() {
                    return this.originalEvent.stopPropagation()
                }
            };
            f.exports = g
        }, {
            "ac-base": false
        }
    ],
    60: [
        function(f, c, h) {
            var j = f("ac-base").Element;
            var g = f("./KeyEvent");
            var n = f("ac-event-emitter").EventEmitter;
            var k = f("./keymap");
            var l = 0;
            var d = 1;
            var a = 2;
            var m = 3;
            var i;

            function b() {
                this._keysDown = [];
                this._keyDownEmitter = new n();
                this._keyUpEmitter = new n();
                j.addEventListener(document, "keydown", this._DOMKeyDown.bind(this), true);
                j.addEventListener(document, "keyup", this._DOMKeyUp.bind(this), true);
                this._listening = []
            }
            i = b.prototype;
            i._castEventNameNumberToString = function(o) {
                if (typeof o === "number") {
                    return o.toString()
                }
                return o
            };
            i._DOMKeyDown = function(p) {
                var o = this._normalizeKeyboardEvent(p);
                var q = o.keyCode;
                this._trackKeyDown(q);
                this._keyDownEmitter.trigger(q.toString(), o)
            };
            i._DOMKeyUp = function(p) {
                var o = this._normalizeKeyboardEvent(p);
                var q = o.keyCode;
                this._trackKeyUp(q);
                this._keyUpEmitter.trigger(q.toString(), o)
            };
            i.addKeyDown = function() {
                var o = Array.prototype.slice.call(arguments);
                var p = o.shift();
                if (p === undefined) {
                    throw new TypeError('Could not listen for keyup event on "' + p + '"')
                }
                p = this._castEventNameNumberToString(p);
                return this._keyDownEmitter.on.apply(this._keyDownEmitter, [p].concat(o))
            };
            i.addKeyUp = function() {
                var o = Array.prototype.slice.call(arguments);
                var p = o.shift();
                if (p === undefined) {
                    throw new TypeError('Could not listen for keyup event on "' + p + '"')
                }
                p = this._castEventNameNumberToString(p);
                return this._keyUpEmitter.on.apply(this._keyUpEmitter, [p].concat(o))
            };
            i.removeKeyDown = function() {
                var o = Array.prototype.slice.call(arguments);
                var p = o.shift();
                p = this._castEventNameNumberToString(p);
                return this._keyDownEmitter.off.apply(this._keyDownEmitter, [p].concat(o))
            };
            i.removeKeyUp = function() {
                var o = Array.prototype.slice.call(arguments);
                var p = o.shift();
                p = this._castEventNameNumberToString(p);
                return this._keyUpEmitter.off.apply(this._keyUpEmitter, [p].concat(o))
            };
            i.isDown = function(o) {
                return (this._keysDown.indexOf(o) !== -1)
            };
            i.isUp = function(o) {
                return !this.isDown(o)
            };
            i._trackKeyUp = function(p) {
                var o = this._keysDown.indexOf(p);
                if (o !== -1) {
                    this._keysDown.splice(o, 1)
                }
            };
            i._trackKeyDown = function(o) {
                if (this._keysDown.indexOf(o) === -1) {
                    this._keysDown.push(o)
                }
            };
            i._normalizeKeyboardEvent = function(o) {
                return new g(o)
            };
            c.exports = b
        }, {
            "./KeyEvent": 59,
            "./keymap": 61,
            "ac-base": false,
            "ac-event-emitter": false
        }
    ],
    61: [
        function(b, c, a) {
            c.exports = {
                BACKSPACE: 8,
                TAB: 9,
                ENTER: 13,
                SHIFT: 16,
                CONTROL: 17,
                ALT: 18,
                COMMAND: 91,
                CAPSLOCK: 20,
                ESCAPE: 27,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                END: 35,
                HOME: 36,
                ARROW_LEFT: 37,
                ARROW_UP: 38,
                ARROW_RIGHT: 39,
                ARROW_DOWN: 40,
                DELETE: 46,
                ZERO: 48,
                ONE: 49,
                TWO: 50,
                THREE: 51,
                FOUR: 52,
                FIVE: 53,
                SIX: 54,
                SEVEN: 55,
                EIGHT: 56,
                NINE: 57,
                A: 65,
                B: 66,
                C: 67,
                D: 68,
                E: 69,
                F: 70,
                G: 71,
                H: 72,
                I: 73,
                J: 74,
                K: 75,
                L: 76,
                M: 77,
                N: 78,
                O: 79,
                P: 80,
                Q: 81,
                R: 82,
                S: 83,
                T: 84,
                U: 85,
                V: 86,
                W: 87,
                X: 88,
                Y: 89,
                Z: 90,
                NUMPAD_ZERO: 96,
                NUMPAD_ONE: 97,
                NUMPAD_TWO: 98,
                NUMPAD_THREE: 99,
                NUMPAD_FOUR: 100,
                NUMPAD_FIVE: 101,
                NUMPAD_SIX: 102,
                NUMPAD_SEVEN: 103,
                NUMPAD_EIGHT: 104,
                NUMPAD_NINE: 105,
                NUMPAD_ASTERISK: 106,
                NUMPAD_PLUS: 107,
                NUMPAD_DASH: 109,
                NUMPAD_DOT: 110,
                NUMPAD_SLASH: 111,
                NUMPAD_EQUALS: 187,
                TICK: 192,
                LEFT_BRACKET: 219,
                RIGHT_BRACKET: 221,
                BACKSLASH: 220,
                SEMICOLON: 186,
                APOSTRAPHE: 222,
                SPACEBAR: 32,
                CLEAR: 12,
                COMMA: 188,
                DOT: 190,
                SLASH: 191
            }
        }, {}
    ],
    62: [
        function(b, c, a) {
            c.exports.Slider = b("./ac-slider/Slider")
        }, {
            "./ac-slider/Slider": 66
        }
    ],
    63: [
        function(c, d, b) {
            var g = c("ac-event-emitter").EventEmitter;

            function h(o, k, j, m) {
                var i = Math.abs(j - k);
                var n = Math.abs(o - k);
                var p = k + (Math.floor(i / m) * m);
                var l = Math.min(p, k + Math.round(n / m) * m);
                return l
            }

            function a(i) {
                i = i || {};
                this._setRangeOptions(i)
            }
            var f = a.prototype = new g();
            f._rangeSliderDefaults = {
                min: 0,
                value: 50,
                max: 100,
                step: "any",
                disabled: false,
                toPrecision: 3
            };
            f.setValue = function(j, i) {
                if (typeof j !== this._model.value) {
                    if (typeof j !== "number" || isNaN(j)) {
                        throw new TypeError("value must be a number, and cannot be NaN.")
                    }
                    j = this._normalizeValue(j);
                    if (this._model.value !== j) {
                        this._model.value = j;
                        if (!i) {
                            this.trigger("change", this._model.value)
                        }
                        this.trigger("_change", this._model.value)
                    }
                }
                return this._model.value
            };
            f.setMin = function(j, i) {
                if (this._model.min !== j) {
                    if (typeof j !== "number" || isNaN(j)) {
                        throw new TypeError("min value must be a number, and cannot be NaN.")
                    }
                    this._model.min = j;
                    this.setValue(this._model.value);
                    if (!i) {
                        this.trigger("change", this._model.value)
                    }
                    this.trigger("_change", this._model.value)
                }
                return this._model.min
            };
            f.setMax = function(j, i) {
                if (this._model.max !== j) {
                    if (typeof j !== "number" || isNaN(j)) {
                        throw new TypeError("Max value must be a number value, and cannot be NaN.")
                    }
                    this._model.max = j;
                    this.setValue(this._model.value);
                    if (!i) {
                        this.trigger("change", this._model.value)
                    }
                    this.trigger("_change", this._model.value)
                }
                return this._model.max
            };
            f.setStep = function(j, i) {
                if (this._model.step !== j) {
                    if (typeof j !== "number" && j !== "auto") {
                        throw new TypeError('step value must be a number, or the string "auto"')
                    }
                    this._model.step = j;
                    this.setValue(this._model.value);
                    if (!i) {
                        this.trigger("change", this._model.value)
                    }
                    this.trigger("_change", this._model.value)
                }
                return this._model.step
            };
            f.getValue = function() {
                return this._model.value
            };
            f._normalizeValue = function(i) {
                if (typeof i !== "number") {
                    throw new TypeError("newValue must be a number")
                }
                i = Math.max(this._model.min, Math.min(this._model.max, i));
                if (typeof this._model.step === "number") {
                    i = h(i, this._model.min, this._model.max, this._model.step)
                }
                if (typeof this._model.toPrecision === "number") {
                    i = Math.round(i * Math.pow(10, this._model.toPrecision)) / Math.pow(10, this._model.toPrecision)
                }
                return i
            };
            f._setRangeOptions = function(i) {
                this._model = this._model || {};
                var j;
                for (j in this._rangeSliderDefaults) {
                    if (this._rangeSliderDefaults.hasOwnProperty(j)) {
                        if (j !== "value") {
                            this._model[j] = (typeof i[j] !== "undefined") ? i[j] : this._rangeSliderDefaults[j]
                        }
                    }
                }
                this.setValue((typeof i.value === "number") ? i.value : this._rangeSliderDefaults.value)
            };
            d.exports = a
        }, {
            "ac-event-emitter": false
        }
    ],
    64: [
        function(f, g, c) {
            var h = f("ac-base").Element;

            function b(k, j, l) {
                if (j) {
                    this.__ = {};
                    this.__.calc = (l === false) ? l : true;
                    this.__.selector = k || "*";
                    this.__.contextElement = j;
                    this.$ = (k) ? h.select(k, j) : j;
                    if (!this.$) {
                        throw new TypeError('The selector "' + this.__.selector + '" for this context did not return any elements')
                    }
                    if (this.__.calc) {
                        this.calculate()
                    }
                }
            }
            var d = b.prototype;
            d.calculate = function() {
                this.width = this.$.offsetWidth;
                this.height = this.$.offsetHeight
            };
            d.addChildNode = function(k, j) {
                if (typeof this[k] !== "undefined") {
                    throw (new TypeError('the name "' + k + '" is already in use, please chose a different nodeName.'))
                }
                this[k] = new b(j, this.element)
            };

            function i(l, j, k) {
                this._init(l, j, k)
            }
            var a = i.prototype = new b();
            a._walkTree = function(j) {
                var l;
                var k;
                for (k in j) {
                    l = j[k];
                    this[k] = new b(l.selector, this.$, ((l.calc === false) ? l.calc : true));
                    if (l.children) {
                        a._walkTree.apply(this[k], [l.children])
                    }
                }
            };
            a._init = function(l, j, k) {
                b.apply(this, [undefined, l, k]);
                this._walkTree(j)
            };
            g.exports = i
        }, {
            "ac-base": false
        }
    ],
    65: [
        function(d, f, b) {
            var h = d("ac-event-emitter").EventEmitter;
            var g = d("ac-base").Element;

            function a() {}
            a.prototype = {
                isHoveringAny: false,
                isGrabbingAny: false
            };

            function c(i, j) {
                if (i) {
                    this.init(i, j)
                }
            }
            c.prototype = new h();
            c.prototype.evtOptsDict = {
                $target: {
                    type: "object"
                }
            };
            c.prototype.addEventListeners = function(i, k, l, j) {
                ((typeof k === "string") ? [k] : k).forEach(function(m) {
                    g.addEventListener(i, m, l, j)
                })
            };
            c.prototype.eventPolyfill = function(k) {
                if (k.target === undefined) {
                    k.target = k.srcElement || k.toElement
                }
                if (k.pageX === undefined && typeof(k.clientX) === "number" && typeof(document.body.scrollLeft) === "number") {
                    k.pageX = k.clientX + document.body.scrollLeft
                }
                if (k.pageY === undefined && typeof(k.clientY) === "number" && typeof(document.body.scrollTop) === "number") {
                    k.pageY = k.clientY + document.body.scrollTop
                }
                var j = g.cumulativeOffset(k.target);
                var i = ((k.offsetX === undefined || (j.left !== 0 && k.offsetX === k.pageX)) || (k.offsetY === undefined || (j.top !== 0 && k.offsetY === k.pageY)));
                if (i) {
                    k.offsetX = Math.round(k.pageX - j.left);
                    k.offsetY = Math.round(k.pageY - j.top)
                }
                if (k.preventDefault === undefined) {
                    k.preventDefault = k.preventDefault || function() {
                        k.returnValue = false
                    }
                }
                if (k.stopPropagation === undefined) {
                    k.stopPropagation = k.stopPropagation || function() {
                        k.returnValue = false
                    }
                }
                return k
            };
            c.prototype.init = function(i, j) {
                this._model = this._model || new a();
                this.$target = i;
                this.dragOnGrab = (j === true) ? j : false;
                this.setGrabEvent();
                this.setDragEvent();
                this.setReleaseEvent()
            };
            c.prototype.setGrabEvent = function() {
                this.addEventListeners(this.$target, ["mousedown", "touchstart"], function(i) {
                    i = this.eventPolyfill(i);
                    i.preventDefault();
                    i.stopPropagation();
                    if (!this._model.isGrabbingThis) {
                        this._model.isGrabbingThis = true;
                        a.prototype.isGrabbingAny = true;
                        this._model.grabEventPageCoords = {
                            x: i.pageX,
                            y: i.pageY
                        };
                        this._model.grabEventElementCoords = {
                            x: i.offsetX,
                            y: i.offsetY
                        };
                        this._model.eventCoords = this._model.grabEventElementCoords;
                        this.trigger("grab", this._model.eventCoords);
                        if (this.dragOnGrab) {
                            this.trigger("drag", this._model.eventCoords)
                        }
                    }
                }.bind(this), false)
            };
            c.prototype.setDragEvent = function() {
                this.addEventListeners(document.body, ["mousemove", "touchmove"], function(k) {
                    k = this.eventPolyfill(k);
                    if (this._model.isGrabbingThis) {
                        k.preventDefault();
                        var j = (Math.max(k.pageX, this._model.grabEventPageCoords.x) - Math.min(k.pageX, this._model.grabEventPageCoords.x)) * ((this._model.grabEventPageCoords.x < k.pageX) ? 1 : -1);
                        var i = (Math.max(k.pageY, this._model.grabEventPageCoords.y) - Math.min(k.pageY, this._model.grabEventPageCoords.y)) * ((this._model.grabEventPageCoords.y < k.pageY) ? 1 : -1);
                        this._model.eventCoords = {
                            x: this._model.grabEventElementCoords.x + j,
                            y: this._model.grabEventElementCoords.y + i
                        };
                        this.trigger("drag", this._model.eventCoords)
                    }
                }.bind(this), true)
            };
            c.prototype.setReleaseEvent = function() {
                var i = function(j) {
                    if (this._model.isGrabbingThis) {
                        j.preventDefault();
                        j.stopPropagation();
                        this._model.isGrabbingThis = false;
                        a.prototype.isGrabbingAny = false;
                        this.trigger("release", this._model.eventCoords)
                    }
                }.bind(this);
                this.addEventListeners(document.body, ["mouseup", "touchend"], function(j) {
                    j = this.eventPolyfill(j);
                    i(j)
                }.bind(this), false);
                this.addEventListeners(document.body, ["mouseover"], function(k) {
                    k = this.eventPolyfill(k);
                    var j = ((k.button === 1) || (k.button === 0 && k.buttons === 0) || (k.which === 0));
                    if (j) {
                        i(k)
                    }
                }.bind(this), false)
            };
            f.exports = c
        }, {
            "ac-base": false,
            "ac-event-emitter": false
        }
    ],
    66: [
        function(c, b, f) {
            var m = c("ac-deferred").Deferred;
            var h = c("ac-base").Element;
            var i = c("ac-keyboard");
            var n = c("ac-keyboard").keys;
            var j = c("./RangeSlider");
            var a = c("./TemplateHelper");
            var o = c("./RenderModel");
            var l = c("./SimpleDragger");
            var p = new a();
            var k = function(q) {
                var r = new m();
                var t;
                var s = function() {
                    var u = document.getElementsByTagName(q);
                    if (u.length > 0 && u[0]) {
                        clearTimeout(t);
                        r.resolve(u[0])
                    } else {
                        t = setTimeout(s, 10)
                    }
                };
                s();
                return r.promise()
            };

            function d(q, r) {
                if (typeof q !== "undefined" && typeof r !== "undefined") {
                    this._init(q, r)
                }
            }
            var g = d.prototype = j.prototype;
            g._sliderViewDefaults = {
                userControlsEnabled: true,
                skin: "basic",
                label: "Range Slider Control",
                tabindex: 0
            };
            g._addToDom = function(r) {
                var q = new m();
                p.injectMarkup({
                    markup: "rangeSlider",
                    target: r,
                    data: this._model
                }).then(function(s) {
                    q.resolve(s)
                }.bind(this));
                return q.promise()
            };
            g._setRenderModel = function(q) {
                this._renderModel = new o(q, {
                    grip: {
                        selector: ".ac-rangeslider-grip",
                        calc: false,
                        children: {
                            foot: {
                                selector: ".ac-rangeslider-foot"
                            },
                            rail: {
                                selector: ".ac-rangeslider-rail"
                            },
                            head: {
                                selector: ".ac-rangeslider-head"
                            },
                            jewel: {
                                selector: ".ac-rangeslider-jewel"
                            }
                        }
                    },
                    surface: {
                        selector: ".ac-rangeslider-eventsurface"
                    }
                })
            };
            g._render = function(r, q) {
                window.requestAnimationFrame(function() {
                    var z = (this._model.orientation === "horizontal") ? "width" : "height";
                    var y = (this._model.orientation === "vertical") ? "width" : "height";
                    var t = this._model.max - this._model.min;
                    var v = (t === 0) ? 0 : (this._model.value - this._model.min) / t;
                    var s = function(B, D, C) {
                        var E = {};
                        D = (D === "width") ? z : ((D === "height") ? y : D);
                        E[D] = C;
                        h.setStyle(B, E)
                    };
                    if (r) {
                        s(this._renderModel.$, "height", this._model[y] + "px")
                    }
                    var w = (this._renderModel.grip.foot[z] + this._renderModel.grip.head[z]);
                    var u = Math.round(w + ((this._renderModel[z] - w) * v));
                    var A = (u - w);
                    var x = this._renderModel.grip.head[z];
                    s(this._renderModel.grip.$, "width", u + "px");
                    if (!this._hasCalc) {
                        s(this._renderModel.grip.rail.$, "width", A + "px");
                        s(this._renderModel.grip.rail.$, ((this._model.orientation === "horizontal") ? "left" : "top"), x + "px")
                    }
                    this._renderModelToAria(q)
                }.bind(this))
            };
            g._renderModelToAria = function(r) {
                var s = (typeof this._model.min === "number" && !isNaN(this._model.min)) ? this._model.min : 0;
                var q = (typeof this._model.max === "number" && !isNaN(this._model.max)) ? this._model.max : 0;
                var t = (typeof this._model.value === "number" && !isNaN(this._model.value)) ? this._model.value : 0;
                this._renderModel.surface.$.setAttribute("min", s);
                this._renderModel.surface.$.setAttribute("max", q);
                if (typeof this._model.step === "number") {
                    this._renderModel.surface.$.setAttribute("step", this._model.step)
                } else {
                    this._renderModel.surface.$.removeAttribute("step")
                }
                this._renderModel.surface.$.setAttribute("value", t);
                if (r) {
                    this._renderModel.surface.$.setAttribute("aria-valuemin", s);
                    this._renderModel.surface.$.setAttribute("aria-valuemax", q);
                    this._renderModel.surface.$.setAttribute("aria-valuenow", t);
                    if (typeof this._renderAriaValueText === "function") {
                        this._renderModel.surface.$.setAttribute("aria-valuetext", this._renderAriaValueText())
                    }
                }
            };
            g._setSliderOptions = function(q, r) {
                var u = (typeof q === "undefined" || typeof q.nodeName !== "string" || q.nodeType !== 1);
                if (u) {
                    throw new TypeError("targetEle undefined or not a dom element: you must provide an element in which to place your slider SliderControl")
                }
                if (typeof r.renderAriaValueText === "function") {
                    this._renderAriaValueText = r.renderAriaValueText.bind(this)
                } else {
                    this._renderAriaValueText = null
                }
                this._hasCalc = this._hasCssCalc();
                var t;
                var s;
                for (t in this._sliderViewDefaults) {
                    if (this._sliderViewDefaults.hasOwnProperty(t)) {
                        s = (typeof j.prototype._rangeSliderDefaults[t] !== "undefined");
                        if (!s) {
                            this._model[t] = (typeof r[t] !== "undefined") ? r[t] : this._sliderViewDefaults[t]
                        }
                    }
                }
                this._model.width = r.width || q.offsetWidth;
                this._model.height = r.height || q.offsetHeight;
                this._model.orientation = r.orientation || ((this._model.width > this._model.height) ? "horizontal" : "vertical");
                if (typeof this._model.width !== "number") {
                    throw (new TypeError("width must be a number"))
                }
                if (typeof this._model.height !== "number") {
                    throw (new TypeError("height must be a number"))
                }
                if (this._model.orientation !== "horizontal" && this._model.orientation !== "vertical") {
                    throw (new TypeError('orientation must be a string, with the value of "horizontal" or "vertical"'))
                }
            };
            g._hasCssCalc = function() {
                var s;
                var q = document.body.appendChild(document.createElement("div"));
                var r = q.appendChild(document.createElement("div"));
                q.className = "ac-rangeslider-hascalc-test";
                r.className = "ac-rangeslider-hascalc-test-child";
                s = (r.offsetWidth === 3 && r.offsetHeight === 3);
                q = document.body.removeChild(q);
                return s
            };
            g._setDragEvents = function() {
                this._simpleDragger = new l(this._renderModel.surface.$, true);
                var q = (this._model.orientation === "horizontal") ? "width" : "height";
                var r = function(v) {
                    if (this._model.userControlsEnabled) {
                        var t = this._renderModel.surface[q] - (this._renderModel.grip.foot[q] + this._renderModel.grip.head[q]);
                        var w = (this._model.orientation === "horizontal") ? v.x : v.y;
                        if (this._model.orientation === "vertical") {
                            w = this._renderModel.surface[q] - w
                        }
                        var s = Math.min((w - (this._renderModel.grip.foot[q] + (this._renderModel.grip.head[q] / 2))), t);
                        var u = Math.min(1, Math.max(0, (s / t)));
                        this.setValue((Math.abs(this._model.max - this._model.min) * u) + this._model.min, false);
                        this._render(false, true)
                    }
                }.bind(this);
                this._simpleDragger.on("grab", function() {
                    if (this._model.userControlsEnabled) {
                        this.trigger("grab");
                        h.addClassName(this._renderModel.$, "ac-rangeslider-grabbing")
                    }
                }.bind(this));
                this._simpleDragger.on("drag", r);
                this._simpleDragger.on("release", function() {
                    if (this._model.userControlsEnabled) {
                        h.removeClassName(this._renderModel.$, "ac-rangeslider-grabbing");
                        this.trigger("release")
                    }
                }.bind(this))
            };
            g._setKeyboardControls = function() {
                this._sliderHasFocus = false;

                function q() {
                    if (this._sliderHasFocus) {
                        var t = Math.abs(this._model.max - this._model.min);
                        var s = (typeof this._model.step === "number") ? this._model.step : (t / 20);
                        this.setValue(this.getValue() + s);
                        this._renderModelToAria(true)
                    }
                }

                function r() {
                    if (this._sliderHasFocus) {
                        var t = Math.abs(this._model.max - this._model.min);
                        var s = (typeof this._model.step === "number") ? this._model.step : (t / 20);
                        this.setValue(this.getValue() - s);
                        this._renderModelToAria(true)
                    }
                }
                i.addKeyDown(n.ARROW_UP, q.bind(this));
                i.addKeyDown(n.ARROW_RIGHT, q.bind(this));
                i.addKeyDown(n.ARROW_DOWN, r.bind(this));
                i.addKeyDown(n.ARROW_LEFT, r.bind(this));
                h.addEventListener(this._renderModel.surface.$, "focus", function() {
                    this._sliderHasFocus = true;
                    this._renderModelToAria(true)
                }.bind(this));
                h.addEventListener(this._renderModel.surface.$, "blur", function() {
                    this._sliderHasFocus = false
                }.bind(this));
                h.addEventListener(this._renderModel.surface.$, "change", function(t) {
                    var s = parseFloat(this._renderModel.surface.$.value);
                    if (this._model.value !== s && !isNaN(s)) {
                        this.setValue(s);
                        this._renderModelToAria(true)
                    }
                }.bind(this))
            };
            g._init = function(q, r) {
                r = r || {};
                k("body").then(function() {
                    this._setRangeOptions(r);
                    this._setSliderOptions(q, r);
                    this.setValue(this._model.value);
                    this._addToDom(q).then(function(s) {
                        this._setRenderModel(s);
                        this._setDragEvents();
                        this._setKeyboardControls();
                        this._render(true);
                        this._renderModelToAria();
                        this.on("_change", function() {
                            this._renderModel.calculate();
                            this._render()
                        }.bind(this), this)
                    }.bind(this))
                }.bind(this))
            };
            g.disableUserControls = function() {
                this._model.userControlsEnabled = false
            };
            g.enableUserControls = function() {
                this._model.userControlsEnabled = true
            };
            b.exports = d
        }, {
            "./RangeSlider": 63,
            "./RenderModel": 64,
            "./SimpleDragger": 65,
            "./TemplateHelper": 67,
            "ac-base": false,
            "ac-keyboard": 58
        }
    ],
    67: [
        function(c, b, f) {
            var d = c("../../lib/dust-runtime");
            var l = c("../../../build/templates/commonjs/templates");
            var h = c("ac-base").Element;
            var i = c("ac-deferred").Deferred;

            function k(o) {
                var p = false;
                var n = new l();
                for (var m in n.cache) {
                    if (m === o) {
                        p = true;
                        break
                    }
                }
                return p
            }

            function j(m) {
                if (typeof m.nextElementSibling === "object") {
                    return m.nextElementSibling
                } else {
                    do {
                        m = m.nextSibling
                    } while (m && m.nodeType !== 1);
                    return m
                }
            }

            function a() {}
            var g = a.prototype;
            g.putElementInDom = function(s, q, r, p) {
                p = (typeof p === "boolean") ? p : true;
                var m;
                var o;
                var n;
                switch (r) {
                    case "before":
                        s = q.parentNode.insertBefore(s, q);
                        break;
                    case "fill":
                        m = this._getElementContext(s);
                        q.innerHTML = "";
                        for (n = 0; n < s.childNodes.length; n++) {
                            if (s.childNodes[n].nodeType === 1) {
                                q.appendChild(s.childNodes[n].cloneNode(true))
                            }
                        }
                        this._applyContextToElement(m, q);
                        break;
                    case "replace":
                        m = this._getElementContext(q);
                        s = q.parentNode.insertBefore(s, q);
                        q.parentNode.removeChild(q);
                        q = s;
                        if (p) {
                            this._applyContextToElement(m, q)
                        }
                        break;
                    case "insert":
                        q = q.appendChild(s);
                        break;
                    case "after":
                        o = j(q);
                        if (o) {
                            s = o.parentNode.insertBefore(s, o)
                        } else {
                            q = q.parentNode.appendChild(s)
                        }
                        break;
                    default:
                        throw (new TypeError(r + "is not a valid renderMode for node insertion. Valid renderMode values are before, fill, replace, insert or after."))
                }
                return q
            };
            g.injectMarkup = function(n) {
                var m = new i();
                n = this._getInjectionOptions(n);
                if (n.markupType === "template") {
                    this.getRenderedMarkup(n.markup, n.data).then(function(o) {
                        m.resolve(this.putElementInDom(this.getElementFromMarkup(o), n.target, n.renderMode, n.preserveContext))
                    }.bind(this))
                } else {
                    m.resolve(this.putElementInDom(this.getElementFromMarkup(n.markup), n.target, n.renderMode, n.preserveContext))
                }
                return m.promise()
            };
            g.getRenderedMarkup = function(o, p) {
                var m = new i();

                function q(s, r) {
                    if (r && !s) {
                        m.resolve(r)
                    } else {
                        try {
                            console.warn("dust out %s & error %O", r, s)
                        } catch (t) {
                            throw new Error("dust out " + r + " & error " + s + "")
                        }
                    }
                }
                if (!k(o)) {
                    throw new TypeError('The template "' + o + '" does not exist.')
                }
                var n = new l();
                n.render(o, p, q);
                return m.promise()
            };
            g.getElementFromMarkup = function(n) {
                var p;
                var o = 0;
                var q = null;
                var m = document.createElement("div");
                m.innerHTML = n;
                for (p = 0; p < m.childNodes.length; p++) {
                    if (m.childNodes[p].nodeType === 1) {
                        o++;
                        if (o < 2) {
                            q = m.childNodes[p]
                        }
                    }
                }
                if (o !== 1) {
                    if (o === 0) {
                        throw new TypeError("The markup did not describe any element nodes to convert to elements.")
                    } else {
                        throw new TypeError("The markup must not have more than a single outermost element wrapper (no siblings permitted).")
                    }
                }
                return q
            };
            g._getInjectionOptions = function(m) {
                m = m || {};
                m.renderMode = m.renderMode || "fill";
                m.data = m.data || {};
                m.preserveContext = (typeof m.preserveContext === "boolean") ? m.preserveContext : true;
                if (typeof m.target === "undefined" || m.target.nodeType !== 1) {
                    throw new TypeError("You must indicate an element to target for as the template insertion point.")
                }
                if (typeof m.data !== "object") {
                    throw new TypeError("The template data must be an Object.")
                }
                if (typeof m.markup !== "string") {
                    throw new TypeError("markup must be a string")
                }
                if (typeof m.markupType === "undefined") {
                    m.markupType = (/^\s*<[\s\S]*>\s*$/.test(m.markup)) ? "markup" : "template"
                } else {
                    if (typeof m.markupType !== "string") {
                        throw new TypeError("markupType must be a string")
                    } else {
                        if (!/^(markup|template)$/.test(m.markupType)) {
                            throw new TypeError('markupType must be "markup" or "template"')
                        }
                    }
                }
                return m
            };
            g._getElementContext = function(s) {
                var p = {};
                var r;
                p.id = (s.id) ? s.id : null;
                p.classes = (s.className && s.className.length > 0 && /\w/.test(s.className)) ? s.className.split(/\s+/) : [];
                p.attributes = {};
                for (r = 0; r < s.attributes.length; r++) {
                    var n = s.attributes[r];
                    var o = n.name;
                    if (typeof o === "string") {
                        var m = (/^accesskey$/.test(o) || /^contenteditable$/.test(o) || /^contextmenu$/.test(o) || /^dir$/.test(o) || /^draggable$/.test(o) || /^dropzone$/.test(o) || /^hidden$/.test(o) || /^itemid$/.test(o) || /^itemprop$/.test(o) || /^itemref$/.test(o) || /^itemscope$/.test(o) || /^itemtype$/.test(o) || /^lang$/.test(o) || /^spellcheck$/.test(o) || /^data\-\w/i.test(o) || /^src$/.test(o) || /^width$/i.test(o) || /^height$/i.test(o) || /^tabindex$/i.test(o) || /^href$/i.test(o) || /^target$/i.test(o) || /^alt$/i.test(o) || /^title$/i.test(o) || /^name$/i.test(o) || /^for$/i.test(o) || /^autofocus$/i.test(o) || /^disabled$/i.test(o) || /^toolbar$/i.test(o) || /^context$/i.test(o) || /^type$/i.test(o) || /^label$/i.test(o));
                        if (m) {
                            var q = s.getAttribute(o);
                            if (typeof q === "string") {
                                p.attributes[o] = q
                            }
                        }
                    }
                }
                return p
            };
            g._applyContextToElement = function(o, m) {
                var n;
                if (o.id) {
                    m.id = o.id
                }
                o.classes.forEach(function(p) {
                    h.addClassName(m, p)
                }.bind(this));
                for (n in o.attributes) {
                    if (o.attributes.hasOwnProperty(n)) {
                        m.setAttribute(n, o.attributes[n])
                    }
                }
                return m
            };
            b.exports = a
        }, {
            "../../../build/templates/commonjs/templates": 57,
            "../../lib/dust-runtime": 68,
            "ac-base": false
        }
    ],
    68: [
        function(require, module, exports) {
            /*! Dust - Asynchronous Templating - v2.3.3
             * http://linkedin.github.io/dustjs/
             * Copyright (c) 2014 Aleksander Williams; Released under the MIT License */
            (function(root) {
                var dust = {}, NONE = "NONE",
                    ERROR = "ERROR",
                    WARN = "WARN",
                    INFO = "INFO",
                    DEBUG = "DEBUG",
                    loggingLevels = [DEBUG, INFO, WARN, ERROR, NONE],
                    EMPTY_FUNC = function() {}, logger = EMPTY_FUNC,
                    loggerContext = this;
                dust.debugLevel = NONE;
                dust.silenceErrors = false;
                if (root && root.console && root.console.log) {
                    logger = root.console.log;
                    loggerContext = root.console
                }
                dust.log = function(message, type) {
                    if (dust.isDebug && dust.debugLevel === NONE) {
                        logger.call(loggerContext, '[!!!DEPRECATION WARNING!!!]: dust.isDebug is deprecated.  Set dust.debugLevel instead to the level of logging you want ["debug","info","warn","error","none"]');
                        dust.debugLevel = INFO
                    }
                    type = type || INFO;
                    if (loggingLevels.indexOf(type) >= loggingLevels.indexOf(dust.debugLevel)) {
                        if (!dust.logQueue) {
                            dust.logQueue = []
                        }
                        dust.logQueue.push({
                            message: message,
                            type: type
                        });
                        logger.call(loggerContext, "[DUST " + type + "]: " + message)
                    }
                    if (!dust.silenceErrors && type === ERROR) {
                        if (typeof message === "string") {
                            throw new Error(message)
                        } else {
                            throw message
                        }
                    }
                };
                dust.onError = function(error, chunk) {
                    logger.call(loggerContext, "[!!!DEPRECATION WARNING!!!]: dust.onError will no longer return a chunk object.");
                    dust.log(error.message || error, ERROR);
                    if (!dust.silenceErrors) {
                        throw error
                    } else {
                        return chunk
                    }
                };
                dust.helpers = {};
                dust.cache = {};
                dust.register = function(name, tmpl) {
                    if (!name) {
                        return
                    }
                    dust.cache[name] = tmpl
                };
                dust.render = function(name, context, callback) {
                    var chunk = new Stub(callback).head;
                    try {
                        dust.load(name, chunk, Context.wrap(context, name)).end()
                    } catch (err) {
                        dust.log(err, ERROR)
                    }
                };
                dust.stream = function(name, context) {
                    var stream = new Stream();
                    dust.nextTick(function() {
                        try {
                            dust.load(name, stream.head, Context.wrap(context, name)).end()
                        } catch (err) {
                            dust.log(err, ERROR)
                        }
                    });
                    return stream
                };
                dust.renderSource = function(source, context, callback) {
                    return dust.compileFn(source)(context, callback)
                };
                dust.compileFn = function(source, name) {
                    name = name || null;
                    var tmpl = dust.loadSource(dust.compile(source, name));
                    return function(context, callback) {
                        var master = callback ? new Stub(callback) : new Stream();
                        dust.nextTick(function() {
                            if (typeof tmpl === "function") {
                                tmpl(master.head, Context.wrap(context, name)).end()
                            } else {
                                dust.log(new Error("Template [" + name + "] cannot be resolved to a Dust function"), ERROR)
                            }
                        });
                        return master
                    }
                };
                dust.load = function(name, chunk, context) {
                    var tmpl = dust.cache[name];
                    if (tmpl) {
                        return tmpl(chunk, context)
                    } else {
                        if (dust.onLoad) {
                            return chunk.map(function(chunk) {
                                dust.onLoad(name, function(err, src) {
                                    if (err) {
                                        return chunk.setError(err)
                                    }
                                    if (!dust.cache[name]) {
                                        dust.loadSource(dust.compile(src, name))
                                    }
                                    dust.cache[name](chunk, context).end()
                                })
                            })
                        }
                        return chunk.setError(new Error("Template Not Found: " + name))
                    }
                };
                dust.loadSource = function(source, path) {
                    return eval(source)
                };
                if (Array.isArray) {
                    dust.isArray = Array.isArray
                } else {
                    dust.isArray = function(arr) {
                        return Object.prototype.toString.call(arr) === "[object Array]"
                    }
                }
                dust.nextTick = (function() {
                    return function(callback) {
                        setTimeout(callback, 0)
                    }
                })();
                dust.isEmpty = function(value) {
                    if (dust.isArray(value) && !value.length) {
                        return true
                    }
                    if (value === 0) {
                        return false
                    }
                    return (!value)
                };
                dust.filter = function(string, auto, filters) {
                    if (filters) {
                        for (var i = 0, len = filters.length; i < len; i++) {
                            var name = filters[i];
                            if (name === "s") {
                                auto = null;
                                dust.log("Using unescape filter on [" + string + "]", DEBUG)
                            } else {
                                if (typeof dust.filters[name] === "function") {
                                    string = dust.filters[name](string)
                                } else {
                                    dust.log("Invalid filter [" + name + "]", WARN)
                                }
                            }
                        }
                    }
                    if (auto) {
                        string = dust.filters[auto](string)
                    }
                    return string
                };
                dust.filters = {
                    h: function(value) {
                        return dust.escapeHtml(value)
                    },
                    j: function(value) {
                        return dust.escapeJs(value)
                    },
                    u: encodeURI,
                    uc: encodeURIComponent,
                    js: function(value) {
                        if (!JSON) {
                            dust.log("JSON is undefined.  JSON stringify has not been used on [" + value + "]", WARN);
                            return value
                        } else {
                            return JSON.stringify(value)
                        }
                    },
                    jp: function(value) {
                        if (!JSON) {
                            dust.log("JSON is undefined.  JSON parse has not been used on [" + value + "]", WARN);
                            return value
                        } else {
                            return JSON.parse(value)
                        }
                    }
                };

                function Context(stack, global, blocks, templateName) {
                    this.stack = stack;
                    this.global = global;
                    this.blocks = blocks;
                    this.templateName = templateName
                }
                dust.makeBase = function(global) {
                    return new Context(new Stack(), global)
                };
                Context.wrap = function(context, name) {
                    if (context instanceof Context) {
                        return context
                    }
                    return new Context(new Stack(context), {}, null, name)
                };
                Context.prototype.get = function(path, cur) {
                    if (typeof path === "string") {
                        if (path[0] === ".") {
                            cur = true;
                            path = path.substr(1)
                        }
                        path = path.split(".")
                    }
                    return this._get(cur, path)
                };
                Context.prototype._get = function(cur, down) {
                    var ctx = this.stack,
                        i = 1,
                        value, first, len, ctxThis;
                    dust.log("Searching for reference [{" + down.join(".") + "}] in template [" + this.getTemplateName() + "]", DEBUG);
                    first = down[0];
                    len = down.length;
                    if (cur && len === 0) {
                        ctxThis = ctx;
                        ctx = ctx.head
                    } else {
                        if (!cur) {
                            while (ctx) {
                                if (ctx.isObject) {
                                    ctxThis = ctx.head;
                                    value = ctx.head[first];
                                    if (value !== undefined) {
                                        break
                                    }
                                }
                                ctx = ctx.tail
                            }
                            if (value !== undefined) {
                                ctx = value
                            } else {
                                ctx = this.global ? this.global[first] : undefined
                            }
                        } else {
                            ctx = ctx.head[first]
                        }
                        while (ctx && i < len) {
                            ctxThis = ctx;
                            ctx = ctx[down[i]];
                            i++
                        }
                    } if (typeof ctx === "function") {
                        var fn = function() {
                            try {
                                return ctx.apply(ctxThis, arguments)
                            } catch (err) {
                                return dust.log(err, ERROR)
                            }
                        };
                        fn.isFunction = true;
                        return fn
                    } else {
                        if (ctx === undefined) {
                            dust.log("Cannot find the value for reference [{" + down.join(".") + "}] in template [" + this.getTemplateName() + "]")
                        }
                        return ctx
                    }
                };
                Context.prototype.getPath = function(cur, down) {
                    return this._get(cur, down)
                };
                Context.prototype.push = function(head, idx, len) {
                    return new Context(new Stack(head, this.stack, idx, len), this.global, this.blocks, this.getTemplateName())
                };
                Context.prototype.rebase = function(head) {
                    return new Context(new Stack(head), this.global, this.blocks, this.getTemplateName())
                };
                Context.prototype.current = function() {
                    return this.stack.head
                };
                Context.prototype.getBlock = function(key, chk, ctx) {
                    if (typeof key === "function") {
                        var tempChk = new Chunk();
                        key = key(tempChk, this).data.join("")
                    }
                    var blocks = this.blocks;
                    if (!blocks) {
                        dust.log("No blocks for context[{" + key + "}] in template [" + this.getTemplateName() + "]", DEBUG);
                        return
                    }
                    var len = blocks.length,
                        fn;
                    while (len--) {
                        fn = blocks[len][key];
                        if (fn) {
                            return fn
                        }
                    }
                };
                Context.prototype.shiftBlocks = function(locals) {
                    var blocks = this.blocks,
                        newBlocks;
                    if (locals) {
                        if (!blocks) {
                            newBlocks = [locals]
                        } else {
                            newBlocks = blocks.concat([locals])
                        }
                        return new Context(this.stack, this.global, newBlocks, this.getTemplateName())
                    }
                    return this
                };
                Context.prototype.getTemplateName = function() {
                    return this.templateName
                };

                function Stack(head, tail, idx, len) {
                    this.tail = tail;
                    this.isObject = head && typeof head === "object";
                    this.head = head;
                    this.index = idx;
                    this.of = len
                }

                function Stub(callback) {
                    this.head = new Chunk(this);
                    this.callback = callback;
                    this.out = ""
                }
                Stub.prototype.flush = function() {
                    var chunk = this.head;
                    while (chunk) {
                        if (chunk.flushable) {
                            this.out += chunk.data.join("")
                        } else {
                            if (chunk.error) {
                                this.callback(chunk.error);
                                dust.log("Chunk error [" + chunk.error + "] thrown. Ceasing to render this template.", WARN);
                                this.flush = EMPTY_FUNC;
                                return
                            } else {
                                return
                            }
                        }
                        chunk = chunk.next;
                        this.head = chunk
                    }
                    this.callback(null, this.out)
                };

                function Stream() {
                    this.head = new Chunk(this)
                }
                Stream.prototype.flush = function() {
                    var chunk = this.head;
                    while (chunk) {
                        if (chunk.flushable) {
                            this.emit("data", chunk.data.join(""))
                        } else {
                            if (chunk.error) {
                                this.emit("error", chunk.error);
                                dust.log("Chunk error [" + chunk.error + "] thrown. Ceasing to render this template.", WARN);
                                this.flush = EMPTY_FUNC;
                                return
                            } else {
                                return
                            }
                        }
                        chunk = chunk.next;
                        this.head = chunk
                    }
                    this.emit("end")
                };
                Stream.prototype.emit = function(type, data) {
                    if (!this.events) {
                        dust.log("No events to emit", INFO);
                        return false
                    }
                    var handler = this.events[type];
                    if (!handler) {
                        dust.log("Event type [" + type + "] does not exist", WARN);
                        return false
                    }
                    if (typeof handler === "function") {
                        handler(data)
                    } else {
                        if (dust.isArray(handler)) {
                            var listeners = handler.slice(0);
                            for (var i = 0, l = listeners.length; i < l; i++) {
                                listeners[i](data)
                            }
                        } else {
                            dust.log("Event Handler [" + handler + "] is not of a type that is handled by emit", WARN)
                        }
                    }
                };
                Stream.prototype.on = function(type, callback) {
                    if (!this.events) {
                        this.events = {}
                    }
                    if (!this.events[type]) {
                        dust.log("Event type [" + type + "] does not exist. Using just the specified callback.", WARN);
                        if (callback) {
                            this.events[type] = callback
                        } else {
                            dust.log("Callback for type [" + type + "] does not exist. Listener not registered.", WARN)
                        }
                    } else {
                        if (typeof this.events[type] === "function") {
                            this.events[type] = [this.events[type], callback]
                        } else {
                            this.events[type].push(callback)
                        }
                    }
                    return this
                };
                Stream.prototype.pipe = function(stream) {
                    this.on("data", function(data) {
                        try {
                            stream.write(data, "utf8")
                        } catch (err) {
                            dust.log(err, ERROR)
                        }
                    }).on("end", function() {
                        try {
                            return stream.end()
                        } catch (err) {
                            dust.log(err, ERROR)
                        }
                    }).on("error", function(err) {
                        stream.error(err)
                    });
                    return this
                };

                function Chunk(root, next, taps) {
                    this.root = root;
                    this.next = next;
                    this.data = [];
                    this.flushable = false;
                    this.taps = taps
                }
                Chunk.prototype.write = function(data) {
                    var taps = this.taps;
                    if (taps) {
                        data = taps.go(data)
                    }
                    this.data.push(data);
                    return this
                };
                Chunk.prototype.end = function(data) {
                    if (data) {
                        this.write(data)
                    }
                    this.flushable = true;
                    this.root.flush();
                    return this
                };
                Chunk.prototype.map = function(callback) {
                    var cursor = new Chunk(this.root, this.next, this.taps),
                        branch = new Chunk(this.root, cursor, this.taps);
                    this.next = branch;
                    this.flushable = true;
                    callback(branch);
                    return cursor
                };
                Chunk.prototype.tap = function(tap) {
                    var taps = this.taps;
                    if (taps) {
                        this.taps = taps.push(tap)
                    } else {
                        this.taps = new Tap(tap)
                    }
                    return this
                };
                Chunk.prototype.untap = function() {
                    this.taps = this.taps.tail;
                    return this
                };
                Chunk.prototype.render = function(body, context) {
                    return body(this, context)
                };
                Chunk.prototype.reference = function(elem, context, auto, filters) {
                    if (typeof elem === "function") {
                        elem.isFunction = true;
                        elem = elem.apply(context.current(), [this, context, null, {
                            auto: auto,
                            filters: filters
                        }]);
                        if (elem instanceof Chunk) {
                            return elem
                        }
                    }
                    if (!dust.isEmpty(elem)) {
                        return this.write(dust.filter(elem, auto, filters))
                    } else {
                        return this
                    }
                };
                Chunk.prototype.section = function(elem, context, bodies, params) {
                    if (typeof elem === "function") {
                        elem = elem.apply(context.current(), [this, context, bodies, params]);
                        if (elem instanceof Chunk) {
                            return elem
                        }
                    }
                    var body = bodies.block,
                        skip = bodies["else"];
                    if (params) {
                        context = context.push(params)
                    }
                    if (dust.isArray(elem)) {
                        if (body) {
                            var len = elem.length,
                                chunk = this;
                            if (len > 0) {
                                if (context.stack.head) {
                                    context.stack.head["$len"] = len
                                }
                                for (var i = 0; i < len; i++) {
                                    if (context.stack.head) {
                                        context.stack.head["$idx"] = i
                                    }
                                    chunk = body(chunk, context.push(elem[i], i, len))
                                }
                                if (context.stack.head) {
                                    context.stack.head["$idx"] = undefined;
                                    context.stack.head["$len"] = undefined
                                }
                                return chunk
                            } else {
                                if (skip) {
                                    return skip(this, context)
                                }
                            }
                        }
                    } else {
                        if (elem === true) {
                            if (body) {
                                return body(this, context)
                            }
                        } else {
                            if (elem || elem === 0) {
                                if (body) {
                                    return body(this, context.push(elem))
                                }
                            } else {
                                if (skip) {
                                    return skip(this, context)
                                }
                            }
                        }
                    }
                    dust.log("Not rendering section (#) block in template [" + context.getTemplateName() + "], because above key was not found", DEBUG);
                    return this
                };
                Chunk.prototype.exists = function(elem, context, bodies) {
                    var body = bodies.block,
                        skip = bodies["else"];
                    if (!dust.isEmpty(elem)) {
                        if (body) {
                            return body(this, context)
                        }
                    } else {
                        if (skip) {
                            return skip(this, context)
                        }
                    }
                    dust.log("Not rendering exists (?) block in template [" + context.getTemplateName() + "], because above key was not found", DEBUG);
                    return this
                };
                Chunk.prototype.notexists = function(elem, context, bodies) {
                    var body = bodies.block,
                        skip = bodies["else"];
                    if (dust.isEmpty(elem)) {
                        if (body) {
                            return body(this, context)
                        }
                    } else {
                        if (skip) {
                            return skip(this, context)
                        }
                    }
                    dust.log("Not rendering not exists (^) block check in template [" + context.getTemplateName() + "], because above key was found", DEBUG);
                    return this
                };
                Chunk.prototype.block = function(elem, context, bodies) {
                    var body = bodies.block;
                    if (elem) {
                        body = elem
                    }
                    if (body) {
                        return body(this, context)
                    }
                    return this
                };
                Chunk.prototype.partial = function(elem, context, params) {
                    var partialContext;
                    partialContext = dust.makeBase(context.global);
                    partialContext.blocks = context.blocks;
                    if (context.stack && context.stack.tail) {
                        partialContext.stack = context.stack.tail
                    }
                    if (params) {
                        partialContext = partialContext.push(params)
                    }
                    if (typeof elem === "string") {
                        partialContext.templateName = elem
                    }
                    partialContext = partialContext.push(context.stack.head);
                    var partialChunk;
                    if (typeof elem === "function") {
                        partialChunk = this.capture(elem, partialContext, function(name, chunk) {
                            partialContext.templateName = partialContext.templateName || name;
                            dust.load(name, chunk, partialContext).end()
                        })
                    } else {
                        partialChunk = dust.load(elem, this, partialContext)
                    }
                    return partialChunk
                };
                Chunk.prototype.helper = function(name, context, bodies, params) {
                    var chunk = this;
                    try {
                        if (dust.helpers[name]) {
                            return dust.helpers[name](chunk, context, bodies, params)
                        } else {
                            dust.log("Invalid helper [" + name + "]", WARN);
                            return chunk
                        }
                    } catch (err) {
                        dust.log(err, ERROR);
                        return chunk
                    }
                };
                Chunk.prototype.capture = function(body, context, callback) {
                    return this.map(function(chunk) {
                        var stub = new Stub(function(err, out) {
                            if (err) {
                                chunk.setError(err)
                            } else {
                                callback(out, chunk)
                            }
                        });
                        body(stub.head, context).end()
                    })
                };
                Chunk.prototype.setError = function(err) {
                    this.error = err;
                    this.root.flush();
                    return this
                };

                function Tap(head, tail) {
                    this.head = head;
                    this.tail = tail
                }
                Tap.prototype.push = function(tap) {
                    return new Tap(tap, this)
                };
                Tap.prototype.go = function(value) {
                    var tap = this;
                    while (tap) {
                        value = tap.head(value);
                        tap = tap.tail
                    }
                    return value
                };
                var HCHARS = new RegExp(/[&<>\"\']/),
                    AMP = /&/g,
                    LT = /</g,
                    GT = />/g,
                    QUOT = /\"/g,
                    SQUOT = /\'/g;
                dust.escapeHtml = function(s) {
                    if (typeof s === "string") {
                        if (!HCHARS.test(s)) {
                            return s
                        }
                        return s.replace(AMP, "&amp;").replace(LT, "&lt;").replace(GT, "&gt;").replace(QUOT, "&quot;").replace(SQUOT, "&#39;")
                    }
                    return s
                };
                var BS = /\\/g,
                    FS = /\//g,
                    CR = /\r/g,
                    LS = /\u2028/g,
                    PS = /\u2029/g,
                    NL = /\n/g,
                    LF = /\f/g,
                    SQ = /'/g,
                    DQ = /"/g,
                    TB = /\t/g;
                dust.escapeJs = function(s) {
                    if (typeof s === "string") {
                        return s.replace(BS, "\\\\").replace(FS, "\\/").replace(DQ, '\\"').replace(SQ, "\\'").replace(CR, "\\r").replace(LS, "\\u2028").replace(PS, "\\u2029").replace(NL, "\\n").replace(LF, "\\f").replace(TB, "\\t")
                    }
                    return s
                };
                if (typeof exports === "object") {
                    module.exports = dust
                } else {
                    root.dust = dust
                }
            })(this)
        }, {}
    ],
    69: [
        function(b, f, a) {
            var d = b("./ac-ajax/Ajax");
            var c = b("./ac-ajax/Request");
            f.exports = new d();
            f.exports.Ajax = d;
            f.exports.Request = c
        }, {
            "./ac-ajax/Ajax": 70,
            "./ac-ajax/Request": 71
        }
    ],
    70: [
        function(c, g, b) {
            var f = c("./Request");
            var h = c("./XDomain-request");
            var a = c("./URLParser");
            var d = function() {};
            d._Request = f;
            d.prototype = {
                _defaults: {
                    method: "get",
                    timeout: 5000
                },
                _extend: function() {
                    for (var k = 1; k < arguments.length; k++) {
                        for (var j in arguments[k]) {
                            if (arguments[k].hasOwnProperty(j)) {
                                arguments[0][j] = arguments[k][j]
                            }
                        }
                    }
                    return arguments[0]
                },
                _getOptions: function(i, j) {
                    return this._extend({}, this._defaults, j, i)
                },
                create: function(i) {
                    return new f(i)
                },
                cors: function(j) {
                    var i = (window.XDomainRequest && document.documentMode < 10) ? h : f;
                    return new i(j)
                },
                _isCrossDomainRequest: function(l) {
                    var k = new a();
                    var j = k.parse(window.location.href).origin;
                    var i = k.parse(l).origin;
                    k.destroy();
                    return (i !== j)
                },
                get: function(j) {
                    var i;
                    j = this._getOptions({
                        method: "get"
                    }, j);
                    if (this._isCrossDomainRequest(j.url)) {
                        i = this.cors(j)
                    } else {
                        i = this.create(j)
                    }
                    return i.send()
                },
                getJSON: function(i) {
                    return this.get(i).then(function(j) {
                        return JSON.parse(j.responseText)
                    })
                },
                head: function(i) {
                    i = this._getOptions({
                        method: "head"
                    }, i);
                    return this.create(i).send()
                },
                post: function(i) {
                    i = this._getOptions({
                        method: "post"
                    }, i);
                    return this.create(i).send()
                }
            };
            g.exports = d
        }, {
            "./Request": 71,
            "./URLParser": 72,
            "./XDomain-request": 73
        }
    ],
    71: [
        function(b, d, a) {
            var c = function(f) {
                this._initialize(f)
            };
            c.create = function() {
                var f = function() {};
                f.prototype = c.prototype;
                return new f()
            };
            c.prototype = {
                _addReadyStateChangeHandler: function() {
                    this.xhr.onreadystatechange = function(f) {
                        if (this.xhr.readyState === 4) {
                            clearTimeout(this._timeout);
                            if (this.xhr.status >= 200 && this.xhr.status < 300) {
                                this.resolve(this.xhr)
                            } else {
                                this.reject(this.xhr)
                            }
                        }
                    }.bind(this)
                },
                _getPromise: function() {
                    this.promise = new Promise(function(g, f) {
                        this.resolve = g;
                        this.reject = f
                    }.bind(this))
                },
                _getTransport: function() {
                    return new XMLHttpRequest()
                },
                _initialize: function(h) {
                    var g = this._validateConfiguration(h);
                    if (g) {
                        throw g
                    }
                    this._configuration = h;
                    var f = this._configuration.method.toUpperCase();
                    this.xhr = this._getTransport();
                    this._getPromise();
                    this.xhr.open(f, this._configuration.url);
                    this._setRequestHeaders(h.headers);
                    this._addReadyStateChangeHandler()
                },
                _sendXHR: function() {
                    if (this.xhr) {
                        if (this._configuration && this._configuration.data) {
                            this.xhr.send(this._configuration.data)
                        } else {
                            this.xhr.send()
                        }
                    }
                },
                _setRequestHeaders: function(f) {
                    if (f) {
                        f.forEach(function(g) {
                            this.xhr.setRequestHeader(g.name, g.value)
                        }, this)
                    }
                },
                _setTimeout: function(f) {
                    if (!f) {
                        if (this._configuration && this._configuration.timeout) {
                            f = this._configuration.timeout
                        } else {
                            clearTimeout(this._timeout);
                            this._timeout = null
                        }
                    }
                    if (this._timeout !== null) {
                        clearTimeout(this._timeout)
                    }
                    if (f > 0) {
                        this._timeout = setTimeout(function() {
                            this.xhr.abort();
                            this.reject()
                        }.bind(this), f)
                    }
                },
                _timeout: null,
                _validateConfiguration: function(h) {
                    if (!h) {
                        return "Must provide a configuration object"
                    }
                    var g = [];
                    var f = h.headers;
                    if (!h.url) {
                        g.push("Must provide a url")
                    }
                    if (!h.method) {
                        g.push("Must provide a method")
                    }
                    if (f) {
                        if (!Array.isArray(f)) {
                            return "Must provide an array of headers"
                        }
                        this._validateHeaders(f, g)
                    }
                    return g.join(", ")
                },
                _validateHeaders: function(h, j) {
                    for (var g = 0, f = h.length; g < f; g++) {
                        if (!h[g].hasOwnProperty("name") || !h[g].hasOwnProperty("value")) {
                            j.push("Must provide a name and value key for all headers");
                            break
                        }
                    }
                },
                promise: null,
                reject: null,
                resolve: null,
                send: function() {
                    this._setTimeout();
                    this._sendXHR();
                    return this.promise
                },
                xhr: null
            };
            d.exports = c
        }, {}
    ],
    72: [
        function(c, d, b) {
            var a = function() {
                this.parser = null
            };
            var f = a.prototype;
            f.parse = function(k) {
                var i;
                var l;
                var h;
                var g;
                var j;
                if (typeof k !== "string") {
                    throw new TypeError(k + " must be a string")
                }
                if (!this.parser) {
                    this.parser = document.createElement("a")
                }
                this._qualifyPath(k);
                h = this.parser.hostname;
                l = this.parser.protocol;
                g = this._normalizePort(this.parser);
                i = this.parser.origin || this._constructOriginString(this.parser, g);
                j = this.parser.search;
                return {
                    originalPath: k,
                    qualifiedPath: this.parser.href,
                    protocol: l,
                    hostname: h,
                    origin: i,
                    port: g,
                    search: j
                }
            };
            f.destroy = function() {
                this.parser = null
            };
            f._constructOriginString = function(i, g) {
                var h = g ? ":" + g : "";
                return i.protocol + "//" + i.hostname + h
            };
            f._normalizePort = function(g) {
                return (g.port === "80" || g.port === "443" || g.port === "0") ? "" : g.port
            };
            f._qualifyPath = function(g) {
                this.parser.href = g;
                this.parser.href = this.parser.href
            };
            d.exports = a
        }, {}
    ],
    73: [
        function(b, d, a) {
            var c = b("./Request");
            var f = function(g) {
                c.apply(this, arguments)
            };
            f.prototype = c.create();
            f.prototype._getTransport = function() {
                return new XDomainRequest()
            };
            f.prototype._addReadyStateChangeHandler = function() {
                this.xhr.ontimeout = function() {
                    this.reject(this.xhr)
                }.bind(this);
                this.xhr.onerror = function() {
                    this.reject(this.xhr)
                }.bind(this);
                this.xhr.onload = function() {
                    this.resolve(this.xhr)
                }.bind(this)
            };
            f.prototype._setTimeout = function(g) {
                if (!g) {
                    if (this._configuration && this._configuration.timeout) {
                        g = this._configuration.timeout
                    }
                }
                if (g > 0) {
                    this.xhr.timeout = g
                }
            };
            d.exports = f
        }, {
            "./Request": 71
        }
    ],
    74: [
        function(i, c, x) {
            var s = Object.prototype.toString;
            var l = Object.prototype.hasOwnProperty;
            var b = typeof Array.prototype.indexOf === "function" ? function(z, A) {
                    return z.indexOf(A)
                } : function(z, B) {
                    for (var A = 0; A < z.length; A++) {
                        if (z[A] === B) {
                            return A
                        }
                    }
                    return -1
                };
            var k = Array.isArray || function(z) {
                    return s.call(z) == "[object Array]"
                };
            var v = Object.keys || function(B) {
                    var z = [];
                    for (var A in B) {
                        if (B.hasOwnProperty(A)) {
                            z.push(A)
                        }
                    }
                    return z
                };
            var u = typeof Array.prototype.forEach === "function" ? function(z, A) {
                    return z.forEach(A)
                } : function(z, B) {
                    for (var A = 0; A < z.length; A++) {
                        B(z[A])
                    }
                };
            var m = function(z, D, A) {
                if (typeof z.reduce === "function") {
                    return z.reduce(D, A)
                }
                var C = A;
                for (var B = 0; B < z.length; B++) {
                    C = D(C, z[B])
                }
                return C
            };
            var y = /^[0-9]+$/;

            function d(C, B) {
                if (C[B].length == 0) {
                    return C[B] = {}
                }
                var A = {};
                for (var z in C[B]) {
                    if (l.call(C[B], z)) {
                        A[z] = C[B][z]
                    }
                }
                C[B] = A;
                return A
            }

            function q(D, B, A, E) {
                var z = D.shift();
                if (l.call(Object.prototype, A)) {
                    return
                }
                if (!z) {
                    if (k(B[A])) {
                        B[A].push(E)
                    } else {
                        if ("object" == typeof B[A]) {
                            B[A] = E
                        } else {
                            if ("undefined" == typeof B[A]) {
                                B[A] = E
                            } else {
                                B[A] = [B[A], E]
                            }
                        }
                    }
                } else {
                    var C = B[A] = B[A] || [];
                    if ("]" == z) {
                        if (k(C)) {
                            if ("" != E) {
                                C.push(E)
                            }
                        } else {
                            if ("object" == typeof C) {
                                C[v(C).length] = E
                            } else {
                                C = B[A] = [B[A], E]
                            }
                        }
                    } else {
                        if (~b(z, "]")) {
                            z = z.substr(0, z.length - 1);
                            if (!y.test(z) && k(C)) {
                                C = d(B, A)
                            }
                            q(D, C, z, E)
                        } else {
                            if (!y.test(z) && k(C)) {
                                C = d(B, A)
                            }
                            q(D, C, z, E)
                        }
                    }
                }
            }

            function f(D, C, G) {
                if (~b(C, "]")) {
                    var F = C.split("["),
                        z = F.length,
                        E = z - 1;
                    q(F, D, "base", G)
                } else {
                    if (!y.test(C) && k(D.base)) {
                        var B = {};
                        for (var A in D.base) {
                            B[A] = D.base[A]
                        }
                        D.base = B
                    }
                    n(D.base, C, G)
                }
                return D
            }

            function o(C) {
                if ("object" != typeof C) {
                    return C
                }
                if (k(C)) {
                    var z = [];
                    for (var B in C) {
                        if (l.call(C, B)) {
                            z.push(C[B])
                        }
                    }
                    return z
                }
                for (var A in C) {
                    C[A] = o(C[A])
                }
                return C
            }

            function g(A) {
                var z = {
                    base: {}
                };
                u(v(A), function(B) {
                    f(z, B, A[B])
                });
                return o(z.base)
            }

            function h(A) {
                var z = m(String(A).split("&"), function(B, F) {
                    var G = b(F, "="),
                        E = t(F),
                        C = F.substr(0, E || G),
                        D = F.substr(E || G, F.length),
                        D = D.substr(b(D, "=") + 1, D.length);
                    if ("" == C) {
                        C = F, D = ""
                    }
                    if ("" == C) {
                        return B
                    }
                    return f(B, p(C), p(D))
                }, {
                    base: {}
                }).base;
                return o(z)
            }
            x.parse = function(z) {
                if (null == z || "" == z) {
                    return {}
                }
                return "object" == typeof z ? g(z) : h(z)
            };
            var r = x.stringify = function(A, z) {
                if (k(A)) {
                    return j(A, z)
                } else {
                    if ("[object Object]" == s.call(A)) {
                        return w(A, z)
                    } else {
                        if ("string" == typeof A) {
                            return a(A, z)
                        } else {
                            return z + "=" + encodeURIComponent(String(A))
                        }
                    }
                }
            };

            function a(A, z) {
                if (!z) {
                    throw new TypeError("stringify expects an object")
                }
                return z + "=" + encodeURIComponent(A)
            }

            function j(z, C) {
                var A = [];
                if (!C) {
                    throw new TypeError("stringify expects an object")
                }
                for (var B = 0; B < z.length; B++) {
                    A.push(r(z[B], C + "[" + B + "]"))
                }
                return A.join("&")
            }

            function w(F, E) {
                var A = [],
                    D = v(F),
                    C;
                for (var B = 0, z = D.length; B < z; ++B) {
                    C = D[B];
                    if ("" == C) {
                        continue
                    }
                    if (null == F[C]) {
                        A.push(encodeURIComponent(C) + "=")
                    } else {
                        A.push(r(F[C], E ? E + "[" + encodeURIComponent(C) + "]" : encodeURIComponent(C)))
                    }
                }
                return A.join("&")
            }

            function n(B, A, C) {
                var z = B[A];
                if (l.call(Object.prototype, A)) {
                    return
                }
                if (undefined === z) {
                    B[A] = C
                } else {
                    if (k(z)) {
                        z.push(C)
                    } else {
                        B[A] = [z, C]
                    }
                }
            }

            function t(C) {
                var z = C.length,
                    B, D;
                for (var A = 0; A < z; ++A) {
                    D = C[A];
                    if ("]" == D) {
                        B = false
                    }
                    if ("[" == D) {
                        B = true
                    }
                    if ("=" == D && !B) {
                        return A
                    }
                }
            }

            function p(A) {
                try {
                    return decodeURIComponent(A.replace(/\+/g, " "))
                } catch (z) {
                    return A
                }
            }
        }, {}
    ],
    75: [
        function(b, c, a) {
            c.exports = {
                isString: b("./ac-string/isString"),
                toCamelCase: b("./ac-string/toCamelCase"),
                queryStringToObject: b("./ac-string/queryStringToObject"),
                toQueryPair: b("./ac-string/toQueryPair"),
                queryParameters: b("./ac-string/queryParameters"),
                supplant: b("./ac-string/supplant")
            }
        }, {
            "./ac-string/isString": 76,
            "./ac-string/queryParameters": 77,
            "./ac-string/queryStringToObject": 78,
            "./ac-string/supplant": 79,
            "./ac-string/toCamelCase": 80,
            "./ac-string/toQueryPair": 81
        }
    ],
    76: [
        function(c, d, b) {
            d.exports = function a(f) {
                return (typeof f === "string")
            }
        }, {}
    ],
    77: [
        function(d, f, c) {
            var a = d("./queryStringToObject");
            f.exports = function b() {
                var g = {};
                var h = window.location.toString().split("?")[1];
                if (typeof h === "string") {
                    g = a(h)
                }
                return g
            }
        }, {
            "./queryStringToObject": 78
        }
    ],
    78: [
        function(d, f, c) {
            var a = d("qs");
            f.exports = function b(g) {
                if (typeof g !== "string") {
                    throw new TypeError("QueryStringToObject error: argument must be a string")
                }
                return a.parse(g)
            }
        }, {
            qs: 74
        }
    ],
    79: [
        function(b, c, a) {
            c.exports = function d(h, g, f) {
                if (!g) {
                    return h
                }
                f = f || /{([^{}]*)}/g;
                return h.replace(f, function(j, i) {
                    var k = g[i];
                    return typeof k === "string" || typeof k === "number" ? k : j
                })
            }
        }, {}
    ],
    80: [
        function(b, c, a) {
            c.exports = function d(f) {
                if (typeof f !== "string") {
                    throw new TypeError("Argument must be of type String.")
                }
                return f.replace(/-+(.)?/g, function(g, h) {
                    return h ? h.toUpperCase() : ""
                })
            }
        }, {}
    ],
    81: [
        function(b, c, a) {
            c.exports = function d(f, g) {
                if (typeof f !== "string" || typeof g !== "string") {
                    throw new TypeError("toQueryPair error: argument must be a string")
                }
                return encodeURIComponent(f) + "=" + encodeURIComponent(g)
            }
        }, {}
    ],
    82: [
        function(c, d, b) {
            var a = c("./ac-vatman/vat-client");
            var f = c("./ac-vatman/vat-resource");
            var g = {
                vatClient: a,
                vatResource: f
            };
            d.exports = g
        }, {
            "./ac-vatman/vat-client": 83,
            "./ac-vatman/vat-resource": 84
        }
    ],
    83: [
        function(d, c, g) {
            var j = d("ac-ajax");
            var h = d("ac-string");
            var k = /(-[a-z]{2}-([a-z]{2}-){0,})[0-9]{8}_r[0-9].+\.mov$/;
            var b = /_r[0-9].+\.mov$/;
            var i = /((-([a-z]{2}))*)-[0-9]+/;
            var m = /((-([a-z]{2}))*)-/;
            var a = "m";
            var f = "_{width}x{height}{suffix}." + a + "p4";
            var l = [{
                width: 416,
                height: 234,
                type: "baseline-high",
                suffix: "h"
            }, {
                width: 416,
                height: 234,
                type: "small",
                suffix: "h"
            }, {
                width: 416,
                height: 234,
                type: "baseline-low",
                suffix: "l"
            }, {
                width: 416,
                height: 234,
                type: "baseline-medium",
                suffix: "m"
            }, {
                width: 640,
                height: 360,
                type: "medium",
                suffix: "h"
            }, {
                width: 848,
                height: 480,
                type: "large",
                suffix: ""
            }];
            var n = {
                create: function() {
                    var o = function() {};
                    o.prototype = this;
                    return new o()
                },
                getSource: function(o, q, p) {
                    var s = l;
                    if (!o) {
                        throw "Must provide a vatRefMovie"
                    }
                    if (!q) {
                        throw "Must provide a width"
                    }
                    if (p) {
                        s = s.filter(function(t) {
                            return t.type === p
                        })
                    }
                    var r = s.reduce(function(t, u) {
                        return Math.abs(u.width - q) < Math.abs(t.width - q) ? u : t
                    });
                    return o.replace(b, h.supplant(f, r))
                },
                getConfigPath: function(o) {
                    return o.replace(k, "-current.json")
                },
                getConfig: function(o) {
                    return j.getJSON({
                        url: this.getConfigPath(o)
                    })
                },
                getVTTSource: function(o) {
                    return o.replace(b, "_cc.vtt")
                }
            };
            c.exports = n
        }, {
            "ac-ajax": 69,
            "ac-string": 75
        }
    ],
    84: [
        function(c, d, b) {
            var a = c("./vat-client");
            var f = {
                create: function(h) {
                    if (!h) {
                        throw "Must provide a vatRefMovie."
                    }
                    var i = function() {};
                    i.prototype = this;
                    var g = new i();
                    g.vatRefMovie = h;
                    return g
                },
                getSource: function(h, g) {
                    return a.getSource(this.vatRefMovie, h, g)
                },
                getConfig: function() {
                    return a.getConfig(this.vatRefMovie)
                },
                getVTTSource: function() {
                    return a.getVTTSource(this.vatRefMovie)
                }
            };
            d.exports = f
        }, {
            "./vat-client": 83
        }
    ],
    "dust-runtime": [
        function(b, c, a) {
            c.exports = b("EVc30+")
        }, {}
    ],
    "EVc30+": [
        function(b, c, a) {
            c.exports = b(68)
        }, {}
    ],
    "8m2ENo": [
        function(b, c, a) {
            c.exports = (function() {
                var d = b("./dust-runtime");
                (function() {
                    d.register("controlBarDefault", h);

                    function h(j, i) {
                        return j.write('<div aria-label="Video playback" class="').reference(i._get(false, ["values", "controlbarskinning"]), i, "h").write(' acv-controller-disabled" role="toolbar"><div class="ac-video-controlbar-elements"><button aria-label="').reference(i._get(false, ["values", "localizedText", "mutevolume"]), i, "h").write('" data-ac-video-element="minVolumeButton" class="acv-button acv-minvolume" tabindex="0"></button><div data-ac-video-element="volumeSlider" class="acv-button acv-volumeslider ac-media-volume-slider"><div class="acv-volumeslider-inputrange"></div></div><button aria-label="').reference(i._get(false, ["values", "localizedText", "fullvolume"]), i, "h").write('" data-ac-video-element="maxVolumeButton" class="acv-button acv-maxvolume" tabindex="0"></button><button aria-label="').reference(i._get(false, ["values", "localizedText", "play"]), i, "h").write('" data-ac-video-element="playPauseButton" class="acv-button acv-playpause" tabindex="0" role="button"></button>').notexists(i._get(false, ["values", "disablecaptionscontrol"]), i, {
                            block: g
                        }, null).exists(i._get(false, ["values", "usesFullScreen"]), i, {
                            block: f
                        }, null).write('<div data-ac-video-element="progressSlider" class="acv-button acv-progressslider"><span aria-label="').reference(i._get(false, ["values", "localizedText", "elapsed"]), i, "h").write('" class="acv-text acv-text-first acv-currenttime" data-ac-video-element="currentTimeText" role="timer" tabindex="0"></span><div class="acv-progressslider-inputrange"></div><span aria-label="').reference(i._get(false, ["values", "localizedText", "remaining"]), i, "h").write('" class="acv-text acv-text-last acv-remainingtime" data-ac-video-element="remainingTimeText" role="timer" tabindex="0"></span></div>').reference(i._get(false, ["values", "controlsTemplateString"]), i, "h", ["s"]).write("</div></div>")
                    }

                    function g(j, i) {
                        return j.write('<button aria-label="').reference(i._get(false, ["values", "localizedText", "captionscontrol"]), i, "h").write('" data-ac-video-element="captionsButton" class="acv-button acv-captions" tabindex="0"></button>')
                    }

                    function f(j, i) {
                        return j.write('<button aria-label="Enable Full Screen" data-ac-video-element="fullScreenButton" class="acv-button acv-fullscreen" tabindex="0"></button>')
                    }
                    return h
                })();
                (function() {
                    d.register("controlBarStream", f);

                    function f(h, g) {
                        return h.write('<div aria-label="Video playback" class="').reference(g._get(false, ["values", "controlbarskinning"]), g, "h").write('" aria-role="toolbar"><div class="ac-video-controlbar-elements"><button aria-label="Min Volume" data-ac-video-element="minVolumeButton" class="acv-button acv-minvolume" tabindex="0"></button><div data-ac-video-element="volumeSlider" class="acv-button acv-volumeslider ac-media-volume-slider"><div class="acv-volumeslider-inputrange"></div></div><button aria-label="Max Volume" data-ac-video-element="maxVolumeButton" class="acv-button acv-maxvolume" tabindex="0"></button><button aria-label="Play" data-ac-video-element="playPauseButton" class="acv-button acv-playpause" tabindex="0" role="button"></button><button aria-label="Enable Captions" data-ac-video-element="captionsButton" class="acv-button acv-captions" tabindex="0"></button><button aria-label="Enable Full Screen" data-ac-video-element="fullScreenButton" class="acv-button acv-fullscreen" tabindex="0"></button><div class="acv-button acv-progressslider"><span aria-label="Elapsed" class="acv-text acv-text-first acv-currenttime" data-ac-video-element="currentTimeText" aria-role="timer" tabindex="0"></span></div>').reference(g._get(false, ["values", "controlsTemplateString"]), g, "h", ["s"]).write("</div></div>")
                    }
                    return f
                })();
                (function() {
                    d.register("controlBarString", f);

                    function f(h, g) {
                        return h.write('<div class="ac-video-controlbar" style="width:').reference(g._get(false, ["values", "width"]), g, "h").write('px;">').reference(g._get(false, ["values", "controlsTemplateString"]), g, "h", ["s"]).write("</div>")
                    }
                    return f
                })();
                (function() {
                    d.register("elementEmbed", i);

                    function i(k, j) {
                        return k.write('<embed src="').reference(j._get(false, ["source"]), j, "h").write('" ').notexists(j._get(false, ["responsive"]), j, {
                            block: h
                        }, null).write(" ").notexists(j._get(false, ["responsive"]), j, {
                            block: g
                        }, null).write(' class="ac-video-media" id="').reference(j._get(false, ["values", "id"]), j, "h").write('" wmode="transparent" name="').reference(j._get(false, ["values", "id"]), j, "h").write('" type="').reference(j._get(false, ["type"]), j, "h").write('" width="').reference(j._get(false, ["values", "width"]), j, "h").write('" height="').reference(j._get(false, ["values", "height"]), j, "h").write('" scale="tofit" enablejavascript="true" postdomevents="true" controller="false" ').exists(j._get(false, ["values", "autoplay"]), j, {
                            block: f
                        }, null).write(' poster="').reference(j._get(false, ["values", "poster"]), j, "h").write('" bgcolor="').reference(j._get(false, ["values", "bgcolor"]), j, "h").write('" style="width:').reference(j._get(false, ["values", "width"]), j, "h").write("px; height:").reference(j._get(false, ["values", "height"]), j, "h").write('px;"  pluginspage="www.apple.com/quicktime/download">')
                    }

                    function h(k, j) {
                        return k.write(' width="').reference(j._get(false, ["values", "width"]), j, "h").write('" height="').reference(j._get(false, ["values", "height"]), j, "h").write('"')
                    }

                    function g(k, j) {
                        return k.write(' style="width:').reference(j._get(false, ["values", "width"]), j, "h").write("px; height:").reference(j._get(false, ["values", "height"]), j, "h").write('px;"')
                    }

                    function f(k, j) {
                        return k.write("autoplay")
                    }
                    return i
                })();
                (function() {
                    d.register("elementObject", j);

                    function j(l, k) {
                        return l.write('<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" wmode="transparent" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0" id="').reference(k._get(false, ["values", "id"]), k, "h").write('" name="').reference(k._get(false, ["values", "id"]), k, "h").write('" class="ac-video-media movie-object" type="').reference(k._get(false, ["type"]), k, "h").write('" style="behavior:url(#').reference(k._get(false, ["values", "eventId"]), k, "h").write("); ").notexists(k._get(false, ["responsive"]), k, {
                            block: i
                        }, null).write('" ').notexists(k._get(false, ["responsive"]), k, {
                            block: h
                        }, null).write(' bgcolor="').reference(k._get(false, ["values", "bgcolor"]), k, "h").write('" poster="').reference(k._get(false, ["values", "poster"]), k, "h").write('"><param name="enablejavascript" value="true" /><param name="postdomevents" value="true" />').exists(k._get(false, ["values", "autoplay"]), k, {
                            block: g
                        }, null).notexists(k._get(false, ["values", "autoplay"]), k, {
                            block: f
                        }, null).write('<param name="scale" value="tofit" /><param name="controller" value="false" /><param name="kioskmode" value="true" /><param name="src" value="').reference(k._get(false, ["source"]), k, "h").write('" /><param name="pluginspace" value="http://www.apple.com/qtactivex/qtplugin.cab" /><param name="wmode" value="transparent"></object>')
                    }

                    function i(l, k) {
                        return l.write("width:").reference(k._get(false, ["values", "width"]), k, "h").write("px; height:").reference(k._get(false, ["values", "height"]), k, "h").write("px;")
                    }

                    function h(l, k) {
                        return l.write(' width="').reference(k._get(false, ["values", "width"]), k, "h").write('" height="').reference(k._get(false, ["values", "height"]), k, "h").write('" ')
                    }

                    function g(l, k) {
                        return l.write('<param name="autoplay" value="true" />')
                    }

                    function f(l, k) {
                        return l.write('<param name="autoplay" value="false" />')
                    }
                    return j
                })();
                (function() {
                    d.register("elementObjectEvent", f);

                    function f(h, g) {
                        return h.write('<object id="').reference(g._get(false, ["values", "eventId"]), g, "h").write('" wmode="transparent" classid="clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"></object>')
                    }
                    return f
                })();
                (function() {
                    d.register("elementVideo", j);

                    function j(o, n) {
                        return o.write('<video crossorigin="anonymous" class="ac-video-media" id="').reference(n._get(false, ["values", "id"]), n, "h").write('" poster="').reference(n._get(false, ["values", "poster"]), n, "h").write('" ').exists(n._get(false, ["values", "controls"]), n, {
                            block: i
                        }, null).write(" ").exists(n._get(false, ["values", "autoplay"]), n, {
                            block: h
                        }, null).write(" ").exists(n._get(false, ["values", "preload"]), n, {
                            block: g
                        }, null).write(' x-webkit-airplay="').reference(n._get(false, ["values", "airplay"]), n, "h").write('" ').exists(n._get(false, ["values", "bgcolor"]), n, {
                            block: f
                        }, null).write(" ").notexists(n._get(false, ["responsive"]), n, {
                            block: m
                        }, null).write(' style="').notexists(n._get(false, ["responsive"]), n, {
                            block: l
                        }, null).write('" ><source src="').reference(n._get(false, ["source"]), n, "h").write('" type="').reference(n._get(false, ["type"]), n, "h").write('" />').exists(n._get(false, ["captionsTrack"]), n, {
                            block: k
                        }, null).write("</video>")
                    }

                    function i(o, n) {
                        return o.write("controls")
                    }

                    function h(o, n) {
                        return o.write("autoplay")
                    }

                    function g(o, n) {
                        return o.write('preload="').reference(n._get(false, ["values", "preload"]), n, "h").write('"')
                    }

                    function f(o, n) {
                        return o.write('bgcolor="').reference(n._get(false, ["values", "bgcolor"]), n, "h").write('"')
                    }

                    function m(o, n) {
                        return o.write('width="').reference(n._get(false, ["values", "width"]), n, "h").write('" height="').reference(n._get(false, ["values", "height"]), n, "h").write('"')
                    }

                    function l(o, n) {
                        return o.write("width:").reference(n._get(false, ["values", "width"]), n, "h").write("px; height:").reference(n._get(false, ["values", "height"]), n, "h").write("px;")
                    }

                    function k(o, n) {
                        return o.write('<track src="').reference(n._get(false, ["captionsTrack"]), n, "h").write('" kind="captions" srclang="en" label="English" default />')
                    }
                    return j
                })();
                (function() {
                    d.register("masterTemplate", o);

                    function o(q, p) {
                        return q.write('<div class="ac-video-wrapper ').reference(p._get(false, ["values", "targetId"]), p, "h").write(" ac-video-template-").reference(p._get(false, ["videoTemplate"]), p, "h").write(" ").exists(p._get(false, ["values", "usesFullScreen"]), p, {
                            block: n
                        }, null).write('" id="').reference(p._get(false, ["values", "wrapperId"]), p, "h").write('" ').notexists(p._get(false, ["responsive"]), p, {
                            block: m
                        }, null).write('><div class="ac-video-event-blockade" ').notexists(p._get(false, ["responsive"]), p, {
                            block: l
                        }, null).write('>&nbsp; &nbsp; &nbsp; &nbsp;</div><button aria-label="Close Video" data-ac-video-element="closeButton" class="acv-button acv-close icon icon-before icon-closealt" tabindex="0"><label class="ac-element-label acv-text">Close</label></button>').exists(p._get(false, ["values", "poster"]), p, {
                            block: k
                        }, null).exists(p._get(false, ["values", "endframe"]), p, {
                            block: j
                        }, null).exists(p._get(false, ["videoTemplate"]), p, {
                            block: i
                        }, null).exists(p._get(false, ["values", "controlbar"]), p, {
                            block: g
                        }, null).write("</div>")
                    }

                    function n(q, p) {
                        return q.write("ac-video-has-fullscreen")
                    }

                    function m(q, p) {
                        return q.write('style="width:').reference(p._get(false, ["values", "width"]), p, "h").write("px;height:").reference(p._get(false, ["values", "height"]), p, "h").write('px"')
                    }

                    function l(q, p) {
                        return q.write('style="width:').reference(p._get(false, ["values", "width"]), p, "h").write("px; height:").reference(p._get(false, ["values", "height"]), p, "h").write('px;"')
                    }

                    function k(q, p) {
                        return q.write('<img width="').reference(p._get(false, ["values", "width"]), p, "h").write('px" height="').reference(p._get(false, ["values", "height"]), p, "h").write('px" src="').reference(p._get(false, ["values", "poster"]), p, "h").write('" class="ac-video-posterframe" data-ac-video-element="posterframe" alt="" />')
                    }

                    function j(q, p) {
                        return q.write('<img width="').reference(p._get(false, ["values", "width"]), p, "h").write('px" height="').reference(p._get(false, ["values", "height"]), p, "h").write('px" src="').reference(p._get(false, ["values", "endframe"]), p, "h").write('" class="ac-video-endframe acv-hide" data-ac-video-element="endframe" alt="" />')
                    }

                    function i(q, p) {
                        return q.partial(h, p, null)
                    }

                    function h(q, p) {
                        return q.reference(p._get(false, ["videoTemplate"]), p, "h")
                    }

                    function g(q, p) {
                        return q.partial(f, p, null)
                    }

                    function f(q, p) {
                        return q.reference(p._get(false, ["values", "controlbar"]), p, "h")
                    }
                    return o
                })();
                (function() {
                    d.register("native", h);

                    function h(j, i) {
                        return j.write('<div class="ac-video-wrapper native-controlbar ').reference(i._get(false, ["values", "targetId"]), i, "h").write('" id="').reference(i._get(false, ["values", "wrapperId"]), i, "h").write('" style="width:').reference(i._get(false, ["values", "width"]), i, "h").write("px;height:").reference(i._get(false, ["values", "height"]), i, "h").write('px;"><button aria-label="Close Video" data-ac-video-element="closeButton" class="acv-button acv-close icon icon-before icon-closealt" tabindex="0"><label class="ac-element-label acv-text">Close</label></button><div class="acv-native-playbutton"></div>').exists(i._get(false, ["videoTemplate"]), i, {
                            block: g
                        }, null).write("</div>")
                    }

                    function g(j, i) {
                        return j.partial(f, i, null)
                    }

                    function f(j, i) {
                        return j.reference(i._get(false, ["videoTemplate"]), i, "h")
                    }
                    return h
                })();
                (function() {
                    d.register("noVideoSupport", f);

                    function f(h, g) {
                        return h.write('<div class="ac-video-wrapper ').reference(g._get(false, ["values", "targetId"]), g, "h").write(' acv-no-video-support" id="').reference(g._get(false, ["values", "wrapperId"]), g, "h").write('" style="width:').reference(g._get(false, ["values", "width"]), g, "h").write("px;height:").reference(g._get(false, ["values", "height"]), g, "h").write('px;"><a onclick="s_objectID=&quot;http://www.apple.com/quicktime/download/_1&quot;;return this.s_oc?this.s_oc(e):true" href="').reference(g._get(false, ["values", "localizedText", "downloadquicktimeurl"]), g, "h").write('" class="ac-video-quicktime-download"><span class="ac-video-quicktime-download-title">').reference(g._get(false, ["values", "localizedText", "downloadquicktimetitle"]), g, "h").write('</span><span class="ac-video-quicktime-download-text">').reference(g._get(false, ["values", "localizedText", "downloadquicktimetext"]), g, "h").write('</span><span class="ac-video-quicktime-download-button">').reference(g._get(false, ["values", "localizedText", "downloadquicktimebutton"]), g, "h").write("</span></a></div>")
                    }
                    return f
                })();
                (function() {
                    d.register("steamVideoElement", j);

                    function j(l, k) {
                        return l.write('<video crossorigin="anonymous" class="ac-video-media" id="').reference(k._get(false, ["values", "id"]), k, "h").write('" poster="').reference(k._get(false, ["values", "poster"]), k, "h").write('" ').exists(k._get(false, ["values", "controls"]), k, {
                            block: i
                        }, null).write(" ").exists(k._get(false, ["values", "autoplay"]), k, {
                            block: h
                        }, null).write(" ").exists(k._get(false, ["values", "preload"]), k, {
                            block: g
                        }, null).write(' width="').reference(k._get(false, ["values", "width"]), k, "h").write('" height="').reference(k._get(false, ["values", "height"]), k, "h").write('" x-webkit-airplay="').reference(k._get(false, ["values", "airplay"]), k, "h").write('" bgcolor="').reference(k._get(false, ["values", "bgcolor"]), k, "h").write('" style="width:').reference(k._get(false, ["values", "width"]), k, "h").write("px; height:").reference(k._get(false, ["values", "height"]), k, "h").write('px;"><source src="').reference(k._get(false, ["source"]), k, "h").write('" type="').reference(k._get(false, ["type"]), k, "h").write('" />').exists(k._get(false, ["captionsTrack"]), k, {
                            block: f
                        }, null).write("</video>")
                    }

                    function i(l, k) {
                        return l.write("controls")
                    }

                    function h(l, k) {
                        return l.write("autoplay")
                    }

                    function g(l, k) {
                        return l.write('preload="').reference(k._get(false, ["values", "preload"]), k, "h").write('"')
                    }

                    function f(l, k) {
                        return l.write('<track src="').reference(k._get(false, ["captionsTrack"]), k, "h").write('" kind="captions" srclang="en" label="English" default />')
                    }
                    return j
                })();
                return d
            })()
        }, {
            "./dust-runtime": "EVc30+"
        }
    ],
    "ac-video-templates": [
        function(b, c, a) {
            c.exports = b("8m2ENo")
        }, {}
    ],
    89: [
        function(b, c, a) {
            c.exports = {
                Video: b("./ac-video/Video"),
                Utils: b("./ac-video/lib/SharedUtils")
            }
        }, {
            "./ac-video/Video": 90,
            "./ac-video/lib/SharedUtils": 125
        }
    ],
    90: [
        function(j, c, t) {
            var k = j("./config/VideoConfig");
            var f = j("./profiles/Recommendation");
            var i = j("ac-dom-emitter").DOMEmitter;
            var h = j("ac-event-emitter").EventEmitter;
            var q = j("ac-vatman");
            var s = j("ac-base").Element;
            var m = j("ac-base").Environment;
            var l = j("ac-base").log;
            var u = j("ac-base").Object;
            var d = j("./lib/SharedUtils");
            var g = j("ac-video-templates");
            var r = j("./views/HTML5VideoView");
            var n = j("./views/QuickTimeVideoView");
            var o = j("./api");
            var a = j("ac-deferred").Deferred;
            j("./polyfills/full-screen");

            function b(w, v) {
                w = s.getElementById(w);
                this.element = w;
                this.targetId = w.id;
                this.callouts = d.NodeListToArray(s.selectAll('[data-acv-trigger-open="' + this.targetId + '"]'));
                this._fixSafari5AttributeSelectorIssue();
                this._id = this.element.getAttribute("href").replace(/\W|_/g, "").toLowerCase();
                i.call(this, w);
                this._initialize(v);
                this.api = o(this)
            }
            b.api = o.globalAPI;
            b.emitter = new h();
            b.prototype = new i();
            var p = b.prototype;
            p.isVisible = false;
            p._defaults = {
                useNative: d.useNative(),
                debug: false
            };
            p._addCalloutClickTrigger = function(v) {
                this.boundTriggerCalloutClick = this._triggerCalloutClick.bind(this);
                s.addEventListener(v, "click", this.boundTriggerCalloutClick)
            };
            p._videoViewReady = function(v) {
                this.videoView = v;
                this._renderVideoView();
                this.trigger("acv-open");
                this.isVisible = true
            };
            p._fixSafari5AttributeSelectorIssue = function() {
                if (m.Browser.name === "Safari" && m.Browser.version < 6) {
                    var w = document.activeElement;
                    var v = 0;
                    this.callouts.forEach(function(y, x) {
                        x++;
                        y.focus();
                        setTimeout(function() {
                            y.blur()
                        }, 1);
                        if (x === this.callouts.length) {
                            setTimeout(function() {
                                if (w) {
                                    w.focus()
                                }
                            }, 2)
                        }
                    }.bind(this))
                }
            };
            p._addEventListeners = function() {
                if (this.options.debug) {
                    this.on("acv-close", function() {
                        console.log("acv-close")
                    });
                    this.on("acv-open", function() {
                        console.log("acv-open")
                    });
                    this.on("acv-play", function() {
                        console.log("acv-play")
                    });
                    this.on("acv-pause", function() {
                        console.log("acv-pause")
                    });
                    this.on("acv-timeupdate", function() {
                        console.log("acv-timeupdate")
                    })
                }
                if (this.options.autoplay && !this.options.useNative) {
                    this._initializeVideoView()
                }
                this.on("acv-video-view-ready", this._videoViewReady, this);
                if (this.options.useNative) {
                    this._initializeVideoView()
                } else {
                    this.callouts.forEach(this._addCalloutClickTrigger, this);
                    this.on("acv-callout-clicked", this._handleCalloutClick, this);
                    this.on("acv-close", this.closeVideo, this)
                } if (d.usesFullScreen()) {
                    this.on("acv-full-screen-toggle", this.toggleFullScreen, this)
                }
                this._eventEmitter.propagateTo(b.emitter)
            };
            p._initializeVideoView = function() {
                if (!this.initializationHasBegun) {
                    this.initializationHasBegun = true;
                    var w = this._createVideo.bind(this);
                    var v = this._unsuccessfulRecomendation.bind(this);
                    this._getRecomendation().then(w, v)
                }
            };
            p._handleCalloutClick = function() {
                if (this.videoView) {
                    this.trigger("acv-reopen", this.trackingData);
                    this.toggleVideoDisplay()
                } else {
                    this._initializeVideoView()
                }
            };
            p._triggerCalloutClick = function(v) {
                if (!v) {
                    v = window.event
                }
                if (v.preventDefault) {
                    v.preventDefault()
                }
                v.returnValue = false;
                this.trigger("acv-callout-clicked")
            };
            p._initialize = function(v) {
                this.options = u.extend({}, this._defaults, v);
                this._addEventListeners();
                this.targetContent = s.select('[data-acv-target="' + this.targetId + '"]');
                this.targetContent.setAttribute("data-acv-viewtype", (this.options.useNative) ? "native" : "ac-video");
                s.selectAll("acv-title", this.targetContent).forEach(function(w) {
                    s.removeClassName(w, "acv-title")
                });
                this.videoTarget = this.targetContent.parentNode
            };
            p._getRecomendation = function() {
                var v = new a();
                var w = {
                    videoTemplate: "elementVideo",
                    supportedProfiles: []
                };
                if (m.Browser.name === "Safari" || m.Browser.name === "Safari Mobile") {
                    w.videoTemplate = "elementVideo"
                } else {
                    if (m.Browser.name === "Chrome" && !m.Feature.touchAvailable()) {
                        w.videoTemplate = "elementVideo"
                    } else {
                        if (m.Browser.name === "Chrome" && m.Feature.touchAvailable()) {
                            w.videoTemplate = "elementVideo"
                        } else {
                            if (m.Browser.name === "Firefox") {
                                w.videoTemplate = "elementEmbed"
                            } else {
                                if (m.Browser.name === "IE") {
                                    w.videoTemplate = "elementObject"
                                }
                            }
                        }
                    }
                }
                v.resolve(w);
                return v.promise()
            };
            p._renderVideoView = function() {
                var v = document.createElement("div");
                if (this.options.modal && !d.useNative()) {
                    v.innerHTML = '<table class="acv-modal" style="background-color: ' + this.options.modal.background + ';"><tr><td class="acv-vertical-align">' + this.videoView.render() + "</td></tr></table>";
                    this.videoContent = v.firstChild
                } else {
                    v.innerHTML = this.videoView.render();
                    this.videoContent = v
                }
                s.addClassName(this.videoContent, "ac-video-content-container");
                if (this.options.responsive) {
                    s.addClassName(this.videoContent, "responsive");
                    this.videoContent.style.maxWidth = this.options.responsive.maxWidth + "px"
                }
                s.addClassName(this.targetContent, "acv-target");
                this.targetContent.parentNode.insertBefore(this.videoContent, this.targetContent);
                s.toggleClassName(this.targetContent, "acv-hide");
                this.videoView.afterRender()
            };
            p._unsuccessfulRecomendation = function() {
                l("Video.createVideo() : unable to obtain a video recommendation")
            };
            p._createVideo = function(w) {
                var v = new k();
                v.getConfig(this.element, w, this.options.values).then(function(y) {
                    var B = y.videoTemplate;
                    var A = /video/i.test(B);
                    var z = /object|embed/i.test(B);
                    var x = A ? r : z ? n : false;
                    if (x) {
                        if (this.options.stream) {
                            y.source = this.options.stream
                        }
                        y.responsive = this.options.responsive ? true : false;
                        y.root = this;
                        if (this.options.source) {
                            y.source = this.options.source
                        }
                        y.movSrc = y.source;
                        if (m.Browser.name === "Chrome") {
                            y.source = q.vatClient.getSource(y.source, window.innerWidth)
                        }
                        y.videoType = "";
                        if (this.options.captionsTrack) {
                            y.captionsTrack = this.options.captionsTrack
                        }
                        if (!z) {
                            q.vatClient.getConfig(y.movSrc).then(function(C) {
                                if ((C && C.metadata && typeof C.metadata.captions !== "string") || m.Browser.name === "Safari Mobile") {
                                    y.captionsTrack = false
                                }
                                new x(y)
                            }, function() {
                                new x(y)
                            })
                        } else {
                            new x(y)
                        }
                    } else {
                        g.render("noVideoSupport", y, function(C, D) {
                            this.element.parentNode.replaceChild(d.createElementFromMarkup(D), this.element)
                        }.bind(this))
                    }
                }.bind(this))
            };
            p.destroy = function() {
                this.callouts.forEach(function(x) {
                    s.removeEventListener(x, "click", this.boundTriggerCalloutClick)
                }, this);
                this.videoView.destroy();
                this.videoContent.parentNode.removeChild(this.videoContent);
                i.prototype.destroy.call(this);
                var v = b.api.instances.indexOf(this);
                b.api.instances.splice(v, 1);
                for (var w in this) {
                    if (this.hasOwnProperty(w)) {
                        this[w] = null
                    }
                }
            };
            p.initialize = function() {
                if (!this.videoView) {
                    this._initializeVideoView()
                }
            };
            p.toggleFullScreen = function() {
                if (document.isFullScreen) {
                    document.cancelFullScreen()
                } else {
                    this.videoContent.requestFullScreen()
                }
            };
            p.toggleVideoDisplay = function() {
                this.isVisible = this.isVisible ? false : true;
                var v = [this.targetContent, this.videoContent];
                v.forEach(function(w) {
                    s.toggleClassName(w, "acv-hide")
                })
            };
            p.show = function() {
                if (!this.isVisible) {
                    this.isVisible = true;
                    s.addClassName(this.targetContent, "acv-hide");
                    s.removeClassName(this.videoContent, "acv-hide")
                }
            };
            p.hide = function() {
                if (this.isVisible) {
                    this.isVisible = false;
                    s.removeClassName(this.targetContent, "acv-hide");
                    s.addClassName(this.videoContent, "acv-hide")
                }
            };
            p.closeVideo = function() {
                this.toggleVideoDisplay()
            };
            c.exports = b
        }, {
            "./api": 91,
            "./config/VideoConfig": 93,
            "./lib/SharedUtils": 125,
            "./polyfills/full-screen": 132,
            "./profiles/Recommendation": 134,
            "./views/HTML5VideoView": 144,
            "./views/QuickTimeVideoView": 145,
            "ac-base": false,
            "ac-dom-emitter": 49,
            "ac-event-emitter": false,
            "ac-vatman": 82,
            "ac-video-templates": "8m2ENo"
        }
    ],
    91: [
        function(b, d, a) {
            var f = b("ac-event-emitter").EventEmitter;
            var c = {
                emitter: new f(),
                instances: []
            };
            d.exports = function(g) {
                c.instances.push(g);
                return {
                    globalAPI: c,
                    instanceAPI: {
                        initialize: function() {
                            if (!g.videoView) {
                                g.initialize()
                            }
                        },
                        toggleDisplay: function() {
                            if (!g.videoView) {
                                this.initialize()
                            } else {
                                if (g.isVisible) {
                                    g.videoView.close()
                                } else {
                                    g.show()
                                }
                            }
                        },
                        player: {
                            pause: function() {
                                g.videoView.pause()
                            },
                            play: function() {
                                g.videoView.play()
                            },
                            getCurrentTime: function() {
                                return g.videoView.getCurrentTime()
                            },
                            getDuration: function() {
                                return g.videoView.getDuration()
                            },
                            getVolume: function() {
                                return g.videoView.getVolume()
                            },
                            getPaused: function() {
                                if (g.videoView) {
                                    return g.videoView.getPaused()
                                } else {
                                    return true
                                }
                            },
                            setVolume: function(h) {
                                return g.videoView.setVolume(h)
                            },
                            setCurrentTime: function(h) {
                                g.videoView.setCurrentTime(h)
                            },
                            streaming: {
                                getSeekableEnd: function() {
                                    return g.videoView.element.seekable.end(0)
                                }
                            },
                            toggleCaptions: function(h) {
                                g.videoView.toggleCaptions(h)
                            }
                        }
                    }
                }
            };
            d.exports.globalAPI = c
        }, {
            "ac-event-emitter": false
        }
    ],
    92: [
        function(f, g, c) {
            var i = f("ac-base").Ajax;
            var a = f("ac-base").Environment;
            var d = f("ac-deferred").Deferred;

            function b() {}
            var h = b.prototype;
            h.firstValidRequest = function(k) {
                var l = 0;
                var j = new d();
                var m = function() {
                    var n = this.validateFile(k[l]);
                    n.then(function(o) {
                        j.resolve(o)
                    }, function() {
                        l++;
                        if (l === k.length) {
                            j.reject()
                        } else {
                            m()
                        }
                    }.bind(this))
                }.bind(this);
                if (k.length > 0) {
                    m()
                } else {
                    j.reject()
                }
                return j.promise()
            };
            h.validateFile = function(k) {
                var j = new d();
                if (a.Browser.IE) {
                    j.resolve(k)
                } else {
                    i.checkURL(k, function(l) {
                        if (l) {
                            j.resolve(k)
                        } else {
                            j.reject()
                        }
                    }.bind(this))
                }
                return j.promise()
            };
            g.exports = b
        }, {
            "ac-base": false
        }
    ],
    93: [
        function(f, b, r) {
            var s = f("ac-base").Object;
            var p = f("ac-base").Element;
            var i = f("ac-base").Environment;
            var h = f("ac-base").log;
            var m = f("ac-deferred").all;
            var a = f("ac-deferred").Deferred;
            var o = f("./FileRequest");
            var l = f("../profiles/definitions");
            var d = f("../polyfills/hasAttribute");
            var c = f("../lib/SharedUtils");
            var q = f("../localization/Localization");
            var j = "v";
            var n;

            function g() {
                this._possibleTemplateKeys = ["autoplay", "buffered", "endframe", "controls", "height", "loop", "muted", "poster", "preload", "suffix", "width", "controlbar", "controlbarwidth", "controlbarskinning", "disablecaptionscontrol"];
                this._defaultTemplateValues = {
                    autoplay: false,
                    muted: false,
                    loop: false,
                    controls: false,
                    preload: "metadata",
                    controlbarwidth: "450",
                    controlbarskinning: "ac-video-controlbar",
                    disablecaptionscontrol: false
                };
                this.fileRequest = new o()
            }
            var k = g.prototype;
            k.getSource = function(v) {
                document.createElement("video");
                document.createElement("source");
                var w = /[^/]*.[^\.]*$/;
                var u = null;
                var x = {};
                if (d(v, "data-src")) {
                    u = v.getAttribute("data-src")
                } else {
                    if (d(v, "href")) {
                        u = v.getAttribute("href")
                    } else {
                        if (d(v, "src")) {
                            u = v.getAttribute("src")
                        } else {
                            var t = p.select("source", v.parentElement);
                            if (t && d(t, "src")) {
                                u = t.getAttribute("src")
                            }
                        }
                    }
                } if (u) {
                    x.defaultSource = u;
                    x.videoSource = u.match(w)[0];
                    x.directory = u.replace(x.videoSource, "");
                    x.videoFileName = x.videoSource.split(".")[0]
                } else {
                    h("ACVideo VideoConfig.getDirectory : unable to get the src video directory")
                }
                return x
            };
            k.getConfig = function(y, B, C) {
                var w = new a();
                var t = new a();
                var z = new a();
                var D = m([z]);
                var v = {};
                var A = this.getSource(y);
                this.isAppleMobileDevice = (i.Browser.os === "iOS");
                v.values = this._getValues(y, C);
                v.values.usesFullScreen = c.usesFullScreen();
                var x;
                this._videoRecommendation = B;
                v.videoTemplate = B.videoTemplate;
                this.localization = new q();
                var u = this.localization.getLocalizedText();
                u.then(function(E) {
                    v.values.localizedText = E;
                    z.resolve()
                }.bind(this), function() {
                    h("VideoConfig: Unable to load localization JSON. Using defaulg values");
                    v.values.localizedText = this.localization.defaultText;
                    z.resolve()
                }.bind(this));
                return D.then(function() {
                    if (v.type === l.hls.videoType || (v.type === l.h264.videoType && i.Browser.name === "Safari" && i.Browser.version < 7)) {
                        v.captionsTrack = null
                    }
                    v.values.usesFullScreen = (v.values.usesFullScreen && v.videoTemplate === "elementVideo");
                    v.source = A.defaultSource;
                    return v
                })
            };
            k._configureFrames = function(t, w) {
                var v;
                var u;
                if (!t.values.poster) {
                    v = w.match(/[^/]*.[^\.]*$/)[0];
                    u = v.replace(/(-cc)?\..*/, ".jpg");
                    t.values.poster = w.replace(v, "") + "posterframes/" + u
                } else {
                    if (t.values.poster === "false") {
                        t.values.poster = null
                    }
                } if (!t.values.endframe) {
                    t.values.endframe = t.values.poster
                } else {
                    if (t.values.poster === false) {
                        t.values.endframe = null
                    }
                }
            };
            k._buildFileSuffix = function(u) {
                var w = "";
                if (u.suffix) {
                    w = "_" + u.suffix
                } else {
                    if (u.height && u.width) {
                        var t = u.height.replace("px", "").replace("em", "").replace("rem", "");
                        var v = u.width.replace("px", "").replace("em", "").replace("rem", "");
                        w = "_" + v + "x" + t
                    }
                }
                return w
            };
            k._getRecommendedCaptionsPaths = function(u, t) {
                var v = [];
                v.push(u + t + "-captions." + j + "tt");
                return v
            };
            k._generateRecommendedVideoPaths = function(u, t) {
                var w = this._buildFileSuffix(t);
                var v = [];
                this._videoRecommendation.supportedProfiles.forEach(function(x) {
                    if (x.sizeRelevant) {
                        u = u + w
                    }
                    v.push(u + "." + x.fileExtension)
                });
                return v
            };
            k._getValues = function(u, w) {
                var v = "ac-video-" + c.uuid();
                var t = this._defaultTemplateValues;
                s.extend(t, this._getMarkupValues(u));
                if (w) {
                    s.extend(t, w)
                }
                if (c.useNative()) {
                    t["native"] = true;
                    t.controls = "true"
                }
                t.targetId = u.id;
                t.id = v;
                t.eventId = v + "-quicktime-event";
                t.wrapperId = v + "-wrapper";
                return t
            };
            k._getMarkupValues = function(t) {
                var u = {};
                this._possibleTemplateKeys.forEach(function(v) {
                    if (d(t, v)) {
                        u[v] = t.getAttribute(v)
                    } else {
                        if (d(t, "data-acv-" + v)) {
                            u[v] = t.getAttribute("data-acv-" + v)
                        }
                    } if ((v === "autoplay" || v === "controls" || v === "muted" || v === "loop") && u[v] && u[v].length > 0) {
                        u[v] = true
                    }
                    if (typeof(u[v]) === "string" && /^(true|false)$/.test(u[v])) {
                        u[v] = (u[v] === "true") ? true : false
                    }
                });
                return u
            };
            k.addPossibleTemplateKeys = function(t) {
                t.forEach(function(u) {
                    if (!this._possibleTemplateKeys.indexOf(u)) {
                        this._possibleTemplateKeys.push(u)
                    }
                }, this)
            };
            b.exports = g
        }, {
            "../lib/SharedUtils": 125,
            "../localization/Localization": 128,
            "../polyfills/hasAttribute": 133,
            "../profiles/definitions": 135,
            "./FileRequest": 92,
            "ac-base": false
        }
    ],
    94: [
        function(b, c, a) {
            var f = b("./Controller");
            var g = function(h) {
                f.call(this, h)
            };
            g.prototype = new f();
            var d = g.prototype;
            d._addEventListeners = function() {
                if (this.emitter) {
                    this.emitter.on("acv-buffered-data", this._toggleBufferedDataListener, this)
                }
            };
            d._initialize = function(h) {
                f.prototype._initialize.call(this, h);
                this._addEventListeners()
            };
            d._toggleBufferedDataListener = function(h) {
                this.view.updateBufferProgress(h);
                if (parseInt(h, 10) >= 100) {
                    this.emitter.off("acv-buffered-data", this._toggleBufferedDataListener, this)
                }
            };
            c.exports = g
        }, {
            "./Controller": 95
        }
    ],
    95: [
        function(b, c, a) {
            var h = b("../views/View");
            var g = b("../models/Model");
            var f = function(i) {
                this._initialize(i)
            };
            var d = f.prototype;
            d.destroy = function() {
                this.model.destroy();
                this.view.destroy()
            };
            d._initialize = function(i) {
                i = i || {};
                this.view = i.view || new h();
                this.model = i.model || new g();
                if (i.emitter) {
                    this.emitter = i.emitter
                }
            };
            c.exports = f
        }, {
            "../models/Model": 129,
            "../views/View": 147
        }
    ],
    96: [
        function(c, b, f) {
            var d = c("./ElementsRegistry");
            var i = c("ac-base").Element;
            var h = c("../lib/animate");
            var m = c("ac-dom-emitter").DOMEmitter;
            var l = c("ac-base").log;
            var k = c("../lib/SharedUtils");
            var a = c("../polyfills/hasAttribute");

            function j(n) {
                this.flag = "data-ac-video-element";
                this.videoView = n;
                this.viableElements = [];
                this.elements = [];
                this.element = i.select(".ac-video-controlbar", this.videoView.wrapper);
                m.call(this, this.element);
                this.registry = new d()
            }
            j.prototype = new m();
            var g = j.prototype;
            g._animate = h.factory;
            g._animationDuration = 400;
            g.destroy = function() {
                this.destroyed = true;
                clearTimeout(this._hiderTimer);
                this._hiderTimer = null;
                this.buttons.forEach(this._removeButtonTriggers, this);
                this._removeWrapperEventListeners();
                for (var n = this.elements.length - 1; n >= 0; n--) {
                    this.elements[n].destroy()
                }
                this.elements = null;
                m.prototype.destroy.call(this);
                for (var o in this) {
                    if (this.hasOwnProperty(o)) {
                        this[o] = null
                    }
                }
            };
            g.show = function() {
                this.isVisible = true;
                this.videoView.trigger("acv-show-control-bar");
                i.removeClassName(this.videoView.wrapper, "ac-video-controlbarstate-hidden")
            };
            g.hide = function() {
                this.isVisible = false;
                this.videoView.trigger("acv-hide-control-bar");
                i.addClassName(this.videoView.wrapper, "ac-video-controlbarstate-hidden")
            };
            g._timingValue = 2500;
            g.hideOnTimer = function() {
                clearTimeout(this._hiderTimer);
                this._hiderTimer = null;
                if (!this.controlBarHover && !this.destroyed) {
                    if (!this.isVisible) {
                        this.show()
                    } else {
                        this._hiderTimer = setTimeout(function() {
                            if (!this._controlHasFocus) {
                                this.hide()
                            }
                        }.bind(this), this._timingValue)
                    }
                }
            };
            g._handleBlurAndFocusEvents = function(n) {
                if (n.type === "blur") {
                    this._controlHasFocus = false;
                    this.hideOnTimer()
                } else {
                    this._controlHasFocus = true;
                    clearTimeout(this._hiderTimer);
                    this.show()
                }
            };
            g._removeButtonTriggers = function(n) {
                i.removeEventListener(n, "focus", this.boundTriggerFocus);
                i.removeEventListener(n, "blur", this.boundTriggerBlur)
            };
            g._setupButtonTriggers = function(n) {
                this.boundTriggerFocus = this.trigger.bind(this, "focus");
                this.boundTriggerBlur = this.trigger.bind(this, "blur");
                i.addEventListener(n, "focus", this.boundTriggerFocus);
                i.addEventListener(n, "blur", this.boundTriggerBlur)
            };
            g._respondToVideoPauseEvent = function() {
                this.isPlaying = false;
                clearTimeout(this._hiderTimer);
                this.show()
            };
            g._respondToVideoPlayEvent = function() {
                this.isPlaying = true;
                this.hideOnTimer.call(this)
            };
            g._cancelTimeoutAndShow = function() {
                this.controlBarHover = true;
                clearTimeout(this._hiderTimer);
                this.show()
            };
            g._resumeTimeout = function() {
                this.controlBarHover = false;
                this.hideOnTimer()
            };
            g._setControlbarState = function() {
                this.show();
                this.isPlaying = !this.videoView.getPaused();
                this._controlHasFocus = false;
                this.on("blur focus", this._handleBlurAndFocusEvents, this);
                this.buttons = i.selectAll(".ac-rangeslider-eventsurface, .acv-button", this.videoView.wrapper);
                this.buttons.forEach(this._setupButtonTriggers, this);
                this.videoView._bindings.on("acv-pause", this._respondToVideoPauseEvent, this);
                this.videoView._bindings.on("acv-play", this._respondToVideoPlayEvent, this);
                this._addWrapperEventListeners();
                this.on("mouseenter", this._cancelTimeoutAndShow, this);
                this.on("mouseleave", this._resumeTimeout, this)
            };
            g.setDisabledState = function() {
                i.addClassName(this.element, "acv-controller-disabled");
                this.elements.forEach(function(n) {
                    n.enabled = false;
                    switch (n.controlName) {
                        case "progressSlider":
                            n._slider.disableUserControls();
                            break;
                        case "volumeSlider":
                            n._slider.disableUserControls();
                            break
                    }
                }.bind(this))
            };
            g.setEnabledState = function() {
                i.removeClassName(this.element, "acv-controller-disabled");
                this.elements.forEach(function(n) {
                    n.enabled = true;
                    switch (n.controlName) {
                        case "progressSlider":
                            n._slider.enableUserControls();
                            break;
                        case "volumeSlider":
                            n._slider.enableUserControls();
                            break
                    }
                }.bind(this))
            };
            g.createElements = function() {
                if (this.videoView.element.tagName.toLowerCase().match(/embed|object/)) {
                    k.waitForQuickTimeToLoad(this.videoView.element).then(function() {
                        this._instantiateElements()
                    }.bind(this))
                } else {
                    this._instantiateElements()
                }
            };
            g._removeWrapperEventListeners = function() {
                i.removeEventListener(this.videoView.wrapper, "mouseenter", this.boundShow);
                i.removeEventListener(this.videoView.wrapper, "mouseleave", this.boundHide);
                i.removeEventListener(this.videoView.wrapper, "mousemove", this.boundHideOnTimer);
                i.removeEventListener(this.videoView.wrapper, "click", this.boundHideOnTimer);
                i.removeEventListener(this.videoView.wrapper, "touchstart", this.boundHideOnTimer)
            };
            g._addWrapperEventListeners = function() {
                this.boundShow = this.show.bind(this);
                this.boundHide = this.hide.bind(this);
                this.boundHideOnTimer = this.hideOnTimer.bind(this);
                i.addEventListener(this.videoView.wrapper, "mouseenter", this.boundShow);
                i.addEventListener(this.videoView.wrapper, "mouseleave", this.boundHide);
                i.addEventListener(this.videoView.wrapper, "mousemove", this.boundHideOnTimer);
                i.addEventListener(this.videoView.wrapper, "click", this.boundHideOnTimer);
                i.addEventListener(this.videoView.wrapper, "touchstart", this.boundHideOnTimer)
            };
            g._instantiateElements = function() {
                var n = true;
                this.viableElements = this._getViableElements(this.videoView.wrapper);
                this.viableElements.forEach(function(s) {
                    var o = s.getAttribute(this.flag);
                    var q = this.registry.getItem(o);
                    var r = q.value;
                    if (!n && q.isVolumeRelated === true) {
                        s = s.parentNode.removeChild(s)
                    } else {
                        if (r) {
                            var p = new r(s, this.videoView, s.getAttribute(this.flag));
                            this.videoView._bindings._eventEmitter.propagateTo(p);
                            this.elements.push(p)
                        }
                    }
                }, this);
                this._setControlbarState()
            };
            g._getViableElements = function(r) {
                var p = i.selectAll("*", r);
                var q = [];
                for (var o = p.length - 1; o >= 0; o--) {
                    if (a(p[o], this.flag)) {
                        var n = p[o].getAttribute(this.flag);
                        if (this.registry.exists(n)) {
                            q.push(p[o])
                        } else {
                            l("ControlBar._getViableElements() : flagged control found with invalid key (key not in registry): " + n)
                        }
                    }
                }
                return q
            };
            b.exports = j
        }, {
            "../lib/SharedUtils": 125,
            "../lib/animate": 126,
            "../polyfills/hasAttribute": 133,
            "./ElementsRegistry": 98,
            "ac-base": false,
            "ac-dom-emitter": 49
        }
    ],
    97: [
        function(c, d, a) {
            var h = c("ac-dom-emitter").DOMEmitter;
            var f = c("ac-base").Element;

            function b(k, i, l) {
                h.apply(this, arguments);
                this.videoView = i;
                this.node = k;
                var j;
                if (j = f.select(".ac-element-label", this.node)) {
                    this.labelElement = j
                }
                this.active = false;
                if (l) {
                    this.controlName = l
                }
                if (this.videoView && this.controlName) {
                    this._classifyWrapper(this.videoView, this.controlName)
                }
            }
            var g = b.prototype = new h();
            g._classifyWrapper = function(i, j) {
                if (i && j) {
                    f.addClassName(i.wrapper, "ac-video-hascontrol-" + j)
                }
            };
            g.updateLabelText = function(i) {
                if (this.labelElement) {
                    this.labelElement.innerHTML = i
                }
            };
            d.exports = b
        }, {
            "ac-base": false,
            "ac-dom-emitter": 49
        }
    ],
    98: [
        function(j, c, t) {
            var i = j("./Registry");
            var n = j("./buttons/MinVolumeButton");
            var k = j("./buttons/MaxVolumeButton");
            var m = j("./buttons/MuteButton");
            var g = j("./buttons/PlayPauseButton");
            var b = j("./buttons/CaptionsButton");
            var r = j("./text/CurrentTimeText");
            var a = j("./text/RemainingTimeText");
            var d = j("./sliders/VolumeSlider");
            var l = j("./sliders/ProgressSlider");
            var q = j("./posterframe/Posterframe");
            var f = j("./posterframe/Endframe");
            var o = j("./buttons/CloseButton");
            var s = j("./buttons/FullScreenButton");
            var p = [{
                key: "minVolumeButton",
                value: n,
                isVolumeRelated: true
            }, {
                key: "maxVolumeButton",
                value: k,
                isVolumeRelated: true
            }, {
                key: "muteButton",
                value: m,
                isVolumeRelated: true
            }, {
                key: "playPauseButton",
                value: g,
                isVolumeRelated: false
            }, {
                key: "captionsButton",
                value: b,
                isVolumeRelated: false
            }, {
                key: "currentTimeText",
                value: r,
                isVolumeRelated: false
            }, {
                key: "remainingTimeText",
                value: a,
                isVolumeRelated: false
            }, {
                key: "volumeSlider",
                value: d,
                isVolumeRelated: true
            }, {
                key: "progressSlider",
                value: l,
                isVolumeRelated: false
            }, {
                key: "posterframe",
                value: q
            }, {
                key: "endframe",
                value: f
            }, {
                key: "closeButton",
                value: o
            }, {
                key: "fullScreenButton",
                value: s
            }];

            function h() {
                this.registerItems(p)
            }
            h.prototype = new i();
            c.exports = h
        }, {
            "./Registry": 99,
            "./buttons/CaptionsButton": 101,
            "./buttons/CloseButton": 102,
            "./buttons/FullScreenButton": 103,
            "./buttons/MaxVolumeButton": 104,
            "./buttons/MinVolumeButton": 105,
            "./buttons/MuteButton": 106,
            "./buttons/PlayPauseButton": 107,
            "./posterframe/Endframe": 108,
            "./posterframe/Posterframe": 110,
            "./sliders/ProgressSlider": 112,
            "./sliders/VolumeSlider": 113,
            "./text/CurrentTimeText": 114,
            "./text/RemainingTimeText": 115
        }
    ],
    99: [
        function(c, d, a) {
            var g = c("ac-base").log;

            function b(h) {
                this.items = [];
                if (h) {
                    this.registerItems(h)
                }
            }
            var f = b.prototype;
            f.registerItem = function(h) {
                if (!this.exists(h.key)) {
                    this.items.push(h)
                } else {
                    g("Registry.registerItem: attempted to register an item whose key already exists in the registry: " + h.key)
                }
            };
            f.registerItems = function(h) {
                h.forEach(function(i) {
                    this.registerItem(i)
                }, this)
            };
            f.exists = function(j) {
                for (var h = this.items.length - 1; h >= 0; h--) {
                    if (this.items[h].key === j) {
                        return true
                    }
                }
                return false
            };
            f.getItem = function(j) {
                for (var h = this.items.length - 1; h >= 0; h--) {
                    if (this.items[h].key === j) {
                        return this.items[h]
                    }
                }
                return null
            };
            d.exports = b
        }, {
            "ac-base": false
        }
    ],
    100: [
        function(d, f, b) {
            var c = d("../ControlElement");

            function a(i, h) {
                void(h);
                c.apply(this, arguments);
                this._addEventListeners();
                this.active = false;
                this.enabled = true
            }
            var g = a.prototype = new c();
            g._addEventListeners = function() {
                if (this.node) {
                    this._addControlElementFocusedEvent();
                    this.on("ControlElement-focused", this._focusHandler.bind(this))
                }
            };
            g._addControlElementFocusedEvent = function() {
                this._focusedOnMouseDown = false;
                this._isFocused = false;
                this.on("mousedown", this._toggleMouseDownFlag.bind(this));
                this.on("focus", this._toggleMouseDownFlag.bind(this));
                this.on("blur", this._toggleIsFocused.bind(this))
            };
            g.clickHandler = function(h) {
                void(h)
            };
            g._focusHandler = function(h) {
                if (h === "click") {
                    setTimeout(function() {
                        this.node.blur()
                    }.bind(this), 1)
                }
            };
            g._toggleIsFocused = function(h) {
                if (h.type === "blur") {
                    this._isFocused = false
                } else {
                    this._isFocused = true
                }
            };
            g._toggleMouseDownFlag = function(j) {
                var h = (j.type === "mousedown") ? true : false;
                if (j.type === "mousedown") {
                    if (this.node !== document.activeElement) {
                        this._focusedOnMouseDown = h
                    }
                } else {
                    if (!this._isFocused) {
                        var i = this._focusedOnMouseDown ? "click" : "keypress";
                        this._toggleIsFocused(j);
                        this.trigger("ControlElement-focused", i);
                        this._focusedOnMouseDown = h
                    }
                }
            };
            f.exports = a
        }, {
            "../ControlElement": 97
        }
    ],
    101: [
        function(c, f, b) {
            var a = c("./Button");
            var g = c("ac-base").Element;
            var h;

            function d(j, i) {
                void(j, i);
                a.apply(this, arguments);
                this.on("click", function(k) {
                    if (this.enabled) {
                        this.videoView._bindings.trigger("click:captions", k)
                    }
                }.bind(this));
                this.on("acv-captions-enabled", this._enableCaptions, this);
                this.on("acv-captions-disabled", this._disableCaptions, this);
                this.enableCaptions = (this.videoView.model.values.localizedText.captionscontrol) ? this.videoView.model.values.localizedText.captionscontrol : "Enable Captions";
                this.disableCaptions = (this.videoView.model.values.localizedText.captionscontrol) ? this.videoView.model.values.localizedText.captionscontrol : "Disable Captions"
            }
            d.prototype = new a();
            h = d.prototype;
            h._enableCaptions = function() {
                g.addClassName(this.node, "active");
                this.node.setAttribute("aria-label", this.enableCaptions)
            };
            h._disableCaptions = function() {
                g.removeClassName(this.node, "active");
                this.node.setAttribute("aria-label", this.disableCaptions)
            };
            f.exports = d
        }, {
            "./Button": 100,
            "ac-base": false
        }
    ],
    102: [
        function(c, d, b) {
            var a = c("./Button");

            function g(i, h) {
                void(h);
                a.apply(this, arguments)
            }
            var f = g.prototype = new a();
            f._addEventListeners = function() {
                a.prototype._addEventListeners.call(this);
                this.on("click", function() {
                    this.videoView._bindings.trigger("click:close")
                }, this)
            };
            d.exports = g
        }, {
            "./Button": 100
        }
    ],
    103: [
        function(d, f, c) {
            var i = d("../../lib/SharedUtils");
            var b = d("./Button");
            var g = d("ac-base").Element;

            function a(k, j) {
                void(j);
                b.apply(this, arguments)
            }
            a.prototype = new b();
            var h = a.prototype;
            h.destroy = function() {
                document.removeEventListener("fullscreenchange", this.boundToggleActiveClass, false);
                b.prototype.destroy.call(this)
            };
            h._addEventListeners = function() {
                this.boundToggleActiveClass = this._toggleActiveClass.bind(this);
                b.prototype._addEventListeners.call(this);
                if (i.usesFullScreen()) {
                    this.on("click", function() {
                        this.videoView._bindings.trigger("click:fullScreen")
                    }, this);
                    document.addEventListener("fullscreenchange", this.boundToggleActiveClass, false);
                    if (this.enabled) {
                        this.videoView._bindings.trigger("click:fullScreen")
                    }
                }
            };
            h._toggleActiveClass = function() {
                var j = document.isFullScreen ? "addClassName" : "removeClassName";
                g[j](this.node, "active");
                this.node.setAttribute("aria-label", (document.isFullScreen) ? "Disable Full Screen" : "Enable Full Screen")
            };
            f.exports = a
        }, {
            "../../lib/SharedUtils": 125,
            "./Button": 100,
            "ac-base": false
        }
    ],
    104: [
        function(c, d, b) {
            var f = c("ac-base").Element;
            var a = c("./Button");

            function h(j, i) {
                void(j, i);
                a.apply(this, arguments);
                this.on("click", this.clickHandler.bind(this));
                this.on("acv-volumechange", this.updateState.bind(this));
                this.once("acv-canplay", this.updateState.bind(this));
                this.updateState()
            }
            var g = h.prototype = new a();
            g.clickHandler = function() {
                if (this.enabled) {
                    this.videoView.setVolume(1)
                }
            };
            g.updateState = function() {
                var i = this.videoView.getVolume();
                if (i === 1) {
                    f.addClassName(this.node, "active")
                } else {
                    f.removeClassName(this.node, "active")
                }
            };
            d.exports = h
        }, {
            "./Button": 100,
            "ac-base": false
        }
    ],
    105: [
        function(c, d, b) {
            var f = c("ac-base").Element;
            var a = c("./Button");

            function h(j, i) {
                void(j, i);
                a.apply(this, arguments);
                this.on("click", this.clickHandler.bind(this));
                this.on("acv-volumechange", this.updateState.bind(this));
                this.once("acv-canplay", this.updateState.bind(this));
                this.updateState()
            }
            var g = h.prototype = new a();
            g.clickHandler = function() {
                if (this.enabled) {
                    this.videoView.setVolume(0)
                }
            };
            g.updateState = function() {
                var i = this.videoView.getVolume();
                if (i === 0) {
                    f.addClassName(this.node, "active")
                } else {
                    f.removeClassName(this.node, "active")
                }
            };
            d.exports = h
        }, {
            "./Button": 100,
            "ac-base": false
        }
    ],
    106: [
        function(c, d, b) {
            var f = c("ac-base").Element;
            var a = c("./Button");

            function h(j, i) {
                void(j, i);
                a.apply(this, arguments);
                this.isScrubbing = false;
                this.on("acv-scrub-start", function() {
                    this.isScrubbing = true
                }, this);
                this.on("acv-scrub-end", function() {
                    this.isScrubbing = false
                }, this);
                this.on("click", this.clickHandler, this);
                this.on("acv-volumechange", this.updateState, this);
                this.updateState()
            }
            var g = h.prototype = new a();
            g.clickHandler = function() {
                if (this.enabled) {
                    this.videoView.setMuted(!this.videoView.getMuted());
                    this.updateState()
                }
            };
            g.updateState = function() {
                if (!this.isScrubbing) {
                    var i = this.videoView.getMuted();
                    f[(i) ? "addClassName" : "removeClassName"](this.node, "muted");
                    this.node.setAttribute("aria-checked", (i) ? "true" : "false");
                    this.updateLabelText((i) ? "Muted" : "Mute")
                }
            };
            d.exports = h
        }, {
            "./Button": 100,
            "ac-base": false
        }
    ],
    107: [
        function(d, f, c) {
            var g = d("ac-base").Element;
            var a = d("./Button");

            function b(j, i) {
                void(i);
                a.apply(this, arguments);
                this.updateState();
                this.play = (this.videoView.model.values.localizedText.play) ? this.videoView.model.values.localizedText.play : "Play";
                this.pause = (this.videoView.model.values.localizedText.pause) ? this.videoView.model.values.localizedText.pause : "Pause"
            }
            var h = b.prototype = new a();
            h._addEventListeners = function() {
                a.prototype._addEventListeners.call(this);
                this.on("acv-startPlaying", this.updateState.bind(this));
                this.on("acv-stopPlaying", this.updateState.bind(this));
                this.on("acv-ended", this.updateState.bind(this, true));
                this.on("click", function(i) {
                    if (this.enabled) {
                        this.videoView._bindings.trigger("click:play/pause", i)
                    }
                }.bind(this), this)
            };
            h.updateState = function(i) {
                i = i || false;
                var j = i ? this.play : this.pause;
                var k = i ? "removeClassName" : "addClassName";
                g[k](this.node, "paused");
                this.node.setAttribute("aria-label", j);
                this.updateLabelText(j)
            };
            f.exports = b
        }, {
            "./Button": 100,
            "ac-base": false
        }
    ],
    108: [
        function(c, f, a) {
            var b = c("../ControlElement");
            var d = c("./Frame");

            function h(j, i) {
                void(j, i);
                b.apply(this, arguments);
                this.active = false;
                this.threshold = "";
                this.on("acv-timeupdate", this.timeUpdate.bind(this));
                this.on("acv-ended", function() {
                    i._bindings.trigger("click:close")
                });
                this.timeUpdate()
            }
            h.prototype = new d();
            var g = h.prototype;
            g.timeUpdate = function() {
                var i = this.videoView.getCurrentTime();
                if (!this.threshold) {
                    this.threshold = this.videoView.getDuration()
                }
                if (i > this.threshold && !this.active) {
                    this.show()
                } else {
                    if (i < this.threshold && this.active) {
                        this.hide()
                    }
                }
            };
            f.exports = h
        }, {
            "../ControlElement": 97,
            "./Frame": 109
        }
    ],
    109: [
        function(c, f, a) {
            var b = c("../ControlElement");
            var g = c("ac-base").Element;

            function d(j, i) {
                void(j, i);
                b.apply(this, arguments)
            }
            d.prototype = new b();
            var h = d.prototype;
            h.show = function() {
                this.active = true;
                g.removeClassName(this.node, "acv-hide")
            };
            h.hide = function() {
                this.active = false;
                g.addClassName(this.node, "acv-hide")
            };
            f.exports = d
        }, {
            "../ControlElement": 97,
            "ac-base": false
        }
    ],
    110: [
        function(c, f, a) {
            var b = c("../ControlElement");
            var d = c("./Frame");

            function g(i, h) {
                void(i, h);
                b.apply(this, arguments);
                this.active = true;
                this.once("acv-timeupdate", function() {
                    this.hide()
                }.bind(this));
                this.on("acv-play", this.hide.bind(this))
            }
            g.prototype = new d();
            f.exports = g
        }, {
            "../ControlElement": 97,
            "./Frame": 109
        }
    ],
    111: [
        function(c, d, a) {
            var h = c("../../controllers/BufferController");
            var b = c("../../views/BufferView");
            var g = function(i, j) {
                this._initialize(i, j)
            };
            var f = g.prototype;
            f.destroy = function() {
                this.controller.destroy()
            };
            f._initialize = function(i, j) {
                this.controller = new h({
                    emitter: j,
                    element: i,
                    view: new b(i)
                })
            };
            d.exports = g
        }, {
            "../../controllers/BufferController": 94,
            "../../views/BufferView": 143
        }
    ],
    112: [
        function(b, a, g) {
            var j = b("ac-base").Element;
            var i = b("../buttons/Button");
            var f = b("ac-slider").Slider;
            var d = b("./Buffer");

            function c(l) {
                this.totalSec = l;
                this.calculate()
            }
            c.prototype.calculate = function(l) {
                this.totalSec = (typeof l === "number") ? l : this.totalSec;
                this.minutes = Math.floor(this.totalSec / 60);
                this.seconds = Math.round(this.totalSec - (this.minutes * 60));
                this.stringOut = (((this.minutes > 0) ? this.minutes + (" minute" + ((this.minutes > 1) ? "s" : "")) : "") + ((this.minutes > 0 && this.seconds > 0) ? ", " : "") + ((this.seconds > 0) ? this.seconds + (" second" + ((this.seconds > 1) ? "s" : "")) : ""))
            };

            function k(o, m) {
                i.apply(this, arguments);
                var n = this.videoView.getDuration();
                this.node = o;
                this.inputRangeNode = j.select(".acv-progressslider-inputrange", this.node);
                this.videoView = m;
                this._slider = new f(this.inputRangeNode, {
                    skin: "ac-media-progress",
                    min: 0,
                    max: (typeof n === "number" && !isNaN(n)) ? n : 0,
                    value: 0,
                    label: "playback",
                    renderAriaValueText: function() {
                        var r = new c(m.getCurrentTime());
                        var s = new c(m.getDuration());
                        return r.stringOut + ", of " + s.stringOut
                    }
                });
                var p = j.select(".ac-rangeslider-grip", o);
                var q = document.createElement("div");
                j.addClassName(q, "acv-bufferprogress-container");
                p.parentNode.insertBefore(q, p);
                var l = document.createElement("div");
                l.id = "acv-bufferprogress";
                j.addClassName(l, "acv-bufferprogress");
                q.appendChild(l);
                this._buffer = new d(l, m._bindings);
                this.on("acv-timeupdate acv-loadedmetadata acv-durationchange", this.updateState.bind(this));
                this._slider.on("grab", function() {
                    function r() {
                        this._storedVideoMuting = this.videoView.getMuted();
                        if (!this.videoView.getMuted()) {
                            this.videoView.setMuted(true)
                        }
                        this.videoView.pause()
                    }
                    this.videoView.trigger("acv-scrub-start");
                    this._suspendManagedEventsWhileScrubbing = (this.videoView.getPaused()) ? false : true;
                    if (this._suspendManagedEventsWhileScrubbing) {
                        if (AC.Environment.Browser.name === "IE") {
                            setTimeout(r.bind(this), 1)
                        } else {
                            r.call(this)
                        }
                    }
                }.bind(this));
                this._slider.on("change", this.setCurrentTime.bind(this));
                this._slider.on("release", function() {
                    if (this._suspendManagedEventsWhileScrubbing) {
                        this.videoView.play();
                        this._suspendManagedEventsWhileScrubbing = false;
                        this.videoView.setMuted(this._storedVideoMuting)
                    }
                    setTimeout(function() {
                        this.videoView.trigger("acv-scrub-end")
                    }.bind(this), 1)
                }.bind(this));
                this.updateState()
            }
            k.prototype = new i();
            var h = k.prototype;
            h.destroy = function() {
                this._buffer.destroy();
                this._slider.off();
                i.prototype.destroy.call(this)
            };
            h.updateState = function() {
                if (this._slider._model.max === 0) {
                    var l = this.videoView.getDuration();
                    this._slider.setMax((typeof l === "number" && !isNaN(l)) ? l : 0)
                }
                var m = this.videoView.getCurrentTime();
                this._slider.setValue((typeof m === "number" && !isNaN(m)) ? m : 0, true)
            };
            h.setCurrentTime = function(l) {
                this.videoView.setCurrentTime(l)
            };
            a.exports = k
        }, {
            "../buttons/Button": 100,
            "./Buffer": 111,
            "ac-base": false,
            "ac-slider": 62
        }
    ],
    113: [
        function(d, f, c) {
            var h = d("ac-base").Element;
            var a = d("../buttons/Button");
            var g = d("ac-slider").Slider;
            var i;

            function b(k, j) {
                a.apply(this, arguments);
                this.node = k;
                this.inputRangeNode = h.select(".acv-volumeslider-inputrange", this.node);
                this.videoView = j;
                this._slider = new g(this.inputRangeNode, {
                    skin: "ac-media-volume",
                    min: 0,
                    max: 1,
                    step: 0.1,
                    value: this.videoView.getVolume(),
                    label: "volume"
                });
                this.on("acv-volumechange", this.updateState.bind(this));
                this.once("acv-canplay", this.updateState.bind(this));
                this._slider.on("change", this.setVolume.bind(this));
                this.updateState()
            }
            i = b.prototype = new a();
            i.destroy = function() {
                this._slider.off();
                a.prototype.destroy.call(this)
            };
            i.updateState = function() {
                this._slider.setValue(this.videoView.getVolume())
            };
            i.setVolume = function(j) {
                this.videoView.setVolume(j)
            };
            f.exports = b
        }, {
            "../buttons/Button": 100,
            "ac-base": false,
            "ac-slider": 62
        }
    ],
    114: [
        function(d, f, c) {
            var b = d("./TimeText");

            function a(i, h) {
                void(i, h);
                b.apply(this, arguments);
                this.on("acv-updatetime", this.timeUpdate.bind(this))
            }
            var g = a.prototype = new b();
            g.timeUpdate = function(i) {
                var h = this._formatTime(Math.floor(i.current));
                this.update(h)
            };
            f.exports = a
        }, {
            "./TimeText": 117
        }
    ],
    115: [
        function(c, d, b) {
            var a = c("./TimeText");

            function g(i, h) {
                void(i, h);
                a.apply(this, arguments);
                this.on("acv-updatetime", this.timeUpdate.bind(this))
            }
            var f = g.prototype = new a();
            f.timeUpdate = function(i) {
                var h = Math.floor(i.current) - Math.floor(i.duration);
                h = this._formatTime(h);
                this.update(h)
            };
            d.exports = g
        }, {
            "./TimeText": 117
        }
    ],
    116: [
        function(c, d, a) {
            var b = c("../ControlElement");

            function g(i, h) {
                void(i, h);
                b.apply(this, arguments);
                this.active = false
            }
            var f = g.prototype = new b();
            f.update = function(h) {
                if (this.text !== h) {
                    this.node.innerHTML = h;
                    this.text = h
                }
            };
            d.exports = g
        }, {
            "../ControlElement": 97
        }
    ],
    117: [
        function(f, b, g) {
            var d = f("./Text");
            var i = f("ac-base").log;
            var a = function(m, l, k) {
                if (!l) {
                    return m
                }
                k = k || /{([^{}]*)}/g;
                return m.replace(k, function(o, n) {
                    var p = l[n];
                    return typeof p === "string" || typeof p === "number" ? p : o
                })
            };
            var c = function(l, k) {
                if (l < 10) {
                    l = String(l);
                    while (l.length < k) {
                        l = "0" + l
                    }
                }
                return l
            };

            function j(l, k) {
                void(l, k);
                d.apply(this, arguments);
                this.formatString = "{PN}{minutes}:{seconds}";
                this.videoView = k
            }
            var h = j.prototype = new d();
            h.splitTime = function(n, k) {
                k = k || function(o) {
                    return o
                };
                var m = {
                    negativeModifier: "",
                    minutes: 0,
                    seconds: 0
                };
                if (isNaN(n)) {
                    i("TimeText.splitTime: parameter was not a number: " + n);
                    return m
                }
                m.negativeModifier = (n < 0) ? "-" : "";
                n = Math.abs(n);
                m.minutes = Math.floor(n / 60);
                m.seconds = (n % 60);
                for (var l in m) {
                    if (typeof m[l] !== "number") {
                        continue
                    }
                    m[l] = k(m[l])
                }
                return m
            };
            h.setFormatString = function(k) {
                this.formatString = k
            };
            h.setFormatFunction = function(k) {
                this.formatFunction = k
            };
            h._formatTime = function(m, k) {
                if (isNaN(m)) {
                    return "00:00"
                }
                k = k || 2;
                m = this.splitTime(Math.floor(m), function(n) {
                    return c(n, k)
                });
                var l = a(this.formatString, {
                    PN: m.negativeModifier,
                    minutes: m.minutes,
                    seconds: m.seconds
                });
                return l
            };
            b.exports = j
        }, {
            "./Text": 116,
            "ac-base": false
        }
    ],
    118: [
        function(c, b, i) {
            var k = c("../lib/SharedUtils");
            var m = c("../lib/SharedUtils").getSetPair;
            var h = c("../lib/browserString");
            var l = c("ac-deferred").Deferred;
            var d = c("ac-base").Object;
            var g = c("../version");
            var a = {
                storeOutcomesOn: ["pass", "fail"],
                failOnTimeout: 5000,
                deferTimeoutCounter: false
            };

            function f(p, o) {
                this.id = o.id;
                this.type = "FeatureTypeError";
                this.message = p || "";
                this.data = o || null
            }
            f.prototype = Error.prototype;

            function n(s, r, o, q) {
                o = o || {};
                this.deferred = new l();
                this.promise = this.deferred.promise();
                this.data = {
                    id: s,
                    status: "initialized",
                    testOutcome: null
                };
                for (var p in a) {
                    this.data[p] = (typeof o[p] !== "undefined") ? o[p] : a[p]
                }
                this.initialData = d.clone(this.data);
                this.cleanup = q.bind(this) || function() {};
                this.testProcedure = r.bind(this)
            }
            var j = n.prototype;
            j.run = function() {
                if (this.data.status !== "complete") {
                    this.data.status = "running";
                    var p = this._getOutcome();
                    if (p) {
                        this.data.outcomeSource = "localStorage";
                        this._setOutcome(p);
                        switch (p) {
                            case "pass":
                                this.pass();
                                break;
                            case "fail":
                                this.fail(new Error("A failed test result was retrieved from local storage"));
                                break
                        }
                    } else {
                        this.data.outcomeSource = "testProcedure";
                        if (!this.data.deferTimeoutCounter) {
                            this.startFailureTimer()
                        }
                        try {
                            this.testProcedure()
                        } catch (o) {
                            this._setOutcome("fail");
                            this._fulfill("reject", new f(o.message, this.data, this.id))
                        }
                    }
                }
                return this.promise
            };
            j.startFailureTimer = function() {
                if (this.data.failOnTimeout > 0) {
                    this.failureTimer = setTimeout(function() {
                        this.fail(new Error("The test timed out after " + this.data.failOnTimeout + "ms"))
                    }.bind(this), this.data.failOnTimeout)
                }
            };
            j.pass = function(o) {
                if (this.data.status !== "complete") {
                    this._setOutcome("pass", o);
                    this._fulfill("resolve", this.data)
                }
            };
            j.fail = function(o) {
                this._setOutcome("fail");
                this._fulfill("reject", new f(o.message, this.data, this.id))
            };
            j.reset = function() {
                this.deferred = new l();
                this.promise = this.deferred.promise();
                k.clearPair(this.data.id);
                this.data = d.clone(this.initialData)
            };
            j._setOutcome = function(p, q) {
                q = q || {};
                for (var o in q) {
                    this.data[o] = q[o]
                }
                this.data.testOutcome = p;
                if (typeof p === "string" && new RegExp(p).test(this.data.storeOutcomesOn.join(" "))) {
                    m(this.data.id, p)
                }
                return this.data.testOutcome
            };
            j._getOutcome = function() {
                return m(this.data.id)
            };
            j._fulfill = function(p, o) {
                if (this.data.status !== "complete") {
                    clearTimeout(this.failureTimer);
                    this.data.status = "complete";
                    this.deferred[p](o);
                    if (this.cleanup) {
                        this.cleanup()
                    }
                }
            };
            b.exports = n
        }, {
            "../lib/SharedUtils": 125,
            "../lib/browserString": 127,
            "../version": 142,
            "ac-base": false
        }
    ],
    119: [
        function(d, f, b) {
            var a = d("ac-base").Environment;
            var c = d("../FeatureTest");
            f.exports = new c("h264", (function() {
                if (a.Browser.name === "Chrome" && !a.Feature.touchAvailable()) {
                    return function() {
                        this.fail(new Error("Desktop Chrome gets quicktime"))
                    }
                } else {
                    if (a.Browser.name === "IE") {
                        return function() {
                            this.fail(new Error("IE fail"))
                        }
                    }
                }
                return d("../videoTestProcedure")(d("../../profiles/definitions").h264)
            }()), {
                storeOutcomesOn: ["pass"]
            }, d("../videoCleanupProcedure"))
        }, {
            "../../profiles/definitions": 135,
            "../FeatureTest": 118,
            "../videoCleanupProcedure": 122,
            "../videoTestProcedure": 123,
            "ac-base": false
        }
    ],
    120: [
        function(d, f, b) {
            var c = d("../FeatureTest");
            var a = d("ac-base").Environment;
            f.exports = new c("hls", (function() {
                if (a.Browser.name === "Chrome") {
                    return function() {
                        this.fail(new Error("Chrome fail"))
                    }
                } else {
                    if (a.Browser.name === "IE") {
                        return function() {
                            this.fail(new Error("IE fail"))
                        }
                    } else {
                        if (a.Browser.os === "Android") {
                            return function() {
                                this.fail(new Error('Android "technically" passes the HLS feature test, but it\'s implmementation is unacceptably buggy'))
                            }
                        } else {
                            if (a.Browser.os === "iOS" && a.Browser.version < 7) {
                                return function() {
                                    this.fail(new Error("iOS 6 does not support WebVTT with HLS videos"))
                                }
                            } else {
                                if (a.Browser.name === "Safari Mobile" && a.Feature.isTablet() === false) {
                                    return function() {
                                        this.fail(new Error("For the moment, we are not supporting HLS on iphone."))
                                    }
                                } else {
                                    return d("../videoTestProcedure")(d("../../profiles/definitions").hls)
                                }
                            }
                        }
                    }
                }
            }()), {
                storeOutcomesOn: ["pass"]
            }, d("../videoCleanupProcedure"))
        }, {
            "../../profiles/definitions": 135,
            "../FeatureTest": 118,
            "../videoCleanupProcedure": 122,
            "../videoTestProcedure": 123,
            "ac-base": false
        }
    ],
    121: [
        function(d, g, b) {
            var c = d("../FeatureTest");
            var i = d("../../lib/SharedUtils");
            var h = d("../../profiles/definitions");
            var f = d("ac-video-templates");
            var a = ["qt_loadedfirstframe", "qt_canplay", "qt_canplaythrough", "qt_durationchange", "qt_load", "qt_ended", "qt_play", "qt_progress", "qt_timechanged"];
            g.exports = new c("quicktime", function() {
                this.data.quicktimePluginVersion = i.getQuicktimePlugin();
                if (!this.data.quicktimePluginVersion) {
                    this.fail(new Error("quicktime plugin not detected"))
                }
                this.data.qtTemplate = h.quicktime.useTemplate;
                this.data.qtModel = {
                    source: h.quicktime.testFile,
                    type: h.quicktime.videoType,
                    values: {
                        width: 8,
                        height: 8,
                        autopplay: false,
                        id: "ac-video-qt-test-movie",
                        eventId: "ac-video-qt-test-event"
                    }
                };
                i.getElementAsync("body").then(function(j) {
                    f.render("elementObjectEvent", this.data.qtModel, function(k, l) {
                        f.render(this.data.qtTemplate, this.data.qtModel, function(m, n) {
                            this.data.eventEle = (this.data.qtTemplate === "elementObject") ? i.createElementFromMarkup(l, document.getElementsByTagName("head")[0]) : null;
                            this.data.pluginEle = i.createElementFromMarkup(n, j);
                            i.waitForQuickTimeToLoad(this.data.pluginEle).then(function() {
                                this.startFailureTimer();
                                a.forEach(function(p) {
                                    i.addEventListener(this.data.pluginEle, p, function() {
                                        this.pass()
                                    }.bind(this))
                                }.bind(this));
                                try {
                                    this.data.pluginEle.Play()
                                } catch (o) {
                                    this.fail(o)
                                }
                            }.bind(this))
                        }.bind(this))
                    }.bind(this))
                }.bind(this))
            }, {
                storeOutcomesOn: ["pass"],
                failOnTimeout: 4000,
                deferTimeoutCounter: true
            }, function() {
                setTimeout(function() {
                    try {
                        if (this.data.pluginEle && this.data.pluginEle.parentNode) {
                            this.data.pluginEle.parentNode.removeChild(this.data.pluginEle)
                        }
                        if (this.data.eventEle && this.data.eventEle.parentNode) {
                            this.data.eventEle.parentNode.removeChild(this.data.eventEle)
                        }
                    } catch (j) {}
                }.bind(this), 1)
            })
        }, {
            "../../lib/SharedUtils": 125,
            "../../profiles/definitions": 135,
            "../FeatureTest": 118,
            "ac-video-templates": "8m2ENo"
        }
    ],
    122: [
        function(b, c, a) {
            c.exports = function() {
                if (this.data.videoEle && this.data.videoEle.parentNode) {
                    this.data.videoEle.parentNode.removeChild(this.data.videoEle)
                }
            }
        }, {}
    ],
    123: [
        function(c, d, b) {
            var a = c("ac-base").Environment;
            var f = c("ac-base").Element;
            var g = c("../lib/SharedUtils");
            d.exports = function(h) {
                return function() {
                    this.data.videoEle = document.createElement("video");
                    this.data.videoEle.id = "ac-video-html5-test-movie";
                    this.data.sourceEle = this.data.videoEle.appendChild(document.createElement("source"));
                    this.data.sourceEle.setAttribute("type", h.videoType);
                    this.data.sourceEle.setAttribute("src", h.testFile);
                    if (h.name === "h264") {
                        this.data.webVttEle = this.data.videoEle.appendChild(document.createElement("track"));
                        this.data.webVttEle.setAttribute("kind", "captions");
                        this.data.webVttEle.setAttribute("srcLang", "en");
                        this.data.webVttEle.setAttribute("label", "English WebVTT");
                        this.data.webVttEle.setAttribute("default", "");
                        this.data.webVttEle.setAttribute("src", h.vttFile)
                    }
                    var i = this.data.videoEle.canPlayType(h.videoType);
                    if (!i || i === "") {
                        this.fail(new Error('the browser reported that it cannot play videos with type: "' + h.videoType + '"'))
                    }
                    if (/^(iOS|Android)$/.test(a.Browser.os)) {
                        this.pass();
                        return
                    }
                    f.setStyle(this.data.videoEle, {
                        opacity: 0.1,
                        width: "4px",
                        height: "4px",
                        position: "absolute",
                        bottom: 0,
                        right: 0
                    });
                    this.data.videoEle.volume = 0;
                    this.data.videoEle.muted = true;
                    g.getElementAsync("body").then(function(j) {
                        this.data.videoEle = j.appendChild(this.data.videoEle);
                        g.addEventListener(this.data.videoEle, "error", function(l) {
                            var k = (l && l.message) ? l.message : "unknown";
                            this.fail(new Error("video element triggered an error event: " + k))
                        }.bind(this), false);
                        g.addEventListener(this.data.videoEle, "loadedmetadata", function() {
                            this.data.videoEle.volume = 0;
                            this.data.videoEle.muted = true;
                            g.addEventListener(this.data.videoEle, "timeupdate", function() {
                                setTimeout(function() {
                                    this.pass()
                                }.bind(this), 1)
                            }.bind(this), false)
                        }.bind(this));
                        this.data.videoEle.play()
                    }.bind(this))
                }
            }
        }, {
            "../lib/SharedUtils": 125,
            "ac-base": false
        }
    ],
    124: [
        function(b, c, a) {
            var d = b("./SharedUtils");
            var g = b("ac-dom-emitter").DOMEmitter;

            function f() {
                g.apply(this, arguments)
            }
            f.prototype = new g();
            f.prototype._addEventListener = function(h) {
                if (this.el.nodeName === "OBJECT" && this.el.attachEvent && this.el.addEventListener && /^qt_/.test(h)) {
                    this._bindings[h] = this._onListenerEvent.bind(this, h);
                    d.addEventListener(this.el, h, this._bindings[h])
                } else {
                    g.prototype._addEventListener.apply(this, arguments)
                }
            };
            c.exports = f
        }, {
            "./SharedUtils": 125,
            "ac-dom-emitter": 49
        }
    ],
    125: [
        function(d, g, b) {
            var c = d("ac-deferred").Deferred;
            var a = d("ac-base").Environment;
            var f = d("ac-video-templates");
            var h = {};
            h.hasLocalStorage = function() {
                try {
                    var i = Math.random().toString().split(".").join("");
                    localStorage.setItem("acv-localStorage-test", i);
                    return (localStorage.getItem("acv-localStorage-test") === i)
                } catch (j) {
                    return false
                }
            };
            h.uuid = (function() {
                function i() {
                    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)
                }
                return function() {
                    return i() + i() + "-" + i() + "-" + i() + "-" + i() + "-" + i() + i() + i()
                }
            }());
            h.usesFullScreen = function() {
                return "cancelFullScreen" in document && !h.useNative()
            };
            h.NodeListToArray = function(k) {
                var m;
                var l = k.length;
                var j = [];
                for (m = 0; m !== l; m++) {
                    j.push(k[m])
                }
                return j
            };
            h.getElementAsync = function(i) {
                var j = new c();
                var l;
                var k = function() {
                    var m = document.getElementsByTagName(i);
                    if (m.length > 0 && m[0]) {
                        clearTimeout(l);
                        j.resolve(m[0])
                    } else {
                        l = setTimeout(k, 10)
                    }
                };
                k();
                return j.promise()
            };
            h.createElementFromMarkup = function(k, i) {
                var j = document.createElement("div");
                j.innerHTML = k;
                k = j.childNodes[0];
                return (i) ? i.appendChild(k) : k
            };
            h.removeElement = function(i) {
                if (i && i.parentNode) {
                    i.parentNode.removeChild(i)
                }
            };
            h.addEventListener = function(l, j, k, i) {
                if (l.addEventListener && !(l.nodeName === "OBJECT" && l.attachEvent && /^qt_/.test(j))) {
                    l.addEventListener(j, k, i)
                } else {
                    if (l.attachEvent) {
                        l.attachEvent("on" + j, k)
                    } else {
                        l["on" + j] = k
                    }
                }
                return l
            };
            h.onMovieReady = function(i, j) {
                i = (typeof i === "string") ? document.getElementById(i) : i;
                switch (i.nodeName.toUpperCase()) {
                    case "OBJECT":
                        h.waitForQuickTimeToLoad(i).then(j);
                        break;
                    default:
                        j();
                        break
                }
            };
            h.waitForQuickTimeToLoad = function(j, k) {
                k = k || new c();
                var m;
                var i;
                var n;
                var l = (a.Browser.name === "IE");
                try {
                    m = j.GetPluginStatus()
                } catch (o) {}
                try {
                    j.GetVolume();
                    i = true
                } catch (o) {
                    i = false
                }
                if (j && typeof m === "string" && /(Complete)/i.test(m) && i) {
                    if (l) {
                        j.SetResetPropertiesOnReload(false);
                        n = j.GetURL();
                        j.autoplay = true;
                        n += (n.indexOf("?") !== -1) ? "&rnd=" + Math.random() : "?rnd=" + Math.random();
                        j.SetURL(n)
                    }
                    setTimeout(function() {
                        k.resolve(true)
                    }, 1)
                } else {
                    setTimeout(function() {
                        h.waitForQuickTimeToLoad(j, k)
                    }, 5)
                }
                return k.promise()
            };
            h.renderQuickTimeMarkup = function(k) {
                var i = new c();
                var l = (a.Browser.name === "IE") ? "elementObject" : "elementEmbed";
                var j = {
                    source: k,
                    type: "video/quicktime",
                    values: {
                        width: 8,
                        height: 8,
                        id: "ac-video-qt-test-movie",
                        eventId: "ac-video-qt-test-event"
                    }
                };
                h.getElementAsync("body").then(function(m) {
                    var n = function() {
                        f.render(l, j, function(o, p) {
                            i.resolve(h.createElementFromMarkup(p, m))
                        })
                    };
                    if (l === "elementObject") {
                        f.render("elementObjectEvent", j, function(o, p) {
                            h.createElementFromMarkup(p, document.getElementsByTagName("head")[0]);
                            n()
                        })
                    } else {
                        n()
                    }
                });
                return i.promise()
            };
            h.clearPair = function(i, k) {
                localStorage.removeItem(i);
                if (h.hasLocalStorage() && !k) {
                    localStorage.removeItem(i)
                } else {
                    var j = [];
                    document.cookie.split("; ").forEach(function(l) {
                        var o = l.split("=");
                        var n = o[0];
                        var m = unescape(o[1]);
                        if (n !== i) {
                            j.push(n + "=" + escape(m))
                        }
                    });
                    document.cookie = j.join("; ")
                }
            };
            h.getSetPair = function(i, k, l) {
                if (h.hasLocalStorage() && !l) {
                    if (typeof k !== "undefined") {
                        localStorage.setItem(i, k)
                    }
                    k = localStorage.getItem(i)
                } else {
                    var j = [];
                    document.cookie.split("; ").forEach(function(m) {
                        var p = m.split("=");
                        var o = p[0];
                        var n = unescape(p[1]);
                        if (o === i) {
                            if (k) {
                                n = k
                            }
                            j.push(o + "=" + escape(n))
                        }
                        k = n
                    });
                    if (i && k) {
                        document.cookie = j.join("; ")
                    }
                }
                return k
            };
            h.getQuicktimePlugin = function() {
                var m;
                var n = /(\d+\.){2}(\d+){1}$/;
                if (navigator.plugins && navigator.plugins[0]) {
                    for (var l = 0; l < navigator.plugins.length; l++) {
                        var j = (/QuickTime/i.test(navigator.plugins[l].name) && typeof m === "undefined");
                        if (j) {
                            if (navigator.plugins[l].version) {
                                m = navigator.plugins[l].version
                            } else {
                                if (n.test(navigator.plugins[l].name)) {
                                    m = navigator.plugins[l].name.match(n);
                                    m = m[0] || undefined
                                }
                            }
                        }
                    }
                } else {
                    var k = ["QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1"];
                    k.forEach(function(o) {
                        var p;
                        var i;
                        try {
                            p = new ActiveXObject(o);
                            i = (typeof p === "object" && typeof p.QuickTimeVersion !== "undefined" && typeof m === "undefined");
                            if (i) {
                                m = p.QuickTimeVersion
                            }
                        } catch (q) {}
                    })
                }
                return m
            };
            h.getPackageLocation = function(k, n) {
                try {
                    var o = new RegExp("/" + k + "\\.?(debug|)\\.js$");
                    var l = new RegExp(".+" + n);
                    var i = h.NodeListToArray(document.getElementsByTagName("script"));
                    var j = i.filter(function(q) {
                        return q.src && o.test(q.src)
                    }).pop().src;
                    return (j) ? ((n) ? j.match(l)[0] : j) : null
                } catch (m) {
                    console.log("Failed because regular expression do not work correctly");
                    console.log("var foo = new RegExp(/foo/);");
                    var p = new RegExp(/foo/);
                    console.log("Variable foo should be an instance of RegExp equal to /foo/");
                    console.log("Instead variable foo equals:", p);
                    console.log(m)
                }
                return null
            };
            h.useNative = function() {
                return /^(iOS|Android)$/.test(a.Browser.os)
            };
            h.getVTTcaptionsTracks = function(i) {
                if (i.textTracks) {
                    var j = h.NodeListToArray(i.textTracks);
                    if (j[0]) {
                        return j
                    }
                }
                return null
            };
            g.exports = h
        }, {
            "ac-base": false,
            "ac-video-templates": "8m2ENo"
        }
    ],
    126: [
        function(c, d, b) {
            var f = c("ac-base").Element;
            var g = c("ac-base").EasingFunctions;
            var a = function(h, i, j) {
                this.element = h;
                this.change = i;
                this.begin = this._getCurrentStyles();
                this.duration = j;
                this.startTime = new Date().getTime()
            };
            a.factory = function(i, j) {
                if (!this.element) {
                    throw "Animate must be mixed into an an object with element property"
                }
                var h = new a(this.element, i, j);
                h._initialize();
                return h
            };
            a.prototype = {
                _easingFunction: "easeInOutQuart",
                _getCurrentStyles: function() {
                    var h = {};
                    for (var i in this.change) {
                        h[i] = f.getStyle(this.element, i)
                    }
                    return h
                },
                _getRatio: function(j) {
                    var h = this._easingFunction;
                    var i = j - this.startTime;
                    var k = this.duration;
                    var l = g[h];
                    return l(i, 0, 1, k)
                },
                _getValue: function(j) {
                    var i = this._getRatio(this.currentTime);
                    var k = this.change[j];
                    var h = this.begin[j];
                    return ((k - h) * i) + h
                },
                _initialize: function() {
                    this._tick(this._getRatio())
                },
                _style: function(i) {
                    var h = this._getValue(i);
                    if (i === "opacity") {
                        this.element.style.filter = "alpha(opacity=" + h * 100 + ")"
                    }
                    this.element.style[i] = h
                },
                _tick: function() {
                    this.currentTime = new Date().getTime();
                    if (this.currentTime < this.startTime + this.duration) {
                        requestAnimationFrame(this._tick.bind(this))
                    }
                    for (var h in this.change) {
                        this._style(h)
                    }
                }
            };
            d.exports = a
        }, {
            "ac-base": false
        }
    ],
    127: [
        function(b, c, a) {
            c.exports = (function() {
                var f = "";
                if (navigator.plugins && navigator.plugins[0]) {
                    for (var h = 0, d = navigator.plugins.length; h < d; h++) {
                        if (/QuickTime/i.test(navigator.plugins[h].name)) {
                            f = f + [(navigator.plugins[h].name || "no plugin name"), (navigator.plugins[h].version || "no plugin version"), (navigator.plugins[h].description || "no plugin description")].join(", ")
                        }
                    }
                } else {
                    var g = ["QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1"];
                    g.forEach(function(i) {
                        var j;
                        f = f + (i + "ActiveXObject: ");
                        try {
                            j = new ActiveXObject(i);
                            if (typeof j === "object") {
                                f = f + ("created successfully, ");
                                if (j.QuickTimeVersion) {
                                    f = f + ("version: " + j.QuickTimeVersion + ".")
                                } else {
                                    f = f + ("no version found.")
                                }
                            }
                        } catch (k) {
                            f = f + ("failed to create.")
                        }
                    })
                }
                f = (f.length > 0) ? f : "Quicktime Not Found";
                return [navigator.userAgent || "No User Agent", navigator.appVersion || "No App Version", f || "No Plugin Info"].join("; ")
            })()
        }, {}
    ],
    128: [
        function(d, f, a) {
            var c = d("ac-base").Object;
            var h = d("ac-base").Ajax;
            var b = d("ac-deferred").Deferred;

            function i() {
                this.translationDictionary = {
                    "bg-BG": "bg-BG.json",
                    "cs-CZ": "cs-CZ.json",
                    "el-GR": "el-GR.json",
                    "de-AT": "de-AT.json",
                    "de-CH": "de-CH.json",
                    "de-DE": "de-DE.json",
                    "de-LI": "de-LI.json",
                    "da-DK": "da-DK.json",
                    en: "en.json",
                    "en-US": "en-US.json",
                    "en-AP": "en-AP.json",
                    "en-CA": "en-CA.json",
                    "en-GB": "en-GB.json",
                    "en-HK": "en-HK.json",
                    "en-IE": "en-IE.json",
                    "en-IN": "en-IN.json",
                    "en-KR": "en-KR.json",
                    "en-AU": "en-AU.json",
                    "en-NZ": "en-NZ.json",
                    "en-SG": "en-SG.json",
                    "en-ZA": "en-ZA.json",
                    es: "es.json",
                    "es-LA": "es-LA.json",
                    "es-MX": "es-MX.json",
                    "es-ES": "es-ES.json",
                    "et-EE": "et-EE.json",
                    "fi-FI": "fi-FI.json",
                    fr: "fr.json",
                    "fr-BE": "fr-BE.json",
                    "fr-CA": "fr-CA.json",
                    "fr-CH": "fr-CH.json",
                    "fr-FR": "fr-FR.json",
                    "hr-HR": "hr-HR.json",
                    "hu-HU": "hu-HU.json",
                    "it-IT": "it-IT.json",
                    ja: "ja.json",
                    "ja-JP": "ja-JP.json",
                    "ko-KR": "ko-KR.json",
                    "lt-LT": "lt-LT.json",
                    "lv-LV": "lv-LV.json",
                    "nl-BE": "nl-BE.json",
                    "nl-NL": "nl-NL.json",
                    "no-NO": "no-NO.json",
                    "pl-PL": "pl-PL.json",
                    pt: "pt.json",
                    "pt-BR": "pt-BR.json",
                    "pt-PT": "pt-PT.json",
                    "ro-RO": "ro-RO.json",
                    "ru-RU": "ru-RU.json",
                    "sk-SK": "sk-SK.json",
                    "sv-SE": "sv-SE.json",
                    "tr-TR": "tr-TR.json",
                    zh: "zh.json",
                    "zh-CN": "zh-CN.json",
                    "zh-HK": "zh-HK.json",
                    "zh-TW": "zh-TW.json"
                };
                this.defaultText = {
                    play: "Play",
                    pause: "Pause",
                    fastreverse: "Fast Reverse",
                    fastforward: "Fast Forward",
                    mutevolume: "Mute Volume",
                    fullvolume: "Full Volume",
                    captionscontrol: "Closed Captions",
                    captionsturnedon: "Closed Captions On",
                    captionsturnedoff: "Closed Captions Off",
                    sizescontrol: "Video Size",
                    downloadcontrol: "Download Video",
                    small: "Small",
                    medium: "Medium",
                    large: "Large",
                    hd: "HD",
                    ipod: "iPod/iPhone",
                    mb: "MB",
                    gb: "GB",
                    tb: "TB",
                    downloadquicktimetitle: "Get QuickTime.",
                    downloadquicktimetext: "Download QuickTime to view this video. QuickTime is free for Mac + PC.",
                    downloadquicktimebutton: "Download",
                    downloadquicktimeurl: "http://www.apple.com/quicktime/download/",
                    elapsed: "elapsed",
                    remaining: "remaining"
                }
            }
            var g = i.prototype;
            g.getLocalizedText = function() {
                this.getTranslation();
                this.responseDeferred = new b();
                var j = "/global/ac_media_player/scripts/ac_media_languages/" + this.languageFile;
                new h.AjaxRequest(j, {
                    onSuccess: function(m) {
                        var k = this.defaultText;
                        c.extend(k, m.responseJSON());
                        for (var l in k) {
                            if (k.hasOwnProperty(l)) {
                                k[l] = k[l].replace("<br />", " ");
                                k[l] = k[l].replace("<br />", " ");
                                k[l] = k[l].replace("<br/>", " ")
                            }
                        }
                        this.responseDeferred.resolve(k)
                    }.bind(this),
                    onFailure: function() {
                        this.responseDeferred.reject()
                    }.bind(this),
                    onError: function() {
                        this.responseDeferred.reject()
                    }.bind(this)
                });
                return this.responseDeferred
            };
            g.getTranslation = function() {
                this.languageAttribute = document.body.parentNode.getAttribute("lang");
                this.languageFileName = this.getLangFromAttr(this.languageAttribute);
                this.languageFile = this.langDictionary(this.languageFileName)
            };
            g.getLangFromAttr = function(j) {
                if (!j) {
                    return "en-US"
                }
                switch (j.toLowerCase()) {
                    case "bg-bg":
                        return "bg-BG";
                    case "cs-cz":
                        return "cs-CZ";
                    case "de-at":
                        return "de-AT";
                    case "de-ch":
                        return "de-CH";
                    case "de-de":
                        return "de-DE";
                    case "de-li":
                        return "de-LI";
                    case "da-dk":
                        return "da-DK";
                    case "el-gr":
                        return "el-GR";
                    case "en-us":
                        return "en-US";
                    case "en-ca":
                        return "en-CA";
                    case "en-ap":
                        return "en-AP";
                    case "en-au":
                        return "en-AU";
                    case "en-gb":
                        return "en-GB";
                    case "en-hk":
                        return "en-HK";
                    case "en-ie":
                        return "en-IE";
                    case "en-in":
                        return "en-IN";
                    case "en-nz":
                        return "en-NZ";
                    case "en-sg":
                        return "en-SG";
                    case "en-kr":
                        return "en-KR";
                    case "en-za":
                        return "en-ZA";
                    case "et-ee":
                        return "et-EE";
                    case "es-es":
                        return "es-ES";
                    case "es-419":
                    case "es-la":
                        return "es-LA";
                    case "es-mx":
                        return "es-MX";
                    case "fi-fi":
                        return "fi-FI";
                    case "fr-be":
                        return "fr-BE";
                    case "fr-ca":
                        return "fr-CA";
                    case "fr-ch":
                        return "fr-CH";
                    case "fr-fr":
                        return "fr-FR";
                    case "hr-hr":
                        return "hr-HR";
                    case "hu-hu":
                        return "hu-HU";
                    case "it-it":
                        return "it-IT";
                    case "ja-jp":
                        return "ja-JP";
                    case "ko-kr":
                        return "ko-KR";
                    case "lt-lt":
                        return "lt-LT";
                    case "lv-lv":
                        return "lv-LV";
                    case "nl-be":
                        return "nl-BE";
                    case "nl-nl":
                        return "nl-NL";
                    case "no-no":
                        return "no-NO";
                    case "pl-pl":
                        return "pl-PL";
                    case "pt":
                    case "pt-br":
                        return "pt-BR";
                    case "pt-pt":
                        return "pt-PT";
                    case "ro-ro":
                        return "ro-RO";
                    case "ru-ru":
                        return "ru-RU";
                    case "sv-se":
                        return "sv-SE";
                    case "sk-sk":
                        return "sk-SK";
                    case "tr-tr":
                        return "tr-TR";
                    case "zh-cn":
                        return "zh-CN";
                    case "zh-hk":
                        return "zh-HK";
                    case "zh-tw":
                        return "zh-TW";
                    default:
                        return j
                }
            };
            g.langDictionary = function(j) {
                var l = j.toLowerCase().split("-")[0],
                    k = this.translationDictionary[j] || false;
                if (!k) {
                    k = this.translationDictionary[l]
                }
                if (!k) {
                    k = this.translationDictionary.en
                }
                return k
            };
            f.exports = i
        }, {
            "ac-base": false
        }
    ],
    129: [
        function(b, c, a) {
            var d = function() {};
            d.prototype = {
                destroy: function() {}
            };
            c.exports = d
        }, {}
    ],
    130: [
        function(b, c, a) {
            if (document.createEvent) {
                try {
                    new window.CustomEvent("click")
                } catch (d) {
                    window.CustomEvent = (function() {
                        function f(h, i) {
                            i = i || {
                                bubbles: false,
                                cancelable: false,
                                detail: undefined
                            };
                            var g = document.createEvent("CustomEvent");
                            g.initCustomEvent(h, i.bubbles, i.cancelable, i.detail);
                            return g
                        }
                        f.prototype = window.Event.prototype;
                        return f
                    }())
                }
            }
        }, {}
    ],
    131: [
        function(b, c, a) {
            function f(g) {
                this._ranges = g;
                this.length = g.length
            }
            var d = f.prototype;
            d.start = function(g) {
                return this._ranges[g][0]
            };
            d.end = function(g) {
                return this._ranges[g][1]
            };
            d.toString = function() {
                return "[object TimeRanges]"
            };
            c.exports = f
        }, {}
    ],
    132: [
        function(b, c, a) {
            var d = b("ac-dom-events");
            if ("webkitIsFullScreen" in document) {
                Document.prototype.cancelFullScreen = Document.prototype.webkitCancelFullScreen;
                HTMLElement.prototype.requestFullScreen = HTMLElement.prototype.webkitRequestFullScreen;
                document.addEventListener("webkitfullscreenchange", d.dispatchEvent.bind(null, document, "fullscreenchange"));
                document.__defineGetter__("isFullScreen", function() {
                    return document.webkitIsFullScreen
                });
                document.__defineGetter__("fullScreen", function() {
                    return document.webkitIsFullScreen
                })
            } else {
                if ("mozFullScreen" in document) {
                    Document.prototype.cancelFullScreen = document.mozCancelFullScreen;
                    HTMLElement.prototype.requestFullScreen = HTMLElement.prototype.mozRequestFullScreen;
                    document.addEventListener("mozfullscreenchange", d.dispatchEvent.bind(null, document, "fullscreenchange"));
                    document.__defineGetter__("isFullScreen", function() {
                        return document.mozFullScreen
                    });
                    document.__defineGetter__("fullScreen", function() {
                        return document.mozFullScreen
                    })
                }
            }
        }, {
            "ac-dom-events": 53
        }
    ],
    133: [
        function(c, d, a) {
            var b = function(f, g) {
                var h = f.getAttribute(g);
                if (h === null) {
                    return false
                } else {
                    if (h === "") {
                        return false
                    }
                }
                return true
            };
            d.exports = b
        }, {}
    ],
    134: [
        function(c, b, g) {
            var j = c("ac-deferred").Deferred;
            var a = c("./definitions");
            var f = c("../lib/browserString");
            var d = c("../version");
            var k = c("../lib/SharedUtils").getSetPair;

            function i(l) {
                l = l || {};
                l.devMode = (typeof l.devMode !== "undefined") ? l.devMode : false;
                var m;
                for (m in l) {
                    if (l.hasOwnProperty(m)) {
                        this[m] = l[m]
                    }
                }
                this.options = l
            }
            var h = i.prototype;
            h.get = function() {
                var o = new j();
                var m = [c("../featureTests/tests/hasHLS"), c("../featureTests/tests/hasH264"), c("../featureTests/tests/hasQuicktime")];
                var r = this.options.devMode;
                var s = {
                    videoTemplate: "",
                    supportedProfiles: []
                };
                var p = -1;
                var q = function(t) {
                    if (r) {
                        try {
                            console.log("test success (" + t.id + "):", t)
                        } catch (u) {}
                    }
                    s.supportedProfiles.push(a[t.id]);
                    if (t.id !== "quicktime" || s.videoTemplate === "") {
                        s.videoTemplate = a[t.id].useTemplate
                    }
                    n()
                };
                var l = function(t) {
                    if (r) {
                        try {
                            console.log("test failure (" + t.id + ")." + ((t.message) ? " Error Message: " + t.message + "." : ""))
                        } catch (u) {}
                    }
                    n()
                };
                var n = function() {
                    p++;
                    if (m[p]) {
                        var v = m[p];
                        if (s.videoTemplate === "" || v.data.id !== "quicktime") {
                            v.run().then(q, l)
                        } else {
                            n()
                        }
                    } else {
                        if (r) {
                            var t = [];
                            s.supportedProfiles.forEach(function(w) {
                                t.push(w.name)
                            });
                            try {
                                console.log("Video Recommendation:", '{ videoTemplate: "' + s.videoTemplate + '"}, supportedProfiles: [' + t.join(", ") + "]")
                            } catch (u) {}
                        }
                        k("browserid", f);
                        k("acVideoVersion", d);
                        o.resolve(s)
                    }
                };
                if (!this.storedValuesAreStillValid) {
                    m.forEach(function(t) {
                        t.reset()
                    })
                }
                n();
                return o.promise()
            };
            h.storedValuesAreStillValid = (f === k("browserid") && d === k("acVideoVersion"));
            b.exports = i
        }, {
            "../featureTests/tests/hasH264": 119,
            "../featureTests/tests/hasHLS": 120,
            "../featureTests/tests/hasQuicktime": 121,
            "../lib/SharedUtils": 125,
            "../lib/browserString": 127,
            "../version": 142,
            "./definitions": 135
        }
    ],
    135: [
        function(g, h, f) {
            var a = "m";
            var d = "v";
            var b = g("ac-base").Environment;
            var i = g("../version").split(".").slice(0, 2).join(".") + ".0";
            var c = window.ac_video_test_directory || "//" + ((document.location.protocol === "https:") ? "www" : "images") + ".apple.com/media/ac/ac-video/" + i + "/";
            h.exports = {
                hls: {
                    name: "hls",
                    useTemplate: "elementVideo",
                    videoType: "application/" + d + "nd.apple." + a + "pegURL",
                    fileExtension: a + "3u8",
                    testFile: c + "test_playback." + a + "3u8",
                    vttFile: c + "test_playback-captions." + d + "tt",
                    sizeRelevant: false
                },
                h264: {
                    name: "h264",
                    useTemplate: "elementVideo",
                    videoType: "video/" + a + "p4; codecs=a" + d + "c1.42E01E," + a + "p4a.40.2",
                    fileExtension: a + "4v",
                    testFile: c + "test_playback_cellular." + a + "4v",
                    vttFile: c + "test_playback-captions." + d + "tt",
                    sizeRelevant: true
                },
                quicktime: {
                    name: "quicktime",
                    useTemplate: (b.Browser.name === "IE") ? "elementObject" : "elementEmbed",
                    videoType: "video/quicktime",
                    fileExtension: a + "4v",
                    testFile: c + "test_playback_cellular." + a + "4v",
                    sizeRelevant: true
                }
            }
        }, {
            "../version": 142,
            "ac-base": false
        }
    ],
    136: [
        function(b, c, a) {
            c.exports = {
                bindingType: "on",
                triggerEvent: "canplay",
                callback: function() {
                    this._qtModel.readyState = 3
                }
            }
        }, {}
    ],
    137: [
        function(b, c, a) {
            c.exports = {
                bindingType: "on",
                triggerEvent: "canplaythrough",
                callback: function() {
                    this._qtModel.readyState = 4
                }
            }
        }, {}
    ],
    138: [
        function(b, c, a) {
            c.exports = {
                bindingType: "once",
                triggerEvent: "ended",
                callback: function() {
                    clearInterval(this._qtModel.timeUpdateInterval);
                    this._qtModel.paused = true;
                    this._qtModel.ended = true
                }
            }
        }, {}
    ],
    139: [
        function(b, c, a) {
            c.exports = {
                bindingType: "on",
                triggerEvent: "error",
                callback: function() {
                    this._qtModel.error = true;
                    this._qtModel.networkState = 0
                }
            }
        }, {}
    ],
    140: [
        function(b, c, a) {
            c.exports = {
                bindingType: "on",
                triggerEvent: "loadeddata",
                callback: function() {
                    this._qtModel.readyState = 2
                }
            }
        }, {}
    ],
    141: [
        function(b, c, a) {
            c.exports = {
                bindingType: "on",
                triggerEvent: "loadedmetadata",
                callback: function() {
                    this._qtModel.readyState = 1;
                    var d = this.element.GetRectangle().split(",");
                    this._qtModel.videoDimensions[0] = d[2];
                    this._qtModel.videoDimensions[1] = d[3]
                }
            }
        }, {}
    ],
    142: [
        function(b, c, a) {
            c.exports = "0.1.4"
        }, {}
    ],
    143: [
        function(c, d, a) {
            var g = c("./View");

            function b(h) {
                g.apply(this, arguments);
                this.element = h
            }
            b.prototype = new g();
            var f = b.prototype;
            f.updateBufferProgress = function(i) {
                var h = this.element.offsetWidth;
                this.element.style.width = i + "%"
            };
            d.exports = b
        }, {
            "./View": 147
        }
    ],
    144: [
        function(f, b, g) {
            var k = f("../lib/SharedUtils");
            var h = f("ac-base").Environment;
            var l = f("./VideoView");
            var d = (h.Browser.name === "IE");
            var j = f("ac-vatman");
            var a = (h.Browser.name === "Safari" && h.Browser.version < 7);

            function c(m) {
                l.apply(this, arguments);
                if (typeof m.captionsTrack !== "string" && m.captionsTrack !== false) {
                    m.captionsTrack = j.vatClient.getVTTSource(m.movSrc)
                }
                if (m.captionsTrack === false) {
                    m.values.disablecaptionscontrol = true
                }
                if (h.Browser.name === "Safari") {
                    m.captionsTrack = false
                }
                this.initializeTemplate(m)
            }
            var i = c.prototype = new l();
            i._captionsEnabledMode = d ? 2 : "showing";
            i._captionsDisabledMode = d ? 1 : a ? "disabled" : "hidden";
            i._getCaptionsMode = function() {
                return this.captionsEnabled ? this._captionsEnabledMode : this._captionsDisabledMode
            };
            i._toggleCaptionsIteratorCallback = function(m) {
                var o = this._getCaptionsMode();
                var n;
                if (o === this._captionsDisabledMode) {
                    n = this.getCaptionsTracks();
                    n.forEach(function(p) {
                        p.mode = o
                    })
                } else {
                    m.mode = o
                }
            };
            i.getCaptionsTracks = function() {
                return k.NodeListToArray(this.element.textTracks)
            };
            i.afterRender = function() {
                l.prototype.afterRender.apply(this, arguments);
                this.finishSetup()
            };
            i.registerHTMLMediaEvents = function() {
                l.prototype.registerHTMLMediaEvents.call(this);
                this.mediaEvents.forEach(function(m) {
                    this._bindings.on(m, this.triggerBinding.bind(this, "acv-" + m))
                }, this)
            };
            i.play = function() {
                this.element.play()
            };
            i.pause = function() {
                this.element.pause()
            };
            i.getPaused = function() {
                return this.element.paused
            };
            i.setMuted = function(m) {
                this.element.muted = m;
                this.muted = m;
                this.trigger("acv-volumechange")
            };
            i.getMuted = function() {
                return this.element.muted
            };
            i.getEnded = function() {
                return this.element.ended
            };
            i.setVolume = function(m) {
                if (typeof m === "number") {
                    this.element.volume = m;
                    if (this.element.muted) {
                        this.setMuted(false)
                    }
                }
            };
            i.getVolume = function() {
                return this.element.volume
            };
            i.setCurrentTime = function(m) {
                this.element.currentTime = m
            };
            i.getCurrentTime = function() {
                return this.element.currentTime
            };
            i.setPlaybackRate = function(m) {
                this.element.playbackRate = m
            };
            i.getPlaybackRate = function() {
                return this.element.playbackRate
            };
            i.getDuration = function() {
                return this.element.duration
            };
            i.setAutoplay = function(m) {
                this.element.autoplay = m
            };
            i.getAutoplay = function() {
                return this.element.autoplay
            };
            i.setLoop = function(m) {
                this.element.loop = m
            };
            i.getLoop = function() {
                return this.element.loop
            };
            i.getError = function() {
                return this.element.error
            };
            i.getVideoWidth = function() {
                return this.element.videoWidth
            };
            i.getVideoHeight = function() {
                return this.element.videoHeight
            };
            i.getWidth = function() {
                return this.element.width
            };
            i.getHeight = function() {
                return this.element.height
            };
            i.getPoster = function() {
                return this.element.poster
            };
            i.getSrc = function() {
                return this.element.src
            };
            i.getCurrentSrc = function() {
                return this.element.currentSrc
            };
            i.getNetworkState = function() {
                return this.element.networkState
            };
            i.getReadyState = function() {
                return this.element.readyState
            };
            i.getControls = function() {
                return this.element.controls
            };
            i.setControls = function(m) {
                this.element.controls = m
            };
            i.getDefaultPlaybackRate = function() {
                return this.element.defaultPlaybackRate
            };
            i.getSeekable = function() {
                return this.element.seekable
            };
            i.getDefaultMuted = function() {
                return this.element.defaultMuted
            };
            i.getSeeking = function() {
                return this.element.seeking
            };
            i.getStartDate = function() {
                return this.element.startDate
            };
            i.getPlayed = function() {
                return this.element.played
            };
            i.getBuffered = function() {
                return this.element.buffered
            };
            b.exports = c
        }, {
            "../lib/SharedUtils": 125,
            "./VideoView": 146,
            "ac-base": false,
            "ac-vatman": 82
        }
    ],
    145: [
        function(b, a, c) {
            var l = b("./VideoView");
            var f = b("../polyfills/TimeRanges");
            b("../polyfills/CustomEvent");
            var g = b("ac-base").Element;
            var j = b("ac-deferred").Deferred;
            var k = b("ac-video-templates");
            var i = b("../lib/SharedUtils");

            function h(m) {
                l.apply(this, arguments);
                if (m.videoTemplate === "elementObject") {
                    k.render("elementObjectEvent", m, function(n, o) {
                        i.createElementFromMarkup(o, document.getElementsByTagName("head")[0]);
                        this.initializeTemplate(m)
                    }.bind(this))
                } else {
                    this.initializeTemplate(m)
                }
            }
            var d = h.prototype = new l();
            d.DOMEmitter = b("../lib/QuicktimeDomEmitter");
            d.timeUpdateFreq = 250;
            d.destroy = function() {
                this.setTimeUpdateInterval(false);
                this.setTimeUpdateInterval = function() {};
                this._bindings.trigger = function() {};
                this.trigger = function() {};
                l.prototype.destroy.call(this)
            };
            d.initializeTemplate = function(m) {
                this._qtModel = {
                    poster: m.values.poster || null,
                    volume: 1,
                    muted: false,
                    timeUpdateInterval: null,
                    lastTimeCheck: null,
                    ended: false,
                    error: null,
                    paused: true,
                    videoDimensions: [null, null],
                    defaultMuted: null,
                    seeking: false,
                    networkState: 0,
                    readyState: 0
                };
                l.prototype.initializeTemplate.apply(this, arguments)
            };
            d.getCaptionsTracks = function() {
                var p = [];
                var m = this.element.GetTrackCount();
                for (var n = 1; n <= m; n++) {
                    var o = this.element.GetTrackType(n);
                    if (o === "Subtitle" || o === "Closed Caption") {
                        p.push({
                            mode: (this.element.GetTrackEnabled(n)) ? "showing" : "hidden",
                            index: n
                        })
                    }
                }
                return p
            };
            d._toggleCaptionsIteratorCallback = function(m) {
                this.element.SetTrackEnabled(m.index, this.captionsEnabled)
            };
            d.afterRender = function() {
                l.prototype.afterRender.apply(this, arguments);
                var m = new j();
                i.onMovieReady(this.element, function() {
                    this.finishSetup();
                    m.resolve(this._bindings)
                }.bind(this));
                return m.promise()
            };
            d.registerHTMLMediaEvents = function() {
                l.prototype.registerHTMLMediaEvents.call(this);
                this.mediaEvents.forEach(function(m) {
                    var n = (m === "loadstart") ? "qt_begin" : "qt_" + m;
                    this._bindings.on(n, function(o) {
                        this.triggerBinding("acv-" + m, o)
                    }, this)
                }.bind(this), this);
                this.shimEvents()
            };
            d.play = function() {
                if (!this._qtModel.paused) {
                    return
                }
                this.element.Play();
                this._qtModel.paused = false;
                this.setTimeUpdateInterval(true)
            };
            d.pause = function() {
                if (this._qtModel.paused) {
                    return
                }
                this.element.Stop();
                this._qtModel.paused = true;
                this.setTimeUpdateInterval(false)
            };
            d.shimEvents = function() {
                var m = [b("../shims/quicktime/ended"), b("../shims/quicktime/error"), b("../shims/quicktime/loadedmetadata"), b("../shims/quicktime/loadeddata"), b("../shims/quicktime/canplay"), b("../shims/quicktime/canplaythrough")];
                m.forEach(function(o) {
                    this._bindings[o.bindingType]("acv-" + o.triggerEvent, o.callback.bind(this))
                }, this);
                var n = g.select("param[name=volume]", this.element);
                this._qtModel.defaultMuted = (n && (+n.value) === 0) ? true : false;
                this.setTimeUpdateInterval(true)
            };
            d.timeUpdateInterval = false;
            d.setTimeUpdateInterval = function(n) {
                if (n && !this.timeUpdateInterval) {
                    var m = function() {
                        if (this._qtModel && this._qtModel.lastTimeCheck !== this.getCurrentTime()) {
                            this._qtModel.lastTimeCheck = this.getCurrentTime();
                            var o = this.getTrackingData();
                            var p = "timeupdate";
                            var q = (typeof CustomEvent === "function") ? new CustomEvent(p) : document.createEventObject();
                            o.event = q;
                            this._bindings.trigger("acv-timeupdate", o)
                        }
                        setTimeout(m.bind(this), this.timeUpdateFreq)
                    }.bind(this);
                    m()
                } else {
                    clearTimeout(this.timeUpdateInterval);
                    this.timeUpdateInterval = false
                }
            };
            d.getPaused = function() {
                return this._qtModel.paused
            };
            d.setMuted = function(m) {
                this._qtModel.muted = m;
                this._qtModel.volume = (m) ? this.getVolume() : this._qtModel.volume;
                this.element.SetVolume((m) ? 0 : (this._qtModel.volume > 0) ? this._qtModel.volume * 256 : 1);
                this.trigger("acv-volumechange")
            };
            d.getMuted = function() {
                return this._qtModel.muted
            };
            d.getEnded = function() {
                return this._qtModel.ended
            };
            d.setVolume = function(m) {
                if (m !== this._qtModel.volume) {
                    this._qtModel.volume = m;
                    this.element.SetVolume(this._qtModel.volume * 256);
                    this._bindings.trigger("acv-volumechange")
                }
                if (this.getMuted()) {
                    this.setMuted(false)
                }
            };
            d.getVolume = function() {
                try {
                    return this._qtModel.volume
                } catch (m) {
                    return null
                }
            };
            d.setCurrentTime = function(n) {
                try {
                    this.element.SetTime(n * this.element.GetTimeScale())
                } catch (m) {}
            };
            d.getCurrentTime = function() {
                try {
                    return (this.element.GetTime() / this.element.GetTimeScale())
                } catch (m) {
                    return null
                }
            };
            d.setPlaybackRate = function(m) {
                this.element.SetRate(m)
            };
            d.getPlaybackRate = function() {
                try {
                    return this.element.GetRate()
                } catch (m) {
                    return null
                }
            };
            d.getDuration = function() {
                try {
                    return (this.element.GetDuration() / this.element.GetTimeScale())
                } catch (m) {
                    return null
                }
            };
            d.setAutoplay = function(m) {
                this.element.SetAutoPlay(m)
            };
            d.getAutoplay = function() {
                return this.element.GetAutoPlay()
            };
            d.setLoop = function(m) {
                this.element.SetIsLooping(m)
            };
            d.getLoop = function() {
                return this.element.GetIsLooping()
            };
            d.getError = function() {
                return this._qtModel.error
            };
            d.getVideoWidth = function() {
                return this._qtModel.videoDimensions[0]
            };
            d.getVideoHeight = function() {
                return this._qtModel.videoDimensions[1]
            };
            d.getWidth = function() {
                return this.element.offsetWidth
            };
            d.getHeight = function() {
                return this.element.offsetHeight
            };
            d.getPoster = function() {
                return this._qtModel.poster
            };
            d.getSrc = function() {
                return this.element.GetURL()
            };
            d.getCurrentSrc = function() {
                return this.element.GetURL()
            };
            d.getNetworkState = function() {
                return this._qtModel.networkState
            };
            d.getReadyState = function() {
                return this._qtModel.readyState
            };
            d.getControls = function() {
                return this._qtModel.values.controls
            };
            d.setControls = function(m) {
                return m
            };
            d.getDefaultPlaybackRate = function() {
                return 1
            };
            d.getSeekable = function() {
                return this.getBuffered()
            };
            d.getDefaultMuted = function() {
                return this._qtModel.defaultMuted
            };
            d.getSeeking = function() {
                return this._seeking
            };
            d.getStartDate = function() {
                return undefined
            };
            d.getPlayed = function() {
                return this.playbackMonitor.getRanges()
            };
            d.getBuffered = function() {
                return (this._qtModel.readyState === 3) ? new f([
                    [0, this.element.GetMaxTimeLoaded() / this.element.GetTimeScale()]
                ]) : null
            };
            a.exports = h
        }, {
            "../lib/QuicktimeDomEmitter": 124,
            "../lib/SharedUtils": 125,
            "../polyfills/CustomEvent": 130,
            "../polyfills/TimeRanges": 131,
            "../shims/quicktime/canplay": 136,
            "../shims/quicktime/canplaythrough": 137,
            "../shims/quicktime/ended": 138,
            "../shims/quicktime/error": 139,
            "../shims/quicktime/loadeddata": 140,
            "../shims/quicktime/loadedmetadata": 141,
            "./VideoView": 146,
            "ac-base": false,
            "ac-video-templates": "8m2ENo"
        }
    ],
    146: [
        function(d, c, f) {
            var o = d("ac-video-templates");
            var l = d("../lib/SharedUtils");
            var i = d("ac-base").Element;
            var g = d("ac-base").Environment;
            var b = (g.Browser.name === "Safari" && g.Browser.version < 6);
            var a = d("./View");
            var j = d("../elements/ControlBar");
            var k = d("ac-feature");
            var h;
            var n = /poster=".+(\.(jpg|gif|png))"/;

            function m() {
                a.apply(this, arguments);
                this._pauseOtherVideos();
                this.shouldDisableControlBar = true
            }
            m._collection = [];
            m.prototype = new a();
            h = m.prototype;
            h.captionsEnabled = false;
            h._pauseOtherVideos = function() {
                if (k.isHandheld() || k.isTablet()) {
                    return
                }
                m._collection.filter(function(p) {
                    return p !== this
                }, this).forEach(function(p) {
                    p.pause()
                });
                if (this._bindings) {
                    this._bindings.trigger("acv-global-pause")
                }
            };
            h.destroy = function() {
                if (this.eventTriggerTimeout) {
                    clearTimeout(this.eventTriggerTimeout);
                    this.eventTriggerTimeout = null
                }
                var p = m._collection.indexOf(this);
                m._collection.splice(p, 1);
                if (this.controlBar) {
                    this.controlBar.destroy()
                }
                this._bindings.destroy();
                a.prototype.off.call(this);
                for (var q in this) {
                    if (this.hasOwnProperty(q)) {
                        this[q] = null
                    }
                }
            };
            h.getCaptionsEnabled = function() {
                return (typeof this.captionsEnabled === "boolean") ? this.captionsEnabled : (typeof this.element.webkitClosedCaptionsVisible === "boolean") ? this.element.webkitClosedCaptionsVisible : false
            };
            h.toggleCaptions = function(q) {
                if (!this.model.values["native"]) {
                    this.captionsEnabled = (typeof q === "boolean") ? q : !this.getCaptionsEnabled();
                    var p = this.getCaptionsTracks();
                    p.forEach(this._toggleCaptionsIteratorCallback, this);
                    this._bindings.trigger(("acv-captions-" + ((this.captionsEnabled) ? "enabled" : "disabled")), this.captionsEnabled)
                }
            };
            h.logStates = function() {
                if (this.element.networkState === this.element.NETWORK_LOADING) {}
                if (this.element.readyState < this.element.HAVE_FUTURE_DATA) {}
            };
            h.DOMEmitter = d("ac-dom-emitter").DOMEmitter;
            h.mediaEvents = d("./mediaEvents");
            h.afterRender = function() {
                a.prototype.afterRender.apply(this, arguments);
                this.wrapper = document.getElementById(this.model.values.wrapperId);
                var p = this.element;
                var r = false;
                if (b) {
                    var q = p.querySelector("source");
                    if (q) {
                        q.setAttribute("type", "video/mp4")
                    }
                }
                if (p.tagName.toLowerCase() === "video") {
                    i.addEventListener(p, "canplay", function() {
                        r = (p.textTracks && p.textTracks.length);
                        if (r === true) {
                            i.removeClassName(this.wrapper, "no-captions")
                        }
                    }.bind(this))
                } else {
                    i.addEventListener(p, "qt_canplay", function() {
                        r = (p.GetTrackCount().length > 0);
                        if (r === true) {
                            i.removeClassName(this.wrapper, "no-captions")
                        }
                    }.bind(this))
                }
            };
            h.close = function() {
                this.pause();
                this._bindings.trigger("acv-close")
            };
            h.finishSetup = function() {
                this._bindings = new this.DOMEmitter(this.element);
                this._bindings._eventEmitter.propagateTo(this.root);
                this.percentBuffered = 0;
                this.registerHTMLMediaEvents();
                if (!l.useNative()) {
                    this.controlBar = new j(this);
                    this.controlBar.createElements()
                }
                this.registerInitialReadinessEvent();
                this._bindings.once("acv-loadedmetadata", function() {
                    this.captionsEnabled = this.getCaptionsEnabled();
                    if (!this.model.values["native"]) {
                        if (this.model.values.disablecaptionscontrol) {
                            this.toggleCaptions(false)
                        } else {
                            this.toggleCaptions(this.captionsEnabled)
                        }
                    }
                    this._bindings.on("click:captions", function() {
                        this.toggleCaptions()
                    }.bind(this))
                }.bind(this));
                if (this.shouldDisableControlBar && this.controlBar) {
                    this.controlBar.setDisabledState()
                }
                this.startLoading()
            };
            h.registerInitialReadinessEvent = function(q) {
                q = (typeof q === "number") ? q : 0;
                var p = function() {
                    if (this.getCurrentTime() > q && this.controlBar) {
                        this.shouldDisableControlBar = false;
                        this.controlBar.setEnabledState();
                        this._bindings.trigger("acv-initialcontrolreadiness");
                        this._bindings.off("acv-timeupdate", p, this)
                    }
                }.bind(this);
                this._bindings.on("acv-timeupdate", p, this);
                this._bindings.on("acv-play", p, this)
            };
            h.initializeTemplate = function(q) {
                this.root = q.root;
                this.id = q.values.id;
                m._collection.push(this);
                this.model = q;
                this.model.isScrubbing = false;
                var p = this.model.values["native"];
                var r = p ? "native" : "masterTemplate";
                o.render(r, this.model, function(t, s) {
                    if (t) {
                        throw t
                    }
                    if (g.Browser.name === "Chrome" && s.match(n)) {
                        s = s.replace(n, "")
                    }
                    this.template = s
                }.bind(this));
                this.propagateTo(this.root);
                this.trigger("acv-video-view-ready", this)
            };
            h.publishBufferData = function() {
                if (this.percentBuffered < 100) {
                    if (this.element && this.element.buffered && this.element.buffered.length > 0 && this.element.buffered.end && this.element.duration) {
                        this.percentBuffered = parseInt((this.element.buffered.end(0) / this.element.duration) * 100);
                        if (this.percentBuffered === 99 && this.element.duration - this.element.buffered.end(0) < 0.85) {
                            this.percentBuffered = 100
                        }
                    } else {
                        try {
                            this.percentBuffered = (this.element.GetMaxBytesLoaded() / this.element.GetMovieSize()) * 100
                        } catch (p) {}
                    }
                }
                this._bindings.trigger("acv-buffered-data", this.percentBuffered)
            };
            h.registerHTMLMediaEvents = function() {
                this._bindings.on("acv-play", this._pauseOtherVideos, this);
                this._bindings.once("acv-startPlaying acv-loadstart", function() {
                    if (this.getPaused() || this.playing !== true) {
                        this.removeLoadingState();
                        if (!this.model.values["native"]) {
                            this.play()
                        }
                    }
                }, this);
                this.on("acv-scrub-start", function() {
                    this.model.isScrubbing = true
                });
                this.on("acv-scrub-end", function() {
                    this.model.isScrubbing = false
                });
                this._bindings.on("acv-timeupdate", function() {
                    this._bindings.trigger("acv-updatetime", {
                        current: this.getCurrentTime(),
                        duration: this.getDuration(),
                        bufferedData: this.getBuffered()
                    });
                    this.publishBufferData()
                }, this);
                this._bindings.on("acv-play", function() {
                    this._bindings.trigger("acv-startPlaying", this.getPaused())
                }, this);
                this._bindings.on("acv-pause", function() {
                    this._bindings.trigger("acv-stopPlaying", this.getPaused())
                }, this);
                this._bindings.on("acv-ended", function() {
                    if (l.usesFullScreen() && document.isFullScreen) {
                        this._bindings.trigger("acv-full-screen-toggle")
                    }
                    this.pause();
                    this.setCurrentTime(0)
                }, this);
                this._bindings.trigger("acv-updatetime");
                this._bindings.on("click:play/pause", function(p) {
                    this.playPauseEvent = p;
                    if (!this.getPaused()) {
                        this.pause()
                    } else {
                        this.play()
                    }
                }, this);
                this._bindings.on("click:close", function() {
                    this.close()
                }, this);
                this._bindings.on("click:fullScreen", function() {
                    this._bindings.trigger("acv-full-screen-toggle")
                }, this)
            };
            h.startLoading = function() {
                this.setLoadingState();
                if (this.element.preload === "none") {
                    this.element.load()
                }
            };
            h.setLoadingState = function() {
                i.addClassName(this.wrapper, "acv-loading")
            };
            h.removeLoadingState = function() {
                i.removeClassName(this.wrapper, "acv-loading")
            };
            h.getTrackingData = function(q) {
                var p = this.model.videoTemplate === "elementVideo";
                return {
                    closeCaptionsEnabled: this.captionsEnabled,
                    currentTime: this.getCurrentTime(),
                    duration: this.getDuration(),
                    event: q,
                    playerType: p ? "video" : "quicktime",
                    videoType: this.model.videoType
                }
            };
            h.triggerTimeout = function(p, q) {
                this.eventTriggerTimeout = setTimeout(function() {
                    this.triggerBinding(p, q)
                }.bind(this), 100);
                return this.eventTriggerTimeout
            };
            h.triggerBinding = function(q, u) {
                try {
                    var v = !! q.match(/^acv\-(?:play|pause|volumechange)$/);
                    var r = !! q.match(/^acv\-(?:play|pause|ended|timeupdate)$/);
                    var t = !! q.match(/^acv\-(?:play|pause)$/);
                    u = (t && this.playPauseEvent) ? this.playPauseEvent : u;
                    if (!this.model.isScrubbing || !v) {
                        if (isNaN(this.getDuration())) {
                            return this.triggerTimeout(q, u)
                        }
                        try {
                            var p = r ? this.getTrackingData(u) : undefined;
                            this._bindings.trigger(q, p)
                        } catch (s) {
                            return this.triggerTimeout(q, u)
                        }
                    }
                } catch (s) {}
            };
            c.exports = m
        }, {
            "../elements/ControlBar": 96,
            "../lib/SharedUtils": 125,
            "./View": 147,
            "./mediaEvents": 148,
            "ac-base": false,
            "ac-dom-emitter": 49,
            "ac-feature": 54,
            "ac-video-templates": "8m2ENo"
        }
    ],
    147: [
        function(b, c, a) {
            var f = b("ac-event-emitter").EventEmitter;

            function g() {}
            var d = g.prototype = new f();
            d.destroy = function() {
                this.off()
            };
            d.render = function() {
                return this.template
            };
            d.afterRender = function() {
                this.element = document.getElementById(this.id)
            };
            c.exports = g
        }, {
            "ac-event-emitter": false
        }
    ],
    148: [
        function(b, c, a) {
            c.exports = ["loadstart", "progress", "suspend", "abort", "error", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "playing", "waiting", "seeking", "seeked", "ended", "durationchange", "timeupdate", "play", "pause", "ratechange", "resize", "volumechange"]
        }, {}
    ],
    149: [
        function(b, c, a) {
            c.exports = {
                ModalVideo: b("./ac-modal-video/ModalVideo"),
                Builder: b("./ac-modal-video/Builder")
            }
        }, {
            "./ac-modal-video/Builder": 150,
            "./ac-modal-video/ModalVideo": 151
        }
    ],
    150: [
        function(b, a, c) {
            var j = b("ac-video").Video;
            var f = b("ac-base").Element;
            var d = b("./ModalVideo");
            var h = b("ac-dom-emitter").DOMEmitter;
            var i = b("ac-base").Environment;
            var g = b("ac-analytics");
            a.exports = (function() {
                return {
                    create: function(n, l) {
                        var m;
                        var l;
                        var k;
                        this._rewriteMovieLinksForAndroid(n);
                        if (i.Feature.isHandheld()) {
                            m = "AC_Video";
                            k = this._createHandheldVideo(n, l)
                        } else {
                            m = "AC_ModalVideo";
                            l = l || {
                                responsive: {
                                    maxWidth: 848
                                },
                                deepLink: true
                            };
                            k = new d(n.replace(/-trigger/, ""), l)
                        }
                        return k ? {
                            type: m,
                            instance: k
                        } : null
                    },
                    _rewriteMovieLinksForAndroid: function(l) {
                        if (i.Browser.os.toLowerCase() === "android") {
                            var k = f.getElementById(l);
                            if (k && typeof k.href !== "undefined") {
                                k.href = k.href.replace("http://images.apple.com/v/imac-with-retina/a/scripts/_r848-9dwc.mov", "http://images.apple.com/v/imac-with-retina/a/scripts/_416x234h.mp4")
                            }
                        }
                    },
                    _createHandheldVideo: function(m, l) {
                        var p = f.getElementById(m);
                        var k;
                        var o;
                        var n;
                        if (f.isElement(p)) {
                            p.setAttribute("data-acv-target", p.id);
                            p.setAttribute("data-acv-trigger-open", p.id);
                            k = new j(m, l || {
                                responsive: true
                            });
                            if (typeof g === "object" && k) {
                                new g.observer.Video(k)
                            }
                            k.on("acv-ended", function(q) {
                                k.videoView.element.webkitExitFullScreen()
                            });
                            k.api.instanceAPI.initialize();
                            n = new h(k.el);
                            n.on("click", function(q) {
                                q.preventDefault()
                            });
                            n.on("touchstart", function(q) {
                                o = false
                            });
                            n.on("touchmove", function(q) {
                                o = true
                            });
                            n.on("touchend", function(q) {
                                if (!o) {
                                    k.api.instanceAPI.player.play()
                                }
                                o = false
                            })
                        }
                        return k
                    }
                }
            })()
        }, {
            "./ModalVideo": 151,
            "ac-base": false,
            "ac-dom-emitter": 49,
            "ac-video": 89
        }
    ],
    151: [
        function(d, b, j) {
            var o = d("ac-modal").Modal;
            var c = d("ac-video").Video;
            var i = d("ac-video").Utils;
            var m = d("ac-base").Element;
            var n = d("ac-analytics");
            var a = d("ac-base").Event;
            var h = d("ac-base").Environment.Feature;
            var g = d("ac-object");
            var l;
            var f = {
                deepLink: false,
                responsive: true
            };
            var k = function(q, p) {
                this.options = g.defaults(f, p || {});
                this.ids = {
                    original: q,
                    trigger: q + "-trigger",
                    target: q + "-target"
                };
                this.trigger = m.getElementById(this.ids.trigger);
                if (this.trigger) {
                    this.target = this._createTarget(this.trigger);
                    this.videoHeight = 0;
                    this.videoWidth = 0;
                    this.modal = this._createModal();
                    this.video = this._createVideo();
                    this._attachEvents();
                    if (this.options.deepLink) {
                        this._playByHash(document.location.hash)
                    }
                }
            };
            l = k.prototype;
            l._attachEvents = function() {
                m.addEventListener(this.trigger, "click", this._onTriggerClick.bind(this));
                this.modal.on("willclose", this._onModalWillClose, this);
                this.video.on("acv-ended", this._onEnded, this);
                this.video.once("acv-video-view-ready", this._setVideoDimensions, this)
            };
            l._setVideoDimensions = function() {
                this.videoHeight = parseInt(this.video.videoView.element.clientHeight, 10);
                this.videoWidth = parseInt(this.video.videoView.element.clientWidth, 10);
                m.setStyle(this.modal.contentElement, {
                    height: this.videoHeight,
                    marginTop: Math.floor(((this.videoHeight / 2) * -1)) + "px"
                })
            };
            l._shouldPlayInModal = function() {
                return this.video && (h.isTablet() || h.isDesktop())
            };
            l._onTriggerClick = function(p) {
                if (this._shouldPlayInModal()) {
                    a.stop(p);
                    this.video.api.instanceAPI.initialize();
                    this.modal.open();
                    if (this.video.videoView && this.video.videoView.getPaused()) {
                        this.video.off("acv-play", this._pause);
                        this._play()
                    }
                }
            };
            l._onEnded = function() {
                if ("webkitExitFullScreen" in this.video.videoView.element) {
                    this.video.videoView.element.webkitExitFullScreen()
                }
                this.modal.close()
            };
            l._onModalWillClose = function() {
                if (this.video.videoView && this.video.videoView.getReadyState() > 0) {
                    this._pause();
                    this.video.api.instanceAPI.player.setCurrentTime(0)
                } else {
                    this.video.on("acv-play", this._pause, this)
                }
            };
            l._pause = function() {
                if (this.video.videoView && this.video.videoView.getReadyState() > 0) {
                    if (this.video.has("acv-play", this._pause)) {
                        this.video.off("acv-play", this._pause)
                    }
                    this.video.api.instanceAPI.player.pause()
                }
            };
            l._play = function() {
                if (this.video.videoView && this.video.videoView.getReadyState() >= 4) {
                    this.video.api.instanceAPI.player.play()
                }
            };
            l._createModal = function() {
                var q;
                var p = document.createElement("div");
                if (h.isTablet()) {
                    m.addClassName(p, "tablet")
                }
                p.appendChild(this.target);
                q = new o(p);
                return q
            };
            l._createVideo = function() {
                var p = {
                    responsive: this.options.responsive ? {
                        maxWidth: 848
                    } : false
                };
                var q = new c(this.target, p);
                if (typeof n === "object" && q) {
                    new n.observer.Video(q)
                }
                return q
            };
            l._createTarget = function() {
                var p = this.trigger.cloneNode();
                p.id = this.ids.target;
                m.addClassName(p, "acv-video-player-container");
                m.addClassName(p, "acv-video-player-container-" + this.ids.original);
                p.setAttribute("data-acv-target", this.ids.target);
                return p
            };
            l._playByHash = function(r) {
                var p = r.substr(1);
                var q = (this.ids.original === p);
                if (q) {
                    this.trigger.click()
                }
            };
            b.exports = k
        }, {
            "ac-base": false,
            "ac-modal": 51,
            "ac-object": 153,
            "ac-video": 89
        }
    ],
    152: [
        function(b, c, a) {
            c.exports = b(74)
        }, {}
    ],
    153: [
        function(b, c, a) {
            c.exports = {
                clone: b("./ac-object/clone"),
                create: b("./ac-object/create"),
                defaults: b("./ac-object/defaults"),
                extend: b("./ac-object/extend"),
                getPrototypeOf: b("./ac-object/getPrototypeOf"),
                isDate: b("./ac-object/isDate"),
                isEmpty: b("./ac-object/isEmpty"),
                isRegExp: b("./ac-object/isRegExp"),
                toQueryParameters: b("./ac-object/toQueryParameters")
            }
        }, {
            "./ac-object/clone": 154,
            "./ac-object/create": 155,
            "./ac-object/defaults": 156,
            "./ac-object/extend": 157,
            "./ac-object/getPrototypeOf": 158,
            "./ac-object/isDate": 159,
            "./ac-object/isEmpty": 160,
            "./ac-object/isRegExp": 161,
            "./ac-object/toQueryParameters": 162
        }
    ],
    154: [
        function(b, c, a) {
            var f = b("./extend");
            c.exports = function d(g) {
                return f({}, g)
            }
        }, {
            "./extend": 157
        }
    ],
    155: [
        function(b, d, a) {
            var f = function() {};
            d.exports = function c(g) {
                if (arguments.length > 1) {
                    throw new Error("Second argument not supported")
                }
                if (g === null || typeof g !== "object") {
                    throw new TypeError("Object prototype may only be an Object.")
                }
                if (typeof Object.create === "function") {
                    return Object.create(g)
                } else {
                    f.prototype = g;
                    return new f()
                }
            }
        }, {}
    ],
    156: [
        function(b, c, a) {
            var f = b("./extend");
            c.exports = function d(h, g) {
                if (typeof h !== "object") {
                    throw new TypeError("defaults: must provide a defaults object")
                }
                g = g || {};
                if (typeof g !== "object") {
                    throw new TypeError("defaults: options must be a typeof object")
                }
                return f({}, h, g)
            }
        }, {
            "./extend": 157
        }
    ],
    157: [
        function(c, d, b) {
            var a = Object.prototype.hasOwnProperty;
            d.exports = function f() {
                var h;
                var g;
                if (arguments.length < 2) {
                    h = [{},
                        arguments[0]
                    ]
                } else {
                    h = [].slice.call(arguments)
                }
                g = h.shift();
                h.forEach(function(j) {
                    if (j != null) {
                        for (var i in j) {
                            if (a.call(j, i)) {
                                g[i] = j[i]
                            }
                        }
                    }
                });
                return g
            }
        }, {}
    ],
    158: [
        function(c, d, b) {
            var a = Object.prototype.hasOwnProperty;
            d.exports = function f(i) {
                if (Object.getPrototypeOf) {
                    return Object.getPrototypeOf(i)
                } else {
                    if (typeof i !== "object") {
                        throw new Error("Requested prototype of a value that is not an object.")
                    } else {
                        if (typeof this.__proto__ === "object") {
                            return i.__proto__
                        } else {
                            var g = i.constructor;
                            var h;
                            if (a.call(i, "constructor")) {
                                h = g;
                                if (!(delete i.constructor)) {
                                    return null
                                }
                                g = i.constructor;
                                i.constructor = h
                            }
                            return g ? g.prototype : null
                        }
                    }
                }
            }
        }, {}
    ],
    159: [
        function(b, d, a) {
            d.exports = function c(f) {
                return Object.prototype.toString.call(f) === "[object Date]"
            }
        }, {}
    ],
    160: [
        function(c, d, b) {
            var a = Object.prototype.hasOwnProperty;
            d.exports = function f(g) {
                var h;
                if (typeof g !== "object") {
                    throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
                }
                for (h in g) {
                    if (a.call(g, h)) {
                        return false
                    }
                }
                return true
            }
        }, {}
    ],
    161: [
        function(c, d, b) {
            d.exports = function a(f) {
                return window.RegExp ? f instanceof RegExp : false
            }
        }, {}
    ],
    162: [
        function(c, f, b) {
            var a = c("qs");
            f.exports = function d(g) {
                if (typeof g !== "object") {
                    throw new TypeError("toQueryParameters error: argument is not an object")
                }
                return a.stringify(g)
            }
        }, {
            qs: 152
        }
    ],
    163: [
        function(b, c, a) {
            c.exports.ValueSmoother = b("./ac-value-smoother/ValueSmoother")
        }, {
            "./ac-value-smoother/ValueSmoother": 164
        }
    ],
    164: [
        function(c, d, b) {
            function a(g) {
                g = g || this.sampling;
                this.pool = new Array(g);
                this.raw = 0;
                this.value = 0
            }
            var f = a.prototype;
            f.sampling = 3;
            f.smooth = function(h, m) {
                var k = 0;
                var g = this.pool.length;
                if (typeof this.pool[g - this.sampling] !== "undefined") {
                    for (var j = this.sampling; j > 0; j--) {
                        k += this.pool[g - j]
                    }
                    k += h;
                    k /= (this.sampling + 1)
                } else {
                    k = h
                } if (!m) {
                    this.raw = h;
                    this._track(k, true)
                }
                return k
            };
            f._track = function(h, g) {
                if (g) {
                    this.value = h
                } else {
                    this.raw = this.value = h
                }
                this.pool.push(h);
                this.pool.shift()
            };
            d.exports = a
        }, {}
    ],
    165: [
        function(b, c, a) {
            c.exports = 8
        }, {}
    ],
    166: [
        function(b, c, a) {
            c.exports = 11
        }, {}
    ],
    167: [
        function(b, c, a) {
            c.exports = 9
        }, {}
    ],
    168: [
        function(b, c, a) {
            c.exports = 10
        }, {}
    ],
    169: [
        function(b, c, a) {
            c.exports = 1
        }, {}
    ],
    170: [
        function(b, c, a) {
            c.exports = 3
        }, {}
    ],
    171: [
        function(c, d, b) {
            d.exports = function a(g) {
                var f = document.createDocumentFragment();
                var h;
                if (g) {
                    h = document.createElement("div");
                    h.innerHTML = g;
                    while (h.firstChild) {
                        f.appendChild(h.firstChild)
                    }
                }
                return f
            }
        }, {}
    ],
    172: [
        function(d, f, c) {
            d("ac-polyfills/Array/prototype.slice");
            d("ac-polyfills/Array/prototype.filter");
            var g = d("./internal/isNodeType");
            var a = d("./ELEMENT_NODE");
            f.exports = function b(i, h) {
                h = h || a;
                i = Array.prototype.slice.call(i);
                return i.filter(function(j) {
                    return g(j, h)
                })
            }
        }, {
            "./ELEMENT_NODE": 169,
            "./internal/isNodeType": 178,
            "ac-polyfills/Array/prototype.filter": 188,
            "ac-polyfills/Array/prototype.slice": 189
        }
    ],
    173: [
        function(b, c, a) {
            c.exports = {
                createDocumentFragment: b("./createDocumentFragment"),
                filterByNodeType: b("./filterByNodeType"),
                insertAfter: b("./insertAfter"),
                insertBefore: b("./insertBefore"),
                insertFirstChild: b("./insertFirstChild"),
                insertLastChild: b("./insertLastChild"),
                isComment: b("./isComment"),
                isDocument: b("./isDocument"),
                isDocumentFragment: b("./isDocumentFragment"),
                isDocumentType: b("./isDocumentType"),
                isElement: b("./isElement"),
                isNode: b("./isNode"),
                isNodeList: b("./isNodeList"),
                isTextNode: b("./isTextNode"),
                remove: b("./remove"),
                replace: b("./replace"),
                COMMENT_NODE: b("./COMMENT_NODE"),
                DOCUMENT_FRAGMENT_NODE: b("./DOCUMENT_FRAGMENT_NODE"),
                DOCUMENT_NODE: b("./DOCUMENT_NODE"),
                DOCUMENT_TYPE_NODE: b("./DOCUMENT_TYPE_NODE"),
                ELEMENT_NODE: b("./ELEMENT_NODE"),
                TEXT_NODE: b("./TEXT_NODE")
            }
        }, {
            "./COMMENT_NODE": 165,
            "./DOCUMENT_FRAGMENT_NODE": 166,
            "./DOCUMENT_NODE": 167,
            "./DOCUMENT_TYPE_NODE": 168,
            "./ELEMENT_NODE": 169,
            "./TEXT_NODE": 170,
            "./createDocumentFragment": 171,
            "./filterByNodeType": 172,
            "./insertAfter": 174,
            "./insertBefore": 175,
            "./insertFirstChild": 176,
            "./insertLastChild": 177,
            "./isComment": 180,
            "./isDocument": 181,
            "./isDocumentFragment": 182,
            "./isDocumentType": 183,
            "./isElement": 184,
            "./isNode": 185,
            "./isNodeList": 186,
            "./isTextNode": 187,
            "./remove": 190,
            "./replace": 191
        }
    ],
    174: [
        function(b, c, a) {
            var f = b("./internal/validate");
            c.exports = function d(g, h) {
                f.insertNode(g, true, "insertAfter");
                f.childNode(h, true, "insertAfter");
                f.hasParentNode(h, "insertAfter");
                if (!h.nextSibling) {
                    return h.parentNode.appendChild(g)
                }
                return h.parentNode.insertBefore(g, h.nextSibling)
            }
        }, {
            "./internal/validate": 179
        }
    ],
    175: [
        function(c, d, a) {
            var f = c("./internal/validate");
            d.exports = function b(g, h) {
                f.insertNode(g, true, "insertBefore");
                f.childNode(h, true, "insertBefore");
                f.hasParentNode(h, "insertBefore");
                return h.parentNode.insertBefore(g, h)
            }
        }, {
            "./internal/validate": 179
        }
    ],
    176: [
        function(c, d, b) {
            var f = c("./internal/validate");
            d.exports = function a(g, h) {
                f.insertNode(g, true, "insertFirstChild");
                f.parentNode(h, true, "insertFirstChild");
                if (!h.firstChild) {
                    return h.appendChild(g)
                }
                return h.insertBefore(g, h.firstChild)
            }
        }, {
            "./internal/validate": 179
        }
    ],
    177: [
        function(b, c, a) {
            var d = b("./internal/validate");
            c.exports = function f(g, h) {
                d.insertNode(g, true, "insertLastChild");
                d.parentNode(h, true, "insertLastChild");
                return h.appendChild(g)
            }
        }, {
            "./internal/validate": 179
        }
    ],
    178: [
        function(b, c, a) {
            var d = b("../isNode");
            c.exports = function f(h, g) {
                if (!d(h)) {
                    return false
                }
                if (typeof g === "number") {
                    return (h.nodeType === g)
                }
                return (g.indexOf(h.nodeType) !== -1)
            }
        }, {
            "../isNode": 185
        }
    ],
    179: [
        function(g, d, j) {
            var b = g("./isNodeType");
            var c = g("../COMMENT_NODE");
            var k = g("../DOCUMENT_FRAGMENT_NODE");
            var i = g("../ELEMENT_NODE");
            var h = g("../TEXT_NODE");
            var m = [i, h, c, k];
            var f = " must be an Element, TextNode, Comment, or Document Fragment";
            var p = [i, h, c];
            var l = " must be an Element, TextNode, or Comment";
            var n = [i, k];
            var o = " must be an Element, or Document Fragment";
            var a = " must have a parentNode";
            d.exports = {
                parentNode: function(q, t, s, r) {
                    r = r || "target";
                    if ((q || t) && !b(q, n)) {
                        throw new TypeError(s + ": " + r + o)
                    }
                },
                childNode: function(q, t, s, r) {
                    r = r || "target";
                    if (!q && !t) {
                        return
                    }
                    if (!b(q, p)) {
                        throw new TypeError(s + ": " + r + l)
                    }
                },
                insertNode: function(q, t, s, r) {
                    r = r || "node";
                    if (!q && !t) {
                        return
                    }
                    if (!b(q, m)) {
                        throw new TypeError(s + ": " + r + f)
                    }
                },
                hasParentNode: function(q, s, r) {
                    r = r || "target";
                    if (!q.parentNode) {
                        throw new TypeError(s + ": " + r + a)
                    }
                }
            }
        }, {
            "../COMMENT_NODE": 165,
            "../DOCUMENT_FRAGMENT_NODE": 166,
            "../ELEMENT_NODE": 169,
            "../TEXT_NODE": 170,
            "./isNodeType": 178
        }
    ],
    180: [
        function(c, d, a) {
            var g = c("./internal/isNodeType");
            var f = c("./COMMENT_NODE");
            d.exports = function b(h) {
                return g(h, f)
            }
        }, {
            "./COMMENT_NODE": 165,
            "./internal/isNodeType": 178
        }
    ],
    181: [
        function(c, d, b) {
            var g = c("./internal/isNodeType");
            var a = c("./DOCUMENT_NODE");
            d.exports = function f(h) {
                return g(h, a)
            }
        }, {
            "./DOCUMENT_NODE": 167,
            "./internal/isNodeType": 178
        }
    ],
    182: [
        function(c, d, b) {
            var g = c("./internal/isNodeType");
            var a = c("./DOCUMENT_FRAGMENT_NODE");
            d.exports = function f(h) {
                return g(h, a)
            }
        }, {
            "./DOCUMENT_FRAGMENT_NODE": 166,
            "./internal/isNodeType": 178
        }
    ],
    183: [
        function(b, c, a) {
            var g = b("./internal/isNodeType");
            var f = b("./DOCUMENT_TYPE_NODE");
            c.exports = function d(h) {
                return g(h, f)
            }
        }, {
            "./DOCUMENT_TYPE_NODE": 168,
            "./internal/isNodeType": 178
        }
    ],
    184: [
        function(c, d, b) {
            var g = c("./internal/isNodeType");
            var a = c("./ELEMENT_NODE");
            d.exports = function f(h) {
                return g(h, a)
            }
        }, {
            "./ELEMENT_NODE": 169,
            "./internal/isNodeType": 178
        }
    ],
    185: [
        function(b, c, a) {
            c.exports = function d(f) {
                return !!(f && f.nodeType)
            }
        }, {}
    ],
    186: [
        function(c, d, b) {
            var f = /^\[object (HTMLCollection|NodeList|Object)\]$/;
            d.exports = function a(g) {
                if (!g) {
                    return false
                }
                if (typeof g.length !== "number") {
                    return false
                }
                if (typeof g[0] === "object" && (!g[0] || !g[0].nodeType)) {
                    return false
                }
                return f.test(Object.prototype.toString.call(g))
            }
        }, {}
    ],
    187: [
        function(c, d, a) {
            var g = c("./internal/isNodeType");
            var b = c("./TEXT_NODE");
            d.exports = function f(h) {
                return g(h, b)
            }
        }, {
            "./TEXT_NODE": 170,
            "./internal/isNodeType": 178
        }
    ],
    188: [
        function(b, c, a) {
            if (!Array.prototype.filter) {
                Array.prototype.filter = function d(l, k) {
                    var j = Object(this);
                    var f = j.length >>> 0;
                    var h;
                    var g = [];
                    if (typeof l !== "function") {
                        throw new TypeError(l + " is not a function")
                    }
                    for (h = 0; h < f; h += 1) {
                        if (h in j && l.call(k, j[h], h, j)) {
                            g.push(j[h])
                        }
                    }
                    return g
                }
            }
        }, {}
    ],
    189: [
        function(b, c, a) {
            (function() {
                var d = Array.prototype.slice;
                try {
                    d.call(document.documentElement)
                } catch (f) {
                    Array.prototype.slice = function(n, j) {
                        j = (typeof j !== "undefined") ? j : this.length;
                        if (Object.prototype.toString.call(this) === "[object Array]") {
                            return d.call(this, n, j)
                        }
                        var l, h = [],
                            k, g = this.length;
                        var o = n || 0;
                        o = (o >= 0) ? o : g + o;
                        var m = (j) ? j : g;
                        if (j < 0) {
                            m = g + j
                        }
                        k = m - o;
                        if (k > 0) {
                            h = new Array(k);
                            if (this.charAt) {
                                for (l = 0; l < k; l++) {
                                    h[l] = this.charAt(o + l)
                                }
                            } else {
                                for (l = 0; l < k; l++) {
                                    h[l] = this[o + l]
                                }
                            }
                        }
                        return h
                    }
                }
            }())
        }, {}
    ],
    190: [
        function(c, d, b) {
            var f = c("./internal/validate");
            d.exports = function a(g) {
                f.childNode(g, true, "remove");
                if (!g.parentNode) {
                    return g
                }
                return g.parentNode.removeChild(g)
            }
        }, {
            "./internal/validate": 179
        }
    ],
    191: [
        function(b, d, a) {
            var f = b("./internal/validate");
            d.exports = function c(g, h) {
                f.insertNode(g, true, "insertFirstChild", "newNode");
                f.childNode(h, true, "insertFirstChild", "oldNode");
                f.hasParentNode(h, "insertFirstChild", "oldNode");
                return h.parentNode.replaceChild(g, h)
            }
        }, {
            "./internal/validate": 179
        }
    ],
    192: [
        function(b, c, a) {
            var d = {
                querySelector: b("./ac-dom-traversal/querySelector"),
                querySelectorAll: b("./ac-dom-traversal/querySelectorAll"),
                ancestor: b("./ac-dom-traversal/ancestor"),
                ancestors: b("./ac-dom-traversal/ancestors"),
                children: b("./ac-dom-traversal/children"),
                firstChild: b("./ac-dom-traversal/firstChild"),
                lastChild: b("./ac-dom-traversal/lastChild"),
                siblings: b("./ac-dom-traversal/siblings"),
                nextSibling: b("./ac-dom-traversal/nextSibling"),
                nextSiblings: b("./ac-dom-traversal/nextSiblings"),
                previousSibling: b("./ac-dom-traversal/previousSibling"),
                previousSiblings: b("./ac-dom-traversal/previousSiblings"),
                filterBySelector: b("./ac-dom-traversal/filterBySelector"),
                matchesSelector: b("./ac-dom-traversal/matchesSelector")
            };
            b("./ac-dom-traversal/shims/ie")(d);
            c.exports = d
        }, {
            "./ac-dom-traversal/ancestor": 193,
            "./ac-dom-traversal/ancestors": 194,
            "./ac-dom-traversal/children": 195,
            "./ac-dom-traversal/filterBySelector": 196,
            "./ac-dom-traversal/firstChild": 197,
            "./ac-dom-traversal/lastChild": 200,
            "./ac-dom-traversal/matchesSelector": 201,
            "./ac-dom-traversal/nextSibling": 202,
            "./ac-dom-traversal/nextSiblings": 203,
            "./ac-dom-traversal/previousSibling": 204,
            "./ac-dom-traversal/previousSiblings": 205,
            "./ac-dom-traversal/querySelector": 206,
            "./ac-dom-traversal/querySelectorAll": 207,
            "./ac-dom-traversal/shims/ie": 208,
            "./ac-dom-traversal/siblings": 209
        }
    ],
    193: [
        function(d, g, c) {
            var a = d("ac-dom-nodes");
            var b = d("./matchesSelector");
            var h = d("./helpers/validate");
            g.exports = function f(j, i) {
                h.childNode(j, true, "ancestors");
                h.selector(i, false, "ancestors");
                if (j !== document.body) {
                    while ((j = j.parentNode) && a.isElement(j)) {
                        if (!i || b(j, i)) {
                            return j
                        }
                        if (j === document.body) {
                            break
                        }
                    }
                }
                return null
            }
        }, {
            "./helpers/validate": 199,
            "./matchesSelector": 201,
            "ac-dom-nodes": 173
        }
    ],
    194: [
        function(d, f, c) {
            var a = d("ac-dom-nodes");
            var b = d("./matchesSelector");
            var h = d("./helpers/validate");
            f.exports = function g(k, i) {
                var j = [];
                h.childNode(k, true, "ancestors");
                h.selector(i, false, "ancestors");
                if (k !== document.body) {
                    while ((k = k.parentNode) && a.isElement(k)) {
                        if (!i || b(k, i)) {
                            j.push(k)
                        }
                        if (k === document.body) {
                            break
                        }
                    }
                }
                return j
            }
        }, {
            "./helpers/validate": 199,
            "./matchesSelector": 201,
            "ac-dom-nodes": 173
        }
    ],
    195: [
        function(d, g, c) {
            var a = d("ac-dom-nodes");
            var b = d("./filterBySelector");
            var h = d("./helpers/validate");
            g.exports = function f(k, i) {
                var j;
                h.parentNode(k, true, "children");
                h.selector(i, false, "children");
                j = k.children || k.childNodes;
                j = a.filterByNodeType(j);
                if (i) {
                    j = b(j, i)
                }
                return j
            }
        }, {
            "./filterBySelector": 196,
            "./helpers/validate": 199,
            "ac-dom-nodes": 173
        }
    ],
    196: [
        function(d, f, c) {
            var b = d("./matchesSelector");
            var g = d("./helpers/validate");
            f.exports = function a(i, h) {
                g.selector(h, true, "filterBySelector");
                i = Array.prototype.slice.call(i);
                return i.filter(function(j) {
                    return b(j, h)
                })
            }
        }, {
            "./helpers/validate": 199,
            "./matchesSelector": 201
        }
    ],
    197: [
        function(b, d, a) {
            var c = b("./children");
            var g = b("./helpers/validate");
            d.exports = function f(j, h) {
                var i;
                g.parentNode(j, true, "firstChild");
                g.selector(h, false, "firstChild");
                if (j.firstElementChild && !h) {
                    return j.firstElementChild
                }
                i = c(j, h);
                if (i.length) {
                    return i[0]
                }
                return null
            }
        }, {
            "./children": 195,
            "./helpers/validate": 199
        }
    ],
    198: [
        function(b, c, a) {
            c.exports = window.Element ? (function(d) {
                return d.matches || d.matchesSelector || d.webkitMatchesSelector || d.mozMatchesSelector || d.msMatchesSelector || d.oMatchesSelector
            }(Element.prototype)) : null
        }, {}
    ],
    199: [
        function(d, b, f) {
            var j = d("ac-dom-nodes");
            var a = function(m, l) {
                if (!j.isNode(m)) {
                    return false
                }
                if (typeof l === "number") {
                    return (m.nodeType === l)
                }
                return (l.indexOf(m.nodeType) !== -1)
            };
            var h = [j.ELEMENT_NODE, j.DOCUMENT_NODE, j.DOCUMENT_FRAGMENT_NODE];
            var i = " must be an Element, Document, or Document Fragment";
            var k = [j.ELEMENT_NODE, j.TEXT_NODE, j.COMMENT_NODE];
            var g = " must be an Element, TextNode, or Comment";
            var c = " must be a string";
            b.exports = {
                parentNode: function(l, o, n, m) {
                    m = m || "node";
                    if ((l || o) && !a(l, h)) {
                        throw new TypeError(n + ": " + m + i)
                    }
                },
                childNode: function(l, o, n, m) {
                    m = m || "node";
                    if (!l && !o) {
                        return
                    }
                    if (!a(l, k)) {
                        throw new TypeError(n + ": " + m + g)
                    }
                },
                selector: function(l, o, n, m) {
                    m = m || "selector";
                    if ((l || o) && typeof l !== "string") {
                        throw new TypeError(n + ": " + m + c)
                    }
                }
            }
        }, {
            "ac-dom-nodes": 173
        }
    ],
    200: [
        function(b, d, a) {
            var c = b("./children");
            var g = b("./helpers/validate");
            d.exports = function f(j, h) {
                var i;
                g.parentNode(j, true, "lastChild");
                g.selector(h, false, "lastChild");
                if (j.lastElementChild && !h) {
                    return j.lastElementChild
                }
                i = c(j, h);
                if (i.length) {
                    return i[i.length - 1]
                }
                return null
            }
        }, {
            "./children": 195,
            "./helpers/validate": 199
        }
    ],
    201: [
        function(f, g, d) {
            var b = f("ac-dom-nodes");
            var a = f("./helpers/nativeMatches");
            var h = f("./helpers/validate");
            g.exports = function c(j, i) {
                h.selector(i, true, "matchesSelector");
                return b.isElement(j) ? a.call(j, i) : false
            }
        }, {
            "./helpers/nativeMatches": 198,
            "./helpers/validate": 199,
            "ac-dom-nodes": 173
        }
    ],
    202: [
        function(d, f, c) {
            var a = d("ac-dom-nodes");
            var b = d("./matchesSelector");
            var h = d("./helpers/validate");
            f.exports = function g(j, i) {
                h.childNode(j, true, "nextSibling");
                h.selector(i, false, "nextSibling");
                if (j.nextElementSibling && !i) {
                    return j.nextElementSibling
                }
                while (j = j.nextSibling) {
                    if (a.isElement(j)) {
                        if (!i || b(j, i)) {
                            return j
                        }
                    }
                }
                return null
            }
        }, {
            "./helpers/validate": 199,
            "./matchesSelector": 201,
            "ac-dom-nodes": 173
        }
    ],
    203: [
        function(f, g, c) {
            var a = f("ac-dom-nodes");
            var b = f("./matchesSelector");
            var h = f("./helpers/validate");
            g.exports = function d(k, i) {
                var j = [];
                h.childNode(k, true, "nextSiblings");
                h.selector(i, false, "nextSiblings");
                while (k = k.nextSibling) {
                    if (a.isElement(k)) {
                        if (!i || b(k, i)) {
                            j.push(k)
                        }
                    }
                }
                return j
            }
        }, {
            "./helpers/validate": 199,
            "./matchesSelector": 201,
            "ac-dom-nodes": 173
        }
    ],
    204: [
        function(d, f, c) {
            var a = d("ac-dom-nodes");
            var b = d("./matchesSelector");
            var h = d("./helpers/validate");
            f.exports = function g(j, i) {
                h.childNode(j, true, "previousSibling");
                h.selector(i, false, "previousSibling");
                if (j.previousElementSibling && !i) {
                    return j.previousElementSibling
                }
                while (j = j.previousSibling) {
                    if (a.isElement(j)) {
                        if (!i || b(j, i)) {
                            return j
                        }
                    }
                }
                return null
            }
        }, {
            "./helpers/validate": 199,
            "./matchesSelector": 201,
            "ac-dom-nodes": 173
        }
    ],
    205: [
        function(d, f, c) {
            var a = d("ac-dom-nodes");
            var b = d("./matchesSelector");
            var h = d("./helpers/validate");
            f.exports = function g(k, i) {
                var j = [];
                h.childNode(k, true, "previousSiblings");
                h.selector(i, false, "previousSiblings");
                while (k = k.previousSibling) {
                    if (a.isElement(k)) {
                        if (!i || b(k, i)) {
                            j.push(k)
                        }
                    }
                }
                return j.reverse()
            }
        }, {
            "./helpers/validate": 199,
            "./matchesSelector": 201,
            "ac-dom-nodes": 173
        }
    ],
    206: [
        function(b, c, a) {
            var f = b("./helpers/validate");
            c.exports = function d(g, h) {
                h = h || document;
                f.parentNode(h, true, "querySelector", "context");
                f.selector(g, true, "querySelector");
                return h.querySelector(g)
            }
        }, {
            "./helpers/validate": 199
        }
    ],
    207: [
        function(b, c, a) {
            var f = b("./helpers/validate");
            c.exports = function d(g, h) {
                h = h || document;
                f.parentNode(h, true, "querySelectorAll", "context");
                f.selector(g, true, "querySelectorAll");
                return Array.prototype.slice.call(h.querySelectorAll(g))
            }
        }, {
            "./helpers/validate": 199
        }
    ],
    208: [
        function(d, f, c) {
            var g = d("../vendor/sizzle/sizzle");
            var b = d("ac-dom-nodes");
            var a = d("../helpers/nativeMatches");
            var h = d("../helpers/validate");
            f.exports = function(j, i) {
                if (i || !("querySelectorAll" in document)) {
                    j.querySelectorAll = function(k, m) {
                        var l;
                        var n;
                        m = m || document;
                        h.parentNode(m, true, "querySelectorAll", "context");
                        h.selector(k, true, "querySelectorAll");
                        if (b.isDocumentFragment(m)) {
                            l = j.children(m);
                            n = [];
                            l.forEach(function(p) {
                                var o;
                                if (g.matchesSelector(p, k)) {
                                    n.push(p)
                                }
                                o = g(k, p);
                                if (o.length) {
                                    n = n.concat(o)
                                }
                            });
                            return n
                        }
                        return g(k, m)
                    };
                    j.querySelector = function(l, m) {
                        var k;
                        m = m || document;
                        h.parentNode(m, true, "querySelector", "context");
                        h.selector(l, true, "querySelector");
                        k = j.querySelectorAll(l, m);
                        return k.length ? k[0] : null
                    }
                }
                if (i || !a) {
                    j.matchesSelector = function(l, k) {
                        return g.matchesSelector(l, k)
                    }
                }
            }
        }, {
            "../helpers/nativeMatches": 198,
            "../helpers/validate": 199,
            "../vendor/sizzle/sizzle": 210,
            "ac-dom-nodes": 173
        }
    ],
    209: [
        function(b, d, a) {
            var c = b("./children");
            var g = b("./helpers/validate");
            d.exports = function f(j, h) {
                var i = [];
                g.childNode(j, true, "siblings");
                g.selector(h, false, "siblings");
                if (j.parentNode) {
                    i = c(j.parentNode, h);
                    i = i.filter(function(k) {
                        return (k !== j)
                    })
                }
                return i
            }
        }, {
            "./children": 195,
            "./helpers/validate": 199
        }
    ],
    210: [
        function(b, c, a) {
            /*!
             * Sizzle CSS Selector Engine
             *  Copyright 2012, The Dojo Foundation
             *  Released under the MIT, BSD, and GPL Licenses.
             *  More information: http://sizzlejs.com/
             */
            (function(ad, v) {
                var ai, D, u, h, n, l = ad.document,
                    o = l.documentElement,
                    L = "undefined",
                    p = false,
                    m = true,
                    t = 0,
                    y = [].slice,
                    ah = [].push,
                    al = ("sizcache" + Math.random()).replace(".", ""),
                    O = "[\\x20\\t\\r\\n\\f]",
                    x = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])",
                    w = "(?:[\\w#_-]|[^\\x00-\\xa0]|\\\\.)",
                    aq = "([*^$|!~]?=)",
                    aa = "\\[" + O + "*(" + x + "+)" + O + "*(?:" + aq + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + w + "+)|)|)" + O + "*\\]",
                    ar = ":(" + x + "+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|(.*))\\)|)",
                    Q = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",
                    s = O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*",
                    r = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + aa + "|" + ar.replace(2, 7) + "|[^\\\\(),])+",
                    aj = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
                    U = new RegExp("^" + s),
                    I = new RegExp(r + "?(?=" + O + "*,|$)", "g"),
                    Y = new RegExp("^(?:(?!,)(?:(?:^|,)" + O + "*" + r + ")*?|" + O + "*(.*?))(\\)|$)"),
                    ao = new RegExp(r.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + s, "g"),
                    Z = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                    ae = /[\x20\t\r\n\f]*[+~]/,
                    am = /:not\($/,
                    E = /h\d/i,
                    ab = /input|select|textarea|button/i,
                    H = /\\(?!\\)/g,
                    T = {
                        ID: new RegExp("^#(" + x + "+)"),
                        CLASS: new RegExp("^\\.(" + x + "+)"),
                        NAME: new RegExp("^\\[name=['\"]?(" + x + "+)['\"]?\\]"),
                        TAG: new RegExp("^(" + x.replace("[-", "[-\\*") + "+)"),
                        ATTR: new RegExp("^" + aa),
                        PSEUDO: new RegExp("^" + ar),
                        CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
                        POS: new RegExp(Q, "ig"),
                        needsContext: new RegExp("^" + O + "*[>+~]|" + Q, "i")
                    }, ag = {}, F = [],
                    A = {}, J = [],
                    an = function(at) {
                        at.sizzleFilter = true;
                        return at
                    }, i = function(at) {
                        return function(au) {
                            return au.nodeName.toLowerCase() === "input" && au.type === at
                        }
                    }, G = function(at) {
                        return function(av) {
                            var au = av.nodeName.toLowerCase();
                            return (au === "input" || au === "button") && av.type === at
                        }
                    }, W = function(at) {
                        var au = false,
                            aw = l.createElement("div");
                        try {
                            au = at(aw)
                        } catch (av) {}
                        aw = null;
                        return au
                    }, C = W(function(au) {
                        au.innerHTML = "<select></select>";
                        var at = typeof au.lastChild.getAttribute("multiple");
                        return at !== "boolean" && at !== "string"
                    }),
                    f = W(function(au) {
                        au.id = al + 0;
                        au.innerHTML = "<a name='" + al + "'></a><div name='" + al + "'></div>";
                        o.insertBefore(au, o.firstChild);
                        var at = l.getElementsByName && l.getElementsByName(al).length === 2 + l.getElementsByName(al + 0).length;
                        n = !l.getElementById(al);
                        o.removeChild(au);
                        return at
                    }),
                    k = W(function(at) {
                        at.appendChild(l.createComment(""));
                        return at.getElementsByTagName("*").length === 0
                    }),
                    S = W(function(at) {
                        at.innerHTML = "<a href='#'></a>";
                        return at.firstChild && typeof at.firstChild.getAttribute !== L && at.firstChild.getAttribute("href") === "#"
                    }),
                    R = W(function(at) {
                        at.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>";
                        if (!at.getElementsByClassName || at.getElementsByClassName("e").length === 0) {
                            return false
                        }
                        at.lastChild.className = "e";
                        return at.getElementsByClassName("e").length !== 1
                    });
                var ac = function(aw, at, ay, aB) {
                    ay = ay || [];
                    at = at || l;
                    var az, au, aA, av, ax = at.nodeType;
                    if (ax !== 1 && ax !== 9) {
                        return []
                    }
                    if (!aw || typeof aw !== "string") {
                        return ay
                    }
                    aA = z(at);
                    if (!aA && !aB) {
                        if ((az = Z.exec(aw))) {
                            if ((av = az[1])) {
                                if (ax === 9) {
                                    au = at.getElementById(av);
                                    if (au && au.parentNode) {
                                        if (au.id === av) {
                                            ay.push(au);
                                            return ay
                                        }
                                    } else {
                                        return ay
                                    }
                                } else {
                                    if (at.ownerDocument && (au = at.ownerDocument.getElementById(av)) && P(at, au) && au.id === av) {
                                        ay.push(au);
                                        return ay
                                    }
                                }
                            } else {
                                if (az[2]) {
                                    ah.apply(ay, y.call(at.getElementsByTagName(aw), 0));
                                    return ay
                                } else {
                                    if ((av = az[3]) && R && at.getElementsByClassName) {
                                        ah.apply(ay, y.call(at.getElementsByClassName(av), 0));
                                        return ay
                                    }
                                }
                            }
                        }
                    }
                    return ak(aw, at, ay, aB, aA)
                };
                var V = ac.selectors = {
                    cacheLength: 50,
                    match: T,
                    order: ["ID", "TAG"],
                    attrHandle: {},
                    createPseudo: an,
                    find: {
                        ID: n ? function(aw, av, au) {
                            if (typeof av.getElementById !== L && !au) {
                                var at = av.getElementById(aw);
                                return at && at.parentNode ? [at] : []
                            }
                        } : function(aw, av, au) {
                            if (typeof av.getElementById !== L && !au) {
                                var at = av.getElementById(aw);
                                return at ? at.id === aw || typeof at.getAttributeNode !== L && at.getAttributeNode("id").value === aw ? [at] : v : []
                            }
                        },
                        TAG: k ? function(at, au) {
                            if (typeof au.getElementsByTagName !== L) {
                                return au.getElementsByTagName(at)
                            }
                        } : function(at, ax) {
                            var aw = ax.getElementsByTagName(at);
                            if (at === "*") {
                                var ay, av = [],
                                    au = 0;
                                for (;
                                    (ay = aw[au]); au++) {
                                    if (ay.nodeType === 1) {
                                        av.push(ay)
                                    }
                                }
                                return av
                            }
                            return aw
                        }
                    },
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: true
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: true
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(at) {
                            at[1] = at[1].replace(H, "");
                            at[3] = (at[4] || at[5] || "").replace(H, "");
                            if (at[2] === "~=") {
                                at[3] = " " + at[3] + " "
                            }
                            return at.slice(0, 4)
                        },
                        CHILD: function(at) {
                            at[1] = at[1].toLowerCase();
                            if (at[1] === "nth") {
                                if (!at[2]) {
                                    ac.error(at[0])
                                }
                                at[3] = +(at[3] ? at[4] + (at[5] || 1) : 2 * (at[2] === "even" || at[2] === "odd"));
                                at[4] = +((at[6] + at[7]) || at[2] === "odd")
                            } else {
                                if (at[2]) {
                                    ac.error(at[0])
                                }
                            }
                            return at
                        },
                        PSEUDO: function(at) {
                            var au, av = at[4];
                            if (T.CHILD.test(at[0])) {
                                return null
                            }
                            if (av && (au = Y.exec(av)) && au.pop()) {
                                at[0] = at[0].slice(0, au[0].length - av.length - 1);
                                av = au[0].slice(0, -1)
                            }
                            at.splice(2, 3, av || at[3]);
                            return at
                        }
                    },
                    filter: {
                        ID: n ? function(at) {
                            at = at.replace(H, "");
                            return function(au) {
                                return au.getAttribute("id") === at
                            }
                        } : function(at) {
                            at = at.replace(H, "");
                            return function(av) {
                                var au = typeof av.getAttributeNode !== L && av.getAttributeNode("id");
                                return au && au.value === at
                            }
                        },
                        TAG: function(at) {
                            if (at === "*") {
                                return function() {
                                    return true
                                }
                            }
                            at = at.replace(H, "").toLowerCase();
                            return function(au) {
                                return au.nodeName && au.nodeName.toLowerCase() === at
                            }
                        },
                        CLASS: function(at) {
                            var au = ag[at];
                            if (!au) {
                                au = ag[at] = new RegExp("(^|" + O + ")" + at + "(" + O + "|$)");
                                F.push(at);
                                if (F.length > V.cacheLength) {
                                    delete ag[F.shift()]
                                }
                            }
                            return function(av) {
                                return au.test(av.className || (typeof av.getAttribute !== L && av.getAttribute("class")) || "")
                            }
                        },
                        ATTR: function(av, au, at) {
                            if (!au) {
                                return function(aw) {
                                    return ac.attr(aw, av) != null
                                }
                            }
                            return function(ax) {
                                var aw = ac.attr(ax, av),
                                    ay = aw + "";
                                if (aw == null) {
                                    return au === "!="
                                }
                                switch (au) {
                                    case "=":
                                        return ay === at;
                                    case "!=":
                                        return ay !== at;
                                    case "^=":
                                        return at && ay.indexOf(at) === 0;
                                    case "*=":
                                        return at && ay.indexOf(at) > -1;
                                    case "$=":
                                        return at && ay.substr(ay.length - at.length) === at;
                                    case "~=":
                                        return (" " + ay + " ").indexOf(at) > -1;
                                    case "|=":
                                        return ay === at || ay.substr(0, at.length + 1) === at + "-"
                                }
                            }
                        },
                        CHILD: function(au, aw, ax, av) {
                            if (au === "nth") {
                                var at = t++;
                                return function(aB) {
                                    var ay, aC, aA = 0,
                                        az = aB;
                                    if (ax === 1 && av === 0) {
                                        return true
                                    }
                                    ay = aB.parentNode;
                                    if (ay && (ay[al] !== at || !aB.sizset)) {
                                        for (az = ay.firstChild; az; az = az.nextSibling) {
                                            if (az.nodeType === 1) {
                                                az.sizset = ++aA;
                                                if (az === aB) {
                                                    break
                                                }
                                            }
                                        }
                                        ay[al] = at
                                    }
                                    aC = aB.sizset - av;
                                    if (ax === 0) {
                                        return aC === 0
                                    } else {
                                        return (aC % ax === 0 && aC / ax >= 0)
                                    }
                                }
                            }
                            return function(az) {
                                var ay = az;
                                switch (au) {
                                    case "only":
                                    case "first":
                                        while ((ay = ay.previousSibling)) {
                                            if (ay.nodeType === 1) {
                                                return false
                                            }
                                        }
                                        if (au === "first") {
                                            return true
                                        }
                                        ay = az;
                                    case "last":
                                        while ((ay = ay.nextSibling)) {
                                            if (ay.nodeType === 1) {
                                                return false
                                            }
                                        }
                                        return true
                                }
                            }
                        },
                        PSEUDO: function(ax, aw, au, at) {
                            var av = V.pseudos[ax] || V.pseudos[ax.toLowerCase()];
                            if (!av) {
                                ac.error("unsupported pseudo: " + ax)
                            }
                            if (!av.sizzleFilter) {
                                return av
                            }
                            return av(aw, au, at)
                        }
                    },
                    pseudos: {
                        not: an(function(at, av, au) {
                            var aw = q(at.replace(aj, "$1"), av, au);
                            return function(ax) {
                                return !aw(ax)
                            }
                        }),
                        enabled: function(at) {
                            return at.disabled === false
                        },
                        disabled: function(at) {
                            return at.disabled === true
                        },
                        checked: function(at) {
                            var au = at.nodeName.toLowerCase();
                            return (au === "input" && !! at.checked) || (au === "option" && !! at.selected)
                        },
                        selected: function(at) {
                            if (at.parentNode) {
                                at.parentNode.selectedIndex
                            }
                            return at.selected === true
                        },
                        parent: function(at) {
                            return !!at.firstChild
                        },
                        empty: function(at) {
                            return !at.firstChild
                        },
                        contains: an(function(at) {
                            return function(au) {
                                return (au.textContent || au.innerText || d(au)).indexOf(at) > -1
                            }
                        }),
                        has: an(function(at) {
                            return function(au) {
                                return ac(at, au).length > 0
                            }
                        }),
                        header: function(at) {
                            return E.test(at.nodeName)
                        },
                        text: function(av) {
                            var au, at;
                            return av.nodeName.toLowerCase() === "input" && (au = av.type) === "text" && ((at = av.getAttribute("type")) == null || at.toLowerCase() === au)
                        },
                        radio: i("radio"),
                        checkbox: i("checkbox"),
                        file: i("file"),
                        password: i("password"),
                        image: i("image"),
                        submit: G("submit"),
                        reset: G("reset"),
                        button: function(au) {
                            var at = au.nodeName.toLowerCase();
                            return at === "input" && au.type === "button" || at === "button"
                        },
                        input: function(at) {
                            return ab.test(at.nodeName)
                        },
                        focus: function(at) {
                            var au = at.ownerDocument;
                            return at === au.activeElement && (!au.hasFocus || au.hasFocus()) && !! (at.type || at.href)
                        },
                        active: function(at) {
                            return at === at.ownerDocument.activeElement
                        }
                    },
                    setFilters: {
                        first: function(av, au, at) {
                            return at ? av.slice(1) : [av[0]]
                        },
                        last: function(aw, av, au) {
                            var at = aw.pop();
                            return au ? aw : [at]
                        },
                        even: function(ay, ax, aw) {
                            var av = [],
                                au = aw ? 1 : 0,
                                at = ay.length;
                            for (; au < at; au = au + 2) {
                                av.push(ay[au])
                            }
                            return av
                        },
                        odd: function(ay, ax, aw) {
                            var av = [],
                                au = aw ? 0 : 1,
                                at = ay.length;
                            for (; au < at; au = au + 2) {
                                av.push(ay[au])
                            }
                            return av
                        },
                        lt: function(av, au, at) {
                            return at ? av.slice(+au) : av.slice(0, +au)
                        },
                        gt: function(av, au, at) {
                            return at ? av.slice(0, +au + 1) : av.slice(+au + 1)
                        },
                        eq: function(aw, av, au) {
                            var at = aw.splice(+av, 1);
                            return au ? aw : at
                        }
                    }
                };
                V.setFilters.nth = V.setFilters.eq;
                V.filters = V.pseudos;
                if (!S) {
                    V.attrHandle = {
                        href: function(at) {
                            return at.getAttribute("href", 2)
                        },
                        type: function(at) {
                            return at.getAttribute("type")
                        }
                    }
                }
                if (f) {
                    V.order.push("NAME");
                    V.find.NAME = function(at, au) {
                        if (typeof au.getElementsByName !== L) {
                            return au.getElementsByName(at)
                        }
                    }
                }
                if (R) {
                    V.order.splice(1, 0, "CLASS");
                    V.find.CLASS = function(av, au, at) {
                        if (typeof au.getElementsByClassName !== L && !at) {
                            return au.getElementsByClassName(av)
                        }
                    }
                }
                try {
                    y.call(o.childNodes, 0)[0].nodeType
                } catch (ap) {
                    y = function(au) {
                        var av, at = [];
                        for (;
                            (av = this[au]); au++) {
                            at.push(av)
                        }
                        return at
                    }
                }
                var z = ac.isXML = function(at) {
                    var au = at && (at.ownerDocument || at).documentElement;
                    return au ? au.nodeName !== "HTML" : false
                };
                var P = ac.contains = o.compareDocumentPosition ? function(au, at) {
                        return !!(au.compareDocumentPosition(at) & 16)
                    } : o.contains ? function(au, at) {
                        var aw = au.nodeType === 9 ? au.documentElement : au,
                            av = at.parentNode;
                        return au === av || !! (av && av.nodeType === 1 && aw.contains && aw.contains(av))
                    } : function(au, at) {
                        while ((at = at.parentNode)) {
                            if (at === au) {
                                return true
                            }
                        }
                        return false
                    };
                var d = ac.getText = function(ax) {
                    var aw, au = "",
                        av = 0,
                        at = ax.nodeType;
                    if (at) {
                        if (at === 1 || at === 9 || at === 11) {
                            if (typeof ax.textContent === "string") {
                                return ax.textContent
                            } else {
                                for (ax = ax.firstChild; ax; ax = ax.nextSibling) {
                                    au += d(ax)
                                }
                            }
                        } else {
                            if (at === 3 || at === 4) {
                                return ax.nodeValue
                            }
                        }
                    } else {
                        for (;
                            (aw = ax[av]); av++) {
                            au += d(aw)
                        }
                    }
                    return au
                };
                ac.attr = function(aw, av) {
                    var at, au = z(aw);
                    if (!au) {
                        av = av.toLowerCase()
                    }
                    if (V.attrHandle[av]) {
                        return V.attrHandle[av](aw)
                    }
                    if (C || au) {
                        return aw.getAttribute(av)
                    }
                    at = aw.getAttributeNode(av);
                    return at ? typeof aw[av] === "boolean" ? aw[av] ? av : null : at.specified ? at.value : null : null
                };
                ac.error = function(at) {
                    throw new Error("Syntax error, unrecognized expression: " + at)
                };
                [0, 0].sort(function() {
                    return (m = 0)
                });
                if (o.compareDocumentPosition) {
                    u = function(au, at) {
                        if (au === at) {
                            p = true;
                            return 0
                        }
                        return (!au.compareDocumentPosition || !at.compareDocumentPosition ? au.compareDocumentPosition : au.compareDocumentPosition(at) & 4) ? -1 : 1
                    }
                } else {
                    u = function(aB, aA) {
                        if (aB === aA) {
                            p = true;
                            return 0
                        } else {
                            if (aB.sourceIndex && aA.sourceIndex) {
                                return aB.sourceIndex - aA.sourceIndex
                            }
                        }
                        var ay, au, av = [],
                            at = [],
                            ax = aB.parentNode,
                            az = aA.parentNode,
                            aC = ax;
                        if (ax === az) {
                            return h(aB, aA)
                        } else {
                            if (!ax) {
                                return -1
                            } else {
                                if (!az) {
                                    return 1
                                }
                            }
                        }
                        while (aC) {
                            av.unshift(aC);
                            aC = aC.parentNode
                        }
                        aC = az;
                        while (aC) {
                            at.unshift(aC);
                            aC = aC.parentNode
                        }
                        ay = av.length;
                        au = at.length;
                        for (var aw = 0; aw < ay && aw < au; aw++) {
                            if (av[aw] !== at[aw]) {
                                return h(av[aw], at[aw])
                            }
                        }
                        return aw === ay ? h(aB, at[aw], -1) : h(av[aw], aA, 1)
                    };
                    h = function(au, at, av) {
                        if (au === at) {
                            return av
                        }
                        var aw = au.nextSibling;
                        while (aw) {
                            if (aw === at) {
                                return -1
                            }
                            aw = aw.nextSibling
                        }
                        return 1
                    }
                }
                ac.uniqueSort = function(au) {
                    var av, at = 1;
                    if (u) {
                        p = m;
                        au.sort(u);
                        if (p) {
                            for (;
                                (av = au[at]); at++) {
                                if (av === au[at - 1]) {
                                    au.splice(at--, 1)
                                }
                            }
                        }
                    }
                    return au
                };

                function B(au, ay, ax, av) {
                    var aw = 0,
                        at = ay.length;
                    for (; aw < at; aw++) {
                        ac(au, ay[aw], ax, av)
                    }
                }

                function X(at, av, az, aA, au, ay) {
                    var aw, ax = V.setFilters[av.toLowerCase()];
                    if (!ax) {
                        ac.error(av)
                    }
                    if (at || !(aw = au)) {
                        B(at || "*", aA, (aw = []), au)
                    }
                    return aw.length > 0 ? ax(aw, az, ay) : []
                }

                function af(aD, at, aB, av, aH) {
                    var ay, au, ax, aJ, aA, aI, aC, aG, aE = 0,
                        aF = aH.length,
                        aw = T.POS,
                        az = new RegExp("^" + aw.source + "(?!" + O + ")", "i"),
                        aK = function() {
                            var aM = 1,
                                aL = arguments.length - 2;
                            for (; aM < aL; aM++) {
                                if (arguments[aM] === v) {
                                    ay[aM] = v
                                }
                            }
                        };
                    for (; aE < aF; aE++) {
                        aw.exec("");
                        aD = aH[aE];
                        aJ = [];
                        ax = 0;
                        aA = av;
                        while ((ay = aw.exec(aD))) {
                            aG = aw.lastIndex = ay.index + ay[0].length;
                            if (aG > ax) {
                                aC = aD.slice(ax, ay.index);
                                ax = aG;
                                aI = [at];
                                if (U.test(aC)) {
                                    if (aA) {
                                        aI = aA
                                    }
                                    aA = av
                                }
                                if ((au = am.test(aC))) {
                                    aC = aC.slice(0, -5).replace(U, "$&*")
                                }
                                if (ay.length > 1) {
                                    ay[0].replace(az, aK)
                                }
                                aA = X(aC, ay[1], ay[2], aI, aA, au)
                            }
                        }
                        if (aA) {
                            aJ = aJ.concat(aA);
                            if ((aC = aD.slice(ax)) && aC !== ")") {
                                B(aC, aJ, aB, av)
                            } else {
                                ah.apply(aB, aJ)
                            }
                        } else {
                            ac(aD, at, aB, av)
                        }
                    }
                    return aF === 1 ? aB : ac.uniqueSort(aB)
                }

                function g(az, av, aC) {
                    var aE, aD, aF, ax = [],
                        aA = 0,
                        aB = Y.exec(az),
                        au = !aB.pop() && !aB.pop(),
                        aG = au && az.match(I) || [""],
                        at = V.preFilter,
                        aw = V.filter,
                        ay = !aC && av !== l;
                    for (;
                        (aD = aG[aA]) != null && au; aA++) {
                        ax.push(aE = []);
                        if (ay) {
                            aD = " " + aD
                        }
                        while (aD) {
                            au = false;
                            if ((aB = U.exec(aD))) {
                                aD = aD.slice(aB[0].length);
                                au = aE.push({
                                    part: aB.pop().replace(aj, " "),
                                    captures: aB
                                })
                            }
                            for (aF in aw) {
                                if ((aB = T[aF].exec(aD)) && (!at[aF] || (aB = at[aF](aB, av, aC)))) {
                                    aD = aD.slice(aB.shift().length);
                                    au = aE.push({
                                        part: aF,
                                        captures: aB
                                    })
                                }
                            }
                            if (!au) {
                                break
                            }
                        }
                    }
                    if (!au) {
                        ac.error(az)
                    }
                    return ax
                }

                function M(ax, aw, av) {
                    var at = aw.dir,
                        au = t++;
                    if (!ax) {
                        ax = function(ay) {
                            return ay === av
                        }
                    }
                    return aw.first ? function(az, ay) {
                        while ((az = az[at])) {
                            if (az.nodeType === 1) {
                                return ax(az, ay) && az
                            }
                        }
                    } : function(aA, az) {
                        var ay, aB = au + "." + D,
                            aC = aB + "." + ai;
                        while ((aA = aA[at])) {
                            if (aA.nodeType === 1) {
                                if ((ay = aA[al]) === aC) {
                                    return false
                                } else {
                                    if (typeof ay === "string" && ay.indexOf(aB) === 0) {
                                        if (aA.sizset) {
                                            return aA
                                        }
                                    } else {
                                        aA[al] = aC;
                                        if (ax(aA, az)) {
                                            aA.sizset = true;
                                            return aA
                                        }
                                        aA.sizset = false
                                    }
                                }
                            }
                        }
                    }
                }

                function K(at, au) {
                    return at ? function(ax, aw) {
                        var av = au(ax, aw);
                        return av && at(av === true ? ax : av, aw)
                    } : au
                }

                function N(ay, aw, at) {
                    var av, ax, au = 0;
                    for (;
                        (av = ay[au]); au++) {
                        if (V.relative[av.part]) {
                            ax = M(ax, V.relative[av.part], aw)
                        } else {
                            av.captures.push(aw, at);
                            ax = K(ax, V.filter[av.part].apply(null, av.captures))
                        }
                    }
                    return ax
                }

                function j(at) {
                    return function(aw, av) {
                        var ax, au = 0;
                        for (;
                            (ax = at[au]); au++) {
                            if (ax(aw, av)) {
                                return true
                            }
                        }
                        return false
                    }
                }
                var q = ac.compile = function(at, aw, au) {
                    var az, ay, av, ax = A[at];
                    if (ax && ax.context === aw) {
                        ax.dirruns++;
                        return ax
                    }
                    ay = g(at, aw, au);
                    for (av = 0;
                        (az = ay[av]); av++) {
                        ay[av] = N(az, aw, au)
                    }
                    ax = A[at] = j(ay);
                    ax.context = aw;
                    ax.runs = ax.dirruns = 0;
                    J.push(at);
                    if (J.length > V.cacheLength) {
                        delete A[J.shift()]
                    }
                    return ax
                };
                ac.matches = function(au, at) {
                    return ac(au, null, null, at)
                };
                ac.matchesSelector = function(at, au) {
                    return ac(au, null, null, [at]).length > 0
                };
                var ak = function(ax, au, az, aD, aC) {
                    ax = ax.replace(aj, "$1");
                    var at, aE, aA, aF, av, aw, aH, aI, ay, aB = ax.match(I),
                        aG = ax.match(ao),
                        aJ = au.nodeType;
                    if (T.POS.test(ax)) {
                        return af(ax, au, az, aD, aB)
                    }
                    if (aD) {
                        at = y.call(aD, 0)
                    } else {
                        if (aB && aB.length === 1) {
                            if (aG.length > 1 && aJ === 9 && !aC && (aB = T.ID.exec(aG[0]))) {
                                au = V.find.ID(aB[1], au, aC)[0];
                                if (!au) {
                                    return az
                                }
                                ax = ax.slice(aG.shift().length)
                            }
                            aI = ((aB = ae.exec(aG[0])) && !aB.index && au.parentNode) || au;
                            ay = aG.pop();
                            aw = ay.split(":not")[0];
                            for (aA = 0, aF = V.order.length; aA < aF; aA++) {
                                aH = V.order[aA];
                                if ((aB = T[aH].exec(aw))) {
                                    at = V.find[aH]((aB[1] || "").replace(H, ""), aI, aC);
                                    if (at == null) {
                                        continue
                                    }
                                    if (aw === ay) {
                                        ax = ax.slice(0, ax.length - ay.length) + aw.replace(T[aH], "");
                                        if (!ax) {
                                            ah.apply(az, y.call(at, 0))
                                        }
                                    }
                                    break
                                }
                            }
                        }
                    } if (ax) {
                        aE = q(ax, au, aC);
                        D = aE.dirruns;
                        if (at == null) {
                            at = V.find.TAG("*", (ae.test(ax) && au.parentNode) || au)
                        }
                        for (aA = 0;
                            (av = at[aA]); aA++) {
                            ai = aE.runs++;
                            if (aE(av, au)) {
                                az.push(av)
                            }
                        }
                    }
                    return az
                };
                if (l.querySelectorAll) {
                    (function() {
                        var ay, az = ak,
                            ax = /'|\\/g,
                            av = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                            au = [],
                            at = [":active"],
                            aw = o.matchesSelector || o.mozMatchesSelector || o.webkitMatchesSelector || o.oMatchesSelector || o.msMatchesSelector;
                        W(function(aA) {
                            aA.innerHTML = "<select><option selected></option></select>";
                            if (!aA.querySelectorAll("[selected]").length) {
                                au.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)")
                            }
                            if (!aA.querySelectorAll(":checked").length) {
                                au.push(":checked")
                            }
                        });
                        W(function(aA) {
                            aA.innerHTML = "<p test=''></p>";
                            if (aA.querySelectorAll("[test^='']").length) {
                                au.push("[*^$]=" + O + "*(?:\"\"|'')")
                            }
                            aA.innerHTML = "<input type='hidden'>";
                            if (!aA.querySelectorAll(":enabled").length) {
                                au.push(":enabled", ":disabled")
                            }
                        });
                        au = au.length && new RegExp(au.join("|"));
                        ak = function(aF, aB, aG, aI, aH) {
                            if (!aI && !aH && (!au || !au.test(aF))) {
                                if (aB.nodeType === 9) {
                                    try {
                                        ah.apply(aG, y.call(aB.querySelectorAll(aF), 0));
                                        return aG
                                    } catch (aE) {}
                                } else {
                                    if (aB.nodeType === 1 && aB.nodeName.toLowerCase() !== "object") {
                                        var aD = aB.getAttribute("id"),
                                            aA = aD || al,
                                            aC = ae.test(aF) && aB.parentNode || aB;
                                        if (aD) {
                                            aA = aA.replace(ax, "\\$&")
                                        } else {
                                            aB.setAttribute("id", aA)
                                        }
                                        try {
                                            ah.apply(aG, y.call(aC.querySelectorAll(aF.replace(I, "[id='" + aA + "'] $&")), 0));
                                            return aG
                                        } catch (aE) {} finally {
                                            if (!aD) {
                                                aB.removeAttribute("id")
                                            }
                                        }
                                    }
                                }
                            }
                            return az(aF, aB, aG, aI, aH)
                        };
                        if (aw) {
                            W(function(aB) {
                                ay = aw.call(aB, "div");
                                try {
                                    aw.call(aB, "[test!='']:sizzle");
                                    at.push(V.match.PSEUDO)
                                } catch (aA) {}
                            });
                            at = new RegExp(at.join("|"));
                            ac.matchesSelector = function(aB, aD) {
                                aD = aD.replace(av, "='$1']");
                                if (!z(aB) && !at.test(aD) && (!au || !au.test(aD))) {
                                    try {
                                        var aA = aw.call(aB, aD);
                                        if (aA || ay || aB.document && aB.document.nodeType !== 11) {
                                            return aA
                                        }
                                    } catch (aC) {}
                                }
                                return ac(aD, null, null, [aB]).length > 0
                            }
                        }
                    })()
                }
                if (typeof c === "object" && c.exports) {
                    c.exports = ac
                } else {
                    ad.Sizzle = ac
                }
            })(window)
        }, {}
    ],
    211: [
        function(b, c, a) {
            c.exports = {
                DOMEmitter: b("./ac-dom-emitter/DOMEmitter")
            }
        }, {
            "./ac-dom-emitter/DOMEmitter": 212
        }
    ],
    212: [
        function(c, b, d) {
            var f;
            var j = c("ac-event-emitter").EventEmitter,
                g = c("ac-dom-events"),
                a = c("ac-dom-traversal");
            var i = "dom-emitter";

            function h(k) {
                if (k === null) {
                    return
                }
                this.el = k;
                this._bindings = {};
                this._delegateFuncs = {};
                this._eventEmitter = new j()
            }
            f = h.prototype;
            f._parseEventNames = function(k) {
                if (!k) {
                    return [k]
                }
                return k.split(" ")
            };
            f._onListenerEvent = function(l, k) {
                this.trigger(l, k, false)
            };
            f._setListener = function(k) {
                this._bindings[k] = this._onListenerEvent.bind(this, k);
                g.addEventListener(this.el, k, this._bindings[k])
            };
            f._removeListener = function(k) {
                g.removeEventListener(this.el, k, this._bindings[k]);
                this._bindings[k] = null
            };
            f._triggerInternalEvent = function(k, l) {
                this.trigger(i + ":" + k, l)
            };
            f._normalizeArgumentsAndCall = function(k, m) {
                var q = {};
                if (k.length === 0) {
                    m.call(this, q);
                    return
                }
                if (typeof k[0] === "string" || k[0] === null) {
                    k = this._cleanStringData(k);
                    q.events = k[0];
                    if (typeof k[1] === "string") {
                        q.delegateQuery = k[1];
                        q.callback = k[2];
                        q.context = k[3]
                    } else {
                        q.callback = k[1];
                        q.context = k[2]
                    }
                    m.call(this, q);
                    return
                }
                var l, o, p = ":",
                    n = k[0];
                for (l in n) {
                    if (n.hasOwnProperty(l)) {
                        q = {};
                        o = this._cleanStringData(l.split(p));
                        q.events = o[0];
                        q.delegateQuery = o[1];
                        q.callback = n[l];
                        q.context = k[1];
                        m.call(this, q)
                    }
                }
            };
            f._registerDelegateFunc = function(m, o, p, k, n) {
                var l = this._delegateFunc.bind(this, m, o, p, n);
                this._delegateFuncs[o] = this._delegateFuncs[o] || {};
                this._delegateFuncs[o][m] = this._delegateFuncs[o][m] || [];
                this._delegateFuncs[o][m].push({
                    func: k,
                    context: n,
                    delegateFunc: l
                });
                return l
            };
            f._cleanStringData = function(n) {
                var m = false;
                if (typeof n === "string") {
                    n = [n];
                    m = true
                }
                var l = [],
                    p, r, q, o, k = n.length;
                for (p = 0; p < k; p++) {
                    r = n[p];
                    if (typeof r === "string") {
                        if (r === "" || r === " ") {
                            continue
                        }
                        q = r.length;
                        while (r[0] === " ") {
                            r = r.slice(1, q);
                            q--
                        }
                        while (r[q - 1] === " ") {
                            r = r.slice(0, q - 1);
                            q--
                        }
                    }
                    l.push(r)
                }
                if (m) {
                    return l[0]
                }
                return l
            };
            f._unregisterDelegateFunc = function(m, p, k, o) {
                if (!this._delegateFuncs[p] || !this._delegateFuncs[p][m]) {
                    return
                }
                var n = this._getDelegateFuncBindingIdx(m, p, k, o),
                    l;
                if (n > -1) {
                    l = this._delegateFuncs[p][m][n].delegateFunc;
                    this._delegateFuncs[p][m].splice(n, 1);
                    if (this._delegateFuncs[p][m].length === 0) {
                        this._delegateFuncs[p][m] = null
                    }
                }
                return l
            };
            f._unregisterDelegateFuncs = function(k, m) {
                if (!this._delegateFuncs[m]) {
                    return
                }
                if (k !== null && !this._delegateFuncs[m][k]) {
                    return
                }
                if (k === null) {
                    var l;
                    for (l in this._delegateFuncs[m]) {
                        if (this._delegateFuncs[m].hasOwnProperty(l)) {
                            this._unbindDelegateFunc(l, m)
                        }
                    }
                    return
                }
                this._unbindDelegateFunc(k, m)
            };
            f._unbindDelegateFunc = function(k, m) {
                var n, o, l = 0;
                while (this._delegateFuncs[m][k] && this._delegateFuncs[m][k][l]) {
                    n = this._delegateFuncs[m][k][l];
                    o = this._delegateFuncs[m][k][l].length;
                    this._off({
                        events: k,
                        delegateQuery: m,
                        callback: n.func,
                        context: n.context
                    });
                    if (this._delegateFuncs[m][k] && o === this._delegateFuncs[m][k].length) {
                        l++
                    }
                }
                n = o = null
            };
            f._unregisterDelegateFuncsByEvent = function(k) {
                var l;
                for (l in this._delegateFuncs) {
                    if (this._delegateFuncs.hasOwnProperty(l)) {
                        this._unregisterDelegateFuncs(k, l)
                    }
                }
            };
            f._delegateFunc = function(k, o, q, m, p) {
                if (a.matchesSelector(g.target(p), o)) {
                    var l = Array.prototype.slice.call(arguments, 0),
                        n = l.slice(4, l.length);
                    m = m || window;
                    if (typeof p.detail === "object") {
                        n[0] = p.detail
                    }
                    q.call(m, n)
                }
            };
            f.on = function() {
                this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._on);
                return this
            };
            f.once = function() {
                this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._once);
                return this
            };
            f.off = function() {
                this._normalizeArgumentsAndCall(Array.prototype.slice.call(arguments, 0), this._off);
                return this
            };
            f._on = function(o) {
                var l = o.events,
                    p = o.callback,
                    n = o.delegateQuery,
                    m = o.context,
                    k = o.unboundCallback || p;
                l = this._parseEventNames(l);
                l.forEach(function(u, q, s, t, r) {
                    if (!this.has(r)) {
                        this._setListener(r)
                    }
                    if (typeof t === "string") {
                        u = this._registerDelegateFunc(r, t, u, q, s)
                    }
                    this._triggerInternalEvent("willon", {
                        evt: r,
                        callback: u,
                        context: s,
                        delegateQuery: t
                    });
                    this._eventEmitter.on(r, u, s);
                    this._triggerInternalEvent("didon", {
                        evt: r,
                        callback: u,
                        context: s,
                        delegateQuery: t
                    })
                }.bind(this, p, k, m, n));
                l = p = k = n = m = null
            };
            f._off = function(p) {
                var l = p.events,
                    q = p.callback,
                    o = p.delegateQuery,
                    n = p.context,
                    k = p.unboundCallback || q;
                if (typeof l === "undefined") {
                    this._eventEmitter.off();
                    var m;
                    for (m in this._bindings) {
                        if (this._bindings.hasOwnProperty(m)) {
                            this._removeListener(m)
                        }
                    }
                    for (m in this._delegateFuncs) {
                        if (this._delegateFuncs.hasOwnProperty(m)) {
                            this._delegateFuncs[m] = null
                        }
                    }
                    return
                }
                l = this._parseEventNames(l);
                l.forEach(function(v, r, t, u, s) {
                    if (typeof u === "string" && typeof r === "function") {
                        v = this._unregisterDelegateFunc(s, u, r, t);
                        if (!v) {
                            return
                        }
                    }
                    if (typeof u === "string" && typeof v === "undefined") {
                        this._unregisterDelegateFuncs(s, u);
                        return
                    }
                    if (typeof s === "string" && typeof v === "undefined") {
                        this._unregisterDelegateFuncsByEvent(s);
                        if (typeof u === "string") {
                            return
                        }
                    }
                    this._triggerInternalEvent("willoff", {
                        evt: s,
                        callback: v,
                        context: t,
                        delegateQuery: u
                    });
                    this._eventEmitter.off(s, v, t);
                    this._triggerInternalEvent("didoff", {
                        evt: s,
                        callback: v,
                        context: t,
                        delegateQuery: u
                    });
                    if (!this.has(s)) {
                        this._removeListener(s)
                    }
                }.bind(this, q, k, n, o));
                l = q = k = o = n = null
            };
            f._once = function(n) {
                var k = n.events,
                    o = n.callback,
                    m = n.delegateQuery,
                    l = n.context;
                k = this._parseEventNames(k);
                k.forEach(function(s, q, r, p) {
                    if (typeof r === "string") {
                        return this._handleDelegateOnce(p, s, q, r)
                    }
                    if (!this.has(p)) {
                        this._setListener(p)
                    }
                    this._triggerInternalEvent("willonce", {
                        evt: p,
                        callback: s,
                        context: q,
                        delegateQuery: r
                    });
                    this._eventEmitter.once.call(this, p, s, q);
                    this._triggerInternalEvent("didonce", {
                        evt: p,
                        callback: s,
                        context: q,
                        delegateQuery: r
                    })
                }.bind(this, o, l, m));
                k = o = m = l = null
            };
            f._handleDelegateOnce = function(k, n, l, m) {
                this._triggerInternalEvent("willonce", {
                    evt: k,
                    callback: n,
                    context: l,
                    delegateQuery: m
                });
                this._on({
                    events: k,
                    context: l,
                    delegateQuery: m,
                    callback: this._getDelegateOnceCallback.bind(this, k, n, l, m),
                    unboundCallback: n
                });
                this._triggerInternalEvent("didonce", {
                    evt: k,
                    callback: n,
                    context: l,
                    delegateQuery: m
                });
                return this
            };
            f._getDelegateOnceCallback = function(k, p, m, o) {
                var l = Array.prototype.slice.call(arguments, 0),
                    n = l.slice(4, l.length);
                p.apply(m, n);
                this._off({
                    events: k,
                    delegateQuery: o,
                    callback: p,
                    context: m
                })
            };
            f._getDelegateFuncBindingIdx = function(r, o, m, k, s) {
                var q = -1;
                if (this._delegateFuncs[o] && this._delegateFuncs[o][r]) {
                    var n, l, p = this._delegateFuncs[o][r].length;
                    for (n = 0; n < p; n++) {
                        l = this._delegateFuncs[o][r][n];
                        if (s && typeof m === "undefined") {
                            m = l.func
                        }
                        if (l.func === m && l.context === k) {
                            q = n;
                            break
                        }
                    }
                }
                return q
            };
            f._triggerDelegateEvents = function(n, p, q) {
                var m = a.querySelectorAll(p, this.el);
                var o, r, k = m.length;
                for (o = 0; o < k; o++) {
                    r = m[o];
                    if (document.createEvent) {
                        r.dispatchEvent(new CustomEvent(n, {
                            bubbles: true,
                            cancelable: false,
                            detail: q
                        }))
                    } else {
                        var l = document.createEventObject();
                        l.detail = q;
                        r.fireEvent("on" + n, l)
                    }
                    return r
                }
            };
            f.has = function(k, p, o, m) {
                var n, q;
                if (typeof p === "string") {
                    n = p;
                    q = o
                } else {
                    q = p;
                    m = o
                } if (n) {
                    var l = this._getDelegateFuncBindingIdx(k, n, q, m, true);
                    if (l > -1) {
                        return true
                    }
                    return false
                }
                if (this._eventEmitter && this._eventEmitter.has.apply(this._eventEmitter, arguments)) {
                    return true
                }
                return false
            };
            f.trigger = function(l, k, m, p) {
                l = this._parseEventNames(l);
                var n, o;
                if (typeof k === "string") {
                    n = this._cleanStringData(k);
                    o = m
                } else {
                    o = k;
                    p = m
                }
                l = this._cleanStringData(l);
                l.forEach(function(r, s, t, q) {
                    if (r) {
                        this._triggerDelegateEvents(q, r, s);
                        return
                    }
                    this._eventEmitter.trigger(q, s, t)
                }.bind(this, n, o, p));
                return this
            };
            f.propagateTo = function(k, l) {
                this._eventEmitter.propagateTo(k, l);
                return this
            };
            f.stopPropagatingTo = function(k) {
                this._eventEmitter.stopPropagatingTo(k);
                return this
            };
            f.destroy = function() {
                this._triggerInternalEvent("willdestroy");
                this.off();
                this.el = this._eventEmitter = this._bindings = this._delegateFuncs = null
            };
            b.exports = h
        }, {
            "ac-dom-events": 33,
            "ac-dom-traversal": 192,
            "ac-event-emitter": false
        }
    ],
    213: [
        function(b, c, a) {
            c.exports = {
                SharedInstance: b("./ac-shared-instance/SharedInstance")
            }
        }, {
            "./ac-shared-instance/SharedInstance": 214
        }
    ],
    214: [
        function(d, h, c) {
            var i = window,
                g = "AC",
                a = "SharedInstance",
                f = i[g];
            var b = (function() {
                var j = {};
                return {
                    get: function(l, k) {
                        var m = null;
                        if (j[l] && j[l][k]) {
                            m = j[l][k]
                        }
                        return m
                    },
                    set: function(m, k, l) {
                        if (!j[m]) {
                            j[m] = {}
                        }
                        if (typeof l === "function") {
                            j[m][k] = new l()
                        } else {
                            j[m][k] = l
                        }
                        return j[m][k]
                    },
                    share: function(m, k, l) {
                        var n = this.get(m, k);
                        if (!n) {
                            n = this.set(m, k, l)
                        }
                        return n
                    },
                    remove: function(l, k) {
                        var m = typeof k;
                        if (m === "string" || m === "number") {
                            if (!j[l] || !j[l][k]) {
                                return
                            }
                            j[l][k] = null;
                            return
                        }
                        if (j[l]) {
                            j[l] = null
                        }
                    }
                }
            }());
            if (!f) {
                f = i[g] = {}
            }
            if (!f[a]) {
                f[a] = b
            }
            h.exports = f[a]
        }, {}
    ],
    215: [
        function(b, c, a) {
            c.exports = {
                WindowDelegate: b("./ac-window-delegate/WindowDelegate"),
                WindowDelegateOptimizer: b("./ac-window-delegate/WindowDelegateOptimizer"),
                WindowDelegateCustomEvent: b("./ac-window-delegate/WindowDelegateCustomEvent")
            }
        }, {
            "./ac-window-delegate/WindowDelegate": 218,
            "./ac-window-delegate/WindowDelegateCustomEvent": 219,
            "./ac-window-delegate/WindowDelegateOptimizer": 220
        }
    ],
    216: [
        function(b, c, a) {
            var f = b("ac-event-emitter").EventEmitter;
            var g = function() {
                this._emitter = new f();
                this._customEvents = {}
            };
            var d = g.prototype;
            d.on = function(h, j, i) {
                this._activateCustomEvents(h);
                this._emitterOn.apply(this, arguments);
                return this
            };
            d.once = function(h, j, i) {
                this._emitterOnce.apply(this, arguments);
                return this
            };
            d.off = function(h, j, i) {
                this._emitterOff.apply(this, arguments);
                this._deactivateCustomEvents(h);
                return this
            };
            d.has = function(h, j, i) {
                return this._emitter.has.apply(this._emitter, arguments)
            };
            d.trigger = function() {
                this._emitter.trigger.apply(this._emitter, arguments);
                return this
            };
            d.propagateTo = function() {
                this._emitter.propagateTo.apply(this._emitter, arguments);
                return this
            };
            d.stopPropagatingTo = function() {
                this._emitter.stopPropagatingTo.apply(this._emitter, arguments);
                return this
            };
            d.add = function(h) {
                this._customEvents[h.name] = h
            };
            d.canHandleCustomEvent = function(h) {
                return this._customEvents.hasOwnProperty(h)
            };
            d.isHandlingCustomEvent = function(h) {
                if (this._customEvents[h] && this._customEvents[h].active) {
                    return true
                }
                return false
            };
            d._activateCustomEvents = function(l) {
                var j = l.split(" "),
                    k, m, h = j.length;
                for (m = 0; m < h; m++) {
                    k = j[m];
                    if (this._customEvents[k] && !this._customEvents[k].active) {
                        this._customEvents[k].initialize();
                        this._customEvents[k].active = true
                    }
                }
            };
            d._deactivateCustomEvents = function(k) {
                var l;
                if (!k || k.length === 0) {
                    for (l in this._customEvents) {
                        if (this._customEvents.hasOwnProperty(l)) {
                            this._deactivateCustomEvent(l)
                        }
                    }
                    return
                }
                var j = k.split(" "),
                    h = j.length;
                for (l = 0; l < h; l++) {
                    this._deactivateCustomEvent(j[l])
                }
            };
            d._deactivateCustomEvent = function(h) {
                if (!this.has(h) && this._customEvents[h] && this._customEvents[h].active) {
                    this._customEvents[h].deinitialize();
                    this._customEvents[h].active = false
                }
            };
            d._emitterOn = function() {
                this._emitter.on.apply(this._emitter, arguments)
            };
            d._emitterOnce = function() {
                this._emitter.once.apply(this._emitter, arguments)
            };
            d._emitterOff = function() {
                this._emitter.off.apply(this._emitter, arguments)
            };
            c.exports = g
        }, {
            "ac-event-emitter": false
        }
    ],
    217: [
        function(b, c, a) {
            var g = b("ac-event-emitter").EventEmitter;
            var f;
            var d = function(h) {
                g.call(this);
                this.optimizers = h;
                this._events = {};
                this._properties = {};
                this._initialize()
            };
            f = d.prototype = new g(null);
            f.canOptimizeEvent = function(h) {
                return this._events.hasOwnProperty(h)
            };
            f.canOptimizeProperty = function(h) {
                return this._properties.hasOwnProperty(h)
            };
            f.isOptimizingEvent = function(h) {
                if (this._events[h] && this._events[h].active) {
                    return true
                }
                return false
            };
            f.isOptimizingProperty = function(h) {
                if (this._properties[h] && this._properties[h].active) {
                    return true
                }
                return false
            };
            f.add = function(h) {
                this._setOptimizerEvents(h);
                this._setOptimizerProperties(h);
                h.on("update", this._onUpdate, this);
                h.on("activate", this._onActivate, this);
                h.on("deactivate", this._onDeactivate, this)
            };
            f.get = function(h) {
                if (this.isOptimizingProperty(h)) {
                    return this._properties[h].value
                }
                return null
            };
            f.set = function(i, h) {
                if (!this._properties[i]) {
                    return false
                }
                this._properties[i].value = h;
                return this
            };
            f.getOptimizerByEvent = function(h) {
                if (this._events[h]) {
                    return this._events[h]
                }
                return null
            };
            f._initialize = function() {
                var j, h;
                for (j in this.optimizers) {
                    if (this.optimizers.hasOwnProperty(j)) {
                        this.add(this.optimizers[j])
                    }
                }
            };
            f._onUpdate = function(h) {
                this.set(h.prop, h.val)
            };
            f._onActivate = function(j) {
                var k = j.propertyNames,
                    l, h = k.length;
                for (l = 0; l < h; l++) {
                    this._properties[k[l]].active = true
                }
            };
            f._onDeactivate = function(j) {
                var k = j.propertyNames,
                    l, h = k.length;
                for (l = 0; l < h; l++) {
                    this._properties[k[l]].active = false
                }
            };
            f._setOptimizerEvents = function(j) {
                var l, k = j.eventNames,
                    h = k.length;
                for (l = 0; l < h; l++) {
                    this._setOptimizerEvent(k[l], j)
                }
            };
            f._setOptimizerEvent = function(i, h) {
                if (this._events[i]) {
                    return
                }
                this._events[i] = h
            };
            f._setOptimizerProperties = function(k) {
                var l, j = k.propertyNames,
                    h = j.length;
                for (l = 0; l < h; l++) {
                    this._setOptimizerProperty(j[l])
                }
            };
            f._setOptimizerProperty = function(h) {
                if (this._properties.hasOwnProperty(h)) {
                    return
                }
                this._properties[h] = {};
                this._properties[h].active = false;
                this._properties[h].value = null
            };
            c.exports = d
        }, {
            "ac-event-emitter": false
        }
    ],
    218: [
        function(d, b, g) {
            var i;
            var c = d("ac-shared-instance").SharedInstance,
                l = d("ac-dom-emitter").DOMEmitter,
                j = d("./OptimizerController"),
                f = d("./CustomEventController"),
                h = d("./queries/queries"),
                m = d("./optimizers/optimizers");
            var k = "ac-window-delegate:WindowDelegate",
                a = "2.0.1";

            function n() {
                this._emitter = new l(window);
                this._controllers = {
                    optimizer: new j(m),
                    customEvent: new f()
                };
                var o;
                for (o in h) {
                    if (h.hasOwnProperty(o)) {
                        this[o] = this._getProperty.bind(this, o);
                        h[o] = h[o].bind(this)
                    }
                }
                this._bindEvents()
            }
            i = n.prototype;
            i.on = function(o, r, p) {
                var q = this._seperateCustomEvents(o);
                this._optimizeEvents(q.standardEvents);
                this._customEventOn(q.customEvents, r, p);
                this._emitterOn.apply(this, arguments);
                return this
            };
            i.once = function(o, r, p) {
                var q = this._seperateCustomEvents(o);
                this._optimizeEvents(q.standardEvents);
                this._customEventOnce(q.customEvents, r, p);
                this._emitterOnce.apply(this, arguments);
                return this
            };
            i.off = function(p, u, q) {
                var t = this._seperateCustomEvents(p),
                    r = false;
                if (!p) {
                    r = true
                }
                this._customEventOff(t.customEvents, u, q, r);
                this._emitterOff.apply(this, arguments);
                if (r) {
                    try {
                        var o;
                        for (o in this._controllers.optimizer._events) {
                            if (this._controllers.optimizer._events.hasOwnProperty(o) && this._shouldDeoptimizeEvent(o, true)) {
                                this._deoptimizeEvent(o)
                            }
                        }
                        this._bindEvents()
                    } catch (s) {}
                }
                return this
            };
            i.has = function(o, q, p) {
                return this._emitter.has.apply(this._emitter, arguments)
            };
            i.trigger = function() {
                this._emitter.trigger.apply(this._emitter, arguments);
                return this
            };
            i.propagateTo = function() {
                this._emitter.propagateTo.apply(this._emitter, arguments);
                return this
            };
            i.stopPropagatingTo = function() {
                this._emitter.stopPropagatingTo.apply(this._emitter, arguments);
                return this
            };
            i.addOptimizer = function(o) {
                this._controllers.optimizer.add(o);
                return this
            };
            i.addCustomEvent = function(o) {
                this._controllers.customEvent.add(o);
                return this
            };
            i._emitterOn = function() {
                this._emitter.on.apply(this._emitter, arguments)
            };
            i._emitterOnce = function() {
                this._emitter.once.apply(this._emitter, arguments)
            };
            i._emitterOff = function() {
                this._emitter.off.apply(this._emitter, arguments)
            };
            i._onEventUnbound = function(p) {
                var o = p.evt;
                if (this._shouldDeoptimizeEvent(o)) {
                    this._deoptimizeEvent(o)
                }
            };
            i._customEventOn = function(o, q, p) {
                if (o.length === 0) {
                    return
                }
                this._controllers.customEvent.on(o.join(" "), q, p)
            };
            i._customEventOnce = function(o, q, p) {
                if (o.length === 0) {
                    return
                }
                this._controllers.customEvent.once(o.join(" "), q, p)
            };
            i._customEventOff = function(o, r, p, q) {
                if (!q && o.length === 0) {
                    return
                }
                if (q && o.length === 0) {
                    this._controllers.customEvent.off();
                    return
                }
                this._controllers.customEvent.off(o.join(" "), r, p)
            };
            i._getProperty = function(q, o) {
                var p = null;
                if (!o) {
                    p = this._getOptimizedValue(q)
                }
                if (p === null) {
                    p = h[q].call(this, o)
                }
                return p
            };
            i._optimizeEvents = function(q) {
                var p, r, o = q.length;
                for (r = 0; r < o; r++) {
                    p = q[r];
                    if (this._shouldOptimizeEvent(p)) {
                        this._optimizeEvent(p)
                    }
                }
            };
            i._shouldOptimizeEvent = function(o) {
                if (this._controllers.optimizer.canOptimizeEvent(o) && !this._controllers.optimizer.isOptimizingEvent(o)) {
                    return true
                }
                return false
            };
            i._shouldDeoptimizeEvent = function(o, p) {
                if (this._controllers.optimizer.isOptimizingEvent(o) && (p || this._emitter._eventEmitter._events[o].length <= 1)) {
                    return true
                }
                return false
            };
            i._optimizeEvent = function(p) {
                var o = this._controllers.optimizer.getOptimizerByEvent(p);
                o.activate();
                this._emitterOn(p, o.callback, o)
            };
            i._deoptimizeEvent = function(p) {
                var o = this._controllers.optimizer.getOptimizerByEvent(p);
                o.deactivate();
                this._emitterOff(p, o.callback, o)
            };
            i._getOptimizedValue = function(o) {
                return this._controllers.optimizer.get(o)
            };
            i._seperateCustomEvents = function(s) {
                var p = {
                    customEvents: [],
                    standardEvents: []
                };
                if (typeof s === "string") {
                    var t = s.split(" "),
                        q, r, o = t.length;
                    for (r = 0; r < o; r++) {
                        q = t[r];
                        if (this._controllers.customEvent.canHandleCustomEvent(q)) {
                            p.customEvents.push(q)
                        } else {
                            p.standardEvents.push(q)
                        }
                    }
                }
                return p
            };
            i._bindEvents = function() {
                this._emitter.on("dom-emitter:didoff", this._onEventUnbound, this)
            };
            b.exports = c.share(k, a, n)
        }, {
            "./CustomEventController": 216,
            "./OptimizerController": 217,
            "./optimizers/optimizers": 223,
            "./queries/queries": 232,
            "ac-dom-emitter": 211,
            "ac-shared-instance": 213
        }
    ],
    219: [
        function(c, d, a) {
            var g = c("ac-event-emitter").EventEmitter;

            function b(h, j, i) {
                g.call(this);
                this.name = h;
                this.active = false;
                this._initializeFunc = j;
                this._deinitializeFunc = i
            }
            var f = b.prototype = new g(null);
            f.initialize = function() {
                if (this._initializeFunc) {
                    this._initializeFunc()
                }
                return this
            };
            f.deinitialize = function() {
                if (this._deinitializeFunc) {
                    this._deinitializeFunc()
                }
                return this
            };
            d.exports = b
        }, {
            "ac-event-emitter": false
        }
    ],
    220: [
        function(c, d, b) {
            var g = c("ac-event-emitter").EventEmitter;

            function a(h, i) {
                g.call(this);
                this.active = false;
                this.eventNames = h.eventNames;
                this.propertyNames = h.propertyNames;
                this.options = h.options || {};
                this.callback = i
            }
            var f = a.prototype = new g(null);
            f.update = function(i, h) {
                this.trigger("update", {
                    prop: i,
                    val: h
                })
            };
            f.activate = function() {
                this.active = true;
                this.trigger("activate", this)
            };
            f.deactivate = function() {
                this.active = false;
                this.trigger("deactivate", this)
            };
            d.exports = a
        }, {
            "ac-event-emitter": false
        }
    ],
    221: [
        function(f, g, b) {
            var a = f("../../WindowDelegateOptimizer"),
                d = f("../../queries/queries");
            var c = {
                eventNames: ["resize"],
                propertyNames: ["clientWidth", "clientHeight", "innerWidth", "innerHeight"]
            };
            var h = new a(c, function(m) {
                var l, k = c.propertyNames,
                    j = k.length;
                for (l = 0; l < j; l++) {
                    this.update(k[l], d[k[l]](true))
                }
            });
            g.exports = h
        }, {
            "../../WindowDelegateOptimizer": 220,
            "../../queries/queries": 232
        }
    ],
    222: [
        function(g, h, b) {
            var a = g("../../WindowDelegateOptimizer"),
                f = g("../../queries/queries");
            var d = {
                eventNames: ["scroll"],
                propertyNames: ["scrollX", "scrollY", "maxScrollX", "maxScrollY"]
            };
            var c = new a(d, function(m) {
                var l, k = d.propertyNames,
                    j = k.length;
                for (l = 0; l < j; l++) {
                    this.update(k[l], f[k[l]](true))
                }
            });
            h.exports = c
        }, {
            "../../WindowDelegateOptimizer": 220,
            "../../queries/queries": 232
        }
    ],
    223: [
        function(d, f, b) {
            var c = d("./events/resize"),
                a = d("./events/scroll");
            f.exports = [c, a]
        }, {
            "./events/resize": 221,
            "./events/scroll": 222
        }
    ],
    224: [
        function(b, c, a) {
            var d = function(f) {
                return document.documentElement.clientHeight
            };
            c.exports = d
        }, {}
    ],
    225: [
        function(b, c, a) {
            var d = function(f) {
                return document.documentElement.clientWidth
            };
            c.exports = d
        }, {}
    ],
    226: [
        function(b, d, a) {
            var c = function(f) {
                return window.innerHeight || this.clientHeight(f)
            };
            d.exports = c
        }, {}
    ],
    227: [
        function(b, c, a) {
            var d = function(f) {
                return window.innerWidth || this.clientWidth(f)
            };
            c.exports = d
        }, {}
    ],
    228: [
        function(c, d, a) {
            var b = function(f) {
                return document.body.scrollWidth - this.innerWidth()
            };
            d.exports = b
        }, {}
    ],
    229: [
        function(c, d, b) {
            var a = function(f) {
                return document.body.scrollHeight - this.innerHeight()
            };
            d.exports = a
        }, {}
    ],
    230: [
        function(b, c, a) {
            var d = function(f) {
                var h = window.pageXOffset;
                if (!h) {
                    var g = document.documentElement || document.body.parentNode || document.body;
                    h = g.scrollLeft
                }
                return h
            };
            c.exports = d
        }, {}
    ],
    231: [
        function(b, c, a) {
            var d = function(f) {
                var h = window.pageYOffset;
                if (!h) {
                    var g = document.documentElement || document.body.parentNode || document.body;
                    h = g.scrollTop
                }
                return h
            };
            c.exports = d
        }, {}
    ],
    232: [
        function(i, g, k) {
            var b = i("./methods/innerWidth"),
                j = i("./methods/innerHeight"),
                d = i("./methods/clientWidth"),
                l = i("./methods/clientHeight"),
                c = i("./methods/scrollX"),
                a = i("./methods/scrollY"),
                h = i("./methods/maxScrollX"),
                f = i("./methods/maxScrollY");
            g.exports = {
                innerWidth: b,
                innerHeight: j,
                clientWidth: d,
                clientHeight: l,
                scrollX: c,
                scrollY: a,
                maxScrollX: h,
                maxScrollY: f
            }
        }, {
            "./methods/clientHeight": 224,
            "./methods/clientWidth": 225,
            "./methods/innerHeight": 226,
            "./methods/innerWidth": 227,
            "./methods/maxScrollX": 228,
            "./methods/maxScrollY": 229,
            "./methods/scrollX": 230,
            "./methods/scrollY": 231
        }
    ],
    X1EN4Z: [
        function(b, c, a) {
            c.exports = {
                ScrollTimeUpdate: b("./ac-scroll-time-update/ScrollTimeUpdate"),
                ElementScrollTimeUpdate: b("./ac-scroll-time-update/ElementScrollTimeUpdate")
            }
        }, {
            "./ac-scroll-time-update/ElementScrollTimeUpdate": 235,
            "./ac-scroll-time-update/ScrollTimeUpdate": 236
        }
    ],
    "scroll-time-update": [
        function(b, c, a) {
            c.exports = b("X1EN4Z")
        }, {}
    ],
    235: [
        function(c, g, b) {
            var f = c("./ScrollTimeUpdate"),
                d = c("ac-window-delegate").WindowDelegate;
            var h;
            var a = function(j, i) {
                i = i || {};
                this.el = j;
                this._updateOnResize = false;
                f.call(this, 0, 0, i);
                this.setOffsets();
                this._clock.on("update", this._onResizeClockUpdate, this);
                this._clock.on("draw", this._onResizeClockDraw, this);
                d.on("resize orientationchange", this._onResize, this)
            };
            h = a.prototype = new f(null);
            h.setOffsets = function() {
                var k = this.el.getBoundingClientRect(),
                    j = d.scrollY(),
                    l = k.top + j,
                    i = k.bottom + j;
                if (this.options.startInView) {
                    l = l - d.innerHeight()
                }
                if (typeof this.options.offsetTop === "function") {
                    l = l + this.options.offsetTop()
                } else {
                    if (typeof this.options.offsetTop === "number") {
                        l = l + this.options.offsetTop
                    }
                } if (typeof this.options.offsetBottom === "function") {
                    i = i - this.options.offsetBottom()
                } else {
                    if (typeof this.options.offsetBottom === "number") {
                        i = i - this.options.offsetBottom
                    }
                }
                this.min = l;
                this.max = i;
                this._distance = this.max - this.min;
                return this
            };
            h._onResize = function() {
                this._updateOnResize = true
            };
            h._onResizeClockUpdate = function() {
                if (!this._updateOnResize) {
                    return
                }
                this.setOffsets()
            };
            h._onResizeClockDraw = function() {
                if (!this._updateOnResize) {
                    return
                }
                this.setCurrentTime();
                this._updateOnResize = false
            };
            g.exports = a
        }, {
            "./ScrollTimeUpdate": 236,
            "ac-window-delegate": 215
        }
    ],
    236: [
        function(d, b, f) {
            var g, j = d("ac-event-emitter").EventEmitter,
                a = d("ac-clock"),
                k = d("ac-window-delegate").WindowDelegate,
                c = d("ac-value-smoother").ValueSmoother,
                i = d("ac-dom-emitter").DOMEmitter;
            var h = function(n, l, m) {
                if (n === null) {
                    return
                }
                j.call(this);
                this.options = m || {};
                this.min = n;
                this.max = l;
                this._distance = l - n;
                this._clock = this.options.clock || a;
                this._emitter = k;
                this._lastTime = null;
                this._timeObj = null;
                if (this.options.el) {
                    this._target = this.options.el;
                    this._emitter = new i(this.options.el)
                }
                this._shouldUpdate = false;
                this._shouldDraw = false;
                this._didInitializeSmoothing = false;
                this._emitter.on("scroll", this._debounceTimeUpdate, this);
                this._clock.on("update", this._onClockUpdate, this);
                this._clock.on("draw", this._onClockDraw, this);
                if (this.options.smooth) {
                    this._enableSmoothing(true)
                }
            };
            g = h.prototype = new j(null);
            g.setCurrentTime = function(l, m) {
                l = l || this._getCalculatedCurrentTime();
                if (l === this._lastTime) {
                    return
                }
                this._timeObj = {
                    time: l,
                    lastTime: this._lastTime
                };
                this._triggerUpdate();
                if (m) {
                    this._triggerDraw()
                } else {
                    this._shouldDraw = true
                }
                this._lastTime = l
            };
            g.start = function() {
                this._clock.start()
            };
            g.stop = function() {
                this._clock.stop()
            };
            g.setSmoothing = function(l) {
                if (typeof l !== "boolean") {
                    return
                }
                if (l) {
                    this._enableSmoothing();
                    return
                }
                this._disableSmoothing()
            };
            g._getCalculatedCurrentTime = function() {
                var n = k.scrollY(),
                    m = this.min,
                    l = this.max,
                    o = this._distance;
                if (this._target) {
                    n = this._target.scrollTop
                }
                if (n < m) {
                    n = m
                }
                if (n > l) {
                    n = l
                }
                return (n - m) / (o)
            };
            g._debounceTimeUpdate = function() {
                this._shouldUpdate = true
            };
            g._triggerUpdate = function() {
                this.trigger("_update", this._timeObj);
                if (!this.options.smooth) {
                    this.trigger("update", this._timeObj)
                }
            };
            g._triggerDraw = function() {
                this.trigger("_draw", this._timeObj);
                if (!this.options.smooth) {
                    this.trigger("draw", this._timeObj)
                }
            };
            g._onClockUpdate = function() {
                if (!this._shouldUpdate) {
                    return
                }
                this.setCurrentTime();
                this._shouldUpdate = false
            };
            g._onClockDraw = function() {
                if (!this._shouldDraw) {
                    return
                }
                this._triggerDraw();
                this._shouldDraw = false
            };
            g._initializeSmoothing = function() {
                this.options.smoothingPrecision = this.options.smoothingPrecision || 4;
                this.options.smoothingPoolSize = this.options.smoothingPoolSize || c.prototype.sampling;
                this._smoother = new c(this.options.smoothingPoolSize);
                this._smoothedValues = this._lastSmoothedValues = this._lastUpdateEvent = {
                    time: null,
                    lastTime: null
                };
                this._didUpdateSmootherTrack = false;
                this._shouldUpdateAndDraw = false;
                this._didInitializeSmoothing = true
            };
            g._enableSmoothing = function(l) {
                if (!this._didInitializeSmoothing) {
                    this._initializeSmoothing()
                }
                if (!this.options.smooth || l) {
                    this.on("_update", this._updateSmoothing, this);
                    this._clock.on("update", this._smoothOnUpdate, this);
                    this._clock.on("draw", this._smoothOnDraw, this);
                    this.options.smooth = true
                }
            };
            g._disableSmoothing = function() {
                this.off("_update", this._updateSmoothing, this);
                this._clock.off("update", this._smoothOnUpdate, this);
                this._clock.off("draw", this._smoothOnDraw, this);
                this.options.smooth = false
            };
            g._updateSmoothing = function(l) {
                l.lastTime = l.lastTime || 0;
                this._lastUpdateEvent = l;
                this._didUpdateSmootherTrack = true
            };
            g._smoothOnUpdate = function() {
                var l = (this._didUpdateSmootherTrack || this._lastSmoothedValues.time !== this._smoothedValues.time || this._lastSmoothedValues.lastTime !== this._smoothedValues.lastTime);
                if (!l) {
                    this._shouldUpdateAndDraw = false;
                    return
                }
                this._didUpdateSmootherTrack = false;
                var n = this._lastUpdateEvent.lastTime,
                    m = {};
                m.lastTime = this._smoothedValues.time;
                m.time = this._smoother.smooth(this._lastUpdateEvent.time);
                if (m.lastTime === null) {
                    m.lastTime = parseFloat(n.toFixed(this.options.smoothingPrecision))
                }
                m.time = parseFloat(m.time.toFixed(this.options.smoothingPrecision));
                m.lastTime = m.lastTime;
                this._lastSmoothedValues = this._smoothedValues;
                this._smoothedValues = m;
                this._shouldUpdateAndDraw = true;
                this.trigger("update", this._smoothedValues)
            };
            g._smoothOnDraw = function(l) {
                if (!this._shouldUpdateAndDraw) {
                    return
                }
                this.trigger("draw", this._smoothedValues);
                this._shouldUpdateAndDraw = false
            };
            b.exports = h
        }, {
            "ac-clock": 27,
            "ac-dom-emitter": 31,
            "ac-event-emitter": false,
            "ac-value-smoother": 163,
            "ac-window-delegate": 215
        }
    ],
    237: [
        function(b, c, a) {
            c.exports.Sticky = b("./ac-sticky/Sticky")
        }, {
            "./ac-sticky/Sticky": 238
        }
    ],
    238: [
        function(b, c, a) {
            var d = b("ac-base").Element;
            c.exports = f;

            function f(g) {
                this.el = g;
                this._needsUpdate = false;
                this._tick = this._tick.bind(this);
                this.refresh()
            }
            f.prototype.start = function() {
                this.clone = this._createClone();
                requestAnimationFrame(this._tick);
                window.addEventListener("scroll", this.onscroll.bind(this))
            };
            f.prototype.refresh = function() {
                var g = this.parentBox = d.getBoundingBox(this.el.parentElement);
                var h = this.box = d.getBoundingBox(this.el);
                this.begin = d.cumulativeOffset(this.el).top;
                this.end = (d.cumulativeOffset(this.el.parentElement).top + g.height) - h.height
            };
            f.prototype._update = function() {
                if (!this.needsUpdate) {
                    return
                }
                this.needsUpdate = false;
                var g = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (g < this.begin) {
                    this.el.style.visibility = "";
                    this.clone.style.display = "none";
                    this.clone.style.position = "absolute";
                    this.clone.style.bottom = "";
                    this.clone.style.top = "0"
                } else {
                    if (this.begin <= g && g < this.end) {
                        this.el.style.visibility = "hidden";
                        this.clone.style.display = "block";
                        this.clone.style.position = "fixed";
                        this.clone.style.top = "0";
                        this.clone.style.bottom = "";
                        this.clone.style.left = this.box.left + "px"
                    } else {
                        this.el.style.visibility = "hidden";
                        this.clone.style.display = "";
                        this.clone.style.position = "absolute";
                        this.clone.style.top = "auto";
                        this.clone.style.bottom = "0";
                        this.clone.style.left = ""
                    }
                }
            };
            f.prototype._createClone = function() {
                var g = this.el.cloneNode(true);
                g.className += " sticky-clone";
                g.style.display = "none";
                g.style.position = "absolute";
                this.el.parentNode.insertBefore(g, this.el);
                return g
            };
            f.prototype.onscroll = function() {
                this.needsUpdate = true
            };
            f.prototype._tick = function() {
                requestAnimationFrame(this._tick);
                this._update()
            };
            f.isNativeSticky = function(g) {
                return /sticky/.test(d.getStyle(g, "position"))
            }
        }, {
            "ac-base": false
        }
    ],
    239: [
        function(b, c, a) {
            c.exports = b(54)
        }, {
            "./ac-feature/cssPropertyAvailable": 240,
            "./ac-feature/localStorageAvailable": 241
        }
    ],
    240: [
        function(b, c, a) {
            c.exports = b(55)
        }, {}
    ],
    241: [
        function(b, c, a) {
            c.exports = b(56)
        }, {}
    ],
    242: [
        function(b, c, a) {
            c.exports = b(57)
        }, {
            "dust-runtime": "EVc30+"
        }
    ],
    243: [
        function(b, c, a) {
            c.exports = b(58)
        }, {
            "./ac-keyboard/Keyboard": 245,
            "./ac-keyboard/keymap": 246
        }
    ],
    244: [
        function(b, c, a) {
            c.exports = b(59)
        }, {
            "ac-base": false
        }
    ],
    245: [
        function(b, c, a) {
            c.exports = b(60)
        }, {
            "./KeyEvent": 244,
            "./keymap": 246,
            "ac-base": false,
            "ac-event-emitter": false
        }
    ],
    246: [
        function(b, c, a) {
            c.exports = b(61)
        }, {}
    ],
    247: [
        function(b, c, a) {
            c.exports = b(62)
        }, {
            "./ac-slider/Slider": 251
        }
    ],
    248: [
        function(b, c, a) {
            c.exports = b(63)
        }, {
            "ac-event-emitter": false
        }
    ],
    249: [
        function(b, c, a) {
            c.exports = b(64)
        }, {
            "ac-base": false
        }
    ],
    250: [
        function(b, c, a) {
            c.exports = b(65)
        }, {
            "ac-base": false,
            "ac-event-emitter": false
        }
    ],
    251: [
        function(b, c, a) {
            c.exports = b(66)
        }, {
            "./RangeSlider": 248,
            "./RenderModel": 249,
            "./SimpleDragger": 250,
            "./TemplateHelper": 252,
            "ac-base": false,
            "ac-keyboard": 243
        }
    ],
    252: [
        function(b, c, a) {
            c.exports = b(67)
        }, {
            "../../../build/templates/commonjs/templates": 242,
            "../../lib/dust-runtime": 253,
            "ac-base": false
        }
    ],
    253: [
        function(b, c, a) {
            c.exports = b(68)
        }, {}
    ],
    254: [
        function(b, c, a) {
            c.exports = b(69)
        }, {
            "./ac-ajax/Ajax": 255,
            "./ac-ajax/Request": 256
        }
    ],
    255: [
        function(b, c, a) {
            c.exports = b(70)
        }, {
            "./Request": 256,
            "./URLParser": 257,
            "./XDomain-request": 258
        }
    ],
    256: [
        function(b, c, a) {
            c.exports = b(71)
        }, {}
    ],
    257: [
        function(b, c, a) {
            c.exports = b(72)
        }, {}
    ],
    258: [
        function(b, c, a) {
            c.exports = b(73)
        }, {
            "./Request": 256
        }
    ],
    259: [
        function(b, c, a) {
            c.exports = b(74)
        }, {}
    ],
    260: [
        function(b, c, a) {
            c.exports = b(75)
        }, {
            "./ac-string/isString": 261,
            "./ac-string/queryParameters": 262,
            "./ac-string/queryStringToObject": 263,
            "./ac-string/supplant": 264,
            "./ac-string/toCamelCase": 265,
            "./ac-string/toQueryPair": 266
        }
    ],
    261: [
        function(b, c, a) {
            c.exports = b(76)
        }, {}
    ],
    262: [
        function(b, c, a) {
            c.exports = b(77)
        }, {
            "./queryStringToObject": 263
        }
    ],
    263: [
        function(b, c, a) {
            c.exports = b(78)
        }, {
            qs: 259
        }
    ],
    264: [
        function(b, c, a) {
            c.exports = b(79)
        }, {}
    ],
    265: [
        function(b, c, a) {
            c.exports = b(80)
        }, {}
    ],
    266: [
        function(b, c, a) {
            c.exports = b(81)
        }, {}
    ],
    267: [
        function(b, c, a) {
            c.exports = b(82)
        }, {
            "./ac-vatman/vat-client": 268,
            "./ac-vatman/vat-resource": 269
        }
    ],
    268: [
        function(b, c, a) {
            c.exports = b(83)
        }, {
            "ac-ajax": 254,
            "ac-string": 260
        }
    ],
    269: [
        function(b, c, a) {
            c.exports = b(84)
        }, {
            "./vat-client": 268
        }
    ],
    270: [
        function(b, c, a) {
            c.exports = b(89)
        }, {
            "./ac-video/Video": 271,
            "./ac-video/lib/SharedUtils": 306
        }
    ],
    271: [
        function(b, c, a) {
            arguments[4][90][0].apply(a, arguments)
        }, {
            "./api": 272,
            "./config/VideoConfig": 274,
            "./lib/SharedUtils": 306,
            "./polyfills/full-screen": 313,
            "./profiles/Recommendation": 315,
            "./views/HTML5VideoView": 325,
            "./views/QuickTimeVideoView": 326,
            "ac-base": false,
            "ac-dom-emitter": 31,
            "ac-event-emitter": false,
            "ac-vatman": 267,
            "ac-video-templates": "8m2ENo"
        }
    ],
    272: [
        function(b, c, a) {
            c.exports = b(91)
        }, {
            "ac-event-emitter": false
        }
    ],
    273: [
        function(b, c, a) {
            c.exports = b(92)
        }, {
            "ac-base": false
        }
    ],
    274: [
        function(b, c, a) {
            c.exports = b(93)
        }, {
            "../lib/SharedUtils": 306,
            "../localization/Localization": 309,
            "../polyfills/hasAttribute": 314,
            "../profiles/definitions": 316,
            "./FileRequest": 273,
            "ac-base": false
        }
    ],
    275: [
        function(b, c, a) {
            c.exports = b(94)
        }, {
            "./Controller": 276
        }
    ],
    276: [
        function(b, c, a) {
            c.exports = b(95)
        }, {
            "../models/Model": 310,
            "../views/View": 328
        }
    ],
    277: [
        function(b, c, a) {
            arguments[4][96][0].apply(a, arguments)
        }, {
            "../lib/SharedUtils": 306,
            "../lib/animate": 307,
            "../polyfills/hasAttribute": 314,
            "./ElementsRegistry": 279,
            "ac-base": false,
            "ac-dom-emitter": 31
        }
    ],
    278: [
        function(b, c, a) {
            arguments[4][97][0].apply(a, arguments)
        }, {
            "ac-base": false,
            "ac-dom-emitter": 31
        }
    ],
    279: [
        function(b, c, a) {
            c.exports = b(98)
        }, {
            "./Registry": 280,
            "./buttons/CaptionsButton": 282,
            "./buttons/CloseButton": 283,
            "./buttons/FullScreenButton": 284,
            "./buttons/MaxVolumeButton": 285,
            "./buttons/MinVolumeButton": 286,
            "./buttons/MuteButton": 287,
            "./buttons/PlayPauseButton": 288,
            "./posterframe/Endframe": 289,
            "./posterframe/Posterframe": 291,
            "./sliders/ProgressSlider": 293,
            "./sliders/VolumeSlider": 294,
            "./text/CurrentTimeText": 295,
            "./text/RemainingTimeText": 296
        }
    ],
    280: [
        function(b, c, a) {
            c.exports = b(99)
        }, {
            "ac-base": false
        }
    ],
    281: [
        function(b, c, a) {
            c.exports = b(100)
        }, {
            "../ControlElement": 278
        }
    ],
    282: [
        function(b, c, a) {
            c.exports = b(101)
        }, {
            "./Button": 281,
            "ac-base": false
        }
    ],
    283: [
        function(b, c, a) {
            c.exports = b(102)
        }, {
            "./Button": 281
        }
    ],
    284: [
        function(b, c, a) {
            c.exports = b(103)
        }, {
            "../../lib/SharedUtils": 306,
            "./Button": 281,
            "ac-base": false
        }
    ],
    285: [
        function(b, c, a) {
            c.exports = b(104)
        }, {
            "./Button": 281,
            "ac-base": false
        }
    ],
    286: [
        function(b, c, a) {
            c.exports = b(105)
        }, {
            "./Button": 281,
            "ac-base": false
        }
    ],
    287: [
        function(b, c, a) {
            c.exports = b(106)
        }, {
            "./Button": 281,
            "ac-base": false
        }
    ],
    288: [
        function(b, c, a) {
            c.exports = b(107)
        }, {
            "./Button": 281,
            "ac-base": false
        }
    ],
    289: [
        function(b, c, a) {
            c.exports = b(108)
        }, {
            "../ControlElement": 278,
            "./Frame": 290
        }
    ],
    290: [
        function(b, c, a) {
            c.exports = b(109)
        }, {
            "../ControlElement": 278,
            "ac-base": false
        }
    ],
    291: [
        function(b, c, a) {
            c.exports = b(110)
        }, {
            "../ControlElement": 278,
            "./Frame": 290
        }
    ],
    292: [
        function(b, c, a) {
            c.exports = b(111)
        }, {
            "../../controllers/BufferController": 275,
            "../../views/BufferView": 324
        }
    ],
    293: [
        function(b, c, a) {
            c.exports = b(112)
        }, {
            "../buttons/Button": 281,
            "./Buffer": 292,
            "ac-base": false,
            "ac-slider": 247
        }
    ],
    294: [
        function(b, c, a) {
            c.exports = b(113)
        }, {
            "../buttons/Button": 281,
            "ac-base": false,
            "ac-slider": 247
        }
    ],
    295: [
        function(b, c, a) {
            c.exports = b(114)
        }, {
            "./TimeText": 298
        }
    ],
    296: [
        function(b, c, a) {
            c.exports = b(115)
        }, {
            "./TimeText": 298
        }
    ],
    297: [
        function(b, c, a) {
            c.exports = b(116)
        }, {
            "../ControlElement": 278
        }
    ],
    298: [
        function(b, c, a) {
            c.exports = b(117)
        }, {
            "./Text": 297,
            "ac-base": false
        }
    ],
    299: [
        function(b, c, a) {
            c.exports = b(118)
        }, {
            "../lib/SharedUtils": 306,
            "../lib/browserString": 308,
            "../version": 323,
            "ac-base": false
        }
    ],
    300: [
        function(b, c, a) {
            c.exports = b(119)
        }, {
            "../../profiles/definitions": 316,
            "../FeatureTest": 299,
            "../videoCleanupProcedure": 303,
            "../videoTestProcedure": 304,
            "ac-base": false
        }
    ],
    301: [
        function(b, c, a) {
            c.exports = b(120)
        }, {
            "../../profiles/definitions": 316,
            "../FeatureTest": 299,
            "../videoCleanupProcedure": 303,
            "../videoTestProcedure": 304,
            "ac-base": false
        }
    ],
    302: [
        function(b, c, a) {
            c.exports = b(121)
        }, {
            "../../lib/SharedUtils": 306,
            "../../profiles/definitions": 316,
            "../FeatureTest": 299,
            "ac-video-templates": "8m2ENo"
        }
    ],
    303: [
        function(b, c, a) {
            c.exports = b(122)
        }, {}
    ],
    304: [
        function(b, c, a) {
            c.exports = b(123)
        }, {
            "../lib/SharedUtils": 306,
            "ac-base": false
        }
    ],
    305: [
        function(b, c, a) {
            arguments[4][124][0].apply(a, arguments)
        }, {
            "./SharedUtils": 306,
            "ac-dom-emitter": 31
        }
    ],
    306: [
        function(b, c, a) {
            c.exports = b(125)
        }, {
            "ac-base": false,
            "ac-video-templates": "8m2ENo"
        }
    ],
    307: [
        function(b, c, a) {
            c.exports = b(126)
        }, {
            "ac-base": false
        }
    ],
    308: [
        function(b, c, a) {
            c.exports = b(127)
        }, {}
    ],
    309: [
        function(b, c, a) {
            c.exports = b(128)
        }, {
            "ac-base": false
        }
    ],
    310: [
        function(b, c, a) {
            c.exports = b(129)
        }, {}
    ],
    311: [
        function(b, c, a) {
            c.exports = b(130)
        }, {}
    ],
    312: [
        function(b, c, a) {
            c.exports = b(131)
        }, {}
    ],
    313: [
        function(b, c, a) {
            c.exports = b(132)
        }, {
            "ac-dom-events": 33
        }
    ],
    314: [
        function(b, c, a) {
            c.exports = b(133)
        }, {}
    ],
    315: [
        function(b, c, a) {
            c.exports = b(134)
        }, {
            "../featureTests/tests/hasH264": 300,
            "../featureTests/tests/hasHLS": 301,
            "../featureTests/tests/hasQuicktime": 302,
            "../lib/SharedUtils": 306,
            "../lib/browserString": 308,
            "../version": 323,
            "./definitions": 316
        }
    ],
    316: [
        function(b, c, a) {
            c.exports = b(135)
        }, {
            "../version": 323,
            "ac-base": false
        }
    ],
    317: [
        function(b, c, a) {
            c.exports = b(136)
        }, {}
    ],
    318: [
        function(b, c, a) {
            c.exports = b(137)
        }, {}
    ],
    319: [
        function(b, c, a) {
            c.exports = b(138)
        }, {}
    ],
    320: [
        function(b, c, a) {
            c.exports = b(139)
        }, {}
    ],
    321: [
        function(b, c, a) {
            c.exports = b(140)
        }, {}
    ],
    322: [
        function(b, c, a) {
            c.exports = b(141)
        }, {}
    ],
    323: [
        function(b, c, a) {
            c.exports = b(142)
        }, {}
    ],
    324: [
        function(b, c, a) {
            c.exports = b(143)
        }, {
            "./View": 328
        }
    ],
    325: [
        function(b, c, a) {
            c.exports = b(144)
        }, {
            "../lib/SharedUtils": 306,
            "./VideoView": 327,
            "ac-base": false,
            "ac-vatman": 267
        }
    ],
    326: [
        function(b, c, a) {
            c.exports = b(145)
        }, {
            "../lib/QuicktimeDomEmitter": 305,
            "../lib/SharedUtils": 306,
            "../polyfills/CustomEvent": 311,
            "../polyfills/TimeRanges": 312,
            "../shims/quicktime/canplay": 317,
            "../shims/quicktime/canplaythrough": 318,
            "../shims/quicktime/ended": 319,
            "../shims/quicktime/error": 320,
            "../shims/quicktime/loadeddata": 321,
            "../shims/quicktime/loadedmetadata": 322,
            "./VideoView": 327,
            "ac-base": false,
            "ac-video-templates": "8m2ENo"
        }
    ],
    327: [
        function(b, c, a) {
            arguments[4][146][0].apply(a, arguments)
        }, {
            "../elements/ControlBar": 277,
            "../lib/SharedUtils": 306,
            "./View": 328,
            "./mediaEvents": 329,
            "ac-base": false,
            "ac-dom-emitter": 31,
            "ac-feature": 239,
            "ac-video-templates": "8m2ENo"
        }
    ],
    328: [
        function(b, c, a) {
            c.exports = b(147)
        }, {
            "ac-event-emitter": false
        }
    ],
    329: [
        function(b, c, a) {
            c.exports = b(148)
        }, {}
    ],
    330: [
        function(b, c, a) {
            arguments[4][39][0].apply(a, arguments)
        }, {
            "./window-delegate/WindowDelegate": 331,
            "./window-delegate/windowEmitter": 332
        }
    ],
    331: [
        function(c, f, a) {
            var g;
            var b = c("./windowEmitter");

            function d() {
                this._emitter = b;
                this._setWindowDimensionValues();
                try {
                    this._setScrollValues()
                } catch (h) {}
                this.on("resize", this._setWindowDimensionValues.bind(this));
                this.on("scroll", this._setScrollValues.bind(this));
                this.on("touchstart", this._touchScrollStart.bind(this));
                this.on("touchend", this._setZoomValues.bind(this))
            }
            g = d.prototype;
            g.on = function() {
                this._emitter.on.apply(this._emitter, arguments);
                return this
            };
            g.once = function() {
                this._emitter.once.apply(this._emitter, arguments);
                return this
            };
            g.off = function() {
                this._emitter.off.apply(this._emitter, arguments);
                return this
            };
            g.has = function() {
                return this._emitter.has.apply(this._emitter, arguments)
            };
            g.trigger = function() {
                this._emitter.trigger.apply(this._emitter, arguments);
                return this
            };
            g.propagateTo = function() {
                this._emitter.propagateTo.apply(this._emitter, arguments);
                return this
            };
            g.stopPropagatingTo = function() {
                this._emitter.stopPropagatingTo.apply(this._emitter, arguments);
                return this
            };
            g.isZoomed = function() {
                return this.clientWidth > this.innerWidth
            };
            g._setWindowDimensionValues = function() {
                this.clientWidth = document.documentElement.clientWidth;
                this.clientHeight = document.documentElement.clientHeight;
                this.innerWidth = window.innerWidth || this.clientWidth;
                this.innerHeight = window.innerHeight || this.clientHeight
            };
            g._setZoomValues = function() {
                var h = this.innerWidth;
                this.innerWidth = window.innerWidth;
                if (h !== this.innerWidth) {
                    this.innerHeight = window.innerHeight;
                    this.trigger("zoom");
                    if (h < this.innerWidth) {
                        this.trigger("zoomIn")
                    } else {
                        this.trigger("zoomOut")
                    }
                } else {
                    setTimeout(this._setZoomValues.bind(this), 500)
                }
            };
            g._updateScrollX = function() {
                this.scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
                this.maxScrollX = document.body.scrollWidth - this.innerWidth;
                return this.scrollX
            };
            g._updateScrollY = function() {
                this.scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                this.maxScrollY = document.body.scrollHeight - this.innerHeight;
                return this.scrollY
            };
            g._setScrollValues = function() {
                var i = this.scrollX,
                    h = this.scrollY;
                this._updateScrollX();
                this._updateScrollY();
                if (this.scrollX !== i) {
                    this.trigger("scrollX")
                }
                if (this.scrollY !== h) {
                    this.trigger("scrollY")
                }
                this._scrollStop()
            };
            g._scrollStop = function() {
                if (typeof window.ontouchstart === "undefined") {
                    if (this._scrollStopTimer) {
                        clearTimeout(this._scrollStopTimer)
                    }
                    this._scrollStopTimer = setTimeout(function() {
                        clearTimeout(this._scrollStopTimer);
                        this.trigger("scrollStop")
                    }.bind(this), 300)
                }
            };
            g._touchScrollStart = function() {
                this._updateScrollX();
                this._updateScrollY();
                this.once("touchend", this._touchScrollStop.bind(this, this.scrollX, this.scrollY))
            };
            g._touchScrollStop = function(i, h, j) {
                this._updateScrollX();
                this._updateScrollY();
                if (i !== this.scrollX || h !== this.scrollY) {
                    setTimeout(this._touchScrollStop.bind(this, this.scrollX, this.scrollY, true), 300)
                } else {
                    if (j) {
                        this.trigger("scrollStop")
                    }
                }
            };
            f.exports = new d()
        }, {
            "./windowEmitter": 332
        }
    ],
    332: [
        function(b, c, a) {
            c.exports = b(41)
        }, {
            "ac-dom-emitter": 31
        }
    ],
    333: [
        function(c, d, b) {
            var f;
            var a = function(g) {
                g = g || {};
                this.canvasRowCount = g.canvasRowCount;
                this.canvasColumnCount = g.canvasColumnCount;
                this.imagesRowCount = g.imagesRowCount;
                this.imagesColumnCount = g.imagesColumnCount;
                this.images = g.images;
                this.canvasPadding = g.canvasPadding;
                this.el = document.createDocumentFragment();
                this.imagePositionData = null;
                this.canvases = null;
                this.width = null;
                this.height = null;
                this.canvasWidth = null;
                this.canvasHeight = null;
                this._calculateDimensions();
                this._createImagePositionData();
                this._createCanvases();
                this._render();
                this._appendCanvasesToContainer()
            };
            f = a.prototype;
            f._calculateDimensions = function() {
                var h, k = 0,
                    g = 0,
                    l = this.imagesColumnCount,
                    j = this.imagesRowCount * this.imagesColumnCount;
                for (h = 0; h < l; h++) {
                    k += this.images[h].naturalWidth
                }
                for (h = 0; h < j; h += this.imagesColumnCount) {
                    g += this.images[h].naturalHeight
                }
                this.width = k;
                this.height = g
            };
            f._createCanvases = function() {
                var l, k, m = [],
                    g = Math.floor(this.width / this.canvasColumnCount) + this.canvasPadding,
                    j = Math.floor(this.height / this.canvasRowCount) + this.canvasPadding,
                    h = this.canvasRowCount * this.canvasColumnCount;
                for (l = 0; l < h; l++) {
                    m.push(document.createElement("canvas"));
                    k = m[l];
                    k.width = g;
                    k.height = j
                }
                this.canvasWidth = g;
                this.canvasHeight = j;
                this.canvases = m
            };
            f._render = function() {
                var k, g, n, j, r, h = this.canvasWidth,
                    m = this.canvasHeight,
                    p = this.canvasRowCount,
                    o = this.canvasColumnCount,
                    q = this.canvases,
                    l = this.canvases.length;
                for (k = 0; k < l; k++) {
                    g = q[k];
                    n = ((k % o) * (h - this.canvasPadding));
                    j = (Math.floor(k / o) * (m - this.canvasPadding));
                    r = this._getDrawImageDataForArea(n, j, n + h, j + m);
                    this._paintCanvas(g, r);
                    this._setCanvasStyle(g, n, j, k)
                }
            };
            f._setCanvasStyle = function(i, h, j, g) {
                i.style.position = "absolute";
                i.style.left = h + "px";
                i.style.top = j + "px"
            };
            f._paintCanvas = function(h, m) {
                var k, j = h.getContext("2d"),
                    l, g = m.length;
                for (k = 0; k < g; k++) {
                    l = m[k];
                    j.drawImage(l.image, l.imageOffsetLeft, l.imageOffsetTop, l.imageDrawWidth, l.imageDrawHeight, l.canvasStartX, l.canvasStartY, l.imageDrawWidth, l.imageDrawHeight)
                }
            };
            f._createImagePositionData = function() {
                var j, h, g, p = this.images,
                    o, k, n = this.imagesRowCount,
                    m = this.imagesColumnCount,
                    l = this.images.length,
                    q = [];
                for (j = 0; j < l; j++) {
                    h = p[j];
                    q.push({});
                    g = q[j];
                    o = h.width;
                    k = h.height;
                    g.x1 = (j % m) * o;
                    g.y1 = Math.floor(j / m) * k;
                    g.x2 = g.x1 + o;
                    g.y2 = g.y1 + k;
                    g.image = h
                }
                this.imagePositionData = q
            };
            f._getDrawImageDataForArea = function(j, r, h, q) {
                var k, g, l = this.width,
                    p = this.height,
                    s = [],
                    o = this.imagePositionData,
                    n, m = o.length;
                for (k = 0; k < m; k++) {
                    n = o[k];
                    g = this._hasImageIntersection(n, j, r, h, q);
                    if (g) {
                        s.push(this._getDrawParameters(n, {
                            x1: j,
                            y1: r,
                            x2: h,
                            y2: q
                        }))
                    }
                }
                return s
            };
            f._hasImageIntersection = function(k, h, j, g, i) {
                if (this._x1y1Query(k, h, j, g, i) || this._x2y1Query(k, h, j, g, i) || this._x1y2Query(k, h, j, g, i) || this._x2y2Query(k, h, j, g, i)) {
                    return true
                }
                return false
            };
            f._getDrawParameters = function(n, p) {
                var j = n.image,
                    o = n.x2 - n.x1,
                    m = n.y2 - n.y1,
                    l, h, k, i, g, q;
                if (p.x1 <= n.x1) {
                    h = 0;
                    g = n.x1 - p.x1
                } else {
                    h = p.x1 % o;
                    g = 0
                } if (this._x2Query(n, p.x1, p.x2)) {
                    k = p.x2 - n.x1
                } else {
                    k = o - h
                } if (p.y1 <= n.y1) {
                    l = 0;
                    q = n.y1 - p.y1
                } else {
                    l = p.y1 % m;
                    q = 0
                } if (this._y2Query(n, p.y1, p.y2)) {
                    i = p.y2 - n.y1
                } else {
                    i = m - l
                }
                return {
                    imageOffsetTop: l,
                    imageOffsetLeft: h,
                    imageDrawWidth: k,
                    imageDrawHeight: i,
                    canvasStartX: g,
                    canvasStartY: q,
                    image: j
                }
            };
            f._x1y1Query = function(k, h, j, g, i) {
                if (this._x1Query(k, h, g) && this._y1Query(k, j, i)) {
                    return true
                }
                return false
            };
            f._x2y1Query = function(k, h, j, g, i) {
                if (this._x2Query(k, h, g) && this._y1Query(k, j, i)) {
                    return true
                }
                return false
            };
            f._x1y2Query = function(k, h, j, g, i) {
                if (this._x1Query(k, h, g) && this._y2Query(k, j, i)) {
                    return true
                }
                return false
            };
            f._x2y2Query = function(k, h, j, g, i) {
                if (this._x2Query(k, h, g) && this._y2Query(k, j, i)) {
                    return true
                }
                return false
            };
            f._x1Query = function(i, h, g) {
                if (i.x1 <= h && i.x2 >= h) {
                    return true
                }
                return false
            };
            f._x2Query = function(i, h, g) {
                if (i.x1 <= g && i.x2 >= g) {
                    return true
                }
                return false
            };
            f._y1Query = function(i, h, g) {
                if (i.y1 <= h && i.y2 >= h) {
                    return true
                }
                return false
            };
            f._y2Query = function(i, h, g) {
                if (i.y1 <= g && i.y2 >= g) {
                    return true
                }
                return false
            };
            f._appendCanvasesToContainer = function() {
                var h, g = this.canvases.length;
                for (h = 0; h < g; h++) {
                    this.el.appendChild(this.canvases[h])
                }
            };
            d.exports = a
        }, {}
    ],
    334: [
        function(c, d, a) {
            var h = c("ac-easing").Easing,
                i = c("ac-clock"),
                g = c("ac-event-emitter").EventEmitter;
            var f;
            var b = function(l, k, j) {
                g.call(this);
                this.easing = new h.createBezier(l[0], l[1], l[2], l[3]);
                this.clock = j || i;
                this.duration = k || 1500;
                this.startTime = null;
                this.startVal = null;
                this.endVal = null;
                this.changeVal = null;
                this._running = false;
                this._boundOnClockDraw = this._onClockDraw.bind(this)
            };
            f = b.prototype = new g(null);
            f.ease = function(k, j) {
                if (this._running) {
                    this.stop()
                }
                this.startVal = k;
                this.endVal = j;
                this.changeVal = j - k;
                this.direction = 1;
                if (this.changeVal < 0) {
                    this.direction = -1
                }
                this.start()
            };
            f.start = function() {
                this.startTime = Date.now();
                this.clock.on("draw", this._boundOnClockDraw);
                this._running = true;
                this.trigger("start", {
                    val: this.startVal
                })
            };
            f.stop = function(j) {
                this.clock.off("draw", this._boundOnClockDraw);
                this._running = false;
                if (!j) {
                    this.trigger("stop", {
                        val: this.endVal
                    })
                }
            };
            f._onClockDraw = function() {
                var l = false,
                    k = Date.now(),
                    m = k - this.startTime,
                    j = this.easing(m, this.startVal, this.changeVal, this.duration);
                if ((this.direction > 0 && j >= this.endVal) || (this.direction < 0 && j <= this.endVal)) {
                    j = this.endVal;
                    l = true
                }
                this.trigger("update", {
                    val: j
                });
                if (l) {
                    this.stop()
                }
            };
            d.exports = b
        }, {
            "ac-clock": 27,
            "ac-easing": 34,
            "ac-event-emitter": false
        }
    ],
    335: [
        function(c, b, g) {
            var j = c("ac-event-emitter").EventEmitter,
                k = c("window-delegate").WindowDelegate,
                f = c("./EasingController");
            var h, i = [0.46, 0.055, 0.115, 0.97],
                d = 3000;
            var a = function(l) {
                this.introScroll = l;
                this.easingController = new f(i, d);
                this.min = 0;
                this.max = 1;
                this._playing = false;
                k.on("mousewheel", this.pause.bind(this));
                this.easingController.on("start", this._handleStart, this);
                this.easingController.on("update", this._handleUpdate, this);
                this.introScroll.on("updateScroll", this._handleUpdateScroll, this)
            };
            h = a.prototype = new j(null);
            h.play = function() {
                var m = this.min,
                    l = this.max;
                this.easingController.ease(m, l);
                this.trigger("start")
            };
            h.pause = function() {
                if (this._playing) {
                    this.easingController.stop()
                }
            };
            h._handleUpdate = function(m) {
                var l = m.val;
                window.scroll(0, l)
            };
            h._handleStart = function(l) {
                this._playing = true
            };
            h._handleStop = function(l) {
                this._playing = false
            };
            h._handleUpdateScroll = function(l) {
                this.min = l.min;
                this.max = l.max
            };
            b.exports = a
        }, {
            "./EasingController": 334,
            "ac-event-emitter": false,
            "window-delegate": 330
        }
    ],
    336: [
        function(c, b, d) {
            var n = c("ac-asset-loader").AssetLoader,
                l = c("ac-deferred").Deferred,
                j = c("../shared/BreakpointsDelegate"),
                h = c("../shared/cname");
            var g, o = "/v/imac-with-retina/a/images/overview/",
                i = ["intro_large_r1_c1", "intro_large_r1_c2", "intro_large_r1_c3", "intro_large_r1_c4", "intro_large_r2_c1", "intro_large_r2_c2", "intro_large_r2_c3", "intro_large_r2_c4"],
                a = "_2x",
                m = "_27",
                f = "jpg";
            var k = function() {
                this._imagePaths = this.cnameImages(i);
                this._assetLoader = new n(this._imagePaths)
            };
            g = k.prototype;
            g.cnameImages = function(s) {
                var r, q = [],
                    p = s.length;
                for (r = 0; r < p; r++) {
                    q.push(this._getImageSrc(s[r]))
                }
                return q
            };
            g.load = function() {
                var p = new l(),
                    q = [];
                this._assetLoader.load().then(function(s, r) {
                    s.resolve(this._orderImages(r))
                }.bind(this, p));
                return p.promise()
            };
            g._orderImages = function(r) {
                var s, q = [],
                    p = r.length;
                for (s = 0; s < p; s++) {
                    q.push(this._getImageMatchAtIdx(r, this._imagePaths[s]))
                }
                return q
            };
            g._getImageSrc = function(p) {
                var q = j.breakpoint.name.replace(/^x/, ""),
                    s = "",
                    r;
                s += a;
                if (q === "medium") {
                    q = "large"
                }
                if (window.screen && window.screen.width > 1440) {
                    s += "_27"
                }
                return h(o + p + s + "." + f)
            };
            g._getImageMatchAtIdx = function(r, t) {
                var s, q = [],
                    p = r.length;
                for (s = 0; s < p; s++) {
                    if (r[s].getAttribute("src") === t) {
                        return r[s]
                    }
                }
            };
            b.exports = k
        }, {
            "../shared/BreakpointsDelegate": 341,
            "../shared/cname": 343,
            "ac-asset-loader": 25
        }
    ],
    337: [
        function(c, b, f) {
            var o = c("./../shared/remap");
            var g = c("./../shared/cname");
            var l = c("ac-easing").Easing;
            var m = c("ac-deferred").Deferred;
            var j = c("ac-base").Element;
            var r = c("ac-event-emitter").EventEmitter;
            var d = c("ac-base").Environment;
            var q = c("window-delegate").WindowDelegate;
            var h = c("scroll-time-update").ScrollTimeUpdate;
            var i = c("./../shared/BreakpointsDelegate");
            var k = c("./IntroImageLoader");
            var n = c("./CanvasImageGrid");
            var a = {
                filterBrowsers: ["Safari"]
            };
            b.exports = p;

            function p() {
                this.maxScale = 1;
                this.shift = 100;
                this.imageLoadFailTimeout = 5000;
                this._failed = false;
                this._enableFilters = this._shouldUseFilters();
                this._isUserEngaged = false;
                this._userEngagementThreshold = 10;
                this.el = document.createElement("div");
                this.el.className = "intro-image";
                this.introImageLoader = new k();
                this.section = j.select(".section-intro");
                this.content = j.select(".intro-content");
                this.innerContent = j.select(".intro-content-inner");
                this.fallback = j.select(".intro-fallback-image");
                this.headlineContainer = j.select(".headline-container");
                this.headline = j.select(".intro-headline");
                this.headlineText = j.select(".hero-headline", this.headline);
                this.identity = j.select(".intro-title");
                this.localnav = j.select(".localnav-wrapper");
                this.nextSection = j.select(".section-intro-lockup");
                this.breakpointName = i.breakpoint.name;
                this.introVisible = true;
                this.introHeadlineHeight = 0;
                this.introHeadlineOffset = 0;
                this.setupDOM();
                this.ease = l.createBezier(0.17, 0.67, 0.59, 0.99);
                this.scale = {
                    from: this.maxScale,
                    to: this.fallback.clientWidth / this.el.clientWidth
                };
                this.headlineTween = {
                    scale: {
                        from: 1,
                        to: 0.8
                    },
                    opacity: {
                        from: 1,
                        to: 0
                    }
                };
                this.translateYTween = {
                    from: -760,
                    to: 500
                };
                this.ondraw = this.ondraw.bind(this);
                this.resize = this.resize.bind(this);
                this._rawScroll = this._rawScroll.bind(this);
                this._handleWindowResize = this._handleWindowResize.bind(this)
            }
            p.prototype = new r(null);
            p.prototype.onClonedModalLinkClick = function(s) {};
            p.prototype._rawScroll = function() {
                var s = this.introVisible;
                this.introVisible = q.scrollY + 30 < this.scrollAmount;
                if (s != this.introVisible) {
                    var t = this.introVisible ? "remove" : "add";
                    this.content.classList[t]("ended");
                    this.localnav.classList[t]("expand")
                }
                if (!this._isUserEngaged && window.scrollY > this._userEngagementThreshold) {
                    this._isUserEngaged = true;
                    this.trigger("userEngaged", true)
                } else {
                    if (this._isUserEngaged && window.scrollY < this._userEngagementThreshold) {
                        this._isUserEngaged = false;
                        this.trigger("userEngaged", false)
                    }
                }
            };
            p.prototype.resize = function() {
                this.scale = {
                    from: this.maxScale,
                    to: this.fallback.clientWidth / this.el.clientWidth
                };
                this.breakpointName = i.breakpoint.name;
                this.introHeadlineHeight = this.headline.clientHeight;
                this.introHeadlineTop = (q.innerHeight - this.introHeadlineHeight) / 2;
                this.introHeadlineBottom = this.introHeadlineTop + this.introHeadlineHeight;
                this.navBottom = j.getBoundingBox(this.localnav).bottom;
                if (this.breakpointName === "small") {
                    this.scrollAmount = 800;
                    this.translateYTween.from = -260;
                    this.translateYTween.to = 300;
                    this.identity.style.top = "50px";
                    this.paddingTop = this.scrollAmount
                } else {
                    if (this.breakpointName === "medium") {
                        this.shift = -50;
                        this.scrollAmount = 1200;
                        this.translateYTween.from = -100;
                        this.translateYTween.to = 250;
                        this.translateYTween.to -= this.shift;
                        this.identity.style.top = 55 - this.shift + "px";
                        this.paddingTop = this.scrollAmount - 32;
                        this.fallback.style.marginTop = "31px"
                    } else {
                        this.scrollAmount = 1600;
                        this.translateYTween.from = -660;
                        this.translateYTween.to = 333;
                        this.identity.style.top = 108 + "px";
                        this.fallback.style.marginTop = "34px";
                        this.paddingTop = this.scrollAmount - 28
                    }
                }
                this.nextSection.style.paddingTop = this.paddingTop + "px";
                this.updateScroll()
            };
            p.prototype.getOffsetY = function() {
                var z = this._imageHeight,
                    w = 2229 / 4611,
                    B = 2340 / 4611,
                    y = 0,
                    s = 120,
                    t = 0.8,
                    D = 50;
                if (q.innerHeight * (1 - t) < s) {
                    t = (1 - s / q.innerHeight)
                }
                y = t * q.innerHeight;
                var x = -1 * (B * z * this.maxScale - y);
                var u = ((w - B) * z * this.maxScale + y);
                var A = this.introHeadlineOffset;
                if (u - this.introHeadlineBottom < D) {
                    var v = this.navBottom + ((u - this.navBottom) - this.introHeadlineHeight) / 2;
                    var C = this.introHeadlineTop - v;
                    this.introHeadlineOffset = C - 10
                } else {
                    this.introHeadlineOffset = 0
                } if (A !== this.introHeadlineOffset) {
                    this.headlineContainer.style.top = -this.introHeadlineOffset + "px"
                }
                return x
            };
            p.prototype.updateScroll = function() {
                this.scrollIntervalAmount = 0;
                this.fallthroughAmount = 2000;
                var t = 0;
                var s = this.scrollAmount + this.scrollIntervalAmount + this.fallthroughAmount;
                if (!this.scroll) {
                    this.scroll = new h(t, s, {
                        smooth: false
                    })
                } else {
                    this.scroll.max = s;
                    this.scroll.min = t;
                    this.scroll._distance = s - t
                }
                this.tippingPoint = this.scrollAmount / s;
                this.intervalPoint = (this.scrollAmount + this.scrollIntervalAmount) / s;
                this.trigger("updateScroll", {
                    min: t,
                    max: this.scrollAmount
                })
            };
            p.prototype.ondraw = function(z) {
                if (z.time <= this.tippingPoint) {
                    if (!this.introVisible) {
                        return
                    }
                    var v = o(z.time, 0, this.tippingPoint, 0, 1);
                    v = this.ease(v, 0, 1, 1);
                    var w = o(v, 0, 1, this.scale.from, this.scale.to);
                    var C = o(v, 0, 1, this.getOffsetY(), this.translateYTween.to);
                    this.el.style.webkitTransform = "translate3d(-50%, " + Math.round(C) + "px, 0) scale(" + w + ")";
                    var s = 0;
                    var D = 0.4;
                    var t = 0.52;
                    var u = 0.6;
                    if (v <= D) {
                        var A = 0.4;
                        var F = o(v, 0, A, 0, 1);
                        var B = o(F, 0, 1, this.headlineTween.scale.from, this.headlineTween.scale.to).toFixed(5);
                        var E = o(F, 0, 1, this.headlineTween.opacity.from, this.headlineTween.opacity.to);
                        this.headline.style.webkitTransform = "scale(" + B + ") translate3d(0, -50%, 0)";
                        this.headline.style.opacity = E
                    } else {
                        if (D < v && v < t) {
                            this.headline.style.opacity = 0
                        } else {
                            if (t <= v && v <= u) {
                                var F = o(v, t, u, 0, 1);
                                var B = o(F, 0, 1, this.headlineTween.scale.from * 0.9, this.headlineTween.scale.from * 0.8)
                            } else {
                                this.headline.style.opacity = 0
                            }
                        }
                    } if (v > 0.9) {
                        var x = o(v, 0.9, 1, 0, 1);
                        this.identity.style.opacity = x
                    } else {
                        this.identity.style.opacity = 0;
                        j.setVendorPrefixStyle(this.identity, "transform", "translate3d(0, " + 0 + "px, 0)")
                    }
                }
            };
            p.prototype.setupDOM = function() {
                this.failTimeout = setTimeout(function() {
                    this._failIntro()
                }.bind(this), this.imageLoadFailTimeout);
                if (window.devicePixelRatio && window.devicePixelRatio > 1) {
                    this.loadRetinaPartialImage()
                }
                this.introImageLoader.load().then(this.onImagesLoaded.bind(this))
            };
            p.prototype.loadRetinaPartialImage = function() {
                var v = 2193,
                    u = "_2x",
                    t = "/v/imac-with-retina/a/images/overview/intro_partial" + u,
                    s = "png";
                this.partialImage = new Image();
                j.addClassName(this.partialImage, "retina-partial");
                this.partialImage.onload = function() {
                    var w = 0.5;
                    this.partialImage.width = this.partialImage.naturalWidth * w;
                    this.partialImage.height = this.partialImage.naturalHeight * w;
                    if (this._imageWidth) {
                        this.displayRetinaPartial()
                    }
                }.bind(this);
                this.partialImage.src = g(t + "." + s)
            };
            p.prototype._failIntro = function() {
                this._failed = true;
                j.removeClassName(j.select("body"), "show-intro");
                j.addClassName(j.select("body"), "intro-failed")
            };
            p.prototype.onImagesLoaded = function(s) {
                clearTimeout(this.failTimeout);
                if (this._failed) {
                    return
                }
                this.canvasImageGrid = new n({
                    images: s,
                    canvasRowCount: 3,
                    canvasColumnCount: 5,
                    imagesRowCount: 2,
                    imagesColumnCount: 4,
                    canvasPadding: 10
                });
                this._imageWidth = this.canvasImageGrid.width;
                this._imageHeight = this.canvasImageGrid.height - 1;
                this.el.style.width = this._imageWidth + "px";
                this.el.style.height = this._imageHeight + "px";
                this.el.appendChild(this.canvasImageGrid.el);
                if (!this.partialImageDisplayed) {
                    this.displayRetinaPartial()
                }
                this.canvasImageGrid.images = s = null;
                var u = j.select(".section-intro-lockup .intro-product").cloneNode(true);
                var t = j.selectAll(".intro-title li a", u);
                t.forEach(function(v) {
                    var w = v.id;
                    v.id = v.id + "-clone";
                    v.addEventListener("click", this.onClonedModalLinkClick)
                }.bind(this));
                this.innerContent.appendChild(u);
                this.identity = j.select(".section-intro .intro-title");
                this.el.style.webkitTransformOrigin = "50% 0";
                this.headline.style.top = "50%";
                this.identity.style.position = "relative";
                this.identity.style.paddingTop = "0px";
                this.content.style.pointerEvents = "none";
                this.content.style.position = "fixed";
                this.content.style.width = "100%";
                this.content.style.height = "100%";
                this.content.style.top = "0";
                this.content.style.backgroundColor = "white";
                if (this._enableFilters) {
                    this.el.style.webkitFilter = "opacity(0)"
                }
                this.innerContent.appendChild(this.el);
                this.kickoff().then(function() {
                    if (this._enableFilters) {
                        this.el.style.webkitFilter = "opacity(1)"
                    } else {
                        this.el.style.webkitFilter = ""
                    }
                    j.addClassName(j.select("body"), "intro-ready");
                    this.trigger("ready")
                }.bind(this))
            };
            p.prototype.displayRetinaPartial = function() {
                function s() {
                    j.addClassName(this.partialImage, "loaded")
                }
                s = s.bind(this);
                if (this.partialImageDisplayed || !this.partialImage) {
                    return
                }
                this.partialImageDisplayed = true;
                this.el.appendChild(this.partialImage);
                if (d.Browser.name.toLowerCase() === "chrome") {
                    setTimeout(s, 1000);
                    return
                }
                window.requestAnimationFrame(s)
            };
            p.prototype.kickoff = function() {
                var s = new m();
                this.resize();
                window.addEventListener("scroll", this._rawScroll);
                i.on("breakpoint", this.resize);
                q.on("resize orientationchange", this._handleWindowResize);
                this.scroll.on("draw", this.ondraw);
                this.scroll.start();
                this._compositeImage(this.el).then(s.resolve.bind(s));
                s.then(function() {
                    q.trigger("kickoff")
                });
                return s.promise()
            };
            p.prototype._handleWindowResize = function() {
                this.introHeadlineTop = (q.innerHeight - this.introHeadlineHeight) / 2;
                this.introHeadlineBottom = this.introHeadlineTop + this.introHeadlineHeight;
                var s = {
                    time: this.scroll._lastTime,
                    lastTime: this.scroll._lastTime
                };
                this.ondraw(s)
            };
            p.prototype._compositeImage = function(s) {
                s = s || this.el;
                var t = new m();
                window.requestAnimationFrame(function() {
                    if (!this.scroll) {
                        return
                    }
                    var u = this.scroll._lastTime || 0;
                    j.setStyle(this.section, {
                        webkitFilter: "opacity(0)"
                    });
                    this._iterateComposition(5).then(function(v, w) {
                        window.requestAnimationFrame(function(x, y) {
                            if (this._enableFilters) {
                                j.setStyle(this.section, {
                                    webkitFilter: "opacity(1)"
                                })
                            } else {
                                j.setStyle(this.section, {
                                    webkitFilter: ""
                                })
                            }
                            this.scroll.setCurrentTime(y, true);
                            x.resolve()
                        }.bind(this, v, w))
                    }.bind(this, t, u))
                }.bind(this, t));
                return t.promise()
            };
            p.prototype._iterateComposition = function(v) {
                function s(y) {
                    var y = y || new m(),
                        x = u / v;
                    window.requestAnimationFrame(function(z, A) {
                        u++;
                        t(z);
                        if (u <= v) {
                            s(A);
                            return
                        }
                        A.resolve();
                        A = z = null
                    }.bind(null, x, y));
                    return y.promise()
                }

                function t(x) {
                    this.scroll.setCurrentTime(x, true)
                }
                t = t.bind(this);
                var w = new m(),
                    u = 1;
                s().then(function(x) {
                    x.resolve()
                }.bind(null, w));
                return w.promise()
            };
            p.prototype._shouldUseFilters = function() {
                var t, s = a.filterBrowsers.length;
                for (t = 0; t < s; t++) {
                    if (d.Browser.name === a.filterBrowsers[t]) {
                        return true
                    }
                }
                return false
            }
        }, {
            "./../shared/BreakpointsDelegate": 341,
            "./../shared/cname": 343,
            "./../shared/remap": 344,
            "./CanvasImageGrid": 333,
            "./IntroImageLoader": 336,
            "ac-base": false,
            "ac-easing": 34,
            "ac-event-emitter": false,
            "scroll-time-update": "X1EN4Z",
            "window-delegate": 330
        }
    ],
    338: [
        function(c, b, d) {
            var g = c("ac-base").Element;
            var j = c("ac-animation-sequencer").Timeline;
            var k = c("ac-base").Environment;
            var n = c("window-delegate").WindowDelegate;
            var h = c("./../shared/BreakpointsDelegate");
            var i = c("./../shared/scroll-player/ScrollPlayer");
            var m = c("./../shared/scroll-player/ScrollObserver");
            var n = c("window-delegate").WindowDelegate;
            var a = c("ac-sticky").Sticky;
            var f = c("scroll-time-update").ScrollTimeUpdate;
            var l = (function() {
                return {
                    initialize: function() {
                        var s;
                        this._stage = g.select(".section-routing");
                        this._hero = g.select(".hero-routing", this._stage);
                        s = g.select(".section-apps", this._stage);
                        this._threshold = g.cumulativeOffset(s).top;
                        this._visible = false;
                        this._updateScreen();
                        m.on("scrollY", this._updateScreen.bind(this));
                        var o = k.Feature.touchAvailable();
                        var q = "small" === h.breakpoint.name;
                        var r = k.Browser.version < 8;
                        var p = /android/.test(k.Browser.lowerCaseUserAgent);
                        if (p || q || (o && r)) {
                            return
                        } else {
                            this._initTimeline()
                        }
                    },
                    _updateScreen: function() {
                        var p = m.getScrollY(),
                            o = this._threshold - n.innerHeight * 2 / 3;
                        if (p > o) {
                            if (!this._visible) {
                                this._visible = true;
                                g.addClassName(this._hero, "show")
                            }
                        } else {
                            if (this._visible) {
                                this._visible = false;
                                g.removeClassName(this._hero, "show")
                            }
                        }
                    },
                    _initTimeline: function() {
                        var t = g.select(".section-routing");
                        var r = g.select(".hero-image-container", t);
                        var q = this._stage;
                        var p = [];
                        var o = null;
                        var s = new a(r);
                        var u = function() {
                            s.refresh();
                            o.min = s.begin;
                            o.max = s.end;
                            o._distance = s.end - s.begin
                        };
                        n.once("kickoff", u);
                        n.on("resize", u);
                        if (!a.isNativeSticky(r)) {
                            g.addClassName(t, "with-sticky-polyfill");
                            s.start()
                        }
                        var p = g.selectAll(".section-routing .hero-image-container .hero-image-bundle");
                        var o = new f(s.begin, s.end);
                        o.on("update", function(v) {
                            p.forEach(function(w) {
                                if (v.time > 0.475) {
                                    g.addClassName(w, "show-next")
                                } else {
                                    g.removeClassName(w, "show-next")
                                }
                                var x = -v.time * 50;
                                AC.Element.setVendorPrefixStyle(w, "transform", "translate3d(0, " + x + "px, 0)")
                            })
                        });
                        o.setCurrentTime(0, true);
                        o.start()
                    }
                }
            }());
            b.exports = l
        }, {
            "./../shared/BreakpointsDelegate": 341,
            "./../shared/scroll-player/ScrollObserver": 345,
            "./../shared/scroll-player/ScrollPlayer": 346,
            "ac-animation-sequencer": 4,
            "ac-base": false,
            "ac-sticky": 237,
            "scroll-time-update": "X1EN4Z",
            "window-delegate": 330
        }
    ],
    339: [
        function(d, c, f) {
            var i = d("ac-base").Element;
            var o = d("ac-base").Environment;
            var k = d("ac-localnav-sticky").LocalnavSticky;
            var h = d("./LaunchpadController");
            var a = d("./../shared/AmbientController");
            var r = d("./IntroScroll");
            var b = d("./IntroAutoplayController");
            var g = d("ac-modal-video").ModalVideo;
            var j = d("ac-base").Event;
            var p = d("./../shared/FeatureDetect");
            var q = d("ac-video").Video;
            var n = d("ac-analytics");
            var m = d("ac-dom-events");
            var l = (function() {
                return {
                    initialize: function() {
                        this.sticky = new k();
                        var t = o.Feature.touchAvailable();
                        var u = p._supports("css-filter");
                        var y = o.Browser.name === "Firefox";
                        var x = (o.Browser.name === "Chrome");
                        var v = t || !u || y;
                        if (/static/.test(window.location)) {
                            v = true
                        }
                        if (!x) {
                            document.body.className += " no-chrome"
                        }
                        if (!v) {
                            i.addClassName(i.select("body"), "show-intro");
                            var s = this.introScroll = new r();
                            window.introScroll = s;
                            s.on("userEngaged", function(A) {
                                var z = i.select(".section-caret-container");
                                if (A) {
                                    i.addClassName(z, "fade-caret")
                                }
                            });
                            var w = new b(s);
                            s.on("ready", function() {
                                i.select(".pill-container").addEventListener("click", function() {
                                    w.play()
                                })
                            })
                        } else {
                            if (y) {
                                setTimeout(this._fallbackIntro.bind(this), 100)
                            } else {
                                this._fallbackIntro()
                            }
                        }
                        h.initialize();
                        a.initialize();
                        this.initializeVideo();
                        return this
                    },
                    initializeVideo: function() {
                        var s;
                        var u = "film-trigger";
                        var t;
                        if (o.Feature.isHandheld()) {
                            this._rewriteMovieLinksForAndroid(u);
                            this._createHandheldVideo(u);
                            return
                        } else {
                            t = {
                                responsive: {
                                    maxWidth: 848
                                },
                                deepLink: true
                            };
                            s = new g(u.replace(/-trigger/, ""), t)
                        } if (!this.introScroll || !s.modal) {
                            return
                        }
                        s.modal.on("close", function() {
                            this.introScroll.resize();
                            this.introScroll._handleWindowResize()
                        }.bind(this));
                        this.introScroll.onClonedModalLinkClick = function(x) {
                            j.stop(x);
                            var w = {
                                preventDefault: function() {}
                            };
                            var v;
                            if (/film/.test(x.target.id)) {
                                v = s;
                                v._onTriggerClick(w)
                            }
                        }
                    },
                    _createHandheldVideo: function(t) {
                        var s;
                        var v = i.getElementById(t);
                        var u;
                        if (i.isElement(v)) {
                            v.setAttribute("data-acv-target", v.id);
                            v.setAttribute("data-acv-trigger-open", v.id);
                            s = new q(t, {
                                responsive: true
                            });
                            if (typeof n === "object" && s) {
                                new n.observer.Video(s)
                            }
                            s.once("acv-video-view-ready", function() {
                                s.videoContent.style.right = "-999px";
                                s.videoContent.style.height = "0";
                                s.videoContent.style.overflow = "hidden"
                            });
                            s.api.instanceAPI.initialize();
                            m.addEventListener(s.el, "click", function(w) {
                                m.stop(w)
                            });
                            m.addEventListener(s.el, "touchstart", function(w) {
                                u = false
                            });
                            m.addEventListener(s.el, "touchmove", function(w) {
                                u = true
                            });
                            m.addEventListener(s.el, "touchend", function(w) {
                                if (!u) {
                                    s.api.instanceAPI.player.play()
                                }
                                u = false
                            });
                            s.on("acv-ended", function(w) {
                                s.videoView.element.webkitExitFullScreen()
                            })
                        }
                    },
                    _rewriteMovieLinksForAndroid: function(t) {
                        if (o.Browser.os.toLowerCase() === "android") {
                            var s = i.getElementById(t);
                            if (s && typeof s.href !== "undefined") {
                                s.href = s.href.replace("http://images.apple.com/v/imac-with-retina/a/scripts/_r848-9dwc.mov", "http://images.apple.com/v/imac-with-retina/a/scripts/_416x234h.mp4")
                            }
                        }
                    },
                    _fallbackIntro: function() {
                        i.addClassName(document.body, "static-intro");
                        return this
                    }
                }
            }());
            c.exports = l.initialize()
        }, {
            "./../shared/AmbientController": 340,
            "./../shared/FeatureDetect": 342,
            "./IntroAutoplayController": 335,
            "./IntroScroll": 337,
            "./LaunchpadController": 338,
            "ac-base": false,
            "ac-dom-events": 33,
            "ac-localnav-sticky": 47,
            "ac-modal-video": 149,
            "ac-video": 270
        }
    ],
    340: [
        function(d, h, c) {
            var i = d("ac-base").Element;
            var b = d("ac-base").Environment;
            var g = d("ac-element-engagement").ElementEngagement;
            var a = d("./BreakpointsDelegate");
            var f = (function() {
                return {
                    initialize: function() {
                        var j = b.Feature.touchAvailable();
                        var n = b.Browser.version < 8;
                        var m = "small" === a.breakpoint.name;
                        if (m || (j && n)) {
                            return
                        }
                        var l = i.selectAll("[data-ambient]");
                        var k = new g();
                        l.forEach(function(p, o) {
                            i.addClassName(p, "will-play");
                            k.addElement(p)
                        });
                        k.on("thresholdenter", function(o) {
                            this.removeElement(o.el);
                            i.addClassName(o.el, "play")
                        }, k);
                        setTimeout(function() {
                            k.start()
                        }, 1000);
                        return this
                    }
                }
            }());
            h.exports = f
        }, {
            "./BreakpointsDelegate": 341,
            "ac-base": false,
            "ac-element-engagement": 45
        }
    ],
    341: [
        function(b, a, d) {
            var f, i = b("ac-base").Element,
                c = b("ac-object"),
                k = b("window-delegate").WindowDelegate,
                j = b("ac-event-emitter").EventEmitter;
            var g = {
                small: {
                    width: 0,
                    content: 288,
                    maxDeviceWidth: 768
                },
                medium: {
                    width: 736,
                    content: 698
                },
                large: {
                    width: 1025,
                    content: 980,
                    oldIE: true
                },
                xlarge: {
                    width: 1442,
                    content: 980
                }
            };
            var h = function() {
                this.breakpoint = null;
                this._lastBreakpoint = null;
                this._handleOldIE();
                this._handleDevices();
                this._breakpointOrder = this._setBreakpointOrder();
                if (!this._isOldIE) {
                    k.on("resize orientationchange", this._handleResize, this);
                    this._handleResize()
                }
            };
            f = h.prototype = new j(null);
            f._handleResize = function() {
                var p = k.innerWidth,
                    q;
                var o, n, m, l = this._breakpointOrder.length;
                for (o = 0; o < l; o++) {
                    n = this._breakpointOrder[o];
                    m = g[n];
                    if (m.width > p) {
                        break
                    }
                }
                if (o > 0) {
                    o = o - 1
                }
                q = g[this._breakpointOrder[o]];
                if (!this.breakpoint) {
                    this.breakpoint = q;
                    return
                }
                if (q.name === this.breakpoint.name) {
                    return
                }
                this._lastBreakpoint = this.breakpoint;
                this.breakpoint = q;
                this.trigger("breakpoint", {
                    incoming: this.breakpoint,
                    outgoing: this._lastBreakpoint
                })
            };
            f._setBreakpointOrder = function() {
                var m = [],
                    l = [],
                    n;
                for (n in g) {
                    if (g.hasOwnProperty(n)) {
                        g[n].name = n;
                        m.push(g[n].width)
                    }
                }
                m.sort(function(p, o) {
                    return p - o
                });
                m.forEach(function(p) {
                    var o;
                    for (o in g) {
                        if (g.hasOwnProperty(o)) {
                            if (g[o].width === p) {
                                l.push(o)
                            }
                        }
                    }
                });
                return l
            };
            f._handleOldIE = function() {
                if (!i.hasClassName(document.documentElement, "oldie")) {
                    return
                }
                this.breakpoint = g.large;
                this._isOldIE = true;
                this._replaceBreakpoints(function(l) {
                    return l.oldIE === true
                })
            };
            f._handleDevices = function() {
                this._replaceBreakpoints(function(l) {
                    if (typeof l.maxDeviceWidth !== "number") {
                        return true
                    }
                    if (window.screen && window.screen.width <= l.maxDeviceWidth) {
                        return true
                    }
                    return false
                })
            };
            f._replaceBreakpoints = function(o) {
                var m, n = {}, l;
                for (m in g) {
                    if (g.hasOwnProperty(m)) {
                        l = g[m];
                        if (o(l)) {
                            n[m] = c.clone(g[m])
                        }
                    }
                }
                g = n
            };
            a.exports = new h()
        }, {
            "ac-base": false,
            "ac-event-emitter": false,
            "ac-object": 153,
            "window-delegate": 330
        }
    ],
    342: [
        function(b, f, a) {
            var g = b("ac-base").Element;
            var d = b("ac-base").Environment.Browser;
            var h = b("ac-base").Environment.Feature;
            var c = (function() {
                var k = document.documentElement;
                var m = function() {
                    var o = document.createElement("div"),
                        n = ["mask", "webkitMask"];
                    return n.some(function(p) {
                        o.style[p] = "url(#test) center center / cover";
                        if (o.getAttribute("style")) {
                            return true
                        }
                    })
                };
                var i = function() {
                    var o = document.createElement("div"),
                        n = ["sticky", "-webkit-sticky"];
                    return n.some(function(p) {
                        try {
                            o.style.position = p;
                            if (o.getAttribute("style")) {
                                return true
                            }
                        } catch (q) {
                            return false
                        }
                    })
                };
                var l = function() {
                    var n = document.createElement("div");
                    n.style.webkitFilter = "filter:opacity(0)";
                    n.style.cssText = "filter:opacity(0); -webkit-filter:opacity(0);";
                    return !!n.style.length && ((document.documentMode === undefined || document.documentMode > 9))
                };
                var j = {
                    touch: h.touchAvailable,
                    svg: h.svgAvailable,
                    oldie: (d.name === "IE" && d.version < 9),
                    "css-mask": m,
                    "css-sticky": i,
                    "css-filter": l
                };
                return {
                    htmlClass: function() {
                        var n;
                        g.removeClassName(k, "no-js");
                        g.addClassName(k, "js");
                        for (n in j) {
                            this._addClass(n)
                        }
                    },
                    _supports: function(n) {
                        if (typeof j[n] === "undefined") {
                            return false
                        }
                        if (typeof j[n] === "function") {
                            j[n] = j[n]()
                        }
                        return j[n]
                    },
                    _addClass: function(o, n) {
                        n = n || "no-";
                        if (this._supports(o)) {
                            g.addClassName(k, o)
                        } else {
                            g.addClassName(k, n + o)
                        }
                    }
                }
            }());
            f.exports = c
        }, {
            "ac-base": false
        }
    ],
    343: [
        function(c, d, a) {
            var f = (function() {
                var g = "http://images.apple.com/global/elements/blank.gif";
                return g.replace(/global\/.*/, "")
            }());
            d.exports = function b(g) {
                if ( !! g.match(/(^http(s?))/)) {
                    return g
                }
                if (g.match(/^\/(?!\/)/)) {
                    g = f + g.replace(/^\//, "");
                    g = g.replace(/(^.+)(\/105\/)/, "$1/")
                }
                return g
            }
        }, {}
    ],
    344: [
        function(b, d, a) {
            d.exports = c;

            function c(i, g, h, f, j) {
                return f + (j - f) * ((i - g) / (h - g))
            }
        }, {}
    ],
    345: [
        function(b, d, a) {
            var h = b("ac-base");
            var g = b("ac-event-emitter").EventEmitter;
            var c = b("window-delegate").WindowDelegate;

            function i() {
                this._update.bind(this);
                h.onDOMReady(this._update.bind(this));
                c.on("scroll", this._update.bind(this));
                c.on("resize", this._update.bind(this))
            }
            var f = i.prototype = new g();
            f._update = function() {
                var n = c.scrollY || 0,
                    j = c.scrollX || 0,
                    l = this._scrollY,
                    m = this._scrollX,
                    k = false;
                this._maxScrollY = document.body.scrollHeight - c.innerHeight;
                this._maxScrollX = document.body.scrollWidth - c.innerWidth;
                n = Math.min(Math.max(n, 0), this._maxScrollY);
                j = Math.min(Math.max(j, 0), this._maxScrollX);
                if (n !== l) {
                    k = true;
                    this._scrollY = n;
                    this.trigger("scrollY", {
                        from: l,
                        to: n
                    })
                }
                if (j !== m) {
                    k = true;
                    this._scrollX = j;
                    this.trigger("scrollX", {
                        from: m,
                        to: j
                    })
                }
                if (k) {
                    this.trigger("scroll", {
                        y: {
                            from: l,
                            to: n
                        },
                        x: {
                            from: m,
                            to: j
                        }
                    })
                }
            };
            f.getScrollY = function() {
                return this._scrollY
            };
            f.getScrollX = function() {
                return this._scrollX
            };
            f.getMaxScrollY = function() {
                return this._maxScrollY
            };
            f.getMaxScrollX = function() {
                return this._maxScrollX
            };
            d.exports = new i()
        }, {
            "ac-base": false,
            "ac-event-emitter": false,
            "window-delegate": 330
        }
    ],
    346: [
        function(b, a, c) {
            var f = b("ac-base");
            var i = b("ac-event-emitter").EventEmitter;
            var h = b("./ScrollObserver");
            var j = b("window-delegate").WindowDelegate;

            function g(l, k) {
                if (!l) {
                    throw new TypeError("ScrollPlayer: Invalid clip provided", l)
                }
                this._options = f.Object.extend({}, this._defaultOptions, k || {});
                this._clip = l;
                this._paused = true;
                this._lastScroll = false;
                this._scroll = 0;
                this._updateScroll();
                this._update();
                h.on("scrollY", this._updateScroll.bind(this))
            }
            var d = g.prototype = new i();
            d._defaultOptions = {
                element: false,
                scrollOffset: 0,
                startThreshold: 0,
                endThreshold: 1
            };
            d._updateScroll = function() {
                var p = j.innerHeight,
                    o = h.getScrollY(),
                    m = h.getMaxScrollY(),
                    n = p * this._options.scrollOffset,
                    l, k;
                if (this._options.element) {
                    l = f.Element.getInnerDimensions(this._options.element).height;
                    k = f.Element.cumulativeOffset(this._options.element).top;
                    this._minScroll = Math.max(k + p * (this._options.startThreshold - 1) - n, 0);
                    this._maxScroll = l + k - (Math.min(p, l) * this._options.endThreshold) - n
                } else {
                    this._minScroll = n;
                    this._maxScroll = Math.min(n + m, m)
                }
                this._realScroll = o;
                this._scroll = Math.min(Math.max(o, this._minScroll), this._maxScroll);
                return this._scroll
            };
            d._updateClipTime = function(k) {
                if (this._lastScroll !== k) {
                    this._lastScroll = k;
                    if (this._paused) {
                        if (this._realScroll >= this._minScroll && this._realScroll <= this._maxScroll) {
                            this.trigger("started");
                            this._paused = false
                        }
                    } else {
                        if (k >= this._maxScroll) {
                            this._lastTime = this._clip.setCurrentTime(this._clip.getDuration());
                            this.trigger("ended");
                            this._paused = true
                        } else {
                            if (k <= this._minScroll) {
                                this._lastTime = this._clip.setCurrentTime(0);
                                this.trigger("returned");
                                this._paused = true
                            }
                        }
                    } if (!this._paused) {
                        this._lastTime = this._clip.setCurrentTime((k - this._minScroll) / (this._maxScroll - this._minScroll) * this._clip.getDuration())
                    }
                }
            };
            d._update = function() {
                this._updateClipTime(this._scroll);
                window.requestAnimationFrame(this._update.bind(this))
            };
            d.getCurrentScroll = function() {
                return this._scroll
            };
            d.getMinScroll = function() {
                return this._minScroll
            };
            d.getMaxScroll = function() {
                return this._maxScroll
            };
            d.setElement = function(k) {
                this._options.element = k
            };
            a.exports = g
        }, {
            "./ScrollObserver": 345,
            "ac-base": false,
            "ac-event-emitter": false,
            "window-delegate": 330
        }
    ]
}, {}, [339]);
