(function(){
    var dessin = document.getElementById("dessin").getContext("2d");
    var arme = new Arme(dessin);
	var canard = new Canard(dessin);
	var mechantCanard = new MechantCanard(dessin);
    
    interval = setInterval(
        function(){          
            if(canard.estCharge && arme.estCharge && mechantCanard.estCharge)
			{
				arme.afficher();
				canard.afficher();
				mechantCanard.afficher();
				clearInterval(interval);
			}
                
        }, 1);
})();