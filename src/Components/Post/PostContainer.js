import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";

const PostContainer = ({ id, user, files, likeCount, isLiked, comments, createdAt, location, caption }) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setlikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const comment = useInput("");

  useEffect(() => {
    const slide = () => {
      const totalFiles = files.length;
      if (currentItem === totalFiles - 1) {
        setTimeout(() => setCurrentItem(0), 3000);
      } else {
        setTimeout(() => setCurrentItem(currentItem + 1), 3000);
      }
    };
    slide();
  }, [currentItem, files.length]);

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      isLiked={isLikedS}
      comments={comments}
      location={location}
      caption={caption}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
      setlikeCount={setlikeCount}
      currentItem={currentItem}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  location: PropTypes.string,
  caption: PropTypes.string.isRequired
};

export default PostContainer;
