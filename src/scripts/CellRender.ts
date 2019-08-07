class CellRender extends eui.ItemRenderer {
	public constructor() {
		super()
		this.addEventListener(egret.Event.COMPLETE, this.GetWallData, this);
	}

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;

	public static hWallHeight: number = 0;
	public static vWallwidth: number = 0;
	public static h: number = 0;
	public static w: number = 0;

	private GetWallData(): void {
		if (CellRender.hWallHeight == 0) {
			CellRender.hWallHeight = this.img_upWall.height;
		}
		if (CellRender.vWallwidth == 0) {
			CellRender.vWallwidth = this.img_leftWall.width;
		}
		if (CellRender.h == 0) {
			CellRender.h = this.height;
		}
		if (CellRender.w == 0) {
			CellRender.w = this.width;
		}
	}

	protected dataChanged(): void {
		let cell: Cell = this.data;

		this.img_upWall.visible = cell.upWall == null ? true : !cell.upWall.isOpen;
		this.img_downWall.visible = !cell.downCell;
		this.img_leftWall.visible = cell.leftWall == null ? true : !cell.leftWall.isOpen;
		this.img_rightWall.visible = !cell.rightCell;
		this.SetLeftWall();

	}

	private SetLeftWall(): void {
		let cell: Cell = this.data;
		if (!cell.leftWall.isOpen) {
			if (cell.downCell != null && !cell.downCell.upWall.isOpen) {
				this.img_leftWall.bottom = this.img_upWall.height / 2;
			}
		}
	}

	public StartAni(wait: number): number {
		let aniTime = 500;
		egret.Tween.get(this.img_leftWall).wait(wait).to({ top: -2 }, aniTime);
		return aniTime;
	}

}