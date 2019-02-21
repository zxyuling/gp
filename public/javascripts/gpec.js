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
    yAxis: {
        type: 'value',
        // min:-5000,
        // max:5000,
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
    },{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
    }]
};
fetch('/gpmsg').then(res=>res.json()).then(res=>{
	let date = []
	let zin = []
	let sin=[]
	let yc=[]
	let real = []
	let money = 0
	let status = 0
	res.reverse().forEach((item,index,array)=>{
		date.push(item.date)
		zin.push((item.zin/10000).toFixed(2))
		sin.push((item.sin/10000).toFixed(2))
		yc.push(item.sin>0&&item.min>0?'涨'+item.date:'跌'+item.date)
		if(array[index+5]){
			 const sj = array[index+5].cp-item.cp
			 real.push(sj>0?'涨'+item.date:'跌'+item.date)
		}
		if(item.sin>0){
			if(status==0){
				money = money-item.cp
				status = 1
			}
		}else{
			if(status==1){
				money = money+item.cp
				status = 0
			}
		}
		
	})
	console.log(yc.join(','))
	console.log(real.join(','))
	const num = real.filter((item,index)=>{
		if(item==yc[index]){
			return item
		}
	}).length
	console.log(num/real.length)
	console.log(money,status)
	option.xAxis.data = date
	option.series[0].data = zin
	option.series[1].data = sin
	myecharts.setOption(option);
})
