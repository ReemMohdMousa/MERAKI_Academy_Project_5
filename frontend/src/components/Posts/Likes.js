import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addLike, setLike, removeLike } from "../redux/reducers/posts";
import { AiFillLike } from "react-icons/ai";
import RecommendIcon from "@mui/icons-material/Recommend";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const Likes = ({ post_id, post }) => {
  const [clicked, setClicked] = useState("no");
  const [likesNo, setLikesNo] = useState();
  const [likedUser, setLikedUser] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();

  const { token, likes, userId } = useSelector((state) => {
    return {
      token: state.auth.token,
      likes: state.posts.likes,
      userId: state.auth.userId,
    };
  });

  const getLikes = () => {
    axios
      .get(`http://localhost:5000/likes/l`)
      .then((result) => {
        const user = result.data.users;
        const LikesNo2 = result.data.num;
        dispatch(setLike({ user, LikesNo2 }));
        user.map((elem) => {
          if (elem.post_id == post_id && userId == elem.user_id) {
            setClicked("yes");
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getLikes();
  }, []);

  const handleLike = (e) => {
    const id = e.target.id;
    if (clicked === "yes") {
      setClicked("no");
      axios
        .delete(`http://localhost:5000/likes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          getLikes();
          dispatch(removeLike(id));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setClicked("yes");
      axios
        .post(
          "http://localhost:5000/likes",
          {
            post_id: id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((result) => {
          getLikes();
          dispatch(addLike(result.data.result));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div id="post-info">
        <RecommendIcon
          style={{ color: "blue" }}
          onClick={(e) => {
            setShow(true);
          }}
        />{" "}
        {likes.length > 0 &&
          likes[0].LikesNo2.length > 0 &&
          likes[0].LikesNo2.flat().reduce((acc, elem) => {
            if (post_id == elem.post_id) {
              return <span key={post_id}>{elem.total_likes}</span>;
            } else {
              return <span key={post_id}>{acc}</span>;
            }
          }, 0)}
      </div>

      <div className="item" onClick={handleLike} id={post_id}>
        <AiFillLike className={clicked} id={post_id} />
        likes
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <AiFillLike style={{ color: "blue", fontSize: "1.2rem" }} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {likes.length > 0 &&
            likes[0].user.flat().map((element, id) => {
              if (element.post_id == post_id) {
                return (
                  <div
                    className="friend-list"
                    key={id}
                    style={{ marginBottom: ".5rem" }}
                  >
                    <div
                      className="friend-img-name"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        className="friend-img"
                        alt="img"
                        src={
                          element.avatar ||
                          "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                        }
                      />

                      <h6>{element.firstname + " " + element.lastname}</h6>
                    </div>
                  </div>
                );
              }
            })}
          {likes.length > 0 &&
            likes[0].user.flat().reduce((acc, element) => {
              if (element.post_id !== post_id) {
                return <p key={post_id}>{acc}</p>;
              }
            }, "There is no likes on this post")}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Likes;
