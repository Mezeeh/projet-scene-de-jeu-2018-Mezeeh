function Arme(dessin){
	var imageArme = new Image();
	var arme = this;
	var estCharge = false;
	
	function initialiser(){
		imageArme.src = "model-arme.png";
		imageArme.onload = noterFinChargement;
	}
	
	function noterFinChargement(){
        arme.estCharge = true;
    }
    
    this.afficher = function(){
        dessin.drawImage(imageArme, 0, 0);
    }
	
	this.tirer = function(){
		// TODO : Faire tirer et si plus de balle faire recharger
		console.log("toto");
	}
	
	this.recharger = function(){
		// TODO : Remplir le chargeur/barillet du pistolet/revolver
	}
    
    initialiser();
}