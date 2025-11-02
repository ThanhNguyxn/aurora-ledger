import json
import os

# Translation map for "Priority" label
priority_labels = {
    'vi': 'Độ ưu tiên',
    'zh': '优先级',
    'de': 'Priorität',
    'es': 'Prioridad',
    'fr': 'Priorité',
    'ja': '優先度',
    'ko': '우선순위',
    'pt': 'Prioridade',
    'ru': 'Приоритет'
}

locales_dir = 'frontend/src/i18n/locales'

for lang, label in priority_labels.items():
    file_path = os.path.join(locales_dir, f'{lang}.json')
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Add priorityLabel after icon
        if 'goals' in data and 'priority' in data['goals']:
            # Create new dict with correct order
            goals_data = data['goals']
            new_goals = {}
            
            for key, value in goals_data.items():
                new_goals[key] = value
                if key == 'icon':
                    new_goals['priorityLabel'] = label
            
            data['goals'] = new_goals
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f'✅ Updated {lang}.json with priorityLabel: "{label}"')
    else:
        print(f'❌ File not found: {file_path}')

print('\n✨ All files updated!')
