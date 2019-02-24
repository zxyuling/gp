const axios = require('./axios')
const json = require('./json')
const getId = (id) => {
	id=id.toString()
	switch(+id[0]){
		case 6:id=id+'1';break
		case 0:id=id+'2';break
		case 3:id=id+'2';break 
	}
	return id
}
const getGPMsg = async (id) => {

	const stock_flow = await axios.get('http://ff.eastmoney.com//EM_CapitalFlowInterface/api/js?type=hff&rtntype=2&js=({data:[(x)]})&cb=var%20aff_data=&check=TMLBMSPROCR&acces_token=1942f5da9b46b069953c873404aad4b5&id='+id)
	//return JSON.parse(stock_flow.split('=')[1])
	eval(stock_flow)
	return aff_data.data[0]
}
const getGPAllMsg = async (id) => {
	let res = []
	console.log(id)
	const stock_flow = await axios.get(`http://pdfm.eastmoney.com/EM_UBG_PDTI_Fast/api/js?rtntype=5&token=4f1862fc3b5e77c150a2b985b12db0fd&cb=cb&id=${id}&type=k`)
	const cb = ({data}) => {
		res = data.slice(data.length-100,data.length)
	}
	eval(stock_flow)
	return res

}
const start = async (id) => {
	id = getId(id)
 	const data1 = await getGPMsg(id)
 	const data2 = await getGPAllMsg(id)
 	return data1.map((item,index)=>{
 		return item+','+data2[index]
 	})
}


const getall = async () => {
	// const cb1 = await axios.get('http://nufm.dfcfw.com/EM_Finance2014NumericApplication/JS.aspx?cb=cb&type=CT&token=4f1862fc3b5e77c150a2b985b12db0fd&sty=FCOIATC&js=(%7Bdata%3A%5B(x)%5D%2CrecordsFiltered%3A(tot)%7D)&cmd=C._A&st=(ChangePercent)&sr=-1&p=2&ps=4000')
	// let res = null
	// const cb = (data) => {
	// 	res = data
	// }
	// eval(cb1)
	// return res.data.map(item=>{
	// 	item = item.split(',')
	// 	return item[1]

	// })
	 return json.filter(item=>item[0]!=3)
}

// const selectGP = async () => {
// 	const cj = json.filter(item=>item[0]!=3).slice(1,1000)
// 	let d = []
// 	for(let i = 0; i<cj.length;i++){
// 		try {
// 			let item = cj[i]
// 			const data = await start(item)
// 			const single1  = data[data.length-1].split(',')
// 			const single5  = data[data.length-5].split(',')
// 			const zin = single1[1]
// 			const change = single5[11]-single1[11]
// 			const bili = Math.abs(single5[11]-single1[11])/single5[11]
// 			console.log(i)
// 			if(zin<0 && bili<0.05)
// 		  	d.push(item)
// 		}catch(e){
// 			console.log(e)
// 		}
// 	}
// 	return d
// }
// console.log(selectGP().then(res=>console.log(res)))
module.exports.start = start
module.exports.getall = getall