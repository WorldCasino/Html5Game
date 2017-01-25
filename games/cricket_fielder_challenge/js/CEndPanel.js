function CEndPanel(oSpriteBg) {

    var _oBg;
    var _oGroup;

    var _oMsgText1;
    var _oScoreText1;

    var _oButRestart;
    var _oButHome;

    this._init = function (oSpriteBg) {

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            createjs.Sound.play("baseball_buzzer");
        }

        _oBg = createBitmap(oSpriteBg);
        _oBg.on("click", function () {});

        _oMsgText1 = new createjs.Text("", " 44px " + FONT2, "#fff");
        _oMsgText1.x = CANVAS_WIDTH / 2;
        _oMsgText1.y = (CANVAS_HEIGHT / 2) - 190;
        _oMsgText1.textAlign = "center";
        _oMsgText1.textBaseline = "alphabetic";
        _oMsgText1.lineHeight = 60;
        _oMsgText1.lineWidth = 450;

        _oScoreText1 = new createjs.Text("", " 40px " + FONT2, "#fff");
        _oScoreText1.x = CANVAS_WIDTH / 2;
        _oScoreText1.y = (CANVAS_HEIGHT / 2);
        _oScoreText1.textAlign = "center";
        _oScoreText1.textBaseline = "alphabetic";
        _oScoreText1.lineHeight = 60;
        _oScoreText1.lineWidth = 470;

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible = false;

        _oGroup.addChild(_oBg, _oScoreText1, _oMsgText1);

        var oSpriteRestart = s_oSpriteLibrary.getSprite('but_restart');
        _oButRestart = new CGfxButton(CANVAS_WIDTH / 2 + 170, CANVAS_HEIGHT_HALF + 160, oSpriteRestart, _oGroup);


        var oSpriteHome = s_oSpriteLibrary.getSprite('but_home');
        _oButHome = new CGfxButton(CANVAS_WIDTH / 2 - 170, CANVAS_HEIGHT_HALF + 160, oSpriteHome, _oGroup);


        s_oStage.addChild(_oGroup);
    };

    this.unload = function () {
        _oBg.off("click", function () {});
        createjs.Tween.get(_oGroup).to({alpha: 0}, 500).call(function () {
            _oButHome.unload();
            _oButRestart.unload();
            s_oStage.removeChild(_oGroup);
        });
    };

    this._initListener = function () {
        _oButHome.addEventListener(ON_MOUSE_UP, this._onExit, this);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
    };

    this.show = function (iScore) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            createjs.Sound.play("game_over");
        }

        _oMsgText1.text = TEXT_GAMEOVER;

        _oScoreText1.text = TEXT_SCORE + iScore;

        _oGroup.visible = true;

        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha: 1}, 500).call(function () {
            oParent._initListener();
            if (s_iAdsLevel === NUM_LEVEL_FOR_ADS) {
                $(s_oMain).trigger("show_interlevel_ad");
                s_iAdsLevel = 1;
            } else {
                s_iAdsLevel++;
            }
        });

        $(s_oMain).trigger("end_level", 1);
        $(s_oMain).trigger("share_event", iScore);
        $(s_oMain).trigger("save_score", iScore);
    };

    this._onRestart = function () {
        this.unload();
        s_oGame.resetGame();
    };

    this._onExit = function () {
        this.unload();

        s_oGame.onExit();
    };

    this._init(oSpriteBg);

    return this;
}
