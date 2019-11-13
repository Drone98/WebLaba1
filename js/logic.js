document.getElementById('search').addEventListener("submit", e => {
    let mycity = e.target['city'].value;
    axios.get("http://api.openweathermap.org/data/2.5/weather",
            search(mycity)
        ,
        {
        timeout: 1000
    })
        .then(response => {
            show(response.data)
        })
        .catch(error => {
            showError(error.response);
        });

    e.preventDefault();
});

function search(city) {
        let params = {
            q: city,
            lang: "ru",
            units: "metric",
            appid: "3494b8f1c8f596aee028c113d9cf5e78"
        }
        return params
}

function show(data) {
    let container = document.getElementsByClassName("container")[0];
    let source = document.getElementById("entry-template").innerHTML;
    let template = Handlebars.compile(source);
    container.innerHTML = template(data);
}

function showError(response) {
    let container = document.getElementsByClassName("container")[0];
    let error = "Проблемы с интернет-соединением.";

    if (response) {
        if (response.status === 404) {
            error = "Город не найден."
        } else {
            error = "Проблемы с сервером."
        }
    }

    let source = document.getElementById("error-template").innerHTML;
    let template = Handlebars.compile(source);
    let data = { "error": error };

    container.innerHTML = template(data);
}