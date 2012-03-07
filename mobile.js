(function(w) {

	/*
	 * iOS bug (currently effects up to version 5.0) means page doesn't re-scale properly on orientation change.
	 * See:
	 * 	http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
	 * 	https://gist.github.com/901295
	 *  https://github.com/scottjehl/iOS-Orientationchange-Fix
	 */
	 
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){
		return;
	}
	
    var doc = w.document;

    if( !doc.querySelector ){ return; }

    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if( !meta ){ return; }

    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
				
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){
				disableZoom();
			}        	
        }
		else if( !enabled ){
			restoreZoom();
        }
    }
	
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
	
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
			_width = doc.documentElement.clientWidth;
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

}(this));