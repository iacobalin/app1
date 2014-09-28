var actionsController;

Ext.define('LDPA.controller.Actions', {
    extend: 'Ext.app.Controller',
    
	config: {
        
		refs: {
            mainView: '#mainView',
						
			actionsListBtn: {
                selector: 'button[action=view-actions-panel]',
                xtype: 'button'
            }
        },
		
		control: {
           	actionsListBtn: {
                tap: 'onActionsBtnTap'
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
		
		Ext.defer(function(){
			actionsList.show();
		}, 100);
	}
});