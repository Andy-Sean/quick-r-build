export default function handler(req, res){

    const body = req.body;
    console.log('the body is', body);

    res.status(200).json(`Job: ${body.jobDescription}`);

}