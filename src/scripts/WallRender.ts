class WallRender extends eui.ItemRenderer {
	public constructor() {
		super()
		this.addEventListener(egret.Event.ADDED, this.GetWallSize, this);
	}

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;
	private img_list: eui.Image[] = [];

	private isPassed: boolean = false;

	public static hWallHeight: number = 0;
	public static vWallwidth: number = 0;
	public static height: number = 0;
	public static width: number = 0;

	private GetWallSize(): void {
		if (WallRender.hWallHeight == 0) {
			WallRender.hWallHeight = this.img_upWall.height;
		}
		if (WallRender.vWallwidth == 0) {
			WallRender.vWallwidth = this.img_leftWall.width;
		}
		if (WallRender.height == 0) {
			WallRender.height = this.height;
		}
		if (WallRender.width == 0) {
			WallRender.width = this.width;
		}
	}

	protected dataChanged(): void {
		let cell: Cell = this.data;
		this.img_list = [this.img_upWall, this.img_downWall, this.img_leftWall, this.img_rightWall];
		this.SetWallSize(cell);
		this.img_list.forEach((v, i) => {
			v.visible = cell.nearCells[i] == null;
		})
	}

	/**
	 * LightingUp
	 */
	public LightingUp() {
		if (this.isPassed) { return; }
		let cell: Cell = this.data;
		this.img_list.forEach((v, i) => {
			let nearCell = cell.nearCells[i];
			if (nearCell != null && !nearCell.isPassed) {
				v.visible = !cell.walls[i].isOpen;
			}
		})
		this.isPassed = true;
	}

	private SetWallSize(cell: Cell) {
		if (cell.upCell == null) {
			this.img_leftWall.top = WallRender.hWallHeight / 2
			this.img_rightWall.top = WallRender.hWallHeight / 2
		}
		if (cell.downCell == null) {
			this.img_leftWall.bottom = WallRender.hWallHeight / 2
			this.img_rightWall.bottom = WallRender.hWallHeight / 2
		}
	}

	public StartAni(wait: number): number {
		let aniTime = 500;
		egret.Tween.get(this.img_leftWall).wait(wait).to({ top: -2 }, aniTime);
		return aniTime;
	}
}