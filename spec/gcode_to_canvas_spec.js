Screw.Unit(function(c) { with(c) {
  describe("GCode to Canvas", function() {
  	describe("Applied to a CANVAS element", function(){
			var object;
			var canvas;

	  	before(function() {
	  		$j('#test_content').html('<canvas id="c" width="450" height="290"></canvas>');
	  		canvas = $j('#c');

	  		var platform = {
	    		length: 225.0,
	    		width: 145.0,
	    		height: 150.0
	    	}

	      object = new GCodeCanvas(canvas,platform);
	    });

	    it("is assigned a canvas element", function() {
	      expect(object.canvas).to(equal,canvas);
	    });

	    it("has a context", function() {
	      expect(object.context).to(equal,canvas[0].getContext("2d"));
	    });
	  });

		describe("Translating GCode to CANVAS", function(){
			var object;
			var canvas;
			var instructions;

	  	before(function() {
	  		$j('#sandbox').html('<canvas id="c"></canvas>');
	  		canvas = $j('#c');
	      object = new GCodeCanvas(canvas);
	      instructions = [
	      	"G1 X-5.87 Y19.89 Z0.47 F743.802 E4.097",
					"G1 X-2.93 Y27.09 Z0.47 F743.802 E5.567",
					"G1 X-2.93 Y-0.09 Z0.47 F743.802 E10.706",
					"G1 X0.0 Y-1.89 Z0.47 F743.802 E11.357",
					"G1 X0.0 Y30.69 Z0.47 F743.802 E17.517",
					"G1 X2.93 Y32.49 Z0.47 F743.802 E18.168",
					"G1 X2.93 Y-1.89 Z0.47 F743.802 E24.669",
					"G1 X5.87 Y-1.89 Z0.47 F743.802 E25.224",
					"G1 X5.87 Y32.49 Z0.47 F743.802 E31.724",
					"G1 X8.8 Y32.49 Z0.47 F743.802 E32.279",
					"G1 X8.8 Y25.11 Z0.47 F743.802 E33.674",
					"G1 X11.73 Y25.11 Z0.47 F743.802 E34.229",
					"G1 X11.73 Y32.49 Z0.47 F743.802 E35.623",
					"G1 X14.67 Y32.49 Z0.47 F743.802 E36.178",
					"G1 X14.67 Y-1.89 Z0.47 F743.802 E42.679",
					"G1 X11.73 Y-1.89 Z0.47 F743.802 E43.234",
					"G1 X11.73 Y3.69 Z0.47 F743.802 E44.288",
					"G1 X8.8 Y3.69 Z0.47 F743.802 E44.843",
					"G1 X8.8 Y-1.89 Z0.47 F743.802 E45.897"
	      ];
	    });

	    describe("converting G codes to lines", function(){
	    	it("enqueues GCode instructions", function() {
	    		expect(object.queue.length).to(equal,0);

	    		for (var i = 0; i < instructions.length; i++) {
	    			object.enqueue(instructions[i]);
	    		};

	    		expect(object.queue.length).to(equal, instructions.length);
		    });

		    it("gets the next item in the queue", function() {
		    	for (var i = 0; i < instructions.length; i++) {
	    			object.enqueue(instructions[i]);
	    		};

	    		expect(object.getNextInstruction().gcode).to(equal, instructions[0]);
					expect(object.queue.length).to(equal, instructions.length-1);
		    });

		    it("translates GCode coordinates", function() {

		    	object.enqueue(instructions[1]);
		    	object.getNextInstruction()

		    	results = object.current.coordinates;

		    	expect(results.x).to(equal, -2.93);
		    	expect(results.y).to(equal, 27.09);
		    	expect(results.z).to(equal, 0.47);
		    });

		    it("executes each item in the queue", function() {
		    	for (var i = 0; i < instructions.length; i++) {
	    			object.enqueue(instructions[i]);
	    		};

	    		object.run();
		    });
	    });
	  });
  });
}});