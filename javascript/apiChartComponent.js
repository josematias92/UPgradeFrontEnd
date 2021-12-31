import { getINFO } from "./apiConsumption.js";

const template = document.createElement('template');
template.innerHTML = `
    <style>
        button {
            padding: 15px 15px;
            border-radius: 22px;
            background-color: #4c45ce;
            color: white;
            border: none;
        }
    </style>
    <h3> </h3>
    <button> API </button>
`;

class ChartAPI extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    }
    async getAPI() {
        const info = await getINFO();
        console.log(info);
        const name = info["Meta Data"]["2. Symbol"];
        const now = new Date();
        const yesterday = new Date();

        const high = Number(info['Time Series (5min)']['2021-12-30 10:10:00']['2. high'])
        const high2 = Number(info['Time Series (5min)']['2021-12-30 11:10:00']['2. high'])
        const high3 = Number(info['Time Series (5min)']['2021-12-30 12:10:00']['2. high'] )
        const high4 = Number( info['Time Series (5min)']['2021-12-30 13:10:00']['2. high'] )
        const high5 = Number( info['Time Series (5min)']['2021-12-30 14:10:00']['2. high'] )


        const low = Number(info['Time Series (5min)']['2021-12-30 10:10:00']['3. low'])
        const low2 = Number(info['Time Series (5min)']['2021-12-30 11:10:00']['3. low'])
        const low3 = Number(info['Time Series (5min)']['2021-12-30 12:10:00']['3. low'])
        const low4 = Number(info['Time Series (5min)']['2021-12-30 13:10:00']['3. low'])
        
        
        const keys = Object.keys(info['Time Series (5min)'])
        const firstArray = [];
        
        for (let index = 0; index < keys.length; index++) {
           console.log( info['Time Series (5min)'][keys[index]]['2. high'] )
           console.log( info['Time Series (5min)'][keys[index]]['3. low'] )
            let creatingArray = [];
            let phrase = '';
            phrase += index;
            phrase += 'hr';

            if (index === 0) {
                creatingArray.push("Hour")
                creatingArray.push('High')
                creatingArray.push('Low')
            } else {
                creatingArray.push( phrase );
                creatingArray.push( Number(info['Time Series (5min)'][keys[index]]['2. high']) )
                creatingArray.push( Number(info['Time Series (5min)'][keys[index]]['3. low']) )
            }
            

            firstArray.push( creatingArray );
        }

        console.log(firstArray);
        

        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(firstArray);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
    }

    connectedCallback() {
        this.shadowRoot.querySelector('button').addEventListener('click', ()=>{ this.getAPI() })
    }
}

export { ChartAPI };