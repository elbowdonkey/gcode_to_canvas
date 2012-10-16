var GCodeCanvas = (function() {
  function GCodeCanvas(canvas,platform) {
  	if (platform == undefined) {
  		var platform = {
    		length: 225.0,
    		width: 145.0,
    		height: 150.0
    	}
  	}

  	this.platform = platform;
  	this.scale = 2.0;

  	this.platform.length *= this.scale;
  	this.platform.width *= this.scale;

  	this.canvas = canvas;
  	// this.canvas.width(this.platform.length);
  	// this.canvas.height(this.platform.width);
  	this.origin = {
  		x: this.canvas.width() / 2,
  		y: this.canvas.height() / 2
  	};


  	this.context = this.canvas[0].getContext("2d");
  	this.context.lineWidth = 0.5; // * this.scale; // could be used to simulate "spread";

  	this.queue = [];
  	this.current = null;
  	this.running = false;

  	return this;
  };

  GCodeCanvas.prototype.enqueue = function(instruction) {
  	this.queue.push(instruction);
  };

  GCodeCanvas.prototype.getNextInstruction = function() {
  	var instruction = this.queue.shift();

  	this.current = {
  		gcode: instruction,
  		coordinates: null
  	}

  	this.current.coordinates = this._translate_coordinates();

  	return this.current;
  };

	GCodeCanvas.prototype.run = function() {
		if (this.queue.length > 0) {

			if (this.running == false) this.begin();

			this.placePoint();

			if (this.queue.length == 0) {
				this.end();
				return;
			}
			this.run()
		};
  };

  GCodeCanvas.prototype.begin = function() {
  	this.running = true;
  	this.getNextInstruction();
  	var coords = this.current.coordinates;
  	var origin = this.origin;
  	var scale = 1.0; // this.scale;
  	var x = (origin.x * scale) - (coords.x * scale);
  	var y = (origin.y * scale) - (coords.y * scale);


  	this.context.beginPath();
  	this.context.moveTo(x, y);
  };

  GCodeCanvas.prototype.placePoint = function() {
  	this.getNextInstruction();
  	var coords = this.current.coordinates;
  	var origin = this.origin;
  	var scale = 1.0; // this.scale;
  	var x = (origin.x * scale) - (coords.x * scale);
  	var y = (origin.y * scale) - (coords.y * scale);

  	this.context.lineTo(x, y);
  	this.context.stroke();
  };

  GCodeCanvas.prototype.end = function() {
  	this.running = false;
  }


	GCodeCanvas.prototype._translate_coordinates = function() {
		var instruction = this.current.gcode;
		var parts = instruction.split(" ");

		if (parts[0] != "G1")  return;

		var rawValues = {
			x: parts[1],
			y: parts[2],
			z: parts[3]
		}

		function convert(rawValue) {
			return parseFloat(rawValue.replace(/[XYZ]/, ''));
		}

  	return {
  		x: convert(rawValues.x),
  		y: convert(rawValues.y),
  		z: convert(rawValues.z)
  	}
  };

  return GCodeCanvas;
})();