function Draw(e) {
	e = (e || event);
	var cnvs = document.getElementById('artboard');
	var brush = document.createElement('div');
	brush.style.width = '20px';
	brush.style.height = '20px';
	brush.style.position = 'absolute';
	brush.style.left = e.clientX + 'px';
	brush.style.top = e.clientY + 'px';
	document.body.appendChild(brush);
	
}

function colors(shade) {
}
document.onmousemove = function(e) {
	if(e.clientX < 550 && e.clientY < 455) {
	Draw();
	}
}