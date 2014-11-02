Ext.define("LDPA.view.tablet.quiz.QuizCarousel", {
    extend: 'Ext.Carousel',
	
    requires: [
        'LDPA.view.tablet.quiz.QuizCard',
		'LDPA.store.Quiz'
    ],
    config: {
        
		itemId: 'quizCarousel',
		
		store: null,												// quiz store
		results: null,
		noOfDefaultItems: 0,
		completed: 0,
		
		scrollable: null,
		margin: 0,
		padding: 0,
        cls: 'quiz-carousel',
		
		animation: {
            duration: 600,
            easing: {
                type: 'ease-out'
            }
        }
    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		this.setNoOfDefaultItems(this.getItems().length);
		
		// create the carousel's store with loaded quiz questions
		this.setStore(Ext.create("LDPA.store.Quiz"));
	}
});
