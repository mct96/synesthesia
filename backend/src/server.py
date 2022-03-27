import librosa as rs
import librosa.display
import librosa.filters
import matplotlib.pyplot as plt
import numpy as np

from flask import Flask, request, send_file
from flask_cors import CORS
import tempfile

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['GET', 'POST'])
def read_file():
    graphic_type = request.args.get('graphic-type')
    print(graphic_type)
    print(request.files)
    #return "Ok"
    request.files["music"].save("/storage/music.mp3")
    figure = do_work("/storage/music.mp3", graphic_type)
    response = send_file(figure, mimetype="image/jpeg")
    return response


def load_music(filename):
    y, sr = rs.load(filename)
    print(f"sampling rate is {sr} and size if {len(y)}")
    print(f"duration is {rs.get_duration(y, sr)}")
    return y, sr


def plot(y, sr, graph_type):
    fig, ax = plt.subplots()
    figure = tempfile.TemporaryFile()
    signal = librosa.stft(y)
    D = rs.amplitude_to_db(np.abs(signal), ref=np.max)
    if graph_type == "spec":
        rs.display.specshow(D, y_axis='linear', x_axis='time', sr=sr, ax=ax)
    else:
        rs.display.waveshow(y, sr=sr, marker='.', label='Full signal', ax=ax)
    fig.savefig(figure, dpi=100)
    figure.seek(0)
    return figure

def do_work(filename, graph_type):    
    y, sr = load_music(filename)
    figure = plot(y, sr, graph_type)
    return figure
    
def main():
    
    y, sr = load_music("cornfield_chase.mp3")
    plot(y, sr)


if __name__ == "__main__":
    main()
