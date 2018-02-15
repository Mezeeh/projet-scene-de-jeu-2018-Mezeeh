function Arme(scene){
	var NOMBRE_BALLES_CHARGEUR = 5;

	var imageArme;
	var bitmapArme;
	var arme = this;
	var estCharge = false;
	var nbBalleActuel = 5;
	var scale = 0.35;
	
	function initialiser(){
		imageArme = new Image();
		imageArme.src = "decoration/illustration/modele-arme.png";
		bitmapArme = new createjs.Bitmap(imageArme);
		bitmapArme.scaleX = bitmapArme.scaleY = scale;
		bitmapArme.onload = noterFinChargement;
	}
	
	function noterFinChargement(){
        arme.estCharge = true;
    }
    
    this.afficher = function(){
		scene.addChild(bitmapArme);
		// Centre le point de rotation
		bitmapArme.regX = bitmapArme.image.width / 2;
		bitmapArme.regY = bitmapArme.image.height / 1.2;
		// Seulement possible de changer la position sil ne fait pas partie de la scene
		bitmapArme.x = (scene.canvas.width / 2)  - ((imageArme.width * scale) / 2);
		bitmapArme.y = scene.canvas.height;
	}
	
	this.afficherNombreBalles = function(){
		scene.addChild(nbBalleActuel);
	}
	
	this.tirer = function(cible){
		// TODO : Faire tirer et si plus de balle faire recharger
		if(nbBalleActuel < 1)
			recharger();

		console.log("Je tire");
	}

	this.getPosition = function(){
		var position = {x: bitmapArme.x, y: bitmapArme.y};
		return position;
	}

	this.tourner = function(angle){
		bitmapArme.rotation = 90 + angle;
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