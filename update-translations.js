const fs = require('fs');
const path = require('path');

const profileTranslations = {
  en: {
    nav: { profile: "Profile" },
    profile: {
      title: "Profile Settings",
      subtitle: "Manage your account settings and preferences",
      personalInfo: "Personal Information",
      fullName: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      email: "Email Address",
      emailPlaceholder: "Enter your email",
      updateProfile: "Update Profile",
      updating: "Updating...",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      passwordRequirement: "At least 6 characters",
      changePasswordBtn: "Change Password",
      changing: "Changing...",
      accountInfo: "Account Information",
      accountCreated: "Account Created",
      userId: "User ID",
      updateSuccess: "Profile updated successfully!",
      updateError: "Failed to update profile",
      passwordChanged: "Password changed successfully!",
      passwordChangeError: "Failed to change password",
      passwordMismatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 6 characters"
    }
  },
  zh: {
    nav: { profile: "个人资料" },
    profile: {
      title: "个人资料设置",
      subtitle: "管理您的账户设置和偏好",
      personalInfo: "个人信息",
      fullName: "全名",
      fullNamePlaceholder: "输入您的全名",
      email: "电子邮件地址",
      emailPlaceholder: "输入您的电子邮件",
      updateProfile: "更新资料",
      updating: "更新中...",
      changePassword: "更改密码",
      currentPassword: "当前密码",
      newPassword: "新密码",
      confirmPassword: "确认新密码",
      passwordRequirement: "至少6个字符",
      changePasswordBtn: "更改密码",
      changing: "更改中...",
      accountInfo: "账户信息",
      accountCreated: "账户创建时间",
      userId: "用户ID",
      updateSuccess: "资料更新成功！",
      updateError: "更新资料失败",
      passwordChanged: "密码更改成功！",
      passwordChangeError: "更改密码失败",
      passwordMismatch: "密码不匹配",
      passwordTooShort: "密码至少需要6个字符"
    }
  },
  es: {
    nav: { profile: "Perfil" },
    profile: {
      title: "Configuración del perfil",
      subtitle: "Administra la configuración de tu cuenta y preferencias",
      personalInfo: "Información personal",
      fullName: "Nombre completo",
      fullNamePlaceholder: "Ingresa tu nombre completo",
      email: "Dirección de correo electrónico",
      emailPlaceholder: "Ingresa tu correo electrónico",
      updateProfile: "Actualizar perfil",
      updating: "Actualizando...",
      changePassword: "Cambiar contraseña",
      currentPassword: "Contraseña actual",
      newPassword: "Nueva contraseña",
      confirmPassword: "Confirmar nueva contraseña",
      passwordRequirement: "Al menos 6 caracteres",
      changePasswordBtn: "Cambiar contraseña",
      changing: "Cambiando...",
      accountInfo: "Información de la cuenta",
      accountCreated: "Cuenta creada",
      userId: "ID de usuario",
      updateSuccess: "¡Perfil actualizado exitosamente!",
      updateError: "Error al actualizar perfil",
      passwordChanged: "¡Contraseña cambiada exitosamente!",
      passwordChangeError: "Error al cambiar contraseña",
      passwordMismatch: "Las contraseñas no coinciden",
      passwordTooShort: "La contraseña debe tener al menos 6 caracteres"
    }
  },
  fr: {
    nav: { profile: "Profil" },
    profile: {
      title: "Paramètres du profil",
      subtitle: "Gérez les paramètres de votre compte et les préférences",
      personalInfo: "Informations personnelles",
      fullName: "Nom complet",
      fullNamePlaceholder: "Entrez votre nom complet",
      email: "Adresse e-mail",
      emailPlaceholder: "Entrez votre e-mail",
      updateProfile: "Mettre à jour le profil",
      updating: "Mise à jour...",
      changePassword: "Changer le mot de passe",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le nouveau mot de passe",
      passwordRequirement: "Au moins 6 caractères",
      changePasswordBtn: "Changer le mot de passe",
      changing: "Changement...",
      accountInfo: "Informations sur le compte",
      accountCreated: "Compte créé",
      userId: "ID utilisateur",
      updateSuccess: "Profil mis à jour avec succès!",
      updateError: "Échec de la mise à jour du profil",
      passwordChanged: "Mot de passe changé avec succès!",
      passwordChangeError: "Échec du changement de mot de passe",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères"
    }
  },
  de: {
    nav: { profile: "Profil" },
    profile: {
      title: "Profileinstellungen",
      subtitle: "Verwalten Sie Ihre Kontoeinstellungen und Präferenzen",
      personalInfo: "Persönliche Informationen",
      fullName: "Vollständiger Name",
      fullNamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
      email: "E-Mail-Adresse",
      emailPlaceholder: "Geben Sie Ihre E-Mail ein",
      updateProfile: "Profil aktualisieren",
      updating: "Aktualisierung...",
      changePassword: "Passwort ändern",
      currentPassword: "Aktuelles Passwort",
      newPassword: "Neues Passwort",
      confirmPassword: "Neues Passwort bestätigen",
      passwordRequirement: "Mindestens 6 Zeichen",
      changePasswordBtn: "Passwort ändern",
      changing: "Änderung...",
      accountInfo: "Kontoinformationen",
      accountCreated: "Konto erstellt",
      userId: "Benutzer-ID",
      updateSuccess: "Profil erfolgreich aktualisiert!",
      updateError: "Profil konnte nicht aktualisiert werden",
      passwordChanged: "Passwort erfolgreich geändert!",
      passwordChangeError: "Passwort konnte nicht geändert werden",
      passwordMismatch: "Passwörter stimmen nicht überein",
      passwordTooShort: "Passwort muss mindestens 6 Zeichen lang sein"
    }
  },
  ja: {
    nav: { profile: "プロフィール" },
    profile: {
      title: "プロフィール設定",
      subtitle: "アカウント設定と設定を管理",
      personalInfo: "個人情報",
      fullName: "氏名",
      fullNamePlaceholder: "氏名を入力",
      email: "メールアドレス",
      emailPlaceholder: "メールアドレスを入力",
      updateProfile: "プロフィールを更新",
      updating: "更新中...",
      changePassword: "パスワードを変更",
      currentPassword: "現在のパスワード",
      newPassword: "新しいパスワード",
      confirmPassword: "新しいパスワードを確認",
      passwordRequirement: "6文字以上",
      changePasswordBtn: "パスワードを変更",
      changing: "変更中...",
      accountInfo: "アカウント情報",
      accountCreated: "アカウント作成日",
      userId: "ユーザーID",
      updateSuccess: "プロフィールが正常に更新されました！",
      updateError: "プロフィールの更新に失敗しました",
      passwordChanged: "パスワードが正常に変更されました！",
      passwordChangeError: "パスワードの変更に失敗しました",
      passwordMismatch: "パスワードが一致しません",
      passwordTooShort: "パスワードは6文字以上である必要があります"
    }
  },
  ko: {
    nav: { profile: "프로필" },
    profile: {
      title: "프로필 설정",
      subtitle: "계정 설정 및 기본 설정 관리",
      personalInfo: "개인 정보",
      fullName: "전체 이름",
      fullNamePlaceholder: "전체 이름을 입력하세요",
      email: "이메일 주소",
      emailPlaceholder: "이메일을 입력하세요",
      updateProfile: "프로필 업데이트",
      updating: "업데이트 중...",
      changePassword: "비밀번호 변경",
      currentPassword: "현재 비밀번호",
      newPassword: "새 비밀번호",
      confirmPassword: "새 비밀번호 확인",
      passwordRequirement: "최소 6자",
      changePasswordBtn: "비밀번호 변경",
      changing: "변경 중...",
      accountInfo: "계정 정보",
      accountCreated: "계정 생성일",
      userId: "사용자 ID",
      updateSuccess: "프로필이 성공적으로 업데이트되었습니다!",
      updateError: "프로필 업데이트 실패",
      passwordChanged: "비밀번호가 성공적으로 변경되었습니다!",
      passwordChangeError: "비밀번호 변경 실패",
      passwordMismatch: "비밀번호가 일치하지 않습니다",
      passwordTooShort: "비밀번호는 최소 6자 이상이어야 합니다"
    }
  },
  pt: {
    nav: { profile: "Perfil" },
    profile: {
      title: "Configurações do perfil",
      subtitle: "Gerencie as configurações da sua conta e preferências",
      personalInfo: "Informações pessoais",
      fullName: "Nome completo",
      fullNamePlaceholder: "Digite seu nome completo",
      email: "Endereço de e-mail",
      emailPlaceholder: "Digite seu e-mail",
      updateProfile: "Atualizar perfil",
      updating: "Atualizando...",
      changePassword: "Alterar senha",
      currentPassword: "Senha atual",
      newPassword: "Nova senha",
      confirmPassword: "Confirmar nova senha",
      passwordRequirement: "Pelo menos 6 caracteres",
      changePasswordBtn: "Alterar senha",
      changing: "Alterando...",
      accountInfo: "Informações da conta",
      accountCreated: "Conta criada",
      userId: "ID do usuário",
      updateSuccess: "Perfil atualizado com sucesso!",
      updateError: "Falha ao atualizar perfil",
      passwordChanged: "Senha alterada com sucesso!",
      passwordChangeError: "Falha ao alterar senha",
      passwordMismatch: "As senhas não coincidem",
      passwordTooShort: "A senha deve ter pelo menos 6 caracteres"
    }
  },
  ru: {
    nav: { profile: "Профиль" },
    profile: {
      title: "Настройки профиля",
      subtitle: "Управление настройками учетной записи и предпочтениями",
      personalInfo: "Личная информация",
      fullName: "Полное имя",
      fullNamePlaceholder: "Введите ваше полное имя",
      email: "Адрес электронной почты",
      emailPlaceholder: "Введите ваш email",
      updateProfile: "Обновить профиль",
      updating: "Обновление...",
      changePassword: "Изменить пароль",
      currentPassword: "Текущий пароль",
      newPassword: "Новый пароль",
      confirmPassword: "Подтвердите новый пароль",
      passwordRequirement: "Минимум 6 символов",
      changePasswordBtn: "Изменить пароль",
      changing: "Изменение...",
      accountInfo: "Информация об учетной записи",
      accountCreated: "Учетная запись создана",
      userId: "ID пользователя",
      updateSuccess: "Профиль успешно обновлен!",
      updateError: "Не удалось обновить профиль",
      passwordChanged: "Пароль успешно изменен!",
      passwordChangeError: "Не удалось изменить пароль",
      passwordMismatch: "Пароли не совпадают",
      passwordTooShort: "Пароль должен содержать не менее 6 символов"
    }
  }
};

const localesDir = path.join(__dirname, 'frontend', 'src', 'i18n', 'locales');

// Update each locale file
Object.keys(profileTranslations).forEach(lang => {
  const filePath = path.join(localesDir, `${lang}.json`);
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Add profile to nav
    data.nav.profile = profileTranslations[lang].nav.profile;
    
    // Add profile section
    data.profile = profileTranslations[lang].profile;
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`✅ Updated ${lang}.json`);
  } catch (error) {
    console.error(`❌ Error updating ${lang}.json:`, error.message);
  }
});

console.log('\n✨ All translation files updated!');
