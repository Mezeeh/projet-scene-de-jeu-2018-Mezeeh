(function () {
	var TOUCHE_ESPACE = 32;
	var TEMPS_ENTRE_CHAQUE_TIRS = 1000;
	var TEMPS_POUR_RECHARGER = 3000;
	var TEMPS_DE_JEU = 60000;

	var dessin;
	var scene;
	var arme;
	var canardListe;
	var nombreCanards;
	var deplacementCanardListe;
	var mire;
	var positionCanard;
	var cible;
	var positionMire;
	var estPretATirer;
	var estEnRecharge;
	var balle;
	var nbBallesTirees;
	var partieTerminee;
	var gagne;

	var accueilVue;
	var joueur;
	var jeuVue;
	var finVue;
	var vueActive = null;
	var arrierePlan;

	var serveur;

	var attenteVue;

	var derniereVariableRecu = {j1Nom : "",
									j2Nom : "",
									j1Pointage : "",
									j2Pointage : ""};;

	function initialiser(){
		window.addEventListener("hashchange", interpreterEvenementsLocation);
		joueur = new Joueur();
		accueilVue = new AccueilVue(joueur);
		jeuVue = new JeuVue(joueur);
		finVue = new FinVue(joueur);

		attenteVue = new AttenteVue();

		serveur = new ConnexionSmartFox(joueur, gererVariableRecue);

		accueilVue.afficher();
	}

	function gererVariableRecue(variableRecue){
		derniereVariableRecu = variableRecue;
		console.log("gererVariableRecue");
		console.log("vueActive instanceof JeuVue " + vueActive instanceof JeuVue);
	}

	function interpreterEvenementsLocation(evenement)
	{
		//hash est la partie suivant le # dans l'url
		var intructionNavigation = window.location.hash;
		if(!intructionNavigation || intructionNavigation.match(/^#$/) || intructionNavigation.match(/^#accueil$/)) 
		{
			if(vueActive instanceof JeuVue)
				detruireJeu();
			
			accueilVue.afficher();	
			vueActive = accueilVue;
		}
		else if(intructionNavigation.match(/^#attente$/)){
			serveur.clickJouer();

			intervalAttenteDebutPartie = setInterval(
				function(){
					if(!(vueActive instanceof AttenteVue)){
						console.log("En attente du second joueur...");
						attenteVue.afficher();
						vueActive = attenteVue;
					}
					if(serveur.getEstPret()){
						clearInterval(intervalAttenteDebutPartie);
						window.location = "#jeu";
					}
				}
			, 1);
		}
		else if(intructionNavigation.match(/^#jeu$/))
		{
			jeuVue.afficher();
			jeuVue.raffraichirHUD(derniereVariableRecu);
			vueActive = jeuVue;
			initialiserJeu();
			//alert("toto");
		}
		else if(intructionNavigation.match(/^#gagnant$/))
		{
			if(vueActive instanceof JeuVue)
				detruireJeu();

			finVue.afficher("gagne");
			vueActive = finVue;
		}
		else if(intructionNavigation.match(/^#perdant$/))
		{
			if(vueActive instanceof JeuVue)
				detruireJeu();

			finVue.afficher("perdu");
			vueActive = finVue;
		}
		else if(intructionNavigation.match(/^#egalite$/))
		{
			if(vueActive instanceof JeuVue)
				detruireJeu();

			finVue.afficher("egalite");
			vueActive = finVue;
		}
	}

	function detruireJeu(){
		createjs.Ticker.removeEventListener("tick", rafraichirJeu);
		document.onkeydown = null;
		/* scene.off("stagemousedown");
		scene.off("stagemousemove"); */
		nbCanardCharge = 0;
	}

	function initialiserJeu() {
		nombreCanards = serveur.getNombreCanards();

		dessin = document.getElementById("dessin");
		scene = new createjs.Stage(dessin);
		createjs.Ticker.setFPS(25);
		
		mire = new Mire(scene);
		arme = new Arme(scene);
		balle = new Balle(scene);

		arrierePlan = new ArrierePlan(scene);

		nbBallesTirees = 0;
		joueur.points = 0;
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
				
				if ((nbCanardCharge == nombreCanards) && 
					 arme.estCharge() && 
					 mire.estCharge()) {
					arme.afficher();
					//mechantCanard.afficher();
					scene.on("stagemousedown", tirer);
					scene.on("stagemousemove", pointer);
					document.onkeydown = gererCommandeClavier;
					createjs.Ticker.addEventListener("tick", rafraichirJeu);
	
					for (i = 0; i < nombreCanards; i++) {
						faireApparaitreCanard(canardListe[i]);
						//initialiserPositionCanard(canardListe[i]);
						initialiserPositionCanard(i);
					}
					mire.afficher();
					clearInterval(interval);
				}
	
			}, 1);

			/* timer = setTimeout(function(){
				partieTerminee = true;
				clearTimeout(timer);
				gagne = joueur.points >= (TEMPS_DE_JEU / 1000) * 40 / 100;
				if(gagne)
					window.location = "#gagnant";
				else
					window.location = "#perdant";
			}, TEMPS_DE_JEU); */

			intvl = setInterval(function(){
				if(serveur.getEstTerminee()){
					finirPartie(serveur.getGagnant());
					clearInterval(intvl);
				}
			}, 1);
	}

	function finirPartie(gagnant){
		//console.log("finirPartie");
		if(gagnant == joueur.nom)
			window.location = "#gagnant";
		else if(gagnant == "_null_")
			window.location = "#egalite";
		else
			window.location = "#perdant";
	}

	function trierParProfondeur() {
		// TODO : Trier les canards sur la scene selon leur scale
	}

	function initialiserPositionCanard(index) {
		//trierParProfondeur();
		positionCanard.x = serveur.getPositionXCanards();
		positionCanard.y = serveur.getPositionYCanards(index);
		positionCanard.z = serveur.getPositionZCanards(index);
		//canard.setPosition(positionCanard);
		canardListe[index].setPosition(positionCanard);
	}

	function faireApparaitreCanard(canard) {
		canard.afficher();
	}

	function rafraichirJeu(evenement) {
		document.getElementById("hudBalles").innerHTML = arme.getNbBallesActuel() > 1 ? arme.getNbBallesActuel() + " balles" : arme.getNbBallesActuel() + " balle";
		//document.getElementById("hudPointsJ1").innerHTML = joueur.points > 1 ? "Points : " + joueur.points : "Point : " + joueur.points; 
		
		arrierePlan.rafraichirAnimation(evenement);
		
		for (i = 0; i < nombreCanards; i++) {
			deplacementCanardListe[i] = evenement.delta / 1000 * 600 * (canardListe[i].getPerspective() * 1.5);
			canardListe[i].bouger(deplacementCanardListe[i]);
			if (canardListe[i].getPosition().x > scene.canvas.width)
				initialiserPositionCanard(i);
				//initialiserPositionCanard(canardListe[i]);

			// TODO : Faire une bien meilleur detection
			if(balle.estEnMouvement()){
				if (balle.representationRectangle().intersects(canardListe[i].representationRectangle())){
					joueur.points++;
					serveur.augmenterPoints();
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
