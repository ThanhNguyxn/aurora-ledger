#!/usr/bin/env python3
"""
Automated i18n Translation Script for Aurora Ledger
Translates English strings to 9 languages using Google Translate API
"""

import json
import os
from pathlib import Path
from googletrans import Translator
import time

# Language codes
LANGUAGES = {
    'vi': 'Vietnamese',
    'zh': 'Chinese (Simplified)',
    'de': 'German',
    'es': 'Spanish',
    'fr': 'French',
    'ja': 'Japanese',
    'ko': 'Korean',
    'pt': 'Portuguese',
    'ru': 'Russian'
}

def translate_text(text, translator, target_lang):
    """Translate a single text string"""
    try:
        # Skip if contains placeholders
        if '{{' in text or '}}' in text or '{' in text or '}' in text:
            return text
        
        result = translator.translate(text, dest=target_lang, src='en')
        time.sleep(0.2)  # Rate limiting
        return result.text
    except Exception as e:
        print(f"    ✗ Error: {e}")
        return text

def translate_nested(data, translator, target_lang, path=""):
    """Recursively translate nested dictionary"""
    if isinstance(data, dict):
        result = {}
        for key, value in data.items():
            current_path = f"{path}.{key}" if path else key
            result[key] = translate_nested(value, translator, target_lang, current_path)
        return result
    elif isinstance(data, str):
        translated = translate_text(data, translator, target_lang)
        if translated != data:
            print(f"    ✓ {path}: '{data[:40]}...' → '{translated[:40]}...'")
        return translated
    else:
        return data

def main():
    print("🌍 Aurora Ledger i18n Translation Tool\n")
    
    # Paths
    locales_dir = Path('frontend/src/i18n/locales')
    en_file = locales_dir / 'en.json'
    
    if not en_file.exists():
        print(f"❌ Error: {en_file} not found!")
        return
    
    # Load English translations
    print(f"📖 Loading English translations from {en_file}")
    with open(en_file, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    total_keys = sum(1 for _ in json.dumps(en_data).split('"'))
    print(f"   Found {total_keys} text strings\n")
    
    # Initialize translator
    translator = Translator()
    
    # Translate to each language
    for lang_code, lang_name in LANGUAGES.items():
        print(f"🔄 Translating to {lang_name} ({lang_code})...")
        
        target_file = locales_dir / f'{lang_code}.json'
        
        # Translate
        translated_data = translate_nested(en_data, translator, lang_code)
        
        # Save translations
        with open(target_file, 'w', encoding='utf-8') as f:
            json.dump(translated_data, f, ensure_ascii=False, indent=2)
        
        print(f"  ✅ Saved to {target_file}\n")
    
    print("🎉 Translation completed for all 9 languages!")
    print(f"� Output directory: {locales_dir.absolute()}")

if __name__ == '__main__':
    main()
