Ext.define('LDPA.controller.tablet.Home', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
            mainView: '#mainView',
			homePanel: '#homePanel',
			carousel: '#homePanel #videoCarousel',
			list: '#homePanel #categoriesList',
			mapBtn: {
				selector: 'button[action=viewMap]',
				xtype: 'button',
				autoCreate: true
			},
			quizBtn: {
				selector: 'button[action=viewQuiz]',
				xtype: 'button',
				autoCreate: true
			},
			questionsBtn: {
				selector: 'button[action=viewQuestions]',
				xtype: 'button',
				autoCreate: true
			},
			
			// video lessons module
			videoPanel: '#videoPanel',
			videoDetailsPanel: '#videoPanel #videoDetails',
			
			// articles module
			articlesPanel: '#articlesPanel',
			categoryDetailsPanel: '#articlesPanel #categoryDetails',
			
			// map module
			mapPanel: '#mapPanel',
			
			// quiz module
			quizPanel: '#quizPanel',
			
			// doctor question module
			questionsForm: '#questionsForm',
        },
		
		control: {
			list: {
				itemtap: 'onCategoryItemTap'
			},
			carousel: {
				buildcards: 'onCarouselBuildCards',
				updatecard: 'onCarouselUpdateCard',
				showdetails: 'onCarouselShowDetails'
			},
			mapBtn: {
				tap: 'onMapBtnTap'	
			},
			quizBtn: {
				tap: 'onQuizBtnTap'	
			},
			questionsBtn: {
				tap: 'onQuestionsBtnTap'	
			}
		},
		
		routes: {
			
        }
    },
	
	
	init: function() {
		
    },
	
	launch: function() {
		
		var carousel = this.getCarousel();
		var list = this.getList();
		
		list.getStore().load();
		
		carousel.getStore().load(function(records){
			carousel.fireEvent("buildcards");
			carousel.fireEvent("loadcompleted");
		})
    },
	
	
	onCategoryItemTap: function(list, index, el, record){
		var categoryDetailsPanel = this.getCategoryDetailsPanel();
		categoryDetailsPanel.fireEvent("loadcategory", record.get("id"));
	},
	
	
	onCarouselBuildCards: function(){
		var carousel = this.getCarousel();
		
		for (var i=0; i<carousel.getStore().getCount(); i++){
			var index = i;
			var itemId = "card_" + index;
			var record = carousel.getStore().getAt(i);
			
			// add a new card
			var card = Ext.create(this.getViewName('home.VideoCard'), {
				index: index,
				itemId: itemId,
				data: record.getData(),
				carousel: carousel,
			});
			
			carousel.add(card);
			
			if (i==0) carousel.setActiveItem(card);
		}
	},
	
	onCarouselUpdateCard: function(options){
		var videoId = options.videoId || null;
		var data = options.data || null;
		
		var carousel = this.getCarousel();
		
		var index = carousel.getStore().findExact("id", videoId, 0);
		
		if (index != -1){
			var card = carousel.down("#card_"+index);
			card.setData(data);
			card.fireEvent("setactions");
		}
	},
	
	onCarouselShowDetails: function(data){
		var videoPanel = this.getVideoPanel();
		var mainPanel = this.getMainView();
		var detailsPanel = this.getVideoDetailsPanel();
		
		// activate Video Lessons module
		mainPanel.setActiveItem(videoPanel);
		
		// update Details Video Panel
		Ext.defer(function(){
			detailsPanel.fireEvent("setdata", data, true);
		}, 250);
			
	},
	
	onMapBtnTap: function(){
		var mapPanel = this.getMapPanel();
		var mainPanel = this.getMainView();
		
		
		// activate Map module
		mainPanel.setActiveItem(mapPanel.getParent());
		
		// scroll to current position
		Ext.defer(function(){
			if (mapPanel.getIsFilled() && mapPanel.getMap()){
				var position = new google.maps.LatLng(mapPanel._geo.getLatitude(), mapPanel._geo.getLongitude());
				mapPanel.getMap().panTo(position);
			}
		}, 1000);
	},
	
	
	onQuizBtnTap: function(){
		var quizPanel = this.getQuizPanel();
		var mainPanel = this.getMainView();
		
		quizPanel.fireEvent("resetquiz");
		
		// activate Quiz module
		mainPanel.setActiveItem(quizPanel);
	},
	
	
	onQuestionsBtnTap: function(){
		var questionsForm = this.getQuestionsForm();
		var mainPanel = this.getMainView();
		
		// activate Doctor questions module
		mainPanel.setActiveItem(questionsForm);
	}	
});