import { useEffect, useState } from 'react'
import { GetPosts } from '../Services/PostServices'
import { GetComments } from '../../Services/CommentServices'

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState({})

  useEffect(() => {
    const handlePosts = async () => {
      const data = await GetPosts()
      setPosts(data)
    }
    handlePosts()
  }, [])

  useEffect(() => {
    const handleComments = async () => {
      const data = await GetComments()
      const commentsByPostId = {}
      data.forEach((comment) => {
        const { postId, text } = comment
        commentsByPostId[postId] = text
      })
      setComments(commentsByPostId)
    }
    handleComments()
  }, [])

  const handleCommentChange = (postId, text) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: text
    }))
  }

  const handleCommentSubmit = (postId) => {
    const text = comments[postId] || ''
    if (text.trim() === '') {
      return
    }

    const newComment = {
      id: Date.now(),
      postId,
      text
    }

    setComments((prevComments) => ({
      ...prevComments,
      [postId]: ''
    }))
  }

  return user ? (
    <div className="post-feed-card">
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          {post.content.length >= 1000 ? (
            <p>{post.content.substring(0, 1000)}...</p>
          ) : (
            <p>{post.content}</p>
          )}
          <h5>Comments:</h5>
          <div className="comment">
            <textarea
              value={comments[post.id] || ''}
              onChange={(e) => handleCommentChange(post.id, e.target.value)}
              placeholder="Type your comment here..."
            />
            <button onClick={() => handleCommentSubmit(post.id)}>
              Add Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="protected">
      <h3>You are not signed in!</h3>
      <button onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  )
}

export default Feed
