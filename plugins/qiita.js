const axios = require('axios');

module.exports = {
  getQiitaItems (page, per_page) {
    const _uri = "https://qiita.com/api/v2/items";
    return axios.get(_uri,
      {
        params: [
          {'page': page},
          {'per_page': per_page}
        ]
      }
    );
  }
};
