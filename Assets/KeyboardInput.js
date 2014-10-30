#pragma strict

/** 
This class will take care of all keyboard input.
It calls the appropriate action function from other scripts 
when the appropriate set of keystrokes triggers that action. 
*/

// Movement Keys
var LEFT_KEY = KeyCode.A;
var RIGHT_KEY = KeyCode.D;
var UP_KEY = KeyCode.W;
var DOWN_KEY = KeyCode.S;

// Attack Keys
var WEAK_KEY = KeyCode.K;
var STRONG_KEY = KeyCode.L;
var SHIELD_KEY = KeyCode.Semicolon;

// Paradigm Keys
var P1_KEY = KeyCode.I;
var P2_KEY = KeyCode.O;
var P3_KEY = KeyCode.P;

// Combo Keys
private var MAX_KEY_COMBO = 3;
private var KEY_WAIT_TIME = 0.3; 		// 0.3 seconds
private var COMBO_KEYS = [LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY, WEAK_KEY, STRONG_KEY, SHIELD_KEY];
private var recentKeys : Array; 		// Stores the recent keys pressed, to check for combos
private var recentKeyTimes : Array; 	// Stores the times that the recent keys were pressed

function Start() {
	recentKeys = [];
	recentKeyTimes = new float[3];
}

function Update() {
	// Remove keys pressed more than KEY_WAIT_TIME seconds ago
	var old_time : float;
	while (recentKeyTimes.length > 0 && Time.time - recentKeyTimes[0] > KEY_WAIT_TIME) {
		recentKeys.shift();
		recentKeyTimes.shift();
	}
	// Add current keys pressed to recentKeys, allowing a max of MAX_KEY_COMBO keys
	for (var i = 0; i < COMBO_KEYS.length; i++) {
		var key = COMBO_KEYS[i];
		if (Input.GetKeyDown(key)) {
			if (recentKeys.length > MAX_KEY_COMBO) {
				recentKeys.shift();
				recentKeyTimes.shift();
			}
			recentKeys.push(key);
			recentKeyTimes.push(Time.time);
		}
	}

	// Movement Keys
	if (Input.GetKeyDown(LEFT_KEY)) { this.rigidbody2D.velocity.x -= 10; }
	if (Input.GetKeyDown(RIGHT_KEY)) {this.rigidbody2D.velocity.x += 10; }
	if (Input.GetKeyDown(UP_KEY)) { }	
	if (Input.GetKeyDown(DOWN_KEY)) { }
	
	if (Input.GetKey(LEFT_KEY)) { }
	if (Input.GetKey(RIGHT_KEY)) { }
	if (Input.GetKey(UP_KEY)) { }	
	if (Input.GetKey(DOWN_KEY)) { }
	
	if (Input.GetKeyUp(LEFT_KEY)) { }
	if (Input.GetKeyUp(RIGHT_KEY)) { }
	if (Input.GetKeyUp(UP_KEY)) { }	
	if (Input.GetKeyUp(DOWN_KEY)) { }
	
	// Attack Keys
	if (Input.GetKeyDown(WEAK_KEY)) { }
	if (Input.GetKeyDown(STRONG_KEY)) { }	
	if (Input.GetKeyDown(SHIELD_KEY)) { }
	
	if (Input.GetKey(WEAK_KEY)) { }
	if (Input.GetKey(STRONG_KEY)) { }	
	if (Input.GetKey(SHIELD_KEY)) { }
	
	if (Input.GetKeyUp(STRONG_KEY)) { }	
	if (Input.GetKeyUp(SHIELD_KEY)) { }
	if (Input.GetKeyUp(WEAK_KEY)) { }
	
	// Paradigm Keys
	if (Input.GetKeyDown(P1_KEY)) { }
	if (Input.GetKeyDown(P2_KEY)) { }	
	if (Input.GetKeyDown(P3_KEY)) { }
	
	if (Input.GetKey(P1_KEY)) { }
	if (Input.GetKey(P2_KEY)) { }	
	if (Input.GetKey(P3_KEY)) { }
	
	if (Input.GetKeyUp(P1_KEY)) { }
	if (Input.GetKeyUp(P2_KEY)) { }	
	if (Input.GetKeyUp(P3_KEY)) { }
	
	// Combo Keys
	
}

private function Wait(seconds) {
	yield WaitForSeconds(seconds);
}
