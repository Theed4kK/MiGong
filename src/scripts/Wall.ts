class Wall {
	public constructor() {
		this.isOpen = false;
	}

	public static hWalls: Wall[] = [];
	public static wWalls: Wall[] = [];

	public id: number;
	public cell1Id: number;
	public cell2Id: number;

	/**为true时表明没有墙 */
	public isOpen: boolean;
	public isSigned: boolean;
}
