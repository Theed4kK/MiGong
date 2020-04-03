class AsstManage {
	public constructor() {
	}

	getRes(key: string) {
		let res: any;
		if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
			wx.cloud.callFunction({
				name: "downloadFile",
				data: {
					fileID: 'key'
				},
				success: function (r): any {
					res = r.tempFilePath
				}
			})
		}
		else {
			res = RES.getRes(key);
		}
		return res;
	}
}