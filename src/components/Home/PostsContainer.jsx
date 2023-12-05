import Post from "./Post"
import profilePicTest from "../../assets/profilePicTest.JPG"

const PostsContainer = ({ posts }) => {
  const handlePostClick = (p) => {}

  return (
    <div className="post-container">
      {posts.map((p) => (
        <Post userProfilePicture={p.tweetDetails.media[0].data} userName={p.tweetDetails.tweet_owner.nickname} userTag={p.tweetDetails.tweet_owner.username} date={p.tweetDetails.createdAt} media={p.tweetDetails.media[0].data} description={p.tweetDetails.description} replyCount={p.tweetDetails.repliesNum} repostCount={p.tweetDetails.repostsNum} likeCount={p.tweetDetails.likesNum} viewCount={p.tweetDetails.viewsNum} key={p.tweetDetails.tweet_owner.username} />
      ))}
    </div>
  )
}

export default PostsContainer
