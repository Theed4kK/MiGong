class Common {
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

	public static SaveData(form: string, data: any) {
		// let dataStr = JSON.stringify(data);
		// egret.localStorage.setItem(key, dataStr);
		wx.cloud.callFunction({
			name: "addLog",
			data: {
				value: data,
				form: form
			},
			success: function (res): any {
				console.log("添加成功", res.result)
			},
			fail: function (err): any {
				console.log("err", err)
			}
		})

	}

	public static LoadData(form: string): any {
		// let dataStr = egret.localStorage.getItem(key);
		// let data = JSON.parse(dataStr);
		const db = wx.cloud.database()
		db.collection('logs').doc(form).get().then(res => {
			console.log('获取数据', res.data[form])
			return res.data[form];
		})
	}
}