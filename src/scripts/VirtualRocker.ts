class VirtualRocker extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	private ball: eui.Image;          //小球
	private circle: eui.Image;        //圆环
	private circleRadius: number = 0; //圆环半径
	private ballRadius: number = 0;   //小球半径
	private centerX: number = 0;      //中心点坐标
	private centerY: number = 0;
	private touchID: number;          //触摸ID

	public childrenCreated() {
		super.childrenCreated();
		//获取圆环和小球半径
		this.circleRadius = this.circle.height / 2;
		this.ballRadius = this.ball.height / 2;
		//获取中心点
		this.centerX = this.circleRadius;
		this.centerY = this.circleRadius;
		this.anchorOffsetX = this.circleRadius;
		this.anchorOffsetY = this.circleRadius;
		this.touchEnabled = false;
	}

	public start() {
		this.visible = true;
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
	}

	//停止虚拟摇杆
	public stop() {
		this.visible = false;
	}

	//触摸移动，设置小球的位置
	private p1: egret.Point = new egret.Point();
	private p2: egret.Point = new egret.Point();
	public onTouchMove(e: egret.TouchEvent): number {
		this.p1.x = this.x;
		this.p1.y = this.y;
		this.p2.x = e.stageX;
		this.p2.y = e.stageY;
		var dist = egret.Point.distance(this.p1, this.p2);
		var angle: number = Math.atan2(e.stageY - this.y, e.stageX - this.x);
		//手指距离在圆环范围内
		if (dist <= (this.circleRadius - this.ballRadius)) {
			this.ball.x = this.centerX + e.stageX - this.x;
			this.ball.y = this.centerY + e.stageY - this.y;
			//手指距离在圆环范围外
		} else {
			this.ball.x = Math.cos(angle) * (this.circleRadius - this.ballRadius) + this.centerX;
			this.ball.y = Math.sin(angle) * (this.circleRadius - this.ballRadius) + this.centerY;
		}
		return angle;
	}

	// window["VirtualRocker"] = VirtualRocker;
}