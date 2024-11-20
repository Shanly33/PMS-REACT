import React, { useEffect, useState } from 'react'
import { getData } from './services'
import { Col, Row, Card, Table, Statistic, Tag, Space, Progress } from 'antd'
import './index.less'
import * as Icon from '@ant-design/icons'
import MyEcharts from '../../components/echarts'
import need from '@/assets/images/icon/need.png'
import overed from '@/assets/images/icon/overed.png'
import program from '@/assets/images/icon/program.png'
import progress from '@/assets/images/icon/progress.png'
import waited from '@/assets/images/icon/waited.png'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'

const Home = () => {
  const [tableData, setTableData] = useState([])
  const [countData, setCountData] = useState([])
  const [echartData, setEchartData] = useState({})
  useEffect(() => {
    getData().then(res => {
      console.log(111, res.data.data)
      const { tableData, countData, orderData, userData, videoData } = res.data.data
      setTableData(tableData)
      setCountData(countData)
      //折线图series数据组装
      const arr = Object.keys(orderData.data[0])
      const series = []
      arr.forEach(key => {
        series.push({
          name: key,
          type: 'line',
          data: orderData.data.map(item => item[key])
        })
      })
      setEchartData({
        order: {
          xData: orderData.date,
          series
        },
        user: {
          xData: userData.map(item => item.date),
          series: [
            {
              name: '新增用户',
              type: 'bar',
              data: userData.map(item => item.new)
            },
            {
              name: '活跃用户',
              type: 'bar',
              data: userData.map(item => item.active)
            }
          ]
        },
        video: {
          series: [
            {
              data: videoData,
              type: 'pie',
              radius: '50%'
            }
          ]
        }
      })
    })
  }, [])

  //动态获取icon
  const iconToElement = name => React.createElement(Icon[name])

  const columns = [
    {
      title: '项目',
      dataIndex: 'type',
      rowScope: 'row',
      colSpan: 2,
      align: 'center',
      width: 65,
      onCell: (record, index) => {
        if (index === 0) {
          return {
            rowSpan: 3,
          };
        }
        if (index === 1) {
          return {
            rowSpan: 0,
          };
        }
        // These two are merged into above cell
        if (index === 2) {
          return {
            rowSpan: 0,
          };
        }
        return {};
      }
    },
    {
      title: '项目',
      dataIndex: 'project',
      rowScope: 'row',
      colSpan: 0,
      width: 65,
    },
    {
      title: '第一周',
      dataIndex: 'week1',
      width: 330,
    },
    {
      title: '第二周',
      dataIndex: 'week2',
      width: 330,
    },
    {
      title: '第三周',
      dataIndex: 'week3',
      width: 330,
    },
    {
      title: '第四周',
      dataIndex: 'week4',
      width: 330,
    },

  ];

  const data = [
    {
      key: '1',
      type: '万象',
      project: '硬件',
      week1: '完成拉曼系统选型，复刻三轴平台,发起采购',
      week2: '质控流程V1.0实验测试，三轴平台升级版方案确定',
      week3: '软硬件联调第一阶段,实验流程标准方案V1.0（太初一版）',
      week4: '交付V1样机',
    },
    {
      key: '2',
      type: '万象',
      project: '软件',
      week1: '数据系统V1.0,基础数据库结构，数据加密和传输方案',
      week2: '硬件SDK接入采样系统, 拉曼采样软件预研版更新',
      week3: '拉曼采样软件预研版测试，加入质控流程和数据预处理算法',
      week4: '交付V1样机',
    },
    {
      key: '3',
      type: '万象',
      project: '算法',
      week1: '质控流程V1.0,外太空粒子干扰，无效数据筛选第一版',
      week2: '数据预处理流程V1.0信噪比提升，荧光背景去除，数据标准化处理',
      week3: '算法接入软件的辅助开发',
      week4: '交付V1样机',
    },
  ];

  const columns1 = [
    {
      title: "ID",
      dataIndex: "key",
      align: 'center',
      width: 40
    },
    {
      title: '项目名称',
      dataIndex: 'project_name',
      key: 'name',
      align: 'center',
      width: 200,
      render: (text) => <a>{text}</a>,
    },
    {
      title: '详情',
      key: 'remark',
      width: 400,
      dataIndex: 'remark',
      align: 'center',
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      width: 200,
      align: 'center',
      render: (text) => (
        <Progress percent={text} size="small" />
      )
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      align: 'center',
      render: (text) => {
        let color = ''
        if (text === '已完成') {
          color = '#2095F2'
        } else if (text === '未开始') {
          color = '#F75444'
        } else {
          color = '#E99D42'
        }
        return (
          <Tag color={color} key={text}>
            {text}
          </Tag>
        )
      },
    },
    {
      title: '预计开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      align: 'center',
    },
    {
      title: '预计结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      align: 'center',
    },
  ];

  const data1 = [
    {
      key: '1',
      project_name: '“太初”v1版-万象硬件',
      progress: 100,
      state: '已完成',
      start_time: '2024-11-01',
      end_time: '2024-11-08',
      remark: '完成拉曼系统选型，复刻三轴平台,发起采购'
    },
    {
      key: '2',
      project_name: '“太初”v1版-万象硬件',
      progress: 100,
      state: '已完成',
      start_time: '2024-11-09',
      end_time: '2024-11-16',
      remark: '质控流程V1.0实验测试，三轴平台升级版方案确定'
    },
    {
      key: '3',
      project_name: '“太初”v1版-万象硬件',
      progress: 45,
      state: '进行中',
      start_time: '2024-11-17',
      end_time: '2024-11-24',
      remark: '软硬件联调第一阶段,实验流程标准化方案V1.0（太初一版）,标准模板四角定位校准'
    },
    {
      key: '4',
      project_name: '“太初”v1版-万象硬件',
      progress: 0,
      state: '未开始',
      start_time: '2024-11-25',
      end_time: '2024-11-30',
      remark: '软硬件联调第一阶段,实验流程标准化方案V1.0（太初一版），交付V1样机'
    },
    {
      key: '5',
      project_name: '“太初”v1版-万象软件',
      progress: 100,
      state: '已完成',
      start_time: '2024-11-01',
      end_time: '2024-11-08',
      remark: '数据系统V1.0,基础数据库结构，数据加密和传输方案'
    },
    {
      key: '6',
      project_name: '“太初”v1版-万象软件',
      progress: 100,
      state: '已完成',
      start_time: '2024-11-09',
      end_time: '2024-11-16',
      remark: '硬件SDK接入采样系统, 拉曼采样软件预研版更新'
    },
    {
      key: '7',
      project_name: '“太初”v1版-万象软件',
      progress: 67,
      state: '进行中',
      start_time: '2024-11-17',
      end_time: '2024-11-24',
      remark: '拉曼采样软件预研版测试，加入质控流程和数据预处理算法，软件测试；数据库测试；四角定位标准测试'
    },
    {
      key: '8',
      project_name: '“太初”v1版-万象软件',
      progress: 0,
      state: '未开始',
      start_time: '2024-11-25',
      end_time: '2024-11-30',
      remark: '拉曼采样软件预研版测试，加入质控流程和数据预处理算法，交付V1样机'
    },
    {
      key: '9',
      project_name: '“太初”v1版-万象算法',
      progress: 100,
      state: '已完成',
      start_time: '2024-11-01',
      end_time: '2024-11-08',
      remark: '质控流程V1.0,外太空粒子干扰，无效数据筛选第一版本'
    },
    {
      key: '10',
      project_name: '“太初”v1版-万象算法',
      progress: 100,
      state: '已完成',
      start_time: '2024-11-09',
      end_time: '2024-11-16',
      remark: '数据预处理流程V1.0,信噪比提升，荧光背景去除，数据标准化处理'
    },
    {
      key: '11',
      project_name: '“太初”v1版-万象算法',
      progress: 77,
      state: '进行中',
      start_time: '2024-11-17',
      end_time: '2024-11-24',
      remark: '算法接入软件的辅助开发，辅助开发/测试'
    },
    {
      key: '12',
      project_name: '“太初”v1版-万象算法',
      progress: 0,
      state: '未开始',
      start_time: '2024-11-25',
      end_time: '2024-11-30',
      remark: '算法接入软件的辅助开发，交付V1样机'
    },

  ];

  return (
    <div className='home'>
      <div className='all-data'>
        <div className='dataItem'>
          <img src={program} className='img'></img>
          <div className='title'>
            <Statistic title="项目总数" value={111} suffix="个" />
          </div>
        </div>
        <div className='dataItem'>
          <img src={need} className='img'></img>
          <div className='title'>
            <Statistic title="需求总数" value={222} suffix="个" />
          </div>
        </div>
        <div className='dataItem'>
          <img src={waited} className='img'></img>
          <div className='title'>
            <Statistic title="待开始需求" value={111} suffix="个" />
          </div>
        </div>
        <div className='dataItem'>
          <img src={progress} className='img'></img>
          <div className='title'>
            <Statistic title="进行中需求" value={11} suffix="个" />
          </div>
        </div>
        <div className='dataItem'>
          <img src={overed} className='img'></img>
          <div className='title'>
            <Statistic title="已结束需求" value={34} suffix="个" />
          </div>
        </div>
      </div>
      <div className='project-list'>
        <Card >
          <div className='table-title'>项目列表</div>
          <Table
            columns={columns1}
            dataSource={data1}
            bordered
            pagination={false}
            size='small'
            scroll={{
              y: '35vh'
            }}
          />
        </Card>
      </div>
      <div className='work-list'>
        <Card >
          <div className='table-title'>本月任务</div>
          <Table columns={columns} dataSource={data} bordered pagination={false} />
        </Card>
      </div>
      <div className='progress-chart'>
        <Card >
          <div className='table-title'>项目进度</div>
          <LineChart />
        </Card>
        <Card >
          <div className='table-title'>任务状态占比</div>
          <PieChart />
        </Card>
      </div>
    </div>
  )
}
export default Home
