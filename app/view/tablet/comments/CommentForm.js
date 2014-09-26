Ext.define("LDPA.view.tablet.comments.CommentForm", {
   extend: 'Ext.form.Panel',
	
	requires: [
		'Ext.fx.Animation',
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'Ext.field.Text',
		'Ext.field.TextArea'
	],
	
	config: {
		openedHeight: 0,				// the height of this panel when it is opened
		closedHeight: 0,				// the visible height of this panel when it is closed
		status: 'closed',				// opened or closed
		postType: '',
		postId: -1,
		
		itemId: 'commentForm',
		styleHtmlContent: true,
		scrollable: null,
        cls: 'comment-form',
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
		
		top: '-40px',
		width: '100%',
		padding: 0,
		margin: 0,
		
		items: [
			{
				xtype: 'button',
				itemId: 'toggleFormBtn',
                cls: 'show-form-button',
                pressedCls: 'show-form-button-pressed',
				text: 'Trimite-ne un comentariu sau o solu&#355;ie alternativ&#259;',
                iconCls: 'chat4',
                height: 40
			},
			{
				xtype: 'fieldset',
				//title: 'P&#259;rerea ta conteaz&#259;',
				instructions: 'Dac&#259; acest comentariu este o solu&#355;ie alternativ&#259; la o procedur&#259; de prim ajutor, v&#259; rug&#259;m s&#259; ad&#259;uga&#355;i la &#238;nceputul lui textul <b>Solu&#355;ie alternativ&#259;</b>.<br/>C&#226;mpurile marcate cu * sunt obligatorii de completat!',
                cls: 'comment-fieldset',
				items: [
					{
						xtype: 'textfield',
						name : 'user',
						label: 'Nume',
						autoCapitalize: false,
						required: true
					},
					{
						xtype: 'emailfield',
						name : 'email',
						label: 'E-mail',
						required: true
					},
					{
						xtype: 'textareafield',
						label: 'Comentariu',
						maxRows: 4,
						name: 'comment',
						required: true
					}
				]
			},
			{
                xtype: "component",
                itemId: "errorsPanel",
                cls: "errors",
                tpl: new Ext.XTemplate('<p>{message}</p>'),
                height: 30
			},
            {
                xtype: "panel",
                cls: "send-comment-box",
                styleHtmlContent: true,
                items: [
                    {
                        xtype: "button",
                        action: "sendcomment",
                        cls: 'send-comment-button',
                        pressedCls: 'send-comment-button-pressed',
                        text: "Trimite",
                        styleHtmlContent: true
                    }
                ]
            }
		]
    },
	
	initialize: function(){
		
		this.callParent(arguments);
		
		this.on("painted", this.onPainted, this);
		this.on("openform", this.onOpenForm, this);
		this.on("closeform", this.onCloseForm, this);
		this.on("setcommentslistmask", this.onSetCommentsListMask, this);
		this.down("#toggleFormBtn").on("tap", this.onToggleForm, this);
	},
	
	onPainted: function(){
		var toggleBtn = this.down("#toggleFormBtn");
		
		this.setOpenedHeight(this.element.getHeight());
		this.setClosedHeight(toggleBtn.getHeight());
		
		this.setStatus('closed');
	},
	
	
	onToggleForm: function(){
		var to;
		
		if (this.getStatus() == 'closed'){
			this.setStatus("opened");
			to = -this.getOpenedHeight() + this.getClosedHeight();
		}
		else{
			this.setStatus("closed");
			to = 0;
		}
		
		this.setStyle({
            '-webkit-transition': 'all 0.4s ease',
            '-webkit-transform': 'translate3d(0px, '+to+'px, 0px)'
        });
		
		this.fireEvent("setcommentslistmask");
	},
	
	
	onOpenForm: function(anim){
		this.setStatus("opened");
		var to = -this.getOpenedHeight() + this.getClosedHeight();
		
		var duration = (anim) ? '0.4s' : '0s';
		this.setStyle({
            '-webkit-transition': 'all '+duration+' ease',
            '-webkit-transform': 'translate3d(0px, '+to+'px, 0px)'
        });
		
		this.fireEvent("setcommentslistmask");
	},
	
	
	onCloseForm: function(anim){
		this.setStatus("closed");
		
		var duration = (anim) ? '0.4s' : '0s';
		this.setStyle({
             '-webkit-transition': 'all '+duration+' ease',
            '-webkit-transform': 'translate3d(0px, 0px, 0px)'
        });
		
		this.fireEvent("setcommentslistmask");
	},
	
	
	onSetCommentsListMask: function(){
		var commentsList = this.getParent().getParent();
		var commentForm = this;
		
		if (this.getStatus() == "opened"){
			commentsList.setMasked({
				xtype: 'mask',
                transparent: true,
				listeners:{
					tap: function(){
						commentForm.fireEvent("closeform", true);
					}
				}
			});	
		}
		else{
			commentsList.unmask();	
		}
	}
});
