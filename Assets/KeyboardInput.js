#pragma strict

/** 
This class will take care of all keyboard input.
It calls the appropriate action function from other scripts 
when the appropriate set of keystrokes triggers that action. 
*/

// Movement Keys
var LEFT_KEY = KeyCode.A
var RIGHT_KEY = KeyCode.D
var UP_KEY = KeyCode.W
var DOWN_KEY = KeyCode.S

// Attack Keys
var WEAK_KEY = KeyCode.K
var STRONG_KEY = KeyCode.L
var SHIELD_KEY = KeyCode.Semicolon

// Paradigm Keys
var P1_KEY = KeyCode.I
var P2_KEY = KeyCode.O
var P3_KEY = KeyCode.P

function Start () {

}

function Update () {
	if (Input.GetKeyDown(LEFT_KEY)){
	
	}
	if (Input.GetKeyDown(RIGHT_KEY)){
	
	}
	if (Input.GetKeyDown(UP_KEY)) {
	
	}	
	if (Input.GetKeyDown(DOWN_KEY)){

	}
}
