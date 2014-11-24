#pragma strict

var threshold = 1;

function Start () {
}

function Update () {
	if (Mathf.Abs(this.transform.position.x - Camera.main.transform.position.x)  > threshold) {
		Camera.main.transform.position.x = Mathf.Lerp(Camera.main.transform.position.x, this.transform.position.x, 0.03);
	}
}