function Canard(scene){
	var imageCanard;
	var canard = this;
	var charge = false;
	var animationCanardVole;
	var bitMapCanard = null;
	
	function initialiser(){
		imageCanard = new Image();
		imageCanard.src = "decoration/sprites/sprite-canard-volant.png";
		imageCanard.onload = terminerChargement;
	}
	
	function terminerChargement(){
        
		var spriteCanardVolant = new createjs.SpriteSheet(
		{
			images:[imageCanard],
			frames:{width:331, height:307},
			framerate: 8,
			animations:
			{
				vole:[0,1,2,3,4,5,6,7]
			}
		});
		charge = true;
		animationCanardVole = new createjs.Sprite(spriteCanardVolant, "vole");
	
		//animationCanardVole.on("click", jeu.arme.tirer());
    }
	
	this.mettreEnPerspectiveCanard = function() {	
		animationCanardVole.scaleX = animationCanardVole.scaleY = 0.5;

	}

	this.getPerspective = function(){
		return animationCanardVole.scaleX;
	}

    this.afficher = function(){
		scene.addChild(animationCanardVole);
		//this.mettreEnPerspectiveCanard();
    }
	
	this.bouger = function(distance){
		// TODO : Faire bouger le/les Canard(s) d'une manier random dans une zone donnee
		animationCanardVole.x += distance;
	}
	
	this.exploser = function(){
		// TODO : animer une mort
		scene.removeChild(animationCanardVole);
	}
	
	this.setPosition = function(position){
		animationCanardVole.x = position.x;
		animationCanardVole.y = position.y;
		animationCanardVole.scaleX = animationCanardVole.scaleY = position.z;
	}

	this.getPosition = function(){
		var position = { x: animationCanardVole.x, y: animationCanardVole.y, z: animationCanardVole.scaleX};
		return position;
	}

	this.estCharge = function(){
		return charge;
	}

	this.disparaitre = function(){
		scene.removeChild(animationCanardVole);
	}

    initialiser();
}