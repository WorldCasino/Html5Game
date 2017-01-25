function CAreYouSurePanel(oParentContainer) {
    var _oBg;
    var _oMsg;
    var _oButYes;
    var _oButNo;
    var _oContainer;
    var _oParentContainer;
    var _oFade;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.alpha = 0;
        _oParentContainer.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        _oFade.on("click", function () {});

        _oContainer.addChild(_oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');

        _oBg = createBitmap(oSpriteBg);
        _oBg.x = CANVAS_WIDTH_HALF;
        _oBg.y = CANVAS_HEIGHT_HALF;
        _oBg.regX = oSpriteBg.width * 0.5;
        _oBg.regY = oSpriteBg.height * 0.5;

        _oContainer.addChild(_oBg);

        _oMsg = new createjs.Text(TEXT_ARE_SURE, "70px " + FONT2, "#ffffff");
        _oMsg.x = CANVAS_WIDTH / 2 + 10;
        _oMsg.y = CANVAS_HEIGHT_HALF - 120;
        _oMsg.textAlign = "center";
        _oMsg.textBaseline = "middle";
        _oMsg.lineWidth = 450;
        _oContainer.addChild(_oMsg);

        _oButYes = new CGfxButton(CANVAS_WIDTH / 2 + 160, CANVAS_HEIGHT * 0.5 + 150, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(CANVAS_WIDTH / 2 - 160, CANVAS_HEIGHT * 0.5 + 150, s_oSpriteLibrary.getSprite('but_no'), _oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    };

    this.show = function () {
        createjs.Tween.get(_oContainer).to({alpha: 1}, 150, createjs.quartOut).call(function () {
            s_oGame.pause(true);
        });
    };

    this.unload = function () {
        createjs.Tween.get(_oContainer).to({alpha: 0}, 150, createjs.quartOut).call(function () {
            _oParentContainer.removeChild(_oContainer, _oFade);
        });
    };

    this._onButYes = function () {
        createjs.Ticker.paused = false;
        this.unload();
        s_oGame.onExit();
        _oFade.removeAllEventListeners();
    };

    this._onButNo = function () {
        s_oGame.pause(false);
        this.unload();
        _oFade.removeAllEventListeners();
    };

    _oParentContainer = oParentContainer;

    this._init();
}