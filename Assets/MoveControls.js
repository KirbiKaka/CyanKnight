#pragma strict

// Global constants
var HORZ_SPEED = 5;
var VERT_SPEED = 7.5;

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

private var isGrounded;
private var allowAirMovement;

function Start () {
	this.rigidbody2D.fixedAngle = true;
	isGrounded = true;
	allowAirMovement = false;
}

function Update () {
	if (Input.GetKeyDown(LEFT_KEY)){
		MoveLeft();
	}
	if (Input.GetKeyDown(RIGHT_KEY)){
		MoveRight();
	}
	if (Input.GetKeyDown(UP_KEY)) {
		JumpUp();
	}	
	if (Input.GetKeyDown(DOWN_KEY)){
		FallDown();
	}
	
	if (Input.GetKeyUp(KeyCode.LeftArrow))
		this.rigidbody2D.velocity.x = 0;
	if (Input.GetKeyUp(KeyCode.RightArrow))
		this.rigidbody2D.velocity.x = 0;
}

function OnCollisionEnter2D(coll: Collision2D) {
	if(coll.gameObject.tag == "Ground")
	    isGrounded = true;
}

function OnCollisionExit2D(coll : Collision2D){
	if(coll.gameObject.name == "Ground")
		isGrounded = false;
}

private function MoveLeft() {
	this.rigidbody2D.velocity.x = -HORZ_SPEED;
}

private function MoveRight() {
	this.rigidbody2D.velocity.x = HORZ_SPEED;
}

private function JumpUp() {
	rigidbody2D.velocity.y = VERT_SPEED;
}

private function FallDown() {
	rigidbody2D.velocity.y = -VERT_SPEED;
}
