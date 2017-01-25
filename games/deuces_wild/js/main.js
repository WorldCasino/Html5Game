var s_iOffsetX;
var s_iOffsetY;

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

$(window).resize(function() {
	sizeHandler();
});

function trace(szMsg){
    console.log(szMsg);
}

function isIOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod' 
    ]; 

    while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){
            s_bIsIphone = true;
            return true; 
        } 
    } 
    s_bIsIphone = false;
    return false; 
}

function getSize(Name) {
       var size;
       var name = Name.toLowerCase();
       var document = window.document;
       var documentElement = document.documentElement;
       if (window["inner" + Name] === undefined) {
               // IE6 & IE7 don't have window.innerWidth or innerHeight
               size = documentElement["client" + Name];
       }
       else if (window["inner" + Name] != documentElement["client" + Name]) {
               // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

               // Insert markup to test if a media query will match document.doumentElement["client" + Name]
               var bodyElement = document.createElement("body");
               bodyElement.id = "vpw-test-b";
               bodyElement.style.cssText = "overflow:scroll";
               var divElement = document.createElement("div");
               divElement.id = "vpw-test-d";
               divElement.style.cssText = "position:absolute;top:-1000px";
               // Getting specific on the CSS selector so it won't get overridden easily
               divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
               bodyElement.appendChild(divElement);
               documentElement.insertBefore(bodyElement, document.head);

               if (divElement["offset" + Name] == 7) {
                       // Media query matches document.documentElement["client" + Name]
                       size = documentElement["client" + Name];
               }
               else {
                       // Media query didn't match, use window["inner" + Name]
                       size = window["inner" + Name];
               }
               // Cleanup
               documentElement.removeChild(bodyElement);
       }
       else {
               // Default to use window["inner" + Name]
               size = window["inner" + Name];
       }
       return size;
};

window.addEventListener("orientationchange", onOrientationChange );


function onOrientationChange(){
    if (window.matchMedia("(orientation: portrait)").matches) {
       // you're in PORTRAIT mode	   
	   sizeHandler();
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
       // you're in LANDSCAPE mode   
	   sizeHandler();
    }
	
}

function getIOSWindowHeight() {
    // Get zoom level of mobile Safari
    // Note, that such zoom detection might not work correctly in other browsers
    // We use width, instead of height, because there are no vertical toolbars :)
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

    // window.innerHeight returns height of the visible area. 
    // We multiply it by zoom and get out real height.
    return window.innerHeight * zoomLevel;
};

// You can also get height of the toolbars that are currently displayed
function getHeightOfIOSToolbars() {
    var tH = (window.orientation === 0 ? screen.height : screen.width) -  getIOSWindowHeight();
    return tH > 1 ? tH : 0;
};

//THIS FUNCTION MANAGES THE CANVAS SCALING TO FIT PROPORTIONALLY THE GAME TO THE CURRENT DEVICE RESOLUTION
function sizeHandler() {
	window.scrollTo(0, 1);

	if (!$("#canvas")){
		return;
	}

	var h;
        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

        if(iOS){
            h = getIOSWindowHeight();
        }else{ 
            h = getSize("Height");
        }
        
        var w = getSize("Width");
        _checkOrientation(w,h);
        
	var multiplier = Math.min((h / CANVAS_HEIGHT), (w / CANVAS_WIDTH));

	var destW = CANVAS_WIDTH * multiplier;
	var destH = CANVAS_HEIGHT * multiplier;
        
        var iAdd = 0;
        if (destH < h){
            iAdd = h-destH;
            destH += iAdd;
            destW += iAdd*(CANVAS_WIDTH/CANVAS_HEIGHT);
        }else  if (destW < w){
            iAdd = w-destW;
            destW += iAdd;
            destH += iAdd*(CANVAS_HEIGHT/CANVAS_WIDTH);
        }

        var fOffsetY = ((h / 2) - (destH / 2));
        var fOffsetX = ((w / 2) - (destW / 2));
        var fGameInverseScaling = (CANVAS_WIDTH/destW);

        if( fOffsetX*fGameInverseScaling < -EDGEBOARD_X ||  
            fOffsetY*fGameInverseScaling < -EDGEBOARD_Y ){
            multiplier = Math.min( h / (CANVAS_HEIGHT-(EDGEBOARD_Y*2)), w / (CANVAS_WIDTH-(EDGEBOARD_X*2)));
            destW = CANVAS_WIDTH * multiplier;
            destH = CANVAS_HEIGHT * multiplier;
            fOffsetY = ( h - destH ) / 2;
            fOffsetX = ( w - destW ) / 2;
            
            fGameInverseScaling = (CANVAS_WIDTH/destW);
        }

        s_iOffsetX = (-1*fOffsetX * fGameInverseScaling);
        s_iOffsetY = (-1*fOffsetY * fGameInverseScaling);
        
        if(fOffsetY >= 0 ){
            s_iOffsetY = 0;
        }
        
        if(fOffsetX >= 0 ){
            s_iOffsetX = 0;
        }
        
        if(s_oInterface !== null){
            s_oInterface.refreshButtonPos( s_iOffsetX,s_iOffsetY);
        }
        if(s_oMenu !== null){
            s_oMenu.refreshButtonPos( s_iOffsetX,s_iOffsetY);
        }
        
        
	if(s_bMobile && !s_bIsIphone){
            $("#canvas").css("width",destW+"px");
            $("#canvas").css("height",destH+"px");
        }else{
            s_oStage.canvas.width = destW;
            s_oStage.canvas.height = destH;
            
            var iScale = Math.min(destW / CANVAS_WIDTH, destH / CANVAS_HEIGHT);
            s_oStage.scaleX = s_oStage.scaleY = iScale; 
        }
        
        if(fOffsetY < 0){
            $("#canvas").css("top",fOffsetY+"px");
        }else{
            $("#canvas").css("top","0px");
        }
        
        $("#canvas").css("left",fOffsetX+"px");

};

function _checkOrientation(iWidth,iHeight){
    if(s_bMobile && ENABLE_CHECK_ORIENTATION){
        if( iWidth>iHeight ){ 
            if( $(".orientation-msg-container").attr("data-orientation") === "landscape" ){
                $(".orientation-msg-container").css("display","none");
                s_oMain.startUpdate();
            }else{
                $(".orientation-msg-container").css("display","block");
                s_oMain.stopUpdate();
            }  
        }else{
            if( $(".orientation-msg-container").attr("data-orientation") === "portrait" ){
                $(".orientation-msg-container").css("display","none");
                s_oMain.startUpdate();
            }else{
                $(".orientation-msg-container").css("display","block");
                s_oMain.stopUpdate();
            }   
        }
    }
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

function createBitmap(oSprite, iWidth, iHeight){
	var oBmp = new createjs.Bitmap(oSprite);
	var hitObject = new createjs.Shape();
	
	if (iWidth && iHeight){
		hitObject .graphics.beginFill("#fff").drawRect(0, 0, iWidth, iHeight);
	}else{
		hitObject .graphics.beginFill("#ff0").drawRect(0, 0, oSprite.width, oSprite.height);
	}

	oBmp.hitArea = hitObject;

	return oBmp;
}

function createSprite(oSpriteSheet, szState, iRegX,iRegY,iWidth, iHeight){
	if(szState !== null){
		var oRetSprite = new createjs.Sprite(oSpriteSheet, szState);
	}else{
		var oRetSprite = new createjs.Sprite(oSpriteSheet);
	}
	
	var hitObject = new createjs.Shape();
	hitObject .graphics.beginFill("#000000").drawRect(-iRegX, -iRegY, iWidth, iHeight);

	oRetSprite.hitArea = hitObject;
	
	return oRetSprite;
}

function randomFloatBetween(minValue,maxValue,precision){
    if(typeof(precision) === 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function formatTime(iTime){	
    iTime/=1000;
    var iMins = Math.floor(iTime/60);
    var iSecs = iTime-(iMins*60);
    iSecs = parseFloat(iSecs).toFixed(1)
    
    var szRet = "";

    if ( iMins < 10 ){
            szRet += "0" + iMins + ":";
    }else{
            szRet += iMins + ":";
    }

    if ( iSecs < 10 ){
            szRet += "0" + iSecs;
    }else{
            szRet += iSecs;
    }	

    return szRet;
}

Array.prototype.sortOn = function(){ 
    var dup = this.slice();
    if(!arguments.length) return dup.sort();
    var args = Array.prototype.slice.call(arguments);
    return dup.sort(function(a,b){
      var props = args.slice();
      var prop = props.shift();
      while(a[prop] == b[prop] && props.length) prop = props.shift();
      return a[prop] == b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;
    });
}

function roundDecimal(num, precision){
    var decimal = Math.pow(10, precision);
    return Math.round(decimal* num) / decimal;
}

function tweenVectors( vStart, vEnd, iLerp,vOut ){
    vOut.set(vStart.getX() + iLerp *( vEnd.getX()-vStart.getX()),vStart.getY() + iLerp *( vEnd.getY()-vStart.getY()));
    return vOut;
}

function NoClickDelay(el) {
	this.element = el;
	if( window.Touch ) this.element.addEventListener('touchstart', this, false);
}

NoClickDelay.prototype = {
handleEvent: function(e) {
    switch(e.type) {
        case 'touchstart': this.onTouchStart(e); break;
        case 'touchmove': this.onTouchMove(e); break;
        case 'touchend': this.onTouchEnd(e); break;
    }
},
	
onTouchStart: function(e) {
    e.preventDefault();
    this.moved = false;
    
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
},
	
onTouchMove: function(e) {
    this.moved = true;
},
	
onTouchEnd: function(e) {
    this.element.removeEventListener('touchmove', this, false);
    this.element.removeEventListener('touchend', this, false);
    
    if( !this.moved ) {
        var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if(theTarget.nodeType === 3) theTarget = theTarget.parentNode;
        
        var theEvent = document.createEvent('MouseEvents');
        theEvent.initEvent('click', true, true);
        theTarget.dispatchEvent(theEvent);
    }
}

};

function ctlArcadeResume(){
    if(s_oMain !== null){
        s_oMain.startUpdate();
    }
}

function ctlArcadePause(){
    if(s_oMain !== null){
        s_oMain.stopUpdate();
    }
    
}

function getParamValue(paramName){
    var url = window.location.search.substring(1);
    var qArray = url.split('&'); 
    for (var i = 0; i < qArray.length; i++) 
    {
            var pArr = qArray[i].split('=');
            if (pArr[0] == paramName) 
                    return pArr[1];
    }
}

function playSound(szSound, iVolume, iLoop){
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        var oPointer = createjs.Sound.play(szSound, {loop: iLoop, volume:iVolume});
        return oPointer;
    }
    return null;
}

function stopSound(oPointer){
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        oPointer.stop();
    }
}

function setVolume(oPointer, iVolume){
   if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
       oPointer.volume= iVolume;
   }
}  

function setMute(oPointer, bMute){
   if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
       oPointer.setMute(bMute);
   }
}

(function() {
		var hidden = "hidden";
		// Standards:
		if (hidden in document)
		document.addEventListener("visibilitychange", onchange);
		else if ((hidden = "mozHidden") in document)
		document.addEventListener("mozvisibilitychange", onchange);
		else if ((hidden = "webkitHidden") in document)
		document.addEventListener("webkitvisibilitychange", onchange);
		else if ((hidden = "msHidden") in document)
		document.addEventListener("msvisibilitychange", onchange);
		// IE 9 and lower:
		else if ('onfocusin' in document)
		document.onfocusin = document.onfocusout = onchange;
		// All others:
		else
		window.onpageshow = window.onpagehide
		= window.onfocus = window.onblur = onchange;
		function onchange (evt) {
		var v = 'visible', h = 'hidden',
				evtMap = {
				focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
				};
				evt = evt || window.event;
				if (evt.type in evtMap){
		document.body.className = evtMap[evt.type];
		} else{
		document.body.className = this[hidden] ? "hidden" : "visible";
				if (document.body.className === "hidden"){
		s_oMain.stopUpdate();
		} else{
		s_oMain.startUpdate();
		}
		}
		}
})();function CSpriteLibrary(){

    var _oLibSprites;
    var _iNumSprites;
    var _iCntSprites;
    var _cbCompleted;
    var _cbTotalCompleted;
    var _cbOwner;
    
    this.init = function( cbCompleted,cbTotalCompleted, cbOwner ){
        _iNumSprites = 0;
        _iCntSprites = 0;
        _cbCompleted = cbCompleted;
        _cbTotalCompleted = cbTotalCompleted;
        _cbOwner     = cbOwner;
		
        _oLibSprites = {};
    };
    
    this.addSprite = function( szKey, szPath ){
        if ( _oLibSprites.hasOwnProperty(szKey) ){
            return;
        }
        
        _oLibSprites[szKey] = { szPath:szPath, oSprite: new Image() };
        _iNumSprites++;
        
    };
    
    this.getSprite = function( szKey ){
        if (!_oLibSprites.hasOwnProperty(szKey)){
            return null;
        }else{
            return _oLibSprites[szKey].oSprite;
        }
    };
    
    this._onSpritesLoaded = function(){
        _cbTotalCompleted.call(_cbOwner);
    };

    this._onSpriteLoaded = function(){
        _cbCompleted.call(_cbOwner);
        if (++_iCntSprites === _iNumSprites) {
            this._onSpritesLoaded();
        }
        
    };    

    this.loadSprites = function(){
        for (var szKey in _oLibSprites) {
            _oLibSprites[szKey].oSprite["oSpriteLibrary"] = this;
            _oLibSprites[szKey].oSprite.onload = function(){
                this.oSpriteLibrary._onSpriteLoaded();
            };
            _oLibSprites[szKey].oSprite.src = _oLibSprites[szKey].szPath;
        } 
    };
    
    this.getNumSprites=function(){
        return _iNumSprites;
    };
}

var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 768;

var EDGEBOARD_X = 400;
var EDGEBOARD_Y = 0;

var FONT1 = "OpenSans-BoldItalic";
var FONT2 = "Digital-7";

var FPS_TIME      = 1000/24;
var DISABLE_SOUND_MOBILE = false;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var STATE_GAME_WAITING_FOR_BET  = 0;
var STATE_GAME_DEAL             = 1;
var STATE_GAME_CHOOSE_HOLD      = 2;
var STATE_GAME_DRAW             = 3;
var STATE_GAME_EVALUATE         = 4;

var ON_CARD_SHOWN = "ON_CARD_SHOWN";
var ON_CARD_HIDE = "ON_CARD_HIDE";

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;

var ROYAL_FLUSH_NO_DEUCES   = 0;
var FOUR_DEUCES             = 1;
var ROYAL_FLUSH_WITH_DEUCES = 2;
var FIVE_OF_A_KIND          = 3;
var STRAIGHT_FLUSH          = 4;
var FOUR_OF_A_KIND          = 5;
var FULL_HOUSE              = 6;
var FLUSH                   = 7;
var STRAIGHT                = 8;
var THREE_OF_A_KIND         = 9;
var HIGH_CARD               = 10;

var CARD_TWO = 2;
var CARD_THREE = 3;
var CARD_FOUR = 4;
var CARD_FIVE = 5;
var CARD_SIX = 6;
var CARD_SEVEN = 7;
var CARD_EIGHT = 8;
var CARD_NINE = 9;
var CARD_TEN = 10;
var CARD_JACK = 11;
var CARD_QUEEN = 12;
var CARD_KING = 13;
var CARD_ACE = 14;

var SUIT_HEARTS = 0;
var SUIT_DIAMONDS = 1;
var SUIT_CLUBS = 2;
var SUIT_SPADES = 3;

var CARD_WIDTH = 154;
var CARD_HEIGHT = 240;
var BET_TYPE;
var TOTAL_MONEY;
var NUM_BETS = 5;
var WIN_COMBINATIONS = 10;
var COMBO_PRIZES;
var AUTOMATIC_RECHARGE;
var WIN_OCCURRENCE;
var GAME_CASH;
var MIN_WIN;
var NUM_HAND_FOR_ADS;
var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
TEXT_GAMEOVER  = "GAME OVER";
TEXT_PLAY      = "PLAY";
TEXT_BET       = "BET";
TEXT_WIN       = "WIN";
TEXT_MONEY     = "MONEY";
TEXT_DEAL      = "DEAL";
TEXT_BET_ONE   = "BET ONE";
TEXT_MAX_BET   = "BET MAX";
TEXT_RECHARGE  = "RECHARGE";
TEXT_EXIT      = "EXIT";
TEXT_DRAW      = "DRAW";
TEXT_NO_WIN    = "NO WIN";
TEXT_CURRENCY  = "$";
TEXT_COMBO     = new Array(
                            "Royal Flush (No Deuces)",
                            "4 Deuces",
                            "Royal Flush (Deuces)",
                            "5 of a Kind",
                            "Straight Flush",
                            "Four of a Kind",
                            "Full House",
                            "Flush",
                            "Straight",
                            "Three of a Kind"
                            )

TEXT_CONGRATULATIONS = "Congratulations!";
TEXT_SHARE_1 = "You collected <strong>" 
TEXT_SHARE_2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_3 = "My score is ";
TEXT_SHARE_4 = " points! Can you do better?";						function CPreloader(){
    var _iMaskWidth;
    var _oLoadingText;
    var _oProgressBar;
    var _oMaskPreloader;
    var _oContainer;
    
    this._init = function(){
       s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );
       s_oSpriteLibrary.addSprite("bg_preloader","./sprites/bg_preloader.jpg");
       s_oSpriteLibrary.addSprite("progress_bar","./sprites/progress_bar.png");
       s_oSpriteLibrary.loadSprites();
       
       _oContainer = new createjs.Container();
       s_oStage.addChild(_oContainer); 
    };
    
    this.unload = function(){
	_oContainer.removeAllChildren();
    };
    
    this._onImagesLoaded = function(){

    };
    
    this._onAllImagesLoaded = function(){
        this.attachSprites();
        
        s_oMain.preloaderReady();
    };
    
    this.attachSprites = function(){
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_preloader'));
        _oContainer.addChild(oBg);
       
       _oProgressBar  = createBitmap(s_oSpriteLibrary.getSprite('progress_bar'));
       _oProgressBar.x = 761;
       _oProgressBar.y = CANVAS_HEIGHT - 99;
       _oContainer.addChild(_oProgressBar);
       
       _iMaskWidth = 976;
       _oMaskPreloader = new createjs.Shape();
       _oMaskPreloader.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(761, CANVAS_HEIGHT - 99, 1,30);
       _oContainer.addChild(_oMaskPreloader);
       
       _oProgressBar.mask = _oMaskPreloader;
       _oLoadingText = new createjs.Text("0%","30px "+FONT1, "#fff");
       _oLoadingText.x = 800;
       _oLoadingText.y = CANVAS_HEIGHT - 105;
       _oLoadingText.textAlign = "center"; 
       _oLoadingText.textBaseline = "middle";
       _oContainer.addChild(_oLoadingText);
    };
    
    this.refreshLoader = function(iPerc){
        _oLoadingText.text = iPerc+"%";
        
        var iNewMaskWidth = Math.floor((iPerc*_iMaskWidth)/100);
        _oMaskPreloader.graphics.clear();
        _oMaskPreloader.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(561, CANVAS_HEIGHT - 99, iNewMaskWidth,30);
    };
    
    this._init();   
}function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);       
        createjs.Touch.enable(s_oStage);
        
        s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        s_iPrevTime = new Date().getTime();

        createjs.Ticker.setFPS(30);
	createjs.Ticker.addEventListener("tick", this._update);
		
	if(navigator.userAgent.match(/Windows Phone/i)){
            DISABLE_SOUND_MOBILE = true;
        }
		
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.soundLoaded = function(){
         _iCurResource++;
         var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            this.removePreloader();
        }
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
                createjs.Sound.registerSound("./sounds/card.ogg", "card");
                createjs.Sound.registerSound("./sounds/press_but.ogg", "press_but");
                createjs.Sound.registerSound("./sounds/win.ogg", "win");
                createjs.Sound.registerSound("./sounds/lose.ogg", "lose");
                createjs.Sound.registerSound("./sounds/press_hold.ogg", "press_hold");
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
                createjs.Sound.registerSound("./sounds/card.mp3", "card");
                createjs.Sound.registerSound("./sounds/press_but.mp3", "press_but");
                createjs.Sound.registerSound("./sounds/win.mp3", "win");
                createjs.Sound.registerSound("./sounds/lose.mp3", "lose");
                createjs.Sound.registerSound("./sounds/press_hold.mp3", "press_hold");
        }
        RESOURCE_TO_LOAD += 6;
        
    };
    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );
        
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_menu_bg","./sprites/but_menu_bg.png");
        s_oSpriteLibrary.addSprite("but_game_bg","./sprites/but_game_bg.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("card_spritesheet","./sprites/card_spritesheet.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_left","./sprites/but_left.png");
        s_oSpriteLibrary.addSprite("but_right","./sprites/but_right.png");
        s_oSpriteLibrary.addSprite("hold","./sprites/hold.png");
        s_oSpriteLibrary.addSprite("logo_game","./sprites/logo_game.png");
        s_oSpriteLibrary.addSprite("paytable","./sprites/paytable.png");
        s_oSpriteLibrary.addSprite("display_bg","./sprites/display_bg.png");
        s_oSpriteLibrary.addSprite("big_display","./sprites/big_display.png");
        s_oSpriteLibrary.addSprite("selection","./sprites/selection.png");
        s_oSpriteLibrary.addSprite("card_selection","./sprites/card_selection.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();

        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            this.removePreloader();
        }
    };
    
    this.preloaderReady = function(){
        this._loadImages();
		
	if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        _bUpdate = true;
    };
    
    this.removePreloader = function(){
        _oPreloader.unload();
        
        if (!isIOS()) {
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundTrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }
        }
        
        this.gotoMenu();
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function(){
        _oGame = new CGame(_oData);   
							
        _iState = STATE_GAME;
        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
    
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
	createjs.Sound.setMute(true);
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");

        if(s_bAudioActive){
                createjs.Sound.setMute(false);
        }
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    _oData = oData;
    ENABLE_FULLSCREEN = _oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = _oData.check_orientation;
    
    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain = null;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_bFullscreen = false;function CTextButton(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,oContainer){
    var _bDisable;
    var _iWidth;
    var _iHeight;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oButtonBg;
    var _oTextBack;
    var _oText;
    var _oContainer;
    
    this._init =function(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,oContainer){
        _bDisable = false;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        _oContainer = oContainer;

        _oButtonBg = createBitmap( oSprite);
        _iWidth = oSprite.width;
        _iHeight = oSprite.height;
        var iStepShadow = Math.ceil(iFontSize/20);

        _oTextBack = new createjs.Text(szText,"bold "+iFontSize+"px "+szFont, "#000000");
        var oBounds = _oTextBack.getBounds();
        _oTextBack.textAlign = "center";
        _oTextBack.textBaseline = "alphabetic";
        _oTextBack.x = oSprite.width/2 + iStepShadow;
        _oTextBack.y = Math.floor((oSprite.height)/2) +(oBounds.height/3) + iStepShadow;

        _oText = new createjs.Text(szText,"bold "+iFontSize+"px "+szFont, szColor);
        _oText.textAlign = "center";
        _oText.textBaseline = "alphabetic";  
        _oText.x = oSprite.width/2;
        _oText.y = Math.floor((oSprite.height)/2) +(oBounds.height/3);

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
        _oButton.cursor = "pointer";
        _oButton.addChild(_oButtonBg,_oTextBack,_oText);

        _oContainer.addChild(_oButton);

        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown");
       _oButton.off("pressup");
       
       _oContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this.enable = function(){
        _bDisable = false;
        _oButtonBg.filters = [];

        _oButtonBg.cache(0,0,_iWidth,_iHeight);
    };
    
    this.disable = function(){
        _bDisable = true;
        var matrix = new createjs.ColorMatrix().adjustSaturation(-100);
        _oButtonBg.filters = [
                 new createjs.ColorMatrixFilter(matrix)
        ];
        _oButtonBg.cache(0,0,_iWidth,_iHeight);
		
    };
    
    this._initListener = function(){
       oParent = this;

       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        
        playSound("press_but",1,0);
        
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.changeText = function(szText){
        _oText.text = szText;
        _oTextBack.text = szText;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this._init(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,oContainer);
    
    return this;
    
}function CGfxButton(iXPos,iYPos,oSprite){
    var _bDisable;
    var _iWidth;
    var _iHeight;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oButton;
    
    this._init =function(iXPos,iYPos,oSprite){
        _bDisable = false;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _iWidth = oSprite.width;
        _iHeight = oSprite.height;
        
        _oButton = createBitmap( oSprite);
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
                                   
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
        _oButton.cursor = "pointer";
        s_oStage.addChild(_oButton);
        
        
        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown", this.buttonDown);
       _oButton.off("pressup" , this.buttonRelease); 
       
       s_oStage.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this._initListener = function(){
       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.addEventListenerWithParams = function(iEvent,cbCompleted, cbOwner,aParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        
        playSound("press_but",1,0);
        
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_aParams);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };

    this.enable = function(){
        _bDisable = false;
        
        _oButton.filters = [];

        _oButton.cache(0,0,_iWidth,_iHeight);
    };
    
    this.disable = function(){
        _bDisable = true;
        
        var matrix = new createjs.ColorMatrix().adjustSaturation(-100).adjustBrightness(40);
        _oButton.filters = [
                 new createjs.ColorMatrixFilter(matrix)
        ];
        _oButton.cache(0,0,_iWidth,_iHeight);
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };
    
    
    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this._init(iXPos,iYPos,oSprite);
    
    return this;
}function CToggle(iXPos,iYPos,oSprite,bActive){
    var _bActive;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    
    this._init = function(iXPos,iYPos,oSprite,bActive){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: oSprite.width/2, height: oSprite.height, regX: (oSprite.width/2)/2, regY: oSprite.height/2}, 
                        animations: {state_true:[0],state_false:[1]}
                   };
                   
         var oSpriteSheet = new createjs.SpriteSheet(oData);
         
         _bActive = bActive;
	 _oButton = createSprite(oSpriteSheet, "state_"+_bActive,(oSprite.width/2)/2,oSprite.height/2,oSprite.width/2,oSprite.height);
         
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
        _oButton.stop();
        _oButton.cursor = "pointer";
        s_oStage.addChild(_oButton);
        
        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown", this.buttonDown);
       _oButton.off("pressup" , this.buttonRelease);
	   
       s_oStage.removeChild(_oButton);
    };
    
    this._initListener = function(){
       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.setActive = function(bActive){
        _bActive = bActive;
        _oButton.gotoAndStop("state_"+_bActive);
    };
    
    this.buttonRelease = function(){
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;
        
        playSound("press_but",1,0);
        
        _bActive = !_bActive;
        _oButton.gotoAndStop("state_"+_bActive);

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_bActive);
        }
    };
    
    this.buttonDown = function(){
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this._init(iXPos,iYPos,oSprite,bActive);
}function CMenu(){
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    
    var _oBg;
    var _oButPlay;
    var _oAudioToggle;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oFade;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_menu_bg');
        _oButPlay = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT -164,oSprite,TEXT_PLAY,"Arial","#ffffff",40,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width/4) - 10, y: (oSprite.height/2) + 10};   
            _oAudioToggle = new CToggle(CANVAS_WIDTH - (oSprite.width/2) + 20,(oSprite.height/2) + 20,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            if( !(isIOS() && s_oSoundTrack === null) ){
                s_oSoundTrack.setVolume(1);
            }
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x:oSprite.width/4 + 10,y:oSprite.height/2 + 10};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,true);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 500).call(function(){_oFade.visible = false;});  

        this.refreshButtonPos (s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.unload();
        }
        
        s_oStage.removeChild(_oBg);
        _oBg = null;
        
        s_oStage.removeChild(_oFade);
        _oFade = null;
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this._onButPlayRelease = function(){
        this.unload();
        
        if (isIOS() && s_oSoundTrack === null) {
             if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundTrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }
        }
        
        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame();
    };

    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
            s_bFullscreen = false;
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
            s_bFullscreen = true;
        }
        
        sizeHandler();
    };
    
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;function CGame(oData){
    var _bBlock;
    var _bWinCurHand;
    var _iMoney;
    var _iGameCash;
    var _iState;
    var _iCurBet;
    var _iCurWin;
    var _iCurBetIndex;
    var _iCurCreditIndex;
    var _iCurIndexDeck;
    var _iCurState;
    var _iHandCont;
    var _aCurHand = new Array();
    var _aCardDeck;
    var _oGameSettings;
    var _oHandEvaluator;
    
    var _oBg;
    var _oInterface;
    var _oPayTable;
    var _oGameOverPanel;
    var _oCardAttach;

    this._init = function(){
        s_oPayTableSettings = new CPayTableSettings();
        _iMoney  = TOTAL_MONEY;
        _iGameCash = GAME_CASH;

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);

        _oCardAttach = new createjs.Container();
        _oCardAttach.x = 600;
        _oCardAttach.y = 530;
        s_oStage.addChild(_oCardAttach);
        
        _oPayTable = new CPayTable(550,149);

        _bBlock = false;
        _iCurBetIndex = 0;
        _iCurCreditIndex = 0;
        _iCurWin = 0;
        _iHandCont = 0;
        _iCurBet = parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
		
		
        _oPayTable.setCreditColumn(_iCurCreditIndex);
        
        _iCurState = STATE_GAME_WAITING_FOR_BET;

        _oInterface = new CInterface(_iMoney,BET_TYPE[_iCurBetIndex]);

	_oGameOverPanel = new CGameOver();
        
        _oGameSettings=new CGameSettings();
        _oHandEvaluator = new CHandEvaluator();
        
        _iCurIndexDeck = 0;
        _aCardDeck = new Array();
        _aCardDeck = _oGameSettings.getShuffledCardDeck();

        //FIND MIN WIN
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);

        this.placeFakeCardForStarting();
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            s_oSoundTrack.setVolume(0.5);
        }
        
    };
    
    this.unload = function(){
        _oInterface.unload();
	_oGameOverPanel.unload();
        s_oStage.removeAllChildren();
    };
    
    this.resetHand = function(){
        _iCurWin = 0;
        //SHUFFLE CARD DECK EVERYTIME A NEW HAND STARTS
        _iCurIndexDeck = 0;
        _aCardDeck = new Array();
        _aCardDeck = _oGameSettings.getShuffledCardDeck();
        
        for(var i=0;i<_aCurHand.length;i++){
            _aCurHand[i].reset();
        }
        _oInterface.resetHand();
        _oPayTable.resetHand();
        
        this.checkMoney();
        
        _bBlock = false;
        _iCurState = STATE_GAME_WAITING_FOR_BET;
        
        
    };
    
    this.checkMoney = function(){
        if(_iMoney < _iCurBet){
            //NOT ENOUGH MONEY
            _iCurBetIndex = 0;
            _iCurCreditIndex = 0;
            _iCurBet = parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
            
            if(_iMoney < _iCurBet){
                this._gameOver();
            }else{
                _oInterface.refreshMoney(_iMoney,_iCurBet);
                _oInterface.refreshBet(BET_TYPE[_iCurBetIndex]);
            }
            
        }
    };
    
    this.changeState = function(iState){
        _iState=iState;

        switch(_iState){
            case STATE_GAME_DEALING:{
                
                break;
            }
        }
    };
    
    this.placeFakeCardForStarting = function(){
        var oSprite = s_oSpriteLibrary.getSprite('card_spritesheet');
        var oData = {   // image to use
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CARD_WIDTH, height: CARD_HEIGHT, regX: CARD_WIDTH/2, regY: CARD_HEIGHT/2}, 
                        animations: {  card_1_1: [0],card_1_2:[1],card_1_3:[2],card_1_4:[3],card_1_5:[4],card_1_6:[5],card_1_7:[6],card_1_8:[7],
                                       card_1_9:[8],card_1_10:[9],card_1_J:[10],card_1_Q:[11],card_1_K:[12],
                                       card_2_1: [13],card_2_2:[14],card_2_3:[15],card_2_4:[16],card_2_5:[17],card_2_6:[18],card_2_7:[19],
                                       card_2_8:[20], card_2_9:[21],card_2_10:[22],card_2_J:[23],card_2_Q:[24],card_2_K:[25],
                                       card_3_1: [26],card_3_2:[27],card_3_3:[28],card_3_4:[29],card_3_5:[30],card_3_6:[31],card_3_7:[32],
                                       card_3_8:[33], card_3_9:[34],card_3_10:[35],card_3_J:[36],card_3_Q:[37],card_3_K:[38],
                                       card_4_1: [39],card_4_2:[40],card_4_3:[41],card_4_4:[42],card_4_5:[43],card_4_6:[44],card_4_7:[45],
                                       card_4_8:[46], card_4_9:[47],card_4_10:[48],card_4_J:[49],card_4_Q:[50],card_4_K:[51],back:[52]}
                        
        };
        
        var iX = 0;
        var iY = 0;
        for(var i=0;i<5;i++){
            var oSpriteSheet = new createjs.SpriteSheet(oData);
            var oBackCard = createSprite(oSpriteSheet,"back",CARD_WIDTH/2,CARD_HEIGHT/2,CARD_WIDTH,CARD_HEIGHT);
            oBackCard.x = iX;
            oBackCard.y = iY;
            oBackCard.shadow = new createjs.Shadow("#000000", 5, 5, 5);
            _oCardAttach.addChild(oBackCard);
            
            iX += 180;
        }
    };

    this.dealCards = function(){
        if(_bBlock){
            return;
        }
        if(_iMoney <= 0){
            return;
        }
        
        _bBlock = true;
        
        _oCardAttach.removeAllChildren();
        
        var iRandWin;
        //IF THERE ARE NO ENOUGH MONEY IN THE GAME CASH, USER MUST LOSE
        trace("_iGameCash: "+_iGameCash)
        if(_iGameCash < MIN_WIN){
            iRandWin = WIN_OCCURRENCE+1;
        }else{
            iRandWin = Math.floor(Math.random()*101);
        }
        trace("iRandWin: "+iRandWin)
        if(iRandWin > WIN_OCCURRENCE){
            //LOSE
            do{
                this._createCard();
            }while( _oHandEvaluator.evaluate(_aCurHand) < HIGH_CARD);
            _bWinCurHand = false;
        }else{
            //WIN
            var iCont = 0;
            do{
                this._createCard();
                
                var iRet = _oHandEvaluator.evaluate(_aCurHand);
                var iWin = 0;
                if(iRet < HIGH_CARD){
                    iWin = s_oPayTableSettings.getWin(_iCurCreditIndex,iRet) * _iCurBet;
                }
                
                iCont++;
            }while(_iGameCash < iWin && iCont < 5000);
            
            if(iCont >= 5000){
                //USER MUST LOSE BECAUSE CAN'T FIND ANY WINNING HAND
                do{
                    this._createCard();
                }while( _oHandEvaluator.evaluate(_aCurHand) < HIGH_CARD);
                _bWinCurHand = false;
            }else{
                _bWinCurHand = true;
            }
            
        }
        
        
        //DECREASE MONEY
        _iMoney -= _iCurBet;
        _iMoney = parseFloat(_iMoney.toFixed(2));
        _iGameCash += _iCurBet;
        _iGameCash = parseFloat(_iGameCash.toFixed(2));
        _oInterface.refreshMoney(_iMoney,_iCurBet);
        
        playSound("card",1,0);
        
        _iCurState = STATE_GAME_DEAL;
    };
    
    this._createCard = function(){
        
        for(var j=0;j<_aCurHand.length;j++){
            _aCurHand[j].unload();
        }
        
        var iX = 0;
        var iY = 0;
        _aCurHand = new Array();
        for(var i=0;i<5;i++){
            var oCard = new CCard(iX,iY,_oCardAttach,_aCardDeck[_iCurIndexDeck].fotogram,_aCardDeck[_iCurIndexDeck].rank,_aCardDeck[_iCurIndexDeck].suit);
            oCard.addEventListener(ON_CARD_SHOWN,this._onCardShown);
            oCard.addEventListener(ON_CARD_HIDE,this._onCardHide);
            _aCurHand.push(oCard);
            _iCurIndexDeck++;
            this._checkDeckLength();
            iX += 180;
            
            oCard.showCard();
        }
    };
    
    this.drawCards = function(){
        if(_bBlock){
            return;
        }
        
        _bBlock = true;
        
        playSound("card",1,0);
        
        var iNumHold = _aCurHand.length;
        for(var i=0;i<_aCurHand.length;i++){
            if(_aCurHand[i].isHold() === false){
                _aCurHand[i].hideCard();
                iNumHold--;
            }
        }
        
        if(iNumHold === _aCurHand.length){
            _iCurState = STATE_GAME_DRAW;
            this._onCardShown();
        } 
    };
    
    this._checkDeckLength = function(){
        if(_iCurIndexDeck >= _aCardDeck.length){
            _aCardDeck = _oGameSettings.getShuffledCardDeck();
            _iCurIndexDeck = 0;
        }
    };
    
     this.assignWin = function(iRet){
        playSound("win",1,0);

        var aSortedHand = _oHandEvaluator.getSortedHand();

        for(var i=0;i<_aCurHand.length;i++){
            for(var j=0;j<aSortedHand.length;j++){ 
                if(aSortedHand[j].rank === _aCurHand[i].getRank() && aSortedHand[j].suit === _aCurHand[i].getSuit()){
                    _aCurHand[i].highlight();
                    break;
                }
            }
        }
        
        _oPayTable.showWinAnim(_iCurCreditIndex,iRet);
        _iCurWin = s_oPayTableSettings.getWin(_iCurCreditIndex,iRet) * _iCurBet;
        _iMoney += _iCurWin;
        _iMoney = parseFloat(_iMoney.toFixed(2));
        _iGameCash -= _iCurWin;
        
        _oInterface.refreshWin(_iCurWin);
        _oInterface.refreshMoney(_iMoney,_iCurBet);
     };
     
    this.recharge = function(){
        _iMoney = TOTAL_MONEY;
        _oPayTable.setCreditColumn(_iCurCreditIndex);
        
        
        this.checkMoney();
        _oInterface.refreshMoney(_iMoney,_iCurBet);
        _oInterface.refreshBet(BET_TYPE[_iCurBetIndex]);
        
        _oGameOverPanel.hide(); 
    };
     
    this._gameOver = function(){
        _oGameOverPanel.show();
    };
    
    this.onCardSelected = function(oCard){
        if(_iCurState !== STATE_GAME_CHOOSE_HOLD){
            return;
        }
        
        oCard.toggleHold();
    };
    
    this._onCardShown = function(){
        if(_iCurState === STATE_GAME_CHOOSE_HOLD){
            return;
        }
        
        switch(_iCurState){
            case STATE_GAME_DEAL:{
                    _iCurState = STATE_GAME_CHOOSE_HOLD;
                    _oInterface.setState(_iCurState);
                    break;
            }
            case STATE_GAME_DRAW:{

                    var iRet = _oHandEvaluator.evaluate(_aCurHand);
                    _oInterface.setState(_iCurState);

                    if(iRet !== HIGH_CARD){
                        s_oGame.assignWin(iRet);
                    }else{
                        playSound("lose",1,0);
                        _oInterface.showLosePanel();
                    }
                    
                    _iHandCont++;
                    if(_iHandCont === NUM_HAND_FOR_ADS){
                        _iHandCont = 0;
                        $(s_oMain).trigger("save_score",[_iMoney]);
                        $(s_oMain).trigger("show_interlevel_ad");
                    }else if(_iHandCont === NUM_HAND_FOR_ADS-1){
                        $(s_oMain).trigger("share_event",[_iMoney]);
                    }
                    
                    
                    _iCurState = STATE_GAME_EVALUATE;
                    break;
            } 
            case STATE_GAME_EVALUATE:{
                _oInterface.setState(_iCurState);
                //_iCurState = STATE_GAME_WAITING_FOR_BET;
                break;
            }
        }
        
        _bBlock = false;
    };
    
    this._onCardHide = function(){
        
        if(_iCurState === STATE_GAME_DRAW){
            return;
        }
        
        _iCurState = STATE_GAME_DRAW;

        if(_bWinCurHand){
            var iCont = 0;
            do{
                s_oGame._changeCardValue();
                var iRet = _oHandEvaluator.evaluate(_aCurHand);
                for(var k=0;k<_aCurHand.length;k++){
                    trace("_aCurHand["+k+"]: "+_aCurHand[k].getRank());
                }
                
                var iWin;
                if(iRet === HIGH_CARD){
                    iWin = 0;
                }else{
                    iWin = s_oPayTableSettings.getWin(_iCurCreditIndex,iRet) * _iCurBet;
                }
                iCont++;
                trace("iWin: "+iWin)
            }while( (iRet === HIGH_CARD ||  _iGameCash <  iWin ) && iCont<1000);
            
            if(iCont >= 1000){
                //USER MUST LOSE BECAUSE CAN'T FIND ANY WINNING HAND
                do{
                    s_oGame._changeCardValue();
                    var iRet = _oHandEvaluator.evaluate(_aCurHand);
                }while( iRet < HIGH_CARD);
                _bWinCurHand = false;
            }
        }else{
            do{
                s_oGame._changeCardValue();
                var iRet = _oHandEvaluator.evaluate(_aCurHand);
            }while(iRet < HIGH_CARD);
        }
        
        for(var i=0;i<5;i++){
            _aCurHand[i].setHold(false);
        }
    };
    
    this._changeCardValue = function(){
        for(var i=0;i<5;i++){
            if(_aCurHand[i].isHold() === false){
                _aCurHand[i].changeInfo(_aCardDeck[_iCurIndexDeck].fotogram,_aCardDeck[_iCurIndexDeck].rank,_aCardDeck[_iCurIndexDeck].suit);
                _aCurHand[i].showCard();
                _iCurIndexDeck++;    
                this._checkDeckLength();
            }
        }
    };

    this._onButDealRelease = function(){
        switch(_iCurState){
            case STATE_GAME_WAITING_FOR_BET:{
                    this.dealCards();
                    break;
            }
            case STATE_GAME_CHOOSE_HOLD:{
                    this.drawCards();
                    break;
            }
            case STATE_GAME_EVALUATE:{
                    this.resetHand();
                    this.dealCards();
                    break;
            }
        }
    };
    
    this._onButLeftRelease = function(){
        if(_iCurBetIndex === 0 || _bBlock || (_iCurState !== STATE_GAME_WAITING_FOR_BET && _iCurState !== STATE_GAME_EVALUATE)){
            return;
        }
        
        _iCurBetIndex--;
        var iNewBet= parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
        if(_iMoney < iNewBet){
            _iCurBetIndex++;
            return;
        }
        
        _iCurBet = iNewBet;
        _oInterface.refreshMoney(_iMoney,_iCurBet);
        _oInterface.refreshBet(BET_TYPE[_iCurBetIndex]);
        
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);

    };
    
    this._onButRightRelease = function(){
        if(_iCurBetIndex === BET_TYPE.length-1 || _bBlock || (_iCurState !== STATE_GAME_WAITING_FOR_BET && _iCurState !== STATE_GAME_EVALUATE)){
            return;
        }
        
        _iCurBetIndex++;
        var iNewBet= parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
        if(_iMoney < iNewBet){
            _iCurBetIndex--;
            return;
        }
        
        _iCurBet = iNewBet;
        _oInterface.refreshMoney(_iMoney,_iCurBet);
        _oInterface.refreshBet(BET_TYPE[_iCurBetIndex]);
        
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);

    };
    
    this._onButBetOneRelease = function(){
        if(_bBlock || (_iCurState !== STATE_GAME_WAITING_FOR_BET && _iCurState !== STATE_GAME_EVALUATE)){
            return;
        }
        
        _iCurCreditIndex++;
        if(_iCurCreditIndex === NUM_BETS){
            _iCurCreditIndex = 0;
        }
        
        
        var iNewBet= parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
        if(_iMoney < iNewBet){
            if(_iCurCreditIndex === 0){
                _iCurCreditIndex = NUM_BETS-1;
            }else{
                _iCurCreditIndex--;
            }
            return;
        }
        
        _iCurBet = iNewBet;
        _oInterface.refreshMoney(_iMoney,_iCurBet);
        
        _oPayTable.setCreditColumn(_iCurCreditIndex);
        
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);
    };
    
    this._onButBetMaxRelease = function(){
        if(_bBlock || (_iCurState !== STATE_GAME_WAITING_FOR_BET && _iCurState !== STATE_GAME_EVALUATE) ){
            return;
        }
	_bBlock = true;
		
        _iCurCreditIndex = NUM_BETS-1;
        var iNewBet= parseFloat(BET_TYPE[_iCurBetIndex] * (_iCurCreditIndex+1));
        if(_iMoney < iNewBet){
            this._gameOver();
            return;
        }
        
        _iCurBet = iNewBet;
        _oInterface.refreshMoney(_iMoney,_iCurBet);
        _oPayTable.setCreditColumn(_iCurCreditIndex);
        
        MIN_WIN = (COMBO_PRIZES[COMBO_PRIZES.length-1] * _iCurBet) * (_iCurCreditIndex+1);
        
	this.resetHand();
        this.dealCards();
    };
    
    this.onExit = function(){
        this.unload();

        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
    };

    this.update = function(){

    };
    
    s_oGame = this;
    
    WIN_OCCURRENCE = oData.win_occurrence;
    GAME_CASH = oData.game_cash;
    BET_TYPE = oData.bets;
    COMBO_PRIZES = oData.combo_prizes;
    TOTAL_MONEY = oData.money;
    AUTOMATIC_RECHARGE = oData.recharge;
    NUM_HAND_FOR_ADS = oData.num_hand_before_ads;
    
    this._init();
}

var s_oGame;
 var s_oPayTableSettings;function CInterface(iMoney,iBet){
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosFullscreen;
    
    var _oButExit;
    var _oArrowLeft;
    var _oArrowRight;
    var _oBetOneBut;
    var _oBetMaxBut;
    var _oDealBut;
    var _oAudioToggle;
    var _oMoneyText;
    var _oWinText;
    var _oBetText;
    var _oTotBetText;
    var _oLosePanel;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function(iMoney,iBet){
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x:CANVAS_WIDTH - (oSprite.width/2) - 2,y:(oSprite.height/2) + 2};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _pStartPosAudio = {x:_oButExit.getX() - oSprite.width,y:(oSprite.height/2) + 2};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,s_oSpriteLibrary.getSprite('audio_icon'),s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _pStartPosFullscreen = {x:_pStartPosAudio.x - oSprite.width - 10,y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x:_oButExit.getX() - oSprite.width - 10,y:(oSprite.height/2) + 2};
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,true);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        var oDisplayWin = createBitmap(s_oSpriteLibrary.getSprite('display_bg'));
        oDisplayWin.x = 480;
        oDisplayWin.y = 25;
        s_oStage.addChild(oDisplayWin);
        
        var oWinTextBg = new createjs.Text(TEXT_WIN,"21px "+FONT1, "#fff");
        oWinTextBg.x = 490;
        oWinTextBg.y = 32;
        oWinTextBg.textAlign = "center";
        oWinTextBg.textBaseline = "middle";
        s_oStage.addChild(oWinTextBg);
        
        var oDisplayBet = createBitmap(s_oSpriteLibrary.getSprite('display_bg'));
        oDisplayBet.x = 480;
        oDisplayBet.y = 93;
        s_oStage.addChild(oDisplayBet);
        
        var oBetTextBg = new createjs.Text(TEXT_BET,"21px "+FONT1, "#fff");
        oBetTextBg.x = 490;
        oBetTextBg.y = 100;
        oBetTextBg.textAlign = "center";
        oBetTextBg.textBaseline = "middle";
        s_oStage.addChild(oBetTextBg);
        
        var oDisplayMoney = createBitmap(s_oSpriteLibrary.getSprite('display_bg'));
        oDisplayMoney.x = 470;
        oDisplayMoney.y = 687;
        s_oStage.addChild(oDisplayMoney);
        
        var oMoneyTextBg = new createjs.Text(TEXT_MONEY,"21px "+FONT1, "#fff");
        oMoneyTextBg.x = 490;
        oMoneyTextBg.y = 695;
        oMoneyTextBg.textAlign = "center";
        oMoneyTextBg.textBaseline = "middle";
        s_oStage.addChild(oMoneyTextBg);
	
	_oMoneyText = new createjs.Text(iMoney.toFixed(2)+TEXT_CURRENCY,"bold 29px "+FONT2, "#ffde00");
        _oMoneyText.x = 590;
        _oMoneyText.y = CANVAS_HEIGHT - 65;
        _oMoneyText.textAlign = "center";
        s_oStage.addChild(_oMoneyText);
        
        _oBetText = new createjs.Text(iBet.toFixed(2)+TEXT_CURRENCY,"bold 29px "+FONT2, "#ffde00");
        _oBetText.x = 590;
        _oBetText.y = 110;
        _oBetText.textAlign = "center";
        s_oStage.addChild(_oBetText);
        
        _oWinText = new createjs.Text("0"+TEXT_CURRENCY,"bold 29px "+FONT2, "#ffde00");
        _oWinText.x = 590;
        _oWinText.y = 40;
        _oWinText.textAlign = "center";
        s_oStage.addChild(_oWinText);
        
        var oBigDisplay = createBitmap(s_oSpriteLibrary.getSprite('big_display'));
        oBigDisplay.x = 770;
        oBigDisplay.y = 686;
        s_oStage.addChild(oBigDisplay);
        
        _oTotBetText = new createjs.Text(iBet.toFixed(2)+TEXT_CURRENCY,"bold 40px "+FONT2, "#ffde00");
        _oTotBetText.x = 840;
        _oTotBetText.y = 700;
        _oTotBetText.textAlign = "center";
        s_oStage.addChild(_oTotBetText);
        
        var oSprite = s_oSpriteLibrary.getSprite('logo_game');
        var oLogo = createBitmap(oSprite);
        oLogo.x = CANVAS_WIDTH/2;
        oLogo.y = 17;
        oLogo.regX = oSprite.width/2;
        s_oStage.addChild(oLogo);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_left');
        _oArrowLeft = new CGfxButton(744,722,oSprite,s_oStage);
        _oArrowLeft.addEventListener(ON_MOUSE_UP, this._onButLeftRelease, this);

        oSprite = s_oSpriteLibrary.getSprite('but_right');
        _oArrowRight = new CGfxButton(930,722,oSprite,s_oStage);
        _oArrowRight.addEventListener(ON_MOUSE_UP, this._onButRightRelease, this);
        
        oSprite = s_oSpriteLibrary.getSprite('but_game_bg');
        _oBetOneBut = new CTextButton(1040,716,oSprite,TEXT_BET_ONE,FONT1,"#ffffff",23,s_oStage);
        _oBetOneBut.addEventListener(ON_MOUSE_UP, this._onButBetOneRelease, this);
        
        _oBetMaxBut = new CTextButton(1190,716,oSprite,TEXT_MAX_BET,FONT1,"#ffffff",23,s_oStage);
        _oBetMaxBut.addEventListener(ON_MOUSE_UP, this._onButBetMaxRelease, this);
        
        _oDealBut = new CTextButton(1340,716,oSprite,TEXT_DEAL,FONT1,"#ffffff",30,s_oStage);
        _oDealBut.addEventListener(ON_MOUSE_UP, this._onButDealRelease, this);
        
        _oLosePanel = new createjs.Container();
        _oLosePanel.visible = false;
        _oLosePanel.x = 710;
        _oLosePanel.y = 500;
        s_oStage.addChild(_oLosePanel);
        
        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0,0,500,100);
        _oLosePanel.addChild(oFade);
        
        var oText = new createjs.Text(TEXT_NO_WIN,"50px "+FONT1, "#fff");
        oText.x = 250;
        oText.y = 20;
        oText.textAlign = "center";
        _oLosePanel.addChild(oText);
        
        this.refreshButtonPos (s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oArrowLeft.unload();
        _oArrowRight.unload();
        _oBetOneBut.unload();
        _oBetMaxBut.unload();
        _oDealBut.unload();

        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.unload();
        }
        
        s_oInterface = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this.setState = function(iState){
        switch(iState){
            case STATE_GAME_CHOOSE_HOLD:{
                _oDealBut.changeText(TEXT_DRAW);
                break;
            }
            case STATE_GAME_EVALUATE:{
                _oDealBut.changeText(TEXT_DEAL);
                break;
            }
        }
    };
    
    this.resetHand = function(){
        this.refreshWin(0);
        _oLosePanel.visible = false;
    };
    
    this.refreshMoney = function(iMoney,iBet){
        _oMoneyText.text = iMoney.toFixed(2)+TEXT_CURRENCY;
        _oBetText.text = iBet.toFixed(2)+TEXT_CURRENCY;
    };
    
    this.refreshWin = function(iWin){
        _oWinText.text = iWin.toFixed(2)+TEXT_CURRENCY;
    };
    
    this.refreshBet = function(iBet){
        _oTotBetText.text = iBet.toFixed(2)+TEXT_CURRENCY;
    };
    
    this.showLosePanel = function(){
        _oLosePanel.visible = true;
    };

    this._onButLeftRelease = function(){
        s_oGame._onButLeftRelease();
    };
    
    this._onButRightRelease = function(){
        s_oGame._onButRightRelease();
    };
    
    this._onButBetOneRelease = function(){
        s_oGame._onButBetOneRelease();
    };
    
    this._onButBetMaxRelease = function(){
        s_oGame._onButBetMaxRelease();
    };
    
    this._onButDealRelease = function(){
        s_oGame._onButDealRelease();
    };
    
    this._onExit = function(){
        s_oGame.onExit();  
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
            s_bFullscreen = false;
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
            s_bFullscreen = true;
        }
        
        sizeHandler();
    };
    
    s_oInterface = this;
    
    this._init(iMoney,iBet);
    
    return this;
}

var s_oInterface = null;function CGameSettings(){
    
    var _aCardDeck;
    var _aShuffledCardDecks;
    var _aCardValue;
    
    this._init = function(){
        var iSuit = -1;
        _aCardDeck=new Array();
        for(var j=0;j<52;j++){
            
            var iRest=(j+1)%13;
            if(iRest === 1){
                iRest=14;
                iSuit++;
            }else if(iRest === 0){
                iRest = 13;
            }
            _aCardDeck.push({fotogram:j,rank:iRest,suit:iSuit});
        }
        
    };
	
    this.timeToString = function( iMillisec ){		
        iMillisec = Math.round((iMillisec/1000));

        var iMins = Math.floor(iMillisec/60);
        var iSecs = iMillisec-(iMins*60);

        var szRet = "";

        if ( iMins < 10 ){
                szRet += "0" + iMins + ":";
        }else{
                szRet += iMins + ":";
        }

        if ( iSecs < 10 ){
                szRet += "0" + iSecs;
        }else{
                szRet += iSecs;
        } 

        return szRet;   
    };
		
    this.getShuffledCardDeck = function(){
        var aTmpDeck=new Array();

        for(var i=0;i<_aCardDeck.length;i++){
                aTmpDeck[i]=_aCardDeck[i];
        }

        _aShuffledCardDecks = new Array();
        while (aTmpDeck.length > 0) {
                _aShuffledCardDecks.push(aTmpDeck.splice(Math.round(Math.random() * (aTmpDeck.length - 1)), 1)[0]);
        }
        //_aShuffledCardDecks.unshift({fotogram:26,rank:14,suit:2},{fotogram:16,rank:4,suit:1},{fotogram:4,rank:5,suit:0},{fotogram:3,rank:4,suit:0},{fotogram:41,rank:3,suit:3},{fotogram:1,rank:2,suit:0})
        //_aShuffledCardDecks.unshift({fotogram:2,rank:3,suit:0},{fotogram:45,rank:7,suit:3},{fotogram:17,rank:5,suit:1},{fotogram:18,rank:6,suit:1},{fotogram:14,rank:2,suit:1},{fotogram:18,rank:6,suit:1})
        return _aShuffledCardDecks;
    };
		
    this.getCardValue = function(iId){
            return _aCardValue[iId];
    };
                
    this._init();
}function CCard(iX,iY,oContainer,szFotogram,iRank,iSuit){
    var _bHold;
    var _szFotogram;
    var _iRank;
    var _iSuit;
    
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oCardSprite;
    var _oHoldSprite;
    var _oHitArea;
    var _oSelection;
    var _oContainer;
    var _oThisCard;
                
    this._init = function(iX,iY,oContainer,szFotogram,iRank,iSuit){
        _bHold = false;
        _oContainer = oContainer;
        _szFotogram = szFotogram;
        _iRank = iRank;
        _iSuit = iSuit;

        var oSprite = s_oSpriteLibrary.getSprite('card_spritesheet');
        var oData = {   // image to use
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CARD_WIDTH, height: CARD_HEIGHT, regX: CARD_WIDTH/2, regY: CARD_HEIGHT/2}, 
                        animations: {  card_1_1: [0],card_1_2:[1],card_1_3:[2],card_1_4:[3],card_1_5:[4],card_1_6:[5],card_1_7:[6],card_1_8:[7],
                                       card_1_9:[8],card_1_10:[9],card_1_J:[10],card_1_Q:[11],card_1_K:[12],
                                       card_2_1: [13],card_2_2:[14],card_2_3:[15],card_2_4:[16],card_2_5:[17],card_2_6:[18],card_2_7:[19],
                                       card_2_8:[20], card_2_9:[21],card_2_10:[22],card_2_J:[23],card_2_Q:[24],card_2_K:[25],
                                       card_3_1: [26],card_3_2:[27],card_3_3:[28],card_3_4:[29],card_3_5:[30],card_3_6:[31],card_3_7:[32],
                                       card_3_8:[33], card_3_9:[34],card_3_10:[35],card_3_J:[36],card_3_Q:[37],card_3_K:[38],
                                       card_4_1: [39],card_4_2:[40],card_4_3:[41],card_4_4:[42],card_4_5:[43],card_4_6:[44],card_4_7:[45],
                                       card_4_8:[46], card_4_9:[47],card_4_10:[48],card_4_J:[49],card_4_Q:[50],card_4_K:[51],back:[52]}         
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);
        _oCardSprite = createSprite(oSpriteSheet,"back",CARD_WIDTH/2,CARD_HEIGHT/2,CARD_WIDTH,CARD_HEIGHT);
        _oCardSprite.x = iX;
        _oCardSprite.y = iY;
        _oCardSprite.stop();
        _oCardSprite.shadow = new createjs.Shadow("#000000", 5, 5, 5);
        _oContainer.addChild(_oCardSprite);

        oSprite = s_oSpriteLibrary.getSprite('card_selection');
        _oSelection = createBitmap(oSprite);
        _oSelection.x = iX;
        _oSelection.y = iY;
        _oSelection.regX = oSprite.width/2;
        _oSelection.regY = oSprite.height/2;
        _oSelection.visible = false;
        _oContainer.addChild(_oSelection);
        
        oSprite = s_oSpriteLibrary.getSprite('hold');
        _oHoldSprite = createBitmap(oSprite);
        _oHoldSprite.regX = oSprite.width/2;
        _oHoldSprite.x = iX;
        _oHoldSprite.y = iY + 76;
        _oHoldSprite.visible = false;
        
        _oContainer.addChild(_oHoldSprite);
        
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(iX - (CARD_WIDTH/2), iY - (CARD_HEIGHT/2), CARD_WIDTH, CARD_HEIGHT);
        _oHitArea.on("click",this._onSelected);
        _oHitArea.cursor = "pointer";
        _oContainer.addChild(_oHitArea);
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
    };
    
    this.unload = function(){
        _oHitArea.off("click",this._onSelected);
        _oContainer.removeChild(_oCardSprite);
    };
    
    this.reset = function(){
        _bHold = false;
        _oSelection.visible = false;
        _oCardSprite.shadow = new createjs.Shadow("#000000", 5, 5, 5);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.changeInfo = function(szFotogram,iRank,iSuit){
        _szFotogram = szFotogram;
        _iRank = iRank;
        _iSuit = iSuit;
    };
    
    this.setValue = function(){
        _oCardSprite.gotoAndStop(_szFotogram);
        
        var oParent = this;
        createjs.Tween.get(_oCardSprite).to({scaleX:1}, 200).call(function(){oParent.cardShown()});
    };
    
    this.setHold = function(bHold){
        _bHold = bHold;
        _oHoldSprite.visible = _bHold;
    };
    
    this.toggleHold = function(){
        _bHold = !_bHold;
        _oHoldSprite.visible = _bHold;
        
        playSound("press_hold",1,0);
    };
		
    this.showCard = function(){
        var oParent = this;
        createjs.Tween.get(_oCardSprite).to({scaleX:0.1}, 200).call(function(){oParent.setValue()});
    };
		
    this.hideCard = function(){
        var oParent = this;
        createjs.Tween.get(_oCardSprite).to({scaleX:0.1}, 200).call(function(){oParent.setBack()});
    };
    
    this.setBack = function(){
        _oCardSprite.gotoAndStop("back");
        var oParent = this;
        createjs.Tween.get(_oCardSprite).to({scaleX:1}, 200).call(function(){oParent.cardHidden()});
    };
		
    this.cardShown = function(){
        if(_aCbCompleted[ON_CARD_SHOWN]){
            _aCbCompleted[ON_CARD_SHOWN].call(_aCbOwner[ON_CARD_SHOWN]);
        }
    };
    
    this.cardHidden = function(){
        if(_aCbCompleted[ON_CARD_HIDE]){
            _aCbCompleted[ON_CARD_HIDE].call(_aCbOwner[ON_CARD_HIDE],this);
        }
    };
    
    this.highlight = function(){
        _oCardSprite.shadow = new createjs.Shadow("#fff000", 0, 0, 15);
        _oSelection.visible = true;
    };

    this._onSelected = function(){
        s_oGame.onCardSelected(_oThisCard);
    };
    
    this.getRank = function(){
        return _iRank;
    };
		
    this.getSuit = function(){
        return _iSuit;
    };

    this.getFotogram = function(){
        return _szFotogram;
    };
    
    this.isHold = function(){
        return _bHold;
    };
    
    _oThisCard = this;
    
    this._init(iX,iY,oContainer,szFotogram,iRank,iSuit);
                
}function CGameOver(){
    var _oTextTitle;
    var _oButRecharge;
    var _oButExit;
    var _oContainer;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oContainer.addChild(oBg);
        
        _oTextTitle = new createjs.Text(TEXT_GAMEOVER,"bold 32px Arial", "#fff");
        _oTextTitle.textAlign = "center";
        _oTextTitle.x = CANVAS_WIDTH/2;
        _oTextTitle.y = 290;
	_oTextTitle.shadow = new createjs.Shadow("#000000", 2, 2, 2);
        _oContainer.addChild(_oTextTitle);
        
        _oButRecharge = new CTextButton(CANVAS_WIDTH/2 -100,450,s_oSpriteLibrary.getSprite('but_game_bg'),TEXT_RECHARGE,"Arial","#fff",14,_oContainer);
        _oButRecharge.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        
        _oButExit = new CTextButton(CANVAS_WIDTH/2 + 100,450,s_oSpriteLibrary.getSprite('but_game_bg'),TEXT_EXIT,"Arial","#fff",14,_oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        this.hide();
    };
	
    this.unload = function(){
        _oButRecharge.unload();
        _oButExit.unload();
    };
    
    this.show = function(){
        _oContainer.visible = true;
    };
    
    this.hide = function(){
        _oContainer.visible = false;
    };
    
    this._onRecharge = function(){
        if(AUTOMATIC_RECHARGE){
            s_oGame.recharge();
        }
        $(s_oMain).trigger("recharge");
    };
    
    this._onExit = function(){
        $(s_oMain).trigger("end_session");
        s_oGame.onExit();
    };
    
    this._init();
}function CPayTable(iX,iY){
    var _iAlphaAnim;
    var _aSelection;
    var _aPrizes;
    var _aComboText;
    var _oContainer;
    
    this._init = function(iX,iY){
        _iAlphaAnim = 0;
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        s_oStage.addChild(_oContainer);
        
        var oPayTable = createBitmap(s_oSpriteLibrary.getSprite('paytable'));
        _oContainer.addChild(oPayTable);
        
        var iXOffset = 278;
        var iYOffset = 4;
        _aSelection = new Array();
        for(var s=0;s<NUM_BETS;s++){
            var oSelection = createBitmap(s_oSpriteLibrary.getSprite('selection'));
            oSelection.visible = false;
            oSelection.x = iXOffset;
            oSelection.y = iYOffset;
            _oContainer.addChild(oSelection);
            
            _aSelection.push(oSelection);
            
            iXOffset += 100;
        }
        
        //COMBO TEXT
        iXOffset = 275;
        iYOffset = 27;
        _aComboText = new Array();
        for(var k=0;k<WIN_COMBINATIONS;k++){
            var oComboText = new createjs.Text(TEXT_COMBO[k],"bold 19px Arial", "#fff000");
            oComboText.x = iXOffset;
            oComboText.y = iYOffset;
            oComboText.textAlign = "right";
            oComboText.textBaseline = "middle";
            _oContainer.addChild(oComboText);
            
            iYOffset += 20;
            
            _aComboText[k] = oComboText;
        }
        
        iXOffset = 375;
        
        //PRIZES TEXT
        _aPrizes = new Array();
        for(var i=0;i<NUM_BETS;i++){
            iYOffset = 27;
            _aPrizes[i] = new Array();
            for(var j=0;j<WIN_COMBINATIONS;j++){
                var oPrizeText = new createjs.Text(s_oPayTableSettings.getWin(i,j),"bold 19px Arial", "#fff000");
                oPrizeText.x = iXOffset;
                oPrizeText.y = iYOffset;
                oPrizeText.textAlign = "right";
                oPrizeText.textBaseline = "middle";
                _oContainer.addChild(oPrizeText);
                
                iYOffset += 20;
                _aPrizes[i][j] = oPrizeText;
            }   
            iXOffset += 100;
        }
    };
    
    this.resetHand = function(){
        createjs.Tween.removeAllTweens();
        for(var i=0;i<NUM_BETS;i++){
            for(var j=0;j<WIN_COMBINATIONS;j++){
                _aPrizes[i][j].alpha = 1;
            }
        }
        
        for(var k=0;k<WIN_COMBINATIONS;k++){
            _aComboText[k].alpha = 1;
        }
    };
    
    this.setCreditColumn = function(iCol){
        for(var i=0;i<NUM_BETS;i++){
            _aSelection[i].visible = false;
        }
        _aSelection[iCol].visible = true;
    };
    
    this.showWinAnim = function(iRow,iCol){
        var oParent = this;
        createjs.Tween.get(_aPrizes[iRow][iCol]).to({alpha:_iAlphaAnim}, 100).call(function(){oParent.showWinAnim(iRow,iCol)});  
        createjs.Tween.get(_aComboText[iCol]).to({alpha:_iAlphaAnim}, 100);
        if(_iAlphaAnim === 1){
            _iAlphaAnim = 0;
        }else{
            _iAlphaAnim = 1;
        }
    };
    
    this._init(iX,iY);
}function CPayTableSettings(){
    
    var _aWins;
    
    this._init = function(){
        
        _aWins = new Array();
        for(var i=0;i<NUM_BETS;i++){
            _aWins[i] = new Array();
            for(var j=0;j<WIN_COMBINATIONS;j++){
                _aWins[i][j] = COMBO_PRIZES[j] * (i+1);
            }
        }
    };
    
    this.getWin = function(iBet,iCombo){
        return _aWins[iBet][iCombo];
    };
    
    this._init();
}function CHandEvaluator(){
    
    var _aSortedHand;
    
    this.evaluate = function(aHand){
        _aSortedHand = new Array();
        for(var i=0;i<aHand.length;i++){
            _aSortedHand[i] = {rank:aHand[i].getRank(),suit:aHand[i].getSuit()};
        }
        
        _aSortedHand.sort(this.compareRank);
		
        
        var iRet = this.rankHand();

        return iRet;
    };
    
    this.rankHand = function(){
        if(this._checkForRoyalFlushNoDeuces()){
            return ROYAL_FLUSH_NO_DEUCES;
        }else if(this._checkForFourDeuces()){
            return FOUR_DEUCES;
        }else if(this._checkForRoyalFlushWithDeuces()){
            return ROYAL_FLUSH_WITH_DEUCES;
        }else if(this._checkForFiveOfAKind()){
            return FIVE_OF_A_KIND;
        }else if(this._checkForStraightFlush()){
            return STRAIGHT_FLUSH;
        }else if(this._checkForFourOfAKind()){
            return FOUR_OF_A_KIND;
        }else if(this._checkForFullHouse()){
            return FULL_HOUSE;
        }else if(this._checkForFlush()){
            return FLUSH;
        }else if(this._checkForStraight()){
            return STRAIGHT;
        }else if(this._checkForThreeOfAKind()){
            return THREE_OF_A_KIND;
        }else{
            this._identifyHighCard();
            return HIGH_CARD;
        }
    };
    
    
    
    this._checkForRoyalFlushNoDeuces = function(){
        if(this._isRoyalStraight() && this._isFlush()){
            for(var i=0;i<_aSortedHand.length;i++){
                if(_aSortedHand[i].rank === CARD_TWO){
                    return false;
                }
            }
            return true;
        }else{
            return false;
        }
    };
    
    this._checkForFourDeuces = function(){
        var oRet = this.getDeucesNum();
        
        if(oRet.cont === 4){
            _aSortedHand.splice(oRet.indexes[0],1);
            return true;
        }else{
            return false;
        }
    };
    
    this._checkForRoyalFlushWithDeuces = function(){
        if(this._isRoyalStraight() && this._isFlush()){
            for(var i=0;i<_aSortedHand.length;i++){
                if(_aSortedHand[i].rank === CARD_TWO){
                    return true;
                }
            }
            return false;
        }else{
            return false;
        }
     };
     
     this._checkForFiveOfAKind = function(){
         var iLastCard = _aSortedHand[_aSortedHand.length-1].rank;
         var oRet = this.getDeucesNum();
         var iCont = oRet.cont;
         var iStart = iCont;
         for(var i=iStart;i<_aSortedHand.length;i++){
             if(_aSortedHand[i].rank === iLastCard){
                 iCont++;
             }
         }

         return iCont===5?true:false;
     };

    this._checkForStraightFlush = function(){
        if(this._isStraight() && this._isFlush()){
            return true;
        }else {
            return false;
        }
    };

    this._checkForFourOfAKind = function(){
         var oRet = this.getDeucesNum();
         var iStart = oRet.cont;
         if(_aSortedHand[iStart].rank === _aSortedHand[3].rank){
            _aSortedHand.splice(4,1);
            return true;
        }else if(_aSortedHand[iStart+1].rank === _aSortedHand[4].rank){
            _aSortedHand.splice(iStart,1);
            return true;
        }else{
            return false;
        }
    };
    
    

    this._checkForFullHouse = function(){
        if( ( (_aSortedHand[0].rank === _aSortedHand[1].rank || _aSortedHand[0].rank === CARD_TWO) && _aSortedHand[2].rank === _aSortedHand[4].rank) || 
                                ( (_aSortedHand[0].rank === _aSortedHand[2].rank || (_aSortedHand[0].rank === CARD_TWO && _aSortedHand[1].rank === _aSortedHand[2].rank) ) 
                                    && _aSortedHand[3].rank === _aSortedHand[4].rank) || 
                                    (_aSortedHand[0].rank === CARD_TWO && _aSortedHand[0].rank === _aSortedHand[1].rank) && _aSortedHand[3].rank === _aSortedHand[4].rank ){
            return true;
        }else{
            return false;
        }
    };


    this._checkForFlush = function(){
        if(this._isFlush()){
            return true;
        } else{
            return false;
        }
    };

    this._checkForStraight = function(){
        if(this._isStraight()){
            return true;
        } else{
            return false;
        }
     };

    this._checkForThreeOfAKind = function() {
        var oRet = this.getDeucesNum();
         
        var iStart = oRet.cont;
        if(iStart ===2){
            _aSortedHand.splice(2,1);
            _aSortedHand.splice(2,1);
            return true;
        }
        
        if(iStart === 1){
            if(_aSortedHand[1].rank === _aSortedHand[2].rank){
                _aSortedHand.splice(3,1);
                _aSortedHand.splice(3,1);
                return true;
            }else if(_aSortedHand[1].rank === _aSortedHand[3].rank){
                _aSortedHand.splice(2,1);
                _aSortedHand.splice(3,1);
                return true;
            }else if(_aSortedHand[2].rank === _aSortedHand[3].rank){ 
                _aSortedHand.splice(1,1);
                _aSortedHand.splice(3,1);
                return true;
            }else if(_aSortedHand[3].rank === _aSortedHand[4].rank){
                _aSortedHand.splice(1,1);
                _aSortedHand.splice(1,1);
                return true;
            }
        }else{
            if(_aSortedHand[0].rank === _aSortedHand[1].rank && _aSortedHand[0].rank === _aSortedHand[2].rank){
                _aSortedHand.splice(3,1);
                _aSortedHand.splice(3,1);
                return true;
            } else if(_aSortedHand[1].rank === _aSortedHand[2].rank && _aSortedHand[1].rank === _aSortedHand[3].rank){
                _aSortedHand.splice(0,1);
                _aSortedHand.splice(3,1);
                return true;
            }else if(_aSortedHand[2].rank === _aSortedHand[3].rank && _aSortedHand[2].rank === _aSortedHand[4].rank){
                _aSortedHand.splice(0,1);
                _aSortedHand.splice(0,1);
                return true;
            }
        }

        return false;
    };

    this._checkForTwoPair = function(){
        if(_aSortedHand[0].rank === _aSortedHand[1].rank && _aSortedHand[2].rank === _aSortedHand[3].rank){
            _aSortedHand.splice(4,1);
            return true;
        }else if(_aSortedHand[1].rank === _aSortedHand[2].rank && _aSortedHand[3].rank === _aSortedHand[4].rank){
            _aSortedHand.splice(0,1);
            return true;
        }else if(_aSortedHand[0].rank === _aSortedHand[1].rank && _aSortedHand[3].rank === _aSortedHand[4].rank){
            _aSortedHand.splice(2,1);
            return true;
        } else{
            return false;
        }
    };

    this._checkForOnePair = function(){
        for(var i = 0; i < 4; i++){
            if(_aSortedHand[i].rank === _aSortedHand[i + 1].rank && _aSortedHand[i].rank > CARD_TEN){
                var p1 = _aSortedHand[i];
                var p2 = _aSortedHand[i + 1];
                _aSortedHand = new Array();
                _aSortedHand.push(p1);
                _aSortedHand.push(p2);

                return true;
            }
        }

        return false;
    };

    this._identifyHighCard = function(){
        for(var i = 0; i < 4; i++){
            _aSortedHand.splice(0,1);
        }
    };
    
    this._isFlush = function(){
        if(    (_aSortedHand[4].suit === _aSortedHand[0].suit || _aSortedHand[0].rank === CARD_TWO)
            && (_aSortedHand[4].suit === _aSortedHand[1].suit || _aSortedHand[1].rank === CARD_TWO)
            && (_aSortedHand[4].suit === _aSortedHand[2].suit || _aSortedHand[2].rank === CARD_TWO)
            && (_aSortedHand[4].suit === _aSortedHand[3].suit || _aSortedHand[3].rank === CARD_TWO)){
            return true;
        }else{
            return false;
        }
    };

    this._isRoyalStraight = function(){
        if( (_aSortedHand[0].rank === CARD_TEN || _aSortedHand[0].rank === CARD_TWO)
            && (_aSortedHand[1].rank === CARD_JACK || _aSortedHand[1].rank === CARD_TWO)
            && (_aSortedHand[2].rank === CARD_QUEEN || _aSortedHand[2].rank === CARD_TWO)
            && (_aSortedHand[3].rank === CARD_KING || _aSortedHand[3].rank === CARD_TWO)
            && (_aSortedHand[4].rank === CARD_ACE || _aSortedHand[4].rank === CARD_TWO)){
            return true;
        }else{
            return false;
        }
    };
	
    this._isStraight = function() {
        var iNumDeuces = this.getDeucesNum().cont;
        var iUsedDeuces = 0;
        for(var i=iNumDeuces;i<_aSortedHand.length-1;i++){
            var iDiff = _aSortedHand[i+1].rank - (_aSortedHand[i].rank + 1);

            if(iDiff > 0){
                if(_aSortedHand[i+1].rank === CARD_ACE && (_aSortedHand[iNumDeuces].rank - iNumDeuces - 1) === 1){
                     return true;
                }else{
                    iUsedDeuces += iDiff;
                    if (iUsedDeuces > iNumDeuces) {
                           return false;
                    }
                }
                
           }else if(iDiff < 0){
               return false;
           }
        }
        return true;
    };
    
    this.getDeucesNum = function(){
        var aIndexToSplice = new Array();
        for(var i=0;i<_aSortedHand.length;i++){
            if(_aSortedHand[i].rank !== CARD_TWO){
               aIndexToSplice.push(i);
            }
        }
        
        return {cont: _aSortedHand.length-aIndexToSplice.length, indexes:aIndexToSplice};
    };
    
    this.compareRank = function(a,b) {
        if (a.rank < b.rank)
           return -1;
        if (a.rank > b.rank)
          return 1;
        return 0;
    };
    
    this.getSortedHand = function(){
        return _aSortedHand;
    };

}