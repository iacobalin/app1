Ext.define("LDPA.view.tablet.actions.QuestionForm", {
   extend: 'Ext.form.Panel',
	
	requires: [
		'LDPA.model.Question'
	],
	
	config: {
		
		itemId: "questionFormPanel",
				
		// custom properties
		mask: null,
										
		// css properties
		cls: 'question-panel',
		width: "85%",
		height: "85%",
		maxWidth: 480,
		maxHeight: 550,
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
				html: "Ai o nel&#259;murire? Medicul SMURD &#238;&#355;i r&#259;spunde",
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
				html: "<p>Dac&#259; ai o nel&#259;murire &#238;n leg&#259;tur&#259; cu o situa&#355;ie de urgen&#355;&#259; sau cu o procedur&#259; de prim ajutor prezentat&#259; &#238;n site, scrie aici &#351;i vei primi r&#259;spunsul de la un medic SMURD &#238;n maximum 24 de ore.</p>",
			},
			{
				xtype: 'fieldset',
				cls: 'question-fieldset',
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
					},
					{
						xtype: 'textareafield',
						placeHolder: 'Intrebare*',
						maxRows: 5,
						name: 'question',
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
				
		var model = Ext.create("LDPA.model.Question",{
			name: this.getValues().name,
			email: this.getValues().email,
			question: this.getValues().question
		});
		
		var errors = model.validate(),
			message = "";
		
		if (errors.isValid()){
			
			// clear errors panel content
			errorsPanel.setData({message: ""})
			
			// submit form
			actionsController.submitQuestionForm();
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
