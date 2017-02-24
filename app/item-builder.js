define('itemBuilder',['jquery'],function(){
    var listItem =  "<div class='media'>"
                    +"<div class=\"media-left media-middle\">"
                    +"<a href=\"#\">"
                    +"<img class=\"media-object\" src=\":image\" alt=\"...\">"
                    +"</a>"
                    +"</div>"
                    +"<div class=\"media-body\">"
                    +"<h4 class=\"media-heading\">:title</h4>"
                    +"<div id='genres'>:genres</div>"
                    +"</div>"
                    +"</div>"
                    ;


       function  ItemBuilder(){
            var item = listItem;
            this.setTitle = function(title){
                item = item.replace(/:title/,title);
            }

            this.setGenres = function(genres){
                if (!(genres instanceof Array)) return ;
                if(genres.length == 0) {item = item.replace(/:genres/,"<span class=\"label label-default\">none</span>");return;}
                var genreLabels = "";
                $.each(genres,function(i,genre){
                    genreLabels +="<div><span class=\"label label-primary\">"+genre+"</span>&nbsp;";
                });

                item = item.replace(/:genres/,genreLabels);
            }

            this.setImage = function(img){
                if(img)
                item = item.replace(/:image/,img);
            }

            this.toHtml = function(){
                return item;
            }
        }
        
        window.ItemBuilder = ItemBuilder;
});