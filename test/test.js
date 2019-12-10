const mocha = require('mocha');
const chai = require('chai');
const {show, showError, search} = require('../js/logic');
const {JSDOM} = require('jsdom');
const {spy} = require('sinon');
Handlebars = require('../libs/handlebars-v4.4.3');

let window;

let data = {
    "weather": [
        {
            "description": "пасмурно"
        }
    ],
    "main": {
        "temp":0,
        "pressure": 1000,
        "humidity": 90
    },
    "wind": {
        "speed": 5
    }
};

const assert = chai.assert;

describe('Test functions', () => {
    beforeEach(() => {
        const options = {
            contentType: 'text/html',
        };
        return JSDOM.fromFile("index.html", options).then((dom) => {
            window = dom.window;
        });
    });

    it('show', () => {
        show.call(window, data);
        assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
            '<li><span>Температура</span> <b>' + data.main.temp + ' °С</b></li>');
        assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
            '<li><span>Давление</span> <b>' + data.main.pressure + ' гПа</b></li>');
        assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
            '<li><span>Влажность</span> <b>' + data.main.humidity + ' %</b></li>');
        assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
            '<li><span>Скорость ветра</span> <b>' + data.wind.speed + ' м/c</b></li>');
        assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
            '<li><span>Описание</span> <b>' + data.weather[0].description + '</b></li>');

        /*
        it('show temperature', () => {
            show.call(window, data);
            assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
                '<li><span>Температура</span> <b>' + data.main.temp + ' °С</b></li>');
        });
        it('show pressure', () => {
            show.call(window, data);
            assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
                '<li><span>Давление</span> <b>' + data.main.pressure + ' гПа</b></li>');
        });
        it('show humidity', () => {
            show.call(window, data);
            assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
                '<li><span>Влажность</span> <b>' + data.main.humidity + ' %</b></li>');
        });
        it('show wind speed', () => {
            show.call(window, data);
            assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
                '<li><span>Скорость ветра</span> <b>' + data.wind.speed + ' м/c</b></li>');
        });
        it('show description', () => {
            show.call(window, data);
            assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
                '<li><span>Описание</span> <b>' + data.weather[0].description + '</b></li>');
        });
        */
    });

    describe('showError', () => {
        it('not found city', () =>{
            let response = {"status": 404};
            showError.call(window, response);
            assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
                '<p>Город не найден</p>');
        });
        it('server troubles', () =>{
            let response = {};
            showError.call(window, response);
            assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
                '<p>Проблемы с сервером</p>');
        });
        it('internet connection problem', () =>{
            showError.call(window, null);
            assert.include(window.document.getElementsByClassName("container")[0].innerHTML,
                '<p>Проблемы с интернет соединением</p>');
        });
    });

    it('search', () => {
        let city = 'Murmansk';
        let result = search.call(window, city);
        console.log(result);
        assert.include(result.q,
            city);
    });
});
