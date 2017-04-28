(function(){


  var dataCallBack = function(){
        startVis(dataset);
  };

 d3.csv("http://localhost:5000/getAllData", function(csv) {
  //  console.log(csv);
       dataset= csv.slice(0);
       dataCallBack();
  });

})();
