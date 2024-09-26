import { useEffect, useState } from "react";
import ReactEcharts from 'echarts-for-react'
import * as echarts from 'echarts';
import styles from './GrowthStage.module.css'

interface ApiData {
  degree_days: number;
  time: number;
  precipitation: number;
  ndvi: number;
}

export default function GrowthStage() {
  const [chartData, setChartData] = useState<ApiData[]>([]);

  useEffect(function() {
    async function fetchData() {
      const res = await fetch('https://raw.githubusercontent.com/alexanderboliva/test/main/api_example.json');
      const apiData: ApiData[] = await res.json();
      console.log(apiData);
      setChartData(apiData);
    }
    fetchData();
  }, [])

  const getChartOptions = () => {
    return {
      title: {
        text: 'Growth Stage',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Degree Days', 'Precipitation', 'NDVI']
      },
      xAxis: {
        type: 'category',
        data: chartData.map(data => new Date(data.time * 1000).toLocaleDateString()), 
      },
      yAxis: [
        {
          type: 'value',
          name: 'Precipitação (mm)',
          min: 0,
          max: 40,
          position: 'left',
        },
        {
          type: 'value',
          name: 'Temperatura (°C)',
          min: 0,
          max: 20,
          position: 'right',
          axisLine: {
            lineStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)', 
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)',
                },
              ]),
            },
          },
        },
      ],
      series: [
        {
          name: 'Precipitation',
          data: chartData.map(data => data.precipitation),
          type: 'bar',
          smooth: true,
        },
        {
          name: 'Degree Days',
          data: chartData.map(data => data.degree_days),
          type: 'line',
          smooth: true,
        },
        {
          name: 'NDVI',
          data: chartData.map(data => data.ndvi),
          type: 'line',
          smooth: true,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
        },
      ],
    };
  }
  

  return (
    <div className={styles.container}>
      <h2>GrowthStage</h2>
      <ReactEcharts option={getChartOptions()} className={styles.chart} />
    </div>
  )
}
