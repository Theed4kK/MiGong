class GameUI extends UIBase {
	public constructor() {
		super();
		this.once(egret.Event.REMOVED_FROM_STAGE, this.RemoveListener, this);
	}

	public manageCells: ManageCells;
	private list_cell: eui.List;

	private btn_exit: eui.Button;

	private input_col: eui.TextInput;
	private input_speed: eui.TextInput;
	private input_touchError: eui.TextInput;

	private txt_stepNum: eui.Label;

	private gameControl: GameControl;

	private scroller_map: eui.Scroller;
	private scroller_role: eui.Scroller;
	private scroller_bg: eui.Scroller;
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
		this.GenMiGong();
		this.AddListener();
	}

	private AddListener(): void {
		this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		this.manageCells.addEventListener("RefreshCurRender", this.UpdateIndex, this);
		this.gameControl.addEventListener("moveScroll", this.MoveScroll, this);
	}

	private RemoveListener(): void {
		this.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		this.manageCells.removeEventListener("RefreshCurRender", this.UpdateIndex, this);
		this.gameControl.removeEventListener("moveScroll", this.MoveScroll, this);
	}

	private ExitMap() {
		let exitTips = UIBase.OpenUI(ExitTips,this.txt_stepNum.text,this.txt_stepNum.text);
		exitTips.once("ExitMap", () => {
			this.manageCells.ExitMap();
			UIBase.CloseUI(GameUI);
			egret.log("退出地图");
		}, this)
	}

	private ReturnSignCell(): void {
		this.gameControl.RoleMoveState(2);
	}

	private MoveScroll(e: egret.Event): void {
		let scrollH = this.scroller_map.viewport.scrollH;
		let scrollV = this.scroller_map.viewport.scrollV;
		let moveX = 0, moveY = 0;
		let role = this.img_role;
		let data: any = e.data;
		let isLeft = data.moveX < 0 ? -1 : 1;
		let isUp = data.moveY < 0 ? -1 : 1;
		if ((isLeft > 0 && role.x >= this.scroller_map.width / 2) || (isLeft < 0 && role.x <= this.scroller_map.viewport.contentWidth - this.scroller_map.width / 2)) {
			let moveX_min = isLeft < 0 ? scrollH : this.scroller_map.viewport.contentWidth - scrollH - this.scroller_map.width;
			moveX = Math.min(Math.abs(data.moveX), Math.abs(moveX_min));
		}
		if ((isUp > 0 && role.y >= this.scroller_map.height / 2) || (isUp < 0 && role.y <= this.scroller_map.viewport.contentHeight - this.scroller_map.height / 2)) {
			let moveY_min = isUp < 0 ? scrollV : this.scroller_map.viewport.contentHeight - scrollV - this.scroller_map.height;
			moveY = Math.min(Math.abs(data.moveY), Math.abs(moveY_min));
		}
		let move = (...scrolls: eui.Scroller[]) => {
			scrolls.forEach(s => {
				s.viewport.scrollH += (isLeft * moveX);
				s.viewport.scrollV += (isUp * moveY);
			})
		}
		move(this.scroller_map, this.scroller_role, this.scroller_bg);
	}

	private UpdateIndex(e: egret.Event): void {
		this.stepNum++
		this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
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
	}

	private BeginTouch(e: egret.TouchEvent): void {
		if (!this.gameControl) { return; }
		this.virt.x = e.localX;
		this.virt.y = e.localY;
		this.virt.start();
		this.gameControl.RoleMoveState(0);	//开始移动
	}


	/**生成迷宫 */
	private GenMiGong(): void {
		let row: number = 15;
		// let col: number = Number(this.input_col.text);
		let self: GameUI = this;
		self.txt_stepNum.text = "已探索：0";
		this.manageCells = new ManageCells(GenCells.GetCells(), this.list_cell, this.img_mapBg);
		self.InitMask();
		//初始化角色控制器和光照效果
		self.gameControl = new GameControl(this.img_role, this.group_light, 10, this.manageCells)
		self.PlayStartAni();
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
		let obj: CellBgRender = this.manageCells.currentBgRender;
		this.img_role.x = obj.x;
		this.img_role.y = obj.y + (obj.height / 2);
		egret.Tween.get(this.scroller_map.viewport).to({ scrollH: 0 }, this.scroller_map.viewport.scrollH / 0.5);
		egret.Tween.get(this.img_role).wait(this.scroller_map.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000).call(() => {
			this.img_Bg.touchEnabled = true;
		});
		// obj.StartAni(1000);
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