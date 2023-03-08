"undefined" == typeof jwplayer && (jwplayer = function(f) {
        if (jwplayer.api) return jwplayer.api.selectPlayer(f)
    }, jwplayer.version = "6.2.3115", jwplayer.vid = document.createElement("video"), jwplayer.audio = document.createElement("audio"), jwplayer.source = document.createElement("source"), function(f) {
        function a(a) {
            return function() {
                return b(a)
            }
        }
        var j = document,
            e = window,
            c = navigator,
            d = f.utils = function() {};
        d.exists = function(a) {
            switch (typeof a) {
                case "string":
                    return 0 < a.length;
                case "object":
                    return null !== a;
                case "undefined":
                    return !1
            }
            return !0
        };
        d.styleDimension = function(a) {
            return a + (0 < a.toString().indexOf("%") ? "" : "px")
        };
        d.getAbsolutePath = function(a, b) {
            d.exists(b) || (b = j.location.href);
            if (d.exists(a)) {
                var c;
                if (d.exists(a)) {
                    c = a.indexOf("://");
                    var l = a.indexOf("?");
                    c = 0 < c && (0 > l || l > c)
                } else c = void 0;
                if (c) return a;
                c = b.substring(0, b.indexOf("://") + 3);
                var l = b.substring(c.length, b.indexOf("/", c.length + 1)),
                    e;
                0 === a.indexOf("/") ? e = a.split("/") : (e = b.split("?")[0], e = e.substring(c.length + l.length + 1, e.lastIndexOf("/")), e = e.split("/").concat(a.split("/")));
                for (var g = [], r = 0; r < e.length; r++) e[r] && (d.exists(e[r]) && "." != e[r]) && (".." == e[r] ? g.pop() : g.push(e[r]));
                return c + l + "/" + g.join("/")
            }
        };
        d.extend = function() {
            var a = d.extend.arguments;
            if (1 < a.length) {
                for (var b = 1; b < a.length; b++)
                    for (var c in a[b]) try {
                        d.exists(a[b][c]) && (a[0][c] = a[b][c])
                    } catch (e) {}
                return a[0]
            }
            return null
        };
        d.log = function(a, d) {
            "undefined" != typeof console && "undefined" != typeof console.log && (d ? console.log(a, d) : console.log(a))
        };
        var b = d.userAgentMatch = function(a) {
            return null !== c.userAgent.toLowerCase().match(a)
        };
        d.isIE = a(/msie/i);
        d.isFF = a(/firefox/i);
        d.isChrome = a(/chrome/i);
        d.isIOS = a(/iP(hone|ad|od)/i);
        d.isIPod = a(/iP(hone|od)/i);
        d.isIPad = a(/iPad/i);
        d.isSafari602 = a(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i);
        d.isAndroid = function(a) {
            return a ? b(RegExp("android.*" + a, "i")) : b(/android/i)
        };
        d.isMobile = function() {
            return d.isIOS() || d.isAndroid()
        };
        d.saveCookie = function(a, d) {
            j.cookie = "jwplayer." + a + "\x3d" + d + "; path\x3d/"
        };
        d.getCookies = function() {
            for (var a = {}, d = j.cookie.split("; "), b = 0; b < d.length; b++) {
                var c = d[b].split("\x3d");
                0 == c[0].indexOf("jwplayer.") && (a[c[0].substring(9, c[0].length)] = c[1])
            }
            return a
        };
        d.typeOf = function(a) {
            var d = typeof a;
            return "object" === d ? !a ? "null" : a instanceof Array ? "array" : d : d
        };
        d.translateEventResponse = function(a, b) {
            var c = d.extend({}, b);
            a == f.events.JWPLAYER_FULLSCREEN && !c.fullscreen ? (c.fullscreen = "true" == c.message ? !0 : !1, delete c.message) : "object" == typeof c.data ? (c = d.extend(c, c.data), delete c.data) : "object" == typeof c.metadata && d.deepReplaceKeyName(c.metadata, ["__dot__", "__spc__", "__dsh__"], [".", " ",
                "-"
            ]);
            var e = ["position", "duration", "offset"],
                l;
            for (l in e) c[e[l]] && (c[e[l]] = Math.round(1E3 * c[e[l]]) / 1E3);
            return c
        };
        d.flashVersion = function() {
            if (d.isAndroid()) return 0;
            var a = c.plugins,
                b;
            try {
                if ("undefined" !== a && (b = a["Shockwave Flash"])) return parseInt(b.description.replace(/\D+(\d+)\..*/, "$1"))
            } catch (l) {}
            if ("undefined" != typeof e.ActiveXObject) try {
                if (b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) return parseInt(b.GetVariable("$version").split(" ")[1].split(",")[0])
            } catch (f) {}
            return 0
        };
        d.getScriptPath =
            function(a) {
                for (var d = j.getElementsByTagName("script"), b = 0; b < d.length; b++) {
                    var c = d[b].src;
                    if (c && 0 <= c.indexOf(a)) return c.substr(0, c.indexOf(a))
                }
                return ""
            };
        d.deepReplaceKeyName = function(a, d, b) {
            switch (f.utils.typeOf(a)) {
                case "array":
                    for (var c = 0; c < a.length; c++) a[c] = f.utils.deepReplaceKeyName(a[c], d, b);
                    break;
                case "object":
                    for (var e in a) {
                        var g;
                        if (d instanceof Array && b instanceof Array)
                            if (d.length != b.length) continue;
                            else g = d;
                        else g = [d];
                        for (var r = e, c = 0; c < g.length; c++) r = r.replace(RegExp(d[c], "g"), b[c]);
                        a[r] =
                            f.utils.deepReplaceKeyName(a[e], d, b);
                        e != r && delete a[e]
                    }
            }
            return a
        };
        var l = d.pluginPathType = {
            ABSOLUTE: 0,
            RELATIVE: 1,
            CDN: 2
        };
        d.getPluginPathType = function(a) {
            if ("string" == typeof a) {
                a = a.split("?")[0];
                var b = a.indexOf("://");
                if (0 < b) return l.ABSOLUTE;
                var c = a.indexOf("/");
                a = d.extension(a);
                return 0 > b && 0 > c && (!a || !isNaN(a)) ? l.CDN : l.RELATIVE
            }
        };
        d.getPluginName = function(a) {
            return a.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/, "$2")
        };
        d.getPluginVersion = function(a) {
            return a.replace(/[^-]*-?([^\.]*).*$/, "$1")
        };
        d.isYouTube =
            function(a) {
                return -1 < a.indexOf("youtube.com") || -1 < a.indexOf("youtu.be")
            };
        d.isRtmp = function(a, d) {
            return 0 == a.indexOf("rtmp") || "rtmp" == d
        };
        d.foreach = function(a, d) {
            for (var b in a) a.hasOwnProperty(b) && d(b)
        };
        d.isHTTPS = function() {
            return 0 == e.location.href.indexOf("https")
        };
        d.repo = function() {
            var a = "http://p.jwpcdn.com/" + f.version.split(/\W/).splice(0, 2).join("/") + "/";
            try {
                d.isHTTPS() && (a = a.replace("http://", "https://ssl."))
            } catch (b) {}
            return a
        }
    }(jwplayer), function(f) {
        var a = "video/",
            j = {
                mp4: a + "mp4",
                vorbis: "audio/ogg",
                ogg: a + "ogg",
                webm: a + "webm",
                aac: "audio/mp4",
                mp3: "audio/mpeg",
                hls: "application/vnd.apple.mpegurl"
            },
            e = {
                mp4: j.mp4,
                f4v: j.mp4,
                m4v: j.mp4,
                mov: j.mp4,
                m4a: j.aac,
                f4a: j.aac,
                aac: j.aac,
                mp3: j.mp3,
                ogv: j.ogg,
                ogg: j.vorbis,
                oga: j.vorbis,
                webm: j.webm,
                m3u8: j.hls
            },
            a = "video",
            a = {
                flv: a,
                f4v: a,
                mov: a,
                m4a: a,
                m4v: a,
                mp4: a,
                aac: a,
                f4a: a,
                mp3: "sound",
                smil: "rtmp",
                m3u8: "hls"
            },
            c = f.extensionmap = {},
            d;
        for (d in e) c[d] = {
            html5: e[d]
        };
        for (d in a) c[d] || (c[d] = {}), c[d].flash = a[d];
        c.types = j;
        c.mimeType = function(a) {
            for (var d in j)
                if (j[d] == a) return d
        };
        c.extType =
            function(a) {
                return c.mimeType(e[a])
            }
    }(jwplayer.utils), function(f) {
        var a = f.loaderstatus = {
                NEW: 0,
                LOADING: 1,
                ERROR: 2,
                COMPLETE: 3
            },
            j = document;
        f.scriptloader = function(e) {
            function c() {
                b = a.ERROR;
                h.sendEvent(l.ERROR)
            }

            function d() {
                b = a.COMPLETE;
                h.sendEvent(l.COMPLETE)
            }
            var b = a.NEW,
                l = jwplayer.events,
                h = new l.eventdispatcher;
            f.extend(this, h);
            this.load = function() {
                var h = f.scriptloader.loaders[e];
                if (h && (h.getStatus() == a.NEW || h.getStatus() == a.LOADING)) h.addEventListener(l.ERROR, c), h.addEventListener(l.COMPLETE, d);
                else if (f.scriptloader.loaders[e] =
                    this, b == a.NEW) {
                    b = a.LOADING;
                    var m = j.createElement("script");
                    m.addEventListener ? (m.onload = d, m.onerror = c) : m.readyState && (m.onreadystatechange = function() {
                        ("loaded" == m.readyState || "complete" == m.readyState) && d()
                    });
                    j.getElementsByTagName("head")[0].appendChild(m);
                    m.src = e
                }
            };
            this.getStatus = function() {
                return b
            }
        };
        f.scriptloader.loaders = {}
    }(jwplayer.utils), function(f) {
        f.trim = function(a) {
            return a.replace(/^\s*/, "").replace(/\s*$/, "")
        };
        f.pad = function(a, f, e) {
            for (e || (e = "0"); a.length < f;) a = e + a;
            return a
        };
        f.xmlAttribute =
            function(a, f) {
                for (var e = 0; e < a.attributes.length; e++)
                    if (a.attributes[e].name && a.attributes[e].name.toLowerCase() == f.toLowerCase()) return a.attributes[e].value.toString();
                return ""
            };
        f.extension = function(a) {
            if (!a || "rtmp" == a.substr(0, 4)) return "";
            a = a.substring(a.lastIndexOf("/") + 1, a.length).split("?")[0].split("#")[0];
            if (-1 < a.lastIndexOf(".")) return a.substr(a.lastIndexOf(".") + 1, a.length).toLowerCase()
        };
        f.stringToColor = function(a) {
            a = a.replace(/(#|0x)?([0-9A-F]{3,6})$/gi, "$2");
            3 == a.length && (a = a.charAt(0) +
                a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2));
            return parseInt(a, 16)
        }
    }(jwplayer.utils), function(f) {
        f.key = function(a) {
            var j, e, c;
            this.edition = function() {
                return c && c.getTime() < (new Date).getTime() ? "invalid" : j
            };
            this.token = function() {
                return e
            };
            f.exists(a) || (a = "");
            try {
                a = f.tea.decrypt(a, "36QXq4W@GSBV^teR");
                var d = a.split("/");
                (j = d[0]) || (j = "free");
                e = d[1];
                d[2] && 0 < parseInt(d[2]) && (c = new Date, c.setTime(String(d[2])))
            } catch (b) {
                j = "invalid"
            }
        }
    }(jwplayer.utils), function(f) {
        var a = f.tea = {};
        a.encrypt = function(c,
            d) {
            if (0 == c.length) return "";
            var b = a.strToLongs(e.encode(c));
            1 >= b.length && (b[1] = 0);
            for (var l = a.strToLongs(e.encode(d).slice(0, 16)), h = b.length, f = b[h - 1], m = b[0], q, k = Math.floor(6 + 52 / h), g = 0; 0 < k--;) {
                g += 2654435769;
                q = g >>> 2 & 3;
                for (var r = 0; r < h; r++) m = b[(r + 1) % h], f = (f >>> 5 ^ m << 2) + (m >>> 3 ^ f << 4) ^ (g ^ m) + (l[r & 3 ^ q] ^ f), f = b[r] += f
            }
            b = a.longsToStr(b);
            return j.encode(b)
        };
        a.decrypt = function(c, d) {
            if (0 == c.length) return "";
            for (var b = a.strToLongs(j.decode(c)), l = a.strToLongs(e.encode(d).slice(0, 16)), h = b.length, f = b[h - 1], m = b[0], q, k = 2654435769 *
                    Math.floor(6 + 52 / h); 0 != k;) {
                q = k >>> 2 & 3;
                for (var g = h - 1; 0 <= g; g--) f = b[0 < g ? g - 1 : h - 1], f = (f >>> 5 ^ m << 2) + (m >>> 3 ^ f << 4) ^ (k ^ m) + (l[g & 3 ^ q] ^ f), m = b[g] -= f;
                k -= 2654435769
            }
            b = a.longsToStr(b);
            b = b.replace(/\0+$/, "");
            return e.decode(b)
        };
        a.strToLongs = function(a) {
            for (var d = Array(Math.ceil(a.length / 4)), b = 0; b < d.length; b++) d[b] = a.charCodeAt(4 * b) + (a.charCodeAt(4 * b + 1) << 8) + (a.charCodeAt(4 * b + 2) << 16) + (a.charCodeAt(4 * b + 3) << 24);
            return d
        };
        a.longsToStr = function(a) {
            for (var d = Array(a.length), b = 0; b < a.length; b++) d[b] = String.fromCharCode(a[b] &
                255, a[b] >>> 8 & 255, a[b] >>> 16 & 255, a[b] >>> 24 & 255);
            return d.join("")
        };
        var j = {
                code: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d",
                encode: function(a, d) {
                    var b, l, h, f, m = [],
                        q = "",
                        k, g, r = j.code;
                    g = ("undefined" == typeof d ? 0 : d) ? e.encode(a) : a;
                    k = g.length % 3;
                    if (0 < k)
                        for (; 3 > k++;) q += "\x3d", g += "\x00";
                    for (k = 0; k < g.length; k += 3) b = g.charCodeAt(k), l = g.charCodeAt(k + 1), h = g.charCodeAt(k + 2), f = b << 16 | l << 8 | h, b = f >> 18 & 63, l = f >> 12 & 63, h = f >> 6 & 63, f &= 63, m[k / 3] = r.charAt(b) + r.charAt(l) + r.charAt(h) + r.charAt(f);
                    m = m.join("");
                    return m = m.slice(0, m.length - q.length) + q
                },
                decode: function(a, d) {
                    d = "undefined" == typeof d ? !1 : d;
                    var b, l, h, f, m, q = [],
                        k, g = j.code;
                    k = d ? e.decode(a) : a;
                    for (var r = 0; r < k.length; r += 4) b = g.indexOf(k.charAt(r)), l = g.indexOf(k.charAt(r + 1)), f = g.indexOf(k.charAt(r + 2)), m = g.indexOf(k.charAt(r + 3)), h = b << 18 | l << 12 | f << 6 | m, b = h >>> 16 & 255, l = h >>> 8 & 255, h &= 255, q[r / 4] = String.fromCharCode(b, l, h), 64 == m && (q[r / 4] = String.fromCharCode(b, l)), 64 == f && (q[r / 4] = String.fromCharCode(b));
                    f = q.join("");
                    return d ? e.decode(f) : f
                }
            },
            e = {
                encode: function(a) {
                    a =
                        a.replace(/[\u0080-\u07ff]/g, function(a) {
                            a = a.charCodeAt(0);
                            return String.fromCharCode(192 | a >> 6, 128 | a & 63)
                        });
                    return a = a.replace(/[\u0800-\uffff]/g, function(a) {
                        a = a.charCodeAt(0);
                        return String.fromCharCode(224 | a >> 12, 128 | a >> 6 & 63, 128 | a & 63)
                    })
                },
                decode: function(a) {
                    a = a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(a) {
                        a = (a.charCodeAt(0) & 15) << 12 | (a.charCodeAt(1) & 63) << 6 | a.charCodeAt(2) & 63;
                        return String.fromCharCode(a)
                    });
                    return a = a.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(a) {
                        a = (a.charCodeAt(0) &
                            31) << 6 | a.charCodeAt(1) & 63;
                        return String.fromCharCode(a)
                    })
                }
            }
    }(jwplayer.utils), function(f) {
        f.events = {
            COMPLETE: "COMPLETE",
            ERROR: "ERROR",
            API_READY: "jwplayerAPIReady",
            JWPLAYER_READY: "jwplayerReady",
            JWPLAYER_FULLSCREEN: "jwplayerFullscreen",
            JWPLAYER_RESIZE: "jwplayerResize",
            JWPLAYER_ERROR: "jwplayerError",
            JWPLAYER_MEDIA_BEFOREPLAY: "jwplayerMediaBeforePlay",
            JWPLAYER_MEDIA_BEFORECOMPLETE: "jwplayerMediaBeforeComplete",
            JWPLAYER_COMPONENT_SHOW: "jwplayerComponentShow",
            JWPLAYER_COMPONENT_HIDE: "jwplayerComponentHide",
            JWPLAYER_MEDIA_BUFFER: "jwplayerMediaBuffer",
            JWPLAYER_MEDIA_BUFFER_FULL: "jwplayerMediaBufferFull",
            JWPLAYER_MEDIA_ERROR: "jwplayerMediaError",
            JWPLAYER_MEDIA_LOADED: "jwplayerMediaLoaded",
            JWPLAYER_MEDIA_COMPLETE: "jwplayerMediaComplete",
            JWPLAYER_MEDIA_SEEK: "jwplayerMediaSeek",
            JWPLAYER_MEDIA_TIME: "jwplayerMediaTime",
            JWPLAYER_MEDIA_VOLUME: "jwplayerMediaVolume",
            JWPLAYER_MEDIA_META: "jwplayerMediaMeta",
            JWPLAYER_MEDIA_MUTE: "jwplayerMediaMute",
            JWPLAYER_MEDIA_LEVELS: "jwplayerMediaLevels",
            JWPLAYER_MEDIA_LEVEL_CHANGED: "jwplayerMediaLevelChanged",
            JWPLAYER_CAPTIONS_CHANGED: "jwplayerCaptionsChanged",
            JWPLAYER_CAPTIONS_LIST: "jwplayerCaptionsList",
            JWPLAYER_PLAYER_STATE: "jwplayerPlayerState",
            state: {
                BUFFERING: "BUFFERING",
                IDLE: "IDLE",
                PAUSED: "PAUSED",
                PLAYING: "PLAYING"
            },
            JWPLAYER_PLAYLIST_LOADED: "jwplayerPlaylistLoaded",
            JWPLAYER_PLAYLIST_ITEM: "jwplayerPlaylistItem",
            JWPLAYER_PLAYLIST_COMPLETE: "jwplayerPlaylistComplete",
            JWPLAYER_DISPLAY_CLICK: "jwplayerViewClick",
            JWPLAYER_CONTROLS: "jwplayerViewControls",
            JWPLAYER_INSTREAM_CLICK: "jwplayerInstreamClicked",
            JWPLAYER_INSTREAM_DESTROYED: "jwplayerInstreamDestroyed"
        }
    }(jwplayer), function(f) {
        var a = jwplayer.utils;
        f.eventdispatcher = function(f, e) {
            var c, d;
            this.resetEventListeners = function() {
                c = {};
                d = []
            };
            this.resetEventListeners();
            this.addEventListener = function(b, d, e) {
                try {
                    a.exists(c[b]) || (c[b] = []), "string" == a.typeOf(d) && (d = (new Function("return " + d))()), c[b].push({
                        listener: d,
                        count: e
                    })
                } catch (f) {
                    a.log("error", f)
                }
                return !1
            };
            this.removeEventListener = function(b, d) {
                if (c[b]) {
                    try {
                        for (var e = 0; e < c[b].length; e++)
                            if (c[b][e].listener.toString() ==
                                d.toString()) {
                                c[b].splice(e, 1);
                                break
                            }
                    } catch (f) {
                        a.log("error", f)
                    }
                    return !1
                }
            };
            this.addGlobalListener = function(b, c) {
                try {
                    "string" == a.typeOf(b) && (b = (new Function("return " + b))()), d.push({
                        listener: b,
                        count: c
                    })
                } catch (e) {
                    a.log("error", e)
                }
                return !1
            };
            this.removeGlobalListener = function(b) {
                if (b) {
                    try {
                        for (var c = 0; c < d.length; c++)
                            if (d[c].listener.toString() == b.toString()) {
                                d.splice(c, 1);
                                break
                            }
                    } catch (e) {
                        a.log("error", e)
                    }
                    return !1
                }
            };
            this.sendEvent = function(b, l) {
                a.exists(l) || (l = {});
                a.extend(l, {
                    id: f,
                    version: jwplayer.version,
                    type: b
                });
                e && a.log(b, l);
                if ("undefined" != a.typeOf(c[b]))
                    for (var h = 0; h < c[b].length; h++) {
                        try {
                            c[b][h].listener(l)
                        } catch (n) {
                            a.log("There was an error while handling a listener: " + n.toString(), c[b][h].listener)
                        }
                        c[b][h] && (1 === c[b][h].count ? delete c[b][h] : 0 < c[b][h].count && (c[b][h].count -= 1))
                    }
                for (h = 0; h < d.length; h++) {
                    try {
                        d[h].listener(l)
                    } catch (m) {
                        a.log("There was an error while handling a listener: " + m.toString(), d[h].listener)
                    }
                    d[h] && (1 === d[h].count ? delete d[h] : 0 < d[h].count && (d[h].count -= 1))
                }
            }
        }
    }(jwplayer.events),
    function(f) {
        var a = {},
            j = {};
        f.plugins = function() {};
        f.plugins.loadPlugins = function(e, c) {
            j[e] = new f.plugins.pluginloader(new f.plugins.model(a), c);
            return j[e]
        };
        f.plugins.registerPlugin = function(e, c, d, b) {
            var l = f.utils.getPluginName(e);
            a[l] || (a[l] = new f.plugins.plugin(e));
            a[l].registerPlugin(e, c, d, b)
        }
    }(jwplayer),
    function(f) {
        f.plugins.model = function(a) {
            this.addPlugin = function(j) {
                var e = f.utils.getPluginName(j);
                a[e] || (a[e] = new f.plugins.plugin(j));
                return a[e]
            };
            this.getPlugins = function() {
                return a
            }
        }
    }(jwplayer),
    function(f) {
        var a = jwplayer.utils,
            j = jwplayer.events;
        f.pluginmodes = {
            FLASH: 0,
            JAVASCRIPT: 1,
            HYBRID: 2
        };
        f.plugin = function(e) {
            function c() {
                switch (a.getPluginPathType(e)) {
                    case a.pluginPathType.ABSOLUTE:
                        return e;
                    case a.pluginPathType.RELATIVE:
                        return a.getAbsolutePath(e, window.location.href)
                }
            }

            function d() {
                q = setTimeout(function() {
                    l = a.loaderstatus.COMPLETE;
                    k.sendEvent(j.COMPLETE)
                }, 1E3)
            }

            function b() {
                l = a.loaderstatus.ERROR;
                k.sendEvent(j.ERROR)
            }
            var l = a.loaderstatus.NEW,
                h, n, m, q, k = new j.eventdispatcher;
            a.extend(this,
                k);
            this.load = function() {
                if (l == a.loaderstatus.NEW)
                    if (0 < e.lastIndexOf(".swf")) h = e, l = a.loaderstatus.COMPLETE, k.sendEvent(j.COMPLETE);
                    else if (a.getPluginPathType(e) == a.pluginPathType.CDN) l = a.loaderstatus.COMPLETE, k.sendEvent(j.COMPLETE);
                else {
                    l = a.loaderstatus.LOADING;
                    var g = new a.scriptloader(c());
                    g.addEventListener(j.COMPLETE, d);
                    g.addEventListener(j.ERROR, b);
                    g.load()
                }
            };
            this.registerPlugin = function(b, d, c, e) {
                q && (clearTimeout(q), q = void 0);
                m = d;
                c && e ? (h = e, n = c) : "string" == typeof c ? h = c : "function" == typeof c ? n = c :
                    !c && !e && (h = b);
                l = a.loaderstatus.COMPLETE;
                k.sendEvent(j.COMPLETE)
            };
            this.getStatus = function() {
                return l
            };
            this.getPluginName = function() {
                return a.getPluginName(e)
            };
            this.getFlashPath = function() {
                if (h) switch (a.getPluginPathType(h)) {
                    case a.pluginPathType.ABSOLUTE:
                        return h;
                    case a.pluginPathType.RELATIVE:
                        return 0 < e.lastIndexOf(".swf") ? a.getAbsolutePath(h, window.location.href) : a.getAbsolutePath(h, c())
                }
                return null
            };
            this.getJS = function() {
                return n
            };
            this.getTarget = function() {
                return m
            };
            this.getPluginmode = function() {
                if ("undefined" !=
                    typeof h && "undefined" != typeof n) return f.pluginmodes.HYBRID;
                if ("undefined" != typeof h) return f.pluginmodes.FLASH;
                if ("undefined" != typeof n) return f.pluginmodes.JAVASCRIPT
            };
            this.getNewInstance = function(a, b, d) {
                return new n(a, b, d)
            };
            this.getURL = function() {
                return e
            }
        }
    }(jwplayer.plugins),
    function(f) {
        var a = f.utils,
            j = f.events;
        f.plugins.pluginloader = function(e, c) {
            function d() {
                n ? k.sendEvent(j.ERROR, {
                    message: m
                }) : h || (h = !0, l = a.loaderstatus.COMPLETE, k.sendEvent(j.COMPLETE))
            }

            function b() {
                q || d();
                if (!h && !n) {
                    var b = 0,
                        c = e.getPlugins(),
                        g;
                    for (g in q) {
                        var l = a.getPluginName(g),
                            j = c[l],
                            l = j.getJS(),
                            k = j.getTarget(),
                            j = j.getStatus();
                        if (j == a.loaderstatus.LOADING || j == a.loaderstatus.NEW) b++;
                        else if (l && (!k || parseFloat(k) > parseFloat(f.version))) n = !0, m = "Incompatible player version", d()
                    }
                    0 == b && d()
                }
            }
            var l = a.loaderstatus.NEW,
                h = !1,
                n = !1,
                m, q = c,
                k = new j.eventdispatcher;
            a.extend(this, k);
            this.setupPlugins = function(b, d, c) {
                var g = {
                        length: 0,
                        plugins: {}
                    },
                    f = 0,
                    l = {},
                    h = e.getPlugins(),
                    j;
                for (j in d.plugins) {
                    var k = a.getPluginName(j),
                        m = h[k],
                        B = m.getFlashPath(),
                        n = m.getJS(),
                        q = m.getURL();
                    B && (g.plugins[B] = a.extend({}, d.plugins[j]), g.plugins[B].pluginmode = m.getPluginmode(), g.length++);
                    try {
                        if (n && d.plugins && d.plugins[q]) {
                            var v = document.createElement("div");
                            v.id = b.id + "_" + k;
                            v.style.position = "absolute";
                            v.style.top = 0;
                            v.style.zIndex = f + 10;
                            l[k] = m.getNewInstance(b, a.extend({}, d.plugins[q]), v);
                            f++;
                            b.onReady(c(l[k], v, !0));
                            b.onResize(c(l[k], v))
                        }
                    } catch (C) {
                        console.log("ERROR: Failed to load " + k + ".")
                    }
                }
                b.plugins = l;
                return g
            };
            this.load = function() {
                if (!(a.exists(c) && "object" != a.typeOf(c))) {
                    l =
                        a.loaderstatus.LOADING;
                    for (var d in c)
                        if (a.exists(d)) {
                            var f = e.addPlugin(d);
                            f.addEventListener(j.COMPLETE, b);
                            f.addEventListener(j.ERROR, g)
                        }
                    f = e.getPlugins();
                    for (d in f) f[d].load()
                }
                b()
            };
            var g = this.pluginFailed = function() {
                n || (n = !0, m = "File not found", d())
            };
            this.getStatus = function() {
                return l
            }
        }
    }(jwplayer),
    function(f) {
        f.playlist = function(a) {
            var j = [];
            if ("array" == f.utils.typeOf(a))
                for (var e = 0; e < a.length; e++) j.push(new f.playlist.item(a[e]));
            else j.push(new f.playlist.item(a));
            return j
        }
    }(jwplayer),
    function(f) {
        var a =
            f.item = function(j) {
                j = jwplayer.utils.extend({}, a.defaults, j);
                0 == j.sources.length && (j.sources = [new f.source(j)]);
                for (var e = 0; e < j.sources.length; e++) j.sources[e] = new f.source(j.sources[e]);
                return j
            };
        a.defaults = {
            description: "",
            image: "",
            mediaid: "",
            title: "",
            tags: "",
            duration: -1,
            sources: []
        }
    }(jwplayer.playlist),
    function(f) {
        var a = jwplayer.utils,
            j = {
                file: void 0,
                label: void 0,
                bitrate: void 0,
                width: void 0,
                height: void 0,
                type: void 0
            };
        f.source = function(e) {
            var c = a.extend({}, j),
                d;
            for (d in j) a.exists(e[d]) && (c[d] = e[d],
                delete e[d]);
            c.type && 0 < c.type.indexOf("/") && (c.type = a.extensionmap.mimeType(c.type));
            "m3u8" == c.type && (c.type = "hls");
            "smil" == c.type && (c.type = "rtmp");
            return c
        }
    }(jwplayer.playlist),
    function(f) {
        var a = f.utils,
            j = f.events,
            e = document,
            c = f.embed = function(d) {
                function b(a) {
                    h(m, p + a.message)
                }

                function l() {
                    h(m, p + "No playable sources found")
                }

                function h(d, b) {
                    if (n.fallback) {
                        var c = d.style;
                        c.backgroundColor = "#000";
                        c.color = "#FFF";
                        c.width = a.styleDimension(n.width);
                        c.height = a.styleDimension(n.height);
                        c.display = "table";
                        c.opacity =
                            1;
                        var c = document.createElement("p"),
                            g = c.style;
                        g.verticalAlign = "middle";
                        g.textAlign = "center";
                        g.display = "table-cell";
                        g.font = "15px/20px Arial, Helvetica, sans-serif";
                        c.innerHTML = b.replace(":", ":\x3cbr\x3e");
                        d.innerHTML = "";
                        d.appendChild(c)
                    }
                }
                var n = new c.config(d.config),
                    m, q, k, g = n.width,
                    r = n.height,
                    p = "Error loading player: ",
                    s = f.plugins.loadPlugins(d.id, n.plugins);
                n.fallbackDiv && (k = n.fallbackDiv, delete n.fallbackDiv);
                n.id = d.id;
                q = e.getElementById(d.id);
                m = e.createElement("div");
                m.id = q.id;
                m.style.width = 0 < g.toString().indexOf("%") ?
                    g : g + "px";
                m.style.height = 0 < r.toString().indexOf("%") ? r : r + "px";
                q.parentNode.replaceChild(m, q);
                f.embed.errorScreen = h;
                s.addEventListener(j.COMPLETE, function() {
                    if ("array" == a.typeOf(n.playlist) && 2 > n.playlist.length && (0 == n.playlist.length || !n.playlist[0].sources || 0 == n.playlist[0].sources.length)) l();
                    else if (s.getStatus() == a.loaderstatus.COMPLETE) {
                        for (var g = 0; g < n.modes.length; g++)
                            if (n.modes[g].type && c[n.modes[g].type]) {
                                var e = a.extend({}, n),
                                    f = new c[n.modes[g].type](m, n.modes[g], e, s, d);
                                if (f.supportsConfig()) {
                                    f.addEventListener(j.ERROR,
                                        b);
                                    f.embed();
                                    g = d;
                                    e = e.events;
                                    f = void 0;
                                    for (f in e) "function" == typeof g[f] && g[f].call(g, e[f]);
                                    return d
                                }
                            }
                        n.fallback ? (a.log("No suitable players found and fallback enabled"), new c.download(m, n, l)) : (a.log("No suitable players found and fallback disabled"), m.parentNode.replaceChild(k, m))
                    }
                });
                s.addEventListener(j.ERROR, function(a) {
                    h(m, "Could not load plugins: " + a.message)
                });
                s.load();
                return d
            }
    }(jwplayer),
    function(f) {
        function a(a) {
            if (a.playlist)
                for (var b = 0; b < a.playlist.length; b++) a.playlist[b] = new c(a.playlist[b]);
            else {
                var b = {},
                    e;
                for (e in c.defaults) j(a, b, e);
                b.sources || (a.levels ? (b.sources = a.levels, delete a.levels) : (e = {}, j(a, e, "file"), j(a, e, "type"), b.sources = e.file ? [e] : []));
                a.playlist = [new c(b)]
            }
        }

        function j(a, b, c) {
            e.exists(a[c]) && (b[c] = a[c], delete a[c])
        }
        var e = f.utils,
            c = f.playlist.item;
        (f.embed.config = function(d) {
            var b = {
                fallback: !0,
                height: 270,
                primary: "html5",
                width: 480,
                base: d.base ? d.base : e.getScriptPath("jwplayer.js")
            };
            d = e.extend(b, f.defaults, d);
            var b = {
                    type: "html5",
                    src: d.base + "jwplayer.html5.js"
                },
                c = {
                    type: "flash",
                    src: d.base + "jwplayer.flash.swf"
                };
            d.modes = "flash" == d.primary ? [c, b] : [b, c];
            d.listbar && (d.playlistsize = d.listbar.size, d.playlistposition = d.listbar.position);
            d.flashplayer && (c.src = d.flashplayer);
            d.html5player && (b.src = d.html5player);
            a(d);
            return d
        }).addConfig = function(d, b) {
            a(b);
            return e.extend(d, b)
        }
    }(jwplayer),
    function(f) {
        var a = f.utils,
            j = document;
        f.embed.download = function(e, c, d) {
            function b(a, b) {
                for (var d = j.querySelectorAll(a), c = 0; c < d.length; c++)
                    for (var g in b) d[c].style[g] = b[g]
            }

            function f(a, b, d) {
                a = j.createElement(a);
                b && (a.className = "jwdownload" + b);
                d && d.appendChild(a);
                return a
            }
            var h = a.extend({}, c),
                n, m = h.width ? h.width : 480,
                q = h.height ? h.height : 320,
                k;
            c = c.logo ? c.logo : {
                prefix: a.repo(),
                file: "logo.png",
                margin: 10
            };
            var g, r;
            r = h.playlist;
            var p, s, h = ["mp4", "aac", "mp3"];
            if (r && r.length) {
                p = r[0];
                s = p.sources;
                for (r = 0; r < s.length; r++) {
                    var u = s[r],
                        t = u.type ? u.type : a.extensionmap.extType(a.extension(u.file));
                    if (u.file)
                        for (r in h) t == h[r] ? (n = u.file, k = p.image) : a.isYouTube(u.file) && (g = u.file)
                }
                n ? (d = n, e && (n = f("a", "display", e), f("div", "icon",
                        n), f("div", "logo", n), d && n.setAttribute("href", a.getAbsolutePath(d))), d = "#" + e.id + " .jwdownload", e.style.width = "", e.style.height = "", b(d + "display", {
                        width: a.styleDimension(Math.max(320, m)),
                        height: a.styleDimension(Math.max(180, q)),
                        background: "black center no-repeat " + (k ? "url(" + k + ")" : ""),
                        backgroundSize: "contain",
                        position: "relative",
                        border: "none",
                        display: "block"
                    }), b(d + "display div", {
                        position: "absolute",
                        width: "100%",
                        height: "100%"
                    }), b(d + "logo", {
                        top: c.margin + "px",
                        right: c.margin + "px",
                        background: "top right no-repeat url(" +
                            c.prefix + c.file + ")"
                    }), b(d + "icon", {
                        background: "center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNrs28lqwkAYB/CZqNVDDj2r6FN41QeIy8Fe+gj6BL275Q08u9FbT8ZdwVfotSBYEPUkxFOoks4EKiJdaDuTjMn3wWBO0V/+sySR8SNSqVRKIR8qaXHkzlqS9jCfzzWcTCYp9hF5o+59sVjsiRzcegSckFzcjT+ruN80TeSlAjCAAXzdJSGPFXRpAAMYwACGZQkSdhG4WCzehMNhqV6vG6vVSrirKVEw66YoSqDb7cqlUilE8JjHd/y1MQefVzqdDmiaJpfLZWHgXMHn8F6vJ1cqlVAkEsGuAn83J4gAd2RZymQygX6/L1erVQt+9ZPWb+CDwcCC2zXGJaewl/DhcHhK3DVj+KfKZrMWvFarcYNLomAv4aPRSFZVlTlcSPA5fDweW/BoNIqFnKV53JvncjkLns/n/cLdS+92O7RYLLgsKfv9/t8XlDn4eDyiw+HA9Jyz2eyt0+kY2+3WFC5hluej0Ha7zQQq9PPwdDq1Et1sNsx/nFBgCqWJ8oAK1aUptNVqcYWewE4nahfU0YQnk4ntUEfGMIU2m01HoLaCKbTRaDgKtaVLk9tBYaBcE/6Artdr4RZ5TB6/dC+9iIe/WgAMYADDpAUJAxjAAAYwgGFZgoS/AtNNTF7Z2bL0BYPBV3Jw5xFwwWcYxgtBP5OkE8i9G7aWGOOCruvauwADALMLMEbKf4SdAAAAAElFTkSuQmCC)"
                    })) :
                    g ? (c = g, e = f("embed", "", e), e.src = "http://www.youtube.com/v/" + /v[=\/](\w*)|\/(\w+)$|^(\w+)$/i.exec(c).slice(1).join(""), e.type = "application/x-shockwave-flash", e.width = m, e.height = q) : d()
            }
        }
    }(jwplayer),
    function(f) {
        var a = f.utils,
            j = f.events,
            e = {};
        (f.embed.flash = function(c, d, b, l, h) {
            function n(a, b, d) {
                var c = document.createElement("param");
                c.setAttribute("name", b);
                c.setAttribute("value", d);
                a.appendChild(c)
            }

            function m(a, b, d) {
                return function() {
                    try {
                        d && document.getElementById(h.id + "_wrapper").appendChild(b);
                        var c =
                            document.getElementById(h.id).getPluginConfig("display");
                        "function" == typeof a.resize && a.resize(c.width, c.height);
                        b.style.left = c.x;
                        b.style.top = c.h
                    } catch (g) {}
                }
            }

            function q(b) {
                if (!b) return {};
                var d = {},
                    c = [],
                    g;
                for (g in b) {
                    var e = a.getPluginName(g),
                        f = b[g];
                    c.push(g);
                    for (var h in f) d[e + "." + h] = f[h]
                }
                d.plugins = c.join(",");
                return d
            }
            var k = new f.events.eventdispatcher,
                g = a.flashVersion();
            a.extend(this, k);
            this.embed = function() {
                b.id = h.id;
                if (10 > g) return k.sendEvent(j.ERROR, {
                    message: "Flash version must be 10.0 or greater"
                }), !1;
                var f, p = a.extend({}, b);
                c.id + "_wrapper" == c.parentNode.id ? document.getElementById(c.id + "_wrapper") : (f = document.createElement("div"), f.id = c.id + "_wrapper", f.style.position = "relative", f.style.width = a.styleDimension(p.width), f.style.height = a.styleDimension(p.height), c.parentNode.replaceChild(f, c), f.appendChild(c));
                f = l.setupPlugins(h, p, m);
                0 < f.length ? a.extend(p, q(f.plugins)) : delete p.plugins;
                "undefined" != typeof p["dock.position"] && "false" == p["dock.position"].toString().toLowerCase() && (p.dock = p["dock.position"],
                    delete p["dock.position"]);
                f = p.wmode ? p.wmode : p.height && 40 >= p.height ? "transparent" : "opaque";
                for (var s = "height width modes events primary base fallback volume".split(" "), u = 0; u < s.length; u++) delete p[s[u]];
                var s = a.getCookies(),
                    t;
                for (t in s) "undefined" == typeof p[t] && (p[t] = s[t]);
                t = window.location.pathname.split("/");
                t.splice(t.length - 1, 1);
                t = t.join("/");
                p.base = t + "/";
                e[c.id] = p;
                a.isIE() ? (p = '\x3cobject classid\x3d"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width\x3d"100%" height\x3d"100%" id\x3d"' + c.id +
                    '" name\x3d"' + c.id + '" tabindex\x3d0""\x3e', p += '\x3cparam name\x3d"movie" value\x3d"' + d.src + '"\x3e', p += '\x3cparam name\x3d"allowfullscreen" value\x3d"true"\x3e\x3cparam name\x3d"allowscriptaccess" value\x3d"always"\x3e', p += '\x3cparam name\x3d"seamlesstabbing" value\x3d"true"\x3e', p += '\x3cparam name\x3d"wmode" value\x3d"' + f + '"\x3e', p += '\x3cparam name\x3d"bgcolor" value\x3d"#000000"\x3e', p += "\x3c/object\x3e", c.outerHTML = p, p = document.getElementById(c.id)) : (p = document.createElement("object"), p.setAttribute("type",
                    "application/x-shockwave-flash"), p.setAttribute("data", d.src), p.setAttribute("width", "100%"), p.setAttribute("height", "100%"), p.setAttribute("bgcolor", "#000000"), p.setAttribute("id", c.id), p.setAttribute("name", c.id), p.setAttribute("tabindex", 0), n(p, "allowfullscreen", "true"), n(p, "allowscriptaccess", "always"), n(p, "seamlesstabbing", "true"), n(p, "wmode", f), c.parentNode.replaceChild(p, c));
                h.container = p;
                h.setPlayer(p, "flash")
            };
            this.supportsConfig = function() {
                if (g)
                    if (b) {
                        if ("string" == a.typeOf(b.playlist)) return !0;
                        try {
                            var d = b.playlist[0].sources;
                            if ("undefined" == typeof d) return !0;
                            for (var c = 0; c < d.length; c++) {
                                var f;
                                if (f = d[c].file) {
                                    var e = d[c].file,
                                        h = d[c].type;
                                    if (a.isYouTube(e) || a.isRtmp(e, h) || "hls" == h) f = !0;
                                    else {
                                        var j = a.extensionmap[h ? h : a.extension(e)];
                                        f = !j ? !1 : !!j.flash
                                    }
                                }
                                if (f) return !0
                            }
                        } catch (l) {}
                    } else return !0;
                return !1
            }
        }).getVars = function(a) {
            return e[a]
        }
    }(jwplayer),
    function(f) {
        var a = f.utils,
            j = a.extensionmap,
            e = f.events;
        f.embed.html5 = function(c, d, b, l, h) {
            function n(a, b, d) {
                return function() {
                    try {
                        var f = document.querySelector("#" +
                            c.id + " .jwmain");
                        d && f.appendChild(b);
                        "function" == typeof a.resize && (a.resize(f.clientWidth, f.clientHeight), setTimeout(function() {
                            a.resize(f.clientWidth, f.clientHeight)
                        }, 400));
                        b.left = f.style.left;
                        b.top = f.style.top
                    } catch (e) {}
                }
            }

            function m(a) {
                q.sendEvent(a.type, {
                    message: "HTML5 player not found"
                })
            }
            var q = this,
                k = new e.eventdispatcher;
            a.extend(q, k);
            q.embed = function() {
                if (f.html5) {
                    l.setupPlugins(h, b, n);
                    c.innerHTML = "";
                    var g = f.utils.extend({}, b);
                    delete g.volume;
                    g = new f.html5.player(g);
                    h.container = document.getElementById(h.id);
                    h.setPlayer(g, "html5")
                } else g = new a.scriptloader(d.src), g.addEventListener(e.ERROR, m), g.addEventListener(e.COMPLETE, q.embed), g.load()
            };
            q.supportsConfig = function() {
                if (f.vid.canPlayType) try {
                    if ("string" == a.typeOf(b.playlist)) return !0;
                    for (var d = b.playlist[0].sources, c = 0; c < d.length; c++) {
                        var e;
                        var h = d[c].file,
                            l = d[c].type;
                        if (null !== navigator.userAgent.match(/BlackBerry/i) || a.isAndroid() && ("m3u" == a.extension(h) || "m3u8" == a.extension(h)) || a.isRtmp(h, l)) e = !1;
                        else {
                            var k = j[l ? l : a.extension(h)],
                                m;
                            if (!k || k.flash &&
                                !k.html5) m = !1;
                            else {
                                var n = k.html5,
                                    q = f.vid;
                                if (n) try {
                                    m = q.canPlayType(n) ? !0 : !1
                                } catch (z) {
                                    m = !1
                                } else m = !0
                            }
                            e = m
                        }
                        if (e) return !0
                    }
                } catch (A) {}
                return !1
            }
        }
    }(jwplayer),
    function(f) {
        var a = f.embed,
            j = f.utils,
            e = j.extend(function(c) {
                var d = j.repo(),
                    b = c.config,
                    e = b.plugins,
                    h = b.analytics,
                    n = d + "jwpsrv.js",
                    m = d + "sharing.js",
                    q = d + "related.js",
                    k = d + "gapro.js",
                    g = (new f.utils.key(f.key)).edition(),
                    e = e ? e : {};
                "ads" == g && b.advertising && (b.advertising.client.match(".js$|.swf$") ? e[b.advertising.client] = b.advertising : e[d + b.advertising.client +
                    ("flash" == b.primary ? ".swf" : ".js")] = b.advertising);
                delete b.advertising;
                b.key = f.key;
                b.analytics && (b.analytics.client && b.analytics.client.match(".js$|.swf$")) && (n = b.analytics.client);
                delete b.analytics;
                if ("free" == g || !h || !1 !== h.enabled) e[n] = h ? h : {};
                delete e.sharing;
                delete e.related;
                if ("premium" == g || "ads" == g) b.sharing && (b.sharing.client && b.sharing.client.match(".js$|.swf$") && (m = b.sharing.client), e[m] = b.sharing), b.related && (b.related.client && b.related.client.match(".js$|.swf$") && (q = b.related.client), e[q] =
                    b.related), b.ga && (b.ga.client && b.ga.client.match(".js$|.swf$") && (k = b.ga.client), e[k] = b.ga), b.skin && (b.skin = b.skin.replace(/^(beelden|bekle|five|glow|modieus|roundster|stormtrooper|vapor)$/i, j.repo() + "skins/$1.xml").toLowerCase());
                b.plugins = e;
                return new a(c)
            }, a);
        f.embed = e
    }(jwplayer),
    function(f) {
        var a = [],
            j = f.utils,
            e = f.events,
            c = e.state,
            d = document,
            b = f.api = function(a) {
                function h(a, b) {
                    return function(d) {
                        return b(a, d)
                    }
                }

                function n(a, b) {
                    p[a] || (p[a] = [], q(e.JWPLAYER_PLAYER_STATE, function(b) {
                        var d = b.newstate;
                        b = b.oldstate;
                        if (d == a) {
                            var c = p[d];
                            if (c)
                                for (var e = 0; e < c.length; e++) "function" == typeof c[e] && c[e].call(this, {
                                    oldstate: b,
                                    newstate: d
                                })
                        }
                    }));
                    p[a].push(b);
                    return g
                }

                function m(a, b) {
                    try {
                        a.jwAddEventListener(b, 'function(dat) { jwplayer("' + g.id + '").dispatchEvent("' + b + '", dat); }')
                    } catch (d) {
                        j.log("Could not add internal listener")
                    }
                }

                function q(a, b) {
                    r[a] || (r[a] = [], s && u && m(s, a));
                    r[a].push(b);
                    return g
                }

                function k() {
                    if (u) {
                        for (var a = arguments[0], b = [], d = 1; d < arguments.length; d++) b.push(arguments[d]);
                        if ("undefined" != typeof s &&
                            "function" == typeof s[a]) switch (b.length) {
                            case 4:
                                return s[a](b[0], b[1], b[2], b[3]);
                            case 3:
                                return s[a](b[0], b[1], b[2]);
                            case 2:
                                return s[a](b[0], b[1]);
                            case 1:
                                return s[a](b[0]);
                            default:
                                return s[a]()
                        }
                        return null
                    }
                    t.push(arguments)
                }
                var g = this,
                    r = {},
                    p = {},
                    s = void 0,
                    u = !1,
                    t = [],
                    w = void 0,
                    x = {},
                    y = {};
                g.container = a;
                g.id = a.id;
                g.getBuffer = function() {
                    return k("jwGetBuffer")
                };
                g.getContainer = function() {
                    return g.container
                };
                g.addButton = function(a, b, d, c) {
                    try {
                        y[c] = d, k("jwDockAddButton", a, b, "jwplayer('" + g.id + "').callback('" + c +
                            "')", c)
                    } catch (e) {
                        j.log("Could not add dock button" + e.message)
                    }
                };
                g.removeButton = function(a) {
                    k("jwDockRemoveButton", a)
                };
                g.callback = function(a) {
                    if (y[a]) y[a]()
                };
                g.getDuration = function() {
                    return k("jwGetDuration")
                };
                g.getFullscreen = function() {
                    return k("jwGetFullscreen")
                };
                g.getStretching = function() {
                    return k("jwGetStretching")
                };
                g.getHeight = function() {
                    return k("jwGetHeight")
                };
                g.getLockState = function() {
                    return k("jwGetLockState")
                };
                g.getMeta = function() {
                    return g.getItemMeta()
                };
                g.getMute = function() {
                    return k("jwGetMute")
                };
                g.getPlaylist = function() {
                    var a = k("jwGetPlaylist");
                    "flash" == g.renderingMode && j.deepReplaceKeyName(a, ["__dot__", "__spc__", "__dsh__"], [".", " ", "-"]);
                    for (var b = 0; b < a.length; b++) j.exists(a[b].index) || (a[b].index = b);
                    return a
                };
                g.getPlaylistItem = function(a) {
                    j.exists(a) || (a = g.getCurrentItem());
                    return g.getPlaylist()[a]
                };
                g.getPosition = function() {
                    return k("jwGetPosition")
                };
                g.getRenderingMode = function() {
                    return g.renderingMode
                };
                g.getState = function() {
                    return k("jwGetState")
                };
                g.getVolume = function() {
                    return k("jwGetVolume")
                };
                g.getWidth = function() {
                    return k("jwGetWidth")
                };
                g.setFullscreen = function(a) {
                    j.exists(a) ? k("jwSetFullscreen", a) : k("jwSetFullscreen", !k("jwGetFullscreen"));
                    return g
                };
                g.setStretching = function(a) {
                    k("jwSetStretching", a);
                    return g
                };
                g.setMute = function(a) {
                    j.exists(a) ? k("jwSetMute", a) : k("jwSetMute", !k("jwGetMute"));
                    return g
                };
                g.lock = function() {
                    return g
                };
                g.unlock = function() {
                    return g
                };
                g.load = function(a) {
                    k("jwLoad", a);
                    return g
                };
                g.playlistItem = function(a) {
                    k("jwPlaylistItem", parseInt(a));
                    return g
                };
                g.playlistPrev = function() {
                    k("jwPlaylistPrev");
                    return g
                };
                g.playlistNext = function() {
                    k("jwPlaylistNext");
                    return g
                };
                g.resize = function(a, b) {
                    if ("flash" != g.renderingMode) k("jwResize", a, b);
                    else {
                        var c = d.getElementById(g.id + "_wrapper");
                        c && (c.style.width = j.styleDimension(a), c.style.height = j.styleDimension(b))
                    }
                    return g
                };
                g.play = function(a) {
                    "undefined" == typeof a ? (a = g.getState(), a == c.PLAYING || a == c.BUFFERING ? k("jwPause") : k("jwPlay")) : k("jwPlay", a);
                    return g
                };
                g.pause = function(a) {
                    "undefined" == typeof a ? (a = g.getState(), a == c.PLAYING || a == c.BUFFERING ? k("jwPause") : k("jwPlay")) :
                        k("jwPause", a);
                    return g
                };
                g.stop = function() {
                    k("jwStop");
                    return g
                };
                g.seek = function(a) {
                    k("jwSeek", a);
                    return g
                };
                g.setVolume = function(a) {
                    k("jwSetVolume", a);
                    return g
                };
                g.loadInstream = function(a, d) {
                    return w = new b.instream(this, s, a, d)
                };
                g.getQualityLevels = function() {
                    return k("jwGetQualityLevels")
                };
                g.getCurrentQuality = function() {
                    return k("jwGetCurrentQuality")
                };
                g.setCurrentQuality = function(a) {
                    k("jwSetCurrentQuality", a)
                };
                g.getCaptionsList = function() {
                    return k("jwGetCaptionsList")
                };
                g.getCurrentCaptions = function() {
                    return k("jwGetCurrentCaptions")
                };
                g.setCurrentCaptions = function(a) {
                    k("jwSetCurrentCaptions", a)
                };
                g.getControls = function() {
                    return k("jwGetControls")
                };
                g.getSafeRegion = function() {
                    return k("jwGetSafeRegion")
                };
                g.setControls = function(a) {
                    k("jwSetControls", a)
                };
                g.destroyPlayer = function() {
                    k("jwPlayerDestroy")
                };
                var z = {
                    onBufferChange: e.JWPLAYER_MEDIA_BUFFER,
                    onBufferFull: e.JWPLAYER_MEDIA_BUFFER_FULL,
                    onError: e.JWPLAYER_ERROR,
                    onFullscreen: e.JWPLAYER_FULLSCREEN,
                    onMeta: e.JWPLAYER_MEDIA_META,
                    onMute: e.JWPLAYER_MEDIA_MUTE,
                    onPlaylist: e.JWPLAYER_PLAYLIST_LOADED,
                    onPlaylistItem: e.JWPLAYER_PLAYLIST_ITEM,
                    onPlaylistComplete: e.JWPLAYER_PLAYLIST_COMPLETE,
                    onReady: e.API_READY,
                    onResize: e.JWPLAYER_RESIZE,
                    onComplete: e.JWPLAYER_MEDIA_COMPLETE,
                    onSeek: e.JWPLAYER_MEDIA_SEEK,
                    onTime: e.JWPLAYER_MEDIA_TIME,
                    onVolume: e.JWPLAYER_MEDIA_VOLUME,
                    onBeforePlay: e.JWPLAYER_MEDIA_BEFOREPLAY,
                    onBeforeComplete: e.JWPLAYER_MEDIA_BEFORECOMPLETE,
                    onDisplayClick: e.JWPLAYER_DISPLAY_CLICK,
                    onControls: e.JWPLAYER_CONTROLS,
                    onQualityLevels: e.JWPLAYER_MEDIA_LEVELS,
                    onQualityChange: e.JWPLAYER_MEDIA_LEVEL_CHANGED,
                    onCaptionsList: e.JWPLAYER_CAPTIONS_LIST,
                    onCaptionsChange: e.JWPLAYER_CAPTIONS_CHANGED
                };
                j.foreach(z, function(a) {
                    g[a] = h(z[a], q)
                });
                var A = {
                    onBuffer: c.BUFFERING,
                    onPause: c.PAUSED,
                    onPlay: c.PLAYING,
                    onIdle: c.IDLE
                };
                j.foreach(A, function(a) {
                    g[a] = h(A[a], n)
                });
                g.remove = function() {
                    if (!u) throw "Cannot call remove() before player is ready";
                    t = [];
                    b.destroyPlayer(this.id)
                };
                g.setup = function(a) {
                    if (f.embed) {
                        var c = d.getElementById(g.id);
                        c && (a.fallbackDiv = c);
                        c = g;
                        t = [];
                        b.destroyPlayer(c.id);
                        c = f(g.id);
                        c.config = a;
                        return new f.embed(c)
                    }
                    return g
                };
                g.registerPlugin = function(a, b, d, c) {
                    f.plugins.registerPlugin(a, b, d, c)
                };
                g.setPlayer = function(a, b) {
                    s = a;
                    g.renderingMode = b
                };
                g.detachMedia = function() {
                    if ("html5" == g.renderingMode) return k("jwDetachMedia")
                };
                g.attachMedia = function() {
                    if ("html5" == g.renderingMode) return k("jwAttachMedia")
                };
                g.dispatchEvent = function(a, b) {
                    if (r[a])
                        for (var d = j.translateEventResponse(a, b), c = 0; c < r[a].length; c++) "function" == typeof r[a][c] && r[a][c].call(this, d)
                };
                g.dispatchInstreamEvent = function(a) {
                    w && w.dispatchEvent(a, arguments)
                };
                g.playerReady =
                    function(a) {
                        u = !0;
                        s || g.setPlayer(d.getElementById(a.id));
                        g.container = d.getElementById(g.id);
                        j.foreach(r, function(a) {
                            m(s, a)
                        });
                        q(e.JWPLAYER_PLAYLIST_ITEM, function() {
                            x = {}
                        });
                        q(e.JWPLAYER_MEDIA_META, function(a) {
                            j.extend(x, a.metadata)
                        });
                        for (g.dispatchEvent(e.API_READY); 0 < t.length;) k.apply(this, t.shift())
                    };
                g.getItemMeta = function() {
                    return x
                };
                g.getCurrentItem = function() {
                    return k("jwGetPlaylistIndex")
                };
                return g
            };
        b.selectPlayer = function(c) {
            var e;
            j.exists(c) || (c = 0);
            c.nodeType ? e = c : "string" == typeof c && (e = d.getElementById(c));
            return e ? (c = b.playerById(e.id)) ? c : b.addPlayer(new b(e)) : "number" == typeof c ? a[c] : null
        };
        b.playerById = function(b) {
            for (var c = 0; c < a.length; c++)
                if (a[c].id == b) return a[c];
            return null
        };
        b.addPlayer = function(b) {
            for (var c = 0; c < a.length; c++)
                if (a[c] == b) return b;
            a.push(b);
            return b
        };
        b.destroyPlayer = function(b) {
            for (var c = -1, e, f = 0; f < a.length; f++) a[f].id == b && (c = f, e = a[f]);
            0 <= c && (b = e.id, f = d.getElementById(b + ("flash" == e.renderingMode ? "_wrapper" : "")), j.clearCss && j.clearCss("#" + b), f && ("html5" == e.renderingMode && e.destroyPlayer(),
                e = d.createElement("div"), e.id = b, f.parentNode.replaceChild(e, f)), a.splice(c, 1));
            return null
        };
        f.playerReady = function(a) {
            var b = f.api.playerById(a.id);
            b ? b.playerReady(a) : f.api.selectPlayer(a.id).playerReady(a)
        }
    }(jwplayer),
    function(f) {
        var a = f.events,
            j = f.utils,
            e = a.state;
        f.api.instream = function(c, d, b, f) {
            function h(a, b) {
                k[a] || (k[a] = [], q.jwInstreamAddEventListener(a, 'function(dat) { jwplayer("' + m.id + '").dispatchInstreamEvent("' + a + '", dat); }'));
                k[a].push(b);
                return this
            }

            function n(b, c) {
                g[b] || (g[b] = [], h(a.JWPLAYER_PLAYER_STATE,
                    function(a) {
                        var c = a.newstate,
                            d = a.oldstate;
                        if (c == b) {
                            var e = g[c];
                            if (e)
                                for (var f = 0; f < e.length; f++) "function" == typeof e[f] && e[f].call(this, {
                                    oldstate: d,
                                    newstate: c,
                                    type: a.type
                                })
                        }
                    }));
                g[b].push(c);
                return this
            }
            var m = c,
                q = d,
                k = {},
                g = {};
            this.dispatchEvent = function(a, b) {
                if (k[a])
                    for (var c = j.translateEventResponse(a, b[1]), d = 0; d < k[a].length; d++) "function" == typeof k[a][d] && k[a][d].call(this, c)
            };
            this.onError = function(b) {
                return h(a.JWPLAYER_ERROR, b)
            };
            this.onFullscreen = function(b) {
                return h(a.JWPLAYER_FULLSCREEN, b)
            };
            this.onMeta =
                function(b) {
                    return h(a.JWPLAYER_MEDIA_META, b)
                };
            this.onMute = function(b) {
                return h(a.JWPLAYER_MEDIA_MUTE, b)
            };
            this.onComplete = function(b) {
                return h(a.JWPLAYER_MEDIA_COMPLETE, b)
            };
            this.onSeek = function(b) {
                return h(a.JWPLAYER_MEDIA_SEEK, b)
            };
            this.onTime = function(b) {
                return h(a.JWPLAYER_MEDIA_TIME, b)
            };
            this.onVolume = function(b) {
                return h(a.JWPLAYER_MEDIA_VOLUME, b)
            };
            this.onBuffer = function(a) {
                return n(e.BUFFERING, a)
            };
            this.onPause = function(a) {
                return n(e.PAUSED, a)
            };
            this.onPlay = function(a) {
                return n(e.PLAYING, a)
            };
            this.onIdle =
                function(a) {
                    return n(e.IDLE, a)
                };
            this.onInstreamClick = function(b) {
                return h(a.JWPLAYER_INSTREAM_CLICK, b)
            };
            this.onInstreamDestroyed = function(b) {
                return h(a.JWPLAYER_INSTREAM_DESTROYED, b)
            };
            this.play = function(a) {
                q.jwInstreamPlay(a)
            };
            this.pause = function(a) {
                q.jwInstreamPause(a)
            };
            this.seek = function(a) {
                q.jwInstreamSeek(a)
            };
            this.destroy = function() {
                q.jwInstreamDestroy()
            };
            this.getState = function() {
                return q.jwInstreamGetState()
            };
            this.getDuration = function() {
                return q.jwInstreamGetDuration()
            };
            this.getPosition = function() {
                return q.jwInstreamGetPosition()
            };
            m.callInternal("jwLoadInstream", b, f)
        }
    }(jwplayer),
    function(f) {
        var a = f.api,
            j = a.selectPlayer;
        a.selectPlayer = function(a) {
            return (a = j(a)) ? a : {
                registerPlugin: function(a, d, b) {
                    f.plugins.registerPlugin(a, d, b)
                }
            }
        }
    }(jwplayer));