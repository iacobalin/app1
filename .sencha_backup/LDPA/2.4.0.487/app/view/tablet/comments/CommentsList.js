Ext.define("LDPA.view.tablet.comments.CommentsList", {
  	extend: 'Ext.List',
	
	requires: [
		'LDPA.store.Comments',
	],
	
	config: {
		
		itemId: 'commentsList',
		
		// custom properties
		
		// css properties
		cls: 'comments-list',
		itemCls: 'item',
		selectedCls: '',
		pressedCls: '',
		flex: 1,
		
		// properties
		scrollable: {
			direction: 'vertical',
			indicators: false
		},
		loadingText: null,
		disableSelection: true,
		emptyText: 'Nu exista comentarii!',
		useSimpleItems: true,
		variableHeights: true,
		itemTpl: new Ext.XTemplate(
			'<div class="comment-box">',
				'<div class="comment-left">',
					'<div class="img" style="background-image:url({profile_image_url});"></div>',
				'</div>',
				'<div class="comment-right">',
					'<div class="comment"><span><b>{user}</b>&nbsp;</span> <span>{comment}</span></div>',
					'<div>{date}</div>',
				'</div>',
			'</div>'
		)
    },
	
	initialize: function(){
		
		this.callParent(arguments);
		
		this.setStore(Ext.create("LDPA.store.Comments"));
		
		this.on("fetchlatest", this.onFetchLatest, this);
	},
	
	
	onFetchLatest: function(options){
		
		var self = this;
		var callback = options.callback || null;
		
		var store = this.getStore();
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			cls: '',
			spinner: true,
			disabled: true,
			closeFn: function(){
				//categoryDetails.fireEvent("closepanel");
			}
		});
		
		this.add(mask);
		mask.show();
		
		
		// load items
		store.loadPage(1, {
			filters: { 
				articleId: this.getParent().getArticleId(),
			},
			callback: function(results, operation){
				if (callback){
					callback.call(this, operation);	
				}
				
				mask.fireEvent("close");
			}
		});
		
		// load mask
	}
});
