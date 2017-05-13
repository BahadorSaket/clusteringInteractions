(function(){
    
    var excludedAttributes=["ID","Make","Type","Name","x","y","color","r","ial"];
    
    // This function returns a list of attributes that have numerical values and will be counted in our calculations.
    function getAttributes(dataset)
    {
      var Attr= Object.keys(dataset[0]);
      var attrTemp =[];
      for (var i=0; i<Attr.length; i++)
      {
        if(excludedAttributes.indexOf(Attr[i]) == -1) // this check if all data attributes are numerical
        {
          attrTemp.push(Attr[i]);
        }
      }
      return attrTemp;
    }
    
    // This function returns an array which contains normalized value of all data attributes.
    function getNormalizedData(data, Attr){
      var data_norm = [];

      for (var i=0; i<Attr.length; i++) {
        var min = d3.min(data, function(d,j){ return +data[j][Attr[i]];})
        var max = d3.max(data, function(d,j){ return +data[j][Attr[i]];})
        var tmpAttr = [];
        for (var k=0; k<data.length; k++) {
            tmpAttr[k] = (data[k][Attr[i]]-min)/(max-min);
        }
        data_norm.push(tmpAttr);
      }
      return data_norm;
    }

//  function createMatrixData(dataset){
//
//    matrixDataset = [];
//    matrixAttrNames = [];
//    dataAttributeNames = Object.keys(dataset[0]);
//
//
//    for(var j=0;j<dataAttributeNames.length;j++)
//    {
//      if(dataAttributeNames[j] == "Make" || dataAttributeNames[j] == "Name" || dataAttributeNames[j] == "Type"){
//      }
//      else {
//        matrixAttrNames.push(dataAttributeNames[j]);
//      }
//    }
//
//
//    for(var i=0;i<dataset.length;i++)
//    {
//      var row = [];
//      for(var j=0;j<dataAttributeNames.length;j++)
//      {
//        if(dataAttributeNames[j] == "Make" || dataAttributeNames[j] == "Name" || dataAttributeNames[j] == "Type"){
//        }
//        else {
//          row.push(parseFloat(dataset[i][dataAttributeNames[j]]));
//        }
//      }
//      matrixDataset.push(row);
//    }
// }

  var dataCallBack = function(){
      startVis(dataset);
  };

  d3.csv("http://localhost:5000/getAllData", function(csv) {
  //  console.log(csv);
       dataset= csv.slice(0);
       dataCallBack();
       
      matrixAttrNames = getAttributes(dataset);
      matrixDataset = getNormalizedData(dataset, matrixAttrNames);
//       createMatrixData(dataset);
  });


})();