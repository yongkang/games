    var player = new Image();  
    var ball = new Image();  
    var ground = new Image();  
    var monitor = new Image();  
    var background = new Image();  
    var x=0;
    var y=0;
    var x1=0;
    var y1=0;
    var enablemov_key=0;
    var velocity=0;
    var velo_limit=300;   
    var h_velo=0;
    var v_velo=0;
    var angle=0;
    var throwout_angle=0;

    var limit_velocity=10;
    var acceleration=50;
    var gravity= 250;
    var direction_angle=11/6*Math.PI;
    var direction=0;
    var ballstop=1;

    var height=30;
    var ball_adjust_height=100;

    var ball_x=radius;
    var ball_y=0;

    var time_interval=0.01;
    var time_interval_id;

    var center_x=150;
    var center_y=320;
    var radius=35;
    var result=0;

    var players = 5;
    var result_board=new Array();
    var name_board=new Array();
    var role;
    var present_player;
    var human_name;
    var present_player_name;

    //var velo_adjust=0.1;

    var game_start=0;
    var game_mode=1;
    
    var pc_level_power = new Array("250", "280", "290", "299");
    var pc_level_random = new Array("1", "0.8", "0.5", "0.1");
    var pc_level = 0;

$(document).ready(function(){
    //$(".gameStart").each(function(){$(this).attr('visibility','true');});
//     $(".gameStart").show(); 
    init();
})

function createHtml(){
    var _tempHtml = '<div id="game_area"><canvas id="Mycanvas" width="800" height="500" style="border:1px solid;position:absolute; left: 0; top: 0; z-index: 0;"> </canvas></div>';
    _tempHtml += '<div id="gameStartPage" style="position:absolute; left: 0; top: 0">';
    _tempHtml += '<img src="images/background.png" style="position:absolute; left: 0; top: 0; z-index: -1;"></img>';
    _tempHtml += '<input type="button" class="gameStart" id="match_button" onclick="gameStart(1)"  value="Begin New Match" style="position:absolute; left: 300; top: 150; z-index: 1;"></input>';
    _tempHtml += '<input type="button" class="gameStart" id="practice_button" onclick="gameStart(2)" value="Practise" style="position:absolute; left: 300; top: 210; z-index: 1;"></input>';
    _tempHtml += '<input type="button" id="help" onclick="show_help()" class="gameStart" value="Help" style="position:absolute; left: 300; top: 270; z-index: 1;"></input>';
    _tempHtml += '<input type="button" id="rankList" onclick="show_rank_list()" class="gameStart" value="Ranks" style="position:absolute; left: 300; top: 330; z-index: 1;"></input>';
    _tempHtml +=' <p1 class="name" style="position:absolute; left: 350; top: 180; z-index: 1;">Your Name: </p1>';
    _tempHtml += '<p2 class="timeOut" style="position:absolute; left: 350; top: 200; z-index: 1;">Time Out! </p2>';
    _tempHtml += '<p2 class="outOfBoundary" style="position:absolute; left: 350; top: 200; z-index: 1;">Out of Boundary! </p2>';
    _tempHtml += '<input type="text" id="human_name" class="name" value="You" style="position:absolute; left: 350; top: 200; z-index: 1;"></input>';
    _tempHtml += '<input type="button" id="nameOK" class="name" value="OK" onclick="inputName()" style="position:absolute; left: 350; top: 230; width: 40 ;z-index: 1;"></input>';
    _tempHtml += '<p1 id class="button1" style="position:absolute; left: 330; top: 150; width:200; z-index: 1;">Choose PC Level: </p1>';
    _tempHtml += '<label id="pc_level" class="pcLevel" style="position:absolute; left: 50; top: 460; width: 200; z-index: 1;">PC Level: Starter</label>';
    _tempHtml += '<input type="button" id="level1" onclick="change_level(0)" class="button1" value="Starter" style="position:absolute; left: 330; top: 170; z-index: 1;"></input>';
    _tempHtml += '<input type="button" id="level2" onclick="change_level(1)" class="button1" value="Medium" style="position:absolute; left: 330; top: 230; z-index: 1;"></input>';
    _tempHtml += '<input type="button" id="level3" onclick="change_level(2)" class="button1" value="Hard" style="position:absolute; left: 330; top: 290; z-index: 1;"></input>';
    _tempHtml += '<input type="button" id="level4" onclick="change_level(3)" class="button1" value="Invicible" style="position:absolute; left: 330; top: 350; z-index: 1;"></input>';
    _tempHtml += '<img id="gameHint" style="position:absolute; left: 350; top: 360; z-index: 0;"  class="gameHint" src="images/mouse_click2.png"></img>';
    _tempHtml += '<img id="gameHint2" style="position:absolute; left: 420; top: 250; z-index: 0;"  class="gameHint" src="images/mouse2.png"></img></div>';
    _tempHtml += '<div id="gameHead" style="position:absolute; left: 320; top:0"><h2> Hammer</h2></div>';
    _tempHtml += '<div id="information" style="position:absolute; left: 850; top: 0; height:500; width:250; overflow: scroll"></div>';
    _tempHtml += '<input type="button" onclick="returnMain()" id="gameReturn" class="button2" value="Quit" style="position:absolute; left:400; top:470" hide></input>';
    _tempHtml += '<input type="button" onclick="cont()" id="gameCon" class="button2" value="Cont." style="position:absolute; left:300; top:470" hide></input>';
    $('body').append(_tempHtml);
}
function init(){  
    player.src = 'images/player.png';  
    ball.src = 'images/NPC.png';  
    ground.src = 'images/ground.png';  
    monitor.src = 'images/monitor.png';
    background.src = 'images/background.png';
    reset();
    //draw();
    //show_help();
    createHtml();
    $("#gameReturn").hide();
    $("#gameCon").hide();
    $(".button1").hide();
    $(".name").hide();
    $(".pcLevel").hide();
    $(".gameHint").hide();
    $(".timeOut").hide();
    $(".outOfBoundary").hide();
}  

function enablemov(env){
    if (game_start == 2){
        x=env.clientX;
        y=env.clientY;
    }else if((game_start == 1) && (role != "PC")){
        $("#gameReturn").hide();
        start();
    }
}

function disablemov(env){
    if ((game_start == 1) && (role != "PC")){
        game_start = 2;
        return;
    }
    if (game_start != 2){
        return;
    }
    enablemov_key=1;
    x1 = env.clientX - x;
    y1 = env.clientY - y;
    throwout_angle = Math.asin(y1/Math.sqrt(x1*x1 + y1*y1));
    if (throwout_angle < 0) {
        throwout_angle += 2*Math.PI;
    }
}

function reset(){
    x=0;
    y=0;
    enablemov_key=0;
    velocity=0;
    angle=Math.random()*Math.PI*2;
    ballstop=1;
    game_start=0;
    ball_x=radius;
    ball_y=0;
    h_velo=0;
    v_velo=0;
    ball_height = height;
    ball_adjust_height=100;
    result=0;
    direction=0;
    human_name = $("#human_name").attr("value");
    gravity= 250;
}

function start(){
    reset();
    //velocity begin to increase
    present_player_name = human_name;
    enablemov_key=0;
    game_start = 1;
    time_interval_id = setInterval(draw, 1000*time_interval);  
}

function PC_round(){
    game_start=2;
    time_interval_id = setInterval(draw, 1000*time_interval);
}

function game_stop(){
    clearInterval(time_interval_id);
    game_start=5;
    if(game_mode != 1){
        $("#gameReturn").show();
        $("#gameCon").show();
    }
}

function throwout(){
    //  ballstop=0
    if ((ball_height <= -ball_adjust_height) && (v_velo <0)){
        game_start=4; //ball stopped
        //game_stop();
        ball_height = -ball_adjust_height;
        velocity = 0;
    }

    if ((ball_height > -ball_adjust_height) || (v_velo > 0))  {
        ball_height += v_velo*time_interval - gravity*time_interval*time_interval/2;
        v_velo = v_velo - gravity*time_interval;
        ball_x = ball_x + h_velo*time_interval;
        ball_y = height - ball_height;
//        ball_y=ball_y+velocity*time_interval;
    }
}

function mov(env){
//  if (enablemov_key > 0) {
//      x=env.clientX;
//      y=env.clientY;
//   }
}

function draw_ground(yyk){
//    yyk.save();
//    pattern=yyk.createPattern(ground, "repeat");
//    yyk.fillStyle=pattern;
//    yyk.lineWidth="2";
//    yyk.strokeStyle='rgb(93,93,93)';
//    yyk.beginPath();
//    yyk.transform(1,0,0,0.5,0,125);
//    yyk.arc(400, 270, 390, 0, 2*Math.PI, false);
//    yyk.fill();
//    yyk.stroke();
//    yyk.restore();
    yyk.drawImage(background, 0, 0);
}

//var times=0;
function draw() {  
    var yyk = document.getElementById('Mycanvas').getContext('2d');  
    
    yyk.globalCompositeOperation = 'source-over';  
    yyk.clearRect(0,0,800,500); // clear canvas  
    yyk.fillStyle = 'rgba(0,0,0,0.4)';  
    yyk.strokeStyle = 'rgba(0,0,0,0.4)';  
    yyk.lineWidth = 3;
    draw_ground(yyk);   
    yyk.save();  
//    yyk.translate(center_x,center_y);  
    
    if (game_start == 2) {
        // The man's power can't be increased for ever. Need modify for <=0.
        if (velocity >= velo_limit){
            direction=1;
        }
        if ((velocity <= 0) && (direction == 1)){
            direction=0;
            game_stop();
            if (role != "PC") $(".timeOut").show();
        }

        if (direction == 0){
            velocity += acceleration*time_interval;        
        }else {
            velocity -= acceleration*time_interval;        
        }
        angle += velocity/radius*time_interval;
    }

    //draw ball before throw out.
    if (game_start < 3){ 
        //calc angle
        ball_x = radius*Math.cos(angle);
        ball_y = radius/2*Math.sin(angle);
        var ball_radius = Math.sqrt(ball_x*ball_x + ball_y*ball_y);
        //draw ball chain
        //yyk.save();
        yyk.beginPath();
        yyk.strokeStyle="#999999";
        var chain_angle = Math.asin(ball_y/ball_radius);
        if ( ball_x < 0 ){
            chain_angle = Math.PI - chain_angle;
        }
        //yyk.rotate(chain_angle);
        yyk.moveTo(center_x, center_y);
        yyk.lineTo(center_x+ball_x, center_y+ball_y);
        yyk.stroke();
        //yyk.restore();
    }

    //trigger the throw out event by man. 
    if ((enablemov_key == 1) && (game_start == 2) && (role != "PC"))  {
        game_start = 3;
        angle=throwout_angle;
        // Only 1st quardant is valid throw out field.
        doSomethingBeforeThrowOut();
        draw_throwout_direction(yyk);
    }

    if (role == "PC"){
        judge_throw_chance();
    }
    
    if (game_start == 3) {  
        throwout();
    }

    if (game_start == 4) {
        //calculate result
        judge_result(yyk);
    }
    //Draw man
    switch ((((angle % (2*Math.PI)) - Math.PI/4)/Math.PI*2)|0){
        case 0:
            player.src = 'images/player.png';  
            if (role == "PC") player.src = 'images/player_pc.png';
            break
        case 1:
            player.src = 'images/player_left.png';  
            if (role == "PC") player.src = 'images/player_pc_left.png';
            break
        case 2:
            player.src = 'images/player_back.png';  
            if (role == "PC") player.src = 'images/player_pc_back.png';
            break
        case 3:
            player.src = 'images/player_right.png';  
            if (role == "PC") player.src = 'images/player_pc_right.png';
            break
        default:
            player.src = 'images/player.png';  
            if (role == "PC") player.src = 'images/player_pc.png';
            break
    } 
    if (game_start >= 3) {
        player.src = 'images/player_right.png';
        if (role == "PC") player.src = 'images/player_pc_right.png';
    }
    //yyk.drawImage(player,center_x-10,center_y-22.5,20,45);  
    yyk.drawImage(player,center_x-10,center_y-22.5,20,45);  
    //draw ball
    //yyk.translate(-7.5, -7.5);  
    yyk.drawImage(ball,ball_x+center_x-7.5,ball_y+center_y-7.5);  
    yyk.restore();  
      
    show_result(yyk);

    //draw ground circle.
    //yyk.strokeStyle="white";
    yyk.strokeStyle = 'rgba(250,250,250,0.7)';  
    yyk.fillStyle = 'rgba(250,250,250,0.7)';  
    //drawEclipse(yyk, center_x, center_y+30, radius, radius/2);
    
    //draw boundary : use background pic instead.
    //draw_game_lines(yyk);
    draw_power(yyk);

    //draw current user name.
    draw_user_name(yyk);
    draw_record(yyk);
}

function draw_user_name(yyk){
    var text_left=50;
    var text_top=50;
    var user_name=human_name;
     
    yyk.fillStyle = "Black";  
    yyk.font = "14pt bold";
    if ( role == "PC"){
        user_name = present_player_name;
    }
    yyk.fillText("Current User: " + user_name, text_left, text_top);  
}

function draw_record(yyk){
    var text_left=550;
    var text_top=50;
    var user_name = localStorage.getItem('record_name1');
    var present_record = localStorage.getItem('record_result1');
    if (!present_record) return;

    yyk.fillStyle = "Black";  
    yyk.font = "14pt bold";
    yyk.fillText("Local Record: " + user_name + " - " + present_record, text_left, text_top);
}

function draw_throwout_direction(yyk){
    yyk.strokeStyle = 'rgba(240, 240, 240, 0.7)';
    yyk.fillStyle = 'rgba(240, 240, 240, 0.7)';
    yyk.beginPath();
    yyk.moveTo(x-center_x, y-center_y);
    yyk.arc(x-center_x, y-center_y, 5, 0, 2*Math.PI, false);
    yyk.fill();
    yyk.moveTo(x-center_x, y-center_y);
    yyk.lineTo(x1+x-center_x, y1+y-center_y);
    yyk.stroke();
}

function draw_game_lines(yyk){
    yyk.lineWidth = 5;
    yyk.beginPath();
    yyk.moveTo(center_x+48, center_y+height-12);
    yyk.lineTo(650, 358);
    yyk.stroke();
    yyk.beginPath();
    yyk.moveTo(center_x+30, center_y+height-35);
    yyk.lineTo(540, 140);
    yyk.stroke();
    yyk.save();
    yyk.transform(1,0,0,0.5,0, center_y/2);
    yyk.beginPath();
    yyk.arc(center_x, center_y+height, 150, Math.PI/40, 7*Math.PI/4, true);
    yyk.stroke();
    yyk.beginPath();
    yyk.arc(center_x, center_y+height, 250, Math.PI/40, 7*Math.PI/4, true);
    yyk.stroke();
    yyk.beginPath();
    yyk.arc(center_x, center_y+height, 350, Math.PI/40, 7*Math.PI/4, true);
    yyk.stroke();
    yyk.beginPath();
    yyk.arc(center_x, center_y+height, 450, Math.PI/40, 7*Math.PI/4, true);
    yyk.stroke();
    yyk.restore();

    yyk.font = "16pt Bold";
    yyk.fillText("200", 310 , 235);
    yyk.fillText("400", 450 , 165);
}

function draw_power(yyk) {  
    var power_left = 550;
    var power_right = power_left + 150;
    var grd=yyk.createLinearGradient(power_left,450,power_right,480);
    grd.addColorStop(0,"#005500");
    grd.addColorStop(0.5,"#555500");
    grd.addColorStop(1,"#550000");
    yyk.fillStyle=grd;
    yyk.lineWidth="2";
    yyk.strokeStyle='rgb(93,93,93)';
    yyk.beginPath();
    yyk.moveTo(power_left,480);
    yyk.lineTo(power_right,480);
    yyk.lineTo(power_right,450);
    yyk.closePath();
    yyk.stroke();
    yyk.fill();

    //calculate velocity and judge power
    
    var grd=yyk.createLinearGradient(power_left,450,power_right,480);
    grd.addColorStop(0,"#00FF00");
    grd.addColorStop(0.5,"#FFFF00");
    grd.addColorStop(1,"#FF0000");
    yyk.globalCompositeOperation = "source-over";
    yyk.fillStyle=grd;
    yyk.beginPath();
    yyk.moveTo(power_left,480);
    yyk.lineTo(power_left+150*velocity/velo_limit,480);
    yyk.lineTo(power_left+150*velocity/velo_limit,480-30*velocity/velo_limit);
    yyk.closePath();
    yyk.fill();

    //draw power slots
    var i;
    yyk.strokeStyle = 'white';
    for (i = 15; i< (power_right- power_left); i+= 15){
        yyk.beginPath();
        yyk.moveTo(power_left + i, 480);
        yyk.lineTo(power_left + i, 480 - 30 * i / 150);
        yyk.stroke();
    }
} 

function judge_result() {  
    //judge valid throw
    if ( (ball_y > ball_x*(358-center_y-height+12+18)/(650-center_x-48)) || (ball_y < ball_x*(140-center_y-height+35-5)/(540-center_x-30))){
        game_stop();
        if ( role != "PC" ){
            $(".outOfBoundary").show();
        }
        return;
    }

    result = ((Math.sqrt(ball_x*ball_x + 3.5*ball_y*ball_y)-radius)*100|0)/100;
    judge_record();
    game_stop();
}

function judge_record(){
    var i;
    for (i=1; i<=10; i=i+1){
        var present_record = localStorage.getItem('record_result' + i);
        if (!present_record) {
            localStorage.setItem('record_result' + i, result);
            localStorage.setItem('record_name' + i, present_player_name);
            return;
        }else if (present_record < result){
            var j;
            for (j=10; j>=i; j=j-1){
                present_record = localStorage.getItem('record_result' + (j-1));
                var present_name = localStorage.getItem('record_name' + (j-1));
                if (present_record){
                localStorage.setItem('record_result' + j, present_record);
                localStorage.setItem('record_name' + j, present_name);
                }
            }
            localStorage.setItem('record_result' + i, result);
            localStorage.setItem('record_name' + i, present_player_name);
            return;
        }
    }
}

function show_result(yyk) {
    //draw monitor screen
    yyk.drawImage(monitor, 635, 227);
    yyk.strokeStyle = 'rgba(20,200,20,0.7)';  
    yyk.lineWidth = "2";
    //yyk.fillText(result, 650 , 250);
    if (result != 0){
        draw_number(yyk, Math.floor(result/100), 650, 250);
        draw_number(yyk, (Math.floor(result/10)%10), 660, 250);
        draw_number(yyk, (Math.floor(result)%10), 670, 250);
        draw_number(yyk, (Math.floor(result*10)%10), 690, 250);
        draw_number(yyk, (Math.floor(result*100)%10), 700, 250);
    } else {
        draw_number(yyk, 0, 670, 250);
        draw_number(yyk, 0, 690, 250);
    }
    yyk.beginPath();
    yyk.moveTo(684,264);
    yyk.lineTo(686,264);
    yyk.stroke();

    // emulate e-num
    yyk.strokeStyle = 'rgba(0,0,0,1)';
    var i;
    var j;
    for (i = 650; i < 701; i += 10){
        for (j = 250; j < 265; j += 7){
            yyk.beginPath();
            yyk.moveTo(i-1, j);
            yyk.lineTo(i+1, j);
            yyk.moveTo(i+6, j);
            yyk.lineTo(i+8, j);
            yyk.stroke();
        }
    }
}

function draw_number(yyk, number, num_x, num_y){
    var num_w=7;
    var num_h=7;
    yyk.save();
    yyk.translate(num_x, num_y);
    yyk.beginPath();
    yyk.moveTo(0, 0);
    switch (number){
        case 0:
            yyk.lineTo(num_w, 0);
            yyk.lineTo(num_w, 2*num_h);
            yyk.lineTo(0, 2*num_h);
            yyk.closePath();
            break
        case 1:
            yyk.moveTo(num_w, 0);
            yyk.lineTo(num_w, 2*num_h);
            break
        case 2:
            yyk.lineTo(num_w, 0);
            yyk.lineTo(num_w, num_h);
            yyk.lineTo(0, num_h);
            yyk.lineTo(0, 2*num_h);
            yyk.lineTo(num_w, 2*num_h);
            break
        case 3:
            yyk.lineTo(num_w, 0);
            yyk.lineTo(num_w, 2*num_h);
            yyk.lineTo(0, 2*num_h);
            yyk.moveTo(0, num_h);
            yyk.lineTo(num_w, num_h);
            break
        case 4:
            yyk.lineTo(0, num_h);
            yyk.lineTo(num_w, num_h);
            yyk.moveTo(num_w, 0);
            yyk.lineTo(num_w, 2*num_h);
            break
        case 5:
            yyk.moveTo(num_w, 0);
            yyk.lineTo(0, 0);
            yyk.lineTo(0, num_h);
            yyk.lineTo(num_w, num_h);
            yyk.lineTo(num_w, 2*num_h);
            yyk.lineTo(0, 2*num_h);
            break
        case 6:
            yyk.moveTo(num_w, 0);
            yyk.lineTo(0, 0);
            yyk.lineTo(0, num_h);
            yyk.lineTo(num_w, num_h);
            yyk.lineTo(num_w, 2*num_h);
            yyk.lineTo(0, 2*num_h);
            yyk.lineTo(0, num_h);
            break
        case 7:
            yyk.lineTo(num_w, 0);
            yyk.lineTo(num_w, 2*num_h);
            break
        case 8:
            yyk.lineTo(num_w, 0);
            yyk.lineTo(num_w, 2*num_h);
            yyk.lineTo(0, 2*num_h);
            yyk.lineTo(0,0);
            yyk.moveTo(0, num_h);
            yyk.lineTo(num_w, num_h);
            break
        case 9:
            yyk.moveTo(num_w, num_h);
            yyk.lineTo(0,num_h);
            yyk.lineTo(0,0);
            yyk.lineTo(num_w,0);
            yyk.lineTo(num_w,2*num_h);
            yyk.lineTo(0,2*num_h);
            break
        default:
            yyk.lineTo(num_w, 0);
            yyk.lineTo(num_w, 2*num_h);
            yyk.lineTo(0, 2*num_h);
            yyk.closePath();
            break
    }
    yyk.stroke();
    yyk.restore();
}

// draw eclipse. 
function drawEclipse(yyk, center_x1, center_y1, radius_a, radius_b){
    yyk.save();
    yyk.beginPath();
    yyk.transform(1,0,0,radius_b/radius_a,0,center_y*(1-radius_b/radius_a));
    yyk.arc(center_x1, center_y1, radius_a, 0, 2*Math.PI, false);
    yyk.stroke();
    yyk.restore();
}

function wrong_direction(){
    game_stop();
    alert("wrong direction");
    //reset();
}

function gameStart(mode){
    human_name = $("#human_name").attr("value");
    game_mode=mode;
    if (mode == 1){
        
        $(".gameStart").fadeOut('slow', function(){$(".button1").show();});
    } else {
        $(".gameStart").fadeOut('slow', function(){$(".name").show();});
    }
}

function show_winner(){
    var yyk = document.getElementById('Mycanvas').getContext('2d');  
    yyk.font = "40px bold Verdana";  
    yyk.fillStyle = "White";  
    yyk.fillText("Winner is: " + name_board[0], 300, 180); 
    $("#gameReturn").show();
    $("#gameCon").show();
}

function returnMain(){
    $("#game_area").hide();
    $("#gameReturn").hide();
    $("#gameCon").hide();
    $(".pcLevel").hide();
    $(".gameStart").fadeIn('slow');
    draw();
    $(".timeOut").hide();
    $(".outOfBoundary").hide();
    $("#information").html("");
}

function cont(){
    $("#gameCon").hide();
    $("#gameReturn").hide();
    $(".timeOut").hide();
    $(".outOfBoundary").hide();
    start_turn1();
}

function start_turn1(){
    if (game_mode == 1){
        present_player=0;
        var i;
        result_board = [];
        name_board = [];
        for (i=0; i < (players -1); i++){
            result_board.push(0);
            name_board.push("PC" + i);
        }
        name_board.push(human_name);
        result_board.push(0);
        $("#game_area").show();
        draw();
    //init();
        $(".pcLevel").show();
        start_turn();
    } else {
        game_start = 1;
        $("#game_area").show();
        draw();
        keep_hint();
    }
}

function keep_hint(){
    if (game_start == 1){
        $("#gameHint").show();
        $("#gameHint").fadeOut(1000, function(){keep_hint()});
    }
    if (game_start == 2){
        $("#gameHint").show();
        $("#gameHint").animate({left:420, top:250}, 1500);
        $("#gameHint").animate({left:350, top:360}, 0);
        $("#gameHint").hide(0, function(){$("#gameHint2").show();$("#gameHint2").fadeOut(1000);});
        //$("#gameHint2").fadeOut(1000, function(){keep_hint()});
    }
}

function start_turn(){
    if (present_player == players){
        //change_button("practice_button", "");
        //change_button("match_button", "");
        show_winner();
        return;
    }

    if (game_start >=4 ){
        if (result_board[present_player] < result){
            result_board[present_player] = result;
        }
        show_result_board();
        reset();
        present_player = present_player + 1;
    } else {
        if (game_start == 0){
            game_start = 1;
            present_player_name = name_board[present_player];
            //if (name_board[present_player] == 'You'){
            if (present_player == (players - 1)){
                role = "human";
                draw();
                keep_hint();
                //alert("Your Round is coming, please click start!");
                //change_button("practice_button", "");
            }else{
                role = "PC";
                PC_round();
            }
        }
    }
    setTimeout("start_turn()", 1000);
}

function show_result_board(){
    var info = document.getElementById('information');
    var new_array = new Array();
    var i;
    var j;
    var temp;
    for (j=players; j > 0; j--){
        for (i=0; i < j; i++){
            if (result_board[i] < result_board[i+1]){
                temp = result_board[i+1];
                result_board[i+1] = result_board[i];
                result_board[i] = temp;
                temp = name_board[i+1];
                name_board[i+1] = name_board[i];
                name_board[i] = temp;
            }
        }
    }
    $("#information").html("<h1> Result Board </h1>");
    $("#information").append('<table border="0"><tr><th width=50px>Rank</th><th width=50px>Name</th><th width=50px>Distance</th></tr>');
    for (i=1; i <= players; i++){
        temp = '<tr> <td width=50px>' + i + '</td> <td width=50px>' + name_board[i-1] + '</td> <td width=50px>' + result_board[i-1] + '</td> </tr>' ;
        $("#information").append(temp);
    }
    $("#information").append('</table>');
}

function judge_throw_chance(){
    if (game_start != 2){
        return;
    }
    //if ((angle%(Math.PI*2) > 8*Math.PI/5) && (angle%(Math.PI*2) < 15*Math.PI/8) && (velocity > 200) && (Math.random() > 0.75)){
    //if ((velocity > 290) && (Math.random() > 0.55)){
    if ((velocity > pc_level_power[pc_level]) && ((Math.random()/pc_level_random[pc_level]) > 0.75)){
        game_start = 3;
        angle = 3*Math.PI/2 + Math.PI/4 + pc_level_random[pc_level]*(Math.random() -0.5)*Math.PI/12;
        //angle = 3*Math.PI/2 + 5*Math.PI/18;
        doSomethingBeforeThrowOut();
    }
}

function doSomethingBeforeThrowOut(){
    if (angle%(Math.PI*2) > 3*Math.PI/2) {  
        h_velo = velocity*Math.cos(angle);
        v_velo = -velocity*Math.sin(angle);
        //ball_adjust_height = 100 * (2*Math.PI - angle%(2*Math.PI)-Math.5PI/12)*2/Math.PI * (velocity/100 + 1);
        ball_adjust_height = 40 * Math.sin(angle%(2*Math.PI)-9*Math.PI/5) * 2 * (velocity/100 + 1) ;
        if (ball_adjust_height == 0) ball_adjust_height= 0.00001;

        // adjust gravity based on ball_adjust_height.
        gravity = gravity + (ball_adjust_height+5*velocity/100*ball_adjust_height/Math.abs(ball_adjust_height))/5;
    }else{
        wrong_direction();
    }
}

function change_button(button_id, value){
   document.getElementById(button_id).disabled=value;
}

function show_help(){
   document.getElementById("information").innerHTML= ' <h1> Game Rule: </h1> \
<h3> There are 2 modes: match mode and practice mode. </h3> \
<p> - Match mode: click "Begin New Match" to start a new match. There are 10 players. You are the last one to play the game.</p> \
<p> - Practice mode:  click "Start" to start game. </p> \
<h3> Method: </h3> \
<p> Step 1: The 1st time mouse click is to to accumulate power. </p> \
<p> Step 2: The 2nd time mouse click is begin to select throwing direction. <p></p> <img src="images/mouse_click.png"> </img> </p> \
<p> Step 3: Keep pressing the 2nd time mouse click button and move mouse to a direction (e.g. right top of window), until you want to throw the ball. If mouse movement direction is not right top, game will report wrong direction.<p></p><img src="images/mouse_move.png"> </img> </p> \
<p> Step 4: Release 2nd time mouse click button at the right time (power at the max stage) to trigger the throwing.<p></p> <img src="images/mouse.png"> </img> </p> \
<p> BKM: Be careful for the power and throw out angle. Throw out angle is depended on mouse movement direction. </p> \
<p> </p> \
<p>Author: OTC-YYK</p> ';
}

function change_level(level){
    var level_name;
    switch (level){
        case 0: {
            level_name = "Starter"
            break }
        case 1: {
            level_name = "Medium"
            break }
        case 2: {
            level_name = "Hard"
            break }
        case 3: {
            level_name = "Invicible"
            break }
   }
   //document.getElementById("pc_level").innerHTML=level_name;
    $("#pc_level").html("PC Level: " + level_name);
   pc_level = level;   
    $(".button1").fadeOut("slow", function(){$(".name").show();});
}

function inputName(){
    $(".name").fadeOut("slow", function(){start_turn1();});
}

function show_rank_list(){
    $("#information").html("<h1> Rank Board </h1>");
    $("#information").append('<table border="0"><tr><th width=50px>Rank</th><th width=50px>Name</th><th width=50px>Distance</th></tr>');
    var i;
    for (i=1; i <= 10; i++){
        var present_record = localStorage.getItem('record_result'+i);
        if (!present_record) {
            $("#information").append('</table>');
            return;
        }
        var present_name = localStorage.getItem('record_name'+i);
        temp = '<tr> <td width=50px>' + i + '</td> <td width=50px>' + present_name + '</td> <td width=50px>' + present_record + '</td> </tr>' ;
        $("#information").append(temp);
    }
    $("#information").append('</table>');
}
