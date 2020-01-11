class Config {
	private static instance: Config;
	public static GetInstance() {
		Config.instance = Config.instance ? Config.instance : new Config();
		return Config.instance;
	}

	public config_item: { [key: number]: any };
	public config_map: { [key: number]: any };
	// public config_level: { [key: number]: any };
	public config_common: { [key: string]: any };

	private config_paths = [
		["config_item", "item_json"],
		["config_map", "map_json"],
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
		// if (fileName == "commom_json") {
		// 	let configs: { [key: string]: any } = [];
		// }
		// else {
		// 	let configs: { [key: number]: any } = [];
		// }
		objs.forEach(v => {
			configs[v.id] = v;
		})
		return configs;
	}
}