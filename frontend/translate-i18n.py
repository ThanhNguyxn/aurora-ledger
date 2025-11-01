#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Auto-translate missing i18n keys for Aurora Ledger
Translates from English to all other languages
"""

import json
import os
from pathlib import Path

# Translation mappings for each language
TRANSLATIONS = {
    'vi': {
        # Budget translations
        'currencyInfo': 'Chọn đơn vị tiền tệ cho ngân sách này',
        'inputCurrencyNote': 'Chọn đơn vị tiền tệ để nhập (sẽ tự động quy đổi sang đơn vị hiển thị)',
        'conversionNote': 'Ví dụ',
        'conversionExample': 'Nếu bạn nhập 10 USD và đơn vị hiển thị là VND, nó sẽ được lưu dưới dạng ~260.000 VND (dựa trên tỷ giá hiện tại)',
        'conversionExplanation': 'Ngân sách của bạn sẽ được lưu bằng đơn vị tiền tệ đã chọn và tự động quy đổi sang đơn vị hiển thị khi xem.'
    },
    'zh': {
        'currencyInfo': '选择此预算的货币',
        'inputCurrencyNote': '选择输入货币（将自动转换为您的显示货币）',
        'conversionNote': '示例',
        'conversionExample': '如果您输入 10 美元，而您的显示货币是人民币，它将保存为 ~70 人民币（基于当前汇率）',
        'conversionExplanation': '您的预算将以所选货币保存，并在查看时自动转换为您的显示货币。'
    },
    'de': {
        'currencyInfo': 'Wählen Sie die Währung für dieses Budget',
        'inputCurrencyNote': 'Wählen Sie die Eingabewährung (wird automatisch in Ihre Anzeigewährung umgerechnet)',
        'conversionNote': 'Beispiel',
        'conversionExample': 'Wenn Sie 10 USD eingeben und Ihre Anzeigewährung EUR ist, wird es als ~9,20 EUR gespeichert (basierend auf dem aktuellen Wechselkurs)',
        'conversionExplanation': 'Ihr Budget wird in der ausgewählten Währung gespeichert und bei der Anzeige automatisch in Ihre Anzeigewährung umgerechnet.'
    },
    'es': {
        'currencyInfo': 'Elige la moneda para este presupuesto',
        'inputCurrencyNote': 'Seleccione la moneda de entrada (se convertirá automáticamente a su moneda de visualización)',
        'conversionNote': 'Ejemplo',
        'conversionExample': 'Si ingresa 10 USD y su moneda de visualización es EUR, se guardará como ~9,20 EUR (según el tipo de cambio actual)',
        'conversionExplanation': 'Su presupuesto se guardará en la moneda seleccionada y se convertirá automáticamente a su moneda de visualización al verlo.'
    },
    'fr': {
        'currencyInfo': 'Choisissez la devise pour ce budget',
        'inputCurrencyNote': 'Sélectionnez la devise de saisie (sera automatiquement convertie dans votre devise d\'affichage)',
        'conversionNote': 'Exemple',
        'conversionExample': 'Si vous saisissez 10 USD et que votre devise d\'affichage est EUR, il sera enregistré comme ~9,20 EUR (selon le taux de change actuel)',
        'conversionExplanation': 'Votre budget sera enregistré dans la devise sélectionnée et automatiquement converti dans votre devise d\'affichage lors de la consultation.'
    },
    'ja': {
        'currencyInfo': 'この予算の通貨を選択してください',
        'inputCurrencyNote': '入力通貨を選択（表示通貨に自動変換されます）',
        'conversionNote': '例',
        'conversionExample': '10 USDを入力し、表示通貨がJPYの場合、現在の為替レートに基づいて約1,485円として保存されます',
        'conversionExplanation': '予算は選択した通貨で保存され、表示時に表示通貨に自動的に変換されます。'
    },
    'ko': {
        'currencyInfo': '이 예산의 통화 선택',
        'inputCurrencyNote': '입력 통화 선택 (표시 통화로 자동 변환됩니다)',
        'conversionNote': '예시',
        'conversionExample': '10 USD를 입력하고 표시 통화가 KRW인 경우 현재 환율을 기준으로 약 13,000원으로 저장됩니다',
        'conversionExplanation': '예산은 선택한 통화로 저장되며 조회 시 표시 통화로 자동 변환됩니다.'
    },
    'pt': {
        'currencyInfo': 'Escolha a moeda para este orçamento',
        'inputCurrencyNote': 'Selecione a moeda de entrada (será convertida automaticamente para sua moeda de exibição)',
        'conversionNote': 'Exemplo',
        'conversionExample': 'Se você inserir 10 USD e sua moeda de exibição for BRL, será salvo como ~50 BRL (com base na taxa de câmbio atual)',
        'conversionExplanation': 'Seu orçamento será salvo na moeda selecionada e automaticamente convertido para sua moeda de exibição ao visualizar.'
    },
    'ru': {
        'currencyInfo': 'Выберите валюту для этого бюджета',
        'inputCurrencyNote': 'Выберите валюту ввода (будет автоматически конвертирована в вашу валюту отображения)',
        'conversionNote': 'Пример',
        'conversionExample': 'Если вы введете 10 USD, а ваша валюта отображения - RUB, это будет сохранено как ~920 RUB (на основе текущего курса)',
        'conversionExplanation': 'Ваш бюджет будет сохранен в выбранной валюте и автоматически конвертирован в вашу валюту отображения при просмотре.'
    }
}

def load_json(filepath):
    """Load JSON file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(filepath, data):
    """Save JSON file with proper formatting"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')  # Add newline at end

def translate_budgets():
    """Add missing budget translations to all languages"""
    locales_dir = Path(__file__).parent / 'src' / 'i18n' / 'locales'
    
    # English is the source
    en_path = locales_dir / 'en.json'
    en_data = load_json(en_path)
    
    # Add missing keys to English first
    if 'budgets' not in en_data:
        en_data['budgets'] = {}
    
    en_budgets = en_data['budgets']
    
    # Add missing English keys
    missing_keys = {
        'currencyInfo': 'Choose the currency for this budget',
        'inputCurrencyNote': 'Select currency for input (will auto-convert to your display currency)',
        'conversionNote': 'Example',
        'conversionExample': 'If you enter 10 USD and your display currency is VND, it will be saved as ~260,000 VND (based on current exchange rate)',
        'conversionExplanation': 'Your budget will be saved in the selected currency and automatically converted to your display currency when viewing.'
    }
    
    updated = False
    for key, value in missing_keys.items():
        if key not in en_budgets:
            en_budgets[key] = value
            updated = True
            print(f"✅ Added to en.json: budgets.{key}")
    
    if updated:
        save_json(en_path, en_data)
        print(f"✅ Updated en.json")
    
    # Translate to other languages
    for lang_code, translations in TRANSLATIONS.items():
        lang_path = locales_dir / f'{lang_code}.json'
        
        if not lang_path.exists():
            print(f"⚠️  {lang_code}.json not found, skipping")
            continue
        
        lang_data = load_json(lang_path)
        
        if 'budgets' not in lang_data:
            lang_data['budgets'] = {}
        
        lang_budgets = lang_data['budgets']
        
        # Add missing translations
        updated = False
        for key, translation in translations.items():
            if key not in lang_budgets:
                lang_budgets[key] = translation
                updated = True
                print(f"✅ Added to {lang_code}.json: budgets.{key}")
        
        if updated:
            save_json(lang_path, lang_data)
            print(f"✅ Updated {lang_code}.json")

if __name__ == '__main__':
    print("🌍 Starting i18n translation...")
    translate_budgets()
    print("✨ Translation complete!")
