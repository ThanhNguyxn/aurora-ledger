import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dashboardTranslations = {
  zh: {
    savings: "储蓄",
    netWorth: "净资产",
    weeklyIncome: "每周收入",
    weeklyExpense: "每周支出",
    monthlySavings: "每月储蓄",
    savingsRate: "储蓄率",
    financialHealth: "财务健康",
    healthScore: "健康评分",
    outOf100: "满分100",
    lastWeek: "上周",
    thisWeek: "本周",
    change: "变化",
    increase: "增加",
    decrease: "减少",
    goalsSaved: "目标储蓄",
    budgetRemaining: "剩余预算",
    upcomingRecurring: "即将到来的定期交易",
    goalsNearDeadline: "临近截止日期的目标",
    transactionCount: "笔交易"
  },
  ja: {
    savings: "貯蓄",
    netWorth: "純資産",
    weeklyIncome: "週間収入",
    weeklyExpense: "週間支出",
    monthlySavings: "月間貯蓄",
    savingsRate: "貯蓄率",
    financialHealth: "財務健全性",
    healthScore: "健全性スコア",
    outOf100: "100点満点",
    lastWeek: "先週",
    thisWeek: "今週",
    change: "変化",
    increase: "増加",
    decrease: "減少",
    goalsSaved: "目標貯蓄額",
    budgetRemaining: "予算残高",
    upcomingRecurring: "今後の定期取引",
    goalsNearDeadline: "期限間近の目標",
    transactionCount: "件の取引"
  },
  ko: {
    savings: "저축",
    netWorth: "순자산",
    weeklyIncome: "주간 수입",
    weeklyExpense: "주간 지출",
    monthlySavings: "월간 저축",
    savingsRate: "저축률",
    financialHealth: "재무 건강",
    healthScore: "건강 점수",
    outOf100: "100점 만점",
    lastWeek: "지난주",
    thisWeek: "이번주",
    change: "변화",
    increase: "증가",
    decrease: "감소",
    goalsSaved: "목표 저축액",
    budgetRemaining: "남은 예산",
    upcomingRecurring: "예정된 정기 거래",
    goalsNearDeadline: "마감일이 가까운 목표",
    transactionCount: "거래"
  },
  es: {
    savings: "Ahorros",
    netWorth: "Patrimonio neto",
    weeklyIncome: "Ingresos semanales",
    weeklyExpense: "Gastos semanales",
    monthlySavings: "Ahorros mensuales",
    savingsRate: "Tasa de ahorro",
    financialHealth: "Salud financiera",
    healthScore: "Puntuación de salud",
    outOf100: "sobre 100",
    lastWeek: "Semana pasada",
    thisWeek: "Esta semana",
    change: "cambio",
    increase: "aumento",
    decrease: "disminución",
    goalsSaved: "Ahorros de objetivos",
    budgetRemaining: "Presupuesto restante",
    upcomingRecurring: "Transacciones recurrentes próximas",
    goalsNearDeadline: "Objetivos cerca del plazo",
    transactionCount: "transacciones"
  },
  fr: {
    savings: "Économies",
    netWorth: "Valeur nette",
    weeklyIncome: "Revenus hebdomadaires",
    weeklyExpense: "Dépenses hebdomadaires",
    monthlySavings: "Économies mensuelles",
    savingsRate: "Taux d'épargne",
    financialHealth: "Santé financière",
    healthScore: "Score de santé",
    outOf100: "sur 100",
    lastWeek: "Semaine dernière",
    thisWeek: "Cette semaine",
    change: "changement",
    increase: "augmentation",
    decrease: "diminution",
    goalsSaved: "Objectifs économisés",
    budgetRemaining: "Budget restant",
    upcomingRecurring: "Transactions récurrentes à venir",
    goalsNearDeadline: "Objectifs proches de l'échéance",
    transactionCount: "transactions"
  },
  de: {
    savings: "Ersparnisse",
    netWorth: "Nettovermögen",
    weeklyIncome: "Wöchentliches Einkommen",
    weeklyExpense: "Wöchentliche Ausgaben",
    monthlySavings: "Monatliche Ersparnisse",
    savingsRate: "Sparquote",
    financialHealth: "Finanzielle Gesundheit",
    healthScore: "Gesundheitswert",
    outOf100: "von 100",
    lastWeek: "Letzte Woche",
    thisWeek: "Diese Woche",
    change: "Änderung",
    increase: "Zunahme",
    decrease: "Abnahme",
    goalsSaved: "Zielersparnisse",
    budgetRemaining: "Verbleibendes Budget",
    upcomingRecurring: "Kommende wiederkehrende Transaktionen",
    goalsNearDeadline: "Ziele nahe der Frist",
    transactionCount: "Transaktionen"
  },
  pt: {
    savings: "Poupança",
    netWorth: "Patrimônio líquido",
    weeklyIncome: "Renda semanal",
    weeklyExpense: "Despesas semanais",
    monthlySavings: "Poupança mensal",
    savingsRate: "Taxa de poupança",
    financialHealth: "Saúde financeira",
    healthScore: "Pontuação de saúde",
    outOf100: "de 100",
    lastWeek: "Semana passada",
    thisWeek: "Esta semana",
    change: "mudança",
    increase: "aumento",
    decrease: "diminuição",
    goalsSaved: "Objetivos poupados",
    budgetRemaining: "Orçamento restante",
    upcomingRecurring: "Transações recorrentes próximas",
    goalsNearDeadline: "Objetivos perto do prazo",
    transactionCount: "transações"
  },
  ru: {
    savings: "Сбережения",
    netWorth: "Чистые активы",
    weeklyIncome: "Недельный доход",
    weeklyExpense: "Недельные расходы",
    monthlySavings: "Месячные сбережения",
    savingsRate: "Норма сбережений",
    financialHealth: "Финансовое здоровье",
    healthScore: "Показатель здоровья",
    outOf100: "из 100",
    lastWeek: "Прошлая неделя",
    thisWeek: "Эта неделя",
    change: "изменение",
    increase: "увеличение",
    decrease: "уменьшение",
    goalsSaved: "Сбережения по целям",
    budgetRemaining: "Остаток бюджета",
    upcomingRecurring: "Предстоящие регулярные транзакции",
    goalsNearDeadline: "Цели с приближающимся сроком",
    transactionCount: "транзакций"
  }
};

const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');

Object.entries(dashboardTranslations).forEach(([lang, translations]) => {
  const filePath = path.join(localesDir, `${lang}.json`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    // Add new translations to dashboard section
    if (data.dashboard) {
      Object.assign(data.dashboard, translations);
    }
    
    // Write back with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`✅ Updated ${lang}.json`);
  } catch (error) {
    console.error(`❌ Error updating ${lang}.json:`, error.message);
  }
});

console.log('\n🎉 Dashboard i18n translations added successfully!');
