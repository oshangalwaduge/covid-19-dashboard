fetch("https://www.hpb.health.gov.lk/api/get-current-statistical")
  .then(function (response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }
    else {
      console.log("Connection Successful.")
    }

    // Examine the text in the response
    response.json().then(function (information) {
      //console.log(information);
      let updatedTime = information.data.update_date_time;
      let globalTotal = information.data.global_total_cases;
      let globalNew = information.data.global_new_cases;
      let globalDeaths = information.data.global_deaths;
      let globalNewDeaths = information.data.global_new_deaths;
      let globalRecovered = information.data.global_recovered;

      let totalCases = information.data.local_total_cases;
      let activeCases = information.data.local_active_cases;
      let newCases = information.data.local_new_cases;
      let newDeaths = information.data.local_new_deaths;
      let recovered = information.data.local_recovered;
      let deaths = information.data.local_deaths;

      document.getElementById("last-time-updated").innerHTML = updatedTime;
      document.getElementById("global-total").innerHTML = globalTotal;
      document.getElementById("global-new").innerHTML = globalNew;
      document.getElementById("global-deaths").innerHTML = globalDeaths;
      document.getElementById("global-new-deaths").innerHTML = globalNewDeaths;
      document.getElementById("global-recovered").innerHTML = globalRecovered;

      document.getElementById("total-cases").innerHTML = totalCases;
      document.getElementById("active-cases").innerHTML = activeCases;
      document.getElementById("new-cases").innerHTML = newCases;
      document.getElementById("new-deaths").innerHTML = newDeaths;
      document.getElementById("recovered").innerHTML = recovered;
      document.getElementById("deaths").innerHTML = deaths;

      //let h1 = information.data.hospital_data[0].hospital.name;

      //document.getElementById("hp1n").innerHTML = h1;





      $(document).ready(function () {
        $('#hddm > a').on('click', function () {
          //console.log($(this).attr('id'));
          document.getElementById("hdd").innerHTML = $(this).text();

          let i;
          for (i = 0; i <= information.data.hospital_data.length; i++) {
            if ($(this).attr('id') == i) {
              let hn = information.data.hospital_data[i].hospital.name;
              let hnsi = information.data.hospital_data[i].hospital.name_si;
              let hnta = information.data.hospital_data[i].hospital.name_ta;
              let lut = information.data.hospital_data[i].hospital.updated_at;
              let cl = information.data.hospital_data[i].cumulative_local;
              let cf = information.data.hospital_data[i].cumulative_foreign;
              let tl = information.data.hospital_data[i].treatment_local;
              let tf = information.data.hospital_data[i].treatment_foreign;

              document.getElementById("hpn").innerHTML = hn;
              document.getElementById("hpnsi").innerHTML = hnsi;
              document.getElementById("hpnta").innerHTML = hnta;
              document.getElementById("hplt").innerHTML = lut;
              document.getElementById("cumulativelocal").innerHTML = cl;
              document.getElementById("cumulativeforeign").innerHTML = cf;
              document.getElementById("treatmentlocal").innerHTML = tl;
              document.getElementById("treatmentforeign").innerHTML = tf;
              //console.log(hnsi);
              // i = i + 1;
            }
          }

        });
      });










      //console.log(updatedTime);
    });
  })
  .catch(function (err) {
    console.log("Fetch Error :-S", err);
  });
