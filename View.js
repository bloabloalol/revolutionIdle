export default class View {
	constructor(model) {
		this.model = model;
		//CANVAS
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");

		//DOM ELEMENTS

		//available funds 
		this.availableFunds = document.getElementById("availableFunds");

		for(let i=0; i<this.model.letters.length; i++) {
			//multipliers
			this["multiplier" + this.model.letters[i]] = document.getElementById("multiplier" + this.model.letters[i]);
			//get buttons
			this["upgradeSpeedBtn" + this.model.letters[i]] = document.getElementById("upgradeSpeedBtn" + this.model.letters[i]);
			//get Laps Per Second
			this["lapsSec" + this.model.letters[i]] = document.getElementById("lapsSec" + this.model.letters[i]);
			//get addLapsPerSec
			this["addLapsPerSec" + this.model.letters[i]] = document.getElementById("addLapsPerSec" + this.model.letters[i]);
			//costUpgradeSpeed
			this["costUpgradeSpeed" + this.model.letters[i]] = document.getElementById("costUpgradeSpeed" + this.model.letters[i]);
			//text Box 
			this["textBox" + this.model.letters[i]] = document.getElementById("textBox" + this.model.letters[i]);
			//button ascension 
			this["asc" + this.model.letters[i]] = document.getElementById("asc" + this.model.letters[i]);
		}
		//COLOR ELEMENTS
		for(let i=0; i<this.model.letters.length; i++) {
			//header multipliers color
			this["multiplier" + this.model.letters[i]].style.color = this.model.color[i];
			//textBox color
			this["textBox" + this.model.letters[i]].style.backgroundColor = this.model.color[i];
			//ascension color
			this["asc" + this.model.letters[i]].style.backgroundColor = this.model.color[i];
		}
		//INITIALIZE DATA FOR CIRCLES
		this.stardAngle = -Math.PI / 2;
		//initialize indexEndAngle[letter]
		for(let i=0; i<this.model.letters.length; i++) {
			this["indexEndAngle" + this.model.letters[i]] = 0;
		}
		//set a speed for each circles
		for(let i=0; i<this.model.letters.length; i++) {
			this["circleSpeed" + this.model.letters[i]] = 60;
		}
		
		
		
	}
	updateView() {
		//player money
		this.availableFunds.innerHTML = this.model.availableFunds.toFixed(2);
		//buttons data	
		for(let i=0 ; i<this.model.letters.length ; i++) {
			//update all textContent multipliers
			this["multiplier" + this.model.letters[i]].textContent = this.model["multiplier" + this.model.letters[i]].toFixed(2);
			this["lapsSec" + this.model.letters[i]].textContent = "Laps/s:" + this.model["lapsSec" + this.model.letters[i]].toFixed(2) + " ";
			this["addLapsPerSec" + this.model.letters[i]].textContent = "[+" + this.model["addLapsPerSec" + this.model.letters[i]].toFixed(2) + "] ";
			this["costUpgradeSpeed" + this.model.letters[i]].textContent = "Cost:" + this.model["costUpgradeSpeed" + this.model.letters[i]].toFixed(2) + " ";
		}
		//button color textBox: if can affort light color else dark color.
		for(let i=0 ; i<this.model.letters.length ; i++) {
			//color buttons
			this.model.canAffordUpgrade(this.model.letters[i]) ? 
			this["upgradeSpeedBtn" + this.model.letters[i]].style.backgroundColor = this.model.color[i] : 
			this["upgradeSpeedBtn" + this.model.letters[i]].style.backgroundColor = this.model.lightColor[i];


		}
	}
	resizeCanvas() {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.drawCircles();
	}
	drawCircles() {
		let x = this.canvas.width / 2;
		let y = this.canvas.height / 2;
		let radius = 9;
		/*
		droite → 0
		bas → Math.PI / 2
		gauche → Math.PI
		haut → -Math.PI / 2 (ou 1.5 * Math.PI)
		*/
		let lineWidth = 18;
		let spacing = 8;
		let colorIndex = 0;
		for(let i=0; i<this.model.letters.length; i++) {
			this["endAngle" + this.model.letters[i]] = this.stardAngle + this["indexEndAngle" + this.model.letters[i]];
		}
		
		// numbers of circles
		for(let i=0; i<this.model.countCirclesNumbers() ; i++) {
			
			//draw circle
			this.ctx.beginPath();
			this.ctx.arc(x, y, radius, this.stardAngle, this["endAngle" + this.model.letters[i]], false);
			//the circle color
			this.ctx.strokeStyle = this.model.color[colorIndex];
			//the circle line width
			this.ctx.lineWidth = lineWidth;
			this.ctx.stroke();
			//increment the radius for the next circle
			radius += lineWidth + spacing;
			//next color in the tab
			colorIndex ++;
			//restart the colorIndex
			if(colorIndex >= this.model.color.length) {
				colorIndex = 0;
			}
		}
	}
	incrementEndAngle() {
		//rotation speed
		for(let i=0; i<this.model.countCirclesNumbers(); i++) {
			if(this.model["multiplier" + this.model.letters[i]] !== 0) {
				this["indexEndAngle" + this.model.letters[i]] += (2*Math.PI)/this["circleSpeed" + this.model.letters[i]] + ((2*Math.PI)/this["circleSpeed" + this.model.letters[i]])*this.model["multiplier" + this.model.letters[i]];
			}
			else {
				this["indexEndAngle" + this.model.letters[i]] += (2*Math.PI)/this["circleSpeed" + this.model.letters[i]];
				
			}
			if(this["indexEndAngle" + this.model.letters[i]] >= 2*Math.PI) {
				this["indexEndAngle" + this.model.letters[i]] -= 2*Math.PI;
				this.model["multiplier" + this.model.letters[i]] += 0.01;
			}
		}
		
	}
	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	render() {
		this.clearCanvas();
		this.drawCircles();
		this.incrementEndAngle();
	}

}