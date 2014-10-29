Ext.define("LDPA.view.tablet.media.MediaCard", {
    extend: 'Ext.Container',
	
	requires: [
		'Ext.Video',
		'Ext.Img'
	],
	
	config: {
		index: 0,					
		carousel: null,
		data: null,
		isFilled: false,

		styleHtmlContent: true,
		scrollable: false,
		
		itemId: 'mediaContainer',
        cls: 'media-card',
		
		tpl: new Ext.XTemplate(
            '<figure>',
                '<img src="http://src.sencha.io/{width}/{height}/{src}" alt="{title}">',
                '<figcaption>{title}</figcaption>',
            '</figure>'
		)
    },
	
	initialize: function(){
		
		this.callParent(arguments);
		
		this.on("painted", this.onPainted, this);
	},
	
	
	onPainted: function(){
		
		if (this.getIsFilled()) return;
		
		// add a close event when user hits the "figure" dom object
		var figure = Ext.get(this.element.query("figure")[0]);
		figure.on("tap", this.closePanel, this);
				
		this.getIsFilled(true);
	},
	
	
	closePanel: function(event, item){
		if (Ext.get(item).is("figure")){
			this.up("#mediaView").closePanel();	
		}
	}
});
