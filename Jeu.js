(function(){
    var dessin = document.getElementById("dessin");
    var scene = new createjs.Stage(dessin);
	createjs.Ticker.addEventListener("tick", rafraichirJeu);
	createjs.Ticker.setInterval(25);
	createjs.Ticker.setFPS(5);
	//var arme = new Arme(dessin);
	var canard = new Canard(dessin, scene);
	//var mechantCanard = new MechantCanard(dessin);
	
	function rafraichirJeu(evenement){
		scene.update();
	}

    interval = setInterval(
        function(){          
            if(canard.estCharge /*&& arme.estCharge && mechantCanard.estCharge*/)
			{
				//arme.afficher();
				//canard.afficher();
				//mechantCanard.afficher();
				clearInterval(interval);
			}
                
        }, 1);
	
		scene.addChild(canard.animationCanardVole);
		animationCanardVole.play();
})();
