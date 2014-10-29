Ext.define("LDPA.view.tablet.actions.ContactForm", {
    extend: 'Ext.form.Panel',
	
	requires: [
        'Ext.TitleBar',
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'Ext.field.Text',
		'Ext.field.TextArea',
		'Ext.field.Select',
		'Ext.Button',
		'LDPA.model.Contact'
    ],
	
	config: {
		
		itemId: "contactFormPanel",
				
		// custom properties
		mask: null,
		
								
		// css properties
		cls: 'contact-form',
		width: "80%",
		height: "80%",
		centered: true,
		floatingCls: "normal",
		layout: {
			type: 'vbox',
			pack: 'start',
			align: 'stretch'
		},
						
		// properties
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
		items: [
			{
				xtype: "titlebar",
				itemId: "topBar",
				height: 55,
				docked: "top",	  
				cls: "top-bar",
				title: "P&#259;rerea ta conteaz&#259;",
				items: [{
					xtype: "button",
					itemId: "closeBtn",
					iconCls: 'close',
					cls: 'close-button',
					pressedCls: 'pressed',
					width: 50,
					height: 50,
					html: '',
					align: 'right'
				}]
			},
			{
				xtype: 'component',
				html: '<p style="padding-top:20px;">Scrie-ne dac&#259; vrei s&#259; ne semnalezi o situa&#355;ie medical&#259; cu care te-ai confruntat sau o solu&#355;ie de prim ajutor alternativ&#259;, precum &#351;i sugestii pentru &#238;mbun&#259;t&#259;&#355;irea aplica&#355;iei.<br/><br/><span style="font-size:12px;">C&#226;mpurile marcate cu * sunt obligatorii de completat!</span></p>',
				cls: 'contact-text',
			},
			{
				xtype: 'fieldset',
				cls: 'contact-fieldset',
				items: [
					{
						xtype: 'textfield',
						name : 'name',
						placeHolder: 'Nume',
						autoCapitalize: false,
						required: true,
					},
					{
						xtype: 'emailfield',
						name : 'email',
						placeHolder: 'E-mail',
						required: true,
					},
					{
						xtype: 'textareafield',
						placeHolder: 'Mesaj',
						maxRows: 4,
						name: 'message',
						required: true,
					}
				]
			},
			{
				xtype: "component",
				itemId: "errorsPanel",
				cls: "errors",
				tpl: new Ext.XTemplate('<p>{message}<br/><br/></p>'),
			},
			{
				xtype: 'component',
				html: 'De unde ai aflat prima dat&#259; de programul Lec&#355;ia de Prim Ajutor?',
				cls: 'contact-text',
			},
			{
				xtype: 'fieldset',
				cls: 'contact-fieldset',
				items: [
					{
						xtype: 'selectfield',
						name : 'source',
						labelWidth: 0,
						options: [
							{text: 'Alege o op\u021Biune',  value: 'Alege o optiune'},
							{text: 'De la televizor', value: 'De la televizor'},
							{text: 'Bloguri, site-uri',  value: 'Bloguri, site-uri'},
							{text: 'De la un prieten', value: 'De la un prieten'},
							{text: 'Din presa scris\u0103', value: 'Din presa scrisa'},
							{text: 'Motoare de c\u0103utare', value: 'Motoare de cautare'},
							{text: 'Alte surse', value: 'Alte surse'},
						]
					}
				]
			},
			{
				xtype: 'component',
				html: 'Cum &#355;i se par informa&#355;iile oferite pe aplica&#355;ia lectiadeprimajutor.ro?',
				cls: 'contact-text',
			},
			{
				xtype: 'fieldset',
				cls: 'contact-fieldset',
				items: [
					{
						xtype: 'selectfield',
						name : 'quality',
						labelWidth: 0,
						options: [
							{text: 'Alege o op\u021Biune',  value: 'Alege o optiune'},
							{text: 'Vitale / Indispensabile', value: 'Vitale / Indispensabile'},
							{text: 'Utile / Folositoare',  value: 'Utile / Folositoare'},
							{text: 'L\u0103muritoare', value: 'Lamuritoare'},
							{text: 'Neinteresante', value: 'Neinteresante'},
							{text: 'Nefolositoare', value: 'Nefolositoare'}
						]
					}
				]
			},
			{
				xtype: "button",
				itemId: "sendBtn",
				cls: "send-button",
				iconCls: "send",
				text: "Trimite",
				padding: 10,
				width: 150
			},
			{
				xtype: "component",
				height: 20,
				html: ''	
			}
		],
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
	},
	
	
	initialize: function(){
		this.callParent(arguments);
		
		this.on("openpanel", this.onOpenPanel, this);
		this.on("closepanel", this.onClosePanel, this);
		
		var sendBtn = this.down("#sendBtn");
		sendBtn.on("tap", this.onSendBtnTap, this);
		
		var closeBtn = this.down("#closeBtn");
		closeBtn.on("tap", this.onCloseBtnTap, this);
	},
	
	
	onSendBtnTap: function(){
		var errorsPanel = this.down("#errorsPanel");
				
		var model = Ext.create("LDPA.model.Contact",{
			name: this.getValues().name,
			email: this.getValues().email,
			source: this.getValues().source,
			quality: this.getValues().quality,
			message: this.getValues().message
		});
		
		var errors = model.validate(),
			message = "";
		
		if (errors.isValid()){
			
			// clear errors panel content
			errorsPanel.setData({message: ""})
			
			// submit form
			actionsController.submitContactForm();
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
