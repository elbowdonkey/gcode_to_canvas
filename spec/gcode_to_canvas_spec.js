Screw.Unit(function(c) { with(c) {
  describe("GCode to Canvas", function() {
  	describe("Creation of GCodeCanvas object", function() {
	  	var object;

	  	before(function() {
	      object = new GCodeCanvas();
	    });

	    it("can do stuff", function() {
	      expect(object).to(be_a, GCodeCanvas);
	    });
	  });

	  describe("Applied to a CANVAS element", function(){
			var object;
			var canvas;

	  	before(function() {
	  		$j('#test_content').html('<canvas id="c"></canvas>');
	  		canvas = $j('#c');
	      object = new GCodeCanvas(canvas);
	    });

	    it("is assigned a canvas element", function() {
	      expect(object.canvas).to(equal,canvas);
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
	      	"G1 X0.0 Y0.0 Z0.0 F0.0",
	      	"G1 X-100.0 Y-100.0 Z0.0 F0.0"
	      ];
	    });

	    describe("converting G codes to lines", function(){
	    	it("enqueues GCode instructions", function() {
	    		expect(object.queue.length).to(equal,0);

	    		object.enqueue(instructions[0]);
	    		object.enqueue(instructions[1]);

	    		expect(object.queue.length).to(equal, instructions.length);
		    });

		    it("gets the next item in the queue", function() {
		    	object.enqueue(instructions[0]);
	    		object.enqueue(instructions[1]);

	    		expect(object.getNextInstruction().gcode).to(equal, instructions[0]);
					expect(object.queue.length).to(equal, instructions.length-1);
		    });

		    it("translates GCode coordinates", function() {

		    	object.enqueue(instructions[1]);
		    	object.getNextInstruction()

		    	results = object.current.coordinates;

		    	expect(results.x).to(equal, -100.0);
		    	expect(results.y).to(equal, -100.0);
		    	expect(results.z).to(equal, 0.0);
		    });

		    it("executes the next item on the queue", function() {
		    	object.enqueue(instructions[0]);
	    		object.enqueue(instructions[1]);

	    		object.advance();
		    });
	    });

	  });
  });
}});