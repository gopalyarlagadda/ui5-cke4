sap.ui.define(["jquery.sap.global"], function(jQuery) {
    "use strict";

    var RTEditorToolbar = {
        Basic: [
            ["bold", "italic", "-", "numberedList", "bulletedList", "-", "link", "unlink", "-"]
        ],
        Default: [
			"heading", "|", "fontSize", "fontFamily", "insertImage", "bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo"
        ]
    };

    return RTEditorToolbar;
}, true);