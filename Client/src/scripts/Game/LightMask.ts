class LightMask extends egret.Sprite {
	private mask_shape: egret.Shape;
	private cirleLight_shape: egret.Shape;
	private mask_bitMap: egret.Bitmap;
	private _mask_bitMap: egret.Bitmap;
	private mask_con: egret.DisplayObjectContainer;

	private radius: number;
	wall_height: number = + Config.GetInstance().config_common["wall_height"].value;
	wall_width: number = +Config.GetInstance().config_common["wall_height"].value;
	cell_height: number = +Config.GetInstance().config_common["cell_height"].value;
	cell_width: number = +Config.GetInstance().config_common["cell_height"].value;
	public constructor() {
		super();
		let self: LightMask = this;
		self.cacheAsBitmap = true;

		self.mask_shape = new egret.Shape();
		self.mask_bitMap = new egret.Bitmap();
		self._mask_bitMap = new egret.Bitmap();
		self.mask_con = new egret.DisplayObjectContainer();
		self.mask_con.addChild(self._mask_bitMap);
		self.mask_con.addChild(self.mask_shape);
		self.mask_bitMap.blendMode = egret.BlendMode.ERASE;
		self.mask_bitMap.alpha = 0.4;

		self.cirleLight_shape = new egret.Shape();
		self.cirleLight_shape.blendMode = egret.BlendMode.ERASE;

		self.addChild(self.mask_bitMap);
		self.addChild(self.cirleLight_shape);
	}

	//设置背景框的大小
	public async InitLight() {
		let self: LightMask = this;
		let playerData = await PlayerDataManage.GetInstance().Getdata();
		let map: MapLib = Config.GetInstance().config_map[playerData.level];
		let maskW = map.size * self.cell_width;
		let maskH = 15 * self.cell_height;
		self.graphics.clear();
		self.graphics.beginFill(0x000000, 1);
		self.graphics.drawRect(self.wall_width, self.wall_height, maskW - self.wall_width, maskH - self.wall_height);
		self.graphics.endFill();
		self.radius = self.cell_width - self.wall_width * 2;
		let c_m = new egret.Matrix();
		c_m.createGradientBox(self.radius * 2, self.radius * 2, 0, -self.radius, -self.radius);
		let colorGroup = [0, 255];
		let alphaGroup = [1, 0.2];
		self.cirleLight_shape.graphics.clear();
		self.cirleLight_shape.graphics.beginGradientFill(egret.GradientType.RADIAL, [0xffffff, 0xffffff], alphaGroup, colorGroup, c_m);//这个渐变的参数是自己调的，可能不太理想，谁有好的参数可以留言，谢谢啦。
		self.cirleLight_shape.graphics.drawCircle(0, 0, self.radius);
		self.cirleLight_shape.graphics.endFill();

		self.mask_shape.graphics.beginFill(0x000000, 1);
		self.mask_shape.graphics.drawCircle(0, 0, self.radius);
		self.mask_shape.graphics.endFill();

	}

	// private passedPos: { [x: number]: { [y: number]: boolean } } = {};
	private render: egret.RenderTexture = new egret.RenderTexture();
	private render1: egret.RenderTexture = new egret.RenderTexture();
	设置光圈的位置
	public MoveMask(posx: number, posy: number, cell: Cell, cellRender: WallRender) {
		let self: LightMask = this;
		self.cirleLight_shape.x = posx;
		self.cirleLight_shape.y = posy;
		self.mask_shape.x = posx;
		self.mask_shape.y = posy;

		// self.mask_shape.graphics.beginFill(0x000000, 1);
		// self.mask_shape.graphics.drawCircle(posx, posy, self.radius);
		// self.mask_shape.graphics.endFill();

		if (self.mask_bitMap.texture == self.render) {
			self.render1.drawToTexture(self.mask_con);
			self.mask_bitMap.texture = self.render1;
			self._mask_bitMap.texture = self.render1;
		}
		else {
			self.render.drawToTexture(self.mask_con);
			self.mask_bitMap.texture = self.render;
			self._mask_bitMap.texture = self.render;
		}
	}
	// public MoveMask(posx: number, posy: number, cell: Cell, cellRender: CellBgRender) {
	// 	let self: LightMask = this;
	// 	let radius = this.radius;
	// 	let cellPos = {
	// 		x1: cellRender.x - this.wall_width / 2,
	// 		x2: cellRender.x + this.wall_width / 2 + this.cell_width,
	// 		y1: cellRender.y - this.wall_height / 2,
	// 		y2: cellRender.y + this.wall_height / 2 + this.cell_height,
	// 	}

	// 	for (let angle = 0; angle <= 360; angle += 2) {
	// 		let vertex = { x: posx + radius * Math.sin(Math.PI * angle / 180), y: posy - radius * Math.cos(Math.PI * angle / 180) };
	// 		let boundary_x = vertex.x >= cellPos.x2 ? cellPos.x2 : (vertex.x <= cellPos.x1 ? cellPos.x1 : -999);
	// 		let boundary_y = vertex.y >= cellPos.y2 ? cellPos.y2 : (vertex.y <= cellPos.y1 ? cellPos.y1 : -999);
	// 		let offset = { y: vertex.y > posy ? 0.3 : -0.3, x: vertex.x > posx ? 0.3 : -0.3 };
	// 		// let offset = { y: 0, x: 0 }
	// 		//竖边界交点
	// 		let res_v = this.segmentsIntr(vertex, { x: posx, y: posy }, { x: boundary_x, y: posy - offset.y }, { x: boundary_x, y: vertex.y + offset.y })
	// 		//横边界交点
	// 		let res_h = this.segmentsIntr(vertex, { x: posx, y: posy }, { x: posx - offset.x, y: boundary_y }, { x: vertex.x + offset.x, y: boundary_y })
	// 		let intersection;
	// 		// let res_v_left = angle > 180;
	// 		// let res_h_top = angle < 90 || angle > 270;
	// 		let dis_v, dis_h;
	// 		//同时与横竖边界相交
	// 		if (res_v && res_h) {
	// 			let res_v_left = res_v.x < cellRender.x + this.cell_width / 2;
	// 			let res_h_top = res_h.y < cellRender.y + this.cell_height / 2;
	// 			//距离两个交点的长度
	// 			dis_v = egret.Point.distance(new egret.Point(posx, posy), new egret.Point(res_v.x, res_v.y));
	// 			dis_h = egret.Point.distance(new egret.Point(posx, posy), new egret.Point(res_h.x, res_h.y));
	// 			//先与竖边界相交
	// 			if (dis_v < dis_h) {
	// 				//判断竖墙是本格的左或右
	// 				let wall_1 = !res_v_left ? cell.rightWall : cell.leftWall;
	// 				//判断横墙是本格的左或右
	// 				let _cell = !res_v_left ? cell.rightCell : cell.leftCell;
	// 				//竖墙存在（本格）
	// 				if (!wall_1.isOpen) {
	// 					intersection = res_v;
	// 				}
	// 				//竖墙不存在
	// 				else {
	// 					//相交的横墙是上还是下
	// 					let wall_2 = res_h_top ? _cell.upWall : _cell.downWall;
	// 					if (!wall_2.isOpen) {
	// 						intersection = res_h;
	// 					}
	// 					else {
	// 						let isEdge = (res_v.y > cellPos.y1 && res_v.y < cellPos.y1 + this.wall_height) || (res_v.y < cellPos.y2 && res_v.y > cellPos.y2 - this.wall_height);
	// 						intersection = isEdge ? res_v : vertex;
	// 					}
	// 				}
	// 			}
	// 			//先与横边界相交
	// 			else {
	// 				//判断横墙是本格的上或下
	// 				let wall_1 = res_h_top ? cell.upWall : cell.downWall;
	// 				//判断竖墙是本格的上或下
	// 				let _cell = res_h_top ? cell.upCell : cell.downCell;
	// 				//横墙存在（本格）
	// 				if (!wall_1.isOpen) {
	// 					intersection = res_h;
	// 				}
	// 				//横墙不存在
	// 				else {
	// 					//相交的竖墙是左还是右
	// 					let wall_2 = res_v_left ? _cell.leftWall : _cell.rightWall;
	// 					if (!wall_2.isOpen) {
	// 						intersection = res_v;
	// 					}
	// 					else {
	// 						let isEdge = (res_h.x > cellPos.x1 && res_h.x < cellPos.x1 + this.wall_width) || (res_h.x < cellPos.x2 && res_h.x > cellPos.x2 - this.wall_width);
	// 						intersection = isEdge ? res_h : vertex;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		//只与竖墙相交
	// 		else if (res_v) {
	// 			let res_v_left = res_v.x < cellRender.x + this.cell_width / 2;
	// 			let wall = res_v_left ? cell.leftWall : cell.rightWall;
	// 			if (!wall.isOpen) {
	// 				intersection = res_v;
	// 			}
	// 			else {
	// 				let res_h_top = res_v.y < cellRender.y + this.cell_height / 2;
	// 				let cell_2 = res_v_left ? cell.leftCell : cell.rightCell;
	// 				let wall_2 = res_h_top ? cell_2.upWall : cell_2.downWall;
	// 				let isEdge = (res_v.y > cellPos.y1 && res_v.y < cellPos.y1 + this.wall_height) || (res_v.y < cellPos.y2 && res_v.y > cellPos.y2 - this.wall_height);
	// 				if (!isEdge) {
	// 					intersection = vertex;
	// 				}
	// 				else {
	// 					if (wall_2.isOpen) {
	// 						intersection = res_v;
	// 					}
	// 					else {
	// 						intersection = vertex;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		//只与横墙相交
	// 		else if (res_h) {
	// 			let res_h_top = res_h.y < cellRender.y + this.cell_height / 2;
	// 			let wall = res_h_top ? cell.upWall : cell.downWall;
	// 			if (!wall.isOpen) {
	// 				intersection = res_h;
	// 			}
	// 			else {
	// 				let res_v_left = res_h.x < cellRender.x + this.cell_width / 2;
	// 				let cell_2 = res_h_top ? cell.upCell : cell.downCell;
	// 				let wall_2 = res_v_left ? cell_2.leftWall : cell_2.rightWall;
	// 				let isEdge = (res_h.x > cellPos.x1 && res_h.x < cellPos.x1 + this.wall_width) || (res_h.x < cellPos.x2 && res_h.x > cellPos.x2 - this.wall_width);
	// 				if (!isEdge) {
	// 					intersection = vertex;
	// 				}
	// 				else {
	// 					if (wall_2.isOpen) {
	// 						intersection = res_h;
	// 					}
	// 					else {
	// 						intersection = vertex;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		if (!intersection) { intersection = vertex }
	// 		pos_group.points.push(new egret.Point(intersection.x, intersection.y));
	// 	}
	// 	self.DrawShape(self.cirleLight_shape, pos_group);
	// 	let _posX = Math.floor(posx / 5);
	// 	let _posY = Math.floor(posy / 5);
	// 	if (self.passedPos[_posX] && self.passedPos[_posX][_posY]) {
	// 		return;
	// 	}
	// 	// let mask_shape = new egret.Shape();
	// 	// self.DrawShape(mask_shape, pos_group);
	// 	// self.mask_con.addChild(mask_shape);
	// 	// if (self.maskNum > 180) {
	// 	// 	self.maskNum = 0;
	// 	// 	let render = new egret.RenderTexture();
	// 	// 	render.drawToTexture(self.mask_sprite);
	// 	// 	if (self.mask_bitmap.texture) {
	// 	// 		self.mask_bitmap.texture.dispose();
	// 	// 	}
	// 	// 	self.mask_bitmap.texture = render;
	// 	// 	self.mask_sprite.removeChild(self.mask_con);
	// 	// 	self.mask_con = new egret.DisplayObjectContainer();
	// 	// 	self.mask_sprite.addChild(self.mask_con);
	// 	// }
	// 	// self.maskNum++;
	// 	if (!self.passedPos[_posX]) {
	// 		self.passedPos[_posX] = {};
	// 	}
	// 	self.passedPos[_posX][_posY] = true;
	// }


	DrawShape(shape, pos_group, clear: boolean = true) {
		if (clear) {
			shape.graphics.clear();
		}
		shape.graphics.beginFill(0xffffff, 1);
		shape.graphics.lineStyle(1, 0xffffff);
		shape.graphics.moveTo(pos_group.posx, pos_group.posy);
		pos_group.points.forEach(intersection => {
			shape.graphics.lineTo(intersection.x, intersection.y);
		})
		shape.graphics.lineTo(pos_group.posx, pos_group.posy);
		shape.graphics.endFill();
	}

	//获取交点
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