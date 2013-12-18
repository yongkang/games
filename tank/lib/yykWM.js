function gameInit(){
    //create a canvas
    $("body").append('<div id="firstDiv" class="firstDiv" width=800 height=500 style="position:absolute; left:0; top:0; "> </div>');
    //load background image
    $("#firstDiv").append('<img id="gameMenuBackground" src="images/background.jpg" class="firstDiv" width=800 height=500 style="position:absolute; left:0; top:0; "> </img>');
    
    //load Game Name.  
    $("#firstDiv").append('<p id="gameName" class="firstDiv" style="position:absolute; left:280; top:-100; width:300px; font-size:48px; color:#444444"> Tank Factory</p>');

    //load sound.

    //show Game Name.
    $("#gameName").animate({top: 50}, 1000, "swing", function(){gameOption();});
}

function gameOption(){
    //show game menu and attach actions.
    $("body").append('<div id="gameMenu" class="gameMenu" style="position:absolute; z-index:4"> <button id="gameStart" class="gameMenu" style="position:absolute; left:350; top:200; width:100" >Start </button> </div>');
//    $("body").append('<div id="gameMenu" class="gameMenu" > <button id="gameOption" class="gameMenu" style="position:absolute; left:350; top:180; width:100" > </button> </div>');
//    $("body").append('<div id="gameMenu" class="gameMenu" > <button id="gameHelp" class="gameMenu" style="position:absolute; left:350; top:210; width:100" ></button> </div>');
//    $("body").append('<div id="gameMenu" class="gameMenu" > <button id="gameRank" class="gameMenu" style="position:absolute; left:350; top:240; width:100" >Rank </button> </div>');

    //Add actions
    $("#gameStart").click(function(){
                gameStart();})
}

function gameStart(){
    $("#gameStart").hide();
    $("body").append('<div id="gameArea" class="gameArea"> <canvas id="gameAreaCan" class="gameArea" width=830 height=530 style="position:absolute; left:0; top:0; "> </canvas> </div>');
    //load background image
    $("#gameArea").append('<img id="gameBackground" src="images/background_draft.jpg" class="gameArea" width=830 height=530 style="position:absolute; left:0; top:0; z-index:0"> </img>');
    //add 3 railroad switches.
    var  tempHtml = '<img id="switch1" src="images/switch0-1.png" class="railroad" style="position:absolute; left:' + (xArray[4]-cargoW/2 ) + '; top:' + (yArray[4]-cargoW/2 - 25) + '; "> </img>';
    tempHtml += '<img id="switch2" src="images/switch0-1.png" class="railroad" style="position:absolute; left:' + (firstCrossXArray[1]-cargoW/2) + '; top:' + (firstCrossYArray[0]-cargoW/2 -25) + '; "> </img>';
    tempHtml += '<img id="switch3" src="images/switch0-1.png" class="railroad" style="position:absolute; left:' + (firstCrossXArray[1]-cargoW/2) + '; top:' + (firstCrossYArray[1]-cargoW/2 -25) + '; "> </img>';
    $("#gameArea").append(tempHtml);
    $("#switch1").bind("click", function(){clickSwitch(1);});
    $("#switch2").bind("click", function(){clickSwitch(2);});
    $("#switch3").bind("click", function(){clickSwitch(3);});

    //draw factory
    var i;
    tempHtml ="";
    for (i=0; i<6; i++){
        var x = (secCrossXArray[1]-2*factoryX/3);
        var y = (secCrossYArray[i]-4*factoryY/5);
        tempHtml += '<img id="factory"' + i + ' src="images/factory.png" class="factory" style="position:absolute; left:' + x + '; top:' + y + '; z-index:1 "> </img>'
        tempHtml += '<img id="factory2"' + i + ' src="images/factory2.png" class="factory" style="position:absolute; left:'+ x  + '; top:' + y + '; z-index:0 "> </img>' ;
        tempHtml += '<img id="tank_blank"' + i + ' src="images/tank_blank.png" class="factory" style="position:absolute; left:'+ x  + '; top:' + y + '; z-index:1 "> </img>' ;
        // add factory tank components
        var tankCompID="factory"+i+"Sub";
        tempHtml += '<img id="' + tankCompID + tankArmor + '" src="'+ tankArmorSrc +'" class="factoryTank' + i + '" style="position:absolute; left:' + x + '; top:' + y + '; z-index:2 "> </img>' ;
        tempHtml += '<img id="' + tankCompID + tankBarrel + '" src="'+ tankBarrelSrc +'" class="factoryTank' + i + '" style="position:absolute; left:' + x + '; top:' + y + '; z-index:2 "> </img>' ;
        tempHtml += '<img id="' + tankCompID + tankShell + '" src="'+ tankShellSrc +'" class="factoryTank' + i + '" style="position:absolute; left:' + x + '; top:' + y + '; z-index:2 "> </img>' ;
        tempHtml += '<img id="' + tankCompID + tankWheel + '" src="'+ tankWheelSrc +'" class="factoryTank' + i + '" style="position:absolute; left:' + x + '; top:' + y + '; z-index:2 "> </img>' ;
    }
    $("#gameArea").append(tempHtml);
    for (i=0; i<6; i++){
        $(".factoryTank" + i).hide();
    }

    //Add temp stop button
    //tempHtml = '<div id="gameOperDiv" style="position:absolute; left:400px; top:460px; z-index:2; width:300px"><input type="button" id="stopGame" class="gameOper" data-inline="true" value="Stop" style="width:100"></input> <input type="button" id="pauseGame" class="gameOper" data-inline="true" value="Pause"></input></div>';
    tempHtml = '<div id="gameOperDiv" style="position:absolute; left:550px; top:10px; z-index:2; width:300px"><input type="button" id="stopGame" class="gameOper" data-inline="true" value="Stop" style="width:100"></input> </div>';
    $("#gameArea").append(tempHtml);
    $("#stopGame").bind("click", stopGame);
    $("#gameMenu").append('<input type="button" id="restartGame" class="gameOper" data-inline="true" value="Retry" style="position:absolute; left:550; top:10; width:100; z-index:4"></input>');
    $("#restartGame").hide();
    $("#restartGame").bind("click", restartGame);
//    $("#pauseGame").hide();
//    $("#pauseGame").bind("click", gamePause);
    //$("#pause").bind("click", function(){pauseGame();});

    //add level switching notification div
    tempHtml ='<div id="levelSwitch" style="position:absolute; left:150; top:100; z-index:4"></div>';
    tempHtml += '<div id="levelShow" style="position:absolute; left:80px; top:5px; z-index:2;"> Level: <span1></span1></p></div>';
    $("#gameArea").append(tempHtml);
    $("body").append('<p id="test" style="position:absolute; left:80px; top:510px"> </p>');
    createInterval();
}

function gameParamInit(){
    gameStopFlag = 0;
    levelCompFlag =0;
    currentLevel = 0;
    var temp_i;
    for (temp_i=0; temp_i<6; temp_i++){
        tankArray[temp_i]= new Array();
        npcArray[temp_i]= new Array();
    }

    level = [];
    nPCLevel = [];
    level.push([1, 1, 1, 1, 1, 2]);
    nPCLevel.push([1, 1, 1, 1, 1, 1, 1]);
    level.push([1, 1, 1, 2, 1, 2]);
    nPCLevel.push([1, 2, 1, 2, 1, 1, 1, 2]);
    level.push([1, 1, 1, 2, 2, 2]);
    nPCLevel.push([1, 3, 1, 1, 2, 1, 1, 1, 3]);
    level.push([1, 2, 2, 2, 2, 3]);
    nPCLevel.push([1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 2, 3]);
    level.push([1, 2, 3, 2, 2, 3]);
    nPCLevel.push([1, 1, 2, 1, 3, 1, 1, 2, 1, 3, 1, 2, 3]);
}

function createInterval(){
    gameParamInit();
    intervalID = setTimeout(keepAddCargo, 2000);
    intervalNPCID = setTimeout(addNPC, 100);
    intervalBattleID = setTimeout(beginBattle, 100);
}

function restartGame(){
    destroyAll();
    $("#showLevel").hide();
    $("#restartGame").hide();
    $("#stopGame").show();
    createInterval();
}

function destroyAll(){
    $(".cargo").each(function(){
        $(this).detach();
    });
    
    $(".tank").each(function(){
        $(this).detach();
    });

    for (_i=0; _i<npcArray.length; _i++){
        if (npcArray[_i].length != 0){
            for (_j=0; _j<npcArray[_i].length; _j++){
                $("#" + npcArray[_i][_j]).detach();
            }
        }
    }

    var _i;
    for (_i=0; _i<6; _i++){
        $(".factoryTank" + _i).hide();
    }
}

function clickSwitch(num){
    var item;
    $("#switch" + num).hide();
    switch (num){
        case 1:{
            switch1=(switch1+2)%4;
            $("#switch1").attr('src', 'images/switch' + switch1 +'-1.png');
            $(".cargo").each(function(){
                var len = $(this).queue().length;
                var cargoID = $(this).attr("id");
                if (len > 4){
                    $(this).queue([]);
                    $(this).queue(function(){
                        beforeCrossAnimate(cargoID, (10-len));
                        firstCrossAnimate(cargoID, 2);
                        secCrossAnimate(cargoID, 2);
                    })
                }
            })
            break
        }
        case 2:{
            switch2=(switch2+1)%3;
            $("#switch2").attr('src', 'images/switch' + switch2 +'-1.png');
            $(".cargo").each(function(){
                var len = $(this).queue().length;
                var cargoID = $(this).attr("id");
                var left = $(this).offset().left;
                var top = $(this).offset().top;
                if (len > 4){
                    $(this).queue([]);
                    $(this).queue(function(){
                        beforeCrossAnimate(cargoID, (10-len));
                        firstCrossAnimate(cargoID, 2);
                        secCrossAnimate(cargoID, 2);
                    });
                }
                if ((len < 5) && (len > 2) && (left < 640) && (top < 250)){
                    $(this).queue([]);
                    $(this).queue(function(){
                        firstCrossAnimate(cargoID, len-3);
                        secCrossAnimate(cargoID, 2);
                    });
                }
            })
            break
        }
        case 3:{
            switch3=(switch3+1)%3;
            $("#switch3").attr('src', 'images/switch' + switch3 +'-1.png');
            $(".cargo").each(function(){
                var len = $(this).queue().length;
                var cargoID = $(this).attr("id");
                if (len > 4){
                    $(this).queue([]);
                    $(this).queue(function(){
                        beforeCrossAnimate(cargoID, (10-len));
                        firstCrossAnimate(cargoID, 2);
                        secCrossAnimate(cargoID, 2);
                    });
                }
                if ((len < 5) && (len > 2) && ($(this).offset().left < xArray[4])&& ($(this).offset().top > yArray[4])){
                    $(this).queue([]);
                    $(this).queue(function(){
                        firstCrossAnimate(cargoID, len-3);
                        secCrossAnimate(cargoID, 2);
                    });
                }
            });
            break
        }
    }
    $("#switch" + num).show();
}

function keepAddCargo(){
    flag++;
    addCargo(flag);
    intervalID = setTimeout(keepAddCargo, 2000);
}

function gamePause(){
    var _pauseFlag = $("#pauseGame").attr('value');
    if (_pauseFlag == "Pause"){
        $("#pauseGame").attr('value', 'Unpause');
        //$("#pauseGame").val("Unpause");
        pauseGame();
    }else{
        $("#pauseGame").attr('value', 'Pause');
        //$("#pauseGame").val("Pause");
        unpauseGame();
    }
}

function stopGame(){
    gameStopFlag = 1;
    levelCompFlag = 1;
    stopTimeInterval();
    //TODO: stop all animation.
    stopAnimation();
    //clear Queue.
    cargoIDQueue = [];
    cargoAnQueue = [];
    //hide buttons
    $("#stopGame").hide();
    $("#restartGame").show();
}

function pauseGame(){
    var _i;
    var _j;
    stopTimeInterval();
    $(".cargo").each(function(){
        idQueue.push($(this).attr('id'));
        animationQueue.push($(this).queue());
        $(this).stop(true);
    });
    
    $(".tank").each(function(){
        idQueue.push($(this).attr('id'));
        animationQueue.push($(this).queue());
        $(this).stop();     
    });

    for (_i=0; _i<npcArray.length; _i++){
        if (npcArray[_i].length != 0){
            for (_j=0; _j<npcArray[_i].length; _j++){
                idQueue.push(npcArray[_i][_j]);
                animationQueue.push($("#" + npcArray[_i][_j]).queue());
                $("#" + npcArray[_i][_j]).stop();
            }
        }
    }
}

function unpauseGame(){
    while (idQueue.length != 0){
        $("#" + idQueue.pop()).queue(animationQueue.pop());
        //$("#" + idQueue.pop()).delay('10');
        $("#" + idQueue.pop()).animate({top:50});
    }
    createInterval();
}

function stopAnimation(){
    var _i;
    var _j;

    //stop cargo
    $(".cargo").each(function(){
        $(this).stop(true);
    });
    //stop npcTank
    for (_i=0; _i<npcArray.length; _i++){
        if (npcArray[_i].length != 0){
            for (_j=0; _j<npcArray[_i].length; _j++){
                $("#" + npcArray[_i][_j]).stop();
            }
        }
    }
    //stop tank
    $(".tank").each(function(){
        $(this).stop();     
    });
}

function stopTimeInterval(){
    clearTimeout(intervalID);
    clearTimeout(intervalNPCID);
    clearTimeout(intervalBattleID);
}

function addCargo(num){
    var shell="images/missle.png";
    var wheel="images/wheel.png";
    var barrel="images/barrel.png";
    var armor="images/armor.png";
    var cargoImage;
    var cargoName;
    var _randomCargo;
    var _i;
    _randomCargo = (Math.random()/0.25)|0;
    for (_i=0; _i<4; _i++){
        if (tankComponentList.indexOf(_i.toString()) == -1){
            _randomCargo = _i;
            break;
        }
    }
    tankComponentList += _randomCargo;
    if (tankComponentList.length >6) tankComponentList = tankComponentList.substring(1);
    switch (_randomCargo) {
        case 0:{
            cargoImage=shell;
            cargoName= tankShell;
            break
            }
        case 1:{
            cargoImage=wheel;
            cargoName= tankWheel;
            break
            }
        case 2:{
            cargoImage=barrel;
            cargoName=tankBarrel;
            break
        }
        case 3:{
            cargoImage=armor;
            cargoName=tankArmor;
            break
        }
        default:{
            cargoImage=wheel;
            cargoName="wheel";
            break
        }
    }
    var cargoID=cargoName + num;
    var tempHtml = '<img id="' + cargoID + '" src="' + cargoImage + '" class="cargo" style="position:absolute; left:' + (xArray[0]-cargoW/2) + '; top:' + (yArray[0]-cargoW) + '; "> </img>';
    $("#gameArea").append(tempHtml);
//    $('.cargo').bind("load", function(){cargoMove(cargoID);});
    cargoMove(cargoID);
}

function cargoMove(cargoID){
    beforeCrossAnimate(cargoID, 0);
    firstCrossAnimate(cargoID, 2);
    secCrossAnimate(cargoID, 2);
}

function beforeCrossAnimate(cargoID, stop){
    var i;
    for (i=stop; i<xArray.length; i++){
        $("#"+cargoID).animate({left:(xArray[i]-cargoW/2), top:(yArray[i]-cargoW/2)}, dArray[i]*speed, 'linear');
    }
}

function firstCrossAnimate(cargoID, stop){
    if ((stop != 2) && (stop != 1)) return;
    if (stop == 2){
        $("#"+cargoID).animate({left:(firstCrossXArray[0]-cargoW/2), top:(firstCrossYArray[switch1/2]-cargoW/2)}, firstCrossDArray[0]*speed, 'linear');
    }
    $("#"+cargoID).animate({left:(firstCrossXArray[1]-cargoW/2), top:(firstCrossYArray[switch1/2]-cargoW/2)}, firstCrossDArray[1]*speed, 'linear');
}

function secCrossAnimate(cargoID, stop){
    var real_switch;
    if (switch1 == 0){
        real_switch = switch2;
    }else{
        real_switch = switch3 + 3;
    }
    if (stop == 2){
        $("#"+cargoID).animate({left:(secCrossXArray[0]-cargoW/2), top:(secCrossYArray[real_switch]-cargoW/2)}, secCrossDArray[real_switch%3%2]*speed, 'linear');
    }
    $("#"+cargoID).animate({left:(secCrossXArray[1]-cargoW/2), top:(secCrossYArray[real_switch]-cargoW/2)}, secCrossDArray[2]*speed, 'linear', function(){assembleTank(cargoID);});
    //$("#"+cargoID).animate({left:(secCrossXArray[1]-cargoW/2), top:(secCrossYArray[real_switch]-cargoW/2)}, secCrossDArray[2]*speed, 'linear', function(){$("#"+cargoID).detach();});
}

function assembleTank(cargoID){
    var cargoY = $("#" + cargoID).offset().top;
    //var tankImage;
    //Important: release cargo.
    $("#"+cargoID).detach();
    cargoY =((cargoY + cargoW -secCrossYArray[0])/(secCrossYArray[1]-secCrossYArray[0])|0)
    if (cargoID.search(tankArmor) == 0){
        //tankImage="images/tank_armor.png";
        cargoID=tankArmor;
    }else if (cargoID.search(tankBarrel) ==0){
        //tankImage="images/tank_barrel.png";
        cargoID=tankBarrel;
    }else if (cargoID.search(tankShell) ==0){
        //tankImage="images/tank_shell.png";
        cargoID=tankShell;
    }else if (cargoID.search(tankWheel) ==0){
        //tankImage="images/tank_wheel.png";
        cargoID=tankWheel;
    }
    changeTankPic(cargoID, cargoY);
}

function changeTankPic(cargoID, factoryNum){
    var tankCompID="factory"+factoryNum+"Sub"+cargoID;
    if ($("#"+tankCompID).css("display") != "none" ){
        return;
    }
    $("#"+tankCompID).show();
    //var tempHtml = '<img id="' + tankCompID + '" src="'+ tankImage +'" class="factoryTank' + factoryNum + '" style="position:absolute; left:' + (secCrossXArray[1]-2*factoryX/3) + '; top:' + (secCrossYArray[factoryNum]-4*factoryY/5) + '; z-index:2 "> </img>' ;
    //var tempHtml = '<img id="factory' + factoryNum + 'Sub' + cargoID + '" src="'+ tankImage +'" class="factoryTank" style="position:absolute; left:800; top:200 ; z-index:2 "> </img>' ;
    //$("body").append(tempHtml);
    tankReadyArray[factoryNum] ++;
    if (tankReadyArray[factoryNum] != 4){
        return;
    }
    tankReady(factoryNum);
}

function tankReady(factoryNum){
    //$("#tank_blank"+factoryNum).hide();
    $(".factoryTank" + factoryNum).hide();
    tankNum++;
    tankMove(factoryNum);
    tankReadyArray[factoryNum]=0;
}

function tankMove(factoryNum){
    var tankImage="images/tank1.png";
    var tankID="factory" + factoryNum + "tank" + tankNum;
    var tempHtml = '<img id="' + tankID + '" class="tank" src="' + tankImage + '" style="position:absolute; left:' + tankPathXArray[0] + '; top:' + (secCrossYArray[factoryNum]-tankH+9) + '; z-index:0"> </img>';
    $("body").append(tempHtml);
    
    $("#"+tankID).animate({left:tankPathXArray[1]}, (tankPathXArray[0]-tankPathXArray[1])*tankSpeed, 'linear', function(){tankArray[factoryNum].pop(); $("#"+tankID).detach();});
    tankArray[factoryNum].unshift(tankID);
}

function createNPCTank(row, npcLevel){
    var npcImage;
    npcImage="images/tank" + (npcLevel+1) +".png";
    npcNum++;
    var tankID = "npc" + row + "Tank" + npcNum;
    var tempHtml = '<img id="' + tankID + '" class="' +"npcLevel" + npcLevel + '" src="' + npcImage + '" style="position:absolute; left:' + (-tankW) + '; top:' + (secCrossYArray[row]-tankH+9) + '; z-index:0"> </img>';
    $("body").append(tempHtml);
    npcArray[row].unshift(tankID);
    $("#"+tankID).animate({left:(tankPathXArray[0]+20)}, (tankPathXArray[0]-tankPathXArray[1])*npcTankSpeed[npcLevel-1], 'linear', function(){ npcArray[row].pop(); $("#"+tankID).detach();});
}

function generateNPCRow(num){
    var i;
    var _readyArray=new Array ('0', '1', '2', '3', '4', '5');
    var _tempArray=new Array();
    var _temp;
    var _temp2;
    if (num==6) return _readyArray;
    for (i=0; i<num; i++){
        _temp2 = Math.random()/(1/(6-i))|0;
        _tempArray.push(_readyArray[_temp2]);
        _temp = _readyArray[5-i];
        _readyArray[5-i]=_readyArray[_temp2];
        _readyArray[_temp2]=_temp;
    }
    return _tempArray;
}
function addNPC(){
    battleInterval += 100;
    $('span1').text(currentLevel + 1);
    if ((battleInterval%npcInterval) == 0 ){
        if (level[currentLevel].length != 0){
            var _curNpcNum = level[currentLevel].shift();
            var _npcRow = generateNPCRow(_curNpcNum);
            var i;
            for (i=0; i<_curNpcNum; i++){
                createNPCTank(_npcRow[i], nPCLevel[currentLevel].shift());
            }
        }else{
            //level finished.
            currentLevel ++;
            //clearTimeout(intervalBattleID);
            battleInterval = 0;
            //levelSwitchID = setTimeout(levelSwitchNotify, 100);
            levelCompFlag = 1;
            clearTimeout(intervalNPCID);
            levelSwitchNotify();
            //alert("level:" + currentLevel +" finished");
            //stopGame();
        }
    }

    if (levelCompFlag != 1) intervalNPCID = setTimeout(addNPC, 100);
}

function beginBattle(){
    tankVS();
    if (gameStopFlag != 1) intervalBattleID = setTimeout(beginBattle, 100);
}

function levelSwitchNotify(){
    var _i;
    var _j=0;

    // Check if there is still NPC tanks moving
    for (_i=0; _i<6; _i++){
        if (npcArray[_i].length !=0 ){
            _j = 1;
            break;
        }
    }
    if (_j != 0){
        levelSwitchID = setTimeout(levelSwitchNotify, 100);
        return;
    }
    
    if (currentLevel == level.length){
        $("#levelSwitch").html('<p id="showLevel" style="position:absolut; left:150; top:100; color:#528820; font-size:32px; z-index:4">Congratulations! All levels are completed!</p>');
        stopGame();
        return;
    } 

    if ( $('showLevel').length <=0){
        $("#levelSwitch").html('<p id="showLevel" style="position:absolut;left:350; top:200; color:#528820; font-size:32px; z-index:4">Level: ' + currentLevel + ' clear!</p>');
        $("#showLevel").hide();
    }
    $("#showLevel").html("Level: " + currentLevel + ' clear!' );
    $("#showLevel").fadeIn(2000);
    $('#showLevel').fadeOut(2000, function(){
        levelCompFlag = 0;
        intervalNPCID = setTimeout(addNPC, 100);
    });
}

function tankVS(){
    var _i;
    var _npcX;
    var _tankX;
    var _npc;
    var _tank;
    var _npcLevel;
    for (_i=0; _i<6; _i++){
        if (npcArray[_i].length !=0 ){
            _npc = npcArray[_i][(npcArray[_i].length-1)];
            _npcX = $("#" + _npc).offset().left;
            if (tankArray[_i].length != 0){
                _tank = tankArray[_i][tankArray[_i].length-1];
                _tankX = $("#" + _tank).offset().left;
                if (_tankX - _npcX -tankW < 5){
                    //TODO: add npc level judgement
                    $("#" + _npc).stop();
                    _npcLevel = $("#"+_npc).attr("class");
                    npcArray[_i].pop();
                    //$("#"+_npc).fadeOut("1000", function(){$("#"+_npc).detach();});
                    $("#" + _npc).detach();
                    createExplode(_npcLevel, _npcX, _i);
                }
            }else if ((_npcX + tankW - secCrossXArray[1]) >=0 ){
                stopGame();
                alert("You lose. Game Over!");
//            }else if ((_npcX + tankW - secCrossXArray[1] + 2*factoryX/3) >=0 ){
//                factoryWarn(_i);
            }
        }
    }
}

function factoryWarn(_num){
    $('#factory'+_num).fadeOut();
    $('#factory2'+_num).fadeOut();
    $('#factory'+_num).fadeIn();
    $('#factory2'+_num).fadeIn();
    $('#factory'+_num).fadeOut();
    $('#factory2'+_num).fadeOut();
    $('#factory'+_num).fadeIn();
    $('#factory2'+_num).fadeIn();
    $('#factory'+_num).fadeOut();
    $('#factory2'+_num).fadeOut();
    $('#factory'+_num).fadeIn();
    $('#factory2'+_num).fadeIn();
}

function createExplode(_npcLevel, _npcX, _i){
    var _explodeID = "explodeID" + _i;
    var _explodeImage;
    switch (_npcLevel){
        case "npcLevel1":{
            _explodeImage = "tank2-1.png";
            break
        }
        case "npcLevel2":{
            _explodeImage = "tank3-1.png";
            break
        }
        case "npcLevel3":{
            _explodeImage = "tank4-1.png";
            break
        }
    }
    var _tempHtml = '<img id="' + _explodeID + '" class="explodeID" src="images/' + _explodeImage + '" style="position:absolute; left:' + _npcX + '; top:' + (secCrossYArray[_i]-tankH+9) + '; z-index:3"> </img>';
    $("#gameArea").append(_tempHtml);
    $("#" + _explodeID).fadeOut("1500", function(){$(this).detach()});
}

var intervalBattleID;
var levelSwitchID;
var gameStopFlag;
var levelCompFlag;
var battleInterval=0;
var flag=0;
var intervalID;
var intervalNPCID;
var cargoW=25;
var factoryX=100;
var factoryY=60;
var tankH=30;
var tankW=65;
var speed=10;
var tankSpeed=30;
var npcTankSpeed=[110, 90, 70];
var tankBarrel="barrel";
var tankWheel="wheel";
var tankShell="shell";
var tankArmor="armor";
var tankBarrelSrc="images/tank_barrel.png";
var tankArmorSrc="images/tank_armor.png";
var tankShellSrc="images/tank_shell.png";
var tankWheelSrc="images/tank_wheel.png";
var tankNum=0;
var npcNum=0;
var tankReadyArray = new Array(0, 0, 0, 0, 0, 0);
var xArray= new Array(773, 773, 708, 708, 648);
var yArray= new Array(0, 468, 468, 258, 258);
var dArray= new Array(0, 460, 65, 210, 60);
var firstCrossXArray=new Array(593, 548);
var firstCrossYArray=new Array(142, 373);
var firstCrossDArray=new Array(128.4 , 45);
var secCrossXArray=new Array(503, 463);
var secCrossYArray=new Array(65, 142, 219, 296, 373, 450);
//if x.index=0 and x*Y = odd, d=array[0]; if =even,d=array[1]; if x.index=1; d=array[2]
var secCrossDArray=new Array(94.6, 55, 40);
var tankPathXArray=new Array(400, 0);

//player's tank
var tankArray = new Array(6);
var npcArray = new Array(6);
var tankComponentList = "";
//For game pausing
var idQueue = new Array();
var animationQueue = new Array();

var currentLevel = 0;
//define npc tanks num in each round.
var level = new Array();
var npcInterval = 10000;
var battleTime = 0 ;
//define npc tank level.
var nPCLevel = new Array();

var switch1=0;
var switch2=0;
var switch3=0;

//$.mobile.loadingMessage="";
window.onload = function() {
  document.onselectstart = function() {return false;} // ie
  document.onmousedown = function() {return false;} // mozilla
}
$('img').bind('dragstart', function(event) { event.preventDefault(); });


$(document).ready(function (){
    gameInit();
 //   gameStart();
})

