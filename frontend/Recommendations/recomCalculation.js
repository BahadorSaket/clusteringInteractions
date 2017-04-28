

//var excludedAttributes=["ID","Type","Name","x","y","color","r","ial"];

function runPyScript(input,url){
    var jqXHR = $.ajax({
        type: "POST",
        url: url,
        async: false,
        data: {"input" : input}
    });

    return jqXHR.responseText;
}


function sendData(input){
$.ajax({
    type: "POST",
    url: "/getDiseasesAndSymptoms",
    data: JSON.stringify(input),
    contentType: "application/json",
    dataType: "json",
    success: function(data){
      var recomProcess = new recomProcessing(data["diseases"],data["symptoms"]);
      recomProcess.Diseases(recomProcess);
      recomProcess.Symptoms(recomProcess);
    },
    failure: function(errMsg) {
        console.log("Error");
        console.log(errMsg);
    }
});
}

function getRecomListFromBackEnd(listSelectedItems, listofItemsOnScreen){
  var result = listSelectedItems.map(function (x) {
    return String(x);
  });
  sendData(result);
  //return val;
}



var app = angular.module('VisDemo', []);

app.controller('MainCtrl', function($scope){
    $scope.colors = {Blue: true, Orange: true};
    $scope.diseases = [
        { "name" :  "Chronic renal failure" , "id" :   "90688005"  , "count" : 16227 },
        { "name" :  "Acute renal failure" , "id" :   "155855008"  , "count" : 14454 },
        { "name" :  "Pyelonephritis" , "id" :   "45816000"  , "count" : 12811 },
        { "name" :  "Hemorrhagic stroke monitoring" , "id" :   "417506008"  , "count" : 10856 },
        { "name" :  "Lethargy" , "id" :   "214264003"  , "count" : 6876 },
        { "name" :  "Hyperesthesia" , "id" :   "14151009"  , "count" : 6222 },
        { "name" :  "Paresthesia" , "id" :   "91019004"  , "count" : 5815 },
        { "name" :  "Limb stump pain" , "id" :   "247381009"  , "count" : 5145 },
        { "name" :  "Back pain" , "id" :   "139146005"  , "count" : 4400 },
        { "name" :  "Myocardial infarction" , "id" :   "22298006"  , "count" : 3256 },
        { "name" :  "Type 1 diabetes mellitus" , "id" :   "46635009"  , "count" : 2950 },
        { "name" :  "Severe chronic obstructive pulmonary disease" , "id" :   "313299006"  , "count" : 2729 },
        { "name" :  "Essential hypertension" , "id" :   "59621000"  , "count" : 1607 },
        { "name" :  "Acute renal failure syndrome" , "id" :   "14669001"  , "count" : 1351 },
        { "name" :  "Type 2 diabetes mellitus" , "id" :   "44054006"  , "count" : 1344 },
        { "name" :  "Phantom limb pain" , "id" :   "193115004"  , "count" : 1006 },
        { "name" :  "Congestive heart failure" , "id" :   "42343007"  , "count" : 912 },
        { "name" :  "Knameney stone" , "id" :   "95570007"  , "count" : 890 },
        { "name" :  "Cerebral infarction due to embolism of cerebral arteries" , "id" :   "195190007"  , "count" : 851 },
        { "name" :  "Cerebral hemorrhage" , "id" :   "274100004"  , "count" : 815 },
        { "name" :  "Acute myocardial infarction" , "id" :   "57054005"  , "count" : 808 },

    ];

    $scope.getRulesFromBackend = function(str){
        console.log(str);
        const url = "/getAssociations";
        // var str = $("#rulesInput").val()
        var result = runPyScript(str,url).replace(/'/g, '"');;
        console.log(result)
        var rules = JSON.parse(result);
        rules.sort(function(a,b){
            return b[1] - a[1];
        });
        medicationHash = {};

        for (m in medicines){
            medicationHash[medicines[m].id]=medicines[m].name;
        }
        var result=new Set();
        confidenceHash = {};
        for(i in rules){
            var items = rules[i][0].split(",");
            for(it in items){
                if(Number(items[it]) in medicationHash || true){
                    if(confidenceHash[medicationHash[items[it]]]==undefined)confidenceHash[medicationHash[items[it]]]=0;
                    confidenceHash[medicationHash[items[it]]] = Math.max(confidenceHash[medicationHash[items[it]]],Number(rules[i][1]))
                    result.add(medicationHash[items[it]])
                }
            }
        }

        var resultArray = Array.from(result);

        resultArray.sort(function(a,b){
            console.log(confidenceHash[a] - confidenceHash[b]);
            return confidenceHash[b] - confidenceHash[a];
        });

        if(resultArray.length!=0) {
            resultArray = resultArray.slice(0, 3);
            $("#ruleRecommendationResults").html("");

            $("#ruleRecommendationResults").append("<p>" + "Ask your doctor about:" + "</p>");
            resultArray.forEach(function (val, index) {
                if(val!=undefined)
                    $("#ruleRecommendationResults").append("<p>" + val  + "</br> <b>Confidence:</b> " + confidenceHash[val] + "</p>");
            })
        }
        else{
            $("#ruleRecommendationResults").html("Please contact your doctor. ");
        }

        console.log(resultArray);

    }
});
