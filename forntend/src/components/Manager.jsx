import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Manager = () => {
  const [list, setList] = useState(() => {
    const savedInfo = localStorage.getItem("infos");
    return savedInfo ? JSON.parse(savedInfo) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [see, setSee] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result.message);

    } catch (error) {
      console.error('Error in submitting data:', error);
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

  const handleDelete = (index) => {
    const updatedList = list.filter((_, i) => i !== index);
    setList(updatedList);
  };

  const handleEdit = (index) => {
    const item = list[index];
    setValue("url", item.url);
    setValue("username", item.username);
    setValue("pass", item.pass);
    setEditIndex(index);
  };

  const seePass = (e) => {
    e.preventDefault();
    setSee(!see);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query on user input
  };

  // Filter the list based on the search query
  const filteredList = list.filter(
    (item) =>
      item.url.toLowerCase().includes(searchQuery.toLowerCase()) || // Check if the URL includes the search query
      item.username.toLowerCase().includes(searchQuery.toLowerCase()) // Check if the username includes the search query
  );

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="mx-auto flex justify-center py-[30px]">
        <div className="flex flex-col w-[70%]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Enter website url"
              className="border-2 border-black rounded-[50px] px-[10px] w-full h-[35px]"
              {...register("url", { required: "URL is required" })}
            />
            {errors.url && <p>{errors.url.message}</p>}

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
                {...register("pass", { required: "Password is required" })}
              />
              {errors.pass && <p>{errors.pass.message}</p>}
              <button onClick={seePass} className="absolute inset-y-0 right-3 flex items-center text-sm">
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

          <p className="font-bold text-[20px] mt-[30px]">Your Passwords</p>
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
              <p className="w-[40%] flex justify-center">site</p>
              <span className="w-[60%] flex justify-evenly">
                <p>Username</p>
                <p>Password</p>
                <p>Actions</p>
              </span>
            </div>
            <ul>
              {filteredList.map((item, index) => (
                <li key={index}>
                  <div className="flex w-full bg-[#e1a9ec] h-full md:justify-around md:flex-row flex-col text-[12px] md:items-center ">
                    <p className="w-[40%] flex justify-center overflow-x-auto	">
                      <a href={item.url} >{item.url}</a>
                    </p>
                    <span className="w-[60%] flex justify-evenly">
                      <p> {item.username}</p>
                      <p> {item.pass}</p>
                      <span className="flex gap-4">
                        <button
                          onClick={() => {
                            handleDelete(index);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#cf55e7"
                          ></lord-icon>
                        </button>
                        <button
                          onClick={() => {
                            handleEdit(index);
                          }}
                        >
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
