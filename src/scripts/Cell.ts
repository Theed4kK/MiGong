class Cell {
	public constructor() {
		this.isPassed = false;
		this.isSigned = false;
		this.upCell = this.downCell = this.leftCell = this.rightCell = null;
	}

	public upWall: Wall;
	public downWall: Wall;
	public leftWall: Wall;
	public rightWall: Wall;

	public upCell: Cell;
	public downCell: Cell;
	public leftCell: Cell;
	public rightCell: Cell;

	public isSigned: boolean;
	public isPassed: boolean;
	public id: number;

}