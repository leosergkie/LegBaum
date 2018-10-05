var allTeams = [];

var isCheckbox2 = $('.tableCheckbox.checkbox2').is(':checked');

$(document).ready(function(){
    $('.tableCheckbox-custom.checkbox2').mouseup(function(eventObject){//принудительный вызов обновления данных при клике по chekbox
        if(eventObject.which == 1){//только левая кнопка
            isCheckbox2 = !isCheckbox2;
            outputDATA();
        }
    });

    updateDATA();
    outputDATA();

    var timer1 = setTimeout(function tick1() {//обновление вместе с сервером
        updateDATA();
        timer1 = setTimeout(tick1, 10000);
    }, 10000);

    var timer2 = setTimeout(function tick2() {//обновление без сервером
        outputDATA();
        timer2 = setTimeout(tick2, 1000);
    }, 1000);
});

function updateDATA(){
  $(function(){
      $.getJSON('test.json', isCheckbox2, function(data) { //сюда URL json'а (надо добавить передачу галки из чекбокса на сервер)$.getJSON('exp.json', {{data}}, function(data) {});
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
                        if(allTeams[j].tasks_list.length != data.routers[i].tasks_list.length){
                            allTeams[j] =  data.routers[i];
                        }
                        flag = 1;
                        break;
                    }
                }
    
                if(!flag){
                    allTeams.push(data.routers[i]);
                }
            }

            //outputDATA();
      });
  });
    //console.log(isCheckbox);
    //console.log('update');
}

function outputDATA(){
    $('.listAllTeams').children().remove();
    for(var i=0;i<allTeams.length;i++){
       //if(!allTeams[i].is_active || isCheckbox2){//вывод всех или только не финишировших
            $('.listAllTeams').append('<div class="oneTeamInList">' +
                  createHead(allTeams[i])
                  + 
                  createList(allTeams[i])
                  + 
                  createPropTeam(allTeams[i])
            + '</div>');/*клон снизу*/
    }

    /*отправка id команды на которую кликнули*/
    /*$('.table_teams_body').children('.table_teams_stroke').mousedown(function(eventObject){
        if(eventObject.which == 1){//только левая кнопка
            //console.log($(this).children().eq(0).text());
            $("#formId").children([name="team_id"]).attr({"value":$(this).children().eq(0).text()});
            $("#formId").children([name="team_id"]).click();/*клик по input для отправки*/
        /*}
    });*/
}

function createHead(team){
    var head = '<div class="headTeamInList">' +
        '<p><span class = "nameTeamInStages">КОМАНДА ' +
            team.team_id
            +
            '</span>&nbsp&nbsp&nbsp"'
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
    var j = findIdInTasksList(team.tasks_list_ids[i], team);
    if(j >= 0){
        block = block + '<div class="oneCircleInBlock ' + coloredCircle(team.tasks_list[j]) + '"></div>'
        +
        '<p class="firstTextInBlock">' + team.tasks_list[j].content + '</p>'
        +
        coloredBlockTime(team, j);
    }else{//если бло не найден
        block = block + '<div class="oneCircleInBlock notActiveCircle"></div>'
        +
        '<p class="firstTextInBlock">ЭТАП ' + team.tasks_list_ids[i] + '</p>'
        +
        '<p class="secondTextInBlock"><span class="notActiveText">00:00</span>/00:00</p>';
    }

    block = block + '<div class="triangleInBlock"></div></div>'
    return block;
}

function createPropTeam(team){
    var numComplete = 0;

    for(var i=0;i<team.tasks_list.length; i++){
        if(team.tasks_list[i].success == true){
            numComplete++;
        }
    }

    var prop = '<div class="propInTeam">' +
    '<p>Время старта: ' 
    + 
    UNIXTimeToNormalTimeHoursMinute(team.start_time)
    + 
    '</p><p>Времени прошло: ' 
    +
    UNIXTimeToNormalTimeHoursMinuteSec(currTime() - team.start_time)
    +
    '</p><p>Этапов пройдено: '
    +
    numComplete
    +
    '/15</p><p> Этапов провалено: '
    +
    team.fail_count
    +
    '</p></div>';
    return prop;
}

function coloredCircle(param){
    if(param.start_time != null){
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
}

function coloredBlockTime(team, i){
    var cTime;

    if(team.tasks_list[i].start_time != null){
        if(team.tasks_list[i].success == null){
            cTime = '<p class="secondTextInBlock"><span class="currColorText">'
            +
            UNIXTimeToNormalTimeMinuteSec(currTime() - team.tasks_list[i].start_time)
            +
            '</span>/' + UNIXTimeToNormalTimeMinuteSec(team.tasks_list[i].duration) +'</p>';
        }else{
            if(team.tasks_list[i].success == true){
                cTime = '<p class="secondTextInBlock"><span class="doneColorText">'
                +
                UNIXTimeToNormalTimeMinuteSec(team.tasks_list[i].finish_time - team.tasks_list[i].start_time)
                +
                '</span>/' + UNIXTimeToNormalTimeMinuteSec(team.tasks_list[i].duration) +'</p>';
            }else{
                cTime = '<p class="secondTextInBlock"><span class="failColorText">Потрачено</span></p>';
            }
        }
    }else{
         cTime = '<p class="secondTextInBlock"><span class="notActiveText">'
        +
        '00:00'
        +
        '</span>/' + UNIXTimeToNormalTimeMinuteSec(team.tasks_list[i].duration) +'</p>';
    }

    return cTime;
}

function UNIXTimeToNormalTimeHoursMinute(a){
  var time = Math.round(new Date(a*1000).getHours()) + ':';

  if(Math.round(new Date(a*1000).getMinutes()) < 10){
    time = time + '0';
  }

  time = time + Math.round(new Date(a*1000).getMinutes());

  return time;
}

function UNIXTimeToNormalTimeMinuteSec(a){
  var time = Math.round(new Date(a*1000).getMinutes()) + ':';

  if(Math.round(new Date(a*1000).getSeconds()) < 10){
    time = time + '0';
  }

  time = time + Math.round(new Date(a*1000).getSeconds());

  return time;
}

function UNIXTimeToNormalTimeHoursMinuteSec(a){
    var time = UNIXTimeToNormalTimeHoursMinute(a) + ':';

    if(Math.round(new Date(a*1000).getSeconds()) < 10){
        time = time + '0';
    }

    time = time + Math.round(new Date(a*1000).getSeconds());
    return time;
}

function currTime(){
    return parseInt(new Date().getTime()/1000)
}

function findIdInTasksList(id, team){
    for (var i = 0; i<team.tasks_list.length; i++){
        if(team.tasks_list[i].task_id == id){
            return i;
        }
    }

    return -1;
}

//console.log(UNIXTimeToNormalTimeMinuteSec(currTime() - 1538303051));










