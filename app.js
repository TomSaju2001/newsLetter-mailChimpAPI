//We need to install the npm module @mailchimp/mailchimp_marketing.
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS and images
app.use(express.static("public"));

app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signUpPage.html");
});

//Setting up MailChimp
mailchimp.setConfig({
 apiKey: "22b61a85f05cec19c82bc15b197b1403-us14",
 server: "us14"
});


app.post("/", function (req,res) {

const firstName = req.body.firstName;
const secondName = req.body.lastName;
const email = req.body.email;
//*****************************ENTER YOU LIST ID HERE******************************
const listId = "677e755aa0";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/successPage.html")
 console.log(
`Successfully added contact as an audience member. The contact's id is ${
 response.id
 }.`
);
}
//Running the function and catching the errors (if any)
// ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failurePage.html"));
});

//mailChimp API key
//22b61a85f05cec19c82bc15b197b1403-us14

//Audience id or List ID
//677e755aa0
app.listen(3000,function () {
 console.log("Server is running at port 3000");
});
