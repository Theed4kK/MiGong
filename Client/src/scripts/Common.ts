class Common {
	public constructor() {
	}

	public static getRandomInt(min: number, max: number): number {
		var Range = max - min;
		var Rand = Math.random();
		return (min + Math.round(Rand * Range));
	}

	/**把数组字段转换成数组
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
		else{
			return arr;
		}
	}

	public static SaveData(key: string, data: any) {
		let dataStr = JSON.stringify(data);
		egret.localStorage.setItem(key, dataStr);
	}

	public static LoadData(key: string): any {
		let dataStr = egret.localStorage.getItem(key);
		let data = JSON.parse(dataStr);
		return data;
	}
}