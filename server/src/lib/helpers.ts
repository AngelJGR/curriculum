import bcrypt from 'bcryptjs'

class Helpers {

	encryptPassword = async (password: string): Promise<string> => {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		return hash;
	}
	
	matchPassword = async (passowrd: string, savedPassowrd: string): Promise<boolean> => {
		try {
			return await bcrypt.compare(passowrd, savedPassowrd);
		} catch(e) {
			console.log(e);
			return false
		}	
	}
}

export default new Helpers()