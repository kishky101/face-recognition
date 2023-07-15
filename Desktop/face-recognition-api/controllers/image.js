
const clarifiFunc = (imageUrl) => {
    const PAT = '86eb428e996e4529893918b9c66b94e6';
    const USER_ID = 'kishky';       
    const APP_ID = 'face-recognition';
    const MODEL_ID = 'face-detection';  
    const IMAGE_URL = imageUrl;
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
  }

  const handleApiCall = async (req, res) => {
   try {
          const data = await fetch("https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs", clarifiFunc(req.body.imageUrl));
          const response = await data.json();
          return res.json(response);
      } catch (err) {
          return res.status(400).json('problem with api call');
      }
  }


const handleImage = (req, res, db) => {
    const {id} = req.body;

    db('users').where({id: id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
    .catch(err => res.status(400).json('unable to get entries'))

}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}