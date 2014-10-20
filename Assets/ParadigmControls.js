#pragma strict

var num_paradigms = 3;
var curr_paradigms = new Array(3);
var delay = 5;
var press_time = 0;
var curr_time = 0;
var pressable = true;

function Start () {
	curr_paradigms = ["q", "w", "e"];
}

function Update () {
	if (pressable) {
		if (Input.GetKeyDown("q")) {
			updateList("q");
			press_time = Date.Now.Ticks;
			pressable = false;
		}
		else if (Input.GetKeyDown("w")) {
			updateList("w");
			press_time = Date.Now.Ticks;
			pressable = false;
		}
		else if (Input.GetKeyDown("e")) {
			updateList("e");
			press_time = Date.Now.Ticks;
			pressable = false;
		}
	}
	
	curr_time = Date.Now.Ticks;
	Debug.Log(curr_time - press_time);
	if (!pressable && (curr_time - press_time >= 5000)) pressable = true;
	
	Debug.Log(curr_paradigms);
}

function updateList(newParadigm) {
	curr_paradigms[0] = curr_paradigms[1];
	curr_paradigms[1] = curr_paradigms[2];
	curr_paradigms[2] = newParadigm;
}