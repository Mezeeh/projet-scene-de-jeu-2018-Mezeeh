function Canard(scene){
	var imageCanard;
	var canard = this;
	this.estCharge = false;
	var animationCanardVole;
	
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
		canard.estCharge = true;
		animationCanardVole = new createjs.Sprite(spriteCanardVolant, "vole");
	
		//animationCanardVole.on("click", jeu.arme.tirer());
    }
	

    this.afficher = function(){
        scene.addChild(animationCanardVole);
    }
	
	this.bougerAleatoire = function(){
		// TODO : Faire bouger la/les Canard(s) d'une manier random dans une zone donnee
	}
	
	this.exploser = function(){
		// TODO : animer une mort
		scene.removeChild(animationCanardVole);
	}
    
    initialiser();
}