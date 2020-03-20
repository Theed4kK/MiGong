class GameItemRender extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private img_icon: eui.Image;
	private txt_num: eui.Label;

	protected dataChanged() {
		let data: { id: number, value: number } = this.data;
		let config = Config.GetInstance().config_item[data.id];
		this.img_icon.source = config.pic;
		let glow = new egret.GlowFilter(Color[config.quality], 0.5, 10, 10, 10, egret.BitmapFilterQuality.HIGH, false, false);
		this.img_icon.filters = [glow];
		this.txt_num.text = `× ${data.value}`;
	}
}