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

	private tw: egret.Tween;

	protected dataChanged(): void {
		let cell: Cell = this.data;
		if (cell.id == 0) {
			this.img_bg.visible = false;
		}
		if (cell.rightCell == null && cell.downCell == null) {
			this.img_exitSign.visible = true;
		}
	}

	public LightenUp(dirX: number,dirY: number, speed: number): void {
		let width: number = this.img_bg.width;
		let height: number = this.img_bg.height;
		this.tw = egret.Tween.get(this.img_bg);
		// if(dirX )
		switch (dirX) {
			case 0:
				this.tw.to({ right: width }, 300);
				break;
			case 1:
				this.tw.to({ left: width }, 300);
				break;
		}
		switch (dirY) {
			case 0:
				this.tw.to({ top: height }, 300);
				break;
			case 1:
				this.tw.to({ bottom: height }, 300);
				break;
		}
	}

	public StartAni(): void {

	}

}