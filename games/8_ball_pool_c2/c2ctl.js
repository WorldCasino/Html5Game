 function ctlArcadeSaveScore(iScore){
        if(parent.__ctlArcadeSaveScore){
            parent.__ctlArcadeSaveScore({score:iScore});
        }
    }


    function ctlArcadeStartSession(){
        if(parent.__ctlArcadeStartSession){
            parent.__ctlArcadeStartSession();
        }
    }

    function ctlArcadeEndSession(){
        if(parent.__ctlArcadeEndSession){
            parent.__ctlArcadeEndSession();
        }
    }

    function ctlArcadeRestartLevel(){
        if(parent.__ctlArcadeRestartLevel){
            parent.__ctlArcadeRestartLevel();
        }
    }
	
    function ctlArcadeStartLevel(){
        if(parent.__ctlArcadeStartLevel){
            parent.__ctlArcadeStartLevel();
        }
    }
	
    function ctlArcadeEndLevel(){
        if(parent.__ctlArcadeEndLevel){
            parent.__ctlArcadeEndLevel();
        }
    }

	function ctlArcadeShowInterlevelAD(){
        if(parent.__ctlArcadeShowInterlevelAD){
            parent.__ctlArcadeShowInterlevelAD();
        }
    }
	
	    function ctlArcadeShareEvent(szImg, szTitle, szMsg, szMsgShare){
			console.log (szImg);
			console.log (szTitle);
			console.log (szMsg);
			console.log (szMsgShare);
        if(parent.__ctlArcadeShareEvent){
            parent.__ctlArcadeShareEvent({ img : szImg, title: szTitle, msg : szMsg, msg_share: szMsgShare });
        }
    }
	
	function ctlArcadeResume(){
		c2_callFunction("c2ctlArcadeResume");
	}

	function ctlArcadePause(){
		c2_callFunction("c2ctlArcadePause");
	}
	
	function inIframe() {
		console.log ('enter');
	   try {
		   return window.self !== window.top;
	   } catch (e) {
		   return true;
	   }
	}