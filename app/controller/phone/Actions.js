var actionsController;

Ext.define('LDPA.controller.phone.Actions', {
    extend: 'Ext.app.Controller',
    
	config: {
        
		refs: {
            mainView: '#mainView',
						
			actionsList: {
				selector: '*[name=actionsList]',
				autoCreate: true	
			},
			actionsListBtn: {
                selector: 'button[action=view-actions-panel]',
                xtype: 'button'
            },
			ratePanel: {
				selector: '#ratePanel',
                autoCreate: true	
			},
			contactForm: {
				selector: '#contactFormPanel',
                autoCreate: true		
			}
        },
		
		control: {
           	actionsListBtn: {
                tap: 'onActionsBtnTap'
            },
			actionsList: {
				itemtap: 'onActionsListItemTap'		
			}
  		},
		
		
    },
	
	
	init: function() {
		actionsController = this;
	},
	
	
	setActions: function(){
		
	},
	
	
	onActionsBtnTap: function(){
	    
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			closeFn: function(){
				actionsList.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create credits panel
		var profile = webcrumbz.profile.toLowerCase();
		var actionsList = Ext.create("LDPA.view."+profile+".actions.ActionsList", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(actionsList);
		
		mask.show();
		actionsList.show();
	},
	
	
	onActionsListItemTap: function(list, index, item, record){
		
		switch (record.get("type")){
			
			case "call":
				this.showEmergency();
				break;
				
			case "video":
				videosController.showVideos();
				break;
				
			case "map":
				mapController.showMap();
				break;
				
			case "comment":
				this.showContactForm();
				break;
				
			case "share":
				this.showShare();
				break;
				
			case "settings":
				break;
				
			default: break;	
		}	
	},
	
	
	rateArticle: function(options){
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			disabled: true,
			spinner: true,
			closeFn: function(){
				//actionsList.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		mask.show();
		
		
		// offline
		if (!LDPA.app.isOnline()){
			mask.fireEvent("close");
			
			alert(webcrumbz.offlineMsg);
		}
		// online loading
		else{
			
			var articleId = options.articleId;
			var callback = options.callback || null;
			var rate = options.rate || 1;
			
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.vote',
				params: {
					id: articleId,
					vote: rate,
					key: webcrumbz.key
				},
				success: function(result, request) {
					
					// hide mask
					mask.fireEvent("close");
					
					if (callback){
						callback.call(this, result);	
					}
				}
			});	
		}
	},
	
	
	showEmergency: function(){
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			closeFn: function(){
				callPanel.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create credits panel
		var profile = webcrumbz.profile.toLowerCase();
		var callPanel = Ext.create("LDPA.view."+profile+".actions.CallPanel", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(callPanel);
		
		mask.show();
		callPanel.show();	
	},
	
	
	showContactForm: function(){
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			closeFn: function(){
				contactForm.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create credits panel
		var profile = webcrumbz.profile.toLowerCase();
		var contactForm = Ext.create("LDPA.view."+profile+".actions.ContactForm", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(contactForm);
		
		mask.show();
		contactForm.show();		
	},
	
	
	submitContactForm: function() {
        
		var contactForm = this.getContactForm();
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			disabled: true,
			spinner: true,
			closeFn: function(){
				//actionsList.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		mask.show();
		
		
		// offline
		if (!LDPA.app.isOnline()){
			mask.fireEvent("close");
			
			alert(webcrumbz.offlineMsg);
		}
		// online loading
		else{
			
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.add_feedback',
				params: {
					nume			: contactForm.getValues().name,
					adresa_email	: contactForm.getValues().email,
					sursa_info		: contactForm.getValues().source,
					calitate_info	: contactForm.getValues().quality,
					parerea			: contactForm.getValues().message,
					key				: webcrumbz.key
				},
				success: function(result, request) {
					
					// hide mask
					mask.fireEvent("close");
					
					if (result.status == "ok"){
						
						contactForm.reset();
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
    },
	
	showShare: function(){
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			closeFn: function(){
				sharePanel.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create credits panel
		var profile = webcrumbz.profile.toLowerCase();
		var sharePanel = Ext.create("LDPA.view."+profile+".actions.SharePanel", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(sharePanel);
		
		mask.show();
		sharePanel.show();	
	},
});