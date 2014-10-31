#pragma strict

// Global constants
var HORZ_SPEED = 10;
var VERT_SPEED = 10;
var SLOW_SPEED = 3;

private var isGrounded;		// determines whether or not CK is on the ground
private var allowMovement;	// determines if movement is allowed (false if not allowing aerial movement)
private var allowAttacks;	// determines if attacks are allowed (false while attacking)
private var slowMovement;	// determines if movement should be showed (true in the air)

function Start () {
	this.rigidbody2D.fixedAngle = true;
	isGrounded = true;
	allowMovement = true;
	allowAttacks = true;
	slowMovement = false;
}

function Update () {

}

function OnCollisionEnter2D(coll: Collision2D) {
	if(coll.gameObject.tag == "Ground")
	    isGrounded = true;
}

function OnCollisionExit2D(coll : Collision2D){
	if(coll.gameObject.name == "Ground")
		isGrounded = false;
}

function MoveLeft() {
	this.rigidbody2D.velocity.x = -HORZ_SPEED;
}

function MoveRight() {
	this.rigidbody2D.velocity.x = HORZ_SPEED;
}

function JumpUp() {
	this.rigidbody2D.velocity.y = VERT_SPEED;
}

function FallDown() {
	this.rigidbody2D.velocity.y = -VERT_SPEED;
}

function SlowToStop() {
	// Makes CK move slightly farther before stopping
	if (this.rigidbody2D.velocity.x > 0) {
		this.rigidbody2D.velocity.x = SLOW_SPEED;
	} else {
		this.rigidbody2D.velocity.x = -SLOW_SPEED;
	}
}
