#pragma strict
var totalhealth : int; totalhealth = 5;
var health : int; health = totalhealth;
var strikeBox : GameObject; strikeBox = new GameObject();
var currentStrikeBox : GameObject;
var cooldown : float; cooldown = 2.0;
private var offcooldowntime : float;
var oncooldown : boolean; oncooldown = false;
var aggro : boolean; aggro = false;
public var patrolSpeed : Vector2; patrolSpeed = new Vector2(2, 2);
public var chaseSpeed : Vector2; chaseSpeed = new Vector2(5, 5);
public var direction : Vector2; direction = new Vector2(0, 0);
public var movement : Vector2;
public var aggrorange : float; aggrorange = 8f;


function Start () {

}

function Attack(dir) {
	if (dir == -1) {
		currentStrikeBox = Instantiate(strikeBox,
			new Vector3(transform.position.x - 1, transform.position.y, 0), transform.rotation);
		}
	else if (dir == 1) {
		currentStrikeBox = Instantiate(strikeBox,
			new Vector3(transform.position.x + 1, transform.position.y, 0), transform.rotation);
		}
	currentStrikeBox.AddComponent(BoxCollider2D);
	currentStrikeBox.GetComponent(BoxCollider2D).isTrigger = true;
	currentStrikeBox.AddComponent(EnemyCollide);
}

function UpdateCooldowns() {

}

function Update () {
	var CyanKnight = GameObject.FindGameObjectWithTag("Player");
	if (health <= 0){
		Destroy(gameObject);
	}
	var playerpos = CyanKnight.transform.position;
	var enemypos = transform.position;
	if (enemypos.x > playerpos.x) {
		direction.x = -1;
	} else {
		direction.x = 1;
	}
	var distance : float; distance = Vector2.Distance(this.transform.position, CyanKnight.transform.position);
	// Update aggro
	if ((health < totalhealth) || (distance <= aggrorange)) {
		aggro = true;
	} else {
		aggro = false;
	}
	// Update movement based on aggro state
	if (aggro == true) {
		movement = new Vector2(chaseSpeed.x * direction.x, chaseSpeed.y * direction.y);
		rigidbody2D.velocity = movement;
	} else {
		movement = new Vector2(0, 0);
		rigidbody2D.velocity = movement;
	}
	// Update cooldowns and perform attacks when necessary
	if ((aggro == true) && (oncooldown == false)) {
		Attack(direction.x);
		oncooldown = true;
		offcooldowntime = Time.time + cooldown;
	}
	if (oncooldown == true) {
		if (Time.time >= offcooldowntime) {
			oncooldown = false;
		}
	}
}