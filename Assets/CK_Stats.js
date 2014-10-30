#pragma strict

var health : int; health = 50;

function Start () {
	
}

function Update () {
	if (health <= 0) Destroy(gameObject);
}