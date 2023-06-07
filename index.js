const AWS = require('aws-sdk')
const s3 = new AWS.S3();

exports.handlers = async (event) => {
  let name = event.Records[0].s3.object.key;
  let size = event.Records[0].s3.object.size;
  let type = 'jpg';
  let newImageObject = { name, size, type };
  console.log(newImageObject);

  let images = [];

  let params = {
    Bucket: 'buttercup-images',
    Key: 'images.json',
  }

  try {
    let data = await s3.getObject(params).promise();
    console.log(data);
    images = JSON.parse(data.BOdy.toString());
    console.log(images);
  } catch (error) {
    console.log('error: ', error);
    
  }

  images.push(newImageObject);
  params.Body = JSON.stringify(images);

  try {
    await s3.putObject(params).promise();
  } catch (error) {
    console.log('error: ', error);
    
  }

  const response = {
    statuseCode: 200,
    body: JSON.stringify(images),
  };
  return response;
};