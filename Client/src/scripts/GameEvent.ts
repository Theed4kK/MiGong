class GameEvent {
	static MoveScroll = "MoveScroll";
	static RefreshCurRender = "RefreshCurRender";
	static GetItem = "GetItem";

	static eventObj: egret.DisplayObject = new egret.DisplayObject();

	static addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number) {
		GameEvent.eventObj.addEventListener(type, listener, thisObject, useCapture, priority);
	}

	static removeEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean) {
		if (useCapture == null || useCapture == undefined) {
			GameEvent.eventObj.removeEventListener(type, listener, thisObject);
		}
		else {
			GameEvent.eventObj.removeEventListener(type, listener, thisObject, useCapture);
		}
	}

	static dispatchEventWith(type: string, bubbles?: boolean, data?: any, cancelable?: boolean) {
		GameEvent.eventObj.dispatchEventWith(type, bubbles, data, cancelable);
	}

	static dispatchEvent(type: string, bubbles?: boolean, cancelable?: boolean, data?: any) {
		const event = new egret.Event(type, bubbles, cancelable, data);
		GameEvent.eventObj.dispatchEvent(event);
	}

}