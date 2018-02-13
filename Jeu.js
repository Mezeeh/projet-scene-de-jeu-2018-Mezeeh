(function () {
	var TOUCHE_ESPACE = 32;

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
	var tempsEntreChaqueTirs;
	var tempsRecharger;

	var ratioScene = { largeur: 1, hauteur: 1 };
	var dimentionScene = { largeur: 1, hauteur: 1 };

	function initialiser() {
		dessin = document.getElementById("dessin");
		scene = new createjs.Stage(dessin);
		createjs.Ticker.setFPS(25);
		varme = new Arme(scene);
		mire = new Mire(scene);
		canardListe = [];
		deplacementCanardListe = [];
		
		for(i = 0; i < nombreCanards; i++)
			canardListe[i] = new Canard(scene);

		positionCanard = { x: 0, y: 0, z: 0 };
		cible = { x: 0, y: 0 };
		positionMire = { x: 0, y: 0 };
		estPretATirer = true;
		estEnRecharge = false;
		tempsEntreChaqueTirs = 1000;
		tempsRecharger = 3000;
	}

	function canardCible(positionCible) {
		arme.tirer(positionCible);
	}

	function trierParProfondeur(){
		/* var canardListeTrier = [];
		for(i = 0; i < nombreCanards; i++){
			
		} */
	}

	function initialiserPositionCanard(canard){
		//trierParProfondeur();
		positionCanard.x = -300;
		positionCanard.y = (Math.random() * 300) + 0;
		positionCanard.z = (Math.random() * 0.5) + 0.1;
		console.log(positionCanard.z);
		canard.setPosition(positionCanard);
	}

	function faireApparaitreCanard(canard) {
		canard.afficher();
	}

	function rafraichirJeu(evenement) {
		for(i = 0; i < nombreCanards; i++)
		{
			deplacementCanardListe[i] = evenement.delta / 1000 * 600 * (canardListe[i].getPerspective() * 1.5);
			canardListe[i].bouger(deplacementCanardListe[i]);
			if(canardListe[i].getPosition().x > scene.canvas.width)
				initialiserPositionCanard(canardListe[i]);
		}

		/* canard2.bouger(deplacementCanard2); */
		/* if(canard.getPosition().x > scene.canvas.width)
			initialiserPositionCanard(canard);
		if(canard2.getPosition().x > scene.canvas.width)
			initialiserPositionCanard(canard2); */
		scene.update(evenement);
	}

	function tirer(evenement) {
		cible.x = evenement.stageX;
		cible.y = evenement.stageY;
		console.log("cible x : " + cible.x + " cible y : " + cible.y + " evenement : " + evenement.type + " target : " + evenement.target);
		if (estPretATirer) {
			estPretATirer = false;
			arme.tirer();
			setTimeout(function () {
				estPretATirer = true;
			}, tempsEntreChaqueTirs);
		}
	}

	function deplacerMire(evenement) {
		positionMire.x = evenement.stageX;
		positionMire.y = evenement.stageY;

		mire.deplacer(positionMire);
	}

	var initialiserCanevas = function () {
		//On redimensionne le canvas en respectant l'aspect ratio
		//On vise à remplir l'écran en largeur sans déborder en hauteur
		//On centre le résultat au milieu de l'écran pour renforcir l'aspect focal du jeu.
		ratioLargeur = window.innerWidth / dessin.width;
		ratioHauteur = window.innerHeight / dessin.height;
		if (ratioLargeur * dessin.height <= window.innerHeight) {
			dessin.style.width = "100%";
			dessin.style.marginLeft = "-" + (dessin.width * ratioHauteur) / 2 + "px";
			dessin.style.left = (dessin.width * ratioHauteur) / 2 + "px";
			computedStyle = window.getComputedStyle(dessin);
			dessinNouvelleHeight = parseInt(computedStyle.getPropertyValue('height').replace("px", ""));
			dessin.style.marginTop = (window.innerHeight - dessinNouvelleHeight) / 2 + "px";
		}
		else {
			dessin.style.width = (dessin.width * ratioHauteur) + "px";
			dessin.style.marginLeft = "-" + (dessin.width * ratioHauteur) / 2 + "px";
		}
		var body = document.getElementsByTagName("body")[0];
		body.style.maxHeight = window.innerHeight + "px";
		body.style.overflow = "hidden";

		computedStyle = window.getComputedStyle(dessin);
		dessinNouvelleHeight = parseInt(computedStyle.getPropertyValue('height').replace("px", ""));
		dessinNouvelleWidth = parseInt(computedStyle.getPropertyValue('width').replace("px", ""));
		ratioScene.largeur = dessinNouvelleWidth / dessin.width;
		ratioScene.hauteur = dessinNouvelleHeight / dessin.height;

		dimentionScene.largeur = dessin.width;
		dimentionScene.hauteur = dessin.height;
	}

	interval = setInterval(
		function () {
			var canardListeChargee = false;
			var nbCanardCharge = 0;

			for(i = 0; i < nombreCanards; i++){
				if(canardListe[i].estCharge())
					nbCanardCharge++;
			}
			if (nbCanardCharge == nombreCanards/*&& arme.estCharge && mechantCanard.estCharge*/) {
				//initialiserCanevas();
				//arme.afficher();
				//mechantCanard.afficher();
				scene.on("stagemousedown", tirer);
				scene.on("stagemousemove", deplacerMire);
				document.onkeydown = gererCommandeClavier;
				createjs.Ticker.addEventListener("tick", rafraichirJeu);

				for(i = 0; i < nombreCanards; i++){
					faireApparaitreCanard(canardListe[i]);
					initialiserPositionCanard(canardListe[i]);
				}

				/* faireApparaitreCanard(canard);
				faireApparaitreCanard(canard2);
				initialiserPositionCanard(canard);
				initialiserPositionCanard(canard2); */
				mire.afficher();
				clearInterval(interval);
			}

		}, 1);

	function gererCommandeClavier(evenement) {
		switch (evenement.keyCode) {
			case TOUCHE_ESPACE:
				if (!estEnRecharge) {
					estEnRecharge = true;
					arme.recharger();
					setTimeout(function () {
						estEnRecharge = false;
					}, tempsRecharger);
				}
				break;

			default:
				console.log("defaut");
				break;
		}
	}

	//animationCanardVole.play();
	initialiser();
})();
