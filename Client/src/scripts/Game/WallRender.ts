class WallRender extends eui.ItemRenderer {
	public constructor() {
		super()
		this.addEventListener(egret.Event.ADDED, this.GetWallSize, this);
	}

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;

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
		this.SetWallSize(cell);
		this.img_leftWall.visible = !cell.leftWall.isOpen;
		this.img_upWall.visible = !cell.upWall.isOpen;
		this.img_downWall.visible = !cell.downWall.isOpen;
		this.img_rightWall.visible = !cell.rightWall.isOpen;
		// this.visible = cell.id == 0
	}

	private SetWallSize(cell: Cell) {
		if(cell.upCell==null&& cell.leftCell !=null){
			this.img_leftWall.top = -WallRender.hWallHeight;
		}
	}

	public StartAni(wait: number): number {
		let aniTime = 500;
		egret.Tween.get(this.img_leftWall).wait(wait).to({ top: -2 }, aniTime);
		return aniTime;
	}
}