
function updateDATA(){
	$(function(){
    	$.getJSON('exp.json', function(data) {
            	for(var i=0;i<data.teams.length;i++){
                	$('.table_teams_body').append('<div class="table_teams_stroke">' +
                		'<p>' +
                			data.teams[i].team_id
                		+ '</p>'

                		+ '<p>' +
                			data.teams[i].name
                		+ '</p>'

                		+ '<p>' +	
                			data.teams[i].leader_name
                		+ '</p>'

                		+ '<p>' +
                			data.teams[i].number_of_tasks
                		+ '</p>'

                		+ '<p>' +
							UNIXTimeToNormalTime(data.teams[i].start_time)
                		+ '</p>'

                		+ '<p>' +
                			UNIXTimeToNormalTime(data.teams[i].finish_time)
                		+ '</p>'

                		+ '<p>' +
                			data.teams[i].fails_count
                		+ '</p>'

                		+ '<p>' +
                			data.teams[i].score
                		+ '</p>'

                		+ '<p>' +
                			data.teams[i].is_active
                		+ '</p>'
                	+ '</div>');/*клон снизу*/
            }
    	});
	});
}

function UNIXTimeToNormalTime(a){
	time = Math.round(new Date(a*1000).getHours()) + ':';

	if(Math.round(new Date(a*1000).getMinutes()) < 10){
		time = time + '0';
	}

	time = time + Math.round(new Date(a*1000).getMinutes());

	return time;
}

updateDATA();