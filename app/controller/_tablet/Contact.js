Ext.define('LDPA.controller.tablet.Contact', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
            contactForm: '#contactForm',
			errorsPanel: '#contactForm #errorsPanel',
			button: '#contactForm button',
			
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
		var form = this.getContactForm();
		var errorsPanel = this.getErrorsPanel();
				
		var instance = Ext.create("LDPA.model.Contact",{
			name: form.getValues().name,
			email: form.getValues().email,
			source: form.getValues().source,
			quality: form.getValues().quality,
			message: form.getValues().message
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
        
		var form = this.getContactForm();
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
            url: webcrumbz.exportPath+'?json=tablet.add_feedback',
			params: {
                name			: form.getValues().name,
                email			: form.getValues().email,
				source			: form.getValues().source,
				quality			: form.getValues().quality,
				message			: form.getValues().message,
				key				: webcrumbz.key
            },
            success: function(result, request) {
               	form.unmask();
				
				if (result.status == "ok"){
					form.reset();
					alert('Mesajul t\u0103u a fost trimis cu succes! \u00CE\u021Bi mul\u021Bumim!');
					//Ext.Msg.alert('Felicit&#259;ri', 'Mesajul t&#259;u a fost trimis cu succes!<br/>&#206;&#355;i mul&#355;umim!', Ext.emptyFn);
				}
				else{
					alert('Mesajul t\u0103u nu a fost trimis! \u00CEncearc\u0103 din nou sau trimite un email la contact@lectiadeprimajutor.ro!');
					//Ext.Msg.alert('Eroare', 'Mesajul t&#259;u nu a fost trimis!<br/> &#206;ncearc&#259; din nou sau trimite un email la contact@lectiadeprimajutor.ro!', Ext.emptyFn);
				}
            }
        });
    }
});