function Balle(scene){
    var balleForme = null;
    var etatCourant;

    var Etat = {
        enMouvement : "EN MOUVEMENT",
        enCollision : "EN COLLISION",
        enAttente : "EN ATTENTE"
    };

    function initialiser(){
		balleForme = new createjs.Shape();
		balleForme.graphics.beginFill("red").drawCircle(0, 0, 5);
		balleForme.x = scene.canvas.width / 2;
        balleForme.y = scene.canvas.height - 10;
        etatCourant = Etat.enAttente;
    }

    this.afficher = function(){
		scene.addChild(balleForme);
        console.log(balleForme.x + " " + balleForme.y);
    }

    this.tirer = function(cible){
        etatCourant = Etat.enMouvement;
        // Calcul le temps que ca devrait prendre pour se rendre au point selon ca distance
        //var vitesse = Math.sqrt(Math.pow(balleForme.x - cible.x, 2) + Math.pow(balleForme.y - cible.y, 2));
        
        // Calcul l'equation de la droite pour que la balle ne s'arrete pas ou le clic droit est fait a l'ecran
        var pente = ((cible.y - balleForme.y) / (cible.x - balleForme.x));
        var b = cible.y - (pente * cible.x);
        var valeurY = -100;
        var valeurX = (valeurY - b) / pente;
        var equation = {x: valeurX, y: valeurY};
        createjs.Tween.get(balleForme).to({x: equation.x, y: equation.y}, 1000);
    }

    initialiser();
};