    // Variables for referencing the canvas and 2dcanvas context
    var canvas,ctx;
    var brush_size = 2;
    // Variables to keep track of the mouse position and left-button status 
    var mouseX,mouseY,mouseDown=0;
	var canvasbg = 'white';

    // Variables to keep track of the touch position
    var touchX,touchY;
 
    var brush_size = 2;
    var brush_color = 'black';

    var colors = new Array();
    
    colors[0] = 'red';
    colors[1] = 'orange';
    colors[2] = 'yellow';
    colors[3] = 'green';
    colors[4] = 'blue';
    colors[5] = 'indigo';
    colors[6] = 'violet';
    colors[7] = 'black';
    colors[8] = 'grey';
    colors[9] = 'white';


    // Draws a dot at a specific position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    function drawDot(ctx,x,y,size) {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
	ctx.fillStyle = brush_color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    } 

    // Clear the canvas context using the canvas width and height
    function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.style.background = "white";
    }

    // Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown() {
        mouseDown=1;
        drawDot(ctx,mouseX,mouseY,brush_size);
    }

    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown=0;
    }

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    function sketchpad_mouseMove(e) { 
        // Update the mouse co-ordinates when moved
        getMousePos(e);

        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown==1) {
            drawDot(ctx,mouseX,mouseY,brush_size);
        }
    }

    // Get the current mouse position relative to the top-left of the canvas
    function getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }

    // Draw something when a touch start is detected
    function sketchpad_touchStart() {
        // Update the touch co-ordinates
        getTouchPos();

        drawDot(ctx,touchX,touchY,brush_size);

        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    function sketchpad_touchMove(e) { 
        // Update the touch co-ordinates
        getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        drawDot(ctx,touchX,touchY,brush_size); 

        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    }

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }


    // Set-up the canvas and add our event handlers after the page has loaded
    function init() {
        // Get the specific canvas element from the HTML document
        canvas = document.getElementById('sketchpad');

        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
            ctx = canvas.getContext('2d');

        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
            // React to mouse events on the canvas, and mouseup on the entire document
            canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            window.addEventListener('mouseup', sketchpad_mouseUp, false);

            // React to touch events on the canvas
            canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        }

	var colorpanel = '';
	for(var i = 0; i < colors.length; i++) {
		colorpanel += '<div id="' + colors[i] + '" class="swatch"></div>';
	}
	document.getElementById('color-panel').innerHTML = colorpanel;

    }

$(document).ready(function() {
	init();
	$('#brush_increase').click(function() {
		if(brush_size < 15) brush_size++;
		else brush_size = 15;
		$('#size').css('width', brush_size + 'px');
        $('#size').css('background', '#fff');
        $('#size').css('height', brush_size + 'px');
        $('#brsh').html(brush_size);
	});
	$('#brush_decrease').click(function() {
		brush_size--;
		if(brush_size < 1) brush_size = 1;
		$('#size').css('width', brush_size + 'px');
        $('#size').css('background', '#fff');
        $('#size').css('height', brush_size + 'px');
        $('#brsh').html(brush_size);
	});
	$('#red').click(function() {
		brush_color = 'red';
		$('#clr').html(brush_color);
	});
	$('#orange').click(function() {
		brush_color = 'orange';
		$('#clr').html(brush_color);
	});
	$('#yellow').click(function() {
		brush_color = 'yellow';
		$('#clr').html(brush_color);
	});
	$('#green').click(function() {
		brush_color = 'green';
		$('#clr').html(brush_color);
	});
	$('#blue').click(function() {
		brush_color = 'blue';
		$('#clr').html(brush_color);
	});
	$('#indigo').click(function() {
		brush_color = 'indigo';
		$('#clr').html(brush_color);
	});
	$('#violet').click(function() {
		brush_color = 'violet';
		$('#clr').html(brush_color);
	});
	$('#black').click(function() {
		brush_color = 'black';
		$('#clr').html(brush_color);
	});
	$('#grey').click(function() {
		brush_color = 'grey';
		$('#clr').html(brush_color);
	});
	$('#white').click(function() {
		brush_color = 'white';
		$('#clr').html(brush_color);
	});
	$('#fish').click(function() {
        clearCanvas(canvas, ctx);
		canvasbg = "url('img/fish.png') center scroll no-repeat";
		$('#sketchpad').css('background', canvasbg);
	});
	$('#frog').click(function() {
        clearCanvas(canvas, ctx);
		canvasbg = "url('img/frog.png') center scroll no-repeat";
		$('#sketchpad').css('background', canvasbg);
	});
});