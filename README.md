# LAB - Class 17

## Project: AWS: S3 and Lambda

### Author: Reece Renninger

### Problem Domain  

Create an S3 Bucket with “open” read permissions, so that anyone can see the images/files in their browser.
A user should be able to upload an image at any size, and update a dictionary of all images that have been uploaded so far.
When an image is uploaded to your S3 bucket, it should trigger a Lambda function which must:

    Download a file called “images.json” from the S3 Bucket if it exists.
    The images.json should be an array of objects, each representing an image. Create an empty array if this file is not present.
    Create a metadata object describing the image.
        Name, Size, Type, etc.
    Append the data for this image to the array.
        Note: If the image is a duplicate name, update the object in the array, don’t just add it.
    Upload the images.json file back to the S3 bucket

### Links and Resources

- [GitHub Actions ci/cd](https://github.com/ReeceRenninger/image-lambda/actions/new);
- [Example of image upload into s3Bucket](https://reece-images.s3.us-west-1.amazonaws.com/blue+eye+dragon.jpg)


### Collaborators

### Setup

#### `.env` requirements (where applicable)

for now I have none and do not require one


#### How to initialize/run your application (where applicable)

- e.g. `npm start`

#### How to use your library (where applicable)

#### Features / Routes / Processes
 This lab was a doozy.  We ran into hurdles the whole way across but I think that was mostly due to my confusion with the lab vs what we received in our demo code. Once we got clarification and a little bit of guidance on how the lab was expected to be completed, it helped a lot. I was able to get everything working but I still think its slightly buggy since everything works but my cloudwatch wasn't triggering on upload for like an hour but when running the test manually in lambda I could see the images pushed into my json.  Hopefully review will fix some of my issues.

 UPDATE: IT'S WORKING, I CAN'T TOUCH ANYTHING OR AWS WILL SEND ME TO THE SHADOW REALM!

#### Tests


#### UML

Link to an image of the UML for your application and response to events