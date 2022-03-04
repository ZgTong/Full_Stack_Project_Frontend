import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "../helpers/AuthContext";
import { Card, Avatar, Button } from "antd";
function Home() {
  const [listOfPosts, setListOfPost] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(Authcontext);
  const { Meta } = Card;
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("https://tzg-first-full-stack-api.herokuapp.com/posts", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          console.log(response.data);
          setListOfPost(response.data);
        });
    }
  }, []);
  const likeAPost = (postId) => {
    axios
      .post(
        `https://tzg-first-full-stack-api.herokuapp.com/likes`,
        { PostId: postId },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setListOfPost(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (res.data.liked) return { ...post, Likes: [...post.Likes, 0] };
              else {
                const likesArr = post.Likes;
                likesArr.pop();
                return { ...post, Likes: likesArr };
              }
            } else {
              return post;
            }
          })
        );
      });
  };
  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <Card
            style={{ width: 600, marginTop: 16 }}
            key={value.title}
            hoverable
            title={value.title}
          >
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={value.title}
              />
              {value.postText}
              <div className="footer">
                <Link to={`/profile/${value.id}`} onClick={e=>e.stopPropagation()}>
                  Author: {value.username}
                </Link>
                <Button
                  size="small"
                  onClick={(e) => {
                    likeAPost(value.UserId)
                    e.stopPropagation()
                  }}
                >
                  {" "}
                  Like {value.Likes.length}
                </Button>
              </div>
            </div>
          </Card>
          //   <div className="post" key={value.title}>
          //     <div className="title">{value.title}</div>

          //     {value.postText}
          //   </div>

          //   </div>
        );
      })}
    </div>
  );
}

export default Home;
