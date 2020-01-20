class PlayerDataManage implements IPlayerDataManage {
	public constructor() {
		this.LoadData();
	}

	public data: {
		level: number,
		point: number
	};

	public static instance: PlayerDataManage;

	public static GetInstance() {
		if (!PlayerDataManage.instance) {
			PlayerDataManage.instance = new PlayerDataManage();
		}
		return PlayerDataManage.instance;
	}

	public GetPoint(num: number) {
		this.data.point += num;
		if (this.data.point < 0) { this.data.point = 0 }
		let maxLvl = +Config.GetInstance().config_common["maxLvl"].value;
		let configs = Config.GetInstance().config_level;
		if (num >= 0) {
			for (let i = this.data.level; i < maxLvl; i++) {
				if (this.data.point < configs[i].point) {
					break;
				}
				this.data.level++;
			}
		}
		else {
			for (let i = this.data.level; i > 1; i--) {
				if (this.data.point >= configs[i - 1].point) {
					break;
				}
				this.data.level--;
			}
		}
		this.SaveData();
	}

	SaveData() {
		Common.SaveData(data_key_player, this.data);
	}

	LoadData() {
		this.data = Common.LoadData(data_key_player);
		if (!this.data) {
			this.data = { level: 1, point: 0 };
		}
	}
}