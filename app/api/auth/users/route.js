import User from "@models/user.schema";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@utils/verifyjwt";

await connectToDB();
const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = await user.generateAccessToken();
      console.log(accessToken)
  
      await user.save({ validateBeforeSave: false });
  
      return {
        accessToken,
      };
    } catch (error) {
      return new NextResponse(
        "Something went wrong while generating Refresh and Access Token"+error.message,{status:500}
      );
    }
  };
export const GET = async () => {
  try {
    await connectToDB();
    const users = await User.find();

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in fetching users" + error.message, {
      status: 500,
    });
  }
};

// if we add (auth) then we don't need to mention auth when makign api call

// User Registration
export const POST = async (req) => {
    try {
      const { email, username,uid,image, password } = await req.json();
      console.log(username)
      let newUser=await User.findOne({email:email?.toLowerCase()})
      if(!newUser){
        console.log("NEW USER")
        newUser = await User.create({ 
          email:email, 
          username:username?.replace(/\s+/g, ""),
          uid,
          image:image || "", 
          password:password || ""
        });
      }
      console.log(newUser)

      const { accessToken } = await generateAccessAndRefreshTokens(newUser._id);
      const options = {
          httpOnly: true,
          secure: true,
      };
      cookies().set("accessToken", accessToken, options);
      
      return new NextResponse(JSON.stringify({ message: "User is created",data:newUser }),{ status: 200 });
    }catch (error) {
      return new NextResponse("Error Registering user" + error.message, {
        status: 500,
      });
    }
  //   try {
  //     const { email, password } = await req.json();
  //     const user = await User.findOne({ email:email.toLowerCase() });

  //     if (!user) {
  //       return new NextResponse(
  //         JSON.stringify({ message: "Can't find the said user" }),
  //         { status: 400 }
  //       );
  //     }
  //     const isValidPassword = await user.isPasswordCorrect(password);
  //     if (!isValidPassword) {
  //       return new NextResponse(
  //         JSON.stringify({ message: "Incorrect password" }),
  //         { status: 400 }
  //       );
  //     }

  //     const { accessToken } = await generateAccessAndRefreshTokens(
  //       user._id
  //       );
  //       const options = {
  //           httpOnly: true,
  //           secure: true,
  //       };
  //       cookies().set("accessToken", accessToken, options)
  //     return new NextResponse(
  //       JSON.stringify({ message: "User is logged in", data:user}),
  //       { status: 200 }
  //     );
  //   } catch (error) {
  //     return new NextResponse("Error Logging User In: " + error.message, {
  //       status: 500,
  //     });
  // }
};

// Updating User details
export const PATCH = async (req) => {
  try {
    const userId=await verifyJWT(req);
    const body = await req.body;
    const { email, username, password, image } = body;

    if (!email && !username && !password && !image) {
      return new NextResponse(
        JSON.stringify({ message: "Nothing mentioned to update" }),
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { email },
      { body },
      { new: true }
    );

    if (!user)
      return new NextResponse(
        JSON.stringify({ message: "User not foudn in the DB" }),
        { status: 400 }
      );

    return new NextResponse(
      JSON.stringify({ message: "User is updated", data: user }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error Updating user details" + error.message, {
      status: 500,
    });
  }
};

// Deleting specific user by Id
export const DELETE = async (req) => {
  try {
    const userId=await verifyJWT(req);
    const { id } = req.params;
    const user = await User.findByIdAndDelete({ id });

    if (!user)
      return new NextResponse(
        JSON.stringify({ message: "User not foudn in the DB" }),
        { status: 400 }
      );

    return new NextResponse(
      JSON.stringify({ message: "User is DELETED", data: user }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse("Error DELETING user" + error.message, {
      status: 500,
    });
  }
};
