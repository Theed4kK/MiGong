class Common {
	/**获得一个随机整数 */
	public static getRandomInt(min: number, max: number): number {
		var Range = max - min;
		var Rand = Math.random();
		return (min + Math.round(Rand * Range));
	}

	/**把数组字符串转换成数组
	 * breakWord:分隔符
	 * toNum:返回的是数值数组还是字符串数组
	 */
	public static ParseField(field: string, breakWord: string = ",", toNum: boolean = true) {
		let arr = field.split(breakWord);
		if (toNum) {
			let nums: number[] = [];
			arr.forEach(v => {
				nums.push(Number(v));
			})
			return nums;
		}
		else {
			return arr;
		}
	}

	/**字典类转数组类，用于给eui.list提供数据源 */
	public static DictionaryToArray(dict: { [id: number]: any } | { [id: string]: any }): { id: number | string, value: any }[] {
		let data: { id: number | string, value: any }[] = [];
		for (let item in dict) {
			data.push({ id: item, value: dict[item] })
		}
		return data;
	}

	public static DisPlayToBmps(disObj: egret.DisplayObject, maxSize: number = 2048) {
		let con = new egret.DisplayObjectContainer;
		let col = disObj.width / maxSize;
		let row = disObj.height / maxSize;
		for (let i = 0; i < ~~col; i++) {
			for (let j = 0; j < ~~row; j++) {
				let render = new egret.RenderTexture;
				let x = i * maxSize;
				let y = j * maxSize;
				let width = maxSize;
				let height = maxSize;
				Common.CreateBmp(con, disObj, x, y, width, height);
			}
			let x = i * maxSize;
			let y = ~~row * maxSize;
			let width = maxSize;
			let height = disObj.height - ~~row * maxSize;
			Common.CreateBmp(con, disObj, x, y, width, height);
		}
		for (let i = 0; i < ~~row; i++) {
			let x = ~~col * maxSize;
			let y = i * maxSize;
			let width = disObj.width - ~~col * maxSize;
			let height = maxSize;
			Common.CreateBmp(con, disObj, x, y, width, height);
		}
		let x = ~~col * maxSize;
		let y = ~~row * maxSize;
		let width = disObj.width - ~~col * maxSize;
		let height = disObj.height - ~~row * maxSize;
		Common.CreateBmp(con, disObj, x, y, width, height);
		return con;
	}

	private static CreateBmp(con: egret.DisplayObjectContainer, disObj: egret.DisplayObject, x, y, width, height) {
		let render = new egret.RenderTexture;
		render.drawToTexture(disObj, new egret.Rectangle(x, y, width, height));
		let bmp = new egret.Bitmap(render);
		con.addChild(bmp);
		bmp.x = x;
		bmp.y = y;
	}

	public static MapViewRefresh(con: egret.DisplayObjectContainer, view: egret.Rectangle) {
		for (let i = 0; i < con.numChildren; i++) {
			let child = con.getChildAt(i);
			let rect = child.getBounds();
			rect.x = child.x;
			rect.y = child.y;
			child.visible = rect.intersects(view);
		}
	}

}

enum Color {
	red = 0xff0000,
	green = 0x00FF00,
	blue = 0x0000FF,
	yellow = 0xFFFF00,
	black = 0x000000,
	purple = 0x8A2BE2,
	pink = 0xFF00FF,
	white = 0xFFFFFF
}