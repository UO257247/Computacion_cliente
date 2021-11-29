// https://www.eia.gov/opendata/
// https://www.eia.gov/opendata/commands.php

class NatGas {
    constructor() {
        this.mapSeriesId = new Map();

        // Series ID: https://www.eia.gov/opendata/qb.php?category=714806
        this.mapSeriesId.set("NewYork", "NG.N3010NY3.M");
        this.mapSeriesId.set("Texas", "NG.N3010TX3.M");
        this.mapSeriesId.set("California", "NG.N3010CA3.M");
        this.mapSeriesId.set("Florida", "NG.N3010FL3.M");
        this.mapSeriesId.set("Kentucky", "NG.N3010KY3.M");
        this.mapSeriesId.set("Ohio", "NG.N3010OH3.M");
        this.mapSeriesId.set("Wisconsin", "NG.N3010WI3.M");
    }

    loadData(location) {
        let result = new Object();

        result.seriesId = this.mapSeriesId.get(location);
        result.apiKey = "e456246f063eda5bcb1f9bc9b9945e4e";
        result.url = "http://api.eia.gov/series/?series_id=" + result.seriesId + "&api_key=" + result.apiKey + "&out=json";

        result.onSuccess = this.onSuccess.bind(this);
        result.onError = this.onError.bind(this);

        $.ajax({
            dataType: "json",
            url: result.url,
            method: 'GET',
            success: function(data) {
                result.data = data;
                result.onSuccess(result);
            },
            error: function() {
                result.onError(result);
            }
        });
    }



    onError(result) {
        console.log("ERROR!");
    }

    onSuccess(result) {
        console.log("SUCCESS:");
        console.log(result.data);

        let series = result.data.series[0];

        const data = {
            labels: this.generateLabels(series),
            datasets: [{
                label: series.description,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: this.generatedata(series),
            }]
        };
        this.updateChart(data);
    }

    generateLabels(series) {
        let result = [];
        for (let i = series.data.length - 1; i >= 0; i--) // Recibimos más recientes primero
        {
            let entry = series.data[i];
            result.push(entry[0]);
        }
        return result;
    }

    generatedata(series) {
        let result = [];
        for (let i = series.data.length - 1; i >= 0; i--) // Recibimos más recientes primero
        {
            let entry = series.data[i];
            result.push(entry[1]);
        }
        return result;
    }

    updateChart(chartData) {
        const config = {
            type: 'line',
            data: chartData,
            options: {}
        };

        if (this.myChart) {
            this.myChart.destroy();
        }
        this.myChart = new Chart(
            document.getElementById('myChart'),
            config
        );
    }

}

var natGas = new NatGas();

$(document).ready(function() {
    natGas.loadData("NewYork");
    $("#NewYork").click(function() {
        natGas.loadData("NewYork")
    });
    $("#Texas").click(function() {
        console.log("BLABLABLA")
        natGas.loadData("Texas")
    });
    $("#California").click(function() {
        natGas.loadData("California")
    });
    $("#Kentucky").click(function() {
        natGas.loadData("Kentucky")
    });
    $("#Ohio").click(function() {
        natGas.loadData("Ohio")
    });
    $("#Wisconsin").click(function() {
        natGas.loadData("Wisconsin")
    });
});