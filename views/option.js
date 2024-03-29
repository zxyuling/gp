const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';
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