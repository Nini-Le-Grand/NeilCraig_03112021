const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

module.exports = (req, res, next) => {
    try {
        const email = req.body.email;
        const emailIsValid = emailValidator.validate(email);

        const password = req.body.password;
        const passwordSchema = new passwordValidator;
        passwordSchema
            .is().min(8)
            .is().max(20)
            .has().not().spaces();
        const passwordIsValid = passwordSchema.validate(password);

        if(passwordIsValid && emailIsValid) {
            next();
        } else {
            throw 'email ou mot de passe invalide';
        } 
    } catch {
        res.status(422).json({
            error: new Error('Invalid request!')
          });
    }
}
