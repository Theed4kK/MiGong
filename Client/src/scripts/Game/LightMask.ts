class LightMask extends egret.Sprite {
	private cirleLight: egret.Shape;
	private lightMatrix: egret.Matrix;
	// private circle: eui.Image;

	public constructor() {
		super();
		let self: LightMask = this;
		self.lightMatrix = new egret.Matrix();

		self.cirleLight = new egret.Shape();
		this.blendMode =egret.BlendMode.ERASE;
		self.cirleLight.blendMode = egret.BlendMode.ERASE;
		self.cirleLight.anchorOffsetX = self.cirleLight.width/2;
		self.cirleLight.anchorOffsetY = self.cirleLight.height/2;
		self.addChild(self.cirleLight);
	}

	//设置光圈的位置
	public setLightPos(posx: number, posy: number) {
		this.cirleLight.x = posx;
		this.cirleLight.y = posy;
	}
	//设置背景框的大小
	public setMaskSize(maskW: number, maskH: number) {
		this.graphics.clear();
		this.graphics.beginFill(0x000000, 0.8);
		this.graphics.drawRect(0, 0, maskW, maskH);
		this.graphics.endFill();
	}
	//设置光圈的大小
	public setLightValue(light: number) {
		this.lightMatrix.createGradientBox(light * 2, light * 2, 0, -light, -light);
		let cirleLight = this.cirleLight;
		cirleLight.graphics.clear();
		let colorGroup: number[] = [0xffffff, 0xd3d3d3, 0x888888, 0x000000];
		let alphasGroup: number[] = [1, 0.9, 0.2, 0];
		let colorNumGroup: number[] = [0, 50, 180, 255];
		cirleLight.graphics.beginGradientFill(egret.GradientType.RADIAL, colorGroup, alphasGroup, colorNumGroup, this.lightMatrix);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
		cirleLight.graphics.drawRect(0, 0, light,light);
		cirleLight.graphics.endFill();
	}

}

