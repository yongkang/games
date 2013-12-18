function gameInit(){
    //create a canvas
    //$("body").append('<div id="firstDiv" class="firstDiv" width=400 height=400 style="position:absolute; left:0; top:0; "> </div>');
    $("body").append('<div id="firstDiv" class="firstDiv" width=422 height=422 style=""> </div>');
    //load background image
    //$("#firstDiv").append('<img id="gameMenuBackground" src="images/background.jpg" class="firstDiv" width=400 height=400 style="position:absolute; left:0; top:0; "> </img>');
    $("#firstDiv").append('<img id="gameMenuBackground" src="images/background.png" class="firstDiv" width="402px" height="402px" style=" "> </img>');
    
    //load Game Name.  
    $("#firstDiv").append('<p id="gameName" class="firstDiv" style="position:absolute; left:' + (50+pX) +'px; top:-100px; font-size:48px; color:#444444; z-index:2" width="300px" > Labyrinth </p>');

    //load sound.

    //show Game Name.
    $("#gameName").animate({top: 40}, 1000, "swing", function(){gameOption();});
}

function gameOption(){
    //show game menu and attach actions.
    $("body").append('<div id="gameMenu" class="gameMenu" style"z-index:4"> <button id="gameStart" class="gameMenu" style="position:absolute; left:' + (140 + pX) + 'px; top:'+ (300+pY) + 'px; z-index:2" width="100px">Start </button></div>');
    //select row.
    $("#gameMenu").append('<p style="position:absolute; left:' + (70 + pX) + 'px; top:'+ (120+pY) + 'px; z-index:2"> Select Maze Complexity:</p>');
    $("#gameMenu").append('<form style="position:absolute; left:' + (90 + pX) + 'px; top:'+ (160+pY) + 'px; z-index:2">Row: <br /> <input type="radio" id="row" name="row" value ="10"></input> 10 <input type="radio" id="row" name="row" value ="15"> </input> 15 <br /> Column: <br /> <input type="radio" id="column" class="column" name="column" value="10"></input> 10 <input type="radio" id="column" class="column" name="column" value="20"></input> 20  <br /> Fog: <br /> <input type="radio" id="fog" class="fog" name="fog" value="1"></input> Y <input type="radio" id="fog" class="fog" name="fog" value="0"></input> N</form>');
//    $("body").append('<div id="gameMenu" class="gameMenu" > <button id="gameOption" class="gameMenu" style="position:absolute; left:350; top:180; width:100" > </button> </div>');
//    $("body").append('<div id="gameMenu" class="gameMenu" > <button id="gameHelp" class="gameMenu" style="position:absolute; left:350; top:210; width:100" ></button> </div>');
//    $("body").append('<div id="gameMenu" class="gameMenu" > <button id="gameRank" class="gameMenu" style="position:absolute; left:350; top:240; width:100" >Rank </button> </div>');

    //Add actions
    $("#gameStart").click(gameStart)
}

function gameStart(){
    if ($("#row")[0].checked) mapWidth=landWidth * 10;
    if ($("#column")[0].checked) mapTop=landTop * 10;
    if ($("#fog")[0].checked) fogF = 1;
    vertInt = mapTop/landTop;
    $("#gameMenu").hide();
    $("#gameName").hide();
    $("#gameMenuBackground").hide();
    var playerX=mapWidth + pX - landWidth/2 - 5;
    var playerY=mapTop + pY + landTop/2;
    //$("body").append('<div id="gameArea" class="gameArea" style="position:absolute; height:' + (pY+mapTop) +'px; width:' + (pX+mapWidth)+ 'px; overflow:hidden"></div>');
    $("body").append('<div id="gameArea" class="gameArea" style="position:absolute;" ></div>');
    $("#gameArea").append('<audio id="stepAudio" src="audio/steps.ogg"></audio>');
    $("body").append('<div id="gameCan" class="gameArea"> <canvas id="gameAreaCan" class="gameArea" width="'+ (mapWidth+10) +'px" height="'+ (mapTop+10) + 'px" style="position:absolute; left:' + pX + 'px; top:' + pY +'px"> </canvas> </div>');
    //load background image
    //$("#gameArea").append('<img id="gameBackground" src="images/background.png" class="gameArea" width="402px" height="402px"> </img>');
    var mycan = $('#gameAreaCan')[0].getContext('2d');
    mycan.lineWidth='4';
    mycan.beginPath();
    mycan.moveTo(0, 0);
    mycan.lineTo(0, mapTop);
    mycan.lineTo(mapWidth-landWidth, mapTop);
    mycan.lineTo(mapWidth-landWidth, mapTop+10);
    mycan.stroke();

    mycan.beginPath();
    mycan.moveTo(landWidth, 0);
    mycan.lineTo(mapWidth, 0);
    mycan.lineTo(mapWidth, mapTop+10);
    mycan.stroke();

    //
    lands = createMap();
    
//    $("body").append('<div id="gameMask" style="position:absolute; left:' + pX + 'px; top:' + pY + 'px; width:'+ mapWidth +'px; height:' + mapTop + 'px; z-index:3; overflow:hidden"> </div>');
    if (fogF == 1) {
        //$("body").append('<div id="gameMask" style="position:absolute; left:0px; top:0px; width:'+ (mapWidth + pX +5) +'px; height:' + (mapTop+pY+10) + 'px; z-index:3; overflow:hidden"> </div>');
        $("body").append('<div id="gameMask" style="position:absolute; left:'+ pX +'px; top:' + pY + 'px; width:'+ (mapWidth + 5) +'px; height:' + (mapTop+10) + 'px; z-index:3; overflow:hidden"> </div>');
        //$("#gameMask").append('<img id="showMap" src="images/mask.png" style="position:absolute; left:' + (0 - 2*fogX) + 'px; top:' + (5+playerY - fogY) + 'px; z-index:3;"> </img>');
        $("#gameMask").append('<img id="showMap" src="images/mask.png" style="position:absolute; left:' + (0 - 3*fogX) + 'px; top:' + (5+playerY - fogY -pY) + 'px; z-index:3;"> </img>');
    //    $("#gameMask").append('<img id="showMap" src="images/mask.png" style="position:absolute; left:' + (playerX- fogX +5) + 'px; top:' + (playerY - fogY+5) + 'px; z-index:3;"> </img>');
    
        $("#showMap").animate({left:(playerX -fogX +5 -pX)}, 4000, 'linear', function(){attachBegin(playerX, playerY);});
    }else{
        attachBegin(playerX, playerY)        
    }
}

function attachBegin(playerX, playerY){
    $("body").append('<button id="gameBegin" class="gameMenu" style="position:absolute; left:' + (mapWidth + pX +  20)+ 'px; top:' + (150+pY) + 'px; z-index:4" width="100px">Begin </button>');
    $("#gameArea").append('<img id="player" src="images/player_back0.png" class="gameArea" style="position:absolute; left:' + playerX + 'px; top:'+ playerY +'px; z-index:1"> </img>');
    $("#gameBegin").click(gameBegin);
}

function gameBegin(){
    $("#gameBegin").hide();
    timeB = new Date();
    timeB= timeB.getTime();
    $(document).keydown(playerMove);
}

function findLand(_x, _y){
    return ((_x/landWidth|0)*mapTop/landTop + (_y/landTop|0));
}

function calTime(time){
    var newtime=time/1000|0;
    var hour=newtime/3600|0;
    var min=(newtime%3600)/60|0;
    var sec=(newtime%3600)%60;
    
    return ""+hour+":"+min+":"+sec;
}

function victory(){
    $(document).unbind('keydown');
    var timeE = new Date();
    timeE = timeE.getTime() - timeB;
    var time = calTime(timeE);
    alert("victory! Time costing: "+ time);
}

function playerMove(_event){
    interval++;
    if (interval != 4){
        return;
    }
    interval = 0;
    var _pL=$("#player").offset().left - pX;
    var _pT=$("#player").offset().top - pY;
    var _land = findLand(_pL+5, _pT+5);
    if (fogF == 1){
        var _fogX = $("#showMap").offset().left - pX;
        var _fogY = $("#showMap").offset().top - pY; 
    }
    if (( _land == 0)  && ( _pT < (lands[0].y + landTop/2))){
        victory();
    }
    switch (_event.keyCode){
        case 37:{
            if ((lands[_land].wall[0] == 0) || ((lands[_land].wall[0] == 1) && (_pL - stepPix) >= lands[_land].x)){
                $("#player").css('left', (_pL + pX - stepPix));
                changePlayer(1);
                if (fogF == 1) $("#showMap").css('left', (_fogX - stepPix));
            }
            break
        }
        case 38:{
            if ((lands[_land].wall[1] == 0) || ((lands[_land].wall[1] == 1) && (_pT - stepPix) >= lands[_land].y)){
                $("#player").css('top', (_pT + pY - stepPix));
                changePlayer(0);
                if (fogF == 1) $("#showMap").css('top', (_fogY - stepPix));
            }
            break
        }
        case 39:{
            if ((lands[_land].wall[2] == 0) || ((lands[_land].wall[2] == 1) && (_pL + stepPix + 15) <= (lands[_land].x + landWidth))){
                $("#player").css('left', (_pL + pX + stepPix));
                changePlayer(1);
                if (fogF == 1) $("#showMap").css('left', (_fogX + stepPix));
            }
            break
        }
        case 40:{
            if ((lands[_land].wall[3] == 0) || ((lands[_land].wall[3] == 1) && (_pT + stepPix + 17) <= (lands[_land].y + landTop))){
                $("#player").css('top', (_pT + pY + stepPix));
                changePlayer(0);
                if (fogF == 1) $("#showMap").css('top', (_fogY + stepPix));
            }
            break
        }
    }
}
function changePlayer(flag){
    steps = (steps + 1)&1;
    if (flag == 1){
        $("#player").attr('src', ('images/player_side' + steps +'.png'));
    }else{
        $("#player").attr('src', ('images/player_back' + steps +'.png'));
    }
    //play step sound
    if (($('#stepAudio')[0].paused) || ($('#stepAudio')[0].ended)) $('#stepAudio')[0].play();
}

function createMap(){
    var _lands = initLand();
    _lands[0].wall[1]=0;
    _lands[_lands.length-1].wall[3]=0;
    
    for (var _i=0; _i< _lands.length; _i++){
        _lands[_i].wall = removeBoundary(_lands[_i]).slice();
    }
    _lands = chooseDirc(_lands);
    for (var _i=0; _i< _lands.length; _i++){
        _lands[_i].wall = addBackBoundary(_lands[_i]).slice();
    }
    _lands[0].wall[1]=0;
    _lands[_lands.length-1].wall[3]=0;
    for (var _i=0; _i< _lands.length; _i++){
        drawWall(_lands[_i]);
    }

    //add a new land for player startup
    var _newland = new land((mapWidth-landWidth), mapTop, [1, 0, 1, 1], _lands.length);
    _lands.push(_newland);
    return _lands;
    
//    var _html = '<img class="wall" src="images/horiStart.png" height="5px" width="' + (landTop-5) + 'px" style="position:absolute;left:' + (_lands[0].x) + 'px; top:' + _lands[0].y + 'px; z-index:1"></img>';
//    _html += '<img class="wall" src="images/horiStart.png" height="6px" width="' + landTop + 'px" style="position:absolute;left:' + _lands[_lands.length - 1].x + 'px; top:' + (_lands[_lands.length - 1].y + landWidth - 4) + 'px; z-index:1"></img>';
//    $('#gameArea').append(_html);
}

//land is a square with 4 lines. _x, _y are its left top point.
function land(_x, _y, _wall, _num){
    this.x=_x;
    this.y=_y;
    this.wall=_wall;
    this.num=_num;
}

function removeBoundary(_land){
    var _dirArray=[0, 0, 0, 0];
    if (_land.x != 0){
        _dirArray[0] = 1;
    }

    if (_land.x != (mapWidth - landWidth)){
        _dirArray[2] = 1;
    }

    if (_land.y != 0){
        _dirArray[1] = 1;
    }

    if (_land.y != (mapTop - landTop)){
        _dirArray[3] = 1;
    }
    return _dirArray;
}

function addBackBoundary(_land){
    if (_land.x == 0){
        _land.wall[0] = 1;
    }

    if (_land.x == (mapWidth - landWidth)){
        _land.wall[2] = 1;
    }

    if (_land.y == 0){
        _land.wall[1] = 1;
    }

    if (_land.y == (mapTop - landTop)){
        _land.wall[3] = 1;
    }
    return _land.wall;

}

function pickRandom(_range){
    return  Math.random()/(1/_range)|0;
}

function chooseDirc(_lands){
    var _uniArray=[];
    var _newArray=[];
    var _tempArray=_lands.slice();
    for (var _i=0; _i<_lands.length; _i++){
        _uniArray.push(-1);
    }
    
    while ( _tempArray.length != 0){
        var _temp = pickRandom(_tempArray.length);
        var _tempLand = _tempArray[_temp];
        _tempArray.splice(_temp, 1);
        if (_uniArray[_tempLand.num] != -1) continue;

        var _dire = judgeDire(_tempLand);
        var _nb = breakWall(_lands, _dire, _tempLand.num);

        if (_uniArray[_nb] == -1){
            if (_uniArray[_tempLand.num] == -1){
                _uniArray[_tempLand.num] = _tempLand.num;
            }
            _uniArray[_nb] = _uniArray[_tempLand.num];
        }else{
            if (_uniArray[_tempLand.num] == -1){
                _uniArray[_tempLand.num] = _uniArray[_nb];
            }else{
                changeUnionVal(_nb, _uniArray, _tempLand.num);
            }
        }
    }

    var _union = 1;
    var _tempArray2 = _uniArray.concat();
    _tempArray2.sort();
    for (_i =1 ; _i< _lands.length; _i++) {
        if (_tempArray2[_i] != _tempArray2[_i-1]) _union++;
    }

//        for (var _i=0; _i< _lands.length; _i++){
//            drawWall(_lands[_i]);
//        }
    while (_union > 1){
        var _nbAll = findAllNB(_lands, _uniArray, _i);
        var _nb=_nbAll[pickRandom(_nbAll.length)];
        mergeUnion(_lands, _uniArray, _nb[0], _nb[1]);
        _union--;
//        $(".wall").detach();
//        for (var _i=0; _i< _lands.length; _i++){
//            drawWall(_lands[_i]);
//        }
    }
    $(".wall").detach();
    return _lands;
}

function findAllNB(_lands, _uniArray){
    _allNB = [];
    for (var _i=0; _i<_lands.length; _i++){
        var _nbDire = findNBDire(_lands[_i], _uniArray);
        if ( _nbDire.length >0 ){
            _allNB.push([_nbDire, _i]);
        }
    }
    return _allNB;
}

function mergeUnion(_lands, _uniArray, _nbDire, _landnum){
    _nb = breakWall(_lands, _nbDire[pickRandom(_nbDire.length)], _landnum);
    changeUnionVal(_nb, _uniArray, _landnum);
}

function changeUnionVal(_nb, _uniArray, _landnum){
    _tempVal = _uniArray[_nb];
    for (var _i = 0; _i<_uniArray.length; _i++){
        if (_uniArray[_i] == _tempVal){
            _uniArray[_i] = _uniArray[_landnum];
        }
    }
}

function breakWall(_lands, _dire, _num){
    var _nb;
    if (_dire == 2){
        _nb = _num + vertInt;
        _lands[_num].wall[2]=0;     
        _lands[_nb].wall[0]=0;     
    }else if (_dire == 3){
        _nb = _num + 1;
        _lands[_num].wall[3]=0;     
        _lands[_nb].wall[1]=0;     
    }else if (_dire == 1){
        _nb = _num - 1;
        _lands[_num].wall[1]=0;     
        _lands[_nb].wall[3]=0;     
    }else if (_dire == 0){
        _nb = _num - vertInt;
        _lands[_num].wall[0]=0;     
        _lands[_nb].wall[2]=0;     
    }
    return _nb;
}

//function findUnionNB(_lands[0], _uniArray){
//    if (findNB(_lands[0], _uniArray).length != 0) return 1;
//}

function findNBDire(_land, _uniArray){
    var _landNum = _uniArray[_land.num];
    var _nb = [];
    if ((_land.x !=0) && (_uniArray[_land.num-vertInt] != _uniArray[_land.num])){
        _nb.push(0);
    }
    
    if ((_land.y !=0) && (_uniArray[_land.num-1] != _uniArray[_land.num])){
        _nb.push(1);
    }
    
    if ((_land.y != mapTop - landTop) && (_uniArray[_land.num+1] != _uniArray[_land.num])){
        _nb.push(3);
    }
    if ((_land.x != mapWidth- landWidth) && (_uniArray[_land.num+vertInt] != _uniArray[_land.num])){
        _nb.push(2);
    }
    return _nb;
}

//dirction: 0: left; 1: up; 2: right; 3: down
function judgeDire(_tempLand){
    var _sum = 0;
    for (var _i=0; _i<_tempLand.wall.length; _i++){
        _sum += _tempLand.wall[_i];
    }
    _sum = pickRandom(_sum) + 1;
    
    _i= -1;
    while (_sum >0){
        _i++;
        _sum -= _tempLand.wall[_i];
    }

    return _i;
}

function createDircMask(_land){
    //mask out 4 boundaries. 
    var _mask = direction(_land);
    
}

function drawWall(_land){
    if (_land.wall[0] == 1){
        var _html = '<img class="wall" src="images/vertWall.png" height="' + landTop + 'px" style="position:fixed;left:' + (_land.x+pX) + 'px; top:' + (_land.y + pY) + 'px; z-index:1"></img>';
        $("#gameArea").append(_html);
    }
    
    if (_land.wall[1] == 1){
        var _html = '<img class="wall" src="images/horiWall.png" width="'+ landWidth +'px" style="position:fixed; left:' + (_land.x+pX) + 'px; top:' + (_land.y + pY) + 'px; z-index:1"></img>';
        $("#gameArea").append(_html);
    }
}

function initLand(){
    var _landArray=[];
    for (var _i=0; _i<(mapWidth/landWidth); _i++){
        for (var _j=0; _j<(mapTop/landTop); _j++){
            var _land = new land(_i*landWidth, _j*landTop, [1,1,1,1], _i*vertInt + _j);
            _landArray.push(_land);
        }
    }
    return _landArray;
}

var fogF = 0;
var fogX=600;
var fogY=600;
var pX=50;
var pY=50;
var mapWidth = 600;
var mapTop = 450;
var landWidth = 30;
var landTop = 30;
var horiInt = mapWidth/landWidth;
var vertInt;
var lands=[];
var timeB;
var stepPix = 10;
var steps=0;
var interval=0;

$(document).ready(function(){
    gameInit();    
})
