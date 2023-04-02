const allCodeService = require("../services/allCodeService");
const handleGetAllCode = async (req, res) => {
  const type = req.query.type;
  const data = await allCodeService.getAllCode(type);
  if (!data.errorCode) {
    return res.status(500).json(data);
  } else {
    return res.status(200).json(data);
  }
};
module.exports = {
  handleGetAllCode,
};
