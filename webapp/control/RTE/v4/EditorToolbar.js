sap.ui.define([], function() {
    "use strict";

    var RTEditorToolbar = {
        Basic: [
            ["bold", "italic", "-", "numberedList", "bulletedList", "-", "link", "unlink", "-"]
        ],
        Default: [
			{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
			{ name: 'editing', items: [ 'Scayt' ] },
			{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
			{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'SpecialChar', 'Youtube', 'ckawesome' ] },
			{ name: 'tools', items: [ 'UIColor', 'Maximize' ] },
			{ name: 'document', items: [ 'Source' ] },
			'/',
			{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', '-', 'RemoveFormat' ] },
			{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
			{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize', 'lineheight' ] },
			{ name: 'about', items: [ 'About' ] }
        ]
    };

    return RTEditorToolbar;
}, true);