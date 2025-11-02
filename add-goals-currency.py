import json
import os

# Translations for goals.currency
translations = {
    'vi': 'Mệnh giá',
    'zh': '货币',
    'de': 'Währung',
    'es': 'Moneda',
    'fr': 'Devise',
    'ja': '通貨',
    'ko': '통화',
    'pt': 'Moeda',
    'ru': 'Валюта'
}

frontend_path = 'frontend/src/i18n/locales'

print('💰 Adding goals.currency translations...')

for lang, translation in translations.items():
    file_path = os.path.join(frontend_path, f'{lang}.json')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Add currency after targetAmount in goals section
    if 'goals' in data:
        goals = data['goals']
        new_goals = {}
        
        for key, value in goals.items():
            new_goals[key] = value
            if key == 'targetAmount':
                new_goals['currency'] = translation
        
        data['goals'] = new_goals
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f'✅ Updated {lang}.json')

print('✨ Goals currency translations added!')
