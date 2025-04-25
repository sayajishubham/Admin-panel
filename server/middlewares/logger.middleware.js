const logger = (request,response,next) => {
   if(request.User.role!=="Admin"){
    return response.status(400).json({
       message: "Not Authorized"
    })
   }
   next();
};

module.exports = {
  logger,
};

//+0.5
