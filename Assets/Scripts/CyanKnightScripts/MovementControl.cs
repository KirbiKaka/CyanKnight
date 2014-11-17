using UnityEngine;
using System.Collections;

public class MovementControl : MonoBehaviour 
{
	/** What to [HideInInspector]? **/
	public static float moveForce = 365f;			// Amount of force added to move the player left and right.
	public static float dashForce = 10 * moveForce;
	public static float slowForce = moveForce / 10;
	public static float maxSpeed = 5f;				// The fastest the player can travel in the x axis.
	public static float jumpForce = 500f;			// Amount of force added when the player jumps.

	private Animator animator;

	public enum MoveState {Idle, Run, Dash, Airborne, Crouch};
	public MoveState moveState = MoveState.Idle;

	private Transform groundCheck;			// A position marking where to check if the player is grounded.
	private bool isGrounded = false;		// Whether or not the player is grounded.
	public bool facingRight = false;			// For determining which way the player is currently facing.

	void Awake()
	{
		animator = GetComponent<Animator>();
		groundCheck = transform.Find("groundCheck");
	}

	void Start()
	{
		this.rigidbody2D.fixedAngle = true;
	}

	void Update() 
	{
		isGrounded = Physics2D.Linecast(transform.position, groundCheck.position, 1 << LayerMask.NameToLayer("Ground"));
	}
	
	public void MoveLeft() {
		if (!isGrounded)
			return;
		
		animator.SetInteger ("state", 2);

		float speed = Mathf.Abs (rigidbody2D.velocity.x);
		if(rigidbody2D.velocity.x > 0 || speed < maxSpeed)
			rigidbody2D.AddForce(-1*Vector2.right * moveForce);
		else // if (rigidbody2D.velocity.x < 0 && speed > maxSpeed)
			rigidbody2D.velocity = new Vector2(-maxSpeed, rigidbody2D.velocity.y);

		if(facingRight)
			Flip();
	}
	
	public void MoveRight() {
		if (!isGrounded)
			return;

		
		animator.SetInteger ("state", 2);
		
		float speed = Mathf.Abs (rigidbody2D.velocity.x);
		if(rigidbody2D.velocity.x < 0 || speed < maxSpeed)
			rigidbody2D.AddForce(Vector2.right * moveForce);
		else // if (rigidbody2D.velocity.x > 0 && speed > maxSpeed)
			rigidbody2D.velocity = new Vector2(maxSpeed, rigidbody2D.velocity.y);
		
		if(!facingRight)
			Flip();
	}

	void Flip ()
	{
		// Switch the way the player is labelled as facing.
		facingRight = !facingRight;
		
		// Multiply the player's x local scale by -1.
		Vector3 theScale = transform.localScale;
		theScale.x *= -1;
		transform.localScale = theScale;
	}
	
	public void JumpUp() {
		if (!isGrounded)
			return;

		// anim.SetTrigger("Jump");
		rigidbody2D.AddForce (Vector2.up * jumpForce);
	}
	
	public void FallDown() {
		rigidbody2D.AddForce (-1*Vector2.up * jumpForce);
	}
	
	public void DashLeft() {
		if (!isGrounded)
			return;

		Debug.Log("dash left");
		// anim.SetFloat("Speed", Mathf.Abs(h));
		rigidbody2D.AddForce(-Vector2.right * dashForce);
		
		if(!facingRight)
			Flip();
		
	}
	
	public void DashRight() {
		if (!isGrounded)
			return;
		
		Debug.Log("dash right");
		// anim.SetFloat("Speed", Mathf.Abs(h));
		rigidbody2D.AddForce(Vector2.right * dashForce);
		
		if(!facingRight)
			Flip();
	}
	
	public void SlowToStop() {
		animator.SetInteger ("state", 0);
		// Makes CK move slightly farther before stopping
		rigidbody2D.velocity = new Vector2 (0, rigidbody2D.velocity.y);
			/*
		if (this.rigidbody2D.velocity.x > 0) {
			this.rigidbody2D.AddForce(-1*Vector2.right * slowForce);
		} else {
			this.rigidbody2D.AddForce(Vector2.right * slowForce);
		} */
	}
}
