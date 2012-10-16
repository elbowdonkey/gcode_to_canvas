var GCodeCanvas = (function() {
  function GCodeCanvas(canvas) {
  	this.canvas = canvas;
  	this.queue = [];
  	this.current = null;

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

	GCodeCanvas.prototype.advance = function() {
  	// do stuff with this.next;
  };

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