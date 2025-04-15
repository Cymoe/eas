export type TranslationKey =
  | 'auth.signIn'
  | 'auth.signUp'
  | 'auth.email'
  | 'auth.password'
  | 'auth.forgotPassword'
  | 'auth.continueWithApple'
  | 'auth.continueWithGoogle'
  | 'auth.continueWithFacebook'
  | 'auth.createAccount'
  | 'auth.alreadyHaveAccount'
  | 'auth.resetPassword'
  | 'auth.resetPasswordInstructions'
  | 'auth.sendResetLink'
  | 'auth.backToSignIn'
  | 'profile.edit'
  | 'profile.name'
  | 'profile.bio'
  | 'profile.location'
  | 'profile.instruments'
  | 'profile.genres'
  | 'profile.language'
  | 'profile.selectLanguage'
  | 'profile.settings'
  | 'profile.notifications'
  | 'profile.privacy'
  | 'profile.help'
  | 'profile.logout'
  | 'matching.itsAMatch'
  | 'matching.keepSwiping'
  | 'matching.sendMessage'
  | 'matching.noMoreMatches'
  | 'matching.checkBackLater'
  | 'messages.newMessage'
  | 'messages.typeMessage'
  | 'messages.send'
  | 'messages.noMessages'
  | 'messages.startChatting'
  | 'common.save'
  | 'common.cancel'
  | 'common.delete'
  | 'common.edit'
  | 'common.done'
  | 'common.next'
  | 'common.back'
  | 'common.confirm'
  | 'common.loading';

export const translations = {
  en: {
    // Auth
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.continueWithApple': 'Continue with Apple',
    'auth.continueWithGoogle': 'Continue with Google',
    'auth.continueWithFacebook': 'Continue with Facebook',
    'auth.orContinueWith': 'Or continue with',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.verifyEmail': 'Verify Email',
    'auth.verificationCodeSent': 'A verification code has been sent to your email',
    'auth.enterCode': 'Enter Code',
    'auth.resendCode': 'Resend Code',
    'auth.verify': 'Verify',

    // Profile
    'profile.edit': 'Edit Profile',
    'profile.settings': 'Settings',
    'profile.notifications': 'Notifications',
    'profile.language': 'App Language',
    'profile.theme': 'Theme',
    'profile.privacy': 'Privacy',
    'profile.help': 'Help & Support',
    'profile.about': 'About',
    'profile.logout': 'Log Out',
    'profile.name': 'Name',
    'profile.bio': 'Bio',
    'profile.location': 'Location',
    'profile.instruments': 'Instruments',
    'profile.genres': 'Genres',
    'profile.influences': 'Influences',
    'profile.lookingFor': 'Looking For',
    'profile.availability': 'Availability',
    'profile.languages': 'Languages',
    'profile.songsWeKnow': 'Songs We Know',
    'profile.fanOf': 'Fan Of',
    'profile.selectLanguage': 'Select your preferred language for the app interface',

    // Matching
    'matching.itsAMatch': "It's a Match!",
    'matching.keepSwiping': 'Keep Swiping',
    'matching.message': 'Message',
    'matching.noMoreMatches': 'No More Matches',
    'matching.checkBackLater': 'Check back later for new matches',
    'matching.filters': 'Filters',

    // Messages
    'messages.title': 'Messages',
    'messages.noMessages': 'No Messages Yet',
    'messages.startChatting': 'Start chatting with your matches',
    'messages.typeMessage': 'Type a message...',
    'messages.send': 'Send',

    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.done': 'Done',
    'common.next': 'Next',
    'common.back': 'Back',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.retry': 'Retry',
    'common.showAll': 'Show All',
    'common.hideAll': 'Hide All',
    'common.seeAll': 'See All',
    'common.seeMore': 'See More',
    'common.seeLess': 'See Less',
    'common.apply': 'Apply',
    'common.reset': 'Reset',
    'common.clear': 'Clear',
    'common.close': 'Close',
    'common.confirm': 'Confirm',
  },
  es: {
    // Auth
    'auth.signIn': 'Iniciar Sesión',
    'auth.signUp': 'Registrarse',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.continueWithApple': 'Continuar con Apple',
    'auth.continueWithGoogle': 'Continuar con Google',
    'auth.continueWithFacebook': 'Continuar con Facebook',
    'auth.orContinueWith': 'O continuar con',
    'auth.dontHaveAccount': '¿No tienes una cuenta?',
    'auth.alreadyHaveAccount': '¿Ya tienes una cuenta?',
    'auth.verifyEmail': 'Verificar Correo',
    'auth.verificationCodeSent': 'Se ha enviado un código de verificación a tu correo',
    'auth.enterCode': 'Ingresar Código',
    'auth.resendCode': 'Reenviar Código',
    'auth.verify': 'Verificar',

    // Profile
    'profile.edit': 'Editar Perfil',
    'profile.settings': 'Configuración',
    'profile.notifications': 'Notificaciones',
    'profile.language': 'Idioma de la aplicación',
    'profile.theme': 'Tema',
    'profile.privacy': 'Privacidad',
    'profile.help': 'Ayuda y Soporte',
    'profile.about': 'Acerca de',
    'profile.logout': 'Cerrar Sesión',
    'profile.name': 'Nombre',
    'profile.bio': 'Biografía',
    'profile.location': 'Ubicación',
    'profile.instruments': 'Instrumentos',
    'profile.genres': 'Géneros',
    'profile.influences': 'Influencias',
    'profile.lookingFor': 'Buscando',
    'profile.availability': 'Disponibilidad',
    'profile.languages': 'Idiomas',
    'profile.songsWeKnow': 'Canciones que Conocemos',
    'profile.fanOf': 'Fan De',
    'profile.selectLanguage': 'Selecciona tu idioma preferido para la interfaz de la aplicación',

    // Matching
    'matching.itsAMatch': '¡Es un Match!',
    'matching.keepSwiping': 'Seguir Deslizando',
    'matching.message': 'Mensaje',
    'matching.noMoreMatches': 'No Hay Más Matches',
    'matching.checkBackLater': 'Vuelve más tarde para nuevos matches',
    'matching.filters': 'Filtros',

    // Messages
    'messages.title': 'Mensajes',
    'messages.noMessages': 'No Hay Mensajes Aún',
    'messages.startChatting': 'Comienza a chatear con tus matches',
    'messages.typeMessage': 'Escribe un mensaje...',
    'messages.send': 'Enviar',

    // Common
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar', 
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.done': 'Listo',
    'common.next': 'Siguiente',
    'common.back': 'Atrás',
    'common.search': 'Buscar',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    'common.retry': 'Reintentar',
    'common.showAll': 'Mostrar Todo',
    'common.hideAll': 'Ocultar Todo', 
    'common.seeAll': 'Ver Todo',
    'common.seeMore': 'Ver Más',
    'common.seeLess': 'Ver Menos',
    'common.apply': 'Aplicar',
    'common.reset': 'Restablecer',
    'common.clear': 'Limpiar',
    'common.close': 'Cerrar',
    'common.confirm': 'Confirmar',
  }
} as const; 