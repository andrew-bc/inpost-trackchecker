const urlTracking = "https://api-shipx-pl.easypack24.net/v1/tracking/";
const urlStatuses = "https://api-shipx-pl.easypack24.net/v1/statuses";
const form = document.querySelector(".form");
const input = document.querySelector(".track-number");
const mainTrackInfo = document.querySelector(".main__trackinfo");
const mainError = document.querySelector(".main__error");
const mainTrackNumber = document.querySelector(".main__tracknumber");
const historyRow = document.querySelector(".history__row");
const history = document.querySelector(".history");

let resp;


let updateTrackInfo = (trackNumber) => {
    console.log(urlTracking + trackNumber);
    fetch(urlTracking + trackNumber)
        .then((resp) => {
            resp.json()
        })
        .then((data) => {

            }

        )
        .catch(function(error) {
            console.log(error);
        });
}




let state = {
    trackNumber: "",
}

const handleSubmit = async(e) => {
    e.preventDefault();
    state.trackNumber = input.value;
    //updateTrackInfo(state.trackNumber);
    try {
        const response = await fetch(urlTracking + state.trackNumber);
        const data = await response.json();
        let statuses;

        if (response.ok) {
            mainTrackInfo.style.display = "block";
            historyRow.innerHTML = "";
            history.style.display = "block";
            mainError.style.display = "none";
            mainTrackNumber.textContent = state.trackNumber;

            try {
                const responseStatuses = await fetch(urlStatuses);
                const dataStatuses = await responseStatuses.json();
                statuses = dataStatuses;
                console.log("Resp: ", responseStatuses);
                console.log("dataStatuses: ", dataStatuses);
            } catch (error) {
                console.log(error);
            }


            data.tracking_details.forEach((element, index) => {
                let options = { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short', year: 'numeric' };
                let date = new Date(element.datetime);

                //console.log(today.toLocaleDateString("pl-PL", options)); // Saturday, September 17, 2016

                if (index == 0) {
                    //console.log(statuses.items.find(e => e.name == element.status).description);
                    historyRow.innerHTML = historyRow.innerHTML +
                        `<div class="history__item">
                        <div class="history__date">${date.toLocaleDateString("pl-PL", options)}</div>
                        <div class="history__event">
                            <div class="histoty__name">${statuses.items.find(e => e.name == element.status).title}</div>
                            <div class="history__description">${statuses.items.find(e => e.name == element.status).description}</div>
                         </div>
                     </div>`;
                } else {
                    historyRow.innerHTML = historyRow.innerHTML +
                        `<div class="history__item">
                    <div class="history__date">${date.toLocaleDateString("pl-PL", options)}</div>
                    <div class="history__event">
                        <div class="histoty__name">${statuses.items.find(e => e.name == element.status).title}</div>
                     </div>
                 </div>`;

                }

                //console.log(statuses.items.find(e => e.name == s).title);

            });
            //console.log(statuses.items.find(e => e.name == "created").title);

        } else {
            mainTrackInfo.style.display = "none";
            mainError.style.display = "block";
            history.style.display = "none";
        };

        //console.log("Responce: ", response);
        //console.log("Data: ", data);


    } catch (error) {
        console.log(error);
    }

}

form.addEventListener("submit", handleSubmit);