class Wall {
	public constructor() {
		this.isExit = false;
	}

	public static hWalls: Wall[] = [];
	public static wWalls: Wall[] = [];

	public id: number;
	public cell1Id: number;
	public cell2Id: number;

	public isExit: boolean;
	public isSigned: boolean;
}
