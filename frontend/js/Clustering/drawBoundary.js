
clusters =[];

function getGroupPosition(val)
{
  string = d3.select("#"+val).attr("transform");
  position = string.substring(string.indexOf("(")+1, string.indexOf(")")).split(",");
  return position;
}

function drawBoundary(val){
   var coordination = getCoordination(val);
}

function createCluster(clusterIndex, clusterCoordination){
  gRect= d3.select("#Vis");

  var  clusterColor= ["#839192", "#D35400","#F1C40F","#2ECC71","#1ABC9C","#8E44AD","#839192", "#D0D3D4","#F2F4F4","#EAECEE","#E6B0AA"];

  var gCluster = gRect.insert("g",":first-child")
         .attr("class", "g_cluster")
         .attr("id", function(d,i){return "g_cluster_"+clusterIndex;})
         .attr("transform", function(){
             return "translate("+(clusterCoordination.clusterX)+","+(clusterCoordination.clusterY)+")"
         });

  var gRects = gCluster.append('g');

  gRects.append("rect")
         .attr('stroke', 'white')
         .style("fill", function(d) {return clusterColor[Number(clusterIndex)]; } )
         .attr('opacity', 0.2)
         .attr("id", function(d,i){return "g_cluster_rect_"+clusterIndex;})
         .attr("width", function(){ return clusterCoordination.clusterWidth;})
         .attr("height", function(){ return clusterCoordination.clusterHeight;})


}


function getCoordination(element){

  string = d3.select("#"+element).attr("transform");
  var elementCoord = string.substring(string.indexOf("(")+1, string.indexOf(")")).split(",");
  var clusterExist =false;

  if($('.g_cluster').length){

    d3.selectAll('.g_cluster').each(function(d){
      clusterID = d3.select(this).attr("id");
      clusterIndex = d3.select(this).attr("id").split("_")[2];
      clusterCoord = getGroupPosition(clusterID);

      innerRectID = d3.select(this).select('rect').attr("id");
      innerRectWidth = d3.select("#"+innerRectID).attr("width");
      innerRectHeight  = d3.select("#"+innerRectID).attr("height");

      if(Number(elementCoord[0])+(2*radius) >= Number(clusterCoord[0]) && Number(elementCoord[0])+(2*radius) <= (Number(clusterCoord[0])+Number(innerRectWidth))
          || Number(elementCoord[0]) >= Number(clusterCoord[0]) && Number(elementCoord[0]) <= (Number(clusterCoord[0])+Number(innerRectWidth)))
      {
        if(Number(elementCoord[1])+(2*radius) >= Number(clusterCoord[1]) && Number(elementCoord[1])+(2*radius) <= (Number(clusterCoord[1])+Number(innerRectHeight))
            || Number(elementCoord[1]) >= Number(clusterCoord[1]) && Number(elementCoord[1]) <= (Number(clusterCoord[1])+Number(innerRectWidth)))
        {

          clusterExist =true;

          clusterTopCoordX = Number(clusterCoord[0]);
          clusterTopCoordY = Number(clusterCoord[1]);

          clusterBottomCoordX = Number(clusterCoord[0]) + Number(innerRectWidth);
          clusterBottomCoordY = Number(clusterCoord[1]) + Number(innerRectHeight);

          elementTopCoordX = Number(elementCoord[0]);
          elementTopCoordY = Number(elementCoord[1]);

          elementBottomCoordX = Number(elementCoord[0]) + 2*radius;
          elementBottomCoordY = Number(elementCoord[1]) + 2*radius;

          if((elementTopCoordX - clusterTopCoordX) <= (radius*2))
          {
            clusterX = clusterTopCoordX - ((2*radius) - (elementTopCoordX - clusterTopCoordX));
            clusterWidth = Number(innerRectWidth) + Math.abs(((2*radius) - (elementTopCoordX - clusterTopCoordX)));
          }
          else if((clusterBottomCoordX - elementBottomCoordX) <= (radius*2))
          {
            clusterWidth = Number(innerRectWidth) + Math.abs((clusterBottomCoordX - elementBottomCoordX));
          }

          if((elementTopCoordY - clusterTopCoordY) <= (radius*2))
          {
            clusterY = clusterTopCoordY - ((2*radius) - (elementTopCoordY - clusterTopCoordY));
            clusterHeight = Number(innerRectHeight) + Math.abs(((2*radius) - (elementTopCoordY - clusterTopCoordY)));
          }
          else if((clusterBottomCoordY - elementBottomCoordY) <= (radius*2))
          {
            clusterHeight = Number(innerRectHeight) + Math.abs((clusterBottomCoordY - elementBottomCoordY));
          }

          clusters[clusterIndex].push(element);
          d3.selectAll("#"+clusterID).remove()
          createCluster(clusterIndex, {"clusterX":clusterX, "clusterY":clusterY, "clusterWidth":clusterWidth, "clusterHeight":clusterHeight});

          // This is a temporary function
          setTimeout(function(){   createClustering(); }, 1000);


        }
      }
    });
  }

  if($('.g_cluster').length ==0 || clusterExist==false){
    clusterX = elementCoord[0]-(2*radius);
    clusterY = elementCoord[1]-(2*radius);
    clusterWidth = 4*radius;
    clusterHeight = 4*radius;
    clusterIndex = $('.g_cluster').length;
    clusters.push([element]);
    console.log(clusters);
    createCluster(clusterIndex, {"clusterX":clusterX, "clusterY":clusterY, "clusterWidth":clusterWidth, "clusterHeight":clusterHeight});
  }
}
