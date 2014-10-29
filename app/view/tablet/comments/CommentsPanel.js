Ext.define("LDPA.view.tablet.comments.CommentsPanel", {
  	extend: 'Ext.Panel',
	
	requires: [
		'LDPA.view.tablet.comments.CommentsList',
		'LDPA.view.tablet.comments.CommentForm'
	],
	
	config: {
		
		itemId: 'commentsPanel',
		
		// custom properties
		articleId: null,
		loaded: false,
		
		// css properties
		cls: 'comments-panel',
		layout:{
			type: 'vbox',
			pack: 'stretch',
			align: 'stretch'	
		},
		height: 555
		
		// properties
    },
	
	initialize: function(){
		
		// create the comments list 
		var list = Ext.create("LDPA.view.tablet.comments.CommentsList",{
			store: Ext.create('LDPA.store.Comments')
		});
		this.add(list);
		
		// create the comment form
		var form = Ext.create("LDPA.view.tablet.comments.CommentForm");
		this.add(form);
		
		this.callParent(arguments);
		
		this.on("setactions", this.onSetActions, this);
		this.on("loadcomments", this.onLoadComments, this);
		
		
		this.callParent(arguments);
	},
	
	
	onSetActions: function(){
		// load comments
		this.fireEvent("loadcomments");
	},
	
	
	onLoadComments: function(){
		if (!this.getLoaded()){
			this.setLoaded(true);
			
			var articleId = this.getArticleId();
			var commentsList = this.down("#commentsList");
			commentsList.getStore().removeAll();
			commentsList.fireEvent("fetchlatest");
		}
	}
});
