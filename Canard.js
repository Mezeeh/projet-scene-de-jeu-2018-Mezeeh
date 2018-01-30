function Canard(dessin){
	var imageCanard = new Image();
	var canard = this;
	var estCharge = false;
	
	function initialiser(){
		imageCanard.src = "sprite-canard-volant.png";
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
    
    initialiser();
}