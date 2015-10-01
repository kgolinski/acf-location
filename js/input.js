(function($){
	
	function setPosition( $el ) {
		navigator.geolocation.getCurrentPosition(function(position){
        		var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				console.log($el.find('input').val());
				$el.find('input').val(lat + ", " + lng);
        	});
	}
	
	function initialize_field( $el ) {
		
		//$el.doStuff();
		//console.log($el);
		if(navigator.geolocation){
			if($el.find('input').val()==''){
        		setPosition($el);
        	}
        	$el.find('input').focus(function(){
        		$(this).val('');
        		setPosition($el);
        	});
        }
	    else
	        console.log("navigator.geolocation is not available");
		}
	
	
	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/
		
		acf.add_action('ready append', function( $el ){
			
			// search $el for fields of type 'location'
			acf.get_fields({ type : 'location'}, $el).each(function(){
				
				initialize_field( $(this) );
				
			});
			
		});
		
		
	} else {
		
		
		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM. 
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/
		
		$(document).on('acf/setup_fields', function(e, postbox){
			
			$(postbox).find('.field[data-field_type="FIELD_NAME"]').each(function(){
				
				initialize_field( $(this) );
				
			});
		
		});
	
	
	}


})(jQuery);
