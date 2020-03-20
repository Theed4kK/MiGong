class GameUI extends UIBase {
	public constructor() {
		super();
		this.once(egret.Event.REMOVED_FROM_STAGE, this.RemoveListener, this);
	}

	public manageCells: ManageCells;
	private list_cell: eui.List;
	private list_reward: eui.List;

	private btn_exit: eui.Button;

	private input_col: eui.TextInput;
	private input_speed: eui.TextInput;
	private input_touchError: eui.TextInput;

	private txt_stepNum: eui.Label;
	private txt_mapName: eui.Label;

	private gameControl: GameControl;

	private scroller_map: eui.Scroller;
	private scroller_role: eui.Scroller;
	private scroller_bg: eui.Scroller;

	private img_Bg: eui.Image;
	private img_role: eui.Image;
	private img_map: eui.Image;

	private group_role: eui.Group;
	private group_bg: eui.Group;
	private group_light: eui.Group;

	private stepNum: number = 0;
	private virt: VirtualRocker;

	protected childrenCreated(): void {
		super.childrenCreated();
		let self: GameUI = this;
		if (Setting.GetConfig().moveMode == MOVE_MODE.Rocker) {
			self.virt = new VirtualRocker();
			self.addChild(self.virt);
			self.virt.visible = false;
		}

		self.scroller_map.viewport = this.list_cell;
		self.GenMiGong().then(() => {
			console.log("地图生成完成")
			PlayerDataManage.GetInstance().Getdata().then(res => {
				self.txt_mapName.text = Config.GetInstance().config_map[res.level].name;
			})
			self.img_Bg.touchEnabled = Setting.GetConfig().moveMode == MOVE_MODE.Rocker;
			self.gameControl = new GameControl(self.group_role, 10, self.manageCells, self.group_light)
			self.AddListener();
		});
	}

	/**生成迷宫 */
	private async GenMiGong() {
		let row: number = 15;
		let self: GameUI = this;
		self.txt_stepNum.text = "已探索：0";
		let cells = await GenCells.GetCells();
		self.manageCells = new ManageCells(cells, self.list_cell, self.group_bg);
		self.img_map.width = self.list_cell.contentWidth;
		self.img_map.height = self.list_cell.contentHeight;
		if (DBManage.GetInstance().userInfo.avatarUrl) {
			RES.getResByUrl(DBManage.GetInstance().userInfo.avatarUrl, self.SetMaskAndFrame, this, RES.ResourceItem.TYPE_IMAGE)
		}
		else {
			self.SetMaskAndFrame();
		}
		self.PlayStartAni();
	}

	private AddListener(): void {
		this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		// GameEvent.addEventListener(GameEvent.RefreshCurRender, this.UpdateIndex, this);
		GameEvent.addEventListener(GameEvent.GetItem, this.UpdateItem, this);
		GameEvent.addEventListener(GameEvent.MoveScroll, this.MoveScroll, this);
	}

	private RemoveListener(): void {
		this.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		GameEvent.removeEventListener(GameEvent.GetItem, this.UpdateItem, this);
		GameEvent.removeEventListener(GameEvent.MoveScroll, this.MoveScroll, this);
	}

	private ExitMap() {
		let exitTips = UIBase.OpenUI(ExitTips, this.txt_stepNum.text, this.txt_stepNum.text);
		exitTips.once("ExitMap", () => {
			this.manageCells.ExitMap();
			UIBase.CloseUI(GameUI, true);
			UIBase.OpenUI(StartPage);
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

	private UpdateItem(e: egret.Event): void {
		// this.stepNum++
		// this.txt_stepNum.text = "已探索：" + this.stepNum.toString();
		let data: { id: number, value: number }[] = e.data;
		this.list_reward.dataProvider = new eui.ArrayCollection(data);
		this.list_reward.itemRenderer = GameItemRender;
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
		let obj: WallRender = this.manageCells.currentBgRender;
		this.group_role.x = obj.x;
		this.group_role.y = obj.y + (obj.height / 2);
		egret.Tween.get(this.scroller_map.viewport).to({ scrollH: 0 }, this.scroller_map.viewport.scrollH / 0.5);
		egret.Tween.get(this.group_role).wait(this.scroller_map.viewport.scrollH / 0.5).to({ x: obj.x + (obj.width / 2) }, 1000).call(() => {
			this.img_Bg.touchEnabled = true;
		});
	}
}

