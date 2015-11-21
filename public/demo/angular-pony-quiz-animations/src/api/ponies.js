var ponies = ["Al", "Billy", "Snowflake", "El Toro"];




function Pony(n, p){
	this.name = n;
	this.points = p;	
}
Pony.prototype.logInfo = function() {
	console.log("Name: "+ this.name + "Points: " + this.points);
}

var p1 = new Pony("Billy", 100);

p1.logInfo();

al_100
billy_100
snowflake_100
eltoro_100




function Question(q, a, is) {
	this.question = q;
	this.answer = a;
	this.initialScore = is;
	this.score = is;
	this.answeredQuestions = [];
}

Question.prototype.getScore = function(){
	if (this.initialScore == 0) {
		var score = this.initialScore;
	} else {
		var score = this.answer += this.answeredQuestions;	
		console.log(score);
	}
}

Question.prototype.addAnswer = function() {
		var newAnswer = this.answer; 
		var answers = this.answeredQuestions;
		var answered = answers.push(newAnswer);
		
		console.log(answered.length);
}

Question.prototype.logInfo = function() {
	//console.log("Question: "+ this.question+ " Answer: "+ this.answer+ " initialScore: " + this.initialScore+ " Score: " + this.score);
}



q1 = new Question("What is your favorite snack", "oats", 0);
q2 = new Question("What is your favorite item to deliver?", "boots", 0);
	
//q1.logInfo();
q1.getScore();
q1.addAnswer();
q2.addAnswer();
//console.log(q1.score);s