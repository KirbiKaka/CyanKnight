#pragma strict

var health : int;

function Start () {
	health = 5;
}

function Update () {
	if (health <= 0) Destroy(gameObject);
}