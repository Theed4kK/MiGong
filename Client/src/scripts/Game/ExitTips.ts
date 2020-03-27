class ExitTips extends UIBase {
	public constructor(mode: boolean, point: number, itemNum: number) {
		super(true);
		this.params = { mode: mode, point: point, itemNum: itemNum }
		this.once(egret.Event.ADDED_TO_STAGE, this.Init, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			UIBase.CloseUI(ExitTips);
		}, this);
		this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.dispatchEvent(new egret.Event("ExitMap"));
			UIBase.CloseUI(ExitTips);
		}, this);
		this.txt_tips.textFlow = <Array<egret.ITextElement>>[
			{ text: "中途逃离仅能带走一半宝藏，确认离开？", style: { "textColor": 0xFF0000 } },
			{ text: "\n（弱者才会逃避，强者永远能找到出口！）", style: { "textColor": 0xD37B02, "size": 18, "stroke": 0 } },
		]

	}

	private btn_cancel: eui.Button;
	private btn_exit: eui.Button;
	private txt_tips: eui.Label;

	private group_flee: eui.Group;
	private group_exit: eui.Group;

	//mode为true时表示正常退出
	private params: { mode: boolean, point: number, itemNum: number };
	private Init() {
		let self: ExitTips = this;
		self.group_flee.visible = !self.params.mode;
		self.group_exit.visible = self.params.mode;
		self.txt_tips.text = "中途逃离仅能带走一半奖励，确认退出？";
		self.txt_tips.textColor = 0xFF0000;
		// self.txt_reward.textFlow = <Array<egret.ITextElement>>[
		// 	{ text: "当前已获得探索积分：", style: { "textColor": 0x000000 } },
		// 	{ text: `${self.params.point}\n`, style: { "textColor": 0xFFB477 } },
		// 	{ text: "当前已获得宝藏数量：", style: { "textColor": 0x000000 } },
		// 	{ text: `${self.params.itemNum}\n`, style: { "textColor": 0xFFB477 } },
		// 	{ text: "（宝藏将随机带出一半）", style: { "textColor": 0xFFB477 } },
		// ]
	}
}