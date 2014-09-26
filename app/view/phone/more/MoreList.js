Ext.define("LDPA.view.phone.more.MoreList", {
    extend: 'Ext.List',
	
    requires: [
        'Ext.TitleBar',
		'Ext.Panel',
		'Ext.Component',
	],
    config: {
        
		itemId: 'moreList',
				
		scrollable:{
			direction: 'vertical',
            indicators: false
		},
		
		styleHtmlContent: true,
		scrollToTopOnRefresh: true,
		
		items: [
			{
				xtype: 'titlebar',
				docked: 'top',
				title: 'Altele'
			}
		],
		
		data: [
			{
				type: "contact",
				iconCls: "email-icon",
				title: "P&#259;rerea ta"
			},
			{
				type: "share",
				iconCls: "share-icon",
				title: "Share"
			},
			{
				type: "settings",
				iconCls: "settings-icon",
				title: "Set&#259;ri"
			}
		],
		
		itemTpl: new Ext.XTemplate(
           '<div class="item-box">',
                '<div class="icon">',
                 	'<div class="inner-icon {iconCls}"></div>',
                '</div>',
                '<div class="title">{title}</div>',
            '</div>'
		),
		
		onItemDisclosure: true,
		deferEmptyText: false,
		cls: "more-list",
        itemCls: 'more-list-item',
		pressedCls: "item-pressed",
        selectedCls: 'item-selected',
    },
	
	
	initialize: function(){
		this.callParent(arguments);
	}
});
