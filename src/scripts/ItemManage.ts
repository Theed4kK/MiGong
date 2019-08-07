
class ItemManage {
	public constructor() {
	}

	public static itemData: { [key: number]: number } = {};

	public static async GetItem(id: number, num: number = 1) {
		ItemManage.itemData[id] += num;
		await ItemManage.SaveData();
	}

	/**合成物品
	 * 默认合成1个
	 * 返回:1成功 -1材料数量不足 -2物品无合成配置或错误*/
	public static ComposeItem(id: number, num: number = 1) {
		if (ItemLib.configs[id].need_item == "") {
			return -2;
		}
		let need_items = ItemLib.configs[id].need_item.split(",");
		let need_nums = ItemLib.configs[id].need_num.split(",");
		need_items.forEach((v, i) => {
			let id = Number(v);
			if (ItemLib.configs[id]) {
				if (ItemManage.itemData[id] < Number(need_nums[i])) {
					return -1;
				}
			}
			else {
				return -2;
			}
		})
		need_items.forEach((v, i) => {
			ItemManage.GetItem(Number(v), -Number(need_nums[i]));
		})
		ItemManage.GetItem(id, num);
		return 1;
	}

	public static LoadData() {
		ItemManage.itemData = Common.LoadData(key_itemData);
	}

	public static SaveData() {
		Common.SaveData(key_itemData, ItemManage.itemData);
	}
}