import { BaseSyntheticEvent, useEffect, useState } from "react";

import PostService from "../services/postService";
import { Post, User } from "../types/postTypes";

import toast from "react-hot-toast";

type UpdatePostComponentProps = {
  postId: number | undefined;
  users: User[];
  onClose: () => void;
  handleUpdate: (post: Post, postId: number | undefined) => void;
};

function UpdatePostComponent(props: UpdatePostComponentProps) {
  const [post, setPost] = useState<Post>({
    title: "",
    body: "",
    userId: undefined,
    id: undefined,
  });

  useEffect(() => {
    if (props.postId) {
      // first check the local storage
      const posts = localStorage.getItem("posts");
      const postsParsed = posts !== null ? JSON.parse(posts) : [];
      const postIndex = postsParsed.findIndex(
        (post: Post) => post.id === props.postId
      );
      if (postIndex !== null) {
        return setPost(postsParsed[postIndex]);
      }
      // if id not find in localstorage
      PostService.getPostById(props.postId).then((response: any) => {
        if (response.ok) {
          return setPost(response.json());
        }
      });
      toast.error("Post Id not found");
    }
  }, [props.postId]);

  const handleChange = (e: BaseSyntheticEvent) => {
    setPost({
      ...post,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <div className="z-10 fixed bg-[rgba(0,0,0,0.5)] flex items-center justify-center inset-0">
        <div className="flex flex-col justify-center content-between bg-[rgb(24_89_109)] w-160 h-160 p-5 rounded-3xl border-2 border-solid border-[rgb(56_178_171)]">
          <div className="flex text-white h-5">
            User :
            {props.users.filter((user) => user.id === post.userId).length > 0
              ? props.users.filter((user) => user.id === post.userId)[0].name
              : ""}
          </div>
          <div className="flex items-center justify-center text-2xl text-center text-black h-16">
            <form>
              <textarea
                id="title"
                className="block h-14 w-[550px]  text-xl text-start resize-none mt-10 rounded-xl border-2 border-solid border-[rgb(56_178_171)]"
                value={post.title}
                onChange={handleChange}
              />
            </form>
          </div>
          <div className="flex items-start justify-center h-full text-black mt-10">
            <form>
              <textarea
                id="body"
                className="block h-96 w-[550px] text-xl text-start resize-none mt-10 rounded-xl border-2 border-solid border-[rgb(56_178_171)]"
                onChange={handleChange}
                value={post.body}
              />
            </form>
          </div>
          <div className="h-3"></div>
          <div className="flex justify-end content-between mb-5">
            <button
              className="h-7 w-14 bg-[rgb(56_178_171)] hover:bg-[rgb(56_178_171)] text-white text-xs inline-block relative text-center font-bold border border-white rounded-md"
              onClick={() => {
                props.handleUpdate(post, post.id);
              }}
            >
              Save
            </button>
            <div className="w-1"></div>
            <button
              className="h-7 w-14 bg-[rgb(56_178_171)] hover:bg-[rgb(56_178_171)] text-white text-xs inline-block relative text-center font-bold border border-white rounded-md"
              onClick={() => {
                props.onClose();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdatePostComponent;
