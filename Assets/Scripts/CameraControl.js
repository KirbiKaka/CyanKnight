#pragma strict

var threshold = 1;
var player : GameObject;

function Start () {
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	if (Mathf.Abs(player.transform.position.x - transform.position.x)  > threshold) {
		transform.position.x = Mathf.Lerp(transform.position.x, player.transform.position.x, 0.03);
	}
}