(($, window, document, undefined) => {
  class StarBucks {
    init(){
      this.header();
      this.section1();
      this.section2Notice();  // 객체를 다르게 하면
      this.section2Slide();   // 변수, 함수 충돌을 막을 수 있다.
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.quickMenu();
      this.goTop();
    }
    header(){
      // const = ;
      const bergerBtn = $('.berger-btn');
      const mobileNav = $('#mobileNav');
      const mobileContainer =  $('.mobile-container');
      const mobileCloseBtn =  $('.mobile-close-btn');
      const mobileContainerLiA = $('.mobile-container li a');
      const findBtn = $('.find-btn');
      const findBox = $('.find-box');
      const mainBtn = $('.main-btn');
      const sub = $('.sub');
      const nav = $('#nav');

        //모바일 버튼 이벤트
      bergerBtn.on({
        click: function(){
            mobileNav.addClass('addMobile');
            mobileContainer.stop().animate({left:0},500);
        }
      });

      mobileCloseBtn.on({
        click: function(){
          mobileContainer.stop().animate({left:100+'%'},300, function(){
            mobileNav.removeClass('addMobile');
          });
        }
      });

      // 모바일 메뉴버튼 이벤트 > 서브메뉴 펼치기
      mobileContainerLiA.on({
          click: function(){
            $(this).next('div').slideToggle(400);
            $(this).toggleClass('addMobile');
          }
      });

      // 통합검색 버튼 클릭 이벤트
      findBtn.on({
        click: function(){
          findBox.toggleClass('addInput');
        }
      });

      //네비게이션 메인메뉴 마우스 이벤트
      mainBtn.on({
          mouseenter: function(){
            mainBtn.removeClass('addCurret');
            $(this).addClass('addCurret');
            sub.stop().slideUp(0);
            $(this).next().stop().slideDown(700,'easeOutExpo');
          },
          focusin: function(){
            mainBtn.removeClass('addCurret');
            $(this).addClass('addCurret');
            sub.stop().slideUp(0);
            $(this).next().stop().slideDown(700,'easeOutExpo');
          }
      });

      //네비게이션을 마우스가 떠나면 모두 초기화
      nav.on({
          mouseleave: function(){
            mainBtn.removeClass('addCurret');
            sub.stop().slideUp(700,'easeOutExpo');
          }
      });
    }
    section1(){
      const img = $('.img');
      //애니메이션 페이드 인 효과
      function ani(){
        img.eq(0).stop().animate({opacity:1},700, function(){
          img.eq(1).stop().animate({opacity:1},600, function(){
            img.eq(2).stop().animate({opacity:1},600, function(){
              img.eq(3).stop().animate({opacity:1},600, function(){
                img.eq(4).stop().animate({opacity:1},600);
              });
            });
          });
        });
      }
      setTimeout(ani, 100);
    }
    section2Notice(){
      let cnt = 0;
      const notice = $('.notice');

      // 1.메인 슬라이드 함수
      function mainSlide(){
        notice.css({zIndex:1}).stop().animate({top:24},0);
        notice.eq(cnt==0 ? 4 : cnt-1).css({zIndex:2}).stop().animate({top:0},0);
        notice.eq(cnt).css({zIndex:3}).stop().animate({top:24},0).animate({top:0},1000);
      }

      // 2.다음 카운트 함수
      function nextCount(){
        cnt++;  //출발 1       2 3 4 0 1 2 3 4 0 1 2 3 4
        if(cnt>4){cnt=0}
          mainSlide();
      }

      // 3.자동타이머 함수(셋인터발)
      function autoTimer(){
        setInterval(nextCount,3000);
      }
      setTimeout(autoTimer,100);
    }
    section2Slide(){
      const $window = $(window);
      let cnt=0;
      let setId=null;
      let winW = $window.innerWidth()*0.9;
      const slide = $('.slide');
      const slideWrap = $('.slide-wrap');
      const pageBtn = $('.page-btn');
      const playBtn = $('.play-btn');
      const nextBtn = $('.next-btn');
      const prevBtn = $('.prev-btn');
      const promotionBtn = $('.promotion-btn');
      const Slide = $('#slide');

      // 반응형
      function resizeFn(){
        if($window.innerWidth()<=829){
          winW = $window.innerWidth()*0.9;
        }
        else {
          winW = 829;
        }

        slide.css({width: winW});     //슬라이드 너비
        slideWrap.stop().animate({left:-winW*cnt},0);    // 실시간으로 메인 슬라이드 연동 반응 즉각
        }
        resizeFn();

        $window.resize(() => {
          resizeFn();
        });

        // 1.메인 슬라이드 함수
        function mainSlide(){
          slideWrap.stop().animate({left:-winW*cnt},600,function(){
            if(cnt>2){cnt=0}
            if(cnt<0){cnt=2}
            slideWrap.stop().animate({left:-winW*cnt},0);
            // 슬라이드 번호별 스타일 적용 addClass
            slide.removeClass('addCurrent');
            slide.eq(cnt+1).addClass('addCurrent');
          });
          pageEvent();
        }

        // 2-1.다음 카운트 함수
        function nextCount(){
          cnt++;
          mainSlide();
        }
        // 2-1.이전 카운트 함수
        function prevCount(){
          cnt--;
          mainSlide();
        }

        // 3.자동타이머 함수(셋인터발)
        function autoTimer(){
          setId = setInterval(nextCount,3000);
        }
        // autoTimer();

        // 4.페이지 이벤트 함수
        function pageEvent(){
          pageBtn        .children().attr('src','./images/main_prom_off.png');
          pageBtn.eq(cnt==3?0:cnt).children().attr('src','./images/main_prom_on.png');
        }

        // 배열 반복처리
        pageBtn.each(function(idx){
          $(this).on({
            click: function(e){
              e.preventDefault();
              cnt=idx;
              mainSlide();
              stopFn();
            }
          });
        });

        // 6. 일시정지와 플레이버튼 클릭 이벤트
        function stopFn(){
          playBtn.children().attr('src','./images/main_prom_play.png');
          playBtn.removeClass('on');  // 삭제
          // 슬라이드 정지
          clearInterval(setId);
        }
        function playFn(){
          playBtn.children().attr('src','./images/main_prom_stop.png');
          playBtn.addClass('on');    //꺼짐 클래스 추가 
          // 슬라이드 재생
          autoTimer();
        }

        playBtn.on({
          click: function(e){
            e.preventDefault();
            if( $(this).hasClass('on') ){ 
              stopFn();
            }
            else{
              playFn();
            }
          }
        });

        // 7-1. 다음화살버튼 클릭 이벤트
        nextBtn.on({
          click: function(e){
            e.preventDefault();
            stopFn();
            nextCount();
          }
        });
        // 7-2. 이전화살버튼 클릭 이벤트
        prevBtn.on({
          click: function(e){
            e.preventDefault();
            stopFn();
            prevCount();
          }
        });

        // 8. 프로모션 버튼 클릭 이벤트
        // 클릭하면 (슬라이드)#slide 박스가 부드럽게 슬라이드 업
        promotionBtn.on({
          click: function(e){
            e.preventDefault();
            if( $(this).hasClass('close')  ){ //오픈
              Slide.stop().slideDown(600);
              $(this).removeClass('close');
              playFn();
            }
            else{ //닫기 close
              Slide.stop().slideUp(600);
              $(this).addClass('close');
              //정지
              stopFn();
              cnt=0;
              mainSlide(); //처음으로 초기화
            }
          }
        });

        slideWrap.on({
          mouseenter: function(){
              stopFn();
          },
          mouseleave: function(){
              playFn();
          }
        });
    }
    section4(){
      const $window = $(window);
      const section4 = $('#section4');
      // 스크롤이벤트 : 페럴럭스 애니메이션 효과
      $window.scroll(() => {
        if($window.scrollTop()==0){
          section4.removeClass('addAni');
        }
        if($window.scrollTop()>400){
          section4.addClass('addAni');
        }
      });
    }
    section5(){
      let sec3Top = $('#section3').offset().top-500;
      const $window = $(window);
      const section5 =  $('#section5');
      
      $window.scroll(() => {
        if($window.scrollTop()==0){
          section5.removeClass('addFadein');
          }
          if($window.scrollTop()>=sec3Top){
            section5.addClass('addFadein');
          }
      });
    }
    section6(){
      let sec4Top = $('#section4').offset().top;
      const $window = $(window);
      const section6 = $('#section6');

      $window.scroll(() => {
          if($window.scrollTop()==0){
            section6.removeClass('addAni');
          }
          if($window.scrollTop()>=sec4Top){
            section6.addClass('addAni');
          }
      });
    }
    section7(){
      let sec6Top = $('#section6').offset().top-200;
      const $window = $(window);
      const section7 = $('#section7');

      $window.scroll(function(){
          if($window.scrollTop() == 0 ){
            section7.removeClass('addFade')
          }
          if($window.scrollTop() >= sec6Top ){
            section7.addClass('addFade')
          }
      });
    }
    section8(){
      let sec6Top = $('#section6').offset().top+200;
      const $window = $(window);
      const section8 = $('#section8');
      const section8Left = $('#section8 .left');

      $(window).scroll(function(){

          if( $window.scrollTop() == 0 ){
            section8.removeClass('addAni')
          }
          
          if( $window.scrollTop() >= sec6Top ){
            section8.addClass('addAni')
          }

      });

      //반응형
      var leftW = section8Left.innerWidth();

      function resize(){
          leftW = section8Left.innerWidth();
          if(leftW<=366){
            section8Left.css({height:leftW*0.85246});
          }
          else {
            section8Left.css({height:312});
          }
      }
      resize();

      $window.resize(() => {
          resize();
      });
    }
    quickMenu(){
      const $window = $(window);
      let quciTop2=150;
      const quickMenu = $('.quick-menu');

      function quickMenuFn(){
        quickMenu.stop().animate({top:$window.scrollTop() + quciTop2}, 600, "easeOutExpo");
      }
      quickMenuFn();
      $window.scroll(() => {
        quickMenuFn();
      });
    }
    goTop(){
      const $window = $(window);
      const goTopBtn = $('.go-top-btn');
      const htmlBody = $('html, body');
      const goTop = $('.go-top');
        
        goTop.stop().fadeOut(1000);

        $window.scroll(() => {
            if( $window.scrollTop() >=100 ){
              goTop.stop().fadeIn(1000);
            }
            else{
              goTop.stop().fadeOut(1000);
            }
        });
        goTopBtn.on({
          click: function(){
            htmlBody.stop().animate({scrollTop:0},600,'easeOutExpo');
          }
      });
    }
  }
  const newStarBucks = new StarBucks();
  newStarBucks.init();
})(jQuery, window, document);