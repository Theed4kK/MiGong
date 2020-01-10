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
			let offset = { y: vertex.y > posy ? 1 : -1, x: vertex.x > posx ? 1 : -1, }
			//竖边界交点
			let res_v = this.segmentsIntr(vertex, { x: posx, y: posy }, { x: boundary_x, y: posy - offset.y }, { x: boundary_x, y: vertex.y + offset.y })
			//横边界交点
			let res_h = this.segmentsIntr(vertex, { x: posx, y: posy }, { x: posx - offset.x, y: boundary_y }, { x: vertex.x + offset.x, y: boundary_y })
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
					//判断竖墙是本格的左或右
					let wall_1 = !res_v_left ? cell.rightWall : cell.leftWall;
					//判断横墙是本格的左或右
					let _cell = !res_v_left ? cell.rightCell : cell.leftCell;
					//判断交点是否在
					let isEdge = res_h_top ? (res_v.y > cellPos.y1 && res_v.y < cellPos.y1 + WallRender.hWallHeight) : (res_v.y < cellPos.y2 && res_v.y > cellPos.y2 - WallRender.hWallHeight);
					//竖墙存在（本格）
					if (!wall_1.isOpen) {
						intersection = res_v;
					}
					//竖墙不存在
					else {
						//相交的横墙是上还是下
						let wall_2 = res_h_top ? _cell.upWall : _cell.downWall;
						if (!wall_2.isOpen) {
							intersection = res_h;
						}
						else {
							intersection = isEdge ? res_v : vertex;
						}
					}
				}
				//先与横边界相交
				else {
					//判断横墙是本格的上或下
					let wall_1 = res_h_top ? cell.upWall : cell.downWall;
					//判断竖墙是本格的上或下
					let _cell = res_h_top ? cell.upCell : cell.downCell;
					//判断交点是在本格的左或右
					let isEdge = res_v_left ? (res_h.x > cellPos.x1 && res_h.x < cellPos.x1 + WallRender.vWallwidth) : (res_h.x < cellPos.x2 && res_h.x > cellPos.x2 - WallRender.vWallwidth);
					//横墙存在（本格）
					if (!wall_1.isOpen) {
						intersection = res_h;
					}
					//横墙不存在
					else {
						//相交的竖墙是左还是右
						let wall_2 = res_v_left ? _cell.leftWall : _cell.rightWall;
						if (!wall_2.isOpen) {
							intersection = res_v;
						}
						else {
							intersection = isEdge ? res_h : vertex;
						}
					}
				}
			}
			//只与竖墙相交
			else if (res_v) {
				let wall = res_v_left ? cell.leftWall : cell.rightWall;
				let isEdge = res_h_top ? (res_v.y > cellPos.y1 && res_v.y < cellPos.y1 + WallRender.hWallHeight) : (res_v.y < cellPos.y2 && res_v.y > cellPos.y2 - WallRender.hWallHeight);
				intersection = (wall.isOpen && !isEdge) ? vertex : res_v;
			}
			//只与横墙相交
			else if (res_h) {
				let wall = res_h_top ? cell.upWall : cell.downWall;
				let isEdge = res_v_left ? (res_h.x > cellPos.x1 && res_h.x < cellPos.x1 + WallRender.vWallwidth) : (res_h.x < cellPos.x2 && res_h.x > cellPos.x2 - WallRender.vWallwidth);
				intersection = (wall.isOpen && !isEdge) ? vertex : res_h;
			}
			if (!intersection) { intersection = vertex }
			pos_group.push(new egret.Point(intersection.x, intersection.y));
			// test.push(
			// 	{ x: intersection.x, y: intersection.y, angle: angle, dis_group: [dis_v, dis_h] }
			// )
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

	segmentsIntr(a, b, c, d) {
		if (c.x == -999 || c.y === -999 || d.x == -999 || d.y == -999) {
			return null;
		}
		// 三角形abc 面积的2倍  
		var area_abc = (a.x - c.x) * (b.y - c.y) - (a.y - c.y) * (b.x - c.x);
		// 三角形abd 面积的2倍  
		var area_abd = (a.x - d.x) * (b.y - d.y) - (a.y - d.y) * (b.x - d.x);
		// 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);  
		if (area_abc * area_abd >= 0) {
			return null;
		}
		// 三角形cda 面积的2倍  
		var area_cda = (c.x - a.x) * (d.y - a.y) - (c.y - a.y) * (d.x - a.x);
		// 三角形cdb 面积的2倍  
		// 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.  
		var area_cdb = area_cda + area_abc - area_abd;
		if (area_cda * area_cdb >= 0) {
			return null;
		}
		//计算交点坐标  
		var t = area_cda / (area_abd - area_abc);
		var dx = t * (b.x - a.x),
			dy = t * (b.y - a.y);
		return { x: a.x + dx, y: a.y + dy };

	}
}