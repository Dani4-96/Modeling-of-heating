window.onload = function() {
    graph();  
}

function graph() {
    var canvas = document.querySelector(".js-graph");
    var ctx = canvas.getContext("2d");

    var width = canvas.clientWidth;
    var height = canvas.clientHeight;

    var start = performance.now();

    var timer = setInterval( function() {
        var timePassed = performance.now() - start;

        draw();
    }, 1);
    
    var size = 10;

    var lambda = 100;
    var S = 0.000025;
    var l = 0.005;
    var R = 8.314;
    var libertyCount = 6;
    var omega = 2 * lambda * S / (l * R * libertyCount);

    var deltaTemp = 50;

    var T = { before: [], after: [] };
    var validT = [];
    var sumT;
    var countT;
    var bufferT = [];

    for (var ii = 0; ii < 10; ii++) {
        T.before[ii] = [];
        T.after[ii] = [];

        for (var jj = 0; jj < 71; jj++) {
            T.before[ii][jj] = 0;
            T.after[ii][jj] = 0;
        }
    }

    for (var iii = 2; iii < 8; iii++) {
        T.before[iii][71] = 100;
        T.after[iii][71] = 100;
    }

    //console.log(T.before);

    for (var u = 0; u < 10; u++) {

                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.fillRect(u * size, 0 * size, size - 1, size - 1);
               
    }

    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.beginPath();

    ctx.moveTo(0 + 1, 0 + 1);
    ctx.lineTo(10 * size + 2, 0 + 1);

    ctx.moveTo(0 + 1, 0 + 1);
    ctx.lineTo(0 + 1, 71 * size + 1);

    ctx.moveTo(0 + 1, 71 * size + 2);
    ctx.lineTo(10 * size + 1, 71 * size + 2);

    ctx.moveTo(10 * size + 2, 71 * size + 1);
    ctx.lineTo(10 * size + 2, 0 + 1);

    ctx.stroke();
    ctx.closePath();

    for (var u = 2; u < 8; u++) {

                ctx.fillStyle = "rgb(255, 0, 0)";
                ctx.fillRect(u * size + 2, 71 * size + 3, size - 1, size - 1);  
               
    }

    for (var u = 0; u < 10; u++) {

        for (var p = 0; p < 50; p++) {

            ctx.fillStyle = "rgb(255, " + Math.round(255 - p * 5.1) + ", " + Math.round(255 - p * 5.1) + ")";
            ctx.fillRect(u * 5 + 500, p * 5 + 200, 5, 5);

        }
    }

    //ctx.fillText()

    function draw() {

    /*for (k = 0; k < 10000; k = k + timePassed) {*/

        for (var i = 0; i < 10; i++) {

            for (var j = 1; j < 71; j++) {

                sumT = 0;
                countT = 4;

                for (var l = 0; l < 4; l++) {
                    validT[l] = 0;
                    bufferT[l] = 0;
                }
                
                if (T.before[i - 1] != undefined && T.before[i - 1][j] != undefined) {
                    validT[0] = T.before[i - 1][j];
                } else {
                    validT[0] = -1;
                }
                if (T.before[i + 1] != undefined && T.before[i + 1][j] != undefined) {
                    validT[1] = T.before[i + 1][j];
                } else {
                    validT[1] = -1;
                }
                if (T.before[i] != undefined && T.before[i][j - 1] != undefined) {
                    validT[2] = T.before[i][j - 1];
                } else {
                    validT[2] = -1;
                }
                if (T.before[i] != undefined && T.before[i][j + 1] != undefined) {
                    validT[3] = T.before[i][j + 1];
                } else {
                    validT[3] = -1;
                }

                for (var n = 0; n < 4; n++) {

                    if (validT[n] == -1) {

                        bufferT[n] = 0;
                        countT--;

                    } else {

                        bufferT[n] = T.before[i][j] - omega * deltaTemp * (T.before[i][j] - validT[n]);

                    }

                }

                bufferT.forEach(function(element) {
                    sumT = sumT + element;
                    //console.log(element);
                });
                
                if (countT == 0) {
                    T.after[i][j] = T.before[i][j];
                } else {
                    T.after[i][j] = 1 / countT * sumT;
                }
                
                //debugger;
                    
            }
        }
        //debugger;
        //console.log(T.after);

        for (var u = 0; u < 10; u++) {

            for (var p = 1; p < 71; p++) {

                T.before[u][p] = T.after[u][p];

                ctx.fillStyle = "rgb(255," + Math.round(255 - T.after[u][p] * 2.55) 
                + ", " + Math.round(255 - T.after[u][p] * 2.55) + ")";

                ctx.fillRect(2 + u * size, 2 + p * size, size - 1, size - 1);  
               
            }
        }
        //debugger;

       
    }

}


