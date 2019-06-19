class CellRender extends eui.ItemRenderer {
	public constructor() {
		super()
	}

	private img_leftWall: eui.Image;
	private img_rightWall: eui.Image;
	private img_upWall: eui.Image;
	private img_downWall: eui.Image;

	private tw: egret.Tween;


	protected dataChanged(): void {
		let cell: Cell = this.data;

		this.img_upWall.visible = cell.upWall == null ? true : !cell.upWall.isOpen;
		this.img_downWall.visible = !cell.downCell;
		this.img_leftWall.visible = cell.leftWall == null ? true : !cell.leftWall.isOpen;
		this.img_rightWall.visible = !cell.rightCell;
	}

	public StartAni(): void {

	}




}