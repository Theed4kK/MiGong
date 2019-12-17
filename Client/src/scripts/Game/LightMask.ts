class LightMask extends egret.Sprite {
	private cirleLight: egret.Sprite = new egret.Sprite();
	private cirleLight_h: egret.Shape = new egret.Shape();
	private cirleLight_w: egret.Shape = new egret.Shape();
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

		self.cirleLight_h.blendMode = egret.BlendMode.ERASE;
		// self.cirleLight.blendMode = egret.BlendMode.ERASE;
		self._mask_img.blendMode = egret.BlendMode.ERASE;

		self._mask_img.alpha = 0.3;
		self.mask_sprite.alpha = 0.3;

		self.cirleLight.addChild(self.cirleLight_h);
		self.cirleLight.addChild(self.cirleLight_w);

		self.mask_sprite.addChild(self.mask_img);
		self.mask_sprite.addChild(self.mask_shape_h);
		self.mask_sprite.addChild(self.mask_shape_w);

		self.addChild(self._mask_img);
		self.addChild(self.cirleLight_h);
		// self.addChild(self.cirleLight);
	}

	public MoveLight(posx:number,posy:number){
		this.cirleLight_h.x = posx - WallRender.vWallwidth;
		this.cirleLight_h.y = posy - WallRender.hWallHeight;
		this.mask_shape_h.x = posx - WallRender.vWallwidth;
		this.mask_shape_h.y = posy - WallRender.hWallHeight;


		let render = new egret.RenderTexture();
		render.drawToTexture(this.mask_sprite);
		this.mask_img.texture = render;
		this._mask_img.texture = render;
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

		let self: LightMask = this;

		let cell = GameUI.manageCells.currentCell;
		let cellRender = GameUI.manageRenders.currentBgRender;

		self.cirleLight_h.graphics.clear();
		let lightMatrix_h = new egret.Matrix();
		lightMatrix_h.createGradientBox(CellBgRender._width * 2, CellBgRender._height * 2, 0, -CellBgRender._width * 1, -CellBgRender._height * 1);
		let colorGroup: number[] = [0xffffff, 0xd3d3d3, 0x888888];
		let alphasGroup: number[] = [1, 0.7, 0];
		let colorNumGroup: number[] = [0, 150, 255];
		self.cirleLight_h.graphics.beginGradientFill(egret.GradientType.RADIAL, colorGroup, alphasGroup, colorNumGroup, lightMatrix_h);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
		self.cirleLight_h.graphics.drawCircle(0, 0, CellBgRender._width * 1);
		self.cirleLight_h.graphics.endFill();

		self.mask_shape_h.graphics.clear();
		self.mask_shape_h.graphics.beginFill(0xffffff,1);
		self.mask_shape_h.graphics.drawCircle(0, 0, CellBgRender._width * 1);
		self.mask_shape_h.graphics.endFill();
	}

}

