class GameItem extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.Init();
	}

	private list: eui.List;


	private Init(): void {
		this.list.itemRenderer
		this.list.dataProvider
	}


}

class ItemRenderInGameUI extends eui.ItemRenderer {
	public constructor() {
		super();
	}

	private img_icon: eui.Image;
	private txt_num: eui.Label;

	protected dataChanged(): void {

	}

	
}