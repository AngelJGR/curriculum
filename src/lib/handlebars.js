const helpers = {};

helpers.if_eq = function (a, b, opts) {
	if(a == b){
		return opts.fn(this);
	} else{
		return opts.inverse(this);
	}
};

// helpers.if_not_eq = function (a, b, opts) {
// 	if(a == b){
// 		console.log("true");
// 		return opts.fn(this);
// 	} else{
// 		console.log("false");
// 		return opts.inverse(this);
// 	}
// };

module.exports = helpers;