module.exports = (function () {
    return {
      local: { // localhost
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'dlgurwls90!',
        database: 'myblogdb'
      },
      real: { // real server db info
        host: '',
        port: '',
        user: '',
        password: '!',
        database: ''
      },
      dev: { // dev server db info
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
      },
    federation : {
      'naver' : {
        'client_id' : 'OECTJttdoUUVjTYcCAuU',
        'secret_id' : 'MKLhjq0x2_',
        'callback_url' : '/login/callback'
      }
    }
  
    }
  })();
  