class LightMask extends egret.Sprite {
	private cirleLight_h: egret.Shape = new egret.Shape();
	private cirleLight_w: egret.Shape = new egret.Shape();
	private cirleLight: egret.Sprite = new egret.Sprite();
	private mask_sprite: egret.Sprite = new egret.Sprite();
	private mask_shape_h: egret.Shape = new egret.Shape();
	private mask_shape_w: egret.Shape = new egret.Shape();
	private mask_img: egret.Bitmap = new egret.Bitmap();
	private _mask_img: egret.Bitmap = new egret.Bitmap();
	private lightMatrix: egret.Matrix = new egret.Matrix();

	private light_size: number;
	public constructor() {
		super();
		let self: LightMask = this;

		self.cirleLight.blendMode = egret.BlendMode.ERASE;
		self._mask_img.blendMode = egret.BlendMode.ERASE;

		self._mask_img.alpha = 0.3;
		self.mask_sprite.alpha = 0.3;

		self.cirleLight.addChild(self.cirleLight_h);
		self.cirleLight.addChild(self.cirleLight_w);

		self.mask_sprite.addChild(self.mask_img);
		self.mask_sprite.addChild(self.mask_shape_h);
		self.mask_sprite.addChild(self.mask_shape_w);

		self.addChild(self._mask_img);
		self.addChild(self.cirleLight);
	}

	//设置背景框的大小
	public setMaskSize(maskW: number, maskH: number) {
		this.graphics.clear();
		this.graphics.beginFill(0x000000, 1);
		this.graphics.drawRect(0, 0, maskW, maskH);
		this.graphics.endFill();
	}
	//设置光圈的大小
	public setLightValue(posx: number, posy: number) {
		// let lightMatrix_h = new egret.Matrix();
		// let lightMatrix_w = new egret.Matrix();
		let self: LightMask = this;
		// lightMatrix_h.createGradientBox(light * 2, CellBgRender._height * 2, 0, -light, -CellBgRender._height);
		// lightMatrix_w.createGradientBox(CellBgRender._width * 2, light * 2, 0, -CellBgRender._width, -light);

		let cell = GameUI.manageCells.currentCell;
		let cellRender = GameUI.manageRenders.currentBgRender;

		let h_y = cell.upWall.isOpen ? (posy - CellBgRender._height) : cellRender.y;
		h_y -= WallRender.hWallHeight;
		let h_height = (cell.upWall.isOpen ? CellBgRender._height : (posy - cellRender.y)) + CellBgRender._height + (cell.downWall.isOpen ? 0 : (cellRender.y - posy));
		let w_x = cell.leftWall.isOpen ? (posx - CellBgRender._width) : cellRender.x;
		w_x -= WallRender.vWallwidth;
		let w_width = (cell.leftWall.isOpen ? CellBgRender._width : (posx - cellRender.x)) + CellBgRender._width + (cell.rightWall.isOpen ? 0 : (cellRender.x - posx));


		self.cirleLight_h.graphics.clear();
		self.cirleLight_w.graphics.clear();
		// let colorGroup: number[] = [0xffffff, 0xd3d3d3, 0x888888];
		// let alphasGroup: number[] = [1, 0.9, 0.2];
		// let colorNumGroup: number[] = [0, 50, 255];
		// self.cirleLight_h.graphics.beginGradientFill(egret.GradientType.RADIAL, colorGroup, alphasGroup, colorNumGroup, lightMatrix_h);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
		self.cirleLight_h.graphics.beginFill(0xffffff, 1);
		self.cirleLight_h.graphics.drawRect(cellRender.x - WallRender.vWallwidth * 1.5, h_y, CellBgRender._width + WallRender.vWallwidth, h_height);
		self.cirleLight_h.graphics.endFill();
		// self.cirleLight_w.graphics.beginGradientFill(egret.GradientType.RADIAL, colorGroup, alphasGroup, colorNumGroup, lightMatrix_w);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
		self.cirleLight_w.graphics.beginFill(0xffffff, 1);
		self.cirleLight_w.graphics.drawRect(w_x, cellRender.y - WallRender.hWallHeight * 1.5, w_width, CellBgRender._height + WallRender.hWallHeight);
		self.cirleLight_w.graphics.endFill();

		self.mask_shape_h.graphics.clear();
		self.mask_shape_w.graphics.clear();
		self.mask_shape_h.graphics.beginFill(0xffffff, 1);
		self.mask_shape_h.graphics.drawRect(cellRender.x - WallRender.vWallwidth * 1.5, h_y, CellBgRender._width + WallRender.vWallwidth, h_height);
		self.mask_shape_h.graphics.endFill();
		self.mask_shape_w.graphics.beginFill(0xffffff, 1);
		self.mask_shape_w.graphics.drawRect(w_x, cellRender.y - WallRender.hWallHeight * 1.5, w_width, CellBgRender._height + WallRender.hWallHeight);
		self.mask_shape_w.graphics.endFill();

		let render = new egret.RenderTexture();
		render.drawToTexture(this.mask_sprite);
		this.mask_img.texture = render;
		this._mask_img.texture = render;
	}

}

