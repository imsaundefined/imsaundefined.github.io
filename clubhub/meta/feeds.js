if($(this).children("feed").html()!=undefined)
        {
                htmlstring+="<div class=\"feed\">";
                var feedurl = $(this).children("feed").text();
		console.log(feedurl);
		$.get(feedurl, function (feedxml) {
                        console.log("Success 2");
                        // Parse the xml file and get data
                        var feeddoc = $.parseXML(feedxml), $feedxml = $(feeddoc);
                        $(feedxml).children("feed").children("entry").each(function(){
                                console.log("hay");
                                htmlstring+="<div class=\"entry\">";
                                if($(this).children("title").html()!=undefined)
                                {
	                                htmlstring+="<h2 class=\"feedtitle\">"+$(this).children("title").html()+"</h2>";
                                }
                                if($(this).children("author").html()!=undefined)
                                {
	                                htmlstring+="<p class=\"subtitle\">"+$(this).children("author").html()+"</p>";
                                }
                                if($(this).children("time").html()!=undefined)
                                {
	                                htmlstring+="<p class=\"subtitle\"><i>"+$(this).children("time").html()+"</i></p>";
                                }
                                if($(this).children("content").html()!=undefined)
                                {
	                                htmlstring+="<p class=\"feedcontent\">"+$(this).children("content").html()+"</p>";
                                }
                                htmlstring+="<hr />";
                                htmlstring+="</div>";
                        });
                }, "xml");			
                htmlstring+="</div>";
        }
