
var recomEngine = function(type, listSelectedItems, listofItemsOnScreen){
    this.type = type;
    this.listSelectedItems = listSelectedItems;
    this.listofItemsOnScreen = listofItemsOnScreen;
}


recomEngine.prototype.GetRecom= function(Obj){
    if(Obj.type=="select")
    {
      // I should get listofSympthoms and list of diseas here..goo

      getRecomListFromBackEnd(Obj.listSelectedItems, Obj.listofItemsOnScreen);

    }


}
