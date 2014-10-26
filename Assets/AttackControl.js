#pragma strict

var strikeBox : GameObject;
var currentStrikeBox : GameObject;

function Start () {
	strikeBox = new GameObject();
}

function Update () {
	if (Input.GetKeyDown(KeyCode.Space)) {
		currentStrikeBox = Instantiate(strikeBox,
			new Vector3(transform.position.x + 1, transform.position.y, 0), transform.rotation);
		currentStrikeBox.AddComponent(BoxCollider2D);
		currentStrikeBox.GetComponent(BoxCollider2D).isTrigger = true;
		currentStrikeBox.AddComponent(TestCollide);
	}

}