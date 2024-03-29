


const httpHandlePdfsUpload = (req, res) => {

  try {
    
    
    const uploadedPdfsPath = req.files.map((file) => file.path);
      
    res.status(200).json({ uploadedPdfsPath });

  } catch (error) {
    console.error('Error uploading pdfs:', error);
    res.status(500).json({ error: 'Error uploading pdfs.' });
  }

}



const httpHandleFileUpload = (req, res) => {

    try {
      // Handle file upload and save the file path
      const filePath = req.file.path;
      
      // Return the file path or other necessary data
      res.status(200).json({ filePath });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Error uploading file.' });
    }

};



const httpHandleThumbUpload = (req, res) => {

  try {
    
    // Handle file upload and save the file path
    const thumbPath = req.file.path;
    
    // Return the file path or other necessary data
    res.status(200).json({ thumbPath });
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    res.status(500).json({ error: 'Error uploading thumbnail.' });
  }

};





    
module.exports = { 
  httpHandleFileUpload,
  httpHandlePdfsUpload,
  httpHandleThumbUpload
};