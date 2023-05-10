export default function handler(req, res){

    const body = req.body

    // res.status(200).json(`{name: ${body.jobDescription}}`)
    var jobDescription = body.jobDescription;
    if (req.method === "POST") {
        console.log("We got a POST");
        // res.status(200).json(`{name: ${body.jobDescription}}`);
        console.log(jobDescription);
        res.redirect(307, '/'); // You have to use 307 for this to work!
    } else if (req.method === "GET") {
        console.log("We got a GET");
    }

}
