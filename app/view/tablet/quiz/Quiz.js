Ext.define("LDPA.view.tablet.quiz.Quiz", {
    extend: 'Ext.Panel',
	
    requires: [
        "LDPA.view.tablet.quiz.QuizQuestions",
		"LDPA.view.tablet.quiz.QuizResults"
    ],
    config: {
        
		id: 'quizPanel',
		title: 'Quiz',
		iconCls: 'user_list',
		layout: 'card',
        cls: 'quiz-panel'

    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
		
		var quizQuestions = Ext.create("LDPA.view.tablet.quiz.QuizQuestions");
		this.add(quizQuestions);
		
		var quizResults = Ext.create("LDPA.view.tablet.quiz.QuizResults");
		this.add(quizResults);
	}
});
