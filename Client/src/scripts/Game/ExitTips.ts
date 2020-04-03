class ExitTips extends UIBase {
	/**mode为true时为正常退出 */
	public constructor(mode: boolean, length: number, rewards: eui.ArrayCollection, effectiveLength: number) {
		super(true);
		this.params = { mode: mode, length: length, rewards: rewards, effectiveLength: effectiveLength }
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	/**mode为true时为正常退出，length 玩家总步长，rewards 玩家获得道具数据，effectiveLength 玩家有效探索长度 */
	private params: { mode: boolean, length: number, rewards: eui.ArrayCollection, effectiveLength: number };
	private btn_cancel: eui.Button;
	private btn_exit: eui.Button;
	private btn_exit0: eui.Button;
	private btn_exit1: eui.Button;
	private txt_tips: eui.Label;
	private txt_cancel: eui.Label;
	private txt_title: eui.Label;
	private txt_rewardTips: eui.Label;
	private txt_pointNum: eui.BitmapLabel;
	private txt_evaluate: eui.BitmapLabel;
	private txt_effectiveLength: eui.BitmapLabel;
	private txt_length: eui.BitmapLabel;


	private group_flee: eui.Group;
	private group_exit: eui.Group;

	private list_reward: eui.List;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.Init();
		this.txt_cancel.textFlow = <Array<egret.ITextElement>>[
			{ text: this.txt_cancel.text, style: { "underline": true } }
		]
		if (!this.params.rewards || this.params.rewards.length == 0) {
			this.txt_rewardTips.text = "暂未寻找到任何宝藏";
		}
	}


	private Init() {
		let self: ExitTips = this;
		self.btn_exit0.visible = self.params.mode;
		self.btn_exit1.visible = !self.params.mode;
		self.group_flee.visible = false;
		self.group_exit.visible = true;
		self.list_reward.dataProvider = self.params.rewards;
		self.list_reward.itemRenderer = GameItemRender;
		let itemPoint = 0;
		for (let i = 0; i < self.params.rewards.length; i++) {
			let itemInfo: { id: number, value: number } = self.params.rewards.getItemAt(i);
			let itemValue = Config.GetInstance().config_item[itemInfo.id].point;
			itemPoint += itemValue * itemInfo.value;
		}
		self.txt_pointNum.text = "" + itemPoint;
		self.txt_length.text = "" + self.params.length;
		self.txt_effectiveLength.text = "" + self.params.effectiveLength;
		// self.txt_evaluate.text = "" + self.params.effectiveLength;

		self.txt_cancel.once(egret.TouchEvent.TOUCH_TAP, () => { UIBase.CloseUI(ExitTips) }, self);
		//到达出口选择离开
		if (self.params.mode) {
			self.txt_title.text = "恭喜你找到迷宫的出口";
			self.btn_exit0.once(egret.TouchEvent.TOUCH_TAP, self.Settlement, self);
		}
		//选择中途逃离
		else {
			self.txt_title.text = "你还未找到迷宫出口";
			//选择逃离事件
			self.btn_exit1.once(egret.TouchEvent.TOUCH_TAP, () => {
				PlayerDataManage.GetInstance().Getdata().then(res => {
					self.txt_tips.textFlow = <Array<egret.ITextElement>>[
						{ text: "从入口逃离将扣除 " },
						{ text: "" + res.level * 100, style: { "textColor": 0xff0000 } },
						{ text: " 点信仰值，确认逃离？" }
					]
				})
				//确认中途逃离事件
				self.btn_exit.once(egret.TouchEvent.TOUCH_TAP, self.Settlement, self);
				//取消逃离事件
				self.btn_cancel.once(egret.TouchEvent.TOUCH_TAP, () => {
					UIBase.CloseUI(ExitTips);
				}, self);
				self.group_exit.visible = false;
				self.group_flee.visible = true;
			}, self);
		}
	}

	/**中途逃离扣除点数 */
	private DeductionPoint() {
		PlayerDataManage.GetInstance().Getdata().then(res => {
			PlayerDataManage.GetInstance().GetPoint(-res.level * 100);
		})
	}

	/**结算处理，关闭UI，中途逃离扣除点数，带出物品 */
	private Settlement() {
		if (!this.params.mode) {
			this.DeductionPoint();
		}
		UIBase.CloseUI(GameUI, true);
		UIBase.CloseUI(ExitTips);
		UIBase.OpenUI(StartPage);
		if (this.params.rewards.length > 0) {
			ItemManage.GetInstance().GetItems(this.params.rewards);
		}
		PlayerDataManage.GetInstance().GetPoint(this.params.effectiveLength);
	}


}