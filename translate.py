#!/usr/bin/env python3
import json
from pathlib import Path
from deep_translator import GoogleTranslator
import time

LANGUAGES = {'vi': 'vi', 'zh': 'zh-CN', 'de': 'de', 'es': 'es', 'fr': 'fr', 'ja': 'ja', 'ko': 'ko', 'pt': 'pt', 'ru': 'ru'}

def translate_text(text, target_lang):
    try:
        if '{{' in text or '}}' in text or not text.strip():
            return text
        translator = GoogleTranslator(source='en', target=target_lang)
        result = translator.translate(text)
        time.sleep(0.3)
        return result
    except:
        return text

def translate_nested(data, target_lang):
    if isinstance(data, dict):
        return {k: translate_nested(v, target_lang) for k, v in data.items()}
    elif isinstance(data, str):
        return translate_text(data, target_lang)
    return data

def main():
    locales_dir = Path('frontend/src/i18n/locales')
    with open(locales_dir / 'en.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    for lang_code, google_code in LANGUAGES.items():
        print(f"Translating {lang_code}...")
        translated = translate_nested(en_data, google_code)
        with open(locales_dir / f'{lang_code}.json', 'w', encoding='utf-8') as f:
            json.dump(translated, f, ensure_ascii=False, indent=2)
        print(f"  Done: {lang_code}.json\n")
    
    print("Completed!")

if __name__ == '__main__':
    main()
