<template>
  <span>
    le {{ date.day }}/{{ date.month }}/{{ date.year }} à {{ date.hour }}h{{
      date.minute
    }}
  </span>
</template>

<script>
export default {
  name: "PostDate",
  props: {
    postDate: {
      type: String,
    },
  },
  data() {
    return {
      date: "",
    };
  },
  mounted() {
    const d = new Date(`${this.postDate}`);
    this.date = {
      year: d.getUTCFullYear(),
      month: parseInt(("0" + d.getMonth()).slice(-2)) + 1,
      day: ("0" + d.getDate()).slice(-2),
      hour: ("0" + d.getHours()).slice(-2),
      minute: ("0" + d.getMinutes()).slice(-2),
    };
  },
};
</script>