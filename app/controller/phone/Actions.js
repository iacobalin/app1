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
				break;
				
			case "video":
				videosController.showVideos();
				break;
				
			case "map":
				mapController.showMap();
				break;
				
			case "comment":
				break;
				
			case "share":
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
	}
});