function COpponent(iXPos, iYPos, iTeam, oParentContainer) {

    var _oParentContainer;
    var _aBowler;

    this._init = function (iXPos, iYPos, iTeam, oParentContainer) {
        _aBowler = new Array();

        _oParentContainer = oParentContainer;

        for (var i = 0; i < NUM_SPRITE_BATTER_BOWLER_MODE; i++) {
            _aBowler.push(createBitmap(s_oSpriteLibrary.getSprite("batter_" + iTeam + "_" + i)));
            _aBowler[i].x = iXPos;
            _aBowler[i].y = iYPos;
            _aBowler[i].rotation = 0;
            _aBowler[i].visible = false;
            oParentContainer.addChild(_aBowler[i]);
        }

        _aBowler[0].visible = true;

    };

    this.viewBowler = function (iVal) {
        _aBowler[iVal].visible = true;
    };

    this.hideBowler = function (iVal) {
        _aBowler[iVal].visible = false;
    };

    this.onFinishAnimation = function () {
        var oParent = this;
        _oOpponent.on("animationend", function () {
            s_oGame.addImpulseToBall();
            playSound("kick", 0.3, 0);
            _oOpponent.removeAllEventListeners();
            oParent.fadeAnimation(0);
        });
    };

    this._init(iXPos, iYPos, iTeam, oParentContainer);

    return this;
}

