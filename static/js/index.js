
 const sendQuery = () => {

        const data = document.getElementById("data-textarea").value;

        let dataField = document.getElementById("data-query-result");
        console.log(dataField)
        if (data.length === 0 ){
            dataField.innerHTML = "Fill in data!"
            return false;
        }

        const url = `http://127.0.0.1:5000/result?query=${data}`;
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(result => result.json())
            .then(data => console.log(data))
            .then( () =>
                dataField.innerHTML = "Success!"
            )
            .then(() =>
                 window.location.reload()
            )

            .catch(e => console.log(e));
    };

 record = () => {
   let dataField = document.getElementById("data-recording-result");
   let stopButton = document.getElementById("stop-recording-button");
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            let audioChunks = [];

            dataField.innerHTML = "Recording..."

            mediaRecorder.addEventListener("dataavailable", function (event) {
                audioChunks.push(event.data);
            });

            stopButton.onclick = () => {
                mediaRecorder.stop();
                dataField.innerHTML = "Your voice is recorded!";
            };

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, {
                    type: "audio/wav"
                });

                let fd = new FormData();
                fd.append("voice", audioBlob);
                sendVoice(fd);
                audioChunks = [];
            });
        });
    };

const sendVoice = form => {
        const url = "http://127.0.0.1:5000/record";
        fetch(url, {
            method: "POST",
            body: form,
            contentType: "multipart/form-data"
        })
            .then(data => data.json())
            .then(data => console.log(data))
            .then(data =>
                window.location.reload()
            )
            //.then(data =>  document.getElementsByTagName("audio")[0].style.display = "block")
            //.then(record => )
            .catch(e => console.log(e));
    };



var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{

  if ( $===undefined ) return;

var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}

setInterval(updateGradient,10);
