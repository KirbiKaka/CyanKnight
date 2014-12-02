using UnityEngine;
using System.Collections;

public class AttackControl : MonoBehaviour
{

	public enum AttackState { None, Windup, Strike, Backswing }
	public AttackState attackState = AttackState.None;
	private Animator animator;
	GameObject weak1StrikeBox;
	GameObject curr_weak1StrikeBox;

	int attackCombo = 0;

	// Use this for initialization
	void Start ()
	{
		animator = GetComponent<Animator> ();
		weak1StrikeBox = new GameObject ();
	}
	
	// Update is called once per frame
	void Update ()
	{
		if (animator) {
			/* If the animator is doing weak1, don't set the state back to idle. */
			AnimatorStateInfo curr = this.animator.GetCurrentAnimatorStateInfo(0);
			if (curr.IsName ("CK_weak1_windup") || curr.IsName ("CK_weak2_windup")
			    || curr.IsName ("CK_weak3_windup") || curr.IsName ("CK_weak4_windup")) {
				return;
			}
			else if (curr.IsName ("CK_weak1_strike") || curr.IsName("CK_weak2_strike")
			         || curr.IsName ("CK_weak3_strike") || curr.IsName ("CK_weak4_strike")) {
				attackState = AttackState.Strike;
				return;
			}
			else if (curr.IsName ("CK_weak1_backswing") || curr.IsName ("CK_weak2_backswing")
			         || curr.IsName ("CK_weak3_backswing") || curr.IsName ("CK_weak4_backswing")) {
				attackState = AttackState.Backswing;
				return;
			}
			/* Else, return the state to idle. */
			animator.SetInteger ("state", 0);
			attackState = AttackState.None;
			attackCombo = 0;
		}
	} 

	public void WeakAttack ()
	{
		// move the character forward with a small force
		// start the attack animation
		// update the states
		if (attackState == AttackState.None
		    && gameObject.GetComponent<MovementControl>().moveState != MovementControl.MoveState.Airborne
		    & gameObject.GetComponent<MovementControl>().moveState != MovementControl.MoveState.Dash) {
			animator.SetInteger ("state", 100);
			attackState = AttackState.Windup;
			curr_weak1StrikeBox = (GameObject)Instantiate (weak1StrikeBox,
			                                               new Vector3 (transform.position.x + 1, transform.position.y, 0), transform.rotation);
			curr_weak1StrikeBox.AddComponent<BoxCollider2D> ();
			curr_weak1StrikeBox.GetComponent<BoxCollider2D> ().isTrigger = true;
			curr_weak1StrikeBox.AddComponent<StrikeboxScript> ();
			//rigidbody2D.AddForce (Vector2.right * 300);
			rigidbody2D.velocity = new Vector2(8, rigidbody2D.velocity.y);
		} else if (attackState == AttackState.Backswing && attackCombo < 3) {
			if (animator.GetInteger ("state") == 100) {
				animator.SetInteger("state", 101);
				attackCombo++;
				attackState = AttackState.Windup;
				curr_weak1StrikeBox = (GameObject)Instantiate (weak1StrikeBox,
				                                               new Vector3 (transform.position.x + 1, transform.position.y, 0), transform.rotation);
				curr_weak1StrikeBox.AddComponent<BoxCollider2D> ();
				curr_weak1StrikeBox.GetComponent<BoxCollider2D> ().isTrigger = true;
				curr_weak1StrikeBox.AddComponent<StrikeboxScript> ();
				//rigidbody2D.AddForce (Vector2.right * 300);
				rigidbody2D.velocity = new Vector2(8, rigidbody2D.velocity.y);
			} else if (animator.GetInteger ("state") == 101) {
				animator.SetInteger("state", 102);
				attackCombo++;
				attackState = AttackState.Windup;
				curr_weak1StrikeBox = (GameObject)Instantiate (weak1StrikeBox,
				                                               new Vector3 (transform.position.x + 1, transform.position.y, 0), transform.rotation);
				curr_weak1StrikeBox.AddComponent<BoxCollider2D> ();
				curr_weak1StrikeBox.GetComponent<BoxCollider2D> ().isTrigger = true;
				curr_weak1StrikeBox.AddComponent<StrikeboxScript> ();
				rigidbody2D.AddForce (Vector2.right * 300);
			} else if (animator.GetInteger ("state") == 102) {
				animator.SetInteger("state", 103);
				attackCombo++;
				attackState = AttackState.Windup;
				curr_weak1StrikeBox = (GameObject)Instantiate (weak1StrikeBox,
				                                               new Vector3 (transform.position.x + 1, transform.position.y, 0), transform.rotation);
				curr_weak1StrikeBox.AddComponent<BoxCollider2D> ();
				curr_weak1StrikeBox.GetComponent<BoxCollider2D> ().isTrigger = true;
				curr_weak1StrikeBox.AddComponent<StrikeboxScript> ();
				rigidbody2D.AddForce (Vector2.right * 300);
			}
		}
	}
}
