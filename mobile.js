(function(doc) {

	/*
	 * iOS bug (currently effects up to version 5.0) means page doesn't re-scale properly on orientation change.
	 * See:
	 * 	http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
	 * 	https://gist.github.com/901295
	 */
	var addEvent = 'addEventListener',
	    type = 'gesturestart',
	    qsa = 'querySelectorAll',
	    scales = [1, 1],
	    meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}

	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [.25, 1.6];
		doc[addEvent](type, fix, true);
	}
	
	/************************************************************************************************************************************/
	/************************************************************************************************************************************/
	/************************************************************************************************************************************/
	
	/*
	 * As well as providing relevant CSS rules to the desktop and mobile themes, we also needed to provide relevant JavaScript functions. 
	 * To do this we use the JS equivalent of the device-width media feature, which is screen.width, 
	 * and make a ternary operator which works on the same width value as min-device-width:
	 */
	var screenWidth = (function(){
		var _width;
		
		// screen.width doesn't work in Internet Explorer so we revert to clientWidth
		if ('attachEvent' in doc) {
			_width = document.documentElement.clientWidth;
		} else {
			_width = (screen.width < 768) ? true : false;	
		}
		
		return _width;
	}());
	
	/*
	 * So if I wanted to use a script only on the mobile theme (for example, if we wanted to move the top navigation to the bottom of the page) 
	 * I would use this:
	 */
	if(!screenWidth) {
		alert('desktop device specific features');
	} else {
		alert('mobile device specific features');
	}

}(document));