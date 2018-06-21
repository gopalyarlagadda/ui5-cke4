sap.ui.define([
	"sap/ui/core/Control",
	"jquery.sap.global",
	"gy/com/CustomEditor/libs/ckeditor/v5/ckeditor",
	"gy/com/CustomEditor/control/RTE/v5/EditorToolbar",
	"gy/com/CustomEditor/control/RTE/v5/EditorPlugins"
], function (Control, jQuery, RTE, RTEToolbar, RTEPlugins) {
	"use strict";
	RTE = window.ClassicEditor;
	return Control.extend("gy.com.CustomEditor.control.RTE.v5.Editor", {
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
		        "fontFamily": {
		        	type: "string",
		        	defaultValue: "Default"
		        },
		        "fontSize": {
		        	type: "string",
		        	defaultValue: "Default"
		        }
            },
            defaultAggregation: "content",
            events: {
                "change": {},
                "ready": {}
            }
        },
		init : function () {
			this.rteDiv = new sap.ui.core.HTML({content:"<div id='" + this.getId()+"-rtEditor'></div>"});
		},
		renderer : function (oRM, oControl) {
            oRM.write("<div"); 
            oRM.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
            oRM.write(">");
            oRM.renderControl(oControl.rteDiv);
            oRM.write("</div>");			
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
                this.editor = RTE.instances[this.rteDiv];
                var value;
                if (this.editor && (value = this.getValue())) {
                    this.editor.setData(value);
                }
            }
		},
		_getOptions: function(){
            var options = {};
            options.toolbar = RTEToolbar[this.getToolbar()];
            //options.plugins = RTEPlugins[this.getPlugins()];
            var fontFamilyVal = this.getFontFamily();
            if(fontFamilyVal && fontFamilyVal !== "Default") {
            	
            	options.fontFamily = fontFamilyVal;	
            }
            var fontSizeVal = this.getFontSize();
            if(fontSizeVal && fontSizeVal !== "Default") {
            	options.fontSize = fontSizeVal;	
            }
            options.disableNativeSpellChecker = false;
            options.uiColor = this.getUiColor();
            options.height = this.getHeight();
            options.width = this.getWidth();
            options.toolbarStartupExpanded = true;
            options.browserContextMenuOnCtrl = true;
            options.image = {
            	toolbar: [ "imageTextAlternative", "|", "imageStyle:alignLeft", "imageStyle:full", "imageStyle:alignRight"],
            	styles: ["full", "alignLeft", "alignRight"]
            };
            return options;
		},
		afterFirstRender: function(){
            RTE.disableAutoInline = true;
            var rteElement = jQuery.sap.domById(this.getId()+"-rtEditor");
            
			RTE.create(rteElement, this._getOptions()).then(function(editor){
				this.editor = editor;
			}.bind(this));

            this._bEditorCreated = true;
		}
		// onEditorChange: function(){
  //          //on editor change update control value
  //          var oldVal = this.getValue(),
  //              newVal = this.editor.getData();

  //          if (oldVal !== newVal) {
  //              this.setProperty("value", newVal, true); // suppress rerendering
  //              this.fireChange({
  //                  oldValue: oldVal,
  //                  newValue: newVal
  //              });
  //          }
		// },
		// onModeChange: function(){
  //          // update value after source has changed
  //          if (this.evtSource === true && this.editor.getCommand("source").state === RTE.TRISTATE_OFF) {
  //              this.onEditorChange();
  //          }

  //          if (this.editor.mode === "source") {
  //              this.evtSource = true;
  //          } else {
  //              this.evtSource = false;
  //          }
		// },
		// onInstanceReady: function(){
  //          // overwrite gradient with solid background
  //          jQuery.sap.byId(this.editor.id + "_top").css("background", this.editor.getUiColor());
  //          jQuery.sap.byId(this.editor.id + "_bottom").css("background", this.editor.getUiColor());
		// },
		// exit: function(){
		// 	this.editor.destroy();
		// }
	});
});