class ItemManage implements IPlayerDataManage {
	public static instance: ItemManage;

	public static GetInstance() {
		if (!ItemManage.instance) {
			ItemManage.instance = new ItemManage();
		}
		return ItemManage.instance;
	}

	public data: { [id: number]: number };
	init: boolean = false;
	async Getdata() {
		if (!this.init) {
			await ItemManage.instance.LoadData().then(res => {
				this.init = true;
			});
		}
		return this.data;
	}

	async GetItem(id: number, num: number = 1) {
		let data = await this.Getdata();
		if (data[id]) {
			data[id] += num;
		}
		else {
			data[id] = num;
		}
		if (data[id] == 0) {
			delete data[id];
		}
		this.SaveData();
	}

	async GetItems(items: eui.ArrayCollection) {
		if (!items || items.length == 0) { return; }
		let data = await this.Getdata();
		for (let i = 0; i < items.length; i++) {
			let itemInfo: { id: number, value: number } = items.getItemAt(i);
			if (data[itemInfo.id]) {
				data[itemInfo.id] += itemInfo.value;
			}
			else {
				data[itemInfo.id] = itemInfo.value;
			}
			if (data[itemInfo.id] == 0) {
				delete data[itemInfo.id];
			}
		}
		this.SaveData();
	}

	/**合成物品
	 * 默认合成1个
	 * 返回:1成功 -1材料数量不足 -2物品无合成配置或错误*/
	async ComposeItem(id: number, num: number = 1) {
		let configs = Config.GetInstance().config_item;
		if (configs[id].need_item == "") {
			return -2;
		}
		let data = await this.Getdata();
		let need_items = configs[id].need_item.split(",");
		let need_nums = configs[id].need_num.split(",");
		need_items.forEach((v, i) => {
			let id = Number(v);
			if (configs[id]) {
				if (data[id] < Number(need_nums[i])) {
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

	async LoadData() {
		this.data = await DBManage.GetInstance().LoadData(data_key_item);
		if (!this.data) { this.data = {}; }
	}

	SaveData() {
		DBManage.GetInstance().SaveData(data_key_item, this.data);
	}
}