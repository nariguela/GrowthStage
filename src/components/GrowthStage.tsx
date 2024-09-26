import { useEffect, useState } from "react";
import ReactEcharts from 'echarts-for-react'

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
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Degree Days',
          data: chartData.map(data => data.degree_days),
          type: 'line',
          smooth: true,
        },
        {
          name: 'Precipitation',
          data: chartData.map(data => data.precipitation),
          type: 'line',
          smooth: true,
        },
        {
          name: 'NDVI',
          data: chartData.map(data => data.ndvi),
          type: 'line',
          smooth: true,
        },
      ],
    };
  }
  

  return (
    <div>
      <h2>GrowthStage</h2>
      <ReactEcharts option={getChartOptions()} />
    </div>
  )
}
