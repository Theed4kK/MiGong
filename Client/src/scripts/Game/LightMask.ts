class LightMask extends egret.Sprite {
	private cirleLight: egret.Shape = new egret.Shape();
	private mask_shape: egret.Shape = new egret.Shape();
	private lightMatrix: egret.Matrix = new egret.Matrix();

	private light_size: number;
	public constructor() {
		super();
		let self: LightMask = this;

		self.cirleLight.blendMode = egret.BlendMode.ERASE;
		self.mask_shape.blendMode = egret.BlendMode.ERASE;

		self.mask_shape.alpha = 0.3;

		self.addChild(self.mask_shape);
		self.addChild(self.cirleLight);
	}

	//设置光圈的位置
	public setLightPos(posx: number, posy: number) {
		this.cirleLight.x = posx;
		this.cirleLight.y = posy;

		let light = this.light_size;
		this.mask_shape.graphics.beginFill(0x000000, 1);
		this.mask_shape.graphics.drawCircle(-light + posx, -light + posy, light * 2);
		this.mask_shape.graphics.endFill();
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
		this.lightMatrix.createGradientBox(light * 2, light * 2, 0, -light, -light);
		this.light_size = light;
		let cirleLight = this.cirleLight;
		cirleLight.graphics.clear();
		let colorGroup: number[] = [0xffffff, 0xd3d3d3, 0x888888, 0x000000];
		let alphasGroup: number[] = [1, 0.9, 0.2, 0];
		let colorNumGroup: number[] = [0, 50, 180, 255];
		// cirleLight.graphics.beginGradientFill(egret.GradientType.RADIAL, colorGroup, alphasGroup, colorNumGroup, this.lightMatrix);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
		cirleLight.graphics.beginFill(0xffffff, 1);
		// cirleLight.graphics.drawCircle(-light / 2, -light / 2, light);
		cirleLight.graphics.drawRect(-light, -light, light * 2, light * 2);
		cirleLight.graphics.endFill();

		this.mask_shape.graphics.beginFill(0x000000, 1);
		this.mask_shape.graphics.drawRect(-light, -light, light * 2, light * 2);
		this.mask_shape.graphics.endFill();
		
	}

}

