Vue.config.devtools = true;

var app = new Vue (
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
        weathers: []
    },
    methods: {
        getMeteo: function () {
            axios.get(`${this.uri}/weather?units=${this.celsius}&q=${this.cerca}&appid=${this.api_key}`)
            .then((response) => {
                if (response.data) {
                    this.cities = response.data;
                    this.mains = response.data.main;
                    this.weathers = response.data.weather;
                    console.log(response);
                    console.log('main', this.mains);
                    console.log('tempo', this.weathers);
                    console.log('città', this.cities);
                    this.cerca = "";
                    this.show = false;    
                } else {
                    console.log(this.cities);
                    this.error = false;
                }
            })
        },
    }
  });