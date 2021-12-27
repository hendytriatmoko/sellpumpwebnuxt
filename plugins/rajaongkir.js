export default function ({ $axios , store ,app, $router,redirect}, inject) {
    // PROD
    var BasisUrl = "https://pro.rajaongkir.com/api";
  
    // TRAINING
    // var BaseUrl = "https://api-sisales-dev.devlmu.com/warna/";
  
    // DEV
    // var BaseUrl = "https://api-dev-sisales.devlmu.com/warna/";
  
    var axios = $axios.create({
      headers: {
        common: {
          // Authorization: 'Bearer '+store.state.token
        //   'key': '0e33e27e42c55799ebe174e1307f2adf'
  
        }
      }
    })
  
    // this.$cookies.get("user");
  
  
  
    axios.interceptors.response.use((response) => response, (error) => {
      // console.log("token ",app.$cookies.get("token"))
      // if (error.response.status == 403) {
      //   if (app.$cookies.get("token") == undefined) {
      //      location.reload();
      //   }
  
  
      // }
      // if (error.response.status == 401) {
      //   app.$cookies.removeAll();
  
      //   // $router.push("/login");
      //   redirect("/login");
      // }
      throw error;
    });
    axios.setBaseURL(BasisUrl)
  
    inject('req', axios)
  
  }
  