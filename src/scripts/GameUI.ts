class GameUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		// this.addEventListener(eui.UIEvent.COMPLETE, this.OnComplete, this);
	}

	private list: eui.List;
	private list_bg: eui.List;

	private btn_scale: eui.Button;
	private btn_gen: eui.Button;
	private btn_swapMode: eui.Button;

	private input_col: eui.TextInput;
	private input_speed: eui.TextInput;
	private input_touchError: eui.TextInput;

	private txt_stepNum: eui.Label;


	private gameControl: GameControl = new GameControl();

	private scroller: eui.Scroller;
	private bg: eui.Image;
	private img_role: eui.Image;

	private initPos: egret.Point = new egret.Point();
	private index: number = 0;
	private cells: Cell[] = [];
	private touchId: number;
	private touchError: number = 5;
	private stepNum: number = 0;

	private timeOnEnterFrame: number = 0;



	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.btn_scale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
		this.btn_gen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;
		this.img_role.anchorOffsetX = this.img_role.width / 2;
		this.img_role.anchorOffsetY = this.img_role.height / 2;

		let gameControl = this.gameControl;
		gameControl.scroll = this.scroller;
		gameControl.img_role = this.img_role;
	}

	//触屏手指移动
	private Move(e: egret.TouchEvent): void {
		let cell: Cell = this.cells[this.index];
		let rolePos: egret.Point = new egret.Point(this.img_role.x, this.img_role.y);
		let difX: number = Math.abs(e.stageX - this.initPos.x);
		let difY: number = Math.abs(e.stageY - this.initPos.y);
		this.touchError = Number(this.input_touchError.text);
		if (difX <= this.touchError && difY <= this.touchError) {
			return;
		}
		if (difX > difY) {
			this.gameControl.direction = e.stageX > this.initPos.x ? 1 : 0;
		}
		else {
			this.gameControl.direction = e.stageY > this.initPos.y ? 2 : 3;
		}
		this.initPos.x = e.stageX;
		this.initPos.y = e.stageY;
	}

	private CancelTouch() {
		console.log("退出触摸");
		this.touchId == 0;
		this.gameControl.direction = null;
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private BeginTouch(e: egret.TouchEvent): void {
		console.log("开始触摸");
		if (this.touchId == 0) {
			this.touchId = e.touchPointID;
		}
		this.initPos.x = e.stageX;
		this.initPos.y = e.stageY;

		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.timeOnEnterFrame = egret.getTimer();
	}

	private onEnterFrame(e: egret.Event) {
		var pass = egret.getTimer() - this.timeOnEnterFrame;
		this.RoleMove();
		// this.AutoMove();
		this.timeOnEnterFrame = egret.getTimer();
	}


	//角色移动
	private RoleMove(): void {
		if (this.gameControl.direction != null && this.touchId != 0) {
			let speed: number = Number(this.input_speed.text);
			let obj: egret.DisplayObject = this.list.getElementAt(this.index);
			this.gameControl.speed = speed;
			this.gameControl.RoleMove(this.index, obj);	//角色移动
			this.ResetIndex();						//刷新所在cell
		}
	}

	private RefreshCell(): void {
		if (!this.cells[this.index].isPassed) {
			let cellRender: CellBgRender = this.list_bg.getElementAt(this.index) as CellBgRender;
			cellRender.LightenUp(this.gameControl.direction, Number(this.input_speed.text));
			this.cells[this.index].isPassed = true;
		}
	}

	private ResetIndex(): void {
		let obj: egret.DisplayObject = this.list.getElementAt(this.index);
		let left: number = this.img_role.x - (this.img_role.width / 2);
		let right: number = this.img_role.x + (this.img_role.width / 2);
		let up: number = this.img_role.y - (this.img_role.height / 2);
		let bottom: number = this.img_role.y + (this.img_role.height / 2);
		if (right < obj.x) {
			this.index--;
		}
		if (left > obj.x + obj.width) {
			this.index++;
		}
		if (bottom < obj.y) {
			this.index -= Number(this.input_col.text);
		}
		if (up > obj.y + obj.height) {
			this.index += Number(this.input_col.text);
		}
		this.stepNum += this.cells[this.index].isPassed ? 0 : 1;
		this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
		this.RefreshCell();
	}

	private GenMiGong(): void {
		let row: number = 10;
		let col: number = Number(this.input_col.text);
		this.index = 0;
		this.cells = GenCells.GetCells(row, col)
		this.list.dataProvider = new eui.ArrayCollection(this.cells);
		this.list.itemRenderer = CellRender;
		this.list.validateNow();
		this.list.validateDisplayList();
		this.list_bg.dataProvider = new eui.ArrayCollection(this.cells);
		this.list_bg.itemRenderer = CellBgRender;
		this.list_bg.validateNow();
		this.list_bg.validateDisplayList();

		let tile: eui.TileLayout = this.list.layout as eui.TileLayout;
		egret.log(tile.paddingTop);

		this.bg.width = this.list.width;
		let obj: CellRender = this.list.getElementAt(this.index) as CellRender;
		this.img_role.x = obj.x + (obj.width / 2);
		this.img_role.y = obj.y + (obj.height / 2);



		egret.Tween.get(this.scroller.viewport).to({ scrollH: 0 }, this.scroller.viewport.scrollH / 0.5);
		obj.StartAni();
		this.gameControl.cells = this.cells;
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