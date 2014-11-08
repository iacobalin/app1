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
			},
			newsletterForm: {
				selector: '#newsletterFormPanel',
                autoCreate: true		
			},
			questionForm: {
				selector: '#questionFormPanel',
                autoCreate: true		
			},
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
				newsController.showNews();
				break;
			
			case "newsletter":
				this.showNewsletter();
				break;
			
			case "ask":
				this.showQuestion();
				break;
				
			case "quiz":
				quizController.showQuiz();
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
		if (!mainController.isOnline()){
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
		if (!mainController.isOnline()){
			mask.fireEvent("close");
			
			alert(webcrumbz.offlineMsg);
		}
		// online loading
		else{
			
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=tablet.add_feedback',
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
	
	
	showNewsletter: function(){
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			closeFn: function(){
				newsletterForm.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create settings panel
		var profile = webcrumbz.profile.toLowerCase();
		var newsletterForm = Ext.create("LDPA.view."+profile+".actions.NewsletterForm", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(newsletterForm);
		
		mask.show();
		newsletterForm.show();	
	},
	
	
	submitNewsletterForm: function() {
        
		var newsletterForm = this.getNewsletterForm();
		
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
		if (!mainController.isOnline()){
			mask.fireEvent("close");
			
			alert(webcrumbz.offlineMsg);
		}
		// online loading
		else{
			
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=tablet.add_newsletter',
				params: {
					name			: newsletterForm.getValues().name,
					email			: newsletterForm.getValues().email,
					key				: webcrumbz.key
				},
				success: function(result, request) {
					
					// hide mask
					mask.fireEvent("close");
					
					if (result.status == "ok"){
						
						newsletterForm.reset();
						alert('Te-ai \u00EEnscris cu succes la newsletter-ul Lec\u021Bia de prim ajutor. \u00CEn c\u00E2teva minute, vei primi un email de confirmare. Acceseaz\u0103 link-ul din email pentru a confirma \u00EEnscrierea. Dac\u0103 nu prime\u0219ti emailul de confirmare \u00EEn 15 minute, verific\u0103 \u0219i \u00EEn Spam');
						//Ext.Msg.alert('Felicit&#259;ri', 'Mesajul t&#259;u a fost trimis cu succes!<br/>&#206;&#355;i mul&#355;umim!', Ext.emptyFn);
					}
					else{
						alert('\u00EEncearc\u0103 din nou sau trimite un email la newsletter@lectiadeprimajutor.ro!')
						//Ext.Msg.alert('Eroare', 'Mesajul t&#259;u nu a fost trimis!<br/> &#206;ncearc&#259; din nou sau trimite un email la contact@lectiadeprimajutor.ro!', Ext.emptyFn);
					}
				}
			});
		}
    },
	
	
	showQuestion: function(){
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			closeFn: function(){
				questionForm.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		// create settings panel
		var profile = webcrumbz.profile.toLowerCase();
		var questionForm = Ext.create("LDPA.view."+profile+".actions.QuestionForm", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(questionForm);
		
		mask.show();
		questionForm.show();	
	},
	
	
	submitQuestionForm: function() {
        
		var questionForm = this.getQuestionForm();
		
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
		if (!mainController.isOnline()){
			mask.fireEvent("close");
			
			alert(webcrumbz.offlineMsg);
		}
		// online loading
		else{
			
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=tablet.add_question',
				params: {
					name			: questionForm.getValues().name,
					email			: questionForm.getValues().email,
					question		: questionForm.getValues().question,
					key				: webcrumbz.key
				},
				success: function(result, request) {
					
					// hide mask
					mask.fireEvent("close");
					
					if (result.status == "ok"){
						
						questionForm.reset();
						alert('\u00CEntrebarea ta a fost trimis\u0103. \u00CEn cel mai scurt timp vei primi un r\u0103spuns din partea unui medic SMURD. \u00CE\u021Bi mul\u021Bumim!');
						//Ext.Msg.alert('Felicit&#259;ri', 'Mesajul t&#259;u a fost trimis cu succes!<br/>&#206;&#355;i mul&#355;umim!', Ext.emptyFn);
					}
					else{
						alert('Mesajul t\u0103u nu a fost trimis! \u00CEncearc\u0103 din nou sau trimite un email la questions@lectiadeprimajutor.ro!');
						//Ext.Msg.alert('Eroare', 'Mesajul t&#259;u nu a fost trimis!<br/> &#206;ncearc&#259; din nou sau trimite un email la contact@lectiadeprimajutor.ro!', Ext.emptyFn);
					}
				}
			});
		}
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
				Ext.defer(function(){
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
				}, 350);
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
			
			// update progress bar
			var settingsPanel = this.getSettingsPanel();
			var progressBar = settingsPanel.down("#progressBar");
			progressBar.setData({
				progress: 50	
			})
		}
		else{
			var percent = this.categoriesLoaded * 50 / categoriesOfflineStore.getCount();
			var settingsPanel = this.getSettingsPanel();
			var progressBar = settingsPanel.down("#progressBar");
			progressBar.setData({
				progress: percent	
			})	
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
			
			this.articlesSetsLoaded = 0;
			this.totalArticlesSets = Math.ceil(articlesOfflineStore.getCount()/10);
			
			var self = this;
			
			// download content for each article
			for (var i=0; i<this.totalArticlesSets; i++){
				
				var count = 0;
				
				// Make the JsonP request
				Ext.defer(function(){
					var records = articlesOfflineStore.getRange(10*count, 10*count+9);
					count++;
				
					// get articles ids
					var articlesIds = [];
					Ext.each(records, function(record){
						articlesIds.push(record.get("articleId"));	
					});
					
					articlesIds = articlesIds.toString();
					
					Ext.data.JsonP.request({
						url: webcrumbz.exportPath+'?json=mobile.posts',
						params: {
							ids: articlesIds,
							format: 'json',
							key: webcrumbz.key
						},
						failure: function(){
							self.articlesSetsLoaded++;
						},
						success: function(result, request) {
							
							self.articlesSetsLoaded++;
								
							if (result.posts.length > 0){
								var posts = result.posts;
								
								Ext.each(posts, function(post){
									post.content = post.content.replace(/width=\"\d+\"|height=\"\d+\"/g,'');
									
									var articleId = post.id;
									Ext.each(post.category_id, function(categoryId, index){
										// save article for offline
										self.saveArticleForOffline(post, articleId, categoryId);
									})
								});
							}
						}
					});
				}, 350);
			}
		}
	},
	
	
	saveArticleForOffline: function(post, articleId, categoryId){
		
		var articlesOfflineStore = mainController.articlesOfflineStore;
		
		// update article in local SQL DATABASE
		var offlineRecordIndex = articlesOfflineStore.findBy(function(record){
			return (record.get("articleId") == articleId && record.get("categoryId") == categoryId);	
		});
				
		// update
		if (offlineRecordIndex != -1){
			var offlineRecord = articlesOfflineStore.getAt(offlineRecordIndex);
			offlineRecord.set("content", post.content);
		}
		
		// all articles sets are now downloaded
		if (this.articlesSetsLoaded == this.totalArticlesSets){
			
			var self = this;
			var settingsPanel = this.getSettingsPanel();
			setTimeout(function(){
				articlesOfflineStore.sync();
			
				// remember the last downloading date
				var date = window.localStorage.lastDownloadDate = new Date();
				
				var lastDateBox = settingsPanel.down("#lastDateBox");
				lastDateBox.setData({date: date});
				
				settingsPanel.getMask().setDisabled(false);
				
				var progressBar = settingsPanel.down("#progressBar");
				progressBar.setData({
					progress: 100	
				});
				
				// save images for offline
				self.saveArticlesImagesForOffline();
			}, 5000);	
		}
		else{
			var percent = this.articlesSetsLoaded * 50 / this.totalArticlesSets;
			var settingsPanel = this.getSettingsPanel();
			var progressBar = settingsPanel.down("#progressBar");
			progressBar.setData({
				progress: percent+50	
			})		
		}
	},
	
	saveArticlesImagesForOffline: function(){
		var articlesOfflineStore = mainController.articlesOfflineStore;
		
		var count = 0;
		for (var i=0; i<articlesOfflineStore.getCount(); i++){
			Ext.defer(function(){
				var article = articlesOfflineStore.getAt(count);
				count++;
				
				var content = article.get("content");
		
				if (content){		
					var srcs = content.match(/src\=\"[a-zA-Z0-9\:\/\.\-\%\_]+\.(jpg|png|gif)\"/g);
					Ext.each(srcs, function(src){
						src = src.replace('src="',"");
						src = src.replace('"',"");
						
						mainController.saveImageForOffline(src);
					});
				}
			}, 300);
		}
	}
});