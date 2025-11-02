import json
import os

# Translations for transaction currency keys
translations = {
    'vi': {
        'transactionCurrency': 'Mệnh giá Giao dịch',
        'willConvert': 'Sẽ được quy đổi sang mệnh giá hiển thị của bạn'
    },
    'zh': {
        'transactionCurrency': '交易货币',
        'willConvert': '将转换为您的显示货币'
    },
    'de': {
        'transactionCurrency': 'Transaktionswährung',
        'willConvert': 'Wird in Ihre Anzeigewährung umgerechnet'
    },
    'es': {
        'transactionCurrency': 'Moneda de Transacción',
        'willConvert': 'Se convertirá a su moneda de visualización'
    },
    'fr': {
        'transactionCurrency': 'Devise de Transaction',
        'willConvert': 'Sera converti dans votre devise d\'affichage'
    },
    'ja': {
        'transactionCurrency': '取引通貨',
        'willConvert': '表示通貨に変換されます'
    },
    'ko': {
        'transactionCurrency': '거래 통화',
        'willConvert': '표시 통화로 변환됩니다'
    },
    'pt': {
        'transactionCurrency': 'Moeda da Transação',
        'willConvert': 'Será convertido para sua moeda de exibição'
    },
    'ru': {
        'transactionCurrency': 'Валюта Транзакции',
        'willConvert': 'Будет конвертирован в вашу валюту отображения'
    }
}

locales_dir = 'frontend/src/i18n/locales'

print('🌍 Adding transaction currency translations...\n')

for lang, trans in translations.items():
    file_path = os.path.join(locales_dir, f'{lang}.json')
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if 'transactions' in data:
            # Add after optional
            trans_data = data['transactions']
            new_trans = {}
            
            for key, value in trans_data.items():
                new_trans[key] = value
                if key == 'optional':
                    new_trans['transactionCurrency'] = trans['transactionCurrency']
                    new_trans['willConvert'] = trans['willConvert']
            
            data['transactions'] = new_trans
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f'✅ Updated {lang}.json')
            print(f'   - transactionCurrency: "{trans["transactionCurrency"]}"')
            print(f'   - willConvert: "{trans["willConvert"]}"')
        else:
            print(f'⚠️  No transactions section in {lang}.json')
    else:
        print(f'❌ File not found: {file_path}')
    
    print()

print('✨ All transaction currency translations added!')
