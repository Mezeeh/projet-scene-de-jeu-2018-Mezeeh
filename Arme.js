function Arme(scene){
	var NOMBRE_BALLES_CHARGEUR = 6;

	var imageArme = new Image();
	var arme = this;
	var estCharge = false;
	var nbBalleActuel = 5;
	var balle;
	
	function initialiser(){
		imageArme.src = "model-arme.png";
		imageArme.onload = noterFinChargement;
		balle = new createjs.Shape();
		balle.graphics.beginFill("red").drawCircle(0, 0, 5);
		balle.x = scene.canvas.width / 2;
		balle.y = scene.canvas.height;
		scene.addChild(balle);
	}
	
	function noterFinChargement(){
        arme.estCharge = true;
    }
    
    this.afficher = function(){
        dessin.drawImage(imageArme, 0, 0);
	}
	
	this.afficherNombreBalles = function(){
		scene.addChild(nbBalleActuel);
	}
	
	this.tirer = function(){
		// TODO : Faire tirer et si plus de balle faire recharger
		if(nbBalleActuel < 1)
			recharger();
		
		console.log("Je tire");
	}
	
	this.recharger = function(){
		if(nbBalleActuel < NOMBRE_BALLES_CHARGEUR){
			nbBalleActuel = NOMBRE_BALLES_CHARGEUR;
			console.log("je recharge");
		}
		else
			console.log("deja six balles");
	}
    
    initialiser();
}