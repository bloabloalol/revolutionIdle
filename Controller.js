export default class Controller {
	constructor(model, view) {
		this.model = model;
		this.view = view;
		//resize canvas
		this.view.resizeCanvas();
		//update view and draw circles
		window.requestAnimationFrame(this.loop.bind(this));

		//add all listeners
		this.initInput();
		//FPS
		this.deltaTime = 0;
		this.lastTimeStamp = 0;
		this.fps = 0;
	}
	//add listeners
	initInput() {
		window.addEventListener(("resize"), () => 
			this.view.resizeCanvas()
		);
		//add listener for each upgrade circle button.
		for (let letter of this.model.letters) {
			this.view["upgradeSpeedBtn" + letter].addEventListener("click", () =>
				this.model.upgradeSpeedBtnIsPressed(letter)
			);
		}
	}
	loop(timeStamp) {
		//calcul delta time
		this.deltaTime = timeStamp - this.lastTimeStamp;
		this.lastTimeStamp = timeStamp;
		//calcul fps
		this.fps = 1000 / this.deltaTime;
		console.log("fps", this.fps.toFixed(0));
		//update the player view
		this.view.updateView();
		//draw circles
		this.view.render();
		requestAnimationFrame(this.loop.bind(this));
	}
}