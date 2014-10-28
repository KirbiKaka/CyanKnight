#pragma strict

var horz_speed = 10;
var vert_speed = 7.5;
//var allow_multiple_jumps = false;

private var isGrounded;


function Start () {
	this.rigidbody2D.fixedAngle = true;
}

function Update () {
	if (isGrounded) {
		if (Input.GetKey(KeyCode.LeftArrow))
			this.rigidbody2D.velocity.x = -horz_speed;
		if (Input.GetKey(KeyCode.RightArrow))
			this.rigidbody2D.velocity.x = horz_speed;
		if (Input.GetKeyDown(KeyCode.DownArrow))
			rigidbody2D.velocity.y -= vert_speed;
		if (Input.GetKeyDown(KeyCode.UpArrow)){
			rigidbody2D.velocity.y += vert_speed;
//			if(!allow_multiple_jumps)
//				isGrounded = false;
		}
	}
	
	if (Input.GetKeyUp(KeyCode.LeftArrow))
		this.rigidbody2D.velocity.x = 0;
	else if (Input.GetKeyUp(KeyCode.RightArrow))
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
