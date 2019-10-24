class GameControl extends eui.Component implements eui.UIComponent {
	public constructor(img_role: eui.Image, group_light: eui.Group, speed: number, ) {
		super();
		this.img_role = img_role;
		this.group_light = group_light;
		this.InitLight();
		this.speed = speed;
		this.img_role.anchorOffsetX = this.img_role.width / 2;
		this.img_role.anchorOffsetY = this.img_role.height / 2;
	}

	public direction: number;
	public speed: number;
	private img_role: eui.Image;
	private group_light: eui.Group;
	public maskLight: LightMask = new LightMask();
	private lightBitMap: egret.Bitmap = new egret.Bitmap();

	/**初始化光照 */
	private InitLight() {
		let maskLight = this.maskLight;
		let group_light = this.group_light;
		maskLight.setMaskSize(group_light.width, group_light.height);
		maskLight.setLightValue(200);
		this.DrawLightTexture();
		group_light.addChild(this.lightBitMap);
		maskLight.x = 0;
		maskLight.y = 0;
	}


	private DrawLightTexture() {
		let render: egret.RenderTexture = new egret.RenderTexture();
		render.drawToTexture(this.maskLight);
		this.lightBitMap.texture = render;
	}

	private lightRefreshTime: number;
	private RefreshLight() {
		if (egret.getTimer() - this.lightRefreshTime < 50) { return; }
		let role = this.img_role;
		this.maskLight.setLightPos(role.x, role.y);
		this.DrawLightTexture();
		this.lightRefreshTime = egret.getTimer();
	}

	public RoleMoveState(state: number, start: number = 0, target: number = 0): void {
		switch (state) {
			//操作移动
			case 0:
				this.addEventListener(egret.Event.ENTER_FRAME, this.PlayerMove, this, );
				break;
			//停止操作移动
			case 1:
				this.removeEventListener(egret.Event.ENTER_FRAME, this.PlayerMove, this);
				break;
			case 2:
				this.addEventListener(egret.Event.ENTER_FRAME, this.RoleAutoMove, this, );
				break;
			case 3:
				this.RoleAutoMove();
				break;
		}
	}

	private RoleAutoMove(): void {
		let path: number[] = GameUI.manageCells.returnPath;
		if (path.length == 0) { return; }
		let index: number;
		if (path.length > 1) {
			index = path[path.length - 2] + 0.5;
		} else {
			index = path[0] + 0.5;
		}
		this.direction = Math.atan2(index * WallRender.height - this.img_role.y, index * WallRender.width - this.img_role.x);
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
		let cell: Cell = GameUI.manageCells.currentCell;
		let obj: egret.DisplayObject = GameUI.manageRenders.currentRender;
		let move: number = 0;
		let img_role = this.img_role;

		let isPlus = speedX > 0;
		let nearWall: Wall = isPlus ? cell.rightWall : cell.leftWall;
		if (!nearWall.isOpen || this.IsEdge(0)) {
			let width: number = WallRender.vWallwidth * 0.5 + img_role.width * 0.5;
			let distance: number = Math.abs(obj.x + (isPlus ? 1 : 0) * obj.width / type - img_role.x) - width;
			move = isPlus ? Math.min(distance, speedX) : Math.max(-distance, speedX);
		}
		else {
			move = speedX;
		}
		img_role.x += move;

		isPlus = speedY < 0;
		nearWall = isPlus ? cell.upWall : cell.downWall;
		if (!nearWall.isOpen || this.IsEdge(1)) {
			let height: number = WallRender.hWallHeight * 0.5 + img_role.height * 0.5;
			let distance: number = Math.abs(obj.y + (isPlus ? 0 : 1) * obj.height / type - img_role.y) - height;
			move = isPlus ? Math.max(-distance, speedY) : Math.min(distance, speedY);
		}
		else {
			move = speedY;
		}
		img_role.y += move;

		this.dispatchEventWith(MyEvent.moveScroll, false, { x: img_role.x, speed: speedX })
		GameUI.manageCells.SetIndex(img_role.x, img_role.y);
		this.RefreshLight();
	}

	private IsEdge(type: number): boolean {
		let isEdge: boolean = true;
		let img_role: eui.Image = this.img_role;
		let obj: egret.DisplayObject = GameUI.manageRenders.currentRender;
		switch (type) {
			case 0:
				isEdge = (Math.abs(img_role.y - obj.y)) < ((img_role.height / 2) + WallRender.hWallHeight * 0.5);
				isEdge = isEdge || ((Math.abs(img_role.y - obj.y - obj.height) < (img_role.height / 2) + WallRender.hWallHeight * 0.5));
				break;
			case 1:
				isEdge = (Math.abs(img_role.x - obj.x)) < ((img_role.width / 2) + WallRender.vWallwidth * 0.5);
				isEdge = isEdge || ((Math.abs(img_role.x - obj.x - obj.width) < (img_role.width / 2) + WallRender.vWallwidth * 0.5));
				break;
		}
		return isEdge;
	}
}
