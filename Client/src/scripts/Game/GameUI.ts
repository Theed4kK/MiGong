class GameUI extends UIBase {
	public constructor() {
		super();
		this.once(egret.Event.REMOVED_FROM_STAGE, this.RemoveListeners, this);
	}

	public manageCells: ManageCells;
	private list_cell: eui.List;
	private list_wall: eui.List;
	private list_reward: eui.List;

	private btn_exit: eui.Button;

	private input_col: eui.TextInput;
	private input_speed: eui.TextInput;
	private input_touchError: eui.TextInput;

	private txt_stepNum: eui.Label;
	private txt_mapName: eui.Label;

	private gameControl: GameControl;

	private scroller_map: eui.Scroller;

	private img_Bg: eui.Image;
	private img_role: eui.Image;
	private bmp_cell: egret.Bitmap;

	private group_map: eui.Group;
	private group_role: eui.Group;
	private group_light: eui.Group;

	private stepNum: number = 0;
	private virt: VirtualRocker;
	private view: egret.Rectangle = new egret.Rectangle(0, 0, 30, 30);
	private display_wall: { con: egret.DisplayObjectContainer, bmps: egret.Bitmap[] };
	private display_cell: { con: egret.DisplayObjectContainer, bmps: egret.Bitmap[] };


	private loading = new LoadingUI;
	protected childrenCreated(): void {
		super.childrenCreated();
		let self: GameUI = this;
		self.addChild(self.loading);
		if (Setting.GetConfig().moveMode == MOVE_MODE.Rocker) {
			self.virt = new VirtualRocker();
			self.addChild(self.virt);
			self.virt.visible = false;
		}
		self.scroller_map.parent.$hitTest = () => null;
		PlayerDataManage.GetInstance().Getdata().then(res => {
			self.txt_mapName.text = Config.GetInstance().config_map[res.level].name;
		})
		self.AddListener();
		self.GenMiGong();
	}

	private arrlist: eui.ArrayCollection;
	/**生成迷宫 */
	private async GenMiGong() {
		let self: GameUI = this;
		let cells = await GenCells.GetCells();
		self.arrlist = new eui.ArrayCollection(cells);
		self.addEventListener(egret.Event.ENTER_FRAME, self.CreateMapBg, self);
		if (DBManage.GetInstance().userInfo.avatarUrl) {
			RES.getResByUrl(DBManage.GetInstance().userInfo.avatarUrl, self.SetMaskAndFrame, this, RES.ResourceItem.TYPE_IMAGE)
		}
		else {
			self.SetMaskAndFrame();
		}
	}

	private frameTime = 0;
	/** */
	private CreateMapBg() {
		let self: GameUI = this;
		switch (self.frameTime) {
			case 0:
				self.loading.onProgress(1, 3);
				self.frameTime = 1000;
				self.scroller_map.getLayoutBounds(self.view);
				self.list_wall.dataProvider = self.arrlist;
				self.list_wall.itemRenderer = WallRender;
				self.list_wall.validateNow();
				self.list_wall.validateDisplayList();
				self.display_wall = Common.DisPlayToBmps(self.list_wall);
				self.group_map.addChildAt(self.display_wall.con, 0);

				self.list_wall.parent.removeChild(self.list_wall);
				Common.MapViewRefresh(self.display_wall, self.view);
				self.frameTime = 1;
				break;
			case 1:
				self.loading.onProgress(2, 3);
				self.frameTime = 1000;
				self.list_cell.dataProvider = self.arrlist;
				self.list_cell.itemRenderer = CellRender;
				self.list_cell.validateNow();
				self.list_cell.validateDisplayList();
				self.bmp_cell = new egret.Bitmap;
				self.bmp_cell.texture = RES.getRes("cell_bg_01");
				self.bmp_cell.fillMode = egret.BitmapFillMode.REPEAT;
				self.bmp_cell.width = self.list_cell.width;
				self.bmp_cell.height = self.list_cell.height;
				self.display_cell = Common.DisPlayToBmps(self.bmp_cell);
				self.group_map.addChildAt(self.display_cell.con, 0);
				self.mapSizeW = self.list_cell.width;
				self.mapSizeH = self.list_cell.height;
				Common.MapViewRefresh(self.display_cell, self.view);
				self.frameTime = 2;
				break;
			case 2:
				self.loading.onProgress(3, 3);
				self.frameTime = 1000;
				self.manageCells = new ManageCells(self.arrlist, self.list_cell);
				self.gameControl = new GameControl(self.group_role, 10, self.manageCells, self.group_light, self.view);
				self.removeChild(self.loading);
				self.PlayStartAni();
				self.removeEventListener(egret.Event.ENTER_FRAME, self.CreateMapBg, self);
				break;
		}
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

	private RemoveListeners(): void {
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

	private mapSizeW: number; mapSizeH: number

	private MoveScroll(e: egret.Event): void {
		let scrollH = this.scroller_map.viewport.scrollH;
		let scrollV = this.scroller_map.viewport.scrollV;
		let scroll = this.scroller_map;
		let moveX = 0, moveY = 0;
		let role = this.group_role;
		let data: any = e.data;
		let isLeft = data.moveX < 0 ? -1 : 1;
		let isUp = data.moveY < 0 ? -1 : 1;
		if ((isLeft > 0 && role.x >= scroll.width / 2) || (isLeft < 0 && role.x <= this.mapSizeW - scroll.width / 2)) {
			let moveX_min = isLeft < 0 ? scrollH : this.mapSizeW - scrollH - scroll.width;
			moveX = Math.min(Math.abs(data.moveX), Math.abs(moveX_min));
		}
		if ((isUp > 0 && role.y >= scroll.height / 2) || (isUp < 0 && role.y <= this.mapSizeH - scroll.height / 2)) {
			let moveY_min = isUp < 0 ? scrollV : this.mapSizeH - scrollV - scroll.height;
			moveY = Math.min(Math.abs(data.moveY), Math.abs(moveY_min));
		}
		scroll.viewport.scrollH += (isLeft * moveX);
		scroll.viewport.scrollV += (isUp * moveY);
		this.view.x = scroll.viewport.scrollH;
		this.view.y = scroll.viewport.scrollV;
		Common.MapViewRefresh(this.display_cell, this.view);
		Common.MapViewRefresh(this.display_wall, this.view);
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
		this.gameControl.RoleMoveState(2);	//停止移动
		this.virt.visible = false;
	}

	private BeginTouch(e: egret.TouchEvent): void {
		this.virt.start(e.localX, e.localY);
		this.gameControl.RoleMoveState(1);	//开始移动
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
		let self: GameUI = this;
		let obj: CellRender = self.manageCells.currentCellRender;
		// self.group_role.x = obj.x;
		// self.group_role.y = obj.y + (obj.height / 2);
		self.gameControl.RoleMoveState(3, [0], () => {
			self.img_Bg.touchEnabled = Setting.GetConfig().moveMode == MOVE_MODE.Rocker;
		});
	}
}

