var recomPresentation = function(listOfRecommendations){
  this.listOfRecommendations =listOfRecommendations;
}

recomPresentation.prototype.presentRecommendation= function(Obj){
  addRecomToInterface(Obj.listOfRecommendations);
}
