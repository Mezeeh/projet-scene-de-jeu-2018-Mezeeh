function Canard(scene){
	var imageCanard;
	var canard = this;
	var charge = false;
	var animationCanardVole;
	var bitMapCanard = null;
	var valeurEtat;
	
	var Etat = {
		enMouvement : "EN MOUVEMENT",
		enCollision : "EN COLLISION"
	};

	function initialiser(){
		imageCanard = new Image();
		imageCanard.src = "decoration/sprites/sprite-canard-volant.png";
		imageCanard.onload = terminerChargement;
		valeurEtat = Etat.enMouvement;
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
    }

	this.getPerspective = function(){
		return animationCanardVole.scaleX;
	}

    this.afficher = function(){
		scene.addChild(animationCanardVole);
    }
	
	this.bouger = function(distance){
		// TODO : Faire bouger le/les Canard(s) d'une maniere random dans une zone donnee
		if(valeurEtat = Etat.enMouvement)
			animationCanardVole.x += distance;
	}
	
	this.mourir = function(){
		// TODO : animer une mort
		valeurEtat = Etat.enCollision;

		var centreX = (animationCanardVole.getBounds().width * animationCanardVole.scaleX) / 2;
		var centreY = (animationCanardVole.getBounds().height * animationCanardVole.scaleY) / 2;

		createjs.Tween.get(animationCanardVole).to({regX: centreX, regY: centreY, y: scene.canvas.height, rotation: 1080}, 1000).wait(25).call(function(){ 
			animationCanardVole.x = -300;
			animationCanardVole.y = (Math.random() * 300) + 0;
			animationCanardVole.scaleX = animationCanardVole.scaleY = (Math.random() * 0.5) + 0.1;
		});

		valeurEtat = Etat.enMouvement;
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

	this.representationRectangle = function()
    {
      return animationCanardVole.getTransformedBounds();
    }

    initialiser();
}