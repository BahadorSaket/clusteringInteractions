// Hannah's code
function updateCirclesPostition(matrixDataset, matrixAttrNames, clusters, list, lastInteractedItem){

  // This is matrix format of our dataset
  console.log(matrixDataset);

  // This is Attribute names for each column int he matrix
  console.log(matrixAttrNames);

  // This includes cluster's id, number of data items in each cluster, id of the data points inside each cluster, x postion, y poistion, width and height of the clusters.
  console.log(clusters);

  //list of interacted item and last interacted item
  console.log(list, lastInteractedItem)
    

}

// from VbD —---------------------------------------
var excludedAttributes=["ID","Type","Name","x","y","color","r","ial"];

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

//This function returns an array which contains normalized value of all data attributes.
function getNormalizedData(data, Attr){
  var data_norm = [];

  for (var i=0; i<Attr.length; i++) {
    var min = d3.min(data, function(d,j){ return +data[j][Attr[i]];})
    var max = d3.max(data, function(d,j){ return +data[j][Attr[i]];})
    var tmpAttr = [];
    for (var k=0; k<data.length; k++) {
      tmpAttr[k] = (data[k][Attr[i]]-min)/(max-min);
    }
    data_norm.push({[Attr[i]]:tmpAttr});
  }
  return data_norm;
}

function init(){
    Attr = getAttributes(dataset);
    data_norm = getNormalizedData(data, Attr);
}