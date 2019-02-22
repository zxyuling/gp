const zin  = document.querySelector('.j-zin')
const myecharts = echarts.init(zin)
const option = {
	tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: [{
        type: 'value',
        name:'资金'
        // min:-5000,
        // max:5000,
    },{
    	type: 'value',
    	name:'价格'
    }],
    series: [
    {
        data: [],
        type: 'line',
        smooth: true,
        name:'主力资金'
    },{
        data: [],
        type: 'line',
        smooth: true,
        name:'散户资金'
    },
    {
        data: [],
        type: 'line',
        smooth: true,
        yAxisIndex:1,
        name:'价格'
    },{
        data: [],
        type: 'line',
        smooth: true,
        symbolSize:0,
        color:['#fff'],
        itemStyle : {  
            normal : {  
                lineStyle:{  
                    color:'#fff'  
                }  
            }  
        },

        name:'序号'
    },]
};

const getmsg = (id) => {
	fetch('/gpmsg?id='+id).then(res=>res.json()).then(res=>{
	let date = []
	let zin = []
	let sin=[]
	let price = []
	let idx = []
	res.forEach((item,index,array)=>{
		item = item.split(',')
		date.push(item[0])
		idx.push(index+1)
		zin.push((+item[1]).toFixed(2))
		sin.push((+item[9]).toFixed(2))
		price.push((+item[11]).toFixed(2))
	})
	option.xAxis.data = date
	option.series[3].data = idx
	option.series[0].data = zin
	option.series[1].data = sin
	option.series[2].data = price
	myecharts.setOption(option);
})
}
document.querySelector('.sub').addEventListener('click',() => {
	const val = document.querySelector('.id').value
	getmsg(val)
})

document.querySelector('.subdate').addEventListener('click', () => {
	const cw = option.series[0].data
	const val = document.querySelector('.date').value
	const val1 = document.querySelector('.date1').value
	const v = cw.slice(+val-1,+val1).reduce((res,item) => {
		return res+ +item
	},0)
	document.querySelector('.cw').innerHTML='主力合计：'+v.toFixed(2)+'w'
})