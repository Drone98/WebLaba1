function kikstarter(event){
    event.preventDefault();
        search(event.target['city'].value, axios).then(result => {
            if(result.data){
                this.showError(result);
            } else {
                this.show(result);
            }



    });
}

async function search(city, axios) {
    let result;
    await axios.get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            lang: "ru",
            units: "metric",
            appid: "664a8b78c394bddfedbff1aa229519a8"
        }
    })
        .then( response => {
            result = response.data;
        })
        .catch( error => {
            result = error.response;
        });
    return result;
}

function show(data) {
    let container = this.document.getElementsByClassName("container")[0];

    let source = this.document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);

    container.innerHTML = template(data);
}

function showError(response) {
    let container = this.document.getElementsByClassName("container")[0];

    let error = "Проблемы с интернет соединением";

    if (response) {
        if (response.status === 404) {
            error = "Город не найден"
        } else {
            error = "Проблемы с сервером"
        }
    }

    let source = this.document.getElementById("error-template").innerHTML;
    let template = Handlebars.compile(source);
    let data = { "error": error };

    container.innerHTML = template(data);
}

module.export = {kikstarter, search, show, showError}