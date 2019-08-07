const key_itemData: string = "itemData";

class Common {
	public constructor() {
	}

	public static getRandomInt(min: number, max: number): number {
		var Range = max - min;
		var Rand = Math.random();
		return (min + Math.round(Rand * Range));
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