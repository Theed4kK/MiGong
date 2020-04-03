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

	private img_role: eui.Image;
	private img_levelIcon: eui.Image;

	private txt_roleName: eui.Label;
	private txt_levelTips: eui.Label;

	private group_userInfo: eui.Group;

	protected childrenCreated(): void {
		super.childrenCreated();
		egret.Tween.get(this.btn_start, { loop: true }).to({ alpha: 0.75 }, 2500).to({ alpha: 1 }, 2500);
		DBManage.GetInstance().Init(this.width, this.height).then(res => {
			this.SetUserInfo();
		});
	}

	private SetUserInfo() {
		let self: StartPage = this;
		self.group_userInfo.visible = true;
		self.AddListeners();
		if (DBManage.GetInstance().userInfo.avatarUrl) {
			RES.getResByUrl(DBManage.GetInstance().userInfo.avatarUrl, (res) => {
				self.img_role.source = res;
			}, self, RES.ResourceItem.TYPE_IMAGE)
		}
		if (DBManage.GetInstance().userInfo.nickName) {
			self.txt_roleName.text = DBManage.GetInstance().userInfo.nickName;
		}
		PlayerDataManage.GetInstance().Getdata().then(res => {
			self.img_levelIcon.source = Config.GetInstance().config_level[res.level].icon;
			self.txt_levelTips.text = `Lv.${res.level} ${Config.GetInstance().config_level[res.level].name}`
		})
	}

	private EnterMaze() {
		UIBase.OpenUI(GameUI);
		UIBase.CloseUI(StartPage);
	}

	AddListeners() {
		this.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.EnterMaze, this)
		this.btn_bag.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(BagUI);
		}, this)
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(Setting);
		}, this)
	}

	RemoveListeners() {
		this.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.EnterMaze, this)
		this.btn_bag.removeEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(BagUI);
		}, this)
		this.btn_setting.removeEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.OpenUI(Setting);
		}, this)
	}
}