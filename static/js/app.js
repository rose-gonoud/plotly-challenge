// This function is called when a dropdown menu item is selected
function optionChanged(ID) {
    d3
    .json("https://raw.githubusercontent.com/rose-gonoud/plotly-challenge/master/data/samples.json")
    .then((samples) => {

        arr = samples.names;
        IDindex = arr.indexOf(ID);
        console.log(IDindex);

        var patient = samples.samples[IDindex];

        var barData = []
        for (var i=0; i < patient.sample_values.length; i++) {
            var barDatum = {"sample_value": patient.sample_values[i], "otu_id": patient.otu_ids[i], "otu_label": patient.otu_labels[i]};
            barData.push(barDatum); 
        };
        console.log(barData);

        var xdata = [];
        var ydata = [];
        var labels = barData.map(datum => {
            return datum.otu_label;
        });

        for (var i=0; i < barData.length; i++) {
            currentDatum = barData[i];
            xdata.push(currentDatum.sample_value);
            ydata.push(currentDatum.otu_id);
        };

        var data = [{
            type: 'bar',
            x: xdata.slice(0, 10).reverse(),
            y: ydata.map(otu_id => {
                    return `OTU ${otu_id}`
                }).slice(0, 10).reverse(),
            orientation: 'h',
            hovertext: labels.slice(0, 10).reverse(),
          }];

        var layout = {
            title: `Subject ${ID}'s Top Ten Bellybutton Micro-Organisms`
        }
          
        Plotly.newPlot('bar', data, layout);

   
        // making the y-values from the bar chart the x-values for the bubble chart
        bubbleX = ydata
        // making the x-values from the bar chart the y-values for the bubble chart
        bubbleY = xdata

        var trace1 = {
            x: bubbleX,
            y: bubbleY,
            mode: 'markers',
            marker: {
              color: bubbleX,
              size: bubbleY
            },
            text: labels
          };
          
        var data = [trace1];
          
          var layout = {
            title: 'Bellybutton Biodiversity',
            showlegend: false,
          };
          
        Plotly.newPlot('bubble', data, layout);
        
    });
};


d3
    .json("https://raw.githubusercontent.com/rose-gonoud/plotly-challenge/master/data/samples.json")
    
    .then((samples) => {

        console.log(samples);
        dropdownVals = samples.names;

        // Populate dropdown menu w/ options
        var dropdownMenu = d3.select("#selDataset");
        var options = dropdownMenu.selectAll("option")
            .data(dropdownVals)
            .enter()
            .append("option")
            .text(function(d) {
                return d;
            });

        optionChanged(dropdownMenu.property("value"));
});