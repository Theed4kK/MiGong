class Wall {
	public constructor() {
	}

	public cell1Id: number;
	public cell2Id: number;

	/**为true时表明没有墙 */
	public isOpen: boolean = false;

	public left: number = 0;
	public right: number = 0;
	public top: number = 0;
	public bottom: number = 0;
}
