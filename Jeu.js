(function () {
	var TOUCHE_ESPACE = 32;
	var TEMPS_ENTRE_CHAQUE_TIRS = 1000;
	var TEMPS_POUR_RECHARGER = 3000;
	var TEMPS_DE_JEU = 60000;

	var dessin;
	var scene;
	var arme;
	var canardListe;
	var nombreCanards = 12;
	var deplacementCanardListe;
	var mire;
	var positionCanard;
	var cible;
	var positionMire;
	var estPretATirer;
	var estEnRecharge;
	var balle;
	var pointage;
	var nbBallesTirees;
	var partieTerminee;
	var gagne;

	var ratioScene = { largeur: 1, hauteur: 1 };
	var dimentionScene = { largeur: 1, hauteur: 1 };

	function initialiser() {
		dessin = document.getElementById("dessin");
		scene = new createjs.Stage(dessin);
		createjs.Ticker.setFPS(25);
		mire = new Mire(scene);
		arme = new Arme(scene);
		balle = new Balle(scene);
		pointage = 0;
		nbBallesTirees = 0;
		partieTerminee = false;
		gagne = null;
		canardListe = [];
		deplacementCanardListe = [];

		for (i = 0; i < nombreCanards; i++)
			canardListe[i] = new Canard(scene);

		positionCanard = { x: 0, y: 0, z: 0 };
		cible = { x: 0, y: 0 };
		positionMire = { x: 0, y: 0 };
		estPretATirer = true;
		estEnRecharge = false;

		interval = setInterval(
			function () {
				var canardListeChargee = false;
				var nbCanardCharge = 0;
	
				for (i = 0; i < nombreCanards; i++) {
					if (canardListe[i].estCharge())
						nbCanardCharge++;
				}
				
				if ((nbCanardCharge == nombreCanards) && arme.estCharge() && mire.estCharge()/*&& mechantCanard.estCharge*/) {
					arme.afficher();
					//mechantCanard.afficher();
					scene.on("stagemousedown", tirer);
					scene.on("stagemousemove", pointer);
					document.onkeydown = gererCommandeClavier;
					createjs.Ticker.addEventListener("tick", rafraichirJeu);
	
					for (i = 0; i < nombreCanards; i++) {
						faireApparaitreCanard(canardListe[i]);
						initialiserPositionCanard(canardListe[i]);
					}
					mire.afficher();
					clearInterval(interval);
				}
	
			}, 1);
			
			setTimeout(function(){
				partieTerminee = true;

				gagne = pointage >= (TEMPS_DE_JEU / 1000) * 40 / 100;

				alert("Victorieux : " + gagne + "\nPointage : " + pointage);
			}, TEMPS_DE_JEU);
	}

	function trierParProfondeur() {
		// TODO : Trier les canards sur la scene selon leur scale
	}

	function initialiserPositionCanard(canard) {
		//trierParProfondeur();
		positionCanard.x = -300;
		positionCanard.y = (Math.random() * 300) + 0;
		positionCanard.z = (Math.random() * 0.5) + 0.1;
		canard.setPosition(positionCanard);
	}

	function faireApparaitreCanard(canard) {
		canard.afficher();
	}

	function rafraichirJeu(evenement) {
		document.getElementById("hudBalles").innerHTML = arme.getNbBallesActuel() > 1 ? arme.getNbBallesActuel() + " balles" : arme.getNbBallesActuel() + " balle";
		document.getElementById("hudPoints").innerHTML = pointage > 1 ? "Points : " + pointage : "Point : " + pointage; 

		for (i = 0; i < nombreCanards; i++) {
			deplacementCanardListe[i] = evenement.delta / 1000 * 600 * (canardListe[i].getPerspective() * 1.5);
			canardListe[i].bouger(deplacementCanardListe[i]);
			if (canardListe[i].getPosition().x > scene.canvas.width)
				initialiserPositionCanard(canardListe[i]);

			// TODO : Faire une bien meilleur detection
			if(balle.estEnMouvement()){
				if (balle.representationRectangle().intersects(canardListe[i].representationRectangle())){
					pointage++;
					balle.effacer();
					canardListe[i].mourir();
				}	
			}
		}

		scene.update(evenement);
	}

	function tirer(evenement) {
		document.onmousedown = function(e){
			if(e.which == 1){
				cible.x = evenement.stageX;
				cible.y = evenement.stageY;
				
				if (estPretATirer) {
					estPretATirer = false;
					if(arme.getNbBallesActuel() > 0){
						arme.tirer();
						balle.tirer(cible);
						nbBallesTirees++;
						setTimeout(function(){
							balle.afficher();
						}, 75);
					}
					else{
						arme.recharger();
					}
				
					setTimeout(function () {
						estPretATirer = true;
					}, TEMPS_ENTRE_CHAQUE_TIRS);
				}
				//scene.update(); 
			}
		}
	}

	function deplacerMire(evenement) {
		positionMire.x = evenement.stageX;
		positionMire.y = evenement.stageY;

		mire.deplacer(positionMire);
	}

	function deplacerArme(evenement) {
		var angle = Math.atan2(scene.mouseY - arme.getPosition().y, scene.mouseX - arme.getPosition().x);
		angle *= (180 / Math.PI);
		arme.tourner(angle);
	}

	function pointer(evenement) {
		deplacerMire(evenement);
		deplacerArme(evenement);
	}


	function gererCommandeClavier(evenement) {
		switch (evenement.keyCode) {
			case TOUCHE_ESPACE:
				if (!estEnRecharge) {
					estEnRecharge = true;
					arme.recharger();
					setTimeout(function () {
						estEnRecharge = false;
					}, TEMPS_POUR_RECHARGER);
				}
				break;

			default:
				//console.log("defaut");
				break;
		}
	}

	initialiser();
})();
