#pragma strict

var num_paradigms = 3;
var curr_paradigms = new Array(3);
var delay = 5;

function Start () {
	curr_paradigms = ["q", "w", "e"];
}

function Update () {
	if (Input.GetKeyDown("q")) updateList("q");
	else if (Input.GetKeyDown("w")) updateList("w");
	else if (Input.GetKeyDown("e")) updateList("e");
	
	Debug.Log(curr_paradigms);
}

function updateList(newParadigm) {
	curr_paradigms[0] = curr_paradigms[1];
	curr_paradigms[1] = curr_paradigms[2];
	curr_paradigms[2] = newParadigm;
		
	yield WaitForSeconds (5);
	delay = delay;
}