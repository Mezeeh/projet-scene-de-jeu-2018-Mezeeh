function MechantCanard(dessin){
	var imageMechantCanard = new Image();
	var mechantCanard = this;
	var estCharge = false;
	
	function initialiser(){
		imageMechantCanard.src = "sprite-mechant-canard-volant.png";
		imageMechantCanard.onload = noterFinChargement;
	}
	
	function noterFinChargement(){
        mechantCanard.estCharge = true;
    }
    
    this.afficher = function(){
        dessin.drawImage(imageMechantCanard, 0, 60);
    }
	
	this.bougerAleatoire = function(){
		// TODO : Faire bouger la/les Canard(s) d'une manier random dans une zone donnee
	}
	
	this.exploser = function(){
		// TODO : Faire exploser ou coucher la Canard lorsqu'elle est se fait toucher
	}
    
    initialiser();
}