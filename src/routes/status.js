const { PENDING, COMPLETED } = require('../utils/status')
const { retrieve } = require('../utils/mysql')

const status = async (req, res) => {
    let { id } = req.query;
    return retrieve(id).then(({ payload, url }) => {
      if (payload && url) {
        res.json({
          id,
          payload,
          url,
          status: COMPLETED
        })
      } else {
        // SQS doesn't seem to have a way to search data.
        // How come I've never needed to do this before?
        res.json({
          id,
          status: PENDING
        })
      }
    }).catch(err => res.json({
      id,
      status: PENDING
    }));
}

module.exports = status;