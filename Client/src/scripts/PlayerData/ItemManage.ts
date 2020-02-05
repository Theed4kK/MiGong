class ItemManage implements IPlayerDataManage {
	private constructor() {
		this.LoadData();
	}

	public static instance: ItemManage;

	public static GetInstance() {
		if (!ItemManage.instance) {
			ItemManage.instance = new ItemManage();
		}
		return ItemManage.instance;
	}

	public data: { [id: number]: number };

	public GetItem(id: number, num: number = 1) {
		if (this.data[id]) {
			this.data[id] += num;
		}
		else {
			this.data[id] = num;
		}
		this.SaveData();
	}

	public GetItems(items: { [id: number]: number }) {
		if (items == {}) { return; }
		for (let id in items) {
			if (this.data[id]) {
				this.data[id] += items[id];
			}
			else {
				this.data[id] = items[id];
			}
		}
		this.SaveData();
	}

	/**合成物品
	 * 默认合成1个
	 * 返回:1成功 -1材料数量不足 -2物品无合成配置或错误*/
	public ComposeItem(id: number, num: number = 1) {
		let configs = Config.GetInstance().config_item;
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

	LoadData() {
		this.data = Common.LoadData(data_key_item);
		if (!this.data) { this.data = {}; }
	}

	SaveData() {
		Common.SaveData(data_key_item, this.data);
	}
}