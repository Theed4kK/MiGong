class Fly_Tips {
	public constructor() {
	}

	public static SendTips(tips: string) {
		//创建 TextField 对象
		var label: egret.TextField = new egret.TextField();
		//设置字体
		label.fontFamily = "Microsoft YaHei";
		label.textAlign = egret.HorizontalAlign.CENTER;
		//设置文本颜色
		label.textColor = 0xF9C86D;
		label.stroke = 0.1;
		label.strokeColor = 0xffffff;
		//设置字号
		label.size = 26;
		//设置显示文本
		label.text = tips;
		//添加到显示列表
		UIBase.UILayer.stage.addChild(label);
		label.y = UIBase.UILayer.height / 2;
		label.width = UIBase.UILayer.width;
		let tw = egret.Tween.get(label);
		tw.to({ y: UIBase.UILayer.width / 2 - 300 }, 2000).call(() => {
			UIBase.UILayer.stage.removeChild(label);
		});
	}
}