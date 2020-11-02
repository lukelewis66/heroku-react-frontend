// Pass the upload function a valid array of image file(s), UID, and the type of images being uploaded:
// if the image being uploaded is for a profile picture, pass "ProfilePic" as the type, 
// if it's a listing picture, pass the LID as the type.
function Upload(images, UID, type) {
    if(images && UID && type) {
        var s3Urls = [];
        var imageUrl = '';
        const files = Array.from(images);
        for (let i = 0 ; i < files.length ; i++) {
            const formData = new FormData();
            formData.append("type", type);
            formData.append("bucket", UID);
            formData.append("acl", "public-read-write");
            formData.append("key", files[i].name);
            formData.append("file", files[i]);
            fetch('http://localhost:8118/upload', {
                method: 'POST',
                body: formData,
            });
            imageUrl = 'http://' + UID + '.s3-us-west-1.amazonaws.com/' + files[i].name;
            s3Urls.push(imageUrl);
        }
    
        console.log('Upload succesful: image files uploaded to bucket designated by UID.');
        console.log(s3Urls);
        return s3Urls;
    }
    else {
        return (
            console.log('Upload failed: please provide a valid UID, array of image files, and type of images being uploaded.')
        )
    }      
}

export default Upload