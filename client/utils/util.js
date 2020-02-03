// pages/detail/qq/qq.js
var api = require('../api/api.js');
import { Promise } from '../libs/rsvp-latest.min';


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}




function getRecipe(data,callback) {
  const originData = {
    url: api.default.url.recipe,
  }
  data = Object.assign({}, originData,data)
  api.default.ajax(api.default.url.recipe, data).then(function (res) {
    if (res.data.status == 205) {
     
      api.default.showModal('提示', res.data.msg)
    }
    console.log(res)
    return callback(res)
  })
}

function getSearch(){
  const originData = {
    url: api.default.url.recipe,
  }
  data = Object.assign({}, originData, data)
  api.default.ajax(api.default.url.recipe, data).then(function (res) {
    if (res.data.status == 205) {
      api.default.showModal('提示', res.data.msg)
    }
    return callback(res)
  })
}

function getNewSearch(data) {
  // const originData = {
  //   url: api.default.url.getArticle,
  // }
  data = Object.assign({}, originData, data)
  api.default.ajax(api.default.url.getArticle, data).then(function (res) {
    if (res.data.status == 205) {
      api.default.showModal('提示', res.data.msg)
    }
    return callback(res)
  })
}



module.exports = {
  formatTime: formatTime,
  getRecipe: getRecipe
}  