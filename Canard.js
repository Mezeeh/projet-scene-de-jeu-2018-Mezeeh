function Canard(dessin, scene){
	var imageCanard = new Image();
	var canard = this;
	var estCharge = false;
	
	function initialiser(){
		imageCanard.src = "sprites/sprite-canard-volant.png";
		imageCanard.onload = noterFinChargement;
	}
	
	function noterFinChargement(){
        canard.estCharge = true;
    }
    
    this.afficher = function(){
        dessin.drawImage(imageCanard, 0, 0);
    }
	
	this.bougerAleatoire = function(){
		// TODO : Faire bouger la/les Canard(s) d'une manier random dans une zone donnee
	}
	
	this.exploser = function(){
		// TODO : Faire exploser ou coucher la Canard lorsqu'elle est se fait toucher
	}
	
	var spriteCanardVolant = new createjs.SpriteSheet(
		{
			images:[imageCanard],
			frames:{width:331, height:307},
			animations:
			{
				vole:[0,1,2,3,4,5,6,7]
			}
		}
	)
	
	var animationCanardVole = new createjs.Sprite(spriteCanardVolant, "vole");
    
    initialiser();
}