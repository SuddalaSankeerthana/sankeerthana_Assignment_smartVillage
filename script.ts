import { type } from "os";

type HourlyCharge = {
  [key: string]: number[];
};
const hourlyCharge: HourlyCharge = {
  "Lotus Water": [1.4, 0.5],
  "Lucky Water": [1.1, 0.4],
  "Water Lilies": [1.7, 0.6],
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
  const eachVillagerAquaData: DataPoint[] = [];
  const startDate = new Date(year, month, date);
  startDate.setHours(0);
  const endDate = new Date();
  let currentDate = new Date();
  currentDate = startDate;
  let time = startDate.getHours();
  while (currentDate < endDate) {
    for (let current_hour = time; current_hour < 24; current_hour++) {
      currentDate.setHours(current_hour, 0, 0, 0);
      let timestamp: Date = new Date(currentDate);
      const value = Math.random() * 3;
      eachVillagerAquaData.push({ timestamp, value });
    }
    time = 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return eachVillagerAquaData;
};
const villagersData: VillagerData[] = [];
villagersData.push({
  name: "Ranga",
  smartMeterId: "sm-0",
  waterVendor: "Lotus Water",
  data: generateHourlyBasedData(2023, 0, 2),
});
villagersData.push({
  name: "Srini",
  smartMeterId: "sm-1",
  waterVendor: "Lucky Water",
  data: generateHourlyBasedData(2023, 0, 2),
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
): object {
  let dateData: object = {};
  for (
    let currentDate: Date = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const villagerSubData: DataPoint[] | undefined = villagerData.filter(
      (obj) => obj.timestamp?.getDate() === currentDate.getDate()
    );
    if(villagerSubData){
    dateData[currentDate.toDateString()] = getAddedDateData(villagerSubData);
  }}
  return dateData;
}
function getAddedDateData(villagerData: DataPoint[]): number[] {
  let normalHourWater: number = 0;
  let peakHourWater: number = 0;
  const WaterData: DataPoint[] = villagerData;
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
  }
  return [normalHourWater, peakHourWater];
}
function getPastMonthData(villagerData: DataPoint[], month: number) {
  const villagerSubData = villagerData.filter(
    (obj) => obj.timestamp.getMonth() === month
  );
  const monthlyData: number[] = getAddedDateData(villagerSubData);
  return monthlyData;
}
function getWeeklyWiseData(villagerData: DataPoint[]) {
  let weekCurrentDate: Date = new Date();
  let weekStartDate: Date = new Date();
  weekCurrentDate.setDate(weekCurrentDate.getDate() - 1);
  weekStartDate.setDate(weekStartDate.getDate() - 7);
  return getDateWiseData(weekStartDate, weekCurrentDate, villagerData);
}
function getCost(waterData: number[], waterVendor: string) {
  return (
    waterData[0] * hourlyCharge[waterVendor][0] +
    waterData[1] * hourlyCharge[waterVendor][1]
  );
}
function getComparisionOfCost(hourlyCharge, waterData: number[]) {
  console.log(
    "Comparision of data:\nNormal hour water:",
    waterData[1],
    "\nPeak hour water:",
    waterData[0]
  );
  for (const key of Object.keys(hourlyCharge)) {
    let cost = getCost(waterData, key);
    console.log("Vendor Name:", key, "\nPrice:", cost);
  }
}
const prompt = require("prompt-sync")();
const meterId = prompt("Enter Id: ");
const villagerSubObject = villagersData.find(
  (obj) => obj.smartMeterId === meterId
);
const endDate1 = new Date();
const pastMonth = new Date().setMonth(endDate1.getMonth() - 1);
if (villagerSubObject != undefined) {
  const month = endDate1.getMonth() - 1;
  const pastMonthData: number[] = getPastMonthData(
    villagerSubObject.data,
    month
  );
  console.log(villagerSubObject?.data);
  console.log(
    "Hello ",
    villagerSubObject?.name,
    "\nYour Id:",
    villagerSubObject?.smartMeterId,
    "\nVendor type:",villagerSubObject.waterVendor
  );
  console.log(
    "Available services:\n1.You can get Past month gallons of water usage.\n2.You can get Past month water cost.\n3.You can get total cost for past one week.\n4.You can get gallons of water used daily wise and cost for the same date.\n5.You can compare prices for all the vendors\n0.For exit"
  );
  let option = prompt("Enter 0 to 5: ");
  while (option) {
    if (option=="1") {
      console.log(
        "........You requested for Past month water usage data........"
      );
      let total: number = pastMonthData[0] + pastMonthData[1];
      console.log(
        "Total gallons of water used :",
        total,
        "\nPeak hour gallons of water used:",
        pastMonthData[0],
        "\nNormal hour gallons of water usage:",
        pastMonthData[1]
      );
    } else if (option ==="2") {
      console.log(
        "........You requested for Past month water Price costed........"
      );
      console.log(
        "Total Cost:",
        getCost(pastMonthData, villagerSubObject.waterVendor)
      );
    } else if (option ==="3") {
      console.log("........You requested for Past one week data........");
      const weekWaterData: Object = getWeeklyWiseData(villagerSubObject.data);
      let total: number = 0;
      if (weekWaterData)
        for (const ele of Object.values(weekWaterData)) {
          total += getCost(ele, villagerSubObject.waterVendor);
        }
      console.log("Total Cost during past one week:", total);
    } else if (option ==="4") {
      console.log("........You requested for Daily wise data........");
      let dateString = prompt("Enter starting date (YYYY-MM-DD):");
      let rangeStartDate: Date = new Date(dateString);
      dateString = prompt("Enter Ending date(YYYT-MM-DD):");
      let rangeEndDate: Date = new Date(dateString);
      let sum: number = 0;
      const dailyData = getDateWiseData(
        rangeStartDate,
        rangeEndDate,
        villagerSubObject.data
      );
      if (dailyData) {
        console.log("Date Wise Data:");
        for (const [key, value] of Object.entries(dailyData)) {
          let dailyCostSum = 0;
          dailyCostSum = getCost(value, villagerSubObject.waterVendor);
          sum += dailyCostSum;
          let dailyWaterUsage = 0;
          dailyWaterUsage = value[0] + value[1];
          console.log(
            "Date:",
            key,
            "\nWater used:",
            dailyWaterUsage,
            "Water cost:",
            dailyCostSum
          );
        }
        console.log("Total Cost:", sum);
      }
    } else if (option === "5") {
      console.log(
        "........You requested for Comparision of vendor prices........"
      );
      let peak = prompt("Enter Peak hour water usage:");
      let normal = prompt("Enter normal hour water usage:");
      getComparisionOfCost(hourlyCharge, [peak, normal]);
    } else if (option == "0") {
      console.log("Bye", villagerSubObject.name, " thank you!");
      break;
    }
else{
  console.log("Sorry,You Entered Wrong option.0,1,2,3,4,5 only these options are avilable.\nEnter again");
}
option = prompt("Enter 0 to 5: ");}}
else {
  console.log("Sorry,You Entered Wrong details.\n Thank you!");
}


