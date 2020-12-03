import json
from flask import Flask, request
from flask_cors import cross_origin
import soundfile as sf
from synthesize import VoiceGen

app = Flask(__name__)

port = 'http://0.0.0.0:3000'

@app.route('/result', methods=['GET', 'POST'])
@cross_origin(origin=port, headers=['Content- Type', 'application/json'])
def result():
    if request.method == 'GET':
        query = request.args.get('query', None) #text
        if query:
            data = "We got your query:" + query
            finish_work(query)
            return json.dumps(data)
        return "No place information is given"


@app.route('/record', methods=['POST'])
@cross_origin(origin=port, headers=['Content- Type', 'multipart/form-data'])
def voice_result():
    if request.method == 'POST':
        file = request.files["voice"]
        with open("../public/audio.wav", "wb") as aud:
            aud_stream = file.read()
            aud.write(aud_stream)
            aud.close()
        if file:
            data = "Successfully recorded!"
            return json.dumps(data)
        return "Bad request..."


def finish_work(str):
    generator = VoiceGen()
    embeding = generator.encode()
    result, samplerate = generator.generate(str, embeding)
    sf.write("result.wav", result, samplerate)

if __name__ == '__main__':
    app.run(debug=True)
