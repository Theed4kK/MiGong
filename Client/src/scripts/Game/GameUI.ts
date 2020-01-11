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

	private scroller_map: eui.Scroller;
	private scroller_role: eui.Scroller;
	// private img_mapBg: eui.Image;
	private img_Bg: eui.Image;
	private img_mapBg: eui.Image;
	private img_role: eui.Image;

	private mapTexture: egret.Bitmap = new egret.Bitmap();

	private group_light: eui.Group;
	private group_map: eui.Group;

	private stepNum: number = 0;
	private virt: VirtualRocker = new VirtualRocker();

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addChild(this.virt);
		this.virt.visible = false;
		this.scroller_map.viewport = this.list_cell;
		// this.scroller_map.horizontalScrollBar.autoVisibility = false;
		// this.scroller_map.horizontalScrollBar.visible = false;
		this.scroller_map.$hitTest = () => { return null; };
		this.GenMiGong();
		this.AddListener();
		egret.log("childrenCreated");
	}

	/**初始化迷宫墙和地面贴图 */
	private InitManageRenders(cells: Cell[]): void {
		GameUI.manageRenders = new ManageRenders(this.list_cell, this.img_mapBg);
		GameUI.manageRenders.InitRenders(cells, this.scroller_map.parent.width, this.scroller_map.parent.height);
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
		let scrollH = this.scroller_map.viewport.scrollH;
		let scrollV = this.scroller_map.viewport.scrollV;
		let moveX, moveY;
		let role = this.img_role;
		let data: any = e.data;
		let isLeft = data.moveX < 0;
		let isUp = data.moveY < 0;
		if (isLeft) {
			moveX = Math.min(Math.abs(data.moveX), scrollH);
		}
		else {
			moveX = Math.min(data.moveX, scrollH + this.scroller_map.width)
		}
		if (data.moveX < 0) {
			if (((role.x - scrollH) < (this.scroller_map.width / 2)) && scrollH > 0) {
				this.scroller_map.viewport.scrollH += Math.max(data.speedX, -scrollH);
				this.scroller_role.viewport.scrollH += Math.max(data.speedX, -scrollH);
			}
		}
		else {
			let groupWidth = this.scroller_map.viewport.contentWidth;
			if (((role.x - scrollH) > (this.scroller_map.width / 2)) && ((scrollH + this.scroller_map.width) < groupWidth)) {
				this.scroller_map.viewport.scrollH += Math.min(data.speedX, groupWidth - scrollH - this.scroller_map.width);
				this.scroller_role.viewport.scrollH += Math.min(data.speedX, groupWidth - scrollH - this.scroller_map.width);
			}
		}
		if (data.moveY < 0) {
			if (((role.y - scrollV) < (this.scroller_map.height / 2)) && scrollV > 0) {
				this.scroller_map.viewport.scrollV += Math.max(data.speedY, -scrollV);
				this.scroller_role.viewport.scrollV += Math.max(data.speedY, -scrollV);
			}
		}
		else {
			let groupHeight = this.scroller_map.viewport.contentHeight;
			if (((role.y - scrollV) > (this.scroller_map.height / 2)) && ((scrollV + this.scroller_map.height) < groupHeight)) {
				this.scroller_map.viewport.scrollV += Math.min(data.speedY, groupHeight - scrollV - this.scroller_map.height);
				this.scroller_role.viewport.scrollV += Math.min(data.speedY, groupHeight - scrollV - this.scroller_map.height);
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
		self.gameControl = new GameControl(this.img_role, this.group_light, 10)

		self.PlayStartAni();
		egret.log("迷宫生成完成");
	}

	/**处理遮罩 需要地图生成完成后调用 */
	private InitMask() {
		let self: GameUI = this;
		self.group_light.x = 0;
		self.group_light.y = 0;
		self.group_light.width = self.list_cell.contentWidth;
		self.group_light.height = self.list_cell.contentHeight;
	}

	/**播放开始动画 */
	private PlayStartAni(): void {
		let obj: CellBgRender = GameUI.manageRenders.currentBgRender;
		this.img_role.x = obj.x;
		this.img_role.y = obj.y + (obj.height / 2);
		egret.Tween.get(this.scroller_map.viewport).to({ scrollH: 0 }, this.scroller_map.viewport.scrollH / 0.5);
		egret.Tween.get(this.img_role).wait(this.scroller_map.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000).call(() => {
			this.img_Bg.touchEnabled = true;
		});
		// obj.StartAni(1000);
		egret.log("开始动画播放完成");
	}

	private SetListScale(): void {
		if (this.scroller_map.scaleX == 0.5) {
			this.scroller_map.scaleX = 1;
			this.scroller_map.scaleY = 1;
		}
		else {
			this.scroller_map.scaleX = 0.5;
			this.scroller_map.scaleY = 0.5;
		}
	}
}