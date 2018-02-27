function ConnexionSmartFox(){

    var serveur;
    var configuration = {};
    configuration.host = "127.0.0.1";
    configuration.port = 8888;
    configuration.zone = "AlloMonde";
    configuration.debug = false;
    configuration.room = 'AlloGroupe';

    function initialiser()
    {
        tracer('onload -> initialiser()', false);
        serveur = new SFS2X.SmartFox(configuration);
        
        serveur.addEventListener(SFS2X.SFSEvent.CONNECTION, executerApresOuvertureContactServeur, this);
        serveur.addEventListener(SFS2X.SFSEvent.LOGIN, executerApresOuvertureSession, this);
        serveur.addEventListener(SFS2X.SFSEvent.ROOM_JOIN, executerApresEntreeSalon, this);
        serveur.addEventListener(SFS2X.SFSEvent.ROOM_VARIABLES_UPDATE, executerApresVariableDeSalon, this);
        
        ouvrirContactServeur();
    }

    function ouvrirContactServeur()
    {
        serveur.connect();    
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
        serveur.send(new SFS2X.Requests.System.LoginRequest("Nadine"));
    }

    function executerApresOuvertureSession(e)
    {
        tracer("executerApresOuvertureSession()");
        tracer("l'usager " + e.user.name + " est dans la zone " + e.zone);
        entrerSalon();
    }

    function entrerSalon()
    {
        tracer('entrerSalon()');
        estEnvoye = serveur.send(new SFS2X.Requests.System.JoinRoomRequest(configuration.room));
        tracer('demande d\'entrer dans le salon effectuee');
    }

    function executerApresEntreeSalon(e)
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
        listeVariables.push(new SFS2X.Entities.Variables.SFSRoomVariable('salutation','coucou'));

        estEnvoyee = serveur.send(new SFS2X.Requests.System.SetRoomVariablesRequest(listeVariables));
        tracer('la nouvelle valeur est envoyee ' + estEnvoyee);
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

    function tracer(message, alerte)
    {
        console.log(message);
        if(alerte) alert(message);
    }

    initialiser();
}