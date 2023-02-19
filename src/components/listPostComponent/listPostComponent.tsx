import { useEffect, useState } from "react";
import PostService from "../../services/postService";
import UpdatePostComponent from "../updatePostComponent/updatePostComponent";
import plusLogo from "../../assets/plus.svg";
import toast from "react-hot-toast";
import { Post } from "../../types/postTypes";

const ListPostComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | undefined>();

  useEffect(() => {
    const fetchData = () => {
      PostService.getPosts()
        .then((response: { json: () => any }) => response.json())
        .then((postData: Post[]) => setPosts(postData));
    };

    fetchData();
    setIsLoading(false);
  }, []);

  const handleAdd = () => {
    setShowModal(true);
    setPostId(undefined);
  };

  const handleEdit = (id: string | undefined) => {
    setShowModal(true);
    setPostId(id);
  };

  const handleDelete = (id: string | undefined) => {
    PostService.deletePost(id).then((response: { ok: boolean }) => {
      if (response.ok) {
        toast.success("Comment Deleted");
        // fake delete so we filter list but we should redo a get posts call
        const filteredPosts = posts.filter((post) => post.id !== id);
        setPosts(filteredPosts);
      } else {
        toast.error("The comment couldn't be deleted");
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPostId(undefined);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="my-5 mr-3.5">
          <div className="flex flex-wrap flex-row justify-center gap-y-5 gap-x-5">
            <div className="bg-[rgb(24_89_109)] w-96 h-96 p-5 rounded-3xl border-2 border-solid border-[rgb(56_178_171)]">
              <div className="flex flex-col items-center justify-center content-between h-full text-2xl text-white">
                <button
                  className="h-28 w-28 cursor-pointer mt-0 mb-5 mx-0 rounded-full border-2 border-solid border-[rgb(56_178_171)]"
                  onClick={handleAdd}
                >
                  <img src={plusLogo} alt="rounded-2xl" />
                </button>
                <div>Add Your Comment</div>
              </div>
            </div>
            {posts &&
              posts.map((post: Post) => (
                <div
                  key={post.id}
                  className="bg-[rgb(24_89_109)] w-96 h-96 p-5 rounded-3xl border-2 border-solid border-[rgb(56_178_171)]"
                >
                  <div className="text-white">User : {post.userId}</div>
                  <div className="block text-2xl text-center text-white h-8 text-ellipsis whitespace-nowrap overflow-hidden ml-0 mr-5 mt-5 mb-0">
                    {post.title}
                  </div>
                  <div className="h-48 text-white text-l text-left text-ellipsis overflow-hidden whitespace-normal mt-10">
                    {post.body}
                  </div>
                  <div className="flex justify-end content-between mb-5">
                    <button
                      className="h-7 w-14 bg-[rgb(56_178_171)] hover:bg-[rgb(56_178_171)] text-white text-xs inline-block relative text-center font-bold border border-white rounded-md"
                      onClick={() => handleEdit(post.id)}
                    >
                      Edit
                    </button>
                    <div className="w-1"></div>
                    <button
                      className="h-7 w-14 bg-[rgb(56_178_171)] hover:bg-[rgb(56_178_171)] text-white text-xs inline-block relative text-center font-bold border border-white rounded-md"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
          {showModal && (
            <UpdatePostComponent postId={postId} onClose={handleCloseModal} />
          )}
        </div>
      )}
    </>
  );
};

export default ListPostComponent;
