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

	public RoleMoveState(state: number, start: number = 0, target: number = 0): void {
		switch (state) {
			//操作移动
			case 0:
				this.role.addEventListener(egret.Event.ENTER_FRAME, this.PlayerMove, this);
				break;
			//停止操作移动
			case 1:
				this.role.removeEventListener(egret.Event.ENTER_FRAME, this.PlayerMove, this);
				break;
			case 2:
				this.role.addEventListener(egret.Event.ENTER_FRAME, this.RoleAutoMove, this);
				break;
			case 3:
				this.RoleAutoMove();
				break;
		}
	}

	private RoleAutoMove(): void {
		let path: number[] = this.manageCells.returnPath;

		if (path.length == 0) { return; }
		let index: number;
		if (path.length > 1) {
			index = path[path.length - 2] + 0.5;
		} else {
			index = path[0] + 0.5;
		}
		this.direction = Math.atan2(index * this.cell_height - this.role.y, index * this.cell_width - this.role.x);
		this.RoleMove(2);
	}

	private PlayerMove(): void {
		this.RoleMove(1);
	}

	/**角色移动,type:1为手动引动  2为自动移动 */
	private RoleMove(type: number = 1): void {
		let self: GameControl = this;
		if (self.direction == null) { return; }
		let startTimer: number = egret.getTimer();
		let speedX = +(Math.cos(self.direction) * self.speed * type).toFixed();
		let speedY = +(Math.sin(self.direction) * self.speed * type).toFixed();
		let cell: Cell = self.manageCells.currentCell;
		let obj: egret.DisplayObject = self.manageCells.currentCellRender;
		let moveX: number = 0;
		let moveY: number = 0;
		let role = self.role;

		let moveRight = speedX > 0;
		let nearWall: Wall = moveRight ? cell.rightWall : cell.leftWall;
		if (!nearWall.isOpen || self.IsEdge(0)) {
			let width: number = self.wall_width * 0.5 + role.width * 0.5;
			let distance: number = Math.abs(obj.x + (moveRight ? 1 : 0) * obj.width / type - role.x) - width;
			moveX = moveRight ? Math.min(distance, speedX) : Math.max(-distance, speedX);
		}
		else {
			moveX = speedX;
		}
		role.x += moveX;

		moveRight = speedY < 0;
		nearWall = moveRight ? cell.upWall : cell.downWall;
		if (!nearWall.isOpen || self.IsEdge(1)) {
			let height: number = self.wall_height * 0.5 + role.height * 0.5;
			let distance: number = Math.abs(obj.y + (moveRight ? 0 : 1) * obj.height / type - role.y) - height;
			moveY = moveRight ? Math.max(-distance, speedY) : Math.min(distance, speedY);
		}
		else {
			moveY = speedY;
		}
		role.y += moveY;
		GameEvent.dispatchEventWith(GameEvent.MoveScroll, false, { moveX: moveX, moveY: moveY });
		self.manageCells.SetIndex(role);
		if (self.lightOpen) { this.RefreshLight(); }
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
