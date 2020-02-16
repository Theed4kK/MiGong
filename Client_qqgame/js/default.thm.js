var egret = window.egret;window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/Common/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/Common/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/Common/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/Common/HSliderSkin.exml","eui.Panel":"resource/eui_skins/Common/PanelSkin.exml","eui.TextInput":"resource/eui_skins/Common/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/Common/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/Common/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/Common/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/Common/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/Common/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/Common/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","GameUI":"resource/eui_skins/Game/Game.exml","Loading":"resource/eui_skins/Loading.exml","MapScroller":"resource/eui_skins/MapScroller.exml","CellBgRender":"resource/eui_skins/Game/CellBgRender.exml","VirtualRocker":"resource/eui_skins/Game/VirtualRocker.exml","ItemUI":"resource/eui_skins/ItemUI.exml","GameItem":"resource/eui_skins/Game/GameItem.exml","ExitTips":"resource/eui_skins/Game/ExitTips.exml","StartPage":"resource/eui_skins/StartPage.exml","BagUI":"resource/eui_skins/item/BagUI.exml","BagItemRender":"resource/eui_skins/item/BagItemRender.exml"};generateEUI.paths['resource/eui_skins/Common/Button_1.exml'] = window.Button_1 = (function (_super) {
	__extends(Button_1, _super);
	function Button_1() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 50;
		this.width = 100;
		this.elementsContent = [this._Image1_i(),this._Label1_i()];
		this.states = [
			new eui.State ("disable",
				[
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Label1","textColor",0x878787)
				])
			,
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","alpha",1),
					new eui.SetProperty("_Label1","textColor",0xffffff)
				])
		];
	}
	var _proto = Button_1.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(14,12,35,3);
		t.source = "on_png";
		t.top = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.size = 18;
		t.text = "按钮文字";
		t.textAlign = "center";
		t.top = 0;
		t.verticalAlign = "middle";
		return t;
	};
	return Button_1;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.height = 30;
		this.minHeight = 20;
		this.minWidth = 20;
		this.width = 30;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		t.visible = false;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.source = "kuang_box_input_7_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0x636363;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Common/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Game/CellBgRender.exml'] = window.CellBgRenderSkin = (function (_super) {
	__extends(CellBgRenderSkin, _super);
	function CellBgRenderSkin() {
		_super.call(this);
		this.skinParts = ["img_bg","img_item","img_exitSign","img_upWall","img_leftWall","img_rightWall","img_downWall"];
		
		this.height = 200;
		this.width = 200;
		this.elementsContent = [this.img_bg_i(),this.img_item_i(),this.img_exitSign_i(),this.img_upWall_i(),this.img_leftWall_i(),this.img_rightWall_i(),this.img_downWall_i()];
	}
	var _proto = CellBgRenderSkin.prototype;

	_proto.img_bg_i = function () {
		var t = new eui.Image();
		this.img_bg = t;
		t.alpha = 1;
		t.bottom = 0;
		t.fillMode = "scale";
		t.left = 0;
		t.right = 0;
		t.source = "cell_bg_02_jpg";
		t.top = 0;
		t.visible = false;
		return t;
	};
	_proto.img_item_i = function () {
		var t = new eui.Image();
		this.img_item = t;
		t.height = 40;
		t.source = "";
		t.width = 40;
		t.x = 80;
		t.y = 80;
		return t;
	};
	_proto.img_exitSign_i = function () {
		var t = new eui.Image();
		this.img_exitSign = t;
		t.height = 40;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 40;
		return t;
	};
	_proto.img_upWall_i = function () {
		var t = new eui.Image();
		this.img_upWall = t;
		t.anchorOffsetX = 0;
		t.fillMode = "repeat";
		t.height = 10;
		t.left = -5;
		t.right = -5;
		t.source = "wall1";
		t.top = -5;
		t.touchEnabled = false;
		t.visible = false;
		return t;
	};
	_proto.img_leftWall_i = function () {
		var t = new eui.Image();
		this.img_leftWall = t;
		t.bottom = -5;
		t.fillMode = "repeat";
		t.left = -5;
		t.source = "wall1";
		t.top = -5;
		t.touchEnabled = false;
		t.visible = false;
		return t;
	};
	_proto.img_rightWall_i = function () {
		var t = new eui.Image();
		this.img_rightWall = t;
		t.anchorOffsetX = 0;
		t.bottom = -5;
		t.fillMode = "repeat";
		t.right = -5;
		t.source = "wall1";
		t.top = -5;
		t.touchEnabled = false;
		t.visible = false;
		t.width = 10;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.img_downWall_i = function () {
		var t = new eui.Image();
		this.img_downWall = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -5;
		t.fillMode = "repeat";
		t.height = 10;
		t.left = -5;
		t.right = -5;
		t.source = "wall1";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 10;
		t.y = 10;
		return t;
	};
	return CellBgRenderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Game/ExitTips.exml'] = window.ExitTipsSkin = (function (_super) {
	__extends(ExitTipsSkin, _super);
	function ExitTipsSkin() {
		_super.call(this);
		this.skinParts = ["txt_tips","btn_cancel","btn_exit"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ExitTipsSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 350;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 480;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this.txt_tips_i(),this.btn_cancel_i(),this.btn_exit_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "header_png";
		t.top = 0;
		t.x = -112;
		t.y = -409;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.anchorOffsetY = 0;
		t.bold = true;
		t.height = 59.33;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.text = "提示";
		t.textAlign = "center";
		t.top = 0;
		t.verticalAlign = "middle";
		t.x = -112;
		t.y = -409;
		return t;
	};
	_proto.txt_tips_i = function () {
		var t = new eui.Label();
		this.txt_tips = t;
		t.anchorOffsetY = 0;
		t.height = 155.33;
		t.left = 20;
		t.lineSpacing = 10;
		t.right = 20;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 24;
		t.text = "确认退出？\n当前已获得探索积分：500\n已获得所有宝藏";
		t.textAlign = "center";
		t.top = 108;
		t.verticalAlign = "top";
		t.wordWrap = true;
		t.x = -92;
		t.y = -301;
		return t;
	};
	_proto.btn_cancel_i = function () {
		var t = new eui.Button();
		this.btn_cancel = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 50;
		t.height = 64.67;
		t.label = "再等等";
		t.left = 60;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 141.33;
		t.x = -52;
		t.y = 612.3299999999999;
		return t;
	};
	_proto.btn_exit_i = function () {
		var t = new eui.Button();
		this.btn_exit = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 50;
		t.height = 64.67;
		t.label = "退出";
		t.right = 60;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 141.33;
		t.x = 326.6699999999999;
		t.y = 612.3299999999999;
		return t;
	};
	return ExitTipsSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Game/Game.exml'] = window.GameSkin = (function (_super) {
	__extends(GameSkin, _super);
	function GameSkin() {
		_super.call(this);
		this.skinParts = ["img_Bg","btn_return","img_mapBg","scroller_bg","list_cell","group_map","scroller_map","img_role","group_light","scroller_role","txt_stepNum","txt_stepNum0","btn_exit"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.img_Bg_i(),this.btn_return_i(),this._Group2_i(),this._Group5_i()];
	}
	var _proto = GameSkin.prototype;

	_proto.img_Bg_i = function () {
		var t = new eui.Image();
		this.img_Bg = t;
		t.height = 1624;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "loading_jpg";
		t.top = 0;
		t.touchEnabled = true;
		return t;
	};
	_proto.btn_return_i = function () {
		var t = new eui.Image();
		this.btn_return = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 50;
		t.source = "";
		t.visible = false;
		t.width = 104;
		t.x = 482;
		t.y = 1019;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.bottom = 350;
		t.left = 0;
		t.right = 0;
		t.top = 80;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = false;
		t.elementsContent = [this.scroller_bg_i(),this.scroller_map_i(),this.scroller_role_i()];
		return t;
	};
	_proto.scroller_bg_i = function () {
		var t = new eui.Scroller();
		this.scroller_bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.img_mapBg_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.img_mapBg_i = function () {
		var t = new eui.Image();
		this.img_mapBg = t;
		t.anchorOffsetX = 0;
		t.bottom = 8;
		t.fillMode = "repeat";
		t.height = 500;
		t.includeInLayout = true;
		t.left = 5;
		t.right = 5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "cell_bg_02";
		t.top = 8;
		t.width = 500;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.scroller_map_i = function () {
		var t = new eui.Scroller();
		this.scroller_map = t;
		t.bottom = 0;
		t.bounces = false;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.viewport = this.group_map_i();
		return t;
	};
	_proto.group_map_i = function () {
		var t = new eui.Group();
		this.group_map = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = false;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.list_cell_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.list_cell_i = function () {
		var t = new eui.List();
		this.list_cell = t;
		t.includeInLayout = true;
		t.scaleX = 1;
		t.scaleY = 1;
		t.useVirtualLayout = true;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 0;
		t.orientation = "rows";
		t.paddingBottom = 5;
		t.paddingLeft = 5;
		t.paddingRight = 5;
		t.paddingTop = 5;
		t.requestedRowCount = 15;
		t.verticalGap = 0;
		return t;
	};
	_proto.scroller_role_i = function () {
		var t = new eui.Scroller();
		this.scroller_role = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.viewport = this.group_light_i();
		return t;
	};
	_proto.group_light_i = function () {
		var t = new eui.Group();
		this.group_light = t;
		t.layout = this._HorizontalLayout3_i();
		t.elementsContent = [this.img_role_i()];
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.img_role_i = function () {
		var t = new eui.Image();
		this.img_role = t;
		t.height = 40;
		t.includeInLayout = false;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "role";
		t.verticalCenter = 0;
		t.width = 40;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.bottom = 50;
		t.height = 300;
		t.left = 0;
		t.right = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.elementsContent = [this._Group4_i(),this.btn_exit_i()];
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.elementsContent = [this._Group3_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 38;
		t.left = 0;
		t.right = 0;
		t.y = 3;
		t.elementsContent = [this._Image1_i(),this.txt_stepNum_i(),this.txt_stepNum0_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.fillMode = "scale";
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "border_png";
		t.top = 0;
		t.touchEnabled = false;
		return t;
	};
	_proto.txt_stepNum_i = function () {
		var t = new eui.Label();
		this.txt_stepNum = t;
		t.bottom = 0;
		t.fontFamily = "Microsoft YaHei";
		t.left = 65;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.text = "已探索：1/300";
		t.textAlign = "left";
		t.textColor = 0x141401;
		t.top = 0;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.txt_stepNum0_i = function () {
		var t = new eui.Label();
		this.txt_stepNum0 = t;
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.fontFamily = "Microsoft YaHei";
		t.left = 233;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.text = "已找到宝藏：5/10";
		t.textAlign = "left";
		t.textColor = 0x141401;
		t.top = 0;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.width = 173.09;
		return t;
	};
	_proto.btn_exit_i = function () {
		var t = new eui.Button();
		this.btn_exit = t;
		t.bottom = 133;
		t.horizontalCenter = 0;
		t.label = "退出";
		t.skinName = "skins.ButtonSkin";
		return t;
	};
	return GameSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Game/GameItem.exml'] = window.GameItemSkin = (function (_super) {
	__extends(GameItemSkin, _super);
	function GameItemSkin() {
		_super.call(this);
		this.skinParts = ["list"];
		
		this.height = 86;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this.list_i(),this._Button1_i()];
	}
	var _proto = GameItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.source = "board_msg_box_2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 200;
		t.top = 0;
		return t;
	};
	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.label = "Button";
		t.x = 476;
		t.y = 16;
		return t;
	};
	return GameItemSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Game/GameItemRender.exml'] = window.GameItemRender = (function (_super) {
	__extends(GameItemRender, _super);
	function GameItemRender() {
		_super.call(this);
		this.skinParts = ["img_icon","txt_num"];
		
		this.height = 86;
		this.width = 167;
		this.elementsContent = [this.img_icon_i(),this.txt_num_i()];
	}
	var _proto = GameItemRender.prototype;

	_proto.img_icon_i = function () {
		var t = new eui.Image();
		this.img_icon = t;
		t.height = 70;
		t.left = 10;
		t.verticalCenter = 0;
		t.width = 70;
		return t;
	};
	_proto.txt_num_i = function () {
		var t = new eui.Label();
		this.txt_num = t;
		t.left = 94;
		t.size = 36;
		t.text = "500";
		t.verticalCenter = 0;
		return t;
	};
	return GameItemRender;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Game/VirtualRocker.exml'] = window.VirtualRockerSkin = (function (_super) {
	__extends(VirtualRockerSkin, _super);
	function VirtualRockerSkin() {
		_super.call(this);
		this.skinParts = ["circle","ball"];
		
		this.height = 140;
		this.width = 140;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = VirtualRockerSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = false;
		t.elementsContent = [this.circle_i(),this.ball_i()];
		return t;
	};
	_proto.circle_i = function () {
		var t = new eui.Image();
		this.circle = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "padIcon";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.ball_i = function () {
		var t = new eui.Image();
		this.ball = t;
		t.anchorOffsetX = 25;
		t.anchorOffsetY = 25;
		t.height = 50;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "padIcon_01";
		t.touchEnabled = false;
		t.width = 50;
		t.x = 70;
		t.y = 70;
		return t;
	};
	return VirtualRockerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/item/BagItemRender.exml'] = window.BagItemRenderSkin = (function (_super) {
	__extends(BagItemRenderSkin, _super);
	function BagItemRenderSkin() {
		_super.call(this);
		this.skinParts = ["img_icon","txt_name","txt_num","txt_des"];
		
		this.height = 125;
		this.width = 604;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.img_icon_i(),this.txt_name_i(),this.txt_num_i(),this.txt_des_i()];
	}
	var _proto = BagItemRenderSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "box_jiaotai_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 20;
		t.source = "sign_empty_box_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.img_icon_i = function () {
		var t = new eui.Image();
		this.img_icon = t;
		t.height = 80;
		t.left = 35;
		t.verticalCenter = 0;
		t.width = 80;
		return t;
	};
	_proto.txt_name_i = function () {
		var t = new eui.Label();
		this.txt_name = t;
		t.fontFamily = "Microsoft YaHei";
		t.left = 147;
		t.size = 26;
		t.stroke = 0.2;
		t.strokeColor = 0xd80a48;
		t.text = "物品名字";
		t.textColor = 0xe81972;
		t.verticalCenter = -39;
		return t;
	};
	_proto.txt_num_i = function () {
		var t = new eui.Label();
		this.txt_num = t;
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.fontFamily = "Microsoft YaHei";
		t.right = 19;
		t.size = 22;
		t.text = "拥有数量：500";
		t.textAlign = "right";
		t.textColor = 0xc69b59;
		t.top = 0;
		t.verticalAlign = "middle";
		t.width = 216.67;
		return t;
	};
	_proto.txt_des_i = function () {
		var t = new eui.Label();
		this.txt_des = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 71.33;
		t.left = 147;
		t.size = 20;
		t.text = "物品描述";
		t.textColor = 0x141414;
		t.verticalCenter = 22.5;
		t.width = 268;
		return t;
	};
	return BagItemRenderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/item/BagTabBar.exml'] = window.BagTabBar = (function (_super) {
	__extends(BagTabBar, _super);
	function BagTabBar() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Label1_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","alpha",0.5),
					new eui.SetProperty("_Label1","textColor",0xbfbfbf)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",1),
					new eui.SetProperty("_Image1","touchEnabled",false),
					new eui.SetProperty("_Label1","textColor",0xffffff),
					new eui.SetProperty("_Label1","touchEnabled",false)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this._Label1,"text");
	}
	var _proto = BagTabBar.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.source = "style7_default_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.textAlign = "center";
		t.top = 0;
		t.verticalAlign = "middle";
		return t;
	};
	return BagTabBar;
})(eui.Skin);generateEUI.paths['resource/eui_skins/item/BagUI.exml'] = window.BagUISkin = (function (_super) {
	__extends(BagUISkin, _super);
	function BagUISkin() {
		_super.call(this);
		this.skinParts = ["list_item1","list_item2","view","tabBar"];
		
		this.elementsContent = [this._Group5_i()];
	}
	var _proto = BagUISkin.prototype;

	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 1194.58;
		t.width = 731;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this.view_i(),this.tabBar_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.fillMode = "scale";
		t.height = 1098;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "tutorial_new_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.view_i = function () {
		var t = new eui.ViewStack();
		this.view = t;
		t.height = 1000;
		t.scaleX = 1;
		t.scaleY = 1;
		t.selectedIndex = 0;
		t.width = 650;
		t.x = 41;
		t.y = 36;
		t.elementsContent = [this._Group2_i(),this._Group4_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "视图";
		t.percentWidth = 100;
		t.elementsContent = [this._Label1_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.size = 40;
		t.text = "道具";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.top = -18;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bottom = 39;
		t.left = 23;
		t.right = 23;
		t.top = 79;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.list_item1_i()];
		return t;
	};
	_proto.list_item1_i = function () {
		var t = new eui.List();
		this.list_item1 = t;
		t.anchorOffsetX = 0;
		t.height = 885;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "left";
		t.verticalAlign = "top";
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.name = "Group";
		t.percentWidth = 100;
		t.elementsContent = [this._Label2_i(),this._Scroller2_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.height = 100;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 40;
		t.text = "贡品";
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.top = -18;
		t.verticalAlign = "middle";
		t.x = -50;
		return t;
	};
	_proto._Scroller2_i = function () {
		var t = new eui.Scroller();
		t.bottom = 39;
		t.left = 23;
		t.right = 23;
		t.top = 79;
		t.viewport = this._Group3_i();
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.list_item2_i()];
		return t;
	};
	_proto.list_item2_i = function () {
		var t = new eui.List();
		this.list_item2 = t;
		t.anchorOffsetX = 0;
		t.height = 885;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.y = 0;
		t.layout = this._VerticalLayout2_i();
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "left";
		t.verticalAlign = "top";
		return t;
	};
	_proto.tabBar_i = function () {
		var t = new eui.TabBar();
		this.tabBar = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 97;
		t.itemRendererSkinName = BagTabBar;
		t.scaleX = 1;
		t.scaleY = 1;
		t.touchThrough = true;
		t.width = 648;
		t.x = 51;
		t.y = 1071;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "top";
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.name = "aaaa";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.name = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.name = "null";
		return t;
	};
	return BagUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/item/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/item/ItemUI.exml'] = window.ItemUISkin = (function (_super) {
	__extends(ItemUISkin, _super);
	function ItemUISkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 800;
		this.width = 600;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = ItemUISkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(52,54,131,144);
		t.source = "";
		t.top = 0;
		return t;
	};
	return ItemUISkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Loading.exml'] = window.Loading = (function (_super) {
	__extends(Loading, _super);
	function Loading() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._ProgressBar1_i()];
	}
	var _proto = Loading.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "loading_jpg";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto._ProgressBar1_i = function () {
		var t = new eui.ProgressBar();
		t.anchorOffsetX = 0;
		t.height = 20;
		t.horizontalCenter = 0;
		t.width = 478;
		t.y = 755.33;
		return t;
	};
	return Loading;
})(eui.Skin);generateEUI.paths['resource/eui_skins/StartPage.exml'] = window.StartPageSkin = (function (_super) {
	__extends(StartPageSkin, _super);
	function StartPageSkin() {
		_super.call(this);
		this.skinParts = ["btn_start","btn_bag","btn_level"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.btn_start_i(),this.btn_bag_i(),this.btn_level_i()];
	}
	var _proto = StartPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 1624;
		t.source = "board_bg2_jpg";
		t.width = 750;
		t.x = 0;
		return t;
	};
	_proto.btn_start_i = function () {
		var t = new eui.Button();
		this.btn_start = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 163;
		t.height = 100;
		t.horizontalCenter = 0;
		t.label = "开始游戏";
		t.width = 200;
		return t;
	};
	_proto.btn_bag_i = function () {
		var t = new eui.Button();
		this.btn_bag = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 395;
		t.height = 71.21;
		t.label = "背包";
		t.left = 100;
		t.width = 160.61;
		return t;
	};
	_proto.btn_level_i = function () {
		var t = new eui.Button();
		this.btn_level = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 395;
		t.height = 71;
		t.label = "信仰";
		t.right = 100;
		t.width = 160.61;
		return t;
	};
	return StartPageSkin;
})(eui.Skin);