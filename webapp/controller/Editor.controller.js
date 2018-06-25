sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/capita/ControlsLibrary/uiControls/RTE/control/Editor"
	//"gy/com/CustomEditor/control/RTE/v4/Editor"
], function(Controller, RTEditor) {
	"use strict";

	return Controller.extend("gy.com.CustomEditor.controller.Editor", {
		onInit: function(){
			var oRTE = new RTEditor({
				customFonts: [
					{	displayName: "Custom font",
						actualFontName: "Pacifico"
					}
				],
				editorSkin: "moonocolor"
			});
			this.getView().byId("idAppControl").addContent(oRTE);
		}
	});
});