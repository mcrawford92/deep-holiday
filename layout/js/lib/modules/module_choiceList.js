//an observer list
var ChoiceList = function (args) {
	Module.apply(this, arguments);

	var settings = {};

	$.extend(this.settings, settings);

	$.extend(this, new e_Subject());
	
	var $el = this.$el;
	var _ = this;

	this.init = function () {
		//the list of each choice within the panel
		this.choices = [];

		//loop through all of the choices in the panel and make a object for them
		$el.find('.choice-list>li').each(
			function (i) {
				_.choices[_.choices.length] = new Choice ({}, $(this));
				_.addObserver(_.choices[i]);
			}
		);
	};

	this.init();

	return this;
};

	ChoiceList.prototype = Object.create(Module.prototype);
	ChoiceList.prototype.constructor = ChoiceList;