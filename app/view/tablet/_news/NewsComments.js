Ext.define("LDPA.view.tablet.news.NewsComments", {
    extend: 'Ext.List',
	
	requires: [
		'Ext.TitleBar',
		'LDPA.store.NewsComments',
		'LDPA.view.tablet.comments.CommentForm'
	],
	
	config: {
		isFilled: false,
		store: 'NewsComments',
		
		itemId: 'newsComments',
		styleHtmlContent: true,
		scrollable: {
            direction: "vertical",
            indicators: false
        },
        
		itemCls: 'general-comment',
		cls: 'general-comments',
		itemTpl: new Ext.XTemplate(
            '<div class="header">',
                '<div class="author">{user}</div>',
                '<div class="date">{date}</div>',
            '</div>',
            '<div class="comment">{comment}</div>'
        ),
		disableSelection: true,
		emptyText: 'Nu exist&#259; comentarii pentru aceast&#259; stire!',
        selectedCls: '',
		
		items: [
			{
                xtype: 'titlebar',
                docked: 'top',
                title: 'Comentarii',
                centered: true,
                cls: 'general-comments-bar',
				items: [
					{
                        iconCls: 'reply',
                        iconMask: true,
                        align: 'left',
                        cls: 'back-button',
                        text: '&#206;napoi la articol',
                        pressedCls: 'back-button-pressed',
                        listeners: {
							tap: function(){
								// activate the details panel
								var newsComments = this.up("#newsComments");
								var newsPanel = newsComments.getParent();
								newsPanel.getLayout().setAnimation({type: 'slide', direction: 'right'});
								newsPanel.setActiveItem(0);
							}
						},
						scope: this
					},
					{
                        iconCls: 'refresh',
                        iconMask: true,
                        align: 'right',
                        cls: 'refresh-button',
                        pressedCls: 'refresh-button-pressed',
                        listeners: {
							tap: function(){
								// refresh the comments list
								var newsComments = this.up("#newsComments");
								newsComments.fireEvent("loadcomments");
							}
						},
						scope: this	
					}
				]
			},
            {
                xtype: 'panel',
                itemId: 'formContainer',
                docked: 'bottom',
                height: 0
            },
            {
                xtype: 'container',
                docked: 'bottom',
                height: 5,
                cls: 'general-comments-border'
            }
		],
		
		margin: 0,
		padding: 0
    },
	
	initialize: function(){
		
		this.callParent(arguments);
		
		var commentsForm = Ext.create("LDPA.view.tablet.comments.CommentForm",{
			postType: 'news',
			postId: -1
		});
		this.down("#formContainer").add(commentsForm);
		
		// when the store is loaded than syncronize the rest of the application with the new value of number of comments
		this.getStore().on("load", function(){
			this.fireEvent("syncontent");	
			commentsForm.fireEvent("setcommentslistmask");
		}, this);
	}
});
