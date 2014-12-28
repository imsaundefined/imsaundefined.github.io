var cal_array = [], calnames_array=[];

$( document ).ready( function(){
	var htmlstring = "";
	var calendars = "";
	var bestFrameHeight = $( window ).height();
	
	//iOS font compatability
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                $("body").css({"font-family":"\"Avenir Next\", sans-serif"});
                $("h1, h2").css({"font-family":"\"Avenir Black\", sans-serif"});
        }
	
	//Build page from xml data
	//Load the xml file using ajax 
        /*$.get("main.xml", function (xml) {
                console.log("Success");
                // Parse the xml file and get data
                var xmlDoc = $.parseXML(xml), $xml = $(xmlDoc);
                var calendarthere = false;
                $(xml).children("body").children("section").each(function () {
                        console.log("hey");
                        htmlstring+="<div class=\"body-box\">";
                        if($(this).children("title").text()!="")
                        {
                                htmlstring+="<h1>"+$(this).children("title").text()+"</h1>";
                        }
                        if($(this).children("content").text()!="")
                        {
                                htmlstring+="<p>"+$(this).children("content").text()+"</p>";
                        }
                        if($(this).children("docs").text()!="")
                        {
                                htmlstring+="<div class=\"docs\"><iframe class=\"doc-iframe\" src=\""+$(this).children("docs").text()+"\"></iframe></div>";
                        }
			if($(this).children("feed").text()!="")
                        {
		                htmlstring+="<div class=\"feed\"><iframe class=\"feed-frame\" src=\""+$(this).children("feed").text()+"\"></iframe></div>";
                        }
                        //OBSELETED BY GOOGLE DOCS -- GEOFEED
                        //If you'd like to revive it, place code here.
			if($(this).children("calendar").html()!=undefined)
			{
					htmlstring+="<div class=\"calendar\">";
					//var calendars = ""; //cal_array and calnames_array are defined globally.
					$(this).children("calendar").children("source").each(function(){
							cal_array.push($(this).children("src").text());
							calnames_array.push($(this).children("name").text());
					});
				        cal_array.forEach(function(element){
				                calendars+=element;
				        });
					console.log(calendars);
					htmlstring+="<iframe id=\"gcal\" src=\"https://www.google.com/calendar/embed?mode=WEEK&showTitle=0&height=1080&wkst=1&bgcolor=%23FFFFFF&"+calendars+"ctz=America%2FChicago\" style=\" border-width:0 \" width=\"1920\" height=\"1080\" frameborder=\"0\" scrolling=\"no\"></iframe>";
					htmlstring+="</div>";
					if(cal_array.length > 1)
					{
					        htmlstring+="<div class=\"calendartoggle\"><h2>Your Calendars</h2><form id=\"calform\">";
					        cal_array.forEach(function(elem, index){
						        htmlstring+="<input class=\"checkbox\" type=\"checkbox\" name=\"calendar\" value=\""+calnames_array[index]+"\">"+calnames_array[index]+"</input><br />";
					        });
					        htmlstring+="<br /><input type=\"button\" name=\"updatecal\" value=\"Update Calendars\" onclick=\"updatePreferredCalendars(this.form)\">"
					        htmlstring+="&nbsp;<input id=\"caltoggle\" type=\"button\" name=\"togglecal\" value=\"Check All\" onclick=\"toggleCalendars(this.form)\">";
					        htmlstring+="</form>";
					        htmlstring+="</div>";
				        }
					calendarthere = true;
			}
			//Load additional plugins. Specify location by pusing to var template.
			/*window.extthis = $(this)
			var $template = "";
			if(template)
			{
			        var $template = template;
			        $(template).each(function(index, element){
			                $.getScript(element);
			                console.log("Got "+element);
			        });
		        }
                        htmlstring+="</div>";
                });
		$("#main-body").append(htmlstring);
		if(calendarthere)
		{
		        getPreferredCalendars(document.getElementById("calform"));
	        }
		$("iframe").load(function(){
		        $(this).animate({"height": bestFrameHeight*0.8});
		});
        }, "xml");*/
		
	$(".footer").append("<footer><p><a href=\"/\"><img class=\"footer-logo\" src=\"/media/IMSA_Undefined_Logo_White.png\" alt=\"IMSA Undefined\"></a>&nbsp;&nbsp;&nbsp;Copyright &copy; IMSA Undefined 2014</p></footer>");
});
