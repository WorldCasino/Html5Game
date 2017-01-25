function CLoadingScreen(oParentContainer, oClassParent) {

    var _oFadeLoading = null;
    var _oLoadingAnim;
    var _oParentContainer = oParentContainer;

    this._init = function () {
        _oFadeLoading = new createjs.Shape();
        _oFadeLoading.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFadeLoading.on("click", function () {});

        _oParentContainer.addChild(_oFadeLoading);

        var oLoadingTexts = oClassParent.createText(TEXT_LOADING, 36);

        var oContTextLoad = oLoadingTexts.container;

        oContTextLoad.x = CANVAS_WIDTH_HALF;
        oContTextLoad.y = CANVAS_HEIGHT_HALF - 30;

        _oParentContainer.addChild(oContTextLoad);
        var oSpriteLoadingAnim = s_oSpriteLibrary.getSprite("preloader_anim");

        _oLoadingAnim = createBitmap(oSpriteLoadingAnim);
        _oLoadingAnim.x = CANVAS_WIDTH_HALF;
        _oLoadingAnim.y = CANVAS_HEIGHT_HALF + 30;
        _oLoadingAnim.regX = oSpriteLoadingAnim.width * 0.5;
        _oLoadingAnim.regY = oSpriteLoadingAnim.height * 0.5;
        _oParentContainer.addChild(_oLoadingAnim);

        s_oStage.addChild(_oParentContainer);

        this.animLoad();
    };

    this.animLoad = function () {
        var oParent = this;
        createjs.Tween.get(_oLoadingAnim).to({rotation: _oLoadingAnim.rotation + 360}, 1000).call(function () {
            oParent.animLoad();
        });
    };

    this.unload = function () {
        _oFadeLoading.removeAllEventListeners();
        s_oStage.removeChild(_oParentContainer);
    };

    this._init();
    
    return this;
}
