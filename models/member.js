const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
 
const memberSchema = new Schema ({ 
	NIC: { 
		type: String, 
		required: true, 
	}, 
	FirstName: { 
		type: String, 
		required: true,
	}, 
	MiddleName: { 
		type: String, 
	}, 
	ContactNumber: { 
		type: String, 
		required: true,
	},
	Address: { 
		type: String,
		required: true, 
	}, 
	UserType: { 
		type: String, 
		required: true,
	},
}); 
const Member = mongoose.model("Member", memberSchema); 
module.exports = Member;