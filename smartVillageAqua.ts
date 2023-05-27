import { type } from "os";
import * as fs from "fs";
interface HourlyCharge {
  [vender: string]: TypeHourData;
}
interface TypeHourData {
  peak: number;
  normal: number;
}
interface CombinedWaterConsumption {
  [Date: string]: number[];
}
const hourlyCharge: HourlyCharge = {
  "Lotus Water": { peak: 1.4, normal: 0.5 },
  "Lucky Water": { peak: 1.1, normal: 0.4 },
  "Water Lilies": { peak: 1.7, normal: 0.6 },
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
function getDateWiseData(
  rangeStartDate: Date,
  rangeEndDate: Date,
  villagerData: DataPoint[]
):CombinedWaterConsumption {
  let villagerDateObject: CombinedWaterConsumption = {};
  for (
    let currentDate: Date = new Date(rangeStartDate);
    currentDate <= rangeEndDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const villagerDateData: DataPoint[] | undefined = villagerData.filter(
      (obj) =>
        obj.timestamp.toLocaleDateString() === currentDate.toLocaleDateString()
    );
    if (villagerDateData) {
      villagerDateObject[currentDate.toDateString()] =
      getCombinedWaterConsumption(villagerDateData);
    }
  }
  return villagerDateObject;
}
function getCombinedWaterConsumption(villagerData: DataPoint[]): number[] {
  let normalHourWater: number = 0;
  let peakHourWater: number = 0;
  const WaterData: DataPoint[] = villagerData;
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
function getPastMonthData(villagerData: DataPoint[], month: number): number[] {
  const villagerMonthData = villagerData.filter(
    (obj) =>
      obj.timestamp.getMonth() === month &&
      obj.timestamp.getFullYear() === endDate.getFullYear()
  );
  const monthlyData: number[] = getCombinedWaterConsumption(villagerMonthData);
  return monthlyData;
}
function getWeeklyWiseData(villagerData: DataPoint[]): CombinedWaterConsumption {
  let weekCurrentDate: Date = new Date();
  let weekStartDate: Date = new Date();
  weekCurrentDate.setDate(weekCurrentDate.getDate() - 1);
  weekStartDate.setDate(weekStartDate.getDate() - 7);
  const weeklyData: CombinedWaterConsumption = getDateWiseData(
    weekStartDate,
    weekCurrentDate,
    villagerData
  );
  return weeklyData;
}
function getCost(waterData: number[], waterVendor: string): number {
  return (
    waterData[0] * hourlyCharge[waterVendor].peak +
    waterData[1] * hourlyCharge[waterVendor].normal
  );
}
function getComparisionOfCostData(hourlyCharge, waterData: number[]):[string,number][]
{let priceObject:object = {};
  for (const vendor of Object.keys(hourlyCharge)) {
  priceObject[vendor] = getCost(waterData, vendor);
}
let entries:[string,number][]= Object.entries(priceObject).sort((a, b) => a[1] - b[1]);// sorting based on the values 
return entries
}
function showComparisionOfCost(hourlyCharge) {
  console.log(
    "........You requested for Comparision of vendor prices........"
  );
  let peak = prompt("Enter Peak hour water usage:");
  let normal = prompt("Enter normal hour water usage:");
  let priceObject:[string,number][]=getComparisionOfCostData(hourlyCharge, [peak,normal]);
  console.log(
    "Comparision of data:\nNormal hour water:",
    normal,
    "\nPeak hour water:",
    peak
  );
  for(const[vendor,price] of priceObject)
    console.log("Vendor Name:", vendor, "\nPrice:", price);
}
function showPastMonthData(pastMonthData: number[]) {
  console.log("........You requested for Past month water usage data........");
  let total: number = pastMonthData[0] + pastMonthData[1];
  console.log(
    "Total gallons of water used :",
    total,
    "\nPeak hour gallons of water used:",
    pastMonthData[0],
    "\nNormal hour gallons of water usage:",
    pastMonthData[1]
  );
}
function showPastMonthCost(
  pastMonthData: number[],
  villagerSubObject: VillagerData
) {
  console.log(
    "........You requested for Past month water Price costed........"
  );
  console.log(
    "Total Cost:",
    getCost(pastMonthData, villagerSubObject.waterVendor)
  );
}
function showPastWeekData(villagerSubObject: VillagerData) {
  console.log("........You requested for Past one week data........");
  const weekWaterData: Object = getWeeklyWiseData(villagerSubObject.data);
  let total: number = 0;
  for (const ele of Object.values(weekWaterData)) {
    total += getCost(ele, villagerSubObject.waterVendor);
  }
  console.log("Total Cost during past one week:", total);
}
function showDailyWiseData(villagerSubObject: VillagerData) {
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
  console.log("Date Wise Data:");
  for (const [date, data] of Object.entries(dailyData)) {
    let dailyCostSum = 0;
    dailyCostSum = getCost(data, villagerSubObject.waterVendor);
    sum += dailyCostSum;
    let dailyWaterUsage = 0;
    dailyWaterUsage = data[0] + data[1];
    console.log(
      "Date:",
      date,
      "\nWater used:",
      dailyWaterUsage,
      "Water cost:",
      dailyCostSum
    );
  }
  console.log("Total Cost:", sum);
}
function readJsonData(fileName: string, filePath: string): VillagerData[] {
  const villagerDataString = fs.readFileSync(filePath + fileName, "utf-8");
  let villagersData: VillagerData[] = JSON.parse(villagerDataString);
  villagersData.forEach((villager) => {
    villager.data.forEach((element) => {
      element.timestamp = new Date(element.timestamp);
    });
  });
  return villagersData;
}
function quairyVendor() {
  while (villagerSubObject == undefined) {
    console.log("Entered wrong details or if dont want services enter 0 ");
    meterId = prompt("Enter Id agin: ");
    if (meterId == 0) {
      console.log("Exited, Thank You");
      break;
    }
  }
}
function showDetailsToVendor() {
  if (villagerSubObject) {
    console.log(
      "Hello ",
      villagerSubObject.name,
      "\nYour Id:",
      villagerSubObject.smartMeterId,
      "\nVendor type:",
      villagerSubObject.waterVendor
    );
    console.log(
      "Note: Data availabel from starting of this year.\nAvailable services:\n1.You can get Past month gallons of water usage.\n2.You can get Past month water cost.\n3.You can get total cost for past one week.\n4.You can get gallons of water used daily wise and cost for the same date.\n5.You can compare prices for all the vendors\n0.For exit"
    );
  }
}
function performActions(villagerSubObject: VillagerData) {
  const month = endDate.getMonth() - 1;
  const pastMonthData: number[] = getPastMonthData(
    villagerSubObject.data,
    month
  );
  while (true) {
    if (option == "0") {
      console.log("Thank You");
      break;
    }
    if (option == "1") {
      showPastMonthData(pastMonthData);
    } else if (option == "2") {
      showPastMonthCost(pastMonthData, villagerSubObject);
    } else if (option == "3") {
      showPastWeekData(villagerSubObject);
    } else if (option === "4") {
      showDailyWiseData(villagerSubObject);
    } else if (option === "5") {
      showComparisionOfCost(hourlyCharge);
    } else if (!option) {
      console.log("Enter anything, it can't be empty");
    } else {
      console.log(
        "Sorry,You Entered Wrong option.1,2,3,4,5 only these options are avilable.\nEnter again or to exit enter 0"
      );
    }
    option = prompt("Enter 0 to 5 to get service: ");
  }
}
var filePath = "/Users/sankeerthana/Desktop/typescript/smart_village/";
var fileName = "villagersdata.json";
const villagersData = readJsonData(fileName, filePath);
const prompt = require("prompt-sync")();
let meterId = prompt("Enter Id: ");
const endDate = new Date();
const villagerSubObject = villagersData.find(
  (obj) => obj.smartMeterId == meterId
);
while (villagerSubObject == undefined) {
  console.log("Entered wrong details or if dont want services enter 0 ");
  meterId = prompt("Enter Id agin: ");
  if (meterId == 0) {
    console.log("Exited, Thank You");
    break;
  }
}
showDetailsToVendor();
let option = prompt("Enter 0 to 5 to get service: ");
if (villagerSubObject) {
  performActions(villagerSubObject);
}
