const CommentsDatabase = require('../../models/comments/comments.mongo');


async function httpPostCourseComment(req,res) {

    const { course, comment } = req.body;
    
    const cookies = req.headers.cookie;

    if (cookies) {               
        
        const parseCookie = str =>
        str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
                    acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
                    return acc;
                }, {}
        );

        const user = parseCookie(cookies)?.userId;
        
        if (user) {

            try {
                const newComment = new CommentsDatabase({ user, course, comment });
                await newComment.save();
                res.status(201).json(newComment);
            } catch (error) {
                res.status(500).json({ message: 'Error posting comment' });
            }

        }
            
    } else {
        res.status(403).json({ message: 'You must be logged In' });
    }
    
        
}



async function httpGetCourseComments(req,res) {

    const id = req.params.courseId;

    const page = parseInt(req.query.page) || 1;

    const commentsPerPage = 3;
    
    
    try {
        const comments = await CommentsDatabase.find({course: id})
            .populate('user', 'name')
            .populate({
                path: 'replies',
                populate: {path: 'user', select: 'name'}
            })
            .sort({createdAt: -1})
            .skip((page - 1) * commentsPerPage)
            .limit(commentsPerPage);
            
        res.status(200).json(comments);
      } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ error: 'Error fetching comments' });
      }
    
        
}


async function httpPostCourseReply(req,res) {

    const { reply } = req.body;
    
    const parentCommentId = req.params.commentId;
    
    const cookies = req.headers.cookie;

    if (cookies) {               
        
        const parseCookie = str =>
        str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
                    acc[decodeURIComponent(v[0]?.trim())] = decodeURIComponent(v[1]?.trim());
                    return acc;
                }, {}
        );

        const user = parseCookie(cookies)?.userId;
        
        if (user) {

            const replyData = {
                user: user, // Assuming you have user authentication
                comment: reply,
                parentComment: parentCommentId,
                level: 1, // Set the nesting level for replies
            };
            
            try {
              const reply = await CommentsDatabase.create(replyData);

              const parentComment = await CommentsDatabase.findById(parentCommentId);
              parentComment.replies.push(reply._id);
              await parentComment.save();

              res.status(201).json(reply);
            } catch (error) {
              console.error(error);
              res.status(500).json({ message: 'Failed to post reply' });
            }

        }
            
    } else {
        res.status(403).json({ message: 'You must be logged In' });
    }
    
        
}




module.exports = {
    httpPostCourseComment,
    httpGetCourseComments,
    httpPostCourseReply
}