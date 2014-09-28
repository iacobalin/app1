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
						'<div class="vbox" style="position: relative; width: 100%; height: 100%;">',
							'<div style="position: absolute; left: 0; top: 0; padding: 10px 15px; width: 100%; height: 100%;">',
								'<div class="image-container" style="background-image: url(\'{image}\');"></div>',
							'</div>',
							'<div class="headline">',
								'<h1>{name}</h1>',
							'</div>',
						'</div>',
					'</div>',
					'<div class="content">',
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
			iconCls: 'close',
			html: '',
			cls: 'close-button',
			pressedCls: 'pressed',
			width: 60,
			height: 60,
			top: 0,
			right: 0
		});	
		this.add(closeBtn);
		
		this.on("addcontent", this.onAddContent, this);
		
		closeBtn.on("tap", this.onClosePanel, this);
		
		// add a handler for the orientationchange event of the viewport
		Ext.Viewport.on('orientationchange', 'handleOrientationChange', this, {buffer: 50 });
				
		this.callParent(arguments);
	},

	
	onAddContent: function(category){
		
		var categoryBox = this.down("#categoryBox");
		categoryBox.setData(category);
		
		var articlesList = this.down("#articlesList");
		articlesList.getStore().add(category.posts);
	},
	
	handleOrientationChange: function(){
		var categoryBox = this.down("#categoryBox");
		categoryBox.setData(category);
	},
	
	onClosePanel: function(){
		this.getParent().fireEvent("closepanel");	
	}
});
