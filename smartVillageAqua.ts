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
):DataPoint[]=> {
  const eachVillagerAquaData: DataPoint[] = [];
  const dataStartDate = new Date(year, month, date);
  dataStartDate.setHours(0);
  const dataEndDate = new Date();
  let dataCurrentDate = new Date();
  dataCurrentDate = dataStartDate;
  let time = dataStartDate.getHours();
  while (dataCurrentDate <dataEndDate) {
    for (let current_hour = time; current_hour < 24; current_hour++) {
      if(dataCurrentDate<dataEndDate){
      dataCurrentDate.setHours(current_hour, 0, 0, 0);
      let timestamp: Date = new Date(dataCurrentDate);
      const value = Math.random() * 2;
      eachVillagerAquaData.push({ timestamp, value });
      }
    else{
      break;
    }}
    time = 0;
    dataCurrentDate.setDate(dataCurrentDate.getDate() + 1);
  }
  return(eachVillagerAquaData);
}
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
  data: generateHourlyBasedData(2023,0,1),
});
function getDateWiseData(
  rangeStartDate: Date,
  rangeEndDate: Date,
  villagerData: DataPoint[]
): object {
  let villagerDateObject: object = {};
  for (
    let currentDate: Date = new Date(rangeStartDate);
    currentDate <= rangeEndDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const villagerDateData: DataPoint[] | undefined = villagerData.filter(
      (obj) => obj.timestamp.toLocaleDateString() ===currentDate.toLocaleDateString()
    );
    if(villagerDateData){
    villagerDateObject[currentDate.toDateString()] = getAddedDateData(villagerDateData);
  }}
  return villagerDateObject;
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
function getPastMonthData(villagerData: DataPoint[], month: number):number[] {
  const villagerMonthData = villagerData.filter(
    (obj) => obj.timestamp.getMonth()===month && obj.timestamp.getFullYear()===endDate.getFullYear()
  );
  const monthlyData: number[] = getAddedDateData(villagerMonthData);
  return monthlyData;
}
function getWeeklyWiseData(villagerData: DataPoint[]):object {
  let weekCurrentDate: Date = new Date();
  let weekStartDate: Date = new Date();
  weekCurrentDate.setDate(weekCurrentDate.getDate() - 1);
  weekStartDate.setDate(weekStartDate.getDate() - 7);
  const weeklyData:object=getDateWiseData(weekStartDate, weekCurrentDate, villagerData);
  return weeklyData;
}
function getCost(waterData: number[], waterVendor: string):number{
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
const endDate = new Date();
if (villagerSubObject != undefined) {
  const month = endDate.getMonth() - 1;
  const pastMonthData: number[] = getPastMonthData(
    villagerSubObject.data,
    month
  );
  console.log(
    "Hello ",
    villagerSubObject?.name,
    "\nYour Id:",
    villagerSubObject?.smartMeterId,
    "\nVendor type:",villagerSubObject.waterVendor
  );
  console.log(
    "Note: Data is available from starting of this year.\nAvailable services:\n1.You can get Past month gallons of water usage.\n2.You can get Past month water cost.\n3.You can get total cost for past one week.\n4.You can get gallons of water used daily wise and cost for the same date.\n5.You can compare prices for all the vendors\n0.For exit"
  );
  let option = prompt("Enter 0 to 5 to get service: ");
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
        for (const [key,value] of Object.entries(dailyData)) {
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
      console.log("Thank you!");
      break;
    }
else{
  console.log("Sorry,You Entered Wrong option.0,1,2,3,4,5 only these options are avilable.\nEnter again");
}
option = prompt("Enter 0 to 5 to get service: ");}}
else {
  console.log("Sorry,You Entered Wrong details.\nThank you!");
}

