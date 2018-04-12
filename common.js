//$(function() {
	var activedSlide = 1;
	var contentSlide = document.getElementsByClassName('contentSlide');
	var contentPics = document.getElementsByClassName('contentPics');
	var logo = document.getElementsByClassName('logo')[0];
	var slides = contentSlide.length;
	var winWidth = window.innerWidth;
	var rightCell = document.getElementsByClassName('right-cell')[0];

	//===============================ПЕРЕКЛЮЧЕНИЕ====================================================

	//Функция создает ячейки для навигации по сайту
	function createScroll(slides) {
		var scroll = document.createElement('div');
		scroll.classList.add('scroll');
		document.body.insertBefore(scroll, document.body.children[0]);

		var cScroll = document.createElement('div');
		cScroll.classList.add('to-center');
		scroll.appendChild(cScroll);

		var cells = '';
		for (var i = 1; i <= slides; i++)
			cells += '<p style="margin-left: 3px" onclick="toSlide(' + i + ')" id="sl' + i + '">○</p>';
		cScroll.innerHTML = '<p style="font-size: 50px" id="Up" onclick="slideUp()">&nbsp;   </p>' 
			+ cells + '<p style="font-size: 50px" id="Down" onclick="slideDown()">&nbsp;   </p>';

		var mobScroll = document.createElement('span');
		mobScroll.setAttribute('onclick', 'slideDown()');
		mobScroll.setAttribute('id', 'mobScroll');
		mobScroll.innerHTML = '▼';
		document.getElementsByClassName('right-cell')[0].appendChild(mobScroll);
	}

	//Функция выводит содержимое активного слайда на экран
	function activeSlide(number) {
		var slide = document.getElementById('sl' + number);
		slide.innerHTML = '●';
		slide.classList.add('active');

		var content = document.getElementById('content');
		var contentPic = document.getElementById('contentPic');

		content.innerHTML = contentSlide[number - 1].innerHTML;
		contentPic.style.backgroundImage = "url('" + contentPics[number - 1].innerHTML + "')";

		if (number == 1)
			contentPic.style.backgroundSize = "auto";
		else
			contentPic.style.backgroundSize = "cover";

		if (number == 3) {
			rightCell.style.backgroundPosition = "top left";
			contentPic.style.backgroundSize = "auto";
		}
		else {
			if (winWidth < 769) rightCell.style.backgroundPosition = "center center";
			//contentPic.style.backgroundSize = "cover";
		}

		var mobScroll = document.getElementById('mobScroll');
		if (number == 4) {
			if (winWidth > 768)
				logo.style.display = "none";
			mobScroll.style.display = "none";
		}
		else {
			logo.style.display = "block";
			if (winWidth < 769)
				mobScroll.style.display = "block";
		}

	}

	//Функция переключения на слайд number, вызывается только через slideUp & slideDown
	function toSlide(number) {
		switchAnimation(document.getElementById('content'), 300, 20);
		switchAnimation(document.getElementById('contentPic'), 300, 20);
		var actSlides = document.getElementsByClassName('active');
		actSlides[0].innerHTML = '○';
		actSlides[0].classList.remove('active');
		activeSlide(number);
		activedSlide = number;
	}

	//Проверяет возможность переключения слайда вверх и вызывает toSlide
	function slideUp() {
		var to = activedSlide - 1;
		if (to > 0 && !animTime)
			toSlide(to);
	}

	//Проверяет возможность переключения слайда вниз и вызывает toSlide
	function slideDown() {
		var to = activedSlide + 1;
		if (to <= slides && !animTime)
			toSlide(to);
	}

	//===========================АНИМАЦИЯ ПЕРЕКЛЮЧЕНИЯ===============================================

	var animTime = false;

	function switchAnimation(elem, ms, cadrs) {
		animTime = true;
		elem.style.opacity = 0; 
		
		var i = 0;
		var step = 1.0 / cadrs;
		ms = ms / cadrs;

		var fade = setInterval(function(){
			i += step; 
			elem.style.opacity = i; 
			if(i >= 1) {
				i = 1;
				stopFade();
			}
		}, ms);

		function stopFade(){
	  		clearInterval(fade);
		}	
		animTime = false;
	}

	//===============================================================================================

	createScroll(slides);
	activeSlide(activedSlide);

	//===============================================================================================

	var startY = 0;

	window.addEventListener('touchstart', function(e){
        var touchObj = e.changedTouches[0]; // первая точка прикосновения
        startY = parseInt(touchObj.clientY);
    }, false);

    window.addEventListener('touchend', function(e){
        var touchObj = e.changedTouches[0]; 
        if (parseInt(touchObj.clientY) - startY > 0)
	        slideUp();
	    else slideDown();
    }, false);

    //===============================================================================================
//});
