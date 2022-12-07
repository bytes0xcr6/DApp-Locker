const submit = document.querySelector(".button-lock");
const asset = document.querySelector("#asset");
const lockPeriod = document.querySelector("#lockPeriod");
const amount = document.querySelector("#amount");

submit.addEventListener("click", () => {
  if (!lockPeriod.value || !amount.value) {
    window.alert("All the values are required!");
  }
  console.log(asset.value, lockPeriod.value, amount.value);
});
