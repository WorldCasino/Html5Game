function CGfxButton(iXPos,iYPos,oSprite, oParentContainer){
    
    var _bScale;
    var _bText;
    
    var _iWidth;
    var _iHeight;
    
    var _aParams = [];
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oImage;
    var _oText;
    
    this._init =function(iXPos,iYPos,oSprite, oParentContainer){
        
        _bScale = true;
        _bText = false;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
        
        _oImage = createBitmap( oSprite);                                
        _oImage.regX = oSprite.width/2;
        _oImage.regY = oSprite.height/2;
        _iWidth = oSprite.width;
        _iHeight = oSprite.height;
        _oButton.addChild(_oImage);
       
        oParentContainer.addChild(_oButton);
        
        
        this._initListener();
    };
    
    this.unload = function(){
        if(s_bMobile){
            _oButton.off("mousedown", this.buttonDown);
            _oButton.off("pressup" , this.buttonRelease);
        } else {
            _oButton.off("mousedown", this.buttonDown);
            _oButton.off("mouseover", this.buttonOver);
            _oButton.off("mouseout", this.buttonOut);
            _oButton.off("pressup" , this.buttonRelease);
        }
       
       oParentContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this._initListener = function(){
        if(s_bMobile){
            _oButton.on("mousedown", this.buttonDown);
            _oButton.on("pressup" , this.buttonRelease);
        } else {
            _oButton.on("mousedown", this.buttonDown);
            _oButton.on("mouseover", this.buttonOver);
            _oButton.on("mouseout", this.buttonOut);
            _oButton.on("pressup" , this.buttonRelease);
        }     
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.addEventListenerWithParams = function(iEvent,cbCompleted, cbOwner,aParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams = aParams;
    };
    
    this.buttonRelease = function(){
        
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_aParams);
        }
    };
    
    this.buttonOver = function(evt){

        if(!s_bMobile){
            
            evt.target.cursor = "pointer";
            
            if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                createjs.Sound.play("click");
            }
        }
        
        if(_bScale){
            _oButton.scaleX = 0.9;
            _oButton.scaleY = 0.9;
            
        }

        if(_bText){
            _oText.setVisible(true);
        }
        
    };
    
    this.buttonOut = function(){
        if(_bScale){
            _oButton.scaleX = 1;
            _oButton.scaleY = 1;
        }   
        
        if(_bText){
            _oText.setVisible(false);
        }
        
    };
    
    this.buttonDown = function(){
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;
        
        
        if(s_bMobile){
            if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                createjs.Sound.play("click");
            }
        }
       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN],_aParams);
       }
    };
    
    this.setScaleOn = function(bVal){
        _bScale = bVal;
    };
    
    this.addTextOn = function(szText, szType){
        _bText = true;
        if(szType === "left"){
            _oText = new CFormatText(-_iWidth/2, -_iHeight/2 - 10, szText, "#ffe400", _oButton, "#ac5124", 14);
            _oText.setAlign("left");
        } else if(szType === "center"){
            _oText = new CFormatText(0, -_iHeight/2 - 10, szText, "#ffe400", _oButton, "#ac5124", 14);
            _oText.setAlign("center");
        } else if(szType === "bot"){
            _oText = new CFormatText(0, +_iHeight/2 + 12, szText, "#ffe400", _oButton, "#ac5124", 14);
            _oText.setAlign("center");
        }
        
        _oText.setVisible(false);
        
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };
    
    
    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this.reverseSprite = function(){
        _oImage.scaleX = -1;
    };

    this._init(iXPos,iYPos,oSprite, oParentContainer);
    
    return this;
}
function CGame(oData, iLevel){
    var _bTouchActive;
    var _bBlock;
    var _bInitGame;
    var _bTimeSpawn;
    var _bChangingItemSpawn;
    var _bClockSoundPlayed;
    var _bTremble = false;
    var _bAlternateTremble = false;
    var _bStartHintTimer = false;
    var _bSpawnBomb;
    var _bAllowBomb;
    var _bAllowChanging;
    
    var _aGrid;
    var _aItemsToDestroy;
    var _aColToReplace;
    var _aItemsToFall;
    var _aHorizontalMatch;
    var _aVerticalMatch;
    var _aParticle;
    var _aGridSwapInfo;
    var _aHintArray;
    var _aStepNumItems;
    
    var _iNumItems;
    var _iCountBomb;
    var _iScore;
    var _iTimeBonusScore;
    var _iSwappedCount;
    var _iMaxCol;
    var _iMaxRow;
    var _iTypeToSwap1;
    var _iTypeToSwap2;
    var _iFallCount;
    var _iTimeElaps;
    var _iTimeTimer;
    var _iGridOffset;
    var _iIdInterval;
    var _iCurTrembleIndex = 0;
    var _iCellSize;
    var _iHintTimer;
    var _iCounterChangeNumFruits = 0;
    var _iCurLevelTime;

    var _oGridContainer;
    var _oParticleContainer;
    var _oPanelContainer;
    var _oCellSelected;
    var _oCellToSwap;
    var _oTarget;
    var _oPickRandomHint = null;
    var _oFruitSpritesheet;
    
    var _oInterface;
    var _oEndPanel = null;
    var _oPausePanel;
    var _oParent;
    var _oHammer;
    
    this._init = function(){
        
        _oFruitSpritesheet = new CSpriteSheets();
        
        _bTouchActive=false;
        _bInitGame=false;
        _bTimeSpawn=false;
        _bChangingItemSpawn=false;
        _bClockSoundPlayed = false;
        _bSpawnBomb = false;
        _bAllowBomb = true;
        _bAllowChanging = false;
        
        _iScore=0;
        _iSwappedCount = 0;
        _iFallCount = 0;
        _iNumItems = CONFIG[iLevel].numitems;
        _iCountBomb = 0;
        _iCountBomb = 0;
        _iTimeElaps = STARTING_TIME + 1000;
        _iCurLevelTime = _iTimeElaps;
        _iTimeTimer = TIMER_CLOCK_SPAWN[iLevel];
        _iHintTimer = 0;        

        if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){ 
            s_oSoundtrack.play();
            s_oSoundtrack.volume = 0.5;
        }

        _aParticle = new Array();
        _aStepNumItems = new Array(false,false,false,false);

        _oCellSelected = null;
        
        var _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(_oBg);//Draws on canvas      
        
        _iGridOffset = 20;
        
        _oGridContainer = new createjs.Container();
        _oGridContainer.x = CANVAS_WIDTH/2;
        _oGridContainer.y = CANVAS_HEIGHT/2 - _iGridOffset;
        s_oStage.addChild(_oGridContainer);
        
        _oParticleContainer = new createjs.Container();
        _oParticleContainer.x = CANVAS_WIDTH/2;
        _oParticleContainer.y = CANVAS_HEIGHT/2 - _iGridOffset;
        s_oStage.addChild(_oParticleContainer);
        
        _iMaxCol = LEVEL_MATRIX[iLevel][0].length;
        _iMaxRow = LEVEL_MATRIX[iLevel].length;
    
        this._buildLevel();
        
        var oSprite = s_oSpriteLibrary.getSprite('target');
        _oTarget = createBitmap(oSprite);
        _oTarget.regX = oSprite.width/2;
        _oTarget.regY = oSprite.height/2;
        _oTarget.visible = false;
        _oGridContainer.addChild(_oTarget);
    
        this.initialMatch();

        _bBlock = false;
        
        _oInterface = new CInterface(iLevel);
        _oPanelContainer = _oInterface.getPanelContainer();
        _oInterface.refreshTime(_iTimeElaps -1000, 1);
        
        new CHelpPanel();
        
        if(s_bMobile){
            this._initHammer();
        }
       
    };
    
    this._initHammer = function(){
       _oHammer = new Hammer(s_oCanvas);
       _oHammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
       _oHammer.get('swipe').set({ velocity: 0.005});
       _oHammer.get('swipe').set({ threshold: 0.1 });

       
       _oHammer.on("swipeleft",function(){_oParent._swipeControl("left");});
       _oHammer.on("swiperight",function(){_oParent._swipeControl("right");});
       _oHammer.on("swipeup",function(){_oParent._swipeControl("up");});
       _oHammer.on("swipedown",function(){_oParent._swipeControl("down");});
    };
    
    this._swipeControl = function(szType){
        
        if(_oCellSelected === null || _bBlock){
            return;
        }
        _bBlock = true;
        switch(szType) {
            case "left":{   
                    if(_oCellSelected.col === 0 || _aGrid[_oCellSelected.row][_oCellSelected.col-1].getType() === CELL_STATE_DISABLE || 
                            _aGrid[_oCellSelected.row][_oCellSelected.col-1].getType() === TYPE_BOMB || _aGrid[_oCellSelected.row][_oCellSelected.col-1].getType() === TYPE_CHANGING){
                       _bBlock = false;
                       return;
                    }
                   _oCellToSwap = {row: _oCellSelected.row, col: _oCellSelected.col-1, cell: null};
                   
                
                break;
            }
            case "right":{                    
                    if(_oCellSelected.col === _iMaxCol-1 || _aGrid[_oCellSelected.row][_oCellSelected.col+1].getType() === CELL_STATE_DISABLE ||
                            _aGrid[_oCellSelected.row][_oCellSelected.col+1].getType() === TYPE_BOMB || _aGrid[_oCellSelected.row][_oCellSelected.col+1].getType() === TYPE_CHANGING){
                       _bBlock = false;
                       return;
                    }
                    _oCellToSwap = {row: _oCellSelected.row, col: _oCellSelected.col +1, cell: null};
                
                break;
            }
            case "up":{
                    if(_oCellSelected.row === 0 || _aGrid[_oCellSelected.row-1][_oCellSelected.col].getType() === CELL_STATE_DISABLE ||
                            _aGrid[_oCellSelected.row-1][_oCellSelected.col].getType() === TYPE_BOMB || _aGrid[_oCellSelected.row-1][_oCellSelected.col].getType() === TYPE_CHANGING){
                       _bBlock = false;
                       return;
                    }
                    _oCellToSwap = {row: _oCellSelected.row -1, col: _oCellSelected.col, cell: null};
                
                break;
            }
            case "down":{
                    if(_oCellSelected.row === _iMaxRow -1 || _aGrid[_oCellSelected.row+1][_oCellSelected.col].getType() === CELL_STATE_DISABLE ||
                            _aGrid[_oCellSelected.row+1][_oCellSelected.col].getType() === TYPE_BOMB || _aGrid[_oCellSelected.row+1][_oCellSelected.col].getType() === TYPE_CHANGING){
                       _bBlock = false;
                       return;
                    }
                    _oCellToSwap = {row: _oCellSelected.row +1, col: _oCellSelected.col, cell: null};
                
                break;
            }
        }    
        
        this._swapItems();
        
    };  
    
    this._createRandomItem = function(){
        
        var iType = Math.floor(Math.random()*_iNumItems);
        
        if (CONFIG[iLevel].bomballowed){
            
            if (_bSpawnBomb && _bAllowBomb){
                iType = TYPE_BOMB;
                _bSpawnBomb = false;
                _bAllowBomb = false;
            }
        }
        
        if (CONFIG[iLevel].clockallowed && _bTimeSpawn){
            
            var iTimeRemaining = _iTimeElaps/1000;
            var iProb = Math.random();

            if (iTimeRemaining < 15){
                //This means 2% of timer item prob
                iProb = iProb * 50;
            } else if (iTimeRemaining < 30){
                //This means 1,11% of timer item prob
                iProb = iProb * 90;
            } else if (iTimeRemaining < 60){
                //This means 0,5% of timer item prob
                iProb = iProb * 200;
            } else{
                //This means 0,25% of timer item prob
                iProb = iProb * 400;
            }

            if (iProb < 1){
                iType = TYPE_CLOCK;
                _bTimeSpawn = false;
            }
            
        }
        
        if (CONFIG[iLevel].changingallowed && !_bChangingItemSpawn && _bAllowChanging){
            iType = TYPE_CHANGING;
            _bAllowChanging = false;
            _bChangingItemSpawn = true;
        }
        
        return iType;
    };
    
    this._shuffleLevel = function(){
        var iType; 
        for(var i=0;i<_iMaxRow;i++){
            for(var j=0;j<_iMaxCol;j++){
                if(LEVEL_MATRIX[iLevel][i][j] > 0){
                    iType = Math.floor(Math.random()*_iNumItems);
                    _aGrid[i][j].setType(iType);
                }
            }
        }        
        this.initialMatch();
        this._hintCheckMovesAvailable();
    };
    
    this._buildLevel = function(){
        
        _iCellSize = CELL_SIZE + 10;
        
        var iGridWidth =  LEVEL_MATRIX[iLevel][0].length*_iCellSize;
        var iGridHeight = LEVEL_MATRIX[iLevel].length*_iCellSize;
        var pStartGridPoint = {x: -(iGridWidth/2) +_iCellSize/2, y: -(iGridHeight)/2 +_iCellSize/2 + 10};
        
        
        
        _aGrid = new Array();
        for(var i=0; i<_iMaxRow; i++){
            _aGrid[i] = new Array();
            for(var j=0; j<_iMaxCol; j++){
                var iType = Math.floor(Math.random()*_iNumItems);
                if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_ITEM){
                    //Random Items
                    
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, iType);
                } else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_NULL) {
                    //Empty cell
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, CELL_STATE_DISABLE);
                } else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_BOMB){
                    //Bomb
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, TYPE_BOMB);
                }else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_CLOCK){
                    
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, TYPE_CLOCK);
                } else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_CHANGE){
                   
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, TYPE_CHANGING);
                }else if(LEVEL_MATRIX[iLevel][i][j] === CELL_FILL_TRAP){
           
                    _aGrid[i][j] = new CCell(pStartGridPoint.x + j*_iCellSize, pStartGridPoint.y + i*_iCellSize, i, j, _oGridContainer, iType);
                } 
                
            }
        }
    };
    
    this.initialMatch = function(){
        do{
                
            _aItemsToDestroy = new Array();
            this._matchHorizontal();
            this._matchVertical();

            var iType;
            for(var i=0; i<_aItemsToDestroy.length; i++){

                iType = Math.floor(Math.random()*_iNumItems);
                _aGrid[_aItemsToDestroy[i].row][_aItemsToDestroy[i].col].setType(iType);
                _aGrid[_aItemsToDestroy[i].row][_aItemsToDestroy[i].col].setToDelete(false);
            }

        } while (_aItemsToDestroy.length > 0)        
        
        this._refreshMatrix();
        
    };
   
    this._matchHorizontal = function(){
        var iSameColor;
        var iCurColor;
        _aStarPosition = new Array();
        _aHorizontalMatch = new Array();
        for(var i=0; i<_iMaxRow; i++){
            iCurColor = _aGrid[i][0].getType();
            iSameColor = 0;
            for(var j=0; j<_iMaxCol; j++){
                if(_aGrid[i][j].getType() === TYPE_STAR){
                    _aStarPosition.push({row:i, col:j});
                }
                
                if(_aGrid[i][j].getType() === iCurColor && j === _iMaxCol - 1 && _aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    iSameColor++;
                    if(iSameColor >= 3){
                        for(var k=0; k<iSameColor; k++){
                            _aGrid[i][j-k].setToDelete(true);
                            _aItemsToDestroy.push({row:i, col:j-k, dir:"horizontal"});
                        }
                        
                        _aHorizontalMatch.push({num:iSameColor, row:i, col:j});
                    }
                } else if(_aGrid[i][j].getType() === iCurColor && j !== _iMaxCol - 1 && _aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    iSameColor++;
                    
                } else {
                    if(iSameColor >= 3){
                        for(var k=0; k<iSameColor; k++){
                            _aGrid[i][j-1-k].setToDelete(true);
                            _aItemsToDestroy.push({row:i, col:j-1-k, dir:"horizontal"});
                        }      
                        
                        _aHorizontalMatch.push({num:iSameColor, row:i, col:j});
                    }
                    
                    iSameColor = 1;
                    iCurColor = _aGrid[i][j].getType();
                    
                }     
            } 
        }
    };
   
    this._matchVertical = function(){
        var iSameColor;
        var iCurColor;
        _aVerticalMatch = new Array();
        
        for(var j=0; j<_iMaxCol; j++){
            iCurColor = _aGrid[0][j].getType();
            iSameColor = 0;
            for(var i=0; i<_iMaxRow; i++){
                if(_aGrid[i][j].getType() === iCurColor && i === _iMaxRow - 1 && _aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    iSameColor++;
                    if(iSameColor >= 3){
                        for(var k=0; k<iSameColor; k++){
                            if(!_aGrid[i-k][j].getToDelete()){
                                _aGrid[i-k][j].setToDelete(true);
                                _aItemsToDestroy.push({row:i-k, col:j, dir:"vertical"});
                            }
                            
                        }
                        _aVerticalMatch.push({num:iSameColor, row:i, col:j});
                    }
                } else if(_aGrid[i][j].getType() === iCurColor && i !== _iMaxRow - 1 && _aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    iSameColor++;
                    
                } else {
                    if(iSameColor >= 3){
                        for(var k=0; k<iSameColor; k++){
                            if(!_aGrid[i-1-k][j].getToDelete()){
                                _aGrid[i-1-k][j].setToDelete(true);
                                _aItemsToDestroy.push({row:i-1-k, col:j, dir:"vertical"});
                            }
                            
                        }
                        _aVerticalMatch.push({num:iSameColor, row:i, col:j});
                    }
                    
                    iSameColor = 1;
                    iCurColor = _aGrid[i][j].getType();
                    
                }     
            }            
        }
    };
    
    this.callTremble = function(){
        if(!_bTremble){
            _bTremble = true;
            _iIdInterval = setInterval(function(){_oParent.tremble();},10);
        }        
    };
    
    this.tremble = function(){
        _bAlternateTremble = !_bAlternateTremble;
        var _iStrenght = 10;
        
        if(_bAlternateTremble){
            var iSignX = Math.random();
            var iNumberX = _iStrenght;
            var iDirX;
            if(iSignX < 0.5){
                iDirX = - iNumberX;             
            } else {
                iDirX = iNumberX;
            }
            var iSignY = Math.random();
            var iNumberY = _iStrenght;
           
            var iDirY;
            if(iSignY < 0.5){
                iDirY = - iNumberY;             
            } else {
                iDirY = iNumberY;
            }
            
            s_oStage.x = iDirX;
            s_oStage.y = iDirY;

        } else {
            s_oStage.x = 0;
            s_oStage.y = 0;

        }
        
        
        _iCurTrembleIndex++;
        if(_iCurTrembleIndex === 50){
            _iCurTrembleIndex = 0;
            _bTremble = false;
            clearInterval(_iIdInterval);            
        }
    };
    
    this._refreshMatrix = function(){
        for(var i=0; i<_aItemsToDestroy.length; i++){
            _aGrid[_aItemsToDestroy[i].row][_aItemsToDestroy[i].col].setToDelete(false);
        }
    };
    
    this._swapItems = function(){        
        if(_oPickRandomHint !== null){
            _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].stopAnimHint();
            _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].stopAnimHint();
            _bStartHintTimer = true;
            _iHintTimer = TIMER_HINT-2000;
        }
        
        if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
            createjs.Sound.play("swoosh");
        }
        
        var oItem1 = {x: _aGrid[_oCellSelected.row][_oCellSelected.col].getPos().x, y: _aGrid[_oCellSelected.row][_oCellSelected.col].getPos().y};
        var oItem2 = {x: _aGrid[_oCellToSwap.row][_oCellToSwap.col].getPos().x, y: _aGrid[_oCellToSwap.row][_oCellToSwap.col].getPos().y};
        _iTypeToSwap1 = _aGrid[_oCellSelected.row][_oCellSelected.col].getType();
        _iTypeToSwap2 = _aGrid[_oCellToSwap.row][_oCellToSwap.col].getType();
        
        _oCellSelected.cell = new CMovingCell(oItem1.x, oItem1.y, _iTypeToSwap1, _oGridContainer );
        _oCellToSwap.cell = new CMovingCell(oItem2.x, oItem2.y, _iTypeToSwap2, _oGridContainer );
        
        _oCellSelected.cell.move(oItem2.x, oItem2.y);
        _oCellToSwap.cell.move(oItem1.x, oItem1.y);
        
        _aGrid[_oCellSelected.row][_oCellSelected.col].setType(CELL_STATE_INVISIBLE);
        _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(CELL_STATE_INVISIBLE);
    };
    
    
    
    this._checkBombArea = function(iRow, iCol){
        _bBlock = true;
        _aGrid[iRow][iCol].setToDelete(true);
        _aItemsToDestroy = new Array();
        _iCountBomb++;
        for(var i=iRow-1; i<iRow+2; i++){
            for(var j=iCol-1; j<iCol+2; j++){
                if( (i >= 0 && i<_iMaxRow) && (j >= 0 && j<_iMaxCol) && _aGrid[i][j].getType() !== CELL_STATE_DISABLE ){
                    if(_aGrid[i][j].getType() === TYPE_BOMB && !_aGrid[i][j].getToDelete()){
                        _oParent._checkBombArea(i,j);
                    }
                    
                    if((_aGrid[i][j].getType() !== TYPE_BOMB) && (_aGrid[i][j].getType() !== TYPE_CHANGING) ){
                        _aGrid[i][j].setToDelete(true);
                    }                    
                }                    
            }
        }       
    };
    
    this._detonateBomb = function(iRow, iCol){
        
        if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
            createjs.Sound.play("bomb_explosion");
        }
        
        this.callTremble();
        
        this._checkBombArea(iRow, iCol); //Recursive find near bomb
        var iNumItemsFind = 0;
        for(var i=0; i<_iMaxRow; i++){
            for(var j=0; j<_iMaxCol; j++){
                if(_aGrid[i][j].getToDelete()){
                    _aItemsToDestroy.push({row:i, col:j, dir:"random"});
                    iNumItemsFind++;
                }
            }
        } 
        
        var iPartialScore = (_aItemsToDestroy.length-_iCountBomb)*SCORES_FOR_SINGLE + _iCountBomb*SCORES_FOR_BOMB;
        this._updateScore(iPartialScore);
        _iCountBomb = 0;
        this._explosion();
    };
    
    this._checkSameItems= function(iType, iRow, iCol){
        var iNumItemsFind = 0;
        for(var i=0; i<_iMaxRow; i++){
            for(var j=0; j<_iMaxCol; j++){
                if(_aGrid[i][j].getType() === iType){
                    _aItemsToDestroy.push({row:i, col:j, dir:"random"});
                    iNumItemsFind++;
                }
            }
        }
        
        this._addNewTime(0,iRow, iCol,iNumItemsFind*1000,"changing"); 
    };
    
    this.checkCellClicked = function(iRow, iCol, iType){
        if(_bBlock){
            return;
        }

        if(iType === TYPE_BOMB){
            //Bomb clicked
            if(_oPickRandomHint !== null){
                _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].stopAnimHint();
                _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].stopAnimHint();
            }
            this._detonateBomb(iRow, iCol);
            _oTarget.visible = false;
            return;
        }
        
        if(iType === TYPE_CLOCK){
            if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                createjs.Sound.play("hourglass_explosion");
            }
            
            if(_oPickRandomHint !== null){
                _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].stopAnimHint();
                _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].stopAnimHint();
            }
            
            _bBlock = true;
            
            this._addNewTime(0,iRow, iCol, TIME_TO_ADD,"changing"); 

            
            _aItemsToDestroy.push({row:iRow, col:iCol});
            _oTarget.visible = false;
            this._explosion();
            return;
            
        }
        
        if(_aGrid[iRow][iCol].getType() === TYPE_CHANGING){
            
            if(_oPickRandomHint !== null){
                _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].stopAnimHint();
                _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].stopAnimHint();
            }
            
            _bBlock = true;
            _aItemsToDestroy.push({row:iRow, col:iCol});
            _oTarget.visible = false;
            this._checkSameItems(iType, iRow, iCol);
            this._updateScore(_aItemsToDestroy.length*SCORES_FOR_SINGLE);
            this._explosion();
            return;
        }
        
        if(_oCellSelected === null){
            _oCellSelected = {row: iRow, col: iCol, cell: null};
            _oTarget.visible = true;
            _oTarget.x = _aGrid[iRow][iCol].getPos().x;
            _oTarget.y = _aGrid[iRow][iCol].getPos().y;
        } else if(_oCellSelected.row === iRow && _oCellSelected.col === iCol){
            return;
            
        }else if ( ((Math.abs(iRow - _oCellSelected.row) < 2) &&  ((iCol - _oCellSelected.col) === 0)) ||
                        (((iRow - _oCellSelected.row) === 0) &&  (Math.abs(iCol - _oCellSelected.col) < 2))  ){

            _oCellToSwap = {row: iRow, col: iCol, cell: null};
            _bBlock = true;
            this._swapItems();
            
        } else {
            _oCellSelected = {row: iRow, col: iCol, cell: null};
            _oTarget.x = _aGrid[iRow][iCol].getPos().x;
            _oTarget.y = _aGrid[iRow][iCol].getPos().y;
        }
    };
    
    this.checkMatch = function(){
        _iSwappedCount++;
        if(_iSwappedCount === 2){            
            _aItemsToDestroy = new Array();            
            _aGrid[_oCellSelected.row][_oCellSelected.col].setType(_iTypeToSwap2);
            _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(_iTypeToSwap1);
            
            this._matchHorizontal();
            this._matchVertical();            
            
            if(_aItemsToDestroy.length > 0){
                //SWAP VALID
                _iCountBomb = _iCountBomb + _aItemsToDestroy.length;
                this._explosion();
            } else {

                if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                    createjs.Sound.play("swoosh");
                }

                var oItem1 = {x: _aGrid[_oCellSelected.row][_oCellSelected.col].getPos().x, y: _aGrid[_oCellSelected.row][_oCellSelected.col].getPos().y};
                var oItem2 = {x: _aGrid[_oCellToSwap.row][_oCellToSwap.col].getPos().x, y: _aGrid[_oCellToSwap.row][_oCellToSwap.col].getPos().y};
                
                _aGrid[_oCellSelected.row][_oCellSelected.col].setType(_iTypeToSwap1);
                _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(_iTypeToSwap2);
                
                _oCellSelected.cell.moveBack(oItem1.x, oItem1.y);
                _oCellToSwap.cell.moveBack(oItem2.x, oItem2.y);
                
                _aGrid[_oCellSelected.row][_oCellSelected.col].setType(CELL_STATE_INVISIBLE);
                _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(CELL_STATE_INVISIBLE);
                            
                            
            }
            
            _iSwappedCount = 0;
        }
    };
    
    this._explosion = function(){
        _iHintTimer = 0;

        if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){
            if(Math.random()<0.5){
                createjs.Sound.play("break");
            }else {
                createjs.Sound.play("break2");
            }            
        }

        var iRow;
        var iCol;
        _aColToReplace = new Array();
        for(var i=0; i<_iMaxCol; i++){
            _aColToReplace[i] = 0;
        }
        
        for(var i=0; i<_aItemsToDestroy.length; i++){
            iRow = _aItemsToDestroy[i].row;
            iCol = _aItemsToDestroy[i].col;
            
            _aColToReplace[iCol]++;            
            
            
            
            _aGrid[iRow][iCol].setType(CELL_STATE_MATCHED, _aItemsToDestroy[i].dir);
        }
        
        _oTarget.visible = false;
        
        this._updateMatchScore();
        
        setTimeout(this._fallItems, 500);
        
    };
    
    this._fallItems = function(){
        
        ////////BUILD ALL ITEMS TO BEING FALL
        
        
        var aTypeArray = new Array();        
        for(var i=0; i<_aColToReplace.length; i++){
            for(var j=0; j<_aColToReplace[i]; j++){
                aTypeArray.push(_oParent._createRandomItem());
            }
        }
        shuffle(aTypeArray);
        
        _aItemsToFall = new Array();
        for(var i=0; i<_iMaxCol; i++){          
            if(_aColToReplace[i] > 0){                
                
                var iType;
                var bFlag = false;
                for(var k=_iMaxRow-1; k>=0; k--){
                    if(_aGrid[k][i].getType() === CELL_STATE_MATCHED){
                        bFlag = true;
                    }

                    if(_aGrid[k][i].getType() >= 0 && bFlag){
                        _aItemsToFall.push({
                                        jump:0,
                                        startrow: k,
                                        endrow: null,
                                        col: i, 
                                        cell: new CMovingCell(_aGrid[k][i].getPos().x, _aGrid[k][i].getPos().y, _aGrid[k][i].getType(), _oGridContainer )});

                    }                    
                }
                for(var j=0; j<_aColToReplace[i]; j++){
                    iType = aTypeArray.pop();
                    _aItemsToFall.push({
                                        jump:0,
                                        startrow: -(j+1),
                                        endrow: null,
                                        col: i, 
                                        cell: new CMovingCell(_aGrid[0][i].getPos().x, _aGrid[0][i].getPos().y -_iCellSize*(j+1), iType, _oGridContainer )});                    
                }
            }
        }        
        
        ////////DETECT POSITION OF THE FALL
        var iIndex = 0;
        for(var i=0; i<_iMaxCol; i++){
            
            if(_aColToReplace[i] > 0){
             
                var aColImage = new Array();
                for(var j=0; j<_iMaxRow; j++){
                    aColImage[j] = _aGrid[j][i].getType();
                }
                
                var bFlag = false;
                for(var k=_iMaxRow-1; k>=0; k--){
                    if(_aGrid[k][i].getType() === CELL_STATE_MATCHED){
                        bFlag = true;
                    }                    
                    if(_aGrid[k][i].getType() >= 0 && bFlag){                      
                        _aGrid[k][i].setType(CELL_STATE_INVISIBLE);
                    }                    
                }
                
                for(var j=_iMaxRow-1; j>=0; j--){
                    if(aColImage[j] === CELL_STATE_MATCHED){
                        _aItemsToFall[iIndex].endrow = j;
                        _aItemsToFall[iIndex].jump = j - _aItemsToFall[iIndex].startrow;
                        var bFlag = false;
                        for(var k=_iMaxRow-1; k>=0; k--){
                            if(aColImage[k] === CELL_STATE_MATCHED){
                                bFlag = true;
                            }
                            if(aColImage[k] >= 0 && bFlag){
                                aColImage[k] = CELL_STATE_MATCHED;
                                break;
                            }                            
                        }
                        
                        iIndex++;                        
                    }
                }    
            }            
        }
            
        
        //////FALL ITEMS
        for(var i=0; i<_aItemsToFall.length; i++){
            var iX = _aGrid[_aItemsToFall[i].endrow][_aItemsToFall[i].col].getPos().x;
            var iY = _aGrid[_aItemsToFall[i].endrow][_aItemsToFall[i].col].getPos().y;
            var iJump = _aItemsToFall[i].jump;
            
            _aItemsToFall[i].cell.fall(iX, iY, iJump);
        }        
    };
    
    this.onFinishFall = function(){
        _iFallCount++;
        if(_iFallCount === _aItemsToFall.length){
            _iFallCount = 0;
            /////SET GRID WITH ITEMS TYPE
            for(var i=0; i<_aItemsToFall.length; i++){
                
                _aItemsToFall[i].cell.unload();
                
                var iRow = _aItemsToFall[i].endrow;
                var iCol = _aItemsToFall[i].col;
                var iType = _aItemsToFall[i].cell.getType();
                _aGrid[iRow][iCol].setType(iType);
            }
            
            if(_bInitGame === false){
                return;
            }
            
            //// CHECK FURTHER EXPLOSION
            this._refreshMatrix();   

            _aItemsToDestroy = new Array();
            
            this._matchHorizontal();
            this._matchVertical();
            
            if(_aItemsToDestroy.length > 0){
                //SWAP VALID
                this._explosion();
            } else {
                if(_oCellSelected !== null){
                    if(_oCellSelected.cell !== null){
                        _oCellSelected.cell.unload();
                        _oCellToSwap.cell.unload();
                    }                    
                }
                
                _oCellToSwap = null;
                _oCellSelected = null; 
                _bBlock = false;
                _bAllowBomb = true;
                _bChangingItemSpawn = false;
                for(var i=0; i<_iMaxRow; i++){
                    for(var j=0; j<_iMaxRow; j++){
                        if(_aGrid[i][j].getType()=== TYPE_CHANGING){
                            _bChangingItemSpawn = true;
                        }
                    }
                }
                this._hintCheckMovesAvailable();
                
            }            
        }               
    };
    
    
    this._hintCheckMovesAvailable = function(){
      
        
        _aHintArray = new Array();
        _oPickRandomHint = null;
        var bSpecialElement = false; 
        //INIT TEMP GRID
        _aGridSwapInfo = new Array();      
        for(var i=0;i<_iMaxRow;i++){
            _aGridSwapInfo[i] = new Array();            
            for(var j=0;j<_iMaxCol;j++){
                _aGridSwapInfo[i][j] = {type : _aGrid[i][j].getType(), check_up: false, check_down: false, check_left: false, check_right: false};
                if(_aGridSwapInfo[i][j].type === 9 || _aGridSwapInfo[i][j].type === 10 || _aGridSwapInfo[i][j].type === 11){
                    bSpecialElement = true; 
                }
            }
        }
        
        //START CHECK MOVES
        for(var i=0;i<_iMaxRow;i++){
            for(var j=0;j<_iMaxCol;j++){
                if(_aGrid[i][j].getType()>= 0 && _aGrid[i][j].getType() <  TYPE_STAR){
                    this._hintMoveAndCheck(i, j);  
                }  
            }
        }

        if(_aHintArray.length > 0){
            _bStartHintTimer = true;
            _oPickRandomHint = _aHintArray[Math.floor(Math.random()*_aHintArray.length)];
        } else {
            _bStartHintTimer = false;
            _oPickRandomHint = null;
            if(!bSpecialElement){

               var oShuffleText = new CFormatText(-300, CANVAS_HEIGHT/2, TEXT_SHUFFLE, "#ffffff", s_oStage, "#000000", 50);
                oShuffleText.setOutline(10);

                createjs.Tween.get(oShuffleText.getText()).to({x: CANVAS_WIDTH/2}, 500, createjs.Ease.quintOut).wait(1000).call(function(){
                    _oParent._shuffleLevel();
                    _oParent.callTremble();
                    createjs.Tween.get(oShuffleText.getText()).to({x: CANVAS_WIDTH + 300}, 500, createjs.Ease.backIn).call(function(){s_oStage.removeChild(oShuffleText);});
                });
            }
        }
    };
    
    this._hintMoveAndCheck = function(iRow, iCol){
        
        //CHECK UP        
        if(iRow > 0 && !_aGridSwapInfo[iRow][iCol].check_up && _aGridSwapInfo[iRow-1][iCol].type>= 0 && _aGridSwapInfo[iRow-1][iCol].type <  TYPE_STAR){
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow-1][iCol].getType();
            _aGridSwapInfo[iRow-1][iCol].type = _aGrid[iRow][iCol].getType();
            
            var bCol = this._hintCheckColumn(_aGridSwapInfo, iCol);
            var bRow = this._hintCheckRow(_aGridSwapInfo, iRow);
            var bRow1 = this._hintCheckRow(_aGridSwapInfo, iRow-1);
            
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol].getType();
            _aGridSwapInfo[iRow-1][iCol].type = _aGrid[iRow-1][iCol].getType();
            _aGridSwapInfo[iRow][iCol].check_up = true;
            _aGridSwapInfo[iRow-1][iCol].check_down =  true;
            
            if(bCol || bRow || bRow1){
                _aHintArray.push({element0row:iRow, element0col:iCol, element1row:iRow-1, element1col:iCol});
                //trace("UP")
            }
        }
        
        //CHECK DOWN
        if(iRow < _iMaxRow-1 && !_aGridSwapInfo[iRow][iCol].check_down && _aGridSwapInfo[iRow+1][iCol].type>= 0 && _aGridSwapInfo[iRow+1][iCol].type <  TYPE_STAR){
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow+1][iCol].getType();
            _aGridSwapInfo[iRow+1][iCol].type = _aGrid[iRow][iCol].getType();
            
            var bCol = this._hintCheckColumn(_aGridSwapInfo, iCol);
            var bRow = this._hintCheckRow(_aGridSwapInfo, iRow);
            var bRow1 = this._hintCheckRow(_aGridSwapInfo, iRow+1);
            
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol].getType();
            _aGridSwapInfo[iRow+1][iCol].type = _aGrid[iRow+1][iCol].getType();
            _aGridSwapInfo[iRow][iCol].check_down = true;
            _aGridSwapInfo[iRow+1][iCol].check_up =  true;
            
            if(bCol || bRow || bRow1){
                _aHintArray.push({element0row:iRow, element0col:iCol, element1row:iRow+1, element1col:iCol});
                //trace("DOWN")
            }
        }

        //CHECK LEFT        
        if(iCol > 0 && !_aGridSwapInfo[iRow][iCol].check_left && _aGridSwapInfo[iRow][iCol-1].type>= 0 && _aGridSwapInfo[iRow][iCol-1].type){
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol-1].getType();
            _aGridSwapInfo[iRow][iCol-1].type = _aGrid[iRow][iCol].getType();
            
            var bRow = this._hintCheckRow(_aGridSwapInfo, iRow);
            var bCol = this._hintCheckColumn(_aGridSwapInfo, iCol);
            var bCol1 = this._hintCheckColumn(_aGridSwapInfo, iCol-1);
            
            
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol].getType();
            _aGridSwapInfo[iRow][iCol-1].type = _aGrid[iRow][iCol-1].getType();
            _aGridSwapInfo[iRow][iCol].check_left = true;
            _aGridSwapInfo[iRow][iCol-1].check_right =  true;
            
            if(bRow || bCol || bCol1){
                _aHintArray.push({element0row:iRow, element0col:iCol, element1row:iRow, element1col:iCol-1});
                //trace("LEFT")
            }
        }

        //CHECK RIGHT
        if(iCol < _iMaxCol-1 && !_aGridSwapInfo[iRow][iCol].check_right && _aGridSwapInfo[iRow][iCol+1].type>= 0 && _aGridSwapInfo[iRow][iCol+1].type){
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol+1].getType();
            _aGridSwapInfo[iRow][iCol+1].type = _aGrid[iRow][iCol].getType();
            
            var bRow = this._hintCheckRow(_aGridSwapInfo, iRow);
            var bCol = this._hintCheckColumn(_aGridSwapInfo, iCol);
            var bCol1 = this._hintCheckColumn(_aGridSwapInfo, iCol+1);
            
            _aGridSwapInfo[iRow][iCol].type = _aGrid[iRow][iCol].getType();
            _aGridSwapInfo[iRow][iCol+1].type = _aGrid[iRow][iCol+1].getType();
            _aGridSwapInfo[iRow][iCol].check_right = true;
            _aGridSwapInfo[iRow][iCol+1].check_left =  true;
            
            if(bRow || bCol || bCol1){
                _aHintArray.push({element0row:iRow, element0col:iCol, element1row:iRow, element1col:iCol+1});
                //trace("RIGHT")
            }
        }
    };
    
    this._hintCheckColumn = function(aGrid, iCol){
        var iCurColor = aGrid[0][iCol];
        var iSameColor = 0;
        for(var i=0; i<_iMaxRow; i++){
            if(aGrid[i][iCol].type === iCurColor && aGrid[i][iCol].type>= 0 && aGrid[i][iCol].type <  TYPE_STAR){
                
                iSameColor++;               

            } else {
                
                iSameColor = 1;
                iCurColor = aGrid[i][iCol].type;
            }
            
            if(iSameColor >= 3){
                return true;
            }            
        }
        
        return false;        
    };
    
    this._hintCheckRow = function(aGrid, iRow){
        var iCurColor = aGrid[iRow][0];
        var iSameColor = 0;
        for(var i=0; i<_iMaxCol; i++){
            if(aGrid[iRow][i].type === iCurColor && aGrid[iRow][i].type>= 0 && aGrid[iRow][i].type <  TYPE_STAR){
                
                iSameColor++;               

            } else {
                
                iSameColor = 1;
                iCurColor = aGrid[iRow][i].type;
            }
            
            if(iSameColor >= 3){
                return true;
            }            
        }
        
        return false;        
    };
    
    this._revealHint = function(){
         
        _aGrid[_oPickRandomHint.element0row][_oPickRandomHint.element0col].animHint();
        _aGrid[_oPickRandomHint.element1row][_oPickRandomHint.element1col].animHint();
     
    };
    
    this.printMatrix = function(aGrid){        
        var res = "";

        for (var i = 0; i < _iMaxRow; i++) {
            for (var j = 0; j < _iMaxCol; j++) {
                res += aGrid[i][j].type +"|";
            }
            res += "\n";

        }
        trace(res);        
    };
    
    this.returnInPosition = function(){
        _iSwappedCount++;
        if(_iSwappedCount === 2){
            _aGrid[_oCellSelected.row][_oCellSelected.col].setType(_iTypeToSwap1);
            _aGrid[_oCellToSwap.row][_oCellToSwap.col].setType(_iTypeToSwap2);
            
            _oCellSelected.cell.unload();
            _oCellToSwap.cell.unload();
            
            _oCellToSwap = null;
            _oCellSelected = null;
            _oTarget.visible = false;
            _iSwappedCount = 0;
            _bBlock = false;
        }        
    };  
    
    this._updateMatchScore = function(){
        var  iPartialScore = 0;
        for(var i=0; i<_aHorizontalMatch.length; i++){
            for(var j=0; j<_aHorizontalMatch[i].num; j++){
                if(j > 2){
                    iPartialScore = Math.round(iPartialScore * EXTRA_ITEM_MULTIPLIER);
                } else {
                    iPartialScore += SCORES_FOR_SINGLE;
                }
            }
            
            if(_aHorizontalMatch[i].num === 4){
                this._addNewTime(_aHorizontalMatch[i].num, _aHorizontalMatch[i].row, _aHorizontalMatch[i].col, TIME_FOR_QUAD, "horizontal");
                _bSpawnBomb = true;
            } else if(_aHorizontalMatch[i].num >= 5){
                this._addNewTime(_aHorizontalMatch[i].num, _aHorizontalMatch[i].row, _aHorizontalMatch[i].col, TIME_FOR_QUINT, "horizontal");
                _bAllowChanging = true;
            }
        }
        
        for(var i=0; i<_aVerticalMatch.length; i++){
            for(var j=0; j<_aVerticalMatch[i].num; j++){
                if(j > 2){
                    iPartialScore = Math.round(iPartialScore * EXTRA_ITEM_MULTIPLIER);
                } else {
                    iPartialScore += SCORES_FOR_SINGLE;
                }                  
            }
            
            if(_aVerticalMatch[i].num === 4){
                this._addNewTime(_aVerticalMatch[i].num, _aVerticalMatch[i].row, _aVerticalMatch[i].col, TIME_FOR_QUAD, "vertical");
                _bSpawnBomb = true;
            } else if(_aVerticalMatch[i].num >= 5){
                this._addNewTime(_aVerticalMatch[i].num, _aVerticalMatch[i].row, _aVerticalMatch[i].col, TIME_FOR_QUINT, "vertical");

                _bAllowChanging = true;
            }
        }
        
        this._updateScore(iPartialScore);        
    };
    
    this._addNewTime = function(iNum, iRow, iCol, iTime, iType){
        
        var iX = _aGrid[iRow][iCol].getPos().x;
        var iY = _aGrid[iRow][iCol].getPos().y;
        if(iType === "horizontal"){
            var pPos = _oGridContainer.localToGlobal(iX -_iCellSize*iNum/2,iY);
        } else if (iType === "vertical"){
            var pPos = _oGridContainer.localToGlobal(iX,iY - _iCellSize*iNum/2);
        } else {
            var pPos = _oGridContainer.localToGlobal(iX,iY);
        }

        var iTimeToAdd = iTime/1000;

        new CScoreText("+"+iTimeToAdd+" s", pPos.x, pPos.y);

        _iTimeElaps += iTime;
        
        if(_iTimeElaps > 16000) {
            _bClockSoundPlayed = false;
            _oInterface.setTimerColor("#ffffff", "#ff0000");
        }
        if(_iTimeElaps > _iCurLevelTime){
            _iCurLevelTime = _iTimeElaps;
        }
        
    };
    
    this._updateScore = function(iPartialScore){
        _iScore += iPartialScore;
        _oInterface.refreshScore(_iScore);
        
        _iCounterChangeNumFruits = _iScore;
        if(_iCounterChangeNumFruits >= STEP_1_INCREASE_FRUITS && _iCounterChangeNumFruits < STEP_2_INCREASE_FRUITS && !_aStepNumItems[0]){
            _iNumItems = 4;
            _aStepNumItems[0] = true;
            _oFruitSpritesheet._changingNum(_iNumItems-1);
            this._levelUpMessage();
            this._updateSpritesheetToGrid();
            
        } else if(_iCounterChangeNumFruits >= STEP_2_INCREASE_FRUITS && _iCounterChangeNumFruits < STEP_3_INCREASE_FRUITS && !_aStepNumItems[1]){
            _iNumItems = 5;
            _aStepNumItems[1] = true;
            _oFruitSpritesheet._changingNum(_iNumItems-1);
            this._levelUpMessage();
            this._updateSpritesheetToGrid();
        } else if(_iCounterChangeNumFruits >= STEP_3_INCREASE_FRUITS && _iCounterChangeNumFruits < STEP_4_INCREASE_FRUITS && !_aStepNumItems[2]){
            _iNumItems = 6;
            _aStepNumItems[2] = true;
            _oFruitSpritesheet._changingNum(_iNumItems-1);
            this._levelUpMessage();
            this._updateSpritesheetToGrid();
        } else if(_iCounterChangeNumFruits >= STEP_4_INCREASE_FRUITS && !_aStepNumItems[3]){
            _iNumItems = 7;
            _aStepNumItems[3] = true;
            _oFruitSpritesheet._changingNum(_iNumItems-1);
            this._levelUpMessage();
            this._updateSpritesheetToGrid();
        }
    };
    
    this._levelUpMessage = function(){
        var oSprite = s_oSpriteLibrary.getSprite('level_up');
        var oLevelUpText = createBitmap(oSprite);//new CFormatText(-300, CANVAS_HEIGHT/2, TEXT_STAGE + " " +s_iCurLevel, "#ffffff", s_oStage, "#000000", 90);
        oLevelUpText.regX = oSprite.width/2;
        oLevelUpText.regY = oSprite.height/2;
        oLevelUpText.y = CANVAS_HEIGHT/2;
        s_oStage.addChild(oLevelUpText);

        createjs.Tween.get(oLevelUpText).to({x: CANVAS_WIDTH/2}, 500, createjs.Ease.quintOut).wait(500).to({x: CANVAS_WIDTH + 300}, 500, createjs.Ease.backIn).call(function(){
            s_oStage.removeChild(oLevelUpText);
        });
    };
    
    this._timeIsUpMessage = function(){
        
        if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                createjs.Sound.play("game_over");
            }
        
        var oSprite = s_oSpriteLibrary.getSprite('time_is_up');
        var oTimeUpText = createBitmap(oSprite);//new CFormatText(-300, CANVAS_HEIGHT/2, TEXT_STAGE + " " +s_iCurLevel, "#ffffff", s_oStage, "#000000", 90);
        oTimeUpText.regX = oSprite.width/2;
        oTimeUpText.regY = oSprite.height/2;
        oTimeUpText.y = CANVAS_HEIGHT/2;
        s_oStage.addChild(oTimeUpText);

        createjs.Tween.get(oTimeUpText).to({x: CANVAS_WIDTH/2}, 500, createjs.Ease.quintOut).wait(500).to({x: CANVAS_WIDTH + 300}, 500, createjs.Ease.backIn).call(function(){
            s_oStage.removeChild(oTimeUpText);
            s_oGame.gameOver();
        });
    };
    
    this._updateSpritesheetToGrid = function(){
        for(var i=0; i<_iMaxRow; i++){
            for(var j=0; j<_iMaxCol; j++){
                _aGrid[i][j].setNewSpritesheet();
            }
        }    
    };  
    
    this.createParticle = function(iX, iY, iType, szDir){
        _aParticle.push(new CParticle(iX, iY, iType, szDir, _oParticleContainer)); 
    };
    
    this.unload = function(){
        _bInitGame = false;
        
        _oInterface.unload();
        if(_oEndPanel !== null){
            _oEndPanel.unload();
            _oEndPanel = null;
        }
        
        _oCellSelected = null;
        for(var i=0; i<_aGrid.length; i++){
            for(var j=0; j<_aGrid[i].length; j++){
                
                _aGrid[i][j].unload();
                
            }
        }
        
        if(s_bMobile){
            _oHammer.off("swipeleft",function(){_oParent._swipeControl("left");});
            _oHammer.off("swiperight",function(){_oParent._swipeControl("right");});
            _oHammer.off("swipeup",function(){_oParent._swipeControl("up");});
            _oHammer.off("swipedown",function(){_oParent._swipeControl("down");});
        }
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
    };
    
    this.setBlock = function(bVal){
        _bBlock = bVal;
    };
    
    this.restartGame = function () {
        if(!_bBlock){
            this.unload();
            this._init();
        }        
    };
    
    this.pauseGame = function(){
        if(!_bBlock){

            _bInitGame = false;
            _oPausePanel = new CPausePanel();
            
            if(s_bMobile){
                _oHammer.off("swipeleft",function(){_oParent._swipeControl("left");});
                _oHammer.off("swiperight",function(){_oParent._swipeControl("right");});
                _oHammer.off("swipeup",function(){_oParent._swipeControl("up");});
                _oHammer.off("swipedown",function(){_oParent._swipeControl("down");});
            }
        }
    };
    
    this.resumeGame = function(){
        _bInitGame = true;
       
        _oPausePanel.unload();
        
        if(s_bMobile){
            this._initHammer();
        }
    };
 
    this.onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
        
        $(s_oMain).trigger("restart");
    };
    
    this.onExitHelp = function () {
        this._hintCheckMovesAvailable();
        
        _bInitGame = true;
        
        
    };
    
    this.gameOver = function(){  
        _bInitGame = false;

        _oEndPanel = new CEndPanel(_iScore, _iTimeBonusScore);
    };

    this._timeTimer = function(){
        _iTimeTimer -= s_iTimeElaps;
        if(_iTimeTimer < 0){
            _iTimeTimer = TIMER_CLOCK_SPAWN[iLevel];
            _bTimeSpawn = true;
        }
    };
    
    this.update = function(){
        
        if(_bInitGame){
        
            if(!_bTimeSpawn && CONFIG[iLevel].clockallowed && _iNumItems >= 5){
                this._timeTimer();
            }
        
            _iTimeElaps -= s_iTimeElaps;
            
            if(_bStartHintTimer){
                _iHintTimer += s_iTimeElaps;
                if(_iHintTimer > TIMER_HINT){
                    _bStartHintTimer = false;
                    _iHintTimer = 0;
                    this._revealHint();
                }
            };
            
            if(_iTimeElaps < 16000 && !_bClockSoundPlayed){
                _bClockSoundPlayed = true;
                if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                    createjs.Sound.play("tictac");
                }
                _oInterface.setTimerColor("#ff0000", "#000000");
            }
            
            
             
            if(_iTimeElaps < 0 && _oEndPanel === null){
                _iTimeElaps = 0;
                this._timeIsUpMessage();
                _bInitGame = false;
                return;
            }
            _oInterface.refreshTime(_iTimeElaps, _iTimeElaps / (_iCurLevelTime + 1000) );     
            
        }
        
        if(_aParticle.length > 0){
            for(var i=0; i<_aParticle.length; i++){
                _aParticle[i].update();
            } 

            for(var i=_aParticle.length-1; i>=0; i--){
                if(_aParticle[i].isGone()){
                    _aParticle.splice(i,1);
                }
            }                
        }
        
    };

    s_oGame=this;
    
    SCORES_FOR_SINGLE = oData.scores_for_single;
    SCORES_FOR_BOMB = oData.scores_for_bomb;
    EXTRA_ITEM_MULTIPLIER = oData.extra_item_multiplier;
    
    TIMER_HINT = oData.hint_timer;
    
    TIME_TO_ADD = oData.hourglass_add_time;
    TIME_FOR_QUAD = oData.quad_combo_time;
    TIME_FOR_QUINT = oData.quint_combo_time;
    
    STEP_1_INCREASE_FRUITS = oData.increase_to_4_fruits_goal_score;
    STEP_2_INCREASE_FRUITS = oData.increase_to_5_fruits_goal_score;
    STEP_3_INCREASE_FRUITS = oData.increase_to_6_fruits_goal_score;
    STEP_4_INCREASE_FRUITS = oData.increase_to_7_fruits_goal_score;
    
    STARTING_TIME = oData.starting_time;
    
    _oParent=this;
    this._init();
}

var s_oGame;

function CFormatText (iX, iY, szText, szColor, oParentContainer, szGlow, iSize){
    
    var _szText;

    var _oTextOutline;
    var _oText;
    var _oTextContainer;
    
    var _oSlideText;
    
    var _oParent;
    
    this._init = function(iX, iY, szText, szColor, oParentContainer, szGlow, iSize){    
        
        _szText = szText;
        
        _oTextContainer = new createjs.Container();
        _oTextContainer.x = iX;
        _oTextContainer.y = iY;
        oParentContainer.addChild(_oTextContainer);
        
        var iDim = iSize;
        
        var szFontTag = iDim + "px";

        _oTextOutline = new createjs.Text();
        _oTextOutline.text = _szText;
        _oTextOutline.font = "bold "+szFontTag+ " "+ PRIMARY_FONT;
        _oTextOutline.color = szGlow;
        _oTextOutline.textAlign = "center";
        _oTextOutline.textBaseline = "middle";
        _oTextOutline.lineWidth = 600;
        _oTextOutline.outline = 4;
        _oTextContainer.addChild(_oTextOutline);

        _oText = new createjs.Text();
        _oText.text = _szText;
        _oText.font = "bold "+szFontTag+" " + PRIMARY_FONT;
        _oText.color = szColor;
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.lineWidth = 600;
        _oTextContainer.addChild(_oText);
       
    };
 
    this.unload = function(){
        oParentContainer.removeChild(_oTextContainer);
    };

    this.disableOutline = function(){
        _oTextContainer.removeChild(_oTextOutline);
    };
    
    this.setVisible = function(bVal){
        _oTextContainer.visible = bVal;
    };
    
    this.isVisible = function(){
        return _oTextContainer.visible;
    };

    this.setOutline = function(iVal){
        _oTextOutline.outline = iVal;
    };

    this.setShadow = function(bVal){
        if(!bVal){
            _oTextOutline.shadow = null;
        } else {
            _oTextOutline.shadow = new createjs.Shadow("#333333", 2, 2, 6);
        }
    };

    this.setAlign = function(szType){
        _oTextOutline.textAlign = szType;
        _oText.textAlign = szType;
    };

    this.setWidth = function(iWidth){
        _oTextOutline.lineWidth = iWidth;
        _oText.lineWidth = iWidth;
    };

    this.setText = function(szText){
        _oText.text = szText;
        _oTextOutline.text = szText;
    };

    this.setColor= function(szColor, szColorOutline){
        _oText.color = szColor;
        _oTextOutline.color = szColorOutline;
    };

    this.setFont = function(szFont){
        var szFontTag = iSize + "px";
        
        _oText.font = "bold "+szFontTag+ " "+ szFont;
        _oTextOutline.font = "bold "+szFontTag+ " "+ szFont;
        
    };

    this.getText = function(){
        return _oTextContainer;
    };
    
    this.setPos = function(iY){
        _oTextContainer.y = iY;
    };
    
    this.getPos = function(){
        return {x: _oTextContainer.x,  y: _oTextContainer.y};
    };
    
    this.playText = function(){      
        
        _oSlideText = "";
        
        this.setText("");
        this._slideText(0);
        
    };
    
    this._slideText = function(iIndex){
        
        _oSlideText += szText[iIndex];
        
        this.setText(_oSlideText);
        if(iIndex < szText.length-1){
            setTimeout(function(){_oParent._slideText(iIndex+1);}, 40);
        }  
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oTextContainer.x = iXPos;
         _oTextContainer.y = iYPos;
    };
    
    _oParent = this;
    
    this._init(iX, iY, szText, szColor, oParentContainer, szGlow, iSize);
    
}
function CEndPanel(iScore, iTimeBonus){
    
    var _oBg;
    var _oParent;
    var _oPanel;
    var _oGroup;    
    var _oMsgText;
    var _oScoreText;

    var _oButRetry;

    
    this._init = function(iScore, iTimeBonus){
        
        var graphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBg = new createjs.Shape(graphics);
        _oBg.alpha = 0;
        s_oStage.addChild(_oBg);
       
        _oGroup = new createjs.Container();
        _oGroup.y = -1550;

        var oSprite = s_oSpriteLibrary.getSprite('game_over_panel');

        _oPanel = createBitmap(oSprite);
        _oPanel.regX = oSprite.width/2;
        _oPanel.regY = oSprite.height/2;
        _oPanel.x = CANVAS_WIDTH/2;
        _oPanel.y = CANVAS_HEIGHT/2;        
        _oGroup.addChild(_oPanel);
        
        var iTimeComplete = 750;
        createjs.Tween.get(_oBg).to({alpha:1}, iTimeComplete, createjs.Ease.linear);

        _oBg.on("mousedown", function(){});

       
        if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
            s_oSoundtrack.volume = 0; 
        }
       
        s_oStage.addChild(_oGroup);
        
        setTimeout(function(){_oParent._addElements();}, iTimeComplete);
    };
    
    this._addElements = function(){
 
            _oMsgText = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 -100, TEXT_GAMEOVER, "#ffffff", _oGroup, "#821010", 50);
            _oMsgText.setOutline(6);
            
            _oMsgText = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 -20, TEXT_SCORE +" "+iScore, "#ffffff", _oGroup, "#821010", 30);
            _oMsgText.setOutline(4);
            
            _oButRetry = new CGfxButton(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 +100, s_oSpriteLibrary.getSprite('but_restart_big'), _oGroup);
            _oButRetry.addEventListener(ON_MOUSE_UP, this._onButRetryRelease, this);

            createjs.Tween.get(_oGroup).to({y:0}, 500, createjs.Ease.cubicIn);   
    };
    
    this.unload = function(){
        _oMsgText.unload();
        _oMsgText = null;
        
        if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){ 
              createjs.Sound.stop();  
        }
            
        _oButRetry.unload();
        _oButRetry = null;    
            
        s_oStage.removeChild(_oBg);
        s_oStage.removeChild(_oGroup);

    };
    
    this.show = function(){        
        createjs.Tween.get(_oGroup).to({y:0}, 500, createjs.Ease.backOut);

        $(s_oMain).trigger("save_score",s_iTotalScore);
    };
    
    this._onButRetryRelease = function(){
        createjs.Tween.get(_oGroup).to({y:480}, 500, createjs.Ease.backIn).call(function() {s_oGame.setBlock(false); s_oGame.restartGame();});
    };

    _oParent = this;
    this._init(iScore, iTimeBonus);
    
    return this;
}

function CCell(iX, iY, iRow, iCol, oParentContainer, iType){
    
    var _bToDelete;
    
    var _iType;
    
    var _oCellContainer;
    var _oItem;
    var _oGlowItem = null;
    var _oTarget;
    
    this._init = function(iX, iY, iRow, iCol, oParentContainer, iType){
        _bToDelete = false;
        
        _iType = iType;
        
        _oCellContainer = new createjs.Container();
        _oCellContainer.x = iX;
        _oCellContainer.y = iY;
        if(_iType >= 0){
            oParentContainer.addChild(_oCellContainer);
        } 

        
         if(_iType === TYPE_CHANGING){

            _oItem = createSprite(s_oFruitSpritesheet, "changing",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _oItem.gotoAndPlay("changing");
            _oCellContainer.addChild(_oItem);
         }else {
            _oItem = createSprite(s_oFruitSpritesheet, _iType,CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _oItem.gotoAndStop(_iType);
            _oCellContainer.addChild(_oItem);
         }

        var graphics = new createjs.Graphics().beginFill("rgba(158,158,158,0.01)").drawRect(-CELL_SIZE/2, -CELL_SIZE/2, CELL_SIZE, CELL_SIZE);
        _oTarget = new createjs.Shape(graphics);
        _oTarget.on("mousedown", this._onCellClick);
        _oCellContainer.addChild(_oTarget);
       
    };
    
    this.unload = function(){
        if(_iType >= 0){
            oParentContainer.removeChild(_oCellContainer);         
        }      
    };
    
    this.getType = function(){
        return _iType;
    };
    
    this.setType = function(iType, szDir){
        
        var iPrevType = _iType;
        _iType = iType;
        
        switch(_iType){
            
            case CELL_STATE_MATCHED:{
                    if(iPrevType === TYPE_CHANGING){
                        var iChangingType = _oItem.currentFrame;

                        s_oGame.createParticle(iX, iY, iChangingType, szDir);
                    } else {

                        s_oGame.createParticle(iX, iY, iPrevType, szDir);
                    }

                    _oItem.gotoAndStop(_iType);
                    break;
            }
            case CELL_STATE_INVISIBLE:{
                    _oItem.gotoAndStop(_iType);
                    break;
            }
            case TYPE_CHANGING:{
                    _oItem.gotoAndPlay("changing");
                    break;
            }

            default:{                    
                    _oItem.gotoAndStop(_iType);
                    break;
            }
        }
    };
    
    this.animHint = function(){
        var oParent = this;
        var iHintSpeed = 55;
        var iRot = 18;
        createjs.Tween.get(_oItem).to({rotation:-iRot},iHintSpeed).to({rotation:0},iHintSpeed).to({rotation:iRot},iHintSpeed).to({rotation:0},iHintSpeed).
                to({rotation:-iRot},iHintSpeed).to({rotation:0},iHintSpeed).to({rotation:iRot},iHintSpeed).to({rotation:0},iHintSpeed).wait(800).call(function(){oParent.animHint();});
    };
    
    this.stopAnimHint = function(){
        _oItem.rotation = 0;
        createjs.Tween.removeTweens(_oItem);
    };
    
    this.getToDelete = function(){
        return _bToDelete;
    };
    
    this.setToDelete = function(bVal){
        _bToDelete = bVal;
    };
    
    this.getPos = function(){
        return {x: iX, y: iY};
    }; 
    
    this._glowItem = function(){
        var oParent = this;
        createjs.Tween.get(_oGlowItem).to({alpha:0},1000).to({alpha:1},1000).call(function(){oParent._glowItem(_oGlowItem);});
    };
    
    this.setNewSpritesheet = function(){
        _oItem.spriteSheet = s_oFruitSpritesheet;
    };
    
    this._onCellClick = function(){
        if(_iType === TYPE_CHANGING){
            var iChangedType = _oItem.currentFrame;
            s_oGame.checkCellClicked(iRow, iCol, iChangedType);
        } else {
            s_oGame.checkCellClicked(iRow, iCol, _iType);
        }
    };
    
    this._init(iX, iY, iRow, iCol, oParentContainer, iType);

}




/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function CSpriteLibrary(){

    var _oLibSprites;
    var _iNumSprites;
    var _iCntSprites;
    var _cbCompleted;
    var _cbTotalCompleted;
    var _cbOwner;
    
    this.init = function( cbCompleted,cbTotalCompleted, cbOwner ){
        _iNumSprites = 0;
        _iCntSprites = 0;
        _cbCompleted = cbCompleted;
        _cbTotalCompleted = cbTotalCompleted;
        _cbOwner     = cbOwner;
		
        _oLibSprites = {};
    }
    
    this.addSprite = function( szKey, szPath ){
        if ( _oLibSprites.hasOwnProperty(szKey) ){
            return;
        }
        
        _oLibSprites[szKey] = { szPath:szPath, oSprite: new Image() };
        _iNumSprites++;
        
    }
    
    this.getSprite = function( szKey ){
        if (!_oLibSprites.hasOwnProperty(szKey)){
            return null;
        }else{
            return _oLibSprites[szKey].oSprite;
        }
    }
    
    this._onSpritesLoaded = function(){
        _cbTotalCompleted.call(_cbOwner);
    }
    
    
    
    this._onSpriteLoaded = function(){
        _cbCompleted.call(_cbOwner);
        if (++_iCntSprites == _iNumSprites) {
            this._onSpritesLoaded();
        }
        
    }    

    this.loadSprites = function(){
        for (var szKey in _oLibSprites) {
            _oLibSprites[szKey].oSprite["oSpriteLibrary"] = this;
            _oLibSprites[szKey].oSprite.onload = function(){
                this.oSpriteLibrary._onSpriteLoaded();
            };
            _oLibSprites[szKey].oSprite.src = _oLibSprites[szKey].szPath;
        } 
    }
    
    this.getNumSprites=function(){
        return _iNumSprites;
    }
}


var CANVAS_WIDTH = 540;
var CANVAS_HEIGHT = 960;

var EDGEBOARD_X = 15;
var EDGEBOARD_Y = 155;

var FPS_TIME      = 1000/24;
var DISABLE_SOUND_MOBILE = false;

var PRIMARY_FONT = "Walibi";
var SECONDARY_FONT = "Comic";

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;

var TYPE_STAR = 8;
var TYPE_BOMB = 9;
var TYPE_CLOCK = 10;
var TYPE_CHANGING = 11;

var PARTICLE_OFFSET = new Array();
PARTICLE_OFFSET[0] = {x: 0, y: 81};
PARTICLE_OFFSET[1] = {x: 0, y: 80};
PARTICLE_OFFSET[2] = {x: -1, y: 81};
PARTICLE_OFFSET[3] = {x: 0, y: 80};
PARTICLE_OFFSET[4] = {x: 0, y: 82};
PARTICLE_OFFSET[5] = {x: 0, y: 81};
PARTICLE_OFFSET[6] = {x: 0, y: 81};
PARTICLE_OFFSET[7] = {x: 0, y: 80};
PARTICLE_OFFSET[8] = {x: -5, y: 81};
PARTICLE_OFFSET[9] = {x: 0, y: 0};
PARTICLE_OFFSET[10] = {x: -2, y: 66};
PARTICLE_OFFSET[12] = {x: -8, y: 30};

var CELL_FILL_NULL = 0;
var CELL_FILL_ITEM = 1;
var CELL_FILL_BOMB = 2;
var CELL_FILL_STAR = 3;
var CELL_FILL_BLOCK = 4;
var CELL_FILL_CLOCK = 5;
var CELL_FILL_CHANGE = 6;
var CELL_FILL_STARANDBLOCK = 7;
var CELL_FILL_TRAP = 8;

var CELL_STATE_MATCHED = -1;
var CELL_STATE_DISABLE = -2;
var CELL_STATE_INVISIBLE = -3;

var CHEF_AUDIO_STEP_0 = 0;
var CHEF_AUDIO_STEP_1 = 1;

var CELL_SIZE = 50;
var TIME_FALL = 100;


var MAX_FRUITS_ROT_SPEED = 2;

var SCORES_FOR_SINGLE;
var SCORES_FOR_BOMB;
var EXTRA_ITEM_MULTIPLIER;

var TIMER_HINT;

var TIME_TO_ADD;
var TIME_FOR_QUAD;
var TIME_FOR_QUINT;

var STEP_1_INCREASE_FRUITS;
var STEP_2_INCREASE_FRUITS;
var STEP_3_INCREASE_FRUITS;
var STEP_4_INCREASE_FRUITS;

var STARTING_TIME;
function CVector2(iX,iY){
    
    var x;
    var y;
    
    this._init = function(iX,iY){
        x = iX;
        y = iY;
    };
    
    this.add = function( vx, vy ){
        x += vx;
        y += vy; 
    };		
		
    this.addV = function( v ){
        x += v.getX();
        y += v.getY(); 
    };
		
    this.scalarDivision = function( n ) {
        x /= n;
        y /= n;		
    };
		
    this.subV = function( v ){
        x -= v.getX();
        y -= v.getY(); 
    };	
		
    this.scalarProduct = function( n ){
        x*=n;
        y*=n;
    };
		
    this.invert = function(){
        x*=-1;
        y*=-1;		
    };
		
    this.dotProduct = function( v){
        return ( x*v.getX()+ y*v.getY()  );
    };
		
    this.set = function( fx, fy ){
        x = fx;
        y = fy;
    };
		
    this.setV = function( v ){
        x = v.getX();
        y = v.getY();
    };
		
    this.length = function(){
        return Math.sqrt( x*x+y*y );
    };
		
    this.length2 = function(){
        return x*x+y*y;
    };	
		
    this.normalize = function(){
        var len = this.length();
        if (len > 0 ){
                x/= len; y/=len; 
        }
    };
		
    this.getNormalize = function( outV ) {
        var len = this.length();
        outV.set(x,y);
        outV.normalize();
    };
		
    this.rot90CCW = function(){
        var a = x;
        x = -y;
        y = a;
    };
		
    this.rot90CW = function(){
        var a = x;
        x = y;
        y = -a;
    };

    this.getRotCCW = function( outV ) {
        outV.set( x, y );
        outV.rot90CCW();
    };
		
    this.getRotCW = function( outV ) {
            outV.set( x, y );
            outV.rot90CW();
    };
		
    this.ceil = function(){
        x = Math.ceil( x );
        y = Math.ceil( y );
    };
		
    this.round = function(){
        x = Math.round( x );
        y = Math.round( y );		
    };

    this.toString = function(){
        return "Vector2: " + x + ", " + y;
    };
		
    this.print = function(){
        trace( "Vector2: " + x + ", " + y + "" );
    };
    
    this.getX = function(){
        return x;
    };
    
    this.getY = function(){
        return y;
    };
    
    this._init(iX,iY);
}
function CToggle(iXPos,iYPos,oSprite,bActive, oParentContainer){
    var _bActive;
    var _bScale;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    
    this._init = function(iXPos,iYPos,oSprite,bActive, oParentContainer){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        _bScale = true;
        
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: oSprite.width/2, height: oSprite.height, regX: (oSprite.width/2)/2, regY: oSprite.height/2}, 
                        animations: {state_true:[0],state_false:[1]}
                   };
                   
         var oSpriteSheet = new createjs.SpriteSheet(oData);
         
        _bActive = bActive;
	_oButton = createSprite(oSpriteSheet, "state_"+_bActive,(oSprite.width/2)/2,oSprite.height/2,oSprite.width/2,oSprite.height);
         
        _oButton.x = iXPos;
        _oButton.y = iYPos; 
        _oButton.stop();
        
        oParentContainer.addChild(_oButton);
        
        this._initListener();
    };
    
    this.unload = function(){
        if(s_bMobile){
            _oButton.off("mousedown", this.buttonDown);
            _oButton.off("pressup" , this.buttonRelease);
        } else {
            _oButton.off("mousedown", this.buttonDown);
            _oButton.off("mouseover", this.buttonOver);
            _oButton.off("mouseout", this.buttonOut);
            _oButton.off("pressup" , this.buttonRelease);
        }
	   
       oParentContainer.removeChild(_oButton);
    };
    
    this._initListener = function(){
       if(s_bMobile){
            _oButton.on("mousedown", this.buttonDown);
            _oButton.on("pressup" , this.buttonRelease);
        } else {
            _oButton.on("mousedown", this.buttonDown);
            _oButton.on("mouseover", this.buttonOver);
            _oButton.on("mouseout", this.buttonOut);
            _oButton.on("pressup" , this.buttonRelease);
        }     
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.setActive = function(bActive){
        _bActive = bActive;
        _oButton.gotoAndStop("state_"+_bActive);
    };
    
    this.buttonRelease = function(){
        

        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        
        _bActive = !_bActive;
         if(!s_bMobile){
             _oButton.gotoAndStop("state_"+_bActive);
         }else{
             _oButton.gotoAndStop("state_"+_bActive);
         }
        

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_bActive);
        }
    };
    
    this.buttonOver = function(evt){
        
        
        
        if(!s_bMobile){
            
            evt.target.cursor = "pointer";
            
            if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                createjs.Sound.play("click");
            }
            
            if(_bScale){
                _oButton.scaleX = 0.9;
                _oButton.scaleY = 0.9;
            }
            
            _oButton.gotoAndStop("state_"+_bActive);    
        }else{
            _oButton.gotoAndStop("state_"+_bActive);
        }
        
    };
    
    this.buttonOut = function(){
        
        if(_bScale){
            _oButton.scaleX = 1;
            _oButton.scaleY = 1;
        }

       _oButton.gotoAndStop("state_"+_bActive);    
    };
    
    this.buttonDown = function(){
        

        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

        
        if(s_bMobile){
            if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                createjs.Sound.play("click");
            }
        }
       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setScaleOn = function(bVal){
        _bScale = bVal;
    };
    
    this._init(iXPos,iYPos,oSprite,bActive, oParentContainer);
}
var s_iScaleFactor = 1;
var s_oCanvasLeft;
var s_oCanvasTop;

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

$(window).resize(function() {
	sizeHandler();
});

function trace(szMsg){
    console.log(szMsg);
}

function getSize(Name) {
       var size;
       var name = Name.toLowerCase();
       var document = window.document;
       var documentElement = document.documentElement;
       if (window["inner" + Name] === undefined) {
               // IE6 & IE7 don't have window.innerWidth or innerHeight
               size = documentElement["client" + Name];
       }
       else if (window["inner" + Name] != documentElement["client" + Name]) {
               // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

               // Insert markup to test if a media query will match document.doumentElement["client" + Name]
               var bodyElement = document.createElement("body");
               bodyElement.id = "vpw-test-b";
               bodyElement.style.cssText = "overflow:scroll";
               var divElement = document.createElement("div");
               divElement.id = "vpw-test-d";
               divElement.style.cssText = "position:absolute;top:-1000px";
               // Getting specific on the CSS selector so it won't get overridden easily
               divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
               bodyElement.appendChild(divElement);
               documentElement.insertBefore(bodyElement, document.head);

               if (divElement["offset" + Name] == 7) {
                       // Media query matches document.documentElement["client" + Name]
                       size = documentElement["client" + Name];
               }
               else {
                       // Media query didn't match, use window["inner" + Name]
                       size = window["inner" + Name];
               }
               // Cleanup
               documentElement.removeChild(bodyElement);
       }
       else {
               // Default to use window["inner" + Name]
               size = window["inner" + Name];
       }
       return size;
};


window.addEventListener("orientationchange", onOrientationChange );


function onOrientationChange(){
    if (window.matchMedia("(orientation: portrait)").matches) {
       // you're in PORTRAIT mode	   
	   sizeHandler();
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
       // you're in LANDSCAPE mode   
	   sizeHandler();
    }
	
}


function isIphone(){
    var szRet = navigator.userAgent.toLowerCase();
    if((szRet.indexOf("iphone") !== -1)){
        return true;
    }else{
        return false;
    }
}

function getIOSWindowHeight() {
    // Get zoom level of mobile Safari
    // Note, that such zoom detection might not work correctly in other browsers
    // We use width, instead of height, because there are no vertical toolbars :)
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

    // window.innerHeight returns height of the visible area. 
    // We multiply it by zoom and get out real height.
    return window.innerHeight * zoomLevel;
};

// You can also get height of the toolbars that are currently displayed
function getHeightOfIOSToolbars() {
    var tH = (window.orientation === 0 ? screen.height : screen.width) -  getIOSWindowHeight();
    return tH > 1 ? tH : 0;
};

//THIS FUNCTION MANAGES THE CANVAS SCALING TO FIT PROPORTIONALLY THE GAME TO THE CURRENT DEVICE RESOLUTION

function sizeHandler() {
	window.scrollTo(0, 1);

	if (!$("#canvas")){
		return;
	}

	var h;
        var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

        if(iOS){
            h = getIOSWindowHeight();
        }else{ 
            h = getSize("Height");
        }
        
        var w = getSize("Width");

	var multiplier = Math.min((h / CANVAS_HEIGHT), (w / CANVAS_WIDTH));

	var destW = CANVAS_WIDTH * multiplier;
	var destH = CANVAS_HEIGHT * multiplier;
        
        var iAdd = 0;
        if (destH < h){
            iAdd = h-destH;
            destH += iAdd;
            destW += iAdd*(CANVAS_WIDTH/CANVAS_HEIGHT);
        }else  if (destW < w){
            iAdd = w-destW;
            destW += iAdd;
            destH += iAdd*(CANVAS_HEIGHT/CANVAS_WIDTH);
        }

        var fOffsetY = ((h / 2) - (destH / 2));
        var fOffsetX = ((w / 2) - (destW / 2));
        var fGameInverseScaling = (CANVAS_WIDTH/destW);

        if( fOffsetX*fGameInverseScaling < -EDGEBOARD_X ||  
            fOffsetY*fGameInverseScaling < -EDGEBOARD_Y ){
            multiplier = Math.min( h / (CANVAS_HEIGHT-(EDGEBOARD_Y*2)), w / (CANVAS_WIDTH-(EDGEBOARD_X*2)));
            destW = CANVAS_WIDTH * multiplier;
            destH = CANVAS_HEIGHT * multiplier;
            fOffsetY = ( h - destH ) / 2;
            fOffsetX = ( w - destW ) / 2;
            
            fGameInverseScaling = (CANVAS_WIDTH/destW);
        }

        s_iOffsetX = (-1*fOffsetX * fGameInverseScaling);
        s_iOffsetY = (-1*fOffsetY * fGameInverseScaling);
        
        if(fOffsetY >= 0 ){
            s_iOffsetY = 0;
        }
        
        if(fOffsetX >= 0 ){
            s_iOffsetX = 0;
        }
        
        if(s_oInterface !== null){
            s_oInterface.refreshButtonPos( s_iOffsetX,s_iOffsetY);
        }
        if(s_oMenu !== null){
            s_oMenu.refreshButtonPos( s_iOffsetX,s_iOffsetY);
        }
        
        
	$("#canvas").css("width",destW+"px");
	$("#canvas").css("height",destH+"px");
        
        if(fOffsetY < 0){
            $("#canvas").css("top",fOffsetY+"px");
        }else{
            $("#canvas").css("top","0px");
        }
        
        $("#canvas").css("left",fOffsetX+"px");

};

function createBitmap(oSprite, iWidth, iHeight){
	var oBmp = new createjs.Bitmap(oSprite);
	var hitObject = new createjs.Shape();
	
	if (iWidth && iHeight){
		hitObject .graphics.beginFill("#fff").drawRect(0, 0, iWidth, iHeight);
	}else{
		hitObject .graphics.beginFill("#ff0").drawRect(0, 0, oSprite.width, oSprite.height);
	}

	oBmp.hitArea = hitObject;

	return oBmp;
}

function createSprite(oSpriteSheet, szState, iRegX,iRegY,iWidth, iHeight){
	if(szState !== null){
		var oRetSprite = new createjs.Sprite(oSpriteSheet, szState);
	}else{
		var oRetSprite = new createjs.Sprite(oSpriteSheet);
	}
	
	var hitObject = new createjs.Shape();
	hitObject .graphics.beginFill("#000000").drawRect(-iRegX, -iRegY, iWidth, iHeight);

	oRetSprite.hitArea = hitObject;
	
	return oRetSprite;
}


function randomFloatBetween(minValue,maxValue,precision){
    if(typeof(precision) === 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
}

function rotateVector2D( iAngle, v) { 
	var iX = v.getX() * Math.cos( iAngle ) + v.getY() * Math.sin( iAngle );
	var iY = v.getX() * (-Math.sin( iAngle )) + v.getY() * Math.cos( iAngle ); 
	v.set( iX, iY );
}

function tweenVectorsOnX( vStart, vEnd, iLerp ){
    var iNewX = vStart + iLerp *( vEnd-vStart);
    return iNewX;
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

function compare(a,b) {
  if (a.index > b.index)
     return -1;
  if (a.index < b.index)
    return 1;
  return 0;
}

//----------------------
		// Linear	
		/**
		 * Interpolates a value between b and c parameters
		 * <p></br><b>Note:</b></br>
		 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
		 *
		 * @param t Elapsed time
		 * @param b Initial position
		 * @param c Final position
		 * @param d Duration
		 * @return A value between b and c parameters
		 */

function easeLinear (t, b, c, d){
			return c*t/d + b;
}

//----------------------
		// Quad		
		/**
		 * Interpolates a value between b and c parameters
		 * <p></br><b>Note:</b></br>
		 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
		 *
		 * @param t Elapsed time
		 * @param b Initial position
		 * @param c Final position
		 * @param d Duration
		 * @return A value between b and c parameters
		 */	

function easeInQuad (t, b, c, d){
			return c*(t/=d)*t + b;
		}
//----------------------
		// Sine	
		/**
		 * Interpolates a value between b and c parameters
		 * <p></br><b>Note:</b></br>
		 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
		 *
		 * @param t Elapsed time
		 * @param b Initial position
		 * @param c Final position
		 * @param d Duration
		 * @return A value between b and c parameters
		 */	                
                
function easeInSine (t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		}
                
                
                
function easeInCubic (t, b, c, d) {
			return c*(t/=d)*t*t + b;
		};                


function getTrajectoryPoint(t,p){
    var result = new createjs.Point();
    var oneMinusTSq = (1-t) * (1-t);
    var TSq = t*t;
    result.x = oneMinusTSq*p.start.x+2*(1-t)*t*p.traj.x+TSq*p.end.x;
    result.y = oneMinusTSq*p.start.y+2*(1-t)*t*p.traj.y+TSq*p.end.y;
    return result;
}

function formatTime(iTime){	
    iTime/=1000;
    var iMins = Math.floor(iTime/60);
    var iSecs = Math.floor(iTime-(iMins*60));
    //iSecs = parseFloat(iSecs).toFixed(1)
    
    var szRet = "";

    if ( iMins < 10 ){
            szRet += "0" + iMins + ":";
    }else{
            szRet += iMins + ":";
    }

    if ( iSecs < 10 ){
            szRet += "0" + iSecs;
    }else{
            szRet += iSecs;
    }	

    return szRet;
}

function degreesToRadians(iAngle){
    return iAngle * Math.PI / 180;
}

function checkRectCollision(bitmap1,bitmap2) {
    var b1, b2;
    b1 = getBounds(bitmap1,0.9);
    b2 = getBounds(bitmap2,0.98);
    return calculateIntersection(b1,b2);
}

function calculateIntersection(rect1, rect2){
    // first we have to calculate the
    // center of each rectangle and half of
    // width and height
    var dx, dy, r1={}, r2={};
    r1.cx = rect1.x + (r1.hw = (rect1.width /2));
    r1.cy = rect1.y + (r1.hh = (rect1.height/2));
    r2.cx = rect2.x + (r2.hw = (rect2.width /2));
    r2.cy = rect2.y + (r2.hh = (rect2.height/2));

    dx = Math.abs(r1.cx-r2.cx) - (r1.hw + r2.hw);
    dy = Math.abs(r1.cy-r2.cy) - (r1.hh + r2.hh);

    if (dx < 0 && dy < 0) {
      dx = Math.min(Math.min(rect1.width,rect2.width),-dx);
      dy = Math.min(Math.min(rect1.height,rect2.height),-dy);
      return {x:Math.max(rect1.x,rect2.x),
              y:Math.max(rect1.y,rect2.y),
              width:dx,
              height:dy,
              rect1: rect1,
              rect2: rect2};
    } else {
      return null;
    }
}

function getBounds(obj,iTolerance) {
    var bounds={x:Infinity,y:Infinity,width:0,height:0};
    if ( obj instanceof createjs.Container ) {
      bounds.x2 = -Infinity;
      bounds.y2 = -Infinity;
      var children = obj.children, l=children.length, cbounds, c;
      for ( c = 0; c < l; c++ ) {
        cbounds = getBounds(children[c],1);
        if ( cbounds.x < bounds.x ) bounds.x = cbounds.x;
        if ( cbounds.y < bounds.y ) bounds.y = cbounds.y;
        if ( cbounds.x + cbounds.width > bounds.x2 ) bounds.x2 = cbounds.x + cbounds.width;
        if ( cbounds.y + cbounds.height > bounds.y2 ) bounds.y2 = cbounds.y + cbounds.height;
        //if ( cbounds.x - bounds.x + cbounds.width  > bounds.width  ) bounds.width  = cbounds.x - bounds.x + cbounds.width;
        //if ( cbounds.y - bounds.y + cbounds.height > bounds.height ) bounds.height = cbounds.y - bounds.y + cbounds.height;
      }
      if ( bounds.x == Infinity ) bounds.x = 0;
      if ( bounds.y == Infinity ) bounds.y = 0;
      if ( bounds.x2 == Infinity ) bounds.x2 = 0;
      if ( bounds.y2 == Infinity ) bounds.y2 = 0;
      
      bounds.width = bounds.x2 - bounds.x;
      bounds.height = bounds.y2 - bounds.y;
      delete bounds.x2;
      delete bounds.y2;
    } else {
      var gp,gp2,gp3,gp4,imgr={},sr;
      if ( obj instanceof createjs.Bitmap ) {
        sr = obj.sourceRect || obj.image;

        imgr.width = sr.width * iTolerance;
        imgr.height = sr.height * iTolerance;
      } else if ( obj instanceof createjs.Sprite ) {
        if ( obj.spriteSheet._frames && obj.spriteSheet._frames[obj.currentFrame] && obj.spriteSheet._frames[obj.currentFrame].image ) {
          var cframe = obj.spriteSheet.getFrame(obj.currentFrame);
          imgr.width =  cframe.rect.width;
          imgr.height =  cframe.rect.height;
          imgr.regX = cframe.regX;
          imgr.regY = cframe.regY;
        } else {
          bounds.x = obj.x || 0;
          bounds.y = obj.y || 0;
        }
      } else {
        bounds.x = obj.x || 0;
        bounds.y = obj.y || 0;
      }

      imgr.regX = imgr.regX || 0; imgr.width  = imgr.width  || 0;
      imgr.regY = imgr.regY || 0; imgr.height = imgr.height || 0;
      bounds.regX = imgr.regX;
      bounds.regY = imgr.regY;
      
      gp  = obj.localToGlobal(0         -imgr.regX,0          -imgr.regY);
      gp2 = obj.localToGlobal(imgr.width-imgr.regX,imgr.height-imgr.regY);
      gp3 = obj.localToGlobal(imgr.width-imgr.regX,0          -imgr.regY);
      gp4 = obj.localToGlobal(0         -imgr.regX,imgr.height-imgr.regY);

      bounds.x = Math.min(Math.min(Math.min(gp.x,gp2.x),gp3.x),gp4.x);
      bounds.y = Math.min(Math.min(Math.min(gp.y,gp2.y),gp3.y),gp4.y);
      bounds.width = Math.max(Math.max(Math.max(gp.x,gp2.x),gp3.x),gp4.x) - bounds.x;
      bounds.height = Math.max(Math.max(Math.max(gp.y,gp2.y),gp3.y),gp4.y) - bounds.y;
    }
    return bounds;
}

function NoClickDelay(el) {
	this.element = el;
	if( window.Touch ) this.element.addEventListener('touchstart', this, false);
}
//Fisher-Yates Shuffle
function shuffle(array) {
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
}

NoClickDelay.prototype = {
handleEvent: function(e) {
    switch(e.type) {
        case 'touchstart': this.onTouchStart(e); break;
        case 'touchmove': this.onTouchMove(e); break;
        case 'touchend': this.onTouchEnd(e); break;
    }
},
	
onTouchStart: function(e) {
    e.preventDefault();
    this.moved = false;
    
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
},
	
onTouchMove: function(e) {
    this.moved = true;
},
	
onTouchEnd: function(e) {
    this.element.removeEventListener('touchmove', this, false);
    this.element.removeEventListener('touchend', this, false);
    
    if( !this.moved ) {
        var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
        
        var theEvent = document.createEvent('MouseEvents');
        theEvent.initEvent('click', true, true);
        theTarget.dispatchEvent(theEvent);
    }
}

};
function CTextButton(iX, iY, szText, szColor, oParentContainer, szGlow, iSize){
    
    var _szText;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oTarget;
    var _oText;
    var _oTextOutline;
    var _oTextBack;
    
    this._init =function(iX, iY, szText, szColor, oParentContainer, szGlow, iSize){
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();

        _szText = szText;
        
        var iDim = iSize;
        
        var szFontTag = iDim + "px";

        _oTextOutline = new createjs.Text();
        _oTextOutline.text = _szText;
        _oTextOutline.font = "bold "+szFontTag+" " + PRIMARY_FONT;
        _oTextOutline.color = szGlow;
        _oTextOutline.textAlign = "center";
        _oTextOutline.textBaseline = "middle";
        _oTextOutline.lineWidth = 400;
        _oTextOutline.outline = 8;

        _oText = new createjs.Text();
        _oText.text = _szText;
        _oText.font = "bold "+szFontTag+" " +PRIMARY_FONT;
        _oText.color = szColor;
        _oText.textAlign = "center";
        _oText.textBaseline = "middle";
        _oText.lineWidth = 400;

        var iOffsetY = 10;
        var graphics = new createjs.Graphics().beginFill("rgba(158,158,158,0.01)").
        drawRect( -_oTextOutline.getMeasuredWidth()/2, -_oTextOutline.getMeasuredHeight()/2 - iOffsetY, _oTextOutline.getMeasuredWidth(), _oTextOutline.getMeasuredHeight() +2*iOffsetY );
        _oTarget = new createjs.Shape(graphics);

        _oButton = new createjs.Container();
        _oButton.x = iX;
        _oButton.y = iY;
        _oButton.addChild(_oTextOutline, _oText, _oTarget);

        oParentContainer.addChild(_oButton);

        this._initListener();
    };
    
    this.unload = function(){
        if(s_bMobile){
            _oButton.off("mousedown", this.buttonDown);
            _oButton.off("pressup" , this.buttonRelease);
        } else {
            _oButton.off("mousedown", this.buttonDown);
            _oButton.off("mouseover", this.buttonOver);
            _oButton.off("mouseout", this.buttonOut);
            _oButton.off("pressup" , this.buttonRelease);
        }
       
       oParentContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this._initListener = function(){

       if(s_bMobile){
            _oButton.on("mousedown", this.buttonDown);
            _oButton.on("pressup" , this.buttonRelease);
        } else {
            _oButton.on("mousedown", this.buttonDown);
            _oButton.on("mouseover", this.buttonOver);
            _oButton.on("mouseout", this.buttonOut);
            _oButton.on("pressup" , this.buttonRelease);
        }     
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonOver = function(evt){
        _oButton.scaleX = 1.1;
        _oButton.scaleY = 1.1;
        _oText.color = "#ffa800";
        
        if(!s_bMobile){
            
            evt.target.cursor = "pointer";
            
            if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                createjs.Sound.play("click");
            }
        }
        
    };
    
    this.buttonOut = function(){
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;
        _oText.color = szColor;
    };
    
    this.buttonDown = function(){
        if(s_bMobile){
            if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){            
                createjs.Sound.play("click");
            }
        }

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    
    this.setTextPosition = function(iY){
        _oText.y= iY;
        _oTextBack.y = iY+2;
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.setWidth = function(iVal){
        _oTextOutline.lineWidth = iVal;
        _oText.lineWidth = iVal;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this._init(iX, iY, szText, szColor, oParentContainer, szGlow, iSize);
    
    return this;
    
}

function CSpriteSheets(){
    
    this._init = function(){
        var oSprite = s_oSpriteLibrary.getSprite('fruit_0');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[0] = new createjs.SpriteSheet(oData);


        var oSprite = s_oSpriteLibrary.getSprite('fruit_1');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[1] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_2');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[2] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_3');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[3] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_4');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[4] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_5');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[5] = new createjs.SpriteSheet(oData);

        var oSprite = s_oSpriteLibrary.getSprite('fruit_6');
        var iWidth = oSprite.width;
        var iHeight = oSprite.height;

        var oData = {   
                        framerate: 25,
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: iWidth/9, height: iHeight, regX: (iWidth/9)/2, regY: iHeight/2}, 
                        animations: {flawless: [0], slice_0:[1], slice_1:[2], slice_2:[3], slice_3:[4], slice_4:[5], slice_5:[6], slice_6:[7], slice_7:[8]}
                   };

        s_aFruitSpritesheet[6] = new createjs.SpriteSheet(oData);
        
        
        this._changingNum(CONFIG[s_iCurLevel].numitems -1);
        
    };
    
    this._changingNum = function(iNum){
        var iNumChangingItem = iNum;
        var oSprite = s_oSpriteLibrary.getSprite('fruits');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                        animations: {type_0:[0], type_1:[1], type_2:[2], type_3:[3], type_4:[4], type_5:[5], type_6:[6], type_7:[7], star:[8], bomb:[9], clock:[10], changing:[0,iNumChangingItem,"changing",0.150]}
                   };

        s_oFruitSpritesheet = new createjs.SpriteSheet(oData);
    }; 
    
    
    this._init();
}



var s_aFruitSpritesheet = new Array();
var s_oFruitSpritesheet;
function CScoreText (iScore,iX,iY){
    
    var _oScoreHit;
    
    
    this._init = function(iScore,iX,iY){

        _oScoreHit = new CFormatText(iX, iY, iScore, "#ffffff", s_oStage, "#ff0000", 35);
        _oScoreHit.setOutline(5);
        _oScoreHit.getText().alpha = 0;
        
        var oParent = this;
        createjs.Tween.get(_oScoreHit.getText()).to({alpha:1}, 400, createjs.Ease.cubicIn).call(function(){oParent.moveUp();});  
    };
	
    this.moveUp = function(){
            var iNewY = _oScoreHit.getPos().y-150;
            var oParent = this;
            createjs.Tween.get(_oScoreHit.getText()).to({y:iNewY}, 1500, createjs.Ease.sineIn).call(function(){oParent.unload();});
            createjs.Tween.get(_oScoreHit.getText()).wait(750).to({alpha:0}, 750);
    };
	
    this.unload = function(){
        _oScoreHit.unload();    
    };
	
    this._init(iScore,iX,iY);
    
}
function CPreloader(){
    var _iMaskWidth;
	var _iMaskHeight;
    var _oLoadingText;
    var _oProgressBar;
    var _oMaskPreloader;
    var _oFade;
    var _oContainer;
    
    this._init = function(){
       s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );
       s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
       s_oSpriteLibrary.addSprite("progress_bar","./sprites/progress_bar.png");

       s_oSpriteLibrary.loadSprites();
       
       _oContainer = new createjs.Container();
       s_oStage.addChild(_oContainer); 
    };
    
    this.unload = function(){
	_oContainer.removeAllChildren();
    };
    
    this.hide = function(){
        var oParent = this;
        setTimeout(function(){createjs.Tween.get(_oFade).to({alpha:1}, 500).call(function(){oParent.unload();s_oMain.gotoMenu();}); }, 1000);
    };
    
    this._onImagesLoaded = function(){
        
    };
    
    this._onAllImagesLoaded = function(){
        this.attachSprites();
        
        s_oMain.preloaderReady();
    };
    
    this.attachSprites = function(){
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oContainer.addChild(oBg);
   

        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
        _oProgressBar  = createBitmap(oSprite);
        _oProgressBar.x = CANVAS_WIDTH/2 - (oSprite.width/2);
        _oProgressBar.y = CANVAS_HEIGHT - 370;
        _oContainer.addChild(_oProgressBar);
       
       _iMaskWidth = oSprite.width;
       _iMaskHeight = oSprite.height;
       _oMaskPreloader = new createjs.Shape();
       _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1,_iMaskHeight);
	   
       _oContainer.addChild(_oMaskPreloader);
       
       _oProgressBar.mask = _oMaskPreloader;
       
       _oLoadingText = new createjs.Text(" ","30px "+PRIMARY_FONT, "#fff");
       _oLoadingText.x = CANVAS_WIDTH/2;
       _oLoadingText.y = CANVAS_HEIGHT - 325;
       _oLoadingText.shadow = new createjs.Shadow("#000", 2, 2, 2);
       _oLoadingText.textBaseline = "alphabetic";
       _oLoadingText.textAlign = "center";
       _oContainer.addChild(_oLoadingText);
       _oFade = new createjs.Shape();
       _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
       _oFade.alpha = 0;
        
        _oContainer.addChild(_oFade);
    };
    
    this.refreshLoader = function(iPerc){
        _oLoadingText.text = iPerc+"%";
        
        _oMaskPreloader.graphics.clear();
        var iNewMaskWidth = Math.floor((iPerc*_iMaskWidth)/100);
        _oMaskPreloader.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth,_iMaskHeight);
    };
    
    this._init();   
}
function CPausePanel(){
    
    var _oBg;
    var _oPauseText;
    var _oButContinue;
    
    this._init = function(){
        
        var oSprite = s_oSpriteLibrary.getSprite('pause_panel');
        _oBg = createBitmap(oSprite);
        _oBg.on("mousedown", function(){});
        s_oStage.addChild(_oBg);
        
        _oPauseText = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 -125, TEXT_ISPAUSED, "#ffffff", s_oStage, "#821010", 35);
        _oPauseText.setWidth(400);
        _oPauseText.setOutline(5);
        
        _oButContinue = new CGfxButton(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 50, s_oSpriteLibrary.getSprite('but_play'), s_oStage);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
    };
    
    this.unload = function(){
        _oPauseText.unload();
        _oPauseText = null;
        _oButContinue.unload();
        _oButContinue = null;
        
        _oBg.off("mousedown", function(){});
        
        s_oStage.removeChild(_oBg);
    };
    
    this._onButContinueRelease = function(){
        s_oGame.resumeGame();
    };

    
    this._init();

}
function CParticle(iX, iY, iType, szDir, oParentContainer){
    
    var _bSliced;
    var _bGone;
    
    var _iSpeed;
    var _iRunFactor;
    var _iRunTime = 0;
    var _iRunTimeSlice1 = 0;
    var _iRunTimeSlice2 = 0;
    var _iShiftLeftX;
    var _iShiftRightX;
    var _iShiftx;
    var _iRotFactorSlice1;
    var _iRotFactorSlice2;
    var _iRotFactor;
    
    var _oParticle = null;
    var _oParent;
    var _oSlice1;
    var _oSlice2;
    
    this._init= function(iX, iY, iType, szDir, oParentContainer){
        
        _bSliced = false;
        _bGone = false;
        
        _iSpeed = 8;
        _iRunFactor = _iSpeed/8;
        
        if(iX > (CANVAS_WIDTH/2) ){
            _iShiftx = randomFloatBetween(-12.5,-5,2);
        }else{
            _iShiftx = randomFloatBetween(5,12.5,2);
        }
        
        _iRotFactor = randomFloatBetween(-MAX_FRUITS_ROT_SPEED,MAX_FRUITS_ROT_SPEED,2);

        
        if(iType === TYPE_BOMB || iType === TYPE_CLOCK ){
            var oSprite = s_oSpriteLibrary.getSprite('explosion_'+iType);
            var oData = {   
                            framerate: 25,
                            images: [oSprite], 
                            // width, height & registration point of each sprite
                            frames: {width: 150, height: 150, regX: 75, regY: 75}, 
                            animations: {idle: [0,9,"stop"], stop:[10]}
                       };

            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oParticle = createSprite(oSpriteSheet, "idle",75,75,150,150);
            _oParticle.on("animationend", this._onParticleEnd);
            _oParticle.gotoAndPlay("idle");
            var pGlobPoints = oParentContainer.localToGlobal(iX, iY);
            _oParticle.x = pGlobPoints.x + PARTICLE_OFFSET[iType].x;
            _oParticle.y = pGlobPoints.y + PARTICLE_OFFSET[iType].y;
        
            s_oStage.addChild(_oParticle);
            
        } else {
            
            
            var oSprite = s_oSpriteLibrary.getSprite('fruit_'+iType);
            var iWidth = oSprite.width;
            var iHeight = oSprite.height;
            
            
            if(szDir === "horizontal"){
                
                _oSlice1 = createSprite(s_aFruitSpritesheet[iType], "slice_7",(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice1.x = iX;
                _oSlice1.y = iY;
                oParentContainer.addChild(_oSlice1);

                _oSlice2 = createSprite(s_aFruitSpritesheet[iType], "slice_6",(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice2.x = iX;
                _oSlice2.y = iY;
                oParentContainer.addChild(_oSlice2);
                
            } else if(szDir === "vertical"){
                
                _oSlice1 = createSprite(s_aFruitSpritesheet[iType], "slice_5",(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice1.x = iX;
                _oSlice1.y = iY;
                oParentContainer.addChild(_oSlice1);

                _oSlice2 = createSprite(s_aFruitSpritesheet[iType], "slice_4",(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice2.x = iX;
                _oSlice2.y = iY;
                oParentContainer.addChild(_oSlice2);
            } else {
                
                var iRandomDir = 1 +Math.floor(Math.random()*3);
               
                
                _oSlice1 = createSprite(s_aFruitSpritesheet[iType], iRandomDir +1,(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice1.x = iX;
                _oSlice1.y = iY;
                _oSlice1.gotoAndStop(iRandomDir+1);
                oParentContainer.addChild(_oSlice1);

                _oSlice2 = createSprite(s_aFruitSpritesheet[iType], iRandomDir,(iWidth/9)/2,iHeight/2,iWidth/9,iHeight);
                _oSlice2.x = iX;
                _oSlice2.y = iY;
                _oSlice2.gotoAndStop(iRandomDir);
                oParentContainer.addChild(_oSlice2);   
            }
                      
           
            this.sliceVertical();
        }
         

    };
    
    this.unload = function(){
        
        
        if(_oParticle !== null){            
            _oParticle.visible = false;
            _oParticle.off("animationend", this._onParticleEnd);
            s_oStage.removeChild(_oParticle);
        } else {
            oParentContainer.removeChild(_oSlice1);
            oParentContainer.removeChild(_oSlice2);
        }       
        _bGone = true;
    };
    
    this.sliceVertical = function(){
        _bSliced = true;
       
        _iRunTimeSlice1 = _iRunTime - (_iRunFactor*2);
        _iRunTimeSlice2 = _iRunTime - (_iRunFactor*2);
        _iShiftLeftX = _iShiftx;
        _iShiftRightX = -_iShiftx;
        _iRotFactorSlice1 = _iRotFactor * 1.5;
        _iRotFactorSlice2 = -_iRotFactor * 1.5;
       
        
    };
    
    this.update = function(){
        if(_bSliced){
            _iRunTime += _iRunFactor;
        
            _iRunTimeSlice1 += _iRunFactor;
            _oSlice1.y = _oSlice1.y - _iSpeed + _iRunTimeSlice1*2;
            _oSlice1.x += _iShiftLeftX/(_iRunTime);
            _oSlice1.rotation += _iRotFactorSlice1;

            _iRunTimeSlice2 += _iRunFactor;
            _oSlice2.y = _oSlice2.y - _iSpeed + _iRunTimeSlice2*2;
            _oSlice2.x += _iShiftRightX/(_iRunTime);
            _oSlice2.rotation += _iRotFactorSlice2;
            
            
            var iRemove = 0;
            if(_oSlice1.y > CANVAS_HEIGHT){
                iRemove++;
            }

            if(_oSlice2.y > CANVAS_HEIGHT){
                iRemove++;
            }

            if(iRemove === 2){
                _oParent.unload();
            } 
        }
        
        
    };
    
    this.isGone = function(){
        return _bGone;
    };
    
    this._onParticleEnd = function(){
        if(_oParticle.currentAnimation === "idle"){
            _oParent.unload();
        }
    };
    
    _oParent = this;
    this._init(iX, iY, iType, szDir, oParentContainer);
    
};
function CMovingCell(iX, iY, iType, oParentContainer){
    
    var _iType;
    
    var _oItems;
    
    this._init = function(iX, iY, iType, oParentContainer){
        
        _iType = iType;
        var iNumChangingItem = 6;
        var oSprite = s_oSpriteLibrary.getSprite('fruits');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                        animations: {type_0:[0], type_1:[1], type_2:[2], type_3:[3], type_4:[4], type_5:[5], type_6:[6], type_7:[7], star:[8], bomb:[9], clock:[10], changing:[0,iNumChangingItem,"changing",0.150]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        if(_iType === TYPE_CHANGING){
             _oItems = createSprite(oSpriteSheet, "changing",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
             _oItems.gotoAndPlay("changing");
         } else {
             _oItems = createSprite(oSpriteSheet, _iType,CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
             _oItems.gotoAndStop(_iType);
         }
        _oItems.x = iX;
        _oItems.y = iY;
        oParentContainer.addChild(_oItems);
        
    };
    
    this.unload = function(){
        oParentContainer.removeChild(_oItems);
    };
    
    this.move = function(iX, iY){
        createjs.Tween.get(_oItems).to({x:iX, y:iY}, 250, createjs.Ease.cubicIn).call(function(){ _oItems.visible = false; s_oGame.checkMatch();});
    };
    
    this.moveBack = function(){
        _oItems.visible = true;
        createjs.Tween.get(_oItems).to({x:iX, y:iY}, 250, createjs.Ease.cubicIn).call(function(){s_oGame.returnInPosition();});
    };
    
    this.fall = function(iX, iY, iTimeMulti){
        createjs.Tween.get(_oItems).to({x:iX, y:iY}, TIME_FALL*iTimeMulti, createjs.Ease.linear).call(function(){s_oGame.onFinishFall();});
    };
    
    this.fallStar = function(iX, iY){
        createjs.Tween.get(_oItems).to({x:iX, y:iY}, 1200, createjs.Ease.cubicIn);
    };
    
    this.setVisible = function(bVal){
        _oItems.visible = bVal;        
    };
    
    this.getType = function(){
        return _iType;
    };
    
    this._init(iX, iY, iType, oParentContainer);
    
};


function CMenu(){
    
    
    var _oBg;
    var _oButPlay;
    var _oAudioToggle;
    var _oParent;    
    
    var _pStartPosAudio;
    
    this._init = function(){

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);


        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 15, y: (oSprite.height/2) + 15};            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);            
        }

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton(CANVAS_WIDTH/2, 650, oSprite, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);   

        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
    };
    
    this.unload = function(){
        
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        _oBg = null;
        s_oMenu = null;
    };

    
    
   
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
    };
   
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onButPlayRelease = function(){
        this.unload();        
        s_oMain.gotoGame();
    };  
 
    
    s_oMenu = this;
    
    _oParent = this;
    this._init();
}

var s_oMenu = null;
function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oModeMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
		
	s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(30);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

         if(_iCurResource === RESOURCE_TO_LOAD){
             _oPreloader.unload();
             
             if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
             }
             
             this.gotoMenu();
         }
         
    };
    
    this._initSounds = function(){
         if (!createjs.Sound.initializeDefaultPlugins()) {
             return;
         }

        if(navigator.userAgent.indexOf("Opera")>0 || navigator.userAgent.indexOf("OPR")>0){
                createjs.Sound.alternateExtensions = ["mp3"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/fn_explosion.ogg", "bomb_explosion");
                createjs.Sound.registerSound("./sounds/hourglass_explosion.ogg", "hourglass_explosion");
                createjs.Sound.registerSound("./sounds/click.ogg", "click");
                createjs.Sound.registerSound("./sounds/break.ogg", "break");
                createjs.Sound.registerSound("./sounds/break2.ogg", "break2");
                createjs.Sound.registerSound("./sounds/game_over.ogg", "game_over");
                createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack");                                                                                            
                
                createjs.Sound.registerSound("./sounds/swoosh.ogg", "swoosh");
                createjs.Sound.registerSound("./sounds/tictac.ogg", "tictac");
                
        }else{
                createjs.Sound.alternateExtensions = ["ogg"];
                createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this));

                createjs.Sound.registerSound("./sounds/fn_explosion.mp3", "bomb_explosion");
                createjs.Sound.registerSound("./sounds/hourglass_explosion.mp3", "hourglass_explosion");
                createjs.Sound.registerSound("./sounds/click.mp3", "click");
                createjs.Sound.registerSound("./sounds/break.mp3", "break");
                createjs.Sound.registerSound("./sounds/break2.mp3", "break2");
                createjs.Sound.registerSound("./sounds/game_over.mp3", "game_over"); 
                createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack");                                                                               
                
                createjs.Sound.registerSound("./sounds/swoosh.mp3", "swoosh");
                createjs.Sound.registerSound("./sounds/tictac.mp3", "tictac");
        }
        
        
        
        RESOURCE_TO_LOAD += 9;
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");        
        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("pause_panel","./sprites/pause_panel.png");
        s_oSpriteLibrary.addSprite("game_over_panel","./sprites/game_over_panel.png");
        
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_restart","./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_restart_big","./sprites/but_restart_big.png");
        s_oSpriteLibrary.addSprite("but_pause","./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("arrow","./sprites/arrow.png");

        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("level_up","./sprites/level_up.png");
        s_oSpriteLibrary.addSprite("time_is_up","./sprites/time_is_up.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_sprites.png");
        s_oSpriteLibrary.addSprite("time_bar","./sprites/time_bar.png");
        s_oSpriteLibrary.addSprite("time_bar_fill","./sprites/time_bar_fill.png");
        s_oSpriteLibrary.addSprite("score_panel","./sprites/score_panel.png");        
        
        s_oSpriteLibrary.addSprite("fruits","./sprites/fruits.png");        
        for(var i=0; i<7; i++){
            s_oSpriteLibrary.addSprite("fruit_"+i,"./sprites/fruit_"+i+".png");
        }
        s_oSpriteLibrary.addSprite("explosion_9","./sprites/explosion_9.png");
        s_oSpriteLibrary.addSprite("explosion_10","./sprites/explosion_10.png");
        
        s_oSpriteLibrary.addSprite("target","./sprites/target.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            _oPreloader.unload();            
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                s_oSoundtrack = createjs.Sound.play("soundtrack",{ loop:-1});
             }
            this.gotoMenu();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){        
        _oMenu = new CMenu();
        _iState = STATE_MENU;
        
    };
    
    this.goToModeMenu = function(){
        _oModeMenu = new CModeMenu();
        _iState = STATE_MENU;
    };
    

    this.gotoGame = function(iLevel){
        s_iCurLevel = 1;
        _oGame = new CGame(_oData, s_iCurLevel);   						
        _iState = STATE_GAME;

        $(s_oMain).trigger("game_start");
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
	this.stopUpdate = function(){
		_bUpdate = false;
	};
	
	this.startUpdate = function(){
		_bUpdate = true;
	};
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
        
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    
    this.initContainer();
}


var s_bMobile;
var s_bAudioActive = true;
var s_bMusicActive = true;
var s_iTotalScore = 0;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iCurLevel;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundtrack;
var s_oCanvas;

var LEVEL_MATRIX = new Array();
var CONFIG = new Array();
var TIMER_CLOCK_SPAWN = new Array();


LEVEL_MATRIX[1] = [
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1]
];

CONFIG[1] = {numitems: 3, bomballowed:true, clockallowed:true, changingallowed: true};
TIMER_CLOCK_SPAWN[1] = 0;

TEXT_GAMEOVER  = "GAME OVER";
TEXT_ISPAUSED  = "PAUSE";
TEXT_SCORE     = "SCORE:";
TEXT_SHUFFLE   = "NO MORE MATCHES AVAILABLE...";
TEXT_HELP   = "MATCH 3 OR MORE IDENTICAL FRUITS TO MAKE THEM EXPLODE BEFORE TIME RUNS OUT! \n\n\n\nIF YOU MATCH 4 OR MORE IDENTICAL FRUITS YOU'LL GET EXTRA TIME!";
TEXT_HELP_ITEM = "BONUS ITEMS";
TEXT_HELP_BOMB = "MATCH 4 IDENTICAL FRUITS IN A ROW TO GET A BOMB";
TEXT_HELP_CLOCK = "IF YOU ARE LUCKY, YOU'LL GAIN EXTRA TIME";
TEXT_HELP_CHANGING = "MATCH 5 IDENTICAL FRUITS IN A ROW TO GET A JOLLY THAT WILL DESTROY ALL IDENTICAL FRUITS AND WILL GIVE YOU EXTRA TIME FOR EACH EXPLODED FUIT";
function CInterface(iCurLevel){
    var _aGoals;
    
    var _oAudioToggle;
    var _oButExit;
    var _oScoreText;
    var _oButRestart;
    var _oButPause;
    var _oTimeNum;
    var _oHelpPanel=null;
    var _oPanelContainer;

    var _oMask;
   
    
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosPause;
    var _pStartPosRestart;
    
    this._init = function(iCurLevel){  
        
        var oScorePanel = createBitmap(s_oSpriteLibrary.getSprite('score_panel'));
        oScorePanel.x = 30;
        oScorePanel.y = 170;
        s_oStage.addChild(oScorePanel);
        
        _oScoreText = new CFormatText(41, 192, "000000000", "#ffffff", s_oStage, "#ff0000", 25);
        _oScoreText.setAlign("left");
        _oScoreText.setOutline(4);
        
        _oPanelContainer = new createjs.Container();
        s_oStage.addChild(_oPanelContainer);
        
        oSprite = s_oSpriteLibrary.getSprite('time_bar_fill');
        var oTimePos = {x: CANVAS_WIDTH/2 - oSprite.width/2, y: 750};
        var oEnergyBarFill = createBitmap(oSprite);
        oEnergyBarFill.x=oTimePos.x+7;
        oEnergyBarFill.y=oTimePos.y+7;
        s_oStage.addChild(oEnergyBarFill);
        
        oSprite = s_oSpriteLibrary.getSprite('time_bar');
        var oEnergyBarBg = createBitmap(oSprite);
        oEnergyBarBg.x=oTimePos.x;
        oEnergyBarBg.y=oTimePos.y;
        s_oStage.addChild(oEnergyBarBg);
        
        oSprite = s_oSpriteLibrary.getSprite('time_bar_fill');
        _oMask = new createjs.Shape();
        _oMask.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, oSprite.width,oSprite.height);
        _oMask.x= oTimePos.x+7;
        _oMask.y= oTimePos.y+7;

        s_oStage.addChild(_oMask);
        oEnergyBarFill.mask = _oMask;
        
        _oTimeNum = new CFormatText(CANVAS_WIDTH/2, oTimePos.y +12, "0:00", "#ffffff", s_oStage, "#ff0000", 25);
        _oTimeNum.setAlign("center");
        _oTimeNum.setOutline(4);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('but_exit');
            _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 15, y: (oSprite.height/2) + 15};
            _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
            _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
            
            var oExitX = CANVAS_WIDTH - (oSprite.width/2) - 73;
 
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + 15};        
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            oExitX = CANVAS_WIDTH - (oSprite.width/2) - 103;
            
            var oSprite = s_oSpriteLibrary.getSprite('but_pause');
            _pStartPosPause = {x: oExitX, y: (oSprite.height/2) + 15};        
            _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, s_oStage);
            _oButPause.addEventListener(ON_MOUSE_UP, this._onButPauseRelease);
            
            oExitX = CANVAS_WIDTH - (oSprite.width/2) - 190;
            
            var oSprite = s_oSpriteLibrary.getSprite('but_restart');
            _pStartPosRestart = {x: oExitX, y: (oSprite.height/2) + 15}; 
            _oButRestart = new CGfxButton(_pStartPosRestart.x, _pStartPosRestart.y, oSprite, s_oStage);
            _oButRestart.addEventListener(ON_MOUSE_UP, this._onButRestartRelease);
        } else {
            
            var oSprite = s_oSpriteLibrary.getSprite('but_exit');
            _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 15, y: (oSprite.height/2) + 15};
            _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
            _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
            
            var oExitX = CANVAS_WIDTH - (oSprite.width/2) - 75;
            
            var oSprite = s_oSpriteLibrary.getSprite('but_pause');
            _pStartPosPause = {x: oExitX, y: (oSprite.height/2) + 15};        
            _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, s_oStage);
            _oButPause.addEventListener(ON_MOUSE_UP, this._onButPauseRelease);
            
            oExitX = CANVAS_WIDTH - (oSprite.width/2) - 135;
            
            var oSprite = s_oSpriteLibrary.getSprite('but_restart');
            _pStartPosRestart = {x: oExitX, y: (oSprite.height/2) + 15}; 
            _oButRestart = new CGfxButton(_pStartPosRestart.x, _pStartPosRestart.y, oSprite, s_oStage);
            _oButRestart.addEventListener(ON_MOUSE_UP, this._onButRestartRelease);
            
        }


        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
    };
    
    this.unload = function(){   

        _oScoreText.unload();
        _oScoreText = null;

        _oButRestart.unload();
        _oButRestart = null;
        _oButPause.unload();
        _oButPause = null;
        
        _oTimeNum.unload();
        _oTimeNum = null;
        
        
        _oButExit.unload();
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oInterface = null;
        
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        _oButPause.setPosition(_pStartPosPause.x - iNewX,iNewY + _pStartPosPause.y);
        _oButRestart.setPosition(_pStartPosRestart.x - iNewX,iNewY + _pStartPosRestart.y);        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
    };
    
    this.getPanelContainer = function(){
        return _oPanelContainer;
    };

    this.refreshScore = function(iValue){

        var iNumber = pad(iValue, 9);
        
        function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
        
        _oScoreText.setText(iNumber);
        
    };

    this.refreshTime = function(iTime, iBarLength){        
        var iNum = formatTime(iTime);
        _oTimeNum.setText(iNum);
        
        _oMask.scaleX = iBarLength;
        if(iTime < 100 || iTime > 16000){            
            createjs.Tween.removeTweens(_oTimeNum.getText());
            _oTimeNum.getText().scaleX = _oTimeNum.getText().scaleY = 1;
        } else if(iTime < 16000){
            createjs.Tween.get(_oTimeNum.getText(), {loop:true}).to({scaleX:1.3, scaleY:1.3}, 100, createjs.Ease.powIn).to({scaleX:1, scaleY:1}, 100).wait(800);
        }
        
    };

    this.setTimerColor = function(szColor, szOutline){
        _oTimeNum.setColor(szColor,szOutline);
    };

    this._onButHelpRelease = function(){
        _oHelpPanel = new CHelpPanel();
    };
    
    this._onButRestartRelease = function(){
        s_oGame.restartGame();
    };
    
    this._onButPauseRelease = function(){
        s_oGame.pauseGame();
    };
    
    this._onButLevelMenuRelease = function(){
        s_oGame.unload();
        
        s_oMain.goToModeMenu();
    }    
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        createjs.Sound.setMute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        s_oGame.onExit();  
    };
    
    s_oInterface = this;
    
    this._init(iCurLevel);
    
    return this;
}

var s_oInterface = null;
function CHelpPanel(){

    var _bPage1Active = true;

    var _oHelpBg;
    
    var _oMsg1;
    var _oRightArrow;
    
    var _oMsg2;
    var _oMsg3;
    var _oMsg4;
    var _oBomb;
    var _oClock;
    var _oChanging;
    var _oLeftArrow;
    
    var _aThree;
    var _aFour;
    
    var _oParent;

    this._init = function(){
       
        var oSprite = s_oSpriteLibrary.getSprite('pause_panel');
        _oHelpBg = createBitmap(oSprite);
        _oHelpBg.on("click", function(){_oParent._onExitHelp();});
        s_oStage.addChild(_oHelpBg);
        
        _oBomb = createSprite(s_oFruitSpritesheet, "bomb",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
        _oBomb.x = 150;
        _oBomb.y = 350;
        
        _oClock = createSprite(s_oFruitSpritesheet, "clock",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
        _oClock.x = 430;
        _oClock.y = 450;
        
        _oChanging = createSprite(s_oFruitSpritesheet, "changing",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
        _oChanging.x = 150;
        _oChanging.y = 600;
        
        _aThree = new Array();
        var iOffset = 10;
        for(var i=0; i<3; i++){
            _aThree[i] = createSprite(s_oFruitSpritesheet, "type_0",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _aThree[i].x = CANVAS_WIDTH/2 +i*(CELL_SIZE+iOffset) - CELL_SIZE-iOffset;
            _aThree[i].y = 300;
        }
        
        _aFour = new Array();
        for(var i=0; i<4; i++){
            _aFour[i] = createSprite(s_oFruitSpritesheet, "type_4",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _aFour[i].x = CANVAS_WIDTH/2 +i*(CELL_SIZE+iOffset) - (CELL_SIZE+iOffset)*3/2;
            _aFour[i].y = 545;
        }
        
        this._buildPage1();
        
        
    };

    this.unload = function(){       
        
        if(_bPage1Active){
            _oMsg1.unload();
            for(var i=0; i<3; i++){
                s_oStage.removeChild(_aThree[i]);
            }
            for(var i=0; i<4; i++){
                s_oStage.removeChild(_aFour[i]);
            }
            _oRightArrow.unload();
        } else {
            _oMsg1.unload();
            _oMsg2.unload();
            _oMsg3.unload();
            _oMsg4.unload();
            _oLeftArrow.unload();
            s_oStage.removeChild(_oBomb);
            s_oStage.removeChild(_oClock);
            s_oStage.removeChild(_oChanging);
        }
        
        _oHelpBg.off("click", function(){_oParent._onExitHelp();});
        s_oStage.removeChild(_oHelpBg);
        
    };
    
    this._buildPage1 = function(){
        _bPage1Active = true;
        
        for(var i=0; i<3; i++){
            s_oStage.addChild(_aThree[i]);
        }
        for(var i=0; i<4; i++){
            s_oStage.addChild(_aFour[i]);
        }
        
        _oMsg1 = new CFormatText(CANVAS_WIDTH/2, 350, TEXT_HELP, "#ffffff", s_oStage, "#821010", 25);
        _oMsg1.setWidth(400);
        
        var oSprite = s_oSpriteLibrary.getSprite('arrow');
        _oRightArrow = new CGfxButton(CANVAS_WIDTH/2 + 200, 700, oSprite, s_oStage);
        _oRightArrow.addEventListener(ON_MOUSE_UP, this._onButRightRelease, this);
        
    };

    this._buildPage2 = function(){        
        _bPage1Active = false;
        
        _oMsg1 = new CFormatText(CANVAS_WIDTH/2, 290, TEXT_HELP_ITEM, "#ffffff", s_oStage, "#821010", 30);
        _oMsg1.setWidth(400);

        s_oStage.addChild(_oBomb);
        
        _oMsg2 = new CFormatText(CANVAS_WIDTH/2 + 50, 340, TEXT_HELP_BOMB, "#ffffff", s_oStage, "#821010", 16);
        _oMsg2.setWidth(280);
        
        s_oStage.addChild(_oClock);
        
        _oMsg3 = new CFormatText(CANVAS_WIDTH/2 - 10, 440, TEXT_HELP_CLOCK, "#ffffff", s_oStage, "#821010", 16);
        _oMsg3.setWidth(280);
        
        s_oStage.addChild(_oClock);
        
        _oMsg4 = new CFormatText(CANVAS_WIDTH/2 + 50, 540, TEXT_HELP_CHANGING, "#ffffff", s_oStage, "#821010", 16);
        _oMsg4.setWidth(280);
        
        s_oStage.addChild(_oChanging);
        
        var oSprite = s_oSpriteLibrary.getSprite('arrow');
        _oLeftArrow = new CGfxButton(CANVAS_WIDTH/2 - 200, 700, oSprite, s_oStage);
        _oLeftArrow.addEventListener(ON_MOUSE_UP, this._onButLeftRelease, this);
        _oLeftArrow.reverseSprite();
        
    };
    
    this._onButRightRelease = function(){
        _oMsg1.unload();
        for(var i=0; i<3; i++){
            s_oStage.removeChild(_aThree[i]);
        }
        for(var i=0; i<4; i++){
            s_oStage.removeChild(_aFour[i]);
        }
        
        _oRightArrow.unload();
        
        this._buildPage2();
    };
    
    this._onButLeftRelease = function(){
        if(!_bPage1Active){
            _oMsg1.unload();
            _oMsg2.unload();
            _oMsg3.unload();
            _oMsg4.unload();
            _oLeftArrow.unload();
            s_oStage.removeChild(_oBomb);
            s_oStage.removeChild(_oClock);
            s_oStage.removeChild(_oChanging);
        }
        
        this._buildPage1();
    };

    this._onExitHelp = function(){
        _oParent.unload();
        s_oGame.onExitHelp();
    };

    this._onButContinueRelease = function(){
        this.unload();
        s_oGame.onExitHelp();
    };

    _oParent=this;
    this._init();

}
