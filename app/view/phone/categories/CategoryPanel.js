Ext.define("LDPA.view.phone.categories.CategoryPanel", {
    extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.phone.categories.ArticlesList',
	],
	
	config: {
		
		itemId: "categoryPanel",
				
		// custom properties
		
								
		// css properties
		cls: 'category-panel',
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
		
						
		// properties
		scrollable: {
			direction: 'vertical',
			indicators: false	
		},
		items: [
			{
				xtype: "panel",
				itemId: "categoryBox",
				tpl: new Ext.XTemplate(
					'<div class="category-image" style="width: 100%; height: {[ this.getImageHeight(); ]}px;" >',
						'<div class="image-container" style="height: 100%; background-image: url(\'{image}\'); background-size:contain; background-position:center">',
							'<div class="headline">',
								'<h1>{name}</h1>',
							'</div>',
						'</div>',
					'</div>',
					'<div>',
						'<p>{description}</p>',
					'</div>',
					{
						getImageHeight: function(){
							return Math.round(Ext.Viewport.getWindowWidth() * 3/4);
						}
					}
				),
				scrollable: null
			}
		]
	},
	
	
	initialize: function(){
		
		var articlesList = Ext.create("LDPA.view.phone.categories.ArticlesList");
		this.add(articlesList);
		
		var closeBtn = Ext.create("Ext.Button", {
			itemId: "closeBtn",
			iconCls: '',
			html: '&nbsp;',
			cls: 'close-button',
			pressedCls: 'pressed',
			width: 60,
			height: 60,
			top: 0,
			right: 0
		});	
		this.add(closeBtn);
		
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
		
		this.on("addcontent", this.onAddContent, this);
		closeBtn.on("tap", this.onClosePanel, this);
				
		this.callParent(arguments);
	},
	
	
	handleOrientationChange: function(){
			
	},
	
	onAddContent: function(category){
		
		var categoryBox = this.down("#categoryBox");
		categoryBox.setData(category);
		
		var articlesList = this.down("#articlesList");
		articlesList.getStore().add(category.posts);
	},
	
	onClosePanel: function(){
		this.getParent().fireEvent("closepanel");	
	}
});
