class StartPage extends UIBase {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private btn_start: eui.Button;
	private btn_bag: eui.Button;

	protected childrenCreated(): void {
		super.childrenCreated();
		egret.Tween.get(this.btn_start, { loop: true }).to({ alpha: 0.5 }, 500).to({ alpha: 1 }, 500);
		this.AddListeners();
	}

	AddListeners() {
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(GameUI);
			ScreenMovies.MovieStart(5, () => {
			});
		}, this)
		this.btn_bag.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(BagUI);
		}, this)
	}
}