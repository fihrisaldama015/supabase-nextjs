/* eslint-disable @next/next/no-img-element */
import { supabase } from "../utils/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const User = () => {
  const [profile, setProfile] = useState({});
  const [isSaved, setIsSaved] = useState();

  const getProfile = () => {
    console.log("getProfile");
    const user = supabase.auth.user();
    const data = user.user_metadata;
    let profiles = {};
    if (data?.email) {
      const avatar_url = data.avatar_url;
      const email = data.email;
      const name = data.name;
      const _id = user.id;

      profiles = {
        avatar_url,
        email,
        name,
        _id,
      };
    } else {
      profiles = {
        avatar_url: "https://cdn-icons-png.flaticon.com/512/3237/3237472.png",
        email: user.email,
        name: user.email,
        _id: user.id,
      };
    }
    setProfile(profiles);
  };

  const saveUser = async () => {
    console.log("saveUser");
    // const user = supabase.auth.user();
    // const data = user.user_metadata;
    // let profiles = {};
    // if (data?.email) {
    //   const avatar_url = data.avatar_url;
    //   const email = data.email;
    //   const name = data.name;
    //   const _id = user.id;

    //   profiles = {
    //     avatar_url,
    //     email,
    //     name,
    //     _id,
    //   };
    // } else {
    //   profiles = {
    //     avatar_url: "https://cdn-icons-png.flaticon.com/512/3237/3237472.png",
    //     email: user.email,
    //     name: user.email,
    //     _id: user.id,
    //   };
    // }
    if (!isSaved) {
      try {
        console.log("currentProfile", profile);
        await axios.post("/api/user", profile);
        setIsSaved(true);
        console.log("isSaved", true);
        // getUser();
      } catch (error) {
        console.log(error.message, "err client");
      }
    }
  };

  const getUser = async () => {
    console.log("getUser");
    const user = supabase.auth.user();
    try {
      if (user?.id) {
        const res = await axios.get("/api/user", {
          params: { id: user.id },
        });
        if (res.data) {
          setProfile(res.data);
          setIsSaved(true);
          return res.data;
        } else {
          setIsSaved(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error.error_description || error.message);
    }
  };

  useEffect(() => {
    getProfile();
    getUser();
  }, []);

  useEffect(() => {
    if (isSaved !== null && isSaved !== undefined) {
      !isSaved && saveUser();
    }
  }, [isSaved]);

  return (
    <>
      <h1>Login Successfully</h1>
      {profile?.avatar_url && (
        <>
          <Image
            loader={() => profile?.avatar_url}
            src={profile?.avatar_url}
            unoptimized={true}
            alt={"avatar"}
            height={48}
            width={48}
            style={{ borderRadius: "100%" }}
            referrerPolicy="no-referrer"
          />
          <p>{profile?.name}</p>
        </>
      )}
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};
export default User;
