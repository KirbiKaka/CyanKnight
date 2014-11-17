﻿using UnityEngine;
using System.Collections;
using System.Collections.Generic;

/** 
This class will take care of all keyboard input.
It calls the appropriate action function from other scripts 
when the appropriate set of keystrokes triggers that action. 
*/
public class InputControl : MonoBehaviour
{
	private MovementControl movementControls;
	// Movement Keys
	public static KeyCode LEFT_KEY = KeyCode.A;
	public static KeyCode RIGHT_KEY = KeyCode.D;
	public static KeyCode UP_KEY = KeyCode.W;
	public static KeyCode DOWN_KEY = KeyCode.S;
	
	// Attack Keys
	public static KeyCode WEAK_KEY = KeyCode.K;
	public static KeyCode STRONG_KEY = KeyCode.L;
	public static KeyCode SHIELD_KEY = KeyCode.Semicolon;
	
	// Paradigm Keys
	public static KeyCode P1_KEY = KeyCode.I;
	public static KeyCode P2_KEY = KeyCode.O;
	public static KeyCode P3_KEY = KeyCode.P;
	
	// Combo Keys
	private int MAX_KEY_COMBO = 3;
	private float KEY_WAIT_TIME = 0.3f; 		// 0.3 seconds
	private static KeyCode[] COMBO_KEYS = {LEFT_KEY, RIGHT_KEY, UP_KEY, DOWN_KEY, WEAK_KEY, STRONG_KEY, SHIELD_KEY};
	private List<KeyCode> recentKeys; 		// Stores the recent keys pressed, to check for combos
	private List<float> recentKeyTimes; 	// Stores the times that the recent keys were pressed

	protected Animator animator;

	void Awake ()
	{
		movementControls = GameObject.Find ("Cyan Knight").GetComponent<MovementControl> ();
	}

	void Start ()
	{
		recentKeys = new List<KeyCode> ();
		recentKeyTimes = new List<float> ();
		animator = GetComponent<Animator> ();
	}

	//** TEST WITH fixedUpdate **//
	void Update ()
	{
		/**
		// If the jump button is pressed and the player is grounded then the player should jump.
		if(Input.GetKeyDown("Jump") && grounded)
			jump = true;
		*/

		// Remove keys pressed more than KEY_WAIT_TIME seconds ago
		while (recentKeyTimes.Count > 0 && Time.time - recentKeyTimes[0] > KEY_WAIT_TIME) {
			recentKeys.RemoveAt (0);
			recentKeyTimes.RemoveAt (0);
			LogKeys (recentKeys);
		}

		// Add current keys pressed to recentKeys, allowing a max of MAX_KEY_COMBO keys
		foreach (KeyCode key in COMBO_KEYS) {
			if (Input.GetKeyDown (key)) {
				recentKeys.Add (key);
				recentKeyTimes.Add (Time.time);
				if (recentKeys.Count > MAX_KEY_COMBO) {
					recentKeys.RemoveAt (0);
					recentKeyTimes.RemoveAt (0);
				}
				LogKeys (recentKeys);
			}
		}

		// Movement Keys
		if (Input.GetKeyDown (LEFT_KEY)) {
		}
		if (Input.GetKeyDown (RIGHT_KEY)) {
		}
		if (Input.GetKeyDown (UP_KEY)) {
			movementControls.JumpUp ();
		}	
		if (Input.GetKeyDown (DOWN_KEY)) {
			movementControls.FallDown ();
		}
		
		if (Input.GetKey (LEFT_KEY)) {
			movementControls.MoveLeft ();
			animator.SetInteger ("state", 2);
		}
		if (Input.GetKey (RIGHT_KEY)) {
			movementControls.MoveRight ();
			animator.SetInteger ("state", 2);
		}
		if (Input.GetKey (UP_KEY)) {
		}	
		if (Input.GetKey (DOWN_KEY)) {
		}
		
		if (Input.GetKeyUp (LEFT_KEY)) {
			movementControls.SlowToStop ();
			animator.SetInteger ("state", 0);
		}
		if (Input.GetKeyUp (RIGHT_KEY)) {
			movementControls.SlowToStop ();
			animator.SetInteger ("state", 0);
		}
		if (Input.GetKeyUp (UP_KEY)) {
		}	
		if (Input.GetKeyUp (DOWN_KEY)) {
		}
		
		// Attack Keys
		if (Input.GetKeyDown (WEAK_KEY)) {
		}
		if (Input.GetKeyDown (STRONG_KEY)) {
		}	
		if (Input.GetKeyDown (SHIELD_KEY)) {
		}
		
		if (Input.GetKey (WEAK_KEY)) {
		}
		if (Input.GetKey (STRONG_KEY)) {
		}	
		if (Input.GetKey (SHIELD_KEY)) {
		}
		
		if (Input.GetKeyUp (STRONG_KEY)) {
		}	
		if (Input.GetKeyUp (SHIELD_KEY)) {
		}
		if (Input.GetKeyUp (WEAK_KEY)) {
		}
		
		// Paradigm Keys
		if (Input.GetKeyDown (P1_KEY)) {
		}
		if (Input.GetKeyDown (P2_KEY)) {
		}	
		if (Input.GetKeyDown (P3_KEY)) {
		}
		
		if (Input.GetKey (P1_KEY)) {
		}
		if (Input.GetKey (P2_KEY)) {
		}	
		if (Input.GetKey (P3_KEY)) {
		}
		
		if (Input.GetKeyUp (P1_KEY)) {
		}
		if (Input.GetKeyUp (P2_KEY)) {
		}	
		if (Input.GetKeyUp (P3_KEY)) {
		}
		
		// Combo Keys
		if (getQueuedCombo (new KeyCode[] {LEFT_KEY, LEFT_KEY})) {
			movementControls.DashLeft ();
		}
		if (getQueuedCombo (new KeyCode[] {RIGHT_KEY, RIGHT_KEY})) {
			movementControls.DashRight ();
		}
	}
	
	private void LogKeys (List<KeyCode> recentKeys)
	{
		string str = "";
		foreach (KeyCode key in recentKeys) {
			str += key + " ";
		}
		Debug.Log (str);
	}
	
	/** 
	Takes in an Array of comboKeys, using the default names defined at the top,
	and checks if those comboKeys were the recentKeys pressed. If so, it resets
	recentKeys, presuming that the combo has been used up.
	*/
	bool getQueuedCombo (KeyCode[] comboKeys)
	{
		if (comboKeys.Length != recentKeys.Count) {
			return false;
		}
		for (int i = 0; i < comboKeys.Length; i++) {
			if (comboKeys [i] != recentKeys [i]) {
				return false;
			}
		}
		recentKeys.RemoveRange (0, comboKeys.Length);
		recentKeyTimes.RemoveRange (0, comboKeys.Length);
		return true;
	}
}
