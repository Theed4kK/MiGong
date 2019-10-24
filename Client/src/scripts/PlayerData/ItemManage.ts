
class ItemManage implements PlayerData {
	private constructor() {
	}

	public static instance: ItemManage = new ItemManage();

	public static GetInstance() {
		return ItemManage.instance;
	}

	public data: { [id: number]: number } = {};

	public async GetItem(id: number, num: number = 1) {
		if (this.data[id]) {
			this.data[id] += num;
		}
		else {
			this.data[id] = num;
		}
		await this.SaveData();
	}

	/**合成物品
	 * 默认合成1个
	 * 返回:1成功 -1材料数量不足 -2物品无合成配置或错误*/
	public ComposeItem(id: number, num: number = 1) {
		let configs = Config.GetInstance().configs_item;
		if (configs[id].need_item == "") {
			return -2;
		}
		let need_items = configs[id].need_item.split(",");
		let need_nums = configs[id].need_num.split(",");
		need_items.forEach((v, i) => {
			let id = Number(v);
			if (configs[id]) {
				if (this.data[id] < Number(need_nums[i])) {
					return -1;
				}
			}
			else {
				return -2;
			}
		})
		need_items.forEach((v, i) => {
			this.GetItem(Number(v), -Number(need_nums[i]));
		})
		this.GetItem(id, num);
		return 1;
	}

	public LoadData() {
		this.data = Common.LoadData(data_key_item);
	}

	public SaveData() {
		Common.SaveData(data_key_item, { ownItems: this.data });
	}
}