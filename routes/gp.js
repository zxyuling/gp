const axios = require('./axios')
const getGPMsg = async () => {
	const stock_flow = await axios.get('http://zj.flashdata2.jrj.com.cn/flowhistory/share/002011.js')
	return JSON.parse(stock_flow.split('=')[1])
}
const start = async () => {
 	return await getGPMsg()
}
module.exports.start = start