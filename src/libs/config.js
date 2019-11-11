module.exports = {
    database: 'db_users',
    username: '',
    password: '',
    params: {
      dialect: 'sqlite',
      storage: 'users-db.sqlite',
      define: {
        underscored: true
      },
      operatorsAliases: false
    }
  };