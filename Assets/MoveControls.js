#pragma strict

var speed = 1;
var jump_height = 10;

var canJump = true;

function Start () {

}

function Update () {
	if(Input.GetKeyDown("space") && canJump){
		this.rigidbody2D.velocity.y += 5; //jump
		canJump = false; //Disable jumping until landing
	}

	if (Input.GetKey(KeyCode.LeftArrow))
		transform.Translate(Vector3(-1, 0, 0) * Time.deltaTime * speed);
	if (Input.GetKey(KeyCode.RightArrow))
		transform.Translate(Vector3( 1, 0, 0) * Time.deltaTime * speed);
	if (Input.GetKeyDown(KeyCode.UpArrow) && canJump){
		rigidbody2D.velocity.y += 5;
		canJump = false;
	}
}

function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.gameObject.tag == "Wall") {
		coll.gameObject.SendMessage("Stop", 10);
	}
	if(coll.gameObject.tag == "Ground"){ 	// If the player lands on ground
	    canJump = true; 					// allow him to jump again
	}
}