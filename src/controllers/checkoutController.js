const request = require('request');
const express = require("express");
const router = express.Router();
const keys = require("../data/keys");
const order = require("../data/order")
const CircularJSON = require("circular-json")
const controller = {};

const endpoint = keys.endpoint         // SERVIDOR
const username = keys.username;        // USUARIO
const password = keys.password         // CONTRASEÑA API REST
const publickey = keys.publickey       // PUBLIC KEY


//SE GENERA EL TOKEN DE AUTENTICACIÓN ==============================================//
const auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');    // AUTENTICACION


controller.home = (req, res) => {
  res.render("home")
}

controller.checkout = (req, res,next) => {
  request.post({
    url: `${endpoint}/api-payment/V4/Charge/CreatePayment`,
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    json: order
  }, 
  function(error, response, body) {
    if (body.status === 'SUCCESS')
    {
      // Send back the form token to the client side
      const formtoken = body.answer.formToken;
      res.render("checkout",
      {formtoken ,publickey , endpoint}
    );
    }
    else
    {
      console.error(body);
      res.status(500).send('error');
    }  
  })
};

controller.paid =  (req,res)=> {
  // console.log(res);
  // const string_res = CircularJSON.stringify(res)
  // const ipn_response = JSON.parse(string_res)
  // console.log(ipn_response);
  console.log(res);
  res.render('paid' ,  {res}) 
}

//API ========================================================================//

controller.apiCheckout = (req,res,next) => {
  request.post({
    url: `${endpoint}/api-payment/V4/Charge/CreatePayment`,
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json'
    },
    json: order
  }, 
  function(error, response, body) {
    if (body.status === 'SUCCESS')
    {
      // Send back the form token to the client side
      const formtoken = body.answer.formToken;
      res.send({formtoken , publickey , endpoint})
    }
    else
    {
      console.error(body);
      res.status(500).send('error');
    }  
  })
};



module.exports = controller;
