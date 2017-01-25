function CGame(oData, iPlayerTeam, iOpponentTeam) {

    var _oInterface;
    var _oBg;

    var _oScene;
    var _oLeftGlove;
    var _oRightGlove;
    var _oBall;
    var _oOpponent = null;
    var _oStageMouseMove = null;
    var _oContainerGame;
    var _oBallForceZ;
    var _oCrowdCheering;
    var _oEndPanel = null;
    var _bNotCaught = false;
    var _bKeeperSave = false;
    var _bPerfectSaved = false;
    var _bLaunched = false;
    var _iScore;
    var _iBallSaved = 0;
    var _iCombo = 0;
    var _iLives;
    var _iFrameBatter;
    var _fTimeReset;
    var _fBallForceY;
    var _fBallForceX;
    var _aObjects;

    var _iGameState = STATE_INIT;
    var _oCamera = null;

    this._init = function () {
        $(s_oMain).trigger("start_session");
        this.pause(true);

        _iScore = 0;

        _iFrameBatter = 0;

        _aObjects = new Array();

        this.resetForcesValues();

        _oCrowdCheering = playSound("crowd_cheering", 0.7, -1);

        _iLives = LIVES;

        _oContainerGame = new createjs.Container();
        s_oStage.addChild(_oContainerGame);

        if (s_bMobile)
            this.velocityBall();

        _oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_game_bowler"));
        _oContainerGame.addChild(_oBg);

        _oScene = new CScenario();

        if (SHOW_3D_RENDER) {
            _oCamera = camera;
        } else {
            _oCamera = createOrthoGraphicCamera();
        }

        _oOpponent = new COpponent(CANVAS_WIDTH_HALF - 55, 420, iOpponentTeam, _oContainerGame);

        var oSpriteBall = s_oSpriteLibrary.getSprite("ball_game");
        _oBall = new CBall(0, 0, oSpriteBall, _oScene.ballBody(), _oContainerGame);

        _aObjects.push(_oBall);

        this.ballPosition();

        resizeCanvas3D();

        setVolume(s_oSoundTrack, 0.35);

        _oInterface = new CInterface();

        var oSpriteGlove = s_oSpriteLibrary.getSprite("glove_" + iPlayerTeam);
        _oLeftGlove = new CGlove(-20, LEFT_GLOVE, oSpriteGlove, _oScene.getLeftGlovesBody(), _oContainerGame);
        _oRightGlove = new CGlove(20, RIGHT_GLOVE, oSpriteGlove, _oScene.getRightGlovesBody(), _oContainerGame);
        _oRightGlove.flip();

        _aObjects.push(_oLeftGlove);
        _aObjects.push(_oRightGlove);

        if (!SHOW_3D_RENDER) {
            _oInterface.createHelpPanel(iPlayerTeam);
            this.onGlovesMove(s_oStage);
        } else {
            this.onGlovesMove(window);
            this._onExitHelpPanel();
        }
    };

    this.velocityBall = function () {
//        BALL_FORCE_Y[i] *= BALL_VELOCITY_MULTIPLIER;
//        BALL_FORCE_Z[i].min /= (BALL_VELOCITY_MULTIPLIER + 0.1);
//        BALL_FORCE_Z[i].max *= (BALL_VELOCITY_MULTIPLIER + 0.1);
//        BALL_FORCE_X[i] *= BALL_VELOCITY_MULTIPLIER;
    };

    this.sortDepth = function (oObj1, oObj2) {
        if (oObj1 === null || oObj2 === null) {
            return;
        }
        if (oObj1.getDepthPos() > oObj2.getDepthPos()) {
            if (_oContainerGame.getChildIndex(oObj1.getObject()) > _oContainerGame.getChildIndex(oObj2.getObject())) {
                _oContainerGame.swapChildren(oObj1.getObject(), oObj2.getObject());
            }
        } else if (oObj1.getDepthPos() < oObj2.getDepthPos()) {
            if (_oContainerGame.getChildIndex(oObj2.getObject()) > _oContainerGame.getChildIndex(oObj1.getObject())) {
                _oContainerGame.swapChildren(oObj2.getObject(), oObj1.getObject());
            }
        }
    };

    this._onExitHelpPanel = function () {
        _oInterface.onExitFromHelp();
        this.activeEventListeners();
        this.pause(false);
        $(s_oMain).trigger("start_level", 1);
    };

    this.activeEventListeners = function () {
        if (SHOW_3D_RENDER) {
            window.addEventListener("mousedown", this.addBatImpulseToBall);
            window.addEventListener("mousemove", this.onGlovesMove);
        } else {
            if (_oStageMouseMove === null) {
                _oStageMouseMove = s_oStage.on("stagemousemove", this.onGlovesMove);
            }
        }
    };

    this.deactiveEventListeners = function () {
        if (SHOW_3D_RENDER) {
            window.removeEventListener("mousedown", this.addBatImpulseToBall);
            window.removeEventListener("mousemove", this.onGlovesMove);
        } else {
            s_oStage.off("stagemousemove", _oStageMouseMove);
            _oStageMouseMove = null;
        }
    };

    this.resetForcesValues = function () {
        _fBallForceY = START_BALL_FORCE_Y;
        _fBallForceX = START_BALL_FORCE_X;
        _oBallForceZ = {min: START_BALL_FORCE_Z, max: START_BALL_FORCE_Z + STEP_BALL_FORCE_Z};
    };

    this.increaseDifficulty = function () {
        var fTempY = _fBallForceY + STEP_BALL_FORCE_Y;
        var fTempX = _fBallForceX + STEP_BALL_FORCE_X;
        var fTempZ = _oBallForceZ.max + STEP_BALL_FORCE_Z;

        if (fTempX > MAX_BALL_FORCE_X) {
            _fBallForceX = MAX_BALL_FORCE_X;
        } else {
            _fBallForceX = fTempX;
        }

        if (fTempY > MAX_BALL_FORCE_Y) {
            _fBallForceY = MAX_BALL_FORCE_Y;
        } else {
            _fBallForceY = fTempY;
        }

        if (fTempZ > MAX_BALL_FORCE_Z) {
            _oBallForceZ.max = MAX_BALL_FORCE_Z;
        } else {
            _oBallForceZ.max = fTempZ;
        }
    };

    this.ballPosition = function () {
        var oBallBody = _oScene.ballBody();

        var oPos2DBall = this.convert3dPosTo2dScreen(oBallBody.position, _oCamera);

        var fScaleDistance = _oBall.getStartScale() - oPos2DBall.z;

        this.shadowBall(oBallBody, fScaleDistance);

        _oBall.scale(fScaleDistance);
        _oBall.setPosition(oPos2DBall.x, oPos2DBall.y);
    };

    this.shadowBall = function (oBallBody, fScaleDistance) {
        var oFieldBody = _oScene.getFieldBody();

        var oPosShadow = {x: oBallBody.position.x, y: oBallBody.position.y, z: oFieldBody.position.z};

        var oPos2dShadow = this.convert3dPosTo2dScreen(oPosShadow, _oCamera);

        var fDistance = oBallBody.position.z - oFieldBody.position.z;

        if (fDistance < 1) {
            fDistance = 1;
        }
        var fScaleHeight = fScaleDistance / fDistance;
        _oBall.scaleShadow(fScaleHeight);

        var fDistanceShadow = (-(oBallBody.position.z) - oFieldBody.position.z * 0.1) * 0.1;
        _oBall.setAlphaByHeight(fDistanceShadow);

        _oBall.setPositionShadow(oPos2dShadow.x, oPos2dShadow.y);
    };

    this.unload = function () {
        s_oStage.removeAllChildren();
        _oInterface.unload();

        _oScene.destroyWorld();
        _oScene = null;

        this.deactiveEventListeners();
    };

    this.resetValues = function () {
        _iLives = LIVES;
        _iScore = 0;
        this.resetForcesValues();
        _oInterface.viewScore(_iScore);
        _oInterface.refreshLivesText(_iLives);
    };

    this.ballNotCaught = function () {
        if (!_bNotCaught) {
            _bNotCaught = true;
            _fTimeReset = TIME_RESET_AFTER_GOAL;
            _oInterface.createAnimText(TEXT_MISSED, 80, false, null, 300, function () {});
            _iLives--;
            _oInterface.refreshLivesText(_iLives);
            _iCombo = 0;
            playSound("crowd_ohhh", 1, 0);
        }
    };

    this.launchBallImpulse = function () {
        _oScene.setElementVelocity(_oBall.getPhysics(), {x: 0, y: 0, z: 0});
        _oScene.addImpulse(_oBall.getPhysics(), LAUNCH_BALL_IMPULSE);
        _oScene.setElementAngularVelocity(_oBall.getPhysics(), {x: 0, y: 0, z: 0});
    };

    this.ballCaught = function (oContactPoint, iGlove) {
        if (_bNotCaught) {
            return;
        }

        if (!_bKeeperSave) {
            if (oContactPoint.x > -BALL_SAVED_POINT.x && oContactPoint.x < BALL_SAVED_POINT.x && oContactPoint.z > -BALL_SAVED_POINT.z
                    && oContactPoint.z < BALL_SAVED_POINT.z) {
                if (iGlove === LEFT_GLOVE) {
                    _oLeftGlove.changeState("perfect");
                } else {
                    _oRightGlove.changeState("perfect");
                }
                _fTimeReset = TIME_RESET_AFTER_KEEPER_SAVED;
                createjs.Tween.get(_oContainerGame).wait(100).call(function () {
                    if (!_bNotCaught)
                        s_oGame.textSave();
                });
                this.calculateScore(oContactPoint);
                _bKeeperSave = true;
                this.resetBallPosition();
                _oBall.setVisible(false);
                this.increaseDifficulty();
            } else {
                this.ballNotCaught();
            }
            playSound("kick", 1, 0);
            playSound("applauses", 1, 0);
        }
    };

    this.ballVisible = function (bVal) {
        _oBall.setVisible(bVal);
    };

    this.calculateScore = function (oContactPoint) {
        var fCaughtVal = Math.floor((oContactPoint.x + oContactPoint.z) * SCORE_ERROR_MULTIPLIER);

        _iScore += SCORE_BALL_CAUGHT - fCaughtVal;
        _oInterface.viewScore(_iScore);
    };

    this.addBatImpulseToBall = function () {
        if (_bLaunched || _iGameState !== STATE_PLAY) {
            return;
        }

        var fX = (Math.random() * (_fBallForceX + _fBallForceX)) - _fBallForceX;
        var fZ = (Math.random() * (_oBallForceZ.max - _oBallForceZ.min)) + _oBallForceZ.min;
        var oDir = {x: fX, y: -_fBallForceY, z: fZ};
        var oBall = _oScene.ballBody();
        oBall.position.x = 0;
        _oScene.setElementVelocity(oBall, {x: 0, y: 0, z: 0});
        _oScene.addImpulse(oBall, oDir);
        _oScene.setElementAngularVelocity(oBall, {x: 0, y: 0, z: 0});
        _bLaunched = true;
        playSound("hit_ball", 1, 0);
    };

    this.pause = function (bVal) {
        if (bVal) {
            _iGameState = STATE_PAUSE;
            this.deactiveEventListeners();
        } else {
            _iGameState = STATE_PLAY;
            this.activeEventListeners();
        }
        createjs.Ticker.paused = bVal;
    };

    this.startOpponentShot = function () {
        _oOpponent.hideBowler(_iFrameBatter);
        _iFrameBatter = 0;
    };

    this.onExit = function () {
        this.unload();
        destroySound(_oCrowdCheering);
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        setVolume(s_oSoundTrack, 1);
        s_oMain.gotoMenu();
    };

    this.resetGame = function () {
        this.resetValues();
        this.resetScene();
        this.activeEventListeners();
        _iGameState = STATE_PLAY;
        this.startOpponentShot();
        $(s_oMain).trigger("restart_level", 1);
    };

    this.resetBallPosition = function () {
        var oBallBody = _oScene.ballBody();

        oBallBody.position.set(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
        _oScene.setElementVelocity(oBallBody, {x: 0, y: 0, z: 0});
        _oScene.setElementAngularVelocity(oBallBody, {x: 0, y: 0, z: 0});

        _oBall.setVisible(true);
    };

    this._updateInit = function () {
        _oScene.update();
        this._updateBall2DPosition();
        _iGameState = STATE_PLAY;
    };

    this.onGlovesMove = function (e) {
        var oLeftGlovesBody = _oLeftGlove.getPhysics();
        var oRightGlovesBody = _oRightGlove.getPhysics();
        var oPosMouse;
        if (!SHOW_3D_RENDER) {
            oPosMouse = {x: e.stageX / s_fInverseScaling + OFFSET_MOUSE_X, y: e.stageY / s_fInverseScaling};
        } else {
            oPosMouse = {x: e.clientX - s_iCanvasOffsetWidth + OFFSET_MOUSE_X, y: e.clientY - s_iCanvasOffsetHeight};
        }

        if (s_bMobile) {
            oPosMouse.x = oPosMouse.x + MOBILE_OFFSET_GLOVES_X;
            oPosMouse.y = oPosMouse.y + MOBILE_OFFSET_GLOVES_Y;
        }

        var fRightOffset = (RIGHT_GLOVE_POSITION.x * 2);

        var oLeftGlove3D = s_oGame.convert2dScreenPosTo3d(oPosMouse, oLeftGlovesBody);
        var oRightGlove3D = {x: oLeftGlove3D.x + fRightOffset, z: oLeftGlove3D.z};

        if (oRightGlove3D.x < LIMIT_HAND_RANGE_POS.x && oLeftGlove3D.x > -LIMIT_HAND_RANGE_POS.x) {
            oLeftGlovesBody.position.x = oLeftGlove3D.x;
            oRightGlovesBody.position.x = oRightGlove3D.x;
        } else {
            if (oRightGlove3D.x < LIMIT_HAND_RANGE_POS.x) {
                oLeftGlovesBody.position.x = -LIMIT_HAND_RANGE_POS.x;
                oRightGlovesBody.position.x = -LIMIT_HAND_RANGE_POS.x + fRightOffset;
            } else {
                oLeftGlovesBody.position.x = LIMIT_HAND_RANGE_POS.x - fRightOffset;
                oRightGlovesBody.position.x = LIMIT_HAND_RANGE_POS.x;
            }
        }

        if (oLeftGlove3D.z > LIMIT_HAND_RANGE_POS.zMin && oLeftGlove3D.z < LIMIT_HAND_RANGE_POS.zMax) {
            oLeftGlovesBody.position.z = oLeftGlove3D.z;
            oRightGlovesBody.position.z = oLeftGlove3D.z;
        } else {
            if (oLeftGlove3D.z > LIMIT_HAND_RANGE_POS.zMin) {
                oLeftGlovesBody.position.z = LIMIT_HAND_RANGE_POS.zMax;
                oRightGlovesBody.position.z = LIMIT_HAND_RANGE_POS.zMax;
            } else {
                oLeftGlovesBody.position.z = LIMIT_HAND_RANGE_POS.zMin;
                oRightGlovesBody.position.z = LIMIT_HAND_RANGE_POS.zMin;
            }
        }

        var oLeftGlovesPos2D = s_oGame.convert3dPosTo2dScreen(oLeftGlovesBody.position, _oCamera);
        var oRightGlovesPos2D = s_oGame.convert3dPosTo2dScreen(oRightGlovesBody.position, _oCamera);

        _oLeftGlove.setPosition(oLeftGlovesPos2D.x, oLeftGlovesPos2D.y);
        _oRightGlove.setPosition(oRightGlovesPos2D.x, oRightGlovesPos2D.y);

        //      console.log(oRightGlovesBody.position);

    };

    this.convert2dScreenPosTo3d = function (oPos2d) {
        var iWidth = (s_iCanvasResizeWidth);
        var iHeight = (s_iCanvasResizeHeight);

        var mouse3D = new THREE.Vector3((oPos2d.x / iWidth) * 2 - 1, //x
                -(oPos2d.y / iHeight) * 2 + 1, //y
                -1);                                            //z
        mouse3D.unproject(_oCamera);
        mouse3D.sub(_oCamera.position);
        mouse3D.normalize();

        var fFactor = 34.0;

        mouse3D.multiply(new THREE.Vector3(fFactor, 1, fFactor));

        return mouse3D;
    };

    this.convert3dPosTo2dScreen = function (pos, oCamera) {
        var v3 = new THREE.Vector3(pos.x, pos.y, pos.z);
        var vector = v3.project(oCamera);

        var widthHalf = Math.floor(s_iCanvasResizeWidth) * 0.5;
        var heightHalf = Math.floor(s_iCanvasResizeHeight) * 0.5;

        vector.x = ((vector.x * widthHalf) + widthHalf) * s_fInverseScaling;
        vector.y = (-(vector.y * heightHalf) + heightHalf) * s_fInverseScaling;

        return vector;
    };

    this.timeReset = function () {
        if (_fTimeReset > 0) {
            _fTimeReset -= FPS_TIME;
        } else {

            _iBallSaved++;

            _oLeftGlove.changeState("normal");
            _oRightGlove.changeState("normal");

            if (_iLives > 0) {
                this.resetScene();
                this.startOpponentShot();
            } else {
                this.gameOver();
                _iGameState = STATE_FINISH;
                $(s_oMain).trigger("end_level", 1);
                this.deactiveEventListeners();
            }
            _bLaunched = false;
        }
    };

    this.textSave = function () {
        if (_iCombo < TEXT_CONGRATULATION.length) {
            var bFlashEffect = false;
            if (_iCombo >= TEXT_CONGRATULATION.length - 1) {
                bFlashEffect = true;
            }
            _oInterface.createAnimText(TEXT_CONGRATULATION[_iCombo], TEXT_SIZE[_iCombo], bFlashEffect, TEXT_EXCELLENT_COLOR, 300, function () {});
            _iCombo++;
        } else {
            var bFlashEffect = false;
            var iRand = Math.floor(Math.random() * (TEXT_CONGRATULATION.length - 1)) + 1;
            if (iRand >= TEXT_CONGRATULATION.length - 1) {
                bFlashEffect = true;
            }
            _oInterface.createAnimText(TEXT_CONGRATULATION[iRand], TEXT_SIZE[iRand], bFlashEffect, TEXT_EXCELLENT_COLOR, 300, function () {});
        }
    };

    this.gameOver = function () {
        _oEndPanel = CEndPanel(s_oSpriteLibrary.getSprite('msg_box'));
        _oEndPanel.show(_iScore);
    };

    this.resetScene = function () {
        _bNotCaught = false;
        _bKeeperSave = false;

        this.resetBallPosition();
    };

    this._onEnd = function () {
        this.onExit();
    };

    this.swapChildrenIndex = function () {
        for (var i = 0; i < _aObjects.length - 1; i++) {
            for (var j = i + 1; j < _aObjects.length; j++) {
                this.sortDepth(_aObjects[i], _aObjects[j]);
            }
        }
    };

    this.rotateGloves = function () {
        var fDistanceXLeft = (_oLeftGlove.getX() - CANVAS_WIDTH_HALF) * HAND_KEEPER_ANGLE_RATE;
        var fDistanceXRight = (_oRightGlove.getX() - CANVAS_WIDTH_HALF) * HAND_KEEPER_ANGLE_RATE;

        _oLeftGlove.setRotation(fDistanceXLeft);
        _oRightGlove.setRotation(fDistanceXRight);
    };

    this._updatePlay = function () {
        for (var i = 0; i < PHYSICS_ACCURACY; i++) {
            _oScene.update();
        }

        this._updateBall2DPosition();

        if (_bKeeperSave || _bNotCaught) {
            this.timeReset();
        }

        this.rotateGloves();

        this.batterAnimation();

        this.swapChildrenIndex();
    };

    this.batterAnimation = function () {
        _oOpponent.hideBowler(_iFrameBatter);
        if ((_iFrameBatter + 1) < NUM_SPRITE_BATTER_BOWLER_MODE) {
            _oOpponent.viewBowler(_iFrameBatter + 1);
            _iFrameBatter++;
        } else {
            _oOpponent.viewBowler(_iFrameBatter);
        }

        if (_iFrameBatter === 20) {
            this.resetBallPosition();
            this.launchBallImpulse();
        }

        if (_iFrameBatter === 52) {
            this.addBatImpulseToBall();
        }
    };

    this.update = function () {
        switch (_iGameState) {
            case STATE_INIT:
                {
                    this._updateInit();
                }
                break;
            case STATE_PLAY:
                {
                    this._updatePlay();
                }
                break;
            case STATE_FINISH:

                break;
            case STATE_PAUSE:

                break;
        }
    };

    this._updateBall2DPosition = function () {
        if (!_bPerfectSaved) {
            this.ballPosition();
            _oBall.rolls();
        }

        _oCamera.updateProjectionMatrix();
        _oCamera.updateMatrixWorld();
    };

    s_oGame = this;

    LIVES = oData.lives;
    SCORE_BALL_CAUGHT = oData.score_ball_caught;
    START_BALL_FORCE_X = oData.ball_force_left_right_start;
    STEP_BALL_FORCE_X = oData.ball_force_left_right_step;
    MAX_BALL_FORCE_X = oData.ball_force_left_right_max;
    START_BALL_FORCE_Z = oData.ball_force_up_start;
    STEP_BALL_FORCE_Z = oData.ball_force_up_step;
    MAX_BALL_FORCE_Z = oData.ball_force_up_max;
    START_BALL_FORCE_Y = oData.ball_start_velocity;
    STEP_BALL_FORCE_Y = oData.ball_step_velocity;
    MAX_BALL_FORCE_Y = oData.ball_max_velocity;
    SCORE_PERFECT_BALL_SAVED = oData.score_perfect_ball_saved;
    BALL_SAVED_POINT = oData.perfect_ball_saved_point;
    NUM_LEVEL_FOR_ADS = oData.num_levels_for_ads;


    this._init();
}

var s_oGame;