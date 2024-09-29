const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1289835342295466047/136Wnyym62qc4GjkK4N0PzVbfLhpUu3Rghzj_q-hiEEzFy80suSYNtxl7Kuqc8Xm5Wk5';

app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send', async (req, res) => {
    const { songName, musicId } = req.body;

    const embed = {
        embeds: [{
            title: `Song: ${songName}`,
            description: `ID: ${musicId}`,
            footer: {
                text: "Powered by: @nozcy.int & @.skippyberenz."
            }
        }]
    };

    try {
        const response = await axios.post(WEBHOOK_URL, embed, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 204) {
            return res.status(200).json({ message: "Music ID sent successfully!" });
        } else {
            return res.status(500).json({ message: "Failed to send music ID." });
        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to send music ID." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
