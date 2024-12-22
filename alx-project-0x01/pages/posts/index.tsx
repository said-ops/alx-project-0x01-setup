import PostCard from "@/components/common/PostCard";
import PostModal from "@/components/common/PostModal";
import Header from "@/components/layout/Header";
import { PostData} from "@/interfaces";
import { PostProps } from "@/interfaces";
import { useState } from "react";

const Posts: React.FC<{ posts: PostProps[] }> = ({ posts }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [userPosts, setUserPosts] = useState(posts);
  const [post, setPost] = useState<PostData | null>(null); 

  const handleAddPost = (newPost: PostData) => {
    setUserPosts((prevPosts) => [
      ...prevPosts,
      { ...newPost, id: prevPosts.length + 1 },
    ]);
  };

  const handleEditPost = (postToEdit: PostData) => {
    setPost(postToEdit); // Set the post that needs to be edited
    setModalOpen(true); // Open the modal for editing
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Post Content</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-700 px-4 py-2 rounded-full text-white"
          >
            Add Post
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {userPosts.map(({ title, body, userId, id }: PostProps) => (
            <PostCard
              title={title}
              body={body}
              userId={userId}
              id={id}
              key={id}
              onEdit={() => handleEditPost({ title, body, userId, id })} // Add edit functionality
            />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <PostModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleAddPost}
          post={post} // Pass the post state to the modal for editing
        />
      )}
    </div>
  );
};

// Fetch post data from external API
export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}

export default Posts;
