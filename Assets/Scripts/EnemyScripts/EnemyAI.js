#pragma strict
var totalhealth : int; totalhealth = 5;
var health : int; health = totalhealth;
var strikeBox : GameObject; strikeBox = new GameObject();
var currentStrikeBox : GameObject;
private var direction: int; direction = 0;
var cooldown : float; cooldown = 2.0;
private var offcooldowntime : float;
var oncooldown : boolean; oncooldown = false;
var aggro : boolean; aggro = false;
public var Speed : float; Speed = 1;
private var counter : int; counter = 0;
public var movespeed = 1f;
public var turnspeed = 180f;

function Start () {

}

function Attack(dir) {
	if (dir == 0) {
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

function Update () {
	counter += 1;
	var CyanKnight = GameObject.FindGameObjectWithTag("Player");
	if (health <= 0) Destroy(gameObject);
	var playerpos = CyanKnight.transform.position;
	var enemypos = transform.position;
	if (enemypos.x > playerpos.x) {
		direction = 0;
	} else {
		direction = 1;
	}
	var distance : float; distance = Vector2.Distance(this.transform.position, CyanKnight.transform.position);
	if (distance <= 5f) {
		transform.LookAt(CyanKnight.transform.position);
		if (distance >= 1f) {// Not sure if I should include this in the code since it might allow for mobbing
			transform.Translate(Vector3.forward * movespeed * Time.deltaTime);
		}
		// transform.Translate(Vector2.MoveTowards(transform.position, CyanKnight.transform.position, distance) * Speed * Time.deltaTime);
	} else {
		if (counter % 300 == 0) {
			var rand = Random.Range(0.0, 1.0);
			if (rand <= 0.5) {
				transform.Rotate(Vector3.left * Time.deltaTime, turnspeed * Time.deltaTime);
			} else {
				transform.Rotate(Vector3.right * Time.deltaTime, turnspeed * Time.deltaTime);
			}
		} else {
			transform.Translate(Vector3.forward * movespeed * Time.deltaTime);
		}
	}
	if ((health < totalhealth) || (distance <= 5f)) {
		aggro = true;
	} else {
		aggro = false;
	}
	if ((aggro == true) && (oncooldown == false)) {
		Attack(direction);
		oncooldown = true;
		offcooldowntime = Time.time + cooldown;
	}
	if (oncooldown == true) {
		if (Time.time >= offcooldowntime) {
			oncooldown = false;
		}
	}
}