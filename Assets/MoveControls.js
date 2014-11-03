#pragma strict

// Global constants
var HORZ_SPEED = 10;
var SLOW_HORZ_SPEED = 5;
var VERT_SPEED = 10;



private var allowMovement;	// determines if movement is allowed (false if not allowing aerial movement)
private var allowAttacks;	// determines if attacks are allowed (false while attacking)
private var isGrounded;		// determines whether or not CK is on the ground

function Start () {
	this.rigidbody2D.fixedAngle = true;
	allowMovement = true;
	allowAttacks = true;
	isGrounded = true;
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
	if (isGrounded) {
		this.rigidbody2D.velocity.x = -HORZ_SPEED;
	} else {
		this.rigidbody2D.velocity.x = -SLOW_HORZ_SPEED;
	}
}

function MoveRight() {
	if (isGrounded) {
		this.rigidbody2D.velocity.x = HORZ_SPEED;
	} else {
		this.rigidbody2D.velocity.x = SLOW_HORZ_SPEED;
	}
}

function JumpUp() {
	if (isGrounded) {
		this.rigidbody2D.velocity.y = VERT_SPEED;
	}
}

function FallDown() {
	this.rigidbody2D.velocity.y = -VERT_SPEED;
}

function DashLeft() {
	Debug.Log("dash left");
	this.rigidbody2D.velocity.x = -20*HORZ_SPEED;
	this.rigidbody2D.AddForce(Vector2.right*HORZ_SPEED/2);
//	WaitForSeconds(1);
//	this.rigidbody2D.AddForce(-Vector2.right*HORZ_SPEED/2);
	allowMovement = false;
	
}

function DashRight() {
	Debug.Log("dash right");
	this.rigidbody2D.velocity.x = 20*HORZ_SPEED;
	this.rigidbody2D.AddForce(-Vector2.right*HORZ_SPEED/2);
//	WaitForSeconds(1);
//	this.rigidbody2D.AddForce(Vector2.right*HORZ_SPEED/2);
	allowMovement = false;
}

function SlowToStop() {
	if (!allowMovement)
		return;
	// Makes CK move slightly farther before stopping
	if (this.rigidbody2D.velocity.x > 0) {
		this.rigidbody2D.velocity.x = SLOW_HORZ_SPEED;
	} else {
		this.rigidbody2D.velocity.x = -SLOW_HORZ_SPEED;
	}
}
