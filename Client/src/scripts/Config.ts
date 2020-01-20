class Config {
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

	public InitCofing(): void {
		this.config_paths.forEach(path => {
			Config.instance[path[0]] = this.GetConfigFromFile(path[1]);
		})
	}

	private GetConfigFromFile(fileName: string) {
		let objs = RES.getRes(fileName);
		let configs = [];
		objs.forEach(v => {
			configs[v.id] = v;
		})
		return configs;
	}
}