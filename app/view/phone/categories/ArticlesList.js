Ext.define("LDPA.view.phone.categories.ArticlesList", {
    extend: 'Ext.List',
	
	requires: [
		"LDPA.store.Articles"
	],
	
	config: {
		
		itemId: "articlesList",
				
		// custom properties
		
								
		// css properties
		cls: 'articles-list',
		itemCls: 'item',
		selectedCls: '',
		pressedCls: 'item-pressed',
		itemHeight: 70,
						
		// properties
		scrollable:{
			direction: 'none',
			indicators: false
		},
		scrollToTopOnRefresh: false,
		disableSelection: true,
		emptyText: '',
		useSimpleItems: true,
		onItemDisclosure: true,
		itemTpl: new Ext.XTemplate(
			'<div class="vbox">',
				'<h1>{title}</h1>',
				'<div class="stats hbox">',
					'<div class="comments"><span>{comment_count}</span></div>',
					'<div class="ranking"><span>{ranking}</span></div>',
				'</div>',
			'</div>'
		),
		items: [
			{
				xtype: "component",
				height: 30,
				docked: "top",	  
				cls: "articles-bar",
				html: "Articole"
			}
		]
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.setStore(Ext.create("LDPA.store.Articles"));
		
		//this.on("itemtap", this.onListItemTap, this);
		this.on("painted", this.onPainted, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
	},
	
	onPainted: function(){
		var ln = this.getStore().getCount();
		var height = 40 + ln * this.getItemHeight() + 10;
		
		this.setHeight(height);
	},
	
	handleOrientationChange: function(){
		
	},
});
