function CScenario() {
    var _oWorld;
    var _oGroundMaterial;
    var _oBallMaterial;
    var _oWallMaterial;
    var _oGlove;
    var _oBallShape;
    var _oBallBody;
    var _oBallMesh;
    var _oFieldShape;
    var _oFieldBody;
    var _oGoalShapeLine;
    var _oGoalBodyLine;
    var _oLeftGloveBody;
    var _oRightGloveBody;

    if (SHOW_3D_RENDER)
        var _oDemo = new CANNON.Demo();


    this.getDemo = function () {
        return _oDemo;
    };

    this._init = function () {

        if (SHOW_3D_RENDER) {
            _oWorld = _oDemo.getWorld();
        } else {
            _oWorld = new CANNON.World();
        }

        _oWorld.gravity.set(0, 0, -9.81);
        _oWorld.broadphase = new CANNON.NaiveBroadphase();
        _oWorld.solver.iterations = 25;
        _oWorld.solver.tolerance = 0.00001;

        _oGroundMaterial = new CANNON.Material();
        _oBallMaterial = new CANNON.Material();
        _oWallMaterial = new CANNON.Material();
        _oGlove = new CANNON.Material();

        var oWallBallCm = new CANNON.ContactMaterial(
                _oBallMaterial, _oWallMaterial, {
                    friction: 0.1,
                    restitution: 0.5
                });

        var oGroundBallCm = new CANNON.ContactMaterial(
                _oBallMaterial, _oGroundMaterial, {
                    friction: 0.2,
                    restitution: 0.6
                });

        var oHandBallCm = new CANNON.ContactMaterial(
                _oBallMaterial, _oGlove, {
                    friction: 0.5,
                    restitution: 0.1
                });

        _oWorld.addContactMaterial(oWallBallCm);
        _oWorld.addContactMaterial(oGroundBallCm);
        _oWorld.addContactMaterial(oHandBallCm);

        s_oScenario._createBallBody();
        s_oScenario._createFieldBody();
        s_oScenario.createLineOfGoal();
        _oLeftGloveBody = s_oScenario.createHandGoalKeeper(LEFT_GLOVE_POSITION, LEFT_GLOVE);
        _oRightGloveBody = s_oScenario.createHandGoalKeeper(RIGHT_GLOVE_POSITION, RIGHT_GLOVE);
    };

    this._createFieldBody = function () {
        _oFieldShape = new CANNON.Plane();
        _oFieldBody = new CANNON.Body({mass: 0, material: _oGroundMaterial});
        _oFieldBody.addShape(_oFieldShape);
        _oFieldBody.position.z = -10;

        _oFieldBody.addEventListener("collide", function (e) {
            s_oScenario.fieldCollision();
        });

        _oWorld.addBody(_oFieldBody);
        if (SHOW_3D_RENDER)
            _oDemo.addVisual(_oFieldBody);
    };

    this.createLineOfGoal = function () {
        _oGoalShapeLine = new CANNON.Box(new CANNON.Vec3(LINE_GOAL_SIZE.width, LINE_GOAL_SIZE.depth, LINE_GOAL_SIZE.height));

        _oGoalBodyLine = new CANNON.Body({mass: 0});
        _oGoalBodyLine.addShape(_oGoalShapeLine);
        _oGoalBodyLine.position.set(GOAL_LINE_POS.x, GOAL_LINE_POS.y, GOAL_LINE_POS.z);
//        _oGoalBodyLine.collisionResponse = 0;

        _oGoalBodyLine.addEventListener("collide", function (e) {
            s_oScenario.lineGoalCollision();
        });

        _oWorld.addBody(_oGoalBodyLine);

//        if (SHOW_3D_RENDER)
//            _oDemo.addVisual(_oGoalBodyLine);
    };

    this.createHandGoalKeeper = function (oPos, iGlove) {
        var oGloveShape = new CANNON.Box(new CANNON.Vec3(GLOVE_SIZE.width, GLOVE_SIZE.depth, GLOVE_SIZE.height));

        var oGloveBody;
        oGloveBody = new CANNON.Body({mass: 0, material: _oGlove});
        oGloveBody.addShape(oGloveShape);
        oGloveBody.position.set(oPos.x, oPos.y, oPos.z);

        oGloveBody.addEventListener("collide", function (e) {
            s_oScenario.handCollision(e, iGlove);
        });

        _oWorld.addBody(oGloveBody);

        if (SHOW_3D_RENDER)
            _oDemo.addVisual(oGloveBody);

        return oGloveBody;
    };

    this._createBallBody = function () {
        _oBallShape = new CANNON.Sphere(BALL_RADIUS);
        _oBallBody = new CANNON.Body({mass: BALL_MASS, material: _oBallMaterial, linearDamping: BALL_LINEAR_DAMPING,
            angularDamping: BALL_LINEAR_DAMPING * 2});

        var v3IniPos = new CANNON.Vec3(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
        _oBallBody.position.copy(v3IniPos);

        _oBallBody.addShape(_oBallShape);
        _oWorld.add(_oBallBody);
        if (SHOW_3D_RENDER)
            _oBallMesh = _oDemo.addVisual(_oBallBody);
    };

    this.addImpulse = function (oBody, oVec3) {
        var v3WorldPoint = new CANNON.Vec3(0, 0, BALL_RADIUS);
        var v3Impulse = new CANNON.Vec3(oVec3.x, oVec3.y, oVec3.z);
        oBody.applyImpulse(v3Impulse, v3WorldPoint);
    };

    this.addForce = function (oBody, oVec3) {
        var v3WorldPoint = new CANNON.Vec3(0, 0, 0);
        var v3Force = new CANNON.Vec3(oVec3.x, oVec3.y, oVec3.z);
        oBody.applyForce(v3Force, v3WorldPoint);
    };

    this.getBodyVelocity = function (oBody) {
        return oBody.velocity;
    };

    this.ballBody = function () {
        return _oBallBody;
    };

    this.ballMesh = function () {
        return _oBallMesh;
    };

    this.getCamera = function () {
        return _oDemo.camera();
    };

    this.fieldCollision = function () {
        playSound("baseball_drop_bounce_grass", 1, 0);
    };

    this.collisionWithBall = function () {
        s_oGame.lineGoalCollision();
    };

    this.setElementAngularVelocity = function (oElement, oVec3) {
        oElement.angularVelocity.set(oVec3.x, oVec3.y, oVec3.z);
    };

    this.setElementVelocity = function (oElement, oVec3) {
        var v3 = new CANNON.Vec3(oVec3.x, oVec3.y, oVec3.z);
        oElement.velocity = v3;
    };

    this.setElementLinearDamping = function (oElement, fValue) {
        oElement.linearDamping = fValue;
    };

    this.getFieldBody = function () {
        return _oFieldBody;
    };

    this.lineGoalCollision = function () {
        s_oGame.resetBallPosition();
        s_oGame.ballVisible(false);
        s_oGame.ballNotCaught();
    };

    this.handCollision = function (e, iGlove) {
        s_oGame.ballCaught(e.contact.rj, iGlove);
    };

    this.update = function () {
        _oWorld.step(PHYSICS_STEP);
    };

    this.getLeftGlovesBody = function () {
        return _oLeftGloveBody;
    };

    this.getRightGlovesBody = function () {
        return _oRightGloveBody;
    };

    this.poleCollision = function () {
        playSound("kick", 1, 0);
    };

    this.destroyWorld = function () {
        var aBodies = _oWorld.bodies;

        for (var i = 0; i < aBodies.length; i++) {
            _oWorld.remove(aBodies[i]);
        }
        _oWorld = null;
    };

    s_oScenario = this;

    if (SHOW_3D_RENDER) {
        _oDemo.addScene("Cricket Bowler Mode", this._init);
        _oDemo.start();
    } else {
        this._init();
    }

}

var s_oScenario;


