Ext.define("LDPA.view.tablet.questions.Questions", {
    extend: 'Ext.form.Panel',
	
    requires: [
        'Ext.TitleBar',
		'Ext.form.FieldSet',
		'Ext.field.Email',
		'Ext.field.Text',
		'Ext.field.TextArea',
		'Ext.field.Select',
		'Ext.Button'
    ],
    config: {
        
		id: 'questionsForm',
		title: 'Nel&#259;murire',
		iconCls: 'chat1',
		
		styleHtmlContent: true,
		scrollable: null,
		cls: 'questions-form',
		
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'center'
		},
		
		items: [
			{
				xtype: 'component',
                cls: 'questions-top',
				html:
                    '<div class="bar">' +
                        '<h1>Ai o nel&#259;murire? Medicul SMURD &#238;&#355;i r&#259;spunde</h1>' +
                    '</div>' +
                    '<p>Dac&#259; ai o nel&#259;murire &#238;n leg&#259;tur&#259; cu o situa&#355;ie de urgen&#355;&#259; sau cu o procedur&#259; de prim ajutor prezentat&#259; &#238;n site, scrie aici &#351;i vei primi r&#259;spunsul de la un medic SMURD &#238;n maximum 24 de ore.</p>'
			},
			{
				xtype: 'fieldset',
				instructions: 'C&#226;mpurile marcate cu * sunt obligatorii de completat!',
                cls: 'questions-fieldset',
				items: [
					{
						xtype: 'textfield',
						name : 'name',
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
						label: '&#206;ntrebare',
						maxRows: 5,
						name: 'question',
						required: true
					}
				]
			},
			
			{
				xtype			: "component",
				itemId			: "errorsPanel",
				cls				: "questions-errors",
				tpl				: new Ext.XTemplate('<p>{message}</p>')
			},
            {
                xtype: "button",
                text: "Trimite",
                styleHtmlContent: true,
                cls: 'send-questions-form-button',
                pressedCls: 'send-questions-form-button-pressed'
            }
		]
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
	}
});
