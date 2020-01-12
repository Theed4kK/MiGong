class GameControl extends eui.Component {
	public constructor(img_role: eui.Image, group_light: eui.Group, speed: number, manageCells: ManageCells) {
		super();
		this.img_role = img_role;
		this.group_light = group_light;
		this.manageCells = manageCells;
		this.InitLight();
		this.speed = speed;
		this.img_role.anchorOffsetX = this.img_role.width / 2;
		this.img_role.anchorOffsetY = this.img_role.height / 2;
	}
	
	public direction: number;
	public speed: number;
	private manageCells: ManageCells;
	private img_role: eui.Image;
	private group_light: eui.Group;
	public maskLight: LightMask = new LightMask();
	wall_height = Config.GetInstance().config_common["wall_height"].value;
	wall_width = Config.GetInstance().config_common["wall_height"].value;
	cell_height = Config.GetInstance().config_common["cell_height"].value;
	cell_width = Config.GetInstance().config_common["cell_height"].value;

	/**初始化光照 */
	private InitLight() {
		let maskLight = this.maskLight;
		let group_light = this.group_light;
		maskLight.setMaskSize(group_light.width, group_light.height);
		maskLight.setLightValue(this.cell_width / 2, this.cell_height / 2, this.manageCells.currentCell, this.manageCells.currentBgRender);
		group_light.addChild(this.maskLight);
		maskLight.x = 0;
		maskLight.y = 0;
	}

	private RefreshLight() {
		let role = this.img_role;
		this.maskLight.setLightValue(role.x, role.y, this.manageCells.currentCell, this.manageCells.currentBgRender);
	}

	public RoleMoveState(state: number, start: number = 0, target: number = 0): void {
		switch (state) {
			//操作移动
			case 0:
				this.addEventListener(egret.Event.ENTER_FRAME, this.PlayerMove, this);
				break;
			//停止操作移动
			case 1:
				this.removeEventListener(egret.Event.ENTER_FRAME, this.PlayerMove, this);
				break;
			case 2:
				this.addEventListener(egret.Event.ENTER_FRAME, this.RoleAutoMove, this);
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
		this.direction = Math.atan2(index * this.cell_height - this.img_role.y, index * this.cell_width - this.img_role.x);
		this.RoleMove(2);
	}

	private PlayerMove(): void {
		this.RoleMove(1);
	}


	/**角色移动,type:1为手动引动  2为自动移动 */
	private RoleMove(type: number = 1): void {
		if (this.direction == null) { return; }
		let startTimer: number = egret.getTimer();
		let speedX = Number((Math.cos(this.direction) * this.speed * type).toFixed(2));
		let speedY = Number((Math.sin(this.direction) * this.speed * type).toFixed(2));
		let cell: Cell = this.manageCells.currentCell;
		let obj: egret.DisplayObject = this.manageCells.currentBgRender;
		let moveX: number = 0;
		let moveY: number = 0;
		let img_role = this.img_role;

		let moveRight = speedX > 0;
		let nearWall: Wall = moveRight ? cell.rightWall : cell.leftWall;
		if (!nearWall.isOpen || this.IsEdge(0)) {
			let width: number = this.wall_width * 0.5 + img_role.width * 0.5;
			let distance: number = Math.abs(obj.x + (moveRight ? 1 : 0) * obj.width / type - img_role.x) - width;
			moveX = moveRight ? Math.min(distance, speedX) : Math.max(-distance, speedX);
		}
		else {
			moveX = speedX;
		}
		img_role.x += moveX;

		moveRight = speedY < 0;
		nearWall = moveRight ? cell.upWall : cell.downWall;
		if (!nearWall.isOpen || this.IsEdge(1)) {
			let height: number = this.wall_height * 0.5 + img_role.height * 0.5;
			let distance: number = Math.abs(obj.y + (moveRight ? 0 : 1) * obj.height / type - img_role.y) - height;
			moveY = moveRight ? Math.max(-distance, speedY) : Math.min(distance, speedY);
		}
		else {
			moveY = speedY;
		}
		img_role.y += moveY;
		this.dispatchEventWith("moveScroll", false, { moveX: moveX, moveY: moveY })
		this.manageCells.SetIndex(img_role.x, img_role.y);
		this.RefreshLight();

	}

	private IsEdge(type: number): boolean {
		let isEdge: boolean = true;
		let img_role: eui.Image = this.img_role;
		let obj: egret.DisplayObject = this.manageCells.currentBgRender;
		switch (type) {
			case 0:
				isEdge = (Math.abs(img_role.y - obj.y)) < ((img_role.height / 2) + this.wall_height * 0.5);
				isEdge = isEdge || ((Math.abs(img_role.y - obj.y - obj.height) < (img_role.height / 2) + this.wall_height * 0.5));
				break;
			case 1:
				isEdge = (Math.abs(img_role.x - obj.x)) < ((img_role.width / 2) + this.wall_width * 0.5);
				isEdge = isEdge || ((Math.abs(img_role.x - obj.x - obj.width) < (img_role.width / 2) + this.wall_width * 0.5));
				break;
		}
		return isEdge;
	}


}
