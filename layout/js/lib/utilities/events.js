//Event Singleton and Observer lists

//Singleton for Page Events


var Events = (function () {
 
  // Instance stores a reference to the Singleton
  var instance;
 
  function init() {  

  	var _ = this;

	//Instantiate observer lists that are watching events
	this.e_MouseMove = new e_Subject();
	this.e_KeyUp = new e_Subject();
	this.e_Click = new e_Subject();
	this.e_Scroll = new e_Subject();
	this.e_MouseEnter = new e_Subject();
	this.e_MouseLeave = new e_Subject();

	//Listen for page events
	$(document)
		.on( "mousemove", function(e) { _.e_MouseMove.notify(e); } )
		.on( "keyup", function(e) { _.e_KeyUp.notify(e); } )
		.on( "click", function(e) { _.e_Click.notify(e); } )
		.on( "scroll", function(e) { _.e_Scroll.notify(e); } )
		.on( "mouseenter", function(e) { _.e_MouseEnter.notify(e); })
		.on( "mouseleave", function(e) { _.e_MouseLeave.notify(e); });

    return {
    	addObserver_MouseEnter : function (obj) {
			$.extend(obj, new e_Observer())
			_.e_MouseEnter.addObserver(obj);
		},
		removeObserver_MouseEnter : function (obj) {
			_.e_MouseEnter.removeObserver(obj);
		},
    	addObserver_MouseLeave : function (obj) {
			$.extend(obj, new e_Observer())
			_.e_MouseLeave.addObserver(obj);
		},
		removeObserver_MouseLeave : function (obj) {
			_.e_MouseLeave.removeObserver(obj);
		},
    	addObserver_MouseMove : function (obj) {
			$.extend(obj, new e_Observer())
			_.e_MouseMove.addObserver(obj);
		},
		removeObserver_MouseMove : function (obj) {
			_.e_MouseMove.removeObserver(obj);
		},
    	addObserver_KeyUp : function (obj) {
			$.extend(obj, new e_Observer())
			_.e_KeyUp.addObserver(obj);
		},
		removeObserver_KeyUp : function (obj) {
			_.e_KeyUp.removeObserver(obj);
		},
    	addObserver_Click : function (obj) {
			$.extend(obj, new e_Observer())
			_.e_Click.addObserver(obj);
		},
		removeObserver_Click : function (obj) {
			_.e_Click.removeObserver(obj);
		},
    	addObserver_Scroll : function (obj) {
			$.extend(obj, new e_Observer())
			_.e_Scroll.addObserver(obj);
		},
		removeObserver_Scroll : function (obj) {
			_.e_Scroll.removeObserver(obj);
		}
    };
 
  };
 
  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {
      if ( !instance ) { instance = init(); }
 
      return instance; }
  };
})();





//Event Handler Observer lists
//============================

//for global events that multiple objects need to see
//so I don't have to make multiple listeners


//Observer list model to push to animations that require updates
//of the mouse position
function e_ObserverList() {
	this.eObserverList = []; }

	//add a new object to be notified when mouse moves
	e_ObserverList.prototype.add = function (obj) {
		return this.eObserverList.push (obj); };

	//get the count of observers in the list
	e_ObserverList.prototype.count = function() {
		return this.eObserverList.length;
	};

	//get a specific object in the list
	e_ObserverList.prototype.get = function ( index ) {
		if (index > -1 && index < this.eObserverList.length) {
			return this.eObserverList[ index ];
		}
	};

	//find if a matched object is in the array
	e_ObserverList.prototype.indexOf = function (obj, startIndex) {
		var i = startIndex;

		while (i < this.eObserverList.length) {
			if (this.eObserverList[i] === obj) {
				return i;
			}
			i++;
		}

		//if not found
		return -1;
	};

	//get rid of a specific object in the list
	e_ObserverList.prototype.remove = function (index) {
		this.eObserverList.splice( index, 1);
	};









	//Subject controller that maintains the observer list
	function e_Subject() {
		this.eObservers = new e_ObserverList();
	}
		e_Subject.prototype.addObserver = function (eObserver) {
			this.eObservers.add(eObserver);
		};

		e_Subject.prototype.removeObserver = function (eObserver) {
			this.eObservers.remove( this.eObservers.indexOf(eObserver, 0));
		};

		e_Subject.prototype.notify = function ( eventData ) {

			var observerCount = this.eObservers.count();

			for (var i = 0; i < observerCount; i++)
			{
				this.eObservers.get(i).update(eventData);
			}
		};





		function e_Observer() {
			this.update = function ( eventData ) {
				this.handleEvent(eventData);
			};
		}