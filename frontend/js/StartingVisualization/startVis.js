
var list = [];
var data_set;
// rectWidth=12;
// rectHeight=12;
radius = 7;
var svg, container;

margin = {top: 10, right: 150, bottom: 4, left: 50},
width = (89/100)* window.innerWidth- margin.left - margin.right,
height = (90/100)* window.innerHeight- margin.top - margin.bottom;

var padding=100;
var right_padding=100;
var top_padding=50;
var svg;

function startVis (dataset) {
  svg = d3.select("body").select("#VisContainer").append("svg")
  .attr("id","Vis")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" +0 + "," + 0 + ")");

  gdots =  svg.selectAll("g.dot")
             .data(dataset)
             .enter().append('g')
             .attr("class", "dot")
             .attr("id", function(d,i){return "g_id_"+d.ID;})
             .attr("transform", function(d,i){
                   d.x = Math.floor((Math.random() * width ));
                   d.y = Math.floor((Math.random() * height));
                   return "translate("+d.x+","+d.y+")"
             })
             .call(d3.drag()
             .on("start", dragstarted)
             .on("drag", dragged)
             .on("end", dragended));

               //.call(dragCircle);

  gdots.append("circle")
      .attr("class", "circle")
      .attr("fill", function(d,i){return "#267bfb";})
      .style("opacity", 0.6)
      .attr("id", function(d,i){return "id_"+d.ID;})
      .attr("r", function(d){ return radius;})
      .on('mouseenter', function(d,i) {
        ShowDetail(i);
      });

  clusters = createClustering();
}

function dragstarted(d) {
  d3.select(this).select('circle').classed("dragActive", true);
}
function dragged(d) {
  d3.select(this).attr("transform", function(d,i){
          return "translate(" + [d.x = d3.event.x, d.y =d3.event.y ] + ")"
  })
}

function dragended(d) {
  d3.select(this).select('circle').classed("dragActive", false);

  var interactedItem = d3.select(this).attr("id");

  updateCirclesPostition(dataset,clusters, interactedItem);

/*

  if($.inArray(value, list) == -1)
  {
    list.push(value);
    drawBoundary(value);
  }
*/
}
