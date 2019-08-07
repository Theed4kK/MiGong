class GameUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.once(egret.Event.REMOVED_FROM_STAGE, this.RemoveListener, this);
	}

	public static manageCells: ManageCells;
	public static manageRenders: ManageRenders;
	private list: eui.List;
	private list_bg: eui.List;

	private btn_scale: eui.Button;
	private btn_gen: eui.Button;
	private btn_swapMode: eui.Button;
	private btn_return: eui.Image;

	private input_col: eui.TextInput;
	private input_speed: eui.TextInput;
	private input_touchError: eui.TextInput;

	private txt_stepNum: eui.Label;

	private gameControl: GameControl;

	private scroller: eui.Scroller;
	private img_mapBg: eui.Image;
	private img_Bg: eui.Image;
	private img_role: eui.Image;
	private mapTexture: egret.Bitmap = new egret.Bitmap();

	private stepNum: number = 0;
	private virt: VirtualRocker = new VirtualRocker();;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.addChild(this.virt);
		this.virt.visible = false;
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;
		this.GenMiGong();
		this.AddListener();
		egret.log("childrenCreated");
	}

	/**初始化迷宫墙和地面贴图 */
	private InitManageRenders(cells: Cell[]): void {
		GameUI.manageRenders = new ManageRenders(this.list, this.list_bg);
		GameUI.manageRenders.InitRenders(cells);
	}

	private AddListener(): void {
		this.btn_scale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
		this.btn_gen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
		this.btn_swapMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMapTextrue, this);
		this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ReturnSignCell, this);
		this.input_speed.addEventListener(egret.Event.CHANGE, this.ModifySpeed, this)
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		GameUI.manageCells.addEventListener("RefreshCurRender", this.UpdateIndex, this);
		this.gameControl.addEventListener(MyEvent.moveScroll, this.MoveScroll, this);
	}


	private ReturnSignCell(): void {
		this.gameControl.RoleMoveState(2);
	}

	private MoveScroll(e: MyEvent): void {
		let scrollH = this.scroller.viewport.scrollH;
		let data: any = e.data;
		if (data.speed < 0) {
			if (((data.x - scrollH) < (this.scroller.width / 2)) && scrollH > 0) {
				this.scroller.viewport.scrollH += Math.max(data.speed, -scrollH);
			}
		}
		else {
			let groupWidth = this.scroller.viewport.measuredWidth;
			if (((data.x - scrollH) > (this.scroller.width / 2)) && ((scrollH + this.scroller.width) < groupWidth)) {
				this.scroller.viewport.scrollH += Math.min(data.speed, groupWidth - scrollH - this.scroller.width);
			}
		}
	}

	private UpdateIndex(e: egret.Event): void {
		if (!GameUI.manageCells.currentCell.isPassed) {
			this.stepNum++
			this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
		}
	}

	private RemoveListener(): void {
		this.btn_scale.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SetListScale, this);
		this.btn_gen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
		this.btn_swapMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GenMiGong, this);
		this.input_speed.removeEventListener(egret.Event.CHANGE, this.ModifySpeed, this)
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
	}

	/**触屏手指移动 */
	private Move(e: egret.TouchEvent): void {
		let angle: number = this.virt.onTouchMove(e);
		this.gameControl.direction = angle;
	}

	private CancelTouch() {
		this.gameControl.direction = null;
		this.gameControl.RoleMoveState(1);	//停止移动
		this.virt.stop();
		egret.log("停止触摸");
	}

	private BeginTouch(e: egret.TouchEvent): void {
		if (this.list.numElements == 0) { return; }
		this.virt.x = e.stageX;
		this.virt.y = e.stageY;
		this.virt.start();
		this.gameControl.RoleMoveState(0);	//开始移动
		egret.log("开始触摸");
	}

	private ModifySpeed(): void {
		this.gameControl.speed = Number(this.input_speed.text);
	}

	/**生成迷宫 */
	private GenMiGong(): void {
		let row: number = 15;
		let col: number = Number(this.input_col.text);
		this.txt_stepNum.text = "已探索：0";
		GameUI.manageCells = new ManageCells(GenCells.GetCells(row, col));
		this.InitManageRenders(GameUI.manageCells.cells);
		this.GenMapTextrue();
		this.img_mapBg.width = this.list.width;
		this.gameControl = new GameControl(this.img_role, Number(this.input_speed.text))
		this.PlayStartAni();
		egret.log("迷宫生成完成");
	}

	/**生成地图底图 */
	private GenMapTextrue(): void {
		let group: eui.Group = <eui.Group>this.scroller.viewport;
		if (this.mapTexture.parent == group) { group.removeChild(this.mapTexture); }
		var rt: egret.RenderTexture = new egret.RenderTexture();
		rt.drawToTexture(this.list);
		var _map = new egret.Bitmap();
		_map.texture = rt;
		this.mapTexture = _map;
		group.addChildAt(_map, group.getChildIndex(this.list_bg) - 1);
		this.list.visible = false;
		egret.log("地图底图生成完成");
	}

	/**播放开始动画 */
	private PlayStartAni(): void {
		let obj: CellRender = GameUI.manageRenders.currentRender;
		this.img_role.x = obj.x;
		this.img_role.y = obj.y + (obj.height / 2);
		egret.Tween.get(this.scroller.viewport).to({ scrollH: 0 }, this.scroller.viewport.scrollH / 0.5);
		egret.Tween.get(this.img_role).wait(this.scroller.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000).call(() => {
			this.img_Bg.touchEnabled = true;
		});
		obj.StartAni(1000);
		egret.log("开始动画播放完成");
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