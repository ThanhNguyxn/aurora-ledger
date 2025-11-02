import json
import os

# Translations for setPasswordPlaceholder
translations = {
    'vi': 'Đặt mật khẩu của bạn',
    'zh': '设置您的密码',
    'de': 'Setze dein Passwort',
    'es': 'Establece tu contraseña',
    'fr': 'Définissez votre mot de passe',
    'ja': 'パスワードを設定',
    'ko': '비밀번호 설정',
    'pt': 'Defina sua senha',
    'ru': 'Установите ваш пароль'
}

frontend_path = 'frontend/src/i18n/locales'

print('🔐 Adding profile translations...')

for lang, translation in translations.items():
    file_path = os.path.join(frontend_path, f'{lang}.json')
    
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Add setPasswordPlaceholder after newPassword in profile section
    if 'profile' in data:
        # Create new ordered dict to maintain order
        profile = data['profile']
        new_profile = {}
        
        for key, value in profile.items():
            new_profile[key] = value
            if key == 'newPassword':
                new_profile['setPasswordPlaceholder'] = translation
        
        data['profile'] = new_profile
        
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f'✅ Updated {lang}.json')

print('✨ Profile translations added!')
