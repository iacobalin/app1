var quizController;

Ext.define('LDPA.controller.tablet.Quiz', {
    extend: 'Ext.app.Controller',
	
	requires:[
		
	],

    config: {
        
		refs: {
            mainView: '#mainView',
			quizPanel: "#quizPanel",
			carousel: '#quizPanel #quizCarousel', 
			sendBtn: {
				selector: 'button[action=sendQuiz]',
				xtype: 'button',
				autoCreate: true
			},
			quizResults: "#quizResults",
			quizShareBtn: {
				selector: 'button[name="quizShareBtn"]',
				xtype: 'button',
				autoCreate: true
			}
        },
		
		control: {
			quizPanel: {
				loadquiz: 'onLoadQuiz',
				resetquiz: 'onResetQuiz'
			},
			carousel: {
				buildcards: 'onCarouselBuildCards',
				questiondone: 'onCarouselQuestionDone',
				activeitemchange: 'onCarouselActiveItemChange'
			},
			sendBtn: {
				tap: 'onSendBtnTap'	
			},
			quizShareBtn: {
				tap: 'onShareBtnTap'	
			}
		}
    },
	
	
	init: function() {
		quizController = this;
    },
	
	launch: function() {
		
    },
	
	showQuiz: function(){
		
		// create mask
		var mask = Ext.create("LDPA.view.MainMask", {
			closeFn: function(){
				quizPanel.fireEvent("closepanel");
			}
		});
		
		Ext.Viewport.add(mask);
		
		mask.show();
		
		
		// create quiz panel
		var profile = webcrumbz.profile.toLowerCase();
		var quizPanel = Ext.create("LDPA.view."+profile+".quiz.QuizPanel", {
			mask: mask,
			zIndex: mask.getZIndex()+1
		});
		
		Ext.Viewport.add(quizPanel);
		
		quizPanel.fireEvent("addcontent");	
		quizPanel.show();
	},
	
	
	onCarouselBuildCards: function(){
		var carousel = this.getCarousel();
		var ln = carousel.getStore().getCount();
		
		var profile = webcrumbz.profile.toLowerCase();
		
		for (var i=0; i<ln; i++){
			var index = i;
			var itemId = "card_" + index;
			var record = carousel.getStore().getAt(i);
			
			// add a new card
			var card = Ext.create("LDPA.view."+profile+".quiz.QuizCard", {
				index: index,
				itemId: itemId,
				data: record.getData(),
				carousel: carousel
			});
			
			carousel.add(card);
			
			if (i==0) carousel.setActiveItem(card);
		}
	}, 
	
	onCarouselQuestionDone: function(){
		var quizPanel = this.getQuizPanel();
		var carousel = this.getCarousel();
		var navBar = quizPanel.down("#quizNav");
		var completed = carousel.getCompleted()+1;
		
		carousel.setCompleted(completed);
		var percent = (completed / carousel.getStore().getCount());
		
		var progressBar = quizPanel.down("#progressBar");
		var bar = Ext.get(progressBar.element.dom).down("div[class='progress-bar']");
		var txt = Ext.get(progressBar.element.dom).down("div[id='quiz-percentage']");

		bar.setStyle({
            '-webkit-transition': 'all 0.4s ease',
            '-webkit-transform': 'translate3d('+(percent*200)+'px, 0px, 0px)'
        });
		txt.setHtml(Math.round(percent*100)+"%");
		
		Ext.defer(function(){
			if (percent == 1){
				navBar.animateActiveItem(1, {type: "fade", duration: 300});	
			}
		}, 600, this);
	},
	
	
	onCarouselActiveItemChange : function(carousel, newCard, oldCard){
		var noCards = carousel.getItems().length - carousel.getNoOfDefaultItems();
	},
	
	
	onSendBtnTap: function(){
		var quizPanel = this.getQuizPanel();
		var carousel = this.getCarousel();
		var quizResults = this.getQuizResults();
		var points = 0;
		
		// compute the total number of points
		for (var i=carousel.getNoOfDefaultItems(); i<carousel.getItems().length; i++){
			var card = carousel.getItems().items[i];
			points += card.getPoints();
		}
		
		var result;
		
		// find the result that correspond to the total number of points
		for (var i=0; i<carousel.getResults().length; i++){
			var r = carousel.getResults()[i];
			
			if (points >= r.minPoints && points <= r.maxPoints){
				result = r;
				break;
			}
		}
		
		quizResults.setData(result);
		quizResults.fireEvent("setactions");
		quizPanel.animateActiveItem(quizResults, {type: "slide", direction: 'left'});	
	},
	
	
	onShareBtnTap: function(){
		var quizResults = this.getQuizResults();	
		
		var webUrl = encodeURIComponent(quizResults.getData().webUrl);
		var title = quizResults.getData().title.replace(/\\u0219/g,"s");
		var summary = encodeURIComponent(quizResults.getData().motto);
		var img = quizResults.getData().image;
		
		
		// open a new link
		var a = document.createElement("a");
		a.setAttribute("href", "http://www.facebook.com/sharer/sharer.php?s=100&p[title]="+title+"&p[summary]="+summary+"&p[url]="+webUrl+"&p[images][0]="+img);
		a.setAttribute("target", "_blank");
		
		var clickEvent = document.createEvent("MouseEvent");
		clickEvent.initMouseEvent("click", true, true, window, 0);
		a.dispatchEvent(clickEvent);
	}
	
});