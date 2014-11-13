using UnityEngine;
using System.Collections;

public class AttackControl : MonoBehaviour
{

	public enum AttackState
	{
		None,
		Windup,
		Strike,
		Backswing
	}
	protected Animator animator;
	GameObject weak1StrikeBox;
	GameObject curr_weak1StrikeBox;

	/* previous attack tracker for combos */

	// Use this for initialization
	void Start ()
	{
		animator = GetComponent<Animator> ();
		weak1StrikeBox = new GameObject ();
	}
	
	// Update is called once per frame
	void Update ()
	{
		Debug.Log ("naaas");
		if (animator) {
			Debug.Log ("yaas");
			if (this.animator.GetCurrentAnimatorStateInfo (0).IsName ("CK_weak1")) {
				return;
			}
			animator.SetInteger ("state", 0);
			if (animator.GetInteger ("state") == 0) {
				if (Input.GetKeyDown (KeyCode.Space)) {
					WeakAttack ();
				}
			}
		}
	} 

	void WeakAttack ()
	{
		// move the character forward with a small force
		// start the attack animation
		// update the states
		animator.SetInteger ("state", 1);
		curr_weak1StrikeBox = (GameObject)Instantiate (weak1StrikeBox,
		                                   new Vector3 (transform.position.x + 1, transform.position.y, 0), transform.rotation);
		curr_weak1StrikeBox.AddComponent<BoxCollider2D> ();
		curr_weak1StrikeBox.GetComponent<BoxCollider2D> ().isTrigger = true;
		//curr_weak1StrikeBox.AddComponent<TestCollide> ();
	}
}
