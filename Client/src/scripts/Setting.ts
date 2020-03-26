class Setting extends UIBase implements eui.UIComponent {
	public constructor() {
		super(true);
		this.once(egret.Event.REMOVED_FROM_STAGE, () => {
			this.checkBox_moveMode.removeEventListener(egret.Event.CHANGE, this.SettingChanged, this);
			this.checkBox_sound.removeEventListener(egret.Event.CHANGE, this.SettingChanged, this);
			this.checkBox_shock.removeEventListener(egret.Event.CHANGE, this.SettingChanged, this);
			this.checkBox_moveMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ChangeMoveMode, self);
		}, this);
	}

	private checkBox_moveMode: eui.CheckBox;
	private checkBox_sound: eui.CheckBox;
	private checkBox_shock: eui.CheckBox;

	private txt_tips:eui.Label;

	private static config: { moveMode: MOVE_MODE, sound: boolean, shock: boolean };
	static GetConfig() {
		if (!Setting.config) {
			let dataStr = egret.localStorage.getItem("Setting");
			if (dataStr) {
				Setting.config = JSON.parse(dataStr);
			}
			else {
				Setting.config = { moveMode: MOVE_MODE.Rocker, sound: true, shock: true };
			}
		}
		return Setting.config;
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		let self: Setting = this;
		let config = Setting.GetConfig();
		self.checkBox_moveMode.selected = config.moveMode == MOVE_MODE.Gyroscope;
		self.checkBox_sound.selected = config.sound;
		self.checkBox_shock.selected = config.shock;
		if (!egret.Capabilities.isMobile) {
			self.checkBox_moveMode.enabled = false;
			var colorMatrix = [
				0.3, 0.6, 0, 0, 0,
				0.3, 0.6, 0, 0, 0,
				0.3, 0.6, 0, 0, 0,
				0, 0, 0, 1, 0
			];
			var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			self.checkBox_moveMode.filters = [colorFlilter];
			self.txt_tips.visible = true;
		}
		self.checkBox_moveMode.addEventListener(egret.Event.CHANGE, self.SettingChanged, self);
		self.checkBox_moveMode.addEventListener(egret.TouchEvent.TOUCH_TAP, self.ChangeMoveMode, self);
		self.checkBox_sound.addEventListener(egret.Event.CHANGE, self.SettingChanged, self);
		self.checkBox_shock.addEventListener(egret.Event.CHANGE, self.SettingChanged, self);
	}

	private ChangeMoveMode() {
		if (!egret.Capabilities.isMobile) {
			Fly_Tips.SendTips("当前非移动设备，无法使用陀螺仪操作方式");
		}
	}

	SettingChanged() {
		let self: Setting = this;
		Setting.config.moveMode = self.checkBox_moveMode.selected ? MOVE_MODE.Gyroscope : MOVE_MODE.Rocker;
		Setting.config.sound = self.checkBox_sound.selected;
		Setting.config.shock = self.checkBox_shock.selected;
		egret.localStorage.setItem("Setting", JSON.stringify(Setting.config));
		Fly_Tips.SendTips("设置已保存");

	}

}
