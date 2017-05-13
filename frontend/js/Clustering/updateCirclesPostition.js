// Hannah's code
function updateCirclesPostition(dataset, matrixDataset, matrixAttrNames, clusters, sublist, interactedCluster){
    var points = clusters[interactedCluster]["Points"];
    var x = [];
    var y = [];
    var w = [];
    var A = [];
    for (var i=0; i<points.length; i++) {
        var interactedIndex = sublist.indexOf(points[i])
        if ( interactedIndex == -1) {
            w[i] = 1;
        } else { // if interacted, weight can be 100~200% of uninteracted items
            w[i] = 1 + (interactedIndex+1)/sublist.length;
        }
        x[i] = dataset[points[i]]["x"] * w[i];
        y[i] = dataset[points[i]]["y"] * w[i];
        var row = [];
        for (var j=0; j<matrixDataset.length; j++) {
            row[j] = matrixDataset[j][i] * w[i];
        }
        A[i] = row;
    }
    
//    A = [[1,2,3],[3,4,5]];x=[5,6,7];y=[3,2];
    beta_x = solve(A, x);
    beta_y = solve(A, y);
    console.log(beta_x);
    console.log(beta_y);
    return {"beta_x": beta_x, "beta_y": beta_y};
}

function solve(A, b) {
    var lab = new Lalolab();
    lab.load(A, "A", function(result) {
//		console.log(laloprint(result,true));
	}); 
    lab.load(b, "b", function(result) {
//		console.log(laloprint(result,true));
	}); 
	lab.do("x = solve(A,b)");
	lab.getObject("x", function(x) {
        console.log(x);
		return x;
	});
//    lab.close();
}

function getCoord(matrixDataset, beta) {
    var coord = [];
    for (var i=0; i<matrixDataset[0].length; i++) {
        var tmp = 0;
        for (var j=0; j<matrixDataset.length; j++) {
            tmp = tmp + beta[j]*matrixDataset[j][i];
        }
        coord[i] = tmp;
    }
    return coord;
}