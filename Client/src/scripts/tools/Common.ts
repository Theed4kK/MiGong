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

	public static DisPlayToBmps(disObj: egret.DisplayObject, maxSize: number = 1500) {
		let con = new egret.DisplayObjectContainer;
		let col = disObj.width / maxSize;
		let row = disObj.height / maxSize;
		let bmps: egret.Bitmap[] = [];
		for (let i = 0; i < ~~col; i++) {
			for (let j = 0; j < ~~row; j++) {
				let rect = new egret.Rectangle(
					i * maxSize,
					j * maxSize,
					maxSize,
					maxSize
				)
				let bmp = Common.CreateBmp(con, disObj, rect);
				bmps.push(bmp);
			}
			let rect = new egret.Rectangle(
				i * maxSize,
				~~row * maxSize,
				maxSize,
				disObj.height - ~~row * maxSize
			)
			let bmp = Common.CreateBmp(con, disObj, rect);
			bmps.push(bmp);
		}
		for (let i = 0; i < ~~row; i++) {
			let rect = new egret.Rectangle(
				~~col * maxSize,
				i * maxSize,
				disObj.width - ~~col * maxSize,
				maxSize
			)
			let bmp = Common.CreateBmp(con, disObj, rect);
			bmps.push(bmp);
		}
		let rect = new egret.Rectangle(
			~~col * maxSize,
			~~row * maxSize,
			disObj.width - ~~col * maxSize,
			disObj.height - ~~row * maxSize
		)
		let bmp = Common.CreateBmp(con, disObj, rect);
		bmps.push(bmp);
		return { con: con, bmps: bmps };
	}

	private static CreateBmp(con: egret.DisplayObjectContainer, disObj: egret.DisplayObject, rect: egret.Rectangle) {
		let render = new egret.RenderTexture;
		render.drawToTexture(disObj, rect);
		let bmp = new egret.Bitmap(render);
		bmp.x = rect.x;
		bmp.y = rect.y;
		return bmp;
	}

	public static MapViewRefresh(display: { con: egret.DisplayObjectContainer, bmps: egret.Bitmap[] }, view: egret.Rectangle) {
		display.bmps.forEach(bmp => {
			let rect = bmp.getBounds();
			rect.x = bmp.x;
			rect.y = bmp.y;
			if (rect.intersects(view) && !display.con.contains(bmp)) {
				display.con.addChild(bmp);
			}
			else if (!rect.intersects(view) && display.con.contains(bmp)) {
				display.con.removeChild(bmp);
			}
		})
	}

	public static SetImageColor(image: eui.Image, color: number) {
		// 将16进制颜色分割成rgb值
		let spliceColor = (color) => {
			let result = { r: -1, g: -1, b: -1 };
			result.b = color % 256;
			result.g = Math.floor((color / 256)) % 256;
			result.r = Math.floor((color / 256) / 256);
			return result;
		}
		let result = spliceColor(color);
		let colorMatrix = [
			1, 0, 0, 0, 0,
			0, 1, 0, 0, 0,
			0, 0, 1, 0, 0,
			0, 0, 0, 1, 0
		];
		colorMatrix[0] = result.r / 255;
		colorMatrix[6] = result.g / 255;
		colorMatrix[12] = result.b / 255;
		let colorFilter = new egret.ColorMatrixFilter(colorMatrix);

		image.filters = [colorFilter];
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