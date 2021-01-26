import bcrypt from 'bcryptjs'

class Helpers {

	encryptPassword = async (password: string) => {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}
	
	matchPassword = async (passowrd: string, savedPassowrd: string) => {
		try {
			return await bcrypt.compare(passowrd, savedPassowrd);
		} catch(e) {
			console.log(e);
		}	
	}
}

export default new Helpers()