<<<<<<< HEAD
function Canard(scene, jeu){
=======
function Canard(scene){
>>>>>>> f7d756336dfa4da8fb3fc3b92d4cd2e6265b3b56
	var imageCanard;
	var canard = this;
	this.estCharge = false;
	var animationCanardVole;
	
	function initialiser(){
		imageCanard = new Image();
<<<<<<< HEAD
		imageCanard.src = "decoration/sprites/sprite-canard-volant.png";
=======
		imageCanard.src = "sprites/sprite-canard-volant.png";
>>>>>>> f7d756336dfa4da8fb3fc3b92d4cd2e6265b3b56
		imageCanard.onload = terminerChargement;
	}
	
	function terminerChargement(){
        
		var spriteCanardVolant = new createjs.SpriteSheet(
		{
			images:[imageCanard],
			frames:{width:331, height:307},
<<<<<<< HEAD
			framerate: 8,
=======
>>>>>>> f7d756336dfa4da8fb3fc3b92d4cd2e6265b3b56
			animations:
			{
				vole:[0,1,2,3,4,5,6,7]
			}
		});
		canard.estCharge = true;
		animationCanardVole = new createjs.Sprite(spriteCanardVolant, "vole");
	
<<<<<<< HEAD
		//animationCanardVole.on("click", jeu.arme.tirer());
=======
		animationCanardVole.on("click", exploser());
>>>>>>> f7d756336dfa4da8fb3fc3b92d4cd2e6265b3b56
    }
	

    this.afficher = function(){
        scene.addChild(animationCanardVole);
    }
	
	this.bougerAleatoire = function(){
		// TODO : Faire bouger la/les Canard(s) d'une manier random dans une zone donnee
	}
	
	this.exploser = function(){
<<<<<<< HEAD
		// TODO : animer une mort
=======
>>>>>>> f7d756336dfa4da8fb3fc3b92d4cd2e6265b3b56
		scene.removeChild(animationCanardVole);
	}
    
    initialiser();
}