const getmsg = (id) => {
    const zin  = document.querySelector('.j-zin')
    $('.j-id').innerHTML=id
    const myecharts = echarts.init(zin)
	Request.start(id).then(res=>{
	let date = []
	let zin = []
	let sin=[]
	let price = []
	let idx = []
	res.forEach((item,index,array)=>{
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
$('.sub').on('click',() => {
	const val = $('.id').val()
	getmsg(val,0)
})

$('.subdate').on('click', () => {
	const cw = option.series[0].data
	const val = $('.date').val()
	const val1 = $('.date1').val()
	const v = cw.slice(+val-1,+val1).reduce((res,item) => {
		return res+ +item
	},0)
	$('.cw').html('主力合计：'+v.toFixed(2)+'w')
})
