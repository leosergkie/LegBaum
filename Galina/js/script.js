/*var now = new Date();


var name = mass.routers[0].team_name;
var key = 0, i = 0;

function n(n){
    return n > 9 ? "" + n: "0" + n;
}

for (key in mass.routers) {
	var date_start = new Date(mass.routers[key].start_time);
	
	now = new Date(now.getTime());

	var hrs = (now.getHours()-date_start.getHours());
	var mnts = (now.getMinutes()-date_start.getMinutes());

	if(hrs < 0){
		hrs = (now.getHours()-date_start.getHours() +24);
	}
	if(mnts < 0){
		mnts = (now.getMinutes()-date_start.getMinutes() + 60);
	}

	$("<div class=\"block2\" id=\"block2" + key + "\">   					<div>КОМАНДА " + mass.routers[key].team_id + "  " + name + ", участников: " + mass.routers[key].players_count + "</div> 				                                            	 		<div class=\"inf_block\">									Время старта: " + n(date_start.getHours()) + ":" + n(date_start.getMinutes()) + "<br>       						Времени прошло: " + n(hrs) + ":" + n(mnts) + "<br>							Этапов пройдено: 2/15<br>							Этапов провалено: " + mass.routers[key].fail_count + "<br>								Опережение графика:						</div>												").appendTo("#block");
//alert(mass.routers[key].tasks_list.length);
	for (i in mass.routers[key].tasks_list_ids)
	{
		var date_start0 = new Date(mass.routers[key].tasks_list[i].start_time);
		var hrs = (now.getHours()-date_start0.getHours());
		var mnts = (now.getMinutes()-date_start0.getMinutes());

		if(mass.routers[key].tasks_list[i]){
			$("<div class=\"circle\">		 <div class=\"d1 " + ((mass.routers[key].tasks_list[i].success != null) ? (mass.routers[key].tasks_list[i].success ? "successfull" : "wasted") :("current")) + "\"></div>								<p>ЭТАП " + mass.routers[key].tasks_list_ids[i] + "</p>											<p>" + UNIXTimeToNormalTime(mass.routers[key].tasks_list[i].start_time) + "/10:00</p>									<div class=\"triangle\" id = \"triangle\">			</div>											</div>											</div>").appendTo("#block2" + key);
			}else{
				$("<div class=\"circle\">		 <div class=\"d1 unactive\"></div>												<p>ЭТАП " + mass.routers[key].tasks_list_ids[i] + "</p>											<p>00:00/10:00</p>						<div class=\"triangle\" id = \"triangle\">			</div>											</div>											</div>").appendTo("#block2" + key);
			}
		}

		$('#triangle'+key+'-'+i).addClass('hiddeo_kodjima');
}*/
var allTeams = [];

var isCheckbox = true;

function updateDATA(){
  $(function(){
      $.getJSON('test.json', isCheckbox, function(data) { //сюда URL json'а (надо добавить передачу галки из чекбокса на сервер)$.getJSON('exp.json', {{data}}, function(data) {});
            for(var j=0;j<allTeams.length;j++){
                var flag = 0;
                for(var i=0;i<data.routers.length;i++){
                    if(allTeams[j].team_id == data.routers[i].team_id){
                        flag = 1;
                        break;
                    }
                }
    
                if(!flag){
                    allTeams.splice(j, 1);
                }
            }
    
            for(var i=0;i<data.routers.length;i++){
                var flag = 0;
                for(var j=0;j<allTeams.length;j++){
                    if(data.routers[i].team_id == allTeams[j].team_id){
                        flag = 1;
                        break;
                    }
                }
    
                if(!flag){
                    allTeams.push(data.routers[i]);
                }
            }

            outputDATA();
      });
  });
    //console.log(isCheckbox);
    //console.log('update');
}

function outputDATA(){
    $('.listAllTeams').children().remove();
    for(var i=0;i<allTeams.length;i++){
       //if(!allTeams[i].is_active || isCheckbox){//вывод всех или только не финишировших
            $('.listAllTeams').append('<div class="oneTeamInList">' +
                  createHead(allTeams[i])
                  + 
                  createList(allTeams[i])
                  + 
                  createPropTeam(allTeams[i])
            + '</div>');/*клон снизу*/
    }

    /*отправка id команды на которую кликнули*/
    $('.table_teams_body').children('.table_teams_stroke').mousedown(function(eventObject){
        if(eventObject.which == 1){//только левая кнопка
            //console.log($(this).children().eq(0).text());
            $("#formId").children([name="team_id"]).attr({"value":$(this).children().eq(0).text()});
            $("#formId").children([name="team_id"]).click();/*клик по input для отправки*/
        }
    });
}

function createHead(team){
    var head = '<div class="headTeamInList">' +
        '<p>КОМАНДА' +
            team.team_id
            +
            '&nbsp&nbsp&nbsp"'
            +
            team.team_name
            +
            '", участников: '
            +
            team.players_count
        + '</p>'
    + '</div>';

    return head;
}

function createList(team){
    var list = '<div class="listAllCircleInTeam">';

    for(var i=0; i<team.tasks_list_ids.length; i++){
        list = list + createBlock(team, i);
    }

    list = list + '</div>'
    return list;
}

function createBlock(team, i){
    var block = '<div class = "blockWithCircle">'; 

    if(i<team.tasks_list.length){
        block = block + '<div class="oneCircleInBlock ' + coloredCircle(team.tasks_list[i]) + '"></div>'
        +
        '<p class="firstTextInBlock">ЭТАП ' + team.tasks_list_ids[i] + '</p>'
        +
        coloredBlockTime(team, i);
    }else{
        block = block + '<div class="oneCircleInBlock notActiveCircle"></div>'
        +
        '<p class="firstTextInBlock">ЭТАП ' + team.tasks_list_ids[i] + '</p>'
        +
        '<p class="secondTextInBlock"><span class="notActiveText">00:00</span>/10:00</p>';
    }

    block = block + '<div class="triangleInBlock"></div></div>'
    return block;
}

function createPropTeam(team){
    var numComplete = 0;
    var numFails = 0;

    for(var i=0;i<team.tasks_list.length; i++){
        if(team.tasks_list[i].success == true){
            numComplete++;
        }
        if(team.tasks_list[i].success == false){
            numFails++;
        }
    }

    var prop = '<div class="propInTeam">' +
    '<p>Время старта: ' 
    + 
    UNIXTimeToNormalTimeHoursMinute(team.start_time)
    + 
    '</p><p>Времени прошло: ' 
    +
    UNIXTimeToNormalTimeHoursMinute(currTime() - team.start_time)
    +
    '</p><p>Этапов пройдено: '
    +
    numComplete
    +
    '/15</p><p> Этапов провалено: '
    +
    numFails
    +
    '</p><p> Опережение графика: '
    +
    '+3:15'
    +'</p></div>';
    return prop;
}

function coloredCircle(param){
    if(param.success == true){
        return 'doneColorCircle';
    }else{
        if(param.success == false){
            return 'failColorCircle';
        }else{
            return 'currColorCircle';
        }
    }
}

function coloredBlockTime(team, i){
    var cTime;

    if(team.tasks_list[i].success == null){
        cTime = '<p class="secondTextInBlock"><span class="currColorText">'
        +
        UNIXTimeToNormalTimeMinuteSec(currTime() - team.tasks_list[i].start_time)
        +
        '</span>/10:00</p>';
    }else{
        if(team.tasks_list[i].success == true){
            cTime = '<p class="secondTextInBlock"><span class="doneColorText">'
            +
            UNIXTimeToNormalTimeMinuteSec(team.tasks_list[i].finish_time)
            +
            '</span>/10:00</p>';
        }else{
            cTime = '<p class="secondTextInBlock"><span class="failColorText">Потрачено</span></p>';
        }
    }

    return cTime;
}

function UNIXTimeToNormalTimeHoursMinute(a){
  time = Math.round(new Date(a*1000).getHours()) + ':';

  if(Math.round(new Date(a*1000).getMinutes()) < 10){
    time = time + '0';
  }

  time = time + Math.round(new Date(a*1000).getMinutes());

  return time;
}

function UNIXTimeToNormalTimeMinuteSec(a){
  time = Math.round(new Date(a*1000).getMinutes()) + ':';

  if(Math.round(new Date(a*1000).getSeconds()) < 10){
    time = time + '0';
  }

  time = time + Math.round(new Date(a*1000).getSeconds());

  return time;
}

function currTime(){
    return parseInt(new Date().getTime()/1000)
}

//console.log(UNIXTimeToNormalTimeMinuteSec(currTime() - 1538303051));

var timerId = setTimeout(function tick() {
    //console.log('tic');
    outputDATA();
    timerId = setTimeout(tick, 1000);
}, 1000);










