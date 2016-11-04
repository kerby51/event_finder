const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

function sql(file) {
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

const sqlProvider = {
  users: {
    all: sql('./sql/user/all.sql'),
    find: sql('./sql/user/find.sql'),
    create: sql('./sql/user/create.sql'),
    delete: sql('./sql/user/delete.sql'),
  },
  events: {
    all: sql('./sql/event/all.sql'),
    create: sql('./sql/event/create.sql'),
    delete: sql('./sql/event/delete.sql'),
    find: sql('./sql/event/find.sql'),
  },
};

module.exports = sqlProvider;
