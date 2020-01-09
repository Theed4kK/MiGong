class WallRender extends eui.ItemRenderer {
	public constructor() {
		super()
		// this.addEventListener(egret.Event.ADDED, this.GetWallSize, this);
	}

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;

	private isPassed: boolean = false;

	public static hWallHeight: number = 10;
	public static vWallwidth: number = 10;
	public static height: number = 100;
	public static width: number = 100;

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
		// this.img_leftWall.visible = false || cell.leftCell.leftCell == null;
		// this.img_upWall.visible = false || cell.upCell.upCell == null;
		// this.img_downWall.visible = false || cell.downCell.downCell == null;
		// this.img_rightWall.visible = false || cell.rightCell.rightCell == null;

		this.img_leftWall.visible = !cell.leftWall.isOpen;
		this.img_upWall.visible = !cell.upWall.isOpen;
		this.img_downWall.visible = !cell.downWall.isOpen;
		this.img_rightWall.visible = !cell.rightWall.isOpen;
	}


	public ShowWall() {
		// let cell: Cell = this.data;
		// this.img_leftWall.visible = !cell.leftWall.isOpen;
		// this.img_upWall.visible = !cell.upWall.isOpen;
		// this.img_downWall.visible = !cell.downWall.isOpen;
		// this.img_rightWall.visible = !cell.rightWall.isOpen;
	}
}