const axios = async url => await $.ajax({url,dataType:'jsonp',jsonp:'cb'})
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
	const data = await axios('http://ff.eastmoney.com//EM_CapitalFlowInterface/api/js?type=hff&rtntype=2&check=TMLBMSPROCR&acces_token=1942f5da9b46b069953c873404aad4b5&id='+id)
	return data
}
const getGPAllMsg = async (id) => {
	const data = await axios(`http://pdfm.eastmoney.com/EM_UBG_PDTI_Fast/api/js?rtntype=5&token=4f1862fc3b5e77c150a2b985b12db0fd&id=${id}&type=k`)
	return data.data
}
const start = async (id) => {
	id = getId(id)
 	const data1 = await getGPMsg(id)
 	const data2 = await getGPAllMsg(id)
 	return data1.map((item,index)=>{
 		return (item+','+data2[index]).split(',')
 	})
}
const Request = {
	start,
}
/**
0:时间
1:主力净流入净额
2:主力净流入净占比
3:超大单净流入净额
4:超大单净流入净占比
5:大单净流入净额
6:大单净流入净占比
7:中单净流入净额
8:中单净流入净占比
9:小单净流入净额
10:小单净流入净占比
11:收盘价
12:涨跌幅
13:时间
14:开盘
15:收盘
16:最高
17:最低
18:成交量(单位手)
19:成交额(单位元)
20:振幅
21:未知
*/