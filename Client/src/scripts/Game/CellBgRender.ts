class CellBgRender extends eui.ItemRenderer {
	public constructor() {
		super();
		// this.addEventListener(egret.Event.ADDED, this.GetCellSize, this);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private img_bg: eui.Image;
	private img_exitSign: eui.Image;

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;

	private tw_autoReturn: egret.Tween;

	protected dataChanged(): void {
		let cell: Cell = this.data;
		this.img_bg.visible = !cell;

		this.SetWall();
		if (cell.item != 0) {
			let item = Config.GetInstance().config_item[cell.item];
			this.img_exitSign.source = item.pic;
		}
		else {
			if (cell.isSpecial) {
				this.img_exitSign.source = RES.getRes("532_png")
				egret.log("特殊地面ID--->" + cell.id);
			}
			else if (this.img_exitSign) {
				this.img_exitSign.visible = false;
			}
		}
		if (cell.downCell == null && cell.rightCell == null) {
			this.visible = true;
			this.img_bg.visible = false;
			this.img_exitSign.source = RES.getRes("100_png")
		}
	}

	public SetReturnSign(): void {
		// this.img_exitSign.visible = true;
	}

	public HideReturnSign(): void {
		this.img_exitSign.visible = false;
	}

	public StartAni(): void {

	}

	SetWall() {
		let cell: Cell = this.data;
		this.img_leftWall.visible = !cell.leftWall.isOpen;
		this.img_rightWall.visible = !cell.rightWall.isOpen;
		this.img_upWall.visible = !cell.upWall.isOpen;
		this.img_downWall.visible = !cell.downWall.isOpen;
	}

}