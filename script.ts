type HourlyCharge = {
  [key: string]: number[];
};
const hourlyCharge: HourlyCharge = {
    "Lotus Water":[1.4,0.5],
    "Lucky Water":[1.1,0.4],
    "Water Lilies":[1.7,0.6]
};
interface DataPoint {
  timestamp: Date;
  value: number;
}
interface VillagerData {
  name: string;
  smartMeterId: string;
  waterVendor: string;
  data: DataPoint[];
}
var generateHourlyBasedData = (
  year: number,
  month: number,
  date: number
): DataPoint[] => {
  const innerData: DataPoint[] = [];
  const startDate = new Date(year, month, date);
  startDate.setHours(0);
  const endDate = new Date();
  let currentDate = new Date();
  currentDate = startDate;
  console.log(currentDate.toString());
  let time = startDate.getHours();
  while (currentDate < endDate) {
    for (let current_hour = time; current_hour < 24; current_hour++) {
      currentDate.setHours(current_hour, 0, 0, 0);
      let timestamp: Date = new Date(currentDate);
      const value = Math.random() * 3;
      innerData.push({ timestamp, value });
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
  data: generateHourlyBasedData(2023, 0, 1),
});
villagersData.push({
  name: "Srini",
  smartMeterId: "sm-1",
  waterVendor: "Lucky Water",
  data: generateHourlyBasedData(2023, 0, 1),
});
villagersData.push({
  name: "Naveen",
  smartMeterId: "sm-2",
  waterVendor: "Water Lilies",
  data: generateHourlyBasedData(2023, 0, 1),
});
function getDateWiseData(
  startDate: Date,
  endDate: Date,
  villagerData: DataPoint[]
): Object {
  let normalHourWater: number = 0;
  let peakHourWater: number = 0;
  let dateData: object = {};
  for (
    let currentDate: Date = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const desiredSubObject: Object = villagerData.filter(
      (obj) => obj.timestamp.getDate() === currentDate.getDate()
    );
    dateData[currentDate.toDateString()] = getAddedDateData(desiredSubObject);
  }
  return dateData;
}
function getAddedDateData(villagerdata: DataPoint[]): number[] {
  let normalHourWater: number = 0;
  let peakHourWater: number = 0;
  const WaterData: DataPoint[] = villagerdata;
  if (WaterData) {
    WaterData.forEach((element) => {
      const { timestamp, value } = element;
      let current_hour: number = timestamp.getHours();
      if (current_hour >= 12 && current_hour < 15) {
        peakHourWater += value;
      } else {
        normalHourWater += value;
      }
    });
    return [normalHourWater, peakHourWater];
  }
}
function getPastMonthData(villagerdata: DataPoint[], month: number) {
  let normalHourWater: number = 0;
  let peakHourWater: number = 0;
  const desiredSubObject = villagerdata.filter(
    (obj) => obj.timestamp.getMonth() === month
  );
  const monthlyData: number[] = getAddedDateData(desiredSubObject);
  console.log(monthlyData);
}
function getWeeklyWiseData(villagerData: DataPoint[]) {
  let weekCurrentDate: Date = new Date();
  let weekStartDate: Date = new Date();
  weekCurrentDate.setDate(weekCurrentDate.getDate()-1);
  weekStartDate.setDate(weekStartDate.getDate() - 7);
  return(getDateWiseData(weekStartDate,weekCurrentDate,villagerData));
}
function getCost(waterData:number[],waterVendor:string){
    return(waterData[0]*hourlyCharge[waterVendor][0]+waterData[1]*hourlyCharge[waterVendor][1]);
}
function getComparisionOfCost(villagersdata:VillagerData[],waterData:number[]){
    console.log("Comparision of data:\nNormal hour water:",waterData[1],"\nPeak hour water:",waterData[0]);
    for(const villager of villagersdata){
        let cost=getCost(waterData,villager.waterVendor)
        console.log("Name:",villager.name,"\nId:",villager.smartMeterId,"\nTotal Cost:",cost)
    }
}
const prompt = require("prompt-sync")();
const meterId = prompt("Enter something: ");
const desiredObject = villagersData.find((obj) => obj.smartMeterId === meterId);
const startDate1 = new Date(2023, 4, 19);
const endDate1 = new Date();
const pastMonth = new Date().setMonth(endDate1.getMonth() - 1);
const dailyData = getDateWiseData(startDate1, endDate1, desiredObject?.data);
const month = endDate1.getMonth() - 1;
console.log("Past Month Data:\n");
getPastMonthData(desiredObject?.data, month);
console.log(dailyData);
const weekWaterData=getWeeklyWiseData(desiredObject?.data);
console.log(weekWaterData);
getComparisionOfCost(villagersData,[20,30]);

