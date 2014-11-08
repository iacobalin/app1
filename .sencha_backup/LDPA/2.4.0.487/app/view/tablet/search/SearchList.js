Ext.define("LDPA.view.tablet.search.SearchList", {
    extend: 'Ext.List',
	
	requires: [
		"LDPA.store.Search"
	],
	
	config: {
		
		itemId: "searchList",
		name: "searchList",
				
		// custom properties
										
		// css properties
		cls: 'search-list',
		itemCls: 'item',
		selectedCls: '',
		pressedCls: 'item-pressed',
		height: '100%',
		docked: "left",
								
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false
		},
		scrollToTopOnRefresh: false,
		disableSelection: true,
		emptyText: '',
		onItemDisclosure: true,
		useSimpleItems: true,
		variableHeights: true,
		itemTpl: new Ext.XTemplate(
			'<div class="vbox">',
				'<h1>{title}</h1>',
				'<div class="stats hbox">',
					'<div class="comments"><div class="icon"></div>{comment_count}</div>',
					'<div class="ranking"><div class="icon"></div>{ranking}</div>',
				'</div>',
			'</div>'
		)
	},
	
	
	initialize: function(){
		
		this.setStore(Ext.create("LDPA.store.Search"));
		
		this.on("painted", this.onPainted, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
				
		this.callParent(arguments);
	},
	
	onPainted: function(){
		//this.element.query(".x-container")[0].style.height = (Ext.Viewport.getWindowHeight() - 50) + "px";
	},
	
	handleOrientationChange: function(){
		this.refresh();
	}
});
