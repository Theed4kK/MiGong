class GameControl extends eui.Component implements eui.UIComponent {
	public constructor(img_role: eui.Image) {
		super();
		this.img_role = img_role;
	}

	public genCells: GenCells;
	public directionX: number;
	public directionY: number;
	public speed: number;
	private img_role: eui.Image;

	public RoleMoveState(state: number, start: number = 0, target: number = 0): void {
		switch (state) {
			case 0:
				this.addEventListener(egret.Event.ENTER_FRAME, this.RoleMove, this, );
				break;
			case 1:
				this.removeEventListener(egret.Event.ENTER_FRAME, this.RoleMove, this);
				break;
		}
	}

	//角色移动
	public RoleMove(): void {
		if (this.directionX == null && this.directionY == null) { return; }
		let speed: number = this.speed;
		let cell: Cell = this.genCells.cells[this.genCells.index];
		let scroll = this.genCells.scroll;
		let hasWall: boolean = false;
		let isEdge: boolean = false;
		let scrollH: number = 0;
		let groupWidth: number = 0;
		let obj: egret.DisplayObject = this.genCells.wallList.getElementAt(this.genCells.index);
		switch (this.directionX) {
			//向左移动
			case 0:
				hasWall = (cell.leftCell == null || !cell.leftWall.isOpen);
				isEdge = this.IsEdge(0);
				if (hasWall || isEdge) {
					let left: number = this.img_role.x - (this.img_role.width / 2);
					let distance: number = (left - (obj.x + 2));
					this.img_role.x -= Math.min(speed, distance);
				}
				else {
					this.img_role.x -= speed;
				}
				scrollH = scroll.viewport.scrollH;
				if (((this.img_role.x - scrollH) < (scroll.width / 2)) && scrollH > 0) {
					scroll.viewport.scrollH -= Math.min(speed, scrollH);
				}
				break;
			//向右移动
			case 1:
				hasWall = (cell.rightCell == null || !cell.rightCell.leftWall.isOpen);
				isEdge = this.IsEdge(0);
				if (hasWall || isEdge) {
					let right: number = this.img_role.x + (this.img_role.width / 2);
					let distance: number = ((obj.x + obj.width - 2) - right);
					this.img_role.x += Math.min(speed, distance);
				}
				else {
					this.img_role.x += speed;
				}
				scrollH = scroll.viewport.scrollH;
				groupWidth = scroll.viewport.measuredWidth;
				if (((this.img_role.x - scrollH) > (scroll.width / 2)) && ((scrollH + scroll.width) < groupWidth)) {
					scroll.viewport.scrollH += speed;
				}
				break;
		}
		switch (this.directionY) {
			//向下移动
			case 0:
				hasWall = (cell.downCell == null || !cell.downCell.upWall.isOpen);
				isEdge = this.IsEdge(1);
				if (hasWall || isEdge) {
					let bottom: number = this.img_role.y + (this.img_role.height / 2);
					let distance: number = ((obj.y + obj.height - 2) - bottom);
					this.img_role.y += Math.min(speed, distance);
				}
				else {
					this.img_role.y += speed;
				}
				break;
			//向上移动
			case 1:
				hasWall = (cell.upCell == null || !cell.upWall.isOpen);
				isEdge = this.IsEdge(1);
				if (hasWall || isEdge) {
					let top: number = this.img_role.y - (this.img_role.height / 2);
					let distance: number = (top - (obj.y + 2));
					this.img_role.y -= Math.min(speed, distance);
				}
				else {
					this.img_role.y -= speed;
				}
				break;
		}
		this.ResetIndex();
		this.genCells.RefreshCell(this.directionX, this.directionY, this.speed);
	}

	private ResetIndex(): void {
		let obj: egret.DisplayObject = this.genCells.wallList.getElementAt(this.genCells.index);
		let left: number = this.img_role.x - (this.img_role.width / 2);
		let right: number = this.img_role.x + (this.img_role.width / 2);
		let up: number = this.img_role.y - (this.img_role.height / 2);
		let bottom: number = this.img_role.y + (this.img_role.height / 2);
		if (right < obj.x) {
			this.genCells.SetIndex(0);
		}
		if (left > obj.x + obj.width) {
			this.genCells.SetIndex(1);
		}
		if (bottom < obj.y) {
			this.genCells.SetIndex(2);
		}
		if (up > obj.y + obj.height) {
			this.genCells.SetIndex(3);
		}
	}

	private IsEdge(type: number): boolean {
		let isEdge: boolean = true;
		let img_role: eui.Image = this.img_role;
		let obj: egret.DisplayObject = this.genCells.wallList.getElementAt(this.genCells.index);
		switch (type) {
			case 0:
				isEdge = (Math.abs(img_role.y - obj.y)) < ((img_role.height / 2) + 2);
				isEdge = isEdge || ((Math.abs(img_role.y - obj.y - obj.height) < (img_role.height / 2) + 2));
				break;
			case 1:
				isEdge = (Math.abs(img_role.x - obj.x)) < ((img_role.width / 2) + 2);
				isEdge = isEdge || ((Math.abs(img_role.x - obj.x - obj.width) < (img_role.width / 2) + 2));
		}
		return isEdge;
	}
}