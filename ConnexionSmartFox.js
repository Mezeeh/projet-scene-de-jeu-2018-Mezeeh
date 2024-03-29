function ConnexionSmartFox(joueur, gererVariableRecue){

    var serveur;
    var configuration = {};
    configuration.host = "127.0.0.1";
    configuration.port = 8888;
    configuration.zone = "ChasseAuCanard";
    configuration.debug = false;
    configuration.room = 'Etang';

    var estPret = false;
    var estTerminee = false;

    function initialiser()
    {
        tracer('onload -> initialiser()', false);
        serveur = new SFS2X.SmartFox(configuration);

        serveur.addEventListener(SFS2X.SFSEvent.CONNECTION, executerApresOuvertureContactServeur, this);
        serveur.addEventListener(SFS2X.SFSEvent.LOGIN, executerApresOuvertureSession, this);
        //serveur.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, executerApresEntreeSalon, this);
        serveur.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, recevoirVariables, this);        
        serveur.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, surReponseExtension);

        

        ouvrirContactServeur();
    }

    function surReponseExtension(evt){
        var parametres = evt.params;
        var commande = evt.cmd;

        console.log("> Received Extension Response: " + commande);

        switch(commande){
            case "ready":
                commencerPartie(parametres);
                break;
            case "terminer":
                console.log("recu terminer par le serveur");
                terminerPartie(parametres);
                break;
            case "positionCanards":
                console.log("recu positionCanards");
                placerCanards(parametres);
                break;
        }
    }

    var positionX;
    var positionY = [];
    var positionZ = [];
    var nombreCanards;
    function placerCanards(parametres){
        positionX = parametres.get("positionX");
        positionY = parametres.get("positionY");
        positionZ = parametres.get("positionZ");

        nombreCanards = parametres.get("nombreCanards");
        //console.log("nombreCanards = " + nombreCanards);

        /* console.log("positionX = " + positionX);
        for(var i = 0; i < positionY.length; i++){
            console.log("positionY = " + positionY[i]);
            console.log("positionZ = " + positionZ[i]);
        } */
    }

    this.getNombreCanards = function(){
        return nombreCanards;
    }

    this.getPositionXCanards = function(){
        console.log("getPositionXCanards")
        return positionX;
    }

    this.getPositionYCanards = function(indexCanards){
        return positionY[indexCanards];
    }

    this.getPositionZCanards = function(indexCanards){
        return positionZ[indexCanards];
    }

    var premierJoueur;
    function commencerPartie(parametres){
        estPret = true;
        premierJoueur = parametres.get("j1Nom") == joueur.nom ? true : false;
        //console.log("commencerPartie - estPret = " + estPret);
    }

    var gagnant;
    function terminerPartie(parametres){
        estTerminee = true;
        gagnant = parametres.get("gagnant");
        //console.log("La partie est terminée = " + estTerminee);
        console.log("Le gagnant est = " + gagnant);
    }

    this.getEstPret = function(){
        //console.log("getEstPret : " + estPret);
        return estPret;
    }

    this.getEstTerminee = function(){
        //console.log("getEstTerminee : " + estTerminee);
        return estTerminee;
    }

    this.getGagnant = function(){
        return gagnant;
    }

    this.clickJouer = function(){
        initialiser();
    }

    this.augmenterPoints = function(){
        var params = new SFS2X.SFSObject();
        params.putUtfString("nomJoueur", joueur.nom);
        params.putInt("pointage", joueur.points);
        serveur.send(new SFS2X.ExtensionRequest("mettreAJourPoints", params));
    }

    function ouvrirContactServeur()
    {
        serveur.connect();
        tracer("serveur.connect()");    
    }

    function executerApresOuvertureContactServeur(e)
    {
        tracer("executerApresOuvrirContactServeur()");
        tracer("succes de la connection " + e.success);
        ouvrirSession(); // TODO: temporaire, sera controlé par utilisateur
    }

    function ouvrirSession()
    {
        tracer("ouvrirSession()");
        //serveur.send(new SFS2X.Requests.System.LoginRequest(joueur.nom));
        tracer(joueur.nom);
        serveur.send(new SFS2X.LoginRequest(joueur.nom));
    }

    function executerApresOuvertureSession(e)
    {
        tracer("executerApresOuvertureSession()");
        tracer("l'usager " + e.user.name + " est dans la zone " + e.zone);
        entrerSalon();
    }

    function entrerSalon(e)
    {
        tracer('entrerSalon()');
                                //new SFS2X.Requests.System.JoinRoomRequest(configuration.room)
        estEnvoye = serveur.send(new SFS2X.JoinRoomRequest(configuration.room));
        tracer('demande d\'entrer dans le salon effectuee');
        tracer("serveur.lastJoinedRoom : " + serveur.lastJoinedRoom);
        serveur.send(new SFS2X.ExtensionRequest("ready", null/* , "etang"/* serveur.lastJoinedRoom */));
    }

    function executerApresVariableDeSalon(e)
    {
        tracer('executerApresVariableDeSalon()');
        tracer('variables recues ' + e.changedVars);
        if(e.changedVars.indexOf('salutation') != -1)
        {
            tracer('salutation == ' + e.room.getVariable('salutation').value, true);
        }
        
    }

    function recevoirVariables(e){
        console.log("recevoirVariables");
        variableRecue = {j1Nom : e.room.getVariable('j1Nom').value,
                         j2Nom : e.room.getVariable('j2Nom').value,
                         j1Pointage : e.room.getVariable('j1Pointage').value,
                         j2Pointage : e.room.getVariable('j2Pointage').value};
        gererVariableRecue(variableRecue);
    } 

    function tracer(message, alerte)
    {
        console.log(message);
        if(alerte) alert(message);
    }
}