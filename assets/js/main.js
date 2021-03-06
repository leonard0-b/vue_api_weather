Vue.config.devtools = true;

var app = new Vue(
    {
        el: "#root",
        data: {
            api_key: "d1be85087ac45db8b282c709d87a715f",
            celsius: "metric",
            uri: "http://api.openweathermap.org/data/2.5",
            cerca: "",
            show: true,
            error: true,
            cities: [],
            mains: [],
            weathers: [],
            countries: [],
            errorMsg: ''
        },
        methods: {
            getMeteo: function () {
                let msgErrore = $(".error");
                msgErrore.empty()  // svuoto il div con classe errore prima di ogni chiamata
                axios.get(`${this.uri}/weather?units=${this.celsius}&q=${this.cerca}&appid=${this.api_key}`)
                    .then((response) => {
                        if (response.data.cod === 200) {
                            $('.content').css('display', 'block');
                            this.cities = response.data;
                            this.mains = response.data.main;
                            this.weathers = response.data.weather;
                            this.countries = response.data.sys;
                            console.log(this.countries);
                            console.log(response);
                            /*console.log('main', this.mains);
                            console.log('tempo', this.weathers);
                            console.log('città', this.cities);*/
                            this.cerca = "";
                            this.show = false;
                        } 
                        if (this.weathers != [1]) { //se l'API risponde con due risultati prendo solo il primo
                            this.weathers.splice(1, 2);
                        }
                    })
                    .catch(function (error) { //intercetto tutti gli errori dalla chiamata
                        if (error.response.data.cod == 404) { //se esiste un errore
                            let msgErrore = $(".error");
                            msgErrore.html(`<img src="./assets/img/warning.png" alt="error"><p>Nessuna città trovata</p>`); //scrivo l'errore dentro il div con classe .error
                            $('.content').css('display', 'none');
                            $('input').val('');

                        } else if (error.response.data.cod == 400) {
                            let msgErrore = $(".error");
                            msgErrore.html(`<img src="./assets/img/warning.png" alt="error"><p>Nessuna città inserita</p>`); //scrivo l'errore dentro il div con classe .error
                            $('.content').css('display', 'none');
                            $('input').val('');
                        }
                    })
                this.cerca ='';
            },
        } 
    });