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
  const [currentZoom, setCurrentZoom] = useState('day') //当前时间范围

  const tasks = {
    data: [
      {
        id: "10",
        text: "Project #1",
        start_date: "2025-01-02",
        duration: 3,
        order: 10,
        progress: 0.4,
        open: true,
      },
      {
        id: "1",
        text: "Task #1",
        start_date: "2025-01-04",
        duration: 1,
        order: 10,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "2",
        text: "Task #2",
        start_date: "2025-02-05",
        duration: 2,
        order: 20,
        progress: 0.6,
        parent: "10",
      },
      {
        id: "11",
        text: "Project #2",
        start_date: "2025-04-02",
        duration: 3,
        order: 10,
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
        //右侧时间轴
        {
          rows: [
            { view: "timeline", scrollX: "scrollTime", scrollY: "scrollVer" },
            { view: "scrollbar", id: "scrollTime", group: "horizontal" },
          ],
        },
        { view: "scrollbar", id: "scrollVer" },
      ],
    }
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

  const setZoomConfig = () => {
    gantt.ext.zoom.init(zoomConfig);
    gantt.ext.zoom.setLevel("day");
  }

  const handleChangeZoom = (zoom) => {
    setCurrentZoom(zoom);
    gantt.ext.zoom.setLevel(zoom);
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
    gantt.init(container.current);
    gantt.parse(tasks);

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
