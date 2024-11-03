import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
} from '@mui/material';
import RecommendSharpIcon from '@mui/icons-material/RecommendSharp';
import ThumbDownAltSharpIcon from '@mui/icons-material/ThumbDownAltSharp';

function DetailedView() {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState({});
  const [dislikes, setDislikes] = useState({});
  const [userActions, setUserActions] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [commentMessage, setCommentMessage] = useState(''); // Message for Snackbar

  const selectedIncident = JSON.parse(Cookies.get('selectedIncident') || '{}');
  if (!selectedIncident) {
    return <Typography variant="h6">Incident not found</Typography>;
  }

  const handleAddComment = (e) => {
    e.preventDefault();
    const commentText = e.target.elements.comment.value;
    if (commentText) {
      setComments([...comments, commentText]);
      setCommentMessage('Comment added!'); // Set message for Snackbar
      setOpenSnackbar(true); // Open Snackbar
      e.target.reset();
    }
  };

  const handleLike = (index) => {
    if (userActions[index] === 'liked') return;

    const newLikes = { ...likes };
    const newDislikes = { ...dislikes };
    const newUserActions = { ...userActions };

    if (userActions[index] === 'disliked') {
      newDislikes[index] = (dislikes[index] || 1) - 1;
    }

    newLikes[index] = (likes[index] || 0) + 1;
    newUserActions[index] = 'liked';

    setLikes(newLikes);
    setDislikes(newDislikes);
    setUserActions(newUserActions);
  };

  const handleDislike = (index) => {
    if (userActions[index] === 'disliked') return;

    const newLikes = { ...likes };
    const newDislikes = { ...dislikes };
    const newUserActions = { ...userActions };

    if (userActions[index] === 'liked') {
      newLikes[index] = (likes[index] || 1) - 1;
    }

    newDislikes[index] = (dislikes[index] || 0) + 1;
    newUserActions[index] = 'disliked';

    setLikes(newLikes);
    setDislikes(newDislikes);
    setUserActions(newUserActions);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: 'black' }}>
          <Typography variant="h6">Detailed View</Typography>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ padding: '20px' }}>
        <Grid item xs={12} md={8}>
          <Paper elevation={7} sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ marginBottom: '10px' }}>
              {selectedIncident.title}
            </Typography>
            <Box
              component="img"
              src={selectedIncident.file}
              alt={selectedIncident.title}
              sx={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '10px',
                marginBottom: '15px',
                boxShadow: 2,
              }}
            />
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>Place:</strong> {selectedIncident.place}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>Status:</strong> {selectedIncident.status}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              <strong>Description:</strong> {selectedIncident.description}
            </Typography>

            <form onSubmit={handleAddComment}>
              <TextField
                label="Add your comment"
                variant="outlined"
                fullWidth
                name="comment"
                required
                sx={{ marginBottom: '10px' }}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>

            <Typography variant="h6" sx={{ marginTop: '20px' }}>
              Comments:
            </Typography>
            {comments.length === 0 ? (
              <Typography variant="body2">No comments yet.</Typography>
            ) : (
              comments.map((comment, index) => (
                <Paper key={index} sx={{ padding: '10px', marginBottom: '5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, marginRight: '10px', wordWrap: 'break-word' }}>
                      {comment}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <RecommendSharpIcon
                        fontSize="large"
                        onClick={() => handleLike(index)}
                        style={{
                          cursor: 'pointer',
                          color: userActions[index] === 'liked' ? 'blue' : 'black',
                        }}
                      />
                      <Typography sx={{ margin: '0 10px' }}>{likes[index] || 0}</Typography>
                      <ThumbDownAltSharpIcon
                        fontSize="large"
                        onClick={() => handleDislike(index)}
                        style={{
                          cursor: 'pointer',
                          color: userActions[index] === 'disliked' ? 'red' : 'black',
                        }}
                      />
                      <Typography sx={{ margin: '0 10px' }}>{dislikes[index] || 0}</Typography>
                    </div>
                  </div>
                </Paper>
              ))
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
            <Typography variant="h5">Related Complaints</Typography>
            <Typography variant="body2" sx={{ marginTop: '10px' }}>
              1. Primary Health Centre
            </Typography>
            <Typography variant="body2">2. Street Light Problem</Typography>
            <Typography variant="body2">3. Improper Maintenance of Water Bodies</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {commentMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default DetailedView;
