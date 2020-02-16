class PlayerDataManage implements IPlayerDataManage {
	public constructor() {
	}

	data: {
		level: number,
		point: number
	};
	private init: boolean = false;
	async Getdata() {
		if (!this.init) {
			await PlayerDataManage.instance.LoadData().then(res => {
				this.init = true;
			});
			return this.data;
		} else {
			return this.data;
		}
	}

	private static instance: PlayerDataManage;

	public static GetInstance() {
		if (!PlayerDataManage.instance) {
			PlayerDataManage.instance = new PlayerDataManage()
		}
		return PlayerDataManage.instance;
	}

	async GetPoint(num: number) {
		let data = await this.Getdata();
		data.point += num;
		if (data.point < 0) { data.point = 0 }
		let maxLvl = +Config.GetInstance().config_common["maxLvl"].value;
		let configs = Config.GetInstance().config_level;
		if (num >= 0) {
			for (let i = data.level; i < maxLvl; i++) {
				if (data.point < configs[i].point) {
					break;
				}
				data.level++;
			}
		}
		else {
			for (let i = data.level; i > 1; i--) {
				if (data.point >= configs[i - 1].point) {
					break;
				}
				data.level--;
			}
		}
		this.SaveData();
	}

	SaveData() {
		DBManage.GetInstance().SaveData(data_key_player, this.data);
	}

	async LoadData() {
		this.data = await DBManage.GetInstance().LoadData(data_key_player);
		if (!this.data) {
			this.data = { level: 1, point: 0 };
		}
	}
}