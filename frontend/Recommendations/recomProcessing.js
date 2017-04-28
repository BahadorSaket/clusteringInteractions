var recomProcessing = function(diseases, symptoms){
    this.recommendations = [{"Type":"initial", "Weight":0.0}]; // recommendation is a list of objects where each object contains information about one recommendation
    this.diseases= diseases;
    this.symptoms= symptoms;
}

function sortAxisVector(a,b){
   if (a.val < b.val)
     return -1;
   if (a.val > b.val)
     return 1;
   return 0;
}

recomProcessing.prototype.checkAvailabilityOfRecommendations=function(tempRecommendations){
   var InitialLength= this.recommendations.length;
   for(i=0;i<tempRecommendations.length;i++)
   {
     var checker=false;
     for(j=0;j<InitialLength;j++)
     {
       if(tempRecommendations[i].Type==this.recommendations[j].Type)
       {
         checker=true;
       }
     }
     if(!checker)
     {
       this.recommendations.push(tempRecommendations[i]);
     }
   }
   return this.recommendations;
}


recomProcessing.prototype.Diseases=function(Obj){
   var tempRecommendations = [];

   for(i=0;i<Obj.diseases.length;i++)
   {
     tempRecommendations.push({"ID": Obj.diseases[i].id, "Type":Obj.diseases[i].name, "Weight":0.0, "Relavance":Obj.diseases[i].score});
   }
   this.recommendations = this.checkAvailabilityOfRecommendations(tempRecommendations);


   var recomPres = new recomPresentation(this.recommendations);
   recomPres.presentRecommendation(recomPres);
}


recomProcessing.prototype.Symptoms=function(Obj){
  var tempRecommendations = [];

  for(i=0;i<Obj.symptoms.length;i++)
  {
    tempRecommendations.push({"ID": Obj.symptoms[i].id, "Type":Obj.symptoms[i].name, "Weight":0.0, "Relavance":Obj.symptoms[i].score});
  }
  this.recommendations = this.checkAvailabilityOfRecommendations(tempRecommendations);


  var recomPres = new recomPresentation(this.recommendations);
  recomPres.presentRecommendation(recomPres);
}
