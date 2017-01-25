function CTextButton(iXPos, iYPos, oSprite, szText, szFont, szColor, szColorOutline, iFontSize) {

    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;
    var _oButton;
    var _oText;
    var _oTextBack;
    var _bBlock = false;

    this._init = function (iXPos, iYPos, oSprite, szText, szFont, szColor, szColorOutline, iFontSize) {
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();

        var oButtonBg = createBitmap(oSprite);

        _oTextBack = new createjs.Text(szText, iFontSize + "px " + szFont, szColorOutline);
        _oTextBack.textAlign = "center";
        _oTextBack.textBaseline = "middle";
        _oTextBack.x = oSprite.width / 2;
        _oTextBack.y = oSprite.height / 2;
        _oTextBack.outline = 3;

        _oText = new createjs.Text(szText, iFontSize + "px " + szFont, szColor);
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.x = _oTextBack.x;
        _oText.y = _oTextBack.y;

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width / 2;
        _oButton.regY = oSprite.height / 2;
        _oButton.addChild(oButtonBg, _oTextBack, _oText);

        if (!s_bMobile) {
            _oButton.cursor = "pointer";
        }

        s_oStage.addChild(_oButton);

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown");
        _oButton.off("pressup");

        s_oStage.removeChild(_oButton);
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this._initListener = function () {

        _oButton.on("mousedown", this.buttonDown);
        _oButton.on("pressup", this.buttonRelease);
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

    this.buttonRelease = function () {
        if (_bBlock) {
            return;
        }

        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams);
        }

    };

    this.buttonDown = function () {
        if (_bBlock) {
            return;
        }

        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams);
        }
    };

    this.block = function (bVal) {
        _bBlock = bVal;
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;
    };

    this.setTextPosition = function (iY) {
        _oText.y = iY;
        _oTextBack.y = iY + 2;
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

    this._init(iXPos, iYPos, oSprite, szText, szFont, szColor, szColorOutline, iFontSize);

    return this;

}
