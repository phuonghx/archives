//>>built
define("xstyle/css", ["require"], function (g) {
    function h(a, b, d) { var e = document.documentElement; a = e.insertBefore(document.createElement(a), e.firstChild); a.id = b; b = (a.currentStyle || getComputedStyle(a, null))[d]; e.removeChild(a); return b } return {
        load: function (a, b, d, e) {
            function f() { 
                var a = h("x-parse", null, "content"); 
                // a && "none" != a ? b([eval(a)], d) : d()
                a && "none" != a && "normal" !=a ? b([eval(a)], d) : d()
            } 
            var k = b.toUrl(a), c = b.cache["url:" + k]; if (c) return c.xCss && (c = c.cssText), g(["./util/createStyleSheet"], function (a) { a(c) }), f(); if ("none" == h("div", a.replace(/\//g, "-").replace(/\..*/,
                "") + "-loaded", "display")) return f(); g(["./load-css"], function (a) { a(k, f) })
        }
    }
});