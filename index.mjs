'use strict';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Response } from 'node-fetch';


export const handler = async (event) => {
  console.log('this is my event', event);

  let s3Client = new S3Client({ region: 'us-west-1' });
  //TODO implement
  let name = event.Records[0].s3.object.key;
  let size = event.Records[0].s3.object.size;
  let type = 'jpg';
  let newImageObject = { name, size, type };
  console.log('this is my new imageobject', newImageObject); // proof of life for uploading an image to bucket

  // getobjectcommand requires these two things to be fed to it, the Bucket and Key
  let params = {
    Bucket: 'reece-images',
    Key: 'images.json',
  };

  console.log('THESE ARE MY PARAMS', params);

  let imageData;
  // grab all objects in the bucket
  try {
    let results = await s3Client.send(new GetObjectCommand(params));
    let response = new Response(results.Body);
    let retrievedImageData = await response.json(); // converts response into a useable array 
    imageData = retrievedImageData; //we assign the useable array to our established variable

    console.log('this is my imageData after GET request', imageData);
  } catch (error) {
    console.warn('GET object error: ', error);
    imageData = [];
  }
  imageData.push(newImageObject);
  console.log('my image in my imageData array', imageData);


  let stringifiedDetails = JSON.stringify(imageData);
  // modify or create a new object in the bucket, this does creation of a new images.json if none are present in bucket
  console.log('this is my stringifieddeatils', stringifiedDetails);
  let newParams = {
    ...params,
    Body: stringifiedDetails,
    ContentType: 'application/json', //for Json, its always this
  }

  try {
    await s3Client.send(new PutObjectCommand(newParams));
  } catch (error) {
    console.warn('Failed to PUT error: ', error);

  }

  const response = {
    statusCode: 200,
    body: stringifiedDetails, // this may need to change
  };
  return response;
};
