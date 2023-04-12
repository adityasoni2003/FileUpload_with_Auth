function validateName(name){
    const nameRegex = new RegExp(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/);
    return nameRegex.test(name);


};

function validateEmail(email){
    const emailRegex = new RegExp(
        /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
        "gm"
      );
      return emailRegex.test(email);

};

function validatePass(pass){
    const passwordRegex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      );
      return passwordRegex.test(pass);

};


module.exports = {validateName,validateEmail,validatePass};