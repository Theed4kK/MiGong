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



	public static OPENID: string;
	public static InitWx() {
		try {
			wx.cloud.init();
			wx.cloud.callFunction({
				name: "GetOpenId",
				data: {},
				success: function (res): any {
					Common.OPENID = res.OPENID
				},
				fail: function (err): any {
					console.log("err", err)
				}
			})
			console.log("OPENID--->", Common.OPENID)
		}
		catch (err) {
			console.log(`未能成功初始化微信云：${err}`)
		}

	}

	public static SaveData(form: string, data: any) {
		try {
			wx.cloud.init();
			const db = wx.cloud.database();
			let _id;
			let value = db.collection(form).where({
				_openid: Common.OPENID
			});
			value.count().then(res => {
				if (res.total == 0) {
					db.collection(form).add({
						data: data,
						success: res => {
							console.log("添加成功", res)
						}
					})
				}
				else {
					value.get().then(res => {
						_id = res.data[0]._id;
						db.collection(form).doc(_id).update({
							data: data,
							success: res => {
								console.log("更新成功", res)
							}
						})
					})
				}
			})
		}
		catch (err) {
			egret.localStorage.setItem(form, data);
		}

	}

	public static LoadData(form: string): any {
		try {
			wx.cloud.init();
			const db = wx.cloud.database()
			db.collection(form).get().then(res => {
				console.log('获取数据', res.data)
				return res.data;
			})
		}
		catch (err) {
			return egret.localStorage.getItem(form);
		}

	}
}