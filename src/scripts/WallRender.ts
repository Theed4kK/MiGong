class WallRender extends eui.ItemRenderer {
	public constructor() {
		super()
		this.addEventListener(egret.Event.COMPLETE, this.GetWallSize, this);
	}

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;

	public static hWallHeight: number = 0;
	public static vWallwidth: number = 0;
	public static h: number = 0;
	public static w: number = 0;

	private GetWallSize(): void {
		if (WallRender.hWallHeight == 0) {
			WallRender.hWallHeight = this.img_upWall.height;
		}
		if (WallRender.vWallwidth == 0) {
			WallRender.vWallwidth = this.img_leftWall.width;
		}
		if (WallRender.h == 0) {
			WallRender.h = this.height;
		}
		if (WallRender.w == 0) {
			WallRender.w = this.width;
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