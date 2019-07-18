const { PENDING } = require('../utils/status')
const { push } = require('../utils/sqs');
const { v4 } = require('uuid');

const schedule = (req, res) => {
    let { url } = req.body;
    let id = v4();
    push(id, url);
    
    res.json({
      id,
      status: PENDING
    })
}

module.exports = schedule;