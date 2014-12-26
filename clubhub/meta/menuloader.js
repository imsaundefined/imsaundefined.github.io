$( document ).ready(function(){
	var colortabs = ["0066ff", "ff2ad4", "00d455", "ff2a2a"];
        $("#main-menu").load("/clubhub/meta/main-menu.html", function(data){
                $(".menu").find("li").each(function(index){
                        console.log(this.innerText);      
                        $(this).css("background-color", "#"+colortabs[index%4]);
                });
		         $(".divider-tab").css({"background-color": "none"});
                $("#imsa-undefined-tab").css({"background-color": "rgb(60,60,200)"});
                $(".menu").find("a").each(function(){
                        $(this).hover(function(){
                               $(this).animate({"background-color":"rgba(255,255,255,0.4)"}, 100);
                        }, function(){
                               $(this).animate({"background-color":"rgba(255,255,255,0)"}, 2000);
                        });
                });
        });
});
