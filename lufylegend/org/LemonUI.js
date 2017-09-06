/** 
 * 方块按钮
 * @param {String} name 按钮文字。
 * @param {int} size [可选]按钮文字的大小。
 * @param {String} font [可选]按钮文字的格式。
 * @param {String} color [可选]按钮文字的颜色。
 * @public
 */
var ButtonRect = (function () {
	function ButtonRect (name, size, font, color, bgColor) {
		var s = this;
		size=size||20;color=color||"#000000";font=font||"Arial";bgColor=bgColor||"#5CA31B";
		
		s.backgroundColor = bgColor
		var btn_up = new LSprite();
		btn_up.back = new LSprite();
		btn_up.addChild(btn_up.back);
		labelText = new LTextField();
		labelText.color = color;
		labelText.font = font;
		labelText.size = size;
		labelText.x = size * 0.5;
		labelText.y = size * 0.5;
		labelText.text = name;
		s.labelText = labelText;
		btn_up.back.addChild(labelText);
		var btn_down = new LSprite();
		btn_down.x = btn_down.y = 1;
		labelText = labelText.clone();
		btn_down.addChild(labelText);
		var btn_disable = btn_down.clone();
		btn_disable.alpha = 0.5;
		LExtends(s, LButton, [btn_up, btn_down, null, btn_disable]);
		s.type = "ButtonRect";
		s.baseWidth = s.width = labelText.getWidth() + size;
		s.baseHeight = s.height = 2.2 * size;
		s.backgroundSet = null;
		s.widthSet = null;
		s.heightSet = null;
		s.xSet = null;
		s.ySet = null;
		s.addEventListener(LEvent.ENTER_FRAME, s._onDraw);
	}
	ButtonRect.prototype.clone = function () {
		var s = this, name = s.labelText.text, size = s.labelText.size, font = s.labelText.font, color = s.labelText.color,
		a = new ButtonRect(name, size, font, color);
		a.backgroundColor = s.backgroundColor;
		a.x = s.x;
		a.y = s.y;
		return a;
	};
	/**
	 * 设置按钮文字。
	 */
	ButtonRect.prototype.setLabel = function (text) {
		var s = this;
		s.bitmap_over.getChildAt(0).text = s.bitmap_up.back.getChildAt(0).text = text;
		s.baseWidth = s.width = s.bitmap_up.back.getChildAt(0).getWidth() + s.bitmap_up.back.getChildAt(0).size;
		s.backgroundSet = null;
	};
	ButtonRect.prototype._onDraw = function (s) {
		var co = s.getRootCoordinate(), labelText;
		if (s.backgroundSet == s.backgroundColor && s.widthSet == s.width && s.heightSet == s.height && s.xSet == co.x && s.ySet == co.y) {
			return;
		}
		s.backgroundSet = s.backgroundColor;
		s.widthSet = s.width > s.baseWidth ? s.width : s.baseWidth;
		s.heightSet = s.height > s.baseHeight ? s.height : s.baseHeight;
		s.width = s.widthSet;
		s.height = s.heightSet;
		s.xSet = co.x;
		s.ySet = co.y;
		labelText = s.bitmap_up.back.getChildAt(0);
		labelText.x = (s.width - s.baseWidth + labelText.size) * 0.5;
		labelText.y = (s.height - s.baseHeight + labelText.size) * 0.5;
		labelText = s.bitmap_over.getChildAt(0);
		labelText.x = (s.width - s.baseWidth + labelText.size) * 0.5;
		labelText.y = (s.height - s.baseHeight + labelText.size) * 0.5;
		var grd = LGlobal.canvas.createLinearGradient(0, -s.height * 0.5, 0, s.height * 2);
		grd.addColorStop(0, "#FFFFFF");
		grd.addColorStop(1, s.backgroundColor);
		var grd2 = LGlobal.canvas.createLinearGradient(0, -s.height, 0, s.height * 2);
		grd2.addColorStop(0, "#FFFFFF");
		grd2.addColorStop(1, s.backgroundColor);
		s.bitmap_up.back.graphics.clear();
		s.bitmap_over.graphics.clear();
		s.bitmap_up.back.graphics.drawRect(1, s.backgroundColor, [0, 0, s.widthSet, s.heightSet], true, grd);
		s.bitmap_up.back.graphics.drawRect(0, s.backgroundColor, [1, s.heightSet * 0.5, s.widthSet - 2, s.heightSet * 0.5 - 1], true, grd2);
		s.bitmap_over.graphics.drawRect(1, s.backgroundColor, [0, 0, s.widthSet, s.heightSet], true, grd);
		s.bitmap_over.graphics.drawRect(0, s.backgroundColor, [1, s.heightSet * 0.5, s.widthSet - 2, s.heightSet * 0.5 - 1], true, grd2);
		s.disableState.graphics.drawRect(1, s.backgroundColor, [0, 0, s.widthSet, s.heightSet], true, grd);
		s.disableState.graphics.drawRect(0, s.backgroundColor, [1, s.heightSet * 0.5, s.widthSet - 2, s.heightSet * 0.5 - 1], true, grd2);
	};
	return ButtonRect;
})();
/**
 	*边角是弧形的方块按钮
	*/
var ButtonRoundRect = (function () {
	function ButtonRoundRect (name, size, font, color, bgColor) {
		var s = this;
		LExtends(s, ButtonRect, [name, size, font, color, bgColor]);
		s.type = "ButtonRoundRect";
	}
	ButtonRoundRect.prototype.clone = function () {
		var s = this, name = s.labelText.text, size = s.labelText.size, font = s.labelText.font, color = s.labelText.color,
		a = new ButtonRoundRect(name, size, font, color);
		a.backgroundColor = s.backgroundColor;
		a.x = s.x;
		a.y = s.y;
		return a;
	};
	ButtonRoundRect.prototype._onDraw = function (s) {
		var co = s.getRootCoordinate(), labelText;
		if (s.backgroundSet == s.backgroundColor && s.widthSet == s.width && s.heightSet == s.height && s.xSet == co.x && s.ySet == co.y) {
			return;
		}
		s.backgroundSet = s.backgroundColor;
		s.widthSet = s.width > s.baseWidth ? s.width : s.baseWidth;
		s.heightSet = s.height > s.baseHeight ? s.height : s.baseHeight;
		s.width = s.widthSet;
		s.height = s.heightSet;
		s.xSet = co.x;
		s.ySet = co.y;
		labelText = s.bitmap_up.back.getChildAt(0);
		labelText.x = (s.width - s.baseWidth + labelText.size) * 0.5;
		labelText.y = (s.height - s.baseHeight + labelText.size) * 0.5;
		labelText = s.bitmap_over.getChildAt(0);
		labelText.x = (s.width - s.baseWidth + labelText.size) * 0.5;
		labelText.y = (s.height - s.baseHeight + labelText.size) * 0.5;
		var grd = LGlobal.canvas.createLinearGradient(0, -s.height * 0.5, 0, s.height * 2);
		grd.addColorStop(0, "#FFFFFF");
		grd.addColorStop(1, s.backgroundColor);
		var grd2 = LGlobal.canvas.createLinearGradient(0, -s.height, 0, s.height * 2);
		grd2.addColorStop(0, "#FFFFFF");
		grd2.addColorStop(1, s.backgroundColor);
		s.bitmap_up.back.graphics.clear();
		s.bitmap_over.graphics.clear();
		s.bitmap_up.back.graphics.drawRoundRect(1, s.backgroundColor, [0, 0, s.width, s.height, s.height * 0.1], true, grd);
		s.bitmap_up.back.graphics.drawRoundRect(0, s.backgroundColor, [1, s.height * 0.5, s.width - 2, s.height * 0.5 - 1, s.height * 0.1], true, grd2);
		s.bitmap_over.graphics.drawRoundRect(1, s.backgroundColor, [0, 0, s.width, s.height, s.height * 0.1], true, grd);
		s.bitmap_over.graphics.drawRoundRect(0, s.backgroundColor, [1, s.height * 0.5, s.width - 2, s.height * 0.5 - 1, s.height * 0.1], true, grd2);
		s.disableState.graphics.drawRoundRect(1, s.backgroundColor, [0, 0, s.width, s.height, s.height * 0.1], true, grd);
		s.disableState.graphics.drawRoundRect(0, s.backgroundColor, [1, s.height * 0.5, s.width - 2, s.height * 0.5 - 1, s.height * 0.1], true, grd2);
	};
	return ButtonRoundRect;
})();
/**
 	*圆形按钮
	*/
var ButtonCircle = (function () {
	function ButtonCircle (name, size, font, color, bgColor) {
		var s = this;
		LExtends(s, ButtonRect, [name, size, font, color, bgColor]);
		s.type = "ButtonCircle";
	}
	ButtonCircle.prototype.clone = function () {
		var s = this, name = s.labelText.text, size = s.labelText.size, font = s.labelText.font, color = s.labelText.color,
		a = new ButtonCircle(name, size, font, color);
		a.backgroundColor = s.backgroundColor;
		a.x = s.x;
		a.y = s.y;
		return a;
	};
	ButtonCircle.prototype._onDraw = function (s) {
		var co = s.getRootCoordinate(), labelText;
		if (s.backgroundSet == s.backgroundColor && s.widthSet == s.width && s.heightSet == s.height && s.xSet == co.x && s.ySet == co.y) {
			return;
		}
		s.backgroundSet = s.backgroundColor;
		s.widthSet = s.width > s.baseWidth ? s.width : s.baseWidth;
		s.heightSet = s.height > s.baseHeight ? s.height : s.baseHeight;
		s.width = s.widthSet;
		s.height = s.heightSet;
		s.xSet = co.x;
		s.ySet = co.y;
		labelText = s.bitmap_up.back.getChildAt(0);
		labelText.x = (s.width - s.baseWidth + labelText.size) * 0.5;
		labelText.y = (s.width - s.baseHeight + labelText.size) * 0.5;
		labelText = s.bitmap_over.getChildAt(0);
		labelText.x = (s.width - s.baseWidth + labelText.size) * 0.5;
		labelText.y = (s.width - s.baseHeight + labelText.size) * 0.5;
		var grd = LGlobal.canvas.createLinearGradient(0, -s.height * 0.5, 0, s.height * 2);
		grd.addColorStop(0, "#FFFFFF");
		grd.addColorStop(1, s.backgroundColor);
		var grd2 = LGlobal.canvas.createLinearGradient(0, -s.height, 0, s.height * 2);
		grd2.addColorStop(0, "#FFFFFF");
		grd2.addColorStop(1, s.backgroundColor);
		s.bitmap_up.back.graphics.clear();
		s.bitmap_over.graphics.clear();
		s.bitmap_up.back.graphics.drawEllipse(1, s.backgroundColor, [0, 0, s.width, s.width], true, grd);
		s.bitmap_up.back.graphics.drawEllipse(0, s.backgroundColor, [0, 0, s.width, s.width], true, grd2);
		s.bitmap_over.graphics.drawEllipse(1, s.backgroundColor, [0, 0, s.width, s.width], true, grd);
		s.bitmap_over.graphics.drawEllipse(0, s.backgroundColor, [0, 0, s.width, s.width], true, grd2);
		s.disableState.graphics.drawEllipse(1, s.backgroundColor, [0, 0, s.width, s.width], true, grd);
		s.disableState.graphics.drawEllipse(0, s.backgroundColor, [0, 0, s.width, s.width], true, grd2);
	};
	return ButtonCircle;
})();

/**
 	*输入文本
	*/
var TextInput = (function () {
	function TextInput (x, y, width, size, color) {
		x=x||0; y=y||0; width=width||100; size=size||18; color=color||"#000000";
		var s = this;
		LExtends(s,LTextField);
		s.type = "TextInput";
		s.width=width;
		s.size=size;
		s.color=color;
		s.x=x;
		s.y=y;
		var textBackground = new LSprite();
		textBackground.graphics.drawRect(1, "#000000", [0, 0, s.width, s.getHeight() * 1.5]);
		s.setType(LTextFieldType.INPUT,textBackground);
	}
	return TextInput;
})();
/**多行显示文本的一个文本区域*/
var TextArea = (function () {
	function TextArea (x, y, width, height, size, color,setType) {
		x=x||0; y=y||0; width=width||300; height=height||200; size=size||18; color=color||"#000000"; setType=setType||LTextFieldType.INPUT;
		var s = this;
		LExtends(s,LTextField);
		s.type = "TextMultiline";
		s.width=width;
		s.size=size;
		s.color=color;
		s.x=x;
		s.y=y;
		var textBackground = new LSprite();
		textBackground.graphics.drawRect(1,"#000000",[0, 0, width, height]);
		s.setType(setType,textBackground);
		s.setMultiline(true);
	}
	return TextArea;
})();