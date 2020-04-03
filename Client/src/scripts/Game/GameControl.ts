enum MOVE_MODE {
	Rocker,
	Gyroscope
}
class GameControl {
	public constructor(role: eui.Group, speed: number, manageCells: ManageCells, group_light?: eui.Group, view?: egret.Rectangle) {
		this.role = role;
		this.manageCells = manageCells;
		if (this.lightOpen) {
			this.group_light = group_light;
			this.view = view;
			this.InitLight();
		}
		this.speed = speed;
		this.role.anchorOffsetX = this.role.width / 2;
		this.role.anchorOffsetY = this.role.height / 2;
		if (Setting.GetConfig().moveMode == MOVE_MODE.Gyroscope) {
			this.orientation = new egret.DeviceOrientation();
			this.orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
			this.orientation.start();
		}
	}

	public direction: number;
	public speed: number;
	public moveMode: MOVE_MODE = MOVE_MODE.Rocker;
	private manageCells: ManageCells;

	private role: eui.Group;
	private group_light: eui.Group;

	private view: egret.Rectangle;
	private lightOpen = true;

	private orientation: egret.DeviceOrientation;
	private maskLight: LightMask = new LightMask;
	wall_height = +Config.GetInstance().config_common["wall_height"].value;
	wall_width = +Config.GetInstance().config_common["wall_height"].value;
	cell_height = +Config.GetInstance().config_common["cell_height"].value;
	cell_width = +Config.GetInstance().config_common["cell_height"].value;


	/**初始化光照 */
	private InitLight() {
		let maskLight = this.maskLight;
		maskLight.InitLight(this.view);
		// maskLight.MoveMask(this.cell_width / 2, this.cell_height / 2);
		this.group_light.addChild(this.maskLight);
		maskLight.x = 0;
		maskLight.y = 0;
	}

	private RefreshLight() {
		let role = this.role;
		this.maskLight.MoveMask(role.x, role.y);
	}

	private onOrientation(e: egret.OrientationEvent) {
		if (e.beta != null && e.gamma != null) {
			this.direction = Math.atan2(e.beta, e.gamma);
		}
	}

	/**state：为1时开始手动移动  为2时停止手动移动  为3时开始自动移动,需传入路径数组,可选参数callback  为4时停止自动移动 */
	public RoleMoveState(state: number, paths?: number[], call?: Function): void {
		switch (state) {
			case 1:
				if (this.autoMoveState) { return; }
				this.role.addEventListener(egret.Event.ENTER_FRAME, this.RoleMove, this);
				break;
			case 2:
				this.role.removeEventListener(egret.Event.ENTER_FRAME, this.RoleMove, this);
				break;
			case 3:
				if (this.autoMoveState) { return; }
				this.role.addEventListener(egret.Event.ENTER_FRAME, this.RoleAutoMove, this);
				this.paths = paths;
				this.autoMoveState = true;
				this.call = call;
				break;
			case 4:
				this.role.removeEventListener(egret.Event.ENTER_FRAME, this.RoleAutoMove, this);
				this.autoMoveState = false;
				break;
		}
	}

	private paths: number[];
	private autoMoveState: boolean = false;
	private call: Function;
	private RoleAutoMove(): void {
		let self: GameControl = this;
		let paths = self.paths;
		let moveX = 0, moveY = 0;
		if (paths.length == 0) {
			if (self.call) { self.call(); }
			self.RoleMoveState(4);
		}
		else {
			if (paths.length == 1) {
				let obj = self.manageCells.currentCellRender;
				if (obj.y + self.cell_height / 2 == self.role.y && obj.x + self.cell_width / 2 == self.role.x) {
					paths.splice(-1, 1);
				}
				else {
					let angle: number = Math.atan2(obj.y + self.cell_height / 2 - self.role.y, obj.x + self.cell_width / 2 - self.role.x);
					let speedX = +(Math.cos(angle) * self.speed).toFixed();
					let speedY = +(Math.sin(angle) * self.speed).toFixed();
					moveX = speedX > 0 ? Math.min(speedX, obj.x + self.cell_width / 2 - self.role.x) : Math.max(speedX, obj.x + self.cell_width / 2 - self.role.x);
					moveY = speedY > 0 ? Math.min(speedY, obj.y + self.cell_width / 2 - self.role.y) : Math.max(speedY, obj.y + self.cell_width / 2 - self.role.y);
				}
			}
			else if (paths.length > 1) {
				let isVertical = Math.abs(paths[paths.length - 2] - paths[paths.length - 1]) != 1;
				let obj = self.manageCells.currentCellRender;
				if (isVertical) {
					let symbol = obj.x + self.cell_width / 2 > self.role.x ? 1 : -1;
					moveX = Math.min(Math.abs(obj.x + self.cell_width / 2 - self.role.x), self.speed) * symbol;
					symbol = paths[paths.length - 1] > paths[paths.length - 2] ? -1 : 1;
					moveY = Math.min(Math.abs(self.speed - moveX), self.speed) * symbol;
				}
				else {
					let symbol = obj.y + self.cell_height / 2 > self.role.y ? 1 : -1;
					moveY = Math.min(Math.abs(obj.y + self.cell_height / 2 - self.role.y), self.speed) * symbol;
					symbol = paths[paths.length - 1] > paths[paths.length - 2] ? -1 : 1;
					moveX = Math.min(Math.abs(self.speed - moveY), self.speed) * symbol;
				}
			}
			self.role.x += moveX;
			self.role.y += moveY;
			self.RefreshView(moveX, moveY);
			if (paths[paths.length - 1] != self.manageCells.index) {
				paths.splice(-1, 1);
			}
		}
	}

	/**角色移动 */
	private RoleMove(): void {
		let self: GameControl = this;
		if (self.autoMoveState) {
			self.RoleMoveState(2);
			return;
		}
		if (self.direction == null) { return; }
		let speedX = +(Math.cos(self.direction) * self.speed).toFixed();
		let speedY = +(Math.sin(self.direction) * self.speed).toFixed();
		let cell: Cell = self.manageCells.currentCell;
		let obj: egret.DisplayObject = self.manageCells.currentCellRender;
		let moveX: number = 0;
		let moveY: number = 0;
		let role = self.role;
		let movePlus = speedX > 0;
		let nearWall: Wall = movePlus ? cell.rightWall : cell.leftWall;
		if (!nearWall.isOpen || self.IsEdge(0)) {
			let width: number = self.wall_width * 0.5 + role.width * 0.5;
			let distance: number = Math.abs(obj.x + (movePlus ? 1 : 0) * obj.width - role.x) - width;
			moveX = movePlus ? Math.min(distance, speedX) : Math.max(-distance, speedX);

		}
		else {
			moveX = speedX;
		}
		role.x += moveX;

		movePlus = speedY < 0;
		nearWall = movePlus ? cell.upWall : cell.downWall;
		if (!nearWall.isOpen || self.IsEdge(1)) {
			let height: number = self.wall_height * 0.5 + role.height * 0.5;
			let distance: number = Math.abs(obj.y + (movePlus ? 0 : 1) * obj.height - role.y) - height;
			moveY = movePlus ? Math.max(-distance, speedY) : Math.min(distance, speedY);
		}
		else {
			moveY = speedY;
		}
		role.y += moveY;
		self.RefreshView(moveX, moveY);
		if (cell.specialIndex == CELL_INDEX.Start && speedX < 0 && Math.abs(moveX) < Math.abs(speedX)) {
			GameEvent.dispatchEventWith(GameEvent.ExitMap);
		}
		if (cell.specialIndex == CELL_INDEX.End && speedX > 0 && Math.abs(moveX) < Math.abs(speedX)) {
			GameEvent.dispatchEventWith(GameEvent.ExitMap);
		}
	}

	private RefreshView(moveX: number, moveY: number) {
		let self: GameControl = this;
		GameEvent.dispatchEventWith(GameEvent.MoveScroll, false, { moveX: moveX, moveY: moveY });
		self.manageCells.SetIndex(self.role);
		if (self.lightOpen) { self.RefreshLight(); }
	}

	private IsEdge(type: number): boolean {
		let isEdge: boolean = true;
		let role: eui.Group = this.role;
		let obj: egret.DisplayObject = this.manageCells.currentCellRender;
		switch (type) {
			case 0:
				isEdge = (Math.abs(role.y - obj.y)) < ((role.height / 2) + this.wall_height * 0.5);
				isEdge = isEdge || ((Math.abs(role.y - obj.y - obj.height) < (role.height / 2) + this.wall_height * 0.5));
				break;
			case 1:
				isEdge = (Math.abs(role.x - obj.x)) < ((role.width / 2) + this.wall_width * 0.5);
				isEdge = isEdge || ((Math.abs(role.x - obj.x - obj.width) < (role.width / 2) + this.wall_width * 0.5));
				break;
		}
		return isEdge;
	}


}
