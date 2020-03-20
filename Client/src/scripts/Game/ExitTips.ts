class ExitTips extends UIBase {
	public constructor(mode:boolean,point: number, itemNum: number) {
		super(true);
		this.params = {mode:mode,point: point, itemNum: itemNum}
		this.once(egret.Event.ADDED_TO_STAGE,this.Init, this);
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
	}

	private btn_cancel: eui.Button;
	private btn_exit: eui.Button;
	private txt_tips: eui.Label;
	private txt_reward: eui.Label;
	

	//mode为true时表示正常退出
	private params:{mode:boolean,point: number, itemNum: number};
	private Init(){
		let self :ExitTips = this;
		if(self.params.mode){
			self.txt_tips.text = "恭喜您找到迷宫出口！";
			self.txt_tips.textColor = 0x8AFF00;
		}
		else{
			self.txt_tips.text = "中途逃离仅能带走一半奖励，确认退出？";
			self.txt_tips.textColor = 0xFF0000;
		}
		self.txt_reward.textFlow = <Array<egret.ITextElement>>[
			{text:"当前已获得探索积分：",style:{"textColor":0x000000}},
			{text:`${self.params.point}\n`,style:{"textColor":0xFFB477}},
			{text:"当前已获得宝藏数量：",style:{"textColor":0x000000}},
			{text:`${self.params.itemNum}\n`,style:{"textColor":0xFFB477}},
			{text:"（宝藏将随机带出一半）",style:{"textColor":0xFFB477}},
		]
	}
}