<template>
  <div>
    <h1>Send OTP</h1>
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
        <label>Channel: </label>
        <input type="text" name="channel" v-model="data.channel" required />
      </div>
      <div v-if="message">
        <p>{{ message }}</p>
      </div>
      <div>
        <button type="submit">Send OTP</button>
      </div>
    </form>
  </div>
</template>

<script>
import authService from "../modules/auth/auth.service";

export default {
  name: "SendOTP",
  data() {
    return {
      message: "",
      data: {
        phoneCode: "",
        phoneNumber: "",
        channel: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      /// this.$store.dispatch("sendOtp", this.data);
      let { phoneCode, phoneNumber, channel } = this.data;

      if (!phoneCode || !phoneNumber || !channel) {
        this.message = "error: Please fill all the fields";
        return;
      }

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

      const validChannels = ["sms", "wa", "call"];
      if (!validChannels.includes(channel)) {
        this.message = "error: Invalid channel";
        return;
      }

      try {
        const { message } = await authService.sendOTP({
          phoneCode,
          phoneNumber,
          channel,
        });

        this.message = message;
      } catch (error) {
        this.message = `error: ${error.message}`;
      }
    },
  },
};
</script>
