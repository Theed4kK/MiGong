class GameControl extends eui.Component implements eui.UIComponent {
	public constructor(img_role: eui.Image, speed: number, ) {
		super();
		this.img_role = img_role;
		this.speed = speed;
		this.img_role.anchorOffsetX = this.img_role.width / 2;
		this.img_role.anchorOffsetY = this.img_role.height / 2;
	}

	public direction: number;
	public speed: number;
	private img_role: eui.Image;

	public RoleMoveState(state: number, start: number = 0, target: number = 0): void {
		switch (state) {
			//操作移动
			case 0:
				this.addEventListener(egret.Event.ENTER_FRAME, this.PlayerMove, this, );
				break;
			//停止操作移动
			case 1:
				this.removeEventListener(egret.Event.ENTER_FRAME, this.RoleMove, this);
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
		this.direction = Math.atan2(index * WallRender.h - this.img_role.y, index * WallRender.w - this.img_role.x);
		this.RoleMove(2);
	}

	private PlayerMove(): void {
		this.RoleMove(1);
	}
	/**角色移动,type:1为手动引动  2为自动移动 */
	private RoleMove(type: number = 1): void {
		if (this.direction == null) { return; }
		let speedX = Math.cos(this.direction) * this.speed * type;
		let speedY = Math.sin(this.direction) * this.speed * type;
		let cell: Cell = GameUI.manageCells.currentCell;
		let hasWall: boolean = false;
		let isEdge: boolean = false;
		let obj: egret.DisplayObject = GameUI.manageRenders.currentRender;
		let move: number = 0;

		let nearCell: Cell = speedX < 0 ? cell.leftCell : cell.rightCell;
		let nearWall: Wall = speedX < 0 ? cell.leftWall : cell.rightWall;
		hasWall = (nearCell == null || !nearWall.isOpen);
		isEdge = this.IsEdge(0);
		if (hasWall || isEdge) {
			let width: number = WallRender.vWallwidth * 0.5 + this.img_role.width * 0.5;
			let distance: number = Math.abs(obj.x + (speedX < 0 ? 0 : 1) * obj.width / type - this.img_role.x) - width;
			move = speedX < 0 ? Math.max(-distance, speedX) : Math.min(distance, speedX);
		}
		else {
			move = speedX;
		}
		this.img_role.x += move;

		nearCell = speedY < 0 ? cell.upCell : cell.downCell;
		nearWall = speedY < 0 ? cell.upWall : cell.downWall;
		hasWall = (nearCell == null || !nearWall.isOpen);
		isEdge = this.IsEdge(1);
		if (hasWall || isEdge) {
			let height: number = WallRender.hWallHeight * 0.5 + this.img_role.height * 0.5;
			let distance: number = Math.abs(obj.y + (speedY < 0 ? 0 : 1) * obj.height / type - this.img_role.y) - height;
			move = speedY < 0 ? Math.max(-distance, speedY) : Math.min(distance, speedY);
		}
		else {
			move = speedY;
		}
		this.img_role.y += move;

		this.dispatchEventWith(MyEvent.moveScroll, false, { x: this.img_role.x, speed: speedX })
		GameUI.manageCells.SetIndex(this.img_role.x, this.img_role.y);
		
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
