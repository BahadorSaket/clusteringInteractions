
var dataPoint ="patients";


$( "div.dropdown").children("button").click(function(){
  console.log("I MA HEREWERWJR");
});

function updateDropDownMenu(recomList)
{
  var dropDown = '<div class="dropdown dropdownMenu"> \
                    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example \
                    <span class="caret"></span></button> \
                    <ul class="dropdown-menu">'+recomList+'</ul> \
                 </div>'
  return dropDown;
}


function addRecomToInterface(tempList)
{
  $( ".Selection" ).remove();
  suggestionPanelCalled();

  var sameAttrList ="", rangeAttrList="";
  for(i=1;i<tempList.length;i++)
  {
       $('<div/>', {
         class:"Selection recom",
         id: tempList[i].ID,
         html: "Show all "+ dataPoint + " with " + tempList[i].Type,
       }).appendTo('#suggestionPanel');
  }

  $('.Selection').prepend('<a id="view" style="float:right; padding-right:5px;" class="btnIcon" href="#"><i class="fa fa-eye" aria-hidden="true"></i></a></br>');
  $('.Selection').prepend('<a id="reject" class="btnIcon" href="#"><i class="fa fa-times-circle"></i></a>');
  $('.Selection').prepend('<a id="accept" class="btnIcon" href="#"><i class="fa fa-check-circle"></i></a>');

  $(".btnIcon").click(function(d) {
      if(d3.select(this).attr("id") == "accept")
      {
        updateVis2(String(d3.select(this.parentNode).attr("id")));
        $( ".Selection" ).remove();
      }
      else if(d3.select(this).attr("id") == "reject") {
         id = String(d3.select(this.parentNode).attr("id"));
         $("div#"+id+".Selection").slideUp( "slow", function() { $("div#"+id+".Selection").remove(); });
      }
  });
}
