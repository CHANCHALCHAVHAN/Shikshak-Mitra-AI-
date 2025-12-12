from flask import Flask, render_template, Response, jsonify
import cv2
import os
from pathlib import Path

app = Flask(__name__)

# Path to video file
VIDEO_PATH = Path(__file__).parent.parent / "AI Video Analyzer" / "output" / "output_accurate.mp4"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

def generate_frames():
    if not VIDEO_PATH.exists():
        # Return blank frame if video not found
        blank = cv2.imread(str(Path(__file__).parent / 'static' / 'no_video.jpg'))
        if blank is None:
            blank = cv2.imencode('.jpg', cv2.zeros((480, 640, 3), dtype='uint8'))[1].tobytes()
        else:
            blank = cv2.imencode('.jpg', blank)[1].tobytes()
        while True:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + blank + b'\r\n')
    
    cap = cv2.VideoCapture(str(VIDEO_PATH))
    
    while True:
        success, frame = cap.read()
        if not success:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)  # Loop video
            continue
        
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_info')
def video_info():
    if not VIDEO_PATH.exists():
        return jsonify({'status': 'not_found', 'message': 'Video file not found'})
    
    cap = cv2.VideoCapture(str(VIDEO_PATH))
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = frame_count / fps if fps > 0 else 0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    cap.release()
    
    return jsonify({
        'status': 'ok',
        'fps': fps,
        'duration': f"{int(duration // 60)}:{int(duration % 60):02d}",
        'resolution': f"{width}x{height}",
        'frames': frame_count
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
