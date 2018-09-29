//var jqxhr = $.getJSON("test.json")
var mass = {
  "routers": [
    {
      "team_id": 3,
      "team_name": "DreamTeam",
      "players_count": 3,
      "fail_count": 0,
      "start_time": 1508330494000,
      "tasks_list_ids": [
        5,
        1,
        6,
        7,
        8
      ],
      "tasks_list": [
        {
          "start_time": 1508330494000,
          "task_id": 5,
          "success": false,
          "finish_time": null
        },
        {
          "success": true,
          "task_id": 1,
          "start_time": 1508330494000,
          "finish_time": 15235131
        },
        {
          "success": null,
          "start_time": 1508330494000,
          "task_id": 6,
          "finish_time": null
        }
      ]
    },
    {
      "team_id": 7,
      "team_name": "ИУ3-91",
      "fail_count": 0,
      "start_time": 15245612,
      "players_count": 4,
      "tasks_list_ids": [
        8,
        5,
        1,
        6,
        7
      ],
      "tasks_list": [
        {
          "finish_time": null,
          "task_id": 8,
          "start_time": 15245612,
          "success": null
        }
      ]
    }
  ]
}

var now = new Date();


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

	if(hrs < 0){
		hrs = (now.getHours()-date_start0.getHours() +24);
	}
	if(mnts < 0){
		mnts = (now.getMinutes()-date_start0.getMinutes() + 60);
	}

		if(mass.routers[key].tasks_list[i]){
			$("<div class=\"circle\">		 <div class=\"d1 " + ((mass.routers[key].tasks_list[i].success != null) ? (mass.routers[key].tasks_list[i].success ? "successfull" : "wasted") :("current")) + "\"></div>								<p>ЭТАП " + mass.routers[key].tasks_list_ids[i] + "</p>											<p>" + n(hrs) + ":" + n(mnts) + "/10:00</p>									<div class=\"triangle\" id = \"triangle\">			</div>											</div>											</div>").appendTo("#block2" + key);
			} else{
				$("<div class=\"circle\">		 <div class=\"d1 unactive\"></div>												<p>ЭТАП " + mass.routers[key].tasks_list_ids[i] + "</p>											<p>00:00/10:00</p>						<div class=\"triangle\" id = \"triangle\">			</div>											</div>											</div>").appendTo("#block2" + key);
			}
		}

		$('#triangle'+key+'-'+i).addClass('hiddeo_kodjima');
	}











