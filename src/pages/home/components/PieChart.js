import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts';
import './index.less'

const PieChart = () => {
  const boxRef = useRef(null)
  const [chartInstance, setChartInstance] = useState(null); // 用于存储ECharts实例

  const initChart = () => {

    // 初始化ECharts实例
    const myChart = echarts.init(boxRef.current);
    // 设置图标的配置项
    const option = {
      // color: ['#2095F2', '#E99D42', '#F75444'], // 全局颜色数组
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          name: '任务状态',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 7, name: '已完成' },
            { value: 3, name: '进行中' },
            { value: 2, name: '未开始' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
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
    <div ref={boxRef} className='pie-chart'></div>
  )
}
export default PieChart;