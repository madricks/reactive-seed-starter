require(['jquery','itemBuilder'],function(){
    var msg = {
        "loading":"loading....",
        "dataNotFound":"no artists not found"
    }
    var placeHolderImage = "http://placehold.it/100x100";
    var $searchText    = $("#searchText");
    var $contentWrapper = $("#contentWrapper"); 


    $(document).ready(function(){
       debounce(function(){
            $searchText.keyup(function(e){
               var text = e.target.value;
               if(text.length > 3){ 
                   $contentWrapper.html(msg.loading); 
                    $.getJSON("https://api.spotify.com/v1/search?type=artist&q="+text)
                    .success(function(res){
                        var artists = res.artists.items;
                       if(artists.length == 0) {
                            $contentWrapper.html(msg.dataNotFound);
                           return ;
                       }
                       $contentWrapper.html("");
                       var results = [];
                       for(var i = 0 ; i< artists.length ; i++){
                           var itemBuilder = new ItemBuilder();
                           itemBuilder.setTitle(artists[i].name);
                           itemBuilder.setGenres(artists[i].genres);
                           itemBuilder.setImage(artists[i].images.length > 0 ? artists[i].images[0].url : placeHolderImage);
                           results.push({
                                'json':artists[i],
                                'html':itemBuilder.toHtml()
                           });
                            
                       }

                       onSearchChanged(results);  
                       
                    });
               }
            });
        },300)();
       

    });

    function onSearchChanged(results){
       $contentWrapper.html("");
       $.each(results,function(i,result){
            $contentWrapper.append(result.html);
       });
   };

   function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
    

}); 