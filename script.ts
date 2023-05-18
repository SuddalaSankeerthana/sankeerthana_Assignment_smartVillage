{interface DataPoint {
  timestamp: Date;
  value: number;
}
const data: DataPoint[] = [];
var generateHourlyData=(year:number,month:number,date:number)=> {
  const startDate = new Date(year, month,date);//Starting reading with specified date
  startDate.setUTCHours(0);//Starting reading data from 0 hours according to UTC for Starting point
  const endDate = new Date(); //current time
  let currentDate = new Date();//creating another date object variable
  currentDate = startDate;
  let time = startDate.getHours();
  while (currentDate < endDate) {
    for (let hour = time; hour < 24; hour++) {
      const timestamp:Date = currentDate;
      timestamp.setHours(hour);
      const value = Math.random() * 3;
      data.push({ timestamp, value });
    }
    time=0;
    currentDate.setDate(currentDate.getDate() + 1);
  }
return data;
}
generateHourlyData(2023,4,18);
console.log(data)
}
