const fs = require('fs');
const path = require('path');

const translations = {
  zh: {
    unlimitedUsesHelp: "留空表示不限使用次数",
    noExpirationHelp: "留空表示无过期时间",
    pendingInvitation: "待确认邀请",
    roleTransferDescription: "转移领导权（您将成为管理员）",
    managerRoleDescription: "可以管理预算和成员",
    contributorRoleDescription: "可以添加交易",
    observerRoleDescription: "仅查看"
  },
  de: {
    unlimitedUsesHelp: "Leer lassen für unbegrenzte Nutzungen",
    noExpirationHelp: "Leer lassen für kein Ablaufdatum",
    pendingInvitation: "Ausstehende Einladung",
    roleTransferDescription: "Führung übertragen (Sie werden Manager)",
    managerRoleDescription: "Kann Budgets und Mitglieder verwalten",
    contributorRoleDescription: "Kann Transaktionen hinzufügen",
    observerRoleDescription: "Nur Ansicht"
  },
  es: {
    unlimitedUsesHelp: "Dejar vacío para usos ilimitados",
    noExpirationHelp: "Dejar vacío sin fecha de vencimiento",
    pendingInvitation: "Invitación pendiente",
    roleTransferDescription: "Transferir liderazgo (te conviertes en Manager)",
    managerRoleDescription: "Puede administrar presupuestos y miembros",
    contributorRoleDescription: "Puede agregar transacciones",
    observerRoleDescription: "Solo ver"
  },
  fr: {
    unlimitedUsesHelp: "Laisser vide pour utilisations illimitées",
    noExpirationHelp: "Laisser vide pour pas d'expiration",
    pendingInvitation: "Invitation en attente",
    roleTransferDescription: "Transférer le leadership (vous devenez Manager)",
    managerRoleDescription: "Peut gérer les budgets et les membres",
    contributorRoleDescription: "Peut ajouter des transactions",
    observerRoleDescription: "Voir seulement"
  },
  ja: {
    unlimitedUsesHelp: "空白のままにすると無制限になります",
    noExpirationHelp: "空白のままにすると期限なしになります",
    pendingInvitation: "保留中の招待",
    roleTransferDescription: "リーダーシップの移譲（あなたはマネージャーになります）",
    managerRoleDescription: "予算とメンバーを管理できます",
    contributorRoleDescription: "取引を追加できます",
    observerRoleDescription: "表示のみ"
  },
  ko: {
    unlimitedUsesHelp: "무제한 사용을 원하면 비워두세요",
    noExpirationHelp: "만료 없음을 원하면 비워두세요",
    pendingInvitation: "대기 중인 초대",
    roleTransferDescription: "리더십 이전 (당신은 관리자가 됩니다)",
    managerRoleDescription: "예산 및 회원 관리 가능",
    contributorRoleDescription: "거래 추가 가능",
    observerRoleDescription: "보기 전용"
  },
  pt: {
    unlimitedUsesHelp: "Deixe vazio para usos ilimitados",
    noExpirationHelp: "Deixe vazio para sem expiração",
    pendingInvitation: "Convite pendente",
    roleTransferDescription: "Transferir liderança (você se torna Gerente)",
    managerRoleDescription: "Pode gerenciar orçamentos e membros",
    contributorRoleDescription: "Pode adicionar transações",
    observerRoleDescription: "Apenas visualizar"
  },
  ru: {
    unlimitedUsesHelp: "Оставьте пустым для неограниченного использования",
    noExpirationHelp: "Оставьте пустым для бессрочного",
    pendingInvitation: "Ожидающее приглашение",
    roleTransferDescription: "Передать лидерство (вы станете менеджером)",
    managerRoleDescription: "Может управлять бюджетами и участниками",
    contributorRoleDescription: "Может добавлять транзакции",
    observerRoleDescription: "Только просмотр"
  }
};

const localesDir = path.join(__dirname, 'src', 'i18n', 'locales');

Object.keys(translations).forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    
    // Add new translations to inviteCode section
    if (data.family && data.family.inviteCode) {
      data.family.inviteCode = {
        ...data.family.inviteCode,
        ...translations[lang]
      };
      
      // Write back with pretty formatting
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
      console.log(`✅ Updated ${lang}.json`);
    } else {
      console.log(`⚠️  ${lang}.json: family.inviteCode section not found`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${lang}.json:`, error.message);
  }
});

console.log('\n✨ Translation update complete!');

