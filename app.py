from flask import Flask, request, send_from_directory, flash, redirect, url_for
import os
from spitfire_video_editing import *
from werkzeug.utils import secure_filename
import base64

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config['OUTPUT_FOLDER'] = 'output/'
app.config['ALLOWED_EXTENSIONS'] = {'mp4', 'avi'}

if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])
if not os.path.exists(app.config['OUTPUT_FOLDER']):
    os.makedirs(app.config['OUTPUT_FOLDER'])


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def save_mpeg_from_base64(base64_data, output_path):
    with open(output_path, 'wb') as f:
        f.write(base64.b64decode(base64_data))

def mp4_to_base64(file_path):
    with open(file_path, 'rb') as f:
        file_data = f.read()
        base64_data = base64.b64encode(file_data).decode('utf-8')
    return base64_data

@app.route('/create_video', methods=['POST'])
def create_video_api():
    data = request.get_json()

    first_speaker = data['rapper1']
    second_speaker = data['rapper2']
    audio_files = data['versesAudio']

    print(first_speaker)
    print(second_speaker)

    file_paths=[]
    w=0
    for i in range(len(audio_files)):
        if audio_files[i] is None:
            continue
        save_mpeg_from_base64(audio_files[i], f"audio/audio_{w}.mpeg")
        file_paths.append(f"audio_{w}.mpeg")
        w+=1

    # Call the create_video function
    create_video(file_paths, first_speaker, second_speaker)

    # Send back the final output.mp4
    # return send_from_directory(".", "output.mp4", as_attachment=True)
    binary = mp4_to_base64("output.mp4")
    # os.remove("output.mp4")
    return binary

if __name__ == '__main__':
    app.run()