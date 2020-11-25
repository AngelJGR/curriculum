const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
}

helpers.matchPassword = async (passowrd, savedPassowrd) => {
	try {
		return await bcrypt.compare(passowrd, savedPassowrd);
	} catch(e) {
		console.log(e);
	}
	
}


module.exports = helpers;