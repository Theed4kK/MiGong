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
		this.img_leftWall.visible = false || cell.leftCell == null;
		this.img_upWall.visible = false || cell.upCell == null;
		this.img_downWall.visible = false || cell.downCell == null;
		this.img_rightWall.visible = false || cell.rightCell == null;
	}

	private SetWallSize(cell: Cell) {
		if (cell.upCell != null) {
			if (!cell.leftWall.isOpen && cell.upCell.leftWall) {
				this.img_leftWall.top = 0;
			}
			if (!cell.rightWall.isOpen && cell.upCell.rightWall) {
				this.img_rightWall.top = 0;
			}
		}
		if (cell.downCell != null) {
			if (!cell.leftWall.isOpen && cell.downCell.leftWall) {
				this.img_leftWall.bottom = 0;
			}
			if (!cell.rightWall.isOpen && cell.downCell.rightWall) {
				this.img_rightWall.bottom = 0;
			}
		}
		if (cell.leftCell != null) {
			if (!cell.upWall.isOpen && cell.leftCell.upWall) {
				this.img_upWall.left = 0;
			}
			if (!cell.downWall.isOpen && cell.leftCell.downWall) {
				this.img_downWall.left = 0;
			}
		}
		if (cell.rightCell != null) {
			if (!cell.upWall.isOpen && cell.rightCell.upWall) {
				this.img_upWall.right = 0;
			}
			if (!cell.downWall.isOpen && cell.rightCell.downWall) {
				this.img_downWall.right = 0;
			}
		}
	}

	public ShowWall() {
		let cell: Cell = this.data;
		this.img_leftWall.visible = !cell.leftWall.isOpen;
		this.img_upWall.visible = !cell.upWall.isOpen;
		this.img_downWall.visible = !cell.downWall.isOpen;
		this.img_rightWall.visible = !cell.rightWall.isOpen;
	}
}