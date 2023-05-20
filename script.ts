const hourlyCharge: HourlyCharge = {
  lotusWaterPeak: 1.4,
  luckyWaterPeak: 1.1,
  lillltWaterPeak: 1.7,
  lotusWaterNormal: 0.5,
  luckyWaterNormal: 0.4,
  lillltWaterNormal: 0.6,
};
interface DataPoint {
  timestamp: Date;
  value: number;
}
interface VillagerData {
  name: String;
  smartMeterId: String;
  waterVendor: String;
  data:DataPoint[];
}
interface HourlyCharge {
  lotusWaterPeak: number;
  luckyWaterPeak: number;
  lillltWaterPeak: number;
  lotusWaterNormal: number;
  luckyWaterNormal: number;
  lillltWaterNormal: number;
}
var generateHourlyBasedData=(year:number,month:number,date:number
):DataPoint[]=>{
  const data: DataPoint[]=[];
  const startDate = new Date(year,month,date); //Starting reading from specified date
  startDate.setUTCHours(0); //Starting reading data from 0 hours according to UTC for Starting point
  const endDate = new Date(); //current time
  let currentDate = new Date(); //creating another date object variable
  currentDate = startDate;
  let time = startDate.getHours();
  while (currentDate < endDate) {
    for (let hour = time; hour < 24; hour++) {
      const timestamp: Date = currentDate;
      timestamp.setHours(hour);
      const value = Math.random() * 3;
      data.push({ timestamp, value });
    }
    time = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
}
const villagersData:VillagerData[]=[];
villagersData.push({name:"Ranga",
smartMeterId:"sm-0",
waterVendor:"Lotus Water",
data:generateHourlyBasedData(2023,0,1)})
villagersData.push({name:"Srini",
smartMeterId:"sm-1",
waterVendor:"Lucky Water",
data:generateHourlyBasedData(2023,0,1)})
villagersData.push({name:"Naveen",
smartMeterId:"sm-2",
waterVendor:"Water Lilies",
data:generateHourlyBasedData(2023,0,1)})
console.log(villagersData)
