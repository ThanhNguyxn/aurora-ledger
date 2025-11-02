import json
import os

# Translations for new budget keys
translations = {
    'vi': {
        'editBudget': 'Chỉnh sửa Ngân sách',
        'budgetUpdated': 'Cập nhật ngân sách thành công'
    },
    'zh': {
        'editBudget': '编辑预算',
        'budgetUpdated': '预算更新成功'
    },
    'de': {
        'editBudget': 'Budget bearbeiten',
        'budgetUpdated': 'Budget erfolgreich aktualisiert'
    },
    'es': {
        'editBudget': 'Editar Presupuesto',
        'budgetUpdated': 'Presupuesto actualizado exitosamente'
    },
    'fr': {
        'editBudget': 'Modifier le Budget',
        'budgetUpdated': 'Budget mis à jour avec succès'
    },
    'ja': {
        'editBudget': '予算を編集',
        'budgetUpdated': '予算が正常に更新されました'
    },
    'ko': {
        'editBudget': '예산 편집',
        'budgetUpdated': '예산이 성공적으로 업데이트되었습니다'
    },
    'pt': {
        'editBudget': 'Editar Orçamento',
        'budgetUpdated': 'Orçamento atualizado com sucesso'
    },
    'ru': {
        'editBudget': 'Редактировать Бюджет',
        'budgetUpdated': 'Бюджет успешно обновлен'
    }
}

locales_dir = 'frontend/src/i18n/locales'

print('🌍 Adding budget edit translations...\n')

for lang, trans in translations.items():
    file_path = os.path.join(locales_dir, f'{lang}.json')
    
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        if 'budgets' in data:
            # Add after setBudget
            budgets_data = data['budgets']
            new_budgets = {}
            
            for key, value in budgets_data.items():
                new_budgets[key] = value
                if key == 'setBudget':
                    new_budgets['editBudget'] = trans['editBudget']
                elif key == 'budgetSet':
                    new_budgets['budgetUpdated'] = trans['budgetUpdated']
            
            data['budgets'] = new_budgets
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            
            print(f'✅ Updated {lang}.json')
            print(f'   - editBudget: "{trans["editBudget"]}"')
            print(f'   - budgetUpdated: "{trans["budgetUpdated"]}"')
        else:
            print(f'⚠️  No budgets section in {lang}.json')
    else:
        print(f'❌ File not found: {file_path}')
    
    print()

print('✨ All budget translations added!')
