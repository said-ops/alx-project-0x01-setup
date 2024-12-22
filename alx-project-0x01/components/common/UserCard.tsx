import { UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({ name, username, email, address, phone, website, company }) => {
  return (
    <div className="max-w-sm mx-auto my-4 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 mb-2">
        <strong>Username:</strong> {username}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Email:</strong> {email}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Address:</strong> {address.street}, {address.city}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Phone:</strong> {phone}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Website:</strong> <a href={`https://${website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{website}</a>
      </p>
      <p className="text-gray-600">
        <strong>Company:</strong> {company.name}
      </p>
    </div>
  );
};

export default UserCard;
