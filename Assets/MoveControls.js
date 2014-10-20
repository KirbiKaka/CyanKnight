#pragma strict

var speed = 50;

function Start () {

}

function Update () {

	if (Input.GetKeyDown(KeyCode.LeftArrow))
		transform.Translate (Vector3 (-1, 0, 0) * Time.deltaTime * speed);

}

function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.gameObject.tag == "Wall") {
		coll.gameObject.SendMessage("Stop", 10);
	}
}