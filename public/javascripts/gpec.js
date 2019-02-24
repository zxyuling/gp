var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';
const option = {
	tooltip: {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
    },
    
    legend: {
        data:['价格','主力资金','散户资金','序号']
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
    	name:'价格',
        scale:true
    }],
    series: [
    {
        data: [],
        type: 'bar',
        smooth: true,
        name:'主力资金'
    },{
        data: [],
        type: 'bar',
        smooth: true,
        name:'散户资金'
    },
    {
        data: [],
        type: 'k',
        smooth: true,
        yAxisIndex:1,
        name:'价格',
        itemStyle : {  
            normal : {  
                color: upColor,
                color0: downColor,
                borderColor: upBorderColor,
                borderColor0: downBorderColor
            }
        },
    },{
        data: [],
        type: 'bar',
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
    },
    {
        type: 'k',
        data: []
    }]
};

const getmsg = (id,index) => {
    const zin  = document.querySelector('.j-zin'+index)
    console.log(id)
    document.querySelector('.j-id'+index).innerHTML=id
    const myecharts = echarts.init(zin)
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
		price.push([item[14],item[15],item[17],item[16]])
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
	getmsg(val,0)
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

const start = () => {
    const array = ["603366","002170","002907","002549","600136","600468","002247","601838","002696","603042","603066","600661","600757","002647","603798","603329","002723","600112"]
    const array1 = ["600112","002907","002549","603066","603066","603798","603329","002723","600468 ","601838","002696"]
    
    array1.forEach((item,index)=>{
        getmsg(item,index)
    })
}
start()