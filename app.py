import json
from flask import Flask, request, render_template
import soundfile as sf
from synthesize import VoiceGen

app = Flask(__name__)


@app.route('/result', methods=['GET'])
def result():
    if request.method == 'GET':
        query = request.args.get('query', None)
        if query:
            data = "We got your query:" + query
            finish_work(query)
            return json.dumps(data)
        return "No place information is given"


@app.route('/record', methods=['POST'])
def voice_result():
    if request.method == 'POST':
        file = request.files["voice"]
        with open("static/recordings/recording.wav", "wb") as aud:
            aud_stream = file.read()
            aud.write(aud_stream)
            aud.close()
        if file:
            data = "Successfully recorded!"
            return json.dumps(data)
        return "Bad request..."


@app.route('/', methods=['GET'])
def render():
    return render_template('index.html')

def finish_work(str):
    generator = VoiceGen()
    embeding = generator.encode()
    result, samplerate = generator.generate(str, embeding)
    sf.write("/static/recordings/result.wav", result, samplerate)


if __name__ == '__main__':
    app.run(debug=True)
