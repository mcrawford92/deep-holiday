var DecisionProgressBar = function (args) {
	Module.apply(this, arguments);

	var settings = {
		animationSpeed : .75
	};

	$.extend(this.settings, settings);


	
	var $el = this.$el;
	var _ = this;

	this.decisionList = [null, null, null];

	//Animations
	this.a_SlideIn = function () {
		TweenLite.to($el[0], _.settings.animationSpeed,
			{
				"margin-left" : 0
			}
		);
	};

	this.a_UpdateChoice = function (decision) {

		var bgColor = this.decisionList[decision].colors.bg;

		$el.find('li span').eq(decision).css({"background" : bgColor });
		$el.find('li h3').eq(decision).html(this.decisionList[decision].value);

		TweenLite.to($el.find("span").eq(decision)[0], _.settings.animationSpeed, 
			{
				"width" : "200%",
				"height" : "200%",
				"margin-left" : "-100%",
				"margin-top" : "-50%"
			}
		);
	};


	//Utilities
	this.u_UpdateChoice = function (choice, decision) {
		this.decisionList[decision] = choice;

		this.a_UpdateChoice(decision);
	};

	return this;
};

	DecisionProgressBar.prototype = Object.create(Module.prototype);
	DecisionProgressBar.prototype.constructor = DecisionProgressBar;