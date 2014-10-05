Ext.define("LDPA.view.phone.home.ResultsList", {
    extend: 'Ext.List',
	
    requires: [
        'Ext.TitleBar',
		'Ext.Panel',
		'Ext.Component',
	],
    config: {
        
		itemId: 'resultsList',
		cls: "results-list",
		
		scrollable:{
			direction: 'vertical',
            indicators: false
		},
		
		store: 'Search',
		styleHtmlContent: true,
		scrollToTopOnRefresh: true,
		
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Rezultatele c&#259;ut&#259;rii',
				items: [
					{
						align: 'left',
						ui: 'back',
						text: '&#238;napoi',
						handler: function(){
							var homePanel = this.up("#homePanel");
							var homeView = homePanel.child("#homeView");
							
							homePanel.animateActiveItem(homeView, {type: 'slide', direction: 'right'});
						}
					}
				]	
			}
		],
		
		itemTpl: new Ext.XTemplate(
            '<div class="title">{title}</div>',
            '<div class="details">',
                '<div class="comments">',
                    '<div class="comments-icon"></div>',
                    '<div class="comments-number">{comment_count}</div>',
                '</div>',
                '<div class="note">',
                    '<div class="note-icon"></div>',
                    '<div class="note-number">{ranking}</div>',
                '</div>',
            '</div>'),
		
		emptyText: 'Nu exist&#259; articole!',
		deferEmptyText: false,
		
		pressedCls: "item-pressed",
        selectedCls: 'item-selected',
    },
	
	
	initialize: function(){
		this.callParent(arguments);
	}
});
