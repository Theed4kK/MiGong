class LightMask extends egret.Sprite {
	private cirleLight_sprite: egret.Sprite;
	private mask_sprite: egret.Sprite;
	private cirleLight_shape: egret.Shape;
	private mask_shape: egret.Shape;

	private radius: number;
	public constructor() {
		super();
		let self: LightMask = this;
		self.cacheAsBitmap = true;

		self.cirleLight_sprite = new egret.Sprite();
		self.cirleLight_sprite.cacheAsBitmap = true;
		self.cirleLight_sprite.blendMode = egret.BlendMode.ERASE;
		self.mask_sprite = new egret.Sprite();
		self.mask_sprite.cacheAsBitmap = true;
		self.mask_sprite.blendMode = egret.BlendMode.ERASE;
		self.mask_sprite.alpha = 0.3;


		self.mask_shape = new egret.Shape();
		self.cirleLight_shape = new egret.Shape();

		self.mask_sprite.addChild(self.mask_shape);
		self.cirleLight_sprite.addChild(self.cirleLight_shape);

		self.addChild(self.mask_sprite);
		self.addChild(self.cirleLight_sprite);
	}

	// private render: egret.RenderTexture = new egret.RenderTexture();
	public MoveLight(posx: number, posy: number) {
		this.cirleLight_shape.x = posx - WallRender.vWallwidth;
		this.cirleLight_shape.y = posy - WallRender.hWallHeight;

		this.mask_shape.graphics.beginFill(0xffffff, 1);
		// self.mask_shape.graphics.beginGradientFill(egret.GradientType.RADIAL, colorGroup, alphasGroup, colorNumGroup, lightMatrix_h);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
		this.mask_shape.graphics.drawCircle(posx, posy, CellBgRender._width * 1);
		this.mask_shape.graphics.endFill();
	}

	//设置背景框的大小
	public setMaskSize(maskW: number, maskH: number) {
		this.graphics.clear();
		this.graphics.beginFill(0x000000);
		this.graphics.drawRect(WallRender.vWallwidth, WallRender.hWallHeight, maskW - WallRender.vWallwidth * 2, maskH - WallRender.hWallHeight * 2);
		this.graphics.endFill();
		this.radius = CellBgRender._height + WallRender.hWallHeight / 2;
	}


	//设置光圈的大小
	public setLightValue(posx: number, posy: number) {
		let self: LightMask = this;
		let radius = this.radius;
		let cell = GameUI.manageCells.currentCell;
		let cellRender = GameUI.manageRenders.currentBgRender;
		let cellPos = {
			x1: cellRender.x - WallRender.vWallwidth / 2,
			x2: cellRender.x + WallRender.vWallwidth / 2 + CellBgRender._width,
			y1: cellRender.y - WallRender.hWallHeight / 2,
			y2: cellRender.y + WallRender.hWallHeight / 2 + CellBgRender._height,
		}

		let pos_group: egret.Point[] = [];

		let test: { x: number, y: number, angle: number, dis_group: number[] }[] = [];

		for (let angle = 0; angle <= 360; angle += 1) {
			let vertex = { x: posx + radius * Math.sin(Math.PI * angle / 180), y: posy - radius * Math.cos(Math.PI * angle / 180) };
			let boundary_x = vertex.x >= cellPos.x2 ? cellPos.x2 : (vertex.x < cellPos.x1 ? cellPos.x1 : -999);
			let boundary_y = vertex.y >= cellPos.y2 ? cellPos.y2 : (vertex.y < cellPos.y1 ? cellPos.y1 : -999);
			let offset = { y: vertex.y > posy ? 5 : -5, x: vertex.x > posx ? 5 : -5, }
			//竖边界交点
			let res_v = this.segmentsIntr(vertex, { x: posx, y: posy }, { x: boundary_x, y: posy + offset.y }, { x: boundary_x, y: vertex.y + offset.y })
			//横边界交点
			let res_h = this.segmentsIntr(vertex, { x: posx, y: posy }, { x: posx + offset.x, y: boundary_y }, { x: vertex.x + offset.x, y: boundary_y })
			let intersection;
			let res_v_left = angle > 180;
			let res_h_top = angle < 90 || angle > 270;
			let dis_v, dis_h;
			//同时与横竖边界相交
			if (res_v && res_h) {
				//距离两个交点的长度
				dis_v = egret.Point.distance(new egret.Point(posx, posy), new egret.Point(res_v.x, res_v.y));
				dis_h = egret.Point.distance(new egret.Point(posx, posy), new egret.Point(res_h.x, res_h.y));
				//先与竖边界相交
				if (dis_v < dis_h) {
					//与右边界相交	
					if (!res_v_left) {
						//右墙存在
						if (!cell.rightWall.isOpen) {
							intersection = res_v;
						}
						//右墙不存在
						else {
							intersection = res_h_top ? (!cell.rightCell.upWall.isOpen ? res_h : vertex) : (!cell.rightCell.downWall.isOpen ? res_h : vertex);
						}
					}
					//与左边界相交
					else {
						//左墙存在
						if (!cell.leftWall.isOpen) {
							intersection = res_v;
						}
						//左墙不存在
						else {
							intersection = res_h_top ? (!cell.leftCell.upWall.isOpen ? res_h : vertex) : (!cell.leftCell.downWall.isOpen ? res_h : vertex);
						}
					}
				}
				else {
					//与下边界相交	
					if (!res_h_top) {
						//下墙存在
						if (!cell.downWall.isOpen) {
							intersection = res_h;
						}
						//下墙不存在
						else {
							intersection = res_v_left ? (!cell.downCell.leftWall.isOpen ? res_v : vertex) : (!cell.downCell.rightWall.isOpen ? res_v : vertex);
						}
					}
					//上左边界相交
					else {
						//上墙存在
						if (!cell.upWall.isOpen) {
							intersection = res_h;
						}
						//上墙不存在
						else {
							intersection = res_v_left ? (!cell.downCell.leftWall.isOpen ? res_v : vertex) : (!cell.downCell.rightWall.isOpen ? res_h : vertex);
						}
					}
				}
			}
			//只与竖边界相交
			else if (res_v) {
				if ((res_v_left && !cell.leftWall.isOpen) || (!res_v_left && !cell.rightWall.isOpen)) {
					intersection = res_v;
				}
			}
			//只与横边界相交或不相交（）
			else if (res_h) {
				if ((res_h_top && !cell.upWall.isOpen) || (!res_h_top && !cell.downWall.isOpen)) {
					intersection = res_h;
				}
			}
			if (!intersection) { intersection = vertex }
			pos_group.push(new egret.Point(intersection.x, intersection.y));
			test.push(
				{ x: intersection.x, y: intersection.y, angle: angle, dis_group: [dis_v, dis_h] }
			)
		}
		self.cirleLight_shape.graphics.clear();
		self.cirleLight_shape.graphics.beginFill(0xffffff, 1);
		self.cirleLight_shape.graphics.lineStyle(1, 0xffffff);
		self.cirleLight_shape.graphics.moveTo(posx, posy);
		pos_group.forEach(intersection => {
			self.cirleLight_shape.graphics.lineTo(intersection.x, intersection.y);
		})
		self.cirleLight_shape.graphics.lineTo(posx, posy);
		self.cirleLight_shape.graphics.endFill();
	}


	private GetIntersection(a: any, b: any, c: any, d: any): { x: number, y: number } {
		if (!c.x || !c.y || !d.x || !d.y) {
			return null;
		}

		if ((b.y - a.y) * (c.x - d.x) - (b.x - a.x) * (c.y - d.y) == 0) {
			// Debug.Print("线段平行，无交点！");
			return null;
		}
		let intersection: any = [];
		intersection.x = ((b.x - a.x) * (c.x - d.x) * (c.y - a.y) - c.x * (b.x - a.x) * (c.y - d.y) + a.x * (b.y - a.y) * (c.x - d.x)) / ((b.y - a.y) * (c.x - d.x) - (b.x - a.x) * (c.y - d.y));
		intersection.y = ((b.y - a.y) * (c.y - d.y) * (c.x - a.x) - c.y * (b.y - a.y) * (c.x - d.x) + a.y * (b.x - a.x) * (c.y - d.y)) / ((b.x - a.x) * (c.y - d.y) - (b.y - a.y) * (c.x - d.x));


		if ((intersection.x - a.x) * (intersection.x - b.x) <= 0 && (intersection.x - c.x) * (intersection.x - d.x) <= 0 && (intersection.y - a.y) * (intersection.y - b.y) <= 0 && (intersection.y - c.y) * (intersection.y - d.y) <= 0) {
			// Debug.Print("线段相交于点(" + intersection.x + "," + intersection.y + ")！");
			return intersection //'相交
		}
		else {
			// Debug.Print("线段相交于虚交点(" + intersection.x + "," + intersection.y + ")！");
			return null; //'相交但不在线段上

		}
	}

	segmentsIntr(a, b, c, d) {

		if (c.x == -999 || c.y === -999 || d.x == -999 || d.y == -999) {
			return null;
		}

		/** 1 解线性方程组, 求线段交点. **/
		// 如果分母为0 则平行或共线, 不相交 
		var denominator = (b.y - a.y) * (d.x - c.x) - (a.x - b.x) * (c.y - d.y);
		if (denominator == 0) {
			return null;
		}

		// 线段所在直线的交点坐标 (x , y) 
		var x = ((b.x - a.x) * (d.x - c.x) * (c.y - a.y)
			+ (b.y - a.y) * (d.x - c.x) * a.x
			- (d.y - c.y) * (b.x - a.x) * c.x) / denominator;
		var y = -((b.y - a.y) * (d.y - c.y) * (c.x - a.x)
			+ (b.x - a.x) * (d.y - c.y) * a.y
			- (d.x - c.x) * (b.y - a.y) * c.y) / denominator;

		/** 2 判断交点是否在两条线段上 **/
		if (
			// 交点在线段1上 
			(x - a.x) * (x - b.x) <= 0 && (y - a.y) * (y - b.y) <= 0
			// 且交点也在线段2上 
			&& (x - c.x) * (x - d.x) <= 0 && (y - c.y) * (y - d.y) <= 0
		) {

			// 返回交点p 
			return {
				x: x,
				y: y
			}
		}
		//否则不相交 
		return null
	}
}