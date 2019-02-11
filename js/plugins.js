// JavaScript Document
/*=============================================================================
    env

    page-scroll-to-id-maste
    imgLiquid-min
    ParallaxScroll

=============================================================================*/

/* =======================================================================
    * Judge the screen size increase class
=========================================================================*/

(function() {
        var env = (function () {
        var ua = navigator.userAgent.toLowerCase(),
        regex = {
            windows: /windows|win(ce|16|32|64)|pocket pc/,
            macintosh: /macintosh|powerpc/,
            linux: /linux/,
            freebsd: /freebsd/,
            openbsd: /openbsd/,
            symbos: /symbos/,
            ios: /ios|iphone|ipad|ipod/,
            android: /android/,
            blackBerry: /blackBerry/,
            iphone: /iphone/,
            ipad: /ipad/,
            ipod: /ipod/,
            desktop: /windows|win32|linux|macintosh|powerpc|freebsd|openbsd/,
            mobile: /ios|iphone|ipad|ipod|android|iemobile|blackberry/,
        },
        os = {
            windows: regex.windows.test(ua),
            macintosh: regex.macintosh.test(ua),
            linux: regex.linux.test(ua),
            freebsd: regex.freebsd.test(ua),
            openbsd: regex.openbsd.test(ua),
            symbos: regex.symbos.test(ua),
            ios: regex.ios.test(ua),
            android: regex.android.test(ua),
            blackBerry: regex.blackBerry.test(ua)
        },
        device = {
            iphone: regex.iphone.test(ua),
            ipad: regex.ipad.test(ua),
            ipod: regex.ipod.test(ua),
            desktop: regex.desktop.test(ua),
            tablet: regex.mobile.test(ua),
            mobile: regex.mobile.test(ua)
        },
        browser = (function () {
            var NO_MATCHED,
                KUNOW_VERSION = -1,
                toVersion = function (version) {
                    return parseFloat(String(version || '').replace(/(\.)/g, function (matched) {
                        matched = !arguments.callee.replaced ? matched : '';
                        arguments.callee.replaced = true;
                        return matched;
                    }));
                },
                map = (function () {
                    var info = {
                        mozilla: /mozilla/.test(ua),
                        webkit: /webkit/.test(ua),
                        gecko: /gecko/.test(ua),
                        safari: /safari/.test(ua),
                        chrome: /chrome/.test(ua),
                        crios: /crios/.test(ua),
                        firefox: /firefox/.test(ua),
                        opera: /opera|opr\//.test(ua),
                        konqueror: /konqueror/.test(ua),
                        edge: /edge/.test(ua),
                        msie: (function () {
                            var matches, version = NO_MATCHED;

                            if (/msie/.test(ua)) {
                                version = KUNOW_VERSION;
                                if ((matches = ua.match(/msie ([\w.]+)/))) {
                                    version = matches[1];
                                }
                            }

                            if ((matches = ua.match(/trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/))) {
                                if (/netscape/.test(navigator.appName.toLowerCase())) {
                                    version = matches[1];
                                }
                            }

                            if (version !== NO_MATCHED) {
                                version = toVersion(version);
                            }

                            return version;
                        }()),
                        android: (function () {
                            var matches,
                                version = NO_MATCHED,
                                parse = function () {
                                    version = KUNOW_VERSION;
                                    if ((matches = ua.match(/(?:android)[ \/]([\w.]+)/))) {
                                        version = matches[1];
                                    }
                                };

                            if (/android/.test(ua)) {
                                if (/android .+ version[ \/][\w\.]+/.test(ua)) {
                                    parse();
                                }
                                else if ((matches = ua.match(/\(khtml, like gecko\) (\w+)[ \/][\w\.]+ chrome[ \/]/))) {
                                    parse();
                                }
                            }

                            if (version !== NO_MATCHED) {
                                version = toVersion(version);
                            }

                            return version;
                        }())
                    };

                    // Some exceptions
                    info.webkit = info.webkit && !info.edge;
                    info.safari = info.safari && !info.chrome && !info.crios && !info.android && !info.opera && !info.edge;
                    info.chrome = (info.chrome || info.crios) && !info.android && !info.opera && !info.edge;
                    info.chromium = !!info.android;
                    info.ms = info.edge || info.msie;

                    return info;
                }());

            // Version
            for (var name in map) {
                var browser = map[name];

                map[name] = typeof browser === 'number' ? browser : NO_MATCHED;

                if (browser === true) {
                    var matches,
                        patterns = {
                            mozilla: /mozilla[ \/]([\w.]+)/,
                            webkit: /webkit[ \/]([\w.]+)/,
                            gecko: /gecko[ \/]([\w.]+)/,
                            safari: /version[ \/]([\w.]+).*safari/,
                            chrome: /(?:chrome|crios)[ \/]([\w.]+)/,
                            chromium: /(?:chrome|crios)[ \/]([\w.]+)/,
                            crios: /crios[ \/]([\w.]+)/,
                            firefox: /firefox[ \/]([\w.]+)/,
                            opera: /(?:opera|opr)(?:.*version)?[ \/]([\w.]+)/,
                            android: /(?:android)[ \/]([\w.]+)/,
                            konqueror: /konqueror[ \/]([\w.]+)/,
                            edge: /edge[ \/]([\w.]+)/
                        };

                    map[name] = KUNOW_VERSION;
                    if (patterns[name] && (matches = ua.match(patterns[name]))) {
                        map[name] = matches[1];
                    }
                }

                if (map[name] !== NO_MATCHED) {
                    map[name] = toVersion(map[name]);
                }
            }

            return map;
        }());
    return {
        ua: ua,
        os: os,
        device: device,
        browser: browser
    };
}());

var ieVer = env.browser.msie
    ,safariVer = env.browser.safari
    ,_misLower10 = ( ieVer != undefined && ieVer < 9 )  //ie < 9
    ,_safariLower9 = ( safariVer != undefined && safariVer < 9 )  //safari < 9
    ;

    if ( _misLower10 == true )
        alert("您的瀏覽器版本為 IE " + env.browser.msie + " ,請把瀏覽器更新為 IE 10 或以上，或使用其它瀏覽器，以確保購物安全與網站品質，謝謝" );


    // console.log(env);

    $(function() {
        $(window).resize((function() {
            var root = $('html'),
                msie = 'msie',
                clientWidth = $(window).width(),
                clientHeight = $(window).height()
            forcePcVersion = true;

            $.each($.extend({}, env.os, env.device, env.browser), function(name, value) {
                value && root.addClass(name);
                if (value === msie) {
                    root.addClass(msie + env.browser.version);
                }
            });

            if (env.device.mobile || forcePcVersion) {
                root.toggleClass('min-sm-size', clientWidth >= 768);
				root.toggleClass('min-md-size', clientWidth >= 1000);
				root.toggleClass('min-lg-size', clientWidth >= 1200);
                root.toggleClass('min-xl-size', clientWidth >= 1408);
                root.toggleClass('min-bl-size', clientWidth >= 1558);

                root.toggleClass('max-xs-size', clientWidth <= 480);
				root.toggleClass('max-sm-size', clientWidth <= 767);
				root.toggleClass('max-md-size', clientWidth <= 999);
				root.toggleClass('max-lg-size', clientWidth <= 1199);
                root.toggleClass('max-xl-size', clientWidth <= 1407);
                root.toggleClass('max-bl-size', clientWidth <= 1557);
            }

            return arguments.callee;
        }()));
    });
}());

/*=======================================================================
     *  page-scroll-to-id-maste
==========================================================================*/

/*
 * jQuery hashchange event, v1.4, 2013-11-29
 * https://github.com/georgekosmidis/jquery-hashchange
 */
(function(e,t,n){"$:nomunge";function f(e){e=e||location.href;return"#"+e.replace(/^[^#]*#?(.*)$/,"$1")}var r="hashchange",i=document,s,o=e.event.special,u=i.documentMode,a="on"+r in t&&(u===n||u>7);e.fn[r]=function(e){return e?this.bind(r,e):this.trigger(r)};e.fn[r].delay=50;o[r]=e.extend(o[r],{setup:function(){if(a){return false}e(s.start)},teardown:function(){if(a){return false}e(s.stop)}});s=function(){function p(){var n=f(),i=h(u);if(n!==u){c(u=n,i);e(t).trigger(r)}else if(i!==u){location.href=location.href.replace(/#.*/,"")+i}o=setTimeout(p,e.fn[r].delay)}var s={},o,u=f(),l=function(e){return e},c=l,h=l;s.start=function(){o||p()};s.stop=function(){o&&clearTimeout(o);o=n};var d=function(){var e,t=3,n=document.createElement("div"),r=n.getElementsByTagName("i");while(n.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->",r[0]);return t>4?t:e}();d&&!a&&function(){var t,n;s.start=function(){if(!t){n=e.fn[r].src;n=n&&n+f();t=e('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){n||c(f());p()}).attr("src",n||"javascript:0").insertAfter("body")[0].contentWindow;i.onpropertychange=function(){try{if(event.propertyName==="title"){t.document.title=i.title}}catch(e){}}}};s.stop=l;h=function(){return f(t.location.href)};c=function(n,s){var o=t.document,u=e.fn[r].domain;if(n!==s){o.title=i.title;o.open();u&&o.write('<script>document.domain="'+u+'"</script>');o.close();t.location.hash=n}}}();return s}()})(jQuery,this)


/* == Page scroll to id == Version: 1.5.7, License: MIT License (MIT) */
!function(e,t,a){var l,n,s,i,o,r,c,u,h,g,f,d,p="mPageScroll2id",_="mPS2id",C=".m_PageScroll2id,a[rel~='m_PageScroll2id'],.page-scroll-to-id,a[rel~='page-scroll-to-id'],._ps2id",v={scrollSpeed:1e3,autoScrollSpeed:!0,scrollEasing:"easeInOutQuint",scrollingEasing:"easeOutQuint",pageEndSmoothScroll:!0,layout:"vertical",offset:0,highlightSelector:!1,clickedClass:_+"-clicked",targetClass:_+"-target",highlightClass:_+"-highlight",forceSingleHighlight:!1,keepHighlightUntilNext:!1,highlightByNextTarget:!1,disablePluginBelow:!1,clickEvents:!0,appendHash:!1,onStart:function(){},onComplete:function(){},defaultSelector:!1,live:!0,liveSelector:!1},m=0,S={init:function(r){var r=e.extend(!0,{},v,r);if(e(a).data(_,r),n=e(a).data(_),!this.selector){var c="__"+_;this.each(function(){var t=e(this);t.hasClass(c)||t.addClass(c)}),this.selector="."+c}n.liveSelector&&(this.selector+=","+n.liveSelector),l=l?l+","+this.selector:this.selector,n.defaultSelector&&("object"==typeof e(l)&&0!==e(l).length||(l=C)),n.clickEvents&&e(a).undelegate("."+_).delegate(l,"click."+_,function(t){if(I._isDisabled.call(null))return void I._removeClasses.call(null);var a=e(this),l=a.attr("href"),n=a.prop("href");l&&-1!==l.indexOf("#/")||(I._reset.call(null),g=a.data("ps2id-offset")||0,I._isValid.call(null,l,n)&&I._findTarget.call(null,l)&&(t.preventDefault(),i="selector",o=a,I._setClasses.call(null,!0),I._scrollTo.call(null)))}),e(t).unbind("."+_).bind("scroll."+_+" resize."+_,function(){if(I._isDisabled.call(null))return void I._removeClasses.call(null);var t=e("._"+_+"-t");t.each(function(a){var l=e(this),n=l.attr("id"),s=I._findHighlight.call(null,n);I._setClasses.call(null,!1,l,s),a==t.length-1&&I._extendClasses.call(null)})}),s=!0,I._setup.call(null),I._live.call(null)},scrollTo:function(t,a){if(I._isDisabled.call(null))return void I._removeClasses.call(null);if(t&&"undefined"!=typeof t){I._isInit.call(null);var l={layout:n.layout,offset:n.offset,clicked:!1},a=e.extend(!0,{},l,a);I._reset.call(null),u=a.layout,h=a.offset,t=-1!==t.indexOf("#")?t:"#"+t,I._isValid.call(null,t)&&I._findTarget.call(null,t)&&(i="scrollTo",o=a.clicked,o&&I._setClasses.call(null,!0),I._scrollTo.call(null))}},destroy:function(){e(t).unbind("."+_),e(a).undelegate("."+_).removeData(_),e("._"+_+"-t").removeData(_),I._removeClasses.call(null,!0)}},I={_isDisabled:function(){var e=t,l="inner",s=n.disablePluginBelow instanceof Array?[n.disablePluginBelow[0]||0,n.disablePluginBelow[1]||0]:[n.disablePluginBelow||0,0];return"innerWidth"in t||(l="client",e=a.documentElement||a.body),e[l+"Width"]<=s[0]||e[l+"Height"]<=s[1]},_isValid:function(e,a){if(e){a=a?a:e;var l=-1!==a.indexOf("#/")?a.split("#/")[0]:a.split("#")[0],n=t.location.toString().split("#")[0];return"#"!==e&&-1!==e.indexOf("#")&&(""===l||l===n)}},_setup:function(){var t=I._highlightSelector(),a=1,l=0;return e(t).each(function(){var s=e(this),i=s.attr("href"),o=s.prop("href");if(I._isValid.call(null,i,o)){var r=-1!==i.indexOf("#/")?i.split("#/")[1]:i.split("#")[1],c=e("#"+r);if(c.length>0){n.highlightByNextTarget&&c!==l&&(l?l.data(_,{tn:c}):c.data(_,{tn:"0"}),l=c),c.hasClass("_"+_+"-t")||c.addClass("_"+_+"-t"),c.data(_,{i:a}),s.hasClass("_"+_+"-h")||s.addClass("_"+_+"-h");var u=I._findHighlight.call(null,r);I._setClasses.call(null,!1,c,u),m=a,a++,a==e(t).length&&I._extendClasses.call(null)}}})},_highlightSelector:function(){return n.highlightSelector&&""!==n.highlightSelector?n.highlightSelector:l},_findTarget:function(t){var a=-1!==t.indexOf("#/")?t.split("#/")[1]:t.split("#")[1],l=e("#"+a);if(l.length<1||"fixed"===l.css("position")){if("top"!==a)return;l=e("body")}return r=l,u||(u=n.layout),h=I._setOffset.call(null),c=[(l.offset().top-h[0]).toString(),(l.offset().left-h[1]).toString()],c[0]=c[0]<0?0:c[0],c[1]=c[1]<0?0:c[1],c},_setOffset:function(){h||(h=n.offset?n.offset:0),g&&(h=g);var t,a,l,s;switch(typeof h){case"object":case"string":t=[h.y?h.y:h,h.x?h.x:h],a=[t[0]instanceof jQuery?t[0]:e(t[0]),t[1]instanceof jQuery?t[1]:e(t[1])],a[0].length>0?(l=a[0].height(),"fixed"===a[0].css("position")&&(l+=a[0][0].offsetTop)):l=!isNaN(parseFloat(t[0]))&&isFinite(t[0])?parseInt(t[0]):0,a[1].length>0?(s=a[1].width(),"fixed"===a[1].css("position")&&(s+=a[1][0].offsetLeft)):s=!isNaN(parseFloat(t[1]))&&isFinite(t[1])?parseInt(t[1]):0;break;case"function":t=h.call(null),t instanceof Array?(l=t[0],s=t[1]):l=s=t;break;default:l=s=parseInt(h)}return[l,s]},_findHighlight:function(a){var l=t.location,n=l.toString().split("#")[0],s=l.pathname;return e("._"+_+"-h[href='#"+a+"'],._"+_+"-h[href='"+n+"#"+a+"'],._"+_+"-h[href='"+s+"#"+a+"'],._"+_+"-h[href='#/"+a+"'],._"+_+"-h[href='"+n+"#/"+a+"'],._"+_+"-h[href='"+s+"#/"+a+"']")},_setClasses:function(t,a,l){var s=n.clickedClass,i=n.targetClass,r=n.highlightClass;t&&s&&""!==s?(e("."+s).removeClass(s),o.addClass(s)):a&&i&&""!==i&&l&&r&&""!==r&&(I._currentTarget.call(null,a)?(a.addClass(i),l.addClass(r)):(!n.keepHighlightUntilNext||e("."+r).length>1)&&(a.removeClass(i),l.removeClass(r)))},_extendClasses:function(){var t=n.targetClass,a=n.highlightClass,l=e("."+t),s=e("."+a),i=t+"-first",o=t+"-last",r=a+"-first",c=a+"-last";e("._"+_+"-t").removeClass(i+" "+o),e("._"+_+"-h").removeClass(r+" "+c),n.forceSingleHighlight?n.keepHighlightUntilNext&&l.length>1?(l.slice(0,1).removeClass(t),s.slice(0,1).removeClass(a)):(l.slice(1).removeClass(t),s.slice(1).removeClass(a)):(l.slice(0,1).addClass(i).end().slice(-1).addClass(o),s.slice(0,1).addClass(r).end().slice(-1).addClass(c))},_removeClasses:function(t){e("."+n.clickedClass).removeClass(n.clickedClass),e("."+n.targetClass).removeClass(n.targetClass+" "+n.targetClass+"-first "+n.targetClass+"-last"),e("."+n.highlightClass).removeClass(n.highlightClass+" "+n.highlightClass+"-first "+n.highlightClass+"-last"),t&&(e("._"+_+"-t").removeClass("_"+_+"-t"),e("._"+_+"-h").removeClass("_"+_+"-h"))},_currentTarget:function(a){var l=n["target_"+a.data(_).i],s=a.data("ps2id-target"),i=s&&e(s)[0]?e(s)[0].getBoundingClientRect():a[0].getBoundingClientRect();if("undefined"!=typeof l){var o=a.offset().top,r=a.offset().left,c=l.from?l.from+o:o,u=l.to?l.to+o:o,h=l.fromX?l.fromX+r:r,g=l.toX?l.toX+r:r;return i.top>=u&&i.top<=c&&i.left>=g&&i.left<=h}var f=e(t).height(),d=e(t).width(),p=s?e(s).height():a.height(),C=s?e(s).width():a.width(),v=1+p/f,m=v,S=f>p?v*(f/p):v,I=1+C/d,O=I,M=d>C?I*(d/C):I,b=[i.top<=f/m,i.bottom>=f/S,i.left<=d/O,i.right>=d/M];if(n.highlightByNextTarget){var y=a.data(_).tn;if(y){var w=y[0].getBoundingClientRect();"vertical"===n.layout?b=[i.top<=f/2,w.top>f/2,1,1]:"horizontal"===n.layout&&(b=[1,1,i.left<=d/2,w.left>d/2])}}return b[0]&&b[1]&&b[2]&&b[3]},_scrollTo:function(){d=I._scrollSpeed.call(null),c=n.pageEndSmoothScroll?I._pageEndSmoothScroll.call(null):c;var a=e("html,body"),l=n.autoScrollSpeed?I._autoScrollSpeed.call(null):d,s=a.is(":animated")?n.scrollingEasing:n.scrollEasing,i=e(t).scrollTop(),o=e(t).scrollLeft();switch(u){case"horizontal":o!=c[1]&&(I._callbacks.call(null,"onStart"),a.stop().animate({scrollLeft:c[1]},l,s).promise().then(function(){I._callbacks.call(null,"onComplete")}));break;case"auto":if(i!=c[0]||o!=c[1])if(I._callbacks.call(null,"onStart"),navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)){var r;a.stop().animate({pageYOffset:c[0],pageXOffset:c[1]},{duration:l,easing:s,step:function(e,a){"pageXOffset"==a.prop?r=e:"pageYOffset"==a.prop&&t.scrollTo(r,e)}}).promise().then(function(){I._callbacks.call(null,"onComplete")})}else a.stop().animate({scrollTop:c[0],scrollLeft:c[1]},l,s).promise().then(function(){I._callbacks.call(null,"onComplete")});break;default:i!=c[0]&&(I._callbacks.call(null,"onStart"),a.stop().animate({scrollTop:c[0]},l,s).promise().then(function(){I._callbacks.call(null,"onComplete")}))}},_pageEndSmoothScroll:function(){var l=e(a).height(),n=e(a).width(),s=e(t).height(),i=e(t).width();return[l-c[0]<s?l-s:c[0],n-c[1]<i?n-i:c[1]]},_scrollSpeed:function(){var t=n.scrollSpeed;return o&&o.length&&o.add(o.parent()).each(function(){var a=e(this);if(a.attr("class")){var l=a.attr("class").split(" ");for(var n in l)if(String(l[n]).match(/^ps2id-speed-\d+$/)){t=l[n].split("ps2id-speed-")[1];break}}}),parseInt(t)},_autoScrollSpeed:function(){var l=e(t).scrollTop(),n=e(t).scrollLeft(),s=e(a).height(),i=e(a).width(),o=[d+d*Math.floor(Math.abs(c[0]-l)/s*100)/100,d+d*Math.floor(Math.abs(c[1]-n)/i*100)/100];return Math.max.apply(Math,o)},_callbacks:function(e){if(n)switch(this[_]={trigger:i,clicked:o,target:r,scrollTo:{y:c[0],x:c[1]}},e){case"onStart":if(n.appendHash&&t.history&&t.history.pushState&&o&&o.length){var a="#"+o.attr("href").split("#")[1];a!==t.location.hash&&history.pushState("","",a)}n.onStart.call(null,this[_]);break;case"onComplete":n.onComplete.call(null,this[_])}},_reset:function(){u=h=g=!1},_isInit:function(){s||S.init.apply(this)},_live:function(){f=setTimeout(function(){n.live?e(I._highlightSelector()).length!==m&&I._setup.call(null):f&&clearTimeout(f),I._live.call(null)},1e3)},_easing:function(){function t(e){var t=7.5625,a=2.75;return 1/a>e?t*e*e:2/a>e?t*(e-=1.5/a)*e+.75:2.5/a>e?t*(e-=2.25/a)*e+.9375:t*(e-=2.625/a)*e+.984375}e.easing.easeInQuad=e.easing.easeInQuad||function(e){return e*e},e.easing.easeOutQuad=e.easing.easeOutQuad||function(e){return 1-(1-e)*(1-e)},e.easing.easeInOutQuad=e.easing.easeInOutQuad||function(e){return.5>e?2*e*e:1-Math.pow(-2*e+2,2)/2},e.easing.easeInCubic=e.easing.easeInCubic||function(e){return e*e*e},e.easing.easeOutCubic=e.easing.easeOutCubic||function(e){return 1-Math.pow(1-e,3)},e.easing.easeInOutCubic=e.easing.easeInOutCubic||function(e){return.5>e?4*e*e*e:1-Math.pow(-2*e+2,3)/2},e.easing.easeInQuart=e.easing.easeInQuart||function(e){return e*e*e*e},e.easing.easeOutQuart=e.easing.easeOutQuart||function(e){return 1-Math.pow(1-e,4)},e.easing.easeInOutQuart=e.easing.easeInOutQuart||function(e){return.5>e?8*e*e*e*e:1-Math.pow(-2*e+2,4)/2},e.easing.easeInQuint=e.easing.easeInQuint||function(e){return e*e*e*e*e},e.easing.easeOutQuint=e.easing.easeOutQuint||function(e){return 1-Math.pow(1-e,5)},e.easing.easeInOutQuint=e.easing.easeInOutQuint||function(e){return.5>e?16*e*e*e*e*e:1-Math.pow(-2*e+2,5)/2},e.easing.easeInExpo=e.easing.easeInExpo||function(e){return 0===e?0:Math.pow(2,10*e-10)},e.easing.easeOutExpo=e.easing.easeOutExpo||function(e){return 1===e?1:1-Math.pow(2,-10*e)},e.easing.easeInOutExpo=e.easing.easeInOutExpo||function(e){return 0===e?0:1===e?1:.5>e?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2},e.easing.easeInSine=e.easing.easeInSine||function(e){return 1-Math.cos(e*Math.PI/2)},e.easing.easeOutSine=e.easing.easeOutSine||function(e){return Math.sin(e*Math.PI/2)},e.easing.easeInOutSine=e.easing.easeInOutSine||function(e){return-(Math.cos(Math.PI*e)-1)/2},e.easing.easeInCirc=e.easing.easeInCirc||function(e){return 1-Math.sqrt(1-Math.pow(e,2))},e.easing.easeOutCirc=e.easing.easeOutCirc||function(e){return Math.sqrt(1-Math.pow(e-1,2))},e.easing.easeInOutCirc=e.easing.easeInOutCirc||function(e){return.5>e?(1-Math.sqrt(1-Math.pow(2*e,2)))/2:(Math.sqrt(1-Math.pow(-2*e+2,2))+1)/2},e.easing.easeInElastic=e.easing.easeInElastic||function(e){return 0===e?0:1===e?1:-Math.pow(2,10*e-10)*Math.sin((10*e-10.75)*(2*Math.PI/3))},e.easing.easeOutElastic=e.easing.easeOutElastic||function(e){return 0===e?0:1===e?1:Math.pow(2,-10*e)*Math.sin((10*e-.75)*(2*Math.PI/3))+1},e.easing.easeInOutElastic=e.easing.easeInOutElastic||function(e){return 0===e?0:1===e?1:.5>e?-(Math.pow(2,20*e-10)*Math.sin((20*e-11.125)*(2*Math.PI/4.5)))/2:Math.pow(2,-20*e+10)*Math.sin((20*e-11.125)*(2*Math.PI/4.5))/2+1},e.easing.easeInBack=e.easing.easeInBack||function(e){return 2.70158*e*e*e-1.70158*e*e},e.easing.easeOutBack=e.easing.easeOutBack||function(e){return 1+2.70158*Math.pow(e-1,3)+1.70158*Math.pow(e-1,2)},e.easing.easeInOutBack=e.easing.easeInOutBack||function(e){return.5>e?Math.pow(2*e,2)*(7.189819*e-2.5949095)/2:(Math.pow(2*e-2,2)*(3.5949095*(2*e-2)+2.5949095)+2)/2},e.easing.easeInBounce=e.easing.easeInBounce||function(e){return 1-t(1-e)},e.easing.easeOutBounce=e.easing.easeOutBounce||t,e.easing.easeInOutBounce=e.easing.easeInOutBounce||function(e){return.5>e?(1-t(1-2*e))/2:(1+t(2*e-1))/2}}};I._easing.call(),e.fn[p]=function(t){return S[t]?S[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):S.init.apply(this,arguments)},e[p]=function(t){return S[t]?S[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):S.init.apply(this,arguments)},e[p].defaults=v}(jQuery,window,document);



/* =======================================================================
    * imgLiquid-min
=========================================================================*/

var imgLiquid=imgLiquid||{VER:"0.9.944"};imgLiquid.bgs_Available=!1,imgLiquid.bgs_CheckRunned=!1,imgLiquid.injectCss=".imgLiquid img {visibility:hidden}",function(i){function t(){if(!imgLiquid.bgs_CheckRunned){imgLiquid.bgs_CheckRunned=!0;var t=i('<span style="background-size:cover" />');i("body").append(t),!function(){var i=t[0];if(i&&window.getComputedStyle){var e=window.getComputedStyle(i,null);e&&e.backgroundSize&&(imgLiquid.bgs_Available="cover"===e.backgroundSize)}}(),t.remove()}}i.fn.extend({imgLiquid:function(e){this.defaults={fill:!0,verticalAlign:"center",horizontalAlign:"center",useBackgroundSize:!0,useDataHtmlAttr:!0,responsive:!0,delay:0,fadeInTime:0,removeBoxBackground:!0,hardPixels:!0,responsiveCheckTime:500,timecheckvisibility:500,onStart:null,onFinish:null,onItemStart:null,onItemFinish:null,onItemError:null},t();var a=this;return this.options=e,this.settings=i.extend({},this.defaults,this.options),this.settings.onStart&&this.settings.onStart(),this.each(function(t){function e(){-1===u.css("background-image").indexOf(encodeURI(c.attr("src")))&&u.css({"background-image":'url("'+encodeURI(c.attr("src"))+'")'}),u.css({"background-size":g.fill?"cover":"contain","background-position":(g.horizontalAlign+" "+g.verticalAlign).toLowerCase(),"background-repeat":"no-repeat"}),i("a:first",u).css({display:"block",width:"100%",height:"100%"}),i("img",u).css({display:"none"}),g.onItemFinish&&g.onItemFinish(t,u,c),u.addClass("imgLiquid_bgSize"),u.addClass("imgLiquid_ready"),l()}function d(){function e(){c.data("imgLiquid_error")||c.data("imgLiquid_loaded")||c.data("imgLiquid_oldProcessed")||(u.is(":visible")&&c[0].complete&&c[0].width>0&&c[0].height>0?(c.data("imgLiquid_loaded",!0),setTimeout(r,t*g.delay)):setTimeout(e,g.timecheckvisibility))}if(c.data("oldSrc")&&c.data("oldSrc")!==c.attr("src")){var a=c.clone().removeAttr("style");return a.data("imgLiquid_settings",c.data("imgLiquid_settings")),c.parent().prepend(a),c.remove(),c=a,c[0].width=0,setTimeout(d,10),void 0}return c.data("imgLiquid_oldProcessed")?(r(),void 0):(c.data("imgLiquid_oldProcessed",!1),c.data("oldSrc",c.attr("src")),i("img:not(:first)",u).css("display","none"),u.css({overflow:"hidden"}),c.fadeTo(0,0).removeAttr("width").removeAttr("height").css({visibility:"visible","max-width":"none","max-height":"none",width:"auto",height:"auto",display:"block"}),c.on("error",n),c[0].onerror=n,e(),o(),void 0)}function o(){(g.responsive||c.data("imgLiquid_oldProcessed"))&&c.data("imgLiquid_settings")&&(g=c.data("imgLiquid_settings"),u.actualSize=u.get(0).offsetWidth+u.get(0).offsetHeight/1e4,u.sizeOld&&u.actualSize!==u.sizeOld&&r(),u.sizeOld=u.actualSize,setTimeout(o,g.responsiveCheckTime))}function n(){c.data("imgLiquid_error",!0),u.addClass("imgLiquid_error"),g.onItemError&&g.onItemError(t,u,c),l()}function s(){var i={};if(a.settings.useDataHtmlAttr){var t=u.attr("data-imgLiquid-fill"),e=u.attr("data-imgLiquid-horizontalAlign"),d=u.attr("data-imgLiquid-verticalAlign");("true"===t||"false"===t)&&(i.fill=Boolean("true"===t)),void 0===e||"left"!==e&&"center"!==e&&"right"!==e&&-1===e.indexOf("%")||(i.horizontalAlign=e),void 0===d||"top"!==d&&"bottom"!==d&&"center"!==d&&-1===d.indexOf("%")||(i.verticalAlign=d)}return imgLiquid.isIE&&a.settings.ieFadeInDisabled&&(i.fadeInTime=0),i}function r(){var i,e,a,d,o,n,s,r,m=0,h=0,f=u.width(),v=u.height();void 0===c.data("owidth")&&c.data("owidth",c[0].width),void 0===c.data("oheight")&&c.data("oheight",c[0].height),g.fill===f/v>=c.data("owidth")/c.data("oheight")?(i="100%",e="auto",a=Math.floor(f),d=Math.floor(f*(c.data("oheight")/c.data("owidth")))):(i="auto",e="100%",a=Math.floor(v*(c.data("owidth")/c.data("oheight"))),d=Math.floor(v)),o=g.horizontalAlign.toLowerCase(),s=f-a,"left"===o&&(h=0),"center"===o&&(h=.5*s),"right"===o&&(h=s),-1!==o.indexOf("%")&&(o=parseInt(o.replace("%",""),10),o>0&&(h=.01*s*o)),n=g.verticalAlign.toLowerCase(),r=v-d,"left"===n&&(m=0),"center"===n&&(m=.5*r),"bottom"===n&&(m=r),-1!==n.indexOf("%")&&(n=parseInt(n.replace("%",""),10),n>0&&(m=.01*r*n)),g.hardPixels&&(i=a,e=d),c.css({width:i,height:e,"margin-left":Math.floor(h),"margin-top":Math.floor(m)}),c.data("imgLiquid_oldProcessed")||(c.fadeTo(g.fadeInTime,1),c.data("imgLiquid_oldProcessed",!0),g.removeBoxBackground&&u.css("background-image","none"),u.addClass("imgLiquid_nobgSize"),u.addClass("imgLiquid_ready")),g.onItemFinish&&g.onItemFinish(t,u,c),l()}function l(){t===a.length-1&&a.settings.onFinish&&a.settings.onFinish()}var g=a.settings,u=i(this),c=i("img:first",u);return c.length?(c.data("imgLiquid_settings")?(u.removeClass("imgLiquid_error").removeClass("imgLiquid_ready"),g=i.extend({},c.data("imgLiquid_settings"),a.options)):g=i.extend({},a.settings,s()),c.data("imgLiquid_settings",g),g.onItemStart&&g.onItemStart(t,u,c),imgLiquid.bgs_Available&&g.useBackgroundSize?e():d(),void 0):(n(),void 0)})}})}(jQuery),!function(){var i=imgLiquid.injectCss,t=document.getElementsByTagName("head")[0],e=document.createElement("style");e.type="text/css",e.styleSheet?e.styleSheet.cssText=i:e.appendChild(document.createTextNode(i)),t.appendChild(e)}();



/* =======================================================================
    * ParallaxScroll
==========================================================================*/

$(function() {
    ParallaxScroll.init();
});

var ParallaxScroll = {
    /* PUBLIC VARIABLES */
    showLogs: false,
    round: 1000,

    /* PUBLIC FUNCTIONS */
    init: function() {
        this._log("init");
        if (this._inited) {
            this._log("Already Inited");
            this._inited = true;
            return;
        }
        this._requestAnimationFrame = (function(){
          return  window.requestAnimationFrame       ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame    ||
                  window.oRequestAnimationFrame      ||
                  window.msRequestAnimationFrame     ||
                  function(/* function */ callback, /* DOMElement */ element){
                      window.setTimeout(callback, 1000 / 60);
                  };
        })();
        this._onScroll(true);
    },

    /* PRIVATE VARIABLES */
    _inited: false,
    _properties: ['x', 'y', 'z', 'rotateX', 'rotateY', 'rotateZ', 'scaleX', 'scaleY', 'scaleZ', 'scale'],
    _requestAnimationFrame:null,

    /* PRIVATE FUNCTIONS */
    _log: function(message) {
        if (this.showLogs) console.log("Parallax Scroll / " + message);
    },
    _onScroll: function(noSmooth) {
        var scroll = $(document).scrollTop();
        var windowHeight = $(window).height();
        this._log("onScroll " + scroll);
        $("[data-parallax]").each($.proxy(function(index, el) {
            var $el = $(el);
            var properties = [];
            var applyProperties = false;
            var style = $el.data("style");
            if (style == undefined) {
                style = $el.attr("style") || "";
                $el.data("style", style);
            }
            var datas = [$el.data("parallax")];
            var iData;
            for(iData = 2; ; iData++) {
                if($el.data("parallax"+iData)) {
                    datas.push($el.data("parallax-"+iData));
                }
                else {
                    break;
                }
            }
            var datasLength = datas.length;
            for(iData = 0; iData < datasLength; iData ++) {
                var data = datas[iData];
                var scrollFrom = data["from-scroll"];
                if (scrollFrom == undefined) scrollFrom = Math.max(0, $(el).offset().top - windowHeight);
                scrollFrom = scrollFrom | 0;
                var scrollDistance = data["distance"];
                var scrollTo = data["to-scroll"];
                if (scrollDistance == undefined && scrollTo == undefined) scrollDistance = windowHeight;
                scrollDistance = Math.max(scrollDistance | 0, 1);
                var easing = data["easing"];
                var easingReturn = data["easing-return"];
                if (easing == undefined || !$.easing|| !$.easing[easing]) easing = null;
                if (easingReturn == undefined || !$.easing|| !$.easing[easingReturn]) easingReturn = easing;
                if (easing) {
                    var totalTime = data["duration"];
                    if (totalTime == undefined) totalTime = scrollDistance;
                    totalTime = Math.max(totalTime | 0, 1);
                    var totalTimeReturn = data["duration-return"];
                    if (totalTimeReturn == undefined) totalTimeReturn = totalTime;
                    scrollDistance = 1;
                    var currentTime = $el.data("current-time");
                    if(currentTime == undefined) currentTime = 0;
                }
                if (scrollTo == undefined) scrollTo = scrollFrom + scrollDistance;
                scrollTo = scrollTo | 0;
                var smoothness = data["smoothness"];
                if (smoothness == undefined) smoothness = 30;
                smoothness = smoothness | 0;
                if (noSmooth || smoothness == 0) smoothness = 1;
                smoothness = smoothness | 0;
                var scrollCurrent = scroll;
                scrollCurrent = Math.max(scrollCurrent, scrollFrom);
                scrollCurrent = Math.min(scrollCurrent, scrollTo);
                if(easing) {
                    if($el.data("sens") == undefined) $el.data("sens", "back");
                    if(scrollCurrent>scrollFrom) {
                        if($el.data("sens") == "back") {
                            currentTime = 1;
                            $el.data("sens", "go");
                        }
                        else {
                            currentTime++;
                        }
                    }
                    if(scrollCurrent<scrollTo) {
                        if($el.data("sens") == "go") {
                            currentTime = 1;
                            $el.data("sens", "back");
                        }
                        else {
                            currentTime++;
                        }
                    }
                    if(noSmooth) currentTime = totalTime;
                    $el.data("current-time", currentTime);
                }
                this._properties.map($.proxy(function(prop) {
                    var defaultProp = 0;
                    var to = data[prop];
                    if (to == undefined) return;
                    if(prop=="scale" || prop=="scaleX" || prop=="scaleY" || prop=="scaleZ" ) {
                        defaultProp = 1;
                    }
                    else {
                        to = to | 0;
                    }
                    var prev = $el.data("_" + prop);
                    if (prev == undefined) prev = defaultProp;
                    var next = ((to-defaultProp) * ((scrollCurrent - scrollFrom) / (scrollTo - scrollFrom))) + defaultProp;
                    var val = prev + (next - prev) / smoothness;
                    if(easing && currentTime>0 && currentTime<=totalTime) {
                        var from = defaultProp;
                        if($el.data("sens") == "back") {
                            from = to;
                            to = -to;
                            easing = easingReturn;
                            totalTime = totalTimeReturn;
                        }
                        val = $.easing[easing](null, currentTime, from, to, totalTime);
                    }
                    val = Math.ceil(val * this.round) / this.round;
                    if(val==prev&&next==to) val = to;
                    if(!properties[prop]) properties[prop] = 0;
                    properties[prop] += val;
                    if (prev != properties[prop]) {
                        $el.data("_" + prop, properties[prop]);
                        applyProperties = true;
                    }
                }, this));
            }
            if (applyProperties) {
                if (properties["z"] != undefined) {
                    var perspective = data["perspective"];
                    if (perspective == undefined) perspective = 800;
                    var $parent = $el.parent();
                    if(!$parent.data("style")) $parent.data("style", $parent.attr("style") || "");
                    $parent.attr("style", "perspective:" + perspective + "px; -webkit-perspective:" + perspective + "px; "+ $parent.data("style"));
                }
                if(properties["scaleX"] == undefined) properties["scaleX"] = 1;
                if(properties["scaleY"] == undefined) properties["scaleY"] = 1;
                if(properties["scaleZ"] == undefined) properties["scaleZ"] = 1;
                if (properties["scale"] != undefined) {
                    properties["scaleX"] *= properties["scale"];
                    properties["scaleY"] *= properties["scale"];
                    properties["scaleZ"] *= properties["scale"];
                }
                var translate3d = "translate3d(" + (properties["x"] ? properties["x"] : 0) + "px, " + (properties["y"] ? properties["y"] : 0) + "px, " + (properties["z"] ? properties["z"] : 0) + "px)";
                var rotate3d = "rotateX(" + (properties["rotateX"] ? properties["rotateX"] : 0) + "deg) rotateY(" + (properties["rotateY"] ? properties["rotateY"] : 0) + "deg) rotateZ(" + (properties["rotateZ"] ? properties["rotateZ"] : 0) + "deg)";
                var scale3d = "scaleX(" + properties["scaleX"] + ") scaleY(" + properties["scaleY"] + ") scaleZ(" + properties["scaleZ"] + ")";
                var cssTransform = translate3d + " " + rotate3d + " " + scale3d + ";";
                this._log(cssTransform);
                $el.attr("style", "transform:" + cssTransform + " -webkit-transform:" + cssTransform + " " + style);
            }
        }, this));
        if(window.requestAnimationFrame) {
            window.requestAnimationFrame($.proxy(this._onScroll, this, false));
        }
        else {
            this._requestAnimationFrame($.proxy(this._onScroll, this, false));
        }
    }
}


/* =======================================================================
    *  Buddha
=========================================================================*/

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永無bug
//
//***************************************************