function SpriteSheet (rows, columns, img, dimX, dimY) {
	this.r = rows;
	this.c = columns;
	this.src = img;

	this.dX = dimX;
	this.dY = dimY;

	this.cells = [];

	function sliceSheet(r, c, dX, dY) {
		console.log("DimX/Rows = " + dX/r);
		console.log("DimY/Columns = " + dY/c);
	}
}