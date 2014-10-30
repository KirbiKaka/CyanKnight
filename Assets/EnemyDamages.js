#pragma strict

var health : int; health = 5;
var strikeBox : GameObject; strikeBox = new GameObject();
var currentStrikeBox : GameObject;

function Start () {

}

function Update () {
	if (health <= 0) Destroy(gameObject);
	
	/*GEORGE YOU NEED TO CHANGE THE IF CONDITION*/
	if (false) {
		currentStrikeBox = Instantiate(strikeBox,
			new Vector3(transform.position.x + 1, transform.position.y, 0), transform.rotation);
		currentStrikeBox.AddComponent(BoxCollider2D);
		currentStrikeBox.GetComponent(BoxCollider2D).isTrigger = true;
		currentStrikeBox.AddComponent(EnemyCollide);
	}
}