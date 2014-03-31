(function(w, d){

'use strict';

var MAX_SLIDE = 5;
var curSlide = 1;
var pageWrapper;
var navList;
var isSliding = false;

var secBgContainer;
var circleLeft, circleCenter, circleRight;
var itemLeft, itemCenter, itemRight;
var itemTextLeft, itemTextCenter, itemTextRight;
var phones;
var loopTxtUl, loopTxtUlBackup;
var phoneShowed = false;
var imageCountContainer;

var ua = navigator.userAgent;

var txtArr = [
    "“好用，记录太方便了！”", 
    "“推荐推荐，不用担心不会数胎动啦，自动计算去重的哦～”",
    "“用过的最好用的数胎动软件，还能推算一天的胎动，非常实用。”",
    "“不用记录1个小时也能保存数据，不错！”",
    "“找宝宝胎动规律挺好的，有点意思，好玩又好用，推荐！”"
];
/**
 * 根据序号跳转到对应的章节
 * @param {string} 序号，取值范围[1, 5]
 */
function gotoSlide(num) {
    if (num === curSlide ||
        num < 1 || num > MAX_SLIDE) {
        return;
    }
    if (navList.children[curSlide - 1]) {
        removeClass(navList.children[curSlide - 1], 'current');
    }
    if (ua.indexOf('MSIE 9') > -1 || 
        ua.indexOf('MSIE 8') > -1) {
        removeClass(pageWrapper, 'slide-' + curSlide);
    }
    var preSlide = curSlide;
    curSlide = num;
    isSliding = true;
    setTimeout(function(){
        isSliding = false;
    }, 1000);
    pageWrapper.style.WebkitTransition = '-webkit-transform .8s ease';
    pageWrapper.style.transition = 'transform .8s ease';
    pageWrapper.style.WebkitTransform = 'translate3d(0, -' + (num - 1) * 100 + '%, 0)';
    pageWrapper.style.MozTransform = 'translate3d(0, -' + (num - 1) * 100 + '%, 0)';
    pageWrapper.style.transform = 'translate3d(0, -' + (num - 1) * 100 + '%, 0)';

    if (ua.indexOf('MSIE 9') > -1 || 
        ua.indexOf('MSIE 8') > -1) {
        console.log(num);
        addClass(pageWrapper, 'slide-' + num);
    }
    
    if (num == 2 && !phoneShowed) {
        for (var i = 0; i < phones.length; i ++) {
            addClass(phones[i], 'show');
        }
        phoneShowed = true;
    }
    
    if (navList.children[num - 1]) {
        addClass(navList.children[num - 1], 'current');
    }
}

var loopCount = txtArr.length;
var moveStep = 3; // unit is em according to the css
function startTextLooping(){
    setInterval(function(){
        toNextStep();
    }, 2000);
}

function toNextStep(){
    if (loopTxtUl.style.transition == '') {
        loopTxtUl.style.transition = loopTxtUl.style.WebkitTransition = 'top .5s ease-out';
    }
    if (loopTxtUlBackup.style.transition == '') {
        loopTxtUlBackup.style.transition = loopTxtUlBackup.style.WebkitTransition = 'top .5s ease-out';
    }
    loopTxtUl.style.top = (parseInt(loopTxtUl.style.top) || 0) - moveStep + 'em';

    loopTxtUlBackup.style.top = (parseInt(loopTxtUlBackup.style.top) || 0) - moveStep + 'em';

    if (parseInt(loopTxtUl.style.top) === -(moveStep * (loopCount * 2 - 1))) {
        // 去掉动画，修改位置
        loopTxtUl.style.transition = loopTxtUl.style.WebkitTransition = '';
        loopTxtUl.style.top = '3em';
    }
    if (parseInt(loopTxtUlBackup.style.top) === -(moveStep * (loopCount * 3 - 1))) {
        // 去掉动画，修改位置
        loopTxtUlBackup.style.transition = loopTxtUlBackup.style.WebkitTransition = '';
        loopTxtUlBackup.style.top = -moveStep * (loopCount - 1) + 'em';
    }
}
w.onload = function(){
    pageWrapper = $('page-wrapper');
    navList = $('navi-list');
    phones = $('phones-wrapper').getElementsByTagName('img');
    addEvent(navList, 'click', function(e){
        e = e || window.event;
        var t = e.target || e.srcElement;
        if (!t.getAttribute('data-slide')) {
            return;
        }
        gotoSlide(parseInt(t.getAttribute('data-slide')));
    });
    addEvent(w, 'DOMMouseScroll', function(e){
        if (isSliding) {
            return;
        }
        var dir = e.detail < 0 ? -1 : 1;
        if (dir == 1) {
            gotoSlide(curSlide + 1);
        } else {
            gotoSlide(curSlide - 1);
        }
    });
    addEvent(w, 'mousewheel', function(e){
        if (isSliding) {
            return;
        }
        e = e || window.event;
        var dir = e.wheelDelta < 0 ? -1 : 1;
        if (dir == -1) {
            gotoSlide(curSlide + 1);
        } else {
            gotoSlide(curSlide - 1);
        }
    });
    circleLeft = $('circle-left');
    circleCenter = $('circle-center');
    circleRight = $('circle-right');
    itemLeft = $('item-left');
    itemCenter = $('item-center');
    itemRight = $('item-right');
    itemTextLeft = $('text-item-1');
    itemTextCenter = $('text-item-2');
    itemTextRight = $('text-item-3');
    addEvent(circleLeft, 'mouseover', function(e){
        addClass(itemLeft, 'highlight');
    });
    addEvent(circleLeft, 'mouseout', function(e){
        removeClass(itemLeft, 'highlight');
    });
    addEvent(circleCenter, 'mouseover', function(e){
        addClass(itemCenter, 'highlight');
    });
    addEvent(circleCenter, 'mouseout', function(e){
        removeClass(itemCenter, 'highlight');
    });
    addEvent(circleRight, 'mouseover', function(e){
        addClass(itemRight, 'highlight');
    });
    addEvent(circleRight, 'mouseout', function(e){
        removeClass(itemRight, 'highlight');
    });
    addEvent(itemTextLeft, 'mouseover', function(e){
        addClass(itemLeft, 'highlight');
    });
    addEvent(itemTextLeft, 'mouseout', function(e){
        removeClass(itemLeft, 'highlight');
    });
    addEvent(itemTextCenter, 'mouseover', function(e){
        addClass(itemCenter, 'highlight');
    });
    addEvent(itemTextCenter, 'mouseout', function(e){
        removeClass(itemCenter, 'highlight');
    });
    addEvent(itemTextRight, 'mouseover', function(e){
        addClass(itemRight, 'highlight');
    });
    addEvent(itemTextRight, 'mouseout', function(e){
        removeClass(itemRight, 'highlight');
    });
    loopTxtUl = $('loop-text');
    loopTxtUlBackup = $('loop-text-backup');
    startTextLooping();
    
		
		
	addEvent($('sec1-download-ios'), 'click', function(e){
		window.open('itms-services://?action=download-manifest&url=https://dl.dropboxusercontent.com/u/42913053/FetalMovement.plist');
	});
	
	addEvent($('sec5-download-ios'), 'click', function(e){
		window.open('itms-services://?action=download-manifest&url=https://dl.dropboxusercontent.com/u/42913053/FetalMovement.plist');
	});

    imageCountContainer = $('image-count-container');
    
    var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("get", "/api/get_user_count?t=" + Math.random());
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	xmlHttp.onreadystatechange = function () {
    	if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
    		var res = xmlHttp.responseText;
    		if (res) {
                var userCountStr = res;
                var len = userCountStr.length;
                var innerHTMLs = [];
                var index = 0;
                for (var i = len - 1; i >= 0; i--) {
                    if (index > 0 && index % 3 == 0) {
                        innerHTMLs.push('<span class="image-text text-comma">,</span>');
                    }
                    innerHTMLs.push('<span class="image-text text-' + userCountStr[i] + '">'+userCountStr[i]+'</span>');
                    index ++;
                }
                imageCountContainer.innerHTML = innerHTMLs.reverse().join('');
    		}
        }
    }
	xmlHttp.send();
}

function $(id) {
    return d.getElementById(id);
}

function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
}

function hasClass(el, className) {
    if (el.classList) {
        el.classList.contains(className);
    } else {
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
}

function addEvent(elem, type, listener) {
    if (elem.addEventListener) {
        elem.addEventListener(type, listener, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, listener);
    } else {
        elem['on' + type] = listener;
    }
    
}

})(window, document);