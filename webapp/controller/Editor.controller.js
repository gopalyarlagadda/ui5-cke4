sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sharedlibrary/uiControls/RTE/control/v4/Editor"
	//"gy/com/CustomEditor/control/RTE/v4/Editor"
], function(Controller, RTEditor4) {
	"use strict";

	return Controller.extend("gy.com.CustomEditor.controller.Editor", {
		//RTEditor4: RTEditor4,
		onInit: function(){
			var oRTE4 = new RTEditor4({
				customFonts: [
					{	displayName: "Custom font",
						actualFontName: "Pacifico"
					}
				],
				editorSkin: "moonocolor"
			});
			this.getView().byId("idAppControl").addContent(oRTE4);
		}
	});
});