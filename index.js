import express from 'express';

const app = express();
const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
  ];

app.get('/holidays', (req, res) => {
  res.send(holidays);
});

app.get('/is-today-holiday', (req, res) => {

    const today = new Date();
    const todayLocale = today.toLocaleDateString("en");
    let holidayResponse = `Não, hoje não é feriado`;

    for(let i=0; i<holidays.length; i++){   
        if(todayLocale === holidays[i].date){
            holidayResponse = `Sim, hoje é ${holidays[i].name}`;
        }
    }

  res.send(holidayResponse);
});

app.get('/holidays/:id', (req, res) => {
    const id = req.params.id;
    const monthDates = [];
    const noHoliday = "Não tem feriado nesse mês";
    let holidayDate = null;

    for(let i=0; i<holidays.length; i++){
        holidayDate = holidays[i].date.split("/");  
        if(id === holidayDate[0]){
            monthDates.push(holidays[i]);
        }
    }

  res.send(monthDates.length > 0? monthDates:noHoliday);
});

app.listen(4000);