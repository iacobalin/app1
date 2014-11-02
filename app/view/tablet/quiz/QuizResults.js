Ext.define("LDPA.view.tablet.quiz.QuizResults", {
    extend: 'Ext.Panel',
	
    requires: [
        
    ],
    config: {
        isFilled: false,
		
		itemId: 'quizResults',
		scrollable: {
            direction: 'vertical',
            indicators: false
        },
		
		tpl: new Ext.XTemplate(
            '<div class="bar">',
                '<h1>{[this.encodeTitle(values.title)]}</h1>',
            '</div>',
            '<div class="content">',
			    '<div class="{cls}"></div>',
			    '<p class="moto">{motto}</p>',
			    '<p>Felicit&#259;ri! Ai acceptat provocarea al&#259;turi de Lec&#355;ia de prim ajutor &#351;i ai v&#259;zut ce fel de atitudine te caracterizeaz&#259; atunci c&#226;nd e&#351;ti pus &#238;n situa&#355;ia de salvator.</p>',
			    '<p>Lec&#355;ia de prim ajutor &#238;&#355;i mul&#355;ume&#351;te c&#259; te-ai jucat cu cele mai uzuale proceduri de prim ajutor &#351;i te invit&#259; s&#259; te documentezi corect pe <a href="http://www.lectiadeprimajutor.ro">www.lectiadeprimajutor.ro</a> pentru a afla mai multe despre primul ajutor &#238;n cazuri de urgen&#355;&#259;. Oricare e punctajul pe care l-ai ob&#355;inut &#238;n urma acestui test, nu uita c&#259; interven&#355;ia ta poate salva vie&#355;i. F&#259; totul pentru via&#355;&#259;!</p>',
			'</div>',
			{
				encodeTitle: function(title){
					var t = title.replace(/\\u0219/g,"&#351;");
					return t;
				}
			}
		),
        cls: 'quiz-results'

    },
	
	
	initialize: function(){
		
		this.callParent(arguments);
	}
});
