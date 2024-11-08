import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Manager = () => {
  const [list, setList] = useState(() => {
    const savedInfo = localStorage.getItem("infos");
    return savedInfo ? JSON.parse(savedInfo) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [see, setSee] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Error in submitting data:", error);
    }
    if (editIndex !== null) {
      const updatedList = list.map((item, index) =>
        index === editIndex ? data : item
      );
      setList(updatedList);
      localStorage.setItem("infos", JSON.stringify(updatedList));
      setEditIndex(null);
    } else {
      const updatedList = [...list, data];
      setList(updatedList);
      localStorage.setItem("infos", JSON.stringify(updatedList));
    }

    reset();
  };

  const handleDelete = async (index) => {
    setIsLoading(true); // Show loader
    setTimeout(() => {
      const updatedList = list.filter((_, i) => i !== index);
      setList(updatedList);
      localStorage.setItem("infos", JSON.stringify(updatedList));
      setIsLoading(false); // Hide loader
    }, 2000); // Simulate delete delay
  };

  const handleEdit = (index) => {
    const item = list[index];
    setValue("fullName", item.fullName);
    setValue("username", item.username);
    setValue("userPassword", item.userPassword);
    setEditIndex(index);
  };

  const seeuserPassword = (e) => {
    e.preventDefault();
    setSee(!see);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredList = list.filter(
    (item) =>
      item.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      {/* Loader with animated line */}
      {isLoading && (
        <div className="fixed top-5 right-5 p-2 rounded bg-gray-800 text-white flex flex-col items-center">
          Deleting...
          <div className="mt-2 w-full h-1 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-pink-500 animate-shrink"></div>
          </div>
        </div>
      )}

      <div className="mx-auto flex justify-center py-[30px]">
        <div className="flex flex-col w-[70%]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter website url"
              className="border-2 border-black rounded-[50px] px-[10px] w-full h-[35px]"
              {...register("fullName", { required: "URL is required" })}
            />
            {errors.fullName && <p>{errors.fullName.message}</p>}

            <div className="flex my-[20px] w-full gap-[20px] md:gap-[40px] flex-col md:flex-row">
              <input
                type="text"
                placeholder="Enter username"
                className="border-2 border-black rounded-[50px] px-[10px] h-[35px] md:w-[75%] w-[100%]"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && <p>{errors.username.message}</p>}

              <div className="relative md:w-[25%] w-full">
                <input
                  type={see ? "text" : "password"}
                  placeholder="Enter password"
                  className="border-2 border-black rounded-[50px] px-[10px] h-[35px] md:w-[100%] w-full"
                  {...register("userPassword", {
                    required: "Password is required",
                  })} // This should be "userPassword"
                />

                {errors.userPassword && <p>{errors.userPassword.message}</p>}
                <button
                  onClick={seeuserPassword}
                  className="absolute inset-y-0 right-3 flex items-center text-sm"
                >
                  {see ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <span className="w-full flex justify-center">
              <button
                type="submit"
                className="bg-[#db8deb] w-[150px] text-white px-4 py-2 rounded-full flex gap-3 items-center justify-center"
                disabled={isSubmitting}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/zrkkrrpl.json"
                  trigger="hover"
                  colors="primary:#ffffff,secondary:#000000"
                ></lord-icon>
                <p className="text-[20px]">Save</p>
              </button>
            </span>
          </form>

          <p className="font-bold text-[20px] mt-[30px]">
            Your userPasswordwords
          </p>
          <div className="my-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by URL or Username"
              className="border-2 border-black rounded-[50px] px-[10px] h-[35px] w-[100%]"
            />
          </div>

          <div className="mt-4">
            <div className="flex w-full bg-[#cf55e7] h-[35px] justify-around items-center rounded-t-[10px]">
              <p className="w-[40%] flex justify-center">Site Name</p>
              <span className="w-[60%] flex justify-evenly">
                <p>Username</p>
                <p>userPasswordword</p>
                <p>Actions</p>
              </span>
            </div>

            <ul>
              {filteredList.map((item, index) => (
                <li key={index}>
                  <div className="flex w-full bg-[#e1a9ec] h-full md:justify-around md:flex-row flex-col text-[12px] md:items-center ">
                    <p className="w-[40%] flex justify-center overflow-x-auto">
                      <a href={item.fullName}>{item.fullName}</a>
                    </p>
                    <span className="w-[60%] flex justify-evenly">
                      <p>{item.username}</p>
                      <p>{item.userPassword}</p>
                      <span className="flex gap-4">
                        <button onClick={() => handleDelete(index)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#cf55e7"
                          ></lord-icon>
                        </button>
                        <button onClick={() => handleEdit(index)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            colors="primary:#ffffff,secondary:#000000"
                          ></lord-icon>
                        </button>
                      </span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
