import "./App.css";
import React from "react";

class App extends React.Component {
    data = data => (this._data = data);
    stopButton = stopButton => (this._stopButton = stopButton);

    constructor() {
        super();
        this.state = {
            data: ""
        };
    }

    sendVoice = form => {
        const url = "http://0.0.0.0:5000/record";
        fetch(url, {
            method: "POST",
            body: form,
            contentType: "multipart/form-data"
        })
            .then(data => data.json())
            .then(record => this.setState({ data: record }))
            .catch(e => console.log(e));
    };

    send = () => {
        if (this._data.value.length === 0) {
            this.setState({ data: "Fill in data!" });
            return false;
        }
        this.setState({ data: "Sending data..." });
        const url = "http://0.0.0.0:5000/result?query="+this._data.value;
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then(result => result.json())
            .then(data => this.setState({ data: data }))
            .catch(e => console.log(e));
    };

    record = () => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            let audioChunks = [];
            this.setState({ data: "Recording..." });
            mediaRecorder.addEventListener("dataavailable", function (event) {
                audioChunks.push(event.data);
            });

            this._stopButton.onclick = () => {
                mediaRecorder.stop();
                this.setState({ data: "Stop recording" });
            };

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks, {
                    type: "audio/wav"
                });

                let fd = new FormData();
                fd.append("voice", audioBlob);
                this.sendVoice(fd);
                audioChunks = [];
            });
        });
    };

    render() {
        return (

                <div className="recording">
                    <textarea placeholder="Give me some text here..." ref={this.data} />
                    <button onClick={this.send}>Send query</button>
                    <button onClick={this.record}>Record audio</button>
                    <button ref={this.stopButton}>Stop recording</button>
                    <h2>{this.state.data}</h2>
                    <audio controls={true} src="./audio.wav"/>
                </div>
        );
    }
}

export default App;
