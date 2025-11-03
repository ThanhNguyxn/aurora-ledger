const fs = require('fs');
const path = require('path');

const newTranslations = {
  zh: {
    testRecurringNow: "立即测试定期交易",
    testRecurringDesc: "立即处理到期的定期交易（通常在凌晨00:05运行）",
    runNow: "立即运行",
    noRecurring: "暂无定期交易",
    addFirstRecurring: "添加第一个定期交易",
    next: "下次",
    ends: "结束",
    processed: "定期交易处理成功！"
  },
  de: {
    testRecurringNow: "Wiederkehrend jetzt testen",
    testRecurringDesc: "Fällige wiederkehrende Transaktionen sofort verarbeiten (läuft normalerweise um 00:05 Uhr)",
    runNow: "Jetzt ausführen",
    noRecurring: "Noch keine wiederkehrenden Transaktionen",
    addFirstRecurring: "Erste wiederkehrende Transaktion hinzufügen",
    next: "Nächste",
    ends: "Endet",
    processed: "Wiederkehrende Transaktionen erfolgreich verarbeitet!"
  },
  es: {
    testRecurringNow: "Probar recurrente ahora",
    testRecurringDesc: "Procesar transacciones recurrentes vencidas inmediatamente (normalmente se ejecuta a las 00:05)",
    runNow: "Ejecutar ahora",
    noRecurring: "Aún no hay transacciones recurrentes",
    addFirstRecurring: "Añadir primera transacción recurrente",
    next: "Siguiente",
    ends: "Termina",
    processed: "¡Transacciones recurrentes procesadas con éxito!"
  },
  fr: {
    testRecurringNow: "Tester récurrent maintenant",
    testRecurringDesc: "Traiter immédiatement les transactions récurrentes dues (s'exécute normalement à 00h05)",
    runNow: "Exécuter maintenant",
    noRecurring: "Aucune transaction récurrente pour le moment",
    addFirstRecurring: "Ajouter la première transaction récurrente",
    next: "Suivant",
    ends: "Se termine",
    processed: "Transactions récurrentes traitées avec succès !"
  },
  ja: {
    testRecurringNow: "今すぐ定期取引をテスト",
    testRecurringDesc: "期限の来た定期取引を即座に処理（通常は午前00:05に実行）",
    runNow: "今すぐ実行",
    noRecurring: "定期取引はまだありません",
    addFirstRecurring: "最初の定期取引を追加",
    next: "次回",
    ends: "終了",
    processed: "定期取引の処理に成功しました！"
  },
  ko: {
    testRecurringNow: "지금 반복 거래 테스트",
    testRecurringDesc: "만기 반복 거래를 즉시 처리 (일반적으로 00:05에 실행)",
    runNow: "지금 실행",
    noRecurring: "아직 반복 거래가 없습니다",
    addFirstRecurring: "첫 번째 반복 거래 추가",
    next: "다음",
    ends: "종료",
    processed: "반복 거래가 성공적으로 처리되었습니다!"
  },
  pt: {
    testRecurringNow: "Testar recorrente agora",
    testRecurringDesc: "Processar transações recorrentes vencidas imediatamente (normalmente executa às 00:05)",
    runNow: "Executar agora",
    noRecurring: "Ainda não há transações recorrentes",
    addFirstRecurring: "Adicionar primeira transação recorrente",
    next: "Próximo",
    ends: "Termina",
    processed: "Transações recorrentes processadas com sucesso!"
  },
  ru: {
    testRecurringNow: "Тестировать повторяющиеся сейчас",
    testRecurringDesc: "Обработать просроченные повторяющиеся транзакции немедленно (обычно выполняется в 00:05)",
    runNow: "Запустить сейчас",
    noRecurring: "Пока нет повторяющихся транзакций",
    addFirstRecurring: "Добавить первую повторяющуюся транзакцию",
    next: "Далее",
    ends: "Заканчивается",
    processed: "Повторяющиеся транзакции успешно обработаны!"
  }
};

const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');

// Update each language file
Object.keys(newTranslations).forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Add new translations to recurring section
    if (data.recurring) {
      data.recurring = {
        ...data.recurring,
        ...newTranslations[lang]
      };
      
      // Write back with pretty formatting
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`✅ Updated ${lang}.json`);
    } else {
      console.log(`⚠️  ${lang}.json: recurring section not found`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${lang}.json:`, error.message);
  }
});

console.log('\n✨ Recurring translations update complete!');
console.log('Updated 8 languages: zh, de, es, fr, ja, ko, pt, ru');

