const axios = require('./axios')
const getGPMsg = async (id) => {

	const stock_flow = await axios.get('http://ff.eastmoney.com//EM_CapitalFlowInterface/api/js?type=hff&rtntype=2&js=({data:[(x)]})&cb=var%20aff_data=&check=TMLBMSPROCR&acces_token=1942f5da9b46b069953c873404aad4b5&id='+id)
	//return JSON.parse(stock_flow.split('=')[1])
	eval(stock_flow)
	return aff_data.data[0]
}
const start = async (id) => {
	switch(+id[0]){
		case 6:id=id+'1';break
		case 0:id=id+'2';break
		case 3:id=id+'2';break 
	}
 	return await getGPMsg(id)
}

const getall = async () => {
	const cb1 = await axios.get('http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?cb=cb&type=CT&token=4f1862fc3b5e77c150a2b985b12db0fd&sty=FCOIATC&js=(%7Bdata%3A%5B(x)%5D%2CrecordsFiltered%3A(tot)%7D)&cmd=C._A&st=(ChangePercent)&sr=-1&p=2&ps=4000')
	let res = null
	const cb = (data) => {
		res = data
	}
	eval(cb1)
	return res
}
module.exports.start = start
module.exports.getall = getall