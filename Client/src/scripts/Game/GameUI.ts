class GameUI extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.once(egret.Event.REMOVED_FROM_STAGE, this.RemoveListener, this);
	}

	public static manageCells: ManageCells;
	public static manageRenders: ManageRenders;
	private list_wall: eui.List;
	private list_cell: eui.List;

	private btn_return: eui.Image;
	private btn_test: eui.Button;

	private input_col: eui.TextInput;
	private input_speed: eui.TextInput;
	private input_touchError: eui.TextInput;

	private txt_stepNum: eui.Label;

	private gameControl: GameControl;

	private scroller: eui.Scroller;
	// private img_mapBg: eui.Image;
	private img_Bg: eui.Image;
	private img_role: eui.Image;
	private mapTexture: egret.Bitmap = new egret.Bitmap();

	private group_light: eui.Group;
	private group_map:eui.Group;

	private stepNum: number = 0;
	private virt: VirtualRocker = new VirtualRocker();

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addChild(this.virt);
		// this.stage.frameRate = 60;
		this.virt.visible = false;
		this.scroller.horizontalScrollBar.autoVisibility = false;
		this.scroller.horizontalScrollBar.visible = false;
		this.scroller.$hitTest = ()=>{return null;};
		this.GenMiGong();
		this.AddListener();
		egret.log("childrenCreated");
	}

	/**初始化迷宫墙和地面贴图 */
	private InitManageRenders(cells: Cell[]): void {
		GameUI.manageRenders = new ManageRenders(this.list_wall, this.list_cell);
		GameUI.manageRenders.InitRenders(cells);
	}

	private AddListener(): void {
		this.btn_return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ReturnSignCell, this);
		this.btn_test.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TestDb, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		GameUI.manageCells.addEventListener("RefreshCurRender", this.UpdateIndex, this);
		this.gameControl.addEventListener("moveScroll", this.MoveScroll, this);
	}

	private TestDb() {
		ItemManage.GetInstance().GetItem(Common.getRandomInt(1, 3), 1);
	}

	private ReturnSignCell(): void {
		this.gameControl.RoleMoveState(2);
	}

	private MoveScroll(e: egret.Event): void {
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
		this.stepNum++
		this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
	}

	private RemoveListener(): void {
		this.btn_return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TestDb, this);
		this.btn_test.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.TestDb, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		GameUI.manageCells.removeEventListener("RefreshCurRender", this.UpdateIndex, this);
	}

	/**触屏手指移动 */
	private Move(e: egret.TouchEvent): void {
		let angle: number = this.virt.onTouchMove(e);
		this.gameControl.direction = angle;
	}

	private CancelTouch() {
		if (!this.gameControl) { return; }
		this.gameControl.direction = null;
		this.gameControl.RoleMoveState(1);	//停止移动
		this.virt.stop();
		// egret.log("停止触摸");
	}

	private BeginTouch(e: egret.TouchEvent): void {
		if (!this.gameControl) { return; }
		this.virt.x = e.stageX;
		this.virt.y = e.stageY;
		this.virt.start();
		this.gameControl.RoleMoveState(0);	//开始移动
		// egret.log("开始触摸");
	}


	/**生成迷宫 */
	private GenMiGong(): void {
		let row: number = 15;
		// let col: number = Number(this.input_col.text);
		let self: GameUI = this;
		self.txt_stepNum.text = "已探索：0";
		GameUI.manageCells = new ManageCells(GenCells.GetCells());
		self.InitManageRenders(GameUI.manageCells.cells);
		self.InitMask();

		//初始化角色控制器和光照效果
		self.gameControl = new GameControl(this.img_role, this.group_map, 10)

		self.PlayStartAni();
		egret.log("迷宫生成完成");
	}

	/**处理遮罩 需要地图生成完成后调用 */
	private InitMask() {
		let self: GameUI = this;
		// self.img_mapBg.width = self.list.width;
		// self.group_wallBg.width = self.list_wall.width;
		WallRender.hWallHeight * 2;
		self.group_light.x = 0;
		self.group_light.y = 0;
		self.group_light.width = self.group_map.width;
		self.group_light.height = self.group_map.height;
	}

	/**播放开始动画 */
	private PlayStartAni(): void {
		let obj: WallRender = GameUI.manageRenders.currentWallRender;
		this.img_role.x = obj.x;
		this.img_role.y = obj.y + (obj.height / 2);
		egret.Tween.get(this.scroller.viewport).to({ scrollH: 0 }, this.scroller.viewport.scrollH / 0.5);
		egret.Tween.get(this.img_role).wait(this.scroller.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000).call(() => {
			this.img_Bg.touchEnabled = true;
		});
		// obj.StartAni(1000);
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