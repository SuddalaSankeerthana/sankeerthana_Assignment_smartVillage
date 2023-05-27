import * as fs from "fs";
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
  const dataStartDate = new Date(year, month, date);
  dataStartDate.setHours(0);
  const dataEndDate = new Date();
  let dataCurrentDate = new Date();
  dataCurrentDate = dataStartDate;
  let time = dataStartDate.getHours();
  while (dataCurrentDate < dataEndDate) {
    for (let current_hour = time; current_hour < 24; current_hour++) {
      if (dataCurrentDate < dataEndDate) {
        dataCurrentDate.setHours(current_hour, 0, 0, 0);
        let timestamp: Date = new Date(dataCurrentDate);
        const value = Math.random() * 2;
        eachVillagerAquaData.push({ timestamp, value });
      } else {
        break;
      }
    }
    time = 0;
    dataCurrentDate.setDate(dataCurrentDate.getDate() + 1);
  }
  return eachVillagerAquaData;
};
const villagersData: VillagerData[] =[]
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
const json = JSON.stringify(villagersData);
const jsonContent = JSON.parse(json);
const filePath = "/Users/sankeerthana/Desktop/typescript/smart_village/";
const fileName = "villagersdata.json";
fs.writeFile(filePath+fileName, json, (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('File saved successfully.');
    }
  });
