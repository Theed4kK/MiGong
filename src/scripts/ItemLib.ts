class ItemLib {
	public constructor() {
	}

	public id: number;
	public name: string;
	public point: number;
	public need_point:number;
	public weight:number;
	public des: string;
	public need_item: string;
	public need_num: string;

	public static configs: { [key: number]: ItemLib } = {};

	public static Init(objs: Array<any>): void {
		objs.forEach(v => {
			ItemLib.configs[v.id] = v as ItemLib;
		})
	}
}