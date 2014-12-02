using UnityEngine;
using System.Collections;

public class StrikeboxScript : MonoBehaviour {

	float timer;
	float duration;

	// Use this for initialization
	void Start () {
		timer = Time.time;
		duration = 2;
	}
	
	// Update is called once per frame
	void Update () {
		if (Time.time - timer >= duration) {
			Destroy (gameObject);
		}
	}

	void OnTriggerEnter2D (Collider2D coll) {
		if (coll.gameObject.tag == "Enemy") {
			coll.gameObject.GetComponent<EnemyStats>().health -= 1;
			Debug.Log("Health: " + coll.gameObject.GetComponent<EnemyStats>().health);
			Debug.Log("Hit an enemy!");
		}
	}
}
