import axiosInstance from "../config/axios";
import {useDispatch, useSelector} from "react-redux";
import {temp, login, logout} from "../store/AuthSlice";
import {toast} from "sonner";

class Auth {
    constructor(user, dispatch) {
        this.user = user;
        this.dispatch = dispatch;
    }

    async registerClient(userData) {
        try {
            const response = await axiosInstance.post("auth/register-client", userData);
            const data = await response.data;
            toast(data.message);
        } catch (error) {
            toast(error.response ? error.response.data.message : error.message);
        }
    }

    async login(userData) {
        try {
            const response = await axiosInstance.post("auth/login", userData);
            const data = await response.data;
            this.dispatch(login({email: userData.email, fullName: data.fullName, role: data.role}));
            localStorage.setItem("ticket", data.accessToken);
            return {success: true};
        } catch (error) {
            toast(error.response ? error.response.data.message : error.message);
            this.dispatch(temp({email: userData.email}));
            return {success: false, error: error.response.data.errorCode};
        }
    }

    async logout() {
        try {
            localStorage.removeItem("ticket");
            localStorage.removeItem("user");
            this.setUser(null);
            await axiosInstance.get("auth/logout");
        } catch (error) {
            console.error(error.response.data.error);
        }
    }

    async verifyEmail(token) {
        try {
            const response = await axiosInstance.get(`auth/verify-email?token=${token}`);
            const data = await response.data;
            toast(data.message);
            return true;
        } catch (error) {
            toast(error.response ? error.response.data.message : error.message);
            return false;
        }
    }

    async resendVerificationEmail(email) {
        try {
            // this.setLoading(true);
            const response = await axiosInstance.post(
                "auth/send-email-verification",
                {email}
            );
            const data = await response.data;
            // this.setLoading(false);
            toast(data.message);
        } catch (error) {
            // this.setLoading(false);
            toast(error.response.data.error);
        }
    }

    async sendOTP(otpMethod) {
        if (!this.user) return false;
        try {
            // this.setLoading(true);
            const response = await axiosInstance.post("auth/otp-method", {
                email: this.user.email,
                method: otpMethod,
            });
            const data = await response.data;
            // this.setLoading(false);
            toast(data.message);
            return true;
        } catch (error) {
            // this.setLoading(false);
            toast(error.response.data.error);
            return false;
        }
    }

    async verifyOTP(otp) {
        try {
            // this.setLoading(true);
            const response = await axiosInstance.post("auth/verify-otp", {otp});
            // this.setLoading(false);
            return true;
        } catch (error) {
            // this.setLoading(false);
            toast(error.response.data.error);
            return false;
        }
    }

    async sendResetLink(email) {
        try {
            // this.setLoading(true);
            const response = await axiosInstance.post("auth/forgot-password", {
                email,
            });
            const data = await response.data;
            // this.setLoading(false);
            toast(data.message);
        } catch (error) {
            // this.setLoading(false);
            toast(error.response.data.error);
        }
    }

    async verifyResetToken(token) {
        try {
            const response = await axiosInstance.get(
                `auth/reset-password/verify?token=${token}`
            );
            const data = await response.data;
            localStorage.setItem("resetToken", data.token);
            return true;
        } catch (error) {
            toast("Invalid reset link");
            return false;
        }
    }

    async resetPassword(password) {
        const resetToken = localStorage.getItem("resetToken");
        try {
            // this.setLoading(true);
            const response = await axiosInstance.post(
                `auth/reset-password/${resetToken}`,
                {password}
            );
            const data = await response.data;
            localStorage.removeItem("resetToken");
            // this.setLoading(false);
            toast(data.message);
            return true;
        } catch (error) {
            // this.setLoading(false);
            toast(error.response.data.error);
            return false;
        }
    }
}

export default function AuthService() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    return new Auth(user, dispatch);
}
