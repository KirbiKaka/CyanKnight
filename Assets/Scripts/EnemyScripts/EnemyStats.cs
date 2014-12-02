using UnityEngine;
using System.Collections;

public class EnemyStats : MonoBehaviour {

	public int maxHealth = 20;
	public int health;

	// Use this for initialization
	void Start () {
		health = maxHealth;
	}
	
	// Update is called once per frame
	void Update () {
		if (health <= 0) {
			Destroy(gameObject);
		}
	}
}
