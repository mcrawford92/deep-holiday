var Choice = function (args) {
	Module.apply(this, arguments);

	var settings = {
		animationSpeed : .3
	};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	this.init = function () {

		//Hover Listeners declared here
		$el
			.on("mouseenter", _.e_MouseEnter)
			.on("mouseleave", _.e_MouseLeave);

		this.value = $el.data("value");
		this.colors = {
				bg : $el.data("bg"),
				bgShade : $el.data("bgshade")
			};

		$el.find("div").css({"background" : this.colors.bg });
		$el.find("div span").css({"background" : this.colors.bgShade });
	};

	//Event Handlers
	this.e_MouseEnter = function(e) {
		_.a_IllustrationHover();
		_.a_CaptionHover();
	};

	this.e_MouseLeave = function (e) {
		_.a_IllustrationHoverCancel();
		_.a_CaptionHoverCancel();
	};
 
	//Animations
	this.a_IllustrationHover = function () {
		TweenLite.to($el.find("div>span")[0], _.settings.animationSpeed, 
			{
				"width" : "100%",
				"height" : "100%",
				"margin-left" : "-50%",
				"margin-top" : "0"
			}
		);
	};

	this.a_IllustrationHoverCancel = function () {

		TweenLite.to($el.find("div>span")[0], _.settings.animationSpeed, 
			{
				"width" : "0",
				"height" : "0",
				"margin-left" : "0",
				"margin-top" : "50%"
			}
		);
	};

	this.a_CaptionHover = function () {
		TweenLite.to($el.find('figure>span')[0], _.settings.animationSpeed,
			{
				"width" : "100%"
			}
		);
		TweenLite.to($el.find('figure>h4')[0], _.settings.animationSpeed,
			{
				"color" : "#ffffff"
			}
		);
	};

	this.a_CaptionHoverCancel = function () {
		TweenLite.to($el.find('figure>span')[0], _.settings.animationSpeed,
			{
				"width" : "0"
			}
		);
		TweenLite.to($el.find('figure>h4')[0], _.settings.animationSpeed,
			{
				"color" : "#E0DFDE"
			}
		);
	};

	this.init(); 
	return this;
};

	Choice.prototype = Object.create(Module.prototype);
	Choice.prototype.constructor = Choice;