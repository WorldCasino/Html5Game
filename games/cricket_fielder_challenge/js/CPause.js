function CPause() {

    var _oContainer;
    var _oFade;
    var _oButContinue;

    this._init = function () {
        var oContainer = new createjs.Container();
        oContainer.alpha = 1;

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;

        var oHitArea = new createjs.Shape();
        oHitArea.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        _oFade.hitArea = oHitArea;
        _oFade.on("click", function () {});
        oContainer.addChild(_oFade);

        var oSpriteBg = s_oSpriteLibrary.getSprite("msg_box");
        var oMsgBox = createBitmap(oSpriteBg);
        oMsgBox.x = CANVAS_WIDTH_HALF;
        oMsgBox.y = CANVAS_HEIGHT_HALF;
        oMsgBox.regX = oSpriteBg.width * 0.5;
        oMsgBox.regY = oSpriteBg.height * 0.5;
        oContainer.addChild(oMsgBox);

        var oPauseText = new createjs.Text(TEXT_PAUSE, "80px " + FONT2, "#ffffff");
        oPauseText.x = CANVAS_WIDTH * 0.5;
        oPauseText.y = CANVAS_HEIGHT * 0.5 - 200;
        oPauseText.textAlign = "center";
        oPauseText.lineWidth = 600;
        oContainer.addChild(oPauseText);

        var oSpriteContinue = s_oSpriteLibrary.getSprite("but_continue");
        _oButContinue = new CGfxButton(CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.5 + 70, oSpriteContinue, oContainer);
        _oButContinue.addEventListenerWithParams(ON_MOUSE_UP, this._onLeavePause, this, oContainer);
        //  _oButContinue.setScale(0.6);
        _oButContinue.pulseAnimation();

        s_oStage.addChild(oContainer);
        s_oGame.pause(true);

    };

    this.unload = function () {
        _oFade.removeAllEventListeners();

        _oButContinue.unload();
        _oButContinue = null;

        s_oStage.removeChild(_oContainer);
    };

    this._onLeavePause = function (oContainer) {
        s_oGame.pause(false);
        createjs.Tween.get(oContainer).to({alpha: 0}, 100, createjs.quartIn).call(function () {
            s_oInterface.unloadPause();

        });
    };

    this._init();

    return this;
}