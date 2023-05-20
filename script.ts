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
  const data: DataPoint[] = [];
  const startDate = new Date(year, month, date); //Starting reading from specified date
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
};
const villagersData: VillagerData[] = [];
villagersData.push({
  name: "Ranga",
  smartMeterId: "sm-0",
  waterVendor: "Lotus Water",
  data: generateHourlyBasedData(2023, 3, 1),
});
villagersData.push({
  name: "Srini",
  smartMeterId: "sm-1",
  waterVendor: "Lucky Water",
  data: generateHourlyBasedData(2023, 3, 1),
});
villagersData.push({
  name: "Naveen",
  smartMeterId: "sm-2",
  waterVendor: "Water Lilies",
  data: generateHourlyBasedData(2023, 3, 1),
});
console.log(villagersData);
/*
functions need to perform are :
1. As a villager I want to know how many gallons of water have been used in the past month ?
2. As a villager I want to know how much cost has been incurred for water usage for the past month? So that I can arrange money to pay the bill.
3. As a villager I want to know how much cost has been incurred for water usage for the past 1 week? So that I can control my water usage.
4. As a villager I want to know how many gallons of water used daily wise and cost for the same for a given date range.
5. As a villager I want to compare prices of all vendors if I use X amount of water in a day. So that I can choose a better and cheaper vendor for my needs.
6. As a villager I want to set a daily limit to my water usage so that I won't incur too much usage charges.
*/
const meterId = prompt("Enter MeterId: ");
const desiredObject = villagersData.find((obj) => obj.smartMeterId === meterId);
console.log(
  "Inputs for functions to performs:\n1. To get past month data\n2. To get cost for past month.\n3. Show incured cost of past one week.\n4. To get daily wise data.\n5. To compare prices 6.To set daily water limit.\n any thing else to exit"
);
const functionInput = prompt(
  "Enter option based on functionality required based on above data:"
);
/*switch(functionInput) { 
  case "1": { 
    getPastMonthData(desiredObject);
     break; 
  } 
  case "2": { 
     getPastMonthCost(desiredObject);
     break; 
  } 
  case "3": { 
    getPastWeekCost(desiredObject);
    break; 
 } 
 case "4": { 
    getDailyWiseData(desiredObject);
    break; 
 } 
 case "5": {
  comparePrices(desiredObject,villagersData);
  break; 
} 
case "6": { 
  limitWaterUsage(villagersData,meterId);
  break; 
} 
  default: { 
   console.log("Entered wrong inputs!\n exit");
  } 
} */