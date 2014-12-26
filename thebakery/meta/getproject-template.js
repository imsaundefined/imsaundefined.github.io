console.log(extthis);
$(extthis).children("project").each(function(){
        id++;
        var proid = id;
        console.log("HAI");
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
