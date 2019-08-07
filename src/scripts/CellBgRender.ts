class CellBgRender extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
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
			this.img_bg.visible = false;
			cell.isPassed = true;
			return;
		}
		this.img_bg.visible = false;
		if (cell.id == 1 && !cell.leftWall.isOpen) {
			this.img_bg.left = CellRender.vWallwidth / 2;
		}
		if (cell.upCell != null && cell.upCell.id == 0 && !cell.upWall.isOpen) {
			this.img_bg.top = CellRender.hWallHeight / 2;
		}
		//最右下角的出口标志
		if (cell.rightCell == null && cell.downCell == null) {
			this.img_exitSign.visible = true;
		}
		//左边边界格子
		if (cell.leftCell == null) {
			this.img_bg.left = CellRender.vWallwidth / 2;
		}
		//右边边界格子
		if (cell.rightCell == null) {
			this.img_bg.right = CellRender.vWallwidth / 2;
		}
		//上边边界格子
		if (cell.upCell == null) {
			this.img_bg.top = CellRender.hWallHeight / 2;
		}
		//下边边界格子
		if (cell.downCell == null) {
			this.img_bg.bottom = CellRender.hWallHeight / 2;
		}
	}

	public LightenUp(dir: number, speed: number): void {
		egret.Tween.get(this.img_bg).to({ alpha: 0 }, 1000);
	}

	public RefreshBg(type: number): void {
		switch (type) {
			case 0: egret.Tween.get(this.img_bg).to({ right: CellRender.vWallwidth / 2 }, 500); break;
			case 1: egret.Tween.get(this.img_bg).to({ left: CellRender.vWallwidth / 2 }, 500); break;
			case 2: egret.Tween.get(this.img_bg).to({ bottom: CellRender.hWallHeight / 2 }, 500); break;
			case 3: egret.Tween.get(this.img_bg).to({ top: CellRender.hWallHeight / 2 }, 500); break;
		}
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