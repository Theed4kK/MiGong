class ItemLib {
	public constructor() {
	}

	public id: number;
	public name: string;
	public point: number;
	public des: string;
	public need_1: string;
	public need_2: string;
	public need_3: string;

	public static configs: { [key: number]: ItemLib } = {};

	public static Init(objs: Array<any>): void {
		objs.forEach(v => {
			ItemLib.configs[v.id] = v as ItemLib;
		})
	}
}