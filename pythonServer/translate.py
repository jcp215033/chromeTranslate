from flask import Flask, request, jsonify
from flask_cors import CORS
from googletrans import Translator

app = Flask(__name__)
CORS(app)
translator = Translator()


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    text_to_translate = data['text']
    src_lang = data['src']
    dest_lang = data['dest']
    translation = translator.translate(
        text_to_translate, src=src_lang, dest=dest_lang)
    return jsonify({'translatedText': translation.text})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
