var allTeams = [];

var arrAlgSort = ['team_id', 'name', 'leader_name', 
                  'number_of_tasks', 'start_time', 'finish_time', 
                  'fails_count', 'score', 'is_active'];

var currSort = '';

$(document).ready(function(){
    for(var i = 1; i<10;i++){
        $('.table_teams_head').children('.table_teams_stroke').children('#' + i).mousedown(function(eventObject){
            sortDATA(arrAlgSort[$(this).attr('id')-1]);
            /*console.log($(this).attr('id'));*/
            outputDATA();
        });
    }

    updateDATA();

    var timerId = setTimeout(function tick() {
        console.log('tic');
        updateDATA();
        timerId = setTimeout(tick, 1000);
    }, 1000);
});

function updateDATA(){
	$(function(){
    	$.getJSON('exp.json', function(data) {
            for(var i=0;i<data.teams.length;i++){
                allTeams[i] = data.teams[i];
            }

            sortDATA(currSort);

            outputDATA();
    	});
	});
}

function outputDATA(){
    $('.table_teams_body').children().remove();
    for(var i=0;i<allTeams.length;i++){
        $('.table_teams_body').append('<div class="table_teams_stroke">' +
              '<p>' +
                  allTeams[i].team_id
              + '</p>'
    
              + '<p>' +
                  allTeams[i].name
              + '</p>'
    
              + '<p>' +   
                  allTeams[i].leader_name
              + '</p>'
    
              + '<p>' +
                  allTeams[i].number_of_tasks
              + '</p>'
    
              + '<p>' +
                  UNIXTimeToNormalTime(allTeams[i].start_time)
              + '</p>'
    
              + '<p>' +
                  UNIXTimeToNormalTime(allTeams[i].finish_time)
              + '</p>'
    
              + '<p>' +
                  allTeams[i].fails_count
              + '</p>'
    
              + '<p>' +
                  allTeams[i].score
              + '</p>'
    
              + '<p>' +
                  allTeams[i].is_active
              + '</p>'
        + '</div>');/*клон снизу*/
    }
}

function sortDATA(param){
    var fnstring = 'algSort_' + param;
        
    // find object
    var fn = window[fnstring];
        
    // is object a function?
    if (typeof fn === "function"){
        allTeams.sort(fn);
        currSort = param;
    }
}

/*Условия сортировок*/
function algSort_team_id(a, b){
    if (a.team_id > b.team_id) return 1;
    if (a.team_id < b.team_id) return -1;
}

function algSort_name(a, b){
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
}

function algSort_leader_name(a, b){
    if (a.leader_name > b.leader_name) return 1;
    if (a.leader_name < b.leader_name) return -1;
}

function algSort_number_of_tasks(a, b){
    if (a.number_of_tasks > b.number_of_tasks) return 1;
    if (a.number_of_tasks < b.number_of_tasks) return -1;
}

function algSort_start_time(a, b){
    if (UNIXTimeToNormalTime(a.start_time) > UNIXTimeToNormalTime(b.start_time)) return 1;
    if (UNIXTimeToNormalTime(a.start_time) < UNIXTimeToNormalTime(b.start_time)) return -1;
}

function algSort_finish_time(a, b){
    if (UNIXTimeToNormalTime(a.finish_time) > UNIXTimeToNormalTime(b.finish_time)) return 1;
    if (UNIXTimeToNormalTime(a.finish_time) < UNIXTimeToNormalTime(b.finish_time)) return -1;
}

function algSort_fails_count(a, b){
    if (a.fails_count > b.fails_count) return 1;
    if (a.fails_count < b.fails_count) return -1;
}

function algSort_score(a, b){
    if (a.score > b.score) return 1;
    if (a.score < b.score) return -1;
}

function algSort_is_active(a, b){
    if (a.is_active > b.is_active) return -1;
    if (a.is_active < b.is_active) return 1;
}

function UNIXTimeToNormalTime(a){
	time = Math.round(new Date(a*1000).getHours()) + ':';

	if(Math.round(new Date(a*1000).getMinutes()) < 10){
		time = time + '0';
	}

	time = time + Math.round(new Date(a*1000).getMinutes());

	return time;
}


