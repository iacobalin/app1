Ext.define("LDPA.view.tablet.video.VideoComments", {
    extend: 'Ext.List',
	
	requires: [
		'Ext.TitleBar',
		'LDPA.store.VideoComments',
		'LDPA.view.tablet.comments.CommentForm'
	],
	
	config: {
		isFilled: false,
		store: 'VideoComments',
		
		itemId: 'videoComments',
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
		emptyText: 'Nu exist&#259; comentarii pentru aceast&#259; lec&#355;ie video!',
        selectedCls: '',
        pressedCls: '',
		
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
                        text: '&#206;napoi la lec&#355;ia video',
                        pressedCls: 'back-button-pressed',
						listeners: {
							tap: function(){
								// activate the details panel
								var videoComments = this.up("#videoComments");
								var videoPanel = videoComments.getParent();
								videoPanel.getLayout().setAnimation({type: 'slide', direction: 'right'});
								videoPanel.setActiveItem(0);
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
								var videoComments = this.up("#videoComments");
								videoComments.fireEvent("loadcomments");
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
			postType: 'video',
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
