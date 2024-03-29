"use strict"

import Vue from 'vue'
import moment from 'moment'

const Helper = {
  install(Vue) {
    Vue.prototype.getImageProduk = function (image) {
      if (image != null && image.length > 0) {
        return this.$config.baseURL + "/api/produk/photo" + image
      }
      return "/img/unavailable.png"
    }
    Vue.prototype.getImageMerk = function (image) {
      if (image != null && image.length > 0) {
        return this.$config.baseURL + "/api/merk/photo" + image
      }
      return "/img/unavailable.png"
    }
    Vue.prototype.getImageUser = function (image) {
      if (image != null && image.length > 0) {
        return this.$config.baseURL + "/api/user/photo" + image
      }
      return "/img/unavailable.png"
    }

    Vue.prototype.getThumb = function (image) {
      if (image != "null" && image != undefined && image.length > 0) {
        return this.$config.baseURL + "/service/image_thumb/" + image
      }
      return "/img/unavailable.png"
    }

    Vue.prototype.moment = moment
  }
}
Vue.use(Helper)