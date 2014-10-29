Ext.define('LDPA.controller.tablet.Questions', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
            questionsForm: '#questionsForm',
			errorsPanel: '#questionsForm #errorsPanel',
			button: '#questionsForm button',
			
        },
		
		control: {
			button: {
				tap: 'onButtonTap'	
			}
		}
    },
	
	
	init: function() {
		
    },
	
	launch: function() {
		
    },
	
	
	onButtonTap: function(){
		var form = this.getQuestionsForm();
		var errorsPanel = this.getErrorsPanel();
				
		var instance = Ext.create("LDPA.model.Questions",{
			name: form.getValues().name,
			email: form.getValues().email,
			question: form.getValues().question
		});
		
		var errors = instance.validate(),
			message = "";
		
		if (errors.isValid()){
			this.submitForm();
		}
		else{
			errorsPanel.setData({message: errors.items[0].config.message})	
		}
	},
	
    
	submitForm: function() {
        
		var form = this.getQuestionsForm();
		var errorsPanel = this.getErrorsPanel();
		
		// clear errors panel content
		errorsPanel.setData({message: ""})	
		
		form.setMasked({
			xtype: 'loadmask',
			message: 'Loading...',
            cls: 'loading-general',
			transparent: true
		});
		
		
		// Make the JsonP request
        Ext.data.JsonP.request({
            url: webcrumbz.exportPath+'?json=tablet.add_question',
			params: {
                name			: form.getValues().name,
                email			: form.getValues().email,
				question		: form.getValues().question,
				key				: webcrumbz.key
            },
            success: function(result, request) {
               	form.unmask();
				
				if (result.status == "ok"){
					form.reset();
					alert('\u00CEntrebarea ta a fost trimis\u0103. \u00CEn cel mai scurt timp vei primi un r\u0103spuns din partea unui medic SMURD. \u00CE\u021Bi mul\u021Bumim!');
				}
				else{
					alert('Mesajul t\u0103u nu a fost trimis! \u00CEncearc\u0103 din nou sau trimite un email la questions@lectiadeprimajutor.ro!')
				}
            }
        });
    }
});