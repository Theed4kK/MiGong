class DBManage {
	private constructor() {
	}

	private static instance: DBManage;

	public static GetInstance() {
		if (!DBManage.instance) {
			DBManage.instance = new DBManage();
		}
		return DBManage.instance;
	}

	userInfo: any;
	async Init() {
		let self: DBManage = this;
		self.userInfo = await platform.getUserInfo("http://192.168.11.104:8080/resource/assets/role.png");
		console.log(self.userInfo);
		if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
			wx.cloud.init();
			wx.cloud.callFunction({
				name: "GetOpenId",
				data: {},
				success: function (res): any {
					self.userInfo.OPENID = res.result.OPENID
					console.log("OPENID--->", self.userInfo.OPENID)
				},
				fail: function (err): any {
					console.log("err", err)
				}
			})
		}
	}

	public SaveData(form: string, data: any) {
		if (!data) { return; }
		let self: DBManage = this;
		if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
			wx.cloud.init();
			const db = wx.cloud.database();
			let value = db.collection(form).where({
				_openid: self.userInfo.OPENID
			});
			value.count().then(res => {
				if (res.total == 0) {
					db.collection(form).add({
						data: data,
					})
				}
				else {
					value.get().then(res => {
						let _id = res.data[0]._id;
						db.collection(form).doc(_id).update({
							data: data,
							fail: err => {
								console.log("更新数据失败", err);
							}
						})
					})
				}
			})
		}
		else {
			egret.localStorage.setItem(form, JSON.stringify(data));
		}
	}

	async LoadData(form: string) {
		let self: DBManage = this;
		if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
			wx.cloud.init();
			const db = wx.cloud.database()
			let data: any = await db.collection(form).where({
				_openid: self.userInfo.OPENID
			}).get().then(res => {
				if (res.data.length > 0) {
					return res.data[0];
				}
			});
			if (data) {
				delete data._id;
				delete data._openid;
			}
			return data;
		}
		else {
			let dataStr = egret.localStorage.getItem(form);
			if (dataStr) {
				return JSON.parse(dataStr);
			}
		}
	}
}