#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Apply goals translations to all locale files
"""

import json
import os
from pathlib import Path

# Load goals translations
with open('goals-translations.json', 'r', encoding='utf-8') as f:
    goals_trans = json.load(f)

# Locale directory
locales_dir = Path('frontend/src/i18n/locales')

# Languages to translate
languages = ['vi', 'zh', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'ru']

print('🌍 Applying goals translations...')

for lang in languages:
    locale_file = locales_dir / f'{lang}.json'
    
    if not locale_file.exists():
        print(f'❌ {lang}.json not found')
        continue
    
    # Load existing translations
    with open(locale_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Add/update goals section
    if 'nav' in data and 'goals' not in data['nav']:
        data['nav']['goals'] = goals_trans[lang]['goals']
    
    # Add goals section
    data['goals'] = {k: v for k, v in goals_trans[lang].items() if k != 'goals'}
    
    # Save back
    with open(locale_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f'✅ Updated {lang}.json')

print('✨ All translations applied!')
