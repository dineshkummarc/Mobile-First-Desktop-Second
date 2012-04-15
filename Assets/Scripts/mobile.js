// iOS bug fix code
(function (w) {

	/*
	 * iOS bug (currently effects up to version 5.0) means page doesn't re-scale properly on orientation change.
	 *
	 * See:
	 *     http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
	 *     https://gist.github.com/901295
	 *     https://github.com/scottjehl/iOS-Orientationchange-Fix
	 */
	 
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if (!(/iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1)) {
		return;
	}
	
    var doc = w.document;

    if (!doc.querySelector) { 
        return; 
    }

    var meta = doc.querySelector("meta[name=viewport]"),
        initialContent = meta && meta.getAttribute("content"),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;

    if (!meta) { 
        return;
    }

    function restoreZoom() {
        meta.setAttribute( "content", enabledZoom );
        enabled = true;
    }

    function disableZoom() {
        meta.setAttribute( "content", disabledZoom );
        enabled = false;
    }
	
    function checkTilt (e) {
		aig = e.accelerationIncludingGravity;
		x = Math.abs(aig.x);
		y = Math.abs(aig.y);
		z = Math.abs(aig.z);
				
		// If portrait orientation and in one of the danger zones
        if (!w.orientation && (x > 7 || ((z > 6 && y < 8 || z < 8 && y > 6) && x > 5))) {
			if (enabled) {
				disableZoom();
			}        	
        }
		else if (!enabled) {
			restoreZoom();
        }
    }
	
    w.addEventListener("orientationchange", restoreZoom, false);
    w.addEventListener("devicemotion", checkTilt, false);

}(this));

// Application Code
(function (w) {
    
    // screen.width (works similar to the 'device-width' media query) and returns the total available space (so shrinking browser width down still shows total space available)
    // clientWidth on the other hand changes depending on the actual width of the browser window
    var doc = w.document,
        isMobile = (function(){
            return (doc.documentElement.clientWidth <= 480) ? true : false;
        }()),
        isTablet = (function(){
            return (doc.documentElement.clientWidth <= 960) ? true : false;
        }());
    
    if (isMobile) {
    	alert('mobile specific features');
    } else if (isTablet) {
    	alert('tablet specific features');
    } else {
    	alert('desktop specific features');
    }
    
}(this));