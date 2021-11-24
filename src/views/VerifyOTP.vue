<template>
  <div>
    <h1>Verify OTP</h1>
  </div>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <label>Phone Code: </label>
        <input type="text" name="phoneCode" v-model="data.phoneCode" required />
      </div>
      <div>
        <label>Phone Number: </label>
        <input
          type="text"
          name="phoneNumber"
          v-model="data.phoneNumber"
          required
        />
      </div>
      <div>
        <label>OTP: </label>
        <input type="text" name="otp" required v-model="data.otp" />
      </div>
      <div v-if="message">
        <p>{{ message }}</p>
      </div>
      <div>
        <button type="submit">Verify OTP</button>
      </div>
    </form>
  </div>
</template>

<script>
import authService from "../modules/auth/auth.service";

export default {
  name: "VerifyOTP",
  data() {
    return {
      message: "",
      data: {
        phoneCode: "",
        phoneNumber: "",
        otp: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      /// this.$store.dispatch("sendOtp", this.data);
      let { phoneCode, phoneNumber, otp } = this.data;

      phoneCode = parseInt(phoneCode, 10);
      if (typeof phoneCode !== "number" || isNaN(phoneCode)) {
        this.message = "Phone code must be a number";
        return;
      }

      phoneNumber = parseInt(phoneNumber, 10);
      if (typeof phoneNumber !== "number" || isNaN(phoneNumber)) {
        this.message = "error: Phone number must be a number";
        return;
      }

      otp = otp.trim();

      if (!otp) {
        this.message = "Please enter OTP";
        return;
      }

      try {
        await authService.verifyOTP({
          phoneCode,
          phoneNumber,
          otp,
        });
      } catch (error) {
        this.message = `error: ${error.message}`;
      }
    },
  },
};
</script>
