function CTeamChoose() {
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosContinue;
    var _oBg;
    var _oButContinue;
    var _oContTextSelectTeam;
    var _oContTextSelectOppTeam;
    var _oContTextYourTeam;
    var _oContTextOppTeam;
    var _oFade;
    var _oLoadingScreen = null;
    var _oAudioToggle;
    var _oButExit;
    var _oPlayerFlagSelect;
    var _oOpponentFlagSelect;
    var _oContainer;
    var _oYourTeamText;
    var _oOppTeamText;
    var _oYourTeamTextStroke;
    var _oOppTeamTextStroke;
    var _aPlayerTeamFlag;
    var _aOpponentTeamFlag;
    var _aTeamText;
    var _iActivePlayerTeam;
    var _iActiveOpponentTeam;

    this._init = function () {
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_select_team'));
        s_oStage.addChild(_oBg);

        _aTeamText = new Array();

        _oContainer = new createjs.Container();

        _iActivePlayerTeam = 0;
        _iActiveOpponentTeam = TEXT_TEAM.length - 1;

        var iTimeAnim = 1500;

        _aPlayerTeamFlag = this.createFlagSelection(PLAYER_SELECTION_FLAG_START_POS.x, PLAYER_SELECTION_FLAG_START_POS.y, iTimeAnim, this._onButPlayerTeamChoose);
        _aOpponentTeamFlag = this.createFlagSelection(OPPONENT_SELECTION_FLAG_START_POS.x, OPPONENT_SELECTION_FLAG_START_POS.y, iTimeAnim, this._onButOppTeamChoose);

        var oSpriteFlagSelection = s_oSpriteLibrary.getSprite("flag_selection");

        _oPlayerFlagSelect = createBitmap(oSpriteFlagSelection);
        _oPlayerFlagSelect.x = _aPlayerTeamFlag[0].getX();
        _oPlayerFlagSelect.y = _aPlayerTeamFlag[0].getY();
        _oPlayerFlagSelect.regX = oSpriteFlagSelection.width * 0.5;
        _oPlayerFlagSelect.regY = oSpriteFlagSelection.height * 0.5;

        _oOpponentFlagSelect = createBitmap(oSpriteFlagSelection);
        _oOpponentFlagSelect.x = _aOpponentTeamFlag[TEXT_TEAM.length - 1].getX();
        _oOpponentFlagSelect.y = _aOpponentTeamFlag[TEXT_TEAM.length - 1].getY();
        _oOpponentFlagSelect.regX = oSpriteFlagSelection.width * 0.5;
        _oOpponentFlagSelect.regY = oSpriteFlagSelection.height * 0.5;

        s_oStage.addChild(_oContainer);

        _oContainer.y = 12;

        _oContTextSelectOppTeam = this.createText(TEXT_SELECT_OPPONENT_TEAM, 22, 200).container;//szText, iSize, oContainer
        _oContTextSelectOppTeam.x = CANVAS_WIDTH_HALF + 130;
        _oContTextSelectOppTeam.y = 304;

        s_oStage.addChild(_oContTextSelectOppTeam);
        //
        _oContTextSelectTeam = this.createText(TEXT_SELECT_YOUR_TEAM, 22, 200).container;
        _oContTextSelectTeam.x = CANVAS_WIDTH_HALF - 120;
        _oContTextSelectTeam.y = 304;

        s_oStage.addChild(_oContTextSelectTeam);

        var oTextYourTeam = this.createText(TEXT_TEAM[0], 30, 500);

        _oContTextYourTeam = oTextYourTeam.container;
        _oContTextYourTeam.x = CANVAS_WIDTH_HALF - 120;
        _oContTextYourTeam.y = CANVAS_HEIGHT_HALF + 132;

        _oYourTeamText = oTextYourTeam.text;
        _oYourTeamTextStroke = oTextYourTeam.text_stroke;

        s_oStage.addChild(_oContTextYourTeam);

        var oTextOppTeam = this.createText(TEXT_TEAM[TEXT_TEAM.length - 1], 30, 500);

        _oContTextOppTeam = oTextOppTeam.container;
        _oContTextOppTeam.x = CANVAS_WIDTH_HALF + 120;
        _oContTextOppTeam.y = CANVAS_HEIGHT_HALF + 132;

        _oOppTeamText = oTextOppTeam.text;
        _oOppTeamTextStroke = oTextOppTeam.text_stroke;

        s_oStage.addChild(_oContTextOppTeam);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.width / 2) - 60, y: (oSprite.height / 2) + 20};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        }

        _pStartPosContinue = {x: CANVAS_WIDTH * 0.5 + 300, y: CANVAS_HEIGHT * 0.5 + 400};
        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");

        _oButContinue = new CGfxButton(_pStartPosContinue.x, _pStartPosContinue.y, oSpriteContinue, s_oStage);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
        _oButContinue.pulseAnimation();

        var oSpriteExit = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSpriteExit.width / 2) - 15, y: (oSpriteExit.height / 2) + 20};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSpriteExit, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            _oFade.visible = false;
            _oContainer.addChild(_oPlayerFlagSelect, _oOpponentFlagSelect);
        });

        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this._createFlag = function (i, iOffsetX, iOffsetY, iTimeWait, iTimeAnim, oFunction, oContainer) {
        var oFlag;
        var oSpriteFlag = s_oSpriteLibrary.getSprite("flag_" + i);
        oFlag = new CGfxButton(iOffsetX, iOffsetY, oSpriteFlag, oContainer);
        oFlag.addEventListenerWithParams(ON_MOUSE_UP, oFunction, this, i);

        var oButtonFlag = oFlag.getButton();

        oButtonFlag.scaleX = 0;
        oButtonFlag.scaleY = 0;

        createjs.Tween.get(oButtonFlag).wait(iTimeWait).to({scaleY: 1, scaleX: 1}, iTimeAnim, createjs.Ease.elasticOut);

        return oFlag;
    };

    this.createFlagSelection = function (iStartX, iStartY, iTimeAnim, oFunction) {
        var aFlag = new Array();
        var iX = iStartX;
        var iY = iStartY;

        for (var i = 0; i < TOT_TEAMS; i++) {
            var iTimeWait = Math.floor(Math.random() * 500);
            aFlag[i] = this._createFlag(i, iX, iY, iTimeWait, iTimeAnim, oFunction, _oContainer);
            if (i % MAX_COL_FLAG - 1 === 0) {
                iX = iStartX;
                iY += FLAG_OFFSET.y;
            } else {
                iX += FLAG_OFFSET.x;
            }
        }
        return aFlag;
    };

    this.createText = function (szText, iSize, iLineWidth) {
        var oContainer = new createjs.Container();
        var oText;

        oText = new createjs.Text(szText, iSize + "px " + FONT2, "#ffffff");
        oText.textAlign = "center";
        oText.lineWidth = iLineWidth;
        oText.x = 0;
        oText.y = 0;

        oContainer.addChild(oText);

        return {container: oContainer, text: oText};
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        _oButExit.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y);
        _oButContinue.setPosition(_pStartPosContinue.x - iNewX, _pStartPosContinue.y - iNewY);
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, iNewY + _pStartPosAudio.y);
        }
    };

    this._onButPlayerTeamChoose = function (iID) {
        if (_iActivePlayerTeam !== iID && _iActiveOpponentTeam !== iID) {
            _oPlayerFlagSelect.x = _aPlayerTeamFlag[iID].getX();
            _oPlayerFlagSelect.y = _aPlayerTeamFlag[iID].getY();

            _oYourTeamText.text = TEXT_TEAM[iID];

            _iActivePlayerTeam = iID;
        }
    };

    this._onButOppTeamChoose = function (iID) {
        if (_iActiveOpponentTeam !== iID && _iActivePlayerTeam !== iID) {
            _oOpponentFlagSelect.x = _aOpponentTeamFlag[iID].getX();
            _oOpponentFlagSelect.y = _aOpponentTeamFlag[iID].getY();

            _oOppTeamText.text = TEXT_TEAM[iID];

            _iActiveOpponentTeam = iID;
        }
    };

    this.unload = function () {
        for (var i = 0; i < _aPlayerTeamFlag.length; i++) {
            _aPlayerTeamFlag[i].unload();
            _aPlayerTeamFlag[i] = null;
        }

        for (var i = 0; i < _aOpponentTeamFlag.length; i++) {
            _aOpponentTeamFlag[i].unload();
            _aOpponentTeamFlag[i] = null;
        }

        _oButExit.unload();
        _oButExit = null;

        _oButContinue.unload();
        _oButContinue = null;

        if (_oLoadingScreen !== null) {
            _oLoadingScreen.unload();
            _oLoadingScreen = null;
        }

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }

        s_oStage.removeAllChildren();
        createjs.Tween.removeAllTweens();

        s_oTeamChoose = null;
    };

    this.loadingScreen = function () {
        var oContainerLoad = new createjs.Container();
        oContainerLoad.alpha = 0;

        _oLoadingScreen = new CLoadingScreen(oContainerLoad, this);

        createjs.Tween.get(oContainerLoad).to({alpha: 1}, 250, createjs.Ease.cubicOut);
    };

    this._onExit = function () {
        this.unload();

        s_oMain.gotoMenu();
    };

    this._onAudioToggle = function () {
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this._onButContinueRelease = function () {
        _oButContinue.block(true);
        this.loadingScreen();

        s_oMain._loadChoosedTeam(_iActivePlayerTeam, _iActiveOpponentTeam);
    };

    s_oTeamChoose = this;

    this._init();
}

var s_oTeamChoose = null;