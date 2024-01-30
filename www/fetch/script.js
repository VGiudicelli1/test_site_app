let chart = document.getElementById("chart");

let p1 = fetch("https://api.coincap.io/v2/assets/bitcoin/history?interval=d1")
.then(r => r.json())
.then(r => ({
        valeurs: r.data.map(e => e.priceUsd-0),
        dates: r.data.map(e => e.date)
    })
);

let p2 = fetch("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json")
.then(r => r.json())
.then(r => r.usd.eur);


Promise.all([p1, p2])
.then(([data, change]) => { 
    new Chart(chart, {
        type: 'bar',
        data: {
            labels: data.dates,
            datasets: [{
                label: "price (€)",
                data: data.valeurs.map(v => v*change)
            }]
        }
    })
 });