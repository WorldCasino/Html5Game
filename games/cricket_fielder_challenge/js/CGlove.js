function CGlove(iXOffset, iDir, oSprite, oPhysics, oParentContainer) {

    var _oGlove;
    var _oParentContainer;
    var _oPhysics;
    var _iXOffset;
    var _iDir;

    this._init = function (iXOffset, iDir, oSprite) {

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2 + GLOVE_REG[iDir].x, regY: oSprite.height / 2 + GLOVE_REG[iDir].y},
            animations: {normal: [0], perfect: [1]}
        };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _oGlove = createSprite(oSpriteSheet, "normal", (oSprite.width / 2) / 2 + GLOVE_REG[iDir].x, oSprite.height / 2 + GLOVE_REG[iDir].y, oSprite.width / 2, oSprite.height);

        _iXOffset = iXOffset;

        _iDir = iDir;

        this.setPosition(CANVAS_WIDTH_HALF + iXOffset, CANVAS_HEIGHT_HALF);

        _oParentContainer.addChild(_oGlove);
    };

    this.unload = function () {
        _oParentContainer.removeChild(_oGlove);
    };

    this.setPosition = function (iX, iY) {
        _oGlove.x = iX;
        _oGlove.y = iY;
    };

    this.getObject = function () {
        return _oGlove;
    };

    this.getDepthPos = function () {
        return _oPhysics.position.y;
    };

    this.getX = function () {
        return _oGlove.x;
    };

    this.getY = function () {
        return _oGlove.y;
    };

    this.changeState = function (szText) {
        _oGlove.gotoAndStop(szText);
    };

    this.getDir = function () {
        return  _iDir;
    };

    this.getPhysics = function () {
        return _oPhysics;
    };

    this.setScale = function (fVal) {
        _oGlove.scaleX = _oGlove.scaleY = fVal;
    };

    this.flip = function () {
        _oGlove.scaleX = -_oGlove.scaleX;
    };

    this.setRotation = function (fValue) {
        _oGlove.rotation = fValue;
    };

    _oPhysics = oPhysics;
    _oParentContainer = oParentContainer;

    this._init(iXOffset, iDir, oSprite);

    return this;
}