/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CSpriteLibrary(){

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
    }
    
    this.addSprite = function( szKey, szPath ){
        if ( _oLibSprites.hasOwnProperty(szKey) ){
            return;
        }
        
        _oLibSprites[szKey] = { szPath:szPath, oSprite: new Image() };
        _iNumSprites++;
        
    }
    
    this.getSprite = function( szKey ){
        if (!_oLibSprites.hasOwnProperty(szKey)){
            return null;
        }else{
            return _oLibSprites[szKey].oSprite;
        }
    }
    
    this._onSpritesLoaded = function(){
        _cbTotalCompleted.call(_cbOwner);
    }
    
    
    
    this._onSpriteLoaded = function(){
        _cbCompleted.call(_cbOwner);
        if (++_iCntSprites == _iNumSprites) {
            this._onSpritesLoaded();
        }
        
    }    

    this.loadSprites = function(){
        for (var szKey in _oLibSprites) {
            _oLibSprites[szKey].oSprite["oSpriteLibrary"] = this;
            _oLibSprites[szKey].oSprite.onload = function(){
                this.oSpriteLibrary._onSpriteLoaded();
            };
            _oLibSprites[szKey].oSprite.src = _oLibSprites[szKey].szPath;
        } 
    }
    
    this.getNumSprites=function(){
        return _iNumSprites;
    }
}

Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};
// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * (180 / Math.PI);
};

var CANVAS_WIDTH = 1280;
var CANVAS_HEIGHT = 768;

var CANVAS_WIDTH_HALF = CANVAS_WIDTH * 0.5;
var CANVAS_HEIGHT_HALF = CANVAS_HEIGHT * 0.5;

var EDGEBOARD_X = 90;
var EDGEBOARD_Y = 95;

var PRIMARY_FONT = "Arial";
var SECONDARY_FONT = "digital";

var FPS = 60;
var FPS_TIME = 1000 / FPS;
var TIME_STEP_WORLD = 1 / FPS;
var DISABLE_SOUND_MOBILE = false;
var MS_FADE_ANIM = 250;

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_HELP = 1;
var STATE_GAME = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END = 5;
var ON_BUT_NO_DOWN = 6;
var ON_BUT_YES_DOWN = 7;

var STATE_INIT = 0;
var STATE_PLAY = 1;
var STATE_FINISH = 2;
var STATE_PAUSE = 3;

var IDLE = 0;
var SERVICE = 1;
var FOREHAND = 2;
var BACKHAND = 3;
var RUN = 4;
var STANCE = 5;
var STRAFE_LEFT = 6;
var STRAFE_RIGHT = 7;
var RUN_REVERSE = 8;

var OPPONENT_SIDE = 0;
var PLAYER_SIDE = 1;

var NAME_TEXT = 0;
var SET_TEXT = 1;
var POINT_TEXT = 0;

var DETECT_FORCE_DIRECTION = 0.06;

var KMH = 1.609344;

var POINT = [0, 15, 30, 40, "-"];

var MAX_SERVICE_ATTEMPT = 1;

var MOVEMENT_SIDE_ANGLE = 0.5;

var SERVICE_FRAME_SHOT = 24;
var FOREHAND_FRAME_SHOT = 17;
var BACKHAND_FRAME_SHOT = 17;

var MIN_DISTANCE_FOR_SHOT_BALL = 75;

var MIN_DISTANCE_MOVE_TO_BALL = 35;

var MS_TIME_FADE_VOL = 500;

var ALLOWED_SET_MATCH = [1, 3, 5];

var OFFSET_RADIANTS_45 = Math.radians(45);

var OFFSET_RADIANTS_90 = Math.radians(90);

var RADIANTS_180 = Math.radians(180);

var FPS_ANIMATION_0 = 0.25;
var FPS_ANIMATION_1 = 0.45;

var SPRITE_NAME_PLAYER = ["player_idle", "player_service", "player_forehand", "player_backhand", "player_run",
    "player_stance", "player_strafe_left", "player_strafe_right"];

var OFFSET_CONTAINER_PLAYER = [{x: 4, y: 0}, {x: 4, y: -3}, {x: 11, y: 11}, {x: -20, y: 15}, {x: 7, y: 6},
    {x: 3, y: 1}, {x: 1, y: 1}, {x: 1, y: 1}];

var SPRITE_NAME_OPPONENT = ["opponent_idle", "opponent_service", "opponent_forehand", "opponent_backhand",
    "opponent_run", "opponent_stance", "opponent_strafe_left", "opponent_strafe_right"];

var OFFSET_CONTAINER_OPPONENT = [{x: 4, y: 0}, {x: 4, y: -3}, {x: 11, y: 11}, {x: 30, y: 25}, {x: 7, y: 6},
    {x: 3, y: 1}, {x: 1, y: 1}, {x: 1, y: 1}];

var ANIMATION_SPRITE_SHEET_SECTION = [{w: 5, h: 3}, {w: 7, h: 6}, {w: 9, h: 6}, {w: 6, h: 5}, {w: 4, h: 3},
    {w: 7, h: 3}, {w: 3, h: 3}, {w: 3, h: 3}];

var CHARACTERS_ANIMATIONS = [{idle: 0, start: [0, 12, "start", FPS_ANIMATION_0], end: 12}, {service: 1, start: [0, 34, "end", FPS_ANIMATION_1], end: 34},
    {forehand: 2, start: [10, 53, "end", FPS_ANIMATION_1], end: 53}, {backhand: 3, start: [10, 29, "end", FPS_ANIMATION_1], end: 29},
    {run: 4, start: [0, 11, "start", FPS_ANIMATION_1], end: 11}, {stance: 5, start: [0, 20, "start", FPS_ANIMATION_1], end: 20},
    {strafe_left: 6, start: [0, 8, "start", FPS_ANIMATION_1], end: 8}, {strafe_right: 7, start: [0, 8, "start", FPS_ANIMATION_1], end: 8},
    {run_reverse: 8, start: {frames: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], next: "start", speed: FPS_ANIMATION_1}, end: 0}];

var ANIMATION_PLAYER_SET = {a: STRAFE_LEFT, b: STRAFE_RIGHT, c: RUN, d: RUN_REVERSE};
var ANIMATION_OPPONENT_SET = {a: STRAFE_RIGHT, b: STRAFE_LEFT, c: RUN_REVERSE, d: RUN};

var LEFT_SERVICE = 0;
var RIGHT_SERVICE = 1;

var MS_TIME_AFTER_BALL_OUT = 750;

var MIN_DISTANCE_FOR_SHOT_BALL_PLAYER = 180;

var LEFT = 0;
var RIGHT = 1;

var BALL_DENSITY = 2515;

var DEFAULT_Z_FORCE = 20 * BALL_DENSITY;

var ROLL_BALL_RATE = 60 / FPS;

var FIELD_WIDTH = 850;
var FIELD_HALF_WIDTH = FIELD_WIDTH * 0.5;
var FIELD_OUT_BALL_WIDTH = FIELD_WIDTH * 0.5 + 20;

var FIELD_LENGTH = 2400;
var FIELD_HALF_LENGHT = FIELD_LENGTH * 0.5;

var AI_POINT_SHOT_X = FIELD_HALF_WIDTH - 60;

var BALL_MASS = 0.056 * BALL_DENSITY;

var BALL_RADIUS = 8;

var BALL_LINEAR_DAMPING = 0.2;

var BALL_ANGULAR_DAMPING = 0.5;

var MIN_BALL_VEL_ROTATION = 0.1;

var PLAYER_SCALE_MULTIPLIER = 20;

var OPPONENT_SCALE_MULTIPLIER = 20;

var PLAYER_BUFFER = FPS * 0.5;

var OPPONENT_BUFFER = FPS * 0.5;

var BALL_MAX_VOL_IMPACT = 3500;

var AI_RANGE_HIT = {x: 1 * BALL_DENSITY, y: 1 * BALL_DENSITY, z: 1 * BALL_DENSITY};

var START_BALL_POSITION = [[{x: 270, y: 1199, z: 100}, {x: -270, y: 1199, z: 100}], [{x: -250, y: -1199, z: 100}, {x: 250, y: -1199, z: 100}]]; //OPPONENT_SIDE //PLAYER_SIDE LEFT RIGHT

var START_LAUNCH_IMPULSE_BALL_OPPONENT = {x: 0, y: 0, z: 33 * BALL_DENSITY};

var START_LAUNCH_IMPULSE_BALL_PLAYER = {x: 0, y: 0, z: 37 * BALL_DENSITY};

var SERVICE_IMPULSE_PLAYER_SIDE = [{x: 2, y: 0, z: 0.5}, {x: -2, y: 0, z: 0.5}];

var OFFSET_FORCE_Y_PLAYER = 30;

var SERVICE_POWER_RATE = 62;

var SERVICE_POWER_MIN = 55;

var TO_POS_CHAR_DISTANCE_OFFSET_AXIS = 40;
var TO_POS_CHAR_DISTANCE_OFFSET = 70;

var TO_BALL_CHAR_DISTANCE_OFFSET = 30;

var PROXY_COLLISION_PLAYER = {width: 10, height: 120, depth: 10};

var VOLLEY_SHOOT_Z = PROXY_COLLISION_PLAYER.height * 2;

var PLAYER_POS_3D = [{x: -220, y: -1200, z: PROXY_COLLISION_PLAYER.height}, {x: 220, y: -1200, z: PROXY_COLLISION_PLAYER.height}];

var OPPONENT_POS_3D = [{x: 220, y: 1200, z: PROXY_COLLISION_PLAYER.height}, {x: -220, y: 1200, z: PROXY_COLLISION_PLAYER.height}];

var PLAYER_LIMIT_POS_Y = PLAYER_POS_3D[0].y - 300;

var HIT_BALL_MAX_FORCE = 130;
var HIT_BALL_MIN_FORCE = 5;

var FORCE_RATE = 0.0014;

var FIELD_HEIGHT = 5;

var OFFSET_BALL_FIELD_Z_IMP;

var OFFSET_Z_AI_HEIGHT = PROXY_COLLISION_PLAYER.height - 30;

var MIN_VELOCITY_SPAWN_TRAJECTORY = 1;

var RETURN_POS_CHARACTERS_OPPONENT = {x: 0, y: 1200};
var RETURN_POS_CHARACTERS_PLAYER = {x: 0, y: -1200};

var FORCE_MULTIPLIER_AXIS_PLAYER = {x: 0.2 * BALL_DENSITY, y: 0.1 * BALL_DENSITY, z: 0.35 * BALL_DENSITY};
var FORCE_MULTIPLIER_AXIS_OPPONENT = {x: 0.1 * BALL_DENSITY, y: 0.20 * BALL_DENSITY, z: 0.11 * BALL_DENSITY};//x: 0.1 * BALL_DENSITY, y: 0.22 * BALL_DENSITY, z: 0.1 * BALL_DENSITY

var FORCE_SERVICE_AXIS_OPPONENT = {x: 0.05 * BALL_DENSITY, y: 0.18 * BALL_DENSITY, z: 0.03 * BALL_DENSITY};

var AI_SERVICE_X_RANDOM = 0.03 * BALL_DENSITY;
var AI_SERVICE_Y_RANDOM = 0.05 * BALL_DENSITY;

var FORCE_MAX = 0.5 * BALL_DENSITY;

var MAX_FORCE_Y = 1050;

var MIN_FORCE_Y = 650;

var AI_Y_POINT = FIELD_HALF_LENGHT + 210;

var AI_SAVE_FORCE_Z_MULT = 1.5;

var TIME_POWER_BAR = 1250;

var NET_PROPERTIES = {x: 0, y: 0, z: 63, width: 825, height: 63, depth: 6};

var SHOW_3D_RENDER = false;
var CAMERA_TEST = false;
var START_CAMERA_POSITION = {x: -240, y: -290, z: 280};
var CAMERA_TEST_LOOK_AT = {x: 0, y: -500, z: -100};
var NEAR = 1, FAR = 10000, FOV = 42;

var BALL_SCALE_FACTOR = 1 / FOV;

var CHARACTERS_SCALE_FACTOR = 1 / FOV + 0.8;

var SHADOWN_FACTOR = 1 / FOV - 0.0115;

var BALL_SHADOW_POS = BALL_RADIUS * BALL_RADIUS * BALL_RADIUS;

var HEIGHT_SCALE_SHADOWN_FACTOR = 1 / FOV;

var CANVAS_3D_OPACITY = 0.5;

var POINTS_TO_LOSE;
var START_SCORE;
var OPPONENT_SPEED;
var AI_RANGE_FORCE_X;
var AI_RANGE_FORCE_Y;
var SET_FOR_WIN;
var AI_MAX_Z;
var AI_MIN_Z;


var NUM_LEVEL_FOR_ADS;

function CVelocityScreen(iX, iY, oParentContainer) {

    var _oParentContainer = oParentContainer;
    var _oPattern;
    var _oVelocityText;
    var _oKMHText;
    var _oContainer;

    this._init = function (iX, iY) {
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;

        _oParentContainer.addChild(_oContainer);

        var oSpritePattern = s_oSpriteLibrary.getSprite("pattern_screen");

        var oPatternSize = {x: -53, y: -23, w: 106, h: 46};

        _oVelocityText = new createjs.Text("444", "44px " + SECONDARY_FONT, TEXT_COLOR_3);
        _oVelocityText.x = -20;
        _oVelocityText.textAlign = "center";
        _oVelocityText.textBaseline = "middle";
        _oContainer.addChild(_oVelocityText);

        _oKMHText = new createjs.Text(TEXT_KMH, "26px " + SECONDARY_FONT, TEXT_COLOR_3);
        _oKMHText.x = 30;
        _oKMHText.y = 15;
        _oKMHText.textAlign = "center";
        _oKMHText.textBaseline = "middle";
        _oContainer.addChild(_oKMHText);

        var matTiling = new createjs.Matrix2D();

        matTiling.a = matTiling.d = 0.16;

        _oPattern = new createjs.Shape();
        _oPattern.graphics.beginBitmapFill(oSpritePattern, 'repeat', matTiling).drawRect(oPatternSize.x, oPatternSize.y, oPatternSize.w, oPatternSize.h);
        _oPattern.alpha = 0.5;

        _oContainer.addChild(_oPattern);

        _oContainer.cache(oPatternSize.x, oPatternSize.y, oPatternSize.w, oPatternSize.h);
    };

    this.refreshVelocityText = function (iVelocity) {
        var szText = iVelocity;
        if (iVelocity < 100 && iVelocity > 9) {
            szText = "0" + iVelocity;
        } else if (iVelocity < 10) {
            szText = "00" + iVelocity;
        }

        _oVelocityText.text = szText;

        _oContainer.updateCache();
    };

    this._init(iX, iY);

    return this;
}
function CVector2(iX, iY) {

    var x;
    var y;

    this._init = function (iX, iY) {
        x = iX;
        y = iY;
    };
    this.add = function (vx, vy) {
        x += vx;
        y += vy;
    };
    this.addV = function (v) {
        x += v.getX();
        y += v.getY();
    };
    this.scalarDivision = function (n) {
        x /= n;
        y /= n;
    };
    this.subtract = function (v) {
        x -= v.getX();
        y -= v.getY();
    };
    this.scalarProduct = function (n) {
        x *= n;
        y *= n;
    };
    this.invert = function () {
        x *= -1;
        y *= -1;
    };
    this.dotProduct = function (v) {
        return (x * v.getX() + y * v.getY());
    };
    this.set = function (fx, fy) {
        x = fx;
        y = fy;
    };
    this.setV = function (v) {
        x = v.getX();
        y = v.getY();
    };
    this.length = function () {
        return Math.sqrt(x * x + y * y);
    };
    this.length2 = function () {
        return x * x + y * y;
    };
    this.normalize = function () {
        var len = this.length();
        if (len > 0) {
            x /= len;
            y /= len;
        }
    };

    this.angleBetweenVectors = function (v2) {
        var iAngle = Math.acos(this.dotProduct(v2) / (this.length() * v2.length()));
        if (isNaN(iAngle) === true) {
            return 0;
        } else {
            return iAngle;
        }
    };

    this.getNormalize = function (outV) {
        var len = this.length();
        outV.set(x, y);
        outV.normalize();
    };
    this.rot90CCW = function () {
        var a = x;
        x = -y;
        y = a;
    };
    this.rot90CW = function () {
        var a = x;
        x = y;
        y = -a;
    };
    this.getRotCCW = function (outV) {
        outV.set(x, y);
        outV.rot90CCW();
    };
    this.getRotCW = function (outV) {
        outV.set(x, y);
        outV.rot90CW();
    };
    this.ceil = function () {
        x = Math.ceil(x);
        y = Math.ceil(y);
    };
    this.round = function () {
        x = Math.round(x);
        y = Math.round(y);
    };
    this.toString = function () {
        return "Vector2: " + x + ", " + y;
    };
    this.print = function () {
        trace("Vector2: " + x + ", " + y + "");
    };
    this.getX = function () {
        return x;
    };
    this.getY = function () {
        return y;
    };

    this.rotate = function (iAngle) {
        var fNewX = x;
        var fNewY = y;

        x = fNewX * Math.cos(iAngle) - fNewY * Math.sin(iAngle);
        y = fNewX * Math.sin(iAngle) + fNewY * Math.cos(iAngle);
    };

    this._init(iX, iY);
}
function CToggle(iXPos, iYPos, oSprite, bActive, oParentContainer) {
    var _bActive;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oParentContainer;

    this._init = function (iXPos, iYPos, oSprite, bActive, oParentContainer) {
        if (oParentContainer !== undefined) {
            _oParentContainer = oParentContainer;
        } else {
            _oParentContainer = s_oStage;
        }

        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
            animations: {state_true: [0], state_false: [1]}
        };


        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _bActive = bActive;

        _oButton = createSprite(oSpriteSheet, "state_" + _bActive, (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);

        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.stop();

        if (!s_bMobile)
            _oButton.cursor = "pointer";

        _oParentContainer.addChild(_oButton);

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", this.buttonDown);
        _oButton.off("pressup", this.buttonRelease);

        _oParentContainer.removeChild(_oButton);
    };

    this._initListener = function () {
        _oButton.on("mousedown", this.buttonDown);
        _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.setCursorType = function (szValue) {
        _oButton.cursor = szValue;
    };

    this.setActive = function (bActive) {
        _bActive = bActive;
        _oButton.gotoAndStop("state_" + _bActive);
    };

    this.buttonRelease = function () {
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        playSound("click", 1, 0);

        _bActive = !_bActive;
        _oButton.gotoAndStop("state_" + _bActive);

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _bActive);
        }
    };

    this.buttonDown = function () {
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
        }
    };

    this.setPosition = function (iX, iY) {
        _oButton.x = iX;
        _oButton.y = iY;
    };

    this._init(iXPos, iYPos, oSprite, bActive, oParentContainer);
}
var s_iScaleFactor = 1;
var s_iOffsetX;
var s_iOffsetY;
var s_bIsIphone = false;
var s_fInverseScaling = 0;

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function (a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

$(window).resize(function () {
    sizeHandler();
});

function trace(szMsg) {
    console.log(szMsg);
}

function getSize(Name) {
    var size;
    var name = Name.toLowerCase();
    var document = window.document;
    var documentElement = document.documentElement;
    if (window["inner" + Name] === undefined) {
        // IE6 & IE7 don't have window.innerWidth or innerHeight
        size = documentElement["client" + Name];
    } else if (window["inner" + Name] != documentElement["client" + Name]) {
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
        } else {
            // Media query didn't match, use window["inner" + Name]
            size = window["inner" + Name];
        }
        // Cleanup
        documentElement.removeChild(bodyElement);
    } else {
        // Default to use window["inner" + Name]
        size = window["inner" + Name];
    }
    return size;
}
;


window.addEventListener("orientationchange", onOrientationChange);


function onOrientationChange() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        // you're in PORTRAIT mode	   
        sizeHandler();
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
        // you're in LANDSCAPE mode   
        sizeHandler();
    }

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
        if (navigator.platform === iDevices.pop()) {
            s_bIsIphone = true;
            return true;
        }
    }
    s_bIsIphone = false;
    return false;
}

function getIOSWindowHeight() {
    // Get zoom level of mobile Safari
    // Note, that such zoom detection might not work correctly in other browsers
    // We use width, instead of height, because there are no vertical toolbars :)
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

    // window.innerHeight returns height of the visible area. 
    // We multiply it by zoom and get out real height.
    return window.innerHeight * zoomLevel;
}
;

// You can also get height of the toolbars that are currently displayed
function getHeightOfIOSToolbars() {
    var tH = (window.orientation === 0 ? screen.height : screen.width) - getIOSWindowHeight();
    return tH > 1 ? tH : 0;
}
;

//THIS FUNCTION MANAGES THE CANVAS SCALING TO FIT PROPORTIONALLY THE GAME TO THE CURRENT DEVICE RESOLUTION
function sizeHandler() {
    window.scrollTo(0, 1);

    if (!$("#canvas")) {
        return;
    }



    var h;
    var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);

    if (iOS) {
        h = getIOSWindowHeight();
    } else {
        h = getSize("Height");
    }

    var w = getSize("Width");

    var multiplier = Math.min((h / CANVAS_HEIGHT), (w / CANVAS_WIDTH));

    var destW = CANVAS_WIDTH * multiplier;
    var destH = CANVAS_HEIGHT * multiplier;

    if (s_bMobile && !s_bIsIphone) {
        $("#canvas").css("width", destW + "px");
        $("#canvas").css("height", destH + "px");
    } else {
        s_oStage.canvas.width = destW;
        s_oStage.canvas.height = destH;

        var iScale = Math.min(destW / CANVAS_WIDTH, destH / CANVAS_HEIGHT);
        s_oStage.scaleX = s_oStage.scaleY = iScale;
    }

    var iAdd = 0;
    if (destH < h) {
        iAdd = h - destH;
        destH += iAdd;
        destW += iAdd * (CANVAS_WIDTH / CANVAS_HEIGHT);
    } else if (destW < w) {
        iAdd = w - destW;
        destW += iAdd;
        destH += iAdd * (CANVAS_HEIGHT / CANVAS_WIDTH);
    }

    var fOffsetY = ((h / 2) - (destH / 2));
    var fOffsetX = ((w / 2) - (destW / 2));
    var fGameInverseScaling = (CANVAS_WIDTH / destW);
    if (fOffsetX * fGameInverseScaling < -EDGEBOARD_X ||
            fOffsetY * fGameInverseScaling < -EDGEBOARD_Y) {
        s_iScaleFactor = Math.min(h / (CANVAS_HEIGHT - (EDGEBOARD_Y * 2)), w / (CANVAS_WIDTH - (EDGEBOARD_X * 2)));
        destW = CANVAS_WIDTH * s_iScaleFactor;
        destH = CANVAS_HEIGHT * s_iScaleFactor;
        fOffsetY = (h - destH) / 2;
        fOffsetX = (w - destW) / 2;
        fGameInverseScaling = (CANVAS_WIDTH / destW);
    }

    s_fInverseScaling = fGameInverseScaling;

    s_iOffsetX = (-1 * fOffsetX * fGameInverseScaling);
    s_iOffsetY = (-1 * fOffsetY * fGameInverseScaling);
    if (fOffsetY >= 0) {
        s_iOffsetY = 0;
    }

    if (fOffsetX >= 0) {
        s_iOffsetX = 0;
    }

    if (s_oInterface !== null) {
        s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    }
    if (s_oMenu !== null) {
        s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    }


    $("#canvas").css("width", destW + "px");
    $("#canvas").css("height", destH + "px");

    if (fOffsetY < 0) {
        $("#canvas").css("top", fOffsetY + "px");
        s_iCanvasOffsetHeight = fOffsetY;
    } else {
        $("#canvas").css("top", "0px");
        s_iCanvasOffsetHeight = 0;
    }

    $("#canvas").css("left", fOffsetX + "px");


//                s_iCanvasOffsetHeight=0;
//                $("#canvas").css("width", (CANVAS_WIDTH*0.92) + "px");
//                $("#canvas").css("height", (CANVAS_HEIGHT*0.92) + "px");

    resizeCanvas3D();

    s_iCanvasResizeWidth = destW;
    s_iCanvasResizeHeight = destH;

    s_iCanvasOffsetWidth = fOffsetX;

}
;

function resizeCanvas3D() {
    $("canvas").each(function () {
        if ($(this).attr("id") == "#canvas") {
            return;
        }
        $(this).css("width", $("#canvas").css("width"));
        $(this).css("height", $("#canvas").css("height"));
        $(this).css("position", $("#canvas").css("position"));
        $(this).css("left", $("#canvas").css("left"));
        $(this).css("top", $("#canvas").css("top"));
    });
}

function playSound(szSound, iVolume, iLoop) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        var oPointer = createjs.Sound.play(szSound, {loop: iLoop, volume: iVolume});
        return oPointer;
    }
    return null;
}

function stopSound(oPointer) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        oPointer.stop();
    }
}

function setVolume(oPointer, iVolume) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        oPointer.volume = iVolume;
    }
}

function setMute(oPointer, bMute) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        oPointer.setMute(bMute);
    }
}

function tweenVolume(oPointer, iVolume, iMsFade) {
    if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
        createjs.Tween.get(oPointer, {override: true}).to({volume: iVolume}, iMsFade);
    }
}

function createBitmap(oSprite, iWidth, iHeight) {
    var oBmp = new createjs.Bitmap(oSprite);
    var hitObject = new createjs.Shape();

    if (iWidth && iHeight) {
        hitObject.graphics.beginFill("#fff").drawRect(0, 0, iWidth, iHeight);
    } else {
        hitObject.graphics.beginFill("#ff0").drawRect(0, 0, oSprite.width, oSprite.height);
    }

    oBmp.hitArea = hitObject;

    return oBmp;
}

function createSprite(oSpriteSheet, szState, iRegX, iRegY, iWidth, iHeight) {
    if (szState !== null) {
        var oRetSprite = new createjs.Sprite(oSpriteSheet, szState);
    } else {
        var oRetSprite = new createjs.Sprite(oSpriteSheet);
    }

    var hitObject = new createjs.Shape();
    hitObject.graphics.beginFill("#000000").drawRect(-iRegX, -iRegY, iWidth, iHeight);

    oRetSprite.hitArea = hitObject;

    return oRetSprite;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function randomFloatBetween(minValue, maxValue, precision) {
    if (typeof (precision) === 'undefined') {
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue).toFixed(precision));
}

function rotateVector2D(iAngle, v) {
    var iX = v.getX() * Math.cos(iAngle) + v.getY() * Math.sin(iAngle);
    var iY = v.getX() * (-Math.sin(iAngle)) + v.getY() * Math.cos(iAngle);
    v.set(iX, iY);
}

function tweenVectorsOnX(vStart, vEnd, iLerp) {
    var iNewX = vStart + iLerp * (vEnd - vStart);
    return iNewX;
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

function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                var temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

function compare(a, b) {
    if (a.index > b.index)
        return -1;
    if (a.index < b.index)
        return 1;
    return 0;
}

//----------------------
// Linear	
/**
 * Interpolates a value between b and c parameters
 * <p></br><b>Note:</b></br>
 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
 *
 * @param t Elapsed time
 * @param b Initial position
 * @param c Final position
 * @param d Duration
 * @return A value between b and c parameters
 */

function easeLinear(t, b, c, d) {
    return c * t / d + b;
}

//----------------------
// Quad		
/**
 * Interpolates a value between b and c parameters
 * <p></br><b>Note:</b></br>
 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
 *
 * @param t Elapsed time
 * @param b Initial position
 * @param c Final position
 * @param d Duration
 * @return A value between b and c parameters
 */

function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
}
//----------------------
// Sine	
/**
 * Interpolates a value between b and c parameters
 * <p></br><b>Note:</b></br>
 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
 *
 * @param t Elapsed time
 * @param b Initial position
 * @param c Final position
 * @param d Duration
 * @return A value between b and c parameters
 */

function easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}



function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
}
;


function getTrajectoryPoint(t, p) {
    var result = new createjs.Point();
    var oneMinusTSq = (1 - t) * (1 - t);
    var TSq = t * t;
    result.x = oneMinusTSq * p.start.x + 2 * (1 - t) * t * p.traj.x + TSq * p.end.x;
    result.y = oneMinusTSq * p.start.y + 2 * (1 - t) * t * p.traj.y + TSq * p.end.y;
    return result;
}

function formatTime(iTime) {
    iTime /= 1000;
    var iMins = Math.floor(iTime / 60);
    var iSecs = iTime - (iMins * 60);
    iSecs = parseFloat(iSecs).toFixed(1)

    var szRet = "";

    if (iMins < 10) {
        szRet += "0" + iMins + ":";
    } else {
        szRet += iMins + ":";
    }

    if (iSecs < 10) {
        szRet += "0" + iSecs;
    } else {
        szRet += iSecs;
    }

    return szRet;
}

function degreesToRadians(iAngle) {
    return iAngle * Math.PI / 180;
}

function checkRectCollision(bitmap1, bitmap2) {
    var b1, b2;
    b1 = getBounds(bitmap1, 0.9);
    b2 = getBounds(bitmap2, 0.98);
    return calculateIntersection(b1, b2);
}

function NoClickDelay(el) {
    this.element = el;
    if (window.Touch)
        this.element.addEventListener('touchstart', this, false);
}
//Fisher-Yates Shuffle
function shuffle(array) {
    var counter = array.length, temp, index;
    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}

NoClickDelay.prototype = {
    handleEvent: function (e) {
        switch (e.type) {
            case 'touchstart':
                this.onTouchStart(e);
                break;
            case 'touchmove':
                this.onTouchMove(e);
                break;
            case 'touchend':
                this.onTouchEnd(e);
                break;
        }
    },
    onTouchStart: function (e) {
        e.preventDefault();
        this.moved = false;

        this.element.addEventListener('touchmove', this, false);
        this.element.addEventListener('touchend', this, false);
    },
    onTouchMove: function (e) {
        this.moved = true;
    },
    onTouchEnd: function (e) {
        this.element.removeEventListener('touchmove', this, false);
        this.element.removeEventListener('touchend', this, false);

        if (!this.moved) {
            var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            if (theTarget.nodeType == 3)
                theTarget = theTarget.parentNode;

            var theEvent = document.createEvent('MouseEvents');
            theEvent.initEvent('click', true, true);
            theTarget.dispatchEvent(theEvent);
        }
    }

};

(function () {
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

    function onchange(evt) {
        var v = 'visible', h = 'hidden',
                evtMap = {
                    focus: v, focusin: v, pageshow: v, blur: h, focusout: h, pagehide: h
                };

        evt = evt || window.event;

        if (evt.type in evtMap) {
            document.body.className = evtMap[evt.type];
        } else {
            document.body.className = this[hidden] ? "hidden" : "visible";

            if (document.body.className === "hidden") {
                s_oMain.stopUpdate();
            } else {
                s_oMain.startUpdate();
            }
        }
    }
})();

function ctlArcadeResume() {
    if (s_oMain !== null) {
        s_oMain.startUpdate();
    }
}

function ctlArcadePause() {
    if (s_oMain !== null) {
        s_oMain.stopUpdate();
    }

}

function getParamValue(paramName) {
    var url = window.location.search.substring(1);
    var qArray = url.split('&');
    for (var i = 0; i < qArray.length; i++)
    {
        var pArr = qArray[i].split('=');
        if (pArr[0] == paramName)
            return pArr[1];
    }
}

function createCamera() {
    //var oCamera = new THREE.OrthographicCamera(CANVAS_WIDTH / -2, CANVAS_WIDTH / 2, CANVAS_HEIGHT / -2, CANVAS_HEIGHT / 2, 1, 1000);
    var oCamera = new THREE.PerspectiveCamera(FOV, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 5000);

    oCamera.rotation.x = 60 * (Math.PI / 180);
    oCamera.rotation.y = -0 * (Math.PI / 180);
    oCamera.rotation.z = 0 * (Math.PI / 180);

    oCamera.zoom = 1;

//    oCamera.left = CANVAS_WIDTH / -2;
//    oCamera.right = CANVAS_WIDTH / 2;
//    oCamera.top = CANVAS_HEIGHT / 2;
//    oCamera.bottom = CANVAS_HEIGHT / -2;

    //oCamera.position.set(START_CAMERA_POSITION.x,START_CAMERA_POSITION.y,START_CAMERA_POSITION.z);
    oCamera.position.set(0, -2455, 1205);

    oCamera.updateProjectionMatrix();
    oCamera.updateMatrixWorld();

    return oCamera;
}

function getRandomColor() {
    var iRandR = Math.floor((Math.random() * 127) + 255) - 127;
    var iRandG = Math.floor((Math.random() * 127) + 255) - 127;
    var iRandB = Math.floor((Math.random() * 127) + 255) - 127;

    return "rgba(" + iRandR + "," + iRandG + "," + iRandB + ",1)";
}

function distanceV2(v1, v2) {
    var iDx = v1.x - v2.x;
    var iDy = v1.y - v2.y;
    return Math.sqrt((iDx * iDx) + (iDy * iDy));
}

function saveItem(szItem, oValue) {
    localStorage.setItem(szItem, oValue);
}

function getItem(szItem) {
    return localStorage.getItem(szItem);
}

function clearAllItem() {
    localStorage.clear();
}

function BoundingBox(aPoint) {
    var fMinX = aPoint[0].x;
    var fMinY = aPoint[0].y;
    var fMaxX = aPoint[0].x;
    var fMaxY = aPoint[0].y;
    for (var i = 1; i < aPoint.length; i++) {
        if (aPoint[i].x < fMinX) {
            fMinX = aPoint[i].x;
        } else if (aPoint[i].x > fMaxX) {
            fMaxX = aPoint[i].x;
        }

        if (aPoint[i].y < fMinY) {
            fMinY = aPoint[i].y;
        } else if (aPoint[i].y > fMaxY) {
            fMaxY = aPoint[i].y;
        }
    }
    return {xMin: fMinX, yMin: fMinY, xMax: fMaxX, yMax: fMaxY};
}

function graphicsPoint(oPoint) {
    var oShape = new createjs.Shape();
    oShape.graphics.beginFill(getRandomColor()).drawCircle(5, 5, 10);
    oShape.x = oPoint.x;
    oShape.y = oPoint.y;
    s_oStage.addChild(oShape);
}

function inIframe() {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}
function CTextButton(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize){
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oText;
    var _oTextBack;
    
    this._init =function(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize){
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();

        var oButtonBg = createBitmap( oSprite);

        var iStepShadow = Math.ceil(iFontSize/20);

        _oTextBack = new createjs.Text(szText," "+iFontSize+"px "+szFont, "#000000");
        _oTextBack.textAlign = "center";
        _oTextBack.textBaseline = "alphabetic";
        var oBounds = _oTextBack.getBounds();    
        _oTextBack.x = oSprite.width/2 + iStepShadow;
        _oTextBack.y = Math.floor((oSprite.height)/2) +(oBounds.height/3) + iStepShadow;

        _oText = new createjs.Text(szText," "+iFontSize+"px "+szFont, szColor);
        _oText.textAlign = "center";
        _oText.textBaseline = "alphabetic";
        var oBounds = _oText.getBounds();    
        _oText.x = oSprite.width/2;
        _oText.y = Math.floor((oSprite.height)/2) +(oBounds.height/3);

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
        _oButton.addChild(oButtonBg,_oTextBack,_oText);

        s_oStage.addChild(_oButton);

        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown");
       _oButton.off("pressup");
       
       s_oStage.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
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
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    
    this.setTextPosition = function(iY){
        _oText.y= iY;
        _oTextBack.y = iY+2;
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
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this._init(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize);
    
    return this;
    
}

function CSetAllowed(oParentContainer) {
    var _oText1;
    var _oText1Shadow;
    var _oBg;
    var _oGroup;
    var _oButHome;
    var _oParentContainer = oParentContainer;

    this._init = function () {
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSprite);
        _oBg.regX = oSprite.width * 0.5;
        _oBg.regY = oSprite.height * 0.5;
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 0.5;

        var oText1Pos = {x: CANVAS_WIDTH / 2, y: (CANVAS_HEIGHT / 2) - 110};

        _oText1Shadow = new createjs.Text(TEXT_WRONG, " 24px " + PRIMARY_FONT, "#000");
        _oText1Shadow.x = oText1Pos.x + 2;
        _oText1Shadow.y = oText1Pos.y + 2;
        _oText1Shadow.textAlign = "center";
        _oText1Shadow.textBaseline = "middle";
        _oText1Shadow.lineWidth = 300;
        _oText1Shadow.alpha = TEXT_SHADOWN_ALPHA;

        _oText1 = new createjs.Text(TEXT_WRONG, " 24px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oText1.x = oText1Pos.x;
        _oText1.y = oText1Pos.y;
        _oText1.textAlign = "center";
        _oText1.textBaseline = "middle";
        _oText1.lineWidth = 300;

        _oGroup = new createjs.Container();
        _oGroup.addChild(oFade, _oBg, _oText1Shadow, _oText1);
        _oGroup.alpha = 0;
        _oParentContainer.addChild(_oGroup);

        _oButHome = new CGfxButton(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5 + 70, s_oSpriteLibrary.getSprite("but_home"), _oGroup);
        // _oButHome.addEventListener(ON_MOUSE_DOWN, this._onExitHelp, this);
        _oButHome.pulseAnimation();

        var oParent = this;
        _oGroup.on("pressup", function () {
            oParent._onPressUp();
        }, null, true);

        _oGroup.cursor = "pointer";

        createjs.Tween.get(_oGroup).to({alpha: 1}, 1000, createjs.cubicOut);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oGroup);
        _oGroup.removeAllEventListeners();
        _oButHome.unload();
        _oButHome = null;
    };

    this._onPressUp = function () {
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha: 0}, 700, createjs.Ease.cubicOut).call(function () {
            oParent.unload();
            s_oGame.onExit();
        });
    };

    this._init();
    return this;
}

function CScoreBoard(oSprite, iX, iY, oParentContainer) {

    var _oParentContainer = oParentContainer;
    var _pStartPosContainer;
    var _oContainer;
    var _oScoreBoard;
    var _oPlayerName;
    var _oPlayerNameShadow;
    var _oOpponentName;
    var _oOpponentNameShadow;
    var _oPlayerSet;
    var _oOpponentSet;
    var _oPlayerPoint;
    var _oOpponentPoint;
    var _aTexts;
    var _oCacheSize;
    var _oPlaceHolder;
    var _aPosPlaceHolder;

    this._init = function (oSprite, iX, iY) {
        _pStartPosContainer = {x: iX, y: iY};

        _oContainer = new createjs.Container();
        _oContainer.x = _pStartPosContainer.x;
        _oContainer.y = _pStartPosContainer.y;

        _oScoreBoard = createBitmap(oSprite);
        _oScoreBoard.x = 0;
        _oScoreBoard.y = 0;
        _oScoreBoard.regX = oSprite.width * 0.5;
        _oScoreBoard.regY = oSprite.height * 0.5;

        _oContainer.addChild(_oScoreBoard);

        _aTexts = new Array();

        for (var i = 0; i < 2; i++) {
            _aTexts[i] = new Array();
        }
        _oPlayerNameShadow = new createjs.Text(TEXT_CHARACTERS_NAMES[PLAYER_SIDE], "24px " + PRIMARY_FONT, "#000");
        _oPlayerNameShadow.x = -oSprite.width * 0.5 + 12;
        _oPlayerNameShadow.y = -oSprite.height * 0.5 + 26;
        _oPlayerNameShadow.textAlign = "left";
        _oPlayerNameShadow.textBaseline = "middle";
        _oContainer.addChild(_oPlayerNameShadow);
        _aTexts[PLAYER_SIDE][NAME_TEXT] = _oPlayerName;
        _oPlayerNameShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oPlayerName = new createjs.Text(TEXT_CHARACTERS_NAMES[PLAYER_SIDE], "24px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oPlayerName.x = -oSprite.width * 0.5 + 10;
        _oPlayerName.y = -oSprite.height * 0.5 + 24;
        _oPlayerName.textAlign = "left";
        _oPlayerName.textBaseline = "middle";
        _oContainer.addChild(_oPlayerName);
        _aTexts[PLAYER_SIDE][NAME_TEXT] = _oPlayerName;

        _oOpponentNameShadow = new createjs.Text(TEXT_CHARACTERS_NAMES[OPPONENT_SIDE], "24px " + PRIMARY_FONT, "#000");
        _oOpponentNameShadow.x = -oSprite.width * 0.5 + 12;
        _oOpponentNameShadow.y = oSprite.height * 0.5 - 24;
        _oOpponentNameShadow.textAlign = "left";
        _oOpponentNameShadow.textBaseline = "middle";
        _oContainer.addChild(_oOpponentNameShadow);
        _aTexts[OPPONENT_SIDE][NAME_TEXT] = _oOpponentName;
        _oOpponentNameShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oOpponentName = new createjs.Text(TEXT_CHARACTERS_NAMES[OPPONENT_SIDE], "24px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oOpponentName.x = -oSprite.width * 0.5 + 10;
        _oOpponentName.y = oSprite.height * 0.5 - 26;
        _oOpponentName.textAlign = "left";
        _oOpponentName.textBaseline = "middle";
        _oContainer.addChild(_oOpponentName);
        _aTexts[OPPONENT_SIDE][NAME_TEXT] = _oOpponentName;

        _oPlayerSet = new createjs.Text(0, "28px " + PRIMARY_FONT, TEXT_COLOR_1);
        _oPlayerSet.x = 62;
        _oPlayerSet.y = _oPlayerName.y;
        _oPlayerSet.textAlign = "center";
        _oPlayerSet.textBaseline = "middle";
        _oContainer.addChild(_oPlayerSet);
        _aTexts[PLAYER_SIDE][SET_TEXT] = _oPlayerSet;

        _oOpponentSet = new createjs.Text(0, "28px " + PRIMARY_FONT, TEXT_COLOR_1);
        _oOpponentSet.x = _oPlayerSet.x;
        _oOpponentSet.y = _oOpponentName.y;
        _oOpponentSet.textAlign = "center";
        _oOpponentSet.textBaseline = "middle";
        _oContainer.addChild(_oOpponentSet);
        _aTexts[OPPONENT_SIDE][SET_TEXT] = _oOpponentSet;

        _oPlayerPoint = new createjs.Text(45, "28px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oPlayerPoint.x = 97;
        _oPlayerPoint.y = _oPlayerName.y;
        _oPlayerPoint.textAlign = "center";
        _oPlayerPoint.textBaseline = "middle";
        _oContainer.addChild(_oPlayerPoint);
        _aTexts[PLAYER_SIDE][POINT_TEXT] = _oPlayerPoint;

        _oOpponentPoint = new createjs.Text(45, "28px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oOpponentPoint.x = 97;
        _oOpponentPoint.y = _oOpponentName.y;
        _oOpponentPoint.textAlign = "center";
        _oOpponentPoint.textBaseline = "middle";
        _oContainer.addChild(_oOpponentPoint);
        _aTexts[OPPONENT_SIDE][POINT_TEXT] = _oOpponentPoint

        var oSprtiePlaceHorder = s_oSpriteLibrary.getSprite("placeholder");
        _aPosPlaceHolder = new Array();
        _aPosPlaceHolder.push(oSprtiePlaceHorder.height * 0.5 + oSprtiePlaceHorder.height * 0.5 - 34);//Opponent
        _aPosPlaceHolder.push(oSprtiePlaceHorder.height * 0.5 - oSprtiePlaceHorder.height * 0.5 - 24);//Player

        _oPlaceHolder = createBitmap(oSprtiePlaceHorder);
        _oPlaceHolder.regX = oSprtiePlaceHorder.width * 0.5;
        _oPlaceHolder.regY = oSprtiePlaceHorder.height * 0.5;
        _oPlaceHolder.x = -oSprite.width * 0.5 - oSprtiePlaceHorder.width * 0.5 + 6;
        _oPlaceHolder.y = _aPosPlaceHolder[SERVICE_BY];

        _oContainer.addChild(_oPlaceHolder);

        _oCacheSize = {x: _oScoreBoard.regX * 3 + oSprtiePlaceHorder.width, y: _oScoreBoard.regY * 3};

        this.resizeChache();

        _oParentContainer.addChild(_oContainer);
    };

    this.resizeChache = function () {
        _oContainer.cache(_oContainer.x - _oCacheSize.x, _oContainer.y - _oCacheSize.y, _oCacheSize.x, _oCacheSize.y);
    };

    this.getStartPosition = function () {
        return _pStartPosContainer;
    };

    this.setPosition = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;

    };

    this.refreshScorePos = function (iNewX, iNewY) {
        this.setPosition(_pStartPosContainer.x + iNewX, _pStartPosContainer.y + iNewY);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
    };

    this.refreshText = function (iWho, iText, szText) {
        _aTexts[iWho][iText].text = szText;
        _oPlaceHolder.y = _aPosPlaceHolder[SERVICE_BY]
        _oContainer.updateCache();
    };

    this._init(oSprite, iX, iY);

    return this;
}
function CScenario() {

    var _iCurOutFieldCollisionID;
    var _iCurBoarderCollisionID;
    var _iCurNetCollisionID;
    var _iTimeStep;

    var _oWorld;
    var _oBallMaterial;
    var _oTerrainMaterial;
    var _oBallShape;
    var _oBallBody;
    var _oBallMesh;

    var _oFieldBody;
    var _oNetBody;
    var _oOutFieldBody;
    var _oBoarderBody;

    var _oOpponentBody;
    var _oPlayerBody;

    if (SHOW_3D_RENDER)
        var _oDemo = new CANNON.Demo();


    this.getDemo = function () {
        return _oDemo;
    };

    this._init = function () {
        _iTimeStep = TIME_STEP_WORLD;

        _iCurOutFieldCollisionID = null;
        _iCurBoarderCollisionID = null;
        _iCurNetCollisionID = null;


        if (SHOW_3D_RENDER) {
            _oWorld = _oDemo.getWorld();
            //var light = new THREE.AmbientLight( 0x404040 ); // soft white light
            //_oWorld.add( light );
        } else {
            _oWorld = new CANNON.World();
        }

        //_oWorld.gravity.set(0, 0, -9.81);
        _oWorld.gravity.set(0, 0, -9.81 * FPS);
        //_oWorld.gravity.set(0, 0, -180.1);
        _oWorld.broadphase = new CANNON.NaiveBroadphase();
        _oWorld.solver.iterations = 20;

        _oBallMaterial = new CANNON.Material();
        _oTerrainMaterial = new CANNON.Material();

        var ball_basket_cm = new CANNON.ContactMaterial(
                _oBallMaterial, _oTerrainMaterial, {
                    friction: 0.3,
                    restitution: 0.7,
                    contactEquationStiffness: 1e8,
                    contactEquationRelaxation: 3,
                    frictionEquationStiffness: 1e8,
                    frictionEquationRegularizationTime: 3
                });

        _oWorld.addContactMaterial(ball_basket_cm);

        s_oScenario.createNet();
        s_oScenario._createBallBody();
        _oPlayerBody = s_oScenario.oCharacterBody(PLAYER_POS_3D[s_iServiceSide], PROXY_COLLISION_PLAYER);

        _oOpponentBody = s_oScenario.oCharacterBody(OPPONENT_POS_3D[s_iServiceSide], PROXY_COLLISION_PLAYER);
//           model FBX
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            console.log(item, loaded, total);
        };

        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                //console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };

        var onError = function (xhr) {
        };

        var loader = new THREE.FBXLoader(manager);
        var oParent = this;

        loader.load('models/tennis_stadium.txt', function (objects) {
            s_oScenario.parseFile(objects);
            s_oGame.scenarioLoaded();
            objects = null;
			trace("scenario loaded");

        }, onProgress, onError);

    };

    this.parseFile = function (oFile) {
//        console.log(oFile);

        for (var i = 0; i < oFile.children.length; i++) {
            var oMesh = oFile.children[i];

            console.log("oMesh.name: " + oMesh.name);

            if (oMesh.name === "court") {
                s_oScenario._createFieldBody(oMesh);
            } else if (oMesh.name === "outfield") {
                s_oScenario._createOutField(oMesh);
            } else if (oMesh.name === "out") {
                s_oScenario._createBoarder(oMesh);
            }
        }
    };

    this.__extractMeshData = function (oMesh) {

        var aRawFaces = oMesh.geometry.faces;
        var aRawVerts = oMesh.geometry.vertices;
        var aOnlyFaceCoord = new Array();

        for (var i = 0; i < aRawFaces.length; i++) {
            aOnlyFaceCoord[i] = {a: aRawFaces[i].a, b: aRawFaces[i].b, c: aRawFaces[i].c};
        }

        var verts = [], faces = [];
        var fScale = 1;//0.5;
        // Get vertices
        for (var i = 0; i < aRawVerts.length; i++) {
            verts.push(aRawVerts[i].x * fScale);
            verts.push(aRawVerts[i].y * fScale);
            verts.push(aRawVerts[i].z * fScale);
        }
        // Get faces
        for (var i = 0; i < aRawFaces.length; i++) {
            faces.push(aRawFaces[i].a);
            faces.push(aRawFaces[i].b);
            faces.push(aRawFaces[i].c);
        }
        // Construct polyhedron
        return new CANNON.Trimesh(verts, faces);
    };

    this.oCharacterBody = function (oPos, oProperty) {
        var oShape = new CANNON.Box(new CANNON.Vec3(oProperty.width, oProperty.depth, oProperty.height));

        var oBody = new CANNON.Body({mass: 0});
        oBody.addShape(oShape);
        oBody.position.set(oPos.x, oPos.y, oPos.z);

        _oWorld.addBody(_oNetBody);

        if (SHOW_3D_RENDER) {
            var oMaterial = new THREE.MeshPhongMaterial({color: 0xffc281, specular: 0x111111, shininess: 70});
            _oDemo.addVisual(oBody, oMaterial);
        }

        return oBody;
    };

    this.createNet = function () {
        var oNetShape = new CANNON.Box(new CANNON.Vec3(NET_PROPERTIES.width, NET_PROPERTIES.depth, NET_PROPERTIES.height));

        _oNetBody = new CANNON.Body({mass: 0});
        _oNetBody.addShape(oNetShape);
        _oNetBody.position.set(NET_PROPERTIES.x, NET_PROPERTIES.y, NET_PROPERTIES.z);

        _oNetBody.addEventListener("collide", function (e) {
            s_oScenario.netCollision(e);
        });

        _oWorld.addBody(_oNetBody);

        if (SHOW_3D_RENDER) {
            var oNetMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, specular: 0x111111, shininess: 70});
            _oDemo.addVisual(_oNetBody, oNetMaterial);
        }
    };

    this._createFieldBody = function (oMesh) {
        //   var oFieldMesh = this.__extractMeshData(oMesh);

        var oBoundingPlane = BoundingBox(oMesh.geometry.vertices);

        var iXMed = (Math.abs(oBoundingPlane.xMin) + Math.abs(oBoundingPlane.xMax)) * 0.5;
        var iYMed = (Math.abs(oBoundingPlane.yMin) + Math.abs(oBoundingPlane.yMax)) * 0.5;

        var oFieldShape = new CANNON.Box(new CANNON.Vec3(iXMed, iYMed, FIELD_HEIGHT));
        // Add to compound
        _oFieldBody = new CANNON.Body({mass: 0, material: _oTerrainMaterial});
        _oFieldBody.addShape(oFieldShape);

        var v3IniPos = new CANNON.Vec3(oMesh.position.x, oMesh.position.y, oMesh.position.z - FIELD_HEIGHT);
        _oFieldBody.position.copy(v3IniPos);

        OFFSET_BALL_FIELD_Z_IMP = v3IniPos.z + BALL_RADIUS + 0.1;

        _oFieldBody.addEventListener("collide", function (e) {
            s_oScenario.fieldCollision(e);
        });

        // Create bodys
        _oWorld.addBody(_oFieldBody);

        if (SHOW_3D_RENDER) {
            var oFieldMaterial = new THREE.MeshPhongMaterial({color: 0x00ffff, specular: 0x111111, shininess: 70});
            _oDemo.addVisual(_oFieldBody, oFieldMaterial);
        }
    };

    this._createBallBody = function () {
        _oBallShape = new CANNON.Sphere(BALL_RADIUS);
        _oBallBody = new CANNON.Body({mass: BALL_MASS, material: _oBallMaterial, linearDamping: BALL_LINEAR_DAMPING,
            angularDamping: BALL_ANGULAR_DAMPING});

        var v3IniPos = new CANNON.Vec3(START_BALL_POSITION[SERVICE_BY][s_iServiceSide].x, START_BALL_POSITION[SERVICE_BY][s_iServiceSide].y,
                START_BALL_POSITION[SERVICE_BY][s_iServiceSide].z);
        _oBallBody.position.copy(v3IniPos);
        _oBallBody.previousPosition.copy(v3IniPos);

        _oBallBody.addShape(_oBallShape);
        _oWorld.add(_oBallBody);
        if (SHOW_3D_RENDER) {
            var oMaterial = new THREE.MeshPhongMaterial({color: 0xedf842, specular: 0x111111, shininess: 10});
            _oBallMesh = _oDemo.addVisual(_oBallBody, oMaterial);
        }
    };

    this._createOutField = function (oMesh) {
        var oOutFieldPosition = new CANNON.Vec3(oMesh.position.x, oMesh.position.y, oMesh.position.z);
        var oOutFieldMesh = this.__extractMeshData(oMesh);

        var iID = 0; //IF THERE ARE MORE THEN 1 SAME OBJECT, THEN iID = _aObjBody.length

        _oOutFieldBody = new CANNON.Body({mass: 0, material: _oTerrainMaterial});

        _oOutFieldBody.ID = iID;
        _oOutFieldBody.addEventListener("collide", function (e) {
//            _iCurOutFieldCollisionID = e.target.ID;
            s_oScenario.outFieldCollision(e);
        });

        _oOutFieldBody.addShape(oOutFieldMesh);
        _oOutFieldBody.position.copy(oOutFieldPosition);

        _oWorld.add(_oOutFieldBody);

        if (SHOW_3D_RENDER) {
            var oMaterial = new THREE.MeshPhongMaterial({color: 0x009900, specular: 0x111111, shininess: 30});
            _oDemo.addVisual(_oOutFieldBody, oMaterial);
        }
    };

    this._createBoarder = function (oMesh) {
        var oBoarderPosition = new CANNON.Vec3(oMesh.position.x, oMesh.position.y, oMesh.position.z);
        var oBoarderMesh = this.__extractMeshData(oMesh);

        var iID = 0; //IF THERE ARE MORE THEN 1 SAME OBJECT, THEN iID = _aObjBody.length

        _oBoarderBody = new CANNON.Body({mass: 0, material: _oTerrainMaterial});

        _oBoarderBody.ID = iID;
        _oBoarderBody.addEventListener("collide", function (e) {
//            _iCurBoarderCollisionID = e.target.ID;
            s_oScenario.borderCollision(e);
        });

        _oBoarderBody.addShape(oBoarderMesh);
        _oBoarderBody.position.copy(oBoarderPosition);

        _oWorld.add(_oBoarderBody);

        if (SHOW_3D_RENDER) {
            var oMaterial = new THREE.MeshPhongMaterial({color: 0x0000ff, specular: 0x555555, shininess: 30});
            _oDemo.addVisual(_oBoarderBody, oMaterial);
        }
    };

    this.netCollision = function (e) {
        s_oGame.ballCollideNet();
    };

    this.addImpulse = function (oBody, oVec3) {
        var v3WorldPoint = new CANNON.Vec3(0, 0, 0);
        var v3Impulse = new CANNON.Vec3(oVec3.x, oVec3.y, oVec3.z);
        oBody.applyImpulse(v3Impulse, v3WorldPoint);
    };

    this.getBodyVelocity = function (oBody) {
        return oBody.velocity;
    };

    this.ballBody = function () {
        return _oBallBody;
    };

    this.playerBody = function () {
        return _oPlayerBody;
    };

    this.opponentBody = function () {
        return _oOpponentBody;
    };

    this.ballMesh = function () {
        return _oBallMesh;
    };

    this.getCamera = function () {
        return _oDemo.camera();
    };

    this.setElementLinearDamping = function (oElement, fValue) {
        oElement.linearDamping = fValue;
    };

    this.setGravity = function (iVal) {
        _oWorld.gravity.set(0, 0, iVal);
    };

    this.update = function () {
        _oWorld.step(_iTimeStep);

        /*
         if(_bFieldCollision){
         this._checkFieldCollision();
         }
         
         if(_iCurOutFieldCollisionID !== null){
         this._checkOutFieldCollision();
         }
         if(_iCurBoarderCollisionID !== null){
         this._checkBoarderCollision();
         }
         if(_iCurNetCollisionID !== null){
         this._checkNetCollision();
         }
         */
    };

    this._checkFieldCollision = function () {
        for (var i = 0; i < _oWorld.contacts.length; i++) {
            var c = _oWorld.contacts[i];
            if ((c.bi === _oFieldBody && c.bj === _oBallBody) || (c.bi === _oBallBody && c.bj === _oFieldBody)) {
                s_oGame.ballCollideWithField(true);
                return true;
            }
        }
        s_oGame.ballCollideWithField(false);
        return false;
    };

    this._checkOutFieldCollision = function () {
        for (var i = 0; i < _oWorld.contacts.length; i++) {
            var c = _oWorld.contacts[i];
            if ((c.bi === _oOutFieldBody && c.bj === _oBallBody) || (c.bi === _oBallBody && c.bj === _oOutFieldBody)) {
                s_oGame.ballCollideWithOutField(true);
                return true;
            }
        }
        s_oGame.ballCollideWithOutField(false);
        _iCurOutFieldCollisionID = null;
        return false;
    };

    this._checkBoarderCollision = function () {
        for (var i = 0; i < _oWorld.contacts.length; i++) {
            var c = _oWorld.contacts[i];
            if ((c.bi === _oBoarderBody && c.bj === _oBallBody) || (c.bi === _oBallBody && c.bj === _oBoarderBody)) {
                s_oGame.ballCollideWithBoarder(true);
                return true;
            }
        }
        s_oGame.ballCollideWithBoarder(false);
        _iCurBoarderCollisionID = null;
        return false;
    };

    this._checkNetCollision = function () {
        for (var i = 0; i < _oWorld.contacts.length; i++) {
            var c = _oWorld.contacts[i];
            if ((c.bi === _oNetBody && c.bj === _oBallBody) || (c.bi === _oBallBody && c.bj === _oNetBody)) {
                s_oGame.ballCollideWithNet(true);
                return true;
            }
        }
        s_oGame.ballCollideWithNet(false);
        _iCurNetCollisionID = null;
        return false;
    };

    this.fieldCollision = function (e) {
        var fImpactForce = Math.abs(e.body.velocity.z) / BALL_MAX_VOL_IMPACT;

        playSound("hit_court", fImpactForce, 0);
        s_oGame.ballFieldTouch();
    };

    this.borderCollision = function (e) {
        s_oGame.ballOut();
    };

    this.outFieldCollision = function (e) {
        s_oGame.ballOut();
    };

    this.getWorld = function () {
        return _oWorld;
    };

    this.getNetBody = function () {
        return _oNetBody;
    };

    this.getField = function () {
        return _oFieldBody;
    };

    s_oScenario = this;

    if (SHOW_3D_RENDER) {
        _oDemo.addScene("Test", this._init);
        _oDemo.start();
    } else {
        this._init();
    }
}

var s_oScenario;



function CPreloader() {
    var _iMaskWidth;
    var _iMaskHeight;
    var _oLoadingText0;
    var _oLoadingText1;
    var _oProgressBar;
    var _oMaskPreloader;
    var _oFade;
    var _oContainer;

    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
    };

    this.unload = function () {
        _oContainer.removeAllChildren();
    };

    this.hide = function () {
        var oParent = this;
        setTimeout(function () {
            createjs.Tween.get(_oFade).to({alpha: 1}, 500).call(function () {
                oParent.unload();
                s_oMain.gotoMenu();
            });
        }, 1000);
    };

    this._onImagesLoaded = function () {

    };

    this._onAllImagesLoaded = function () {
        this.attachSprites();

        s_oMain.preloaderReady();
    };

    this.attachSprites = function () {

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oContainer.addChild(oBg);

        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
        _oProgressBar = createBitmap(oSprite);
        _oProgressBar.x = CANVAS_WIDTH / 2 - (oSprite.width / 2);
        _oProgressBar.y = CANVAS_HEIGHT - 170;
        _oContainer.addChild(_oProgressBar);

        _iMaskWidth = oSprite.width;
        _iMaskHeight = oSprite.height;
        _oMaskPreloader = new createjs.Shape();
        _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1, _iMaskHeight);

        _oContainer.addChild(_oMaskPreloader);

        _oProgressBar.mask = _oMaskPreloader;

        _oLoadingText1 = new createjs.Text("", "30px " + SECONDARY_FONT, "#fff");
        _oLoadingText1.x = CANVAS_WIDTH / 2;
        _oLoadingText1.y = CANVAS_HEIGHT + 125;
        _oLoadingText1.textBaseline = "alphabetic";
        _oLoadingText1.textAlign = "center";
        _oContainer.addChild(_oLoadingText1);

        _oLoadingText0 = new createjs.Text("", "30px Arial", "#fff");
        _oLoadingText0.x = CANVAS_WIDTH / 2;
        _oLoadingText0.y = CANVAS_HEIGHT - 125;
        _oLoadingText0.shadow = new createjs.Shadow("#000", 2, 2, 2);
        _oLoadingText0.textBaseline = "alphabetic";
        _oLoadingText0.textAlign = "center";
        _oContainer.addChild(_oLoadingText0);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;

        _oContainer.addChild(_oFade);
    };

    this.refreshLoader = function (iPerc) {
        _oLoadingText0.text = iPerc + "%";
        _oLoadingText1.text = iPerc + "%";

        _oMaskPreloader.graphics.clear();
        var iNewMaskWidth = Math.floor((iPerc * _iMaskWidth) / 100);
        _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth, _iMaskHeight);
    };

    this._init();
}
function CPowerBar(iXPos, iYPos, oParentContainer, bCreateText) {

    var _oContainer;
    var _pStartPos;

    var _oArrowMask;
    var _oArrow;
    var _oArrowFill;
    var _oArrowFrame;
    var _iMaskWidth;
    var _iMaskHeight;
    var _oTextPower;
    var _oParentContainer;

    this._init = function (iXPos, iYPos, bCreateText) {
        _pStartPos = {x: iXPos, y: iYPos};
        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer.addChild(_oContainer);

        var oSpriteArrow = s_oSpriteLibrary.getSprite("power_bar_bg");
        _oArrow = createBitmap(oSpriteArrow);
        _oArrow.regX = oSpriteArrow.width * 0.5;
        _oArrow.regY = oSpriteArrow.height;
        _oContainer.addChild(_oArrow);

        _oArrowFill = createBitmap(s_oSpriteLibrary.getSprite("power_bar_fill"));
        _oArrowFill.regX = oSpriteArrow.width * 0.5;
        _oArrowFill.regY = oSpriteArrow.height;
        _oContainer.addChild(_oArrowFill);

        _iMaskWidth = oSpriteArrow.width;
        _iMaskHeight = oSpriteArrow.height;

        _oArrowMask = new createjs.Shape();
        _oArrowMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oArrow.x, _oArrow.y, _iMaskWidth, 0);
        _oArrowMask.regX = _iMaskWidth * 0.5;
        _oArrowMask.regY = _iMaskHeight;
        _oContainer.addChild(_oArrowMask);

        var oSpriteArrowFrame = s_oSpriteLibrary.getSprite("power_bar_frame");
        _oArrowFrame = createBitmap(oSpriteArrowFrame);
        _oArrowFrame.regX = oSpriteArrowFrame.width * 0.5;
        _oArrowFrame.regY = oSpriteArrowFrame.height;
        _oContainer.addChild(_oArrowFrame);

        _oContainer.scaleY = -1;

        _oArrowFill.mask = _oArrowMask;

        if (bCreateText) {
            this.createTextPower();
        }
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
    };

    this.setVisible = function (bVisible) {
        _oContainer.visible = bVisible;
    };

    this.createTextPower = function () {
        _oTextPower = new createjs.Text(TEXT_POWER, 36 + "px " + PRIMARY_FONT, "#ffffff");
        _oTextPower.textAlign = "center";
        _oTextPower.textBaseline = "middle";
        _oTextPower.y = -_iMaskHeight - 50;
        _oTextPower.scaleY = -1;
        _oContainer.addChild(_oTextPower);
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oContainer.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oContainer.y = iYPos;
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.getStartPos = function () {
        return _pStartPos;
    };

    this.removeTweensMask = function () {
        createjs.Tween.removeTweens(_oArrowMask.graphics.command);
    };

    this.removeTweensContainer = function () {
        createjs.Tween.removeTweens(_oContainer);
    };

    this.animFade = function (fAlpha, oFunc, oArgument) {
        createjs.Tween.get(_oContainer).to({alpha: fAlpha}, 250, createjs.Ease.circleOut).call(function () {
            if (oFunc !== null)
                oFunc(oArgument);
        }, null, this);
    };

    this.getMaskValue = function () {
        return  _oArrowMask.graphics.command.h;
    };

    this.getMaskHeight = function () {
        return _iMaskHeight;
    };

    this.getAngle = function () {
        return _oContainer.rotation;
    };

    this.getObject = function () {
        return _oContainer;
    };

    this.setAlpha = function (fVal) {
        _oContainer.alpha = fVal;
    };

    this.setScaleX = function (fVal) {
        _oContainer.scaleX = fVal;
    };

    this.setScaleY = function (fVal) {
        _oContainer.scaleY = fVal;
    };

    this.graphicsForceMask = function (fTime) {
        _oArrowMask.graphics.command.h = (fTime / MAX_FORCE_Y) * _iMaskHeight;

//        var fForce = ((this.getMaskValue() / this.getMaskHeight()) * SERVICE_POWER_RATE)
    };

    this.mask = function (iVal) {
        _oArrowMask.graphics.clear();
        var iNewMaskHeight = Math.floor((iVal * _iMaskHeight) / 100);
        _oArrowMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oArrow.x, _oArrow.y, _iMaskWidth, iNewMaskHeight);
    };

    this.animateMask = function (iTime) {
        var oParent = this;
        createjs.Tween.get(_oArrowMask.graphics.command, {override: true}).to({h: _iMaskHeight}, iTime, createjs.Ease.cubicIn).call(function () {
            createjs.Tween.get(_oArrowMask.graphics.command).to({h: 0}, iTime, createjs.Ease.cubicOut).call(function () {
                oParent.animateMask(iTime);
            });
        });
    };

    this.animateRotation = function (iTime) {
        var oParent = this;
        createjs.Tween.get(_oContainer, {override: true}).to({rotation: MAX_EFFECT_ANGLE}, iTime, createjs.Ease.cubicInOut).call(function () {
            createjs.Tween.get(_oContainer).to({rotation: -MAX_EFFECT_ANGLE}, iTime, createjs.Ease.cubicInOut).call(function () {
                oParent.animateRotation(iTime);
            });
        });
    };

    _oParentContainer = oParentContainer;

    this._init(iXPos, iYPos, bCreateText);

    return this;
}
function CPause() {

    var _oContainer;
    var _oFade;
    var _oButContinue;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.alpha = 0;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        _oFade.on("click", function () {});

        _oContainer.addChild(_oFade);

        var oPauseText = new createjs.Text(TEXT_PAUSE, "70px " + PRIMARY_FONT, TEXT_COLOR_0);
        oPauseText.x = CANVAS_WIDTH * 0.5;
        oPauseText.y = CANVAS_HEIGHT * 0.5 - 100;
        oPauseText.textAlign = "center";
        _oContainer.addChild(oPauseText);

        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");

        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5 + 70, oSpriteContinue, _oContainer);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onLeavePause, this);
        _oButContinue.pulseAnimation();

        s_oStage.addChild(_oContainer);
        this.onPause(true);
        createjs.Tween.get(_oContainer, {ignoreGlobalPause: true}).to({alpha: 1}, 150, createjs.quartOut);

    };

    this.onPause = function (bVal) {
        s_oGame.pause(bVal);
    };

    this.unload = function () {
        _oFade.off("click", function () {});
        _oButContinue.unload();
        s_oStage.removeChild(_oContainer);
    };

    this._onLeavePause = function () {
        createjs.Ticker.paused = false;
        createjs.Tween.removeTweens(_oContainer);

        createjs.Tween.get(_oContainer, {ignoreGlobalPause: true}).to({alpha: 0}, 150, createjs.quartIn).call(function () {
            this.onPause(false);
            s_oInterface.unloadPause();
        }, null, this);
    };

    this._init();

    return this;
}
function CNet(iX, iY, oSprite, oParentContainer) {

    var _oNet;
    var _oParentContainer;

    this._init = function (iX, iY, oSprite) {

        _oNet = createBitmap(oSprite);
        this.setPosition(iX, iY);
        _oNet.cache(0, 0, oSprite.width, oSprite.height);

        _oParentContainer.addChild(_oNet);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oNet);
    };

    this.setPosition = function (iX, iY) {
        _oNet.x = iX;
        _oNet.y = iY;
    };

    this.getDepthPos = function () {
        return NET_PROPERTIES.y;
    };

    this.getObject = function () {
        return _oNet;
    };

    _oParentContainer = oParentContainer;

    this._init(iX, iY, oSprite);

    return this;
}



function CMenu() {
    var _oBg;
    var _oButPlay;
    var _oButContinue = null;
    var _oFade;
    var _oAudioToggle;
    var _oCreditsBut;
    var _oResetPanel = null;
    var _oContainerReset;

    var _pStartPosCredits;
    var _pStartPosAudio;
    var _pStartPosPlay;
    var _pStartPosContinue;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');

        _pStartPosPlay = {x: (CANVAS_WIDTH / 2), y: CANVAS_HEIGHT - 200};
        _oButPlay = new CGfxButton(_pStartPosPlay.x, _pStartPosPlay.y, oSprite, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        if (getItem("tennis_levelreached") !== null) {
            s_iLevelReached = getItem("tennis_levelreached");
            s_aScores = JSON.parse(getItem("tennis_scores"));
            s_iBestScore = getItem("tennis_best_score");

            _pStartPosPlay = {x: CANVAS_WIDTH / 2 - 200, y: CANVAS_HEIGHT - 200};
            _oButPlay.setPosition(_pStartPosPlay.x, _pStartPosPlay.y);

            _pStartPosContinue = {x: CANVAS_WIDTH / 2 + 200, y: CANVAS_HEIGHT - 200};

            var oSpriteContiune = s_oSpriteLibrary.getSprite('but_continue_big');
            _oButContinue = new CGfxButton(_pStartPosContinue.x, _pStartPosContinue.y, oSpriteContiune, s_oStage);
            _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
            _oButContinue.pulseAnimation();
        } else {
            _oButPlay.pulseAnimation();
            this.resetArrays();
            s_iBestScore = 0;
        }

        var oSprite = s_oSpriteLibrary.getSprite('but_info');
        _pStartPosCredits = {x: (oSprite.height / 2) + 10, y: (oSprite.height / 2) + 10};
        _oCreditsBut = new CGfxButton((CANVAS_WIDTH / 2), CANVAS_HEIGHT - 240, oSprite, s_oStage);
        _oCreditsBut.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        _oContainerReset = new createjs.Container();
        s_oStage.addChild(_oContainerReset);

        createjs.Tween.get(_oFade).to({alpha: 0}, MS_FADE_ANIM * 2).call(function () {
            _oFade.visible = false;
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function () {
        _oButPlay.unload();
        _oButPlay = null;

        if (_oButContinue !== null) {
            _oButContinue.unload();
            _oButContinue = null;
        }

        _oFade.visible = false;

        _oCreditsBut.unload();

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        s_oStage.removeChild(_oBg);
        _oBg = null;
        s_oMenu = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oCreditsBut.setPosition(_pStartPosCredits.x + iNewX, iNewY + _pStartPosCredits.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
//        _oButPlay.setPosition(_pStartPosPlay.x, _pStartPosPlay.y - iNewY);
//
//        if (_oButContinue !== null) {
//            _oButContinue.setPosition(_pStartPosContinue.x, _pStartPosContinue.y - iNewY);
//        }
    };

    this._onButPlayRelease = function () {
        if (getItem("tennis_levelreached") === null) {
            //       playSound("click", 1, 0);
            this.fadeAnim();
        } else {
            if (_oResetPanel === null) {
                _oResetPanel = new CConfirmPanel(TEXT_RESET, _oContainerReset);
                _oResetPanel.addEventListener(ON_BUT_NO_DOWN, this._onButNo, this);
                _oResetPanel.addEventListener(ON_BUT_YES_DOWN, this._onButYes, this);
            }
        }
    };

    this._onButNo = function () {
        _oResetPanel.unload();
        _oResetPanel = null;
    };

    this._onButYes = function () {
        _oResetPanel.unload();
        _oResetPanel = null;
        clearAllItem();
        s_iLevelReached = 1;
        this.resetArrays();
        this.fadeAnim();
    };

    this._onButContinueRelease = function () {
        this.fadeAnim();
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onCreditsBut = function () {
        new CCreditsPanel();
    };

    this.resetArrays = function () {
        s_aScores = new Array();

        for (var i = 0; i < OPPONENT_SPEED.length; i++) {
            s_aScores[i] = 0;
        }
    };


    this.fadeAnim = function () {
        _oFade.visible = true;
        createjs.Tween.get(_oFade, {override: true}).to({alpha: 1}, MS_FADE_ANIM, createjs.Ease.cubicIn).call(function () {
            this.unload();
            s_oMain.gotoLevelMenu();
        }, null, this);

    };

    s_oMenu = this;

    this._init();
}

var s_oMenu = null;
function CMain(oData) {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;

    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;
    var _oLevelMenu;

    this.initContainer = function () {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = true;
        createjs.Touch.enable(s_oStage);

        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(FPS);
            $('body').on('contextmenu', '#canvas', function (e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(FPS);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.preloaderReady = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            this._initSounds();
        }

        this._loadImages();
        _bUpdate = true;
    };

    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundtrack = createjs.Sound.play("soundtrack", {loop: -1});
            }
            this.gotoMenu();
        }
    };

    this._initSounds = function () {
        if (!createjs.Sound.initializeDefaultPlugins()) {
            return;
        }

        if (navigator.userAgent.indexOf("Opera") > 0 || navigator.userAgent.indexOf("OPR") > 0) {
            createjs.Sound.alternateExtensions = ["mp3"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");
            createjs.Sound.registerSound("./sounds/press_button.ogg", "click");
            createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over");
            createjs.Sound.registerSound("./sounds/hit_ball.ogg", "hit_ball");
            createjs.Sound.registerSound("./sounds/hit_court.ogg", "hit_court");
            createjs.Sound.registerSound("./sounds/lose_match.ogg", "lose_match");
            createjs.Sound.registerSound("./sounds/crowd_applauses.ogg", "crowd_applauses");
            createjs.Sound.registerSound("./sounds/crowd_disappoint.ogg", "crowd_disappoint");
            createjs.Sound.registerSound("./sounds/win_match.ogg", "win_match");
            createjs.Sound.registerSound("./sounds/out.ogg", "out");

        } else {
            createjs.Sound.alternateExtensions = ["ogg"];
            createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

            createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");
            createjs.Sound.registerSound("./sounds/press_button.mp3", "click");

            createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over");
            createjs.Sound.registerSound("./sounds/hit_ball.mp3", "hit_ball");

            createjs.Sound.registerSound("./sounds/hit_court.mp3", "hit_court");
            createjs.Sound.registerSound("./sounds/lose_match.mp3", "lose_match");

            createjs.Sound.registerSound("./sounds/crowd_applauses.mp3", "crowd_applauses");
            createjs.Sound.registerSound("./sounds/crowd_disappoint.mp3", "crowd_disappoint");

            createjs.Sound.registerSound("./sounds/win_match.mp3", "win_match");
            createjs.Sound.registerSound("./sounds/out.mp3", "out");
        }

        RESOURCE_TO_LOAD += 10;

    };

    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_yes_big", "./sprites/but_yes_big.png");
        s_oSpriteLibrary.addSprite("but_exit_big", "./sprites/but_exit_big.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_level", "./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("but_pause", "./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_continue_big", "./sprites/but_continue_big.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");

        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_level_menu", "./sprites/bg_level_menu.jpg");

        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("score_board", "./sprites/score_board.png");

        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("ball_shadow", "./sprites/ball_shadow.png");

        s_oSpriteLibrary.addSprite("power_bar_bg", "./sprites/power_bar_bg.png");
        s_oSpriteLibrary.addSprite("power_bar_fill", "./sprites/power_bar_fill.png");
        s_oSpriteLibrary.addSprite("power_bar_frame", "./sprites/power_bar_frame.png");

        s_oSpriteLibrary.addSprite("arrow_left", "./sprites/arrow_left.png");
        s_oSpriteLibrary.addSprite("arrow_right", "./sprites/arrow_right.png");
        s_oSpriteLibrary.addSprite("ball_trajectory", "./sprites/ball_trajectory.png");
        s_oSpriteLibrary.addSprite("cursor", "./sprites/cursor.png");
        s_oSpriteLibrary.addSprite("hand_touch", "./sprites/hand_touch.png");
        s_oSpriteLibrary.addSprite("net", "./sprites/net.png");
        s_oSpriteLibrary.addSprite("msg_box_big", "./sprites/msg_box_big.png");
        s_oSpriteLibrary.addSprite("placeholder", "./sprites/placeholder.png");
        s_oSpriteLibrary.addSprite("pattern_screen", "./sprites/pattern_screen.png");

        for (var i = 0; i < SPRITE_NAME_PLAYER.length; i++) {
            s_oSpriteLibrary.addSprite(SPRITE_NAME_PLAYER[i], "./sprites/player/" + SPRITE_NAME_PLAYER[i] + ".png");
        }

        for (var i = 0; i < SPRITE_NAME_OPPONENT.length; i++) {
            s_oSpriteLibrary.addSprite(SPRITE_NAME_OPPONENT[i], "./sprites/opponent/" + SPRITE_NAME_OPPONENT[i] + ".png");
        }

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);

        if (_iCurResource === RESOURCE_TO_LOAD) {
            _oPreloader.unload();

            if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
            }

            this.gotoMenu();
        }
    };

    this._onAllImagesLoaded = function () {

    };

    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages();
    };

    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoLevelMenu = function () {
        _oLevelMenu = new CLevelMenu(OPPONENT_SPEED.length);
        _iState = STATE_MENU;
    };

    this.gotoGame = function (iLevel) {
        _oGame = new CGame(_oData, iLevel);
        _iState = STATE_GAME;
    };

    this.gotoHelp = function () {
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };

    this.stopUpdate = function () {
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display", "block");
        createjs.Sound.setMute(true);
    };

    this.startUpdate = function () {
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display", "none");

        if (s_bAudioActive) {
            createjs.Sound.setMute(false);
        }
    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;

    _oData = oData;
    OPPONENT_SPEED = oData.opponent_speed;

    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iAdsLevel = 1;
var s_iLevelReached = 1;
var s_aScores;
var s_iBestScore;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundtrack;
var s_oCanvas;


var NUM_ROWS_PAGE_LEVEL = 3;
var NUM_COLS_PAGE_LEVEL = 5;
function CLevelMenu(iTotLevel) {
    var _iCurPage;
    var _iHeightToggle;
    var _aLevelButs;
    var _aPointsX;
    var _aContainerPage;

    var _pStartPosSelect;
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosRight;
    var _pStartPosLeft;
    var _pStartPosTotal;

    var _oButExit;
    var _oAudioToggle;
    var _oArrowRight = null;
    var _oArrowLeft = null;
    var _oTextLevel;
    var _oTextTotalScore;
    var _oContainer;
    var _oFade;

    this._init = function (iTotLevel) {
        _iCurPage = 0;

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_level_menu'));
        _oContainer.addChild(oBg);

        _pStartPosSelect = {x: CANVAS_WIDTH / 2, y: 180};

        _oTextLevel = new createjs.Text(TEXT_SELECT_LEVEL, "60px " + PRIMARY_FONT, TEXT_COLOR_4);
        _oTextLevel.x = _pStartPosSelect.x;
        _oTextLevel.y = _pStartPosSelect.y;
        _oTextLevel.textAlign = "center";
        s_oStage.addChild(_oTextLevel);

        _pStartPosTotal = {x: CANVAS_WIDTH_HALF, y: CANVAS_HEIGHT - 180};

        _oTextTotalScore = new createjs.Text(TEXT_TOTAL_SCORE + ": " + s_iBestScore, "50px " + PRIMARY_FONT, TEXT_COLOR_4);
        _oTextTotalScore.x = _pStartPosTotal.x;
        _oTextTotalScore.y = _pStartPosTotal.y;
        _oTextTotalScore.textAlign = "center";
        s_oStage.addChild(_oTextTotalScore);

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        _iHeightToggle = oSprite.height;

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _pStartPosAudio = {x: _oButExit.getX() - oSprite.width - 10, y: (oSprite.height / 2) + 10}
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, s_oSpriteLibrary.getSprite('audio_icon'), s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        this._checkBoundLimits();

        //FIND X COORDINATES FOR LEVEL BUTS
        _aPointsX = new Array();
        var iWidth = CANVAS_WIDTH - (EDGEBOARD_X * 4);
        var iOffsetX = Math.floor(iWidth / NUM_COLS_PAGE_LEVEL) / 2;
        var iXPos = 30;
        for (var i = 0; i < NUM_COLS_PAGE_LEVEL; i++) {
            _aPointsX.push(iXPos);
            iXPos += iOffsetX * 2;
        }

        _aContainerPage = new Array();
        this._createNewLevelPage(0, iTotLevel);

        if (_aContainerPage.length > 1) {
            //MULTIPLE PAGES
            for (var k = 1; k < _aContainerPage.length; k++) {
                _aContainerPage[k].visible = false;
            }

            _pStartPosRight = {x: CANVAS_WIDTH - 80, y: CANVAS_HEIGHT - 80};
            _oArrowRight = new CGfxButton(_pStartPosRight.x, _pStartPosRight.y, s_oSpriteLibrary.getSprite('arrow_right'), s_oStage);
            _oArrowRight.addEventListener(ON_MOUSE_UP, this._onRight, this);

            _pStartPosLeft = {x: 80, y: CANVAS_HEIGHT - 80};
            _oArrowLeft = new CGfxButton(_pStartPosLeft.x, _pStartPosLeft.y, s_oSpriteLibrary.getSprite('arrow_left'), s_oStage);
            _oArrowLeft.addEventListener(ON_MOUSE_UP, this._onLeft, this);
        }

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, MS_FADE_ANIM, createjs.Ease.cubicOut).call(function () {
            _oFade.visible = false;
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function () {
        for (var i = 0; i < _aLevelButs.length; i++) {
            _aLevelButs[i].unload();
        }

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
        }

        _oButExit.unload();

        if (_oArrowLeft !== null) {
            _oArrowLeft.unload();
            _oArrowRight.unload();
        }
        s_oStage.removeAllChildren();
        s_oLevelMenu = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, _pStartPosExit.y + iNewY);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }

        if (_oArrowLeft !== null) {
            _oArrowRight.setPosition(_pStartPosRight.x - iNewX, _pStartPosRight.y - iNewY);
            _oArrowLeft.setPosition(_pStartPosLeft.x + iNewX, _pStartPosLeft.y - iNewY);
        }

    };

    this._checkBoundLimits = function () {
        var oSprite = s_oSpriteLibrary.getSprite('but_level');
        var iY = 0;

        var iHeightBound = CANVAS_HEIGHT - (EDGEBOARD_Y * 2) - (_iHeightToggle * 2);
        var iNumRows = 0;

        while (iY < iHeightBound) {
            iY += oSprite.height + 20;
            iNumRows++;
        }

        if (NUM_ROWS_PAGE_LEVEL > iNumRows) {
            NUM_ROWS_PAGE_LEVEL = iNumRows;
        }


        var iNumCols = 0;
        var iX = 0;
        var iWidthBounds = CANVAS_WIDTH - (EDGEBOARD_X * 2);
        var oSprite = s_oSpriteLibrary.getSprite('but_level');

        while (iX < iWidthBounds) {
            iX += (oSprite.width / 2) + 5;
            iNumCols++;
        }
        if (NUM_COLS_PAGE_LEVEL > iNumCols) {
            NUM_COLS_PAGE_LEVEL = iNumCols;
        }
    };

    this._createNewLevelPage = function (iStartLevel, iEndLevel) {
        var oContainerLevelBut = new createjs.Container();
        _oContainer.addChild(oContainerLevelBut);
        _aContainerPage.push(oContainerLevelBut);

        _aLevelButs = new Array();
        var iCont = 0;
        var iY = 0;
        var iNumRow = 1;
        var bNewPage = false;
        var oSprite = s_oSpriteLibrary.getSprite('but_level');
        for (var i = iStartLevel; i < iEndLevel; i++) {
            var oBut = new CLevelBut(_aPointsX[iCont] + oSprite.width / 4, iY + oSprite.height / 2, i + 1, oSprite, (i + 1) > s_iLevelReached ? false : true, oContainerLevelBut);
            oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onButLevelRelease, this, i);
            _aLevelButs.push(oBut);

            iCont++;
            if (iCont === _aPointsX.length) {
                iCont = 0;
                iY += oSprite.height + 50;
                iNumRow++;
                if (iNumRow > NUM_ROWS_PAGE_LEVEL) {
                    bNewPage = true;
                    break;
                }
            }
        }

        oContainerLevelBut.x = CANVAS_WIDTH / 2;
        oContainerLevelBut.y = 320;
        oContainerLevelBut.regX = oContainerLevelBut.getBounds().width / 2;

        if (bNewPage) {
            //ADD A PAGE
            this._createNewLevelPage(i + 1, iEndLevel);
        }

    };

    this._onRight = function () {
        _aContainerPage[_iCurPage].visible = false;

        _iCurPage++;
        if (_iCurPage >= _aContainerPage.length) {
            _iCurPage = 0;
        }

        _aContainerPage[_iCurPage].visible = true;
    };

    this._onLeft = function () {
        _aContainerPage[_iCurPage].visible = false;

        _iCurPage--;
        if (_iCurPage < 0) {
            _iCurPage = _aContainerPage.length - 1;
        }

        _aContainerPage[_iCurPage].visible = true;
    };

    this._onButLevelRelease = function (iLevel) {
        _oFade.visible = true;
        createjs.Tween.get(_oFade, {override: true}).to({alpha: 1}, MS_FADE_ANIM, createjs.Ease.cubicIn).call(function () {
            this.unload();
            s_oMain.gotoGame(iLevel);
        }, null, this);
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        _oFade.visible = true;
        createjs.Tween.get(_oFade, {override: true}).to({alpha: 1}, MS_FADE_ANIM, createjs.Ease.cubicIn).call(function () {
            this.unload();
            s_oMain.gotoMenu();
        }, null, this);

    };

    s_oLevelMenu = this;
    this._init(iTotLevel);
}

var s_oLevelMenu = null;
function CLevelBut(iXPos, iYPos, szText, oSprite, bActive, oParentContainer) {
    var _bActive;
    var _aCbCompleted;
    var _aCbOwner;
    var _aButton = new Array();
    var _aParams = [];

    var _oLevelText;
    var _oButton;
    var _oContainer;
    var _oParentContainer;

    this._init = function (iXPos, iYPos, szText, oSprite, bActive) {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
            animations: {state_true: [0], state_false: [1]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _bActive = bActive;
        _oButton = createSprite(oSpriteSheet, "state_" + _bActive, (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);

        _oButton.mouseEnabled = bActive;
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.stop();
        _oButton.cache(-oSprite.width / 2, -oSprite.height / 2, oSprite.width, oSprite.height);

        if (!s_bMobile) {
            _oContainer.cursor = "pointer";
        }

        _oContainer.addChild(_oButton);
        _aButton.push(_oButton);

//        _oLevelTextStruct = new createjs.Text(szText, "46px " + FONT_GAME, TEXT_COLOR_STROKE);
//        _oLevelTextStruct.x = iXPos;
//        _oLevelTextStruct.y = iYPos + 20;
//        _oLevelTextStruct.textAlign = "center";
//        _oLevelTextStruct.textBaseline = "alphabetic";
//        _oLevelTextStruct.lineWidth = 200;
//        _oLevelTextStruct.outline = 6;
//        _oContainer.addChild(_oLevelTextStruct);

        _oLevelText = new createjs.Text(szText, "bold 36px " + PRIMARY_FONT, TEXT_COLOR_2);
        _oLevelText.x = iXPos - 1;
        _oLevelText.y = iYPos - 20;
        _oLevelText.textAlign = "center";
        _oLevelText.textBaseline = "middle";
        _oLevelText.lineWidth = 200;
        _oContainer.addChild(_oLevelText);

        if (!bActive) {
            _oLevelText.color = "#b4b4b4";
            //  _oLevelTextStruct.color = "#606161";
        }

        this._initListener();
    };

    this.unload = function () {
        _oContainer.off("mousedown", this.buttonDown);
        _oContainer.off("pressup", this.buttonRelease);

        _oContainer.removeChild(_oButton);
    };

    this._initListener = function () {
        _oContainer.on("mousedown", this.buttonDown);
        _oContainer.on("pressup", this.buttonRelease);
    };

    this.viewBut = function (oButton) {
        _oContainer.addChild(oButton);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.addEventListenerWithParams = function (iEvent, cbCompleted, cbOwner, aParams) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };

    this.ifClickable = function () {
        if (_oContainer.mouseEnabled === true) {
            return 1;
        }
        return 0;
    };

    this.setActive = function (iLevel, bActive) {
        _bActive = bActive;
        _aButton[iLevel].gotoAndStop("state_" + _bActive);
        _aButton[iLevel].mouseEnabled = true;

        if (_bActive) {
            _oLevelText.color = "#69b8d5";
//            _oLevelTextStruct.color = "#004e6f";
        } else {
            _oLevelText.color = "#b4b4b4";
//            _oLevelTextStruct.color = "#606161";
        }

    };

    this.buttonRelease = function () {
        if (!_bActive) {
            return;
        }

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams);
        }
    };

    this.buttonDown = function () {
        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams);
        }
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
    };

    this.setVisible = function (bVisible) {
        _oContainer.visible = bVisible;
    };

    _oParentContainer = oParentContainer;
    this._init(iXPos, iYPos, szText, oSprite, bActive, oParentContainer);
}
function CLevelBoard(oParentContainer) {

    var _pContainerPos;
    var _oLevelText;
    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _oBounds;

    this._init = function () {
        _oLevelText = new createjs.Text(TEXT_MATCH + ": 99", "50px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oLevelText.textAlign = "center";
        _oLevelText.textBaseline = "middle";

        _pContainerPos = {x: CANVAS_WIDTH * 0.5, y: _oLevelText.getBounds().height + 10};
        _oContainer = new createjs.Container();
        _oContainer.x = _pContainerPos.x;
        _oContainer.y = _pContainerPos.y;
        _oParentContainer.addChild(_oContainer);

        _oContainer.addChild(_oLevelText);
        _oBounds = _oContainer.getBounds();
        this.updateCache();
    };

    this.updateCache = function () {
        _oContainer.cache(-_oBounds.width, -_oBounds.height, _oBounds.width * 2, _oBounds.height * 2);
    };

    this.getStartPosLevel = function () {
        return _pContainerPos;
    };

    this.setPos = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this.refreshPos = function (iNewX, iNewY) {
        this.setPos(_pContainerPos.x , _pContainerPos.y + iNewY);
    };

    this.refreshTextLevel = function (iLevel) {
        _oLevelText.text = TEXT_MATCH + ": " + iLevel;
        this.updateCache();
    };

    this._init();

    return this;
}

TEXT_ARE_SURE = "ARE YOU SURE?";
TEXT_PAUSE = "PAUSE";
TEXT_RESET = "ARE YOU SURE? ALL YOUR PREVIOUS SCORES WILL BE DELETED!";

TEXT_POWER = "POWER";
TEXT_CHARACTERS_NAMES = ["OPPONENT", "PLAYER"];
TEXT_WIN = "YOU WON";
TEXT_LOSE = "YOU LOST";
TEXT_SET = "SET";
TEXT_OUT = "OUT";
TEXT_FAULT = "FAULT";
TEXT_SCORE_MATCH = "SCORE MATCH";
TEXT_TOTAL_SCORE = "TOTAL SCORE";
TEXT_SELECT_LEVEL = "SELECT A LEVEL";
TEXT_MATCH = "MATCH";
TEXT_HELP_DESKTOP_0 = "CLICK THE MOUSE BUTTON TO STOP THE POWER BAR AND SERVE THE BALL";
TEXT_HELP_MOBILE_0 = "TOUCH SCREEN TO STOP POWER BAR AND SERVE THE BALL";
TEXT_HELP_DESKTOP_1 = "MOVE THE MOUSE TO SET DIRECTION AND HEIGHT OF THE BALL";
TEXT_HELP_MOBILE_1 = "SWIPE TO SET DIRECTION AND HEIGHT OF THE BALL";
TEXT_HELP_DESKTOP_2 = "HOLD DOWN THE MOUSE BUTTON TO INCREASE THE SHOT'S POWER";
TEXT_HELP_MOBILE_2 = "HOLD DOWN TO INCREASE THE SHOT'S POWER";
TEXT_KMH = "KMH";
TEXT_WRONG = "NUMBER OF SET NOT VALID. PLEASE SET ONE OF THIS VALUES FOR SET NUMBER: 1, 3, 5";

TEXT_COLOR_0 = "#fff";
TEXT_COLOR_1 = "#000";
TEXT_COLOR_2 = "#e49f0c";
TEXT_COLOR_3 = "#ec9706";
TEXT_COLOR_4 = "#4f8ede";
TEXT_COLOR_5 = "#6a727c";

TEXT_SHADOWN_ALPHA = 0.6;

//CANCELLARE QUELLO CHE NON SERVE

TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better";

function CInterface() {
    var _oAudioToggle;
    var _oButExit;
    var _oButPause;
    var _oButFullscreen;
    var _oHelpPanel = null;
    var _oScoreBoard;
    var _oPause;
    var _oHelpText = null;
    var _oAnimText;
    var _oVelocityScreen;

    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosPause;
    var _pStartPosFullscreen; 

    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this._init = function () {

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_pause');
        _pStartPosPause = {x: _pStartPosExit.x - oSprite.height - 10, y: _pStartPosExit.y};
        _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, s_oStage);
        _oButPause.addEventListener(ON_MOUSE_UP, this.onButPauseRelease, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _pStartPosPause.x - oSprite.height - 10, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        } else {
            _pStartPosAudio = _pStartPosPause;
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (ENABLE_FULLSCREEN === false) {
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && !inIframe()) {
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen");
            _pStartPosFullscreen = {x: _pStartPosAudio.x - oSprite.width / 2 - 10, y: _pStartPosExit.y};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x, _pStartPosFullscreen.y, oSprite, false, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreen, this);
        }

        var oSpriteBoard = s_oSpriteLibrary.getSprite("score_board");

        _oScoreBoard = new CScoreBoard(oSpriteBoard, oSpriteBoard.width * 0.5 + 43, oSpriteBoard.height * 0.5 + 10, s_oStage);

        _oVelocityScreen = new CVelocityScreen(911, 132, s_oStage);

        //      _oLevelBoard = CLevelBoard(s_oStage);

        _oAnimText = new CAnimText(s_oStage);

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        _oButExit.unload();
        _oButExit = null;

        _oButPause.unload();
        _oButPause = null;

        if (_oHelpPanel !== null) {
            _oHelpPanel.unload();
        }

        if (_fRequestFullScreen && !inIframe()) {
            _oButFullscreen.unload();
            _oButFullscreen = null;
        }

        s_oInterface = null;
    };

    this._onFullscreen = function () {
        if (s_bFullscreen) {
            _fCancelFullScreen.call(window.document);
            s_bFullscreen = false;
        } else {
            _fRequestFullScreen.call(window.document.documentElement);
            s_bFullscreen = true;
        }

        sizeHandler();
    };

    this.createHelpText = function () {
        _oHelpText = new CHelpText(s_oStage);
        _oHelpText.fadeAnim(1, null);
    };

    this.unloadHelpText = function () {
        if (_oHelpText !== null) {
            _oHelpText.fadeAnim(0, _oHelpText.unload);
            _oHelpText = null;
        }
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        _oButPause.setPosition(_pStartPosPause.x - iNewX, iNewY + _pStartPosPause.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        s_oGame.refreshPos(iNewX, iNewY);

        if (_fRequestFullScreen && !inIframe()) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX, _pStartPosFullscreen.y + iNewY);
        }

        _oScoreBoard.refreshScorePos(iNewX, iNewY);
    };

    this.refreshScoreBoard = function (iWho, iText, szText) {
        _oScoreBoard.refreshText(iWho, iText, szText);
    };

    this.refreshMatchBoard = function (iLevel) {
        //    _oLevelBoard.refreshTextLevel(iLevel);
    };

    this.refreshVelocityScreen = function (iVel) {
        _oVelocityScreen.refreshVelocityText(iVel);
    };

    this.startAnimText = function (szText, szSize, szColor) {
        _oAnimText.setText(szText, szSize, szColor);
        _oAnimText.animText();
    };

    this.createEndPanel = function (iPlayerSet, iOpponentSet, iPlayerPoint, iOpponentPoint, bPlayerWin, iMatchScore, iTotScore, bEnd) {
        var oEndPanel = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box_big"), bPlayerWin, bEnd);
        oEndPanel.show(iPlayerSet, iOpponentSet, iPlayerPoint, iOpponentPoint, iMatchScore, iTotScore, bPlayerWin);
    };

    this.createHelpPanel = function () {
        _oHelpPanel = new CHelpPanel();
    };

    this._onButRestartRelease = function () {
        s_oGame.restartGame();
        $(s_oMain).trigger("restart_level", 1);
    };

    this.onExitFromHelp = function () {
        if (_oHelpPanel !== null) {
            _oHelpPanel.unload();
        }
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.unloadPause = function () {
        _oPause.unload();
        _oPause = null;
    };

    this.onButPauseRelease = function () {
        _oPause = new CPause();
    };

    this._onExit = function () {
        new CAreYouSurePanel(s_oGame.onExit);
        s_oGame.pause(true);
    };

    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;
var MS_TIME_FADE_HELP_TEXT = 500;
function CHelpText(oParentContainer) {

    var _oParentContainer = oParentContainer;
    var _oHelpText;
    var _oContainer;
    var _oFade;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oContainer.addChild(_oFade);

        _oHelpText = new createjs.Text(TEXT_HELP_DESKTOP_0, "42px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oHelpText.x = CANVAS_WIDTH / 2;
        _oHelpText.y = CANVAS_HEIGHT_HALF;
        _oHelpText.textAlign = "center";
        _oHelpText.lineWidth = "700";

        _oContainer.addChild(_oHelpText);

        _oParentContainer.swapChildren(_oContainer, s_oGame.getPowerBar().getObject());

        _oContainer.alpha = 0;
    };

    this.fadeAnim = function (fVal, oFunc) {
        createjs.Tween.get(_oContainer, {override: true}).to({alpha: fVal}, MS_TIME_FADE_HELP_TEXT).call(function () {
            if (oFunc !== null) {
                oFunc();
            }
        }, null, this);
    };

    this.unload = function () {
        createjs.Tween.removeTweens(_oContainer);
        _oParentContainer.removeChild(_oContainer);
    };

    this._init();

    return this;
}
function CHelpPanel() {
    var _oText1;
    var _oText1Shadow;
    var _oText2;
    var _oText2Shadow;
    var _oHelpBg;
    var _oGroup;
    var _oHandSwipeAnim;
    var _oButContinue;
    var _oPowerBar;

    this._init = function () {
        var oSprite = s_oSpriteLibrary.getSprite('msg_box_big');
        _oHelpBg = createBitmap(oSprite);
        _oHelpBg.regX = oSprite.width * 0.5;
        _oHelpBg.regY = oSprite.height * 0.5;
        _oHelpBg.x = CANVAS_WIDTH_HALF;
        _oHelpBg.y = CANVAS_HEIGHT_HALF;

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 0.5;

        var oText1Pos = {x: CANVAS_WIDTH / 2, y: (CANVAS_HEIGHT / 2) - 190};


        var szImage = "cursor";
        var szText_0 = TEXT_HELP_DESKTOP_1;
        var szText_1 = TEXT_HELP_DESKTOP_2;
        if (s_bMobile) {
            szText_0 = TEXT_HELP_MOBILE_1;
            szText_1 = TEXT_HELP_MOBILE_2;
            szImage = "hand_touch";
        }

        _oText1Shadow = new createjs.Text(szText_0, " 24px " + PRIMARY_FONT, "#000");
        _oText1Shadow.x = oText1Pos.x + 2;
        _oText1Shadow.y = oText1Pos.y + 2;
        _oText1Shadow.textAlign = "center";
        _oText1Shadow.textBaseline = "middle";
        _oText1Shadow.lineWidth = 500;
        _oText1Shadow.alpha = TEXT_SHADOWN_ALPHA;

        _oText1 = new createjs.Text(szText_0, " 24px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oText1.x = oText1Pos.x;
        _oText1.y = oText1Pos.y;
        _oText1.textAlign = "center";
        _oText1.textBaseline = "middle";
        _oText1.lineWidth = 500;

        var oText2Pos = {x: CANVAS_WIDTH / 2 -20, y: (CANVAS_HEIGHT / 2) + 50};

        _oText2Shadow = new createjs.Text(szText_1, " 24px " + PRIMARY_FONT, "#000");
        _oText2Shadow.x = oText2Pos.x + 2;
        _oText2Shadow.y = oText2Pos.y + 2;
        _oText2Shadow.textAlign = "center";
        _oText2Shadow.textBaseline = "middle";
        _oText2Shadow.lineWidth = 300;
        _oText2Shadow.alpha = TEXT_SHADOWN_ALPHA;

        _oText2 = new createjs.Text(szText_1, " 24px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oText2.x = oText2Pos.x;
        _oText2.y = oText2Pos.y;
        _oText2.textAlign = "center";
        _oText2.textBaseline = "middle";
        _oText2.lineWidth = _oText2Shadow.lineWidth;

        _oGroup = new createjs.Container();
        _oGroup.addChild(oFade, _oHelpBg, _oText1Shadow, _oText1, _oText2Shadow, _oText2);
        _oGroup.alpha = 0;
        s_oStage.addChild(_oGroup);

        _oHandSwipeAnim = new CHandSwipeAnim(START_HAND_SWIPE_POS, END_HAND_SWIPE_POS, s_oSpriteLibrary.getSprite(szImage), _oGroup);

        _oPowerBar = new CPowerBar(CANVAS_WIDTH_HALF - 220, CANVAS_HEIGHT_HALF - 50, _oGroup, false);
        _oPowerBar.animateMask(TIME_POWER_BAR);
        _oPowerBar.setScaleX(0.7);
        _oPowerBar.setScaleY(-0.7);

        createjs.Tween.get(_oGroup).to({alpha: 1}, 700, createjs.Ease.cubicIn).call(function () {
            _oHandSwipeAnim.animAllSwipe();
        });

        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5 + 220, CANVAS_HEIGHT * 0.5 + 150, s_oSpriteLibrary.getSprite("but_continue"), _oGroup);
        //    _oButContinue.addEventListener(ON_MOUSE_DOWN, this._onExitHelp, this);
        _oButContinue.pulseAnimation();

        var oParent = this;
        _oGroup.on("pressup", function () {
            oParent._onExitHelp();
        }, null, true);

        _oGroup.cursor = "pointer";
    };

    this.unload = function () {
        s_oStage.removeChild(_oGroup);
        _oGroup.removeAllEventListeners();
    };

    this._onExitHelp = function () {
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha: 0}, 700, createjs.Ease.cubicOut).call(function () {
            oParent.unload();
            s_oGame._onExitHelp();
        });
    };

    this._init();
    return this;
}

var MS_TIME_SWIPE_END = 1000;
var MS_TIME_SWIPE_START = 3000;
var START_HAND_SWIPE_POS = {x: CANVAS_WIDTH_HALF, y: CANVAS_HEIGHT_HALF };
var END_HAND_SWIPE_POS = [{x: CANVAS_WIDTH_HALF - 250, y: CANVAS_HEIGHT_HALF - 120}, {x: CANVAS_WIDTH_HALF, y: CANVAS_HEIGHT_HALF - 120},
    {x: CANVAS_WIDTH_HALF + 250, y: CANVAS_HEIGHT_HALF - 120}];

function CHandSwipeAnim(oStartPoint, aEndPoint, oSprite, oParentContainer) {
    var _oParentContainer = oParentContainer;
    var _oHandSwipe;
    var _oContainer;
    var _oStartPoint = oStartPoint;
    var _aEndPoint = aEndPoint;
    var _bAnimation = false;

    this._init = function (oSprite) {
        _oContainer = new createjs.Container();
        _oHandSwipe = createBitmap(oSprite);
        _oHandSwipe.x = _oStartPoint.x;
        _oHandSwipe.y = _oStartPoint.y;
        _oHandSwipe.regX = oSprite.width * 0.5;
        _oHandSwipe.regY = oSprite.height * 0.5;
        _oHandSwipe.alpha = 0;

        _oParentContainer.addChild(_oContainer);
        _oContainer.addChild(_oHandSwipe);
    };

    this.animAllSwipe = function () {
        _bAnimation = true;
        var oParent = this;

        createjs.Tween.get(_oHandSwipe).to({alpha: 1}, MS_TIME_SWIPE_END * 0.1).wait(MS_TIME_SWIPE_END * 0.3).to({alpha: 0}, MS_TIME_SWIPE_END * 0.5, createjs.Ease.quartOut);
        createjs.Tween.get(_oHandSwipe).to({x: _aEndPoint[0].x, y: _aEndPoint[0].y},
                MS_TIME_SWIPE_END, createjs.Ease.quartOut).call(function () {
            _oHandSwipe.x = _oStartPoint.x;
            _oHandSwipe.y = _oStartPoint.y;
            createjs.Tween.get(_oHandSwipe).to({alpha: 1}, MS_TIME_SWIPE_END * 0.1).wait(MS_TIME_SWIPE_END * 0.3).to({alpha: 0}, MS_TIME_SWIPE_END * 0.5, createjs.Ease.quartOut);
            createjs.Tween.get(_oHandSwipe).to({x: _aEndPoint[1].x, y: _aEndPoint[1].y},
                    MS_TIME_SWIPE_END, createjs.Ease.quartOut).call(function () {
                _oHandSwipe.x = _oStartPoint.x;
                _oHandSwipe.y = _oStartPoint.y;
                createjs.Tween.get(_oHandSwipe).to({alpha: 1}, MS_TIME_SWIPE_END * 0.1).wait(MS_TIME_SWIPE_END * 0.3).to({alpha: 0}, MS_TIME_SWIPE_END * 0.5, createjs.Ease.quartOut);
                createjs.Tween.get(_oHandSwipe).to({x: _aEndPoint[2].x, y: _aEndPoint[2].y},
                        MS_TIME_SWIPE_END, createjs.Ease.quartOut).call(function () {
                    _oHandSwipe.x = _oStartPoint.x;
                    _oHandSwipe.y = _oStartPoint.y;
                    oParent.animAllSwipe();
                });
            });
        });
    };

    this.fadeAnim = function (fVal) {
        createjs.Tween.get(_oContainer, {override: true}).to({alpha: fVal}, 250);
    };

    this.isAnimate = function () {
        return _bAnimation;
    };

    this.setVisible = function (bVal) {
        _oHandSwipe.visible = bVal;
    };

    this.removeTweens = function () {
        createjs.Tween.removeTweens(_oHandSwipe);
        _bAnimation = false;
    };

    this._init(oSprite);

    return this;
}
function CGfxButton(iXPos, iYPos, oSprite, oParentContainer) {

    var _bDisabled;
    var _bCached = true;

    var _iScaleFactor;

    var _aCbCompleted;
    var _aCbOwner;

    var _oButton;
    var _oTween;
    var _oParent;

    this._init = function (iXPos, iYPos, oSprite, oParentContainer) {
        _bDisabled = false;

        _iScaleFactor = 1;

        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        _oButton = createBitmap(oSprite);
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.scaleX = _oButton.scaleY = _iScaleFactor;
        _oButton.regX = oSprite.width / 2;
        _oButton.regY = oSprite.height / 2;
        _oButton.cache(0, 0, _oButton.regX * 2, _oButton.regY * 2);

        oParentContainer.addChild(_oButton);

        this._initListener();
    };

    this.unload = function () {
        if (s_bMobile) {
            _oButton.off("mousedown", this.buttonDown);
            _oButton.off("pressup", this.buttonRelease);
        } else {
            _oButton.off("mousedown", this.buttonDown);
            _oButton.off("mouseover", this.buttonOver);
            _oButton.off("pressup", this.buttonRelease);
        }

        oParentContainer.removeChild(_oButton);
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this.setClickable = function (bVal) {
        _bDisabled = !bVal;
    };

    this._initListener = function () {
        if (s_bMobile) {
            _oButton.on("mousedown", this.buttonDown);
            _oButton.on("pressup", this.buttonRelease);
        } else {
            _oButton.on("mousedown", this.buttonDown);
            _oButton.on("mouseover", this.buttonOver);
            _oButton.on("pressup", this.buttonRelease);
        }
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.buttonRelease = function () {
        if (_bDisabled) {
            return;
        }
        _oButton.scaleX = _iScaleFactor;
        _oButton.scaleY = _iScaleFactor;

        if (_bCached) {
            _oButton.updateCache();
        }

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };

    this.buttonDown = function () {
        if (_bDisabled) {
            return;
        }
        _oButton.scaleX = _iScaleFactor * 0.9;
        _oButton.scaleY = _iScaleFactor * 0.9;

        if (_bCached) {
            _oButton.updateCache();
        }

        playSound("click", 1, 0);

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
        }
    };

    this.buttonOver = function (evt) {
        if (!s_bMobile) {
            if (_bDisabled) {
                return;
            }
            evt.target.cursor = "pointer";
        }
    };

    this.pulseAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({scaleX: _iScaleFactor * 1.1, scaleY: _iScaleFactor * 1.1}, 850, createjs.Ease.quadOut).to({scaleX: _iScaleFactor, scaleY: _iScaleFactor}, 650, createjs.Ease.quadIn).call(function () {
            _oParent.pulseAnimation();
        });
        this.uncache();
    };

    this.trembleAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({rotation: 5}, 75, createjs.Ease.quadOut).to({rotation: -5}, 140, createjs.Ease.quadIn).to({rotation: 0}, 75, createjs.Ease.quadIn).wait(750).call(function () {
            _oParent.trebleAnimation();
        });
        this.uncache();
    };

    this.uncache = function () {
        _oButton.uncache();
        _bCached = false;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oButton.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oButton.y = iYPos;
    };

    this.getButtonImage = function () {
        return _oButton;
    };

    this.getX = function () {
        return _oButton.x;
    };

    this.getY = function () {
        return _oButton.y;
    };

    _oParent = this;
    this._init(iXPos, iYPos, oSprite, oParentContainer);

    return this;
}
var CHARACTERS;
var BALL;
var SERVICE_BY = PLAYER_SIDE;
function CGame(oData, iLevel) {
    var _bTouchActive;
    var _bInitGame;
    var _bService = false;
    var _bBallLaunched = false;
    var _bBallFieldTouch = false;
    var _bMouseDown = false;
    var _bOut = false;
    var _bShowHelpText = true;

    var _iScore;
    var _iScoreMatch;
    var _iGameState = -1;
    var _iTimePressDown = 0;
    var _iBallSide;
    var _iBallShot;
    var _iPlayerPoint = 0;
    var _iOpponentPoint = 0;
    var _iPlayerSet = 0;
    var _iOpponentSet = 0;
    var _iServiceAttempt = 0;

    var _oInterface;
    var _oEndPanel = null;
    var _oParent;
    var _oScene;
    var _oCamera;
    var _oBall;
    var _oContainerGame;
    var _oClickPoint;
    var _oReleasePoint;
    var _oHitArea = null;
    var _oPlayer;
    var _oOpponent;
    var _oPowerBar;
    var _oControllerMovement;
    var _oNet;
    var _oAI;
    var _oFade;
    var _oAudioMatch = null;

    var _aObjects;

    var _vHitDir;

    this._init = function () {
        $(s_oMain).trigger("start_session");

        _aObjects = new Array();
        CHARACTERS = new Array();

        _bTouchActive = false;
        _bInitGame = true;

        _iScore = 0;
        _iScoreMatch = 0;

        _iScore = 0;
        for (var i = 0; i < s_iLevel; i++) {
            _iScore += s_aScores[i];
        }

        _oContainerGame = new createjs.Container();
        s_oStage.addChild(_oContainerGame);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        oBg.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainerGame.addChild(oBg); //Draws on canvas

        _oScene = new CScenario();

        if (!CAMERA_TEST) {
            camera = createCamera();
        }
        _oCamera = camera;

        this.createBall();
        _oBall.getPhysics().mass = 0;
        _aObjects.push(_oBall);

        resizeCanvas3D();

        _oClickPoint = {x: 0, y: 0};
        _oReleasePoint = {x: 0, y: 0};

        _oOpponent = new CCharacter(0, 0, OPPONENT_SCALE_MULTIPLIER,
                IDLE, OFFSET_CONTAINER_OPPONENT, SPRITE_NAME_OPPONENT, CHARACTERS_ANIMATIONS, ANIMATION_SPRITE_SHEET_SECTION,
                _oScene.opponentBody(), OPPONENT_SIDE, _oContainerGame);
        _oOpponent.runAnim(IDLE);
        _oOpponent.setMaxSpeed(OPPONENT_SPEED[s_iLevel]);
        _oOpponent.setAcceleration(OPPONENT_ACCELERATION[s_iLevel]);

        _aObjects.push(_oOpponent);

        CHARACTERS.push(_oOpponent);

        _oPlayer = new CCharacter(0, 0, PLAYER_SCALE_MULTIPLIER,
                IDLE, OFFSET_CONTAINER_PLAYER, SPRITE_NAME_PLAYER, CHARACTERS_ANIMATIONS, ANIMATION_SPRITE_SHEET_SECTION,
                _oScene.playerBody(), PLAYER_SIDE, _oContainerGame);

        _oPlayer.runAnim(IDLE);
        _oPlayer.setMaxSpeed(PLAYER_SPEED);
        _oPlayer.setAcceleration(PLAYER_ACCELERATION);

        CHARACTERS.push(_oPlayer);

        _aObjects.push(_oPlayer);

        _oNet = new CNet(315, 255, s_oSpriteLibrary.getSprite("net"), _oContainerGame);
        _aObjects.push(_oNet);

        _oPowerBar = new CPowerBar(CANVAS_WIDTH_HALF - 550, CANVAS_HEIGHT_HALF - 100, s_oStage, true);
        _oPowerBar.setVisible(false);
        _oPowerBar.setAlpha(0);

        _oControllerMovement = new CControllerMovement();
        _oAI = new CAI(_oOpponent);

        _oInterface = new CInterface();
        _oInterface.refreshMatchBoard(s_iLevel + 1);
        _oInterface.refreshVelocityScreen(0);
        this.refreshScoreBoard();

        tweenVolume(s_oSoundtrack, 0.3, MS_TIME_FADE_VOL);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, MS_FADE_ANIM, createjs.Ease.cubicOut).call(function () {
            _oFade.visible = false;
        });

        _vHitDir = new CANNON.Vec3(0, 0, 0);

        if (SET_FOR_WIN === 1 || SET_FOR_WIN === 3 || SET_FOR_WIN === 5) {
            if (s_iLevel === 0 && !SHOW_3D_RENDER) {
                _oInterface.createHelpPanel();
            } else {
                _bShowHelpText = false;
                this._onExitHelp();
            }
        } else {
            new CSetAllowed(s_oStage);
        }
    };

    this.scenarioLoaded = function () {
        _iGameState = STATE_INIT;
    };

    this.changeState = function (iVal) {
        _iGameState = iVal;
    };

    this.serviceBy = function () {
        _oPowerBar.mask(0);
        if (SERVICE_BY === PLAYER_SIDE) {
            this.activeStateLaunchPower();
            _oOpponent.runAnim(STANCE);
            _oPlayer.runAnim(SERVICE);
            _oPlayer.pauseAnim(true);
        } else {
            createjs.Tween.get(this).wait(500).call(function () {
                this.startAnimPlayerService(_oOpponent, _oAI.serve);
            });
            _oPlayer.runAnim(STANCE);
            _oOpponent.runAnim(SERVICE);
            _oOpponent.pauseAnim(true);
            _oPowerBar.setVisible(false);
        }
    };

    this.activeStateLaunchPower = function () {
        if (_bShowHelpText) {
            _oInterface.createHelpText();
        }
        _oPowerBar.setVisible(true);
        _oPowerBar.animFade(1, null);
        _oPowerBar.animateMask(TIME_POWER_BAR);
    };

    this.startAnimPlayerService = function (oCharacter, oFunc) {
        oCharacter.runAnim(SERVICE);
        oCharacter.setActionFunc(oFunc);
        s_oGame.playerService();
    };

    this.playerService = function () {

        _oInterface.unloadHelpText();
        _bShowHelpText = false;

        _oBall.getPhysics().mass = BALL_MASS;

        if (_iBallSide === OPPONENT_SIDE) {
            this.addImpulseToBall(START_LAUNCH_IMPULSE_BALL_OPPONENT);
        } else {
            this.addImpulseToBall(START_LAUNCH_IMPULSE_BALL_PLAYER);
        }

        _bService = true;
    };

    this.playerServeBall = function () {
        var fForce = ((_oPowerBar.getMaskValue() / _oPowerBar.getMaskHeight()) * SERVICE_POWER_RATE) + OFFSET_FORCE_Y_PLAYER;
        if (fForce < SERVICE_POWER_MIN) {
            fForce = SERVICE_POWER_MIN;
        }

        var fForceTot = fForce * BALL_DENSITY;

        var oDir = {x: SERVICE_IMPULSE_PLAYER_SIDE[s_iServiceSide].x * (fForceTot * 0.1), y: fForceTot,
            z: SERVICE_IMPULSE_PLAYER_SIDE[s_iServiceSide].z * (fForceTot * 0.1)};

        s_oGame.addImpulseToBall(oDir);

        _oPowerBar.mask(0);
        _oPowerBar.animFade(0, _oPowerBar.setVisible, false);

        s_oGame.calculateVelocityService(oDir);

        playSound("hit_ball", 1, 0);
    };

    this.calculateVelocityService = function (oImpulse) {
        var fMagnitude = Math.sqrt((oImpulse.x * oImpulse.x) + (oImpulse.y * oImpulse.y) + (oImpulse.z * oImpulse.z)) / BALL_DENSITY;

        _oInterface.refreshVelocityScreen(Math.floor(fMagnitude * KMH));
    };

    this.refreshPos = function (iXPos, iYPos) {
        _oPowerBar.setPosition(_oPowerBar.getStartPos().x + iXPos, _oPowerBar.getStartPos().y - iYPos);
    };

    this.createControl = function () {
        if (!SHOW_3D_RENDER) {
            _oHitArea = new createjs.Shape();
            _oHitArea.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            _oContainerGame.addChild(_oHitArea);

            _oHitArea.on('mousedown', this.onMouseDown);
            _oHitArea.on('pressmove', this.onPressMove);
            _oHitArea.on('pressup', this.onPressUp);
        } else {
            window.addEventListener('mousedown', this.onMouseDown);
            window.addEventListener('mousemove', this.onPressMove);
            window.addEventListener('mouseup', this.onPressUp);
        }
    };

    this.createBall = function () {
        var oSpriteBall = s_oSpriteLibrary.getSprite("ball");
        _oBall = new CBall(0, 0, oSpriteBall, _oScene.ballBody(), _oContainerGame);
        BALL = _oBall;
        _aObjects.push(_oBall);
    };

    this.onMouseDown = function () {
        _oClickPoint = {x: s_oStage.mouseX, y: s_oStage.mouseY};
        if (!_bService && SERVICE_BY === PLAYER_SIDE) {
            _oPowerBar.removeTweensMask();
            s_oGame.ballShotBy(PLAYER_SIDE);
            s_oGame.startAnimPlayerService(_oPlayer, s_oGame.playerServeBall);
            return;
        } else if (_iBallShot === PLAYER_SIDE || !_bService) {
            _oPowerBar.mask(0);
            _oPowerBar.animFade(0, _oPowerBar.setVisible, false);
            return;
        }

        _oPowerBar.mask(0);
        _oPowerBar.setVisible(true);
        _oPowerBar.animFade(1, null);
        _bMouseDown = true;
    };

    this.pause = function (bVal) {
        if (bVal === true) {
            createjs.Ticker.paused = true;
            _iGameState = STATE_PAUSE;
        } else {
            createjs.Ticker.paused = false;
            _iGameState = STATE_PLAY;
        }
        for (var i = 0; i < CHARACTERS.length; i++) {
            if (CHARACTERS[i].getAnimType() !== SERVICE || _bService) {
                CHARACTERS[i].pauseAnim(bVal);
            }
        }
    };

    this.onPressMove = function () {
        if (!_bService || !_bMouseDown || _iBallShot === PLAYER_SIDE) {
            return;
        }
        _oReleasePoint = {x: s_oStage.mouseX, y: s_oStage.mouseY};
    };

    this.onPressUp = function () {
        if (!_bService || !_bMouseDown || _iBallShot === PLAYER_SIDE) {
            return;
        }
        if (_oReleasePoint.x === 0 && _oReleasePoint.y === 0) {
            _oClickPoint.x = 0;
            _oClickPoint.y = 0;
        }

        var fDistance = Math.ceil(distanceV2(_oClickPoint, _oReleasePoint)) * FORCE_RATE;

        var fDefaultZ = 0;

        if (fDistance > FORCE_MAX) {
            fDistance = FORCE_MAX;
        } else if (fDistance < DETECT_FORCE_DIRECTION) {
            _oReleasePoint.x = _oClickPoint.x;
            fDefaultZ = DEFAULT_Z_FORCE;
        }

        var vHitDir2D = new CVector2(_oClickPoint.x - _oReleasePoint.x,
                _oClickPoint.y - _oReleasePoint.y);

        vHitDir2D.scalarProduct(fDistance);

        var fForceLength = vHitDir2D.length();


        if (fForceLength > HIT_BALL_MAX_FORCE) {
            vHitDir2D.normalize();
            vHitDir2D.scalarProduct(HIT_BALL_MAX_FORCE);
        }

        var fForceY = _iTimePressDown;

        if (fForceY > MAX_FORCE_Y) {
            fForceY = MAX_FORCE_Y;
        } else if (fForceY < MIN_FORCE_Y) {
            fForceY = MIN_FORCE_Y;
        }

        _vHitDir.set(-vHitDir2D.getX() * FORCE_MULTIPLIER_AXIS_PLAYER.x, fForceY * FORCE_MULTIPLIER_AXIS_PLAYER.y,
                fDefaultZ + vHitDir2D.getY() * FORCE_MULTIPLIER_AXIS_PLAYER.z);

        _oReleasePoint.x = 0;
        _oReleasePoint.y = 0;

        _bMouseDown = false;

        _iTimePressDown = 0;
    };

    this.onContinue = function () {
        s_iLevel++;
        _oOpponent.setSpeed(0);
        _oOpponent.setAcceleration(OPPONENT_ACCELERATION[s_iLevel]);
        _oOpponent.setMaxSpeed(OPPONENT_SPEED[s_iLevel]);
        _oInterface.refreshMatchBoard(s_iLevel + 1);

        this.restartGame();
    };

    this.launchBall = function () {
        //     var fDistance = distanceV2(_oPlayer.getPos(), BALL.getPos());
        if (!_bBallLaunched) {
            return;
        } else if (_vHitDir.x === 0 && _vHitDir.y === 0 && _vHitDir.z === 0) {
            return;
        }

        s_oGame.addImpulseToBall(_vHitDir);
        if (!_bOut) {
            s_oGame.ballShotBy(PLAYER_SIDE);
            playSound("hit_ball", 1, 0);
        }
        _vHitDir.set(0, 0, 0);
        _iTimePressDown = 0;
        _oPowerBar.mask(0);
        _oPowerBar.animFade(0, _oPowerBar.setVisible, false);
    };

    this.addImpulseToBall = function (oDir) {
        if (oDir.x === 0 && oDir.y === 0 && oDir.z === 0) {
            return;
        }
        if (_iGameState !== STATE_PLAY || _oBall.getPhysics().mass === 0 || _bOut) {
            return;
        }
        var oBall = _oScene.ballBody();
        oBall.velocity.set(0, 0, 0);
        _oScene.addImpulse(oBall, oDir);
        oBall.angularVelocity.set(0, 0, 0);
        //  _bBallLaunched = true;
        // _oBall.setVisible(true);
        if (oBall.position.z < OFFSET_BALL_FIELD_Z_IMP) {
            oBall.position.z += 0.2;
        }

        _bBallFieldTouch = false;
    };

    this.resetBallPosition = function () {
        var oBallBody = _oScene.ballBody();

        oBallBody.position.set(START_BALL_POSITION[SERVICE_BY][s_iServiceSide].x, START_BALL_POSITION[SERVICE_BY][s_iServiceSide].y,
                START_BALL_POSITION[SERVICE_BY][s_iServiceSide].z);
        oBallBody.velocity.set(0, 0, 0);
        oBallBody.angularVelocity.set(0, 0, 0);
        oBallBody.mass = 0;
    };

    this.resetScene = function () {
        _bBallLaunched = false;
        _bBallFieldTouch = false;
        _bOut = false;
        _bService = false;
        _bMouseDown = false;
        _vHitDir.set(0, 0, 0);
        _iTimePressDown = 0;

        this.resetBallPosition();
        this.resetCharactersPosition();

        this.serviceBy();
    };

    this.resetCharactersPosition = function () {
        _oPlayer.getPhysics().position.set(PLAYER_POS_3D[s_iServiceSide].x, PLAYER_POS_3D[s_iServiceSide].y, PLAYER_POS_3D[s_iServiceSide].z);
        _oPlayer.runAnim(IDLE);
        _oOpponent.getPhysics().position.set(OPPONENT_POS_3D[s_iServiceSide].x, OPPONENT_POS_3D[s_iServiceSide].y, OPPONENT_POS_3D[s_iServiceSide].z);
        _oOpponent.runAnim(IDLE);
    };

    this.restartGame = function () {
        _iOpponentPoint = 0;
        _iOpponentSet = 0;
        _iPlayerPoint = 0;
        _iPlayerSet = 0;
        _iServiceAttempt = 0;
        _iScore -= _iScoreMatch;
        _iScoreMatch = 0;
        _iGameState = STATE_PLAY;

        this.refreshScoreBoard();

        this.unloadAudioMatch();

        tweenVolume(s_oSoundtrack, 0, MS_TIME_FADE_VOL);

        this.resetScene();
        $(s_oMain).trigger("restart_level", s_iLevel);
    };

    this.unloadAudioMatch = function () {
        if (_oAudioMatch !== null) {
            _oAudioMatch.removeAllEventListeners();
            _oAudioMatch.destroy();
            _oAudioMatch = null;
        }
    };

    this.unload = function () {
        _bInitGame = false;

        _oInterface.unload();
        if (_oEndPanel !== null) {
            _oEndPanel.unload();
        }
        s_oGame.unloadAudioMatch();

        if (_oHitArea !== null) {
            _oHitArea.removeAllEventListeners();
        }

        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };

    this.onExit = function () {
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("end_level", s_iLevel);
        _oFade.visible = true;
        s_oStage.setChildIndex(_oFade, s_oStage.numChildren - 1);

        createjs.Tween.get(_oFade, {override: true}).to({alpha: 1}, MS_FADE_ANIM, createjs.Ease.cubicOut).call(function () {
            $(s_oMain).trigger("show_interlevel_ad");
            s_oGame.unload();
            if (s_oSoundtrack !== undefined)
                tweenVolume(s_oSoundtrack, 1, MS_TIME_FADE_VOL);
            s_oMain.gotoMenu();
        }, null, this);
    };

    this._onExitHelp = function () {
        _oInterface.onExitFromHelp();
        this.createControl();
        $(s_oMain).trigger("start_level", s_iLevel);
        tweenVolume(s_oSoundtrack, 0, MS_TIME_FADE_VOL);
        this.serviceBy();
    };

    this.refreshObjectPosition2D = function (oObject, fScaleFactor) {
        var oBody = oObject.getPhysics();

        var oPos2D = this.convert3dPosTo2dScreen(oBody.position, _oCamera);

        var fScaleDistance = oPos2D.z * (fScaleFactor - oObject.getStartScale()) + oObject.getStartScale();

        oObject.setPosition(oPos2D.x, oPos2D.y);
        oObject.scale(fScaleDistance);

        if (oObject.castShadown()) {
            this.refreshShadowCast(oObject, oBody, fScaleDistance);
        }
    };

    this.refreshShadowCast = function (oObject, oBody, fScaleDistance) {
        var oFieldBody = _oScene.getField();

        if (oBody.position.z < oFieldBody.position.z) {
            oObject.scaleShadow(0);
            return;
        }

        var oPosShadow = {x: oBody.position.x, y: oBody.position.y, z: oFieldBody.position.z};

        var oPos2dShadow = this.convert3dPosTo2dScreen(oPosShadow, _oCamera);

        var fDistance = (oBody.position.z - BALL_SHADOW_POS) * ((oFieldBody.position.z - SHADOWN_FACTOR) - oFieldBody.position.z) + oFieldBody.position.z;

        var fScaleHeight = fDistance;

        if (fScaleHeight < 0) {
            return;
        } else if (fScaleHeight > 1) {
            fScaleHeight = 1;
        }

        oObject.scaleShadow(fScaleHeight);

        oObject.setAlphaByHeight(fDistance);
        oObject.setPositionShadow(oPos2dShadow.x, oPos2dShadow.y);
    };

    this.swapChildrenIndex = function () {
        for (var i = 0; i < _aObjects.length - 1; i++) {
            for (var j = i + 1; j < _aObjects.length; j++) {
                if (_aObjects[i].getObject().visible && _aObjects[j].getObject().visible)
                    this.sortDepth(_aObjects[i], _aObjects[j]);
            }
        }
    };

    this.sortDepth = function (oObj1, oObj2) {
        if (oObj1.getDepthPos() > oObj2.getDepthPos()) {
            if (_oContainerGame.getChildIndex(oObj1.getObject()) > _oContainerGame.getChildIndex(oObj2.getObject())) {
                _oContainerGame.swapChildren(oObj1.getObject(), oObj2.getObject());
            }
        } else if (oObj1.getDepthPos() < oObj2.getDepthPos()) {
            if (_oContainerGame.getChildIndex(oObj2.getObject()) > _oContainerGame.getChildIndex(oObj1.getObject())) {
                _oContainerGame.swapChildren(oObj2.getObject(), oObj1.getObject());
            }
        }
    };

    this.convert2dScreenPosTo3d = function (oPos2d, oBody) {
        var iWidth = (s_iCanvasResizeWidth);
        var iHeight = (s_iCanvasResizeHeight);

        var mouse3D = new THREE.Vector3((oPos2d.x / iWidth) * 2 - 1, //x
                -(oPos2d.y / iHeight) * 2 + 1, //y
                -1);                                            //z
        mouse3D.unproject(_oCamera);
        mouse3D.sub(_oCamera.position);
        mouse3D.normalize();

        var fFactor = oBody.position.y;//Object3d.y

        mouse3D.multiply(new THREE.Vector3(fFactor, 1, fFactor));

        return mouse3D;
    };

    this.convert3dPosTo2dScreen = function (pos, oCamera) {
        var v3 = new THREE.Vector3(pos.x, pos.y, pos.z);
        var vector = v3.project(oCamera);

        var widthHalf = Math.floor(s_iCanvasResizeWidth) * 0.5;
        var heightHalf = Math.floor(s_iCanvasResizeHeight) * 0.5;


        vector.x = ((vector.x * widthHalf) + widthHalf) * s_fInverseScaling;
        vector.y = (-(vector.y * heightHalf) + heightHalf) * s_fInverseScaling;

        return vector;
    };

    this.ballShotBy = function (iVal) {
        _iBallShot = iVal;
    };

    this.animCharacters = function () {
        for (var i = 0; i < CHARACTERS.length; i++) {
            switch (CHARACTERS[i].getAnimType()) {
                case SERVICE:
                    if (CHARACTERS[i].getStateAnim()) {
                        CHARACTERS[i].animWithEnd(IDLE, SERVICE_FRAME_SHOT);//next anim, call function at frame
                    }
                    break;
                case FOREHAND:
                    if (CHARACTERS[i].getStateAnim()) {
                        CHARACTERS[i].animWithEnd(IDLE, FOREHAND_FRAME_SHOT);//next anim, call function at frame
                    }
                    break;
                case BACKHAND:
                    if (CHARACTERS[i].getStateAnim()) {
                        CHARACTERS[i].animWithEnd(IDLE, BACKHAND_FRAME_SHOT);//next anim, call function at frame
                    }
                    break;
            }
        }
    };

    this.charactersPosition2D = function () {
        for (var i = 0; i < CHARACTERS.length; i++) {
            this.refreshObjectPosition2D(CHARACTERS[i], CHARACTERS_SCALE_FACTOR);
        }
    };

    this.ballSide = function () {
        if (_oScene.getNetBody().position.y < _oBall.getPhysics().position.y) {
            if (SERVICE_BY === PLAYER_SIDE) {
                _bBallLaunched = true;
            }
            _iBallSide = OPPONENT_SIDE;
        } else {
            if (SERVICE_BY === OPPONENT_SIDE) {
                _bBallLaunched = true;
            }
            _iBallSide = PLAYER_SIDE;
        }
    };

    this.idleCharacterForBallOut = function (oChar) {
        if (oChar.getAnimType() !== IDLE && oChar.getAnimType() !== FOREHAND && oChar.getAnimType() !== BACKHAND) {
            oChar.runAnim(IDLE);
        }
    };

    this.charactersMovement = function () {
        if (!_bBallLaunched || _bOut) {
            return false;
        } else if (!_bBallFieldTouch) {
            if (Math.abs(_oBall.getPhysics().position.x) > FIELD_OUT_BALL_WIDTH) {
                this.idleCharacterForBallOut(CHARACTERS[_iBallSide]);
                return false;
            } else if (Math.abs(_oBall.getPhysics().position.y) > FIELD_HALF_LENGHT) {
                this.idleCharacterForBallOut(CHARACTERS[_iBallSide]);
                return false;
            }
        }

        if (_iBallShot === OPPONENT_SIDE) {
            switch (_oOpponent.getAnimType()) {
                case IDLE:
                case STANCE:
                case RUN:
                case RUN_REVERSE:
                case STRAFE_LEFT:
                case STRAFE_RIGHT:
                    if (!this.checkDistanceCharacterToPos(_oOpponent, RETURN_POS_CHARACTERS_OPPONENT)) {
                        _oControllerMovement.moveCharacterToPos(_oOpponent, RETURN_POS_CHARACTERS_OPPONENT);
                    }
                    break;
                default:
                    if (_oBall.getPhysics().velocity.y < 0 && _iBallSide === OPPONENT_SIDE) {
                        if (_oPlayer.getAnimType() !== IDLE) {
                            _oPlayer.runAnim(IDLE);
                            return false;
                        }
                    }
                    break;
            }
        } else if (_iBallShot === PLAYER_SIDE) {
            switch (_oPlayer.getAnimType()) {
                case IDLE:
                case STANCE:
                case RUN:
                case RUN_REVERSE:
                case STRAFE_LEFT:
                case STRAFE_RIGHT:
                    if (!this.checkDistanceCharacterToPos(_oPlayer, RETURN_POS_CHARACTERS_PLAYER)) {
                        _oControllerMovement.moveCharacterToPos(_oPlayer, RETURN_POS_CHARACTERS_PLAYER);
                    }
                    break;
                default:
                    if (_oBall.getPhysics().velocity.y > 0 && _iBallSide === PLAYER_SIDE) {
                        if (_oOpponent.getAnimType() !== IDLE) {
                            _oOpponent.runAnim(IDLE);

                            return false;
                        }
                    }
                    break;
            }
        }

        if (CHARACTERS[_iBallSide].getPhysics().position.y < PLAYER_LIMIT_POS_Y) {
            if (_oPlayer.getAnimType() !== IDLE) {
                _oPlayer.runAnim(IDLE);
            }
            return false;
        }

        if (_iBallShot !== _iBallSide) {
            return   _oControllerMovement.moveCharacterToBall(CHARACTERS[_iBallSide], _oBall);
        } else {
            return false;
        }
    };

    this.checkDistanceCharacterToPos = function (oCharacter, oPos) {
        var fDistance = distanceV2({x: oCharacter.getPhysics().position.x, y: oCharacter.getPhysics().position.y}, oPos);
        if (fDistance < TO_POS_CHAR_DISTANCE_OFFSET) {

            if (oCharacter.getAnimType() !== IDLE) {
                oCharacter.runAnim(IDLE);
            }
            oCharacter.setSpeed(0);
            return true;//REACH THE POSITION;
        }
        return false;
    };

    this.characterShoot = function (bCanShoot) {
        if (!bCanShoot) {
            return;
        }

        if (_iBallSide === OPPONENT_SIDE && _iBallShot === PLAYER_SIDE) {
            switch (_oOpponent.getAnimType()) {
                case IDLE:
                case STANCE:
                case RUN:
                case RUN_REVERSE:
                case STRAFE_LEFT:
                case STRAFE_RIGHT:
                    this.runAnimation(_oOpponent, _oAI.shot);
            }
        } else if (_iBallSide === PLAYER_SIDE && _iBallShot === OPPONENT_SIDE) {
            switch (_oPlayer.getAnimType()) {
                case IDLE:
                case STANCE:
                case RUN:
                case RUN_REVERSE:
                case STRAFE_LEFT:
                case STRAFE_RIGHT:
                    this.runAnimation(_oPlayer, s_oGame.launchBall);
            }
        }
    };

    this.runAnimation = function (oChar, oCallFunc) {
        var oPosChar = oChar.getPhysics().position;

        var oPosBall = _oBall.getPhysics().position;

        if (oPosBall.z > VOLLEY_SHOOT_Z) {
            //    oChar.runAnim(VOLLEY);
        } else {
            if (_iBallSide === PLAYER_SIDE) {
                if (oPosBall.x > oPosChar.x) {
                    oChar.runAnim(BACKHAND);
                } else {
                    oChar.runAnim(FOREHAND);
                }
            } else {
                if (oPosBall.x > oPosChar.x) {
                    oChar.runAnim(FOREHAND);
                } else {
                    oChar.runAnim(BACKHAND);
                }
            }
        }
        oChar.setActionFunc(oCallFunc);
    };

    this.shotMouseDown = function () {
        if (_bMouseDown) {
            _iTimePressDown += s_iTimeElaps * 1.5;
            _oPowerBar.graphicsForceMask(_iTimePressDown);
        }
    };

    this._updatePlay = function () {
        _oScene.update();

        this._updateBall2DPosition();

        this.ballSide();

        this.shotMouseDown();

        this.characterShoot(this.charactersMovement());

        this.charactersPosition2D();

        this.animCharacters();

        this.swapChildrenIndex();
        this.cameraUpdate();
    };

    this.ballCollideNet = function () {
        if (!_bBallLaunched && !_bBallFieldTouch) {
            this.serviceAttempt();
            return;
        }
    };

    this.ballOut = function () {
        if (_bOut) {
            return;
        }

        if (_bBallFieldTouch) {
            if (_iBallShot === PLAYER_SIDE && _iBallSide === OPPONENT_SIDE) {
                this.pointTo(PLAYER_SIDE, false);
            } else if (_iBallShot === OPPONENT_SIDE && _iBallSide === PLAYER_SIDE) {
                this.pointTo(OPPONENT_SIDE, false);
            } else if (_iBallShot === PLAYER_SIDE && _iBallSide === PLAYER_SIDE) {
                this.pointTo(OPPONENT_SIDE, false);
            } else if (_iBallShot === OPPONENT_SIDE && _iBallSide === OPPONENT_SIDE) {
                this.pointTo(PLAYER_SIDE, false);
            }
        } else {
            if (_iBallShot === PLAYER_SIDE && _iBallSide === OPPONENT_SIDE) {
                this.pointTo(OPPONENT_SIDE, true);
            } else if (_iBallShot === OPPONENT_SIDE && _iBallSide === PLAYER_SIDE) {
                this.pointTo(PLAYER_SIDE, true);
            } else if (_iBallShot === PLAYER_SIDE && _iBallSide === PLAYER_SIDE) {
                this.pointTo(OPPONENT_SIDE, true);
            } else if (_iBallShot === OPPONENT_SIDE && _iBallSide === OPPONENT_SIDE) {
                this.pointTo(PLAYER_SIDE, true);
            }
            _oInterface.startAnimText(TEXT_OUT, "80px " + PRIMARY_FONT, TEXT_COLOR_0);
        }
    };

    this.refreshScoreBoard = function () {
        _oInterface.refreshScoreBoard(PLAYER_SIDE, POINT_TEXT, POINT[_iPlayerPoint]);                                                                                                                                                                       //iWho, iText, szText
        _oInterface.refreshScoreBoard(OPPONENT_SIDE, POINT_TEXT, POINT[_iOpponentPoint]);

        _oInterface.refreshScoreBoard(PLAYER_SIDE, SET_TEXT, _iPlayerSet);                                                                                                                                                                       //iWho, iText, szText
        _oInterface.refreshScoreBoard(OPPONENT_SIDE, SET_TEXT, _iOpponentSet);
    };

    this.resultSound = function (szPlaySound, bOut) {
        if (bOut) {
            var oAudio = playSound("out", 1, 0);
            oAudio.on("complete", function () {
                playSound(szPlaySound, 1, 0);
                oAudio.removeAllEventListeners();
            });
        } else {
            playSound(szPlaySound, 1, 0);
        }
    };

    this.pointTo = function (iWho, bOut) {
        if (iWho === OPPONENT_SIDE) {
            _iOpponentPoint++;
            _iScoreMatch += SCORES_TO_LOSE;
            this.resultSound("crowd_disappoint", bOut);
        } else {
            _iPlayerPoint++;
            _iScoreMatch += SCORES_TO_EARN;
            this.resultSound("crowd_applauses", bOut);
        }

        var iPointForSet = POINT.length;
        if (_iPlayerPoint < 3 || _iOpponentPoint < 3) {
            iPointForSet -= 1;
        }

        if (_iPlayerPoint === 4 && _iOpponentPoint === 4) {
            _iPlayerPoint = 3;
            _iOpponentPoint = 3;
        }
        var bSet = false;

        if (_iPlayerPoint === iPointForSet) {
            _iPlayerSet++;
            bSet = true;
        } else if (_iOpponentPoint === iPointForSet) {
            _iOpponentSet++;
            bSet = true;
        }

        if (bSet) {
            _iOpponentPoint = 0;
            _iPlayerPoint = 0;
            this.changeService();
        }

        this.refreshScoreBoard();
        _bOut = true;

        _oPlayer.runAnim(IDLE);
        _oOpponent.runAnim(IDLE);
        createjs.Tween.get(this).wait(MS_TIME_AFTER_BALL_OUT).call(function () {
            if (_iPlayerSet === SET_FOR_WIN) {
                this.gameOver(true);
            } else if (_iOpponentSet === SET_FOR_WIN) {
                this.gameOver(false);
            } else {
                this.resetScene();
            }
        });
    };

    this.gameOver = function (bPlayerWin) {
        var bEnd = false;


        if (_iScoreMatch < 0) {
            _iScoreMatch = 0;
        }
        if (bPlayerWin) {
            _iScore += _iScoreMatch;
            this.saveProgress();
            if (s_iLevel === OPPONENT_SPEED.length - 1) {
                bEnd = true;
            }
            _oAudioMatch = playSound("win_match", 1, 0);
        } else {
            _oAudioMatch = playSound("lose_match", 1, 0);
        }

        _iGameState = STATE_FINISH;

        _oOpponent.runAnim(IDLE);
        _oPlayer.runAnim(IDLE);

        _oAudioMatch.on("complete", function () {
            s_oGame.unloadAudioMatch();
            tweenVolume(s_oSoundtrack, 0.3, MS_TIME_FADE_VOL);
        });

        $(s_oMain).trigger("end_level", s_iLevel);

        _oInterface.createEndPanel(_iPlayerSet, _iOpponentSet, _iPlayerPoint, _iOpponentPoint, bPlayerWin, _iScoreMatch, s_iBestScore, bEnd);
    };

    this.saveProgress = function () {
        if (s_iLevelReached < s_iLevel + 2) {
            s_iLevelReached = s_iLevel + 2;
        }


        if (_iScoreMatch > s_aScores[s_iLevel]) {
            s_aScores[s_iLevel] = _iScore;
        }

        s_iBestScore = 0;
        for (var i = 0; i < s_aScores.length; i++) {
            s_iBestScore += s_aScores[i];
        }

        saveItem("tennis_levelreached", s_iLevelReached);
        saveItem("tennis_scores", JSON.stringify(s_aScores));
        saveItem("tennis_best_score", s_iBestScore);
    };

    this.changeService = function () {
        if (SERVICE_BY === OPPONENT_SIDE) {
            SERVICE_BY = PLAYER_SIDE;
        } else {
            SERVICE_BY = OPPONENT_SIDE;
        }
    };

    this.serviceAttempt = function () {
        if (_iServiceAttempt === MAX_SERVICE_ATTEMPT) {
            _iServiceAttempt = 0;
            if (SERVICE_BY === PLAYER_SIDE) {
                this.pointTo(OPPONENT_SIDE);
            } else {
                this.pointTo(PLAYER_SIDE);
            }
        } else {
            _iServiceAttempt++;
            _oInterface.startAnimText(TEXT_FAULT, "80px " + PRIMARY_FONT, TEXT_COLOR_0);
            createjs.Tween.get(this).wait(MS_TIME_AFTER_BALL_OUT).call(function () {
                this.resetScene();
            });

        }
    };

    this.ballFieldTouch = function () {
        if (_bOut) {
            return;
        }

        if (!_bBallLaunched) {
            this.serviceAttempt();
            _bBallFieldTouch = true;
            return;
        }

        if (!_bBallFieldTouch) {
            if (_iBallShot === PLAYER_SIDE && _iBallSide === PLAYER_SIDE) {
                this.pointTo(OPPONENT_SIDE);
            } else if (_iBallShot === OPPONENT_SIDE && _iBallSide === OPPONENT_SIDE) {
                this.pointTo(PLAYER_SIDE);
            }
            _bBallFieldTouch = true;
            return;
        }

        if (_iBallShot === PLAYER_SIDE && _iBallSide === OPPONENT_SIDE) {
            this.pointTo(PLAYER_SIDE);
        } else if (_iBallShot === OPPONENT_SIDE && _iBallSide === PLAYER_SIDE) {
            this.pointTo(OPPONENT_SIDE);
        }
        _oBall.getPhysics().position.z += 0.1;
    };

    this.cameraUpdate = function () {
        _oCamera.updateProjectionMatrix();
        _oCamera.updateMatrixWorld();
    };

    this._updateBall2DPosition = function () {
        this.refreshObjectPosition2D(_oBall, BALL_SCALE_FACTOR);
        _oBall.update();
    };

    this._updateInit = function () {
        _oScene.update();
        this._updateBall2DPosition();
        this.charactersPosition2D();
        _iGameState = STATE_PLAY;
    };

    this.update = function () {
        switch (_iGameState) {
            case STATE_INIT:
                this._updateInit();
                break;
            case STATE_PLAY:
                this._updatePlay();
                break;
            case STATE_FINISH:

                break;
            case STATE_PAUSE:

                break;
        }

        this.getPowerBar = function () {
            return _oPowerBar;
        };
    };

    s_oGame = this;

    ENABLE_FULLSCREEN = oData.fullscreen;
    SCORES_TO_EARN = oData.scores_to_earn;
    SCORES_TO_LOSE = oData.scores_to_lose;
    PLAYER_SPEED = oData.player_speed;
    PLAYER_ACCELERATION = oData.player_acceleration;
    OPPONENT_ACCELERATION = oData.opponent_acceleration;
    AI_RANGE_FORCE_X = oData.opponent_force_x_range;
    AI_RANGE_FORCE_Y = oData.opponent_force_y_range;
    AI_RANGE_Z = oData.opponent_force_z_range;
    AI_DISTANCE_Y_MULTIPLIER = oData.opponent_distance_y_multiplier;
    SET_FOR_WIN = oData.set_for_win;

    NUM_LEVEL_FOR_ADS = oData.ad_show_counter;

    s_iLevel = iLevel;

    _oParent = this;
    this._init();
}

var s_oGame;
var s_iServiceSide = LEFT_SERVICE;
var s_iLevel;
function CEndPanel(oSpriteBg, bPlayerWin, bEnd) {

    var _oBg;
    var _oNameTextPlayer;
    var _oNameTextOpponent;
    var _oTitleText;
    var _oSetText;
    var _oSetPlayerText;
    var _oSetOpponentText;
    var _oNewScoreText;
    var _oEarnedScoreText;
    var _oTitleTextShadow;
    var _oNameTextPlayerShadow;
    var _oNameTextOpponentShadow;
    var _oSetTextShadow;
    var _oSetPlayerTextShadow;
    var _oSetOpponentTextShadow;
    var _oNewScoreTextShadow;
    var _oEarnedScoreTextShadow;
    var _oGroup;
    var _oButMenu;
    var _oButAction = null;
    var _oFade;

    this._init = function (oSpriteBg, bPlayerWin, bEnd) {
        var iSizeFontSecondaryText = 34;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.0;
        _oFade.on("click", function () {});

        s_oStage.addChild(_oFade);

        _oGroup = new createjs.Container();
        _oGroup.alpha = 1;
        _oGroup.visible = false;
        _oGroup.y = CANVAS_HEIGHT;

        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;
        _oGroup.addChild(_oBg);

        _oTitleTextShadow = new createjs.Text("", "bold 50px " + PRIMARY_FONT, "#000");
        _oTitleTextShadow.x = CANVAS_WIDTH / 2 + 2;
        _oTitleTextShadow.y = CANVAS_HEIGHT_HALF - 208;
        _oTitleTextShadow.textAlign = "center";
        _oTitleTextShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oGroup.addChild(_oTitleTextShadow);

        _oTitleText = new createjs.Text("", "bold 50px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oTitleText.x = CANVAS_WIDTH / 2;
        _oTitleText.y = CANVAS_HEIGHT_HALF - 210;
        _oTitleText.textAlign = "center";

        _oGroup.addChild(_oTitleText);

        _oNameTextPlayerShadow = new createjs.Text("", "bold 34px " + PRIMARY_FONT, "#000");
        _oNameTextPlayerShadow.x = CANVAS_WIDTH / 2 - 178;
        _oNameTextPlayerShadow.y = (CANVAS_HEIGHT / 2) - 118;
        _oNameTextPlayerShadow.textAlign = "center";
        _oNameTextPlayerShadow.textBaseline = "middle";
        _oNameTextPlayerShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oGroup.addChild(_oNameTextPlayerShadow);

        _oNameTextPlayer = new createjs.Text("", "bold 34px " + PRIMARY_FONT, TEXT_COLOR_4);
        _oNameTextPlayer.x = CANVAS_WIDTH / 2 - 180;
        _oNameTextPlayer.y = (CANVAS_HEIGHT / 2) - 120;
        _oNameTextPlayer.textAlign = "center";
        _oNameTextPlayer.textBaseline = "middle";

        _oGroup.addChild(_oNameTextPlayer);

        _oNameTextOpponentShadow = new createjs.Text("", "bold 34px " + PRIMARY_FONT, "#000");
        _oNameTextOpponentShadow.x = CANVAS_WIDTH / 2 + 182;
        _oNameTextOpponentShadow.y = (CANVAS_HEIGHT / 2) - 118;
        _oNameTextOpponentShadow.textAlign = "center";
        _oNameTextOpponentShadow.textBaseline = "middle";
        _oNameTextOpponentShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oGroup.addChild(_oNameTextOpponentShadow);

        _oNameTextOpponent = new createjs.Text("", "bold 34px " + PRIMARY_FONT, TEXT_COLOR_4);
        _oNameTextOpponent.x = CANVAS_WIDTH / 2 + 180;
        _oNameTextOpponent.y = (CANVAS_HEIGHT / 2) - 120;
        _oNameTextOpponent.textAlign = "center";
        _oNameTextOpponent.textBaseline = "middle";

        _oGroup.addChild(_oNameTextOpponent);

        _oSetTextShadow = new createjs.Text("", iSizeFontSecondaryText + "px " + PRIMARY_FONT, "#000");
        _oSetTextShadow.x = CANVAS_WIDTH / 2 + 2;
        _oSetTextShadow.y = (CANVAS_HEIGHT / 2) - 83;
        _oSetTextShadow.textAlign = "center";
        _oSetTextShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oGroup.addChild(_oSetTextShadow);

        _oSetText = new createjs.Text("", iSizeFontSecondaryText + "px " + PRIMARY_FONT, TEXT_COLOR_4);
        _oSetText.x = CANVAS_WIDTH / 2;
        _oSetText.y = (CANVAS_HEIGHT / 2) - 85;
        _oSetText.textAlign = "center";

        _oGroup.addChild(_oSetText);

        _oSetPlayerTextShadow = new createjs.Text("", iSizeFontSecondaryText + "px " + PRIMARY_FONT, "#000");
        _oSetPlayerTextShadow.x = _oNameTextPlayer.x + 2;
        _oSetPlayerTextShadow.y = _oSetText.y + 2;
        _oSetPlayerTextShadow.textAlign = "center";
        _oSetPlayerTextShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oGroup.addChild(_oSetPlayerTextShadow);

        _oSetPlayerText = new createjs.Text("", iSizeFontSecondaryText + "px " + PRIMARY_FONT, TEXT_COLOR_4);
        _oSetPlayerText.x = _oNameTextPlayer.x;
        _oSetPlayerText.y = _oSetText.y;
        _oSetPlayerText.textAlign = "center";

        _oGroup.addChild(_oSetPlayerText);

        _oSetOpponentTextShadow = new createjs.Text("", iSizeFontSecondaryText + "px " + PRIMARY_FONT, "#000");
        _oSetOpponentTextShadow.x = _oNameTextOpponent.x + 2;
        _oSetOpponentTextShadow.y = _oSetText.y + 2;
        _oSetOpponentTextShadow.textAlign = "center";
        _oSetOpponentTextShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oGroup.addChild(_oSetOpponentTextShadow);

        _oSetOpponentText = new createjs.Text("", iSizeFontSecondaryText + "px " + PRIMARY_FONT, TEXT_COLOR_4);
        _oSetOpponentText.x = _oNameTextOpponent.x;
        _oSetOpponentText.y = _oSetText.y;
        _oSetOpponentText.textAlign = "center";

        _oGroup.addChild(_oSetOpponentText);

        _oEarnedScoreTextShadow = new createjs.Text("", "bold " + iSizeFontSecondaryText + "px " + PRIMARY_FONT, "#000");
        _oEarnedScoreTextShadow.x = CANVAS_WIDTH / 2 + 2;
        _oEarnedScoreTextShadow.y = (CANVAS_HEIGHT / 2) - 13;
        _oEarnedScoreTextShadow.textAlign = "center";
        _oEarnedScoreTextShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oGroup.addChild(_oEarnedScoreTextShadow);

        _oEarnedScoreText = new createjs.Text("", "bold " + iSizeFontSecondaryText + "px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oEarnedScoreText.x = CANVAS_WIDTH / 2;
        _oEarnedScoreText.y = (CANVAS_HEIGHT / 2) - 15;
        _oEarnedScoreText.textAlign = "center";

        _oGroup.addChild(_oEarnedScoreText);

        _oNewScoreTextShadow = new createjs.Text("", "bold " + iSizeFontSecondaryText + "px " + PRIMARY_FONT, "#000");
        _oNewScoreTextShadow.x = CANVAS_WIDTH / 2 + 2;
        _oNewScoreTextShadow.y = (CANVAS_HEIGHT / 2) + 57;
        _oNewScoreTextShadow.textAlign = "center";
        _oNewScoreTextShadow.alpha = TEXT_SHADOWN_ALPHA;

        _oGroup.addChild(_oNewScoreTextShadow);

        _oNewScoreText = new createjs.Text("", "bold " + iSizeFontSecondaryText + "px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oNewScoreText.x = CANVAS_WIDTH / 2;
        _oNewScoreText.y = (CANVAS_HEIGHT / 2) + 55;
        _oNewScoreText.textAlign = "center";

        _oGroup.addChild(_oNewScoreText);

        var oSpriteButHome = s_oSpriteLibrary.getSprite("but_home");
        _oButMenu = new CGfxButton(CANVAS_WIDTH * 0.5 - 220, CANVAS_HEIGHT * 0.5 + 150, oSpriteButHome, _oGroup);
        _oButMenu.addEventListener(ON_MOUSE_DOWN, this._onExit, this);

        var oSpriteButAction = s_oSpriteLibrary.getSprite("but_continue");
        var oCallFunc = this._onContinue;

        if (bPlayerWin === false) {
            oSpriteButAction = s_oSpriteLibrary.getSprite("but_restart");
            oCallFunc = this._onRestart;
        } else if (bEnd === true) {
            oCallFunc = this._onEnd;
        }

        _oButAction = new CGfxButton(CANVAS_WIDTH * 0.5 + 220, CANVAS_HEIGHT * 0.5 + 150, oSpriteButAction, _oGroup);
        _oButAction.addEventListener(ON_MOUSE_DOWN, oCallFunc, this);
        _oButAction.pulseAnimation();

        s_oStage.addChild(_oGroup);
    };

    this.unload = function () {
        createjs.Tween.get(_oGroup).to({y: CANVAS_HEIGHT}, 750, createjs.Ease.quartIn).call(function () {
            s_oStage.removeChild(_oGroup);
            if (_oButMenu) {
                _oButMenu.unload();
                _oButMenu = null;
            }

            if (_oButAction) {
                _oButAction.unload();
                _oButAction = null;
            }
        });

        createjs.Tween.get(_oFade).to({alpha: 0}, 400, createjs.Ease.cubicOut).call(function () {
            s_oStage.removeChild(_oFade);
            _oFade.removeAllEventListeners();
        });

        _oButAction.setClickable(false);
        _oButMenu.setClickable(false);
    };

    this.show = function (iPlayerSet, iOpponentSet, iPlayerPoint, iOpponentPoint, iScore, iTotScore, bWin) {

        _oTitleText.text = TEXT_WIN;

        if (!bWin) {
            _oTitleText.text = TEXT_LOSE;
        }
        _oTitleTextShadow.text = _oTitleText.text;

        _oNameTextPlayer.text = TEXT_CHARACTERS_NAMES[PLAYER_SIDE];
        _oNameTextOpponent.text = TEXT_CHARACTERS_NAMES[OPPONENT_SIDE];

        _oNameTextPlayerShadow.text = TEXT_CHARACTERS_NAMES[PLAYER_SIDE];
        _oNameTextOpponentShadow.text = TEXT_CHARACTERS_NAMES[OPPONENT_SIDE];

        _oSetText.text = TEXT_SET;
        _oSetTextShadow.text = _oSetText.text;

        _oSetPlayerText.text = iPlayerSet;
        _oSetOpponentText.text = iOpponentSet;
        _oSetPlayerTextShadow.text = iPlayerSet;
        _oSetOpponentTextShadow.text = iOpponentSet;

        _oEarnedScoreText.text = TEXT_SCORE_MATCH + ": " + iScore;
        _oEarnedScoreTextShadow.text = _oEarnedScoreText.text;

        _oNewScoreText.text = TEXT_TOTAL_SCORE + ": " + iTotScore;
        _oNewScoreTextShadow.text = _oNewScoreText.text;

        _oGroup.visible = true;

        createjs.Tween.get(_oFade).to({alpha: 0.5}, 500, createjs.Ease.cubicOut);

        createjs.Tween.get(_oGroup).wait(250).to({y: 0}, 1250, createjs.Ease.bounceOut).call(function () {
            if (s_iAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_iAdsLevel = 1;
            } else {
                s_iAdsLevel++;
            }
        });

        $(s_oMain).trigger("save_score", iTotScore);
        $(s_oMain).trigger("share_event", iTotScore);
    };

    this._onContinue = function () {
        this.unload();
        s_oGame.onContinue();
    };

    this._onRestart = function () {
        this.unload();

        s_oGame.restartGame();
    }

    this._onEnd = function () {
        this.unload();
        s_oGame.onExit();
    };

    this._onExit = function () {
        this.unload();


        s_oGame.onExit();
    };

    this._init(oSpriteBg, bPlayerWin, bEnd);

    return this;
}

function CControllerMovement() {

    var _vCharPos = new CVector2(0, 0);
    var _vCharToPos = new CVector2(0, 0);
    var _vBallPos = new CVector2(0, 0);
    var _vPos = new CVector2(0, 0);
    var _oAnimatorPlayer = new CAnimCharacter(ANIMATION_PLAYER_SET);
    var _aAnimatorOpponent = new CAnimCharacter(ANIMATION_OPPONENT_SET);

    this.moveCharacterToBall = function (oCharacter, oBall) {
        _vCharPos.set(oCharacter.getPhysics().position.x, oCharacter.getPhysics().position.y);
        _vBallPos.set(oBall.getPhysics().position.x, oBall.getPhysics().position.y);

        var fDistance = distanceV2(oCharacter.getPos(), oBall.getPos());
        if (fDistance < MIN_DISTANCE_MOVE_TO_BALL || oCharacter.getAnimType() === FOREHAND || oCharacter.getAnimType() === BACKHAND) {
            oCharacter.setSpeed(0);

            return true;//REACH THE BALL?
        }

        var oDir = {x: 1, y: 1};
//

        if (_vCharPos.getX() > _vBallPos.getX()) {
            oDir.x = -1;
        }

        if (_vCharPos.getY() > _vBallPos.getY()) {
            oDir.y = -1;
        }

        var fRadiants = _vCharPos.angleBetweenVectors(_vBallPos);

        var vDir = new CVector2(Math.sin(fRadiants + OFFSET_RADIANTS_90) * oDir.x, Math.cos(fRadiants) * oDir.y);

        this.speed(oCharacter);

        var fDistanceX = Math.abs(_vCharPos.getX() - _vBallPos.getX());
        if (fDistanceX > TO_BALL_CHAR_DISTANCE_OFFSET) {
            oCharacter.getPhysics().position.x += oCharacter.getSpeed() * vDir.getX();
        }
        var fDistanceY = Math.abs(_vCharPos.getY() - _vBallPos.getY());
        if (fDistanceY > TO_BALL_CHAR_DISTANCE_OFFSET) {
            oCharacter.getPhysics().position.y += oCharacter.getSpeed() * vDir.getY();
        }
        var vDirAnim = new CVector2(Math.sin(fRadiants) * oDir.x, Math.cos(fRadiants) * oDir.y);

        if (oCharacter.whoIs() === PLAYER_SIDE) {
            _oAnimatorPlayer.animation(vDirAnim, oCharacter);
        } else {
            _aAnimatorOpponent.animation(vDirAnim, oCharacter);
        }

        return false;//REACH THE BALL?
    };

    this.moveCharacterToPos = function (oCharacter, oPos) {
        _vCharToPos.set(oCharacter.getPhysics().position.x, oCharacter.getPhysics().position.y);
        _vPos.set(oPos.x, oPos.y);

        var fRadiants = _vPos.angleBetweenVectors(_vCharToPos);

        var oDir = {x: 1, y: 1};

        if (_vCharToPos.getX() > _vPos.getX()) {
            oDir.x *= -1;
        }

        if (_vCharToPos.getY() > _vPos.getY()) {
            oDir.y *= -1;
        }

        this.speed(oCharacter);

        var vDir = new CVector2(Math.sin(fRadiants + OFFSET_RADIANTS_90) * oDir.x, Math.cos(fRadiants) * oDir.y);

        var fDistanceX = Math.abs(_vCharToPos.getX() - _vPos.getX());
        if (fDistanceX > TO_POS_CHAR_DISTANCE_OFFSET_AXIS) {
            oCharacter.getPhysics().position.x += oCharacter.getSpeed() * vDir.getX();
        } else {
            oDir.x = 0;
        }

        var fDistanceY = Math.abs(_vCharToPos.getY() - _vPos.getY());
        if (fDistanceY > TO_POS_CHAR_DISTANCE_OFFSET_AXIS) {
            oCharacter.getPhysics().position.y += oCharacter.getSpeed() * vDir.getY();
        } else {
            oDir.y = 0;
        }

        var vDirAnim = new CVector2(Math.cos(fRadiants + OFFSET_RADIANTS_90) * oDir.x, Math.sin(fRadiants) * oDir.y);

        if (oCharacter.whoIs() === PLAYER_SIDE) {
            _oAnimatorPlayer.animation(vDirAnim, oCharacter);
        } else {
            _aAnimatorOpponent.animation(vDirAnim, oCharacter);
        }

        return false;
    };

    this.speed = function (oCharacter) {
        var fSpeed = oCharacter.getSpeed();

        fSpeed += oCharacter.getAcceleration();

        if (fSpeed > oCharacter.getMaxSpeed()) {
            fSpeed = oCharacter.getMaxSpeed();
        }

        oCharacter.setSpeed(fSpeed);
    };

    return this;
}
function CConfirmPanel(szText, oParentContainer) {

    var _iTextY = -100;
    var _iButtonY = 90;

    var _oParent = this;

    var _aCbCompleted = new Array();
    var _aCbOwner = new Array();
    var _aParams = new Array();

    var _oBg;
    var _oContainer;
    var _oContainerPos = {x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2};

    var _szText = szText;
    var _oMsgText;
    var _oMsgTextShadow;

    var _oShape;

    var _oButNo;
    var _oButYes;

    var _oParentContainer = oParentContainer;

    this._init = function () {
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');

        _oContainer = new createjs.Container();
        _oContainer.x = _oContainerPos.x;
        _oContainer.y = -oSpriteBg.height;

        _oShape = new createjs.Shape();
        _oShape.graphics.beginFill("#000000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oShape.alpha = 0.0;
        _oShape.on("mousedown", this._onClick);
        _oParentContainer.addChild(_oShape);

        _oBg = createBitmap(oSpriteBg);
        _oBg.regX = oSpriteBg.width / 2;
        _oBg.regY = oSpriteBg.height / 2;
        _oContainer.addChild(_oBg);

        _oMsgTextShadow = new createjs.Text(_szText, " 32px " + PRIMARY_FONT, "#000");
        _oMsgTextShadow.x = 2;
        _oMsgTextShadow.y = _iTextY + 2;
        _oMsgTextShadow.textAlign = "center";
        _oMsgTextShadow.textBaseline = "alphabetic";
        _oMsgTextShadow.lineWidth = 400;
        _oMsgTextShadow.alpha = TEXT_SHADOWN_ALPHA;
        _oContainer.addChild(_oMsgTextShadow);

        _oMsgText = new createjs.Text(_szText, " 32px " + PRIMARY_FONT, TEXT_COLOR_0);
        _oMsgText.y = _iTextY;
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 400;
        _oContainer.addChild(_oMsgText);

        _oButNo = new CGfxButton(-140, _iButtonY, s_oSpriteLibrary.getSprite('but_exit_big'), _oContainer);
        _oButNo.pulseAnimation();

        _oButYes = new CGfxButton(140, _iButtonY, s_oSpriteLibrary.getSprite('but_yes_big'), _oContainer);

        _oParentContainer.addChild(_oContainer);

        this.show();
    };

    this._initListener = function () {
        _oButNo.addEventListener(ON_MOUSE_DOWN, this.buttonNoDown, this);
        _oButYes.addEventListener(ON_MOUSE_DOWN, this.buttonYesDown, this);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.buttonNoDown = function () {

        if (_aCbCompleted[ON_BUT_NO_DOWN]) {
            _aCbCompleted[ON_BUT_NO_DOWN].call(_aCbOwner[ON_BUT_NO_DOWN], _aParams);
        }
    };

    this.buttonYesDown = function () {

        if (_aCbCompleted[ON_BUT_YES_DOWN]) {
            _aCbCompleted[ON_BUT_YES_DOWN].call(_aCbOwner[ON_BUT_YES_DOWN], _aParams);
        }
    };

    this._onClick = function () {

    };

    this.show = function () {
        createjs.Tween.get(_oShape).to({alpha: 0.7}, 500);

        createjs.Tween.get(_oContainer).to({y: _oContainerPos.y}, 500, createjs.Ease.quadOut).call(function () {
            _oParent._initListener();
        });
    };

    this.unload = function () {
        createjs.Tween.get(_oContainer).to({y: CANVAS_HEIGHT * 1.5}, 500).call(function () {
            _oParentContainer.removeChild(_oContainer);
        });

        createjs.Tween.get(_oShape).to({alpha: 0}, 500).call(function () {
            _oShape.removeAllEventListeners();
            _oParentContainer.removeChild(_oShape);
        });

    };

    this._init();

    return this;
}

function CCharacter(iXPos, iYPos, iScaleMult, iStartAnim, aOffsetAnim, aSpriteAnimNames, aAnimation, aSubAnimation, oPhysics, iWho, oParentContainer) {
    var _oContainer;
    var _aAnimation;
    var _aStateAnim;
    var _oParentContainer;
    var _oPhysics = oPhysics;
    var _oActionFunc = null;
    var _iAnimType = iStartAnim;
    var _iWho = iWho;
    var _fSpeed = 0;
    var _fMaxSpeed;
    var _fAcceleration = 0;
    var _fScale = FOV * iScaleMult;
    var _bCastShadown = false;

    this._init = function (iXPos, iYPos, aOffsetAnim, aSpriteAnimNames, aAnimation, aSubAnimation, oParentContainer) {

        _oParentContainer = oParentContainer;

        _oContainer = new createjs.Container();
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
        _oParentContainer.addChild(_oContainer);
        //   _oContainer.tickChildren = false;

        _aStateAnim = new Array();
        _aAnimation = new Array();

        for (var i = 0; i < aSpriteAnimNames.length; i++) {
            _aAnimation.push(this.loadAnim(aSpriteAnimNames[i], aSubAnimation[i], aAnimation[i], _oContainer));
            _aAnimation[i].x = aOffsetAnim[i].x;
            _aAnimation[i].y = aOffsetAnim[i].y;
            _aAnimation[i].visible = false;
            _oContainer.addChild(_aAnimation[i]);
            _aStateAnim[i] = false;
        }

        var oReverseRun = this.loadAnim(aSpriteAnimNames[RUN], aSubAnimation[RUN], aAnimation[RUN_REVERSE], _oContainer);
        _aAnimation.push(oReverseRun);
        oReverseRun.x = aOffsetAnim[RUN].x;
        oReverseRun.y = aOffsetAnim[RUN].y;
        oReverseRun.visible = false;
        _oContainer.addChild(oReverseRun);
        _aStateAnim.push(false);

        var oSprite = s_oSpriteLibrary.getSprite(aSpriteAnimNames[IDLE]);
        //_oContainer.regX = (oSprite.width * 0.5) / aSubAnimation[IDLE].w;
        _oContainer.regY = -(oSprite.height * 0.5) / aSubAnimation[IDLE].h;

        //    _oContainer.cache(0, 0, oSprite.width, oSprite.height);

        _aAnimation[_iAnimType].visible = true;
        _aStateAnim[_iAnimType] = true;
        
         _aAnimation[BACKHAND].visible = true;
        _aStateAnim[BACKHAND] = true;
    };

    this.getAnimType = function () {
        return _iAnimType;
    };

    this.getPos = function () {
        return {x: _oContainer.x, y: _oContainer.y};
    };

    this.loadAnim = function (szSprite, aSubAnimation, aAnimation, oContainer) {
        var oSprite = s_oSpriteLibrary.getSprite(szSprite);
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / aSubAnimation.w, height: oSprite.height / aSubAnimation.h, regX: (oSprite.width / 2) / aSubAnimation.w, regY: oSprite.height / aSubAnimation.h},
            animations: aAnimation
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        var oAnim = createSprite(oSpriteSheet, "start", (oSprite.width / 2) / aSubAnimation.w, oSprite.height / aSubAnimation.h, oSprite.width / aSubAnimation.w, oSprite.height / aSubAnimation.h);
        oAnim.stop();
        oContainer.addChild(oAnim);

        return oAnim;
    };

    this.pauseAnim = function (bVal) {
        if (bVal) {
            _aAnimation[_iAnimType].stop();
        } else {
            _aAnimation[_iAnimType].play();
        }
    };

    this.getX = function () {
        return _oContainer.x;
    };

    this.getY = function () {
        return _oContainer.y;
    };

    this.castShadown = function () {
        return _bCastShadown;
    };

    this.disableAllAnim = function () {
        for (var i = 0; i < _aAnimation.length; i++) {
            _aAnimation[i].visible = false;
            _aAnimation[i].stop();
        }
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setAcceleration = function (fVal) {
        _fAcceleration = fVal;
    };

    this.getAcceleration = function () {
        return _fAcceleration;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oContainer.x = iXPos;
        _oContainer.y = iYPos;
    };

    this.setVisible = function (bVal) {
        _oContainer.visible = bVal;
    };

    this.whoIs = function () {
        return _iWho;
    };

    this.mirror = function () {
        _oContainer.scaleX *= -1;
    };

    this.setScale = function (fScale) {
        _fScale = _oContainer.scaleX = _oContainer.scaleY = fScale;
    };

    this.scale = function (fValue) {
        _oContainer.scaleX = -fValue;
        _oContainer.scaleY = fValue;
    };

    this.getStartScale = function () {
        return _fScale;
    };

    this.fadeAnimation = function (fVal) {
        createjs.Tween.get(_oContainer, {override: true}).to({alpha: fVal}, 500);
    };

    this.setAlpha = function (fVal) {
        _oContainer.alpha = fVal;
    };

    this.getObject = function () {
        return _oContainer;
    };

    this.getFrame = function () {
        return _aAnimation[_iAnimType].currentFrame;
    };

    this.getDepthPos = function () {
        return _oPhysics.position.y;
    };

    this.runAnimCharacter = function () {
        var iEndFrame = _aAnimation[_iAnimType].spriteSheet._data.end.frames[0];
        if (this.getFrame() >= iEndFrame) {
            return false;
        } else {
            return true;
        }
    };

    this.setMaxSpeed = function (fVal) {
        _fMaxSpeed = fVal;
    };

    this.getMaxSpeed = function () {
        return _fMaxSpeed;
    };

    this.setSpeed = function (fVal) {
        _fSpeed = fVal;
    };

    this.getSpeed = function () {
        return _fSpeed;
    };

    this.getStateAnim = function () {
        return _aStateAnim[_iAnimType];
    };

    this.startAnimation = function (iType, bVal) {
        _aAnimation[iType].visible = bVal;
        _aAnimation[iType].gotoAndPlay("start");
    };

    this.runAnim = function (iVal) {
        this.disableAllAnim();
        this.startAnimation(iVal, true);
        _aStateAnim[iVal] = true;
        _iAnimType = iVal;
    };

    this.setActionFunc = function (oFunc) {
        _oActionFunc = oFunc;
    };

    this.animWithEnd = function (iNextAnim, iActionFrame) {
        _aStateAnim[_iAnimType] = this.update();
        if (this.getFrame() === iActionFrame) {
            if (_oActionFunc !== null) {
                _oActionFunc();
                _oActionFunc = null;
            }
        }
        if (!_aStateAnim[_iAnimType]) {
            this.runAnim(iNextAnim);
        }
    };

    this.update = function () {
        return this.runAnimCharacter();
    };

    this._init(iXPos, iYPos, aOffsetAnim, aSpriteAnimNames, aAnimation, aSubAnimation, oParentContainer);

    return this;
}


var BALL_TRAJ_INSTANCE = 30;
var MS_TIME_FADE_BALL_TRAJ = 800;
var MS_SPAWN_TIME_BALL_TRAJECTORY = 1;
function CBallTrajectory(oParentContainer) {

    var _iBuffer = MS_SPAWN_TIME_BALL_TRAJECTORY;
    var _oParentContainer = oParentContainer;
    var _oContainer;

    var _aTraj;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        _aTraj = new Array();
        for (var i = 0; i < BALL_TRAJ_INSTANCE; i++) {
            _aTraj.push(this.createBallTrajectory({x: 0, y: 0}));
        }
    };

    this.createBallTrajectory = function (oPos) {
        var oSpriteTraj = s_oSpriteLibrary.getSprite("ball_trajectory");
        var oSprite = createBitmap(oSpriteTraj);
        oSprite.x = oPos.x;
        oSprite.y = oPos.y;
        oSprite.regX = oSpriteTraj.width * 0.5;
        oSprite.regY = oSpriteTraj.height * 0.5;
        oSprite.visible = false;

        _oContainer.addChild(oSprite);

        return oSprite;
    };

    this.chooseATraj = function (oPos) {
        for (var i = 0; i < _aTraj.length; i++) {
            if (!_aTraj[i].visible) {
                this.setTrajectory(i, oPos);
                return;
            }
        }
        var iAlphaMin = 1;
        var iID = 0;
        for (var i = 0; i < _aTraj.length; i++) {
            if (_aTraj[i].alpha < iAlphaMin) {
                iAlphaMin = _aTraj[i].alpha;
                iID = i;
            }
        }
        this.setTrajectory(iID, oPos);
    };

    this.setTrajectory = function (iID, oPos) {
        _aTraj[iID].x = oPos.x;
        _aTraj[iID].y = oPos.y;
        _aTraj[iID].visible = true;
        _aTraj[iID].alpha = 1;
        createjs.Tween.get(_aTraj[iID], {override: true}).to({alpha: 0, scaleX: 0, scaleY: 0}, MS_TIME_FADE_BALL_TRAJ).set({visible: false, scaleX: 1, scaleY: 1});
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oContainer);
        return null;
    };

    this.update = function (oPos) {
        if (_iBuffer < 0) {
            this.chooseATraj(oPos);
            _iBuffer = MS_SPAWN_TIME_BALL_TRAJECTORY;
        } else {
            _iBuffer -= s_iTimeElaps;
        }
    };


    this._init();
    return this;
}


function CBall(iXPos, iYPos, oSprite, oPhysics, oParentContainer) {

    var _oBall;
    var _oBallTrajectory;
    var _oParentContainer;
    var _oPhysics;
    var _oShadow;
    var _oContainer;
    var _fStartShadowPos = null;
    var _fScale = (FOV * BALL_RADIUS) - 284;
    var _fScaleShadow = _fScale;
    var _oTween = null;
    var _bCastShadown = true;

    this._init = function (iXPos, iYPos, oSprite) {
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        _oBall = createBitmap(oSprite);
        _oBall.x = iXPos;
        _oBall.y = iYPos;
        _oBall.regX = oSprite.width * 0.5;
        _oBall.regY = oSprite.height * 0.5;

        var oSpriteShadow = s_oSpriteLibrary.getSprite("ball_shadow");
        _oShadow = createBitmap(oSpriteShadow);
        _oShadow.x = iXPos;
        _oShadow.y = iYPos;
        _oShadow.regX = oSpriteShadow.width * 0.5;
        _oShadow.regY = oSpriteShadow.height * 0.5;

        this.scaleShadow(_fScaleShadow);

        _oBallTrajectory = new CBallTrajectory(_oContainer);

        _oContainer.addChild(_oShadow, _oBall);
    };

    this.castShadown = function () {
        return _bCastShadown;
    };

    this.unload = function () {
        _oBall.removeAllEventListeners();
        _oParentContainer.removeChild(_oBall);
    };

    this.setVisible = function (bVisible) {
        _oContainer.visible = bVisible;
    };

    this.getStartScale = function () {
        return _fScale;
    };

    this.startPosShadowY = function (fYPos) {
        _fStartShadowPos = fYPos;
    };

    this.getStartShadowYPos = function () {
        return _fStartShadowPos;
    };

    this.fadeAnimation = function (fVal, iTime, iWait) {
        this.tweenFade(fVal, iTime, iWait);
    };

    this.tweenFade = function (fVal, iTime, iWait) {
        _oTween = createjs.Tween.get(_oContainer, {override: true}).wait(iWait).to({alpha: fVal}, iTime).call(function () {
            _oTween = null;
        });
    };

    this.getPos = function () {
        return {x: _oBall.x, y: _oBall.y};
    };

    this.setPositionShadow = function (iX, iY) {
        _oShadow.x = iX;
        _oShadow.y = iY;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oBall.x = iXPos;
        _oBall.y = iYPos;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setAngle = function (iAngle) {
        _oBall.rotation = iAngle;
    };

    this.getX = function () {
        return _oBall.x;
    };

    this.getY = function () {
        return _oBall.y;
    };

    this.getStartScale = function () {
        return _fScale;
    };

    this.scale = function (fValue) {
        _oBall.scaleX = fValue;
        _oBall.scaleY = fValue;
    };

    this.scaleShadow = function (fScale) {
        if (fScale > 0.08) {
            _oShadow.scaleX = fScale;
            _oShadow.scaleY = fScale;
        } else {
            _oShadow.scaleX = 0.08;
            _oShadow.scaleY = 0.08;
        }
    };

    this.setAlphaByHeight = function (fHeight) {
        _oShadow.alpha = fHeight;
    };

    this.getScale = function () {
        return _oBall.scaleX;
    };

    this.getObject = function () {
        return _oContainer;
    };

    this.getDepthPos = function () {
        return _oPhysics.position.y;
    };

    this.update = function () {

        if (Math.abs(_oPhysics.velocity.x) > MIN_VELOCITY_SPAWN_TRAJECTORY || Math.abs(_oPhysics.velocity.y) > MIN_VELOCITY_SPAWN_TRAJECTORY
                || Math.abs(_oPhysics.velocity.z) > MIN_VELOCITY_SPAWN_TRAJECTORY) {
            _oBallTrajectory.update(this.getPos());
        }
    };

    _oPhysics = oPhysics;
    _oParentContainer = oParentContainer;

    this._init(iXPos, iYPos, oSprite);

    return this;
}

function CAreYouSurePanel(oFunction) {

    var _oButYes;
    var _oButNo;
    var _oFade;
    var _oPanelContainer;
    var _oParent;

    var _pStartPanelPos;

    this._init = function () {
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oFade.on("mousedown", function () {});
        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade, {ignoreGlobalPause: true}).to({alpha: 0.7}, 500);

        _oPanelContainer = new createjs.Container();
        s_oStage.addChild(_oPanelContainer);

        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);
        oPanel.regX = oSprite.width / 2;
        oPanel.regY = oSprite.height / 2;
        _oPanelContainer.addChild(oPanel);

        _oPanelContainer.x = CANVAS_WIDTH / 2;
        _oPanelContainer.y = CANVAS_HEIGHT + oSprite.height / 2;
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};
        createjs.Tween.get(_oPanelContainer, {ignoreGlobalPause: true}).to({y: CANVAS_HEIGHT / 2 - 40}, 500, createjs.Ease.backOut);

        var oTitleShadow = new createjs.Text(TEXT_ARE_SURE, "34px " + PRIMARY_FONT, "#000");
        oTitleShadow.x = 2;
        oTitleShadow.y = -oSprite.height / 2 + 52;
        oTitleShadow.textAlign = "center";
        oTitleShadow.textBaseline = "middle";
        oTitleShadow.lineWidth = 400;
        oTitleShadow.alpha = TEXT_SHADOWN_ALPHA;
        _oPanelContainer.addChild(oTitleShadow);

        var oTitle = new createjs.Text(TEXT_ARE_SURE, "34px " + PRIMARY_FONT, TEXT_COLOR_0);
        oTitle.y = -oSprite.height / 2 + 50;
        oTitle.textAlign = "center";
        oTitle.textBaseline = "middle";
        oTitle.lineWidth = 400;
        _oPanelContainer.addChild(oTitle);

        _oButYes = new CGfxButton(140, 90, s_oSpriteLibrary.getSprite('but_yes_big'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(-140, 90, s_oSpriteLibrary.getSprite('but_exit_big'), _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        _oButNo.pulseAnimation();
    };

    this._onButYes = function () {
        _oButNo.setClickable(false);
        _oButYes.setClickable(false);

        createjs.Tween.get(_oFade, {ignoreGlobalPause: true}).to({alpha: 0}, 500);
        createjs.Tween.get(_oPanelContainer, {ignoreGlobalPause: true}).to({y: _pStartPanelPos.y}, 400, createjs.Ease.backIn).call(function () {

            _oParent.unload();
            oFunction();
            s_oGame.pause(false);
        });
    };

    this._onButNo = function () {
        _oButNo.setClickable(false);
        _oButYes.setClickable(false);

        createjs.Tween.get(_oFade, {ignoreGlobalPause: true}).to({alpha: 0}, 500);
        createjs.Tween.get(_oPanelContainer, {ignoreGlobalPause: true}).to({y: _pStartPanelPos.y}, 400, createjs.Ease.backIn).call(function () {
            _oParent.unload();
            s_oGame.pause(false);
        });


    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();

        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oPanelContainer);

        _oFade.off("mousedown", function () {});
    };

    _oParent = this;
    this._init(oFunction);
}


function CAnimText(oParentContainer) {

    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _oText;
    var _oTextBounds;

    this._init = function () {
        _oContainer = new createjs.Container();

        _oText = new createjs.Text(null, 28 + "px " + PRIMARY_FONT, "#fff");
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oContainer.addChild(_oText);

        _oContainer.x = CANVAS_WIDTH_HALF;
        _oContainer.y = -28;
        _oContainer.visible = false;

        _oParentContainer.addChild(_oContainer);
    };

    this.setText = function (szText, szFont, szColor) {
        _oText.text = szText;
        _oText.color = szColor;
        _oText.font = szFont;
        _oTextBounds = _oText.getBounds();
    };

    this.animText = function () {
        _oContainer.visible = true;
        createjs.Tween.get(_oContainer).to({y: CANVAS_HEIGHT_HALF}, 500, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(_oContainer).wait(250).to({y: CANVAS_HEIGHT + _oTextBounds.height}, 500, createjs.Ease.cubicIn).set({visible: false, y: -_oTextBounds.height});
        });
    };

    this._init();

    return this;
}


function CAnimCharacter(oAnim) {

    var _oAnimation = oAnim;


    this.animation = function (vDirAnim, oCharacter) {

        if (this.notChangeAnim(oCharacter)) {
            return;
        }
        if (Math.abs(vDirAnim.getX()) > Math.abs(vDirAnim.getY())) {
            if (vDirAnim.getX() > 0) {
                if (oCharacter.getAnimType() !== _oAnimation.a) {
                    oCharacter.runAnim(_oAnimation.a);
                }
            } else {
                if (oCharacter.getAnimType() !== _oAnimation.b) {
                    oCharacter.runAnim(_oAnimation.b);
                }
            }

        } else {
            if (vDirAnim.getY() > 0) {
                if (oCharacter.getAnimType() !== _oAnimation.c) {
                    oCharacter.runAnim(_oAnimation.c);
                }
            } else {
                if (oCharacter.getAnimType() !== _oAnimation.d) {
                    oCharacter.runAnim(_oAnimation.d);
                }
            }
        }
    };

    this.notChangeAnim = function (oCharacter) {
        switch (oCharacter.getAnimType()) {
            case  _oAnimation.a:
            case _oAnimation.b:
            case _oAnimation.c:
            case  _oAnimation.d:
                return oCharacter.runAnimCharacter();
                break;
        }
        return false;
    };

    return this;
}
function CAI(oOpponent) {
    var _oOpponent = oOpponent;
    var _oPlayerPos;
    var _oOpponentPos;

    var _vImpulse;

    this._init = function () {
        _oPlayerPos = new CVector2(0, 0);
        _oOpponentPos = new CVector2(0, 0);
        _vImpulse = new CVector2(0, 0);
    };

    this.serve = function () {
        _oPlayerPos.set(CHARACTERS[PLAYER_SIDE].getPos().x, CHARACTERS[PLAYER_SIDE].getPos().y);
        _oOpponentPos.set(_oOpponent.getPos().x, _oOpponent.getPos().y);

        var fRadiants = _oOpponentPos.angleBetweenVectors(_oPlayerPos);

        _vImpulse.set(Math.sin(fRadiants), Math.cos(fRadiants));

        _vImpulse.scalarProduct(distanceV2(_oOpponent.getPos(), CHARACTERS[PLAYER_SIDE].getPos()));

        var fXRandom = randomFloatBetween(0, AI_SERVICE_X_RANDOM, 2);
        var fYRandom = randomFloatBetween(0, AI_SERVICE_Y_RANDOM, 2);

        var oDir = {x: -_vImpulse.getX() * (FORCE_SERVICE_AXIS_OPPONENT.x + fXRandom), y: -_vImpulse.getY() * (FORCE_SERVICE_AXIS_OPPONENT.y + fYRandom),
            z: _vImpulse.getY() * FORCE_SERVICE_AXIS_OPPONENT.z};

        s_oGame.addImpulseToBall(oDir);

        s_oGame.ballShotBy(OPPONENT_SIDE);
        s_oGame.calculateVelocityService(oDir);
        playSound("hit_ball", 0.5, 0);
    };

    this.shot = function () {
        var fDistance = distanceV2(_oOpponent.getPos(), BALL.getPos());

        if (fDistance > MIN_DISTANCE_FOR_SHOT_BALL) {
            return;
        }

        _oPlayerPos.set(CHARACTERS[PLAYER_SIDE].getPos().x, CHARACTERS[PLAYER_SIDE].getPos().y);
        _oOpponentPos.set(_oOpponent.getPos().x, _oOpponent.getPos().y);

        var fZ;
        
        var fDistNet = AI_Y_POINT - (AI_Y_POINT - _oOpponent.getPhysics().position.y);

        var iCase = 1;

        fZ = fDistNet * 0.25;
        iCase = randomFloatBetween(0, 1, 0);
        
        if (fZ > AI_RANGE_Z[s_iLevel].max) {
            fZ = AI_RANGE_Z[s_iLevel].max;
        } else if (fZ < AI_RANGE_Z[s_iLevel].min) {
            fZ = AI_RANGE_Z[s_iLevel].min;
        }

        var fDistBallFieldZ = (OFFSET_Z_AI_HEIGHT - BALL.getPhysics().position.z);

        fZ += fDistBallFieldZ;

        var fDistRand = randomFloatBetween(AI_DISTANCE_Y_MULTIPLIER[s_iLevel].min, AI_DISTANCE_Y_MULTIPLIER[s_iLevel].max, 2);

        switch (iCase) {
            case 0:
                var iDir = 1;
                if (_oPlayerPos.getX() < _oOpponentPos.getX()) {
                    iDir *= -1;
                }
                var fRadiants = _oPlayerPos.angleBetweenVectors(_oOpponentPos);
                _vImpulse.set(Math.sin(fRadiants) * iDir, Math.cos(fRadiants));

                var fRandX = ((Math.random() * AI_RANGE_FORCE_X[s_iLevel]) - AI_RANGE_FORCE_X[s_iLevel]) + AI_RANGE_FORCE_X[s_iLevel];
                var fRandY = ((Math.random() * AI_RANGE_FORCE_Y[s_iLevel]) - AI_RANGE_FORCE_Y[s_iLevel]) + AI_RANGE_FORCE_Y[s_iLevel];

                _vImpulse.scalarProduct(distanceV2({x: CHARACTERS[PLAYER_SIDE].getPos().x, y: (CHARACTERS[PLAYER_SIDE].getPos().y + (AI_RANGE_Z[s_iLevel].max - fZ)) * fDistRand}, _oOpponent.getPos()));

                _vImpulse.set((_vImpulse.getX() + fRandX) * 0.25, -_vImpulse.getY() - fRandY);
                break;

            case 1:
                //     var iDir = -0.5;
                var iDir = -1;
                if (CHARACTERS[PLAYER_SIDE].getPhysics().position.x < 0) {
                    iDir *= -1;
                }

                var oPointShot = new CVector2(Math.random() * (AI_POINT_SHOT_X), -(FIELD_HALF_LENGHT * fDistRand));
                var oOpponent3DPos = new CVector2(_oOpponent.getPhysics().position.x, _oOpponent.getPhysics().position.y);
                var vLimitField = new CVector2(AI_POINT_SHOT_X, oPointShot.getY());
                var vSimulation = new CVector2(Math.abs(oOpponent3DPos.getX()) + oPointShot.getX(), oPointShot.getY());

                if (vSimulation.getX() > vLimitField.getX()) {
                    iDir *= -1;
                    oPointShot.set((oPointShot.getX() + (vSimulation.getX() - vLimitField.getX())), oPointShot.getY());
                }

                var fRadiants = oPointShot.angleBetweenVectors(oOpponent3DPos);

                _vImpulse.set(Math.sin(fRadiants) * iDir, Math.cos(fRadiants));

                var fFactorRand = randomFloatBetween(0.27, 0.30, 2);

                _vImpulse.scalarProduct(distanceV2({x: oPointShot.getX(), y: oPointShot.getY() - fZ}, _oOpponent.getPos()));
                _vImpulse.set(_vImpulse.getX() * 0.24, _vImpulse.getY() * fFactorRand);
                _vImpulse.set(_vImpulse.getX(), _vImpulse.getY());

                break;
        }

        s_oGame.addImpulseToBall({x: _vImpulse.getX() * FORCE_MULTIPLIER_AXIS_OPPONENT.x, y: _vImpulse.getY() * FORCE_MULTIPLIER_AXIS_OPPONENT.y,
            z: fZ * FORCE_MULTIPLIER_AXIS_OPPONENT.z});
        s_oGame.ballShotBy(OPPONENT_SIDE);
        playSound("hit_ball", 0.5, 0);
    };


    this._init();

    return this;
}

