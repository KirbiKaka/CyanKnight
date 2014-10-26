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
			press_time = Time.time * 1000;
			pressable = false;
			Debug.Log(curr_paradigms);
		}
		else if (Input.GetKeyDown("w")) {
			updateList("w");
			press_time = Time.time * 1000;
			pressable = false;
			Debug.Log(curr_paradigms);
		}
		else if (Input.GetKeyDown("e")) {
			updateList("e");
			press_time = Time.time * 1000;
			pressable = false;
			Debug.Log(curr_paradigms);
		}
	}
	
	curr_time = Time.time * 1000;;
	//Debug.Log(curr_time - press_time);
	if (!pressable && (curr_time - press_time >= 300)) pressable = true;
}

function updateList(newParadigm) {
	curr_paradigms[0] = curr_paradigms[1];
	curr_paradigms[1] = curr_paradigms[2];
	curr_paradigms[2] = newParadigm;
}