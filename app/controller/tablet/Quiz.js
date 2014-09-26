Ext.define('LDPA.controller.tablet.Quiz', {
    extend: 'LDPA.controller.Base',

    config: {
        
		refs: {
            mainView: '#mainView',
			quizPanel: "#quizPanel",
			carousel: '#quizPanel #quizCarousel', 
			quizPrevBtn: {
				selector: 'button[action="quizPrev"]',
				xtype: 'button',
				autoCreate: true
			},
			quizNextBtn: {
				selector: 'button[action="quizNext"]',
				xtype: 'button',
				autoCreate: true
			},
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
			quizPrevBtn: {
				tap: 'onQuizPrevBtnTap'	
			},
			quizNextBtn: {
				tap: 'onQuizNextBtnTap'	
			},
			sendBtn: {
				tap: 'onSendBtnTap'	
			},
			quizShareBtn: {
				tap: 'onShareBtnTap'	
			}
		},
		
		routes: {
			
        }
    },
	
	
	init: function() {
		
    },
	
	launch: function() {
		this.getQuizPanel().fireEvent("loadquiz");
    },
	
	
	onLoadQuiz: function(){
		var quizPanel = this.getQuizPanel();
		var carousel = this.getCarousel();
		
		if (!quizPanel.getMasked()){
			quizPanel.setMasked({
				xtype: 'loadmask',
				message: 'Loading ...',
				transparent: true
			});
		}
		
		// Make the AJAX request
        /*Ext.Ajax.request({
            url: 'data/Quiz.json',
            success: function(result, request) {
               				
				var items = eval("("+result.responseText+")");
				carousel.getStore().add(items.quiz);
				carousel.fireEvent("buildcards");
				
				carousel.setResults(items.results);
				
				quizPanel.unmask();
			}
        });*/
		
		
		// Make the JsonP request
        Ext.data.JsonP.request({
            url: 'http://app.lectiadeprimajutor.ro/tablet/data/Quiz.php',
            success: function(result, request) {
               				
				var items = result;
				carousel.getStore().add(items.quiz);
				carousel.fireEvent("buildcards");
				
				carousel.setResults(items.results);
				
				quizPanel.unmask();
			}
        });
	},
	
	
	onResetQuiz: function(){
		var quizPanel = this.getQuizPanel();
		var carousel = this.getCarousel();
		var navBar = carousel.down("#quizNav");
		var quizResults = this.getQuizResults();
		
		// reset the quiz only if the results page is active
		if (quizPanel.getActiveItem() != quizResults) return;
		
		carousel.setCompleted(0);
		
		// reset progress bar
		var progressBar = carousel.down("#progressBar");
		var bar = Ext.get(progressBar.element.dom).down("div[class='progress-bar']");
		var txt = Ext.get(progressBar.element.dom).down("div[id='quiz-percentage']");

		bar.setStyle({
            '-webkit-transform': 'translate3d(0px, 0px, 0px)'
        });
		txt.setHtml("0%");
		
		// activate progress bar
		navBar.setActiveItem(progressBar);
		
		
		
		// reset each card
		for (var i=carousel.getNoOfDefaultItems(); i<carousel.getItems().length; i++){
			var card = carousel.getItems().items[i];
			card.fireEvent("resetcard");
			
			if (card.getIndex() == 0) 
				carousel.setActiveItem(card);
		}
		
		
		// activate the questions panel
		quizPanel.setActiveItem(carousel.getParent());
	},
	
	
	onCarouselBuildCards: function(){
		var carousel = this.getCarousel();
		var prevBtn = this.getQuizPrevBtn();
		var nextBtn = this.getQuizNextBtn();
		
		var ln = carousel.getStore().getCount();
		
		for (var i=0; i<ln; i++){
			var index = i;
			var itemId = "card_" + index;
			var record = carousel.getStore().getAt(i);
			
			// add a new card
			var card = Ext.create(this.getViewName('quiz.QuizCard'), {
				index: index,
				itemId: itemId,
				data: record.getData(),
				carousel: carousel
			});
			
			carousel.add(card);
			
			if (i==0) carousel.setActiveItem(card);
		}
		
		// if there is more than one question, show the next button
		if (ln > 1){
			nextBtn.show();
		}
	}, 
	
	onCarouselQuestionDone: function(){
		var carousel = this.getCarousel();
		var navBar = carousel.down("#quizNav");
		var completed = carousel.getCompleted()+1;
		
		carousel.setCompleted(completed);
		var percent = (completed / carousel.getStore().getCount());
		
		var progressBar = carousel.down("#progressBar");
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
		var prevBtn = this.getQuizPrevBtn();
		var nextBtn = this.getQuizNextBtn();
		
		var noCards = carousel.getItems().length - carousel.getNoOfDefaultItems();
		
		if (newCard.getIndex() == 0){
			prevBtn.hide();	
			nextBtn.show();
		}
		else{
			if (newCard.getIndex()+1 == noCards){
				nextBtn.hide();
				prevBtn.show();	
			}
			else{
				prevBtn.show();	
				nextBtn.show();
			}
		}
	},
	
	
	onQuizPrevBtnTap: function(){
		var carousel = this.getCarousel();
		carousel.previous();
	},
	
	
	onQuizNextBtnTap: function(){
		var carousel = this.getCarousel();
		carousel.next();
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