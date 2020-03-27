class UIBase extends eui.Component implements eui.UIComponent {
	public constructor(bgClose: boolean = false) {
		super();
		this.bgClose = bgClose;
	}

	private bgClose: boolean = false;

	protected childrenCreated() {
		super.childrenCreated();
		let self: UIBase = this;
		//界面适配
		if (self.width >= UIBase.UILayer.width && self.height >= UIBase.UILayer.height) {
			self.width = UIBase.UILayer.width;
			self.height = UIBase.UILayer.height;
		}
		else {
			//非全屏界面是否需要缩放，一般适用于背景无法拉伸且大小比例超出最大比例的界面
			if (self.isScale) {
				let scale = Math.min(UIBase.UILayer.width / self.width, UIBase.UILayer.height / self.height);
				self.scaleX = scale;
				self.scaleY = scale;
			}
			else {
				self.width = Math.min(self.width, UIBase.UILayer.width);
				self.height = Math.min(self.height, UIBase.UILayer.height);
			}
			let _width = self.width * self.scaleX;
			let _height = self.height * self.scaleY;
			self.horizontalCenter = 0;
			self.verticalCenter = 0;
			if (self.bgClose) {
				let bg: egret.Sprite = new egret.Sprite();
				self.addChildAt(bg, 0);
				bg.graphics.beginFill(0x000000, 0.8);
				bg.graphics.drawRect(0, 0, UIBase.UILayer.width / self.scaleX, UIBase.UILayer.height / self.scaleY);
				bg.graphics.endFill();
				bg.touchEnabled = true;
				bg.anchorOffsetX = (bg.width - self.width) / 2;
				bg.anchorOffsetY = (bg.height - self.height) / 2;
				bg.x = 0;
				bg.y = 0;
				bg.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
					self.visible = false;
				}, self);
			}
		}
	}

	public static UILayer: eui.UILayer;

	protected isScale: boolean = false;

	private static uiList: { [name: string]: UIBase } = {};
	private static bmp = new egret.Bitmap();
	public static OpenUI<T>(creator: { new (...arg): UIBase }, ...arg): UIBase {
		let className = creator.prototype.__class__;
		let ui: UIBase = UIBase.uiList[className];
		if (!ui || arg.length > 0) {
			if (ui) {
				UIBase.UILayer.removeChild(ui);
			}
			ui = new creator(...arg);
			UIBase.uiList[className] = ui;
			UIBase.UILayer.addChild(ui);
		} else {
			ui.dispatchEvent(new egret.Event("OnOpen"));
			ui.visible = true;
		}
		return ui;
	}

	public static CloseUI<T>(creator: { new (...arg): T }, remove: boolean = false): boolean {
		let className = creator.prototype.__class__;
		let ui: UIBase = UIBase.uiList[className];
		if (ui) {
			if (remove) {
				UIBase.UILayer.removeChild(ui);
				delete UIBase.uiList[className];
			}
			else {
				ui.visible = false;
			}
			return true;
		}
		else {
			console.log("尝试关闭一个未打开过的UI");
			return false;
		}
	}
}