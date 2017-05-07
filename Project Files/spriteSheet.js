function SprSheet (rows, columns, img, dimX, dimY) {
	this.r = rows;
	this.c = columns;
	this.src = img;
	this.dX = dimX;
	this.dY = dimY;

	this.cell = [r*c];

	this.sliceSheet = function(r, c, dX, dY) {
		var cellX = dX/r; 
		var cellY = dY/c;
		var curLoc = createVector(0,0);
		console.log("cellX: " + cellX + " | cellY: " + cellY);
		var cellCnt = r*c;
		var j, k = 0; 
		console.log("DimX/Rows = " + dX/r);
		console.log("DimY/Columns = " + dY/c);

		for(var i = 0; i < cellCnt; i++) {
			console.log("curLoc: " + curLoc);
			cell[i] = curLoc; 
			if (j < c) {
				curLoc.x += cellX;
			}
			else if (j == c) {
				curLoc.x = 0; 
				j = 0;
				k += 1;
				curLoc.y += cellY;
				console.log("Next Row");
			}
			else {
				console.log("SliceSheet ERROR in Coordinate Calculation");
				break;
			}
		}
	}
}