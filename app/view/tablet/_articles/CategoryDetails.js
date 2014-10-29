Ext.define("LDPA.view.tablet.articles.CategoryDetails", {
    extend: 'Ext.Panel',
	
	requires: [
		
	],
	
	config: {
		isFilled: false,
		
		itemId: 'categoryDetails',
		styleHtmlContent: true,
		scrollable: {
            direction: "vertical",
            indicators: false
        },
        cls: 'articles-details',
		
		items: [
            {
				xtype: 'titlebar',
				docked: 'top',
				title: '',
                centered: true,
                cls: 'articles-bar',
				items: [
					{
                        iconCls: 'reply',
                        iconMask: true,
                        align: 'left',
                        cls: 'back-button',
                        text: '&#206;napoi la categorii',
                        pressedCls: 'back-button-pressed',
						listeners: {
							tap: function(){
                                var articlesPanel = this.up("#articlesPanel");
                                articlesPanel.getLayout().setAnimation({type: 'slide', direction: 'right'});
                                articlesPanel.setActiveItem(0);
							}
						},
						scope: this
					}
				]
			}
        ],
		
		tpl: new Ext.XTemplate(
			'<img src="http://src.sencha.io/350/{image}" />',
			'<div class="description">{description}</div>'
		)
    },
	
	initialize: function(){
		
		this.callParent(arguments);

	}
});
