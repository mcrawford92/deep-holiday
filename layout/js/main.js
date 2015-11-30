$(window).load(function(){
	
	var pageMain = new Page_Main({pageTitle : "Master Page"}, $('body'));

	var pageSplash = new Page_Splash( {pageTitle : "Splash Page"}, $('.page_splash'));

	var pageChoice = new Page_Choices( {pageTitle : "Choices Page"}, $('.page_choices'));

	enableScroll();
}); 

disableScroll();











