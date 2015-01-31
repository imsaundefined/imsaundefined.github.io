var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-58038459-2']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

(function() {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

        Date.prototype.getMonthName = function() {
                return months[ this.getMonth() ];
        };
        Date.prototype.getDayName = function() {
                return days[ this.getDay() ];
        };
})();

$( document ).ready(function(){                     
    	//What's the Next Big Thing at IMSA? Animation
    	//$(".branding-box h1").animate({"left": 0, "opacity": 1}, 3000);

        //Smooth scrolling sections
        /*$(function() {
                $('a[href*=#]:not([href=#])').click(function() {
                        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                                var target = $(this.hash);
                                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                                if (target.length) {
                                        $('html,body').animate({
                                                  scrollTop: target.offset().top
                                        }, 1000);
                                        return false;
                                }
                        }
                });
        });*/
        
        function sortByDate(dateArray1, dateArray2)
        {
                //dateArray in form [day, month, year]
                //console.log(dateArray1, dateArray2);
                var greater = false;
                if(dateArray1[2] > dateArray2[2])
                {
                        greater = true;
                }
                else if(dateArray1[2] == dateArray2[2])
                {
                        if(dateArray1[1] > dateArray2[1])
                        {
                                greater = true;
                        }
                        else if(dateArray1[1] == dateArray2[1])
                        {
                                if(dateArray1[0] >= dateArray2[0])
                                {
                                        greater = true;
                                }
                        }
                }
                
                if(greater)
                {
                        return 1;
                }
                else
                {
                        return -1;
                }
        }
        
        function sortPostersByDate(PosterArray1, PosterArray2)
        {
                
                dateArray1 = [PosterArray1[5], PosterArray1[4], PosterArray1[3]];
                dateArray2 = [PosterArray2[5], PosterArray2[4], PosterArray2[3]];
                
                return(sortByDate(dateArray1, dateArray2));
        }
        
        function pad(n, width, z) {
                z = z || '0';
                n = n + '';
                return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        }
        
        var PosterSpreadsheetKey = "1MwsGs0Gk8kV7MouZ5IsolOZZd-aVDJwK-RNfYxj8cZ8";
        var PosterFolderKey = "0B_vROCev3947Qy1kN3Z2RUxOUU0";
        //console.log("HEY");
        $.getJSON("https://spreadsheets.google.com/feeds/list/"+PosterSpreadsheetKey+"/od6/public/values?alt=json", function(data){
                //console.log(data);
                
                //default view
                var defaultview = "date";
                
                var posters = data.feed.entry;
                var ToBePosted = [];
                
                d = new Date();
                var TodayDay = d.getDate();
                var TodayMonth = d.getMonth()+1;
                var TodayYear = d.getFullYear();
                
                $(posters).each(function(index){
                        var ClubName = posters[index].gsx$clubname.$t;
                        var PosterTitle = posters[index].gsx$postertitle.$t;
                        var PosterCaption = posters[index].gsx$postercaption.$t;
                        var PosterDate = posters[index].gsx$posterdate.$t;
                        var PosterID = posters[index].gsx$posterid.$t;
                        var PosterApproved = posters[index].gsx$approved.$t;
                        
                        var splitdate = PosterDate.split("/");
                        var PosterDateMonth = pad(splitdate[0], 2);
                        var PosterDateDay = pad(splitdate[1], 2);
                        var PosterDateYear = splitdate[2];
                        
                        //console.log(ClubName);
                        //console.log(PosterTitle);
                        //console.log(PosterCaption);
                        //console.log(PosterDate);
                        //console.log(PosterID);
                        //console.log(PosterDateDay);
                        //console.log(PosterDateMonth);
                        //console.log(PosterDateYear);
                        
                        if(sortByDate([parseInt(PosterDateDay), parseInt(PosterDateMonth), parseInt(PosterDateYear)], [TodayDay, TodayMonth, TodayYear])==1 && PosterApproved.toLowerCase() == "y")
                        {
                                ToBePosted.push([ClubName, PosterTitle, PosterCaption, PosterDateYear, PosterDateMonth, PosterDateDay, PosterID]);
                        }
                        
                });
                
                //Sort posters in chronological order
                ToBePosted.sort(sortPostersByDate);
                //console.log(ToBePosted);
                
                var datelist = [];
                var clublist = [];
                $(ToBePosted).each(function(index){
                        if(datelist.indexOf(ToBePosted[index][3]+ToBePosted[index][4]+ToBePosted[index][5]) == -1)
                        {
                                var namedate = new Date(ToBePosted[index][4]+"/"+ToBePosted[index][5]+"/"+ToBePosted[index][3]);
                                $("#isowall").append("<div id=\"datetip"+index+"\" class=\"mitem sorttip datetip\" data-date=\""+ToBePosted[index][3]+ToBePosted[index][4]+ToBePosted[index][5]+"\" data-precedence=\"a\"><p>"+namedate.getDayName()+", "+namedate.getMonthName()+" "+namedate.getDate()+", "+namedate.getFullYear()+"<p></div>");
                                datelist.push(ToBePosted[index][3]+ToBePosted[index][4]+ToBePosted[index][5]);
                        }
                        
                        if(clublist.indexOf(ToBePosted[index][0]) == -1)
                        {
                                $("#isowall").append("<div id=\"clubtip"+index+"\" class=\"mitem sorttip clubtip\" data-club=\""+ToBePosted[index][0]+"\"  data-precedence=\"a\"><p>"+ToBePosted[index][0]+"<p></div>");
                                clublist.push(ToBePosted[index][0]);
                        }
                });
                
                $(ToBePosted).each(function(index){
                        
                        var sizes = ["mitem-small", "mitem-medium", "mitem-medium"];
                        function getSizeLayout(index){
                                var size_layout = [2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 1];
                                if(index < size_layout.length)
                                {
                                        return size_layout[index];
                                }
                                else
                                {
                                        return 0;
                                }
                        }
                        
                        function urlify(text) {
                            var urlRegex = /(https?:\/\/[^\s]+)/g;
                            return text.replace(urlRegex, function(url) {
                                return '<a href="' + url + '">' + url + '</a>';
                            })
                        }

                        $("#isowall").append("<div id=\"isopost"+index+"\" class=\"mitem\" value=\""+index+"\" data-date=\""+ToBePosted[index][3]+ToBePosted[index][4]+ToBePosted[index][5]+"\" data-club=\""+ToBePosted[index][0]+"\" data-precedence=\"b\"><a class=\"fancybox\" rel=\"gallery1\" href=\"\"><img src=\"\"></a></div>");

                        var remindmesite = "https://sites.google.com/site/postedservice/remindme";
                        var thisid = "#isopost"+index;
                        
                        $(thisid).children("a").attr("href", "https://googledrive.com/host/"+PosterFolderKey+"/"+ToBePosted[index][6]);
                        $(thisid).children("a").attr("title", "Click for more info.");
                        $(thisid).children("a").attr("caption", "<h1>"+ToBePosted[index][1]+"</h1>"+urlify(ToBePosted[index][2])+" ("+ToBePosted[index][0]+", "+ToBePosted[index][4]+"/"+ToBePosted[index][5]+"/"+ToBePosted[index][3]+")"+"<div class=\"remindme\"><b><a class=\"remindmelink\" href=\""+remindmesite+"?posterid="+ToBePosted[index][6]+"\">Remind me about this event</a></b></div>");
                        $(thisid).children("a").children("img").attr("src", "https://googledrive.com/host/"+PosterFolderKey+"/"+ToBePosted[index][6]);
                        $(thisid).children("a").children("img").attr("alt", "The Next Big Thing");
                        $(thisid).children("a").children("img").error(function(){
                                $(thisid).attr("src", "/clubhub/media/DefaultSquare.png");
                                $(thisid).parent().attr("href", "/clubhub/media/DefaultSquare.png");
                        });
                        
                        $(thisid).children("a").children("img").load(function(){
                                //Dynamically scale posters so that they are visually appealing.
                                //Wide posters get this treatment!
                                var posterratio = $(thisid).children("a").children("img").width()/$(thisid).children("a").children("img").height();
                                if(posterratio > 1)
                                {
                                        if(posterratio > 2)
                                        {
                                                $(thisid).addClass(sizes[getSizeLayout(index)]+"-very-wide");
                                                //$(thisid).height($(thisid).children("a").children("img").height());
                                                
                                        }
                                        else
                                        {
                                                $(thisid).addClass(sizes[getSizeLayout(index)]+"-wide");
                                                $(thisid).children("a").children("img").height($(thisid).height());
                                                //$(thisid).children("a").children("img").css("width", $(thisid).children("a").children("img").width());     
                                        }
                                }
                                else
                                {
                                        $(thisid).addClass(sizes[getSizeLayout(index)]);
                                }
                                
                                updateIsowall();
                                changeView(defaultview);
                        });
                        
                        
                        $(thisid).children("a").click(function(){
                                //console.log(value);
                                _gaq.push(["_trackEvent", "ClubBox-Click", "Click", "PosterID "+ToBePosted[index][6]+"("+ToBePosted[index][0]+")"]);
                        });
                        
                        $(thisid+".remindmelink").click(function(){
                                _gaq.push(["_trackEvent", "RemindMe-Click", "Click", "PosterID "+ToBePosted[index][6]+"("+ToBePosted[index][0]+")"]);
                        });
                });

        });
        
        $(".fancybox").fancybox({
                beforeLoad: function() {
                    this.title = $(this.element).attr('caption');
                },
                type: "image",
                openEffect: "elastic",
                closeEffect: "fade",
                helpers: {
                        overlay: {
                                locked: false
                        },
                        title: {
                                type: "inside",
                        },
                }
        });
        
        $(".menu").hover(function(){
                $(this).css("z-index", "3");
                //console.log("Hey");
                $(this).width("12%");
        }, function(){
                $(this).css("z-index", "1");
                $(this).width("2%");
        });
        
        $('.viewtoggle').click(function() {
                $('.isotope').isotope('updateSortData').isotope();

                var sortValue = $(this).attr('data-sort-value');
                changeView(sortValue);
                
                _gaq.push(["_trackEvent", "View-Select", "Selection", "View "+sortValue]);
        });
        
        $('.button-group').each( function( i, buttonGroup ) {
                var $buttonGroup = $( buttonGroup );
                $buttonGroup.on( 'click', 'button', function() {
                        $buttonGroup.find('.is-checked').removeClass('is-checked');
                        $( this ).addClass('is-checked');
                });
        });
        
});

function changeView(sortValue)
{
        if(sortValue == "quick")
        {
                $(".mitem").css("margin", "0px");
                $(".isotope").isotope({ filter: ':not(.sorttip)' });
                $(".isotope").isotope({ layoutMode: 'packery' });
                $(".isotope").isotope({ sortBy: ['date', 'precedence'] });
                
        }
        else if(sortValue == "date")
        {
                $(".mitem").css("margin", "20px");
                $(".isotope").isotope({ filter: '*:not(.sorttip:not(.datetip))' });
                $(".isotope").isotope({ layoutMode: 'fitRows' });
                $(".isotope").isotope({ sortBy: ['date', 'precedence'] });
                
        }
        else if(sortValue == "clubs")
        {
                $(".mitem").css("margin", "20px");
                $(".isotope").isotope({ filter: '*:not(.sorttip:not(.clubtip))' });
                $(".isotope").isotope({ layoutMode: 'fitRows' });
                $(".isotope").isotope({ sortBy: ['clubs', 'precedence'] });
                
        }
        else
        {
                $(".mitem").css("margin", "0px");
                $(".isotope").isotope({ filter: ':not(.sorttip)' });
                $(".isotope").isotope({ layoutMode: 'packery' });
                $(".isotope").isotope({ sortBy: ['date', 'precedence'] });
        }
}    

function updateIsowall() {
  
        $('.isotope').isotope({
                itemSelector: '.mitem',
                getSortData: {
                        date: '[data-date]',
                        clubs: '[data-club]',
                        precedence: '[data-precedence]',
                },
                sortBy : ['date', 'precedence'],
                filter: ':not(.sorttip)',
                layoutMode: 'packery',
                packery: {
                        gutter: 20
                },
                vertical: {
                        horizontalAlignment: 0.5
                }
        });
}
