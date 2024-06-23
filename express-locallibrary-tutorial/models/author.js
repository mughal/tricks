const { DateTime } = require("luxon");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AuthorSchema = new Schema ({
    first_name: {type: String, required: true, maxLength:100},
    family_name: {type: String, required: true, maxLength:100},
    date_of_birth: {type: Date},
    date_of_death: {tyoe: Date},  
});

AuthorSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.family_name){
        fullname = `${this.family_name}, ${this.first_name}`;
    }

    return fullname;
});

AuthorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("lifespan").get(function () {
    const dob = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    const dod = DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    return `${dob} - ${dod}`;
});



// Export model
module.exports = mongoose.model("Author", AuthorSchema);
