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

	private lastTime: number;
	//设置光圈的位置
	public setLightPos(posx: number, posy: number) {
		this.cirleLight_h.x = posx;
		this.cirleLight_h.y = posy;
		this.cirleLight_w.x = posx;
		this.cirleLight_w.y = posy;
		this.mask_shape_h.x = posx;
		this.mask_shape_h.y = posy;
		this.mask_shape_w.x = posx;
		this.mask_shape_w.y = posy;

		this.lastTime = egret.getTimer();
		let render = new egret.RenderTexture();
		render.drawToTexture(this.mask_sprite);
		this.mask_img.texture = render;
		this._mask_img.texture = render;
		egret.log("图片生成耗时", egret.getTimer() - this.lastTime);
	}

	//设置背景框的大小
	public setMaskSize(maskW: number, maskH: number) {
		this.graphics.clear();
		this.graphics.beginFill(0x000000, 1);
		this.graphics.drawRect(0, 0, maskW, maskH);
		this.graphics.endFill();
	}
	//设置光圈的大小
	public setLightValue(light: number) {
		let lightMatrix_h = new egret.Matrix(); 
		let lightMatrix_w = new egret.Matrix(); 
		lightMatrix_h.createGradientBox(light * 2, CellBgRender._height * 2, 0, -light, -CellBgRender._height);
		lightMatrix_w.createGradientBox(CellBgRender._width * 2, light * 2, 0, -CellBgRender._width, -light);
		this.light_size = light;
		let cirleLight_h = this.cirleLight_h;
		let cirleLight_w = this.cirleLight_w;
		let mask_shape_h = this.mask_shape_h;
		let mask_shape_w = this.mask_shape_w;
		cirleLight_h.graphics.clear();
		let colorGroup: number[] = [0xffffff, 0xd3d3d3, 0x888888];
		let alphasGroup: number[] = [1, 0.9, 0.2];
		let colorNumGroup: number[] = [0, 50, 255];
		cirleLight_h.graphics.beginGradientFill(egret.GradientType.RADIAL, colorGroup, alphasGroup, colorNumGroup, lightMatrix_h);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
		cirleLight_h.graphics.drawRect(-light, -CellBgRender._height, light * 2, CellBgRender._height * 2);
		cirleLight_h.graphics.endFill();
		// cirleLight_w.graphics.beginGradientFill(egret.GradientType.RADIAL, colorGroup, alphasGroup, colorNumGroup, lightMatrix_w);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
		// cirleLight_w.graphics.drawRect(-light, -light, CellBgRender._width * 2, light * 2);
		// cirleLight_w.graphics.endFill();

		// mask_shape_h.graphics.beginFill(0xffffff, 1);
		// mask_shape_h.graphics.drawRect(-light, -light, light * 2, CellBgRender._height * 2);
		// mask_shape_h.graphics.endFill();
		// mask_shape_w.graphics.beginFill(0xffffff, 1);
		// mask_shape_w.graphics.drawRect(-light, -light, CellBgRender._width * 2, light * 2);
		// mask_shape_w.graphics.endFill();
	}

}

