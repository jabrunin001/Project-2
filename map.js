d3.csv(
    "https://raw.githubusercontent.com/jabrunin001/Project-2/main/netflix_expansion.csv",
    function (err, rows) {
      function unpack(rows, key) {
        return rows.map(function (row) {
          return row[key];
        });
      }
  
      var data = [
        {
          type: "choropleth",
          locationmode: "country names",
          locations: unpack(rows, "country"),
          z: unpack(rows, "country_added"),
          text: unpack(rows, "location"),
          autocolorscale: true,
          reversescale: true
        }
      ];
  
      var layout = {
        title: "Netflix Expansion as of 2021",
        geo: {
          projection: {
            type: "robinson"
          }
        }
      };
  
      Plotly.newPlot("myDiv", data, layout, { showLink: false });
    }
  );