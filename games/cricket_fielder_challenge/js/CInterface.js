function CInterface() {
    var _oAudioToggle;
    var _oButExit;
    var _oButPause;

    var _oSpriteScore;
    var _oSpriteBall;
    var _oScoreText;
    var _oScoreText1;
    var _oBallText1;

    var _oButScore;
    var _oController = null;

    var _oPause;
    var _oHelpPanel = null;
    var _oHitArea = null;

    var _pStartPosScore;
    var _pStartPosBall;
    var _pStartPositionScoreText;
    var _pStartPositionScore;
    var _pStartPositionBallText;

    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosPause;

    var _iStep;

    this._init = function () {

        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height / 2) - 10, y: (oSprite.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_pause');
        _pStartPosPause = {x: _pStartPosExit.x - oSprite.height - 10, y: _pStartPosExit.y};
        _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite);
        _oButPause.addEventListener(ON_MOUSE_UP, this.onButPauseRelease, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: _pStartPosPause.x - oSprite.height - 10, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        _oSpriteScore = s_oSpriteLibrary.getSprite('score_panel');
        _pStartPosScore = {x: (CANVAS_WIDTH / 2) - 260, y: 35};
        _oButScore = new CGfxButton(_pStartPosScore.x, _pStartPosScore.y, _oSpriteScore, s_oStage);

        _pStartPositionScoreText = {x: (CANVAS_WIDTH / 2) - 315, y: 47};
        _oScoreText = new createjs.Text(SCORE_TEXT, "30px " + FONT, "#ffffff");
        _oScoreText.x = _pStartPositionScoreText.x;
        _oScoreText.y = _pStartPositionScoreText.y;
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "alphabetic";
        s_oStage.addChild(_oScoreText);

        _pStartPositionScore = {x: (CANVAS_WIDTH / 2) - 150, y: 47};
        _oScoreText1 = new createjs.Text("0", "30px " + FONT, "#ffffff");
        _oScoreText1.x = _pStartPositionScore.x;
        _oScoreText1.y = _pStartPositionScore.y;
        _oScoreText1.textAlign = "right";
        _oScoreText1.textBaseline = "alphabetic";
        s_oStage.addChild(_oScoreText1);

        _oSpriteBall = new CBallStatic(s_oStage);
        _pStartPosBall = {x: (CANVAS_WIDTH / 2) - 370, y: 79};
        _oSpriteBall.setPosition(_pStartPosBall.x, _pStartPosBall.y);

        _pStartPositionBallText = {x: (CANVAS_WIDTH / 2) - 350, y: 88};

        _oBallText1 = new createjs.Text("x " + LIVES, "30px " + FONT2, "#143502");
        _oBallText1.x = _pStartPositionBallText.x;
        _oBallText1.y = _pStartPositionBallText.y;
        _oBallText1.textAlign = "left";
        _oBallText1.textBaseline = "alphabetic";
        s_oStage.addChild(_oBallText1);


        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function () {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        _oButExit.unload();

        s_oInterface = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
        _oButScore.setPosition(_pStartPosScore.x + iNewX, iNewY + _pStartPosScore.y);
        _oSpriteBall.setPosition(_pStartPosBall.x + iNewX, iNewY + _pStartPosBall.y);
        _oButPause.setPosition(_pStartPosPause.x - iNewX, iNewY + _pStartPosPause.y);

        _oScoreText.x = _pStartPositionScoreText.x + iNewX;
        _oScoreText1.x = _pStartPositionScore.x + iNewX;
        _oBallText1.x = _pStartPositionBallText.x + iNewX;

        if (_oController !== null) {
            var oPosLeft = _oController.getStartPositionControlLeft();
            _oController.setPositionControlLeft(oPosLeft.x + iNewX, oPosLeft.y - iNewY);

            var oPosRight = _oController.getStartPositionControlRight();
            _oController.setPositionControlRight(oPosRight.x - iNewX, oPosRight.y - iNewY);
        }
    };

    this.createController = function () {
        _oController = new CController();
    };

    this.createHitArea = function () {
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oHitArea.on("click", function () {});
        s_oStage.addChild(_oHitArea);
    };

    this.setHitAreaVisible = function (bVal) {
        if (_oHitArea !== null)
            _oHitArea.visible = bVal;
    };

    this.createAnimText = function (szText, iSize, bStrobo, aColors, iTime, oFunction) {
        var oContainer = new createjs.Container();
        oContainer.scaleX = 0;
        oContainer.scaleY = 0;

        var oTextStroke = new createjs.Text(szText, iSize + "px " + FONT2, "#000");
        oTextStroke.x = 0;
        oTextStroke.y = 0;
        oTextStroke.textAlign = "center";
        oTextStroke.textBaseline = "middle";
        oTextStroke.outline = 4;
        oContainer.addChild(oTextStroke);

        var oText = new createjs.Text(szText, iSize + "px " + FONT2, "#ffffff");
        oText.x = 0;
        oText.y = 0;
        oText.textAlign = "center";
        oText.textBaseline = "middle";
        oContainer.addChild(oText);

        oContainer.x = CANVAS_WIDTH_HALF;
        oContainer.y = CANVAS_HEIGHT_HALF;

        if (bStrobo) {
            _iStep = 0;
            s_oInterface.strobeText(oText, aColors);
        }
        s_oStage.addChild(oContainer);

        createjs.Tween.get(oContainer).to({scaleX: 1, scaleY: 1}, iTime, createjs.Ease.cubicOut).call(function () {
            createjs.Tween.get(oContainer).wait(300).to({scaleX: 0, scaleY: 0}, iTime, createjs.Ease.cubicOut).call(function () {
                if (bStrobo) {
                    createjs.Tween.removeTweens(oText);
                }
                oFunction();
                s_oStage.removeChild(oContainer);
            });
        });
    };

    this.strobeText = function (oText, aColors) {
        createjs.Tween.get(oText).wait(30).call(function () {
            if (_iStep < aColors.length - 1) {
                _iStep++;
            } else {
                _iStep = 0;
            }
            oText.color = aColors[_iStep];
            s_oInterface.strobeText(oText, aColors);
        });
    };

    this.animBallHit = function () {
        var oSpriteHit = s_oSpriteLibrary.getSprite("hit_msg");
        var oHit = createBitmap(oSpriteHit);
        oHit.x = CANVAS_WIDTH_HALF;
        oHit.y = CANVAS_HEIGHT_HALF;
        oHit.regX = oSpriteHit.width * 0.5;
        oHit.regY = oSpriteHit.height * 0.5;
        oHit.scaleX = 0;
        oHit.scaleY = 0;

        s_oStage.addChild(oHit);

        createjs.Tween.get(oHit).to({scaleX: 1, scaleY: 1}, (500), createjs.Ease.cubicOut).wait(800).call(function () {
            s_oGame.afterBallHit();
            s_oStage.removeChild(oHit);
        });
    };

    this.viewScore = function (iValue) {
        _oScoreText1.text = iValue;
    };

    this.refreshLivesText = function (iLives) {
        _oBallText1.text = "x " + iLives;
    };

    this.createHelpPanel = function (iPlayerTeam) {
        _oHelpPanel = new CHelpPanel(0, 0, iPlayerTeam, s_oSpriteLibrary.getSprite("bg_help"));
    };

    this._onButRestartRelease = function () {
        s_oGame.restartGame();
    };

    this.onExitFromHelp = function () {
        if (_oHelpPanel !== null)
            _oHelpPanel.unload();
    };

    this.unloadPause = function () {
        _oPause.unload();
        _oPause = null;
    };

    this.onButPauseRelease = function () {
        _oPause = new CPause();
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onExit = function () {
        var oAreYouSure = new CAreYouSurePanel(s_oStage);
        oAreYouSure.show();
    };

    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;