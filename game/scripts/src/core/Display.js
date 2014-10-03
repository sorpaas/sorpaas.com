(function(exports){

	// Singleton
	var Display = {};
	exports.Display = Display;

	// Initialize
	Display.init = function(config){

		// Init DOM
		Display.dom = config.dom;
		Display.canvas = {};
		Display.context = {};

		// Set Canvas Dimensions
		Display.width = window.innerWidth;
		Display.height = window.innerHeight;

		// Canvasses
		Display.dom.appendChild(_addCanvas("game"));
		Display.dom.appendChild(_addCanvas("dialogue"));
		_addCanvas("ui");
		_addCanvas("tmp");
		_addCanvas("tmp2");

	};

	// Resize
	Display.resize = function(width,height){

		// Set Canvas Dimensions
		Display.width = width;
		Display.height = height;

		for(var id in Display.canvas){
			if(id=="ui" || id=="dialogue"){
				Display.canvas[id].width = window.innerWidth;
				Display.canvas[id].height = window.innerHeight;
			}else{
				Display.canvas[id].width = Display.width;
				Display.canvas[id].height = Display.height;
			}
		}

	};
	window.onresize = function(event){
		if(Game.PAUSED) return;
		if(!Game.level) return;
		var w = Math.min(Game.level.map.width, window.innerWidth);
		var h = Math.min(Game.level.map.height, window.innerHeight);
		Display.resize(w,h);
	};
	
	// Add canvas
	var _addCanvas = function(layerID){

		var canvas;
		canvas = document.querySelector("canvas#"+layerID) || document.createElement("canvas");
		canvas.id = layerID;
		canvas.width = Display.width;
		canvas.height = Display.height;

		Display.canvas[layerID] = canvas;
		Display.context[layerID] = canvas.getContext('2d');

		return canvas;

	};

	// Quick clear
	Display.clear = function(){
		for(var id in Display.context){
			Display.context[id].clearRect(0,0,Display.width,Display.height);
		}
	};

})(window);