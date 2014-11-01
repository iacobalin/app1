var commentsController;

Ext.define('LDPA.controller.tablet.Comments', {
    extend: 'Ext.app.Controller',
    
	config: {
        
		refs: {
            appPanel: '#appPanel',
			mainView: '#mainView'
        },
		
		control: {
           	
  		},
		
		
    },
	
	
	init: function() {
		commentsController = this;
		this.inAction = false;
	},
	
	
	submitComment: function(options){
		
		var articleId = options.articleId || null;
		var user = options.user || null;
		var email = options.email || null;
		var comment = options.comment || null;
		var successCallBack = options.successCallBack || Ext.emptyFn;
		var errorCallBack = options.errorCallBack || Ext.emptyFn;
		
		// prevent multiple actions
		if (this.inAction) return;
		
		this.inAction = true;
		
		// offline
		if (!LDPA.app.isOnline()){
			alert(webcrumbz.offlineMsg);
			
			errorCallBack.getFn().call();
		}
		// online loading
		else{
			
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=tablet.add_comment',
				params: {
					type			: 'article',
					id				: articleId,
					user			: user,
					email			: email,
					comment			: comment,
					key				: webcrumbz.key
				},
				success: function(result, request) {
					if (result.status == "ok"){
						successCallBack.getFn().call();
						
						alert('Comentariul t\u0103u a fost trimis cu succes! \u00CE\u021Bi mul\u021Bumim!');
						//Ext.Msg.alert('Felicit&#259;ri', 'Mesajul t&#259;u a fost trimis cu succes!<br/>&#206;&#355;i mul&#355;umim!', Ext.emptyFn);
					}
					else{
						errorCallBack.getFn().call();
						
						alert('Comentariul t\u0103u nu a fost trimis! \u00CEncearc\u0103 din nou sau trimite un email la contact@lectiadeprimajutor.ro!');
						//Ext.Msg.alert('Eroare', 'Mesajul t&#259;u nu a fost trimis!<br/> &#206;ncearc&#259; din nou sau trimite un email la contact@lectiadeprimajutor.ro!', Ext.emptyFn);
					}
					this.inAction = false;
				},
				failure: function(){
					errorCallBack.getFn().call();
					
					this.inAction = false;
				}
			});
		}
	}
});