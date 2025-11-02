import json
import os

# Translations for common pagination keys
translations = {
    'vi': {
        'showing': 'Hiển thị',
        'of': 'trên',
        'previous': 'Trước',
        'next': 'Tiếp',
        'currency': 'Mệnh giá',
        'date': 'Ngày',
        'note': 'Ghi chú',
        'amount': 'Số tiền'
    },
    'zh': {
        'showing': '显示',
        'of': '共',
        'previous': '上一页',
        'next': '下一页',
        'currency': '货币',
        'date': '日期',
        'note': '备注',
        'amount': '金额'
    },
    'de': {
        'showing': 'Zeige',
        'of': 'von',
        'previous': 'Zurück',
        'next': 'Weiter',
        'currency': 'Währung',
        'date': 'Datum',
        'note': 'Notiz',
        'amount': 'Betrag'
    },
    'es': {
        'showing': 'Mostrando',
        'of': 'de',
        'previous': 'Anterior',
        'next': 'Siguiente',
        'currency': 'Moneda',
        'date': 'Fecha',
        'note': 'Nota',
        'amount': 'Cantidad'
    },
    'fr': {
        'showing': 'Affichage',
        'of': 'sur',
        'previous': 'Précédent',
        'next': 'Suivant',
        'currency': 'Devise',
        'date': 'Date',
        'note': 'Note',
        'amount': 'Montant'
    },
    'ja': {
        'showing': '表示',
        'of': '/',
        'previous': '前へ',
        'next': '次へ',
        'currency': '通貨',
        'date': '日付',
        'note': 'メモ',
        'amount': '金額'
    },
    'ko': {
        'showing': '표시',
        'of': '중',
        'previous': '이전',
        'next': '다음',
        'currency': '통화',
        'date': '날짜',
        'note': '메모',
        'amount': '금액'
    },
    'pt': {
        'showing': 'Mostrando',
        'of': 'de',
        'previous': 'Anterior',
        'next': 'Próximo',
        'currency': 'Moeda',
        'date': 'Data',
        'note': 'Nota',
        'amount': 'Valor'
    },
    'ru': {
        'showing': 'Показано',
        'of': 'из',
        'previous': 'Назад',
        'next': 'Далее',
        'currency': 'Валюта',
        'date': 'Дата',
        'note': 'Примечание',
        'amount': 'Сумма'
    }
}

locales_dir = 'frontend/src/i18n/locales'

print('🌍 Adding common pagination translations...\n')

for lang, trans in translations.items():
    file_path = os.path.join(locales_dir, f'{lang}.json')
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if 'common' in data:
            # Add new keys to common section
            common_data = data['common']
            
            # Add new keys if they don't exist
            for key, value in trans.items():
                if key not in common_data:
                    common_data[key] = value
            
            data['common'] = common_data
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f'✅ Updated {lang}.json')
            print(f'   Added: showing, of, previous, next, currency, date, note, amount')
        else:
            print(f'⚠️  No common section in {lang}.json')
    else:
        print(f'❌ File not found: {file_path}')
    
    print()

print('✨ All common translations added!')
