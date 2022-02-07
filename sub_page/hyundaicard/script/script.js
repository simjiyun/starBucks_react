(function($){
    var hyundaiCard = {
        init: function(){
            this.section1();
            this.section2();            
            this.section3();            
            this.section4();            
            this.section5();            
        },
        section1: function(){

        },
        section2: function(){
            var imgOnOff = 'off';
            $('.event01-btn').on({
                click: function(event){
                    event.preventDefault();
                    $(this).next().stop().slideToggle(300);
                    if(imgOnOff=='off'){
                        imgOnOff='on';
                    }
                    else{
                        imgOnOff='off';
                    }
                    $(this).children().attr('src','./images/plcc_211124_visual3_'+ imgOnOff +'_pc.jpg');
                }
            });
        },
        section3: function(){

        },
        section4: function(){

        },
        section5: function(){

        }
    }
    hyundaiCard.init();
})(jQuery);