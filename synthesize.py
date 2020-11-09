from synthesizer.inference import Synthesizer
from encoder import inference as encoder
from vocoder import inference as vocoder
from pathlib import Path
import numpy as np
import librosa
import soundfile as sf
from IPython.utils import io


class VoiceGen:
    #Предобученные модели
    encoder_weights = Path("encoder/saved_models/pretrained.pt")
    vocoder_weights = Path("vocoder/saved_models/pretrained/pretrained.pt")
    syn_dir = Path("synthesizer/saved_models/logs-pretrained/taco_pretrained")
    
    

    #Кодировщик речи, аргумент - путь к файлу с записью речи
    def encode(self, sound = Path("audio.wav")):
        encoder.load_model(self.encoder_weights)
        reprocessed_wav = encoder.preprocess_wav(sound)
        original_wav, sampling_rate = librosa.load(sound)
        preprocessed_wav = encoder.preprocess_wav(original_wav, sampling_rate)
        embed = encoder.embed_utterance(preprocessed_wav)
        return embed
    #Синтезатор звука, аргументы - текст для генерации и файл кодировки
    def generate(self, text, embed):
        synthesizer = Synthesizer(self.syn_dir)
        vocoder.load_model(self.vocoder_weights)
        with io.capture_output() as captured:
            specs = synthesizer.synthesize_spectrograms([text], [embed])
        generated_wav = vocoder.infer_waveform(specs[0])
        generated_wav = np.pad(generated_wav, (0, synthesizer.sample_rate), mode="constant")
        return generated_wav, synthesizer.sample_rate


if __name__ == "__main__":
    generator = VoiceGen()
    embeding = generator.encode()
    result, samplerate = generator.generate("I feel fantastic hey hey hey", embeding)
    sf.write("result.wav", result, samplerate)