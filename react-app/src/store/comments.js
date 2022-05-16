const GET_COMMENTS = 'comments/GET_ALL_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
// const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
// const DELETE_COMMENT = 'comments/DELETE_COMMENT';


const getAllComments = (comments) => ({
  type: GET_COMMENTS,
  comments
})

const addSingleComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})


// const deleteSingleComment = (comment) => ({
//   type: DELETE_COMMENT,
//   comment
// })

// const updateCommentAction = (comment) => ({
//   type: UPDATE_COMMENT,
//   comment
// })

export const getComments = (post_id) => async (dispatch) => {
  const response = await fetch(`/api/comments/${post_id}`)
  if (response.ok) {
    const comments = await response.json();
    dispatch(getAllComments(comments.comments))
    return response;
  }
}

export const addComment = (comment) => async dispatch => {
  const response = await fetch(`/api/comments/all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment)
  });
  if (response.ok) {
    const comment = await response.json();
    dispatch(addSingleComment(comment));
  } else {
    return "ERROR @ ADD_COMMENT"
  }
}

// export const deleteComment = (commentId) => async dispatch => {
//   const response = await fetch(`/api/posts/${commentId}`, {
//     method: "DELETE",
//   });
//   if (response.ok) {
//     dispatch(deleteSingleComment(commentId))
//   } else {
//     return "ERROR @ DELETE_COMMENT"
//   }
// }

// export const updateComment = (comment) => async dispatch => {
//   // console.log('update thunk comment ++++++++++++', comment);
//   const response = await fetch(`/api/posts/${comment.postId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(comment)
//   });
//   // console.log('response thunk update COMMENT', response);
//   if (response.ok) {
//     // console.log('is it here? update COMMENT response ok');
//     const post = await response.json();
//     dispatch(updateCommentAction(comment));
//     return post
//   } else {
//     return "ERROR @ UPDATE_COMMENT"
//   }
// }

const initialState = {};

const commentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_COMMENTS:
      newState = {}
      action.comments.forEach(comment => newState[comment.id] = comment);
      return newState;
    // case GET_POSTS:
    //   newState = { ...state }
    //   action.payload.forEach(posts => newState[posts.id] = posts);
    //   return { ...newState, ...state };
    case ADD_COMMENT:
      newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    // case DELETE_COMMENT:
    //   newState = { ...state }
    //   delete newState[action.comment_id]
    //   return newState
    // case UPDATE_COMMENT:
    //   newState = { ...state };
    //   newState[action.comment.id] = action.comment;
    //   return newState;
    default:
      return state;
  }
}

export default commentReducer;
