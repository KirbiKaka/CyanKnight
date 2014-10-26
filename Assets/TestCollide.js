﻿#pragma strict

var timer : float;

function Start () {
	timer = Time.time;
}

function Update () {
	if (Time.time - timer >= 2) {
		Destroy(gameObject);
	}
}

function OnTriggerEnter2D (coll : Collider2D) {
	if (coll.gameObject.tag == "Enemy") {
		Debug.Log("Hit an enemy!");
	}
}