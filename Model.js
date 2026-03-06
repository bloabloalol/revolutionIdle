export default class Model {
	constructor() {
		// Player money
		this.availableFunds = 1500;

		//multipliers
		this.multiplierA = 0.00;
		this.multiplierB = 0.00;
		this.multiplierC = 0.00;
		this.multiplierD = 0.00;
		this.multiplierE = 0.00;
		this.multiplierF = 0.00;
		this.multiplierG = 0.00;
		this.multiplierH = 0.00;
		this.multiplierI = 0.00;
		this.multiplierJ = 0.00;
		
		//Circle Upgrade
		//actual Laps Per Sec
		this.lapsSecA = 0; 
		this.lapsSecB = 0; 
		this.lapsSecC = 0; 
		this.lapsSecD = 0; 
		this.lapsSecE = 0; 
		this.lapsSecF = 0; 
		this.lapsSecG = 0; 
		this.lapsSecH = 0; 
		this.lapsSecI = 0; 
		this.lapsSecJ = 0; 
		//add multiplier per sec
		this.addLapsPerSecA = 0;
		this.addLapsPerSecB = 0;
		this.addLapsPerSecC = 0;
		this.addLapsPerSecD = 0;
		this.addLapsPerSecE = 0;
		this.addLapsPerSecF = 0;
		this.addLapsPerSecG = 0;
		this.addLapsPerSecH = 0;
		this.addLapsPerSecI = 0;
		this.addLapsPerSecJ = 0;
		//costUpgradeSpeed
		this.costUpgradeSpeedA = 50;
		this.costUpgradeSpeedB = 150;
		this.costUpgradeSpeedC = 150;
		this.costUpgradeSpeedD = 150;
		this.costUpgradeSpeedE = 150;
		this.costUpgradeSpeedF = 150;
		this.costUpgradeSpeedG = 150;
		this.costUpgradeSpeedH = 150;
		this.costUpgradeSpeedI = 150;
		this.costUpgradeSpeedJ = 150;

		//cicles LEVELS
		this.circleLvlA = 1;
		this.circleLvlB = 1;
		this.circleLvlC = 1;
		this.circleLvlD = 1;
		this.circleLvlE = 1;
		this.circleLvlF = 1;
		this.circleLvlG = 1;
		this.circleLvlH = 1;
		this.circleLvlI = 1;
		this.circleLvlJ = 1;
		this.color = [
			"#E64F4F","#FFA64D","#F8F84A","#A0F549","#4BFEA4","#4CFFFF","#3F3FD4","#9F49F4","#FB4BFB","#FFFFFF"
		];
		this.lightColor = [
			"#7A2E2F","#875A2D","#83822C","#58812C","#2C8559","#2D8687","#26256C","#562C82","#842C84","#878687"
		];
		this.letters = [
			"A","B","C","D","E","F","G","H","I","J",
		]

		for(let i=0; i<this.letters.length; i++) {
			//initialise buttons
			this["upgradeSpeedBtn" + this.letters[i]];
		}
	}
	canPay(moneyReference, wantToBuy) {
		//can Pay
		if(moneyReference >= wantToBuy) {
			return true;
		}
		//can't Pay
		else {
			return false;
		}
	}
	canAffordUpgrade(letter) {
		if (this.canPay(this.availableFunds, this["costUpgradeSpeed" + letter])) {
			return true;
		}
		else {
			return false;
		}

	}
	//if the level of the circle is > 0 so we can draw it 
	canDrawCricle(letter) {
		if (this["circleLvl" + letter] > 0) {
			return true;
		}
	}
	//count the circles numbers	
	countCirclesNumbers() {
		let count = 0;
		for(let letter of this.letters) {
			if(this.canDrawCricle(letter)) {
				count ++;
			}
		}
		return count;
	}
	upgradeSpeedBtnIsPressed(letter) {
		if(this.canPay(this.availableFunds, this["costUpgradeSpeed" + letter])) {
			this.availableFunds -= this["costUpgradeSpeed" + letter];
			this["circleLvl" + letter] ++;
			this["costUpgradeSpeed" + letter] *= 1.5;
		}
	}
}