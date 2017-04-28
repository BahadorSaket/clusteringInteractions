
clusterPadding =17;

function returnClusterIndex(clusters, index){
  var val=0;
  for(var j=0;j<clusters.length;j++)
  {
    for(var k=0;k<clusters[j]["Points"].length;k++)
    {
      if(index == Number(clusters[j].Points[k]))
      {
        val =j;
      }
    }
  }
  return val;
}


function updateCirclesPostition(clusters){
  //var svg= d3.select("#Vis");

  svg.selectAll('.dot')
     .transition()
     .duration(550)
     .ease(d3.easeLinear)
     .attr("transform", function(d,i){
           var index = returnClusterIndex(clusters, i);
           d.x = Math.floor(Math.random() * clusters[index].clusterWidth  - clusterPadding) + clusters[index].clusterCoordX + clusterPadding;
           d.y = Math.floor(Math.random() * clusters[index].clusterHeight - clusterPadding) + clusters[index].clusterCoordY  + clusterPadding;
           return "translate("+d.x+","+d.y+")";
     })
}

function drawClusters(clusters){
  d3.selectAll(".g_cluster").remove();

  gRect= d3.select("#Vis");

  var  clusterColor= ["#839192", "#D35400","#F1C40F","#2ECC71","#1ABC9C","#8E44AD","#839192", "#D0D3D4","#F2F4F4","#EAECEE","#E6B0AA"];

  var gCluster = gRect.selectAll("g.g_cluster")
         .data(clusters)
         .enter()
         .insert("g",":first-child")
         .attr("class", "g_cluster")
         .attr("id", function(d,i){return "g_cluster_"+i;})
         .attr("transform", function(d,i){
             return "translate("+(clusters[i].clusterCoordX)+","+(clusters[i].clusterCoordY)+")"
         });

  var gRects = gCluster.append('g');

  gRects.append("rect")
         .attr('stroke', 'white')
         .style("fill", function(d,i) {return clusterColor[Number(i)]; } )
         .attr('opacity', 0.1)
         .attr("id", function(d,i){return "g_cluster_rect_"+clusterIndex;})
         .attr("width", function(d,i){ return clusters[i].clusterWidth;})
         .attr("height", function(d,i){ return clusters[i].clusterHeight;})

  setTimeout(function(){ updateCirclesPostition(clusters); }, 100);


}

function calClustersPosition(clusters){
  for(var i=0;i<clusters.length;i++)
  {
    if(i==0)
    {
      clusters[i].clusterCoordX = 0 + clusterPadding;
      clusters[i].clusterCoordY = clusterPadding;
    }
    else if(i==1)
    {
      clusters[i].clusterCoordX = clusters[i-1].clusterWidth + (2*clusterPadding);
      clusters[i].clusterCoordY = clusterPadding;
    }
    else if(i==2)
    {
      clusters[i].clusterCoordX = 0 + clusterPadding;
      clusters[i].clusterCoordY = clusters[i-1].clusterCoordY + clusters[i-1].clusterHeight + clusterPadding;
    }
    else if(i==3)
    {
      clusters[i].clusterCoordX = clusters[i-1].clusterWidth + (2*clusterPadding);
      clusters[i].clusterCoordY = clusters[i-2].clusterCoordY + clusters[i-2].clusterHeight + clusterPadding;
    }
    else if(i==4)
    {
      clusters[i].clusterCoordX = 0 + clusterPadding;
      clusters[i].clusterCoordY = clusters[i-1].clusterCoordY + clusters[i-1].clusterHeight + clusterPadding;
    }
    else if(i==5)
    {
      clusters[i].clusterCoordX = clusters[i-1].clusterWidth + (2*clusterPadding);
      clusters[i].clusterCoordY = clusters[i-2].clusterCoordY +clusters[i-2].clusterHeight + clusterPadding;
    }
  }
  return clusters;
}

function structuredClusters(uniqueClusters){
  var clusters = [];
  for(var i=0;i<uniqueClusters.length;i++)
  {
    var count = 0;
    var listOfPoints = [];
    for(var j=0;j<dataset.length;j++)
    {
      if(uniqueClusters[i]== dataset[j].Make)
      {
        count ++;
        listOfPoints.push(dataset[j].ID);
      }
    }
    var HeightOfClusters =  (svgHeight - (Math.ceil(uniqueClusters.length / 2)*clusterPadding)) / Math.ceil(uniqueClusters.length / 2);
    clusters.push({"Make":uniqueClusters[i] , "Count":count, "Points":listOfPoints, "clusterWidth": (count*3.7*radius +clusterPadding),
                  "clusterHeight":HeightOfClusters, "clusterCoordX":0, "clusterCoordY":0});
  }
  clusters = calClustersPosition(clusters);
  drawClusters(clusters);
  return clusters;
}


function createClustering(){
  svgWidth  = Number(d3.select("#Vis").attr("width"));
  svgHeight = Number(d3.select("#Vis").attr("height"));

  var dataToCluster = [];
  for(var i=0;i<dataset.length;i++)
  {
    dataToCluster.push(dataset[i].Make)
  }

  let uniqueClusters = [...new Set(dataToCluster)];
  var clusters = structuredClusters(uniqueClusters);
}
