class Config {
	private static instance: Config;
	public static GetInstance() {
		Config.instance = Config.instance ? Config.instance : new Config();
		return Config.instance;
	}

	public configs_item: { [key: number]: any };
	public configs_map: { [key: number]: any };
	// public configs_level: { [key: number]: MapLib };

	private config_paths = [
		["configs_item", "item_json"],
		["configs_map", "map_json"]
	]

	public InitCofing(): void {
		this.config_paths.forEach(path => {
			Config.instance[path[0]] = this.GetConfigFromFile(path[1]);
		})
	}

	private GetConfigFromFile(fileName: string) {
		let objs = RES.getRes(fileName);
		let configs: { [key: number]: any } =[];
		objs.forEach(v => {
			configs[v.id] = v;
		})
		return configs;
	}
}