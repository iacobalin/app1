var actionsController;

Ext.define('LDPA.controller.tablet.Actions', {
    extend: 'Ext.app.Controller',
    
	config: {
        
		refs: {
            appPanel: '#appPanel',
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
			},
			settingsPanel: {
				selector: '#settingsPanel',
                autoCreate: true		
			}
        },
		
		control: {
           	actionsListBtn: {
                tap: 'onActionsBtnTap'
            },
			actionsList: {
				itemtap: 'onActionsListItemTap'		
			},
  		},
		
		
    },
	
	
	init: function() {
		actionsController = this;
	},
	
	
	setActions: function(){
		
	},
	
	
	onActionsBtnTap: function(){
	    
		var actionsList = this.getActionsList();
		actionsList.show();
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			spinner: false,
			closeFn: function(){
				appPanel.fireEvent("closepanel");
				
				Ext.defer(function(){
					actionsList.hide();
				}, 400);
			}
		});
		
		var appPanel = this.getAppPanel();
		appPanel.add(mask);
		
		appPanel.fireEvent("openpanel");
		
		// open actions panel
		//Ext.defer(function(){
			// show mask
			mask.show();
		//}, 100);
	},
	
	
	onActionsListItemTap: function(list, index, item, record){
		
		switch (record.get("type")){
			
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
				this.showSettings();
				break;
				
			case "news":
			case "quiz":
			case "newsletter":
			case "ask":
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
	
	
	showContactForm: function(){
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			closeFn: function(){
				contactForm.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create contact panel
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
		
		// create share panel
		var profile = webcrumbz.profile.toLowerCase();
		var sharePanel = Ext.create("LDPA.view."+profile+".actions.SharePanel", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(sharePanel);
		
		mask.show();
		sharePanel.show();	
	},
	
	
	showSettings: function(){
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			disabled: true,
			closeFn: function(){
				settingsPanel.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create settings panel
		var profile = webcrumbz.profile.toLowerCase();
		var settingsPanel = Ext.create("LDPA.view."+profile+".actions.SettingsPanel", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(settingsPanel);
		
		mask.show();
		settingsPanel.show();	
	},
	
	
	downloadContent: function(){
		var settingsPanel = this.getSettingsPanel();
		var mask = settingsPanel.getMask();
		mask.setDisabled(true);
				
		var self = this;
		var articlesOfflineStore = mainController.articlesOfflineStore;
		var categories = mainController.categoriesOfflineStore.getRange();
				
		
		// delete all articles from local Database
		articlesOfflineStore.getModel().getProxy().dropTable();
		
		articlesOfflineStore.load(function(){
			
			self.categoriesLoaded = 0;
			
			Ext.each(categories, function(category){
				var categoryId = category.get("categoryId");
				
				// Make the JsonP request
				Ext.data.JsonP.request({
					url: webcrumbz.exportPath+'?json=mobile.category',
					params: {
						id: categoryId,
						format: 'json',
						key: webcrumbz.key
					},
					failure: function(){
						// there was an error, but we must go on
						self.categoriesLoaded++;
					},
					success: function(result, request) {
						self.categoriesLoaded++;
						
						// save categories for offline
						self.saveCategoryForOffline(result, categoryId);
						
						// save articles for offline
						self.saveArticlesForOffline(result.posts, categoryId);
					}
				});		
			})
		});	
	},
	
	
	// update category in local SQL DATABASE
	saveCategoryForOffline: function(record, categoryId){
		var categoriesOfflineStore = mainController.categoriesOfflineStore;
		var offlineRecord = categoriesOfflineStore.findRecord("categoryId", categoryId, 0, false, true, true);
		
		if (offlineRecord){
			offlineRecord.updateData(record);
		}
		
		if (this.categoriesLoaded == categoriesOfflineStore.getCount()){
			categoriesOfflineStore.sync();
		}
	},
	
	
	saveArticlesForOffline: function(records, categoryId){
		
		var categoriesStore = mainController.categoriesStore;
		var categoriesOfflineStore = mainController.categoriesOfflineStore;
		var articlesOfflineStore = mainController.articlesOfflineStore;
		
		var category = categoriesStore.findRecord("categoryId",categoryId, 0, false, true, true);
			
		if (records.length > 0){
			Ext.each(records, function(post){
				post.articleId = post.id;
				post.category = category.get("name");
				post.categoryId = categoryId;
				delete post.id;
									
				// add 
				var myRecord = Ext.create("LDPA.model.ArticlesOffline", post);
				articlesOfflineStore.add(myRecord);
			})
		}	
				
		// all categories are now downloaded
		if (this.categoriesLoaded == categoriesOfflineStore.getCount()){
			articlesOfflineStore.sync();
			this.articlesLoaded = 0;
			
			var self = this;
			
			// download content for each article
			Ext.each(articlesOfflineStore.getRange(), function(record){
			
				var articleId = record.get("articleId");
				var categoryId = record.get("categoryId");
								
				// Make the JsonP request
				Ext.data.JsonP.request({
					url: webcrumbz.exportPath+'?json=mobile.post',
					params: {
						id: articleId,
						categoryId: categoryId,
						format: 'json',
						key: webcrumbz.key
					},
					failure: function(){
						self.articlesLoaded++;
					},
					success: function(result, request) {
						
						result.post.content = result.post.content.replace(/width=\"\d+\"|height=\"\d+\"/g,'');
						
						// save article for offline
						self.saveArticleForOffline(result.post, articleId, categoryId);
					}
				});	
			})
		}
	},
	
	
	saveArticleForOffline: function(post, articleId, categoryId){
		this.articlesLoaded++;
		
		var categoriesStore = mainController.categoriesStore;
		var articlesOfflineStore = mainController.articlesOfflineStore;
		var total = articlesOfflineStore.getCount();
		
		
		// update progress bar
		var percent = Math.floor(this.articlesLoaded*100/total);
		var settingsPanel = this.getSettingsPanel();
		var progressBar = settingsPanel.down("#progressBar");
		progressBar.setData({
			percent: percent	
		})
		
		
		// update article in local SQL DATABASE
		//var offlineRecord = articlesOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		var offlineRecordIndex = articlesOfflineStore.findBy(function(record){
			return (record.get("articleId") == articleId && record.get("categoryId") == categoryId);	
		});
				
		// update
		if (offlineRecordIndex != -1){
			var offlineRecord = articlesOfflineStore.getAt(offlineRecordIndex);
			offlineRecord.updateData(post);
			
			var category = categoriesStore.findRecord("categoryId",categoryId, 0, false, true, true);
			offlineRecord.set("category",category.get("name"));
		}
		
		// all articles are now downloaded
		if (this.articlesLoaded == articlesOfflineStore.getCount()){
			articlesOfflineStore.sync();
			
			// remember the last downloading date
			var date = window.localStorage.lastDownloadDate = new Date();
			
			var lastDateBox = settingsPanel.down("#lastDateBox");
			lastDateBox.setData({date: date});
			
			settingsPanel.getMask().setDisabled(false);
		}
	}
});