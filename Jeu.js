(function(){
    var dessin = document.getElementById("dessin");
    var scene = new createjs.Stage(dessin);
	createjs.Ticker.addEventListener("tick", rafraichirJeu);
	//createjs.Ticker.setInterval(25);
	createjs.Ticker.setFPS(25);
	var arme = new Arme(dessin);
	var canard = new Canard(scene, canardCible);
	//var mechantCanard = new MechantCanard(dessin);
	var mire = new Mire(scene);
	var cible = {x : 0, y : 0};
	var position = {x : 0, y : 0};
		
	function canardCible(positionCible){
		arme.tirer(positionCible);
	}
	
	function rafraichirJeu(evenement){
		//evenement.delta/1000*100;
		scene.update(evenement);
	}
	
	function tirer(evenement){
		cible.x = evenement.stageX;
		cible.y = evenement.stageY;
		console.log("cible x : " + cible.x + " cible y : " + cible.y + " evenement : " + evenement.type + " target : " + evenement.target);
	}
	
	function deplacerMire(evenement){
		position.x = evenement.stageX;
		position.y = evenement.stageY;
		
		mire.deplacer(position);
	}
	
	function rafraichirJeu(evenement){
		scene.update(evenement);
	}

    interval = setInterval(
        function(){          
            if(canard.estCharge /*&& arme.estCharge && mechantCanard.estCharge*/)
			{
				//arme.afficher();
				canard.afficher();
				//mechantCanard.afficher();
				mire.afficher();
				scene.on("stagemousedown", tirer);
				scene.on("stagemousemove", deplacerMire);
				clearInterval(interval);
			}
                
        }, 1);
	
		//animationCanardVole.play();
})();
