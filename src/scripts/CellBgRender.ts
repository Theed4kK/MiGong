class CellBgRender extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private img_bg: eui.Image;
	private img_exitSign: eui.Image;

	private tw_autoReturn: egret.Tween;

	protected dataChanged(): void {
		let cell: Cell = this.data;
		if (cell.id == 0) {
			this.img_bg.visible = true;
		}
		else {
			this.img_bg.visible = false;
		}
	}

	public LightenUp(): void {
		this.img_bg.visible = true;
	}

	public SetReturnSign(): void {
		this.img_exitSign.visible = true;
	}

	public HideReturnSign(): void {
		this.img_exitSign.visible = false;
	}

	public StartAni(): void {

	}

}