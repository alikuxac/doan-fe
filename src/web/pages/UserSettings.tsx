import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormLabel,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useJwtHook } from "../hooks/useJwtHook";
import { useAppDispatch } from "../hooks/reduxHook";
import { resetAll, setUser as setDispatchUser } from "../reducers/globalSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import defaulAvatar from "./../assets/images/avatar.jpg";

const passwordYup = Yup.object().shape({
  old_password: Yup.string().required("Required"),
  new_password: Yup.string()
    .required("Password is mendatory")
    .min(8, "Password must be at 8 char long"),
  re_password: Yup.string()
    .required("Password is mendatory")
    .oneOf([Yup.ref("password")], "Passwords does not match"),
});
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UserSettings: React.FC<any> = (props) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState<any>(null);

  const { register, control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(passwordYup),
  });

  useEffect(() => {
    const storage = localStorage.getItem("user");
    if (storage) {
      setUser(JSON.parse(storage));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setValue("fullname", (user.fullname === null ? "" : user.phone));
      setValue("phone", (user.phone === null ? "" : user.phone));
    }
  }, [user]);

  const onUpdateProfile = (data: any) => {
    console.log(data);
    useJwtHook.updateUserById(user.id, {
      fullname: data.fullname,
      phone: data.phone,
    }).then((res) => {
      setUser(res.data);
      dispatch(setDispatchUser(res.data));
    })
  };

  // modal change password
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenModal = () => setOpen(true);

  const onPasswordChange = (data: any) => {
    console.log(data);
    useJwtHook.updatePassword(user.id, {
      email: user.email,
      oldPassword: data.old_password,
      newPassword: data.new_password,
    }).then(() => {
      dispatch(resetAll());
    })
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: "40px 0",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          flex: "0 1 30vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Avatar
          src={defaulAvatar}
          alt="avatar"
          sx={{ width: 360, height: 360 }}
        />

        <Box>
          <Button variant="outlined">Update avatar</Button>
        </Box>
        <Box>
          <Button variant="outlined" onClick={handleOpenModal}>
            Change Password
          </Button>
        </Box>
      </Box>
      <Box sx={{ flex: "0 1 70vw" }}>
        <Card>
          <CardHeader title="User Profile" />
          <CardContent>
            <form onSubmit={handleSubmit(onUpdateProfile)}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <FormLabel component="legend" sx={{ flex: "0 1 10%" }}>
                    Email
                  </FormLabel>
                  <TextField disabled value={user?.email} fullWidth />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <FormLabel component="legend" sx={{ flex: "0 1 10%" }}>
                    Full Name
                  </FormLabel>
                  <Controller
                    name="fullname"
                    control={control}
                    defaultValue={user?.fullname}
                    render={({ field, fieldState, formState }) => (
                      <TextField
                        value={field.value}
                        fullWidth
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <FormLabel component="legend" sx={{ flex: "0 1 10%" }}>
                    Phone
                  </FormLabel>
                  <Controller
                    name="phone"
                    control={control}
                    defaultValue={user?.phone}
                    render={({ field, fieldState, formState }) => (
                      <TextField
                        value={field.value}
                        fullWidth
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="contained" type="submit">
                    Update
                  </Button>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
            onSubmit={handleSubmit(onPasswordChange)}
          >
            <Controller
              control={control}
              name="old_password"
              defaultValue={""}
              render={({ field, fieldState, formState }) => (
                <TextField
                  label="Old Password"
                  type="password"
                  variant="filled"
                  // onChange={(e) => field.onChange(e.target.value)}
                  {...register("old_password")}
                />
              )}
            />
            <Controller
              control={control}
              name="new_password"
              defaultValue={""}
              render={({ field, fieldState, formState }) => (
                <TextField
                  label="New Password"
                  type="password"
                  variant="filled"
                  // onChange={(e) => field.onChange(e.target.value)}
                  {...register("new_password")}
                  error={fieldState.error ? true : false}
                  helperText={fieldState.error && fieldState.error.message}
                />
              )}
            />
            <Controller
              control={control}
              name="re_password"
              defaultValue={""}
              render={({ field, fieldState, formState }) => (
                <TextField
                  label="Re Password"
                  type="password"
                  variant="filled"
                  // onChange={(e) => field.onChange(e.target.value)}
                  {...register("re_password")}
                />
              )}
            />
            <Box>
              <Button variant="contained" type="submit">
                Change Password
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default UserSettings;
