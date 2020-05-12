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
      let inhospital = information.data.local_total_number_of_individuals_in_hospitals;

      let tpcr = information.data.total_pcr_testing_count;
      let dailypcrdata = information.data.daily_pcr_testing_data;
      let ydaypcrcount = dailypcrdata.slice(-1)[0].count;
      let ydaypcrdate = dailypcrdata.slice(-1)[0].date;

      let mrdm, mrdm_ta, mrdm_si;
      let format = parseInt(updatedTime.split(" ")[1].substr(0, 2));
      // console.log(format);
      if (format < 12) {
        mrdm = "AM";
        mrdm_ta = "முற்பகல்";
        mrdm_si = "පෙරවරු";
      }
      else if (format == 12) {
        mrdm = "PM";
        mrdm_ta = "மாலை";
        mrdm_si = "පස්වරු";
      }
      else if (format > 12 && format <= 23) {
        mrdm = "PM";
        mrdm_ta = "மாலை";
        mrdm_si = "පස්වරු";
      }
      else if (format == 00) {
        mrdm = "AM";
        mrdm_ta = "முற்பகல்";
        mrdm_si = "පෙරවරු";
      }

      document.getElementById("total-pcr").innerHTML = tpcr.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("yesterday-pcr").innerHTML = ydaypcrcount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("last-pcr-date").innerHTML = ydaypcrdate;

      document.getElementById("in-hospitals").innerHTML = inhospital.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');


      document.getElementById("last-time-updated").innerHTML = "On " + updatedTime.split(" ")[0] + "<br /> At " + updatedTime.split(" ")[1].substr(0, 5) + " " + mrdm;
      document.getElementById("last-time-updated-ta").innerHTML = updatedTime.split(" ")[0] + " நாள்" + "<br />" + mrdm_ta + " " + updatedTime.split(" ")[1].substr(0, 5);
      document.getElementById("last-time-updated-si").innerHTML = updatedTime.split(" ")[0] + " දින" + "<br />" + mrdm_si + " " + updatedTime.split(" ")[1].substr(0, 5) + " ට";

      document.getElementById("global-total").innerHTML = globalTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("global-new").innerHTML = globalNew.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("global-deaths").innerHTML = globalDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("global-new-deaths").innerHTML = globalNewDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("global-recovered").innerHTML = globalRecovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

      document.getElementById("total-cases").innerHTML = totalCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("active-cases").innerHTML = activeCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("new-cases").innerHTML = newCases.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      //document.getElementById("new-deaths").innerHTML = newDeaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("recovered").innerHTML = recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      document.getElementById("deaths").innerHTML = deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

      //let h1 = information.data.hospital_data[0].hospital.name;

      //document.getElementById("hp1n").innerHTML = h1;




      $(document).ready(function () {

        //console.log(globalTotal.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));


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
              let lut_ta, lut_si;

              let hmrdm, hmrdm_ta, hmrdm_si;
              let htformat = parseInt(lut.split(" ")[1].substr(0, 2));
              // console.log(htformat);


              if (htformat < 12) {
                hmrdm = "AM";
                hmrdm_ta = "முற்பகல்";
                hmrdm_si = "පෙරවරු";
              }
              else if (htformat == 12) {
                hmrdm = "PM";
                hmrdm_ta = "மாலை";
                hmrdm_si = "පස්වරු";
              }
              else if (htformat > 12 && format <= 23) {
                hmrdm = "PM";
                hmrdm_ta = "மாலை";
                hmrdm_si = "පස්වරු";
              }
              else if (htformat == 00) {
                hmrdm = "AM";
                hmrdm_ta = "முற்பகல்";
                hmrdm_si = "පෙරවරු";
              }

              document.getElementById("hpn").innerHTML = hn;
              document.getElementById("hpnsi").innerHTML = hnsi;
              document.getElementById("hpnta").innerHTML = hnta;

              document.getElementById("hplt").innerHTML = "On " + lut.split(" ")[0] + "<br /> At " + lut.split(" ")[1].substr(0, 5) + " " + hmrdm;
              document.getElementById("hplt_ta").innerHTML = updatedTime.split(" ")[0] + " நாள்" + "<br />" + hmrdm_ta + " " + lut.split(" ")[1].substr(0, 5);
              document.getElementById("hplt_si").innerHTML = updatedTime.split(" ")[0] + " දින" + "<br />" + hmrdm_si + " " + lut.split(" ")[1].substr(0, 5) + " ට";

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
