Ext.define('LDPA.controller.phone.Home', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
            homePanel: '#homePanel',
			categoriesList: '#homePanel #categoriesList',
			categoryDetails: '#homePanel #categoryDetails',
			articlesList: {
                selector: '#homePanel #categoryDetails #categoryArticlesList',
                autoCreate: true
            },
			articleDetails: '#homePanel #articleDetails',
			resultsList: {
                selector: '#homePanel #resultsList',
                autoCreate: true
            },
			searchField: '#homePanel searchfield'
        },
		
		control: {
			categoriesList: {
				itemtap: 'onCategoriesListItemTap',
				showposts: 'showPostsByCategory'
			},
			articlesList: {
				showpost: 'showPostById'	
			},
			resultsList: {
				itemtap: 'onResultsListItemTap',
				showpost: 'showPostById'	
			},
			searchField: {
				keyup: 'onSearch'	
			}
		}
    },
	
	
	launch: function() {
        var self = this;
		
		var categoriesOfflineStore = Ext.getStore("CategoriesOffline");
		var articlesOfflineStore = Ext.getStore("ArticlesOffline");
		var videoOfflineStore = Ext.getStore("VideoArticlesOffline");
		var imagesOfflineStore = Ext.getStore("ImagesOffline");
		var imagesLoadingList = Ext.getStore("ImagesLoadingList");
		
		//categoriesOfflineStore.getModel().getProxy().dropTable();
		//articlesOfflineStore.getModel().getProxy().dropTable();
		//videoOfflineStore.getModel().getProxy().dropTable();
		//imagesOfflineStore.getModel().getProxy().dropTable();
		
		categoriesOfflineStore.load(function(){
			articlesOfflineStore.load(function(){
				imagesOfflineStore.load(function(){
					
					// offline loading
					if (!LDPA.app.isOnline()){
						var store = Ext.getStore('Categories');
						store.add(categoriesOfflineStore.getRange());
						
						self.addDummyCategory();
					}
					// online loading
					else{
						var store = Ext.getStore('Categories').load(function(records){
							if (records.length > 0){
								// save categories for offline
								self.saveCategoriesForOffline(records);
								
								self.addDummyCategory();
							}
							// if there was an error with the server's response, then load the content from SQL Database
							else{
								store.add(categoriesOfflineStore.getRange());
						
								self.addDummyCategory();
							}
						});	
					}
				});	
			});	
		});
    },
	
    
	onCategoriesListItemTap: function(list, index, item, record){
		var count = list.getStore().getCount();
		
    	if (index == count-1 && record.get("sequence") == 1000) return;
		
		list.fireEvent("showposts", record.get("categoryId"));
	},
	
	
    showPostsByCategory: function(id) {
        var self = this;
		var homePanel = this.getHomePanel();
		var categoryDetails = this.getCategoryDetails();
		
		homePanel.setMasked({
			xtype: 'loadmask',
			message: 'Loading ...',
            cls: 'loading-general'
		});
		
		// offline loading
		if (!LDPA.app.isOnline()){
			// show category from offline			
			this.showCategoryFromOffline(id);
		}
		// online loading
		else{
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.category',
				params: {
					id: id,
					format: 'json',
				},
				failure: function(){
					// show category from offline			
					self.showCategoryFromOffline(id);
				},
				success: function(result, request) {
					homePanel.unmask();
					
					// update values
					categoryDetails.down("#titleBar").setTitle(result.name);
					
					// update category descriptions
					var descriptionView = categoryDetails.down("#description");
					descriptionView.setData({
						image: result.image,
						description: result.description
					})
					
					
					// save categories for offline
					self.saveCategoryForOffline(result, id);
					
					// save articles for offline
					self.saveArticlesForOffline(result.posts, id);
						
						
					// update posts list
					categoryDetails.down("#categoryArticlesList").setData(result.posts);	
						
					// scroll up
					var scroller = categoryDetails.getScrollable().getScroller();
					scroller.scrollTo(0,0);
					
					// activate card
					homePanel.animateActiveItem(categoryDetails, {type: 'slide', direction: 'left'});
				}
			});	
		}
    },
	
	
	onSearch : function(field, e){
		var keyCode = e.event.keyCode,
            searchField = this.getSearchField();

        //the return keyCode is 13.
        if (keyCode == 13) {
            //fire the search action with the current value of the searchField
            this.fireAction('search', [searchField.getValue()], 'doSearch');
        }
	},
	
	
	doSearch: function(search) {
        var model = LDPA.model.Articles,
			homePanel   = this.getHomePanel(),
			searchField   = this.getSearchField(),
            resultsList   = this.getResultsList(),
			query,
			self = this;
		
        // ensure there is a search...
        if (!search) {
            return;
        }
		
		Ext.Viewport.setMasked({
			xtype: 'loadmask',
			message: 'Loading...',
            cls: 'loading-general'
		});
        
		query = search.replace("%20", " ");
		
		// offline
		if (!LDPA.app.isOnline()){
			Ext.Viewport.unmask();
			
			alert(webcrumbz.offlineMsg);
		}
		// online search
		else{
			resultsList.getStore().load({
				filters: { 
					q : query,
					key: webcrumbz.key
				},
				callback: function(results){
					var posts = [];
					Ext.each(results, function(post){
						posts.push(post.getData());	
					})
					
					//save articles for online
					self.saveArticlesForOffline(posts);
					
					// activate card
					homePanel.animateActiveItem(resultsList, {type: 'slide', direction: 'left'});
					
					Ext.Viewport.unmask();
				}
			});
		}

        //empty the field and remove focus from it
        searchField.setValue('');
        searchField.blur();
    },
	
	
	
	
	onResultsListItemTap: function(list, index, item, record){
		var articleDetails = this.getArticleDetails();
		var resultsList = this.getResultsList();
		
		articleDetails.setBackPanel(resultsList);
		
		list.fireEvent("showpost", record.get("articleId"));
	},
	
	
	showPostById: function(id){
        var self = this;
		var homePanel = this.getHomePanel();
		var articleDetails = this.getArticleDetails();
		var categoryDetails = this.getCategoryDetails();
		
		homePanel.setMasked({
			xtype: 'loadmask',
			message: 'Loading...',
            cls: 'loading-general'
		});
		
		
		// offline loading
		if (!LDPA.app.isOnline()){
			// show article from offline
			this.showArticleFromOffline(id);
		}
		// online loading
		else{
		
			// Make the JsonP request
			Ext.data.JsonP.request({
				url: webcrumbz.exportPath+'?json=mobile.post',
				params: {
					id: id,
					format: 'json',
				},
				failure: function(){
					// show article from offline
					self.showArticleFromOffline(id);
				},
				success: function(result, request) {
					homePanel.unmask();
					
					result.post.content = result.post.content.replace(/width=\"\d+\"|height=\"\d+\"/g,'');
					
					// save article for offline
					self.saveArticleForOffline(result.post, id);
					
					result.post.content = result.post.content.replace(/src=\"/gi,'src="http://src.sencha.io/-10/');
					result.post.articleId = result.post.id;
					
					// update values
					articleDetails.setData(result.post);					
					
					var scroller = articleDetails.getScrollable().getScroller();
					scroller.scrollTo(0,0);
										
					// activate card
					homePanel.animateActiveItem(articleDetails, {type: 'slide', direction: 'left'});
				}
			});
		}
    },
	
	
	addDummyCategory: function(){
		var store = Ext.getStore("Categories");
		if (store.getCount() % 2 != 0){			
			var dummyCategory = Ext.create(store.getModel(), { categoryId: '', name: '&nbsp;', description: '', image: '', sequence: 1000 })
			store.add(dummyCategory);
		}
	},
	
	
	saveCategoriesForOffline: function(records){
		var categoriesOfflineStore = Ext.getStore("CategoriesOffline");
		var newIds = [];
								
		// add records to local SQL DATABASE
		Ext.each(records, function(record){
			record.updateData();
			newIds.push(record.get("id"));
			
			var data = record.getData();
			var offlineRecord = categoriesOfflineStore.findRecord("categoryId", data.categoryId, 0, false, true, true);
			
			// update
			if (offlineRecord){
				offlineRecord.updateData(data);
			}
			// add
			else{
				var myRecord = Ext.create("LDPA.model.CategoriesOffline");
				myRecord.updateData(data);
			
				categoriesOfflineStore.add(myRecord);	
			}
		});
		
		
		// delete old records
		Ext.each(categoriesOfflineStore.getRange(), function(record){
			if (newIds.indexOf(record.get("categoryId")) == -1){
				categoriesOfflineStore.remove(record);
			}
		});
		
		// syncronize the categories offline store
		categoriesOfflineStore.sync();
	},
	
	
	// update category in local SQL DATABASE
	saveCategoryForOffline: function(record, categoryId){
		var categoriesOfflineStore = Ext.getStore("CategoriesOffline");
		var offlineRecord = categoriesOfflineStore.findRecord("categoryId", categoryId, 0, false, true, true);
		
		if (offlineRecord){
			offlineRecord.updateData(record);
		}
		
		categoriesOfflineStore.sync();
	},
	
	
	// update articles in local SQL DATABASE
	saveArticlesForOffline: function(records, categoryId){
		var articlesOfflineStore = Ext.getStore("ArticlesOffline");
		var category = Ext.getStore("Categories").findRecord("id",categoryId, 0, false, true, true);
		
		if (records.length > 0){
			var newIds = [];
			
			Ext.each(records, function(post){
				post.articleId = post.id;
				if (category){
					post.category = category.get("name");
					post.categoryId = categoryId;
				}
				delete post.id;
				
				newIds.push(post.articleId);
				
				var offlineRecord = articlesOfflineStore.findRecord("articleId", post.articleId, 0, false, true, true);
				
				// update
				if (offlineRecord){
					offlineRecord.updateData(post);
				}
				// add
				else{
					var myRecord = Ext.create("LDPA.model.ArticlesOffline", post);
					articlesOfflineStore.add(myRecord);	
				}
			})
			
			// delete old records
			Ext.each(articlesOfflineStore.getRange(), function(record){
				if (newIds.indexOf(record.get("articleId")) == -1 && record.get("categoryId") == categoryId){
					articlesOfflineStore.remove(record);
				}
			});
		}
		
		articlesOfflineStore.sync();	
	},
	
	
	saveArticleForOffline: function(post, articleId){
		// update articles in local SQL DATABASE
		var articlesOfflineStore = Ext.getStore("ArticlesOffline");
		var offlineRecord = articlesOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		
		// update
		if (offlineRecord){
			offlineRecord.updateData(post);
			
			if (offlineRecord.get("categoryId") == 0){
				// search for the category id
				var category = Ext.getStore("Categories").findRecord("name", offlineRecord.get("category"), 0, false, true, true);	
				if (category){
					offlineRecord.set("categoryId", category.get("categoryId"));
				}
			}
		}
		
		articlesOfflineStore.sync();
	},
	
	
	showCategoryFromOffline: function(categoryId){
		var homePanel = this.getHomePanel();
		var categoryDetails = this.getCategoryDetails();
		
		var categoriesOfflineStore = Ext.getStore("CategoriesOffline");
		var articlesOfflineStore = Ext.getStore("ArticlesOffline");
		
		var categoryOfflineRecord = categoriesOfflineStore.findRecord("categoryId", categoryId, 0, false, true, true);
		
		if (categoryOfflineRecord){
			// update values
			categoryDetails.down("#titleBar").setTitle(categoryOfflineRecord.get("name"));
			
			// update category descriptions
			var descriptionView = categoryDetails.down("#description");
			descriptionView.setData({
				image: categoryOfflineRecord.get("image"),
				description: categoryOfflineRecord.get("description")
			});
			
			articlesOfflineStore.filter("categoryId", categoryId);
			articlesOfflineStore.load(function(records){
				var data = [];
				Ext.each(records, function(record){
					data.push(record.getData());	
				})
				
				homePanel.unmask();
				
				// update posts list
				categoryDetails.down("#categoryArticlesList").setData(data);
						
				// scroll up
				var scroller = categoryDetails.getScrollable().getScroller();
				scroller.scrollTo(0,0);
				
				// activate card
				homePanel.animateActiveItem(categoryDetails, {type: 'slide', direction: 'left'});	
				
				articlesOfflineStore.clearFilter();	
			})
		}
		else{
			homePanel.unmask();	
		}
	},
	
	
	showArticleFromOffline: function(articleId){
		var homePanel = this.getHomePanel();
		var articleDetails = this.getArticleDetails();
				
		var articlesOfflineStore = Ext.getStore("ArticlesOffline");
			
		var articleOfflineRecord = articlesOfflineStore.findRecord("articleId", articleId, 0, false, true, true);
		
		if (articleOfflineRecord){
			homePanel.unmask();
			
			var imagesOffline = LDPA.app.imagesOffline;
			var content = articleOfflineRecord.get("content");
			var srcs = content.match(/src\=\"[a-zA-Z0-9\:\/\.\-\%\_]+\.(jpg|png|gif)\"/g);
			
			Ext.each(srcs, function(src){
				src = src.replace('src="',"");
				src = src.replace('"',"");
				
				var record = imagesOffline.findRecord("url", src, 0, false, true, true);
				if (record){
					content = content.replace(src, record.get("dataUrl"));
				}
			});
			
			articleOfflineRecord.set("content", content);
			
							
			// update values
			articleDetails.setData(articleOfflineRecord.getData());
			
			var scroller = articleDetails.getScrollable().getScroller();
			scroller.scrollTo(0,0);
								
			// activate card
			homePanel.animateActiveItem(articleDetails, {type: 'slide', direction: 'left'});
		}
		else{
			homePanel.unmask();	
		}
	}
});