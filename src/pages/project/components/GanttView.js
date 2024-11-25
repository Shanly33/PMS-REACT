import React, { useEffect, useRef, useState } from 'react'
import { gantt } from "dhtmlx-gantt";
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './index.less'
import { Button, Space } from 'antd';


const GanttView = () => {
  let container = useRef();
  const data = [
    {
      id: "1",
      text: "项目1",
      start_date: "2024-10-28",
      duration: 10,
      end_date: "2024-11-08",
      progress: 0.5,
      open: true,
      showCode: 1,
      code: 0.1,
      task_user: "Dss",
      parent: 0
    },
    {
      id: "2",
      text: "任务1",
      start_date: "2024-10-28",
      duration: 4,
      end_date: "2024-11-01",
      progress: 0.6,
      parent: "1",
      showCode: 1.1,
      code: 0.1,
      task_user: "A"
    },
    {
      id: "3",
      text: "任务2",
      start_date: "2024-10-30",
      duration: 6,
      end_date: "2024-11-08",
      progress: 0.6,
      parent: "1",
      pre_task: "2",
      showCode: 1.2,
      code: 0.2,
      task_user: "Dss"
    },
    {
      id: "4",
      text: "项目3",
      start_date: "2024-10-28",
      duration: 6,
      end_date: "2024-11-10",
      progress: 1,
      showCode: 2,
      code: 0.2,
      task_user: "Dss",
      parent: 0
    }
  ]
  const curZoomRef = useRef()
  const [currentZoom, setCurrentZoom] = useState('day') //当前时间范围

  const tasks = {
    data: [
      {
        id: "10",
        text: "第一周",
        start_date: "2024-11-01",
        end_date: "2024-11-09",
        duration: 3,
        order: '1',
        progress: 1,
        open: true,
      },
      {
        id: "10-1",
        text: "硬件：完成拉曼系统选型，复刻三轴平台,发起采购",
        start_date: "2024-11-01",
        // end_date: "2024-11-09",
        duration: 3,
        order: '1.1',
        progress: 1,
        parent: "10",
      },
      {
        id: "10-2",
        text: "软件：数据系统V1.0,基础数据库结构，数据加密和传输方案",
        start_date: "2024-11-06",
        // end_date: "2024-11-09",
        duration: 2,
        order: '1.2',
        progress: 1,
        parent: "10",
      },
      {
        id: "10-3",
        text: "算法：质控流程V1.0,外太空粒子干扰，无效数据筛选第一版本",
        start_date: "2024-11-08",
        // end_date: "2024-11-09",
        duration: 1,
        order: '1.3',
        progress: 1,
        parent: "10",
      },
      {
        id: "11",
        text: "第二周",
        start_date: "2024-11-11",
        end_date: "2024-11-16",
        duration: 3,
        order: '2',
        progress: 0.4,
        open: true,
      },
      {
        id: "11-1",
        text: "硬件：质控流程V1.0实验测试，三轴平台升级版方案确定",
        start_date: "2024-11-11",
        end_date: "2024-11-16",
        duration: 1,
        order: '2.1',
        progress: 0.6,
        parent: "11",
      },
      {
        id: "11-2",
        text: "软件：硬件SDK接入采样系统, 拉曼采样软件预研版更新",
        start_date: "2024-11-11",
        end_date: "2024-11-16",
        duration: 1,
        order: '2.2',
        progress: 0.6,
        parent: "11",
      },
      {
        id: "11-3",
        text: "算法：数据预处理流程V1.0,信噪比提升，荧光背景去除，数据标准化处理",
        start_date: "2024-11-11",
        end_date: "2024-11-16",
        duration: 1,
        order: '2.3',
        progress: 0.6,
        parent: "11",
      },
      {
        id: "12",
        text: "第三周",
        start_date: "2024-11-18",
        end_date: "2024-11-23",
        duration: 3,
        order: '3',
        progress: 0.4,
        open: true,
      },
      {
        id: "12-1",
        text: "硬件：软硬件联调第一阶段,实验流程标准化方案V1.0（太初一版），标准模板四角定位校准",
        start_date: "2024-11-18",
        end_date: "2024-11-23",
        duration: 1,
        order: '3.1',
        progress: 0.6,
        parent: "12",
      },
      {
        id: "12-2",
        text: "软件：拉曼采样软件预研版测试，加入质控流程和数据预处理算法",
        start_date: "2024-11-18",
        end_date: "2024-11-23",
        duration: 1,
        order: '3.2',
        progress: 0.6,
        parent: "12",
      },
      {
        id: "12-3",
        text: "算法：算法接入软件的辅助开发",
        start_date: "2024-11-18",
        end_date: "2024-11-23",
        duration: 1,
        order: '3.3',
        progress: 0.6,
        parent: "12",
      },
      {
        id: "13",
        text: "第四周",
        start_date: "2024-11-25",
        end_date: "2024-11-30",
        duration: 3,
        order: '4',
        progress: 0.4,
        open: true,
      },
      {
        id: "13-1",
        text: "硬件：软硬件联调第一阶段,实验流程标准化方案V1.0（太初一版），交付V1样机",
        start_date: "2024-11-25",
        end_date: "2024-11-30",
        duration: 1,
        order: '4.1',
        progress: 0.6,
        parent: "13",
      },
      {
        id: "13-2",
        text: "软件：拉曼采样软件预研版测试，加入质控流程和数据预处理算法，交付V1样机",
        start_date: "2024-11-25",
        end_date: "2024-11-30",
        duration: 1,
        order: '4.2',
        progress: 0.6,
        parent: "13",
      },
      {
        id: "13-3",
        text: "算法：算法接入软件的辅助开发，交付V1样机",
        start_date: "2024-11-25",
        end_date: "2024-11-30",
        duration: 1,
        order: '4.3',
        progress: 0.6,
        parent: "13",
      },
    ],
    links: [
      { id: "1", source: "10-1", target: "10-2", type: "0" },
      { id: "2", source: "10-2", target: "10-3", type: "0" }
    ],
  }

  const testData = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "2024-11-02",
        duration: 3,
        order: '1',
        progress: 1,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "2024-11-04",
        duration: 1,
        order: '1.1',
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "2025-02-05",
        duration: 2,
        order: '1.2',
        progress: 0.6,
        parent: "10",
      },
      {
        id: "11",
        text: "Project #2",
        start_date: "2025-04-02",
        duration: 3,
        order: '2',
        progress: 0.4,
        open: true,
      },
    ],
    links: [{ id: 1, source: 1, target: 2, type: "0" }],
  }

  //基础样式配置
  const basicConfig = () => {
    gantt.i18n.setLocale("cn");				                   // 语言
    gantt.config.date_format = "%Y-%m-%d %H:%i";		     // 日期格式转换
    gantt.config.row_height = 32;	                       // 行高
    // gantt.config.grid_width = 800
    gantt.config.autosize = "y";			                   // 甘特图是否自适应
    gantt.config.work_time = true;			                 // 工作日模式
    gantt.locale.labels.new_task = 'task';		// 新建任务时的默认label（不过如果是自定义的新增模态框的话，就用不到这个）					

    // gantt.config.order_branch = "marker";			// 允许在同一级别内重排任务，只要是需要重排，order_branch 一定得给 true 或 ‘marker’
    // gantt.config.order_branch_free = true;		// 允许在甘特图全部范围内重排任务，如果只给 order_branch_free，而不给 order_branch，排序也是不会生效的。

    gantt.plugins({					// 导入插件
      marker: true					// 日期标识插件，如果不装，之后在配置日期标识线会报错
    });

    gantt.config.layout = { // 布局
      css: "gantt_container",
      cols: [
        //左侧网格栏(表格区)
        {
          width: 400,                       //表格区宽度
          rows: [
            {
              view: "grid",                 //视图类型
              scrollX: "scrollHor",        //绑定id为scrollHor的滚动条
              scrollable: true,
              scrollY: "scrollVer",          //绑定id为scrollVer的滚动条
            },
            { view: "scrollbar", id: "scrollHor", group: "horizontal" }, //定义滚动条
          ],
        },
        // { resizer: true, width: 1 },
        //右侧时间轴(甘特图区)
        {
          rows: [
            { view: "timeline", scrollX: "scrollTime", scrollY: "scrollVer" },
            { view: "scrollbar", id: "scrollTime", group: "horizontal" },
          ],
        },
        { view: "scrollbar", id: "scrollVer" },
      ],
    }

    // 设置时间列的 class 类名，配置禁用日期的样式
    gantt.templates.timeline_cell_class = (task, date) => {
      const disableDate = ["month", "year", "quarter", 'week'].includes(curZoomRef.current);

      if (!disableDate && !gantt.isWorkTime(date)) return "weekend";
      return "";
    };

    // 设置 任务的 class 类名，用于配置 任务完成时的 样式
    gantt.templates.task_class = (start, end, task) => {
      if (task.progress === 1)
        return "completed_task";
      return "";
    };
  }

  const zoomConfig = {
    levels: [
      {
        name: "day",
        label: "日",
        scale_height: 80,
        min_column_width: 30,
        scales: [
          // { unit: "month", format: "%Y年 %M" },
          {
            unit: "week",
            step: 1,
            format: (date) => {
              const startDateToStr = gantt.date.date_to_str("%Y.%m.%d");
              const endDateToStr = gantt.date.date_to_str("%m.%d");
              const endDate = gantt.date.add(date, 7 - date.getDay(), "day");
              return startDateToStr(date) + " - " + endDateToStr(endDate);
            },
          },
          {
            unit: "day",
            step: 1,
            format: (date) => {
              const weekDays = ["日", "一", "二", "三", "四", "五", "六"];
              const day = date.getDate();
              const weekDay = date.getDay();
              return `<div class='date-box'>
          <div class='day'>${day}</div>
          <div class='weekDay'>${weekDays[weekDay]}</div>
          </div>`;
            },
          },
        ],
      },
      {
        name: "week",
        label: "周",
        scale_height: 50,
        min_column_width: 80,
        scales: [
          { unit: "month", format: "%Y年" },
          { unit: "week", step: 1, date: "第%W周" },
        ],
      },
      {
        name: "month",
        label: "月",
        scale_height: 50,
        min_column_width: 50,
        scales: [
          // { unit: "year", step: 1, format: "%Y年" },
          {
            unit: "quarter",
            step: 1,
            format: (date) => {
              const year = date.getFullYear();
              const month = date.getMonth();
              const quarter = Math.floor(month / 3 + 1);
              return `${year}年Q${quarter}`;
              // return `Q${quarter}`;
            },
          },
          { unit: "month", step: 1, format: "%n月" },
        ],
      },
      {
        name: "quarter",
        label: "季",
        scale_height: 50,
        min_column_width: 50,
        scales: [
          { unit: "year", step: 1, format: "%Y年" },
          {
            unit: "quarter",
            step: 1,
            format: (date) => {
              const month = date.getMonth();
              const quarter = Math.floor(month / 3 + 1);
              return `Q${quarter}`;
            },
          },
        ],
      },
      {
        name: "year",
        label: "年",
        scale_height: 50,
        min_column_width: 50,
        scales: [{ unit: "year", step: 1, format: "%Y年" }],
      },
    ],
    // element: () => {
    //   return gantt.$root.querySelector(".gantt_task");
    // },
  }

  const columns = [
    {
      name: "add",
      width: 44,
      align: "center",
    },
    {
      type: "input",
      name: "order",
      label: "项目序号",
      tree: true,
      min_width: 100,
    },
    // {
    //   type: null,
    //   name: "code",
    //   label: "项目序号",
    //   hide: true,
    // },
    {
      type: "input",
      name: "text",
      label: "项目名称",
      // tree: true,
      min_width: 200,
      width: 200
    },
    // {
    //   type: "input",
    //   name: "task_user",
    //   label: "负责人",
    //   width: 100,
    //   min_width: 100,
    //   align: "center",
    // },
    // {
    //   type: "select",
    //   name: "parent",
    //   hide: true,
    //   label: "父任务",
    // },
    // {
    //   type: "select",
    //   name: "pre_task",
    //   hide: true,
    //   label: "前置任务",
    // },
    {
      type: "date",
      name: "start_date",
      label: "开始日期",
      align: "center",
      min_width: 100,
      // min_width: 80,
    },
    // {
    //   type: "number",
    //   name: "duration",
    //   label: "持续时间",
    //   align: "center",
    //   min: 1,
    //   formatType: "date",
    // },
    {
      type: "date",
      name: "end_date",
      label: "结束时间",
      align: "center",
      min_width: 100,
      // onrender: (task, node) => {
      //   console.log(1111, task, task.end_date)
      //   node.innerText = task.end_date
      // }
    },
    // {
    //   type: "slider",
    //   name: "progress",
    //   originField: "progress",
    //   label: "进度",
    //   width: 80,
    //   align: "center",
    //   template: (item) => {
    //     if (item.progress >= 1) return "Complete";
    //     if (item.progress === 0) return "Not started";
    //     const num = `${Math.round(item.progress * 100)}%`;
    //     return num;
    //   },
    // },
    // {
    //   type: "select",
    //   name: "task_status",
    //   originField: "task_status",
    //   align: "center",
    //   label: "任务状态",
    //   options: [
    //     {
    //       value: "continue",
    //       label: "未完成",
    //     },
    //     {
    //       value: "finish",
    //       label: "完成",
    //     },
    //   ],
    // },
  ]

  const setZoomConfig = () => {
    gantt.ext.zoom.init(zoomConfig);
    gantt.ext.zoom.setLevel("day");
  }

  const handleChangeZoom = (zoom) => {
    setCurrentZoom(zoom);
    curZoomRef.current = zoom
    gantt.ext.zoom.setLevel(zoom);
  }

  const nowDateMarker = () => {
    const dateToStr = gantt.date.date_to_str(gantt.config.task_date);
    gantt.addMarker({
      start_date: new Date(),
      css: "today",
      text: "今日",
      title: dateToStr(new Date()),
    });
  }

  const changeZoom = () => {
    return (
      <Space style={{ marginBottom: 12 }}>
        {zoomConfig.levels.map((item) => {
          return (
            <Button
              type={item.name === currentZoom ? "" : "primary"}
              onClick={() => {
                handleChangeZoom(item.name);
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </Space>
    );
  }



  useEffect(() => {
    basicConfig()
    setZoomConfig()
    nowDateMarker()
    gantt.config.columns = columns;
    gantt.init(container.current);
    gantt.parse(testData);

    return () => {
      // gantt.destructor();
    };
  }, []);
  return (
    <div className='all-box'>
      {changeZoom()}
      <div className='gantt-box' ref={container} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}
export default GanttView
