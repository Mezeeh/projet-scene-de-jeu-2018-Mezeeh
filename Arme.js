function Arme(scene){
	var NOMBRE_BALLES_CHARGEUR = 5;

	var imageArme;
	var bitmapArme;
	var arme = this;
	var charge = false;
	var nbBallesActuel = 5;
	var scale = 0.35;
	
	function initialiser(){
		imageArme = new Image();
		imageArme.src = "decoration/illustration/modele-arme.png";
		bitmapArme = new createjs.Bitmap(imageArme);
		bitmapArme.scaleX = bitmapArme.scaleY = scale;
		imageArme.onload = noterFinChargement;
	}
	
	function noterFinChargement(){
        charge = true;
	}
	
	this.estCharge = function(){
		return charge;
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

	this.getNbBallesActuel = function(){
		return nbBallesActuel;
	}

	this.getNbBallesMax = function(){
		return NOMBRE_BALLES_CHARGEUR;
	}

	this.getPosition = function(){
		var position = {x: bitmapArme.x, y: bitmapArme.y};
		return position;
	}

	this.tourner = function(angle){
		bitmapArme.rotation = 90 + angle;
	}
	
	this.tirer = function(){
		nbBallesActuel--;
	}

	this.recharger = function(){
		if(nbBallesActuel < NOMBRE_BALLES_CHARGEUR){
			console.log("je recharge..");
			setTimeout(function(){
				nbBallesActuel = NOMBRE_BALLES_CHARGEUR;
			}, 3000);
			console.log("recharge termine");
		}
		else
			console.log("deja six balles");
	}

	this.getNbBallesActuel = function(){
		return nbBallesActuel;
	}
    
    initialiser();
}