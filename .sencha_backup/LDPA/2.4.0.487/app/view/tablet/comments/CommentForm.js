Ext.define("LDPA.view.tablet.comments.CommentForm", {
   extend: 'Ext.form.Panel',
	
	requires: [
        'Ext.TitleBar',
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'Ext.field.Text',
		'Ext.field.TextArea',
		'Ext.Button',
		'LDPA.model.Comments'
    ],
	
	config: {
		
		itemId: "commentsFormPanel",
				
		// custom properties
		mask: null,
		
								
		// css properties
		cls: 'comments-form',
		height: 275,
		docked: "bottom",
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
						
		// properties
		scrollable: null,
		items: [
			{
				xtype: 'component',
				html: '<h1>Trimite-ne un comentariu sau o solu&#355;ie alternativ&#259;</h1>',
				cls: 'header',
			},
			{
				xtype: 'fieldset',
				cls: 'comment-fieldset',
				items: [
					{
						xtype: "container",
						layout: {
							type: "hbox",
							pack: "justify",
							align: "stretch"
						},
						items: [
							{
								xtype: 'textfield',
								name : 'name',
								placeHolder: 'Nume*',
								autoCapitalize: false,
								required: true,
								flex: 1
							},
							{
								xtype: "spacer",
								width: 10
							},
							{
								xtype: 'emailfield',
								name : 'email',
								placeHolder: 'E-mail*',
								required: true,
								flex: 1
							}
						]
					},
					{
						xtype: 'textareafield',
						placeHolder: 'Comentariu*',
						maxRows: 2,
						name: 'message',
						required: true,
					}
				]
			},
			{
				xtype: "component",
				itemId: "errorsPanel",
				cls: "errors",
				tpl: new Ext.XTemplate('<p>{message}</p>'),
			},
			{
				xtype: "container",
				width: "100%",
				layout:{
					type: "hbox",
					pack: "justify",
					align: "center"	
				},
				items: [
					{
						xtype: 'component',
						html: '<p>Dac&#259; acest comentariu este o solu&#355;ie alternativ&#259; la o procedur&#259; de prim ajutor, v&#259; rug&#259;m s&#259; ad&#259;uga&#355;i la &#238;nceputul lui textul <b>Solu&#355;ie alternativ&#259;</b>.<br/>C&#226;mpurile marcate cu * sunt obligatorii de completat!</p>',
						cls: 'comment-text',
						flex: 1
					},
					{
						xtype: "button",
						itemId: "sendBtn",
						cls: "send-button",
						iconCls: "send",
						html: "Trimite",
						padding: 12,
						width: 150,
						height: 45,
						docked: "right",
						pendingCls: "pending",
						spinner: [															// loading spinner inside the button
							'<div id="bar-loader">',
								'<div id="block_1" class="bar_block"> </div>',
								'<div id="block_2" class="bar_block"> </div>',
								'<div id="block_3" class="bar_block"> </div>',
							'</div>'
						].join(""),
					}
				]	
			},
			{
				xtype: "component",
				height: 20,
				html: ''	
			}
		],
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
		
		var sendBtn = this.down("#sendBtn");
		sendBtn.on("tap", this.onSendBtnTap, this);
	},
	
	
	onSendBtnTap: function(){
		var form = this;
		var errorsPanel = this.down("#errorsPanel");
		
		var model = Ext.create("LDPA.model.Comments",{
			user: this.getValues().name,
			email: this.getValues().email,
			comment: this.getValues().message
		});
		
		var errors = model.validate();
		
		if (errors.isValid()){
			
			// clear errors panel content
			errorsPanel.setData({message: ""})
			
			var commentsPanel = this.up("#commentsPanel");
			var articleId = commentsPanel.getArticleId();
			var user = this.getValues().name;
			var email = this.getValues().email;
			var comment = encodeURIComponent(this.getValues().message);
			
			// show loading spinner
			var btn = this.down("#sendBtn");
			btn.addCls(btn.config.pendingCls);
			btn.setHtml(btn.config.spinner);
			
			
			var successCallBack = Ext.create("Ext.util.DelayedTask", function(){
				// remove the pending cls
				btn.removeCls(btn.config.pendingCls);
				btn.setHtml("Trimite");
				
				form.reset();
			});


			var errorCallBack = Ext.create("Ext.util.DelayedTask", function(){
				// remove the pending cls
				btn.removeCls(btn.config.pendingCls);
				btn.setHtml("Trimite");
			});

			commentsController.submitComment({articleId: articleId, user: user, email: email, comment: comment, successCallBack: successCallBack, errorCallBack: errorCallBack});
		}
		else{
			errorsPanel.setData({message: errors.items[0].config.message});
		}
	},
	
	
	onOpenPanel: function(){
		this.show();
	},
	
	onClosePanel: function(){
		this.hide();
		
		var me = this;
		Ext.defer(function(){
			me.destroy(true);	
		}, 400);
	},
	
	/*onCloseBtnTap: function(){
		if (this.getMask()){ 
			this.getMask().fireEvent("close");
		}
		else{
			this.onClosePanel();
		}
	}*/
});
