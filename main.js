var delta = 0;
var currentSlideIndex = 0;
var scrollThreshold = 30;
var slides = $(".slide");
var numSlides = slides.length;
var isFinished = false;

  $(window).scroll(function() {
  	if ($(window).scrollTop() <= 1) {
  		isFinished = false;
  		currentSlideIndex = 3;

  		$('#project-2').addClass('active');

  		// $('.slide').each(function(i, slide) {
  		// 	$(slide).addClass('active', (i >= currentSlideIndex));
  		// });
  	};
  });


function elementScroll (e) {


  console.log (Math.abs(delta));

  	// --- Final Slide ---
	if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {	

		delta--;
 
		if ( Math.abs(delta) >= scrollThreshold) {
		prevSlide();
		}

	}
 
	// --- Scrolling down ---
	else {

		delta++;

		if (delta >= scrollThreshold) {
			nextSlide();
		}

	} 

	return isFinished;

}
 
 
function showSlide() {
 
	// reset
	delta = 0;
 
	slides.each(function(i, slide) {
		$(slide).toggleClass('active', (i >= currentSlideIndex));
	});

}
 
 
function prevSlide() {
 
	currentSlideIndex--;
 
	if (currentSlideIndex < 0) {
		currentSlideIndex = 0;
	}
 
	showSlide();

}
 
function nextSlide() {
 
	currentSlideIndex++;
   	if (currentSlideIndex == numSlides) {
		isFinished = true;
		window.scrollBy(2,0);
	// --- Scrolling up ---
	} else 
	
	if (currentSlideIndex > numSlides) { 
		currentSlideIndex = numSlides;
	}

	showSlide();

}

$(window).on({
	'DOMMouseScroll mousewheel': elementScroll
});







if (screen.width < 980) { 

	var delta;
	    dragThreshold = 0.15;// percentage to drag before engaging
	    dragStart = null;	 // used to determine touch / drag distance
	    percentage = 0,
	    target,
	    previousTarget;
	 
	function touchStart(event) {
	 
		if (dragStart !== null) { return; }
		if (event.originalEvent.touches) { 
			event = event.originalEvent.touches[0];
		}
	 
		// where in the viewport was touched
		dragStart = event.clientY;
	 
		// make sure we're dealing with a slide
		target = slides.eq(currentSlideIndex)[0];	
	 
		// disable transitions while dragging
		target.classList.add('no-animation');
	 
		previousTarget = slides.eq(currentSlideIndex-1)[0];
		previousTarget.classList.add('no-animation');
	}
	 
	function touchMove (event) {
	 
		if (dragStart === null) { return; }
		if (event.originalEvent.touches) { 
			event = event.originalEvent.touches[0];
		}
	 
		delta = dragStart - event.clientY;
		percentage = delta / windowHeight;
	 
		// Going down/next. Animate the height of the target element.
		if (percentage > 0) {
			target.style.height = (100-(percentage*100))+'%';
			if (previousTarget) { 
				previousTarget.style.height = ''; 	// reset
			}
		}
	 
		// Going up/prev. Animate the height of the _previous_ element.
		else if (previousTarget) {
			previousTarget.style.height = (-percentage*100)+'%';
			target.style.height = '';	// reset
		}
	 
		// Don't drag element. This is important.
		return false;
	}
	 
	function touchEnd () {
	 
		dragStart = null;
		target.classList.remove('no-animation');
		if (previousTarget) { 
			previousTarget.classList.remove('no-animation'); 
		}
	 
		if (percentage >= dragThreshold) {
			nextSlide();
		}
		else if ( Math.abs(percentage) >= dragThreshold ) {
			prevSlide();
		} else {
			// show current slide i.e. snap back
			showSlide();
		}
	 
		percentage = 0;
	 
	}
	 
	$("#projects").on({
		'touchstart': touchStart,
		'touchmove': touchMove,
		'touchend': touchEnd
	});

}

