function CHelpPanel(iXPos, iYPos, iPlayerTeam, oSprite) {
    var _oTitle;
    var _oText1;

    var _oHelpBg;
    var _oFade;
    var _oGroup;
    var _oButContinue;
    var _oLeftGlove;
    var _oRightGlove;
    var _oContainerAnim;
    var _bClick = false;
    var _oHelpControl;

    this._init = function (iXPos, iYPos, iPlayerTeam, oSprite) {
        _oGroup = new createjs.Container();
        _oGroup.x = iXPos;
        _oGroup.y = iYPos;
        s_oStage.addChild(_oGroup);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        _oGroup.addChild(_oFade);

        _oHelpBg = createBitmap(oSprite);
        _oHelpBg.x = CANVAS_WIDTH_HALF;
        _oHelpBg.y = CANVAS_HEIGHT_HALF;
        _oHelpBg.regX = oSprite.width * 0.5;
        _oHelpBg.regY = oSprite.height * 0.5;

        _oGroup.addChild(_oHelpBg);

        _oTitle = new createjs.Text(TEXT_HOW_TO_PLAY, "bold 50px " + FONT2, "#ffffff");
        _oTitle.textAlign = "center";
        _oTitle.lineWidth = 500;
        _oTitle.x = CANVAS_WIDTH * 0.5;
        _oTitle.y = CANVAS_HEIGHT * 0.5 - 240;
        _oGroup.addChild(_oTitle);

        _oContainerAnim = new createjs.Container();
        _oContainerAnim.y = -70;

        var oSpriteGlove = s_oSpriteLibrary.getSprite("glove_" + iPlayerTeam);
        _oLeftGlove = new CGlove(-50, LEFT_GLOVE, oSpriteGlove, null, _oContainerAnim);
        _oRightGlove = new CGlove(50, RIGHT_GLOVE, oSpriteGlove, null, _oContainerAnim);

        _oLeftGlove.setScale(0.7);
        _oRightGlove.setScale(0.7);
        _oRightGlove.flip();

        var szText;
        var szControl;

        if (s_bMobile) {
            szText = TEXT_HELP1_MOBILE_BOWLER;
            szControl = "help_touch";
        } else {
            szText = TEXT_HELP1_PC_BOWLER;
            szControl = "help_mouse";
        }

        var oSpriteControl = s_oSpriteLibrary.getSprite(szControl);
        _oHelpControl = createBitmap(oSpriteControl);
        _oHelpControl.x = CANVAS_WIDTH_HALF + 6;
        _oHelpControl.y = 390;
        _oHelpControl.regX = oSpriteControl.width * 0.5;
        _oHelpControl.regY = oSpriteControl.height * 0.5;

        _oContainerAnim.addChild(_oHelpControl);

        _oGroup.addChild(_oContainerAnim);

        createjs.Ticker.paused = false;

        this.animGloves();

        _oText1 = new createjs.Text(szText, "28px " + FONT2, "#ffffff");
        _oText1.textAlign = "center";
        _oText1.lineWidth = 450;
        _oText1.x = CANVAS_WIDTH * 0.5;
        _oText1.y = CANVAS_HEIGHT * 0.5 + 20;
        _oGroup.addChild(_oText1);

        var oSpriteContiune = s_oSpriteLibrary.getSprite('but_continue');
        _oButContinue = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT_HALF + 180, oSpriteContiune, _oGroup);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onExitHelp, this);
        _oButContinue.pulseAnimation();

        var oParent = this;
        _oGroup.on("pressup", function () {
            oParent._onExitHelp();
        });
    };

    this.animGloves = function () {
        var oParent = this;
        createjs.Tween.get(_oContainerAnim).to({x: 100}, 1000, createjs.Ease.cubicInOut).call(function () {
            createjs.Tween.get(_oContainerAnim).to({x: -100}, 1000, createjs.Ease.cubicInOut).call(function () {
                oParent.animGloves();
            });
        });
    };

    this.unload = function () {
        createjs.Tween.removeTweens(_oContainerAnim);
        createjs.Tween.get(_oGroup).to({alpha: 0}, 500, createjs.Ease.cubicIn).call(function () {
            s_oStage.removeChild(_oGroup);
        });
        var oParent = this;
        _oGroup.off("pressup", function () {
            oParent._onExitHelp();
        });
    };

    this._onExitHelp = function () {
        if (_bClick) {
            return;
        }
        _bClick = true;
        this.unload();
        s_oGame._onExitHelpPanel();
    };

    this._init(iXPos, iYPos, iPlayerTeam, oSprite);

}