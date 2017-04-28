
function loadAttributSelectors(dataset){
//  $('#diseases').find('option').remove().end();
  var dataAttributes;
  $(".checkboxPanel").append("<h5>Symptoms</h5>");
    for(var key in symptoms){
      $(".checkboxPanel").append(
        $('<div>', { id :  symptoms[key].id })
        .addClass("checkboxDiv")
      );
     $("#"+ symptoms[key].id ).append($('<input>', { id :  symptoms[key].id, class:"check", type:"checkbox", name: symptoms[key].name + "VisibleCheckbox"}));
     $("#"+ symptoms[key].id).append("&nbsp;"+symptoms[key].name);
   }
  // $(".checkboxPanel").append("</br></br><h5>Medicines</h5>");
  // for(var key in medicines){
  //   $(".checkboxPanel").append(
  //     $('<div>', { id :  medicines[key].id })
  //     .addClass("checkboxDiv")
  //   );
  //
  //    $("#"+ medicines[key].id ).append($('<input>', { id :  medicines[key].id, class:"check", type:"checkbox", name: medicines[key].name + "VisibleCheckbox"}));
  //    $("#"+ medicines[key].id).append("&nbsp;"+medicines[key].name);
  //  }
}
