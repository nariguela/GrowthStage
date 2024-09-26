import { useEffect } from "react";


interface ApiData {
  degree_days: number;
  time: number;
  precipitation: number;
  ndvi: number;
}

export default function GrowthStage() {
  useEffect(function() {
    async function fetchData() {
      const res = await fetch('https://raw.githubusercontent.com/alexanderboliva/test/main/api_example.json');
      const apiData: ApiData[] = await res.json();
      console.log(apiData)
    }
    fetchData();
  }, [])


  return (
    <div>
      <h2>GrowthStage</h2>
    </div>
  )
}
