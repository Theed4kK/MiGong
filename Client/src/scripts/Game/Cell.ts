class Cell {
	public constructor() {
	}

	public wallState: number = 15;
	public cellState: number;
	/**0:上墙 1:下墙 2:左墙 3:右墙 */
	public upWall: Wall = new Wall();
	public downWall: Wall = new Wall();;
	public leftWall: Wall = new Wall();;
	public rightWall: Wall = new Wall();;

	public upCell: Cell = null;;
	public downCell: Cell = null;;
	public leftCell: Cell = null;;
	public rightCell: Cell = null;;

	/**生成时用来标记是否已经被处理过 */
	public isSigned: boolean = false;

	/**行走时用来标记格子是否已经通过 */
	public isPassed: boolean = false;

	public id: number;

	public item: number = 0;
	public isSpecial: boolean;
	/**标记格子是入口或出口 */
	public specialIndex: CELL_INDEX;

}

enum CELL_INDEX {
	Start,
	End
}