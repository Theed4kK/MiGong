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
	private txt_moveMode: eui.Label;

	private gameControl: GameControl;

	private scroller_map: eui.Scroller;
	private scroller_role: eui.Scroller;
	private scroller_bg: eui.Scroller;

	private img_Bg: eui.Image;
	private img_role: eui.Image;

	private group_role: eui.Group;
	private group_bg: eui.Group;

	private toggle_moveMode: eui.ToggleSwitch;

	private stepNum: number = 0;
	private virt: VirtualRocker = new VirtualRocker();

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addChild(this.virt);
		this.virt.visible = false;
		this.scroller_map.viewport = this.list_cell;
		this.GenMiGong().then(() => {
			console.log("地图生成完成")
			this.AddListener();
		});
	}

	private AddListener(): void {
		this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		this.list_cell.addEventListener("RefreshCurRender", this.UpdateIndex, this);
		this.group_role.addEventListener("moveScroll", this.MoveScroll, this);
		this.toggle_moveMode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SwitchMoveMode, this)
	}

	private RemoveListener(): void {
		this.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		this.list_cell.removeEventListener("RefreshCurRender", this.UpdateIndex, this);
		this.group_role.removeEventListener("moveScroll", this.MoveScroll, this);
		this.toggle_moveMode.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.SwitchMoveMode, this)
	}

	SwitchMoveMode() {
		if (this.gameControl.moveMode == MOVE_MODE.Rocker) {
			this.img_Bg.touchEnabled = false;
			this.txt_moveMode.text = "当前操作模式：陀螺仪";
			this.virt.visible = false;
			this.CancelTouch();
		}
		else {
			this.txt_moveMode.text = "当前操作模式：摇杆";
			this.img_Bg.touchEnabled = true;
		}
		this.gameControl.MoveModeChange();
	}

	private ExitMap() {
		let exitTips = UIBase.OpenUI(ExitTips, this.txt_stepNum.text, this.txt_stepNum.text);
		exitTips.once("ExitMap", () => {
			this.manageCells.ExitMap();
			UIBase.CloseUI(GameUI);
		}, this)
	}

	private MoveScroll(e: egret.Event): void {
		let scrollH = this.scroller_map.viewport.scrollH;
		let scrollV = this.scroller_map.viewport.scrollV;
		let moveX = 0, moveY = 0;
		let role = this.group_role;
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
		this.gameControl.direction = null;
		this.gameControl.RoleMoveState(1);	//停止移动
		this.virt.visible = false;
	}

	private BeginTouch(e: egret.TouchEvent): void {
		this.virt.start(e.localX, e.localY);
		this.gameControl.RoleMoveState(0);	//开始移动
	}


	/**生成迷宫 */
	private async GenMiGong() {
		let row: number = 15;
		let self: GameUI = this;
		self.txt_stepNum.text = "已探索：0";
		let cells = await GenCells.GetCells();
		self.manageCells = new ManageCells(cells, self.list_cell, self.group_bg);
		self.gameControl = new GameControl(self.group_role, 10, self.manageCells, )
		if (DBManage.GetInstance().userInfo.avatarUrl) {
			RES.getResByUrl(DBManage.GetInstance().userInfo.avatarUrl, self.SetMaskAndFrame, this, RES.ResourceItem.TYPE_IMAGE)
		}
		else {
			self.SetMaskAndFrame();
		}
		self.PlayStartAni();
	}

	private SetMaskAndFrame(res?) {
		let self: GameUI = this;
		if (res) {
			self.img_role.source = res;
		}
		const role_mask = new egret.Shape();
		role_mask.graphics.beginFill(0xff0000);
		role_mask.graphics.drawCircle(self.group_role.width / 2, self.group_role.width / 2, self.group_role.width / 2 - 3);
		role_mask.graphics.endFill();
		self.group_role.addChild(role_mask);
		self.img_role.mask = role_mask;

		const c_m = new egret.Matrix();
		c_m.createGradientBox(self.group_role.width * 2, self.group_role.width * 2, 0, -self.group_role.width, -self.group_role.width);
		const colorGroup = [0, 50, 255];
		const alphaGroup = [0, 0.2, 1];
		const headFrame = new egret.Shape();
		headFrame.graphics.beginGradientFill(egret.GradientType.RADIAL, [0xff0000, 0xff00ff, 0xffff00], alphaGroup, colorGroup, c_m);
		headFrame.graphics.drawCircle(self.group_role.width / 2, self.group_role.width / 2, self.group_role.width / 2);
		headFrame.graphics.endFill();
		self.group_role.addChildAt(headFrame, 0);
	}

	/**播放开始动画 */
	private PlayStartAni(): void {
		let obj: CellBgRender = this.manageCells.currentBgRender;
		this.group_role.x = obj.x;
		this.group_role.y = obj.y + (obj.height / 2);
		egret.Tween.get(this.scroller_map.viewport).to({ scrollH: 0 }, this.scroller_map.viewport.scrollH / 0.5);
		egret.Tween.get(this.group_role).wait(this.scroller_map.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000).call(() => {
			this.img_Bg.touchEnabled = true;
		});
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