function Mire(scene){
	var imageMire = new Image();
	var mire = this;		
	var bitmapMire = null;
	var scale = 0.25;
	var offset = {x : (177 * scale), y : (180 * scale)};
	
	this.estCharge = false;
	
	function initialiser(){
		imageMire.src = "decoration/illustration/mire.png";
		imageMire.onload = noterFinChargement;
		bitmapMire = new createjs.Bitmap(imageMire);
		bitmapMire.scaleX = bitmapMire.scaleY = scale;
	}
	
	function noterFinChargement(){
        mire.estCharge = true;
    }
    
    this.afficher = function(){
        scene.addChild(bitmapMire);
	}
	
	this.deplacer = function(position){
		bitmapMire.x = position.x - offset.x;
		bitmapMire.y = position.y - offset.y;
	}
	
	initialiser();
}