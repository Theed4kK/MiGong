class Config extends eui.UILayer {
	public constructor() {
		super();
	}

	public static InitCofing() {
		ItemLib.Init(RES.getRes('item_json'));
		MapLib.Init(RES.getRes('map_json'));
	}
}