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
		this.visible = cell.id == 0
	}

	/**
	 * LightingUp
	 */
	public LightingUp() {
		if (this.isPassed) { return; }
		let cell: Cell = this.data;
		this.visible = true;
		this.isPassed = true;
	}

	private SetWallSize(cell: Cell) {
		this.img_leftWall.top = cell.leftWall.top * WallRender.hWallHeight * 0.5
		this.img_leftWall.bottom = cell.leftWall.bottom * WallRender.hWallHeight * 0.5
		this.img_rightWall.top = cell.rightWall.top * WallRender.hWallHeight * 0.5
		this.img_rightWall.bottom = cell.rightWall.bottom * WallRender.hWallHeight * 0.5
		this.img_upWall.left = cell.upWall.left * WallRender.vWallwidth * 0.5;
		this.img_upWall.right = cell.upWall.right * WallRender.vWallwidth * 0.5;
		this.img_downWall.left = cell.downWall.left * WallRender.vWallwidth * 0.5;
		this.img_downWall.right = cell.downWall.right * WallRender.vWallwidth * 0.5;
	}

	public StartAni(wait: number): number {
		let aniTime = 500;
		egret.Tween.get(this.img_leftWall).wait(wait).to({ top: -2 }, aniTime);
		return aniTime;
	}
}