export default function handler(req, res){

    const body = req.body;

    if (req.method === "POST") {
        console.log("We got a POST");
        res.status(200).json({`name: ${body.jobDescription}`});
    } else if (req.method === "GET") {
        console.log("We got a GET");
    }

}
