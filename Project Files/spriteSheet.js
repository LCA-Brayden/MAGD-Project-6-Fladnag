function SprSheet (rows, columns, img, dimX, dimY, cellCnt) {
	var r = rows;
	var c = columns;
	var src = img;
	var dX = dimX;
	var dY = dimY;
	var cellCnt; 

	var xCells = [];
	var yCells = [];

	this.sliceSheet = function(r, c, dX, dY, cellCnt) {
		var cellX = dX/r; 
		var cellY = dY/c;
		var curLoc = createVector(0,0);
		// console.log("dX: " + dX + " | dY: " + dY);
		// console.log("cellX: " + cellX + " | cellY: " + cellY);
		var j = 0; 
		var k = 0; 
		// console.log("DimX/Rows = " + dX/r);
		// console.log("DimY/Columns = " + dY/c);

		for(var i = 0; i < cellCnt; i++) {
			// console.log("curLoc: " + curLoc + " | j: " + j + " | k: " + k);
			// console.log("i: " + i);
			xCells.push(curLoc.x); 
			yCells.push(curLoc.y);

		// console.log("xCells["+i+"]: "+xCells[i] + " | yCells["+i+"]: " + yCells[i]);
			if (j < c) {
				curLoc.x += cellX;
				// console.log("NEXT CELL");
				j+=1;
			}
			else if (j == c) {
				curLoc.x = 0; 
				j = 0;
				k += 1;
				curLoc.y += cellY;
				// console.log("NEXT ROW");
			}
			else {
				console.log("SliceSheet ERROR in Coordinate Calculation");
				break;
			}
		}
		// console.log("FINISHED");
	}

	this.getCellCnt = function() {
		return cellCnt;
	}

	this.getDimX = function() {
		return dX; 
	}

	this.getDimY = function() {
		return dY; 
	}

	this.getX = function(index) {
		// console.log("xCells["+index+"]: "+xCells[index]);
		return xCells[index];
	}

	this.getY = function(index) {
		// console.log("yCells["+index+"]: " + yCells[index]);
		return yCells[index];
	}

	this.getTestArray = function(indexA, indexB) {
		console.log("xCells["+indexA+"]: "+xCells[indexA] + " | yCells["+indexB+"]: " + yCells[indexB]);
	}
}