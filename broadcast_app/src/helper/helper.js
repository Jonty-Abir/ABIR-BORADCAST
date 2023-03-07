import instance from "../Instance/instance";

// List of all the endpoints
export const sendOtp = async (payload) => {
  try {
    const { data, status } = await instance.post("/send-otp", payload);
    console.log(data);
    if (status === 200) return data;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};
export const verifyOtp = async (payload) => {
  try {
    const { data, status } = await instance.post("/verify-otp", payload);
    if (status === 200) return data;
  } catch (err) {
    console.log(err.message);
    return err.message;
  }
};

export const activateUser = async ({ name, avatar }) => {
  try {
    if (!name || !avatar) throw new Error("Bad Request!");
    const { data } = await instance.post("/activate-user", { name, avatar });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const logout = async () => {
  try {
    const {data} = await instance.post("/logout");
    return data;
  } catch (err) {
    console.log("error was occure while user logout!");
  }
};
