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

	public LightenUp(dir: number, speed: number): void {
		this.tw = egret.Tween.get(this.img_bg);
		this.tw.to({ alpha: 0 }, 1000);
	}

	public StartAni(): void {

	}

}