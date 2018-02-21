JeuVue = function(joueur)
{
	var corps;
	
	function initialiser()
	{
		corps = document.getElementsByTagName("body")[0];
	}

	this.afficher = function()
	{
        corps.innerHTML = JeuVue.pageJeuHTML;
        
	}
	
	initialiser();
	
}

JeuVue.pageJeuHTML = document.getElementById("page-jeu").innerHTML;











