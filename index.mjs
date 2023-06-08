'use strict';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Response } from 'node-fetch';

const s3Client = new S3Client({region: 'us-west-1'});

export const handler = async (event) => {
  console.log('this is my event', event);
  
  const Bucket = 'reece-images';
  const Key = 'images.json';
  console.log({ Bucket, Key });
  
  //TODO implement
  let fileName = event.Records[0].s3.object.key;
  let size = event.Records[0].s3.object.size;
  let type = 'jpg';
  let newImageObject = { fileName, size, type };
  console.log('this is my new imageobject', newImageObject);

  
  let params = {
    Bucket,
    Key,
  };
  console.log('THESE ARE MY PARAMS', params);
  
  let data;
  // grab all objects in the bucket, I am able to grab the images.json but I have to hardcode images.json INTO THE KEY PROPERTY ON THE ACTUAL TEST
  try {
    let s3results = await s3Client.send(new GetObjectCommand(params));
    const response = new Response (s3results.Body);
    data = await response.json();
    data.push(newImageObject);
    params.Body = JSON.stringify(data);
    console.log('this is my data after my push to data request', data);
  } catch (error) {
    console.warn('error: ', error);
  }
  

  // modify or create a new object in the bucket
  let newParams = {
    ...params,
    Key: 'images.json',
    ContentType: 'application/json',
  };

  try {
    await s3Client.send(new PutObjectCommand(newParams));
  } catch (error) {
    console.log('error: ', error);
    
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(newParams),
  };
  return response;
};