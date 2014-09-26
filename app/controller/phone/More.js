Ext.define('LDPA.controller.phone.More', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
            morePanel: "#morePanel",
			moreList: "#morePanel #moreList",
			
			contactForm: '#contactForm',
			errorsPanel: '#contactForm #errorsPanel',
			contactButton: '#contactForm button',
			
			sharePanel: "#sharePanel",
			
			settingsPanel: "#settingsPanel",
			settingsButton: '#settingsPanel #btnDownload',
        },
		
		control: {
			moreList: {
				itemtap: "onMorelListItemTap"
			},
			
			contactButton: {
				tap: 'onContactButtonTap'	
			},
			
			settingsButton: {
				tap: 'onSettingsButtonTap'	
			}
		}
    },
	
	
	init: function() {
		
    },
	
	launch: function() {
		
    },
	
	
	onMorelListItemTap: function(list, index, item, record){
		var morePanel = this.getMorePanel();
		
		switch (record.get("type")){
			
			case "contact":
				var contactForm = this.getContactForm();
				morePanel.animateActiveItem(contactForm, {type: "slide", direction: "left"});
				
				break;
				
			case "share":
				var sharePanel = this.getSharePanel();
				morePanel.animateActiveItem(sharePanel, {type: "slide", direction: "left"});
				
				break;
				
			case "settings":
				var settingsPanel = this.getSettingsPanel();
				morePanel.animateActiveItem(settingsPanel, {type: "slide", direction: "left"});
				
				break;
				
			default: break;	
		}
	},
	
	
	onContactButtonTap: function(){
		var form = this.getContactForm();
		var errorsPanel = this.getErrorsPanel();
				
		var model = Ext.create("LDPA.model.Contact",{
			name: form.getValues().name,
			email: form.getValues().email,
			source: form.getValues().source,
			quality: form.getValues().quality,
			message: form.getValues().message
		});
		
		var errors = model.validate(),
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
            cls: 'loading-general'
		});
		
		// offline
		if (!LDPA.app.isOnline()){
			alert(webcrumbz.offlineMsg);
			form.unmask();
		}
		// online send
		else{
		
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.add_feedback',
				params: {
					nume			: form.getValues().name,
					adresa_email	: form.getValues().email,
					sursa_info		: form.getValues().source,
					calitate_info	: form.getValues().quality,
					parerea			: form.getValues().message,
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
    },
	
	
	onSettingsButtonTap: function(){
		var self = this;
		var categoriesOfflineStore = Ext.getStore("CategoriesOffline");
		var articlesOfflineStore = Ext.getStore("ArticlesOffline");
		var categories = categoriesOfflineStore.getRange();
		
		// offline
		if (!LDPA.app.isOnline()){
			alert(webcrumbz.offlineMsg);
		}
		// online
		else{		
		
			Ext.Viewport.setMasked({
				xtype: 'loadmask',
				message: '',
				cls: 'downloading',
				tpl: "Downloading...<br/>{progress}",
				data: {
					progress: ""	
				}
			});		
			
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
		}
	},
	
	
	// update category in local SQL DATABASE
	saveCategoryForOffline: function(record, categoryId){
		var categoriesOfflineStore = Ext.getStore("CategoriesOffline");
		var offlineRecord = categoriesOfflineStore.findRecord("categoryId", categoryId, 0, false, true, true);
		
		if (offlineRecord){
			offlineRecord.updateData(record);
		}
		
		if (this.categoriesLoaded == categoriesOfflineStore.getCount()){
			categoriesOfflineStore.sync();
		}
	},
	
	
	saveArticlesForOffline: function(records, categoryId){
		
		var categoriesOfflineStore = Ext.getStore("CategoriesOffline");
		var articlesOfflineStore = Ext.getStore("ArticlesOffline");
		
		var category = Ext.getStore("Categories").findRecord("categoryId",categoryId, 0, false, true, true);
			
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
		
		var articlesOfflineStore = Ext.getStore("ArticlesOffline");
		var total = articlesOfflineStore.getCount();
		
		
		// update mask
		var percent = Math.floor(this.articlesLoaded*100/total);
		Ext.Viewport.getMasked().setData({progress: percent+"%"});
		
		
		// update article in local SQL DATABASE
		//var offlineRecord = articlesOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		var offlineRecordIndex = articlesOfflineStore.findBy(function(record){
			return (record.get("articleId") == articleId && record.get("categoryId") == categoryId);	
		});
				
		// update
		if (offlineRecordIndex != -1){
			var offlineRecord = articlesOfflineStore.getAt(offlineRecordIndex);
			offlineRecord.updateData(post);
			
			var category = Ext.getStore("Categories").findRecord("categoryId",categoryId, 0, false, true, true);
			offlineRecord.set("category",category.get("name"));
		}
		
		// all articles are now downloaded
		if (this.articlesLoaded == articlesOfflineStore.getCount()){
			articlesOfflineStore.sync();
			
			// remember the last downloading date
			var date = window.localStorage.lastDownloadDate = new Date();
			
			var settingsPanel = this.getSettingsPanel();
			var lastDateBox = settingsPanel.down("#lastDateBox");
			lastDateBox.setData({date: date});
			
			Ext.Viewport.unmask();
		}
	},
});