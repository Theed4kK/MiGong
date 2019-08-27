class MyEvent extends egret.Event {

	public static updateStepNum = "updateStepNum";
	public static moveScroll = "moveScroll";
	

	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}