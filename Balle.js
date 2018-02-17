function Balle(scene) {
    var balleForme = null;
    var etatCourant;

    var Etat = {
        enMouvement: "EN MOUVEMENT",
        enCollision: "EN COLLISION",
        enAttente: "EN ATTENTE"
    };

    function initialiser() {
        balleForme = new createjs.Shape();
        balleForme.graphics.beginFill("red").drawCircle(0, 0, 5);
        balleForme.x = scene.canvas.width / 2;
        balleForme.y = scene.canvas.height - 10;
        etatCourant = Etat.enAttente;
    }

    this.representationRectangle = function () {
        // TODO : Trouver une maniere plus elegante de faire ca
        if (Etat.enMouvement == etatCourant) {
            balleForme.setBounds(balleForme.x, balleForme.y, 5); // sert a creer une hitbox
        }
        else {
            balleForme.setBounds(0, 0, 0);
        }
        return balleForme.getBounds();
    }

    this.afficher = function () {
        scene.addChild(balleForme);
        //console.log(balleForme.x + " " + balleForme.y);
    }

    this.effacer = function () {
        balleForme.x = scene.canvas.width / 2;
        balleForme.y = scene.canvas.height - 10;
        scene.removeChild(balleForme);
        etatCourant = Etat.enAttente;
    }

    this.estEnMouvement = function () {
        return etatCourant == Etat.enMouvement;
    }

    this.tirer = function (cible) {
        if (etatCourant == Etat.enAttente) {
            balleForme.x = scene.canvas.width / 2;
            balleForme.y = scene.canvas.height - 10;

            // Calcul l'equation de la droite pour que la balle ne s'arrete pas ou le clic droit est fait a l'ecran
            var pente = ((cible.y - balleForme.y) / (cible.x - balleForme.x));
            var b = cible.y - (pente * cible.x);
            var valeurY = -100;
            var valeurX = (valeurY - b) / pente;
            var equation = { x: valeurX, y: valeurY };

            // Calcul le temps (la distance) que ca devrait prendre pour se rendre au point selon ca distance
            var vitesse = Math.sqrt(Math.pow(balleForme.x - equation.x, 2) + Math.pow(balleForme.y - equation.y, 2));
            createjs.Tween.get(balleForme).to({ x: equation.x, y: equation.y }, vitesse / 2).call(function(){
                if (balleForme.x > (scene.canvas.width + 10) || balleForme.x < -10 || balleForme.y > (scene.canvas.height + 10) || balleForme.y < -10)
                {
                    balleForme.x = scene.canvas.width / 2;
                    balleForme.y = scene.canvas.height - 10;
                    scene.removeChild(balleForme);
                    etatCourant = Etat.enAttente;
                }
            });
        }
        etatCourant = Etat.enMouvement;
    }

    this.getPosition = function () {
        var position = { x: balleForme.x, y: balleForme.y };
        return position;
    }

    this.setPosition = function (x, y) {
        balleForme.x = x;
        balleForme.y = y;
    }

    initialiser();
};