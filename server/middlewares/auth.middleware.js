let jwt =require("jsonwebtoken");

const auth = (request,response,next) => {
     let token=request.cookies.Verificationtokent;
    try {
      jwt.verify(token, 'kcsxsx', function(err, decoded) {
        if(err){
          return response.status(400).json({
            message:err.message
          })
        }
        if(decoded){
          request.User=decoded.user;
          next();
          
        }
      });
    } catch (error) {
       return response.status(400).json({
        message:error.message
       })
    }
};






module.exports = {
  auth,
};

//+1
