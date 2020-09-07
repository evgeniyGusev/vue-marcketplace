//шаблон будет доработан. это бета-версия

<template>
  <div class="validate-error">Вы пытались ввести некорректное значение</div>
</template>

<script>
export default {};
</script>

<style>
.validate-error {
  position: absolute;
  bottom: -45px;
  left: 0;
  padding: 5px 10px;
  background-color: #ff004c;
  border-radius: 3px;
}
.validate-error::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 65px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 12.5px 10px 12.5px;
  border-color: transparent transparent #ff004d transparent;
}
</style>