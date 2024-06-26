import React, { useEffect, useState } from 'react';
import NavBar from '../../components/navigator/NavBar';
import { useAuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { authUser } = useAuthContext();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
        
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <>    
      <NavBar />
      <div className='flex sm:h-[450px] md:h-[150px] rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <div className='mt-[35px]'>
          {/* Render the file input */}
          <input 
            type="file" 
            onChange={handleFileSelect} 
            className="hidden" 
            id="fileInput" 
            accept=".jpg, .jpeg, .png"
          />
          
          {/* Render the label with background image */}
          <label 
            htmlFor="fileInput" 
            className="block w-20 h-20 rounded-full border-4 border-gray-300 cursor-pointer overflow-hidden"
            style={{ 
              backgroundImage: selectedImage ? `url(${selectedImage})` : (authUser.profilepic ? `url(${authUser.profilepic})` : 'none'),
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* No text content */}
          </label>
        </div>
        <div className='ml-[100px] flex flex-col mr-[50px] mt-[35px]'>
            <p>{`Username: ${authUser.username}`}</p>
            <p>{`Display Name: ${authUser.fullName}`}</p>
            <p>{`Gender: ${authUser.gender}`}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
