class Common {

	/**获得一个随机整数 */
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


}