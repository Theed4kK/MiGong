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

	private itemData: eui.ArrayCollection = new eui.ArrayCollection;

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
			let mapConfig = Config.GetInstance().config_map[res.level];
			self.txt_mapName.text = "Lv." + mapConfig.id + mapConfig.name;
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
		self.addEventListener(egret.Event.ENTER_FRAME, self.CreateMap, self);
		if (DBManage.GetInstance().userInfo.avatarUrl) {
			RES.getResByUrl(DBManage.GetInstance().userInfo.avatarUrl, self.SetMaskAndFrame, this, RES.ResourceItem.TYPE_IMAGE)
		}
		else {
			self.SetMaskAndFrame();
		}
	}

	private frameTime = 0;
	/**生成地图，分帧加载 */
	private CreateMap() {
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
				self.bmp_cell.texture = RES.getRes("cell_bg_02");
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
				//角色控制器初始化
				self.manageCells = new ManageCells(self.arrlist, self.list_cell);
				self.gameControl = new GameControl(self.group_role, 10, self.manageCells, self.group_light, self.view);
				//道具列表初始化
				self.list_reward.dataProvider = this.itemData;
				self.list_reward.itemRenderer = GameItemRender;
				//移除加载界面
				self.removeChild(self.loading);
				//播放进入迷宫动画
				self.PlayStartAni();
				//完成分帧加载事件
				self.removeEventListener(egret.Event.ENTER_FRAME, self.CreateMap, self);
				break;
		}
	}

	private AddListener(): void {
		this.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		GameEvent.addEventListener(GameEvent.GetItem, this.UpdateItem, this);
		GameEvent.addEventListener(GameEvent.ExitMap, this.ExitMap, this);
		GameEvent.addEventListener(GameEvent.MoveScroll, this.MoveScroll, this);
	}

	private RemoveListeners(): void {
		this.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.ExitMap, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.BeginTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.Move, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_END, this.CancelTouch, this);
		this.img_Bg.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.CancelTouch, this);
		GameEvent.removeEventListener(GameEvent.GetItem, this.UpdateItem, this);
		GameEvent.removeEventListener(GameEvent.ExitMap, this.ExitMap, this);
		GameEvent.removeEventListener(GameEvent.MoveScroll, this.MoveScroll, this);
	}

	private ExitMap() {
		let mode = this.manageCells.path.indexOf(this.arrlist.length - 1) != -1;
		let exitTips = UIBase.OpenUI(ExitTips, mode, this.manageCells.length, this.itemData, this.manageCells.path.length);
		this.img_Bg.dispatchEvent(new egret.Event(egret.TouchEvent.TOUCH_CANCEL));
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

	/**获得新道具，播放动画并刷新列表 */
	private UpdateItem(e: egret.Event): void {
		let data: { id: number, value: number } = e.data;
		let self: GameUI = this;
		let index = -1;
		let newItem = true;
		let item: { id: number, value: number };
		for (let i = 0; i < self.itemData.length; i++) {
			let _item: { id: number, value: number } = self.itemData.getItemAt(i);
			if (_item.id == data.id) {
				index = i;
				newItem = false;
				item = _item;
				item.value++
				break;
			}
		}
		if (index == -1) {
			self.itemData.addItem(data);
			index = self.itemData.getItemIndex(data);
			self.list_reward.validateNow();
			self.list_reward.validateDisplayList();
		}
		let obj_end = self.list_reward.getElementAt(index);
		let obj_start = self.manageCells.currentCellRender;
		obj_end.visible = !newItem;
		let point_end = obj_end.localToGlobal();
		let point_start = obj_start.localToGlobal();
		let itemConfig = Config.GetInstance().config_item[data.id];
		let img_getItem = new eui.Image;
		img_getItem.source = itemConfig.pic;
		let glow = new egret.GlowFilter(Color[itemConfig.quality], 0.5, 10, 10, 10, egret.BitmapFilterQuality.HIGH, false, false);
		img_getItem.filters = [glow];
		UIBase.UILayer.addChild(img_getItem);
		img_getItem.width = 40;
		img_getItem.height = 40;
		img_getItem.x = point_start.x + obj_start.width / 2;
		img_getItem.y = point_start.y + obj_start.height / 2;
		let tw = egret.Tween.get(img_getItem);
		tw.to({ x: point_end.x, y: point_end.y }, 500).call(() => {
			obj_end.visible = true;
			UIBase.UILayer.removeChild(img_getItem);
			if (item) { self.itemData.itemUpdated(item); }
		})
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
		self.group_role.x = obj.x;
		self.group_role.y = obj.y + (obj.height / 2);
		self.gameControl.RoleMoveState(3, [0], () => {
			self.img_Bg.touchEnabled = Setting.GetConfig().moveMode == MOVE_MODE.Rocker;
		});
	}
}

