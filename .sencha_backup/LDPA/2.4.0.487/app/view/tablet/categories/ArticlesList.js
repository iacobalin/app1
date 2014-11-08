Ext.define("LDPA.view.tablet.categories.ArticlesList", {
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
		useSimpleItems: true,
		onItemDisclosure: true,
		variableHeights: true,
		itemTpl: new Ext.XTemplate(
			'<div class="vbox">',
				'<h1>{title}</h1>',
				'<div class="stats hbox">',
					'<div class="comments"><div class="icon"></div>{comment_count}</div>',
					'<div class="ranking"><div class="icon"></div>{ranking}</div>',
				'</div>',
			'</div>'
		),
		items: [
			{
				xtype: "component",
				height: 40,
				docked: "top",	  
				cls: "articles-bar",
				html: "Articole"
			}
		]
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.setStore(Ext.create("LDPA.store.Articles"));
		
		this.on("painted", this.onPainted, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
	},
	
	onPainted: function(){
		this.element.query(".x-container")[0].style.height = (Ext.Viewport.getWindowHeight() - 40) + "px";
	},
	
	handleOrientationChange: function(){
		this.onPainted();	
	}
});
