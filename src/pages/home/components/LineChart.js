import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import './index.less'

const LineChart = () => {
  const boxRef = useRef(null)
  const [chartInstance, setChartInstance] = useState(null); // 用于存储ECharts实例

  const initChart = () => {
    // 初始化ECharts实例
    const myChart = echarts.init(boxRef.current);
    // 设置图标的配置项
    const option = {
      // color: ['#a05cfe', '#34c3bc'], // 全局颜色数组
      // title: {
      //   text: '每日增长'
      // },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['软件', '硬件', '算法'],
        right: '10%'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2024/11/18', '2024/11/19', '2024/11/20', '2024/11/21', '2024/11/22', '2024/11/23', '2024/11/24', '2024/11/25']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '软件',
          type: 'line',
          // smooth: true, // 开启平滑曲线
          data: [0, 12, 34, 45, 67, 76, 90, 100]
        },
        {
          name: '硬件',
          type: 'line',
          // smooth: true, // 开启平滑曲线
          data: [0, 10, 24, 46, 67, 78, 80, 100]
        },
        {
          name: '算法',
          type: 'line',
          // smooth: true, // 开启平滑曲线
          data: [0, 16, 32, 55, 65, 77, 90, 100]
        },
      ]
    };

    // 使用配置项和数据显示图表
    option && myChart.setOption(option);

    // 存储ECharts实例
    setChartInstance(myChart);

    window.addEventListener('resize', () => {
      myChart.resize();
    });
  }

  useEffect(() => {
    setTimeout(() => {
      initChart()
    }, 10)

    // 组件卸载时的清理函数
    return () => {
      if (chartInstance) {
        chartInstance.dispose(); // 销毁ECharts实例
        window.removeEventListener('resize', chartInstance.resize); // 移除resize事件监听
      }
    }
  }, [chartInstance])


  return (
    <div ref={boxRef} className='line-chart'></div>
  )
}
export default LineChart;