function ConnexionSmartFox(joueur){

    var serveur;
    var configuration = {};
    configuration.host = "127.0.0.1";
    configuration.port = 8888;
    configuration.zone = "ChasseAuCanard";
    configuration.debug = false;
    configuration.room = 'Etang';

    function initialiser()
    {
        tracer('onload -> initialiser()', false);
        serveur = new SFS2X.SmartFox(configuration);
        serveur.addEventListener(SFS2X.SFSEvent.CONNECTION, executerApresOuvertureContactServeur, this);
        serveur.addEventListener(SFS2X.SFSEvent.LOGIN, executerApresOuvertureSession, this);
        //serveur.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, executerApresEntreeSalon, this);
        
        serveur.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, surReponseExtension);

        serveur.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, recevoirVariables, this);
        
       
        ouvrirContactServeur();
    }

    function surReponseExtension(evt){
        var parametres = evt.params;
        var commande = evt.cmd;

        tracer("Connexion etablit entre deux joueurs");

        switch(commande){
            case "ready":
                commencerPartie(parametres);
                break;
        }
    }

    function commencerPartie(parametres){
        tracer("Commencer la partie");
    }

    /* $(document).ready(function(){
        $("#bouton-jouer").click(clickJouer);
    }); */

    this.clickJouer = function(){
        initialiser();
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

    /* function executerApresEntreeSalon(e)
    {
        tracer('executerApresEntreeSalon()');
        tracer('Entree dans le salon ' + e.room + ' reussie')
        envoyerSalutation();
    }

    function envoyerSalutation()
    {
        tracer('envoyerSalutation()');
        var listeVariables = [];
        //listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable('test','autre valeur'));
        listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable('j1Nom', 'toto'));

        estEnvoyee = serveur.send(new SFS2X.Requests.System.SetRoomVariablesRequest(listeVariables));
        tracer('la nouvelle valeur est envoyee ' + estEnvoyee);
    } */

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
        if(document.getElementById("hudNomJ1").innerHTML = "Nom joueur 1")
            document.getElementById("hudNomJ1").innerHTML = e.room.getVariable('j1Nom').value;
        if(document.getElementById("hudNomJ2").innerHTML = "Nom joueur 2")
            document.getElementById("hudNomJ2").innerHTML = e.room.getVariable('j2Nom').value;

        document.getElementById("hudPointsJ1").innerHTML = e.room.getVariable('j1Pointage').value;
        document.getElementById("hudPointsJ2").innerHTML = e.room.getVariable('j2Pointage').value;
    }

    function tracer(message, alerte)
    {
        console.log(message);
        if(alerte) alert(message);
    }
}