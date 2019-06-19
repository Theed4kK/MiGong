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

	private tw:egret.Tween;

	protected dataChanged(): void {
		let cell: Cell = this.data;


	}

	public LightenUp(dir: number, speed: number): void {
		let width: number = this.img_bg.width;
		let height: number = this.img_bg.height;
		this.tw = egret.Tween.get(this.img_bg);
		switch (dir) {
			case 0:
				this.tw.to({ right: width }, 300);
				break;
			case 1:
				this.tw.to({ left: width }, 300);
				break;
			case 2:
				this.tw.to({ top: height }, 300);
				break;
			case 3:
				this.tw.to({ bottom: height }, 300);
				break;
		}
	}

	public StartAni(): void {
		
	}

}