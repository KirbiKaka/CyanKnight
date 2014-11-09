using UnityEngine;
using System.Collections;

public class MovementControl : MonoBehaviour {
	// Global constants
	float HORZ_SPEED = 10;
	float SLOW_HORZ_SPEED = 5;
	float VERT_SPEED = 10;

	private bool allowMovement;	// determines if movement is allowed (false if not allowing aerial movement)
	private bool allowAttacks;	// determines if attacks are allowed (false while attacking)
	private bool isGrounded;		// determines whether or not CK is on the ground
	
	void Start () {
		this.rigidbody2D.fixedAngle = true;
		allowMovement = true;
		allowAttacks = true;
		isGrounded = true;
	}
	
	void Update () {
		
	}
	
	void OnCollisionEnter2D(Collision2D coll) {
		if(coll.gameObject.tag == "Ground")
			isGrounded = true;
	}
	
	void OnCollisionExit2D(Collision2D coll){
		if(coll.gameObject.name == "Ground")
			isGrounded = false;
	}
	
	public void MoveLeft() {
		if (isGrounded) {
			this.rigidbody2D.AddForce(Vector2.right * -HORZ_SPEED, ForceMode2D.Impulse);
		} else {
			this.rigidbody2D.AddForce(Vector2.right * -SLOW_HORZ_SPEED, ForceMode2D.Impulse);
		}
	}
	
	public void MoveRight() {
		if (isGrounded) {
			this.rigidbody2D.AddForce(Vector2.right * HORZ_SPEED, ForceMode2D.Impulse);
		} else {
			this.rigidbody2D.AddForce(Vector2.right * SLOW_HORZ_SPEED, ForceMode2D.Impulse);
		}
	}
	
	public void JumpUp() {
		if (isGrounded) {
			this.rigidbody2D.AddForce (Vector2.up * VERT_SPEED, ForceMode2D.Impulse);
		}
	}
	
	public void FallDown() {
		this.rigidbody2D.AddForce (Vector2.up * -VERT_SPEED, ForceMode2D.Impulse);
	}
	
	public void DashLeft() {
		Debug.Log("dash left");
		this.rigidbody2D.AddForce(Vector2.right * -20 * HORZ_SPEED, ForceMode2D.Impulse);
		this.rigidbody2D.AddForce(Vector2.right * HORZ_SPEED / 2);
		//	WaitForSeconds(1);
		//	this.rigidbody2D.AddForce(-Vector2.right*HORZ_SPEED/2);
		allowMovement = false;
		
	}
	
	public void DashRight() {
		Debug.Log("dash right");
		this.rigidbody2D.AddForce(Vector2.right * 20 * HORZ_SPEED, ForceMode2D.Impulse);
		this.rigidbody2D.AddForce(-Vector2.right*HORZ_SPEED/2);
		//	WaitForSeconds(1);
		//	this.rigidbody2D.AddForce(Vector2.right*HORZ_SPEED/2);
		allowMovement = false;
	}
	
	public void SlowToStop() {
		if (!allowMovement)
			return;
		// Makes CK move slightly farther before stopping
		if (this.rigidbody2D.velocity.x > 0) {
			this.rigidbody2D.AddForce(Vector2.right * SLOW_HORZ_SPEED);
		} else {
			this.rigidbody2D.AddForce(-Vector2.right * SLOW_HORZ_SPEED);
		}
	}
}
