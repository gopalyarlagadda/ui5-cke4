sap.ui.define([
	"sap/ui/core/Control",
	"gy/com/CustomEditor/control/RTE/v4/EditorToolbar"
], function (Control, RTEToolbar) {
	"use strict";
	var RTE = window.CKEDITOR;
	return Control.extend("gy.com.CustomEditor.control.RTE.v4.Editor", {
        metadata: {
            properties: {
                "value": {
                    type: "string",
                    group: "Data",
                    bindable: "bindable",
                    defaultValue: ""
                },
                "width": {
                    type: "sap.ui.core.CSSSize",
                    group: "Dimension",
                    defaultValue: "100%"
                },
                "height": {
                    type: "sap.ui.core.CSSSize",
                    group: "Dimension",
                    defaultValue: "200px"
                },
                "toolbar": {
                    type: "string",
                    defaultValue: "Default"
                },
                "inline": {
                    type: "boolean",
                    group: "Misc",
                    defaultValue: false
                },
                "editable": {
                    type: "boolean",
                    group: "Misc",
                    defaultValue: true
                },
                "required": {
                    type: "boolean",
                    group: "Misc",
                    defaultValue: false
                },
                "uiColor": {
                    type: "string",
                    defaultValue: "#FAFAFA"
                },
                "plugins": {
                    type: "string",
                    defaultValue: "Default"
                },
		        "customFonts": {
		        	type: "Object"
		        }
            },
            defaultAggregation: "content",
            events: {
                "change": {},
                "ready": {}
            }
        },
		init : function () {
			this.rtEditorDivId = this.getId() + '-rtEditorDiv';
		},
        renderer: function(oRm, oControl) {
            oRm.write('<div ');
            oRm.writeAttribute('id', oControl.getId() + '-rtEditorDiv');
            oRm.write('>');
            oRm.write(oControl.getValue());
            oRm.write('</div>');
        },
		setValue: function(sValue){
            this.setProperty("value", sValue, true);
            if (this.editor && sValue !== this.editor.getData()) {
                this.editor.setData(sValue);
            }
		},
		getText: function(){
			return this.editor.document.getBody().getText();
		},
		setInline: function(bInline){
			this.setProperty("inline", bInline, true);
		},
		setEditable: function(bEditable){
            this.setProperty("editable", bEditable, true);
            if (this.editor) {
                this.editor.setReadOnly(!bEditable);
            }
		},
		onAfterRendering: function(){
            if (!this._bEditorCreated) {
                // first rendering: instantiate the editor
                this.afterFirstRender();
            } else {
                // subsequent re-rendering: 
                this.editor = RTE.instances[this.rtEditorDivId];
                var value;
                if (this.editor && (value = this.getValue())) {
                    this.editor.setData(value);
                }
            }
		},
		
		afterFirstRender: function(){
            RTE.disableAutoInline = true;
            if (this.getInline()) {
                this.editor = RTE.inline(this.rtEditorDivId, this._getOptions());
            } else {
                this.editor = RTE.replace(this.rtEditorDivId, this._getOptions());
            }
            
            this.editor.on('change', this.onEditorChange, this);
            this.editor.on('blur', this.onEditorChange, this);
            this.editor.on('mode', this.onModeChange, this);
            this.editor.on('instanceReady', this.onInstanceReady, this);            

            this._bEditorCreated = true;
		},
		
		_getOptions: function(){
            var options = {};
            options.toolbar = RTEToolbar[this.getToolbar()];
            options.disableNativeSpellChecker = false;
            options.uiColor = this.getUiColor();
            options.height = this.getHeight();
            options.width = this.getWidth();
            options.toolbarStartupExpanded = true;
            options.browserContextMenuOnCtrl = true;
            CKEDITOR.config.customFontNames = "";
            //options.customFontNames = "";
            var customFonts = this.getCustomFonts();
            if(customFonts){
            	for(var i=0; i<customFonts.length;i++){
            		var customFont = customFonts[i];
            		CKEDITOR.config.customFontNames = CKEDITOR.config.customFontNames + customFont.displayName + "/" + customFont.actualFontName + ";";
            	}
            }
            return options;
		},
		
		onEditorChange: function(){
            //on editor change update control value
            var oldVal = this.getValue(),
                newVal = this.editor.getData();

            if (oldVal !== newVal) {
                this.setProperty("value", newVal, true); // suppress rerendering
                this.fireChange({
                    oldValue: oldVal,
                    newValue: newVal
                });
            }
		},
		onModeChange: function(){
            // update value after source has changed
            if (this.evtSource === true && this.editor.getCommand("source").state === RTE.TRISTATE_OFF) {
                this.onEditorChange();
            }

            if (this.editor.mode === "source") {
                this.evtSource = true;
            } else {
                this.evtSource = false;
            }
		},
		onInstanceReady: function(){
            $("#"+this.editor.id + "_top").css("background", this.editor.getUiColor());
            $("#"+this.editor.id + "_bottom").css("background", this.editor.getUiColor());
		},
		exit: function(){
			this.editor.destroy();
		}
	});
});