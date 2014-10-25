Ext.define("LDPA.view.phone.categories.SearchList", {
    extend: 'Ext.List',
	
	requires: [
		"LDPA.store.Articles"
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
								
		// properties
		scrollable:{
			direction: 'vertical',
			indicators: false
		},
		scrollToTopOnRefresh: false,
		disableSelection: true,
		emptyText: 'Nu exist&#259; articole!',
		useSimpleItems: true,
		onItemDisclosure: true,
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
				xtype: "titlebar",
				itemId: "topBar",
				height: 55,
				docked: "top",	  
				cls: "top-bar",
				title: "Rezultatele c&#259;ut&#259;rii",
				items: [{
					xtype: "button",
					itemId: "closeBtn",
					iconCls: 'close',
					cls: 'close-button',
					pressedCls: 'pressed',
					width: 50,
					height: 50,
					html: '',
					align: 'right'
				}]
			}
		]
	},
	
	
	initialize: function(){
		
		this.setStore(Ext.create("LDPA.store.Articles"));
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onClosePanel, this);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
				
		this.callParent(arguments);
	},
	
	onClosePanel: function(){
		this.getParent().fireEvent("closepanel");
	}
});
