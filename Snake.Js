var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

for (let row = 1; row <= 17; ++row) {
	for (let column = 1; column <= 15; ++column) {
    	if (row % 2 !== 0 && column % 2 === 0 || row % 2 === 0 && column % 2 !== 0) {
        	ctx.fillStyle = "#A9A9A9";
			ctx.fillRect((row - 1) * 40, (column - 1) * 40, 40, 40);
        }
    }
}
