Ext.define('LDPA.controller.tablet.Newsletter', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
            newsletterForm: '#newsletterForm',
			errorsPanel: '#newsletterForm #errorsPanel',
			button: '#newsletterForm button',
			
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
		var form = this.getNewsletterForm();
		var errorsPanel = this.getErrorsPanel();
				
		var instance = Ext.create("LDPA.model.Newsletter",{
			name: form.getValues().name,
			email: form.getValues().email
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
        
		var form = this.getNewsletterForm();
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
            url: webcrumbz.exportPath+'?json=tablet.add_newsletter',
			params: {
                name			: form.getValues().name,
                email			: form.getValues().email,
				key				: webcrumbz.key
            },
            success: function(result, request) {
               	form.unmask();
				
				if (result.status == "ok"){
					form.reset();
					alert('Te-ai \u00EEnscris cu succes la newsletter-ul Lec\u021Bia de prim ajutor. \u00CEn c\u00E2teva minute, vei primi un email de confirmare. Acceseaz\u0103 link-ul din email pentru a confirma \u00EEnscrierea. Dac\u0103 nu prime\u0219ti emailul de confirmare \u00EEn 15 minute, verific\u0103 \u0219i \u00EEn Spam');
				}
				else{
					alert('\u00EEncearc\u0103 din nou sau trimite un email la newsletter@lectiadeprimajutor.ro!')
				}
            }
        });
    }
});