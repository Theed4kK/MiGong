class GameUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.once(egret.Event.REMOVED_FROM_STAGE, this.RemoveListener, this);
	}

	private genCells: GenCells = new GenCells();
	private list: eui.List;
	private list_bg: eui.List;

	private btn_scale: eui.Button;
	private btn_gen: eui.Button;
	private btn_swapMode: eui.Button;

	private input_col: eui.TextInput;
	private input_speed: eui.TextInput;
	private input_touchError: eui.TextInput;

	private txt_stepNum: eui.Label;

	private gameControl: GameControl;

	private scroller: eui.Scroller;
	private img_mapBg: eui.Image;
	private img_Bg: eui.Image;
	private img_role: eui.Image;

	private initPos: egret.Point = new egret.Point();

	private touchId: number;
	private touchError: number = 5;
	private stepNum: number = 0;
	private virt: VirtualRocker;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.btn_scale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
		this.btn_gen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
		this.input_speed.addEventListener(egret.Event.CHANGE, this.ModifySpeed, this)
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		this.genCells.addEventListener(MyEvent.updateStepNum, this.UpdateStepNum, this);
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;
		this.img_role.anchorOffsetX = this.img_role.width / 2;
		this.img_role.anchorOffsetY = this.img_role.height / 2;
		this.gameControl = new GameControl(this.img_role)
		this.gameControl.speed = Number(this.input_speed.text);
		this.gameControl.genCells = this.genCells;
		let genCells = this.genCells;
		genCells.scroll = this.scroller;
		genCells.wallList = this.list;
		genCells.cellList = this.list_bg;

		this.GenMiGong();
	}

	private UpdateStepNum(): void {
		if (!this.genCells.cells[this.genCells.index].isPassed) {
			this.stepNum++
			this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
		}
	}

	private RemoveListener(): void {
		this.btn_scale.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
		this.btn_gen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
		this.input_speed.removeEventListener(egret.Event.CHANGE, this.ModifySpeed, this)
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
	}

	//触屏手指移动
	private Move(e: egret.TouchEvent): void {
		// let difX: number = Math.abs(e.stageX - this.initPos.x);
		// let difY: number = Math.abs(e.stageY - this.initPos.y);
		// this.touchError = Number(this.input_touchError.text);
		// if (difX < this.touchError && difY < this.touchError) { return; }
		// if (difX > difY) {
		// 	this.gameControl.direction = e.stageX > this.initPos.x ? 1 : 0;
		// }
		// else {
		// 	this.gameControl.direction = e.stageY > this.initPos.y ? 2 : 3;
		// }
		let angle: number = this.virt.onTouchMove(e);
		this.gameControl.direction = angle;
	}

	private CancelTouch() {
		this.gameControl.direction = null;
		this.gameControl.RoleMoveState(1);	//停止移动
		this.virt.stop();
	}

	private BeginTouch(e: egret.TouchEvent): void {
		if (this.list.numElements == 0) { return; }
		this.initPos.x = e.stageX;
		this.initPos.y = e.stageY;
		this.virt.x = e.stageX;
		this.virt.y = e.stageY;
		this.virt.start();
		this.gameControl.RoleMoveState(0);	//开始移动
	}

	private ModifySpeed(): void {
		let speed: number = Number(this.input_speed.text);
		this.gameControl.speed = speed;
	}

	private GenMiGong(): void {
		let row: number = 10;
		let col: number = Number(this.input_col.text);
		this.genCells.index = 0;
		this.txt_stepNum.text = "已探索：0";
		this.genCells.GetCells(row, col)
		this.list.dataProvider = new eui.ArrayCollection(this.genCells.cells);
		this.list.itemRenderer = CellRender;
		this.list.validateNow();
		this.list.validateDisplayList();
		this.list_bg.dataProvider = new eui.ArrayCollection(this.genCells.cells);
		this.list_bg.itemRenderer = CellBgRender;
		this.list_bg.validateNow();
		this.list_bg.validateDisplayList();

		this.img_mapBg.width = this.list.width;
		let obj: CellRender = this.list.getElementAt(this.genCells.index) as CellRender;
		this.img_role.x = obj.x;
		this.img_role.y = obj.y + (obj.height / 2);


		egret.Tween.get(this.scroller.viewport).to({ scrollH: 0 }, this.scroller.viewport.scrollH / 0.5);
		egret.Tween.get(this.img_role).wait(this.scroller.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000);
		let wait: number = obj.StartAni(1000);
		this.img_Bg.touchEnabled = true;
	}

	private SetListScale(): void {
		if (this.scroller.scaleX == 0.5) {
			this.scroller.scaleX = 1;
			this.scroller.scaleY = 1;
		}
		else {
			this.scroller.scaleX = 0.5;
			this.scroller.scaleY = 0.5;
		}
	}
}