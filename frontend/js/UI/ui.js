(function(argument) {
	uiHandler = {};

  listofCheckedItems=[];

 	// this is for adding/removing blue color from icons on the right side panels


  $(".SelectIcon").click(function(){
     sc.Scatter_SelectionActivation();
     $(".RightMenueIcon i").removeClass("md-Active");
     $(".SelectIcon").addClass("md-Active");
  });

	$(".colorIcon").click(function(){
	   sc.Scatter_ColorActivation();
		 $(".RightMenueIcon i").removeClass("md-Active");
		 $(".colorIcon" ).addClass("md-Active");
	});
	$(".resizeIcon").click(function(){
		 sc.Scatter_ResizeActivation();
 		 $(".RightMenueIcon i").removeClass("md-Active");
 		 $(".resizeIcon" ).addClass("md-Active");
 	});

	$(".dragIcon").click(function(){
		 sc.Scatter_DragActivation();
 		 $(".RightMenueIcon i").removeClass("md-Active");
 		 $(".dragIcon" ).addClass("md-Active");
 	});






  $('.createVis').click(function () {

    var selected = [];
    d3.selectAll(".check").each(function(d){
      if(d3.select(this).node().checked)
      {
        selected.push(d3.select(this).attr("id"));
      }
    });
    updateVis(selected);
  });

	$("#leftPanelToggleButton").click(function(ev){
		toggleLeftPanel();
	});

	function toggleLeftPanel(){
		if(global.leftPanelStatus==1){ // left panel open
	    	$("#leftPanel").animate({width:'toggle'},350);
				$("#slidingPanelIcon").removeClass('fa-caret-left');
				$("#slidingPanelIcon").addClass('fa-caret-right');
			global.leftPanelStatus = 0;
		}else{ // left panel closed
	    	$("#leftPanel").animate({width:'toggle'},350);
				$("#slidingPanelIcon").removeClass('fa-caret-right');
				$("#slidingPanelIcon").addClass('fa-caret-left');
			global.leftPanelStatus = 1;
		}
		resizeMainContainer();
	}


	function resizeMainContainer(){
		$("#mainContainer").removeClass();
		if(global.rightPanelStatus==1 && global.leftPanelStatus==1){
			$("#mainContainer").addClass('col-md-8');
		}else if(global.rightPanelStatus==0 && global.leftPanelStatus==0){
			$("#mainContainer").addClass('col-md-12');
		}else if(global.rightPanelStatus==0 && global.leftPanelStatus==1){
			$("#mainContainer").addClass('col-md-10');
		}else if(global.rightPanelStatus==1 && global.leftPanelStatus==0){
			$("#mainContainer").addClass('col-md-10');
		}
	}

})()

function detailPanelCalled()
{
	$("#controlPanel").hide();
	$("#suggestionPanel").hide();
	$("#actionPanel").hide();
	$("#detailPanel").show();
}
function actionPanelCalled()
{
	$("#panelTitle").prepend('');
	$("#controlPanel").hide();
	$("#suggestionPanel").hide();
	$("#detailPanel").hide();
	$("#actionPanel").show();
}
function suggestionPanelCalled()
{
	$("#controlPanel").hide();
	$("#actionPanel").hide();
	$("#detailPanel").hide();
  $("#suggestionPanel").show();
}
function controlPanelCalled()
{
	$("#suggestionPanel").hide();
	$("#actionPanel").hide();
	$("#detailPanel").hide();
	$("#controlPanel").show();
}

function ShowDetail(circle_id){
  detailPanelCalled();
  var numberOfAddedAttributes = 4;
	$(".table > p" ).remove();
  dataAttributeNames = Object.keys(dataset[0]);
  //console.log(returnAttributeRealName());
	for(j=dataAttributeNames.length-numberOfAddedAttributes-1;j>=1;	j=j-1)
  {
	 	$(".table").prepend('<p class="attributes_container attributes_font" id="attrID_'+j+'"> <b>'+dataAttributeNames[j]+':</b> '+dataset[circle_id][dataAttributeNames[j]]+'</p>');
	}
	$(".table").prepend('<p class="dataset-meta attributes_font" style="padding: 7px 0px 0px 7px;"> <i class="fa fa-list"></i> ' +(dataAttributeNames.length-2)+' data attributes<p>');
	$(".table").prepend('<p class="dataset-meta attributes_font" style="padding: 7px 0px 0px 7px;"> <i class="fa fa-circle"></i> ' + dataset.length +' data points <p>');
	$(".table").prepend('<p class="dataset-meta attributes_font" style="padding: 7px 0px 0px 7px;"> <i class="fa fa-table"></i> Cars.csv <p>');
}
