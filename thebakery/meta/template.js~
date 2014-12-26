$( document ).ready( function(){
	var colortabs = ["0066ff", "ff2ad4", "00d455", "ff2a2a"];
	var htmlstring = "";
	var id=0;
	$("#main-menu").load("/thebakery/meta/main-menu.html");
	
	//Build page from xml data
	//Load the xml file using ajax 
        $.ajax({
                type: "GET",
                url: "main.xml",
                dataType: "xml",
                success: function (xml) {
                        console.log("Success");
                        // Parse the xml file and get data
                        var xmlDoc = $.parseXML(xml), $xml = $(xmlDoc);
                        $(xml).children("body").children("section").each(function () {
                                console.log("hey");
                                id++; //unique div id
                                var divid = id;
                                $("#main-body").append("<div id=\""+divid+"\" class=\"body-box\"></div>");
                                if($(this).children("title").text()!="")
                                {
                                        $("#"+divid).append("<h1>"+$(this).children("title").text()+"</h1>");
                                }
                                if($(this).children("content").text()!="")
                                {
                                        $("#"+divid).append("<p>"+$(this).children("content").text()+"</p>");
                                }
                                if($(this).children("feed").text()!="")
                                {
                                        id++;
                                        var feedid = id;
                                        $("#"+divid).append("<div id=\""+id+"\" class=\"feed\"></div>");
                                        var feedurl = $(this).children("feed").text();
					console.log(feedurl);
					$.ajax({
					        type: "GET",
					        url: feedurl,
					        dataType: "xml",
					        id: feedid,
					        async: false,
					        success: function (feedxml, id) {
						        console.log("Success 2");
						        // Parse the xml file and get data
						        var feeddoc = $.parseXML(feedxml), $feedxml = $(feeddoc), feedid = this.feedid;
						        $(feedxml).children("feed").children("entry").each(function(){
							        console.log("hay");
							        id++;
							        $("#"+feedid).append("<div id=\""+id+"\" class=\"entry\"></div>");
							        var entryid = id;
							        if($(this).children("title").text()!="")
							        {
									        $("#"+entryid).append("<h2 class=\"feedtitle\">"+$(this).children("title").text()+"</h2>");
							        }
							        if($(this).children("author").text()!="")
							        {
									        $("#"+entryid).append("<p class=\"subtitle\">"+$(this).children("author").text()+"</p>");
							        }
							        if($(this).children("time").text()!="")
							        {
									        $("#"+entryid).append("<p class=\"subtitle\"><i>"+$(this).children("time").text()+"</i></p>");
							        }
							        if($(this).children("content").text()!="")
							        {
									        $("#"+entryid).append("<p class=\"feedcontent\">"+$(this).children("content").text()+"</p>");
							        }
							        $("#"+feedid).append("<hr />");
							        $("#"+feedid).append("</div>");
						        });
					        }
					});
                                        //$("#main-body").append("</div>");
                                }
				if($(this).children("calendar").html()!=undefined)
				{
					id++;
					var calid = id;
					$("#"+divid).append("<div id=\""+calid+"\" class=\"calendar\">");
					var calendars = "";
					$(this).children("calendar").children("source").each(function(){
							calendars += $(this).text();
					});
					console.log(calendars);
					$("#"+calid).append("<iframe src=\"https://www.google.com/calendar/embed?mode=WEEK&amp;showTitle=0&amp;height=1080&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;"+calendars+"ctz=America%2FChicago\" style=\" border-width:0 \" width=\"1920\" height=\"1080\" frameborder=\"0\" scrolling=\"no\"></iframe>");
					$("#"+calid).append("</div>");
				}
				$(this).children("project").each(function(){
				        id++;
				        var proid = id;
				        $("#"+divid).append("<div id=\""+proid+"\" class=\"project\"></div>");
				        if($(this).children("name").text()!="")
			                {
				                $("#"+proid).append("<h2 class=\"projecttitle\">"+$(this).children("name").text()+"</h2>");
			                }
			                if($(this).children("description").text()!="")
			                {
				                $("#"+proid).append("<p class=\"projectdesc\">"+$(this).children("description").text()+"</p>");
			                }
			                if($(this).children("proposal").html()!=undefined)
			                {
				                $("#"+proid).append("<div class=\"projectproposal\"><a href=\""+$(this).children("proposal").text()+"\">Learn More</a></div>");
			                }
			                if($(this).children("pledge").html()!=undefined)
			                {
				                $("#"+proid).append("<div class=\"projectpledge\"><a href=\""+$(this).children("pledge").text()+"\">Pledge</a></div>");
			                }
			                if($(this).children("data").text()!="")
			                {
				                var sheet = "https://spreadsheets.google.com/feeds/cells/"+$(this).children("data").text()+"/od6/public/values?alt=json";
				                console.log(sheet);
				                $.getJSON(sheet, function(data){
				                        var goal = Number(String(data.feed.entry[2].content.$t).replace(/\$/g, '').replace(/,/g, ''));
				                        var pledged = Number(String(data.feed.entry[5].content.$t).replace(/\$/g, '').replace(/,/g, ''));
				                        var donated = Number(String(data.feed.entry[8].content.$t).replace(/\$/g, '').replace(/,/g, ''));
				                        id++;
				                        var pinfo = id;
				                        $("#"+proid).append("<div class=\"progressinfo\" id=\""+pinfo+"\"></div>");
				                        $("#"+pinfo).append("<p class=\"goal\"><b>Goal: $"+goal.toFixed(2)+"</b></p>");
				                        $("#"+pinfo).append("<p class=\"pledged\"><b>Pledged: $"+pledged.toFixed(2)+"</b></p>");
				                        $("#"+pinfo).append("<p class=\"donated\"><b>Donated: $"+donated.toFixed(2)+"</b></p>");
				                        
				                        $("#"+proid).append("<div class=\"progress\"><div class=\"progresscounttop\" id=\""+proid+"procount\"><p class=\"pledgecount\" id=\""+proid+"pledgecount\">"+(pledged/goal*100).toFixed(0)+"%"+"</p></div> \
				                        <div class=\"progressbar\" id=\""+proid+"probar\"><div class=\"pledgebar\" id=\""+proid+"pledgebar\"></div><div class=\"dobar\" id=\""+proid+"dobar\"></div></div> \
                                                        <div class=\"progresscountbottom\" id=\""+proid+"procount\"><p class=\"docount\" id=\""+proid+"docount\">"+(donated/goal*100).toFixed(0)+"%"+"</p></div></div>");
				                        
				                        
				                        if(donated > 100)
				                        {}
				                        else if(donated > pledged)
				                        {
				                                $("#"+proid+"dobar").css({"z-index": "0"});
				                                $("#"+proid+"pledgebar").css({"z-index": "1"});
				                        }
				                        
				                        if(pledged/goal*100<100)
			                                {
				                                $("#"+proid+"pledgebar").animate({"width": pledged/goal*100+"%"});
				                                $("#"+proid+"pledgecount").animate({"margin-left": pledged/goal*100+"%"});
			                                }
			                                else
			                                {
			                                        $("#"+proid+"pledgebar").animate({"width": "100%"});
			                                        $("#"+proid+"pledgecount").animate({"margin-left": "100%"});
		                                        }
		                                        if(donated/goal*100<100)
		                                        {
				                                $("#"+proid+"dobar").animate({"width": donated/goal*100+"%"});
				                                $("#"+proid+"docount").animate({"margin-left": donated/goal*100+"%"});
			                                }
			                                else
			                                {
			                                        $("#"+proid+"dobar").animate({"width": "100%"});
				                                $("#"+proid+"docount").animate({"margin-left": "100%"});
			                                }
				                });     
			                }
				});
                        });
                }
        });
	
	
	$(".footer").html("<footer><p><a href=\"/\"><img class=\"footer-logo\" src=\"/media/IMSA_Undefined_Logo_White.png\" alt=\"IMSA Undefined\"></a>&nbsp;&nbsp;&nbsp;Copyright &copy; IMSA Undefined 2014</p></footer>");
});
