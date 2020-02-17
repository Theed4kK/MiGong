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

	public start(x, y) {
		this.x = x;
		this.y = y;
		this.visible = true;
		this.ball.x = this.centerX;
		this.ball.y = this.centerY;
	}

	//触摸移动，设置小球的位置
	private p1: egret.Point = new egret.Point();
	private p2: egret.Point = new egret.Point();
	public onTouchMove(e: egret.TouchEvent): number {
		let self: VirtualRocker = this;
		self.p1.x = self.x;
		self.p1.y = self.y;
		self.p2.x = e.stageX;
		self.p2.y = e.stageY;
		let dist = egret.Point.distance(self.p1, self.p2);
		let angle: number = Math.atan2(e.stageY - self.y, e.stageX - self.x);
		//手指距离在圆环范围内
		if (dist <= (self.circleRadius - self.ballRadius)) {
			self.ball.x = self.centerX + e.stageX - self.x;
			self.ball.y = self.centerY + e.stageY - self.y;
			//手指距离在圆环范围外
		} else {
			self.ball.x = Math.cos(angle) * (self.circleRadius - self.ballRadius) + self.centerX;
			self.ball.y = Math.sin(angle) * (self.circleRadius - self.ballRadius) + self.centerY;
		}
		return angle;
	}
}