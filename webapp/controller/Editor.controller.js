sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"gy/com/CustomEditor/control/RTE/v4/Editor"
], function(Controller, RTEditor4) {
	"use strict";

	return Controller.extend("gy.com.CustomEditor.controller.Editor", {
		onInit: function(){
			var oRTE4 = new RTEditor4({
				customFonts: [
					{	displayName: "Custom font",
						actualFontName: "Pacifico"
					}
				]
			});
			this.getView().byId("idAppControl").addContent(oRTE4);
		}
	});
});