from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

WEBHOOK_URL = 'https://discord.com/api/webhooks/1289835342295466047/136Wnyym62qc4GjkK4N0PzVbfLhpUu3Rghzj_q-hiEEzFy80suSYNtxl7Kuqc8Xm5Wk5'

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/send', methods=['POST'])
def send_music_id():
    data = request.get_json()
    song_name = data.get('songName')
    music_id = data.get('musicId')
    
    # Prepare the embed message
    embed = {
        "embeds": [{
            "title": f"Song: {song_name}",
            "description": f"ID: {music_id}",
            "footer": {
                "text": "Powered by: @nozcy.int & @.skippyberenz."
            }
        }]
    }

    response = requests.post(WEBHOOK_URL, data=json.dumps(embed), headers={'Content-Type': 'application/json'})

    if response.status_code == 204:
        return jsonify({"message": "Music ID sent successfully!"}), 200
    else:
        return jsonify({"message": "Failed to send music ID."}), 500

if __name__ == '__main__':
    app.run(debug=True)
