class UIBase extends eui.Component implements eui.UIComponent {
	public constructor(bgClose: boolean = false) {
		super();
		this.once(egret.Event.ADDED_TO_STAGE, () => {
			if (bgClose) {
				this.addChild(this.bg);
				this.bg.graphics.beginFill(0x000000, 0.7);
				this.bg.graphics.drawRect(0, 0, this.width, this.height);
				this.bg.graphics.endFill();
				this.setChildIndex(this.bg, 0);
				this.bg.touchEnabled = true;
				this.bg.once(egret.TouchEvent.TOUCH_TAP, () => {
					let self: UIBase = this;
					this.parent.removeChild(self)
				}, this);
			}
		}, this);

	}

	private bg: egret.Sprite = new egret.Sprite();
	protected needConstructor: boolean = false;

	public static stage: egret.Stage;

	private static uiList: { [name: string]: any } = {};

	public static OpenUI<T>(creator: { new (...arg): T }, ...arg): T {
		let className = creator.prototype.__class__;
		let ui: any = UIBase.uiList[className];
		egret.log(`打开界面：${className}`)
		if (ui) {
			if (ui.needConstructor) {
				UIBase.stage.removeChild(ui);
				ui = new creator(...arg);
				UIBase.uiList[className] = ui;
				UIBase.stage.addChild(ui);
			}
			ui.visible = true;
			return ui;
		}
		else {
			ui = new creator(...arg);
			UIBase.uiList[className] = ui;
			UIBase.stage.addChild(ui);
			// ui.y = 145;
		}
		return ui;
	}

	public static CloseUI<T>(creator: { new (...arg): T }): boolean {
		let className = creator.prototype.__class__;
		let ui: any = UIBase.uiList[className];
		if (ui) {
			ui.visible = false;
			return true;
		}
		else {
			console.log("尝试关闭一个未打开过的UI");
			return false;
		}


	}



}