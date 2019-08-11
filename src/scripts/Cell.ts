class Cell {
	public constructor() {
	}

	/**0:上墙 1:下墙 2:左墙 3:右墙 */
	public upWall: Wall = new Wall();
	public downWall: Wall = new Wall();;
	public leftWall: Wall = new Wall();;
	public rightWall: Wall = new Wall();;
	public walls: Wall[] = [];

	public upCell: Cell = null;;
	public downCell: Cell = null;;
	public leftCell: Cell = null;;
	public rightCell: Cell = null;;
	public nearCells: Cell[] = [];

	public isSigned: boolean = false;
	public isPassed: boolean = false;;
	public id: number;

}