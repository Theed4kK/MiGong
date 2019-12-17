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

	public static hWallHeight: number = 16;
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
		this.SetWallSize(cell);
		// this.img_leftWall.visible = false || cell.leftCell.leftCell == null;
		// this.img_upWall.visible = false || cell.upCell.upCell == null;
		// this.img_downWall.visible = false || cell.downCell.downCell == null;
		// this.img_rightWall.visible = false || cell.rightCell.rightCell == null;

		this.img_leftWall.visible = !cell.leftWall.isOpen;
		this.img_upWall.visible = !cell.upWall.isOpen;
		this.img_downWall.visible = !cell.downWall.isOpen;
		this.img_rightWall.visible = !cell.rightWall.isOpen;
	}

	private SetWallSize(cell: Cell) {
		//左墙顶高
		if ((cell.wallState & 3) === 1 && cell.leftCell.upWall.isOpen && cell.upCell.leftWall.isOpen) {
			this.img_leftWall.top = 0;
		}
		//左墙顶底
		if ((cell.wallState & 9) === 1 && cell.leftCell.downWall.isOpen && cell.downCell.leftWall.isOpen) {
			this.img_leftWall.bottom = 0;
		}

		//右墙顶高
		if ((cell.wallState & 6) === 4 && cell.rightCell.upWall.isOpen && cell.upCell.rightWall.isOpen) {
			this.img_rightWall.top = 0;
		}
		//右墙顶底
		if ((cell.wallState & 12) === 4 && cell.rightCell.downWall.isOpen && cell.downCell.rightWall.isOpen) {
			this.img_rightWall.bottom = 0;
		}

		//上墙顶左
		if ((cell.wallState & 3) === 2 && cell.leftCell.upWall.isOpen && cell.upCell.leftWall.isOpen) {
			this.img_upWall.left = 0;
		}
		//上墙顶右
		if ((cell.wallState & 6) === 2 && cell.rightCell.upWall.isOpen && cell.upCell.rightWall.isOpen) {
			this.img_upWall.right = 0;
		}

		//下墙顶左
		if ((cell.wallState & 9) === 8 && cell.leftCell.downWall.isOpen && cell.downCell.leftWall.isOpen) {
			this.img_downWall.left = 0;
		}
		//下墙顶右
		if ((cell.wallState & 12) === 8 && cell.rightCell.downWall.isOpen && cell.downCell.rightWall.isOpen) {
			this.img_downWall.right = 0;
		}

	}

	public ShowWall() {
		// let cell: Cell = this.data;
		// this.img_leftWall.visible = !cell.leftWall.isOpen;
		// this.img_upWall.visible = !cell.upWall.isOpen;
		// this.img_downWall.visible = !cell.downWall.isOpen;
		// this.img_rightWall.visible = !cell.rightWall.isOpen;
	}
}