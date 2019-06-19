class GameControl extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	public img_role: eui.Image;
	public cells: Cell[] = [];
	public scroll: eui.Scroller;
	public direction: number;
	public speed: number = null;

	//角色移动
	public RoleMove(index: number, obj: egret.DisplayObject): void {
		let speed: number = this.speed;
		let cell: Cell = this.cells[index];
		let hasWall: boolean = false;
		let isEdge: boolean = false;
		let scrollH: number = 0;
		let groupWidth: number = 0;
		switch (this.direction) {
			//向左移动
			case 0:
				hasWall = (cell.leftCell == null || !cell.leftWall.isOpen);
				isEdge = (Math.abs(this.img_role.y - obj.y)) < ((this.img_role.height / 2) + 2);
				isEdge = isEdge || ((Math.abs(this.img_role.y - obj.y - obj.height) < (this.img_role.height / 2) + 2));
				if (hasWall || isEdge) {
					let left: number = this.img_role.x - (this.img_role.width / 2);
					let distance: number = (left - (obj.x + 2));

					this.img_role.x -= Math.min(speed, distance);
				}
				else {
					this.img_role.x -= speed;
				}
				scrollH = this.scroll.viewport.scrollH;
				// groupWidth = this.scroller.viewport.width;
				if (((this.img_role.x - scrollH) < (this.scroll.width / 2)) && scrollH > 0) {
					this.scroll.viewport.scrollH -= Math.min(speed, scrollH);
				}
				break;
			//向右移动
			case 1:
				hasWall = (cell.rightCell == null || !cell.rightCell.leftWall.isOpen);
				isEdge = (Math.abs(this.img_role.y - obj.y)) < ((this.img_role.height / 2) + 2);
				isEdge = isEdge || ((Math.abs(this.img_role.y - obj.y - obj.height) < (this.img_role.height / 2) + 2));
				if (hasWall || isEdge) {
					let right: number = this.img_role.x + (this.img_role.width / 2);
					let distance: number = ((obj.x + obj.width - 2) - right);
					this.img_role.x += Math.min(speed, distance);
				}
				else {
					this.img_role.x += speed;
				}
				scrollH = this.scroll.viewport.scrollH;
				groupWidth = this.scroll.viewport.measuredWidth;
				if (((this.img_role.x - scrollH) > (this.scroll.width / 2)) && ((scrollH + this.scroll.width) < groupWidth)) {
					this.scroll.viewport.scrollH += speed;
				}
				break;
			//向下移动
			case 2:
				hasWall = (cell.downCell == null || !cell.downCell.upWall.isOpen);
				isEdge = (Math.abs(this.img_role.x - obj.x)) < ((this.img_role.width / 2) + 2);
				isEdge = isEdge || ((Math.abs(this.img_role.x - obj.x - obj.width) < (this.img_role.width / 2) + 2));
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
			case 3:
				hasWall = (cell.upCell == null || !cell.upWall.isOpen);
				isEdge = (Math.abs(this.img_role.x - obj.x)) < ((this.img_role.width / 2) + 2);
				isEdge = isEdge || ((Math.abs(this.img_role.x - obj.x - obj.width) < (this.img_role.width / 2) + 2));
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
	}
}
