function Mire(scene){
	var imageMire;
	var mire = this;		
	var bitmapMire = null;
	var scale = 0.25;
	var offset = {x : (177 * scale), y : (180 * scale)};
	
	this.estCharge = false;
	
	function initialiser(){
		imageMire = new Image();
		imageMire.src = "decoration/illustration/mire.png";
		bitmapMire = new createjs.Bitmap(imageMire);
		bitmapMire.scaleX = bitmapMire.scaleY = scale;
		bitmapMire.onload = noterFinChargement;
	}
	
	function noterFinChargement(){
        mire.estCharge = true;
    }
    
    this.afficher = function(){
		scene.addChild(bitmapMire);
		bitmapMire.x = scene.canvas.width / 2;
		bitmapMire.y = scene.canvas.height / 2;
	}
	
	this.deplacer = function(position){
		bitmapMire.x = position.x - offset.x;
		bitmapMire.y = position.y - offset.y;
	}
	
	initialiser();
}