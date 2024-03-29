const { s3 } = require('../../services/aws');
const CoursesDatabase = require('../../models/courses/courses.mongo');
const { GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { DeleteObjectsCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const axios = require('axios');
const client = require('../../services/vimeo')

require('dotenv').config();


async function httpUploadVideo(req,res) {


    try {

        const uploadedVideoKeys = [];

        const uploadPromises = req.files.map(async (file) => {

          const uploadParams = {
            Bucket: 'la-nuderia-camila',
            Key: `${Date.now().toString()}-${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
          };
    
          const uploadCommand = new PutObjectCommand(uploadParams);
    
          await s3.send(uploadCommand);
    
        //   uploadedVideoKeys.push(uploadParams.Key); // body or data

        });
    
        await Promise.all(uploadPromises);
    
        res.status(200).json(uploadedVideoKeys);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while uploading the files' });
    }

    
}


async function httpUploadVimeoVideo(req,res) {

    try {
        
        const videoFiles = req.files;

        if (!videoFiles || videoFiles.length === 0) {
            return res.status(400).json({ error: 'No video files provided.' });
        }

        const uploadedVideoKeys = [];

        
        for (const file of videoFiles) {
      
        try {

                const createVideoResponse = await axios.post(
                    'https://api.vimeo.com/me/videos',
                    {
                      upload: {
                        approach: 'tus',
                        size: `${file.size}`,
                      },
                    //   name: , 
                      privacy: {
                        download: false,
                        embed: 'whitelist',
                        view: 'unlisted',
                      }
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
                        'Content-Type': 'application/json',
                        Accept: 'application/vnd.vimeo.*+json;version=3.4',
                      },
                    }
                );
                  
                const { upload_link, approach } = createVideoResponse.data.upload;

                const { player_embed_url, uri } = createVideoResponse.data
                        
                if (approach !== 'tus') {
                  return res.status(500).json({ error: 'Unexpected upload approach.' });
                }
                

                const uploadVideoResponse = await axios.patch(
                  upload_link,
                  file.buffer, 
                  {
                    headers: {
                      'Tus-Resumable': '1.0.0',
                      'Upload-Offset': 0,
                      'Content-Type': 'application/offset+octet-stream',
                    },
                  }
                );
                
                

                // const uploadOffset = uploadVideoResponse.headers['upload-offset'];

                
                // const verifyUploadResponse = await axios.head(
                // upload_link,
                // {
                //     headers: {
                //     'Tus-Resumable': '1.0.0',
                //     Accept: 'application/vnd.vimeo.*+json;version=3.4',
                //     },
                // }
                // );
                

                
                try {
                    await axios.put(
                      'https://api.vimeo.com' + uri + '/privacy/domains/cursos.lanuderia.com',
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
                          'Content-Type': 'application/json',
                          Accept: 'application/vnd.vimeo.*+json;version=3.4',
                        },
                      }
                    );
                } catch (err) {
                  console.log(err)
                }
                
                
                uploadedVideoKeys.push(player_embed_url);

                

            } catch (err) {
            
                console.log('error:', err)
    
            }
        }

        return res.status(200).json(uploadedVideoKeys)
            

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while uploading the videos to Vimeo' });
    }
 
}



async function httpUploadThumbnail(req,res) {


    try {
        
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }


        const uploadParams = {
          Bucket: 'la-nuderia-camila',
          Key: `${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
    
        const uploadCommand = new PutObjectCommand(uploadParams);
    
        await s3.send(uploadCommand);
    
        res.status(200).json(uploadParams.Key);
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while uploading the files' });
    }

    
}



async function httpSaveVideoInfo(req,res) {

    try {

        const { title, description, duration, price, dolarPrice, urls, thumbnail, pdfs } = req.body;
        
        const course = new CoursesDatabase({
            title: title,
            description: description,
            duration: duration,
            price: price,
            dolarPrice: dolarPrice,
            urls: urls,
            thumbnail: thumbnail,
            pdfs: pdfs
        })

        course.save((err, savedCourse) => {
            if (err) {
                console.log(err);
                return res.status(500).json({error: 'Error saving the course to the database'})
            }
            return res.status(200).json({message: 'El cursó se creo con éxito!', savedCourse})
        })

    } catch (err) {
        console.log(err)
        return res.status(400).json({message: 'Error saving the course to the database'})
    }

}


async function httpGetUploadedVideo(req,res) {

    const { active } = req.params;
    
    const params = {
        Bucket: 'la-nuderia-camila',
        Key: active
    }

    //s3.getSignedUrl('getObject', params, (err, url) => {
    //    if (err) {
    //        console.log(err);
    //        return res.status(500).json({error: 'Error al obtener la URL prefirmada'})
    //    }
//
    //    return res.json({url})
    //})

    const command = new GetObjectCommand(params); // Create a GetObjectCommand
    
    try {
        
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 }); // Adjust expiresIn as needed
        
        return res.status(200).json({ url: signedUrl });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener el video', url });
    }
       
}


async function httpGetAllUploadedCourses(req,res) {
    
    try {
        const courses = await CoursesDatabase.find().select('-urls');
        res.status(200).json(courses);
      } catch (err) {
        console.error('Error fetching videos:', err);
        res.status(500).json({ error: 'Error fetching videos' });
      }
    
        
}


async function httpGetUploadedCourse(req,res) {

    const id = req.params.id;
    
    try {
        const course = await CoursesDatabase.find({_id: id}).select('-urls');
        res.status(200).json(course);
      } catch (err) {
        console.error('Error fetching videos:', err);
        res.status(500).json({ error: 'Error fetching videos' });
      }
    
        
}


async function httpGetAllCoursesAdmin(req,res) {
    
    try {
        const courses = await CoursesDatabase.find();
        res.status(200).json(courses);
      } catch (err) {
        console.error('Error fetching videos:', err);
        res.status(500).json({ error: 'Error fetching videos' });
      }
    
        
}


async function httpDeleteCourseVideos(req,res) {
    
    const keys = req.body;

    const deleteObjects = keys.map(key => ({ Key: key }));
    
    const params = {
        Bucket: 'la-nuderia-camila',
        Delete: {
            Objects: deleteObjects,
            Quiet: false
        }
    };

    //try {
    //    await s3.deleteObjects(params).promise();
    //    res.status(200).json({ message: 'Files deleted successfully' });
    //} catch (error) {
    //    console.error(error);
    //    res.status(500).json({ error: 'An error occurred while deleting the files' });
    //}

    const command = new DeleteObjectsCommand(params);

    try {
        await s3.send(command); // Use the AWS SDK v3 send method to send the command
        return res.status(200).json({ message: 'Files deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the files' });
    }
    
}


async function httpDeleteCourse(req,res) {

    const id = req.params.id;
    
    try {
        await CoursesDatabase.findByIdAndDelete(id);
        res.status(200).json("El producto fue eliminado exitosamente");
    } catch (err) {
        res.status(400).json("Error al intentar borrar el producto");
    };

    
        
}




module.exports = {
    httpUploadVideo,
    httpGetAllUploadedCourses,
    httpGetAllCoursesAdmin,
    httpGetUploadedVideo,
    httpSaveVideoInfo,
    httpDeleteCourseVideos,
    httpDeleteCourse,
    httpGetUploadedCourse,
    httpUploadThumbnail,
    httpUploadVimeoVideo,
}