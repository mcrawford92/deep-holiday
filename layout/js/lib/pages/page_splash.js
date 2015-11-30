var Page_Splash = function (args) {
	Page.apply(this, arguments);

	var settings = {
		animationSpeed : 1

	};

	$.extend(this.settings, settings);
	
	var $el = this.$el;
	var _ = this;

	var scrollOnce = false;

	this.init = function () {
		$(window).scrollTop(0);
		this.Events.addObserver_Scroll(this);
		this.Events.addObserver_KeyUp(this);
	};

	this.handleEvent = function (e) {
		switch (e.type) {
			case 'scroll':
				this.e_Scroll(e);
				break;
			case 'keyup':
				this.e_KeyUp(e);
		}
	};

	//Event Handlers
	this.e_Scroll = function (e) {

		var scrollDelay = 0;

		if (scrollOnce == false) {
				if (window.pageYOffset < $el.height()&&window.pageYOffset>scrollDelay) {
					_.a_SlideScrollDown(e);
				}
				else if (window.pageYOffset<scrollDelay) {
					TweenLite.to(window, 1, 
						{ 
							scrollTo: { y : 0},
							ease: Power2.easeOut,
							overwrite : "all"
						});
				}
			}
	};

	this.e_KeyUp = function (e) {

		var spaceBar = 40;

		if(e.keyCode == spaceBar && scrollOnce == false) {
			_.a_SlideScrollDown(e);
		}
	};

	//Animations
	this.a_SlideScrollDown = function (e) {
		disableScroll();
		TweenLite.to(window, _.settings.animationSpeed, 
			{ 
				scrollTo: { y : $el.height()},
				ease: Power2.easeOut,
				onComplete : function() {
					enableScroll();
					$el.css({"display" : "none"});
					$(window).scrollTop(0);
				}
			});
		TweenLite.to($el[0], _.settings.animationSpeed, {"opacity" : 0});
		scrollOnce = true;
	}
 
	this.init();

	return this;
};

	Page_Splash.prototype = Object.create(Page.prototype);
	Page_Splash.prototype.constructor = Page_Splash;