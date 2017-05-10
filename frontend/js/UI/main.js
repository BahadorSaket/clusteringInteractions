
(function(){

  function createMatrixData(dataset){

    matrixDataset = [];
    matrixAttrNames = [];
    dataAttributeNames = Object.keys(dataset[0]);


    for(var j=0;j<dataAttributeNames.length;j++)
    {
      if(dataAttributeNames[j] == "Make" || dataAttributeNames[j] == "Name" || dataAttributeNames[j] == "Type"){
      }
      else {
        matrixAttrNames.push(dataAttributeNames[j]);
      }
    }


    for(var i=0;i<dataset.length;i++)
    {
      var row = [];
      for(var j=0;j<dataAttributeNames.length;j++)
      {
        if(dataAttributeNames[j] == "Make" || dataAttributeNames[j] == "Name" || dataAttributeNames[j] == "Type"){
        }
        else {
          row.push(parseFloat(dataset[i][dataAttributeNames[j]]));
        }
      }
      matrixDataset.push(row);
    }
 }

  var dataCallBack = function(){
      startVis(dataset);
  };

  d3.csv("http://localhost:5000/getAllData", function(csv) {
  //  console.log(csv);
       dataset= csv.slice(0);
       dataCallBack();
       createMatrixData(dataset);
  });


})();
