const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN, // Используйте переменные окружения
    environment: 'production', // Задайте ваше окружение
    captureUncaught: true, // Улавливать необработанные ошибки
    captureUnhandledRejections: true, // Улавливать необработанные ошибки Promises
  };
  
  export default rollbarConfig;