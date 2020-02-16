class Config {
	private constructor() {

	}

	private static instance: Config;
	public static GetInstance() {
		Config.instance = Config.instance ? Config.instance : new Config();
		return Config.instance;
	}

	public config_item: { [key: number]: ItemLib };
	public config_map: { [key: number]: MapLib };
	public config_level: { [key: number]: LevelLib };
	public config_common: { [key: string]: { id: string, value: string } };

	private config_paths = [
		["config_item", "item_json"],
		["config_map", "map_json"],
		["config_level", "level_json"],
		["config_common", "commom_json"]
	]

	async InitCofing() {
		for (let path of this.config_paths) {
			const res = await RES.getResAsync(path[1])
			Config.instance[path[0]] = {};
			for (let v of res) {
				Config.instance[path[0]][v.id] = v;
			}
		}
	}
}