var Page_Choices = function (args) {
	Page.apply(this, arguments);

	var settings = {
		animationSpeed : .75

	};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	this.visibleFlag = false;
	this.currentChoiceList = 0;

	this.decisionList = [ null, null, null];

	//Choices Constructor function
	this.init = function () {
		//Build Page Modules
		this.decisionProgressBar = new DecisionProgressBar({}, $('.decision-progress-bar'));

			//Build lists of choices
			this.buildChoiceLists();

		//Bind Listeners to Events
		this.Events.addObserver_Scroll(this);
		this.Events.addObserver_Click(this);
	};

	//Find all of the choices and put them into lists
	this.buildChoiceLists = function () {
		this.choiceLists = [];
			
		//loop through the number of panels and build a choice list for each
		$el.find('section.choice').each(
			function (i) {
				_.choiceLists[_.choiceLists.length] = new ChoiceList({}, $(this));
			}
		);
	};

	//Go to next choice list screen
	this.goTo_NextChoiceList = function (choice, choiceList) {
		this.u_UpdateChoice(choice, this.currentChoiceList);
		this.a_NextChoiceList();
	};

	//Go to the final result sequence
	this.goTo_Result = function () {
		this.Results = new Page_Results ({ pageTitle : "Results Page" }, $('.page_results'), this);
	};

	//Event decision tree
	this.handleEvent = function (e) {
		switch (e.type) {
			case 'scroll':
				this.e_Scroll(e);
				break;
			case 'click':
				this.e_Click(e);
				break;
		}
	};

	//Handler for Scroll Event
	this.e_Scroll = function (e) {
		if (window.pageYOffset > ($el.offset().top - ($(window).height())) && this.visibleFlag == false) {
			this.a_RiseIn();
			this.visibleFlag = true;
		}
	};

	this.e_Click = function (e) {

		//identify target and it's parent
		t = e.target;
		p = t.parentElement;

		var choice = null;
		var choiceList = this.u_findCurrentChoice();

		var flag = false;

		//determine if the person clicked on a choice and return the element
		//if not return null

		if (t.nodeName == "A") {
			choice = p;
		}
		else if (p.nodeName == "A") {
			choice = p.parentElement;
		}
		else if (p.parentElement.nodeName == "A") {
			choice = p.parentElement.parentElement;
		}

		if (choice != null) {

			e.preventDefault();

			//search through the current choice list and find an
			//object that matches the clicked choice and save that response
	
			for (var x = 0; x < choiceList.choices.length; x++) {
				if (choiceList.choices[x].$el[0] == choice) {
	
					choice = choiceList.choices[x];
					_.goTo_NextChoiceList(choice, choiceList);
	
				}
			}
	
			//if all three choice have been selected send them to a screen to double check
			//all of their choice before continuing
	
			if (this.u_CheckDecisions() && choice != null) {
				this.goTo_Result();
			}
		}

	};

	//Animations
	this.a_RiseIn = function(args) {

		var currentChoice = this.u_findCurrentChoice().$el;

		var $section = $el.find("section");
		$section.eq(0).addClass("current");


		TweenLite.to($el[0], _.settings.animationSpeed, 
			{
				"padding-top" : 0,
				"opacity" : "1",
				onComplete : function () {
					TweenLite.to($section, _.settings.animationSpeed, {
						"padding-left" : "20%"
					});
					_.a_DecisionProgressBar_SlideIn(_.settings.animationSpeed);
				}
			}
		);
		currentChoice.css({display:"block"});
	};

	this.a_DecisionProgressBar_SlideIn = function (args) {
		this.decisionProgressBar.a_SlideIn();
	};

	this.a_NextChoiceList = function () {
		var currChoice = this.currentChoiceList;
		var nextChoice = this.currentChoiceList + 1;

	
			$el.find("section").eq(nextChoice).css({ "left" : "100%", "position" : "absolute"});

			TweenLite.to(window, _.settings.animationSpeed, 
				{ 
					scrollTo: { y : 0},
					ease: Power2.easeOut
				}
			);

			TweenLite.to($el.find("section").eq(currChoice)[0], _.settings.animationSpeed,
				{
					"left" : "-100%",
					ease: Power2.easeOut
				}
			);
			TweenLite.to($el.find("section").eq(nextChoice)[0], _.settings.animationSpeed,
				{
					"display" : "block",
					"left" : 0,
					ease: Power2.easeOut
				}
			);
	
			$el.find("section.current").removeClass("current");
			$el.find("section").eq(nextChoice).addClass("current");
	
			this.currentChoiceList = nextChoice;

	};

	//Utility Functions
	this.u_findCurrentChoice = function () {
		var currentChoice = null;

		//if section has class current, then it's the current list
		//if not just pick the first one
		if ($el.find('section').hasClass("current")) {
			currentChoice = this.choiceLists[$el.find('section').index($('.current'))];

			this.currentChoiceList = $el.find('section').index($('.current'));
		}
		else {
			currentChoice = this.choiceLists[0];
			this.currentChoiceList = 0;
		}

		return currentChoice;
	};

	this.u_UpdateChoice = function (choice, decision) {
		this.decisionList[decision] = choice;
		this.decisionProgressBar.u_UpdateChoice(choice, decision);
	};

	this.u_CheckDecisions = function () {
		var flag = true;
		for ( var x = 0; x < this.decisionList.length; x++ ) {
			if (this.decisionList[x] == null) {
				flag = false;
			}
		}
		return flag;
	};

	this.init();

	return this;
};

	Page_Choices.prototype = Object.create(Page.prototype);
	Page_Choices.prototype.constructor = Page_Choices;