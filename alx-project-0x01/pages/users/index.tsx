import React, { useState, useEffect } from "react";
import UserModal from "@/components/common/UserModal";
import { UserData} from "@/interfaces";
import { PostProps } from "@/interfaces";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import UserCard from "@/components/common/UserCard"; // Import the UserCard

interface UsersProps {
  initialUsers: UserData[];
}

const Users: React.FC<UsersProps> = ({ initialUsers }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [posts, setPosts] = useState<PostProps[]>([]); // New state to store posts

  const handleAddUser = (newUser: UserData) => {
    setUsers((prevUsers) => [...prevUsers, { ...newUser, id: prevUsers.length + 1 }]);
  };

  // Fetch posts associated with users when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      setPosts(data); // Set the posts
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add User
        </button>
        <div className="mt-4">
          {users.map((user) => (
            <div key={user.id}>
              <UserCard user={user} /> {/* Display user data */}
              {/* Display posts associated with the current user */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Posts by {user.name}</h3>
                <div className="mt-2">
                  {posts
                    .filter((post) => post.userId === user.id) // Filter posts by userId
                    .map((post) => (
                      <div key={post.id} className="border-b py-2">
                        <h4 className="text-lg font-semibold">{post.title}</h4>
                        <p>{post.body}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <UserModal onClose={() => setModalOpen(false)} onSubmit={handleAddUser} />
        )}
      </div>
      <Footer />
    </>
  );
};

// Fetch user data from external API
export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  return {
    props: {
      initialUsers: data,
    },
  };
}

export default Users;
