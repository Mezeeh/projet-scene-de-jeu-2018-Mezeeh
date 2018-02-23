//Rien est public...
var ArrierePlan = function (scene) {
  var arrierePlan = this; //Est un proxy de closure...

  //variables privées seules les méthodes initialisées ici y ont accès...
  var nombreImagesChargees = 0;

  var arrierePlanConteneur = new createjs.Container();

  var matriceEtang = new createjs.Matrix2D();
  var paysageEtang = new createjs.Shape();
  var imageEtang = new Image();

  var matriceMouche = new createjs.Matrix2D();
  var paysageMouche = new createjs.Shape();
  var imageMouche = new Image();

  var matriceNuage = new createjs.Matrix2D();
  var paysageNuage = new createjs.Shape();
  var imageNuage = new Image();

  //Cet événement ne peut pas être déclenché hors de cette fonction
  var chargementCompletArrierePlan = document.createEvent('Event');
  chargementCompletArrierePlan.initEvent('chargementCompletArrierePlan', true, true);

  var arrierePlanEnPause = false;

  var acceleration = 1;

  //Constructeur parce qu'il est appelé inline à la fin...
  var initialiser = function () {
    //http://www.crockford.com/javascript/private.html

    imageEtang.onload = function () {
      paysageEtang.graphics.beginBitmapFill(imageEtang, "repeat", matriceEtang).drawRect(0, 0, scene.canvas.width, scene.canvas.height).endStroke();
      nombreImagesChargees++;
    }
    imageEtang.src = ArrierePlan.Configuration.images.imageEtang;

    imageMouche.onload = function () {
      paysageMouche.graphics.beginBitmapFill(imageMouche, "repeat", matriceMouche).drawRect(0, 0, scene.canvas.width, scene.canvas.height).endStroke();
      nombreImagesChargees++;

    }
    imageMouche.src = ArrierePlan.Configuration.images.imageMouche;

    imageNuage.onload = function () {
      paysageNuage.graphics.beginBitmapFill(imageNuage, "repeat", matriceNuage).drawRect(0, 0, scene.canvas.width, scene.canvas.height).endStroke();
      nombreImagesChargees++;
    }
    imageNuage.src = ArrierePlan.Configuration.images.imageNuage;

    arrierePlanConteneur.addChild(paysageEtang)
    arrierePlanConteneur.addChild(paysageMouche)
    arrierePlanConteneur.addChild(paysageNuage)

    scene.addChild(arrierePlanConteneur);
  }

  //constructeur
  initialiser();

  //ICI c'est public
  this.rafraichirAnimation = function (evenement) {

    if (!arrierePlanEnPause) {
      matriceNuage.translate(-ArrierePlan.Configuration.vitesseNuage * acceleration, 0);
      matriceMouche.translate(-ArrierePlan.Configuration.vitesseMouche * acceleration, 0);
      //console.log("arrierePlan acceleration: "+acceleration);
    }
  }
}

ArrierePlan.Configuration =
  {
    images: {
      imageMouche: "ressource/paysage-cylindrique-avant.png",
      imageEtang: "ressource/paysage-arriere.png",
      imageNuage: "ressource/paysage-nuage.png"
    },
    vitesseNuage: 3,
    vitesseMouche: 9
  }
