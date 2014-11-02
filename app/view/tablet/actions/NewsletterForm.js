Ext.define("LDPA.view.tablet.actions.NewsletterForm", {
   extend: 'Ext.form.Panel',
	
	requires: [
		'LDPA.model.Newsletter'
	],
	
	config: {
		
		itemId: "newsletterFormPanel",
				
		// custom properties
		mask: null,
										
		// css properties
		cls: 'newsletter-panel',
		width: "85%",
		height: "85%",
		maxWidth: 480,
		maxHeight: 420,
		centered: true,
		layout: {
			type: "vbox",
			pack: "justify",
			align: "stretch"	
		},
						
		// properties
		scrollable: null,
		hidden: true,
		showAnimation: {
			type: "popIn",
			duration: 400,
			easing: "out"
		},
		hideAnimation: {
			type: "popOut",
			duration: 400,
			easing: "in"
		},
		items: [
			{
				xtype: "container",
				docked: "top",
				html: "Aboneaz&#259;-te la newsletter",
				height: 50,
				width: '100%',
				cls: "header",
				items: [{
					xtype: "button",
					itemId: "closeBtn",
					iconCls: 'close',
					cls: 'close-button',
					pressedCls: 'pressed',
					width: 50,
					height: 50,
					top: 0,
					right: 0,
					html: ''
				}]
			},
			{
				xtype: "panel",
				cls: 'content',
				html: "<p>Vrei s&#259; prime&#351;ti ultimele nout&#259;&#355;i din domeniul acord&#259;rii primului ajutor? Aboneaz&#259;-te la newsletter-ul Lec&#355;ia de prim ajutor.</p>",
			},
			{
				xtype: 'fieldset',
				cls: 'newsletter-fieldset',
				instructions: 'C&#226;mpurile marcate cu * sunt obligatorii de completat!',
				items: [
					{
						xtype: 'textfield',
						name : 'name',
						placeHolder: 'Nume*',
						autoCapitalize: false,
						required: true,
					},
					{
						xtype: 'emailfield',
						name : 'email',
						placeHolder: 'E-mail*',
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
				xtype: "button",
				itemId: "sendBtn",
				docked: "bottom",
				width: 160,
				height: 40,
				cls: "send-button",
				iconCls: '',
				pressedCls: "pressed",
				html: 'Trimite'
			}
		]
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onCloseBtnTap, this);
		
		var sendBtn = this.down("#sendBtn");
		sendBtn.on("tap", this.onSendBtnTap, this);
	},
	
	
	onSendBtnTap: function(){
		var errorsPanel = this.down("#errorsPanel");
				
		var model = Ext.create("LDPA.model.Newsletter",{
			name: this.getValues().name,
			email: this.getValues().email
		});
		
		var errors = model.validate(),
			message = "";
		
		if (errors.isValid()){
			
			// clear errors panel content
			errorsPanel.setData({message: ""})
			
			// submit form
			actionsController.submitNewsletterForm();
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
	
	onCloseBtnTap: function(){
		if (this.getMask()){ 
			this.getMask().fireEvent("close");
		}
		else{
			this.onClosePanel();
		}
	}
});
