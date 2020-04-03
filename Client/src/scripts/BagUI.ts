class BagUI extends UIBase {
	public constructor() {
		super(true);
		this.isScale = true;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private list_item1: eui.List;
	private list_item2: eui.List;
	private view: eui.ViewStack;
	private tabBar: eui.TabBar;

	private souceData = [];
	private arrayCollection: eui.ArrayCollection;
	protected childrenCreated(): void {
		super.childrenCreated();
		this.view.getChildAt(0).name = "道具";
		this.view.getChildAt(1).name = "贡品";
		this.tabBar.dataProvider = this.view;
		this.view.selectedIndex = 0;
		this.InitList();
		this.RrefreshList(this.view.selectedIndex);
		this.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, (e: eui.ItemTapEvent) => {
			this.DisplayList(e.itemIndex);
		}, this);
		this.addEventListener("OnOpen", this.OnOpen, this);
	}

	OnOpen() {
		this.RrefreshList(this.view.selectedIndex);
	}

	//面板和道具类型的对应关系
	indexToType = {
		0: 1,
		1: 2
	}

	lists: eui.List[];
	InitList() {
		let self: BagUI = this;
		self.list_item1.itemRenderer = BagItemRender;
		self.list_item2.itemRenderer = BagItemRender;
		self.lists = [self.list_item1, self.list_item2];
	}

	RrefreshList(index: number) {
		let self: BagUI = this;
		ItemManage.GetInstance().Getdata().then(data => {
			self.souceData = Common.DictionaryToArray(data);
			self.DisplayList(0);
		});
	}

	DisplayList(index: number) {

		let self: BagUI = this;
		if (self.lists[index].dataProvider) {
			return;
		}
		let itemConfigs = Config.GetInstance().config_item;
		let souceData = self.souceData.filter(x => itemConfigs[x.id].type == self.indexToType[index]);
		if (souceData.length == 0) {
			return;
		}
		self.arrayCollection = new eui.ArrayCollection(souceData);
		self.lists[index].dataProvider = self.arrayCollection;
	}
}

class BagItemRender extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private img_icon: eui.Image;
	private txt_name: eui.Label;
	private txt_num: eui.Label;
	private txt_des: eui.Label;

	protected dataChanged() {
		let config = Config.GetInstance().config_item[this.data.id];
		this.img_icon.source = config.pic;
		this.txt_name.text = config.name;
		this.txt_num.text = `当前拥有：${this.data.value}`;
		this.txt_des.text = config.des;
	}



}	