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
  data: DataPoint[];
}
interface HourlyCharge {
  lotusWaterPeak: number;
  luckyWaterPeak: number;
  lillltWaterPeak: number;
  lotusWaterNormal: number;
  luckyWaterNormal: number;
  lillltWaterNormal: number;
}
var generateHourlyBasedData = (
  year: number,
  month: number,
  date: number
): DataPoint[] => {
  const innerData: DataPoint[] = [];
  const startDate = new Date(year, month, date); //Starting reading from specified date
  startDate.setHours(0); //Starting reading data from 0 hours according to UTC for Starting point
  const endDate = new Date(); //current time
  let currentDate = new Date(); //creating another date object variable
  currentDate = startDate;
  console.log(currentDate.toString());
  let time = startDate.getHours();
  while (currentDate < endDate) {
    for (let current_hour = time; current_hour < 24; current_hour++) {
      // let timestamp: Date = currentDate;
      // console.log(current_hour);
      currentDate.setHours(current_hour, 0, 0, 0);
      console.log(currentDate.getHours().toString());
      let timestamp: Date = new Date(currentDate);
      const value = Math.random() * 3;
      innerData.push({ timestamp, value });
      console.log(currentDate.toString(), value);
    }
    time = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return innerData;
};
const villagersData: VillagerData[] = [];
villagersData.push({
  name: "Ranga",
  smartMeterId: "sm-0",
  waterVendor: "Lotus Water",
  data: generateHourlyBasedData(2023, 4, 21),
});
villagersData.push({
  name: "Srini",
  smartMeterId: "sm-1",
  waterVendor: "Lucky Water",
  data: generateHourlyBasedData(2023, 4, 21),
});
villagersData.push({
  name: "Naveen",
  smartMeterId: "sm-2",
  waterVendor: "Water Lilies",
  data: generateHourlyBasedData(2023, 4, 21),
});
function getPastMonthData(villagerdata: VillagerData, month: number): number[] {
  let normalHourWater: number = 0;
  let peakHourWater: number = 0;
  let monthlyWaterData: DataPoint[] = villagerdata.data;
  monthlyWaterData.forEach((element) => {
    const { timestamp, value } = element;
    console.log(timestamp.toString());
    if (timestamp.getMonth() == month) {
      let current_hour: number = timestamp.getHours();
      console.log(current_hour);
      if (current_hour >= 12 && current_hour < 15) {
        peakHourWater += value;
      } else {
        normalHourWater += value;
      }
    }
  });
  return [normalHourWater, peakHourWater];
}
const prompt = require("prompt-sync")();
const meterId = prompt("Enter something: ");
const desiredObject = villagersData.find((obj) => obj.smartMeterId === meterId);
for (const ele of desiredObject.data) {
  console.log(ele.timestamp.toString());
  console.log(ele.value);
}

const array1: number[] = getPastMonthData(desiredObject, 4);
console.log(array1);
