function start(){
    document.getElementById('search').addEventListener("submit", e => {
        var result = async () => await search(e.target['city'].value).data;
        console.log("lol1:   ", result());
        e.preventDefault();
    });
}

async function search(city) {
    await axios.get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: city,
            lang: "ru",
            units: "metric",
            appid: "664a8b78c394bddfedbff1aa229519a8"
        }
    }, {
        timeout: 1000
    })
        .then( response => {
            this.result = response.data;
            console.log("data:   ", this.result);
        })
        .catch( error => {
            this.result = error.response;
            console.log("error:   ", result);
        });
    console.log("result:   ", result);
    return this.result;
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
