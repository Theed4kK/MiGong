class ExitTips extends UIBase {
	public constructor(point: string, itemNum: string) {
		super(true);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
			this.txt_tips.text = `中途逃离仅能带走一半战利品，确认退出迷宫？\n当前已探索：${point}\n当前已找到宝藏：${itemNum}`;
		}, this);
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

}