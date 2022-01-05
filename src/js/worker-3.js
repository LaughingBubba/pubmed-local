module.exports = async function (inp, callback) {
  callback(null, inp + ' BAR (' + process.pid + ') ' + process.env.AAA)
}