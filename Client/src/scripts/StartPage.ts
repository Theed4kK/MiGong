class StartPage extends UIBase {
	public constructor() {
		super();
		this.once(egret.Event.REMOVED_FROM_STAGE, this.RemoveListeners, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private btn_start: eui.Button;
	private btn_bag: eui.Button;
	private btn_setting: eui.Button;

	protected childrenCreated(): void {
		super.childrenCreated();
		egret.Tween.get(this.btn_start, { loop: true }).to({ alpha: 0.5 }, 500).to({ alpha: 1 }, 500);
		this.AddListeners();
	}

	AddListeners() {
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			// ScreenMovies.MovieStart(5);
			UIBase.OpenUI(GameUI, true);
			UIBase.CloseUI(StartPage);
		}, this)
		this.btn_bag.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(BagUI);
		}, this)
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(Setting);
		}, this)
	}

	RemoveListeners() {
		this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			// ScreenMovies.MovieStart(5);
			UIBase.CloseUI(StartPage);
			UIBase.OpenUI(GameUI);
		}, this)
		this.btn_bag.removeEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(BagUI);
		}, this)
		this.btn_setting.removeEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(Setting);
		}, this)
	}
}