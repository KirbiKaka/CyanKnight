#pragma strict

var horz_speed = 0.5;
var vert_speed = 7.5;
var allow_multiple_jumps = false;

private var canJump;


function Start () {
	this.rigidbody2D.fixedAngle = true;
	canJump = true;
}

function Update () {
	if (Input.GetKey(KeyCode.LeftArrow))
		this.rigidbody2D.velocity.x -= horz_speed;
	if (Input.GetKey(KeyCode.RightArrow))
		this.rigidbody2D.velocity.x += horz_speed;
	if (Input.GetKeyDown(KeyCode.UpArrow) && canJump){
		rigidbody2D.velocity.y += vert_speed;
		if(!allow_multiple_jumps)
			canJump = false;
	}
	if (Input.GetKeyDown(KeyCode.DownArrow)){
		rigidbody2D.velocity.y -= vert_speed;
	}
	
	if (Input.GetKeyUp(KeyCode.LeftArrow))
		this.rigidbody2D.velocity.x = 0;
	else if (Input.GetKeyUp(KeyCode.RightArrow))
		this.rigidbody2D.velocity.x = 0;
}

function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.gameObject.tag == "Wall") {
	}
	if(coll.gameObject.tag == "Ground"){ 	// If the player lands on ground
	    canJump = true; 					// allow him to jump again
	}
}
